// Sample data structure
const marketData = [
    {
        ticker: 'BTCUSDT.P',
        price: 97096.9,
        changePercent: 2.66,
        change: 2515.8,
        high: 97822.4,
        low: 94357.4,
        volume: '175.78K',
        volumeUSD: '17.36B',
        volumeChange: 101.08,
        rating: 'Buy',
        exchange: 'BINANCE'
    },
    {
        ticker: 'ETHUSDT.P',
        price: 3451.16,
        changePercent: 2.73,
        change: 91.87,
        high: 3511.14,
        low: 3353.50,
        volume: '2.3M',
        volumeUSD: '8.17B',
        volumeChange: 91.43,
        rating: 'Neutral',
        exchange: 'BINANCE'
    }
    // Add more sample data as needed
];

function formatNumber(num) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
}

function createTickerCell(ticker) {
    return `
        <div class="ticker-cell">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F7931A'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23F7931A'/%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' fill='white'/%3E%3C/svg%3E" alt="${ticker}">
            ${ticker}
        </div>
    `;
}

function populateMarketData() {
    const tableBody = document.getElementById('market-data');
    tableBody.innerHTML = marketData.map(item => `
        <tr>
            <td>${createTickerCell(item.ticker)}</td>
            <td>${formatNumber(item.price)}</td>
            <td class="positive">+${item.changePercent}%</td>
            <td class="positive">+${item.change}</td>
            <td>${formatNumber(item.high)}</td>
            <td>${formatNumber(item.low)}</td>
            <td>${item.volume}</td>
            <td>${item.volumeUSD}</td>
            <td class="positive">${item.volumeChange}%</td>
            <td class="${item.rating.toLowerCase()}">${item.rating}</td>
            <td class="exchange-cell">${item.exchange}</td>
        </tr>
    `).join('');
}

// Initialize the table
document.addEventListener('DOMContentLoaded', () => {
    populateMarketData();
});

// Add click handlers for tabs and filters
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelector('.tab.active').classList.remove('active');
        tab.classList.add('active');
    });
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
    });
});

// Simulate real-time updates
setInterval(() => {
    marketData.forEach(item => {
        item.price += (Math.random() - 0.5) * 100;
        item.changePercent += (Math.random() - 0.5);
        item.change += (Math.random() - 0.5) * 10;
    });
    populateMarketData();
}, 5000);