import axios from 'axios';

export default class UnidadesFlotaServicio {
    URL_SERVIDORPRUEBA = "http://localhost:8080//beta/flotaunidades/";
    URL_SERVIDOR = "https://sii-superbeta-admin.herokuapp.com//beta/flotaunidades/";
    unidad = "http://localhost:8080//beta/flotaunidades/"
    url = this.URL_SERVIDORPRUEBA;
    saveInfo(unidadFlota) {
        return axios.post(this.URL_SERVIDOR + "save", unidadFlota);
    }

    getAll() {
        return axios.get(this.URL_SERVIDOR + "todos");
    }
    save(unidadFlota) {
        return axios.post(this.URL_SERVIDOR + "save", unidadFlota);
    }
    upload(file) {
        return axios.post(this.URL_SERVIDOR + "img/flota", file);
    }
    placa(placa) {
        return axios.get(this.URL_SERVIDOR + "placas/" + placa);
    }
}