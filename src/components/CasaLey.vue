<template>
  {{ datosUsuario }}
  <div class="card">
    <Toolbar class="p-mb-4">
      <template #left>
        <div class="p-field">
          <h3>Recolectores: {{ totalRecolectores }}</h3>
          <h3>Drivers: {{ totalDrivers }}</h3>

          <!--<Button label="LISTO" class="p-button-rounded  p-button-primary p-mr-2" />
  
                    <Button label="CARGANDO" class="p-button-rounded p-button-secondary p-mr-2" />
                   
                    
                    <Button label="ENRUTA" class="p-button-rounded p-button-warning p-mr-2" />
                   
                    
                    <Button label="ENTREGADO" class="p-button-rounded p-button-success p-mr-2" />
                   
                    
                    <Button label="DEVOLUCION" class="p-button-rounded p-button-danger p-mr-2" />-->
        </div>
      </template>

      <!--<template #right>
                    <div class="p-inputgroup">
                <Button  class="p-button-rounded p-button-info p-mr-2" icon="pi pi-search"  @click="consultarRutas()"/>
                <Calendar id="dateformat" v-model="fechaConsulta"  dateFormat="dd-mm-yy" placeholder="Indique una fecha" />
                    </div>
                    
                </template>-->
    </Toolbar>
    <OverlayPanel
      ref="op"
      appendTo="body"
      :showCloseIcon="true"
      id="overlay_panel"
      style="width: 450px"
      :breakpoints="{ '960px': '75vw' }"
    >
      <DataTable
        ref="demp"
        :value="empViajesActivos"
        v-model:selection="selectedProduct1"
        dataKey="id"
        :rowHover="true"
        v-model:filters="filters1"
        filterDisplay="menu"
        :loading="loading"
        :paginator="true"
        :rows="5"
        :filters="filters1"
        :rowsPerPageOptions="[2, 3, 5]"
        editMode="cell"
        class="editable-cells-table"
        @cellEditComplete="onCellEditComplete"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        responsiveLayout="scroll"
        :globalFilterFields="[
          'order_id',
          'trip_id',
          'nombreCliente',
          'coordCargando',
          'horaCargando',
          'horaRuta',
          'coordEntrega',
          'horaEntrega',
          'comentario',
          'tienda',
          'coordRuta',
          'empId',
          '',
          'nombre',
          'coordenadaEntrada',
          'dia',
        ]"
      >
        <div
          class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between"
        ></div>
        <Toolbar class="p-mb-4">
          <template #left>
            <Button
              icon="pi pi-refresh"
              class="p-button-rounded p-button-help p-mr-2"
              @click="actualizar()"
            />
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="filters1['global'].value"
                placeholder="Buscar"
              />
            </span>
          </template>

          <template #right>
            <Button
              icon="pi pi-file-excel"
              class="p-button-success p-mb-2 p-mr-2"
              @click="exportCSVGen($event)"
            /><br />
            <Button
              type="button"
              icon="pi pi-filter-slash"
              class="p-button-outlined p-mb-2 p-mr-2"
              @click="clearFilter1()"
              v-tooltip="'Click para borrar filtro'"
            />
          </template>
        </Toolbar>
        <Column
          field="cantViajes"
          header="Viajes"
          style="min-width:12rem"
          sortable
        >
          <template #body="slotProps">
            <div>
              {{ slotProps.data.cantViajes }}
            </div>
          </template>
        </Column>
        <Column
          field="cantPedidos"
          header="Pedidos"
          style="min-width:12rem"
          sortable
        >
          <template #body="slotProps">
            <div>
              {{ slotProps.data.cantPedidos }}
            </div>
          </template>
        </Column>
        <Column field="empId" header="Id" style="min-width:12rem" sortable>
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.empId }}
            </div>
          </template>
        </Column>
        <Column field="nombre" header="Nombre" style="min-width:12rem" sortable>
          <template #body="slotProps">
            <div>
              {{ slotProps.data.nombre }}
            </div>
          </template>
        </Column>
        <Column field="tienda" header="tienda" style="min-width:12rem" sortable>
          <template #filter="{filterModel}">
            <InputText
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por id"
            />
          </template>
          <template #body="slotProps">
            <div>
              {{ slotProps.data.tienda }}
            </div>
          </template>
        </Column>

        <Column field="puesto" header="Puesto" style="min-width:12rem" sortable>
          <template #body="slotProps">
            <div>
              {{ slotProps.data.puesto }}
            </div>
          </template>
        </Column>
        <Column
          field="horaEntrada"
          header="Entrada"
          style="min-width:12rem"
          sortable
        >
          <template #body="slotProps">
            <div>
              {{ slotProps.data.horaEntrada }}
            </div>
          </template>
        </Column>
        <Column field="horaFin" header="Fin" style="min-width:12rem" sortable>
          <template #body="slotProps">
            <div>
              {{ slotProps.data.horaFin }}
            </div>
          </template>
        </Column>
        <Column field="fecha" header="Fecha" style="min-width:12rem" sortable>
          <template #body="slotProps">
            <div>
              {{ slotProps.data.fecha }}
            </div>
          </template>
        </Column>
      </DataTable>
    </OverlayPanel>
    <OverlayPanel
      ref="op"
      appendTo="body"
      :showCloseIcon="true"
      id="overlay_panel_two"
      style="width: 650px"
      :breakpoints="{ '960px': '75vw' }"
    >
      <DataTable
        ref="rep"
        :value="reporte"
        dataKey="id"
        :rowHover="true"
        :loading="loading"
        :paginator="true"
        :rows="3"
        :filters="filters1"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        responsiveLayout="scroll"
      >
        <div
          class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between"
        ></div>
        <Toolbar class="p-mb-4">
          <template #left>
            
            
               <div class="field col-12 md:col-4">
                       
                        <Calendar id="dateformat" v-model="fechaInicio" dateFormat="dd-mm-yy" />
                    
                    </div>
                    
            <div class="field col-12 md:col-4">
                        <Button type="button" icon="pi pi-search" class="p-button-outlined p-mb-2"
                            @click="FiltrarReporte()" v-tooltip="'Buscar'" />
                    </div>
          </template>

          <template #right>
            <Button
              icon="pi pi-file-excel"
              class="p-button-success p-mb-2 p-mr-2"
              @click="exportCSVV($event)"
            /><br />
            
          </template>
        </Toolbar>
        <Column field="empId" header="empId"></Column>
   <Column field="empNombreOperaciones" header="Nombre"></Column>
   <Column field="puesto" header="Puesto"></Column>
   <Column field="rutaId" header="Ruta id"></Column>
   <Column field="pedidoId" header="Id de pedidos"></Column>
<Column field="ordersByTrSip" header="N° de pedidos"></Column>
<Column field="numeroArticulos" header="N° de articulos"></Column>
<Column field="dia" header="Dia"></Column>
<Column field="status" header="Status"></Column>
<Column field="Id" header="id"></Column>
<Column field="agregados" header="Agregados"></Column>
<Column field="sustitutos" header="Sustitutos"></Column>
<Column field="cancelados" header="Cancelados"></Column>
<Column field="comentario" header="Comentario"></Column>
<Column field="comentarioSup" header="Comentario Supervisor"></Column>
<Column field="coordenadasCargando" header="Coordenadas Cargando"></Column>
<Column field="coordenadasEntrega" header="Coordenadas Entrega"></Column>
<Column field="coordenadasRuta" header="Coordenadas Ruta"></Column>
<Column field="empId" header="N° de empleado"></Column>
<Column field="empSup" header="N° Supervisor"></Column>
<Column field="evidencia" header="Evidencia"></Column>
<Column field="faltantes" header="Faltantes"></Column>
<Column field="horaCargando" header="Hora CArgando"></Column>
<Column field="horhoraRuta_ruta" header="Hora Ruta"></Column>
<Column field="horaEntrega" header="Hora Entrega"></Column>
<Column field="RegresoTiendaHora" header="Hora Regreso Tienda"></Column>
<Column field="nombreCliente" header="Nombre del Cliente"></Column>
<Column field="sustitutos" header="Sustitutos"></Column>
<Column field="sucursal" header="Sucursal"></Column>
<Column field="regresoTiendaHora" header="Hora de regreso a tienda"></Column>

      </DataTable>
    </OverlayPanel>

    <DataView
      :value="empViajesActivos"
      :layout="layout"
      :paginator="true"
      :rows="4"
      :sortOrder="sortOrder"
      :sortField="sortField"
    >
      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-6" style="text-align: left">
            <Dropdown
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Ordenar"
              class="p-mr-2"
              @change="onSortChange($event)"
            />
            <Button
              label="Productividad"
              class="p-button-primary p-button-warning p-mr-2"
              @click="productividad()"
            />

            <Button
              class="p-button-success p-mr-2"
              type="button"
              icon="pi pi-file-excel"
              label="Resumen"
              @click="toggle"
              aria-haspopup="true"
              aria-controls="overlay_panel"
            />
            <Button
              class="p-button-success p-mr-2"
              type="button"
              icon="pi pi-file-excel"
              label="Reporte"
              @click="toggle"
              aria-haspopup="true"
              aria-controls="overlay_panel_two"
            />
          </div>
          <div class="col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div class="product-list-item">
            <img :src="slotProps.data.asistenciaFoto" />
            <div class="product-list-detail">
              <div class="product-price">{{ slotProps.data.tienda }}</div>
              <div class="product-description">{{ slotProps.data.nombre }}</div>
              <div class="product-description">{{ slotProps.data.puesto }}</div>
              <div class="product-description">
                Ent: {{ slotProps.data.horaEntrada }}
              </div>
              <div class="product-description">
                Sal: {{ slotProps.data.horaFin }}
              </div>
              <span class="product-price"
                >V:{{ slotProps.data.cantViajes }} P:{{
                  slotProps.data.cantPedidos
                }}</span
              >
            </div>
            <div class="product-list-action">
              <Button
                icon="pi pi-chart-bar"
                @click="consultarViajes(slotProps.data)"
              ></Button>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 md:col-4">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <i class="pi pi-map product-category-icon"></i>
                <span class="product-category"
                  >Viajes:{{ slotProps.data.cantViajes }}</span
                >
              </div>
            </div>
            <div class="product-grid-item-content">
              <img
                :src="slotProps.data.asistenciaFoto"
                width="100"
                height="100"
              />
              <div class="product-name">{{ slotProps.data.tienda }}</div>
              <div class="product-description">{{ slotProps.data.nombre }}</div>
              <div class="product-description">
                Ent:{{ slotProps.data.horaEntrada }}
              </div>
              <div class="product-description">
                Sal:{{ slotProps.data.horaFin }}
              </div>
              <div class="product-description">{{ slotProps.data.puesto }}</div>
            </div>
            <div class="product-grid-item-bottom">
              <span class="product-price"
                >Pedidos:{{ slotProps.data.cantPedidos }}</span
              >
              <Button
                icon="pi pi-chart-bar"
                @click="consultarViajes(slotProps.data)"
              ></Button>
            </div>
          </div>
        </div>
      </template>
    </DataView>
    <Sidebar v-model:visible="visibleFull" :baseZIndex="10000" position="full">
      <h2>{{ viajeEmp[0].nombre }}</h2>
      <h4>{{ viajeEmp[0].dia }}</h4>

      <DataTable
        ref="dt"
        :value="viajeEmp"
        v-model:selection="selectedProduct1"
        dataKey="id"
        :rowHover="true"
        v-model:filters="filters1"
        filterDisplay="menu"
        :loading="loading"
        :paginator="true"
        :rows="5"
        editMode="cell"
        class="editable-cells-table"
        @cellEditComplete="onCellEditComplete"
        :filters="filters1"
        :rowsPerPageOptions="[2, 3, 5]"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        responsiveLayout="scroll"
        :globalFilterFields="[
          'order_id',
          'trip_id',
          'nombreCliente',
          'coordCargando',
          'horaCargando',
          'horaRuta',
          'coordEntrega',
          'horaEntrega',
          'comentario',
          'tienda',
          'coordRuta',
          'empId',
          '',
          'nombre',
          'coordenadaEntrada',
          'dia',
        ]"
      >
        <div
          class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between"
        >
          <h2 class="p-m-0">Viajes {{ viajeEmp.length }}</h2>
        </div>
        <Toolbar class="p-mb-4">
          <template #left>
            <Button
              icon="pi pi-refresh"
              class="p-button-rounded p-button-help p-mr-2"
              @click="actualizar()"
            />
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="filters1['global'].value"
                placeholder="Buscar"
              />
            </span>
          </template>

          <template #right>
            <Button
              icon="pi pi-file-excel"
              class="p-button-success p-mb-2 p-mr-2"
              @click="exportCSV($event)"
            /><br />
            <Button
              type="button"
              icon="pi pi-filter-slash"
              class="p-button-outlined p-mb-2 p-mr-2"
              @click="clearFilter1()"
              v-tooltip="'Click para borrar filtro'"
            />
          </template>
        </Toolbar>
        <Column
          field="trip_id"
          header="trip_id"
          style="min-width:12rem"
          sortable
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.trip_id }}
            </div>
          </template>
        </Column>

        <Column
          field="orders_by_trip"
          header="cant-Pedidos"
          style="min-width:12rem"
          sortable
        >
          <template #body="slotProps">
            <div>
              {{ slotProps.data.orders_by_trip }}
            </div>
          </template>
        </Column>
        <Column
          field="horaRegTienda"
          header="horaRegTienda"
          style="min-width:12rem"
          sortable
        >
          <template #body="slotProps">
            <div>
              {{ slotProps.data.horaRegTienda }}
            </div>
          </template>
        </Column>

        <Column field="status" header="status" style="min-width:12rem" sortable>
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.status }}
            </div>
          </template>
          <template #filter="{filterModel}">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por "
            />
          </template>
        </Column>
        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-plus-circle"
              class="p-button-rounded p-button-success p-mr-2"
              @click="Info(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
      <div class="p-field">
        <h2 class="p-m-0">Pedidos</h2>
        <DataTable
          :value="pedidos"
          :paginator="true"
          :rowHover="true"
          :rows="5"
          editMode="cell"
          class="editable-cells-table"
          @cellEditComplete="onCellEditComplete"
          :rowsPerPageOptions="[5, 10, 15]"
          :modal="true"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          responsiveLayout="scroll"
        >
          <!--<h1>VIAJE: {{operador.trip_id}}</h1>-->

          <Column field="order_id" header="N° Pedido">
            <template #body="slotProps">
              <div :class="stockClass(slotProps.data)">
                {{ slotProps.data.order_id }}
              </div>
            </template>
          </Column>

          <Column field="empId" header="Id">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.empId }}
              </div>
            </template>
          </Column>
          <Column field="nombreCliente" header="Nombre/Cliente">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.nombreCliente }}
              </div>
            </template>
          </Column>
          <Column field="dia" header="Fecha">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.dia }}
              </div>
            </template>
          </Column>
          <Column field="horaCargando" header="Hora-Cargando">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.horaCargando }}
              </div>
            </template>
          </Column>
          <Column field="coordCargando" header="Coord-Cargando">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.coordCargando }}
              </div>
            </template>
          </Column>
          <Column field="horaRuta" header="Hora-Ruta">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.horaRuta }}
              </div>
            </template>
          </Column>
          <Column field="coordRuta" header="Coord-Ruta">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.coordRuta }}
              </div>
            </template>
          </Column>
          <Column field="horaEntrega" header="Hora-Entrega">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.horaEntrega }}
              </div>
            </template>
          </Column>
          <Column field="coordEntrega" header="Coord-Entrega">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.coordEntrega }}
              </div>
            </template>
          </Column>
          <Column field="comentario" header="Comentario">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.comentario }}
              </div>
            </template>
          </Column>
          <Column field="faltantes" header="F">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.faltantes }}
              </div>
            </template>
          </Column>
          <Column field="sustitutos" header="S">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.sustitutos }}
              </div>
            </template>
          </Column>
          <Column field="agregados" header="A">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.agregados }}
              </div>
            </template>
          </Column>
          <Column field="cancelados" header="C">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.cancelados }}
              </div>
            </template>
          </Column>
          <Column field="status" header="status">
            <template #body="slotProps">
              <div :class="stockClass(slotProps.data)">
                {{ slotProps.data.status }}
              </div>
            </template>
          </Column>
          <Column field="comentarioSup" header="Comentario/S">
            <template #body="slotProps">
              <div>
                {{ slotProps.data.comentarioSup }}
              </div>
            </template>
            <template #editor="{ data }">
              <InputText v-model="data['comentarioSup']" />
            </template>
          </Column>
        </DataTable>
      </div>
    </Sidebar>
  </div>
</template>
<script>
import AsistenciaServicio from "../service/AsistenciaServicio";
import PedidosServicio from "../service/PedidosServicio";
import ViajesServicio from "../service/ViajesServicio";
import AsignacionTiendaServicio from "../service/AsignacionTiendaServicio";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import AsignacionDiariaServicio from "../service/AsignacionDiariaServicio";

export default {
  data() {
    return {
      fechaInicio:null,
      reporte:null,
        permisos: null,
            idPermisos: [{
                id: null,
                sucursal:null
            }],
      products: null,
      layout: "grid",
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        { label: "Mas pedidos", value: "!cantPedidos" },
        { label: "Menos pedidos", value: "cantPedidos" },
      ],
      visibleFull: false,
      cantViajes: 0,
      cantPedidos: 0,
      asigEmpId: null,
      fechaConsulta: null,
      operadorDialog: false,
      operador: null,
      tienda: null,
      filters1: null,
      loading: true,
      asignacionTiendaServicio: null,
      pedidos: null,
      viajes: [],
      asignacionDiariaServicio: null,
      viajeEmp: [],
      viaj: null,
      viajesPuesto: [],
      viajPuesto: null,
      empleados: [],
      empViajesActivos: [
        {
          cantViajes: null,
          cantPedidos: null,
          asistenciaFoto: null,
          empId: null,
          nombre: null,
          tienda: null,
          puesto: null,
          horaEntrada: null,
          horaFin: null,
          fecha: null,
        },
      ],
      tiendaBuscar: null,
      totalRecolectores: 0,
      totalDrivers: 0,
      asistenciaDia: [],
      empCasaLey: [],
      emp: [],
      asistenciaServicio: null,
      pedidosServicio: null,
      viajesServicio: null,
      selectedProduct1: null,
      empleadoServicio: null,
      horaValidarBet: [
        { label: "¡OK!", value: "¡OK!" },
        { label: "¡NO OK!", value: "¡NO OK!" },
      ],
    };
  },
  async created() {
    this.asistenciaServicio = new AsistenciaServicio();
    this.viajesServicio = new ViajesServicio();
    this.pedidosServicio = new PedidosServicio();
    this.asignacionTiendaServicio = new AsignacionTiendaServicio();
    this.asignacionDiariaServicio = new AsignacionDiariaServicio();

    this.initFilters1();
  },
  async mounted() {
    //this.viajesCasaLey();
    this.permisosTienda();
    this.empActivos();
    //await this.viajesServicio.getAll().then(data=>{this.viajes=data.data;this.loading=false; console.log(data.data,'viajes');});
  },
  methods: {
    async FiltrarReporte(){
     let empId = localStorage.usuario
     var dia= this.fechaInicio.getDate()+'-'+(this.fechaInicio.getMonth()+1)+'-'+this.fechaInicio.getFullYear();
 await this.viajesServicio.findReporte(dia,empId).then(data => { this.reporte = data.data; this.loading = false; console.log(data.data, 'reporte'); }).catch(error => {
            this.mensaje = error + '----';
        });
 },
    permisosTienda() {
            let cont = -1;
            var inter,sucur;
            this.permisos = localStorage.permisos;
            for (let i = 0; i < this.permisos; i++) {
                cont = cont + 1;
                inter = "permiso" + i;
                sucur="sucursal" +i;
                this.idPermisos[cont] = {
                    id: parseInt(localStorage.getItem(inter)),
                    sucursal:localStorage.getItem(sucur)
                }

            } console.log(this.idPermisos, "permisos");
        },
    toggle(event) {
      this.$refs.op.toggle(event);
      this.loading = false;
    },
    async consultarRutas() {
      var fecha;
      this.viajes = [];
      fecha =
        this.fechaConsulta.getDate() +
        "-" +
        (this.fechaConsulta.getMonth() + 1) +
        "-" +
        this.fechaConsulta.getFullYear();

      console.log(fecha);
      let y = -1;
      //console.log(dia);
      this.tienda = localStorage.tienda;
      await this.asignacionTiendaServicio
        .getEmpId(localStorage.usuario)
        .then((data) => {
          this.asigEmpId = data.data;
          //console.log(this.asigEmpId,"cps");
          this.viajesServicio.findByDia(fecha).then((data) => {
            this.viaj = data.data;
            this.loading = false;
            for (let p = 0; p < this.asigEmpId.length; p++) {
              for (let r = 0; r < this.viaj.length; r++) {
                if (this.asigEmpId[p].tiendaSucursal === this.viaj[r].tienda) {
                  y = y + 1;
                  this.viajes[y] = {
                    coordRegTienda: this.viaj[r].coordRegTienda,
                    dia: this.viaj[r].dia,
                    empId: this.viaj[r].empId,
                    horaRegTienda: this.viaj[r].horaRegTienda,
                    id: this.viaj[r].id,
                    nombre: this.viaj[r].nombre,
                    orders_by_trip: this.viaj[r].orders_by_trip,
                    status: this.viaj[r].status,
                    tienda: this.viaj[r].tienda,
                    trip_id: this.viaj[r].trip_id,
                  };
                }
              }
            }
            //console.log(this.viajes,"resp");
          });
        });
    },
    async consultarViajes(emp) {
      //let sum=-1;
      this.viajeEmp = [];
      this.loading = true;
      var hoy = new Date();
      var dia =
        hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
      this.empAct = { ...emp };
      //console.log(dia,this.empAct.empId);
      await this.viajesServicio
        .findByEmpDia(this.empAct.empId, dia)
        .then((data) => {
          this.viajeEmp = data.data;
          console.log(this.viajeEmp, "this.viajeEmp");
          this.visibleFull = true;
          this.loading = false;
        });

      this.loading = false;
    },
    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf("!") === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    },

    async empActivos() {
      let sum = -1;
      this.totalRecolectores = 0;
      this.totalDrivers = 0;
      this.tiendaBuscar = "CASA LEY TRES RIOS";
      //let pedidos=0;
      //usuario=localStorage.usuario;
      var MyDate = new Date();
      var fecha;
      fecha =
        ("0" + MyDate.getDate()).slice(-2) +
        "-" +
        ("0" + (MyDate.getMonth() + 1)).slice(-2) +
        "-" +
        MyDate.getFullYear();
      var hoy = new Date();
      var dia =
        hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
      // console.log(this.asigEmpId[a].tiendaSucursal);
      await this.asignacionDiariaServicio.getHistorico(fecha).then((data) => {
        this.emp = data.data;
        console.log(this.emp, "emp");
        for (let l = 0; l < this.emp.length; l++) {
            for(let j=0; j<this.idPermisos.length;j++){
                if(this.emp[l].tiendasEmpleados.length>0){
                    if (this.emp[l].tiendasEmpleados[0].id === this.idPermisos[j].id) {
            sum = sum + 1;
            this.empViajesActivos[sum] = {
              cantViajes: 0,
              cantPedidos: 0,
              asistenciaFoto: null,
              empId: this.emp[l].empId,
              nombre: this.emp[l].empNombre,
              tienda: this.idPermisos[j].sucursal,
              puesto: this.emp[l].role,
              fecha: fecha,
            };

            }

                }
          }
        }
        console.log(this.empViajesActivos, "this.empleados");
        this.asistenciaServicio.getDia(dia).then((data) => {
          this.asistenciaDia = data.data;
          //console.log(this.asistenciaDia,"this.asistenciaDia");
          for (let r = 0; r < this.asistenciaDia.length; r++) {
            //console.log(this.asistenciaDia[r].empId,"empViajesActivos");

            for (let y = 0; y < this.empViajesActivos.length; y++) {
              //console.log(this.asistenciaDia,"asistenciaDia");
              if (
                this.asistenciaDia[r].empId === this.empViajesActivos[y].empId
              ) {
                //console.log("aqu");
                this.empViajesActivos[y].asistenciaFoto = this.asistenciaDia[
                  r
                ].urlSeguro;
                this.empViajesActivos[y].horaEntrada = this.asistenciaDia[
                  r
                ].horaInicio;
                this.empViajesActivos[y].horaFin = this.asistenciaDia[
                  r
                ].horaFinJornada;
                if (this.empViajesActivos[y].puesto === "RECOLECTOR") {
                  this.totalRecolectores = this.totalRecolectores + 1;
                } else {
                  this.totalDrivers = this.totalDrivers + 1;
                }
              }
            }
          }
        });
        this.productividad();
      });
    },
    async productividad() {
      var hoy = new Date();
      var dia =
        hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();

      // console.log(this.empViajesActivos);
      for (let i = 0; i < this.empViajesActivos.length; i++) {
        await this.viajesServicio.findByEmpDia(this.empViajesActivos[i].empId,dia).then((data) => {
          this.cantViajes = data.data;
console.log(this.cantViajes,"cantViajes");
          if (this.cantViajes.length > 0) {
            this.empViajesActivos[i].cantViajes = this.cantViajes.length;
          }
        });
        await this.pedidosServicio
          .findDiaEmp(dia, this.empViajesActivos[i].empId)
          .then((data) => {
            this.cantPedidos = data.data;
            if (this.cantPedidos.length > 0) {
              this.empViajesActivos[i].cantPedidos = this.cantPedidos.length;
            }
          });
      }

      // console.log(this.empViajesActivos,"aqui");
    },

    async viajesCasaLey() {
      var hoy = new Date();
      var dia =
        hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();

      //console.log(dia);

      //console.log(this.asigEmpId,"cps");
      await this.viajesServicio.findByDia(dia).then((data) => {
        this.viajes = data.data;
        console.log(this.viajes, "this.viaj");
        this.loading = false;

        //console.log(this.viajes,"resp");
      });
    },
    async actualizar() {
      var hoy = new Date();
      var dia =
        hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();

      this.viajesServicio.findByDia(dia).then((data) => {
        this.viajes = data.data;
        console.log(this.viajes, "this.viaj");
        this.loading = false;

        //console.log(this.viajes,"resp");
      });
    },
    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        empId: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        id: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        coordenadaEntrada: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        dia: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        nombre: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        estatusActual: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        pedidos: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        cajas: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        //'status': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        //'activity': {value: null, matchMode: FilterMatchMode.BETWEEN},
        //'verified': {value: null, matchMode: FilterMatchMode.EQUALS}
      };
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    exportCSVGen() {
      this.$refs.demp.exportCSV();
    },
    exportCSVV() {
      this.$refs.rep.exportCSV();
    },
    clearFilter1() {
      this.initFilters1();
    },
    getStatusLabel(status) {
      switch (status) {
        case "SN":
          return "SIN ASIGNAR";

        case "A":
          return "ASIGNADO";
      }
    },
    async onCellEditComplete(event) {
      const d = event.data;
      console.log(d);
    },
    stockClass(data) {
      return [
        {
          LISTO: data.status == "LISTO",
          CARGANDO: data.status === "CARGANDO",
          ENRUTA: data.status === "ENRUTA",
          ENTREGADO: data.status === "ENTREGADO",
          COBRO: data.status === "COBRO",
          DEVOLUCION: data.status === "DEVOLUCION",
        },
      ];
    },
    onProductSelect(event) {
      this.$refs.op.hide();
      console.log(event.data);

      //this.empleadoRec.pedidoIdSucursal=t0his.indiceRec=data.pedidoIdSucursal;
    },
    async Info(operador) {
      this.operador = { ...operador };
      await this.pedidosServicio
        .findTripId(this.operador.trip_id)
        .then((data) => {
          this.pedidos = data.data;
          console.log(this.pedidos, "this.pedidos");
          this.loading = false;
        });
      this.operadorDialog = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.p-button-primary {
  background: #29abe2;
  border: #29abe2;
}
.p-button-danger {
  background: #ff8500;
  border: #ff8500;
}
.p-button-success {
  background: #93d500;
  border: #93d500;
}
.card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}
/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 4px 8px 0 #fbfbfb;
}
.LISTO {
  font-weight: 700;
  color: #29abe2;
}
.DEVOLUCION {
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
.ENTREGADO {
  font-weight: 700;
  color: #93d500;
}
.COBRO {
  font-weight: 700;
  color: #009e15;
}
.FINALIZO {
  font-weight: 700;
  color: #009e15;
}
.p-dropdown {
  width: 14rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-description {
  margin: 0 0 1rem 0;
}

.product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
}
::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .p-rating {
    margin: 0 0 0.5rem 0;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    align-self: flex-end;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: 0.5rem;
  }
}
::v-deep(.product-grid-item) {
  margin: 0.5rem;
  border: 1px solid var(--surface-border);

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 2rem 0;
  }

  .product-grid-item-content {
    text-align: center;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

@media screen and (max-width: 576px) {
  .product-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 2rem 0;
    }

    .product-list-detail {
      text-align: center;
    }

    .product-price {
      align-self: center;
    }

    .product-list-action {
      display: flex;
      flex-direction: column;
    }

    .product-list-action {
      margin-top: 2rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}
@media (max-width: 1902px) {
  .tam-tab {
    width: 900px;
  }
}
</style>
