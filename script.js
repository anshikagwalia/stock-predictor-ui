// === Stock Ticker Scroll Script ===

const apiKey = 'J8cxTzOYjRHQznZeTWAhTN1SeiNokJpU';
const popularStocks = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'META'];

async function fetchStockPrices() {
    try {
        const responses = await Promise.all(
            popularStocks.map(symbol =>
                fetch(`https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=${apiKey}`)
            )
        );

        const data = await Promise.all(responses.map(res => res.json()));

        const results = data.map((item, index) => {
            const stock = item[0]; // each API call returns an array with one object
            return `${popularStocks[index]}: $${stock.price.toFixed(2)}`;
        });

        const tickerElement = document.getElementById('stock-ticker');
        tickerElement.innerHTML = results.join(' ⚫ ');
    } catch (error) {
        console.error("Error fetching stock prices:", error);
    }
}

// Call the function when page loads
fetchStockPrices();

// Optional: refresh prices every 60 seconds
setInterval(fetchStockPrices, 60000);
