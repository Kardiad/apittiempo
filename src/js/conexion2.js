const keyApi2 = '&appid=a7bc5ba85ffdd89602ed4583829f24a4'
const httpProvider2 = 'https://api.openweathermap.org/data/2.5/weather?';
export const conexion2 = async(lat, lon)=>{
    tiempo.innerHTML = '';
    try{    
        const url = `${httpProvider2}lat=${lat}&lon=${lon}&lang=es&units=metric&${keyApi2}`;
        const response = await fetch(url);
        const data = await response.json();
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
        <p>Temperatura minima: ${data.main.temp_min}ºC</p>
        </div>`;
    }catch{
        throw error;
    }
}