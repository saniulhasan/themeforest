const API_URL = 'https://api.coingecko.com/api/v3';

async function fetchMarketData() {
    try {
        const response = await fetch(`${API_URL}/global`);
        const data = await response.json();
        
        document.getElementById('total-market-cap').textContent = formatCurrency(data.data.total_market_cap.usd);
        document.getElementById('total-volume').textContent = formatCurrency(data.data.total_volume.usd);
        document.getElementById('btc-dominance').textContent = data.data.market_cap_percentage.btc.toFixed(2) + '%';
    } catch (error) {
        console.error('Error fetching market data:', error);
    }
}

async function fetchTopCryptos() {
    try {
        const response = await fetch(`${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`);
        const data = await response.json();
        
        const cryptoList = document.getElementById('crypto-list');
        cryptoList.innerHTML = '';

        data.forEach(crypto => {
            const card = createCryptoCard(crypto);
            cryptoList.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching top cryptos:', error);
    }
}

function createCryptoCard(crypto) {
    const card = document.createElement('div');
    card.className = 'crypto-card';

    const priceChangeClass = crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative';
    const priceChangeSymbol = crypto.price_change_percentage_24h >= 0 ? '▲' : '▼';

    card.innerHTML = `
        <h2><img src="${crypto.image}" alt="${crypto.name}"> ${crypto.name} (${crypto.symbol.toUpperCase()})</h2>
        <p>Price: ${formatCurrency(crypto.current_price)}</p>
        <p>Market Cap: ${formatCurrency(crypto.market_cap)}</p>
        <p>24h Volume: ${formatCurrency(crypto.total_volume)}</p>
        <p class="price-change ${priceChangeClass}">
            24h Change: ${priceChangeSymbol} ${Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
        </p>
    `;

    return card;
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

// Fetch data on page load
fetchMarketData();
fetchTopCryptos();

// Refresh data every 60 seconds
setInterval(() => {
    fetchMarketData();
    fetchTopCryptos();
}, 60000);