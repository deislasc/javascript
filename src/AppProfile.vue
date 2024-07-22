<template>
	<div class="layout-profile">
		<div>
			<img src="../public/assets/layout/images/betalog.jpg"  />
		</div>
		<button class="p-link layout-profile-link" @click="onClick" >
			<span class="username" ><font size=1.5> {{datosUsuario.data.nombre}}</font></span><i class="pi pi-fw pi-cog"></i>	
		</button>
        <transition name="layout-submenu-wrapper">
            <ul v-show="expanded">
                <li><button class="p-link"><i class="pi pi-fw pi-user"></i><span>Cuenta</span></button></li>
                <li><button class="p-link"><i class="pi pi-fw pi-inbox"></i><span>Notificaciones</span><span class="menuitem-badge">0</span></button></li>
                <li><button class="p-link" @click="cerrarsesion"><i class="pi pi-fw pi-power-off"></i><span>Cerrar Sesion</span></button></li>
            </ul>
        </transition>
		
	</div>
</template>

<script>

	export default {
		props:{
			datosUsuario:{
				type:Object,
				default:function () {
        return { 
		nombre:"null" }
      }
			}
		},
		data() {
			return {
				sesion:null,
				expanded: false
			}
		},
		methods: {
		
			cerrarsesion(){
				localStorage.clear();
				this.sesion=null;
				this.$emit("sesion", this.sesion);
			},
			onClick(event){
				this.expanded = !this.expanded;
				event.preventDefault();
			}
		}
	}
</script>

<style scoped>

</style>