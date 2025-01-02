// Sample data for cryptocurrencies
const cryptoData = [
    { pair: 'BTC/USDT', lastPrice: 50000, change: 2.5 },
    { pair: 'ETH/USDT', lastPrice: 3000, change: -1.2 },
    { pair: 'ADA/USDT', lastPrice: 2, change: 5.7 },
    // Add more crypto pairs here
];

// Sample data for order book
const orderBookData = [
    { price: 50000, amount: 0.5, total: 25000 },
    { price: 49900, amount: 1.2, total: 59880 },
    { price: 49800, amount: 0.8, total: 39840 },
    // Add more orders here
];

// Sample data for recent trades
const recentTradesData = [
    { time: '14:30:45', price: 50000, amount: 0.1 },
    { time: '14:30:30', price: 49950, amount: 0.2 },
    { time: '14:30:15', price: 50100, amount: 0.15 },
    // Add more trades here
];

// Function to populate crypto table
function populateCryptoTable() {
    const tbody = document.getElementById('crypto-body');
    cryptoData.forEach(crypto => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = crypto.pair;
        row.insertCell(1).textContent = crypto.lastPrice.toFixed(2);
        const changeCell = row.insertCell(2);
        changeCell.textContent = crypto.change.toFixed(2) + '%';
        changeCell.style.color = crypto.change >= 0 ? 'green' : 'red';
    });
}

// Function to populate order book
function populateOrderBook() {
    const tbody = document.getElementById('order-body');
    orderBookData.forEach(order => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = order.price.toFixed(2);
        row.insertCell(1).textContent = order.amount.toFixed(4);
        row.insertCell(2).textContent = order.total.toFixed(2);
    });
}

// Function to populate recent trades
function populateRecentTrades() {
    const tbody = document.getElementById('trades-body');
    recentTradesData.forEach(trade => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = trade.time;
        row.insertCell(1).textContent = trade.price.toFixed(2);
        row.insertCell(2).textContent = trade.amount.toFixed(4);
    });
}

// Function to initialize chart
function initChart() {
    const ctx = document.getElementById('crypto-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'BTC Price',
                data: [45000, 47000, 48000, 49000, 51000, 50000, 52000],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Event listeners for buttons
document.querySelectorAll('.time-filter').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelector('.time-filter.active')?.classList.remove('active');
        this.classList.add('active');
        // Here you would update the chart data based on the selected time frame
    });
});

document.querySelectorAll('.trade-type').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelector('.trade-type.active')?.classList.remove('active');
        this.classList.add('active');
        // Here you would update the trade options based on the selected type
    });
});

document.getElementById('buy-btn').addEventListener('click', () => {
    alert('Buy order placed!');
    // Here you would handle the buy order
});

document.getElementById('sell-btn').addEventListener('click', () => {
    alert('Sell order placed!');
    // Here you would handle the sell order
});

// Initialize the page
window.addEventListener('load', () => {
    populateCryptoTable();
    populateOrderBook();
    populateRecentTrades();
    initChart();
});