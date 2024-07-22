import axios from 'axios';

export default class AsistenciaServicio {
    URL_SERVIDORPRUEBA = "http://localhost:8080//beta/empleados/";
    URL_SERVIDOR = "https://sii-superbeta-admin.herokuapp.com//beta/empleados/";
    URL_SERVIDORDOS = "https://sii-superbeta-admin.herokuapp.com//empleados/viajes/";
    URL_ADMINPRUEBA="http://localhost:8080//beta/Admin/";
    URL_ADMIN="https://sii-superbeta-admin.herokuapp.com//beta/Admin/";
    URL_ASISTENCIAPRUEBA="http://localhost:8080//beta/empleados/";
    URL_ASISTENCIA="https://sii-superbeta-admin.herokuapp.com//beta/empleados/";
    url = this.URL_SERVIDORPRUEBA;

    getAllAsistencia(){
        return axios.get(this.URL_SERVIDOR+"asistencia/todos");
    }
    getDia(dia){
        return axios.get(this.URL_SERVIDOR+"asistencia/"+dia);
    }
    getPermiso(empId){
        return axios.get(this.URL_ADMIN+"perm/"+empId);
    }
    getAsistenciaPuesto(fecha,puesto){
        return axios.get(this.URL_ASISTENCIA+"reporte/administrativos/"+fecha+"/"+puesto);
    }
    getAsistenciaFecha(fecha){
        return axios.get(this.URL_ASISTENCIA+"reporte/rh/"+fecha);
    }

}