<template>

<Devolucion />



    
</template>
<script>
import Devolucion from '../components/Devolucion.vue';
export default {
 props:{ datosUsuario: Array
    },
	data() {
		return {

        }
        },
        components: {
        'Devolucion': Devolucion,
        }
        
}
</script>