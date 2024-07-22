<template>

	<div  :class="containerClass" @click="onWrapperClick" v-if="sesionAb===1">
        {{start()}}
        
		<AppTopBar @menu-toggle="onMenuToggle"  />
        <div v-if="noUsu==0">
        <transition name="layout-sidebar" >
            <div :class="sidebarClass" @click="onSidebarClick" v-show="isSidebarVisible()" >
                <div class="layout-logo">
                    <router-link to="/">
                        <img src="../public/assets/layout/images/beta3.png"  width="500px">
                    </router-link>
                </div>
                  <AppProfile :datosUsuario="datosUsuario" @sesion='sesion'/>
                
                <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
            </div>
        </transition>
        </div>
    <Dialog v-model:visible="cerrarSesion"  :style="{width: '500px'}" header="TIEMPO DE SESION TERMINADA" :modal="true" class="p-fluid">
        {{time=0}}					
                        <template #footer>	
						<Button label="¿Cerrar Sesion?" icon="pi pi-times" class="p-button-text" @click="CerrarLogin"/>
						<Button label="¿Continuar Sesion?" icon="pi pi-check" class="p-button-text" @click="Continuar" />
						</template>								
				</Dialog>
		<div class="layout-main">
            
            <div v-if="evento.label=='Articulos'">
               
            </div>
			<router-view />
		</div>
        
        {{mensaje=''}}
		<AppFooter />
	</div>
    <!--LOGIN-->
      <div v-else >
                                                 
                        <canvas id="canvas"></canvas>
                        <div class="p-col-12 p-d-flex p-flex-column p-ai-center p-jc-center">
                            
                            <br><br>
                            <div class="card" style="width: 27rem; ">
                                <div class="p-grid">
                                    <img src="../public/assets/layout/images/LOGO.png" width="600px"/>
                                        <div class="p-col-12 p-d-flex p-flex-column p-ai-center p-jc-center">
                                           
                                                    <div class="p-fluid">
                                                            <br>
                                                            <div class="p-inputgroup">
                                                            <span class="p-inputgroup-addon">
                                                                <i class="pi pi-user"></i>
                                                            </span>					
                                                    <span class="p-float-label">
                                                    <InputText id="username" type="text" class="p-inputtext-lg" v-model="usuario" />
                                                    <label for="username">Usuario</label>
                                                    </span>
                                                    </div>
                                                    <br>

                                                <div class="p-fluid">
                                                    <div class="p-inputgroup">
                                                        <span class="p-inputgroup-addon">
                                                            <i class="pi pi-key"></i>
                                                        </span>	
                                                    <span class="p-float-label">
                                                        <Password v-model="password" :feedback="false" class="p-inputtext-lg" toggleMask></Password>
                                                    <label for="password" >Contraseña</label>
                                                    </span>
                                                    </div>
                                                </div>

                                            </div> 
                                            
                                            <div class="p-fluid">
                                                <br>
                                             <div class="p-inputgroup ">
                                                        <span class="p-inputgroup-addon ">
                                                            <i class="pi pi-sign-in"></i>
                                                        </span>	
                                            <Button  label="Entrar" class="p-button-lg p-button-success" v-on:click="login()" ></Button>
                                            </div>
                                            </div>                                                                                
                                        </div>
                                    </div>                                                                
                                    <div v-if="this.datosUsuario.statusText==='No Content' || this.datosUsuario.status===204">
                                    <br>
                                    <h5>{{mensaje='ERROR DE CREDENCIALES....'}}</h5>
                                    </div>
                                </div>
                                </div>
                                
                                <!--<div class="linea"></div>-->
                                <!--<div class="linea2"></div>-->
            </div>
</template>
<script>
import AppTopBar from './AppTopbar.vue';
import AppProfile from './AppProfile.vue';
import AppMenu from './AppMenu.vue';
import AppFooter from './AppFooter.vue';
import EmpleadosServicio from './service/EmpleadosServicio'

//const sha1 = require('js-sha1');
//var hoy=new Date();
export default {
    data() {
        return {
            sesionAb:null,
            tim:0,
            noUsu:0,
            cerrarSesion:false,
            timer:null,
            time:0,
            hora:null,
            minuto:null,
            mensaje:'',
         usuario:null,
         nombreEspecial:null,
			password: '',
			base:"CDF",
            cdo: null,
            empleadoServicio:null,
            datosUsuario:{
                data:{
                    nombre:null,
                    id:null,
                }

            },
            evento:{
                label:'Menu Principal'
            },
            nombre:null,
            entrar:null,
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            ok:'tru',
            menu : [
                {label: 'Menu Principal', icon: 'pi pi-fw pi-home', to: '/'},
                {
					label: 'Control', icon: 'pi pi-fw pi-clone',
					items: [
                        
                            {
                                label: 'Actividad', icon: 'pi pi-desktop',
                                items: [{label: 'Rutas Meli',icon: 'pi pi-flag', to:'/ControlRutasMeli'},
                                        {label: 'Rutas Otros',icon: 'pi pi-flag', to:'/ControlCasaLey'},
                                       /* {label: 'Proovedor y PowerDriver',icon: 'pi pi-flag', to:'/ControlProveedorPowerDriver'},
                                        {label: 'Rutas Otros', icon: 'pi pi-flag', to:'/ControlRutasOtros'}*/
                                        
                                        ]
                            },
                        {label: 'Asistencia', icon: 'pi pi-id-card', to: '/ControlAsistencia'},
                        {label: 'Asignaciones', icon: 'pi pi-copy', to: '/ControlAsignaciones'},
                        
                        
                        
					]
				},
                {label: 'Recursos Humanos', icon: 'pi pi-fw pi-users', 
                items:[
                {label: 'Registrar Empleado', icon: 'pi pi-user-plus', to: '/ControlAltaEmpleados'},
                {label: 'Generar CFDI Ingreso', icon: 'pi pi-file', to: '/CfdiIngreso'},
                ]
                },
                {label: 'Catalogos', icon: 'pi pi-fw pi-users', 
                items:[
                {label: 'Tiendas', icon: 'pi pi-user-plus', to: '/catalogos'},
                ]
                },
               
                 ],
                
        }
    },
    created(){
       this.empleadoServicio=new EmpleadosServicio();
    },
    mounted(){
        //this.start();
        if(localStorage.tienda!=null){
            this.sesionAb=1;

        }
        
        this.datosUsuario.data.nombre=localStorage.nombre;

    },
    watch: {
        //MENU A MOSTRAR
            $route() {
            this.menuActive = false;
            this.$toast.removeAllGroups();
        },
        
    },
    methods: {
        sesion(dato){
            console.log(dato,'dato');
            this.sesionAb=dato;
        },
        
    onSidebarMouseLeave(event){
        console.log(event, "aqui");

    },
        onWrapperClick() {
            if (!this.menuClick) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }

            this.menuClick = false;
        },
        onMenuToggle() {
            this.menuClick = true;

            if (this.isDesktop()) {
                if (this.layoutMode === 'overlay') {
					if(this.mobileMenuActive === true) {
						this.overlayMenuActive = true;
					}

                    this.overlayMenuActive = !this.overlayMenuActive;
					this.mobileMenuActive = false;
                }
                else if (this.layoutMode === 'static') {
                    this.staticMenuInactive = !this.staticMenuInactive;
                }
            }
            else {
                this.mobileMenuActive = !this.mobileMenuActive;
            }

            event.preventDefault();
        },
        onSidebarClick() {
            this.menuClick = true;
        },
        onMenuItemClick(event) {
            this.evento=event.item;
            //console.log(event.item,'aquiii');
            if (event.item && !event.item.items) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }
        },
		onLayoutChange(layoutMode) {
			this.layoutMode = layoutMode;
		},
		onLayoutColorChange(layoutColorMode) {
			this.layoutColorMode = layoutColorMode;
		},
        addClass(element, className) {
            if (element.classList)
                element.classList.add(className);
            else
                element.className += ' ' + className;
        },
        removeClass(element, className) {
            if (element.classList)
                element.classList.remove(className);
            else
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        isDesktop() {
            return window.innerWidth > 1024;
        },
        isSidebarVisible() {
            if (this.isDesktop()) {
                if (this.layoutMode === 'static')
                    return !this.staticMenuInactive;
                else if (this.layoutMode === 'overlay')
                    return this.overlayMenuActive;
                else
                    return true;
            }
            else {
                return true;
            }
        },
    start() {
		//let tim=10;
        this.tim=3;
        this.time=5000;
		this.timer = setInterval(()=>{
		if (this.time > 0) {
		this.time--;
        //console.log(this.time);
		}else if(this.time===0){       
           clearInterval(this.timer);
           this.cerrarSesion=true;
           //console.log(this.time,'adentro');    
        }
        },1000);      
},	
CerrarLogin(){
this.datosUsuario.data.length=0;
this.cerrarSesion=false;
},
Continuar(){
this.cerrarSesion=false;
},
	login: function(){
        localStorage.setItem('usuario', this.usuario);
		/*const entrar = 
			"cdo="  + this.cdo +
			"&base="+ this.base +
			"&usuario="+ this.usuario +
			"&password="+ sha1.hex(this.password);*/
	/*this.loginServicio.LoginAll().then(data => {this.datosUsuario=data;console.log(this.datosUsuario)});
    console.log(this.datosUsuario);*/
   
    this.empleadoServicio.login(this.usuario,this.password).then(data => {this.datosUsuario=data;console.log(this.datosUsuario,"aqui");
    if(this.datosUsuario.data.id!=null){
       localStorage.setItem('tienda', this.datosUsuario.data.tiendaSucursal);
       localStorage.setItem('puesto', this.datosUsuario.data.puesto);
       for(let i=0;i<this.datosUsuario.data.tiendas.length;i++){
        localStorage.setItem('permiso'+i, this.datosUsuario.data.tiendas[i].id);
        localStorage.setItem('determinante'+i, this.datosUsuario.data.tiendas[i].determinante);
        localStorage.setItem('sucursal'+i, this.datosUsuario.data.tiendas[i].formato+" "+this.datosUsuario.data.tiendas[i].sucursal);
        localStorage.setItem('permisos',i+1);
        localStorage.set
       }
       
    this.sesionAb=1;
    localStorage.setItem('nombre', this.datosUsuario.data.nombre); 
    }
    });
    
    
    
   
    /*this.hora=hoy.getHours();
    this.minuto=hoy.getMinutes();*/	
	}
     
    },
    
    computed: {
        containerClass() {
            return ['layout-wrapper', {
                'layout-overlay': this.layoutMode === 'overlay',
                'layout-static': this.layoutMode === 'static',
                'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                'layout-mobile-sidebar-active': this.mobileMenuActive,
				'p-input-filled': this.$appState.inputStyle === 'filled',
				'p-ripple-disabled': this.$primevue.config.ripple === false
            }];
        },
        sidebarClass() {
            return ['layout-sidebar', {
                'layout-sidebar-dark': this.layoutColorMode === 'dark',
                'layout-sidebar-light': this.layoutColorMode === 'light'
            }];
        },
    },
    beforeUpdate() {
        if (this.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    },
    
    components: {
        'AppTopBar': AppTopBar,
        'AppProfile': AppProfile,
        'AppMenu': AppMenu,
        
        'AppFooter': AppFooter,
    }
}
</script>

<style lang="scss">
@import './App.scss';

.p-col-12 img{
	width: 300px;
	margin-left: auto;
	margin-right: auto;
	transition: 0.3s;
	opacity: 1;
}
img:hover{
	opacity: 0.7;
}
h5{
    color: #ff0000;
}
.card {
  /*  efectos card*/
  box-shadow: 0 16px 32px 0 #000000;
  transition: 0.3s;
}
/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 16px 32px 0 #93D500;
}
/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}
.linea {
  border-top: 5px solid #000000;
  height: 8px;
  max-width: 400px;
  padding: 0;
  margin: 30px auto 0 auto;
  transition: 0.3s;
  box-shadow: 0 8px 16px 0 #03ff42;
  
}
.linea2 {
  border-top: 5px solid #07e43e;
  height: 2px;
  max-width: 600px;
  padding: 0;
  margin: 50px auto 0 auto;
  transition: 0.3s;
  box-shadow: 0 4px 8px 0 #07e43e;
}
.linea:hover{
	opacity: 0.7;
}
.linea2:hover{
	opacity: 0.7;
}
.p-progressbar .p-progressbar-value{
    background-color:#03be61;
}
</style>
