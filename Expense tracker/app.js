document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('expense-form');
    const expenseName = document.getElementById('expense-name');
    const expenseAmt = document.getElementById('expense-amt');
    const expenseList = document.getElementById('expense-list');
    const totalAmtDisplay = document.getElementById('total-amt');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    // let expenses = [];
    let totalAmount = calculateTotal();

    renderExpenses();
    updateTotal();


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseName.value.trim();
        const amount = parseFloat(expenseAmt.value.trim());
        if (name !== '' && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name,
                amount
            }
            expenses.push(newExpense);
            expenseName.value = '';
            expenseAmt.value = '';
            saveExpense();
            renderExpenses();
            updateTotal();
        }

    });



    expenseList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const expenseId = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== expenseId);
        }
        renderExpenses();
        saveExpense();
        updateTotal();
    });


    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = ` ${expense.name} - $${expense.amount}
            <button data-id = ${expense.id}> Delete </button>`

            expenseList.appendChild(li);
        });
    }

    function calculateTotal() {
        return expenses.reduce((sum, expenses) => sum + expenses.amount, 0);
    }

    function updateTotal() {
        totalAmount = calculateTotal();
        totalAmtDisplay.textContent = totalAmount.toFixed(2);
    }

    function saveExpense() {
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }

});