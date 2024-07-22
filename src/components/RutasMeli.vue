<template>
    <div class="card">
        <Toolbar>
            <template #left>
                <!--  <Button label="Asignación del Dia" class="p-button-rounded p-button-warning p-mr-2" icon="pi pi-file"  @click="asignacionDiaria()"/>
    <Button label="Agregar Asignación" class="p-button-rounded p-button-success p-mr-2" icon="pi pi-plus"  @click="agregarAsignacion()"/>-->
            </template>
        </Toolbar>
        <br><br>
        <Toolbar class="p-mb-4">
            <template #left>
                <Button :label="'Rutas ' + reporteRuta.length" class="p-button-rounded p-button-secondary p-mr-2" />
                <Button label="Agregar Ruta" class="p-button-rounded p-button-primary p-mr-2" icon="pi pi-plus"
                    @click="agregarRuta()" />
                <Button label="Mostrar Rutas" icon="pi pi-refresh" class="p-button-rounded p-button-help p-mr-2"
                    @click="actualizar()" />
                <div class="p-fluid p-grid">

                    <!--<div class="p-field p-col-12 p-md-12">               
         <AutoComplete v-model="EmpNombre" :suggestions="filteredItems" @complete="searchItems" :virtualScrollerOptions="{ itemSize: 10000 }" field="nombre" dropdown />
                </div>
                <div class="p-field p-col-12 ">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-check-circle"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="ViajeId" type="text" v-model="ViajeId" />
                            <label for="ViajeId">ViajeId</label>
                        </span>
                    </div>
                    </div>-->
                    <!--<Button label="LISTO" class="p-button-rounded  p-button-primary p-mr-2" />
  
                    <Button label="CARGANDO" class="p-button-rounded p-button-secondary p-mr-2" />
                   
                    
                    <Button label="ENRUTA" class="p-button-rounded p-button-warning p-mr-2" />
                   
                    
                    <Button label="ENTREGADO" class="p-button-rounded p-button-success p-mr-2" />
                   
                    
                    <Button label="DEVOLUCION" class="p-button-rounded p-button-danger p-mr-2" />-->
                </div>
            </template>

            <template #right>
                <Button label="Generar Excel" icon="pi pi-upload" class="p-button-rounded p-button-success p-mr-2"
                    @click="exportCSV($event)" />
                <!--<Button :label="tienda.nomTiendaMeli+'-'+tienda.tiendaSucursal" class="p-button-rounded p-button-secondary p-mr-2"  @click="cambiarTienda()"/>-->

            </template>

        </Toolbar>
        <DataTable ref="dt" :value="reporteRuta" v-model:filters="filters1" filterDisplay="menu" :filters="filters1"
            :loading="loading" :paginator="true" :rows="10" editMode="cell" class="editable-cells-table"
            @cellEditComplete="onCellEditComplete"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            responsiveLayout="scroll">
            <br>
            <Toolbar class="p-mb-4">
                <template #left>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters1['global'].value" placeholder="Buscar" />
                    </span>
                </template>

            </Toolbar>
            <Column field="cedis" header="CEDIS"></Column>
            <Column field="fecha" header="Fecha"></Column>
            <Column field="ruta" header="Ruta"></Column>
            <Column field="idRuta" header="Ruta ID"></Column>
            <Column field="folioFiscal" header="folioFiscal" sortable>
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.folioFiscal }}
                    </div>
                </template>
            </Column>
            <Column field="tipoServicio" header="Tipo Servicio" sortable>
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.tipoServicio }}
                    </div>
                </template>
            </Column>
            <Column field="driver" header="Driver" sortable>
                <!--<template #editor="slotProps">
                    
                        <Dropdown v-model="slotProps.data['empNombre']" :options="asignacionD" optionLabel="empNombre" optionValue="empNombre" placeholder="Asignar">
                            <template #option="slotProps">
                                <span :class="'product-badge status-' + slotProps.option.nombre.toLowerCase()">{{slotProps.option.nombre}}</span>
                            </template>	
                        </Dropdown>
                    </template>-->
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.driver }}
                    </div>
                </template>
            </Column>
            <Column field="empId" header="Usuario" sortable>
                <!--<template #editor="slotProps">
                    
                        <Dropdown v-model="slotProps.data['empNombre']" :options="asignacionD" optionLabel="empNombre" optionValue="empNombre" placeholder="Asignar">
                            <template #option="slotProps">
                                <span :class="'product-badge status-' + slotProps.option.nombre.toLowerCase()">{{slotProps.option.nombre}}</span>
                            </template>	
                        </Dropdown>
                    </template>-->
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.empId }}
                    </div>
                </template>
            </Column>
            <Column field="unidadPlaca" header="Placa" sortable></Column>
            <Column field="tipo" header="Tipo" sortable></Column>
            <Column field="paquetes" header="Paquetes" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.paquetes }}
                    </div>
                </template>
            </Column>



            <Column field="status" header="status" sortable></Column>

        </DataTable>
        <Dialog header="ASIGNACION DIARIA" v-model:visible="displayResponsive" :breakpoints="{ '960px': '75vw' }"
            :style="{ width: '50vw' }" :maximizable="true" :modal="true">
            <div>
                {{ mensaje }}
                <Toolbar class="tol">
                    <template #left>
                        <img class="img" src="../../public/assets/layout/images/betalog.jpg" />
                        <label>
                            <div ref="content">
                                <h4>
                                    <ul> {{ mensajeAsignacion }} </ul>
                                </h4>
                                <h4>
                                    <ul>GERENTE: IRVING GILDARDO SANCHEZ GALINDO</ul>
                                </h4>
                                <h4>
                                    <ul>SUBGERENTE: CESAR RUIZ SORIANO</ul>
                                </h4>
                            </div>
                        </label>
                    </template>

                </Toolbar>
                <DataTable ref="at" :value="asignacionD" v-model:filters="filters1" filterDisplay="menu" :loading="loading"
                    :filters="filters1" :paginator="true" :rows="10" editMode="cell" class="editable-cells-table"
                    @cellEditComplete="onCellEditCompleteAsignacion"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 15]" responsiveLayout="scroll">
                    <br>
                    <Toolbar class="p-mb-4">
                        <template #left>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Buscar" />
                            </span>
                        </template>
                        <template #right>
                            <Button label="Generar PDF" icon="pi pi-upload" class="p-button-rounded p-button-success p-mr-2"
                                @click="generarPDF()" />
                            <Button label="Generar Excel" icon="pi pi-upload"
                                class="p-button-rounded p-button-success p-mr-2" @click="exportCSVAsAc($event)" />

                        </template>
                    </Toolbar>
                    <Column field="dia" header="Fecha">
                    </Column>
                    <Column field="empNombre" header="Nombre">
                    </Column>
                    <Column field="sucursal" header="Formato/Sucursal">
                        <template #editor="{ data }">
                            <InputText v-model="data['sucursal']" />
                        </template>
                    </Column>
                    <Column field="tipoServicio" header="Servicio">
                        <template #editor="{ data }">
                            <Dropdown v-model="data['tipoServicio']" :options="tipoServicioCom" optionLabel="label"
                                optionValue="label" placeholder="Servicio">
                                <template #option="slotProps">
                                    <span
                                        :class="'product-badge status-' + slotProps.option.label.toLowerCase()">{{ slotProps.option.label }}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                    <Column field="esquema" header="Esquema">
                        <template #editor="{ data }">
                            <InputText v-model="data['esquema']" />
                        </template>
                    </Column>
                    <Column field="role" header="Rol">
                        <template #editor="{ data }">
                            <Dropdown v-model="data['role']" :options="rol" optionLabel="role" optionValue="role"
                                placeholder="Servicio">
                                <template #option="slotProps">
                                    <span
                                        :class="'product-badge status-' + slotProps.option.role.toLowerCase()">{{ slotProps.option.role }}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                    <Column field="horario" header="Horario">
                        <template #editor="{ data }">
                            <InputMask mask="99:99" v-model="data['horario']" placeholder="00:00" />
                        </template>
                    </Column>
                    <Column field="statusOperacion" header="Status Operacion">
                        <template #editor="{ data }">
                            <Dropdown v-model="data['statusOperacion']" :options="statusOperacionOpcion"
                                optionLabel="status" optionValue="status" placeholder="Asignar">
                                <template #option="slotProps">
                                    <span
                                        :class="'product-badge status-' + slotProps.option.status.toLowerCase()">{{ slotProps.option.status }}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                    <Column field="placas" header="Placa">
                        <template #editor="{ data }">
                            <InputText disabled />
                            <AutoComplete v-model="data['placas']" :suggestions="filteredCountries"
                                @complete="searchCountry($event)" :dropdown="true" field="placas" forceSelection>
                                <template #item="slotProps">
                                    <div class="country-item">

                                        <div class="ml-6">{{ slotProps.item }}</div>
                                    </div>
                                </template>
                            </AutoComplete>

                        </template>
                    </Column>
                    <Column field="tipo" header="Tipo">
                    </Column>
                    <Column field="marca" header="Marca">
                    </Column>
                    <Column field="submarcas" header="Submarca">
                    </Column>
                    <Column field="modelo" header="Modelo">
                    </Column>
                    <Column field="esquemaUnidad" header="Esquema Unidad">
                    </Column>

                    <Column field="observaciones" header="Observaciones">
                        <template #editor="{ data }">
                            <InputText v-model="data['observaciones']" />
                        </template>
                    </Column>
                </DataTable>
            </div>
            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="closeResponsive" class="p-button-text" />
                <Button label="Guardar" icon="pi pi-check" @click="guardarAsignacion" autofocus />
            </template>
        </Dialog>

        <Dialog v-model:visible="operadorDialog" :style="{ width: '980px' }" header="SELECCIONA UNA TIENDA" class="p-fluid"
            :modal="true">

            <div class="p-field">
                <DataTable :value="idPermisos" v-model:selection="tienda" selectionMode="single" @rowSelect="onRowSelect"
                    @rowUnselect="onRowUnselect" dataKey="id" responsiveLayout="scroll">
                    <Column field="id" header="ID Tienda"></Column>
                    <Column field="determinante" header="Determinante"></Column>
                    <Column field="sucursal" header="Sucursal"></Column>
                </DataTable>
            </div>
        </Dialog>
        <Dialog header="Agregar Ruta" v-model:visible="abrirNuevaRuta" :breakpoints="{ '960px': '75vw' }"
            :style="{ width: '50vw' }" :maximizable="true" :modal="true">
            {{ mensaje }}
            <div>
                <Button :label="tienda.determinante+' '+tienda.sucursal" icon="pi pi-clone" @click="cambiarTienda()" />

            </div><br>
            <div class="p-fluid p-grid">
                <div class="p-field p-col-12 p-md-6">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-exclamation-triangle"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="entity_id" type="text" v-model="rutaId" />
                            <label for="entity_id">Id de la Ruta</label>
                        </span>
                    </div>
                </div>
                <div class="p-field p-col-12 p-md-2">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-check-circle"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="rutaNom" type="text" v-model="rutaNom" />
                            <label for="rutaNom">Ruta</label>
                        </span>
                    </div>
                </div>
                <div class="field col-12 p-md-6">

                    <span class="p-float-label">
                        <Dropdown id="empNombre" v-model="empNombre" :options="datosBasicosEmp" optionLabel="nombre" />
                        <label for="empNombre">Driver</label>

                    </span>
                    <br>

                </div>
                <div class="field col-12 p-md-6">

                    <span class="p-float-label">
                        <Dropdown id="tipoServicio" v-model="tipoServicio" :options="tipoServicioCom" optionLabel="label" />
                        <label for="tipoServicio">Tipo de Servicio</label>
                    </span>
                </div>

                <div class="field col-12 p-md-6">

                    <span class="p-float-label">
                        <h6>UNIDAD ASIGNADA</h6>
                        <h3>{{ empNombre.placas }}</h3>
                        <h4>{{ empNombre.tipo }} {{ empNombre.modelo }} {{ empNombre.submarcas }}</h4>
                    </span>
                </div>
            </div>
            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="closeResponsive" class="p-button-text" />
                <Button label="Guardar" icon="pi pi-check" @click="guardarRuta" autofocus />

            </template>
        </Dialog>
        <Dialog v-model:visible="cargando" :style="{ width: '500px' }" header="ESPERE UN MOMENTO PORFAVOR" class="p-fluid"
            :modal="true">

            <ProgressBar :value="progreso" />
            <template #footer>

                <Button label="Aceptar" icon="pi pi-check" @click="aceptar" autofocus />
            </template>
        </Dialog>
        <Dialog v-model:visible="cargandoRuta" :style="{ width: '500px' }"
            header="ESPERE UN MOMENTO PORFAVOR, CARGANDO PAQUETES" class="p-fluid" :modal="true">
            <label>
                Articulos: {{ cargandoRutaProgreso }}
            </label>
            <ProgressBar :value="cargandoRutaProgreso" :showValue="false" />
            <template #footer>

                <Button label="Agregar CFDI-TRASLADO" icon="pi pi-check" @click="aceptarRuta" autofocus
                    v-if="blockRuta === 0" />
            </template>
        </Dialog>
    </div>
</template>
<script>
import CfdiTrasladoMeliServicio from '../service/CfdiTrasladoMeliServicio';
import AsistenciaServicio from '../service/AsistenciaServicio';
import PedidosServicio from '../service/PedidosServicio';
import ViajesServicio from '../service/ViajesServicio';
import AsignacionTiendaServicio from '../service/AsignacionTiendaServicio';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import EmpleadosServicio from '../service/EmpleadosServicio';
import MercadoLibreServicio from '../service/MercadoLibreServicio';
import RutasServicio from '../service/RutasServicio';
import AsignacionDiariaServicio from '../service/AsignacionDiariaServicio';
import UnidadesFlotaServicio from '../service/UnidadesFlotaServicio';
import jspdf from 'jspdf';
import 'jspdf-autotable';
export default ({
    data() {
        return {
            user: [{
                client_id: 938309108549226,
                client_secret: "QQuW9yX9KiUK4v44muRScCoxtdfZ73s6",
                grant_type: "client_credentials"
            }],
            permisos: null,
            idPermisos: [{
                id: null,
                determinante: null,
                sucursal:null
            }],
            blockRuta: 0,
            shipmentData: null,
            cfdiTraslado: [{
                Version: null,
                AddendaSpecified: true,
                Fecha: null,
                rutaId: null,
                TipoDeComprobante: null,
                SubTotal: 0,
                Serie: null,
                Total: 0.0,
                Folio: null,
                Impuestos: null,
                LugarExpedicion: null,
                Moneda: null,
                Exportacion: null,
                NoCertificado: null,
                Emisor: {
                    Nombre: null,
                    RegimenFiscal: null,
                    Rfc: null,
                },
                Receptor: {
                    Nombre: null,
                    DomicilioFiscalReceptor: null,
                    RegimenFiscalReceptor: null,
                    Rfc: null,
                    UsoCFDI: null
                },
                Conceptos: [],
                Addenda: {
                    any: [{
                        Addenda: {
                            "@xmlns:addenda": "http://www.Addenda/",
                            "@xsi:schemaLocation": "http://www.addenda.xsd",
                            "@version": "1.0",
                            "Addenda:Datos": {
                                "addenda:Operador": null,
                                "addenda:unidadTipo": null,
                                "addenda:placas": null,
                                "addenda:marca": null,
                                "addenda:subMarca": null,
                                "addenda:modelo": null,
                                "addenda:ruta_id": null,
                                "addenda:shipments": null
                            }
                        }
                    }]
                }
            }],
            conceptos: {
                Cantidad: null,
                ClaveProdServ: null,
                Descripcion: null,
                ClaveUnidad: null,
                ValorUnitario: 0.0,
                Importe: 0.0,
                NoIdentificacion: null,
                ObjetoImp: "01"

            },
            cargarRuta: 0,
            progreso: 0,
            cargandoRutaProgreso: 0,
            cargando: false,
            cargandoRuta: false,
            mensajeAsignacion: null,
            filteredCountries: null,
            cfdiTrasladoMeliServicio: null,
            nomTienda: null,
            folioFis: null,
            unidadesFlotaServicio: null,
            unidades: null,
            rutaId: null,
            rutaNom: null,
            empNombre: [{
                empId: null,
                nombre: null,
                placas: "SIN ASIGNAR PLACAS",
                tipo: null,
                modelo: null,
                submarcas: null
            }],
            tipoServicio: null,
            rol: [
                { role: 'DRIVER' },
                { role: 'RECOLECTOR' },
                { role: 'POWER DRIVER' },
                { role: 'AUXILIAR' },
                { role: 'DISPACHER' },
                { role: 'ADUANA' },
                { role: 'MULTIFUNCIONAL' },
                { role: 'SUPERVISOR' },
            ],
            tipoServicioCom: [
                { label: 'CARS SAME DAY-CDMX' },
                { label: 'CARS FIJO-CDMX' },
                { label: 'SMALL VAN-CDMX' },
                { label: 'SMALL VAN BULK' },
                { label: 'CARS FIJO-CDMX' },
                { label: 'DELIVERY CELL-CDMX' },
                { label: 'RENTA LARGE VAN-CDMX' },
                { label: 'LARGE VAN-CDMX' },
                { label: 'SMALL VAN ELECTRICAL RENTALS-CDMX' },
                { label: 'BULK LARGE VAN' },
                { label: 'RENTAL REPLACEMENT' },
                { label: 'RENTAL ELECTRICAL LARGE VAN' },
                
            ],
            horarioOpcion: [
                { rango: "06:15 a 03:15" },
                { rango: "07:00 a 19:00" },
                { rango: "07:00 a 20:00" },
                { rango: "07:30 a 19:30" },
                { rango: "07:45 a 20:00" },
                { rango: "08:00 a 5:00" },
                { rango: "08:00 a 18:00" },
                { rango: "08:00 a 19:00" },
                { rango: "08:00 a 21:00" },
                { rango: "08:30 a 20:30" },
                { rango: "08:30 a 19:00" },
                { rango: "09:00 a 19:00" },
                { rango: "09:00 a 20:00" },
                { rango: "09:00 a 21:00" },
                { rango: "09:30 a 21:30" },
                { rango: "10:00 a 20:00" },
                { rango: "10:00 a 22:00" },
                { rango: "10:40 a 19:40" },
                { rango: "11:00 a 23:00" },
                { rango: "12:00 a 22:00" },

            ],
            statusOperacionOpcion: [
                { status: "OPERA" },
                { status: "FALTA" },
                { status: "DESCANSO" },
                { status: "VACACIONES" },
                { status: "BAJA" },
                { status: "INCAPACIDAD" },
                { status: "APOYO" },
            ],
            datosBasicosEmp: [{
                empId: null,
                nombre: null,
                placas: null,
                tipo: null,
                modelo: null,
                submarcas: null
            }],
            plac: [],
            asignacionDiariaServicio: null,
            asignacionGet: null,
            asignacionD: [{
                id: null,
                empId: null,
                empNombre: null,
                sucursal: null,
                tipoServicio: null,
                esquema: null,
                role: null,
                horario: null,
                placas: null,
                tipo: null,
                marca: null,
                submarcas: null,
                modelo: null,
                dia: null,
                hora: null,
                esquemaUnidad: null,
                asignador: null,
                observaciones: null,
                statusOperacion: null
            }],
            rutasServicio: null,
            displayResponsive: false,
            abrirNuevaRuta: false,
            rutas: [],
            rut: null,
            EmpNombre: null,
            filteredItems: null,
            reporteAsis: [{
                tienda: null,
                urlSeguro: null,
                empId: null,
                nombre: null,
                puesto: null,
                tiendaSucursal: null,
                dia: null,
                coordInicioJornada: null,
                horaInicio: null,
                coordFinJornada: null,
                horaFinJornada: null

            }],
            reporteAsisDefTienda: [],
            reporteAsisDef: [{
                urlSeguro: null,
                empId: null,
                nombre: null,
                puesto: null,
                tiendaSucursal: null,
                dia: null,
                coordInicioJornada: null,
                horaInicio: null,
                coordFinJornada: null,
                horaFinJornada: null

            }],
            mercadoLibreServicio: null,
            token: null,
            empleado: null,
            ViajeId: null,
            empleados: null,
            empleadosServicio: null,
            asigEmpId: null,
            operadorDialog: false,
            operador: null,
            tienda: [{
                empId: null,
                tiendaSucursal: null,
                nomTiendaMeli: null

            }],
            reporteRuta: [{
                fecha: null,
                cedis: null,
                ruta: null,
                idRuta: null,
                folioFiscal: null,
                tipoServicio: null,
                driver: null,
                empId:null,
                unidadPlaca: null,
                tipo: null,
                paquetes: null,
                status: null

            }],
            filters1: null,
            loading: true,
            asignacionTiendaServicio: null,
            pedidos: null,
            viajes: [],
            viaj: null,
            asistenciaServicio: null,
            pedidosServicio: null,
            viajesServicio: null,
            selectedProduct1: null,
            horaValidarBet: [
                { label: '¡OK!', value: '¡OK!' },
                { label: '¡NO OK!', value: '¡NO OK!' }
            ],
        }
    },
    async created() {
        this.cfdiTrasladoMeliServicio = new CfdiTrasladoMeliServicio();
        this.asistenciaServicio = new AsistenciaServicio();
        this.viajesServicio = new ViajesServicio();
        this.pedidosServicio = new PedidosServicio();
        this.asignacionTiendaServicio = new AsignacionTiendaServicio();
        this.empleadosServicio = new EmpleadosServicio();
        this.mercadoLibreServicio = new MercadoLibreServicio();
        this.rutasServicio = new RutasServicio();
        this.asignacionDiariaServicio = new AsignacionDiariaServicio();
        this.unidadesFlotaServicio = new UnidadesFlotaServicio();
        this.initFilters1()
    },
    async mounted() {
        this.permisosTienda();
        
        this.operadorDialog = false;
        this.tienda = null;
        let empId;
        this.reporteSemanal = [];
        var hoy = new Date();
        var dia = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();

        console.log(dia);
        empId = localStorage.usuario;
        console.log(empId);
        await this.unidadesFlotaServicio.getAll().then(data => {
            this.unidades = data.data;
            this.empleadosServicio.getAll().then(data => { this.empleados = data.data; this.loading = false;this.asignacionDiaria(); });

        });

        //console.log(this.reporteAsisDef,'mero   ');

    },
    methods: {
        permisosTienda() {
            let cont = -1;
            var inter,det,sucur;
            this.permisos = localStorage.permisos;
            for (let i = 0; i < this.permisos; i++) {
                cont = cont + 1;
                inter = "permiso" + i;
                det="determinante"+i;
                sucur="sucursal"+i;
                this.idPermisos[cont] = {
                    id: parseInt(localStorage.getItem(inter)),
                    determinante: localStorage.getItem(det),
                    sucursal:localStorage.getItem(sucur)
                }

            } console.log(this.idPermisos, "permisos");
        },
        searchCountry(event) {


            for (let i = 0; i < this.unidades.length; i++) {
                this.plac.push(this.unidades[i].placas)
            }

            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredCountries = [...this.plac];

                }
                else {
                    this.filteredCountries = this.plac.filter((unidades) => {
                        return unidades.toLowerCase().startsWith(event.query.toLowerCase());
                    });
                }
            }, 250);
        },
        generarPDF() {
            //const doc= new jspdf();

            var vm = this
            var columns = [
                { title: "Fecha", dataKey: "dia" },
                { title: "Sucursal", dataKey: "sucursal" },
                { title: "Nombre", dataKey: "empNombre" },
                { title: "Role", dataKey: "role" },
                { title: "Horario", dataKey: "horario" },
                { title: "Status", dataKey: "statusOperacion" },
                { title: "Tipo  ", dataKey: "tipo" },
                { title: "Placas", dataKey: "placas" },
                { title: "Marca", dataKey: "marca" },
                { title: "Submarca", dataKey: "submarcas" },
                { title: "Modelo", dataKey: "modelo" },
                { title: "Esquema", dataKey: "esquema" },
                { title: "Observaciones", dataKey: "observaciones" },
            ];
            var doc = new jspdf('p', 'pt');
            doc.setFontSize(20);
            doc.text('ASIGNACION', 30, 20);

            doc.autoTable(columns, vm.asignacionD, { styles: { fontSize: 4 }, theme: 'grid' });
            doc.save('Asignacion .pdf');
           /* 
           // const html=this.$refs.content.innerHTML;
           doc.text(this.asignacionD[0].dia,120,10);
            //doc.autoTable({head: [['Sucursal', 'Nombre','Role','StatusOperacion', 'Tipo','Placa','Marca','Submarca']],theme: 'grid'});
            for(let i=0;i<this.asignacionD.length;i++){
            doc.autoTable({
            head: [['Sucursal', 'Nombre','Role','StatusOperacion', 'Tipo','Placa','Marca','Submarca']],theme: 'grid',    
  body: [
     
    [ 
       this.asignacionD[i].sucursal ,this.asignacionD[i].empNombre,this.asignacionD[i].role,this.asignacionD[i].statusOperacion,this.asignacionD[i].tipo,this.asignacionD[i].placas,this.asignacionD[i].marca,this.asignacionD[i].subMarcas],
    
    
  ],
  
})}
console.log(doc);
            doc.save("Asignacion.pdf");
       */ },
        async actualizar() {
            
            this.reporteRuta = [];
            //this.asignacionD=[];
            let count = -1;
            var MyDate = new Date();
            var fecha;
            fecha = ('0' + MyDate.getDate()).slice(-2) + '-'
                + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-'
                + MyDate.getFullYear();
            //console.log( fecha);
            //this.displayResponsive = true;
            //let contador=-1;

            //console.log(this.tienda.tiendaSucursal);
            // console.log(this.empleados);
            for (let ji = 0; ji < this.idPermisos.length; ji++) {
                await this.rutasServicio.getRutas(this.idPermisos[ji].determinante, fecha).then(data => {
                    this.rutas = data.data;
                    
                    if (this.rutas.length > 0) {
                        this.loading = false;
                        for (let ia = 0; ia < this.asignacionD.length; ia++) {
                            //console.log(ia);
                            for (let ib = 0; ib < this.rutas.length; ib++) {
                                if (this.asignacionD[ia].empId === this.rutas[ib].empId) {
                                    count = count + 1;
                                    this.reporteRuta[count] = {
                                        fecha: fecha,
                                        cedis: this.asignacionD[ia].sucursal,
                                        ruta: this.rutas[ib].ruta,
                                        idRuta: this.rutas[ib].entity_id,
                                        folioFiscal: null,
                                        driver: this.rutas[ib].empNombre,
                                        empId:this.rutas[ib].empId,
                                        unidadPlaca: this.asignacionD[ia].placas,
                                        tipo: this.asignacionD[ia].tipo,
                                        paquetes: this.rutas[ib].shipments.length,
                                        tipoServicio: this.rutas[ib].tipoServicio,
                                        status: this.rutas[ib].status,
                                        observaciones: this.rutas[ib].observaciones,

                                    };

                                }
                            }

                        }
                        
                        //this.cfdiTrasladoMeliServicio.getFolioFis(this.reporteRuta[0].idRuta).then(data=>{this.folioFis=data.data;/*console.log(data,"aqui");*/});
                        for (let ic = 0; ic < this.reporteRuta.length; ic++) {
                            //console.log(this.reporteRuta[ic].idRuta);
                            this.cfdiTrasladoMeliServicio.getFolioFis(this.reporteRuta[ic].idRuta).then(data => {
                                this.folioFis = data.data;
                                this.reporteRuta[ic].folioFiscal = this.folioFis.uuid;
                            });
                        }console.log(this.reporteRuta,"final");

                    } else {

                        this.loading = false;
                    }

                });
            }
        },
        cambiarTienda() {

            this.operadorDialog = true;
        },
        async onRowSelect(event) {
            this.nomTienda = event.data.determinante
            //let tienda=event.data.tiendaSucursal;
            this.tienda = event.data;
            this.rutas = [];
            //var hoy = new Date();
            //var dia= hoy.getDate()+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear();
            var MyDate = new Date();
            var fechaDos;

            fechaDos = ('0' + (MyDate.getDate())).slice(-2) + '-'
                + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-'
                + MyDate.getFullYear();
            let b = -1;
            this.mensaje = "";
            for (let i = 0; i < this.empleados.length; i++) {
                if(this.empleados[i].tiendasEmpleados.length>0){
                    if (this.empleados[i].tiendasEmpleados[0].id === this.tienda.id) {
                    b = b + 1;
                    this.datosBasicosEmp[b] = {
                        empId: this.empleados[i].empId,
                        nombre: this.empleados[i].nombre,
                    };

                }
                }
                
            }
            await this.asignacionDiariaServicio.getHistorico(fechaDos).then(data => {
                this.asignacionGet = data.data;
                if (this.asignacionGet.length > 0) {
                    this.loading = false;
                    for (let a = 0; a < this.asignacionGet.length; a++) {
                        for (let b = 0; b < this.datosBasicosEmp.length; b++) {
                            if (this.asignacionGet[a].empId === this.datosBasicosEmp[b].empId) {

                                this.datosBasicosEmp[b].placas = this.asignacionGet[a].placas;
                                this.datosBasicosEmp[b].tipo = this.asignacionGet[a].tipo;
                                this.datosBasicosEmp[b].marca = this.asignacionGet[a].marca;
                                this.datosBasicosEmp[b].modelo = this.asignacionGet[a].modelo;
                                this.datosBasicosEmp[b].submarcas = this.asignacionGet[a].submarcas;
                                this.datosBasicosEmp[b].observaciones = this.asignacionGet[a].observaciones;


                            }
                        }
                    }/*console.log(this.datosBasicosEmp,"hola");*/
                } else {
                    //this.asignacionD=[];
                    //console.log(this.asignacionD);
                    this.loading = false;
                }

            }).catch(error => {
                this.mensaje = error + '----error de conexion';
            });
            this.abrirNuevaRuta = true;
            //console.log(this.datosBasicosEmp);


            this.operadorDialog = false;

        },
        initFilters1() {
            this.filters1 = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
                'empId': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'id': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'coordenadaEntrada': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'dia': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'nombre': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'estatusActual': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'pedidos': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'cajas': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                //'status': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
                //'activity': {value: null, matchMode: FilterMatchMode.BETWEEN},
                //'verified': {value: null, matchMode: FilterMatchMode.EQUALS}
            };
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        exportCSVAsAc() {
            this.$refs.at.exportCSV();
        },
        clearFilter1() {
            this.initFilters1();
        },
        getStatusLabel(status) {
            switch (status) {
                case 'SN':
                    return 'SIN ASIGNAR';

                case 'A':
                    return 'ASIGNADO';
            }
        },
        async onCellEditCompleteAsignacion(event) {

            for (let i = 0; i < this.unidades.length; i++) {

                if (this.unidades[i].placas === event.data.placas) {

                    event.data.tipo = this.unidades[i].tipoUnidad;
                    event.data.marca = this.unidades[i].marca;
                    event.data.modelo = this.unidades[i].año;
                    event.data.submarcas = this.unidades[i].subMarca;
                    event.data.esquemaUnidad = this.unidades[i].esquemaUnidad;

                }
            }//console.log(event.data);
            for (let b = 0; b < this.asignacionD.length; b++) {
                if (this.asignacionD[b].empId === event.data.empId) {
                    this.asignacionD[b].tipo = event.data.tipo;
                    this.asignacionD[b].marca = event.data.marca;
                    this.asignacionD[b].modelo = event.data.modelo;
                    this.asignacionD[b].submarcas = event.data.submarcas;
                    this.asignacionD[b].esquemaUnidad = event.data.esquemaUnidad;
                    this.asignacionD[b].observaciones = event.data.observaciones;

                }
            }
            //console.log(this.asignacionD.length);
        },
        async onCellEditComplete(event) {

            const d = event.data;
            d.status = "CARGANDO";
            //console.log(d);

            await this.rutasServicio.saveRuta(d).then(data => {
                console.log(data);
            }).catch(error => {
                this.mensaje = error + '----NO SE GUARDO ELEL CAMPO  EN LA BASE DE DATOS';
            });

        },
        aceptar() {
            this.cargando = false;
            this.cargandoRuta = false;
        },
        aceptarRuta() {
            this.cfdiTrasladoMeliServicio.saveCfdi(this.cfdiTraslado[0]).then(data => {
                console.log(data);
                alert("Se agrego cfdi");
                this.cargando = false;
                this.cargandoRuta = false;
            }).catch(error => {
                this.mensaje = error + '----NO SE GUARDO ELEL CAMPO  EN LA BASE DE DATOS';
                alert("ERROR AL AGREGAR CFDI");
            });
        },
        async agregarRuta() {
            this.operadorDialog = true;


        },
        guardarRuta() {
            this.blockRuta = 0;
            this.cargandoRutaProgreso = 0;
            this.cargandoRuta = true;
            this.cargarRuta = 1;
            //this.cargandoRutaProgreso=30;
            console.log(this.cargarRuta);
            var MyDate = new Date();
            var fecha;
            fecha = ('0' + MyDate.getDate()).slice(-2) + '-'
                + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-'
                + MyDate.getFullYear();
            var hora = MyDate.getHours() + ':' + MyDate.getMinutes() + ':' + MyDate.getSeconds();
            //console.log(this.tipoServicio,"tipo de servicio");
            this.rutasServicio.saveRuta(this.rutaId, this.tienda.id,
                this.tienda.determinante, this.rutaNom, fecha, hora, this.empNombre.empId, this.empNombre.nombre, this.tipoServicio.label
            ).then(data => {
                console.log(data, "Ruta save");
                console.log(data.data.shipments.length, "Ruta total");
                this.cfdiTraslado[0].NoCertificado = data.data.entity_id;
                this.cfdiTraslado[0].Conceptos = [];
                for (let a = 0; a < data.data.shipments.length; a++) {
                    this.rutasServicio.getShipments(data.data.shipments[a].id).then(data => {
                        if (!data) {
                            console.log(data);
                        } else {
                            console.log(data);
                            //console.log(data.data.package.items.length,"data.data.package.items.length");
                            for (let int = 0; int < data.data.package.items.length; int++) {
                                this.conceptos = {};
                                this.cargandoRutaProgreso = this.cargandoRutaProgreso + 1;
                                if (data.data.package.items[int].category === 1010101) {

                                    this.conceptos.ClaveProdServ = "0" + data.data.package.items[int].category;
                                    this.conceptos.Descripcion = "Servicio de entrega de paquetes";
                                    this.conceptos.ClaveUnidad = data.data.package.items[int].unit_code;
                                    this.conceptos.NoIdentificacion = data.data.shipment;
                                    this.conceptos.ObjetoImp = "01";
                                    this.conceptos.Importe = 0.0;
                                    this.conceptos.ValorUnitario = 0.0;
                                    this.conceptos.Cantidad = data.data.package.items[int].quantity;
                                    console.log(this.conceptos, "this.conceptos[0]");

                                    this.cfdiTraslado[0].Conceptos.push(this.conceptos);

                                } else {

                                    this.conceptos.ClaveProdServ = data.data.package.items[int].category;
                                    this.conceptos.Descripcion = "Servicio de entrega de paquetes";
                                    this.conceptos.ClaveUnidad = data.data.package.items[int].unit_code;
                                    this.conceptos.NoIdentificacion = data.data.shipment;
                                    this.conceptos.ObjetoImp = "01";
                                    this.conceptos.Importe = 0.0;
                                    this.conceptos.ValorUnitario = 0.0;
                                    this.conceptos.Cantidad = data.data.package.items[int].quantity;
                                    console.log(this.conceptos, "this.conceptos[0]");

                                    this.cfdiTraslado[0].Conceptos.push(this.conceptos);

                                }
                                //arreglo=arreglo+1;
                                /* this.cfdiTraslado.Conceptos[arreglo].ClaveProdServ=data.data.package.items[int].category;
                                 this.cfdiTraslado.Conceptos[arreglo].Descripcion="Servicio de entrega de paquetes";
                                 this.cfdiTraslado.Conceptos[arreglo].ClaveUnidad=data.data.package.items[int].unit_code;
                                 this.cfdiTraslado.Conceptos[arreglo].NoIdentificacion=shipment;
                                 this.cfdiTraslado.Conceptos[arreglo].ObjetoImp="01";
                                 this.cfdiTraslado.Conceptos[arreglo].Importe=0.0;
                                 this.cfdiTraslado.Conceptos[arreglo].ValorUnitario=0.0;
                                 this.cfdiTraslado.Conceptos[arreglo].Cantidad=data.data.package.items[int].quantity;*/
                                //console.log(this.cfdiTraslado[0],"this.cfdiTraslado");
                                console.log(this.cfdiTraslado[0], "this.cfdiTraslado[0]");
                            }
                        }

                    });

                }
                //this.cfdiTraslado[0].Conceptos.push(this.conceptos);


                this.abrirNuevaRuta = false;
                this.mensaje = "SE AGREGO CORRECTAMENTE LA RUTA";
                // alert(this.mensaje);
                this.rutaId = null;
                this.rutaNom = null;
                this.empNombre = {
                    empId: null,
                    nombre: null,
                    placas: "SIN ASIGNAR PLACAS",
                    tipo: null,
                    modelo: null,
                    submarcas: null
                };
                this.tipoServicio = null;

            }).catch(error => {
                this.blockRuta = 1;
                this.mensaje = error + '----NO SE GUARDO LA RUTA';
                this.abrirNuevaRuta = true;
                this.cargandoRutaProgreso = 100;
                alert("ERROR AL CARGAR SHIPMENTS");
            });
        },
        async agregarAsignacion() {
            //this.asignacionD=[];
            this.mensaje = "";
            var MyDate = new Date();
            var fecha, fechaDos, fechaFormato;
            var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
            var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
            fechaFormato = (diasSemana[(MyDate.getDay() + 1)] + ", " + (MyDate.getDate() + 1) + " de " + meses[MyDate.getMonth()] + " de " + MyDate.getFullYear());
            fecha = ('0' + (MyDate.getDate() + 1)).slice(-2) + '-'
                + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-'
                + MyDate.getFullYear();
            fechaDos = ('0' + (MyDate.getDate())).slice(-2) + '-'
                + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-'
                + MyDate.getFullYear();
            this.mensajeAsignacion = "AGREGAR ASIGNACIÓN DIA: " + fechaFormato;
            this.displayResponsive = true;
            let count = -1;

            // console.log(this.tienda.tiendaSucursal);
            //console.log(this.empleados);
            //console.log(this.asignacionD,"111");
            for (let j = 0; j < this.asigEmpId.length; j++) {
                await this.rutasServicio.getRutas(this.asigEmpId[j].nomTienda, fechaDos).then(data => {
                    this.rutas = data.data; /*console.log(this.rutas,"rutas1");*/
                    this.asignacionDiariaServicio.getHistorico(this.asigEmpId[j].tiendaSucursal, fechaDos).then(data => {
                        this.asignacionGet = data.data;
                        if (this.asignacionGet.length > 0) {
                            //console.log(this.asignacionD.length,this.asignacionGet.length,"si aplica");

                            this.loading = false;

                            for (let ae = 0; ae < this.asignacionGet.length; ae++) {
                                //console.log(ae,"cambio a");
                                for (let bc = 0; bc < this.asignacionD.length; bc++) {
                                    this.asignacionD[bc].id = null;
                                    this.asignacionD[bc].dia = fecha;
                                    // console.log(bc,"cambio");
                                    if (this.asignacionGet[ae].empId === this.asignacionD[bc].empId) {
                                        this.asignacionD[bc].esquema = this.asignacionGet[ae].esquema;
                                        this.asignacionD[bc].statusOperacion = this.asignacionGet[ae].statusOperacion;
                                        this.asignacionD[bc].role = this.asignacionGet[ae].role;
                                        this.asignacionD[bc].placas = this.asignacionGet[ae].placas;
                                        this.asignacionD[bc].horario = this.asignacionGet[ae].horario;
                                        this.asignacionD[bc].tipo = this.asignacionGet[ae].tipo;
                                        this.asignacionD[bc].marca = this.asignacionGet[ae].marca;
                                        this.asignacionD[bc].modelo = this.asignacionGet[ae].modelo;
                                        this.asignacionD[bc].submarcas = this.asignacionGet[ae].submarcas;
                                        this.asignacionD[bc].esquemaUnidad = this.asignacionGet[ae].esquemaUnidad;
                                        this.asignacionD[bc].observaciones = this.asignacionGet[ae].observaciones;


                                    }
                                }
                            }//console.log(this.asignacionD,"hey d");
                            for (let ia = 0; ia < this.asignacionD.length; ia++) {
                                //console.log(ia);
                                for (let ib = 0; ib < this.rutas.length; ib++) {
                                    if (this.asignacionD[ia].empId === this.rutas[ib].empId) {
                                        count = count + 1;

                                        this.reporteRuta[count] = {
                                            fecha: fechaDos,
                                            cedis:this.asignacionD[ia].sucursal,
                                            ruta: this.rutas[ib].ruta,
                                            idRuta: this.rutas[ib].entity_id,
                                            folioFiscal: null,
                                            tipoServicio: this.rutas[ib].tipoServicio,
                                            driver: this.rutas[ib].empNombre,
                                            empId:this.rutas[ib].empId,
                                            unidadPlaca: this.asignacionD[ia].placas,
                                            tipo: this.asignacionD[ia].tipo,
                                            paquetes: this.rutas[ib].shipments.length,
                                            status: this.rutas[ib].status,
                                            observaciones: this.rutas[ib].observaciones,
                                        };

                                    }
                                }

                            }

                            //console.log(this.asignacionD,"actual");
                        } else {
                            //this.asignacionD=[];
                            //
                            for (let c = 0; c < this.asignacionD.length; c++) {
                                this.asignacionD[c].dia = fecha;


                            }/*console.log(this.asignacionD,"despues");*/this.loading = false;
                        }

                    }).catch(error => {
                        this.mensaje = error + '----error de conexion';
                    });
                });
            }
        },
        async asignacionDiaria() {
            this.asignacionD = [];
            this.reporteRuta = [];
            this.mensaje = "";
            //let count = -1;
            var MyDate = new Date();
            var fecha, fechaFormato;
            fecha = ('0' + MyDate.getDate()).slice(-2) + '-'
                + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-'
                + MyDate.getFullYear();
            var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
            var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
            fechaFormato = (diasSemana[MyDate.getDay()] + ", " + MyDate.getDate() + " de " + meses[MyDate.getMonth()] + " de " + MyDate.getFullYear());
            this.mensajeAsignacion = "ASIGNACION DEL DIA: " + fechaFormato;
            //console.log( fecha);
            //this.displayResponsive = true;
            let contador = -1;

            //console.log(this.asigEmpId,"asigEmpId");
            //console.log(this.empleados,"aqui");
            for (let j = 0; j < this.idPermisos.length; j++) {
                for (let i = 0; i < this.empleados.length; i++) {

                    //console.log(this.asigEmpId[j],"aqui");
                    if(this.empleados[i].tiendasEmpleados.length>0){
                        if (this.idPermisos[j].id === this.empleados[i].tiendasEmpleados[0].id) {
                        contador = contador + 1;
                        this.asignacionD[contador] = {
                            id: null,
                            empId: this.empleados[i].empId,
                            empNombre: this.empleados[i].nombre,
                            sucursal: this.empleados[i].tiendasEmpleados[0].formato+" "+this.empleados[i].tiendasEmpleados[0].sucursal,
                            esquema: this.empleados[i].esquema,
                            role: this.empleados[i].puesto,
                            horario: null,
                            placas: null,
                            tipo: null,
                            marca: null,
                            submarcas: null,
                            modelo: null,
                            dia: fecha,
                            hora: null,
                            asignador: null,
                            observaciones: null
                        };

                    }
                    }
                    
                }
            }//console.log(this.asignacionD,"mal");
            for (let t = 0; t < this.idPermisos.length; t++) {
                await this.rutasServicio.getRutas(this.idPermisos[t].determinante, fecha).then(data => {
                    this.rutas = data.data;/* console.log(this.rutas,"rutas1");*/
                    this.asignacionDiariaServicio.getHistorico(fecha).then(data => {
                        this.asignacionGet = data.data;
                        //console.log(this.asignacionGet, "hey d");
                        if (this.asignacionGet.length > 0) {
                            this.loading = false;
                            for (let a = 0; a < this.asignacionGet.length; a++) {
                                for (let b = 0; b < this.asignacionD.length; b++) {
                                    if (this.asignacionGet[a].empId === this.asignacionD[b].empId) {
                                        this.asignacionD[b].id = this.asignacionGet[a].id;
                                        this.asignacionD[b].sucursal = this.asignacionGet[a].sucursal;
                                        this.asignacionD[b].role = this.asignacionGet[a].role;
                                        this.asignacionD[b].esquema = this.asignacionGet[a].esquema;
                                        this.asignacionD[b].statusOperacion = this.asignacionGet[a].statusOperacion;
                                        this.asignacionD[b].placas = this.asignacionGet[a].placas;
                                        this.asignacionD[b].horario = this.asignacionGet[a].horario;
                                        this.asignacionD[b].tipo = this.asignacionGet[a].tipo;
                                        this.asignacionD[b].marca = this.asignacionGet[a].marca;
                                        this.asignacionD[b].modelo = this.asignacionGet[a].modelo;
                                        this.asignacionD[b].submarcas = this.asignacionGet[a].submarcas;
                                        this.asignacionD[b].esquemaUnidad = this.asignacionGet[a].esquemaUnidad;
                                        this.asignacionD[b].observaciones = this.asignacionGet[a].observaciones;


                                    }
                                }
                            } 
                            

                        } else {
                            //this.asignacionD=[];
                            this.loading = false;
                        }

                    }).catch(error => {
                        this.mensaje = error + '----error de conexion';
                    });
                });
            }
            //console.log(this.asignacionD,"asignacionD");   
        },
        async closeResponsive() {
            this.reporteRuta = [];
            //this.asignacionD=[];
            let count = -1;
            var MyDate = new Date();
            var fecha;
            fecha = ('0' + MyDate.getDate()).slice(-2) + '-'
                + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-'
                + MyDate.getFullYear();
            //console.log( fecha);
            //this.displayResponsive = true;
            //let contador=-1;

            //console.log(this.tienda.tiendaSucursal);
            // console.log(this.empleados);
            //console.log(this.asigEmpId,"asigEmpId");
            for (let ji = 0; ji < this.asigEmpId.length; ji++) {
                await this.rutasServicio.getRutas(this.asigEmpId[ji].nomTiendaMeli, fecha).then(data => {
                    this.rutas = data.data;

                    if (this.rutas.length > 0) {
                        //console.log(this.rutas,"rutas");
                        this.loading = false;
                        console.log(this.asignacionD, "hey d");
                        for (let ia = 0; ia < this.asignacionD.length; ia++) {
                            //console.log(ia);
                            for (let ib = 0; ib < this.rutas.length; ib++) {
                                if (this.asignacionD[ia].empId === this.rutas[ib].empId) {
                                    console.log(this.rutas[ib], "rutas[ib]");
                                    count = count + 1;
                                    this.reporteRuta[count] = {
                                        fecha: fecha,
                                        cedis: this.asigEmpId[ji].tiendaSucursal,
                                        ruta: this.rutas[ib].ruta,
                                        idRuta: this.rutas[ib].entity_id,
                                        folioFiscal: null,
                                        driver: this.rutas[ib].empNombre,
                                        empId:this.rutas[ib].empId,
                                        unidadPlaca: this.asignacionD[ia].placas,
                                        tipo: this.asignacionD[ia].tipo,
                                        paquetes: this.rutas[ib].shipments.length,
                                        tipoServicio: this.rutas[ib].tipoServicio,
                                        status: this.rutas[ib].status,
                                        observaciones: this.rutas[ib].observaciones,

                                    };

                                }
                            }

                        }
                        //console.log(this.reporteRuta,"this.reporteRuta");
                        this.cfdiTrasladoMeliServicio.getFolioFis(this.reporteRuta[0].idRuta).then(data => { this.folioFis = data.data;/*console.log(data,"aqui");*/ });
                        for (let ic = 0; ic < this.reporteRuta.length; ic++) {
                            //console.log(this.reporteRuta[ic].idRuta);
                            this.cfdiTrasladoMeliServicio.getFolioFis(this.reporteRuta[ic].idRuta).then(data => {
                                this.folioFis = data.data;
                                this.reporteRuta[ic].folioFiscal = this.folioFis.uuid;
                            });
                        }//console.log(this.reporteRuta,"final");

                    } else {

                        this.loading = false;
                    }

                });
            }
            this.displayResponsive = false;

        },
        async guardarAsignacion() {
            let c = 0;
            let prev = this.asignacionD.length / 2;
            prev = Math.round(prev);
            //console.log(prev);
            this.progreso = 30;

            this.cargando = true;
            for (let i = 0; i < this.asignacionD.length; i++) {
                this.asignacionD[i].asignador = localStorage.usuario;
                await this.asignacionDiariaServicio.save(this.asignacionD[i]).then(data => {
                    console.log(data);
                    this.mensaje = "SE AGREGO CORRECTAMENTE";
                    c = c + 1;
                    if (c === prev) {
                        this.progreso = 50;
                    }
                    if (c === this.asignacionD.length) {
                        this.progreso = 100;
                        this.displayResponsive = false;
                    }

                }).catch(error => {
                    this.mensaje = error + '----NO SE GUARDO ELEL CAMPO  EN LA BASE DE DATOS';
                    this.displayResponsive = true;
                });
            }

        },

        /* async buscarViaje(){
           let a=-1;
          await this.mercadoLibreServicio.SubirViaje(this.ViajeId).then(data => {this.rut=data.data;
              a=a+1;
              this.Rutas[0].entity_id=this.rut.entity_id;
              this.Rutas[0].cost=this.rut.cost;
          
          console.log(this.Rutas);console.log(this.rut);
          }).catch(error => {
              this.mensaje=error+'----NO SE GUARDO ELEL CAMPO  EN LA BASE DE DATOS';
          });
          },*/
        stockClass(data) {
            return [
                {
                    'LISTO': data.status == 'LISTO',
                    'CARGANDO': data.status === 'CARGANDO',
                    'ENRUTA': data.status === 'ENRUTA',
                    'ENTREGADO': data.status === 'ENTREGADO',
                    'COBRO': data.status === 'COBRO',
                    'DEVOLUCION': data.status === 'DEVOLUCION'
                }
            ];
        },
        onProductSelect(event) {
            this.$refs.op.hide();
            console.log(event.data);


            //this.empleadoRec.pedidoIdSucursal=this.indiceRec=data.pedidoIdSucursal;


        },
        async Info(operador) {
            this.operador = { ...operador };
            console.log(this.operador);

        },


        searchItems(event) {
            //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
            let query = event.query;
            let filteredItems = [];

            for (let i = 0; i < this.reporteAsisDef.length; i++) {
                let reporteAsisDef = this.reporteAsisDef[i];
                if (reporteAsisDef.nombre.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                    filteredItems.push(reporteAsisDef);
                }
            }

            this.filteredItems = filteredItems;
            //console.log(this.filteredItems,"seleccionado");
        }
    }

})
</script>
<style scoped>
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

.p-dropdown {
    width: 14rem;
}


.FINALIZO {
    font-weight: 700;
    color: #009e15;
}

.tol {
    background: #020201;
    color: #93d500;
}

.img {
    width: 200px;
}

.ocultar {
    visibility: hidden;
}

@media (max-width: 1902px) {
    .tam-tab {
        width: 900px
    }
}</style>

