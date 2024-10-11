# Expense Tracker

https://roadmap.sh/projects/expense-tracker

A simple command-line application built with Node.js to manage your expenses. The application allows users to add, delete, view, and summarize their expenses. Data is stored in a JSON file locally, making it easy to track and manage your finances.

## Features

- **Add an Expense**: Add an expense with a description and amount.
- **Delete an Expense**: Delete an expense using its ID.
- **List All Expenses**: View all expenses added so far.
- **View Summary**: Get a total summary of all expenses.
- **View Monthly Summary**: Get a summary of expenses for a specific month.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fvksit/expense-tracker.git
   
   cd expense-tracker
   ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1. Add an Expense:
    ```bash
    node expense-tracker.js add --description "Lunch" --amount 20
    ```

2. Delete an Expense:
    ```bash
    node expense-tracker.js delete --id 1
    ```

3. List All Expenses:
    ```bash
    node expense-tracker.js list
    ```

4. View Summary of Expenses:
    ```bash
    node expense-tracker.js summary
    ```

5. View Monthly Summary:
    ```bash
    node expense-tracker.js summary --month 8
    ```