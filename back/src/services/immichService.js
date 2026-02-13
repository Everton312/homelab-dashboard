const axios = require('axios');
require('dotenv').config();
apikey = process.env.IMMICH_APIKEY;


const getImmichStats = async () => {
    try {
        const response = await axios.get('http://192.168.0.50:2283/api/server/statistics', {
        headers: { 'x-api-key': apikey }
    });
        return{
            qtPhotos: response.data.photos,
            qtVideos: response.data.videos,
            usage: response.data.usage
        }
    } catch (error) {
        console.error("Immich service error:", error.response?.data || error.message);
        return null;
    }

}

module.exports = { getImmichStats: getImmichStats };
