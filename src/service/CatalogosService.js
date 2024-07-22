import axios from 'axios';
export default class Catalogos{
    URL_SERVIDORPRUEBA="http://localhost:8080//beta/administracion/tiendas/"
    URL_SERVIDOR = "https://sii-superbeta-admin.herokuapp.com//beta/administracion/tiendas/";
    //https://sii-superbeta-admin.herokuapp.com//beta/CfdiTrasladoMeli/cfdi/save
    URL_CATALOGS_DEV="http://localhost:8080//beta/catalogs/";
    URL_CATALOGS="https://sii-superbeta-admin.herokuapp.com//beta/catalogs/";
    saveTienda(tienda){
        return axios.post(this.URL_SERVIDOR+"save",tienda);
    }
    getCiudades(){
        return axios.get(this.URL_CATALOGS+"ciudades/todos");
    }
    getClientes(){
        return axios.get(this.URL_CATALOGS+"clientes/todos");
    }
    getProyectos(){
        return axios.get(this.URL_CATALOGS+"proyectos/todos");
    }
    getFormatos(){
        return axios.get(this.URL_CATALOGS+"formatos/todos");
    }



}
