
// Definir la URL de la API
const priceUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

// Realizar la solicitud a la API utilizando la función fetch
fetch(priceUrl)
    .then((response) => {
        // Verificar si la respuesta es exitosa (código de estado HTTP 200)
        if (!response.ok) {
            throw 'Error en la solicitud a la API';
        }
        // Parsear la respuesta JSON
        return response.json();
    })
    .then((data) => {
        // Aquí puedes trabajar con los datos obtenidos de la API
        console.log('Datos de la API:', data);

        // Por ejemplo, para acceder al precio en USD de Bitcoin:
        const precioBitcoinUSD = data.bitcoin.usd;
        console.log('Precio de Bitcoin en USD:', precioBitcoinUSD);
        const precioBitcoinElement = document.getElementById('infoDisplay');
        precioBitcoinElement.textContent = `Bitcoin $${precioBitcoinUSD}`;
    })
    .catch((error) => {
        // Manejar errores en caso de que la solicitud falle
        console.error('Error al obtener datos de la API:', error);
    });

