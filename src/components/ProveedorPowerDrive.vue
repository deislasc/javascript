<template>
{{datosUsuario}}
    <div class="card">
    <Toolbar class="p-mb-4">
    <template #left>
    
    <div class="p-field">
        
                     
                    <Button label="CARGANDO" class="p-button-rounded p-button-secondary p-mr-2" />
                   
                    
                    <Button label="ENRUTA" class="p-button-rounded p-button-warning p-mr-2" />
                   
                    
                    <Button label="ENTREGADO" class="p-button-rounded p-button-success p-mr-2" />
                   
                    
                    <Button label="DEVOLUCION" class="p-button-rounded p-button-danger p-mr-2" />
                    
        </div>       
                    </template>
    
				<template #right>                    
                        <div class="p-inputgroup">
                <Button  class="p-button-rounded p-button-info p-mr-2" icon="pi pi-search"  @click="consultarRutas()"/>
                <Calendar id="dateformat" v-model="fechaConsulta"  dateFormat="dd-mm-yy" placeholder="Indique una fecha" />
                    </div>
                </template>
				</Toolbar>
                <DataTable ref="dt" :value="viajes" v-model:selection="selectedProduct1"  dataKey="id" :rowHover="true" v-model:filters="filters1" filterDisplay="menu" :loading="loading" :paginator="true" :rows="10" :filters="filters1" :rowsPerPageOptions="[10,20,40]" 
		editMode="cell" class="editable-cells-table" @cellEditComplete="onCellEditComplete" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"  responsiveLayout="scroll" :globalFilterFields="['order_id','trip_id','nombreCliente','coordCargando','horaCargando','horaRuta','coordEntrega','horaEntrega','comentario','tienda','coordRuta','empId','','nombre','coordenadaEntrada','dia'] ">
                                <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
							<h2 class="p-m-0">Viajes</h2>
                                </div>
                                <Toolbar class="p-mb-4">
                    <template #left>
                    <Button icon="pi pi-refresh" class="p-button-rounded p-button-help p-mr-2" @click="actualizar()"/>
                    
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters1['global'].value" placeholder="Buscar" />
                    </span>
                    </template>
                    
				<template #right>
                    <Button  icon="pi pi-file-excel" class="p-button-success p-mb-2 p-mr-2" @click="exportCSV($event)"  /><br>
					<Button type="button" icon="pi pi-filter-slash" class="p-button-outlined p-mb-2 p-mr-2" @click="clearFilter1()" v-tooltip="'Click para borrar filtro'"/>
					</template> 
                        </Toolbar>
                    <Column field="trip_id" header="N° Viaje" style="min-width:12rem" sortable>
                 <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{slotProps.data.trip_id}}
                    </div>
                </template>
                </Column>
                
                <Column field="orders_by_trip" header="cant-pedidos" style="min-width:12rem" sortable>
                 <template #body="slotProps">
                    <div >
                        {{slotProps.data.orders_by_trip}}
                    </div>
                </template>
                </Column>
                    <Column field="empId" header="empId" style="min-width:12rem" sortable>
                 <template #body="slotProps">
                    <div >
                        {{slotProps.data.empId}}
                    </div>
                </template>
                </Column>
                <Column field="nombre" header="nombre" style="min-width:12rem" sortable>
                 <template #body="slotProps">
                    <div >
                        {{slotProps.data.nombre}}
                    </div>
                </template>
                </Column>
                    <Column field="tienda" header="tienda" style="min-width:12rem" sortable>
						<template #filter="{filterModel}">
                            <InputText v-model="filterModel.value" class="p-column-filter" placeholder="Buscar por id"/>
                        </template>
                        <template #body="slotProps">
                    <div>
                        {{slotProps.data.tienda}}
                    </div>
                </template>
					</Column>
                    
                    
                    <Column field="dia" header="dia" style="min-width:12rem" sortable>
				<template #body="slotProps">
                    <div >
                        {{slotProps.data.dia}}
                    </div>
                </template>
                </Column>
                   
                    <Column field="coordRegTienda" header="coordenadas regreso tienda" style="min-width:12rem" sortable>
				<template #body="slotProps">
                    <div>
                        {{slotProps.data.coordRegTienda}}
                    </div>
                </template>
					</Column>
                    
                    <Column field="horaRegTienda" header="horaRegTienda" style="min-width:12rem" sortable>
				<template #body="slotProps">
                    <div >
                        {{slotProps.data.horaRegTienda}}
                    </div>
                </template>
					</Column> 
                                   
                    <Column field="status" header="status" style="min-width:12rem" sortable>
				<template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{slotProps.data.status}}
                    </div>
                </template>
						<template #filter="{filterModel}">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Buscar por "/>
                        </template>
					</Column>
                    <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-plus-circle" class="p-button-rounded p-button-success p-mr-2" @click="Info(slotProps.data)" />
                        
                    </template>
                </Column>
                                    
                </DataTable>
    <Dialog v-model:visible="operadorDialog"  header="Pedidos" :breakpoints="{'960px': '75vw'}" :style="{width: '50vw'}" :maximizable="true" :modal="true" class="p-fluid">
            
            <div class="p-field">
            <DataTable :value="pedidos" :paginator="true" :rowHover="true" :rows="5" :rowsPerPageOptions="[5,10,15]" :modal="true" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" responsiveLayout="scroll">
            <h1>VIAJE: {{operador.trip_id}}</h1>
            
            <Column field="order_id" header="N° Pedido">
            <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{slotProps.data.order_id}}
                    </div>
                </template>
            </Column>
            
            <Column field="empId" header="Id">
            <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{slotProps.data.empId}}
                    </div>
                </template>
                </Column>
            <Column field="nombreCliente" header="Nombre/Cliente">
            <template #body="slotProps">
                    <div >
                        {{slotProps.data.nombreCliente}}
                    </div>
                </template>
            </Column>
            <Column field="dia" header="Fecha">
            <template #body="slotProps">
                    <div >
                        {{slotProps.data.dia}}
                    </div>
                </template>
            </Column>
            <Column field="horaCargando" header="Hora-Cargando">
            <template #body="slotProps">
                    <div >
                        {{slotProps.data.horaCargando}}
                    </div>
                </template>
                </Column>
            <Column field="coordCargando" header="Coord-Cargando">
            <template #body="slotProps">
                    <div >
                        {{slotProps.data.coordCargando}}
                    </div>
                </template>
            </Column>
            <Column field="horaRuta" header="Hora-Ruta">
            <template #body="slotProps">
                    <div >
                        {{slotProps.data.horaRuta}}
                    </div>
                </template>
            </Column>
            <Column field="coordRuta" header="Coord-Ruta">
            <template #body="slotProps">
                    <div >
                        {{slotProps.data.coordRuta}}
                    </div>
                </template>
            </Column>
            <Column field="horaEntrega" header="Hora-Entrega">
            <template #body="slotProps">
                    <div >
                        {{slotProps.data.horaEntrega}}
                    </div>
                </template>
            </Column>
            <Column field="coordEntrega" header="Coord-Entrega">
            <template #body="slotProps">
                    <div >
                        {{slotProps.data.coordEntrega}}
                    </div>
                </template>
            </Column>
            <Column field="comentario" header="Comentario">
            <template #body="slotProps">
                    <div>
                        {{slotProps.data.comentario}}
                    </div>
                </template>
            </Column>
           
            <Column field="status" header="status">
            <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{slotProps.data.status}}
                    </div>
                </template>
                </Column>
            
            </DataTable>
                </div>
    </Dialog>
                </div>
</template>
<script>
import AsistenciaServicio from '../service/AsistenciaServicio';
import PedidosServicio from '../service/PedidosServicio';
import ViajesServicio from '../service/ViajesServicio';
import AsignacionTiendaServicio from '../service/AsignacionTiendaServicio';
import {FilterMatchMode,FilterOperator} from 'primevue/api';

export default ({
    data(){
        return{
            asigEmpId:null,
            fechaConsulta:null,
            operadorDialog:false,
            operador:null,
            tienda:null,
            filters1:null,
            loading:true,
            asignacionTiendaServicio:null,
            pedidos:null,
            viajes:[],
            viaj:null,
            asistenciaServicio:null,
            pedidosServicio:null,
            viajesServicio:null,
            selectedProduct1:null,
            horaValidarBet:[
				{label:'¡OK!', value:'¡OK!'},
				{label:'¡NO OK!', value:'¡NO OK!'}
			],
        }
    },
    async created(){
        this.asistenciaServicio=new AsistenciaServicio();
        this.viajesServicio= new ViajesServicio();
        this.pedidosServicio=new PedidosServicio();
        this.asignacionTiendaServicio= new AsignacionTiendaServicio();
    this.initFilters1()
    },
    async mounted(){
        this.viajesB();
    },
    methods:{
        async actualizar(){
              this.viajesB();
        },
        async viajesB(){
          var hoy = new Date();
        var dia= (hoy.getDate())+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear();
            
        //console.log(dia);
        let y=-1;
    this.tienda=localStorage.tienda;
    await this.asignacionTiendaServicio.getEmpId(localStorage.usuario).then(data=>{
       this.asigEmpId=data.data;
       //console.log(this.asigEmpId,"cps");
        this.viajesServicio.findProveedorPoweDriver().then(data=>{this.viaj=data.data;this.loading=false;
        for(let p=0;p<this.asigEmpId.length;p++){
            for(let r=0;r<this.viaj.length;r++){
                if(this.asigEmpId[p].tiendaSucursal===this.viaj[r].tienda && this.viaj[r].dia===dia){
                    y=y+1;
                    this.viajes[y]={
                coordRegTienda:this.viaj[r].coordRegTienda,
                dia:this.viaj[r].dia,
                empId:this.viaj[r].empId,
                horaRegTienda:this.viaj[r].horaRegTienda,
                id:this.viaj[r].id,
                nombre:this.viaj[r].nombre,
                orders_by_trip:this.viaj[r].orders_by_trip,
                status:this.viaj[r].status,
                tienda:this.viaj[r].tienda,
                trip_id:this.viaj[r].trip_id,
                        
                    }
                    
                }
            }
            
        }
        //console.log(this.viajes,"resp");
        });
        
    })
    //await this.viajesServicio.getAll().then(data=>{this.viajes=data.data;this.loading=false; console.log(data.data,'viajes');});
    
        },
      async consultarRutas(){
            var fecha;
            this.viajes=[];
            fecha =(this.fechaConsulta.getDate())+'-'+(this.fechaConsulta.getMonth()+1)+'-'+this.fechaConsulta.getFullYear();
             
            console.log(fecha);
            let y=-1;
        //console.log(dia);
    this.tienda=localStorage.tienda;
    await this.asignacionTiendaServicio.getEmpId(localStorage.usuario).then(data=>{
       this.asigEmpId=data.data;
       //console.log(this.asigEmpId,"cps");
        this.viajesServicio.findProveedorPoweDriver().then(data=>{this.viaj=data.data;this.loading=false;
        for(let p=0;p<this.asigEmpId.length;p++){
            for(let r=0;r<this.viaj.length;r++){
                if(this.asigEmpId[p].tiendaSucursal===this.viaj[r].tienda && this.viaj[r].dia===fecha){
                    y=y+1;
                    this.viajes[y]={
                coordRegTienda:this.viaj[r].coordRegTienda,
                dia:this.viaj[r].dia,
                empId:this.viaj[r].empId,
                horaRegTienda:this.viaj[r].horaRegTienda,
                id:this.viaj[r].id,
                nombre:this.viaj[r].nombre,
                orders_by_trip:this.viaj[r].orders_by_trip,
                status:this.viaj[r].status,
                tienda:this.viaj[r].tienda,
                trip_id:this.viaj[r].trip_id,
                        
                    }
                    
                }
            }
            
        }
        //console.log(this.viajes,"resp");
        });
        
    })

        },
        initFilters1() {
				this.filters1 = {
					'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
					'empId': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'id':{operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
                    'coordenadaEntrada':{operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
                    'dia':{operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
                    'nombre':{operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
                    'estatusActual':{operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
                    'pedidos':{operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
                    'cajas':{operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
					//'status': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
					//'activity': {value: null, matchMode: FilterMatchMode.BETWEEN},
					//'verified': {value: null, matchMode: FilterMatchMode.EQUALS}
				};
			},
            exportCSV() {
            this.$refs.dt.exportCSV();
        },
			clearFilter1() {
				this.initFilters1();
			},
            getStatusLabel(status) {
            switch(status) {
                case 'SN':
                    return 'SIN ASIGNAR';

                case 'A':
                    return 'ASIGNADO';
                          }
},
async onCellEditComplete(event){
	
	const d=event.data;
	
	await this.asistenciaServicio.save(d).then(data => {console.log(data);}).catch(error => {
        this.mensaje=error+'----NO SE GUARDO ELEL CAMPO  EN LA BASE DE DATOS';
    });},
stockClass(data) {
            return [
                {
                    'LISTO': data.status=='LISTO',
                   'CARGANDO': data.status==='CARGANDO',
                   'ENRUTA': data.status ==='ENRUTA',
                   'ENTREGADO':data.status ==='ENTREGADO',
                   'COBRO':data.status ==='COBRO',
                   'DEVOLUCION':data.status ==='DEVOLUCION'
                 }
            ];
        },
 onProductSelect(event) {
            this.$refs.op.hide();
            console.log(event.data);
            
            
            //this.empleadoRec.pedidoIdSucursal=this.indiceRec=data.pedidoIdSucursal;

            
        },
        async Info(operador){
            this.operador = {...operador};
            await this.pedidosServicio.findTripId(this.operador.trip_id ).then(data=>{this.pedidos=data.data;console.log(this.pedidos,"this.pedidos");this.loading=false; });
    this.operadorDialog = true;
        }
      }

})
</script>
<style scoped>
.p-button-primary{
    background:#29abe2;
    border:#29abe2;
}
.p-button-danger{
    background:#ff8500;
    border:#ff8500 ;
}
.p-button-success{
     background:#93d500;
    border:#93d500 ;
}
.card {
  /*  efectos card*/
  box-shadow: 0 8px 16px 0 #969797;
  transition: 0.3s;
}
/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 4px 8px 0 #fbfbfb;
}
.LISTO {
    font-weight: 700;
    color: #29abe2;
    
}
.DEVOLUCION{
    font-weight: 700;
    color: #ff8500;
}
.CARGANDO {
    font-weight: 700;
    color: #4d4d4d;
}

.ENRUTA {
    font-weight: 700;
    color: #ffce00;
}
.ENTREGADO{
    font-weight: 700;
    color: #93d500;
}
.COBRO{
    font-weight: 700;
    color: #009e15;
}
.FINALIZO{
    font-weight: 700;
    color: #009e15;
}

@media (max-width: 1902px){
.tam-tab{
    width:900px
}
}
</style>

