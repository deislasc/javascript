import axios from 'axios';
export default class PedidosServicio {
    URL_SERVIDORPRUEBA = "http://localhost:8080//beta/pedidos/";
    URL_SERVIDOR = "https://sii-superbeta-admin.herokuapp.com//beta/pedidos/";
    url = this.URL_SERVIDORPRUEBA;
    getAll() {
        //return axios.get(this.url +"consulta");
        return axios.get(this.URL_SERVIDOR + "todos");
    }
    save(pedido) {
        return axios.post(this.URL_SERVIDOR + "save", pedido);
    }
    getDev(empId,dev){
        return axios.get(this.URL_SERVIDOR +'devolucion/'+empId+'/'+dev);

    }
    findTripId(trip_id){
        return axios.get(this.URL_SERVIDOR+trip_id);
    }
    findDiaEmp(fecha,empId){
        return axios.get(this.URL_SERVIDOR+"empPedidos/"+fecha+"/"+empId);
    }
   

}