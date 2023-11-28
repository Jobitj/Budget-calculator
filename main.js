

let currentUser = localStorage.getItem('currentUser'); 

let incomeData = [];
let expenseData = [];


window.onload = function () {
    if (localStorage.getItem(`${currentUser}_incomeData`)) {
        incomeData = JSON.parse(localStorage.getItem(`${currentUser}_incomeData`));
        updateIncomeTable();
        calculateSavings();
        updateCharts();
    }

    if (localStorage.getItem(`${currentUser}_expenseData`)) {
        expenseData = JSON.parse(localStorage.getItem(`${currentUser}_expenseData`));
        updateExpenseTable();
        calculateSavings();
        updateCharts();
    }
};

function saveDataToLocalStorage() {
    localStorage.setItem(`${currentUser}_incomeData`, JSON.stringify(incomeData));
    localStorage.setItem(`${currentUser}_expenseData`, JSON.stringify(expenseData));
}




function income(event) {
    event.preventDefault();
    let itype = document.getElementById("itype").value;
    let iamt = parseFloat(document.getElementById("iamt").value);

    if (itype && !isNaN(iamt)) {
        incomeData.push({ type: itype, amount: iamt });
        updateIncomeTable();
        calculateSavings();
        updateCharts();
        saveDataToLocalStorage();

        document.getElementById("itype").value = "";
        document.getElementById("iamt").value = "";
    } else {
        alert("Please enter valid income details.");
    }
}

function expense(event) {
    event.preventDefault();
    let etype = document.getElementById("etype").value;
    let eamt = parseFloat(document.getElementById("eamt").value);

    if (etype && !isNaN(eamt)) {
        expenseData.push({ type: etype, amount: eamt });
        updateExpenseTable();
        calculateSavings();
        updateCharts();
        saveDataToLocalStorage();

        document.getElementById("etype").value = "";
        document.getElementById("eamt").value = "";
    } else {
        alert("Please enter valid expense details.");
    }
}

function updateIncomeTable() {
    let iresult = document.getElementById("iresult");
    iresult.innerHTML = "";
    let runningBalance = 0;

    incomeData.forEach((income) => {
        let row = iresult.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerText = income.type;
        cell2.innerText = income.amount.toFixed(2);
        runningBalance += income.amount;
        cell3.innerText = runningBalance.toFixed(2);
    });
}

function updateExpenseTable() {
    let eresult = document.getElementById("eresult");
    eresult.innerHTML = "";
    let runningBalance = 0;

    expenseData.forEach((expense) => {
        let row = eresult.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerText = expense.type;
        cell2.innerText = expense.amount.toFixed(2);
        runningBalance -= expense.amount;
        cell3.innerText = runningBalance.toFixed(2);
    });
}

function calculateSavings() {
    let savings = incomeData.reduce((total, income) => total + income.amount, 0);
    let spent = expenseData.reduce((total, expense) => total + expense.amount, 0);
    let balance = savings - spent;

    document.getElementById("savings").innerText = savings.toFixed(2);
    document.getElementById("spent").innerText = spent.toFixed(2);
    document.getElementById("balance").innerText = balance.toFixed(2);
}

// ...

function updateCharts() {
    let pieChartCanvas = document.getElementById("pieChart");
    let pieChartContext = pieChartCanvas.getContext("2d");

    let chartData = {
        labels: ["Income", "Expense", "Balance"],
        datasets: [{
            data: [calculateTotalSavings(), calculateTotalExpense(), calculateBalance()],
            backgroundColor: ["green", "blue", "red"],
        }],
    };

    
    if (window.myPieChart) {
        window.myPieChart.destroy();
    }

    window.myPieChart = new Chart(pieChartContext, {
        type: 'pie',
        data: chartData,
        options: {
            aspectRatio: 1, 
        },
    });
}

function calculateBalance() {
    let totalIncome = incomeData.reduce((total, income) => total + income.amount, 0);
    let totalExpense = expenseData.reduce((total, expense) => total + expense.amount, 0);
    let balance = totalIncome - totalExpense;

    return balance.toFixed(2);
}

// ...


function calculateTotalSavings() {
    return incomeData.reduce((total, income) => total + income.amount, 0);
}

function calculateTotalExpense() {
    return expenseData.reduce((total, expense) => total + expense.amount, 0);
}

function logout() {
    saveDataToLocalStorage(); 
    alert("Confirm logout");
    window.location = "index.html";
}


function clearData() {
    
    let confirmClear = confirm("Are you sure you want to clear all data?");
    
    if (confirmClear) {
       
        localStorage.removeItem(`${currentUser}_incomeData`);
        localStorage.removeItem(`${currentUser}_expenseData`);

     
        incomeData = [];
        expenseData = [];

       
        updateIncomeTable();
        updateExpenseTable();
        calculateSavings();
        updateCharts();
    }
}