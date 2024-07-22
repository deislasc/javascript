import axios from 'axios';


export default class DevolucionNovServicio {
    URL_SERVIDORPRUEBA = "http://localhost:8080//beta/devolucionNov/";
    URL_SERVIDOR = "https://sistema-integral-beta.herokuapp.com//beta/devolucionNov/"
    url = this.URL_SERVIDORPRUEBA;
    getAll() {
        //return axios.get(this.url +"consulta");
        return axios.get(this.URL_SERVIDOR + "todos");
    }
    save(relojChecador) {
        return axios.post(this.URL_SERVIDOR + "checar", relojChecador);
    }
}