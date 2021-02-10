const weather = document.querySelector(".js-weather");

const API_KEY="9283589f72c8b746d51c4c6d702c1a38";
const COORDS ='coords';

function getWeather(lat,lng){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(reponse){
    return reponse.json();
  }).then(function(json){
    console.log(json);
    const temperature=json.main.temp;
    const place=json.name;
    weather.innerText=`${temperature} @ ${place}`;
  });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
  const latitude=position.coords.latitude;
  const longitude=position.coords.longitude;
  const coordsObj={
    latitude : latitude,
    longitude : longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude,longitude);
}

function handleGeoError()
{
  console.log("Cant access geo location");
}

function askForCoords(){
  navigator.geolocation.watchPosition(handleGeoSucces,handleGeoError);
}

function loadCoords(){
  const loadedCoords=localStorage.getItem(COORDS);
  if(loadedCoords===null){
    askForCoords();
  }else{
    const parsedCoords=JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude,parsedCoords.longitude);
  }
}

function init()
{
  loadCoords();
}

init();