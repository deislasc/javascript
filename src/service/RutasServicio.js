import axios from 'axios';
export default class RutasServicio{
    URL_SERVIDORPRUEBA ="http://localhost:8080//beta/rutas/meli/";
    URL_SERVIDOR="https://sii-superbeta-admin.herokuapp.com//beta/rutas/meli/";
    getRutas(nomTiendaMeli,fecha){
        return axios.get(this.URL_SERVIDOR+"Rutas/"+nomTiendaMeli+"/"+fecha);
    }
    saveRuta(rutaId,tienda,nomTiendaMeli,ruta,fecha,hora,empId,empNombre,tipoServicio){
        return axios.get(this.URL_SERVIDOR+rutaId+"/"+tienda+"/"+nomTiendaMeli+"/"+ruta+"/"+fecha+"/"+hora+"/"+empId+"/"+empNombre+"/"+tipoServicio);
    }
    getRutasFech(fecha){
        return axios.get(this.URL_SERVIDOR+"shipments/"+fecha);
    }
    getShipments(shipment){
        return axios.get(this.URL_SERVIDOR+"shipments/data/"+shipment);
    }
}