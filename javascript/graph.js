
let currentChart = null; // Variable para rastrear el gráfico actual



export function createOrUpdateChart(date, prices, label, searchTerm) {
    // Si es que hay un grafico, lo destruimos antes de crear uno nuevo
    if (currentChart) {
        currentChart.destroy();
    }

    // Obtén el elemento canvas
    const ctx = document.getElementById('btc-chart');

    // Crea el nuevo gráfico
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date,
            datasets: [{
                label: label,
                data: prices,
                fill: true,
                borderColor: 'darkblue',
                borderWidth: 1,
                pointBackgroundColor: `red`
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    display: false,
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

