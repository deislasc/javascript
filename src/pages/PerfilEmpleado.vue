<template>

</template>
<script>
import EmpleadosServicio from '../service/EmpleadosServicio';


export default ({
    data(){
        return{
            empleadosServicio:null,
            empleados:null,
            mensajes:null,
        }
        
    },
    async created(){
      this.empleadosServicio=new EmpleadosServicio();
     
this.initFilters1()
    },
    
    async mounted(){
        let tienda="HIPERPLAZA TEXCOCO";
await this.empleadosServicio.findTienda(tienda).then(data=>{this.empleados=data.data;this.mensaje="se mostro correto";this.loading=false; console.log(data.data,'hola');}).catch(error => {
        this.mensaje=error+'----NO SE GUARDO CAMPO  EN LA BASE DE DATOS';
      });

 },
    methods:{}
})

</script>
<style lang="scss">
.card {
  /*  efectos card*/
  box-shadow: 0 8px 16px 0 #969797;
  transition: 0.3s;
}
/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 4px 8px 0 #3ab149;
}
.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>