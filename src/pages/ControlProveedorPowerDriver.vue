<template>

<ProveedorPowerDrive v-if="tienda==='PROVEEDOR'"/>



    
</template>
<script>
import ProveedorPowerDrive from '../components/ProveedorPowerDrive.vue';
export default {
 props:{ 
    },
	data() {
		return {
tienda:null,
        }
        },
        async created(){
             
         },
         async mounted(){
        this.tienda=localStorage.tienda;
       console.log(this.tienda,"this.tienda");
         },
        components: {
        'ProveedorPowerDrive': ProveedorPowerDrive,
        }
        
}
</script>