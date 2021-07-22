const keyApi = '&key=8b7694eff07149098e5f5f529a322c15';
const keyApi2 = '&appid=a7bc5ba85ffdd89602ed4583829f24a4'
const httpProvider = 'https://api.opencagedata.com/geocode/v1/json?q='
const httpProvider2 = 'https://api.openweathermap.org/data/2.5/weather?';
const consultor = document.getElementById('ciudad');
const tiempo = document.getElementById('tiempo');
const ciudadEspecifica = document.getElementById('comboBreaker20');
const cabecera = document.getElementById('topping');
let coordenadas = {
    lat: '',
    lng: ''
}
let x = 0;
const conexion1 = async(query)=>{
    try{
    const url = `${httpProvider}${query}${keyApi}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if(data.results.length>1){
        ciudadEspecifica.disabled = false;
        ciudadEspecifica.innerHTML = `<option>Seleccione ciudad con ese nombre</option>`;
        data.results.forEach(element => {
            if((element.components.city || element.components.village) && element.components.country){
                ciudadEspecifica.innerHTML += `<option value="${x++}">${(element.components.city)? element.components.city : (element.components.village)? element.components.village : ''}-${(element.components.city || element.components.village)?element.components.country: ''}</option>`;
            }else{
                ciudadEspecifica.innerHTML += '';
                x++;
            }
        });
        ciudadEspecifica.addEventListener('change', ()=>{
            const valorEscogido = parseInt(ciudadEspecifica.value);
            console.log(valorEscogido);
            coordenadas = {
                lat: Math.round(data.results[valorEscogido].geometry.lat),
                lng: Math.round(data.results[valorEscogido].geometry.lng)
            }
            x=0;
            console.log(coordenadas)
            cabecera.classList.remove('inicio');
            cabecera.classList.add('buscado');
            conexion2(coordenadas.lat, coordenadas.lng);
        })
    }else{
        let hijosDePuta = ciudadEspecifica.children;
        console.log(hijosDePuta);
        cabecera.classList.remove('inicio');
        cabecera.classList.add('buscado');
        coordenadas = {
            lat: Math.round(data.results[0].geometry.lat),
            lng: Math.round(data.results[0].geometry.lng)
            }
            conexion2(coordenadas.lat, coordenadas.lng);
        }
    }catch{
        tiempo.innerHTML = '';
        cabecera.classList.add('inicio');
        cabecera.classList.remove('buscado');
        throw error;
    }
}
const conexion2 = async(lat, lon)=>{
    tiempo.innerHTML = '';
    try{    
        const url = `${httpProvider2}lat=${lat}&lon=${lon}&lang=es&units=metric&${keyApi2}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        tiempo.innerHTML = `
        <div class="carta">
        <h3><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"></h3>
        <p>Tiempo: ${data.weather[0].description}</p>
        <p>Sensación térmica: ${data.main.feels_like}ºC</p>
        <p>Nivel sobre el suelo: ${data.main.grnd_level}m</p>
        <p>Humedad ambiente: ${data.main.humidity}%</p>
        <p>Presión atmosférica: ${data.main.pressure}hPa</p>
        <p>Nivel del mar: ${data.main.sea_level}m</p>
        <p>Temperatura: ${data.main.temp}ºC</p>
        <p>Temperatura máxima: ${data.main.temp_max}ºC</p>
        <p>Temperatura máxima: ${data.main.temp_min}ºC</p>
        </div>`;
    }catch{
        throw error;
    }
}
consultor.addEventListener('keypress', (event)=>{
    if(event.key === 'Enter'){
        conexion1(consultor.value);
    }
})