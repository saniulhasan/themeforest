// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

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
        data: [50000, 3500, 400, 2.1, 150, 1.1, 35],
        backgroundColor: 'rgba(52, 152, 219, 0.6)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 1
    }]
};

// Create the chart
const ctx = document.getElementById('cryptoChart').getContext('2d');
const cryptoChart = new Chart(ctx, {
    type: 'bar',
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
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const value = context.raw;
                        const change = (Math.random() * 10 - 5).toFixed(2); // Random change between -5% and 5%
                        return [
                            `Price: $${value.toLocaleString()}`,
                            `Change: ${change}%`
                        ];
                    }
                }
            }
        }
    }
});

// Mock data for the favorite coins table
const favoriteCoins = [
    { pair: 'BTC/USDT', coin: 'Bitcoin', lastPrice: 50000, change: 3.5, high: 51000, low: 49000, volume: 2000000 },
    { pair: 'ETH/USDT', coin: 'Ethereum', lastPrice: 3500, change: -1.2, high: 3600, low: 3400, volume: 1000000 },
    { pair: 'BNB/USDT', coin: 'Binance Coin', lastPrice: 400, change: 2.1, high: 410, low: 395, volume: 500000 },
    { pair: 'ADA/USDT', coin: 'Cardano', lastPrice: 2.1, change: 4.8, high: 2.2, low: 2.0, volume: 300000 },
    { pair: 'SOL/USDT', coin: 'Solana', lastPrice: 150, change: 6.2, high: 155, low: 145, volume: 400000 },
    { pair: 'XRP/USDT', coin: 'Ripple', lastPrice: 1.1, change: -0.9, high: 1.15, low: 1.05, volume: 200000 },
    { pair: 'DOT/USDT', coin: 'Polkadot', lastPrice: 35, change: 1.4, high: 36, low: 34, volume: 150000 }
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

// Update the last update time and chart data every minute
setInterval(() => {
    updateLastUpdateTime();
    
    // Update chart data with random changes
    cryptoChart.data.datasets[0].data = cryptoChart.data.datasets[0].data.map(value => {
        const change = (1 + (Math.random() * 0.1 - 0.05)) // Random change between -5% and 5%
        return value * change;
    });
    cryptoChart.update();
}, 60 * 1000);

