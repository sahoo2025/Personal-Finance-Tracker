/* ============================================
   Personal Finance Tracker - JavaScript
   ============================================ */

// DOM Elements
const expenseForm = document.getElementById('expenseForm');
const budgetForm = document.getElementById('budgetForm');
const expenseTableBody = document.getElementById('expenseTableBody');
const noExpenses = document.getElementById('noExpenses');
const totalBudget = document.getElementById('totalBudget');
const totalExpenses = document.getElementById('totalExpenses');
const remainingBalance = document.getElementById('remainingBalance');
const budgetWarning = document.getElementById('budgetWarning');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const themeToggle = document.getElementById('themeToggle');
const exportBtn = document.getElementById('exportBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const editModal = document.getElementById('editModal');
const closeModal = document.getElementById('closeModal');
const cancelEdit = document.getElementById('cancelEdit');
const editExpenseForm = document.getElementById('editExpenseForm');

// Chart instances
let pieChart = null;
let barChart = null;

// Data
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let budget = parseFloat(localStorage.getItem('budget')) || 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Set default date to today
    document.getElementById('expenseDate').valueAsDate = new Date();
    
    // Load saved theme
    loadTheme();
    
    // Update UI
    updateSummary();
    renderExpenses();
    updateCharts();
    
    // Event Listeners
    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
    // Expense Form
    expenseForm.addEventListener('submit', handleExpenseSubmit);
    
    // Budget Form
    budgetForm.addEventListener('submit', handleBudgetSubmit);
    
    // Search and Filter
    searchInput.addEventListener('input', filterExpenses);
    categoryFilter.addEventListener('change', filterExpenses);
    
    // Theme Toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Export CSV
    exportBtn.addEventListener('click', exportToCSV);
    
    // Modal
    closeModal.addEventListener('click', closeEditModal);
    cancelEdit.addEventListener('click', closeEditModal);
    editExpenseForm.addEventListener('submit', handleEditSubmit);
    
    // Close modal on outside click
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            closeEditModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && editModal.classList.contains('active')) {
            closeEditModal();
        }
    });
}

// Expense Management
function handleExpenseSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('expenseTitle').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;
    const date = document.getElementById('expenseDate').value;
    
    if (!title || !amount || !category || !date) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    const expense = {
        id: Date.now(),
        title,
        amount,
        category,
        date
    };
    
    expenses.unshift(expense);
    saveExpenses();
    renderExpenses();
    updateSummary();
    updateCharts();
    
    expenseForm.reset();
    document.getElementById('expenseDate').valueAsDate = new Date();
    
    showToast('Expense added successfully!', 'success');
}

function deleteExpense(id) {
    if (confirm('Are you sure you want to delete this expense?')) {
        expenses = expenses.filter(expense => expense.id !== id);
        saveExpenses();
        renderExpenses();
        updateSummary();
        updateCharts();
        showToast('Expense deleted successfully!', 'success');
    }
}

function editExpense(id) {
    const expense = expenses.find(exp => exp.id === id);
    if (!expense) return;
    
    document.getElementById('editExpenseId').value = expense.id;
    document.getElementById('editTitle').value = expense.title;
    document.getElementById('editAmount').value = expense.amount;
    document.getElementById('editCategory').value = expense.category;
    document.getElementById('editDate').value = expense.date;
    
    editModal.classList.add('active');
}

function handleEditSubmit(e) {
    e.preventDefault();
    
    const id = parseInt(document.getElementById('editExpenseId').value);
    const title = document.getElementById('editTitle').value.trim();
    const amount = parseFloat(document.getElementById('editAmount').value);
    const category = document.getElementById('editCategory').value;
    const date = document.getElementById('editDate').value;
    
    if (!title || !amount || !category || !date) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    const expenseIndex = expenses.findIndex(exp => exp.id === id);
    if (expenseIndex !== -1) {
        expenses[expenseIndex] = {
            id,
            title,
            amount,
            category,
            date
        };
        
        saveExpenses();
        renderExpenses();
        updateSummary();
        updateCharts();
        closeEditModal();
        showToast('Expense updated successfully!', 'success');
    }
}

function closeEditModal() {
    editModal.classList.remove('active');
    editExpenseForm.reset();
}

// Budget Management
function handleBudgetSubmit(e) {
    e.preventDefault();
    
    const budgetAmount = parseFloat(document.getElementById('budgetAmount').value);
    
    if (!budgetAmount || budgetAmount <= 0) {
        showToast('Please enter a valid budget amount', 'error');
        return;
    }
    
    budget = budgetAmount;
    localStorage.setItem('budget', budget);
    updateSummary();
    
    budgetForm.reset();
    showToast('Budget set successfully!', 'success');
}

// Render Functions
function renderExpenses(filteredExpenses = null) {
    const expensesToRender = filteredExpenses || expenses;
    
    if (expensesToRender.length === 0) {
        expenseTableBody.innerHTML = '';
        noExpenses.style.display = 'block';
        return;
    }
    
    noExpenses.style.display = 'none';
    
    expenseTableBody.innerHTML = expensesToRender.map(expense => `
        <tr>
            <td>${escapeHtml(expense.title)}</td>
            <td class="amount">$${expense.amount.toFixed(2)}</td>
            <td><span class="category category-${expense.category}">${expense.category}</span></td>
            <td>${formatDate(expense.date)}</td>
            <td class="actions">
                <button class="btn btn-edit" onclick="editExpense(${expense.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger" onclick="deleteExpense(${expense.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
    `).join('');
}

function updateSummary() {
    const totalExpenseAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remaining = budget - totalExpenseAmount;
    
    totalBudget.textContent = `$${budget.toFixed(2)}`;
    totalExpenses.textContent = `$${totalExpenseAmount.toFixed(2)}`;
    remainingBalance.textContent = `$${remaining.toFixed(2)}`;
    
    // Update remaining balance color
    if (remaining < 0) {
        remainingBalance.style.color = '#ef4444';
        budgetWarning.style.display = 'flex';
    } else {
        remainingBalance.style.color = '#10b981';
        budgetWarning.style.display = 'none';
    }
}

// Filter Functions
function filterExpenses() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    
    let filtered = expenses;
    
    if (searchTerm) {
        filtered = filtered.filter(expense => 
            expense.title.toLowerCase().includes(searchTerm)
        );
    }
    
    if (category && category !== 'all') {
        filtered = filtered.filter(expense => 
            expense.category === category
        );
    }
    
    renderExpenses(filtered);
}

// Charts
function updateCharts() {
    updatePieChart();
    updateBarChart();
}

function updatePieChart() {
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    // Calculate category totals
    const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});
    
    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    
    const colors = {
        'Food': '#10b981',
        'Travel': '#3b82f6',
        'Shopping': '#f59e0b',
        'Bills': '#ef4444',
        'Entertainment': '#8b5cf6',
        'Others': '#64748b'
    };
    
    const backgroundColors = labels.map(label => colors[label] || '#64748b');
    
    if (pieChart) {
        pieChart.destroy();
    }
    
    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

function updateBarChart() {
    const ctx = document.getElementById('barChart').getContext('2d');
    
    // Group expenses by month
    const monthlyExpenses = expenses.reduce((acc, expense) => {
        const month = new Date(expense.date).toLocaleString('default', { month: 'short', year: 'numeric' });
        acc[month] = (acc[month] || 0) + expense.amount;
        return acc;
    }, {});
    
    const labels = Object.keys(monthlyExpenses);
    const data = Object.values(monthlyExpenses);
    
    if (barChart) {
        barChart.destroy();
    }
    
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monthly Spending',
                data: data,
                backgroundColor: 'rgba(99, 102, 241, 0.8)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
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

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    const icon = themeToggle.querySelector('i');
    icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    
    // Update charts for dark mode
    updateCharts();
}

function loadTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.className = 'fas fa-sun';
    }
}

// CSV Export
function exportToCSV() {
    if (expenses.length === 0) {
        showToast('No expenses to export', 'error');
        return;
    }
    
    const headers = ['Title', 'Amount', 'Category', 'Date'];
    const csvContent = [
        headers.join(','),
        ...expenses.map(expense => 
            `"${expense.title}",${expense.amount},"${expense.category}","${expense.date}"`
        )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('CSV exported successfully!', 'success');
}

// Toast Notifications
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    
    if (type === 'error') {
        toast.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        toast.querySelector('i').className = 'fas fa-exclamation-circle';
    } else {
        toast.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        toast.querySelector('i').className = 'fas fa-check-circle';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// LocalStorage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Utility Functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions globally available
window.editExpense = editExpense;
window.deleteExpense = deleteExpense;
