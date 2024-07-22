<template>
    <TimbrarCfdi />
</template>
<script>
import TimbrarCfdi from '../components/TimbrarCfdi.vue';
export default {
 props:{ datosUsuario: Array
    },
	data() {
		return {

        }
        },
        components: {
        'TimbrarCfdi': TimbrarCfdi,
        }
        
}
</script>