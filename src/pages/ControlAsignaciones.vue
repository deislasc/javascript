<template>

<Asignaciones  />



    
</template>
<script>
import Asignaciones from '../components/Asignaciones.vue';
export default {
 props:{ datosUsuario: Array
    },
	data() {
		return {
tienda:null,
empId:null
        }
        },
         async mounted(){
        this.tienda=localStorage.tienda;
        this.empId=localStorage.usuario;
         },
        components: {
        'Asignaciones': Asignaciones,
        }
        
}
</script>