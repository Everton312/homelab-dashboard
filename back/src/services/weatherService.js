const axios = require('axios');


const getWeather = async (lat, lon) => {

    try {
        if (!lat || !lon) {
            return null;
        }

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,apparent_temperature,relative_humidity_2m&current=wind_speed_10m`;

        const response = await axios.get(url);

        return{
            temp: response.data.current.temperature_2m,
            humidity: response.data.current.relative_humidity_2m,
            weatherCode: response.data.current.weather_code,
            feelsLike: response.data.current.apparent_temperature,
            windSpeed: response.data.current.wind_speed_10m
        };


    } catch (error) {
        console.error("Erro no meteo: ", error.message);
        return null;
    }
};

module.exports = {getWeather};
