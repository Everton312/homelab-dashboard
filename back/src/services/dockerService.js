const Docker = require('dockerode');
const immichService = require('./immichService');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });


const getContainers = async () => {
    try{
        const containers = await docker.listContainers({ all: true });

        const filtered = containers.filter(c => c.Labels['dash.enable'] === 'true')

        return Promise.all(filtered.map(async (container) => {
            let port = container.Labels['dash.port'];
            if (!port && container.Ports.length > 0) {
                const publicPortObj = container.Ports.find(p => p.PublicPort);
                port = publicPortObj ? publicPortObj.PublicPort : null;
            }
            let displayName = container.Labels['dash.name'] || container.Names[0].replace('/', '');
            let stats = null;
            if(displayName.toLowerCase().includes('immich')){
                stats = await immichService.getImmichStats();
            }
            let icon = container.Labels['dash.icon'];
            const appUrl = container.Labels['dash.url'] || (port ? `:${port}` : null);
            return {
                id: container.Id,
                name: displayName,
                state: container.State,
                status: container.Status,
                image: container.Image,
                url: appUrl,
                stats: stats,
                icon: icon

            };
        }));
    } catch (error) {
        console.error("Erro ao listar os containers", error);
        throw error;
    }
};

module.exports = { getContainers };
