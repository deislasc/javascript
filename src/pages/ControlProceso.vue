<template>

<Proceso />



    
</template>
<script>
import Proceso from '../components/Proceso.vue';
export default {
 props:{ datosUsuario: Array
    },
	data() {
		return {

        }
        },
        components: {
        'Proceso': Proceso,
        }
        
}
</script>