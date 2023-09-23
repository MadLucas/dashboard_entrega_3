// Obtener el contexto del gráfico
const ctx = document.getElementById('cryptoChart').getContext('2d');

// Hacer una solicitud a la API de CoinGecko para obtener la lista de criptomonedas
fetch('https://api.coingecko.com/api/v3/coins/list?include_platform=true')
    .then(response => response.json())
    .then(data => {
        // Extraer los nombres únicos de las criptomonedas hasta un máximo de 10
        const uniqueCryptoNames = [];
        data.forEach(crypto => {
            const platformNames = Object.keys(crypto.platforms);
            if (platformNames.length > 0 && uniqueCryptoNames.length < 10) {
                const cryptoName = platformNames[0];
                if (!uniqueCryptoNames.includes(cryptoName)) {
                    uniqueCryptoNames.push(cryptoName);
                }
            }
        });

        // Crear un gráfico de barras con Chart.js
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: uniqueCryptoNames,
                datasets: [{
                    label: 'Nombres de Criptomonedas',
                    data: Array(uniqueCryptoNames.length).fill(1), // Utilizamos 1 para todas las barras
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo
                    borderColor: 'rgba(75, 192, 192, 1)', // Color del borde
                    borderWidth: 1, // Ancho del borde
                }]
            },
            options: {
                scales: {
                    x: {
                        display: false // Ocultar la escala X
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error al obtener datos de la API:', error));
