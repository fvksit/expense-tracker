const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const exp = require('constants');

const filepath = path.join(__dirname, 'expenses.json');

function loadExpenses() {
    if (!fs.existsSync(filepath)) {
        return [];
    }
    try {
        const data = fs.readFileSync(filepath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.log(`Error reading expenses data:`, error.message);
        return [];
    }
    
}

function saveExpenses(expenses) {
    fs.writeFileSync(filepath, JSON.stringify(expenses, null, 2));
}

function addExpense(description, amount) {
    if (!description || description.trim() === '') {
        console.log(`Error: Description cannot be empty`);
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        console.log(`Error: Amount must be a positive number`);
        return;
    }

    const expenses = loadExpenses();
    const newExpense = {
        id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
        date: new Date().toISOString().split('T')[0],
        description,
        amount: parseFloat(amount)
    };
    expenses.push(newExpense);
    saveExpenses(expenses);
    console.log(`Expense added successfully (ID: ${newExpense.id})`);
}

function deleteExpense(id) {
    if (isNaN(id) || id <= 0) {
        console.log(`Error: ID must be a positive number`);
        return;
    }

    let expenses = loadExpenses();
    const index = expenses.findIndex(exp => exp.id === parseInt(id));
    if (index === -1) {
        console.log(`Expense with ID ${id} not found`);
        return;
    }
    expenses.splice(index, 1);
    saveExpenses(expenses);
    console.log(`Expense deleted successfully`);
}

function listExpenses() {
    const expenses = loadExpenses();
    if (expenses.length === 0) {
        console.log("No expenses found.")
        return;
    }
    console.log("# ID   Date        Description     Amount");
    expenses.forEach(exp => {
        console.log(`# ${exp.id}   ${exp.date}   ${exp.description.padEnd(15)}   $${exp.amount}`);
    });
}

function summary(month = null) {
    const expenses = loadExpenses();
    let filteredExpenses = expenses;

    if (month) {
        if (isNaN(month) || month < 1 || month > 12) {
            console.log(`Error: Month must be between 1 and 12.`)
            return;
        }
        filteredExpenses = expenses.filter(exp => {
            const expenseDate = new Date(exp.date);
            return expenseDate.getMonth() + 1 === parseInt(month);
        });
    }

    const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    if (month) {
        console.log(`Total expenses for ${new Date(2024, month - 1).toLocaleString('default', { month: 'long' })}: $${total}`);
    } else {
        console.log(`Total expenses: $${total}`);
    }
}

program
    .command('add')
    .description('Add a new expenses')
    .requiredOption('--description <description>', 'Expenses description')
    .requiredOption('--amount <amount>', 'Expenses amount')
    .action((options) => {
        addExpense(options.description, options.amount);
    });

program
    .command('delete')
    .description('Delete an expenses by ID')
    .requiredOption('--id <id>', 'Expenses ID')
    .action((options) => {
        deleteExpense(options.id);
    });

program
    .command('list')
    .description('List all expenses')
    .action(() => {
        listExpenses();
    });

program
    .command('summary')
    .description('Show summary of expenses')
    .option('--month <month>', 'Filter summary by month (1-12)')
    .action((options) => {
        summary(options.month);
    });

program.parse(process.argv);