import axios from 'axios';

export default class EmpleadosServicio{
    URL_SERVIDORPRUEBA = "http://localhost:8080//beta/empleados/";
    URL_SERVIDOR = "https://sii-superbeta-admin.herokuapp.com//beta/empleados/";
    url = this.URL_SERVIDORPRUEBA;
    URL_INFOMAP="https://sii-superbeta-admin.herokuapp.com//beta/InfoMap";
    URL_INFOMAPPRUEBA="http://localhost:8080//beta/InfoMap";
    URL_SERVIDORPRUEBADOS="http://localhost:8080//beta/empleadosInfoAdicional/";
    datos=[];
    
    saveInfo(empleados){
        return axios.post(this.URL_SERVIDOR+"save",empleados);
    }
    todos(){
        return axios.get(this.URL_SERVIDOR+"/todos");
    }
    getAll(){
        return axios.get(this.URL_INFOMAP+"/todos");
    }
    getEmpId(empId){
        return axios.get(this.URL_SERVIDOR+"empId/"+empId);
    }
    getPuesto(puesto){
        return axios.get(this.URL_INFOMAP+"/reporte/"+puesto);
    }
   save(empleado){
       return axios.post(this.URL_SERVIDOR+"save",empleado);
   }
   edit(empleado){
    return axios.post(this.URL_SERVIDOR+"edit",empleado);
}
   upload(file){
       return axios.post(this.URL_SERVIDOR+"img/upload",file);
   }
   login(us,pass){   
    
       return axios.get("https://sii-superbeta-admin.herokuapp.com//beta/Admin/login/"+us+'/'+pass);
   }
   findTienda(tienda){
       return axios.get(this.URL_SERVIDOR+"tienda/"+tienda);
   }
   getAllProveedores(){
    return axios.get(this.URL_SERVIDOR+"proveedores");
   }
   getAllTiendas(){
    return axios.get(this.URL_SERVIDOR+"tiendas");
   }
   getTabulador(){
    return axios.get(this.URL_SERVIDOR+"tabulador");
   }
   getEsquemaFiltrar(tipo){
    return axios.get(this.URL_SERVIDOR+"esquemas/"+tipo);
   }
   getCpFiltrar(cp){
    return axios.post(this.URL_SERVIDOR+"cp",cp);
   }
   getEstados(){
    return axios.get(this.URL_SERVIDOR+"estados");
   }
   getBancos(numeroClaveBanco){
    return axios.get(this.URL_SERVIDOR+"bancos/"+numeroClaveBanco);
   }
   getNum(nomEmp){
    return axios.post(this.URL_SERVIDOR+"count",nomEmp);
   }
   saveEmpTiendas(empleadosTiendas){
    return axios.post(this.URL_SERVIDOR+"empleadosTiendas",empleadosTiendas);
   }
   getAreas(){
    return axios.post(this.URL_SERVIDOR+"areas");
   }
   getPuestos(){
    return axios.post(this.URL_SERVIDOR+"puestos");
   }
   getDepartamentos(){
    return axios.get(this.URL_SERVIDOR+"departamentos");
   }
   getMarcas(){
    return axios.get(this.URL_SERVIDOR+"marcas");
   }
   getSubMarcas(){
    return axios.get(this.URL_SERVIDOR+"submarcas");
   }
   getReporte(){
    return axios.get(this.URL_SERVIDOR+"reporte");
   }
   
}