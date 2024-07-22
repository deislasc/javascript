<template>
    <div class="card">
        <Toolbar>
            <template #left>


            </template>
        </Toolbar>
        <br><br>
        <ProgressBar mode="indeterminate" style="height: 30px" v-if="asignacionValida===false"></ProgressBar>

        <Splitter style="height: 300px" class="mb-5">
            <SplitterPanel class="flex align-items-center justify-content-center">
                <h4>CONSULTAR ASIGNACIÓN DEL DIA</h4>
                <Button label="Consultar Asignación del Dia" class="p-button-rounded p-button-warning p-mr-2"
                    icon="pi pi-file" @click="asignacionDiaria()" v-if="asignacionValida===true"/>
                    <Button label="Consultar Asignación del Dia" class="p-button-rounded p-button-warning p-mr-2"
                    icon="pi pi-file" disabled v-if="asignacionValida===false"/>
                    
            </SplitterPanel>
            <SplitterPanel class="flex align-items-center justify-content-center">
                <h4>CREAR ASIGNACIÓN</h4>
                <Button label="Crear Asignación" class="p-button-rounded p-button-success p-mr-2" icon="pi pi-plus"
                    @click="agregarAsignacion()" v-if="asignacionValida===true"/>
                    <Button label="Crear Asignación" class="p-button-rounded p-button-success p-mr-2" icon="pi pi-plus"
                   disabled v-if="asignacionValida===false"/>
            </SplitterPanel>
            <SplitterPanel class="flex align-items-center justify-content-center">
                <h4>CONSULTAR ASIGNACIÓN</h4>
                <div class="p-inputgroup">
                    <Button class="p-button-rounded p-button-info p-mr-2" icon="pi pi-search"
                        @click="consultarAsignacion()" />
                    <Calendar id="dateformat" v-model="fechaConsulta" dateFormat="dd-mm-yy"
                        placeholder="Indique una fecha" />
                </div>
            </SplitterPanel>

        </Splitter>   
        <Dialog header="ASIGNACION DEL DIA" v-model:visible="displayResponsive" :breakpoints="{ '960px': '75vw' }"
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
                                    <ul> {{ asignacionF }} </ul>
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
                                @click="generarPDF()" v-if="exportar===true" />
                                <Button label="Generar PDF" icon="pi pi-upload" class="p-button-rounded p-button-success p-mr-2"
                               disabled v-if="exportar===false" />
                                <!-- <Button label="Generar Excel" icon="pi pi-upload"
                                class="p-button-rounded p-button-success p-mr-2" @click="exportCSVAsAc($event)" />-->

                        </template>
                    </Toolbar>
                    <Column field="dia" header="Fecha">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.dia }}
                            </div>
                        </template>
                    </Column>
                    <Column field="empId" header="Id">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.empId }}
                            </div>
                        </template>
                    </Column>
                    <Column field="empNombre" header="Nombre">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.empNombre }}
                            </div>
                        </template>
                    </Column>
                    <Column field="sucursal" header="Formato/Sucursal">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.sucursal }}
                            </div>
                        </template>

                        <template #editor="{ data }">
                            <InputText disabled />
                            <AutoComplete v-model="data['sucursal']" :suggestions="filteredSucursal"
                                @complete="searchSucursal($event)" :dropdown="true" field="sucursal" forceSelection>
                                <template #item="slotProps">
                                    <div class="country-item">

                                        <div class="ml-6">{{ slotProps.item }}</div>
                                    </div>
                                </template>
                            </AutoComplete>

                        </template>
                    </Column>

                    <Column field="tipoServicio" header="Servicio">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.tipoServicio }}
                            </div>
                        </template>
                        <template #editor="{ data }">
                            <Dropdown v-model="data['tipoServicio']" :options="tipoServicioCom" optionLabel="label"
                                optionValue="label" placeholder="Servicio">
                                <template #option="slotProps">
                                    <span :class="'product-badge status-' + slotProps.option.label.toLowerCase()">{{
                                        slotProps.option.label }}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                    <Column field="esquema" header="Esquema">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.esquema }}
                            </div>
                        </template>
                        <template #editor="{ data }">
                            <InputText v-model="data['esquema']" />
                        </template>
                    </Column>
                    <Column field="role" header="Rol">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.role }}
                            </div>
                        </template>
                        <template #editor="{ data }">
                            <Dropdown v-model="data['role']" :options="rol" optionLabel="role" optionValue="role"
                                placeholder="rol">
                                <template #option="slotProps">
                                    <span :class="'product-badge status-' + slotProps.option.role.toLowerCase()">{{
                                        slotProps.option.role }}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                    <Column field="horario" header="Horario">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.horario }}
                            </div>
                        </template>
                        <template #editor="{ data }">
                            <InputMask mask="99:99" v-model="data['horario']" placeholder="00:00" />

                        </template>
                    </Column>
                    <Column field="statusOperacion" header="Status Operacion">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.statusOperacion }}
                            </div>
                        </template>
                        <template #editor="{ data }">
                            <Dropdown v-model="data['statusOperacion']" :options="statusOperacionOpcion"
                                optionLabel="status" optionValue="status" placeholder="Asignar">
                                <template #option="slotProps">
                                    <span :class="'product-badge status-' + slotProps.option.status.toLowerCase()">{{
                                        slotProps.option.status }}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                    <Column field="placas" header="Placa">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.placas }}
                            </div>
                        </template>

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
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.tipo }}
                            </div>
                        </template>
                    </Column>
                    <Column field="marca" header="Marca">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.marca }}
                            </div>
                        </template>
                    </Column>
                    <Column field="submarcas" header="submarcas">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.submarcas }}
                            </div>
                        </template>
                    </Column>
                    <Column field="modelo" header="Modelo">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.modelo }}
                            </div>
                        </template>
                    </Column>
                    <Column field="esquemaUnidad" header="Esquema Unidad">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.esquemaUnidad }}
                            </div>
                        </template>
                    </Column>

                    <Column field="observaciones" header="Observaciones">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.observaciones }}
                            </div>
                        </template>
                        <template #editor="{ data }">
                            <InputText v-model="data['observaciones']" />
                        </template>
                    </Column>
                    <Column field="cambio" header="cambio">

                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.cambio }}
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="closeResponsive" class="p-button-text" />
                <Button label="Guardar" icon="pi pi-check" @click="guardarAsignacion" autofocus />
            </template>
        </Dialog>
        <Dialog header="ASIGNACION DEL DIA" v-model:visible="abrirConsulta" :breakpoints="{ '960px': '75vw' }"
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

                            </div>
                        </label>
                    </template>

                </Toolbar>
                <DataTable ref="at" :value="asignacionD" v-model:filters="filters1" filterDisplay="menu" :loading="loading"
                    :filters="filters1" :paginator="true" :rows="10" editMode="cell" class="editable-cells-table"
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
                                <!-- <Button label="Generar Excel" icon="pi pi-upload"
                                class="p-button-rounded p-button-success p-mr-2" @click="exportCSVAsAc($event)" />-->

                        </template>
                    </Toolbar>
                    <Column field="dia" header="Fecha">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.dia }}
                            </div>
                        </template>
                    </Column>
                    <Column field="empId" header="Id">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.empId }}
                            </div>
                        </template>
                    </Column>
                    <Column field="empNombre" header="Nombre">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.empNombre }}
                            </div>
                        </template>
                    </Column>
                    <Column field="sucursal" header="Formato/Sucursal">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.sucursal }}
                            </div>
                        </template>

                        <template #editor="{ data }">
                            <InputText disabled />
                            <AutoComplete v-model="data['sucursal']" :suggestions="filteredSucursal"
                                @complete="searchSucursal($event)" :dropdown="true" field="sucursal" forceSelection>
                                <template #item="slotProps">
                                    <div class="country-item">

                                        <div class="ml-6">{{ slotProps.item }}</div>
                                    </div>
                                </template>
                            </AutoComplete>

                        </template>
                    </Column>
                    <Column field="tipoServicio" header="Servicio">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.tipoServicio }}
                            </div>
                        </template>
                        <template #editor="{ data }">
                            <Dropdown v-model="data['tipoServicio']" :options="tipoServicioCom" optionLabel="label"
                                optionValue="label" placeholder="Servicio">
                                <template #option="slotProps">
                                    <span :class="'product-badge status-' + slotProps.option.label.toLowerCase()">{{
                                        slotProps.option.label }}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                    <Column field="esquema" header="Esquema">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.esquema }}
                            </div>
                        </template>
                        <template #editor="{ data }">
                            <InputText v-model="data['esquema']" />
                        </template>
                    </Column>
                    <Column field="role" header="Rol">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.role }}
                            </div>
                        </template>
                        <template #editor="{ data }">
                            <Dropdown v-model="data['role']" :options="rol" optionLabel="role" optionValue="role"
                                placeholder="Servicio">
                                <template #option="slotProps">
                                    <span :class="'product-badge status-' + slotProps.option.role.toLowerCase()">{{
                                        slotProps.option.role }}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                    <Column field="horario" header="Horario">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.horario }}
                            </div>
                        </template>
                        <template #editor="{ data }">
                            <InputMask mask="99:99" v-model="data['horario']" placeholder="00:00" />

                        </template>
                    </Column>
                    <Column field="statusOperacion" header="Status Operacion">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.statusOperacion }}
                            </div>
                        </template>
                        <template #editor="{ data }">
                            <Dropdown v-model="data['statusOperacion']" :options="statusOperacionOpcion"
                                optionLabel="status" optionValue="status" placeholder="Asignar">
                                <template #option="slotProps">
                                    <span :class="'product-badge status-' + slotProps.option.status.toLowerCase()">{{
                                        slotProps.option.status }}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                    <Column field="placas" header="Placa">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.placas }}
                            </div>
                        </template>

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
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.tipo }}
                            </div>
                        </template>
                    </Column>
                    <Column field="marca" header="Marca">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.marca }}
                            </div>
                        </template>
                    </Column>
                    <Column field="submarcas" header="Submarca">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.submarcas }}
                            </div>
                        </template>
                    </Column>
                    <Column field="modelo" header="Modelo">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.modelo }}
                            </div>
                        </template>
                    </Column>
                    <Column field="esquemaUnidad" header="Esquema Unidad">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.esquemaUnidad }}
                            </div>
                        </template>
                    </Column>

                    <Column field="observaciones" header="Observaciones">
                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.observaciones }}
                            </div>
                        </template>
                        <template #editor="{ data }">
                            <InputText v-model="data['observaciones']" />
                        </template>
                    </Column>
                    <Column field="cambio" header="cambio">

                        <template #body="slotProps">
                            <div :class="stockClass(slotProps.data)">
                                {{ slotProps.data.cambio }}
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="closeResponsive" class="p-button-text" autofocus />

            </template>
        </Dialog>

        <Dialog v-model:visible="operadorDialog" :style="{ width: '980px' }" header="SELECCIONA UNA TIENDA" class="p-fluid"
            :modal="true">

            <div class="p-field">
                <DataTable :value="asigEmpId" v-model:selection="tienda" selectionMode="single" @rowSelect="onRowSelect"
                    @rowUnselect="onRowUnselect" dataKey="id" responsiveLayout="scroll">
                    <Column field="tiendaSucursal" header="Tienda"></Column>
                    <Column field="nomTiendaMeli" header="nomTiendaMeli"></Column>
                </DataTable>
            </div>
        </Dialog>
        <Dialog v-model:visible="cargando" :style="{ width: '500px' }" header="ESPERE UN MOMENTO PORFAVOR" class="p-fluid"
            :modal="true">

            <ProgressBar :value="progreso" />
            <template #footer>

                <Button label="Aceptar" icon="pi pi-check" @click="aceptar" autofocus />
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
            administrativosSup:null,
            administrativosDis:null,
            asignacionValida:false,
            exportar:false,
            asignacion:null,
            permisos: null,
            idPermisos: [{
                id: null,
                sucursal:null
            }],
            user: [{
                client_id: 938309108549226,
                client_secret: "QQuW9yX9KiUK4v44muRScCoxtdfZ73s6",
                grant_type: "client_credentials"
            }],
            filteredCountries: [{
                placas: null,
            }
            ],
            filteredSucursal: [{
                tiendaSucursal: null,
            }
            ],
            abrirConsulta: false,
            fechaConsulta: null,
            progreso: 0,
            cargando: false,
            asignacionF:null,
            mensajeAsignacion: null,
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
                { role: 'SHOPPER' },
                { role: 'AUXILIAR' },
                { role: 'DISPACHER' },
                { role: 'ADUANA' },
                { role: 'MULTIFUNCIONAL' },
                { role: 'SUPERVISOR' },
            ],
            tipoServicioCom: [
                { label: 'BIG ITEM' },
                { label: 'BULK LARGE VAN' },
                { label: 'HUB' },
                { label: 'PAQUETERIA Y MENSAJERIA' },
                { label: 'SAD' },
                { label: 'LARGE VAN-FORANEO' },
                { label: 'CARS SAME DAY-CDMX' },
                { label: 'CARS FIJO-CDMX' },
                { label: 'SMALL VAN-CDMX' },
                { label: 'CARS FIJO-CDMX' },
                { label: 'DELIVERY CELL-CDMX' },
                { label: 'CARS SAME DAY-FORANEO' },
                { label: 'CARS FIJO-FORANEO' },
                { label: 'SMALL VAN-FORANEO' },
                { label: 'CARS FIJO-FORANEO' },
                { label: 'DELIVERY CELL-FORANEO' },
                { label: 'LARGE VAN-FORANEO' },
                { label: 'LARGE VAN-CDMX' }

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
                { status: "CAPACITACIÓN" },
                { status: "INCAPACIDAD" },
                { status: "APOYO" },
                { status: "DESCANSO LABORADO" },
                { status: "FALTA JUSTIFICADA" },
                { status: "DIA FESTIVO LABORADO" },
                { status: "ASISTENCIA SIN UNIDAD" }
            ],
            plac: [],
            sucu: [],
            datosBasicosEmp: [{
                empId: null,
                nombre: null,
                placas: null,
                servicio: null,
                tipo: null,
                modelo: null,
                submarcas: null
            }],
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
                statusOperacion: null,
                cambio: null
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
        var empId;
        this.reporteSemanal = [];
        var hoy = new Date();
        var dia = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();

        console.log(dia);
        empId = localStorage.usuario;
       
        console.log(empId);



        await this.unidadesFlotaServicio.getAll().then(data => {
            this.unidades = data.data;
            this.empleadosServicio.getAll().then(data => { this.empleados = data.data; this.loading = false; console.log(this.empleados, "data");
        if(this.empleados.length>0){
            this.asignacionValida=true;
        } });
        });
        await this.empleadosServicio.getPuesto("SUPERVISOR").then(data=>{
            this.administrativosSup=data.data;console.log(this.administrativosSup, "administrativosSup")
        });
        await this.empleadosServicio.getPuesto("DISPACHER").then(data=>{
            this.administrativosDis=data.data;console.log(this.administrativosDis, "administrativosDis")
        });


        //console.log(this.reporteAsisDef,'mero   ');

    },
    methods: {
        aceptar() {
            this.cargando = false;
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
        searchCountry(event) {


            for (let i = 0; i < this.unidades.length; i++) {
                this.plac.push(this.unidades[i].placas)
            }
            //console.log(this.plac,"dos");
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredCountries = [...this.plac];
                    //console.log(this.filteredCountries,'1');
                }
                else {
                    this.filteredCountries = this.plac.filter((unidades) => {
                        return unidades.toLowerCase().startsWith(event.query.toLowerCase());
                    });//console.log(this.filteredCountries,'2');
                }
            }, 250);
        },
        searchSucursal(event) {
            console.log(event,"event")
            for (let i = 0; i < this.idPermisos.length; i++) {
                this.sucu.push(this.idPermisos[i].sucursal);
            }
            //console.log(this.sucu,"dos");
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredSucursal = [...this.sucu];
                    //console.log(this.filteredSucursal,'1');
                }
                else {
                    this.filteredSucursal = this.sucu.filter((tiendaSucursal) => {
                        return tiendaSucursal.toLowerCase().startsWith(event.query.toLowerCase());
                    });//console.log(this.filteredSucursal,'2');
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
            this.asignacionD = [];
            var MyDate = new Date();
            var fecha;
            fecha = ('0' + MyDate.getDate()).slice(-2) + '-'
                + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-'
                + MyDate.getFullYear();
            //console.log( fecha);
            //this.displayResponsive = true;
            let contador = -1;

            //console.log(this.tienda.tiendaSucursal);
            // console.log(this.empleados);
            for (let j = 0; j < this.asigEmpId.length; j++) {
                for (let i = 0; i < this.empleados.length; i++) {

                    if (this.empleados[i].tiendaSucursal === this.asigEmpId[j].tiendaSucursal) {
                        contador = contador + 1;
                        this.asignacionD[contador] = {
                            id: null,
                            empId: this.empleados[i].empId,
                            empNombre: this.empleados[i].nombre,
                            sucursal: this.empleados[i].tiendaSucursal,
                            esquema: this.empleados[i].esquema,
                            role: this.empleados[i].puesto,
                            tipoServicio: null,
                            horario: null,
                            placas: null,
                            tipo: null,
                            marca: null,
                            submarcas: null,
                            modelo: null,
                            dia: fecha,
                            hora: null,
                            observaciones: null,
                            asignador: localStorage.usuario
                        };
                    }
                }
            }//console.log(this.asigEmpId,"mal");
            for (let ji = 0; ji < this.asigEmpId.length; ji++) {

                await this.asignacionDiariaServicio.getHistorico(fecha).then(data => {
                    this.asignacionGet = data.data; console.log(this.asignacionGet, "asignacionGet"); this.loading = true;
                    if (this.asignacionGet.length > 0) {
                        this.loading = false;
                        for (let a = 0; a < this.asignacionGet.length; a++) {
                            for (let b = 0; b < this.asignacionD.length; b++) {
                                if (this.asignacionGet[a].empId === this.asignacionD[b].empId) {
                                    this.asignacionD[b].id = this.asignacionGet[a].id;
                                    this.asignacionD[b].esquema = this.asignacionGet[a].esquema;
                                    this.asignacionD[b].sucursal = this.asignacionGet[a].sucursal;
                                    this.asignacionD[b].tipoServicio = this.asignacionGet[a].tipoServicio;
                                    this.asignacionD[b].statusOperacion = this.asignacionGet[a].statusOperacion;
                                    this.asignacionD[b].role = this.asignacionGet[a].role;
                                    this.asignacionD[b].placas = this.asignacionGet[a].placas;
                                    this.asignacionD[b].horario = this.asignacionGet[a].horario;
                                    this.asignacionD[b].tipo = this.asignacionGet[a].tipo;
                                    this.asignacionD[b].marca = this.asignacionGet[a].marca;
                                    this.asignacionD[b].modelo = this.asignacionGet[a].modelo;
                                    this.asignacionD[b].submarcas = this.asignacionGet[a].submarcas;
                                    this.asignacionD[b].esquemaUnidad = this.asignacionGet[a].esquemaUnidad;
                                    this.asignacionD[b].cambio = this.asignacionGet[a].cambio;
                                    this.asignacionD[b].observaciones = this.asignacionGet[a].observaciones;

                                }
                            }
                        }//console.log(this.asignacionD,"hey asignacion");
                        for (let ia = 0; ia < this.asignacionD.length; ia++) {
                            //console.log(ia);


                        }
                        //console.log(this.reporteRuta);
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

                }).catch(error => {
                    this.mensaje = error + '----error de conexion';
                });
            } this.loading = false;
        },
        cambiarTienda() {

            //this.operadorDialog=true;
        },
        async onRowSelect(event) {
            this.nomTienda = event.data.nomTiendaMeli
            //let tienda=event.data.tiendaSucursal;
            this.tienda = event.data;
            this.rutas = [];
            //console.log(this.tienda,"tienda");
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
                if (this.empleados[i].tiendaSucursal === this.tienda.tiendaSucursal) {
                    b = b + 1;
                    this.datosBasicosEmp[b] = {
                        empId: this.empleados[i].empId,
                        nombre: this.empleados[i].nombre,
                    };

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
        onCellEditCompleteAsignacion(event) {
            var MyDate = new Date();

            var hora = MyDate.getHours();
            console.log(event.data);
            console.log(this.unidades);
            console.log(hora)
            if (hora > 3) {
                event.data.cambio = 1
                //console.log(event.data);
            }
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
        async agregarAsignacion() {
            this.asignacionD=[];
            this.asignacionGet=[];
            this.mensajeAsignacion=null;
            this.asignacionF=null;
            this.loading = true;
            this.exportar=false;
            this.mensaje = "";
            let rh = localStorage.tienda;
            var puesto=localStorage.puesto;
            let contador=-1;
            var MyDate = new Date();
            var actual = new Date();
            var fechaM, fechaDos, fechaFormato;
            MyDate.setDate(MyDate.getDate() +1);
            var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
            var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
            fechaFormato = (diasSemana[(MyDate.getDay() )] + ", " + (MyDate.getDate() ) + " de " + meses[MyDate.getMonth()] + " de " + MyDate.getFullYear());
            fechaM = ('0' + (MyDate.getDate() )).slice(-2) + '-'
                + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-'
                + MyDate.getFullYear();
            fechaDos = ('0' + (actual.getDate())).slice(-2) + '-'
                + ('0' + (actual.getMonth() + 1)).slice(-2) + '-'
                + actual.getFullYear();
            this.mensajeAsignacion = "AGREGAR ASIGNACIÓN DIA: " + fechaFormato;
            this.displayResponsive = true;
            //let count = -1;

            // console.log(this.tienda.tiendaSucursal);
            //console.log(this.empleados,"empleados");
            //console.log(this.asignacionD,"111");
            if (rh === 'PROVEEDOR') {
                await this.asignacionDiariaServicio.getEsquemaDia('RENTATOTAL', fechaM).then(data => {
                    this.asignacionD = data.data;
                    if(this.asignacionD.length>0){
                        this.asignacionF="Ya existe asignacion del dia "+fechaM;
                        for (let ko = 0; ko < this.asignacionD.length; ko++) {
                        this.asignacionD[ko].dia = fechaM;
                    }

                    }else{
                        this.asignacionDiariaServicio.getEsquemaDia('RENTATOTAL', fechaDos).then(data=>{
                            this.asignacionD = data.data;
                            if(this.asignacionD.length>0){
                        for (let ko = 0; ko < this.asignacionD.length; ko++) {
                        this.asignacionD[ko].dia = fechaM;
                    }
                        }});
                    }
                    
                    this.loading = false;
                    //console.log(this.asignacionD,"asignacionGet"); 
                });
            }if(puesto==="TEAMLEADER" || puesto==="GERENTE" || puesto==="SUBGERENTE"){
                for (let j = 0; j < this.idPermisos.length; j++) {
                    for (let i = 0; i < this.empleados.length; i++) {
                        //console.log(this.asigEmpId[j],"aqui");
                        if (this.empleados[i].tiendasEmpleados.length > 0) {
                            if (this.idPermisos[j].id === this.empleados[i].tiendasEmpleados[0].id) {
                                //
                                contador = contador + 1;
                                this.asignacionD[contador] = {
                                    id: null,
                                    empId: this.empleados[i].empId,
                                    empNombre: this.empleados[i].nombre,
                                    sucursal: this.empleados[i].tiendasEmpleados[0].formato + " " + this.empleados[i].tiendasEmpleados[0].sucursal,
                                    esquema: this.empleados[i].esquema,
                                    role: this.empleados[i].puesto,
                                    horario: null,
                                    placas: null,
                                    tipo: null,
                                    marca: null,
                                    submarcas: null,
                                    modelo: null,
                                    dia: fechaM,
                                    hora: null,
                                    asignador: null
                                };

                            }
                        }

                    }for(let a=0;a< this.administrativosDis.length;a++){
                        if(this.administrativosDis[a].tiendasAdmin.length> 0){
                            if(this.administrativosDis[a].tiendasAdmin[0].id===this.idPermisos[j].id){
                            contador = contador + 1;
                                this.asignacionD[contador] = {
                                    id: null,
                                    empId: this.administrativosDis[a].empId,
                                    empNombre: this.administrativosDis[a].nombre,
                                    sucursal:this.administrativosDis[a].tiendasAdmin[0].formato + " " + this.administrativosDis[a].tiendasAdmin[0].sucursal,
                                    esquema: this.administrativosDis[a].esquema,
                                    role: this.administrativosDis[a].puesto,
                                    horario: null,
                                    placas: null,
                                    tipo: null,
                                    marca: null,
                                    submarcas: null,
                                    modelo: null,
                                    dia: fechaM,
                                    hora: null,
                                    asignador: null
                                };
                        }
                        }
                        
                    }for(let p=0;p<this.administrativosSup.length;p++){
                        if(this.administrativosSup[p].tiendasAdmin.length> 0){
                            if(this.administrativosSup[p].tiendasAdmin[0].id===this.idPermisos[j].id){
                            contador = contador + 1;
                                this.asignacionD[contador] = {
                                    id: null,
                                    empId: this.administrativosSup[p].empId,
                                    empNombre: this.administrativosSup[p].nombre,
                                    sucursal:this.administrativosSup[p].tiendasAdmin[0].formato + " " + this.administrativosSup[p].tiendasAdmin[0].sucursal,
                                    esquema: this.administrativosSup[p].esquema,
                                    role: this.administrativosSup[p].puesto,
                                    horario: null,
                                    placas: null,
                                    tipo: null,
                                    marca: null,
                                    submarcas: null,
                                    modelo: null,
                                    dia: fechaM,
                                    hora: null,
                                    asignador: null
                                };
                        }
                        }
                        
                    }
                }

                    await this.asignacionDiariaServicio.getHistorico(fechaM).then(data => {
                        contador=-1;
                        this.asignacionGet = data.data; this.loading = true;
                        console.log(contador,"si contador");
                        if (this.asignacionGet.length > 0) {
                            console.log(this.asignacionGet,"si aplica fecha m");
                            this.asignacionF="Ya existe asignacion del dia "+fechaM;
                            for (let j = 0; j < this.asignacionD.length; j++) {
                            for (let ae = 0; ae < this.asignacionGet.length; ae++) {
                                if(this.asignacionGet[ae].tiendasEmpleados.length>0){
                                    if(this.asignacionGet[ae].empId===this.asignacionD[j].empId){
                                        
                                this.asignacionD[j] = {
                                    id: null,
                                    empId: this.asignacionGet[ae].empId,
                                    empNombre: this.asignacionGet[ae].empNombre,
                                    sucursal: this.asignacionGet[ae].tiendasEmpleados[0].formato + " " + this.asignacionGet[ae].tiendasEmpleados[0].sucursal,
                                    esquema: this.asignacionGet[ae].esquema,
                                    role: this.asignacionGet[ae].role,
                                    horario: this.asignacionGet[ae].horario,
                                    placas: this.asignacionGet[ae].placas,
                                    tipo: this.asignacionGet[ae].tipo,
                                    marca: this.asignacionGet[ae].marca,
                                    submarcas: this.asignacionGet[ae].submarcas,
                                    modelo: this.asignacionGet[ae].modelo,
                                    dia: fechaM,
                                    hora: this.asignacionGet[ae].hora,
                                    asignador: this.asignacionGet[ae].asignador,
                                    observaciones:this.asignacionGet[ae].observaciones,
                                    tipoServicio:this.asignacionGet[ae].tipoServicio,
                                    statusOperacion:this.asignacionGet[ae].statusOperacion,
                                    esquemaUnidad:this.asignacionGet[ae].esquemaUnidad
                                };
                                        
                                    }

                                }
                                
                               
                            }//console.log(this.asignacionD,"hey d");
                        
                        }this.loading = false;
                            //console.log(this.asignacionD,"actual");
                        } else {
                            //this.asignacionD=[];
                            //
                            this.asignacionDiariaServicio.getHistorico(fechaDos).then(data =>{
                                this.asignacionGet=data.data;
                                this.loading = false;
                        if (this.asignacionGet.length > 0) {
                            
                            for (let j = 0; j < this.asignacionD.length; j++) {
                            for (let ae = 0; ae < this.asignacionGet.length; ae++) {
                                if(this.asignacionGet[ae].tiendasEmpleados.length>0){
                                    if(this.asignacionGet[ae].empId===this.asignacionD[j].empId){
                                        
                                this.asignacionD[j] = {
                                    id: null,
                                    empId: this.asignacionGet[ae].empId,
                                    empNombre: this.asignacionGet[ae].empNombre,
                                    sucursal: this.asignacionGet[ae].tiendasEmpleados[0].formato + " " + this.asignacionGet[ae].tiendasEmpleados[0].sucursal,
                                    esquema: this.asignacionGet[ae].esquema,
                                    role: this.asignacionGet[ae].role,
                                    horario: this.asignacionGet[ae].horario,
                                    placas: this.asignacionGet[ae].placas,
                                    tipo: this.asignacionGet[ae].tipo,
                                    marca: this.asignacionGet[ae].marca,
                                    submarcas: this.asignacionGet[ae].submarcas,
                                    modelo: this.asignacionGet[ae].modelo,
                                    dia: fechaM,
                                    hora: this.asignacionGet[ae].hora,
                                    asignador: this.asignacionGet[ae].asignador,
                                    observaciones:this.asignacionGet[ae].observaciones,
                                    tipoServicio:this.asignacionGet[ae].tipoServicio,
                                    statusOperacion:this.asignacionGet[ae].statusOperacion,
                                    esquemaUnidad:this.asignacionGet[ae].esquemaUnidad
                                    
                                };
                                        
                                    }

                                }
                                
                               
                            }//console.log(this.asignacionD,"hey d");
                        
                        }
                            //console.log(this.asignacionD,"actual");
                        }else{
                                for (let c = 0; c < this.asignacionD.length; c++) {
                                this.asignacionD[c].dia = fechaM;


                            } this.loading = false;
                        }
                                
                            }).catch(error => {
                        this.mensaje = error + '----error de conexion';
                    });
                            
                        }

                    }).catch(error => {
                        this.mensaje = error + '----error de conexion';
                    });
               this.loading = false;
            
            } 
            if(puesto!="TEAMLEADER" && puesto!="GERENTE" && puesto!="SUBGERENTE" && rh!= 'PROVEEDOR') {
                for (let j = 0; j < this.idPermisos.length; j++) {
                    for (let i = 0; i < this.empleados.length; i++) {
                        //console.log(this.asigEmpId[j],"aqui");
                        if (this.empleados[i].tiendasEmpleados.length > 0) {
                            if (this.idPermisos[j].id === this.empleados[i].tiendasEmpleados[0].id ) {
                                //
                                contador = contador + 1;
                                this.asignacionD[contador] = {
                                    id: null,
                                    empId: this.empleados[i].empId,
                                    empNombre: this.empleados[i].nombre,
                                    sucursal: this.empleados[i].tiendasEmpleados[0].formato + " " + this.empleados[i].tiendasEmpleados[0].sucursal,
                                    esquema: this.empleados[i].esquema,
                                    role: this.empleados[i].puesto,
                                    horario: null,
                                    placas: null,
                                    tipo: null,
                                    marca: null,
                                    submarcas: null,
                                    modelo: null,
                                    dia: fechaM,
                                    hora: null,
                                    asignador: null
                                };

                            }
                        }

                    }
                }
                   await this.asignacionDiariaServicio.getHistorico(fechaM).then(data => {
                        contador=-1;
                        this.asignacionGet = data.data; this.loading = true;
                        console.log(contador,"si contador");
                        if (this.asignacionGet.length > 0) {
                            console.log(this.asignacionGet,"si aplica fecha m");
                            this.asignacionF="Ya existe asignacion del dia "+fechaM;
                            for (let j = 0; j < this.asignacionD.length; j++) {
                            for (let ae = 0; ae < this.asignacionGet.length; ae++) {
                                if(this.asignacionGet[ae].tiendasEmpleados.length>0){
                                    if(this.asignacionGet[ae].empId===this.asignacionD[j].empId){
                                        
                                this.asignacionD[j] = {
                                    id: null,
                                    empId: this.asignacionGet[ae].empId,
                                    empNombre: this.asignacionGet[ae].empNombre,
                                    sucursal: this.asignacionGet[ae].tiendasEmpleados[0].formato + " " + this.asignacionGet[ae].tiendasEmpleados[0].sucursal,
                                    esquema: this.asignacionGet[ae].esquema,
                                    role: this.asignacionGet[ae].role,
                                    horario: this.asignacionGet[ae].horario,
                                    placas: this.asignacionGet[ae].placas,
                                    tipo: this.asignacionGet[ae].tipo,
                                    marca: this.asignacionGet[ae].marca,
                                    submarcas: this.asignacionGet[ae].submarcas,
                                    modelo: this.asignacionGet[ae].modelo,
                                    dia: fechaM,
                                    hora: this.asignacionGet[ae].hora,
                                    asignador: this.asignacionGet[ae].asignador,
                                    observaciones:this.asignacionGet[ae].observaciones,
                                    tipoServicio:this.asignacionGet[ae].tipoServicio,
                                    statusOperacion:this.asignacionGet[ae].statusOperacion,
                                    esquemaUnidad:this.asignacionGet[ae].esquemaUnidad
                                };
                                        
                                    }

                                }
                                
                               
                            }//console.log(this.asignacionD,"hey d");
                        
                        }
                            //console.log(this.asignacionD,"actual");
                        } else {
                            //this.asignacionD=[];
                            //
                            this.asignacionDiariaServicio.getHistorico(fechaDos).then(data =>{
                                this.asignacionGet=data.data;
                                this.loading = false;
                        if (this.asignacionGet.length > 0) {
                            for (let j = 0; j < this.asignacionD.length; j++) {
                            for (let ae = 0; ae < this.asignacionGet.length; ae++) {
                                if(this.asignacionGet[ae].tiendasEmpleados.length>0){
                                    if(this.asignacionGet[ae].empId===this.asignacionD[j].empId){
                                        
                                this.asignacionD[j] = {
                                    id: null,
                                    empId: this.asignacionGet[ae].empId,
                                    empNombre: this.asignacionGet[ae].empNombre,
                                    sucursal: this.asignacionGet[ae].tiendasEmpleados[0].formato + " " + this.asignacionGet[ae].tiendasEmpleados[0].sucursal,
                                    esquema: this.asignacionGet[ae].esquema,
                                    role: this.asignacionGet[ae].role,
                                    horario: this.asignacionGet[ae].horario,
                                    placas: this.asignacionGet[ae].placas,
                                    tipo: this.asignacionGet[ae].tipo,
                                    marca: this.asignacionGet[ae].marca,
                                    submarcas: this.asignacionGet[ae].submarcas,
                                    modelo: this.asignacionGet[ae].modelo,
                                    dia: fechaM,
                                    hora: this.asignacionGet[ae].hora,
                                    asignador: this.asignacionGet[ae].asignador,
                                    observaciones:this.asignacionGet[ae].observaciones,
                                    tipoServicio:this.asignacionGet[ae].tipoServicio,
                                    statusOperacion:this.asignacionGet[ae].statusOperacion,
                                    esquemaUnidad:this.asignacionGet[ae].esquemaUnidad
                                };
                                        
                                    }

                                }
                                
                               
                            }//console.log(this.asignacionD,"hey d");
                        
                        }
                            //console.log(this.asignacionD,"actual");
                        }else{
                                for (let c = 0; c < this.asignacionD.length; c++) {
                                this.asignacionD[c].dia = fechaM;


                            } this.loading = false;
                        }
                                
                            }).catch(error => {
                        this.mensaje = error + '----error de conexion';
                    });
                            
                        }

                    }).catch(error => {
                        this.mensaje = error + '----error de conexion';
                    });
               this.loading = false;
            }
        },
        async asignacionDiaria() {
            this.loading = true;
            this.asignacionF=null;
            this.mensajeAsignacion=null;
            this.asignacionD = [];
            this.reporteRuta = [];
            this.mensaje = "";
            let rh = localStorage.tienda;
            var puesto=localStorage.puesto;
            //let puesto=localStorage.puesto;
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
            this.displayResponsive = true;
            let contador = -1;

            //console.log(this.asigEmpId,"asigEmpId");
            //console.log(rh,"aqui");
            if (rh === 'PROVEEDOR') {
                await this.asignacionDiariaServicio.getEsquemaDia('RENTATOTAL', fecha).then(data => {
                    this.asignacionD = data.data; this.loading = false;
                    if(this.asignacionD.length > 0){
                        this.exportar=true;
                    }
                    //console.log(this.asignacionD, "DADADADS");
                });
            }if(puesto==="TEAMLEADER" || puesto==="GERENTE" || puesto==="SUBGERENTE"){

                for (let j = 0; j < this.idPermisos.length; j++) {
                    for (let i = 0; i < this.empleados.length; i++) {

                        //console.log(this.asigEmpId[j],"aqui");
                        if (this.empleados[i].tiendasEmpleados.length > 0) {
                            if (this.idPermisos[j].id === this.empleados[i].tiendasEmpleados[0].id) {
                                //
                                contador = contador + 1;
                                this.asignacionD[contador] = {
                                    id: null,
                                    empId: this.empleados[i].empId,
                                    empNombre: this.empleados[i].nombre,
                                    sucursal: this.empleados[i].tiendasEmpleados[0].formato + " " + this.empleados[i].tiendasEmpleados[0].sucursal,
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
                                    asignador: null
                                };

                            }
                        }

                    }
                    for(let a=0;a< this.administrativosDis.length;a++){
                        if(this.administrativosDis[a].tiendasAdmin.length> 0){
                            if(this.administrativosDis[a].tiendasAdmin[0].id===this.idPermisos[j].id){
                            contador = contador + 1;
                                this.asignacionD[contador] = {
                                    id: null,
                                    empId: this.administrativosDis[a].empId,
                                    empNombre: this.administrativosDis[a].nombre,
                                    sucursal:this.administrativosDis[a].tiendasAdmin[0].formato + " " + this.administrativosDis[a].tiendasAdmin[0].sucursal,
                                    esquema: this.administrativosDis[a].esquema,
                                    role: this.administrativosDis[a].puesto,
                                    horario: null,
                                    placas: null,
                                    tipo: null,
                                    marca: null,
                                    submarcas: null,
                                    modelo: null,
                                    dia: fecha,
                                    hora: null,
                                    asignador: null
                                };
                        }
                        }
                        
                    }for(let p=0;p<this.administrativosSup.length;p++){
                        if(this.administrativosSup[p].tiendasAdmin.length> 0){
                            if(this.administrativosSup[p].tiendasAdmin[0].id===this.idPermisos[j].id){
                            contador = contador + 1;
                                this.asignacionD[contador] = {
                                    id: null,
                                    empId: this.administrativosSup[p].empId,
                                    empNombre: this.administrativosSup[p].nombre,
                                    sucursal:this.administrativosSup[p].tiendasAdmin[0].formato + " " + this.administrativosSup[p].tiendasAdmin[0].sucursal,
                                    esquema: this.administrativosSup[p].esquema,
                                    role: this.administrativosSup[p].puesto,
                                    horario: null,
                                    placas: null,
                                    tipo: null,
                                    marca: null,
                                    submarcas: null,
                                    modelo: null,
                                    dia: fecha,
                                    hora: null,
                                    asignador: null
                                };
                        }
                        }
                        
                    }
                }//console.log(this.asignacionD,"D");
                


                await this.asignacionDiariaServicio.getHistorico(fecha).then(data => {
                    this.asignacionGet = data.data; this.loading = true;
                    if (this.asignacionGet.length > 0) {
                        this.exportar=true;
                        //console.log(this.asignacionGet,"get");
                        for (let a = 0; a < this.asignacionGet.length; a++) {
                            for (let b = 0; b < this.asignacionD.length; b++) {
                                if (this.asignacionGet[a].empId === this.asignacionD[b].empId) {
                                    if (this.asignacionGet[a].tiendasEmpleados.length > 0) {
                                        this.asignacionD[b].id = this.asignacionGet[a].id;
                                        this.asignacionD[b].sucursal = this.asignacionGet[a].tiendasEmpleados[0].formato + " " + this.asignacionGet[a].tiendasEmpleados[0].sucursal;
                                        this.asignacionD[b].tipoServicio = this.asignacionGet[a].tipoServicio;
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
                                        //this.asignacionD[b].cambio=this.asignacionGet[a].cambio;
                                        this.asignacionD[b].observaciones = this.asignacionGet[a].observaciones;

                                    }


                                }
                            }
                        }//console.log(this.asignacionD,"d-2");

                        //console.log(this.reporteRuta);
                        //this.cfdiTrasladoMeliServicio.getFolioFis(this.reporteRuta[0].idRuta).then(data=>{this.folioFis=data.data;console.log(data,"aqui");});


                    } else {
                        //this.asignacionD=[];
                        this.loading = false;
                    }

                }).catch(error => {
                    this.mensaje = error + '----error de conexion';
                });
                this.loading = false;
            
            } 
            if(puesto!="TEAMLEADER" && puesto!="GERENTE" && puesto!="SUBGERENTE" && rh!= 'PROVEEDOR') {
                for (let j = 0; j < this.idPermisos.length; j++) {
                    for (let i = 0; i < this.empleados.length; i++) {

                        //console.log(this.asigEmpId[j],"aqui");
                        if (this.empleados[i].tiendasEmpleados.length > 0) {
                            if (this.idPermisos[j].id === this.empleados[i].tiendasEmpleados[0].id) {
                                //
                                contador = contador + 1;
                                this.asignacionD[contador] = {
                                    id: null,
                                    empId: this.empleados[i].empId,
                                    empNombre: this.empleados[i].nombre,
                                    sucursal: this.empleados[i].tiendasEmpleados[0].formato + " " + this.empleados[i].tiendasEmpleados[0].sucursal,
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
                                    asignador: null
                                };

                            }
                        }

                    }
                }//console.log(this.asignacionD,"D");


                await this.asignacionDiariaServicio.getHistorico(fecha).then(data => {
                    this.asignacionGet = data.data; this.loading = true;
                    if (this.asignacionGet.length > 0) {
                        this.exportar=true;
                        //console.log(this.asignacionGet,"get");
                        for (let a = 0; a < this.asignacionGet.length; a++) {
                            for (let b = 0; b < this.asignacionD.length; b++) {
                                if (this.asignacionGet[a].empId === this.asignacionD[b].empId) {
                                    if (this.asignacionGet[a].tiendasEmpleados.length > 0) {
                                        this.asignacionD[b].id = this.asignacionGet[a].id;
                                        this.asignacionD[b].sucursal = this.asignacionGet[a].tiendasEmpleados[0].formato + " " + this.asignacionGet[a].tiendasEmpleados[0].sucursal;
                                        this.asignacionD[b].tipoServicio = this.asignacionGet[a].tipoServicio;
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
                                        //this.asignacionD[b].cambio=this.asignacionGet[a].cambio;
                                        this.asignacionD[b].observaciones = this.asignacionGet[a].observaciones;

                                    }


                                }
                            }
                        }//console.log(this.asignacionD,"d-2");

                        //console.log(this.reporteRuta);
                        //this.cfdiTrasladoMeliServicio.getFolioFis(this.reporteRuta[0].idRuta).then(data=>{this.folioFis=data.data;console.log(data,"aqui");});


                    } else {
                        //this.asignacionD=[];
                        this.loading = false;
                    }

                }).catch(error => {
                    this.mensaje = error + '----error de conexion';
                });
                this.loading = false;
            }
            //console.log(this.asignacionD,"asignacionD");   
        },
        async consultarAsignacion() {
            console.log(this.fechaConsulta);
            this.asignacionF=null;
            this.mensajeAsignacion=null;
            let rh = localStorage.tienda;
            this.asignacionD = [];
            this.reporteRuta = [];
            this.mensaje = "";

            //var MyDate = new Date();
            var fecha, fechaFormato;
            fecha = ('0' + this.fechaConsulta.getDate()).slice(-2) + '-'
                + ('0' + (this.fechaConsulta.getMonth() + 1)).slice(-2) + '-'
                + this.fechaConsulta.getFullYear();
            var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
            var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
            fechaFormato = (diasSemana[this.fechaConsulta.getDay()] + ", " + this.fechaConsulta.getDate() + " de " + meses[this.fechaConsulta.getMonth()] + " de " + this.fechaConsulta.getFullYear());
            this.mensajeAsignacion = "ASIGNACION DEL DIA: " + fechaFormato;
            //console.log( fecha);
            this.abrirConsulta = true;
            let contador = -1;

            //console.log(this.asigEmpId,"asigEmpId");
            //console.log(this.empleados,"aqui");
            for (let j = 0; j < this.idPermisos.length; j++) {
                for (let i = 0; i < this.empleados.length; i++) {
                    if (this.empleados[i].tiendasEmpleados.length > 0){
                        if (this.idPermisos[j].id === this.empleados[i].tiendasEmpleados[0].id) {
                        //
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
                    //console.log(this.asigEmpId[j],"aqui");
                    
                }
            }//console.log(this.asignacionD,"mal");
            if (rh === 'PROVEEDOR') {
                await this.asignacionDiariaServicio.getEsquemaDia('RENTATOTAL', fecha).then(data => {
                    this.asignacionD = data.data;
                    this.loading = false;
                    //console.log(this.asignacionD,"asignacionGet"); 
                });
            } else {

                    await this.asignacionDiariaServicio.getHistorico(fecha).then(data => {
                        this.asignacionGet = data.data; this.loading = true;
                        if (this.asignacionGet.length > 0) {

                            for (let a = 0; a < this.asignacionGet.length; a++) {
                                for (let b = 0; b < this.asignacionD.length; b++) {
                                    if (this.asignacionGet[a].empId === this.asignacionD[b].empId) {
                                        this.asignacionD[b].id = this.asignacionGet[a].id;
                                        this.asignacionD[b].sucursal = this.asignacionGet[a].sucursal;
                                        this.asignacionD[b].tipoServicio = this.asignacionGet[a].tipoServicio;
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
                                        this.asignacionD[b].cambio = this.asignacionGet[a].cambio;
                                        this.asignacionD[b].observaciones = this.asignacionGet[a].observaciones;


                                    }
                                }
                            }//console.log(this.asignacionD,"hey asignacionD");

                            //console.log(this.reporteRuta);
                            //this.cfdiTrasladoMeliServicio.getFolioFis(this.reporteRuta[0].idRuta).then(data=>{this.folioFis=data.data;console.log(data,"aqui");});


                        } else {
                            //this.asignacionD=[];
                            this.loading = false;
                        }

                    }).catch(error => {
                        this.mensaje = error + '----error de conexion';
                    });
                this.loading = false;
            }
        },
        async closeResponsive() {
            this.abrirConsulta = false;
            /* var MyDate = new Date();
 var fecha;
 fecha = ('0' + MyDate.getDate()).slice(-2) + '-'
              + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-'
              + MyDate.getFullYear();
             let nomTienda=this.tienda.nomTiendaMeli
            ¨*/
            this.displayResponsive = false;
            // this.abrirNuevaRuta=false;
        },
        async guardarAsignacion() {
            this.asignacion=null;
            let c = 0;
            let prev = this.asignacionD.length / 2;
            this.asignacion=this.asignacionD;          
            prev = Math.round(prev);
            //console.log(prev);
            this.progreso = 30;

            this.cargando = true;
            for (let i = 0; i < this.asignacion.length; i++) {
                this.asignacion[i].asignador = localStorage.usuario;
                this.asignacion[i].tiendasEmpleados=[];
                await this.asignacionDiariaServicio.save(this.asignacion[i]).then(data => {
                    console.log(data);
                    this.mensaje = "SE AGREGO CORRECTAMENTE";
                    c = c + 1;
                    if (c === prev) {
                        this.progreso = 50;
                    }
                    if (c === this.asignacion.length) {
                        this.progreso = 100;
                        this.exportar=true;
                        this.displayResponsive = true;
                    }

                }).catch(error => {
                    this.mensaje = error + '----NO SE GUARDO ELEL CAMPO  EN LA BASE DE DATOS';
                    this.displayResponsive = true;
                    this.exportar=false;
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
                    'DEVOLUCION': data.status === 'DEVOLUCION',
                    'UNO': data.cambio === 1
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

.UNO {
    color: #ff8500;
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
}
</style>

