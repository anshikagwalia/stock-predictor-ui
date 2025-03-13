// Placeholder for the stock chart
const ctx = document.getElementById('stock-chart').getContext('2d');

// Sample data for the stock chart
const stockChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
            label: 'Stock Price (Tesla)',
            data: [650, 680, 700, 730, 750, 780, 800, 820, 850],
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
