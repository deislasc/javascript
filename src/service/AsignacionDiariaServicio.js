import axios from 'axios';

export default class AsignacionDiariaServicio{
    URL_SERVIDORPRUEBA = "http://localhost:8080//beta/empleados/asignacion/";
    URL_SERVIDOR = "https://sii-superbeta-admin.herokuapp.com//beta/empleados/asignacion/";

    save(asignacion){
        return axios.post(this.URL_SERVIDOR+"save",asignacion);
    }
    getAll(){
        return axios.get(this.URL_SERVIDOR+"todos");
    }
    getHistorico(dia){
        return axios.get(this.URL_SERVIDOR+"reporte/"+dia);
    }
    getDiaEmpId(empId,dia){
        return axios.get(this.URL_SERVIDOR+"unidad/"+empId+"/"+dia);
    }
    getEsquemaDia(esquema,dia){
        return axios.get(this.URL_SERVIDOR+esquema+"/"+dia);
    }

}