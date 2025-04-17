const ctx = document.getElementById('stock-chart').getContext('2d');
const apiKey = 'J8cxTzOYjRHQznZeTWAhTN1SeiNokJpU';
const symbol = 'TSLA';

function showLoader() {
    document.getElementById('chart-loader').style.display = 'block';
    document.getElementById('stock-chart').style.display = 'none';
}

function hideLoader() {
    document.getElementById('chart-loader').style.display = 'none';
    document.getElementById('stock-chart').style.display = 'block';
}

async function fetchStockData() {
    showLoader(); // Show the loader during the fetch

    const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=${apiKey}`);
    const data = await response.json();

    // Ensure the data fetched is recent; slice the last 30 days from the data
    const historical = data.historical.slice(-30); // Take the last 30 data points
    const labels = historical.map(point => point.date).reverse();  // Reverse to have the latest data first
    const prices = historical.map(point => point.close).reverse();

    // Create the chart
    const stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Stock Price (${symbol})`,
                data: prices,
                borderColor: 'rgb(75, 192, 192)',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    hideLoader(); // Hide loader after chart is rendered
}

fetchStockData();
let stockChart; // make chart accessible globally

async function handleSearch() {
    const symbol = document.getElementById('stockInput').value.toUpperCase();
    if (!symbol) return;

    await fetchStockData(symbol);
}

async function fetchStockData(symbol) {
    showLoader(); // if using a loader

    const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=${apiKey}`);
    const data = await response.json();

    const historical = data.historical?.slice(-30).reverse();
    const labels = historical.map(point => point.date);
    const prices = historical.map(point => point.close);

    if (stockChart) stockChart.destroy(); // destroy previous chart

    stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Stock Price (${symbol})`,
                data: prices,
                borderColor: 'rgb(75, 192, 192)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    hideLoader(); // if using a loader
}
