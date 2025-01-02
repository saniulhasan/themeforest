// Sample data for cryptocurrencies
const cryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 50000, change: 2.5 },
    { symbol: 'ETH', name: 'Ethereum', price: 3000, change: -1.2 },
    { symbol: 'ADA', name: 'Cardano', price: 2, change: 5.7 },
    { symbol: 'DOT', name: 'Polkadot', price: 30, change: 3.8 },
    { symbol: 'XRP', name: 'Ripple', price: 1.5, change: -0.5 },
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

// Sample news data
const newsData = [
    { title: 'Bitcoin Surges Past $50,000', content: 'Bitcoin has broken through the $50,000 mark, reaching its highest level in over a year...' },
    { title: 'Ethereum 2.0 Upgrade on Track', content: 'The long-awaited Ethereum 2.0 upgrade is progressing as planned, with developers confirming a successful test on the Goerli testnet...' },
    { title: 'Regulatory Clarity Boosts Crypto Market', content: 'New regulations providing clear guidelines for cryptocurrency operations have been welcomed by the market, leading to increased institutional interest...' },
];

// Function to populate price ticker
function populatePriceTicker() {
    const ticker = document.getElementById('price-ticker');
    ticker.innerHTML = '';
    cryptoData.forEach(crypto => {
        const priceItem = document.createElement('div');
        priceItem.className = 'price-item';
        priceItem.innerHTML = `
            <img src="/placeholder.svg?height=24&width=24" alt="${crypto.name} logo">
            <span>${crypto.symbol}: $${crypto.price.toFixed(2)} </span>
            <span style="color: ${crypto.change >= 0 ? 'var(--success-color)' : 'var(--danger-color)'}">
                ${crypto.change > 0 ? '+' : ''}${crypto.change.toFixed(2)}%
            </span>
        `;
        ticker.appendChild(priceItem);
    });
}

// Function to populate order book
function populateOrderBook() {
    const tbody = document.getElementById('order-body');
    tbody.innerHTML = '';
    orderBookData.forEach(order => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent= order.price.toFixed(2);
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
    gradient.addColorStop(0, 'rgba(108, 92, 231, 0.5)');
    gradient.addColorStop(1, 'rgba(108, 92, 231, 0.0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'BTC Price',
                data: [45000, 47000, 48000, 49000, 51000, 50000, 52000],
                borderColor: 'rgb(108, 92, 231)',
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

// Function to populate news
function populateNews() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    newsData.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h4>${news.title}</h4>
            <p>${news.content}</p>
        `;
        newsContainer.appendChild(newsItem);
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

// Calculate total when price or amount changes
document.getElementById('price').addEventListener('input', calculateTotal);
document.getElementById('amount').addEventListener('input', calculateTotal);

function calculateTotal() {
    const price = parseFloat(document.getElementById('price').value) || 0;
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    document.getElementById('total').value = (price * amount).toFixed(2);
}

document.getElementById('buy-btn').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Buy order placed!');
    // Here you would handle the buy order
});

document.getElementById('sell-btn').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Sell order placed!');
    // Here you would handle the sell order
});

// Initialize the page
window.addEventListener('load', () => {
    populatePriceTicker();
    populateOrderBook();
    populateRecentTrades();
    initChart();
    populateNews();
});

// Simulating real-time updates
setInterval(() => {
    // Update crypto prices
    cryptoData.forEach(crypto => {
        crypto.price += (Math.random() - 0.5) * 100;
        crypto.change = (Math.random() - 0.5) * 2;
    });
    populatePriceTicker();

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

