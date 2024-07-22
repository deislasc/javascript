<template>

<CasaLey />



    
</template>
<script>
import CasaLey from '../components/CasaLey.vue';
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
        'CasaLey': CasaLey,
        }
        
}
</script>