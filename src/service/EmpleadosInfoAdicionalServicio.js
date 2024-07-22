import axios from 'axios';

export default class EmpleadosInfoAdicionalServicio {
    URL_SERVIDORPRUEBA = "http://localhost:8080/beta/empleadosInfoAdicional/";
    URL_SERVIDOR = "https://sii-superbeta-admin.herokuapp.com//beta/empleadosInfoAdicional/";
    url = this.URL_SERVIDORPRUEBA;
    URL_SERVIDORPRUEBADOS = "http://localhost:8080//beta/empleadosInfoAdicional/";
    saveInfo(empleadosInfoAdicional) {
        return axios.post(this.URL_SERVIDOR + "save", empleadosInfoAdicional);
    }
    getAll() {
        return axios.get(this.URL_SERVIDOR + "todos");
    }
    save(UnidadFlota) {
        return axios.post(this.URL_SERVIDOR + "save", UnidadFlota);
    }
    edit(empleadosInfoAdicional) {
        return axios.post(this.URL_SERVIDOR + "edit", empleadosInfoAdicional);
    }
    getCurp(empCurp) {
        return axios.get(this.URL_SERVIDOR + "findCurp/" + empCurp);
    }

    getEmpId(empId) {
        return axios.get(this.URL_SERVIDOR + "find/" + empId);
    }
    saveUpload(multipartFile){
        return axios.post(this.URL_SERVIDOR+"upload/doc",multipartFile, {
            headers: {
              'Content-Type': multipartFile.type
            }
          });
    }

}