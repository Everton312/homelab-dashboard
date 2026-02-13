const systemService = require('../services/systemService');

const getInfo = async (req, res) => {
    try {
        const data = await systemService.sysData();
        res.json(data);
    } catch (error){
        res.status(500).json({error: "erro ao ler informações do sistema"});
    }
};

module.exports = { getInfo };