// Definir la URL de la API
const priceUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

// Realizar la solicitud a la API utilizando la función fetch
fetch(priceUrl)
    .then((response) => {
        // Verificar si la respuesta es exitosa (código de estado HTTP 200)
        if (!response.ok) {
            throw new Error('Error en la solicitud a la API');
        }
        // Parsear la respuesta JSON
        return response.json();
    })
    .then((data) ;