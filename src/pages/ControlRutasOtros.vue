<template>

<RutasOtros />



    
</template>
<script>
import RutasOtros from '../components/RutasOtros.vue';
export default {
 props:{ datosUsuario: Array
    },
	data() {
		return {

        }
        },
        components: {
        'RutasOtros': RutasOtros,
        }
        
}
</script>