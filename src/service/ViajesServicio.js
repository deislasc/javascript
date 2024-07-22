import axios from 'axios';

export default class ViajesServicio{
    URL_SERVIDOR = "https://sii-superbeta-admin.herokuapp.com//beta/viajes/";
    URL_DESARROLLO="http://localhost:8080//beta/viajes/"
    getAll() {
        //return axios.get(this.url +"consulta");
        return axios.get(this.URL_SERVIDOR +"todos");
    }
    findTienda(tienda){
        return axios.get(this.URL_SERVIDOR+"/tiendas/"+tienda);
    }
    findByDia(dia){
        return axios.get(this.URL_SERVIDOR+dia);
    }
    findByEmpDia(empId,dia){
        return axios.get(this.URL_SERVIDOR+empId+"/"+dia);
    }
    findProveedorPoweDriver(){
        return axios.get(this.URL_SERVIDOR+"prov");
    }
    findViajesPuesto(tienda,fecha,puesto){
        return axios.get(this.URL_SERVIDOR+"/"+tienda+"/"+fecha+"/"+puesto);
    }
    findReporte(dia,empId){
        return axios.get(this.URL_SERVIDOR+"/reporte/"+dia+"/"+empId);
    }

}