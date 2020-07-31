const weather = document.querySelector(".js-weather");
const API_KEY = "5d6ffc4b865e4c543adc8cc997f1aebe"
const COORDS = "coords";

// 날씨 정보 받아오기
function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}˚C @ ${place}`;
    });
}

// localStorage에 위치 정보 저장
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 위치 정보 획득 시 localStorage에 저장 형태 설정
function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = { 
        latitude, // 객체의 key와 이름을 같게 저장
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

// 위치 정보 표시 에러
function handleGeoError() {
    alert("Cant access geo location");
}

// 위치 정보 묻기
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

// 위치 정보 저장 여부에 따라 위치 정보 요청 or 위치 정보 표시, 날씨 출력
function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();