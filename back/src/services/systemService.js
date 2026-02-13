const si = require('systeminformation');

async function sysData() {
    try {
        const cpu = await si.cpu();
        const ram = await si.mem();
        const disks = await si.fsSize();
        const cpuTemp = await si.cpuTemperature();
        const cpuLoad = await si.currentLoad();

        const fullData = {
            processor: {
                manufacturer: cpu.manufacturer,
                brand: cpu.brand,
                usage: cpuLoad.currentLoad.toFixed(2),
                temp: cpuTemp.main
            },

            ram: {
                total: (ram.total / 1024 / 1024 / 1024).toFixed(2),
                active: (ram.active / 1024 / 1024 / 1024).toFixed(2),
                available: (ram.available / 1024 / 1024 / 1024).toFixed(2)
            },

            storage: {
                partitions: disks
                .filter(d => d.fs.includes('/dev/'))
                .map(d => ({
                    name: d.fs.includes('nvme') ? "SSD NVME" : "HDD",
                    drive: d.fs,
                    mount: d.mount,
                    use: d.use,
                    size: (d.size / 1024 / 1024 / 1024).toFixed(2),
                    used: (d.used / 1024 / 1024 / 1024).toFixed(2)
                }))
            }

            
            }
        return fullData;
    }catch (e) {
        throw(e);
    }
}

module.exports = { sysData };