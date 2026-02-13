require('dotenv').config();
const PORT = 3001;
const express = require('express');
const cors = require('cors');
const systemRoutes = require('./routes/systemRoutes');
const dockerRoutes = require('./routes/dockerRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/system', systemRoutes);
app.use('/api/docker', dockerRoutes);
app.use('/api/weather', weatherRoutes);



app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

