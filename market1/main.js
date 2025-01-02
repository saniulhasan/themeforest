// Mock data for the chart
const chartData = {
    labels: ['BTC', 'ETH', 'BNB', 'ADA', 'DOT', 'XRP', 'UNI'],
    datasets: [{
        label: 'Price (USD)',
        data: [45000, 3000, 350, 1.5, 30, 0.8, 25],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

// Create the chart
const ctx = document.getElementById('cryptoChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Mock data for the favorite coins table
const favoriteCoins = [
    { pair: 'BTC/USDT', coin: 'Bitcoin', lastPrice: 45000, change: 2.5, high: 46000, low: 44000, volume: 1000000 },
    { pair: 'ETH/USDT', coin: 'Ethereum', lastPrice: 3000, change: -1.2, high: 3100, low: 2900, volume: 500000 },
    { pair: 'BNB/USDT', coin: 'Binance Coin', lastPrice: 350, change: 0.8, high: 355, low: 345, volume: 200000 },
    { pair: 'ADA/USDT', coin: 'Cardano', lastPrice: 1.5, change: 3.2, high: 1.55, low: 1.45, volume: 100000 },
    { pair: 'DOT/USDT', coin: 'Polkadot', lastPrice: 30, change: -0.5, high: 31, low: 29, volume: 75000 }
];

// Populate the favorite coins table
const tableBody = document.querySelector('#coinTable tbody');
favoriteCoins.forEach(coin => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${coin.pair}</td>
        <td>${coin.coin}</td>
        <td>$${coin.lastPrice.toFixed(2)}</td>
        <td class="${coin.change >= 0 ? 'positive' : 'negative'}">${coin.change.toFixed(2)}%</td>
        <td>$${coin.high.toFixed(2)}</td>
        <td>$${coin.low.toFixed(2)}</td>
        <td>${coin.volume.toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
});

