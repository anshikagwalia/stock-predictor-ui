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
document.addEventListener("DOMContentLoaded", function () {
    const tips = [
        "💡 Did you know? The stock market tends to perform better in the winter months.",
        "📊 A diversified portfolio helps reduce risk!",
        "📈 Historically, the S&P 500 returns about 10% annually.",
        "💸 Never invest money you can't afford to lose.",
        "🔍 Research before you invest in any stock!"
    ];

    let tipIndex = 0;
    const funFactElement = document.getElementById("fun-fact");

    function rotateTip() {
        funFactElement.style.opacity = 0; // Fade out
        setTimeout(() => {
            funFactElement.textContent = tips[tipIndex]; // Change the tip text
            funFactElement.style.opacity = 1; // Fade in
            tipIndex = (tipIndex + 1) % tips.length; // Update the index, looping back to the first tip
        }, 500); // Time for fade-out before content change
    }

    setInterval(rotateTip, 5000); // Call rotateTip every 5 seconds
    rotateTip(); // Start immediately when the page loads
});
document.addEventListener("DOMContentLoaded", function() {
    const predictions = [
        { stock: "Tesla (TSLA)", prediction: "Buy 🔼", risk: "Medium" },
        { stock: "Apple (AAPL)", prediction: "Hold ⏸", risk: "Low" },
        { stock: "Microsoft (MSFT)", prediction: "Sell 🔽", risk: "High" },
        { stock: "Google (GOOGL)", prediction: "Buy 🔼", risk: "Medium" },
        { stock: "Amazon (AMZN)", prediction: "Hold ⏸", risk: "Low" }
    ];

    const predictionContainer = document.getElementById("prediction-container");

    // Function to create a prediction card
    function createPredictionCard(stock, prediction, risk) {
        const card = document.createElement("div");
        card.classList.add("prediction-card");

        card.innerHTML = `
            <h3>${stock}</h3>
            <p><strong>Prediction:</strong> <span class="status">${prediction}</span></p>
            <p><strong>Risk Level:</strong> ${risk}</p>
        `;
        
        // Append the card to the container
        predictionContainer.appendChild(card);
    }

    // Generate prediction cards
    predictions.forEach(prediction => {
        createPredictionCard(prediction.stock, prediction.prediction, prediction.risk);
    });

});

// Call the function when page loads
fetchStockPrices();

// Optional: refresh prices every 60 seconds
setInterval(fetchStockPrices, 60000);
// === Real-time Line Chart for TSLA ===

const ctx = document.getElementById('live-chart').getContext('2d');
let timestamps = [];
let prices = [];

const liveChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timestamps,
        datasets: [{
            label: 'TSLA Price (USD)',
            data: prices,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        animation: false,
        scales: {
            x: {
                title: { display: true, text: 'Time' }
            },
            y: {
                beginAtZero: false,
                title: { display: true, text: 'Price ($)' }
            }
        }
    }
});

