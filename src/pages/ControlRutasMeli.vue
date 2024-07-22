<template>

<RutasMeli v-if="meli===1"/>



    
</template>
<script>
import RutasMeli from '../components/RutasMeli.vue';
import AsignacionTiendaServicio from '../service/AsignacionTiendaServicio';
export default {
 props:{ datosUsuario: Array
    },
	data() {
		return {
            asignacionTiendaServicio:null,
            tienda:null,
            asigEmpId:null,
            meli:0,
        }
        },
         async created(){
             this.asignacionTiendaServicio= new AsignacionTiendaServicio();
         },
         async mounted(){
        this.tienda=localStorage.tienda;
        await this.asignacionTiendaServicio.getEmpId(localStorage.usuario).then(data=>{
        this.asigEmpId=data.data;
        for(let i=0;i<this.asigEmpId.length;i++){
            
            if(this.asigEmpId[i].nomTiendaMeli==='SMX5' || this.asigEmpId[i].nomTiendaMeli==='SMX4' || this.asigEmpId[i].nomTiendaMeli==='SCT1' || this.asigEmpId[i].nomTiendaMeli==='SMD1' || this.asigEmpId[i].nomTiendaMeli==='SMX6' || this.asigEmpId[i].nomTiendaMeli==='SMX3' || this.asigEmpId[i].nomTiendaMeli==='SMX2'){
                this.meli=1;
                if(this.tienda==='RH'){
                    this.meli=0;
                }
                //console.log(this.asigEmpId[i].nomTiendaMeli);
            }
        }

         });
         },
        components: {
        'RutasMeli': RutasMeli,
        }
        
}
</script>