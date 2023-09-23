
import { createOrUpdateChart } from './graph.js';

let currentChart = null; // Variable para rastrear el gráfico actual
let currentInterval = 'max'; // Variable para rastrear el intervalo actual (inicialmente 'max')

// Función para obtener los datos de la criptomoneda y crear o actualizar el gráfico
function getChartData(searchTerm) {
    // Obtiene el valor del intervalo seleccionado
    const selectedInterval = currentInterval;

    // Crea la URL de la API con el término de búsqueda y el intervalo seleccionado
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${searchTerm}/market_chart?vs_currency=usd&days=${selectedInterval}&interval=daily&precision=full`;

    // Realiza la solicitud a la API
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw 'Error en la solicitud a la API';
            }
            return response.json();
        })
        .then((data) => {
            // Extraer solo los precios y las fechas de la respuesta
            const prices = data.prices.map((priceData) => priceData[1]);
            const date = data.prices.map((priceData) => new Date(priceData[0]));

            console.log(`Precios de ${searchTerm}:`, prices);
            document.getElementById('graphTitle').textContent = `Precio ${searchTerm}`;

            // Llama a la función createOrUpdateChart para crear o actualizar el gráfico
            createOrUpdateChart(date, prices, searchTerm);
        })
        .catch((error) => {
            console.error(`Error al obtener datos de mercado de ${searchTerm}:`, error);
            alert(`Se produjo un error, no pudimos encontrar la cripto que buscaste. Puedes intentar con otros intervalos de tiempo o monedas en el panel.`);
        });
}

// Maneja el clic en el botón de 7 días
const interval7DaysButton = document.getElementById('interval7Days');
interval7DaysButton.addEventListener('click', function () {
    currentInterval = '7'; // Cambia el intervalo a 7 días
    // Llama a la función getChartData para obtener los datos con el nuevo intervalo
    getChartData(document.getElementById('searchInput').value);
});

// Maneja el clic en el botón de 14 días
const interval14DaysButton = document.getElementById('interval14Days');
interval14DaysButton.addEventListener('click', function () {
    currentInterval = '14'; // Cambia el intervalo a 14 días
    // Llama a la función getChartData para obtener los datos con el nuevo intervalo
    getChartData(document.getElementById('searchInput').value);
});

// Maneja el clic en el botón de 30 días
const interval30DaysButton = document.getElementById('interval30Days');
interval30DaysButton.addEventListener('click', function () {
    currentInterval = '30'; // Cambia el intervalo a 30 días
    // Llama a la función getChartData para obtener los datos con el nuevo intervalo
    getChartData(document.getElementById('searchInput').value);
});

// Maneja el clic en el botón "Máx"
const intervalMaxButton = document.getElementById('intervalMax');
intervalMaxButton.addEventListener('click', function () {
    currentInterval = 'max'; // Cambia el intervalo a "max"
    // Llama a la función getChartData para obtener los datos con el nuevo intervalo
    getChartData(document.getElementById('searchInput').value);
});

// Escucha el clic en el botón de búsqueda
const searchButton = document.getElementById('searchCoin');
searchButton.addEventListener('click', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtiene el valor del input
    const searchTerm = document.getElementById('searchInput').value;

    // Llama a la función getChartData para obtener los datos y crear o actualizar el gráfico
    getChartData(searchTerm);

});
