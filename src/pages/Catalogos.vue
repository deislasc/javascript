<template>
    <Tiendas v-if="rh==='RH'" />
</template>
<script>
import Tiendas from '../components/catalogs/Tiendas.vue';
export default {
 props:{ datosUsuario: Array
    },
	data() {
		return {
            rh:null,

        }
        
        },
        async created(){
             this.rh=localStorage.puesto
         },
        components: {
        'Tiendas': Tiendas,
        }
        
        
}
</script>
