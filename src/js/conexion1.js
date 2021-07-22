import { conexion2 } from "./conexion2";
const keyApi = '&key=8b7694eff07149098e5f5f529a322c15';
const httpProvider = 'https://api.opencagedata.com/geocode/v1/json?q='
const tiempo = document.getElementById('tiempo');
const ciudadEspecifica = document.getElementById('comboBreaker20');
const cabecera = document.getElementById('topping');
let coordenadas = {
    lat: '',
    lng: ''
}
let x = 0;
export const conexion1 = async(query)=>{
    try{
    const url = `${httpProvider}${query}${keyApi}`;
    const response = await fetch(url);
    const data = await response.json();
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
            coordenadas = {
                lat: Math.round(data.results[valorEscogido].geometry.lat),
                lng: Math.round(data.results[valorEscogido].geometry.lng)
            }
            x=0;
            cabecera.classList.remove('inicio');
            cabecera.classList.add('buscado');
            conexion2(coordenadas.lat, coordenadas.lng);
        })
    }else{
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
