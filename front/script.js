const serverIP = window.location.hostname;
const apiPort = "3001";
const apiBaseUrl = `http://${serverIP}:${apiPort}`;
console.log(serverIP);
async function updateSysStatus() {
    const res = await fetch(`http://${serverIP}:3001/api/system/systemInfo`);
    
    
    const data = await res.json();

    document.getElementById('cpu-degrees').innerText = `${data.processor.temp}°C`;
    
    updateCPUusage(data.processor.usage);
    updateRamUsage(data.ram.total, data.ram.active);
    
}

async function updateCPUusage(percent) {
    const circle = document.getElementById('cpu-progress');
    const text = document.getElementById('cpu-text');

    // Perímetro exato para Raio 86
    const maxDash = 270;
    
    const offset = maxDash - (percent / 100) * maxDash;

    circle.style.strokeDashoffset = offset;
    text.innerText = `${Math.round(percent)}%`;
    

    // Lógica das cores
    if (percent > 80) {
        circle.style.stroke = "#ef4444";
        circle.style.filter = "drop-shadow(0 0 10px rgba(239, 68, 68, 0.7))";
    } else {
        circle.style.stroke = "#5EF6FF";
        circle.style.filter = "drop-shadow(0 0 8px rgba(35, 168, 183, 0.5))";
    }
}

async function updateRamUsage(total, usage){
    let instalada = Number(total);
    let resto = instalada;
    let real = 0;
    const rams = document.getElementById('rams');
    const ramInfo = document.getElementById('ramInfo');
    let cellHTML = '';

    while (resto > 0.6) {
        real++;
        resto = resto-1;
    }


    
    let usada = Number(usage);
    let realUsada = 0;
    resto = usada;

    while (resto > 0.1) {
        realUsada++;
        resto = resto-1;
    }


    for (let index = 0; index < realUsada; index++) {
        cellHTML+=`
        <div class="ram-gallery">
            <img class="ram" src="img/ramdisponivel.png">
        </div>`
    }

    for (let index = 0; index < real - realUsada; index++) {
        cellHTML+=`
        <div class="ram-gallery">
            <img class="ram" src="img/ramusada.png">
        </div>`
    }

    rams.innerHTML = cellHTML;
    ramInfo.innerText = `${usage}/${total} GB`;

    
}

async function updateDiskUsage() {
    const res = await fetch(`http://${serverIP}:3001/api/system/systemInfo`);
    const data = await res.json();
    diskSection = document.getElementById('disks');
    let cellHTML = '';
    let partitions = data.storage.partitions;

    partitions.forEach(disk => {
        cellHTML+=`
        <div class="disk">
            <p class="diskName">${disk.name}</p>
            <section class = "diskBlock">
                <div class="chart">
                    <div class = "diskProgress" style="width: ${disk.use}%"></div>
                </div>
                <p class="diskInfo">${disk.used}/${disk.size} GB</p>
            </section>
        </div>`
    });
    diskSection.innerHTML = cellHTML;
}



async function updateDockerStatus(){
    const res = await fetch(`${apiBaseUrl}/api/docker/dockerInfo`);
    const data = await res.json();
    const stacks = document.getElementById('stacks');
    let cellHTML = '';
    
    data.forEach(stack => {
        const name = stack.name;
        const state = stack.state;
        const url = stack.url;
        const icon = stack.icon;

        let finalURL = "#";
        if (url) {
            finalURL = url.startsWith(':') 
                ? `http://${window.location.hostname}${url}` 
                : url;
        }

        cellHTML += `
            <div class = "appContainer">
                <div class = "frame">
                    <button class="appButton">
                        <a href="${finalURL}">
                            <img src = "img/icon.png" class="frame-bg">
                            <img src = "https://cdn.simpleicons.org/${icon}/F0B537" class= "appIcon">
                        </a>
                    </button>
                </div>
            </div>
        `;
    });

    stacks.innerHTML = cellHTML;

    for (let index = 0; index < data.length; index++) {
        if (data[index].name == "Immich") {
            updateImmichStats(data[index].stats)
        }
        
    }
}


async function updateImmichStats(stats) {
    console.log(stats.qtPhotos);
    
    photos = document.getElementById("photoQT");
    videos = document.getElementById("vidQT");
    usage = document.getElementById("espTot");
    let uso = (stats.usage / 1024 / 1024 / 1024).toFixed(2)
    photos.innerText = `${stats.qtPhotos}`;
    videos.innerText = `${stats.qtVideos}`;
    usage.innerText = `${uso} GB`;
}

function Updateweather(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

        try {
            let code = document.getElementById('weatherIcon');
            const res = await fetch(`http://${serverIP}:3001/api/weather/current?lat=${lat}&lon=${lon}`);
            const data = await res.json();

            if (data) {
                document.getElementById('temp').innerText = `${data.temp}°C`;
                document.getElementById('feelsLike').innerText = `${data.feelsLike}°C`;
                document.getElementById('humidity').innerText = `${data.humidity}%`;
                document.getElementById('windSpeed').innerText = `${data.windSpeed} Km/h`;
                const weatherIcons = {
                    0:  'sun',               // Céu limpo
                    1:  'cloud-sun',         // Limpo/Parcial
                    2:  'cloud-sun',         // Parcial
                    3:  'cloud',             // Nublado
                    45: 'cloud-fog',         // Nevoeiro
                    48: 'cloud-fog', 
                    51: 'cloud-rain',        // Chuvisco
                    53: 'cloud-rain',
                    55: 'cloud-rain',
                    61: 'cloud-rain',        // Chuva
                    63: 'cloud-rain',
                    65: 'cloud-rain',
                    71: 'snowflake',         // Neve
                    73: 'snowflake',
                    75: 'snowflake',
                    77: 'snowflake',
                    80: 'cloud-rain',        // Pancadas de chuva
                    81: 'cloud-rain',
                    82: 'cloud-rain',
                    95: 'cloud-lightning',   // Trovoada
                    96: 'cloud-lightning',
                    99: 'cloud-lightning'
                };
                const iconName = weatherIcons[data.weatherCode] || 'thermometer'; 
                document.querySelector('#icon').className = `ph ph-${iconName}`;
            }
        } catch (err) {
            console.error("Erro ao carregar clima:", err);
        }
        });
    }
}


function updateTimeDate(){
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');;
    const timeString = `${hours}:${minutes}`;

    const clock = document.getElementById('clock');
    if (clock) {
        clock.innerText = timeString;
    }

    const options = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
    };
    
    
    let dateString = now.toLocaleDateString('en-US', options);

    dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    
    document.getElementById('date').innerText = dateString;
}

function startClock() {
    updateTimeDate(); // Atualiza imediatamente ao carregar

    const now = new Date();
    const milisNext = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    setTimeout(() => {
        updateTimeDate();
        
        setInterval(updateTimeDate, 60000);
        
    }, milisNext);
}




startClock();
Updateweather();
updateSysStatus();
updateDiskUsage();
updateDockerStatus();
setInterval(updateSysStatus, 3000);