const weatherService = require('../services/weatherService');


const getLocalWeather = async (req, res) => {
    try {
        const { lat, lon} = req.query;
        const data = await weatherService.getWeather(lat, lon);

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Falha ao obter clima" });
    }
};

module.exports = {getLocalWeather};