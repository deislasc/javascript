<template>
    <Reguistro v-if="rh==='RH'" />
</template>
<script>
import Reguistro from '../components/Reguistro.vue';
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
        'Reguistro': Reguistro,
        }
        
        
}
</script>
