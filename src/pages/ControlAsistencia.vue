<template>

<Asistencia />



    
</template>
<script>
import Asistencia from '../components/Asistencia.vue';
export default {
 props:{ datosUsuario: Array
    },
	data() {
		return {

        }
        },
        components: {
        'Asistencia': Asistencia,
        }
        
}
</script>