import './css/style.css';
import { conexion1 } from './js/conexion1';
const consultor = document.getElementById('ciudad');
consultor.addEventListener('keypress', (event)=>{
    if(event.key === 'Enter'){
        conexion1(consultor.value);
    }
})