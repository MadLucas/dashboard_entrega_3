// Función para obtener los datos de la API de CoinGecko y crear el gráfico de barras del volumen
async function fetchAndCreateChart() {
    try {
        // Realiza una solicitud a la API de CoinGecko para obtener información de las 10 principales criptomonedas
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en');
        const data = await response.json();

        // Extrae la información relevante (volumen) de las criptomonedas
        const cryptocurrencies = data.map(coin => ({
            name: coin.name,
            volume: coin.total_volume,
        }));

        // Extrae los nombres de las criptomonedas para etiquetas de gráfico
        const cryptoNames = cryptocurrencies.map(crypto => crypto.name);

        // Extrae los valores para el gráfico
        const cryptoVolumes = cryptocurrencies.map(crypto => crypto.volume);

        // Configuración del gráfico de barras del volumen
        const ctx = document.getElementById('cryptoVolumeChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: cryptoNames, // Nombres de las criptomonedas
                datasets: [{
                    label: 'Volumen (USD)',
                    data: cryptoVolumes, // Volumen de las criptomonedas
                    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color del gráfico
                    borderColor: 'rgba(54, 162, 235, 1)', // Color del borde del gráfico
                    borderWidth: 1
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
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
}

// Llama a la función para crear el gráfico de barras del volumen al cargar la página
window.onload = fetchAndCreateChart;

