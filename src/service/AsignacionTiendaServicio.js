import axios from 'axios';

export default class AsignacionTiendaServicio{
    URL_SERVIDORPRUEBA = "http://localhost:8080//beta/asignacion/tienda/";
    URL_SERVIDOR = "https://sii-superbeta-admin.herokuapp.com//beta/asignacion/tienda/";

    getEmpId(empId){
        return axios.get(this.URL_SERVIDOR+empId);
    }

}



