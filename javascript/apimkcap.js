

const apiUrl = 'https://api.coingecko.com/api/v3/global';

fetch(apiUrl)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then((data) => {
        const marketCapPercentageData = data.data.market_cap_percentage;
        const cryptocurrencies = Object.keys(marketCapPercentageData);
        const percentages = Object.values(marketCapPercentageData);
        const colors = [
            'darkred', 'blue', 'green', 'orange', 'purple',
            'pink', 'cyan', 'yellow', 'magenta', 'grey'
        ];

        const ctx = document.getElementById('pieChart').getContext('2d');

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: cryptocurrencies, // Nombres de las criptomonedas
                datasets: [{
                    data: percentages, // Porcentajes
                    backgroundColor: colors, // Colores
                    borderWidth: 0,
                    
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
            }
        });
    })
    .catch((error) => {
        console.error('Error al obtener datos globales:', error);
    });
