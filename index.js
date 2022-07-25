const boxClima = document.querySelector('.boxClima');
const climaH = document.querySelector('.climaH');
const contenedor = document.querySelector('.contenedor');
const cidade = document.querySelector('.cidade');
const data = document.querySelector('.data');
const pngCont = document.querySelector('.pngCont');
const png = document.querySelector('.png');
const temp = document.querySelector('.temp');
const graus = document.querySelector('.graus');
const medida = document.querySelector('.medida');
const descricao = document.querySelector('.descricao');
const minM = document.querySelector('.minM');
const busca = document.querySelector('.busca');
const input = document.querySelector('.input');
const inputB = document.querySelector('.inputB');
const current = document.querySelector('.current');
const vento = document.querySelector('.vento');

const api = {
    key: "64ed82577ced7f69cb1687f0ce536131",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}

inputB.addEventListener('click', function() {
    console.log('b');
    searchResults(input.value)
})

input.addEventListener('keypress', enter)
function enter(event) {
    console.log('a');
    key = event.keyCode
    if (key === 13) {
        searchResults(input.value)
    }
}

current.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition,showError)
    } else {
        alert('Seu browser não consegue acesso a sua localização');
    }
    function setPosition(position) {
        console.log(position);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        coordResults(lat,lon);
    }
    function showError(error) {
        alert(`Error: ${error.message}`)
    }
})


function coordResults(lat,lon){
    fetch(`${api.base}weather?lat=${lat}&lon=${lon}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
        .then(response => {
            if(!response.ok) {
                throw new Error(`Error: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResults(response)
        });
}

function searchResults(city) {
    fetch(`${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResults(response)
        });
}

function displayResults(weather) {
    console.log(weather);

    cidade.innerHTML = `${weather.name}, ${weather.sys.country}`

    let now = new Date();
    data.innerHTML = dateBuilder(now);

    let icone = weather.weather[0].icon;
    pngCont.innerHTML = `<img width = 70 src="./icons/${icone}.png">`;

    let tempetarura = `${Math.round(weather.main.temp)}`;
    graus.innerHTML = tempetarura;
    medida.innerHTML = `°C`;

    let weatherT = weather.weather[0].description;
    descricao.innerHTML = capitalizeFirstLetter(weatherT);

    minM.innerHTML = `Minima ${Math.round(weather.main.temp_min)}°C / Maxima ${Math.round(weather.main.temp_max)}°C`;
    
    wind = Number(weather.wind.speed);
    
    vento.innerHTML = `Vento a ${Math.round(wind * 3.60)}  KM/H`;

}

function dateBuilder(d) {
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let day = days[d.getDay()]; //getDay: 0-6
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
