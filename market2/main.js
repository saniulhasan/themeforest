// Function to format numbers with commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to update the last update time
function updateLastUpdateTime() {
    const now = new Date();
    document.getElementById('lastUpdate').textContent = now.toLocaleString();
}

// Mock data for the chart
const chartData = {
    labels: ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'XRP', 'DOT'],
    datasets: [{
        label: 'Price (USD)',
        data: [48000, 3200, 380, 1.8, 120, 0.9, 32],
        backgroundColor: 'rgba(98, 0, 234, 0.6)',
        borderColor: 'rgba(98, 0, 234, 1)',
        borderWidth: 1
    }]
};

// Create the chart
const ctx = document.getElementById('cryptoChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    callback: function(value, index, values) {
                        return '$' + value.toLocaleString();
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return '$' + context.parsed.y.toLocaleString();
                    }
                }
            }
        }
    }
});

// Mock data for the favorite coins table
const favoriteCoins = [
    { pair: 'BTC/USDT', coin: 'Bitcoin', lastPrice: 48000, change: 3.2, high: 49000, low: 47000, volume: 1500000 },
    { pair: 'ETH/USDT', coin: 'Ethereum', lastPrice: 3200, change: -0.8, high: 3300, low: 3100, volume: 800000 },
    { pair: 'BNB/USDT', coin: 'Binance Coin', lastPrice: 380, change: 1.5, high: 385, low: 375, volume: 300000 },
    { pair: 'ADA/USDT', coin: 'Cardano', lastPrice: 1.8, change: 4.2, high: 1.85, low: 1.75, volume: 150000 },
    { pair: 'SOL/USDT', coin: 'Solana', lastPrice: 120, change: 2.7, high: 122, low: 118, volume: 200000 },
    { pair: 'XRP/USDT', coin: 'Ripple', lastPrice: 0.9, change: -1.1, high: 0.92, low: 0.88, volume: 100000 },
    { pair: 'DOT/USDT', coin: 'Polkadot', lastPrice: 32, change: 0.6, high: 32.5, low: 31.5, volume: 80000 }
];

// Populate the favorite coins table
const tableBody = document.querySelector('#coinTable tbody');
favoriteCoins.forEach(coin => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${coin.pair}</td>
        <td>${coin.coin}</td>
        <td>$${numberWithCommas(coin.lastPrice.toFixed(2))}</td>
        <td class="${coin.change >= 0 ? 'positive' : 'negative'}">${coin.change.toFixed(2)}%</td>
        <td>$${numberWithCommas(coin.high.toFixed(2))}</td>
        <td>$${numberWithCommas(coin.low.toFixed(2))}</td>
        <td>${numberWithCommas(coin.volume)}</td>
    `;
    tableBody.appendChild(row);
});

// Update the last update time
updateLastUpdateTime();

// Update the last update time every 5 minutes
setInterval(updateLastUpdateTime, 5 * 60 * 1000);

