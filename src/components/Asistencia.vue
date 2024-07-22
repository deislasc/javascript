<template>

    <div class="card">
        <Toolbar class="p-mb-4">
            <template #left>
                <div class="p-fluid p-grid">
                    <div class="field col-12 md:col-4">
                        <label for="dateformat">Fecha Inicio:</label>
                        <Calendar id="dateformat" v-model="fechaInicio" dateFormat="dd-mm-yy" />
                    </div>

                    <h6> -AL- </h6>

                    <div class="field col-12 md:col-4">
                        <label for="dateformat">Fecha Fin:</label>
                        <Calendar id="dateformat" v-model="fechaFin" dateFormat="dd-mm-yy" />

                    </div>
                    <div class="field col-12 md:col-4">
                        <br>
                        <Button type="button" icon="pi pi-search" class="p-button-outlined p-mb-2"
                            @click="FiltrarAsistencia()" v-tooltip="'Buscar'" />

                    </div>

                </div>
            </template>
            <template #right>
                <!-- <div class="field col-12 md:col-4">

                    <Button type="button" label="Pintar Tabla" icon="pi pi-pencil" @click="pintarTabla()"
                        class="p-button-success p-mr-2" v-tooltip="'Pintar tabla'" />
                </div>-->

            </template>
        </Toolbar>
        <DataTable ref="dt" :value="reporteSemanalDef" v-model:selection="selectedProduct1" dataKey="id"
            :rowHover="true" :resizableColumns="true" columnResizeMode="fit" showGridlines v-model:filters="filters1"
            filterDisplay="menu" :loading="loading" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 40]"
            :filters="filters1" editMode="cell" class="editable-cells-table" @cellEditComplete="onCellEditComplete"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            responsiveLayout="scroll" :globalFilterFields="['empId', 'nombre', 'dia', 'formato','sucursal','puesto']">
            <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
                <h2 class="p-m-0">Control de Asistencia</h2>
            </div>
            <Toolbar class="p-mb-4">
                <template #left>


                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters1['global'].value" placeholder="Buscar" />
                    </span>
                    <Button type="button" icon="pi pi-filter-slash" class="p-button-outlined mr-2"
                        @click="clearFilter1()" v-tooltip="'Click para borrar filtro'" />
                </template>
                <template #right>


                    <Button label="Generar Excel" icon="pi pi-upload" class="p-button-success"
                        @click="exportCSV($event)" />
                </template>
            </Toolbar>
            <Column header="Foto">
                <template #body="slotProps">
                    <img :src="slotProps.data.urlSeguroUno" class="product-image" />
                </template>
            </Column>
            <Column field="empId" header="empId" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.empId }}
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Buscar por empId" />
                </template>
            </Column>
            <Column field="nombre" header="Nombre" style="min-width:12rem">

                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.nombre }}
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Buscar por empId" />
                </template>
            </Column>
            <Column field="puesto" header="Puesto" style="min-width:12rem">

                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.puesto }}
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Buscar por empId" />
                </template>
            </Column>
            <Column field="formato" header="Formato" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.formato }}
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Buscar por tienda" />
                </template>
            </Column>
            <Column field="sucursal" header="Sucursal" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.sucursal }}
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Buscar por tienda" />
                </template>
            </Column>
            <Column field="diaUno" header="dia" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.diaUno }}
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Buscar por dia" />
                </template>
            </Column>


            <Column field="horaEntradaUno" header="hora Entrada" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.horaEntradaUno }}
                    </div>
                </template>
            </Column>
            <Column field="horaSalidaUno" header="hora Fin" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.horaSalidaUno }}
                    </div>
                </template>
            </Column>
            <Column field="coordInicioJornadaUno" header="Coor Ent" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.coordInicioJornadaUno }}
                    </div>
                </template>
            </Column>
            <Column field="coordFinJornadaUno" header="Coor Fin" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.coordFinJornadaUno }}
                    </div>
                </template>
            </Column>
            <Column header="Foto">
                <template #body="slotProps">
                    <img :src="slotProps.data.urlSeguroDos" class="product-image" />
                </template>
            </Column>
            <Column field="diaDos" header="dia" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.diaDos }}
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Buscar por dia" />
                </template>
            </Column>


            <Column field="horaEntradaDos" header="hora Entrada" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.horaEntradaDos }}
                    </div>
                </template>
            </Column>

            <Column field="horaSalidaDos" header="hora Fin" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.horaSalidaDos }}
                    </div>
                </template>
            </Column>
            <Column field="coordInicioJornadaDos" header="Coor Ent" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.coordInicioJornadaDos }}
                    </div>
                </template>
            </Column>
            <Column field="coordFinJornadaDos" header="Coor Fin" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.coordFinJornadaDos }}
                    </div>
                </template>
            </Column>
            <Column header="Foto">
                <template #body="slotProps">
                    <img :src="slotProps.data.urlSeguroTres" class="product-image" />
                </template>
            </Column>
            <Column field="diaTres" header="dia" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.diaTres }}
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Buscar por dia" />
                </template>
            </Column>


            <Column field="horaEntradaTres" header="hora Entrada" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.horaEntradaTres }}
                    </div>
                </template>
            </Column>

            <Column field="horaSalidaTres" header="hora Fin" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.horaSalidaTres }}
                    </div>
                </template>
            </Column>
            <Column field="coordInicioJornadaTres" header="Coor Ent" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.coordInicioJornadaTres }}
                    </div>
                </template>
            </Column>
            <Column field="coordFinJornadaTres" header="Coor Fin" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.coordFinJornadaTres }}
                    </div>
                </template>
            </Column>
            <Column header="Foto">
                <template #body="slotProps">
                    <img :src="slotProps.data.urlSeguroCuatro" class="product-image" />
                </template>
            </Column>
            <Column field="diaCuatro" header="dia" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.diaCuatro }}
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Buscar por dia" />
                </template>
            </Column>


            <Column field="horaEntradaCuatro" header="hora Entrada" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.horaEntradaCuatro }}
                    </div>
                </template>
            </Column>

            <Column field="horaSalidaCuatro" header="hora Fin" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.horaSalidaCuatro }}
                    </div>
                </template>
            </Column>
            <Column field="coordInicioJornadaCuatro" header="Coor Ent" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.coordInicioJornadaCuatro }}
                    </div>
                </template>
            </Column>
            <Column field="coordFinJornadaCuatro" header="Coor Fin" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.coordFinJornadaCuatro }}
                    </div>
                </template>
            </Column>
            <Column header="Foto">
                <template #body="slotProps">
                    <img :src="slotProps.data.urlSeguroCinco" class="product-image" />
                </template>
            </Column>
            <Column field="diaCinco" header="dia" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.diaCinco }}
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Buscar por dia" />
                </template>
            </Column>


            <Column field="horaEntradaCinco" header="hora Entrada" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.horaEntradaCinco }}
                    </div>
                </template>
            </Column>

            <Column field="horaSalidaCinco" header="hora Fin" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.horaSalidaCinco }}
                    </div>
                </template>
            </Column>
            <Column field="coordInicioJornadaCinco" header="Coor Ent" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.coordInicioJornadaCinco }}
                    </div>
                </template>
            </Column>
            <Column field="coordFinJornadaCinco" header="Coor Fin" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.coordFinJornadaCinco }}
                    </div>
                </template>
            </Column>
            <Column header="Foto">
                <template #body="slotProps">
                    <img :src="slotProps.data.urlSeguroSeis" class="product-image" />
                </template>
            </Column>
            <Column field="diaSeis" header="dia" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.diaSeis }}
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Buscar por dia" />
                </template>
            </Column>
            <Column field="horaEntradaSeis" header="hora Entrada" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.horaEntradaSeis }}
                    </div>
                </template>
            </Column>

            <Column field="horaSalidaSeis" header="hora Fin" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.horaSalidaSeis }}
                    </div>
                </template>
            </Column>
            <Column field="coordInicioJornadaSeis" header="Coor Ent" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.coordInicioJornadaSeis }}
                    </div>
                </template>
            </Column>
            <Column field="coordFinJornadaSeis" header="Coor Fin" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.coordFinJornadaSeis}}
                    </div>
                </template>
            </Column>
            <Column header="Foto">
                <template #body="slotProps">
                    <img :src="slotProps.data.urlSeguroSiete" class="product-image" />
                </template>
            </Column>
            <Column field="diaSiete" header="dia" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.diaSiete }}
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Buscar por dia" />
                </template>
            </Column>


            <Column field="horaEntradaSiete" header="hora Entrada" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.horaEntradaSiete }}
                    </div>
                </template>
            </Column>

            <Column field="horaSalidaSiete" header="hora Fin" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.horaSalidaSiete }}
                    </div>
                </template>
            </Column>
            <Column field="coordInicioJornadaSiete" header="Coor Ent" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.coordInicioJornadaSiete }}
                    </div>
                </template>
            </Column>
            <Column field="coordFinJornadaSiete" header="Coor Fin" style="min-width:12rem">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data)">
                        {{ slotProps.data.coordFinJornadaSiete}}
                    </div>
                </template>
            </Column>



        </DataTable>
        <!-- <DataTable ref="dl" :value="reporteAsisDef" :paginator="true" :rows="5" :rowsPerPageOptions="[5,10,15]" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" responsiveLayout="scroll">
            <Column field="empId" header="usuario"></Column>
            <Column field="nombre" header="nombre"></Column>
            <Column field="dia" header="dia"></Column>
            <Column field="horaInicioJornada" header="horaInicioJornada"></Column>
            <Column field="horaFinJornada" header="horaFinJornada"></Column>
            <Column field="tiendaSucursal" header="tiendaSucursal"></Column>
            
        </DataTable>-->
        <!-- <div>
        <OverlayPanel ref="op" appendTo="body" :showCloseIcon="true" id="overlay_panel" style="width: 700px" :breakpoints="{'960px': '75vw'}">
        
        <DataTable ref="dl" :value="asistencianov" :paginator="true" :rows="5" :rowsPerPageOptions="[5,10,15]" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" responsiveLayout="scroll">
            <Column field="empId" header="USUARIO"></Column>
            <Column field="nombre" header="NOMBRE"></Column>
            <Column field="correo" header="correo"></Column>
            <Column field="dia" header="dia"></Column>
            <Column field="pedidos" header="pedidos"></Column>
            <Column field="cajas" header="cajas"></Column>
            <Column field="status" header="status"></Column>
            <Column field="arrendador" header="arrendador"></Column>
            <Column field="unidad" header="unidad"></Column>
            <Column field="placas" header="placas"></Column>
        </DataTable>
        <Button label="Guardar" icon="pi pi-upload" class="p-button-success" @click="exportCSV($event)"  />
        </OverlayPanel>
    </div>
    <div>
    <OverlayPanel ref="oc" appendTo="body" :showCloseIcon="true" id="overlay_panel" style="width: 700px" :breakpoints="{'960px': '75vw'}">
    
        <Button label="Guardar" icon="pi pi-upload" class="p-button-success" @click="exportCSVDos($event)"  />
    </OverlayPanel>
    </div>-->
    </div>
    <Dialog v-model:visible="operadorDialog" :style="{ width: '600px' }" header="Informacion adicional" :modal="true"
        class="p-fluid">

        <div class="p-field">
            <DataTable :value="tablaIndividual" responsiveLayout="scroll">
                <Column field="empId" header="empId"></Column>

                <Column field="arrendador" header="arrendador"></Column>

            </DataTable>
        </div>
    </Dialog>
</template>
<script>
import EmpleadosServicio from '../service/EmpleadosServicio';
import AsistenciaServicio from '../service/AsistenciaServicio';
import AsignacionTiendaServicio from '../service/AsignacionTiendaServicio';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import UnidadesFlotaServicio from '../service/UnidadesFlotaServicio';
export default ({
    data() {
        return {
            idPermisos: [{
                id: null
            }],
            intere: "",
            permisos: 0,
            fech: [],
            fechaResetIn: null,
            fechaResetFi: null,
            empIds: [],
            reporteSemanal: [{
                urlSeguroUno: null,
                empId: null,
                nombre: null,
                puesto: null,
                servicio: null,
                formato: null,
                sucursal:null,
                diaUno: null,
                horaEntradaUno: null,
                horaSalidaUno: null,
                coordInicioJornadaUno: null,
                coordFinJornadaUno: null,
                viajesUno: null,
                pedidosUno: null,
                urlSeguroDos: null,
                diaDos: null,
                horaEntradaDos: null,
                horaSalidaDos: null,
                coordInicioJornadaDos: null,
                coordFinJornadaDos: null,
                viajesDos: null,
                pedidosDos: null,
                urlSeguroTres: null,
                diaTres: null,
                horaEntradaTres: null,
                horaSalidaTres: null,
                viajesTres: null,
                pedidosTres: null,
                urlSeguroCuatro: null,
                diaCuatro: null,
                horaEntradaCuatro: null,
                horaSalidaCuatro: null,
                coordInicioJornadaCuatro: null,
                coordFinJornadaCuatro: null,
                viajesCuatro: null,
                pedidosCuatro: null,
                urlSeguroCinco: null,
                diaCinco: null,
                horaEntradaCinco: null,
                horaSalidaCinco: null,
                coordInicioJornadaCinco: null,
                coordFinJornadaCinco: null,
                viajesCinco: null,
                pedidosCinco: null,
                urlSeguroSeis: null,
                diaSeis: null,
                horaEntradaSeis: null,
                horaSalidaSeis: null,
                coordInicioJornadaSeis: null,
                coordFinJornadaSeis: null,
                viajesSeis: null,
                pedidosSeis: null,
                urlSeguroSiete: null,
                diaSiete: null,
                horaEntradasSiete: null,
                horaSalidaSiete: null,
                coordInicioJornadaSiete: null,
                coordFinJornadaSiete: null,
                viajesSiete: null,
                pedidosSiete: null,
            }],
            reporteSemanalDef: [{
                urlSeguroUno: null,
                empId: null,
                nombre: null,
                puesto: null,
                servicio: null,
                formato: null,
                sucursal:null,
                diaUno: null,
                horaEntradaUno: null,
                horaSalidaUno: null,
                coordInicioJornadaUno: null,
                coordFinJornadaUno: null,
                viajesUno: null,
                pedidosUno: null,
                urlSeguroDos: null,
                diaDos: null,
                horaEntradaDos: null,
                horaSalidaDos: null,
                coordInicioJornadaDos: null,
                coordFinJornadaDos: null,
                viajesDos: null,
                pedidosDos: null,
                urlSeguroTres: null,
                diaTres: null,
                horaEntradaTres: null,
                horaSalidaTres: null,
                viajesTres: null,
                pedidosTres: null,
                urlSeguroCuatro: null,
                diaCuatro: null,
                horaEntradaCuatro: null,
                horaSalidaCuatro: null,
                coordInicioJornadaCuatro: null,
                coordFinJornadaCuatro: null,
                viajesCuatro: null,
                pedidosCuatro: null,
                urlSeguroCinco: null,
                diaCinco: null,
                horaEntradaCinco: null,
                horaSalidaCinco: null,
                coordInicioJornadaCinco: null,
                coordFinJornadaCinco: null,
                viajesCinco: null,
                pedidosCinco: null,
                urlSeguroSeis: null,
                diaSeis: null,
                horaEntradaSeis: null,
                horaSalidaSeis: null,
                coordInicioJornadaSeis: null,
                coordFinJornadaSeis: null,
                viajesSeis: null,
                pedidosSeis: null,
                urlSeguroSiete: null,
                diaSiete: null,
                horaEntradasSiete: null,
                horaSalidaSiete: null,
                coordInicioJornadaSiete: null,
                coordFinJornadaSiete: null,
                viajesSiete: null,
                pedidosSiete: null,
            }],
            reporteSemanalUno: [{
                urlSeguro: null,
                empId: null,
                nombre: null,
                puesto: null,
                servicio: null,
                formato: null,
                sucursal:null,
                diaUno: null,
                horaEntradaUno: null,
                horaSalidaUno: null,
                viajesUno: null,
                pedidosUno: null,
            }],
            reporteSemanalDos: [{
                urlSeguro: null,
                empId: null,
                nombre: null,
                puesto: null,
                servicio: null,
                formato: null,
                sucursal:null,
                diaDos: null,
                horaEntradaDos: null,
                horaSalidaDos: null,
                viajesDos: null,
                pedidosDos: null,
            }],

            fechaInicio: null,
            fechaF: null,
            fechaIn: null,
            fechaFin: null,
            diaInicio: null,
            mesInicio: null,
            añoInicio: null,
            diaFin: null,
            mesFin: null,
            añoFin: null,
            empleados: null,
            empleadosServicio: null,
            loading: false,
            asistencianov: null,
            asistenciaServicio: null,
            asignacionTiendaServicio: null,
            asigEmpId: null,
            empleadosInfoAdicional: null,
            operador: null,
            operadorDialog: false,
            tablaIndividual: [],
            filters1: null,
            relacionDia: [{
                nombre: null,
                Lunes08: null,
                Martes09: null,
                Miercoles10: null,
                Jueves11: null,
                Viernes12: null,
                Sabado13: null,
                Domingo14: null,
                Lunes15: null,
                Martes16: null,
                Miercoles17: null,
                Jueves18: null,
                Viernes19: null,
                Sabado20: null,
                Domingo21: null,
                Lunes22: null,

            }],
            asistenciaEmpleados: [{
                empId: null,
                nombre: null,
                dia: null,
                coordInicioJornada: null,
                horaInicioJornada: null,
                coordFinJornada: null,
                horaFinJornada: null
            }],
            relacionTodo: [{
                empId: null,
                nombre: null,
                arrendador: null,
                correo: null,
                unidad: null,
                placas: null,
                marca: null,
                modelo: null,
                nombreAseguradora: null,
                curp: null,
                empLicencia: null,
                cel: null,
                status: null

            }],
            reporteAsistencia: [{
                empId: null,
                nombre: null,
                dia: null,
                pedidos: null,
                cajas: null,
                status: null,
                arrendador: null,
                correo: null,
                unidad: null,
                placas: null
            }],
            reporteAsis: [{
                urlSeguro: null,
                empId: null,
                nombre: null,
                puesto: null,
                esquema: null,
                formato: null,
                sucursal:null,
                dia: null,
                coordInicioJornada: null,
                horaInicioJornada: null,
                coordFinJornada: null,
                horaFinJornada: null

            }],
            report: [],
            reporteAsisDef: [{
                urlSeguro: null,
                empId: null,
                nombre: null,
                puesto: null,
                formato: null,
                sucursal:null,
                dia: null,
                coordInicioJornada: null,
                horaInicioJornada: null,
                coordFinJornada: null,
                horaFinJornada: null

            }],
            unidadesFlotaServicio: null,
            unidadesFlota: null,
        }
    },
    async created() {
        this.empleadosServicio = new EmpleadosServicio();
        this.asistenciaServicio = new AsistenciaServicio();
        this.asignacionTiendaServicio = new AsignacionTiendaServicio();
        this.unidadesFlotaServicio = new UnidadesFlotaServicio();
        this.initFilters1()
    },
    async mounted() {

        this.reporteSemanalDef = [];
        this.inicio();


    },
    methods: {
        async inicio() {
            this.idPermisos = [];
            this.permisos = 0;
            //let empId;
            let cont = -1;

            this.reporteSemanal = [];
            var hoy = new Date();
            var dia = (hoy.getDate() - 1) + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
            var inter;
            this.permisos = localStorage.permisos;
            for (let i = 0; i < this.permisos; i++) {
                cont = cont + 1;
                inter = "permiso" + i;
                this.idPermisos[cont] = {
                    id: localStorage.getItem(inter),
                }
                //console.log(localStorage.getItem(inter));

            }
            //console.log(this.idPermisos);
            //empId = localStorage.usuario;

            //console.log(empId);

            console.log(dia, 'dia');
            /*await this.empleadosServicio.getAll().then(data => { this.empleados = data.data; console.log(this.empleados, 'empleados'); this.loading = false; });
            await this.asignacionTiendaServicio.getEmpId(empId).then(data => { this.asigEmpId = data.data;});
            console.log(this.reporteAsisDef,'mero');*/


        },
        toggle(event) {
            this.$refs.op.toggle(event);
            this.pintarTabla();
        },
        toggleDos(event) {
            this.$refs.oc.toggle(event);
            this.pintarTablaRelacionDia();
        },
        async actualizar() {

            await this.asistenciaServicio.getAllAsistencia().then(data => { this.asistencianov = data.data; this.loading = false; });

        },
        Info(operador) {
            this.operador = { ...operador };
            for (let i = 0; i < this.empleadoInfoAdicional.length; i++) {
                if (this.empleadoInfoAdicional[i].empId === this.operador.empId) {
                    let j = 0;
                    this.tablaIndividual[j] = this.empleadoInfoAdicional[i];
                }
            }
            this.contar();
            this.operadorDialog = true;
        },
        initFilters1() {
            this.filters1 = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
                'empId': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'dia': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'nombre': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'formato': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'sucursal': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'puesto': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
                //'activity': {value: null, matchMode: FilterMatchMode.BETWEEN},
                //'verified': {value: null, matchMode: FilterMatchMode.EQUALS}
            }
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

        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        exportCSVDos() {
            this.$refs.fl.exportCSV();
        },
        stockClass(data) {
            return [
                {
                    'LISTO': data.estatusActual == 'LISTO',
                    'CARGANDO': data.estatusActual === 'CARGANDO',
                    'ENRUTA': data.estatusActual === 'ENRUTA',
                    'ENTREGADO': data.estatusActual === 'ENTREGADO',
                    'COBRO': data.estatusActual === 'COBRO',
                    'SINCARGAR': data.estatusActual === 'SINCARGAR'
                }
            ];
        },
        onProductSelect(event) {
            this.$refs.op.hide();
            console.log(event.data);


            //this.empleadoRec.pedidoIdSucursal=this.indiceRec=data.pedidoIdSucursal;


        },
        async FiltrarAsistencia() {
            //var fechaIn;

            this.permisos = 0;
            this.intere = "";
           
            let puesto=localStorage.puesto;
            console.log(puesto);
            let a = 0;
            let subGerentes=[];
            let supervisor=[];
            let dispacher=[];
            let gerente=[];
            let torreControl=[];
            let cuenta;
            let rh = localStorage.tienda;
            this.fech = [];
            this.reporteAsisDef = [];
            this.reporteSemanal = [];
            this.reporteSemanalDef = [];
            this.fechaResetIn = this.fechaInicio;
            this.fechaResetFi = this.fechaFin;
            //empId=localStorage.usuario;
            //var k=-1;
            this.fech[a] = this.fechaInicio.getDate() + '-' + (this.fechaInicio.getMonth() + 1) + '-' + this.fechaInicio.getFullYear();
            while (this.fechaInicio.getTime() < this.fechaFin.getTime()) {
                a = a + 1;
                this.fechaInicio.setDate(this.fechaInicio.getDate() + 1);
                this.fech[a] = this.fechaInicio.getDate() + '-' + (this.fechaInicio.getMonth() + 1) + '-' + this.fechaInicio.getFullYear();


            }
            a = -1;
            console.log(this.fech);
            //console.log(this.fech.length);

            this.permisos = localStorage.permisos;


            if (rh != 'RH' && rh != 'PROVEEDOR') {

                for (let j = 0; j < this.fech.length; j++) {
                    this.loading = true;
                        //await this.asistenciaServicio.getAsistenciaTienda(this.fech[j], localStorage.getItem(this.intere))
                        await this.asistenciaServicio.getAsistenciaFecha(this.fech[j]).then(data => {
                            this.asistenciaEmpleados = data.data; this.loading = true;
                            cuenta = cuenta + 1;
                           //console.log(this.asistenciaEmpleados, "this.asistenciaEmpleados");
                            //console.log(this.asistenciaEmpleados.length, "length");
                            for (let i = 0; i < this.asistenciaEmpleados.length; i++) {
                                for (let h = 0; h < this.permisos; h++) {
                        this.intere = "permiso" + h;
                                //console.log(this.asistenciaEmpleados[i].tiendasId, "this.asistenciaEmpleados[i].tiendasId");
                                //console.log(parseInt(localStorage.getItem(this.intere)), "parseInt(localStorage.getItem(this.intere))");
                                if(this.asistenciaEmpleados[i].tiendasEmpleados.length>0){

                                
                                if(this.asistenciaEmpleados[i].tiendasEmpleados[0].id===parseInt(localStorage.getItem(this.intere))){
                                let param={
                                    coordFinJornada:this.asistenciaEmpleados[i].coordFinJornada,
                                    coordInicioJornada:this.asistenciaEmpleados[i].coordInicioJornada,
                                    dia:this.asistenciaEmpleados[i].dia,
                                    empId:this.asistenciaEmpleados[i].empId,
                                    esquema:this.asistenciaEmpleados[i].esquema,
                                    formato:this.asistenciaEmpleados[i].tiendasEmpleados[0].formato,
                                    horaFinJornada:this.asistenciaEmpleados[i].horaFinJornada,
                                    horaInicioJornada:this.asistenciaEmpleados[i].horaInicioJornada,
                                    nombre:this.asistenciaEmpleados[i].nombre,
                                    puesto:this.asistenciaEmpleados[i].puesto,
                                    sucursal:this.asistenciaEmpleados[i].tiendasEmpleados[0].sucursal,
                                    urlSeguro:this.asistenciaEmpleados[i].urlSeguro
                                };
                                this.reporteAsisDef.push(param); 
                                //console.log(this.reporteAsisDef, "reporteAsisDef");

                            }}
                       
                        }

                        }}); //console.log(this.reporteAsis, "reporteAsis");
                        //console.log(puesto, "puesto");
                        if(puesto==="TEAMLIDER"){
                            let perm=0;
                    await this.asistenciaServicio.getAsistenciaPuesto(this.fech[j],"GERENTE").then(data => {
                        gerente=data.data;console.log(gerente,"GERENTE");
                       for(let i=0;i< gerente.length;i++){
                        perm=0;
                        if(gerente[i].tiendas.length>0){
                            for(let j=0;j<gerente[i].tiendas.length;j++){
                        
                        for (let h = 0; h < this.permisos; h++) {
                        this.intere = "permiso" + h;
                        if(gerente[i].tiendas[j].id===parseInt(localStorage.getItem(this.intere))){
                            perm=perm+1;
                            if(perm===1){
                                console.log(gerente[i],"SUBGERENTE[i]");
                                let sub={
                                    coordFinJornada:gerente[i].coordFinJornada,
                                    coordInicioJornada:gerente[i].coordInicioJornada,
                                    dia:gerente[i].dia,
                                    empId:gerente[i].empId,
                                    esquema:gerente[i].esquema,
                                    formato:gerente[i].formato,
                                    horaFinJornada:gerente[i].horaFinJornada,
                                    horaInicioJornada:gerente[i].horaInicioJornada,
                                    nombre:gerente[i].nombre,
                                    puesto:gerente[i].puesto,
                                    sucursal:gerente[i].sucursal,
                                    urlSeguro:gerente[i].urlSeguro

                                }
                                this.reporteAsisDef.push(sub);
                                console.log(this.reporteAsisDef,"this.reporteAsisDefPush");
                            }
                            
                        }
                        
                        
                    }
                       }

                        }
                       
                       }
                    });
                    await this.asistenciaServicio.getAsistenciaPuesto(this.fech[j],"SUBGERENTE").then(data => {
                        subGerentes=data.data;console.log(subGerentes,"SUBGERENTE");
                       for(let i=0;i< subGerentes.length;i++){
                        perm=0;
                        if(subGerentes[i].tiendas.length>0){
                            for(let j=0;j<subGerentes[i].tiendas.length;j++){
                        
                        for (let h = 0; h < this.permisos; h++) {
                        this.intere = "permiso" + h;
                        if(subGerentes[i].tiendas[j].id===parseInt(localStorage.getItem(this.intere))){
                            perm=perm+1;
                            if(perm===1){
                                console.log(subGerentes[i],"SUBGERENTE[i]");
                                let sub={
                                    coordFinJornada:subGerentes[i].coordFinJornada,
                                    coordInicioJornada:subGerentes[i].coordInicioJornada,
                                    dia:subGerentes[i].dia,
                                    empId:subGerentes[i].empId,
                                    esquema:subGerentes[i].esquema,
                                    formato:subGerentes[i].formato,
                                    horaFinJornada:subGerentes[i].horaFinJornada,
                                    horaInicioJornada:subGerentes[i].horaInicioJornada,
                                    nombre:subGerentes[i].nombre,
                                    puesto:subGerentes[i].puesto,
                                    sucursal:subGerentes[i].sucursal,
                                    urlSeguro:subGerentes[i].urlSeguro

                                }
                                this.reporteAsisDef.push(sub);
                                console.log(this.reporteAsisDef,"this.reporteAsisDefPush");
                            }
                            
                        }
                        
                        
                    }
                       }

                        }
                       
                       }
                    });
                    await this.asistenciaServicio.getAsistenciaPuesto(this.fech[j],"TORRECONTROL").then(data => {
                        torreControl=data.data;console.log(torreControl,"TORRECONTROL");
                       for(let i=0;i< torreControl.length;i++){
                        perm=0;
                        if(torreControl[i].tiendas.length>0){
                            for(let j=0;j<torreControl[i].tiendas.length;j++){
                        
                        for (let h = 0; h < this.permisos; h++) {
                        this.intere = "permiso" + h;
                        if(torreControl[i].tiendas[j].id===parseInt(localStorage.getItem(this.intere))){
                            perm=perm+1;
                            if(perm===1){
                                console.log(torreControl[i],"SUBGERENTE[i]");
                                let sub={
                                    coordFinJornada:torreControl[i].coordFinJornada,
                                    coordInicioJornada:torreControl[i].coordInicioJornada,
                                    dia:torreControl[i].dia,
                                    empId:torreControl[i].empId,
                                    esquema:torreControl[i].esquema,
                                    formato:torreControl[i].formato,
                                    horaFinJornada:torreControl[i].horaFinJornada,
                                    horaInicioJornada:torreControl[i].horaInicioJornada,
                                    nombre:torreControl[i].nombre,
                                    puesto:torreControl[i].puesto,
                                    sucursal:torreControl[i].sucursal,
                                    urlSeguro:torreControl[i].urlSeguro

                                }
                                this.reporteAsisDef.push(sub);
                                console.log(this.reporteAsisDef,"this.reporteAsisDefPush");
                            }
                            
                        }
                        
                        
                    }
                       }

                        }
                       
                       }
                    });
                    await this.asistenciaServicio.getAsistenciaPuesto(this.fech[j],"SUPERVISOR").then(data => {
                        supervisor=data.data;console.log(supervisor,"SUPERVISOR");
                       for(let i=0;i< supervisor.length;i++){
                        perm=0;
                        if(supervisor[i].tiendas.length>0){
                            for(let j=0;j<supervisor[i].tiendas.length;j++){
                        
                        for (let h = 0; h < this.permisos; h++) {
                        this.intere = "permiso" + h;
                        if(supervisor[i].tiendas[j].id===parseInt(localStorage.getItem(this.intere))){
                            perm=perm+1;
                            if(perm===1){
                                console.log(supervisor[i],"SUPERVISOR[i]");
                                let sub={
                                    coordFinJornada:supervisor[i].coordFinJornada,
                                    coordInicioJornada:supervisor[i].coordInicioJornada,
                                    dia:supervisor[i].dia,
                                    empId:supervisor[i].empId,
                                    esquema:supervisor[i].esquema,
                                    formato:supervisor[i].formato,
                                    horaFinJornada:supervisor[i].horaFinJornada,
                                    horaInicioJornada:supervisor[i].horaInicioJornada,
                                    nombre:supervisor[i].nombre,
                                    puesto:supervisor[i].puesto,
                                    sucursal:supervisor[i].sucursal,
                                    urlSeguro:supervisor[i].urlSeguro

                                }
                                this.reporteAsisDef.push(sub);
                                console.log(this.reporteAsisDef,"this.reporteAsisDefPush");
                            }
                            
                        }
                        
                        
                    }
                       }

                        }
                       
                       }
                    });
                    await this.asistenciaServicio.getAsistenciaPuesto(this.fech[j],"DISPACHER").then(data => {
                        dispacher=data.data;console.log(dispacher,"DISPACHER");
                       for(let i=0;i< dispacher.length;i++){
                        perm=0;
                        if(dispacher[i].tiendas.length>0){
                            for(let j=0;j<dispacher[i].tiendas.length;j++){
                        
                        for (let h = 0; h < this.permisos; h++) {
                        this.intere = "permiso" + h;
                        if(dispacher[i].tiendas[j].id===parseInt(localStorage.getItem(this.intere))){
                            perm=perm+1;
                            if(perm===1){
                                console.log(dispacher[i],"DISPACHER[i]");
                                let sub={
                                    coordFinJornada:dispacher[i].coordFinJornada,
                                    coordInicioJornada:dispacher[i].coordInicioJornada,
                                    dia:dispacher[i].dia,
                                    empId:dispacher[i].empId,
                                    esquema:dispacher[i].esquema,
                                    formato:dispacher[i].formato,
                                    horaFinJornada:dispacher[i].horaFinJornada,
                                    horaInicioJornada:dispacher[i].horaInicioJornada,
                                    nombre:dispacher[i].nombre,
                                    puesto:dispacher[i].puesto,
                                    sucursal:dispacher[i].sucursal,
                                    urlSeguro:dispacher[i].urlSeguro

                                }
                                this.reporteAsisDef.push(sub);
                                console.log(this.reporteAsisDef,"this.reporteAsisDefPush");
                            }
                            
                        }
                        
                        
                    }
                       }

                        }
                       
                       }
                    });
                }
                        if(puesto==="GERENTE"){
                            let perm=0;
                    await this.asistenciaServicio.getAsistenciaPuesto(this.fech[j],"SUBGERENTE").then(data => {
                        subGerentes=data.data;console.log(subGerentes,"SUBGERENTE");
                       for(let i=0;i< subGerentes.length;i++){
                        perm=0;
                        if(subGerentes[i].tiendas.length>0){
                            for(let j=0;j<subGerentes[i].tiendas.length;j++){
                        
                        for (let h = 0; h < this.permisos; h++) {
                        this.intere = "permiso" + h;
                        if(subGerentes[i].tiendas[j].id===parseInt(localStorage.getItem(this.intere))){
                            perm=perm+1;
                            if(perm===1){
                                console.log(subGerentes[i],"SUBGERENTE[i]");
                                let sub={
                                    coordFinJornada:subGerentes[i].coordFinJornada,
                                    coordInicioJornada:subGerentes[i].coordInicioJornada,
                                    dia:subGerentes[i].dia,
                                    empId:subGerentes[i].empId,
                                    esquema:subGerentes[i].esquema,
                                    formato:subGerentes[i].formato,
                                    horaFinJornada:subGerentes[i].horaFinJornada,
                                    horaInicioJornada:subGerentes[i].horaInicioJornada,
                                    nombre:subGerentes[i].nombre,
                                    puesto:subGerentes[i].puesto,
                                    sucursal:subGerentes[i].sucursal,
                                    urlSeguro:subGerentes[i].urlSeguro

                                }
                                this.reporteAsisDef.push(sub);
                                console.log(this.reporteAsisDef,"this.reporteAsisDefPush");
                            }
                            
                        }
                        
                        
                    }
                       }

                        }
                       
                       }
                    });
                    await this.asistenciaServicio.getAsistenciaPuesto(this.fech[j],"TORRECONTROL").then(data => {
                        torreControl=data.data;console.log(torreControl,"TORRECONTROL");
                       for(let i=0;i< torreControl.length;i++){
                        perm=0;
                        if(torreControl[i].tiendas.length>0){
                            for(let j=0;j<torreControl[i].tiendas.length;j++){
                        
                        for (let h = 0; h < this.permisos; h++) {
                        this.intere = "permiso" + h;
                        if(torreControl[i].tiendas[j].id===parseInt(localStorage.getItem(this.intere))){
                            perm=perm+1;
                            if(perm===1){
                                console.log(torreControl[i],"SUBGERENTE[i]");
                                let sub={
                                    coordFinJornada:torreControl[i].coordFinJornada,
                                    coordInicioJornada:torreControl[i].coordInicioJornada,
                                    dia:torreControl[i].dia,
                                    empId:torreControl[i].empId,
                                    esquema:torreControl[i].esquema,
                                    formato:torreControl[i].formato,
                                    horaFinJornada:torreControl[i].horaFinJornada,
                                    horaInicioJornada:torreControl[i].horaInicioJornada,
                                    nombre:torreControl[i].nombre,
                                    puesto:torreControl[i].puesto,
                                    sucursal:torreControl[i].sucursal,
                                    urlSeguro:torreControl[i].urlSeguro

                                }
                                this.reporteAsisDef.push(sub);
                                console.log(this.reporteAsisDef,"this.reporteAsisDefPush");
                            }
                            
                        }
                        
                        
                    }
                       }

                        }
                       
                       }
                    });
                    await this.asistenciaServicio.getAsistenciaPuesto(this.fech[j],"SUPERVISOR").then(data => {
                        supervisor=data.data;console.log(supervisor,"SUPERVISOR");
                       for(let i=0;i< supervisor.length;i++){
                        perm=0;
                        if(supervisor[i].tiendas.length>0){
                            for(let j=0;j<supervisor[i].tiendas.length;j++){
                        
                        for (let h = 0; h < this.permisos; h++) {
                        this.intere = "permiso" + h;
                        if(supervisor[i].tiendas[j].id===parseInt(localStorage.getItem(this.intere))){
                            perm=perm+1;
                            if(perm===1){
                                console.log(supervisor[i],"SUPERVISOR[i]");
                                let sub={
                                    coordFinJornada:supervisor[i].coordFinJornada,
                                    coordInicioJornada:supervisor[i].coordInicioJornada,
                                    dia:supervisor[i].dia,
                                    empId:supervisor[i].empId,
                                    esquema:supervisor[i].esquema,
                                    formato:supervisor[i].formato,
                                    horaFinJornada:supervisor[i].horaFinJornada,
                                    horaInicioJornada:supervisor[i].horaInicioJornada,
                                    nombre:supervisor[i].nombre,
                                    puesto:supervisor[i].puesto,
                                    sucursal:supervisor[i].sucursal,
                                    urlSeguro:supervisor[i].urlSeguro

                                }
                                this.reporteAsisDef.push(sub);
                                console.log(this.reporteAsisDef,"this.reporteAsisDefPush");
                            }
                            
                        }
                        
                        
                    }
                       }

                        }
                       
                       }
                    });
                    await this.asistenciaServicio.getAsistenciaPuesto(this.fech[j],"DISPACHER").then(data => {
                        dispacher=data.data;console.log(dispacher,"DISPACHER");
                       for(let i=0;i< dispacher.length;i++){
                        perm=0;
                        if(dispacher[i].tiendas.length>0){
                            for(let j=0;j<dispacher[i].tiendas.length;j++){
                        
                        for (let h = 0; h < this.permisos; h++) {
                        this.intere = "permiso" + h;
                        if(dispacher[i].tiendas[j].id===parseInt(localStorage.getItem(this.intere))){
                            perm=perm+1;
                            if(perm===1){
                                console.log(dispacher[i],"DISPACHER[i]");
                                let sub={
                                    coordFinJornada:dispacher[i].coordFinJornada,
                                    coordInicioJornada:dispacher[i].coordInicioJornada,
                                    dia:dispacher[i].dia,
                                    empId:dispacher[i].empId,
                                    esquema:dispacher[i].esquema,
                                    formato:dispacher[i].formato,
                                    horaFinJornada:dispacher[i].horaFinJornada,
                                    horaInicioJornada:dispacher[i].horaInicioJornada,
                                    nombre:dispacher[i].nombre,
                                    puesto:dispacher[i].puesto,
                                    sucursal:dispacher[i].sucursal,
                                    urlSeguro:dispacher[i].urlSeguro

                                }
                                this.reporteAsisDef.push(sub);
                                console.log(this.reporteAsisDef,"this.reporteAsisDefPush");
                            }
                            
                        }
                        
                        
                    }
                       }

                        }
                       
                       }
                    });
                }if(puesto==="SUBGERENTE" ){
                    let perm=0;
                    await this.asistenciaServicio.getAsistenciaPuesto(this.fech[j],"SUPERVISOR").then(data => {
                        supervisor=data.data;console.log(supervisor,"SUPERVISOR");
                       for(let i=0;i< supervisor.length;i++){
                        perm=0;
                        if(supervisor[i].tiendas.length>0){
                            for(let j=0;j<supervisor[i].tiendas.length;j++){
                        
                        for (let h = 0; h < this.permisos; h++) {
                        this.intere = "permiso" + h;
                        if(supervisor[i].tiendas[j].id===parseInt(localStorage.getItem(this.intere))){
                            perm=perm+1;
                            if(perm===1){
                                console.log(supervisor[i],"SUPERVISOR[i]");
                                let sub={
                                    coordFinJornada:supervisor[i].coordFinJornada,
                                    coordInicioJornada:supervisor[i].coordInicioJornada,
                                    dia:supervisor[i].dia,
                                    empId:supervisor[i].empId,
                                    esquema:supervisor[i].esquema,
                                    formato:supervisor[i].formato,
                                    horaFinJornada:supervisor[i].horaFinJornada,
                                    horaInicioJornada:supervisor[i].horaInicioJornada,
                                    nombre:supervisor[i].nombre,
                                    puesto:supervisor[i].puesto,
                                    sucursal:supervisor[i].sucursal,
                                    urlSeguro:supervisor[i].urlSeguro

                                }
                                this.reporteAsisDef.push(sub);
                                console.log(this.reporteAsisDef,"this.reporteAsisDefPush");
                            }
                            
                        }
                        
                        
                    }
                       }

                        }
                       
                       }
                    });
                    await this.asistenciaServicio.getAsistenciaPuesto(this.fech[j],"TORRECONTROL").then(data => {
                        torreControl=data.data;console.log(torreControl,"TORRECONTROL");
                       for(let i=0;i< torreControl.length;i++){
                        perm=0;
                        if(torreControl[i].tiendas.length>0){
                            for(let j=0;j<torreControl[i].tiendas.length;j++){
                        
                        for (let h = 0; h < this.permisos; h++) {
                        this.intere = "permiso" + h;
                        if(torreControl[i].tiendas[j].id===parseInt(localStorage.getItem(this.intere))){
                            perm=perm+1;
                            if(perm===1){
                                console.log(torreControl[i],"SUBGERENTE[i]");
                                let sub={
                                    coordFinJornada:torreControl[i].coordFinJornada,
                                    coordInicioJornada:torreControl[i].coordInicioJornada,
                                    dia:torreControl[i].dia,
                                    empId:torreControl[i].empId,
                                    esquema:torreControl[i].esquema,
                                    formato:torreControl[i].formato,
                                    horaFinJornada:torreControl[i].horaFinJornada,
                                    horaInicioJornada:torreControl[i].horaInicioJornada,
                                    nombre:torreControl[i].nombre,
                                    puesto:torreControl[i].puesto,
                                    sucursal:torreControl[i].sucursal,
                                    urlSeguro:torreControl[i].urlSeguro

                                }
                                this.reporteAsisDef.push(sub);
                                console.log(this.reporteAsisDef,"this.reporteAsisDefPush");
                            }
                            
                        }
                        
                        
                    }
                       }

                        }
                       
                       }
                    });
                    await this.asistenciaServicio.getAsistenciaPuesto(this.fech[j],"DISPACHER").then(data => {
                        dispacher=data.data;console.log(dispacher,"DISPACHER");
                       for(let i=0;i< dispacher.length;i++){
                        perm=0;
                        if(dispacher[i].tiendas.length>0){
                            for(let j=0;j<dispacher[i].tiendas.length;j++){
                        
                        for (let h = 0; h < this.permisos; h++) {
                        this.intere = "permiso" + h;
                        if(dispacher[i].tiendas[j].id===parseInt(localStorage.getItem(this.intere))){
                            perm=perm+1;
                            if(perm===1){
                                console.log(dispacher[i],"DISPACHER[i]");
                                let sub={
                                    coordFinJornada:dispacher[i].coordFinJornada,
                                    coordInicioJornada:dispacher[i].coordInicioJornada,
                                    dia:dispacher[i].dia,
                                    empId:dispacher[i].empId,
                                    esquema:dispacher[i].esquema,
                                    formato:dispacher[i].formato,
                                    horaFinJornada:dispacher[i].horaFinJornada,
                                    horaInicioJornada:dispacher[i].horaInicioJornada,
                                    nombre:dispacher[i].nombre,
                                    puesto:dispacher[i].puesto,
                                    sucursal:dispacher[i].sucursal,
                                    urlSeguro:dispacher[i].urlSeguro

                                }
                                this.reporteAsisDef.push(sub);
                                console.log(this.reporteAsisDef,"this.reporteAsisDefPush");
                            }
                            
                        }
                        
                        
                    }
                       }

                        }
                       
                       }
                    });
                }if(puesto==="TORRECONTROL"){
                    let perm=0;
                    await this.asistenciaServicio.getAsistenciaPuesto(this.fech[j],"SUPERVISOR").then(data => {
                        supervisor=data.data;console.log(supervisor,"SUPERVISOR");
                       for(let i=0;i< supervisor.length;i++){
                        perm=0;
                        if(supervisor[i].tiendas.length>0){
                            for(let j=0;j<supervisor[i].tiendas.length;j++){
                        
                        for (let h = 0; h < this.permisos; h++) {
                        this.intere = "permiso" + h;
                        if(supervisor[i].tiendas[j].id===parseInt(localStorage.getItem(this.intere))){
                            perm=perm+1;
                            if(perm===1){
                                console.log(supervisor[i],"SUPERVISOR[i]");
                                let sub={
                                    coordFinJornada:supervisor[i].coordFinJornada,
                                    coordInicioJornada:supervisor[i].coordInicioJornada,
                                    dia:supervisor[i].dia,
                                    empId:supervisor[i].empId,
                                    esquema:supervisor[i].esquema,
                                    formato:supervisor[i].formato,
                                    horaFinJornada:supervisor[i].horaFinJornada,
                                    horaInicioJornada:supervisor[i].horaInicioJornada,
                                    nombre:supervisor[i].nombre,
                                    puesto:supervisor[i].puesto,
                                    sucursal:supervisor[i].sucursal,
                                    urlSeguro:supervisor[i].urlSeguro

                                }
                                this.reporteAsisDef.push(sub);
                                console.log(this.reporteAsisDef,"this.reporteAsisDefPush");
                            }
                            
                        }
                        
                        
                    }
                       }

                        }
                       
                       }
                    });
                    await this.asistenciaServicio.getAsistenciaPuesto(this.fech[j],"DISPACHER").then(data => {
                        dispacher=data.data;console.log(dispacher,"DISPACHER");
                       for(let i=0;i< dispacher.length;i++){
                        perm=0;
                        if(dispacher[i].tiendas.length>0){
                            for(let j=0;j<dispacher[i].tiendas.length;j++){
                        
                        for (let h = 0; h < this.permisos; h++) {
                        this.intere = "permiso" + h;
                        if(dispacher[i].tiendas[j].id===parseInt(localStorage.getItem(this.intere))){
                            perm=perm+1;
                            if(perm===1){
                                console.log(dispacher[i],"DISPACHER[i]");
                                let sub={
                                    coordFinJornada:dispacher[i].coordFinJornada,
                                    coordInicioJornada:dispacher[i].coordInicioJornada,
                                    dia:dispacher[i].dia,
                                    empId:dispacher[i].empId,
                                    esquema:dispacher[i].esquema,
                                    formato:dispacher[i].formato,
                                    horaFinJornada:dispacher[i].horaFinJornada,
                                    horaInicioJornada:dispacher[i].horaInicioJornada,
                                    nombre:dispacher[i].nombre,
                                    puesto:dispacher[i].puesto,
                                    sucursal:dispacher[i].sucursal,
                                    urlSeguro:dispacher[i].urlSeguro

                                }
                                this.reporteAsisDef.push(sub);
                                console.log(this.reporteAsisDef,"this.reporteAsisDefPush");
                            }
                            
                        }
                        
                        
                    }
                       }

                        }
                       
                       }
                    });
                }
                    }
                
                
            }

            console.log(this.reporteAsisDef, "reporteAsisDefdd");

            if (rh === 'PROVEEDOR') {
                for (let j = 0; j < this.fech.length; j++) {
                    await this.asistenciaServicio.getAsistenciaFecha(this.fech[j]).then(data => {
                        this.asistenciaEmpleados = data.data; this.loading = true;
                        cuenta = cuenta + 1;
                        console.log(this.asistenciaEmpleados, "this.asistenciaEmpleados");
                        
                        for (let i = 0; i < this.asistenciaEmpleados.length; i++) {
                            if (this.asistenciaEmpleados[i].esquema === "RENTATOTAL") {
                                if(this.asistenciaEmpleados[i].tiendasEmpleados.length>0){
                                    console.log(this.asistenciaEmpleados[i].tiendasEmpleados, "this.asistenciaEmpleados[i].tiendasEmpleados");
                                a = a + 1;
                                this.reporteAsisDef[a] = {
                                    urlSeguro: this.asistenciaEmpleados[i].urlSeguro,
                                    empId: this.asistenciaEmpleados[i].empId,
                                    nombre: this.asistenciaEmpleados[i].nombre,
                                    puesto: this.asistenciaEmpleados[i].puesto,
                                    esquema: this.asistenciaEmpleados[i].esquema,
                                    formato:this.asistenciaEmpleados[i].tiendasEmpleados[0].formato,
                                    sucursal: this.asistenciaEmpleados[i].tiendasEmpleados[0].sucursal,
                                    dia: this.asistenciaEmpleados[i].dia,
                                    coordInicioJornada: this.asistenciaEmpleados[i].coordInicioJornada,
                                    horaInicioJornada: this.asistenciaEmpleados[i].horaInicioJornada,
                                    coordFinJornada: this.asistenciaEmpleados[i].coordFinJornada,
                                    horaFinJornada: this.asistenciaEmpleados[i].horaFinJornada

                                }
                                }else{
                                    a = a + 1;
                                this.reporteAsisDef[a] = {
                                    urlSeguro: this.asistenciaEmpleados[i].urlSeguro,
                                    empId: this.asistenciaEmpleados[i].empId,
                                    nombre: this.asistenciaEmpleados[i].nombre,
                                    puesto: this.asistenciaEmpleados[i].puesto,
                                    esquema: this.asistenciaEmpleados[i].esquema,
                                    formato:"",
                                    sucursal: "",
                                    dia: this.asistenciaEmpleados[i].dia,
                                    coordInicioJornada: this.asistenciaEmpleados[i].coordInicioJornada,
                                    horaInicioJornada: this.asistenciaEmpleados[i].horaInicioJornada,
                                    coordFinJornada: this.asistenciaEmpleados[i].coordFinJornada,
                                    horaFinJornada: this.asistenciaEmpleados[i].horaFinJornada

                                }
                                }
                               
                            }


                        }

                    }); //console.log(this.reporteAsis, "reporteAsis");

                }

                //console.log(this.reporteAsisDef,"proveedor");

            }

            if (rh === 'RH') {
                for (let j = 0; j < this.fech.length; j++) {
                    await this.asistenciaServicio.getAsistenciaFecha(this.fech[j]).then(data => {
                        this.asistenciaEmpleados = data.data; this.loading = true;
                        cuenta = cuenta + 1;
                        console.log(this.asistenciaEmpleados, "this.asistenciaEmpleados");
                        
                        for (let i = 0; i < this.asistenciaEmpleados.length; i++) {
                            
                            if(this.asistenciaEmpleados[i].tiendasEmpleados.length>0){
                                console.log(this.asistenciaEmpleados[i].tiendasEmpleados.length, "this.asistenciaEmpleados[i].tiendasEmpleados.length");
                                a = a + 1;
                            this.reporteAsisDef[a] = {
                                urlSeguro: this.asistenciaEmpleados[i].urlSeguro,
                                empId: this.asistenciaEmpleados[i].empId,
                                nombre: this.asistenciaEmpleados[i].nombre,
                                puesto: this.asistenciaEmpleados[i].puesto,
                                esquema: this.asistenciaEmpleados[i].esquema,
                                formato:this.asistenciaEmpleados[i].tiendasEmpleados[0].formato,
                                sucursal: this.asistenciaEmpleados[i].tiendasEmpleados[0].sucursal,
                                dia: this.asistenciaEmpleados[i].dia,
                                coordInicioJornada: this.asistenciaEmpleados[i].coordInicioJornada,
                                horaInicioJornada: this.asistenciaEmpleados[i].horaInicioJornada,
                                coordFinJornada: this.asistenciaEmpleados[i].coordFinJornada,
                                horaFinJornada: this.asistenciaEmpleados[i].horaFinJornada

                            }
                            }else{
                                a = a + 1;
                            this.reporteAsisDef[a] = {
                                urlSeguro: this.asistenciaEmpleados[i].urlSeguro,
                                empId: this.asistenciaEmpleados[i].empId,
                                nombre: this.asistenciaEmpleados[i].nombre,
                                puesto: this.asistenciaEmpleados[i].puesto,
                                esquema: this.asistenciaEmpleados[i].esquema,
                                formato:"",
                                sucursal:"",
                                dia: this.asistenciaEmpleados[i].dia,
                                coordInicioJornada: this.asistenciaEmpleados[i].coordInicioJornada,
                                horaInicioJornada: this.asistenciaEmpleados[i].horaInicioJornada,
                                coordFinJornada: this.asistenciaEmpleados[i].coordFinJornada,
                                horaFinJornada: this.asistenciaEmpleados[i].horaFinJornada

                            } 
                            }
                           

                        }

                    }); //console.log(this.reporteAsis, "reporteAsis");

                }
                
            }

            this.loading = false;
            //this.fechaIn=this.fechaInicio.getDate()+'-'+(this.fechaInicio.getMonth()+1)+'-'+this.fechaInicio.getFullYear();
            //this.fechaF=this.fechaFin.getDate()+'-'+(this.fechaFin.getMonth()+1)+'-'+this.fechaFin.getFullYear();

            //this.fechaIn=this.fechaInicio.getDate()+k+'-'+(this.fechaInicio.getMonth()+1)+'-'+this.fechaInicio.getFullYear();

            this.fechaInicio.setDate(this.fechaInicio.getDate() - this.fech.length + 1);
            

            this.pintarTabla();
        },
        pintarTabla() {
            let o = -1;
            this.reporteSemanal = [];
            if (this.fech.length === 7) {

                // console.log("rango correcto");
                for (let i = 0; i < this.reporteAsisDef.length; i++) {
                    //console.log(this.reporteAsisDef[i].dia,"fecha");
                    if (this.reporteAsisDef[i].dia === this.fech[0]) {
                        o = o + 1;
                        this.reporteSemanal[o] = {
                            urlSeguroUno: this.reporteAsisDef[i].urlSeguro,
                            empId: this.reporteAsisDef[i].empId,
                            nombre: this.reporteAsisDef[i].nombre,
                            puesto: this.reporteAsisDef[i].puesto,
                            servicio: null,
                            formato: this.reporteAsisDef[i].formato,
                            sucursal: this.reporteAsisDef[i].sucursal,
                            diaUno: this.reporteAsisDef[i].dia,
                            horaEntradaUno: this.reporteAsisDef[i].horaInicioJornada,
                            coordInicioJornadaUno: this.reporteAsisDef[i].coordInicioJornada,
                            horaSalidaUno: this.reporteAsisDef[i].horaFinJornada,
                            coordFinJornadaUno: this.reporteAsisDef[i].coordFinJornada,
                            viajesUno: null,
                            pedidosUno: null,

                        }
                        //console.log(this.reporteSemanal[o], "reporteSemanal");
                    }
                    if (this.reporteAsisDef[i].dia === this.fech[1]) {
                        o = o + 1;
                        this.reporteSemanal[o] = {
                            urlSeguroDos: this.reporteAsisDef[i].urlSeguro,
                            empId: this.reporteAsisDef[i].empId,
                            nombre: this.reporteAsisDef[i].nombre,
                            puesto: this.reporteAsisDef[i].puesto,
                            servicio: null,
                            formato: this.reporteAsisDef[i].formato,
                            sucursal: this.reporteAsisDef[i].sucursal,
                            diaDos: this.reporteAsisDef[i].dia,
                            horaEntradaDos: this.reporteAsisDef[i].horaInicioJornada,
                            horaSalidaDos: this.reporteAsisDef[i].horaFinJornada,
                            coordInicioJornadaDos: this.reporteAsisDef[i].coordInicioJornada,
                            coordFinJornadaDos: this.reporteAsisDef[i].coordFinJornada,
                            viajesDos: null,
                            pedidosDos: null,

                        }


                    }
                    if (this.reporteAsisDef[i].dia === this.fech[2]) {
                        o = o + 1;
                        this.reporteSemanal[o] = {
                            urlSeguroTres: this.reporteAsisDef[i].urlSeguro,
                            empId: this.reporteAsisDef[i].empId,
                            nombre: this.reporteAsisDef[i].nombre,
                            puesto: this.reporteAsisDef[i].puesto,
                            servicio: null,
                            formato: this.reporteAsisDef[i].formato,
                            sucursal: this.reporteAsisDef[i].sucursal,
                            diaTres: this.reporteAsisDef[i].dia,
                            horaEntradaTres: this.reporteAsisDef[i].horaInicioJornada,
                            horaSalidaTres: this.reporteAsisDef[i].horaFinJornada,
                            coordInicioJornadaTres: this.reporteAsisDef[i].coordInicioJornada,
                            coordFinJornadaTres: this.reporteAsisDef[i].coordFinJornada,
                            viajesTres: null,
                            pedidosTres: null,

                        }


                    }
                    if (this.reporteAsisDef[i].dia === this.fech[3]) {
                        o = o + 1;
                        //console.log(this.reporteAsisDef[i].dia,"this.reporteAsisDef[i].dia");
                        this.reporteSemanal[o] = {
                            urlSeguroCuatro: this.reporteAsisDef[i].urlSeguro,
                            empId: this.reporteAsisDef[i].empId,
                            nombre: this.reporteAsisDef[i].nombre,
                            puesto: this.reporteAsisDef[i].puesto,
                            servicio: null,
                            formato: this.reporteAsisDef[i].formato,
                            sucursal: this.reporteAsisDef[i].sucursal,
                            diaCuatro: this.reporteAsisDef[i].dia,
                            horaEntradaCuatro: this.reporteAsisDef[i].horaInicioJornada,
                            horaSalidaCuatro: this.reporteAsisDef[i].horaFinJornada,
                            coordInicioJornadaCuatro: this.reporteAsisDef[i].coordInicioJornada,
                            coordFinJornadaCuatro: this.reporteAsisDef[i].coordFinJornada,
                            viajesCuatro: null,
                            pedidosCuatro: null,

                        }


                    }
                    if (this.reporteAsisDef[i].dia === this.fech[4]) {
                        o = o + 1;
                        this.reporteSemanal[o] = {
                            urlSeguroCinco: this.reporteAsisDef[i].urlSeguro,
                            empId: this.reporteAsisDef[i].empId,
                            nombre: this.reporteAsisDef[i].nombre,
                            puesto: this.reporteAsisDef[i].puesto,
                            servicio: null,
                            formato: this.reporteAsisDef[i].formato,
                            sucursal: this.reporteAsisDef[i].sucursal,
                            diaCinco: this.reporteAsisDef[i].dia,
                            horaEntradaCinco: this.reporteAsisDef[i].horaInicioJornada,
                            horaSalidaCinco: this.reporteAsisDef[i].horaFinJornada,
                            coordInicioJornadaCinco: this.reporteAsisDef[i].coordInicioJornada,
                            coordFinJornadaCinco: this.reporteAsisDef[i].coordFinJornada,
                            viajesCinco: null,
                            pedidosCinco: null,

                        }
                        // console.log(this.reporteSemanal[o],'4')

                    }
                    if (this.reporteAsisDef[i].dia === this.fech[5]) {
                        o = o + 1;
                        this.reporteSemanal[o] = {
                            urlSeguroSeis: this.reporteAsisDef[i].urlSeguro,
                            empId: this.reporteAsisDef[i].empId,
                            nombre: this.reporteAsisDef[i].nombre,
                            puesto: this.reporteAsisDef[i].puesto,
                            servicio: null,
                            formato: this.reporteAsisDef[i].formato,
                            sucursal: this.reporteAsisDef[i].sucursal,
                            diaSeis: this.reporteAsisDef[i].dia,
                            horaEntradaSeis: this.reporteAsisDef[i].horaInicioJornada,
                            horaSalidaSeis: this.reporteAsisDef[i].horaFinJornada,
                            coordInicioJornadaSeis: this.reporteAsisDef[i].coordInicioJornada,
                            coordFinJornadaSeis: this.reporteAsisDef[i].coordFinJornada,
                            viajesSeis: null,
                            pedidosSeis: null,

                        }
                        // console.log(this.reporteSemanal[o],'5')

                    }
                    if (this.reporteAsisDef[i].dia === this.fech[6]) {
                        o = o + 1;
                        this.reporteSemanal[o] = {
                            urlSeguroSiete: this.reporteAsisDef[i].urlSeguro,
                            empId: this.reporteAsisDef[i].empId,
                            nombre: this.reporteAsisDef[i].nombre,
                            puesto: this.reporteAsisDef[i].puesto,
                            servicio: null,
                            formato: this.reporteAsisDef[i].formato,
                            sucursal: this.reporteAsisDef[i].sucursal,
                            diaSiete: this.reporteAsisDef[i].dia,
                            horaEntradaSiete: this.reporteAsisDef[i].horaInicioJornada,
                            horaSalidaSiete: this.reporteAsisDef[i].horaFinJornada,
                            coordInicioJornadaSiete: this.reporteAsisDef[i].coordInicioJornada,
                            coordFinJornadaSiete: this.reporteAsisDef[i].coordFinJornada,
                            viajesSiete: null,
                            pedidosSiete: null,

                        }


                    }
                } for (let y = 0; y < this.reporteSemanal.length; y++) {

                    this.empIds[y] = this.reporteSemanal[y].empId;

                }
                //console.log(this.empIds);
                const dataArr = new Set(this.empIds);

                let result = [...dataArr];
                //let uno,dos,tres,cuatro,cinco,seis,siete=-1;
                let uno = -1;
                this.reporteSemanalDef = [];
                //console.log(result.length,"repetidos");
                //console.log(this.reporteSemanal,"aqui");
                for (let g = 0; g < result.length; g++) {
                    this.reporteSemanalDef[g] = {
                        empId: result[g]
                    };
                    for (let k = 0; k < this.reporteSemanal.length; k++) {
                        if (result[g] === this.reporteSemanal[k].empId) {
                            //uno,dos=-1

                            if (this.reporteSemanal[k].diaUno === this.fech[0]) {
                                uno = uno + 1;
                                this.reporteSemanalDef[g].urlSeguroUno = this.reporteSemanal[k].urlSeguroUno;
                                this.reporteSemanalDef[g].empId = this.reporteSemanal[k].empId;
                                this.reporteSemanalDef[g].nombre = this.reporteSemanal[k].nombre;
                                this.reporteSemanalDef[g].puesto = this.reporteSemanal[k].puesto;
                                this.reporteSemanalDef[g].formato = this.reporteSemanal[k].formato;
                                this.reporteSemanalDef[g].sucursal = this.reporteSemanal[k].sucursal;
                                this.reporteSemanalDef[g].diaUno = this.fech[0];
                                this.reporteSemanalDef[g].coordInicioJornadaUno = this.reporteSemanal[k].coordInicioJornadaUno,
                                this.reporteSemanalDef[g].coordFinJornadaUno = this.reporteSemanal[k].coordFinJornadaUno,
                                this.reporteSemanalDef[g].horaEntradaUno = this.reporteSemanal[k].horaEntradaUno;
                                this.reporteSemanalDef[g].horaSalidaUno = this.reporteSemanal[k].horaSalidaUno;
                            } if (this.reporteSemanal[k].diaDos === this.fech[1]) {
                                this.reporteSemanalDef[g].urlSeguroDos = this.reporteSemanal[k].urlSeguroDos;
                                this.reporteSemanalDef[g].empId = this.reporteSemanal[k].empId;
                                this.reporteSemanalDef[g].nombre = this.reporteSemanal[k].nombre;
                                this.reporteSemanalDef[g].puesto = this.reporteSemanal[k].puesto;
                                this.reporteSemanalDef[g].formato = this.reporteSemanal[k].formato;
                                this.reporteSemanalDef[g].sucursal = this.reporteSemanal[k].sucursal;
                                this.reporteSemanalDef[g].diaDos = this.fech[1];
                                this.reporteSemanalDef[g].coordInicioJornadaDos = this.reporteSemanal[k].coordInicioJornadaDos,
                                this.reporteSemanalDef[g].coordFinJornadaDos = this.reporteSemanal[k].coordFinJornadaDos,
                                this.reporteSemanalDef[g].horaEntradaDos = this.reporteSemanal[k].horaEntradaDos;
                                this.reporteSemanalDef[g].horaSalidaDos = this.reporteSemanal[k].horaSalidaDos;
                            } if (this.reporteSemanal[k].diaTres === this.fech[2]) {
                                this.reporteSemanalDef[g].urlSeguroTres = this.reporteSemanal[k].urlSeguroTres;
                                this.reporteSemanalDef[g].empId = this.reporteSemanal[k].empId;
                                this.reporteSemanalDef[g].nombre = this.reporteSemanal[k].nombre;
                                this.reporteSemanalDef[g].puesto = this.reporteSemanal[k].puesto;
                                this.reporteSemanalDef[g].formato = this.reporteSemanal[k].formato;
                                this.reporteSemanalDef[g].sucursal = this.reporteSemanal[k].sucursal;
                                this.reporteSemanalDef[g].diaTres = this.fech[2];
                                this.reporteSemanalDef[g].coordInicioJornadaTres = this.reporteSemanal[k].coordInicioJornadaTres,
                                this.reporteSemanalDef[g].coordFinJornadaTres = this.reporteSemanal[k].coordFinJornadaTres,
                                this.reporteSemanalDef[g].horaEntradaTres = this.reporteSemanal[k].horaEntradaTres;
                                this.reporteSemanalDef[g].horaSalidaTres = this.reporteSemanal[k].horaSalidaTres;
                            } if (this.reporteSemanal[k].diaCuatro === this.fech[3]) {
                                this.reporteSemanalDef[g].urlSeguroCuatro = this.reporteSemanal[k].urlSeguroCuatro;
                                this.reporteSemanalDef[g].empId = this.reporteSemanal[k].empId;
                                this.reporteSemanalDef[g].nombre = this.reporteSemanal[k].nombre;
                                this.reporteSemanalDef[g].puesto = this.reporteSemanal[k].puesto;
                                this.reporteSemanalDef[g].formato = this.reporteSemanal[k].formato;
                                this.reporteSemanalDef[g].sucursal = this.reporteSemanal[k].sucursal;
                                this.reporteSemanalDef[g].diaCuatro = this.fech[3];
                                this.reporteSemanalDef[g].coordInicioJornadaCuatro = this.reporteSemanal[k].coordInicioJornadaCuatro,
                                this.reporteSemanalDef[g].coordFinJornadaCuatro = this.reporteSemanal[k].coordFinJornadaCuatro,
                                this.reporteSemanalDef[g].horaEntradaCuatro = this.reporteSemanal[k].horaEntradaCuatro;
                                this.reporteSemanalDef[g].horaSalidaCuatro = this.reporteSemanal[k].horaSalidaCuatro;
                            } if (this.reporteSemanal[k].diaCinco === this.fech[4]) {
                                this.reporteSemanalDef[g].urlSeguroCinco = this.reporteSemanal[k].urlSeguroCinco;
                                this.reporteSemanalDef[g].empId = this.reporteSemanal[k].empId;
                                this.reporteSemanalDef[g].nombre = this.reporteSemanal[k].nombre;
                                this.reporteSemanalDef[g].puesto = this.reporteSemanal[k].puesto;
                                this.reporteSemanalDef[g].formato = this.reporteSemanal[k].formato;
                                this.reporteSemanalDef[g].sucursal = this.reporteSemanal[k].sucursal;
                                this.reporteSemanalDef[g].diaCinco = this.fech[4];
                                this.reporteSemanalDef[g].coordInicioJornadaCinco = this.reporteSemanal[k].coordInicioJornadaCinco,
                                this.reporteSemanalDef[g].coordFinJornadaCinco = this.reporteSemanal[k].coordFinJornadaCinco,
                                this.reporteSemanalDef[g].horaEntradaCinco = this.reporteSemanal[k].horaEntradaCinco;
                                this.reporteSemanalDef[g].horaSalidaCinco = this.reporteSemanal[k].horaSalidaCinco;
                            } if (this.reporteSemanal[k].diaSeis === this.fech[5]) {
                                this.reporteSemanalDef[g].urlSeguroSeis = this.reporteSemanal[k].urlSeguroSeis;
                                this.reporteSemanalDef[g].empId = this.reporteSemanal[k].empId;
                                this.reporteSemanalDef[g].nombre = this.reporteSemanal[k].nombre;
                                this.reporteSemanalDef[g].puesto = this.reporteSemanal[k].puesto;
                                this.reporteSemanalDef[g].formato = this.reporteSemanal[k].formato;
                                this.reporteSemanalDef[g].sucursal = this.reporteSemanal[k].sucursal;
                                this.reporteSemanalDef[g].diaSeis = this.fech[5];
                                this.reporteSemanalDef[g].coordInicioJornadaSeis = this.reporteSemanal[k].coordInicioJornadaSeis,
                                this.reporteSemanalDef[g].coordFinJornadaSeis = this.reporteSemanal[k].coordFinJornadaSeis,
                                this.reporteSemanalDef[g].horaEntradaSeis = this.reporteSemanal[k].horaEntradaSeis;
                                this.reporteSemanalDef[g].horaSalidaSeis = this.reporteSemanal[k].horaSalidaSeis;
                            } if (this.reporteSemanal[k].diaSiete === this.fech[6]) {
                                this.reporteSemanalDef[g].urlSeguroSiete = this.reporteSemanal[k].urlSeguroSiete;
                                this.reporteSemanalDef[g].empId = this.reporteSemanal[k].empId;
                                this.reporteSemanalDef[g].nombre = this.reporteSemanal[k].nombre;
                                this.reporteSemanalDef[g].puesto = this.reporteSemanal[k].puesto;
                                this.reporteSemanalDef[g].formato = this.reporteSemanal[k].formato;
                                this.reporteSemanalDef[g].sucursal = this.reporteSemanal[k].sucursal;
                                this.reporteSemanalDef[g].diaSiete = this.fech[6];
                                this.reporteSemanalDef[g].coordInicioJornadaSiete = this.reporteSemanal[k].coordInicioJornadaSiete,
                                this.reporteSemanalDef[g].coordFinJornadaSiete = this.reporteSemanal[k].coordFinJornadaSiete,
                                this.reporteSemanalDef[g].horaEntradaSiete = this.reporteSemanal[k].horaEntradaSiete;
                                this.reporteSemanalDef[g].horaSalidaSiete = this.reporteSemanal[k].horaSalidaSiete;
                            }

                        }




                    }

                }

                //console.log(this.reporteSemanalDef,'ya weee');


            } else {
                console.log("error");
            }

        },
        pintarTablaRelacionDia() {
            let h = -1;

            for (let a = 0; a < this.empleados.length; a++) {
                for (let i = 0; i < this.asistencianov.length; i++) {
                    if (this.empleados[a].empId === this.asistencianov[i].empId && this.asistencianov[i].dia === '8-11-2021') {
                        h = h + 1;
                        this.relacionDia[h] = {
                            nombre: this.empleados[a].nombre,
                            Lunes08: this.asistencianov[i].estatusActual,
                        }
                    }
                    if (this.empleados[a].empId === this.asistencianov[i].empId && this.asistencianov[i].dia === '9-11-2021') {
                        this.relacionDia[h].Martes09 = this.asistencianov[i].estatusActual;
                    }
                    if (this.empleados[a].empId === this.asistencianov[i].empId && this.asistencianov[i].dia === '10-11-2021') {
                        this.relacionDia[h].Miercoles10 = this.asistencianov[i].estatusActual;
                    }
                    if (this.empleados[a].empId === this.asistencianov[i].empId && this.asistencianov[i].dia === '11-11-2021') {
                        this.relacionDia[h].Jueves11 = this.asistencianov[i].estatusActual;
                    }
                    if (this.empleados[a].empId === this.asistencianov[i].empId && this.asistencianov[i].dia === '12-11-2021') {
                        this.relacionDia[h].Viernes12 = this.asistencianov[i].estatusActual;
                    }
                    if (this.empleados[a].empId === this.asistencianov[i].empId && this.asistencianov[i].dia === '13-11-2021') {
                        this.relacionDia[h].Sabado13 = this.asistencianov[i].estatusActual;
                    }
                    if (this.empleados[a].empId === this.asistencianov[i].empId && this.asistencianov[i].dia === '14-11-2021') {
                        this.relacionDia[h].Domingo14 = this.asistencianov[i].estatusActual;
                    }
                    if (this.empleados[a].empId === this.asistencianov[i].empId && this.asistencianov[i].dia === '14-11-2021') {
                        this.relacionDia[h].Lunes15 = this.asistencianov[i].estatusActual;
                    }
                    if (this.empleados[a].empId === this.asistencianov[i].empId && this.asistencianov[i].dia === '16-11-2021') {
                        this.relacionDia[h].Martes16 = this.asistencianov[i].estatusActual;
                    }
                    if (this.empleados[a].empId === this.asistencianov[i].empId && this.asistencianov[i].dia === '17-11-2021') {
                        this.relacionDia[h].Miercoles17 = this.asistencianov[i].estatusActual;
                    }
                    if (this.empleados[a].empId === this.asistencianov[i].empId && this.asistencianov[i].dia === '18-11-2021') {
                        this.relacionDia[h].Jueves18 = this.asistencianov[i].estatusActual;
                    }
                    if (this.empleados[a].empId === this.asistencianov[i].empId && this.asistencianov[i].dia === '19-11-2021') {
                        this.relacionDia[h].Vienres19 = this.asistencianov[i].estatusActual;
                    }
                    if (this.empleados[a].empId === this.asistencianov[i].empId && this.asistencianov[i].dia === '20-11-2021') {
                        this.relacionDia[h].Sabado20 = this.asistencianov[i].estatusActual;
                    }
                    if (this.empleados[a].empId === this.asistencianov[i].empId && this.asistencianov[i].dia === '21-11-2021') {
                        this.relacionDia[h].Domingo21 = this.asistencianov[i].estatusActual;
                    }
                    if (this.empleados[a].empId === this.asistencianov[i].empId && this.asistencianov[i].dia === '22-11-2021') {
                        this.relacionDia[h].Lunes22 = this.asistencianov[i].estatusActual;
                    }
                }
            }


            /*for(let a=0; a<this.empleados.length;a++){
                for(let i=0; i<this.empleadoInfoAdicional.length;i++){
                    if(this.empleados[a].empId===this.empleadoInfoAdicional[i].empId){
                        f=f+1;
        this.relacionDia[f]={
                    nombre:this.empleados[a].nombre,
                }
                    }
                    
        
                }
                
            }
        
            for(let h; h<this.relacionDia.length;h++){
                for(let k;k<this.asistencianov.length;k++){
                    if(this.relacionDia[h].nombre===this.asistencianov[k].nombre && this.asistencianov[k].dia==='8-11-2021'){
                        this.relacionDia[h]={
                            Lunes08:this.asistencianov[k].estatusActual
                        }
                    }else if(this.relacionDia[h].nombre===this.asistencianov[k].nombre && this.asistencianov[k].dia==='9-11-2021'){
                        this.relacionDia[h]={
                            Martes09:this.asistencianov[k].estatusActual
                        }
                    }
                }
            }*/


            //console.log(this.relacionDia,'relacionDia');
            //console.log(this.relacionDia,'relacionDia');
        },
        contar() {
            let camionetas = -1;
            let sedan = -1;
            for (let f = 0; f < this.reporteAsistencia.length; f++) {
                //console.log('datos');
                if (this.reporteAsistencia[f].unidad != null) {
                    camionetas = camionetas + 1;
                } else {
                    sedan = sedan + 1;
                }

            }
            // console.log(camionetas,'camionetas');
            //console.log(sedan,'sedan');
        }
    }

})
</script>
<style scoped>
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
    color: #008cff;

}

.SINCARGAR {
    font-weight: 700;
    color: #ff0000;
}

.CARGANDO {
    font-weight: 700;
    color: #ff7b00;
}

.ENRUTA {
    font-weight: 700;
    color: #6d0064;
}

.ENTREGADO {
    font-weight: 700;
    color: #58af54;
}

.COBRO {
    font-weight: 700;
    color: #009e15;
}

.FINALIZO {
    font-weight: 700;
    color: #009e15;
}

@media (max-width: 1902px) {
    .tam-tab {
        width: 900px
    }
}

.product-image {
    width: 200px;
    height: 200px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}
</style>
