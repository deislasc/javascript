<template>
<Toast />
  <!--Ventana Seleccionar Tienda-->
  <Dialog
    v-model:visible="openTiendas"
    :style="{ width: '980px' }"
    header="SELECCIONA UNA TIENDA"
    class="p-fluid"
    :modal="true"
  >
    
  </Dialog>

  <div>
    <Dialog
    v-model:visible="opentienda"
    :style="{ width: '980px' }" 
    header="AGREGAR TIENDA"
    :maximizable="true" 
    :modal="true"
  >
    <div class="p-field">
      <br />
      <div class="p-fluid p-grid">
     

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputText id="zona" type="text" v-model="tienda.zona" />
              <label for="zona">Zona</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
             
<AutoComplete
              v-model="tienda.estado"
              dropdown
              :suggestions="itemsEstados"
              @complete="searchEstado"
              placeholder="Estado"
              forceSelection
            />

            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputText id="subZona" type="text" v-model="tienda.subZona" />
              <label for="subZona">Subzona</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <AutoComplete
              v-model="tienda.ciudad"
              dropdown
              :suggestions="itemsCiudades"
              @complete="searchCiudad"
              placeholder="Ciudad"
              forceSelection
            />
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputNumber  id="clienteId"  v-model="tienda.clienteIc" mode="decimal" showButtons :min="0" :max="1000000" />
              <label for="clienteId">Cliente ID</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <AutoComplete
              v-model="tienda.nombreCliente"
              dropdown
              :suggestions="itemsClientes"
              @complete="searchCliente"
              placeholder="Cliente"
              forceSelection
            />
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <AutoComplete
              v-model="tienda.proyecto"
              dropdown
              :suggestions="itemsProyectos"
              @complete="searchProyecto"
              placeholder="Proyecto"
              forceSelection
            />
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <AutoComplete
              v-model="tienda.formato"
              dropdown
              :suggestions="itemsFormatos"
              @complete="searchFormato"
              placeholder="Formato"
              forceSelection
            />
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputText id="nomenclatura" type="text" v-model="tienda.nomenclatura" />
              <label for="nomenclatura">Nomenclatura</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputText id="sucursal" type="text" v-model="tienda.sucursal" />
              <label for="sucursal">Sucursal</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <Dropdown v-model="tTipo" :options="tiendaTipo" optionLabel="label" placeholder="Tipo Tienda" class="w-full md:w-14rem" />
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputText id="determinante" type="text" v-model="tienda.determinante" />
              <label for="determinante">Determinante</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputText id="direccion" type="text" v-model="tienda.direccion" />
              <label for="direccion">Direccion</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputText id="coordenadas" type="text" v-model="tienda.coordenadas" />
              <label for="coordenadas">Coordenadas</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputNumber id="unidadesFijas"  v-model="tienda.unidadesFijas"  mode="decimal" showButtons :min="0" :max="100"/>
              <label for="unidadesFijas">Unidades Fijas</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputNumber id="recolectores" v-model="tienda.recolectores" mode="decimal" showButtons :min="0" :max="100" />
              <label for="recolectores">Recolectores</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputNumber id="aduanales"  v-model="tienda.aduanales" mode="decimal" showButtons :min="0" :max="100"/>
              <label for="aduanales">Aduanales</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputNumber id="shoppers" v-model="tienda.shoppers" mode="decimal" showButtons :min="0" :max="100" />
              <label for="shoppers">Shoppers</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputNumber id="unidad_spot"  v-model="tienda.unidad_spot" mode="decimal" showButtons :min="0" :max="100"/>
              <label for="unidad_spot">Unidades Spot</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              
              <Dropdown v-model="tStatus" :options="tiendaStatus" optionLabel="label" placeholder="Status" class="w-full md:w-14rem" />

            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputText id="correoGer" type="text" v-model="tienda.correoGer" />
              <label for="correoGer">Correo Gerente</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputText id="correoSub" type="text" v-model="tienda.correoSub" />
              <label for="correoSub">Correo Subgerente</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputText id="gerente" type="text" v-model="tienda.gerente" />
              <label for="gerente">Gerente</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputText id="subgerente" type="text" v-model="tienda.subgerente" />
              <label for="subgerente">Subgerente</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputNumber id="supPicker"  v-model="tienda.supPicker" />
              <label for="supPicker">Supervisor Picker</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputText id="telefonoGer" type="text" v-model="tienda.telefonoGer" />
              <label for="telefonoGer">Telefono Gerente</label>
            </span>
          </div>
        </div>

        
        <div
          class="p-field p-col-12 p-md-4"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-sign-in"></i>
            </span>
            <span class="p-float-label">
              <InputText id="telefonoSub" type="text" v-model="tienda.telefonoSub" />
              <label for="telefonoSub">Telefono Subgerente</label>
            </span>
          </div>
        </div>

  


      </div>
      
<Button label="Guardar" class="p-button-rounded p-button-success  p-mr-4" icon="pi pi-save" @click="saveTienda()"/>
      
    </div>

  </Dialog>
    <!--STEPS REGUISTRO DE USUARIO
            <div>
                <Toast />

                <div>
                    <Steps :model="stepAlta" :readonly="false" aria-label="Form Steps" />
                </div>

                <router-view v-slot="{ Component }" :formData="formObject" @prevPage="prevPage($event)"
                    @nextPage="nextPage($event)" @complete="complete">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </div>-->

    <div class="card">
      <Toolbar class="p-mb-4">
        <template #left>
          <Button
            label="Nueva Tienda"
            icon="pi pi-user-plus"
            class="p-button-success p-mr-4"
            @click="openNewTiendas"
            v-tooltip="'Agregar Tienda'"
          />
         </template>
          <template #right>
            <Button
              label="Generar Excel"
              icon="pi pi-upload"
              class="p-button-rounded p-button-success p-mr-2"
              @click="exportCSVAsAc($event)"
            />
          </template>
       
      </Toolbar>
      <div class="p-field">
      <DataTable
      ref="at"
        :value="tiendas"
        v-model:selection="tienda"
        selectionMode="single"
        v-model:filters="filters1"
        filterDisplay="menu"
        :filters="filters1"
        :paginator="true" 
        :rows="3"
        editMode="cell"
        class="editable-cells-table"
        :loading="loading"
        @cellEditComplete="onRowSelect"
        dataKey="id"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[3, 5, 10]"
        responsiveLayout="scroll"
        :globalFilterFields="[
          'id',
          'formato',
          'sucursal',
          'determinante',
          'gerente'
        ]"
        showGridlines tableStyle="min-width: 50rem"
      >
        <Toolbar class="p-mb-4">
          <template #left>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
             <InputText
                v-model="filters1['global'].value"
                placeholder="Buscar"
              />
            </span>
          </template>
        </Toolbar>
        <Column field="accion" header="Accion">
        <template #body="slotProps">
                            <div :class="slotProps.data">
                                 <Button label="Guardar" class="p-button-rounded p-button-success" icon="pi pi-save" @click="saveEditTienda(slotProps.data)"/>
      
                            </div>
                        </template>
       
        </Column> 
        <Column field="id" header="id Tienda"></Column>
        <Column field="zona" header="Zona">
            <template #editor="{ data }">
            <InputText v-model="data['zona']" />
            </template>
        </Column>
        <Column field="estado" header="Estado"  >
        <template #editor="{ data }">
           <AutoComplete
              v-model="data['estado']"
              dropdown
              :suggestions="itemsEstados"
              @complete="searchEstado"
              placeholder="Estado"
              autofocus 
            />
          <InputText v-model="data['estado']" disabled/>
           
            </template></Column>
        <Column field="subZona" header="Sub Zona">
        <template #editor="{ data }">
            <InputText v-model="data['subZona']" />
            </template>
        </Column>
        <Column field="ciudad" header="Ciudad">
        <template #editor="{ data }">
            <InputText v-model="data['ciudad']" disabled/>
            <AutoComplete
              v-model="data['ciudad']"
              dropdown
              :suggestions="itemsCiudades"
              @complete="searchCiudad"
              placeholder="Ciudad"
              forceSelection
            />
            </template>
            </Column>
        <Column field="clienteId" header="Cliente ID">
        <template #editor="{ data }">
            <InputText v-model="data['clienteId']" />
            </template>
            </Column>
        <Column field="nombreCliente" header="Nombre de Cliente">
        <template #editor="{ data }">
            <InputText v-model="data['nombreCliente']" disabled/>
            <AutoComplete
              v-model="data['nombreCliente']"
              dropdown
              :suggestions="itemsClientes"
              @complete="searchCliente"
              placeholder="Cliente"
              forceSelection
            />
            </template>
            </Column>
        <Column field="proyecto" header="Proyecto">
        <template #editor="{ data }">
            <InputText v-model="data['proyecto']" disabled/>
             <AutoComplete
              v-model="data['proyecto']"
              dropdown
              :suggestions="itemsProyectos"
              @complete="searchProyecto"
              placeholder="Proyecto"
              forceSelection
            />
            </template>
        </Column>
        <Column field="formato" header="Formato">
        <template #editor="{ data }">
            <InputText v-model="data['formato']" disabled/>
            <AutoComplete
              v-model="data['formato']"
              dropdown
              :suggestions="itemsFormatos"
              @complete="searchFormato"
              placeholder="Formato"
              forceSelection
            />
            </template>
        </Column>
        <Column field="nomenclatura" header="Nomenclatura">
        <template #editor="{ data }">
            <InputText v-model="data['nomenclatura']" />
            </template>
        </Column>
        <Column field="sucursal" header="Sucursal">
        <template #editor="{ data }">
            <InputText v-model="data['sucursal']" />
            </template>
        </Column>
        <Column field="tiendaTipo" header="Tip de tienda Fija/Apoyo">
        <template #editor="{ data }">
          <Dropdown v-model="data['tiendaTipo']" :options="tiendaTipo" optionLabel="label" optionValue="label" placeholder="Tipo Tienda" >
            <template #option="slotProps">
                <span>{{ slotProps.option.label }}</span
                >
              </template>
            </Dropdown>
            </template>
        </Column>
        <Column field="determinante" header="Determinante">
        <template #editor="{ data }">
            <InputText v-model="data['determinante']" />
            </template>
        </Column>
        <Column field="direccion" header="Direccion Tienda">
        <template #editor="{ data }">
            <InputText v-model="data['direccion']" />
            </template>
        </Column>
        <Column field="coordenadas" header="Coordenadas Tienda">
        <template #editor="{ data }">
            <InputText v-model="data['coordenadas']" />
            </template>
        </Column>
        <Column field="unidadesFijas" header="Num unidades fijas">
        <template #editor="{ data }">
            <InputText v-model="data['unidadesFijas']" />
            </template>
        </Column>
        <Column field="recolectores" header="Num Recolectores">
        <template #editor="{ data }">
            <InputText v-model="data['recolectores']" />
            </template>
        </Column>
        <Column field="aduanales" header="Num Aduanales">
        <template #editor="{ data }">
            <InputText v-model="data['aduanales']" />
            </template>
        </Column>
        <Column field="shoppers" header="Num. Shoppers">
        <template #editor="{ data }">
            <InputText v-model="data['shoppers']" />
            </template>
        </Column>
        <Column field="unidad_spot" header="Unidades spot">
        <template #editor="{ data }">
            <InputText v-model="data['unidad_spot']" />
            </template>
        </Column>
        <Column field="status" header="Status">
        <template #editor="{ data }">
          <Dropdown v-model="data['status']" :options="tiendaStatus" optionLabel="label" optionValue="label" placeholder="Status" >
            <template #option="slotProps">
                <span>{{ slotProps.option.label }}</span
                >
              </template>
              </Dropdown>
            </template>
        </Column>
        <Column field="correoGer" header="Correo Gerente">
        <template #editor="{ data }">
            <InputText v-model="data['correoGer']" />
            </template>
        </Column>
        <Column field="correoSub" header="Correo Subgerente">
        <template #editor="{ data }">
            <InputText v-model="data['correoSub']" />
            </template>
        </Column>
        <Column field="gerente" header="Gerente">
        <template #editor="{ data }">
            <InputText v-model="data['gerente']" />
            </template>
        </Column>
        <Column field="subgerente" header="Subgerente">
        <template #editor="{ data }">
            <InputText v-model="data['subgerente']" />
            </template>
        </Column>
        <Column field="supPicker" header="Supervisor Picker">
        <template #editor="{ data }">
            <InputText v-model="data['supPicker']" />
            </template>
        </Column>
        <Column field="telefonoGer" header="Telefono Gerente">
        <template #editor="{ data }">
            <InputText v-model="data['telefonoGer']" />
            </template>
        </Column>
        <Column field="telefonoSub" header="Telefono Subgerente">
        <template #editor="{ data }">
            <InputText v-model="data['telefonoSub']" />
            </template>
        </Column>
      </DataTable>
    </div>
    </div>
  </div>
</template>
<script>
import EmpleadosServicio from "../../service/EmpleadosServicio";
import CatalogoServicio from "../../service/CatalogosService";

import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { FilterMatchMode, FilterOperator } from "primevue/api";

export default {
  data() {
    return {
      tStatus:null,
      tTipo:null,
      filter:null,
      itemsEstados:[],
      itemsProyectos:[],
      itemsCiudades:[],
      itemsClientes:[],
      itemsFormatos:[],
      opEstados:[],
      opProyecto:[],
      opCiudad:[],
      opCliente:[],
      options:[],
      opFormato:[],
      tiendaTipo:[{label:"FIJA"},{label:"APOYO"}],
      tiendaStatus:[{label:"ACTIVA"},{label:"INACTIVA"}],
      filters1: null,
      editTienda:null,
      tiendas: null,
      tienda:{
        id:null,
        zona:null,
        estado:null,
        subZona:null,
        ciudad:null,
        clienteId:null,
        nombreCliente:null,
        proyecto:null,
        formato:null,
        nomenclatura:null,
        sucursal:null,
        tiendaTipo:null,
        determinante:null,
        direccion:null,
        coordenadas:null,
        unidadesFijas:null,
        recolectores:null,
        aduanales:null,
        shoppers:null,
        unidad_spot:null,
        status:null,
        correoGer:null,
        correoSub:null,
        gerente:null,
        subgerente:null,
        supPicker:null,
        telefonoGer:null,
        telefonoSub:null,

      },
      opentienda:false,
      catalogoServicio:null,
      formObject: {},
      router: useRouter(),
      toast: useToast(),
      stepAlta: [
        {
          label: "Datos Generales",
          to: "/datosGenerales",
        },
        {
          label: "Seat",
          to: "/seat",
        },
        {
          label: "Payment",
          to: "/payment",
        },
        {
          label: "Confirmation",
          to: "/confirmation",
        },
      ],
      tinendaFS: [
        {
          formato: null,
          sucursal: null,
        },
      ],
      estados:null,
      ciudades:null,
      clientes:null,
      proyectos:null, 
      formatos:null
    };
  },
  async created() {
    this.empleadosServicio = new EmpleadosServicio();
    this.catalogoServicio = new CatalogoServicio();
    // this.empleadosInfoAdicionalServicio = new EmpleadosInfoAdicionalServicio();
    // this.unidadesFlotaServicio = new UnidadesFlotaServicio();
     this.initFilters1();
  },

  async mounted() {
    await this.empleadosServicio
      .getAllTiendas()
      .then((data) => {
        this.tiendas = data.data;
        this.loading = false;
        console.log(this.tiendas, "tiendas");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });
      await this.empleadosServicio
      .getEstados()
      .then((data) => {
        this.estados = data.data;
        this.loading = false;
        if (this.estados.length > 0) {
          for (let i = 0; i < this.estados.length; i++) {
            this.opEstados.push(
              this.estados[i].lugarNacimiento 
            );
          }
        }
        
        console.log(this.estados, "estados");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });
      await this.catalogoServicio
      .getCiudades()
      .then((data) => {
        this.ciudades = data.data;
        this.loading = false;
        
        console.log(this.ciudades, "ciudades");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });

      await this.catalogoServicio
      .getClientes()
      .then((data) => {
        this.clientes = data.data;
        this.loading = false;
        if (this.clientes.length > 0) {
          for (let i = 0; i < this.clientes.length; i++) {
            this.opCliente.push(
              this.clientes[i].idEstcliente 
            );
          }
        }
        console.log(this.clientes, "clientes");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });

      await this.catalogoServicio
      .getProyectos()
      .then((data) => {
        this.proyectos = data.data;
        this.loading = false;
        if (this.proyectos.length > 0) {
          for (let i = 0; i < this.proyectos.length; i++) {
            this.opProyecto.push(
              this.proyectos[i].proyecto 
            );
          }
        }
        console.log(this.proyectos, "proyectos");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });

      await this.catalogoServicio
      .getFormatos()
      .then((data) => {
        this.formatos = data.data;
        this.loading = false;
        if (this.formatos.length > 0) {
          for (let i = 0; i < this.formatos.length; i++) {
            this.opFormato.push(
              this.formatos[i].formato 
            );
          }
        }
        console.log(this.formatos, "formatos");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });

  },
  methods: {
     initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        //'nombre': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        id: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        formato: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        sucursal: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        determinante: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        gerente: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        }
        //'activity': {value: null, matchMode: FilterMatchMode.BETWEEN},
        //'verified': {value: null, matchMode: FilterMatchMode.EQUALS}
      };
     
    },
    clearFilter1() {
      this.initFilters1();
    },
    async saveTienda(){
      if(this.tienda.ciudad!=null && this.tienda.estado!=null && this.tStatus!=null && this.tienda.nombreCliente!=null && this.tienda.proyecto && this.tienda.formato!=null && this.tTipo!=null && this.tienda.sucursal!=null && this.tienda.direccion != null && this.tienda.coordenadas != null){
      this.tienda.status=this.tStatus.label;
      this.tienda.tiendaTipo=this.tTipo.label;
      console.log(this.tienda);
await this.catalogoServicio.saveTienda(this.tienda).then(data => {
                    console.log(data);
                    this.mensaje = "SE AGREGO CORRECTAMENTE";
                    this.$toast.add({
              severity: "info",
              summary: "INFO",
              detail: "Se dio de alta correctamente",
              life: 10000,
            });
            this.opentienda=false;
                }).catch(error => {
                    this.mensaje = error + '----NO SE GUARDO ELEL CAMPO  EN LA BASE DE DATOS';
                     this.$toast.add({
              severity: "warn",
              summary: "ALERTA",
              detail: "ERROR no se genero el alta de Tienda",
              life: 10000,
            }); 
            this.opentienda=true;
                   
                });}else{
                  alert("Faltan campos");
                }
    },
   async saveEditTienda(event){
    console.log(event);
      await this.catalogoServicio.saveTienda(event).then(data => {
                    console.log(data);
                    this.mensaje = "SE AGREGO CORRECTAMENTE";
                    this.$toast.add({
              severity: "info",
              summary: "INFO",
              detail: "Se dio de alta correctamente",
              life: 10000,
            });
                }).catch(error => {
                    this.mensaje = error + '----NO SE GUARDO ELEL CAMPO  EN LA BASE DE DATOS';
                     this.$toast.add({
              severity: "warn",
              summary: "ALERTA",
              detail: "ERROR no se genero el alta de Tienda",
              life: 10000,
            });
                   
                });
    },
    exportCSVAsAc() {
      this.$refs.at.exportCSV();
    },
    /* 
            nextPage(event) {
                for (let field in event.formData) {
                    this.formObject.value[field] = event.formData[field];
                }
    
                this.push(this.stepAlta.value[event.pageIndex + 1].to);
            },
            prevPage(event) {
                this.push(this.stepAlta.value[event.pageIndex - 1].to);
            },
            complete() {
                this.toast.add({ severity: 'success', summary: 'Order submitted', detail: 'Dear, ' + this.formObject.value.firstname + ' ' + this.formObject.value.lastname + 'AltaComplete' });
            },*/

    async onRowSelect(event) {
      //let tienda=event.data.tiendaSucursal;
      this.editTienda = event.data;
      console.log(this.editTienda, "this.editTienda");
      this.openTiendas = false;
    },
  

    
  

    toggle() {
      this.openTiendas = true;
    },
openNewTiendas(){
  this.tienda={
    id:null,
        zona:null,
        estado:null,
        subZona:null,
        ciudad:null,
        clienteId:null,
        nombreCliente:null,
        proyecto:null,
        formato:null,
        nomenclatura:null,
        sucursal:null,
        tiendaTipo:null,
        determinante:null,
        direccion:null,
        coordenadas:null,
        unidadesFijas:null,
        recolectores:null,
        aduanales:null,
        shoppers:null,
        unidad_spot:null,
        status:null,
        correoGer:null,
        correoSub:null,
        gerente:null,
        subgerente:null,
        supPicker:null,
        telefonoGer:null,
        telefonoSub:null,
  },
    this.opentienda=true;
  },
    closeMaximizable() {
      this.displayMaximizable = false;
      this.unidadMax = false;
      // console.log(this.empleado);
    },
    searchEstado(event) {
     
    
      this.itemsEstados = this.opEstados.filter((estado) => {
          return estado.toLowerCase().startsWith(event.query.toLowerCase());
        });
      
      
    },
    searchCiudad(event) {
     this.filter=null;
     this.opCiudad=[];
      console.log(this.tienda.estado);
      for(let a=0;a<this.estados.length;a++){
        if(this.estados[a].lugarNacimiento===this.tienda.estado){
        
        this.filter=''+this.estados[a].id;

      }}
      console.log(this.filter);
    for (let i = 0; i < this.ciudades.length; i++) {
if(this.ciudades[i].idEstado===this.filter){
              this.opCiudad.push(
              this.ciudades[i].ciudad 
            );
      }
      
      
            
          }
          console.log(this.opCiudad);
      this.itemsCiudades = this.opCiudad.filter((ciudad) => {
          return ciudad.toLowerCase().startsWith(event.query.toLowerCase());
        });
      
    },
    searchProyecto(event) {
     
      
      this.itemsProyectos = this.opProyecto.filter((proyecto) => {
          return proyecto.toLowerCase().startsWith(event.query.toLowerCase());
        });
      
    },
    searchCliente(event) {
     
      
      this.itemsClientes = this.opCliente.filter((cliente) => {
          return cliente.toLowerCase().startsWith(event.query.toLowerCase());
        });
      
    },
    searchFormato(event) {
     
      
      this.itemsFormatos = this.opFormato.filter((formato) => {
          return formato.toLowerCase().startsWith(event.query.toLowerCase());
        });
      
    }
  }

  
};
</script>
<style lang="scss">
.custom-input-file {
  background-color: #55941b;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin: 0 auto 0;
  min-height: 15px;
  overflow: hidden;
  padding: 10px;
  position: relative;
  text-align: center;
  width: 100px;
}

.custom-input-file .input-file {
  border: 10000px solid transparent;
  cursor: pointer;
  font-size: 10000px;
  margin: 0;
  opacity: 0;
  outline: 0 none;
  padding: 0;
  position: absolute;
  right: -1000px;
  top: -1000px;
}

.card {
  /*  efectos card*/
  box-shadow: 0 8px 16px 0 #969797;
  transition: 0.3s;
}
.R {
  font-weight: 700;
  color: #ff0000;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 4px 8px 0 #3ab149;
}

.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

::v-deep(b) {
  display: block;
}

::v-deep(.p-card-body) {
  padding: 2rem;
}
</style>
