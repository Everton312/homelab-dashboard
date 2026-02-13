const dockerService = require('../services/dockerService');

const getContainers = async (req, res) => {
    try {

        const data = await dockerService.getContainers();
        res.json(data);
        
    } catch (error) {
        res.status(500).json({error: "erro ao ler containers"});
    }
};

module.exports = { getContainers };
