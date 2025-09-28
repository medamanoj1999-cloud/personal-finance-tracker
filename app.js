// Personal Finance Manager Application
class PersonalFinanceManager {
    constructor() {
        this.data = {
            income: [],
            bills: [],
            expenses: [],
            savings: [],
            debts: []
        };
        
        this.charts = {};
        this.currentSection = 'dashboard';
        this.selectedMonth = '2025-09';
        
        this.init();
    }

    init() {
        this.loadData();
        this.initializeSampleData();
        this.setupEventListeners();
        this.showSection('dashboard');
        this.updateDashboard();
    }

    // Data Management
    loadData() {
        const savedData = localStorage.getItem('personalFinanceData');
        if (savedData) {
            this.data = { ...this.data, ...JSON.parse(savedData) };
        }
    }

    saveData() {
        localStorage.setItem('personalFinanceData', JSON.stringify(this.data));
    }

    initializeSampleData() {
        if (this.data.income.length === 0) {
            this.data.income = [
                {
                    id: 1,
                    source: "Paycheck",
                    expected: 45000,
                    actual: 45000,
                    month: "2025-09",
                    category: "salary"
                },
                {
                    id: 2,
                    source: "Side Hustle",
                    expected: 5000,
                    actual: 4500,
                    month: "2025-09",
                    category: "freelance"
                },
                {
                    id: 3,
                    source: "Other Income",
                    expected: 1000,
                    actual: 1500,
                    month: "2025-09",
                    category: "other"
                }
            ];
        }

        if (this.data.bills.length === 0) {
            this.data.bills = [
                {
                    id: 1,
                    name: "Electricity",
                    budgeted: 2000,
                    actual: 1800,
                    month: "2025-09",
                    category: "utilities"
                },
                {
                    id: 2,
                    name: "Internet",
                    budgeted: 500,
                    actual: 499,
                    month: "2025-09",
                    category: "utilities"
                },
                {
                    id: 3,
                    name: "Water",
                    budgeted: 300,
                    actual: 280,
                    month: "2025-09",
                    category: "utilities"
                }
            ];
        }

        if (this.data.expenses.length === 0) {
            this.data.expenses = [
                {
                    id: 1,
                    name: "Groceries",
                    budgeted: 12000,
                    actual: 11500,
                    month: "2025-09",
                    category: "food"
                },
                {
                    id: 2,
                    name: "Transport",
                    budgeted: 5000,
                    actual: 4800,
                    month: "2025-09",
                    category: "transport"
                },
                {
                    id: 3,
                    name: "Entertainment",
                    budgeted: 3000,
                    actual: 2500,
                    month: "2025-09",
                    category: "entertainment"
                }
            ];
        }

        if (this.data.savings.length === 0) {
            this.data.savings = [
                {
                    id: 1,
                    name: "Emergency Fund",
                    target: 100000,
                    current: 25000,
                    monthly: 2500,
                    targetDate: "2025-12-31"
                },
                {
                    id: 2,
                    name: "Vacation Fund",
                    target: 50000,
                    current: 10000,
                    monthly: 1000,
                    targetDate: "2025-08-15"
                }
            ];
        }

        if (this.data.debts.length === 0) {
            this.data.debts = [
                {
                    id: 1,
                    name: "Mortgage",
                    totalAmount: 2000000,
                    monthlyGoal: 30000,
                    actualPayment: 30000,
                    remainingBalance: 1800000,
                    interestRate: 8.5
                },
                {
                    id: 2,
                    name: "Car Loan",
                    totalAmount: 500000,
                    monthlyGoal: 9500,
                    actualPayment: 9500,
                    remainingBalance: 450000,
                    interestRate: 7.2
                }
            ];
        }

        this.saveData();
    }

    // Event Listeners
    setupEventListeners() {
        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', () => {
            this.attachEventListeners();
        });

        // If DOM is already loaded, attach immediately
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.attachEventListeners();
            });
        } else {
            this.attachEventListeners();
        }
    }

    attachEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                console.log('Navigating to section:', section); // Debug log
                this.showSection(section);
            });
        });

        // Month selection
        const monthSelect = document.getElementById('monthSelect');
        if (monthSelect) {
            monthSelect.addEventListener('change', (e) => {
                this.selectedMonth = e.target.value;
                this.updateDashboard();
            });
        }

        // Quick action buttons
        const addIncomeBtn = document.getElementById('addIncomeBtn');
        if (addIncomeBtn) {
            addIncomeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Add Income clicked'); // Debug log
                this.showSection('income');
            });
        }

        const addExpenseBtn = document.getElementById('addExpenseBtn');
        if (addExpenseBtn) {
            addExpenseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Add Expense clicked'); // Debug log
                this.showSection('expenses');
            });
        }

        const addSavingsBtn = document.getElementById('addSavingsBtn');
        if (addSavingsBtn) {
            addSavingsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Add Savings clicked'); // Debug log
                this.showSection('savings');
            });
        }

        const addDebtBtn = document.getElementById('addDebtBtn');
        if (addDebtBtn) {
            addDebtBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Add Debt clicked'); // Debug log
                this.showSection('debts');
            });
        }

        // Forms
        const incomeForm = document.getElementById('incomeForm');
        if (incomeForm) {
            incomeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addIncome();
            });
        }

        const billForm = document.getElementById('billForm');
        if (billForm) {
            billForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addBill();
            });
        }

        const expenseForm = document.getElementById('expenseForm');
        if (expenseForm) {
            expenseForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addExpense();
            });
        }

        const savingsForm = document.getElementById('savingsForm');
        if (savingsForm) {
            savingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addSavings();
            });
        }

        const debtForm = document.getElementById('debtForm');
        if (debtForm) {
            debtForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addDebt();
            });
        }

        const updateSavingsForm = document.getElementById('updateSavingsForm');
        if (updateSavingsForm) {
            updateSavingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateSavings();
            });
        }

        // Tab switching
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab(e.target.getAttribute('data-tab'));
            });
        });

        // Modal
        const modalClose = document.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.closeModal();
            });
        }

        const addMoneyModal = document.getElementById('addMoneyModal');
        if (addMoneyModal) {
            addMoneyModal.addEventListener('click', (e) => {
                if (e.target.id === 'addMoneyModal') {
                    this.closeModal();
                }
            });
        }

        // Export
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportData();
            });
        }

        // Set default target date for savings
        const savingsTargetDate = document.getElementById('savingsTargetDate');
        if (savingsTargetDate) {
            const futureDate = new Date();
            futureDate.setFullYear(futureDate.getFullYear() + 1);
            savingsTargetDate.value = futureDate.toISOString().slice(0, 10);
        }
    }

    // Navigation
    showSection(sectionName) {
        console.log('showSection called with:', sectionName); // Debug log
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            console.log('Section found and activated:', sectionName); // Debug log
        } else {
            console.error('Section not found:', sectionName); // Debug log
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            console.log('Navigation link activated'); // Debug log
        }

        this.currentSection = sectionName;

        // Update section-specific content
        setTimeout(() => {
            switch (sectionName) {
                case 'dashboard':
                    this.updateDashboard();
                    break;
                case 'income':
                    this.renderIncome();
                    break;
                case 'expenses':
                    this.renderExpenses();
                    break;
                case 'savings':
                    this.renderSavings();
                    break;
                case 'debts':
                    this.renderDebts();
                    break;
                case 'reports':
                    this.renderReports();
                    break;
            }
        }, 100);
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeTabBtn = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTabBtn) {
            activeTabBtn.classList.add('active');
        }

        // Update tab content
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        const activeTabPane = document.getElementById(`${tabName}-tab`);
        if (activeTabPane) {
            activeTabPane.classList.add('active');
        }
    }

    // Dashboard Functions
    updateDashboard() {
        this.calculateSummary();
        this.renderCategoryChart();
        this.renderIncomeExpenseChart();
    }

    calculateSummary() {
        const monthData = this.getMonthData(this.selectedMonth);
        
        const totalIncome = monthData.income.reduce((sum, item) => sum + item.actual, 0);
        const totalBills = monthData.bills.reduce((sum, item) => sum + item.actual, 0);
        const totalExpenses = monthData.expenses.reduce((sum, item) => sum + item.actual, 0);
        const totalOut = totalBills + totalExpenses;
        const totalDebtsPaid = this.data.debts.reduce((sum, debt) => sum + debt.actualPayment, 0);
        const totalSavings = this.data.savings.reduce((sum, saving) => sum + saving.monthly, 0);
        
        const cashflowDifference = totalIncome - totalOut;

        // Update summary cards
        const totalIncomeEl = document.getElementById('totalIncome');
        if (totalIncomeEl) totalIncomeEl.textContent = this.formatCurrency(totalIncome);
        
        const totalExpensesEl = document.getElementById('totalExpenses');
        if (totalExpensesEl) totalExpensesEl.textContent = this.formatCurrency(totalOut);
        
        const totalDebtsPaidEl = document.getElementById('totalDebtsPaid');
        if (totalDebtsPaidEl) totalDebtsPaidEl.textContent = this.formatCurrency(totalDebtsPaid);
        
        const totalSavingsEl = document.getElementById('totalSavings');
        if (totalSavingsEl) totalSavingsEl.textContent = this.formatCurrency(totalSavings);

        // Update cashflow
        const cashflowInEl = document.getElementById('cashflowIn');
        if (cashflowInEl) cashflowInEl.textContent = this.formatCurrency(totalIncome);
        
        const cashflowOutEl = document.getElementById('cashflowOut');
        if (cashflowOutEl) cashflowOutEl.textContent = this.formatCurrency(totalOut);
        
        const cashflowDifferenceEl = document.getElementById('cashflowDifference');
        if (cashflowDifferenceEl) cashflowDifferenceEl.textContent = this.formatCurrency(cashflowDifference);

        // Update budget status
        const budgetStatus = document.getElementById('budgetStatus');
        if (budgetStatus) {
            if (cashflowDifference === 0) {
                budgetStatus.innerHTML = '<span class="status status--success">Perfect Zero-Based Budget</span>';
            } else if (cashflowDifference > 0) {
                budgetStatus.innerHTML = '<span class="status status--info">Surplus Budget</span>';
            } else {
                budgetStatus.innerHTML = '<span class="status status--error">Overspent Budget</span>';
            }
        }
    }

    renderCategoryChart() {
        const ctx = document.getElementById('categoryPieChart')?.getContext('2d');
        if (!ctx) return;

        if (this.charts.categoryPieChart) {
            this.charts.categoryPieChart.destroy();
        }

        const monthData = this.getMonthData(this.selectedMonth);
        const categoryTotals = {};

        // Combine bills and expenses
        [...monthData.bills, ...monthData.expenses].forEach(item => {
            categoryTotals[item.name] = item.actual;
        });

        const labels = Object.keys(categoryTotals);
        const data = Object.values(categoryTotals);
        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

        this.charts.categoryPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    renderIncomeExpenseChart() {
        const ctx = document.getElementById('incomeExpenseChart')?.getContext('2d');
        if (!ctx) return;

        if (this.charts.incomeExpenseChart) {
            this.charts.incomeExpenseChart.destroy();
        }

        const monthData = this.getMonthData(this.selectedMonth);
        const totalIncome = monthData.income.reduce((sum, item) => sum + item.actual, 0);
        const totalExpenses = monthData.bills.reduce((sum, item) => sum + item.actual, 0) + 
                              monthData.expenses.reduce((sum, item) => sum + item.actual, 0);

        this.charts.incomeExpenseChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Income', 'Expenses'],
                datasets: [{
                    label: 'Amount (₹)',
                    data: [totalIncome, totalExpenses],
                    backgroundColor: ['#1FB8CD', '#B4413C'],
                    borderColor: ['#1FB8CD', '#B4413C'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString('en-IN');
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Income Functions
    addIncome() {
        const income = {
            id: Date.now(),
            source: document.getElementById('incomeSource').value,
            expected: parseFloat(document.getElementById('expectedAmount').value),
            actual: parseFloat(document.getElementById('actualAmount').value),
            month: this.selectedMonth,
            category: document.getElementById('incomeCategory').value
        };

        this.data.income.push(income);
        this.saveData();
        
        document.getElementById('incomeForm').reset();
        this.showNotification('Income source added successfully!', 'success');
        this.renderIncome();
        this.updateDashboard();
    }

    renderIncome() {
        const tbody = document.getElementById('incomeTableBody');
        if (!tbody) return;

        const monthData = this.getMonthData(this.selectedMonth);
        
        if (monthData.income.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No income sources found for this month</td></tr>';
            return;
        }

        let totalExpected = 0;
        let totalActual = 0;

        tbody.innerHTML = monthData.income.map(income => {
            const difference = income.actual - income.expected;
            const performance = difference >= 0 ? 'positive' : 'negative';
            const performanceText = difference >= 0 ? 'Above Expected' : 'Below Expected';
            
            totalExpected += income.expected;
            totalActual += income.actual;

            return `
                <tr>
                    <td>
                        <div>
                            <strong>${income.source}</strong>
                            <br><small class="text-secondary">${income.category}</small>
                        </div>
                    </td>
                    <td class="currency">${this.formatCurrency(income.expected)}</td>
                    <td class="currency">${this.formatCurrency(income.actual)}</td>
                    <td class="currency ${performance === 'positive' ? 'text-success' : 'text-error'}">${this.formatCurrency(difference)}</td>
                    <td>
                        <span class="performance-indicator ${performance}">
                            ${performanceText}
                        </span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn--outline btn--small" onclick="financeManager.deleteIncome(${income.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        // Update totals
        const totalDifference = totalActual - totalExpected;
        const totalExpectedEl = document.getElementById('totalExpected');
        if (totalExpectedEl) totalExpectedEl.innerHTML = `<strong>${this.formatCurrency(totalExpected)}</strong>`;
        
        const totalActualEl = document.getElementById('totalActual');
        if (totalActualEl) totalActualEl.innerHTML = `<strong>${this.formatCurrency(totalActual)}</strong>`;
        
        const totalDifferenceEl = document.getElementById('totalDifference');
        if (totalDifferenceEl) totalDifferenceEl.innerHTML = `<strong class="${totalDifference >= 0 ? 'text-success' : 'text-error'}">${this.formatCurrency(totalDifference)}</strong>`;
    }

    deleteIncome(id) {
        if (confirm('Are you sure you want to delete this income source?')) {
            this.data.income = this.data.income.filter(item => item.id !== id);
            this.saveData();
            this.renderIncome();
            this.updateDashboard();
            this.showNotification('Income source deleted successfully!', 'success');
        }
    }

    // Expenses Functions
    addBill() {
        const bill = {
            id: Date.now(),
            name: document.getElementById('billName').value,
            budgeted: parseFloat(document.getElementById('billBudgeted').value),
            actual: parseFloat(document.getElementById('billActual').value),
            month: this.selectedMonth,
            category: "utilities"
        };

        this.data.bills.push(bill);
        this.saveData();
        
        document.getElementById('billForm').reset();
        this.showNotification('Bill added successfully!', 'success');
        this.renderExpenses();
        this.updateDashboard();
    }

    addExpense() {
        const expense = {
            id: Date.now(),
            name: document.getElementById('expenseName').value,
            budgeted: parseFloat(document.getElementById('expenseBudgeted').value),
            actual: parseFloat(document.getElementById('expenseActual').value),
            month: this.selectedMonth,
            category: "general"
        };

        this.data.expenses.push(expense);
        this.saveData();
        
        document.getElementById('expenseForm').reset();
        this.showNotification('Expense added successfully!', 'success');
        this.renderExpenses();
        this.updateDashboard();
    }

    renderExpenses() {
        this.renderBills();
        this.renderExpensesList();
    }

    renderBills() {
        const container = document.getElementById('billsList');
        if (!container) return;

        const monthData = this.getMonthData(this.selectedMonth);
        
        if (monthData.bills.length === 0) {
            container.innerHTML = '<div class="empty-state"><h4>No bills found</h4><p>Add your first bill to get started.</p></div>';
            return;
        }

        container.innerHTML = monthData.bills.map(bill => {
            const difference = bill.budgeted - bill.actual;
            const percentage = (bill.actual / bill.budgeted) * 100;

            return `
                <div class="bill-item">
                    <div class="bill-header">
                        <div class="bill-name">${bill.name}</div>
                        <div class="action-buttons">
                            <button class="btn btn--outline btn--small" onclick="financeManager.deleteBill(${bill.id})">Delete</button>
                        </div>
                    </div>
                    <div class="bill-amounts">
                        <div class="amount-info">
                            <div class="amount-label">Budgeted</div>
                            <div class="amount-value">${this.formatCurrency(bill.budgeted)}</div>
                        </div>
                        <div class="amount-info">
                            <div class="amount-label">Actual</div>
                            <div class="amount-value">${this.formatCurrency(bill.actual)}</div>
                        </div>
                        <div class="amount-info">
                            <div class="amount-label">Remaining</div>
                            <div class="amount-value ${difference >= 0 ? 'text-success' : 'text-error'}">${this.formatCurrency(Math.abs(difference))}</div>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill ${percentage > 100 ? 'over-budget' : percentage > 90 ? 'warning' : ''}" style="width: ${Math.min(percentage, 100)}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderExpensesList() {
        const container = document.getElementById('expensesList');
        if (!container) return;

        const monthData = this.getMonthData(this.selectedMonth);
        
        if (monthData.expenses.length === 0) {
            container.innerHTML = '<div class="empty-state"><h4>No expenses found</h4><p>Add your first expense to get started.</p></div>';
            return;
        }

        container.innerHTML = monthData.expenses.map(expense => {
            const difference = expense.budgeted - expense.actual;
            const percentage = (expense.actual / expense.budgeted) * 100;

            return `
                <div class="expense-item">
                    <div class="expense-header">
                        <div class="expense-name">${expense.name}</div>
                        <div class="action-buttons">
                            <button class="btn btn--outline btn--small" onclick="financeManager.deleteExpense(${expense.id})">Delete</button>
                        </div>
                    </div>
                    <div class="expense-amounts">
                        <div class="amount-info">
                            <div class="amount-label">Budgeted</div>
                            <div class="amount-value">${this.formatCurrency(expense.budgeted)}</div>
                        </div>
                        <div class="amount-info">
                            <div class="amount-label">Actual</div>
                            <div class="amount-value">${this.formatCurrency(expense.actual)}</div>
                        </div>
                        <div class="amount-info">
                            <div class="amount-label">Remaining</div>
                            <div class="amount-value ${difference >= 0 ? 'text-success' : 'text-error'}">${this.formatCurrency(Math.abs(difference))}</div>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill ${percentage > 100 ? 'over-budget' : percentage > 90 ? 'warning' : ''}" style="width: ${Math.min(percentage, 100)}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    deleteBill(id) {
        if (confirm('Are you sure you want to delete this bill?')) {
            this.data.bills = this.data.bills.filter(item => item.id !== id);
            this.saveData();
            this.renderExpenses();
            this.updateDashboard();
            this.showNotification('Bill deleted successfully!', 'success');
        }
    }

    deleteExpense(id) {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.data.expenses = this.data.expenses.filter(item => item.id !== id);
            this.saveData();
            this.renderExpenses();
            this.updateDashboard();
            this.showNotification('Expense deleted successfully!', 'success');
        }
    }

    // Savings Functions
    addSavings() {
        const savings = {
            id: Date.now(),
            name: document.getElementById('savingsName').value,
            target: parseFloat(document.getElementById('savingsTarget').value),
            current: parseFloat(document.getElementById('savingsCurrent').value),
            monthly: parseFloat(document.getElementById('savingsMonthly').value),
            targetDate: document.getElementById('savingsTargetDate').value
        };

        this.data.savings.push(savings);
        this.saveData();
        
        document.getElementById('savingsForm').reset();
        // Reset target date
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        document.getElementById('savingsTargetDate').value = futureDate.toISOString().slice(0, 10);
        
        this.showNotification('Savings goal added successfully!', 'success');
        this.renderSavings();
        this.updateDashboard();
    }

    renderSavings() {
        const container = document.getElementById('savingsList');
        if (!container) return;

        if (this.data.savings.length === 0) {
            container.innerHTML = '<div class="empty-state"><h4>No savings goals found</h4><p>Add your first savings goal to get started.</p></div>';
            return;
        }

        container.innerHTML = this.data.savings.map(saving => {
            const percentage = (saving.current / saving.target) * 100;
            const remaining = saving.target - saving.current;
            const monthsRemaining = Math.ceil(remaining / saving.monthly);
            const daysUntilTarget = Math.ceil((new Date(saving.targetDate) - new Date()) / (1000 * 60 * 60 * 24));

            return `
                <div class="card savings-goal">
                    <div class="savings-goal-header">
                        <div class="savings-goal-name">${saving.name}</div>
                        <div class="savings-goal-target">Target: ${this.formatCurrency(saving.target)} by ${this.formatDate(saving.targetDate)}</div>
                    </div>
                    <div class="savings-goal-body">
                        <div class="savings-stats">
                            <div class="savings-stat">
                                <div class="savings-stat-label">Progress</div>
                                <div class="savings-stat-value">${percentage.toFixed(1)}%</div>
                            </div>
                            <div class="savings-stat">
                                <div class="savings-stat-label">Saved</div>
                                <div class="savings-stat-value">${this.formatCurrency(saving.current)}</div>
                            </div>
                            <div class="savings-stat">
                                <div class="savings-stat-label">Remaining</div>
                                <div class="savings-stat-value">${this.formatCurrency(remaining)}</div>
                            </div>
                            <div class="savings-stat">
                                <div class="savings-stat-label">Days Left</div>
                                <div class="savings-stat-value">${daysUntilTarget > 0 ? daysUntilTarget : 'Overdue'}</div>
                            </div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.min(percentage, 100)}%"></div>
                        </div>
                        <div class="savings-actions">
                            <button class="btn btn--primary btn--small" onclick="financeManager.openUpdateSavingsModal(${saving.id})">Update Amount</button>
                            <button class="btn btn--outline btn--small" onclick="financeManager.deleteSavings(${saving.id})">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    openUpdateSavingsModal(savingsId) {
        document.getElementById('savingsId').value = savingsId;
        document.getElementById('additionalAmount').value = '';
        document.getElementById('addMoneyModal').classList.remove('hidden');
        
        setTimeout(() => {
            const additionalAmountEl = document.getElementById('additionalAmount');
            if (additionalAmountEl) additionalAmountEl.focus();
        }, 100);
    }

    updateSavings() {
        const savingsId = parseInt(document.getElementById('savingsId').value);
        const additionalAmount = parseFloat(document.getElementById('additionalAmount').value);
        
        if (!additionalAmount || additionalAmount <= 0) {
            this.showNotification('Please enter a valid amount', 'error');
            return;
        }
        
        const savings = this.data.savings.find(s => s.id === savingsId);
        if (savings) {
            savings.current += additionalAmount;
            this.saveData();
            this.closeModal();
            this.renderSavings();
            this.updateDashboard();
            this.showNotification(`Added ${this.formatCurrency(additionalAmount)} to ${savings.name}!`, 'success');
        }
    }

    deleteSavings(id) {
        if (confirm('Are you sure you want to delete this savings goal?')) {
            this.data.savings = this.data.savings.filter(item => item.id !== id);
            this.saveData();
            this.renderSavings();
            this.updateDashboard();
            this.showNotification('Savings goal deleted successfully!', 'success');
        }
    }

    // Debts Functions
    addDebt() {
        const debt = {
            id: Date.now(),
            name: document.getElementById('debtName').value,
            totalAmount: parseFloat(document.getElementById('debtTotal').value),
            monthlyGoal: parseFloat(document.getElementById('debtMonthlyGoal').value),
            actualPayment: parseFloat(document.getElementById('debtActualPayment').value),
            remainingBalance: parseFloat(document.getElementById('debtRemaining').value),
            interestRate: parseFloat(document.getElementById('debtInterestRate').value)
        };

        this.data.debts.push(debt);
        this.saveData();
        
        document.getElementById('debtForm').reset();
        this.showNotification('Debt added successfully!', 'success');
        this.renderDebts();
        this.updateDashboard();
    }

    renderDebts() {
        const container = document.getElementById('debtsList');
        if (!container) return;

        if (this.data.debts.length === 0) {
            container.innerHTML = '<div class="empty-state"><h4>No debts found</h4><p>Add your first debt to track payments.</p></div>';
            return;
        }

        container.innerHTML = this.data.debts.map(debt => {
            const paidAmount = debt.totalAmount - debt.remainingBalance;
            const paidPercentage = (paidAmount / debt.totalAmount) * 100;
            const monthsToPayoff = Math.ceil(debt.remainingBalance / debt.actualPayment);
            const paymentDifference = debt.actualPayment - debt.monthlyGoal;

            return `
                <div class="card debt-item">
                    <div class="debt-header">
                        <div class="debt-name">${debt.name}</div>
                        <div class="debt-rate">Interest Rate: ${debt.interestRate}%</div>
                    </div>
                    <div class="debt-body">
                        <div class="debt-stats">
                            <div class="debt-stat">
                                <div class="debt-stat-label">Total Debt</div>
                                <div class="debt-stat-value">${this.formatCurrency(debt.totalAmount)}</div>
                            </div>
                            <div class="debt-stat">
                                <div class="debt-stat-label">Remaining</div>
                                <div class="debt-stat-value">${this.formatCurrency(debt.remainingBalance)}</div>
                            </div>
                            <div class="debt-stat">
                                <div class="debt-stat-label">Monthly Goal</div>
                                <div class="debt-stat-value">${this.formatCurrency(debt.monthlyGoal)}</div>
                            </div>
                            <div class="debt-stat">
                                <div class="debt-stat-label">Actual Payment</div>
                                <div class="debt-stat-value ${paymentDifference >= 0 ? 'text-success' : 'text-error'}">${this.formatCurrency(debt.actualPayment)}</div>
                            </div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${paidPercentage}%"></div>
                        </div>
                        <div class="debt-info" style="text-align: center; margin-top: 12px;">
                            <small class="text-secondary">
                                ${paidPercentage.toFixed(1)}% paid • Estimated ${monthsToPayoff} months remaining
                            </small>
                        </div>
                        <div class="savings-actions">
                            <button class="btn btn--outline btn--small" onclick="financeManager.deleteDebt(${debt.id})">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    deleteDebt(id) {
        if (confirm('Are you sure you want to delete this debt?')) {
            this.data.debts = this.data.debts.filter(item => item.id !== id);
            this.saveData();
            this.renderDebts();
            this.updateDashboard();
            this.showNotification('Debt deleted successfully!', 'success');
        }
    }

    // Reports Functions
    renderReports() {
        this.renderCategorySpendingChart();
        this.renderAllocationChart();
        this.renderTrendsChart();
    }

    renderCategorySpendingChart() {
        const ctx = document.getElementById('categorySpendingChart')?.getContext('2d');
        if (!ctx) return;

        if (this.charts.categorySpendingChart) {
            this.charts.categorySpendingChart.destroy();
        }

        const monthData = this.getMonthData(this.selectedMonth);
        const categoryData = {};

        [...monthData.bills, ...monthData.expenses].forEach(item => {
            categoryData[item.name] = item.actual;
        });

        const labels = Object.keys(categoryData);
        const data = Object.values(categoryData);
        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

        this.charts.categorySpendingChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Spending (₹)',
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderColor: colors.slice(0, labels.length),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString('en-IN');
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    renderAllocationChart() {
        const ctx = document.getElementById('allocationChart')?.getContext('2d');
        if (!ctx) return;

        if (this.charts.allocationChart) {
            this.charts.allocationChart.destroy();
        }

        const monthData = this.getMonthData(this.selectedMonth);
        const bills = monthData.bills.reduce((sum, item) => sum + item.actual, 0);
        const expenses = monthData.expenses.reduce((sum, item) => sum + item.actual, 0);
        const savings = this.data.savings.reduce((sum, item) => sum + item.monthly, 0);
        const debts = this.data.debts.reduce((sum, item) => sum + item.actualPayment, 0);

        this.charts.allocationChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Bills', 'Expenses', 'Savings', 'Debts'],
                datasets: [{
                    data: [bills, expenses, savings, debts],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#5D878F', '#B4413C'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    renderTrendsChart() {
        const ctx = document.getElementById('trendsChart')?.getContext('2d');
        if (!ctx) return;

        if (this.charts.trendsChart) {
            this.charts.trendsChart.destroy();
        }

        // Generate data for last 6 months
        const months = [];
        const incomeData = [];
        const expenseData = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthStr = date.toISOString().slice(0, 7);
            const monthName = date.toLocaleDateString('en-US', { month: 'short' });
            
            months.push(monthName);
            
            const monthData = this.getMonthData(monthStr);
            const monthlyIncome = monthData.income.reduce((sum, item) => sum + item.actual, 0);
            const monthlyExpenses = monthData.bills.reduce((sum, item) => sum + item.actual, 0) + 
                                   monthData.expenses.reduce((sum, item) => sum + item.actual, 0);
            
            incomeData.push(monthlyIncome);
            expenseData.push(monthlyExpenses);
        }

        this.charts.trendsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Income',
                    data: incomeData,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Expenses',
                    data: expenseData,
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString('en-IN');
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    // Utility Functions
    getMonthData(month) {
        return {
            income: this.data.income.filter(item => item.month === month),
            bills: this.data.bills.filter(item => item.month === month),
            expenses: this.data.expenses.filter(item => item.month === month)
        };
    }

    closeModal() {
        const modal = document.getElementById('addMoneyModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    exportData() {
        const exportData = {
            income: this.data.income,
            bills: this.data.bills,
            expenses: this.data.expenses,
            savings: this.data.savings,
            debts: this.data.debts,
            exportDate: new Date().toISOString()
        };

        const csvContent = this.convertToCSV(exportData);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `finance_data_${new Date().toISOString().slice(0, 10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('Data exported successfully!', 'success');
    }

    convertToCSV(data) {
        const headers = ['Type', 'Name/Source', 'Amount/Target', 'Date/Month', 'Category', 'Notes'];
        const rows = [];

        // Income
        data.income.forEach(item => {
            rows.push([
                'Income',
                item.source,
                `₹${item.actual}`,
                item.month,
                item.category,
                `Expected: ₹${item.expected}`
            ]);
        });

        // Bills
        data.bills.forEach(item => {
            rows.push([
                'Bill',
                item.name,
                `₹${item.actual}`,
                item.month,
                item.category,
                `Budgeted: ₹${item.budgeted}`
            ]);
        });

        // Expenses
        data.expenses.forEach(item => {
            rows.push([
                'Expense',
                item.name,
                `₹${item.actual}`,
                item.month,
                item.category,
                `Budgeted: ₹${item.budgeted}`
            ]);
        });

        // Savings
        data.savings.forEach(item => {
            rows.push([
                'Savings',
                item.name,
                `₹${item.current}`,
                item.targetDate,
                'Savings Goal',
                `Target: ₹${item.target}, Monthly: ₹${item.monthly}`
            ]);
        });

        // Debts
        data.debts.forEach(item => {
            rows.push([
                'Debt',
                item.name,
                `₹${item.remainingBalance}`,
                'Ongoing',
                'Debt Payment',
                `Total: ₹${item.totalAmount}, Rate: ${item.interestRate}%, Payment: ₹${item.actualPayment}`
            ]);
        });

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');
        
        return csvContent;
    }

    showNotification(message, type = 'success') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        container.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.financeManager = new PersonalFinanceManager();
    });
} else {
    window.financeManager = new PersonalFinanceManager();
}