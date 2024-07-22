import axios from 'axios';
export default class CfdiTrasladoMeliServicio{
    URL_SERVIDORPRUEBA="http://localhost:8080//beta/CfdiTrasladoMeliTimbrado/"
    URL_SERVIDOR = "https://sii-superbeta-admin.herokuapp.com//beta/CfdiTrasladoMeliTimbrado/";
    //https://sii-superbeta-admin.herokuapp.com//beta/CfdiTrasladoMeli/cfdi/save
    
    getFolioFis(rutaId){
        return axios.get(this.URL_SERVIDOR+"rutaId/"+rutaId);
    }
    saveCfdi(cfdi){
        return axios.post("https://sii-superbeta-admin.herokuapp.com//beta/CfdiTrasladoMeli/cfdi/save",cfdi)
    }
}
