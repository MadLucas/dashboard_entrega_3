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
            'darkred', 'bluu