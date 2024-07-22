import axios from 'axios';
export default class MercadoLibreServicio {
url="http://localhost:8080//beta/rutas/meli/";
url_asignacion="http://localhost:8080//beta/meli/rutas/asignadas";
url_productivo="https://sii-superbeta-admin.herokuapp.com//beta/rutas/meli/";
url_asignacion_productivo="https://sii-superbeta-admin.herokuapp.com//beta/meli/rutas/asignadas";

SubirViaje(viajeId){
    return axios.get(this.url+viajeId)
}
AsignarViaje(ruta){
  return axios.post(this.url_asignacion+"/save",ruta)
}
}