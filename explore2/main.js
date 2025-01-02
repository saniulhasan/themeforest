// Sample data for cryptocurrencies
const cryptoData = [
    { pair: 'BTC/USDT', lastPrice: 50000, change: 2.5 },
    { pair: 'ETH/USDT', lastPrice: 3000, change: -1.2 },
    { pair: 'ADA/USDT', lastPrice: 2, change: 5.7 },
    { pair: 'DOT/USDT', lastPrice: 30, change: 3.8 },
    { pair: 'XRP/USDT', lastPrice: 1.5, change: -0.5 },
];

// Sample data for order book
const orderBookData = [
    { price: 50000, amount: 0.5, total: 25000 },
    { price: 49900, amount: 1.2, total: 59880 },
    { price: 49800, amount: 0.8, total: 39840 },
    { price: 50100, amount: 0.3, total: 15030 },
    { price: 50200, amount: 0.6, total: 30120 },
];

// Sample data for recent trades
const recentTradesData = [
    { time: '14:30:45', price: 50000, amount: 0.1 },
    { time: '14:30:30', price: 49950, amount: 0.2 },
    { time: '14:30:15', price: 50100, amount: 0.15 },
    { time: '14:30:00', price: 50050, amount: 0.05 },
    { time: '14:29:45', price: 49900, amount: 0.3 },
];

// Function to populate crypto table
function populateCryptoTable() {
    const tbody = document.getElementById('crypto-body');
    tbody.innerHTML = '';
    cryptoData.forEach(crypto => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = crypto.pair;
        row.insertCell(1).textContent = `$${crypto.lastPrice.toFixed(2)}`;
        const changeCell = row.insertCell(2);
        changeCell.textContent = `${crypto.change > 0 ? '+' : ''}${crypto.change.toFixed(2)}%`;
        changeCell.style.color = crypto.change >= 0 ? 'var(--secondary-color)' : 'var(--accent-color)';
    });
}

// Function to populate order book
function populateOrderBook() {
    const tbody = document.getElementById('order-body');
    tbody.innerHTML = '';
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
    tbody.innerHTML = '';
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
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(52, 152, 219, 0.5)');
    gradient.addColorStop(1, 'rgba(52, 152, 219, 0.0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'BTC Price',
                data: [45000, 47000, 48000, 49000, 51000, 50000, 52000],
                borderColor: 'rgb(52, 152, 219)',
                backgroundColor: gradient,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Event listeners for buttons
document.querySelectorAll('.time-filter').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelector('.time-filter.active').classList.remove('active');
        this.classList.add('active');
        // Here you would update the chart data based on the selected time frame
    });
});

document.querySelectorAll('.trade-type').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelector('.trade-type.active').classList.remove('active');
        this.classList.add('active');
        // Here you would update the trade options based on the selected type
    });
});

document.getElementById('buy-btn').addEventListener('click', () => {
    alert('Buy order placed!');
    // Here youwould handle the buy order
});

document.getElementById('sell-btn').addEventListener('click', () => {
    alert('Sell order placed!');
    // Here you would handle the sell order
});

// Function to handle search
document.getElementById('search-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('crypto-search').value.toLowerCase();
    const filteredData = cryptoData.filter(crypto => 
        crypto.pair.toLowerCase().includes(searchTerm)
    );
    populateCryptoTable(filteredData);
});

// Initialize the page
window.addEventListener('load', () => {
    populateCryptoTable();
    populateOrderBook();
    populateRecentTrades();
    initChart();
});

// Simulating real-time updates
setInterval(() => {
    // Update crypto prices
    cryptoData.forEach(crypto => {
        crypto.lastPrice += (Math.random() - 0.5) * 100;
        crypto.change = (Math.random() - 0.5) * 2;
    });
    populateCryptoTable();

    // Update order book
    orderBookData.pop();
    orderBookData.unshift({
        price: 50000 + (Math.random() - 0.5) * 200,
        amount: Math.random() * 2,
        total: Math.random() * 50000
    });
    populateOrderBook();

    // Update recent trades
    recentTradesData.pop();
    recentTradesData.unshift({
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        price: 50000 + (Math.random() - 0.5) * 200,
        amount: Math.random()
    });
    populateRecentTrades();
}, 5000);

