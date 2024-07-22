<template>
  <!--Dialog Usuario y Contraseña-->
  <Dialog
    v-model:visible="openCorrect"
    :style="{ width: '680px', height: '680' }"
    header="Estimado Usuario:"
    class="p-fluid"
    :modal="true"
  >
    <label>
      <h2>NOMBRE: {{ empleado.nombre }}</h2>
    </label>
    <br />
    <label>
      <h2>USUARIO: {{ empleado.empId }}</h2>
    </label>
    <br />
    <label>
      <h2>CONTRASEÑA: {{ passwordUser }}</h2>
    </label>
  </Dialog>
  <!--Ventana Seleccionar Tabulador-->
  <Dialog
    v-model:visible="openTab"
    :style="{ width: '980px' }"
    header="SELECCIONA UN TABULADOR"
    class="p-fluid"
    :maximizable="true"
    :modal="true"
  >
    <div class="p-field">
      <DataTable
        :value="tabuladores"
        v-model:selection="tabulador"
        selectionMode="single"
        @rowSelect="onRowSelectTab"
        v-model:filters="filtersTabulador"
        filterDisplay="menu"
        :filters="filtersTabulador"
        :loading="loading"
        @rowUnselect="onRowUnselect"
        dataKey="id"
        responsiveLayout="scroll"
        :paginator="true"
        :rows="5"
      >
        <Toolbar class="p-mb-4">
          <template #left>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="filtersTabulador['global'].value"
                placeholder="Buscar"
              />
            </span>
          </template>
        </Toolbar>

        <Column field="tipoZona" header="Zona">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.tipoZona }}
            </div>
          </template>
        </Column>
        <Column field="conUnidad" header="Unidad">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.conUnidad }}
            </div>
          </template>
        </Column>
        <Column field="descripcion" header="Esquema">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.descripcion }}
            </div>
          </template>
        </Column>
        <Column field="salarioDiario" header="Salario Diario">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.salarioDiario }}
            </div>
          </template>
        </Column>
        <Column field="salarioMensual" header="Salario Mensual">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.salarioMensual }}
            </div>
          </template>
        </Column>
        <Column field="gasMensual" header="Gas Mensual">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.gasMensual }}
            </div>
          </template>
        </Column>
        <Column field="pagoPedidoA7" header="Pago por pedido hasta 6">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.pagoPedidoA7 }}
            </div>
          </template>
        </Column>
        <Column field="pagoPedido7mas" header="Pediode 7 en adelante">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.pagoPedido7mas }}
            </div>
          </template>
        </Column>
        <Column field="bono" header="Bono">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.bono }}
            </div>
          </template>
        </Column>
        <Column field="renta" header="Renta Unidad">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.renta }}
            </div>
          </template>
        </Column>
        <Column field="total" header="Total">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.total }}
            </div>
          </template>
        </Column>
        <Column field="limiteInfonavit" header="Lim Desc Infonavit">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.limiteInfonavit }}
            </div>
          </template>
        </Column>
        <Column field="cargaSocial" header="Carga social">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.cargaSocial }}
            </div>
          </template>
        </Column>
        <Column
          field="totalIngresoCargaSocial"
          header="Total de ingresos mas carga social"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.totalIngresoCargaSocial }}
            </div>
          </template>
        </Column>
        <Column field="periodoPago" header="Periodo Pago">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.periodoPago }}
            </div>
          </template>
        </Column>
        <Column field="comentario" header="Comentarios">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.comentario }}
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </Dialog>

  <!--Ventana Seleccionar Tienda-->
  <Dialog
    v-model:visible="openTiendas"
    :style="{ width: '980px' }"
    header="SELECCIONA UNA TIENDA"
    class="p-fluid"
    :modal="true"
  >
    <div class="p-field">
      <DataTable
        :value="tiendas"
        v-model:selection="tienda"
        selectionMode="single"
        @rowSelect="onRowSelect"
        v-model:filters="filters1"
        filterDisplay="menu"
        :filters="filters1"
        :loading="loading"
        @rowUnselect="onRowUnselect"
        dataKey="id"
        responsiveLayout="scroll"
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

        <Column field="estado" header="Estado"></Column>
        <Column field="ciudad" header="Ciudad"></Column>
        <Column field="nombreCliente" header="Nom Cliente"></Column>
        <Column field="proyecto" header="Proyecto"></Column>
        <Column field="formato" header="Formato"></Column>
        <Column field="sucursal" header="Sucursal"></Column>
        <Column field="determinante" header="Determinante"></Column>
      </DataTable>
    </div>
  </Dialog>
  <!--Edit Empleado-->
  <Dialog
    v-model:visible="banEdit"
    :style="{ width: '980px' }"
    header="Editar Empleado"
    class="p-fluid"
    :maximizable="true"
    :modal="true"
  >
    <Toast />
    <div class="p-field">
      <DataTable
        :value="empEdits"
        v-model:selection="empEdit"
        selectionMode="single"
        @rowSelect="onRowSelectEmp"
        v-model:filters="filtersTabulador"
        filterDisplay="menu"
        :filters="filtersTabulador"
        :loading="loading"
        @rowUnselect="onRowUnselect"
        dataKey="id"
        responsiveLayout="scroll"
        :paginator="true"
        :rows="5"
        editMode="cell"
      >
        <Toolbar class="p-mb-4">
          <template #left>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="filtersTabulador['global'].value"
                placeholder="Buscar"
              />
            </span>
            <Button
              label="Actializar"
              icon="pi pi-replay"
              class="p-button-success p-mr-4"
              v-tooltip="'Click para actualizar'"
              @click="actualizarEmpleado"
            />
          </template>
        </Toolbar>
        <Column field="empId" header="N° de Empleado"></Column>
        <Column field="email" header="Correo">
          <template #editor="{ data }">
            <InputText v-model="data['email']" />
          </template>
        </Column>
        <Column field="status" header="Status">
          <template #editor="{ data }">
            <Dropdown
              v-model="data['status']"
              :options="statusOperacionOpcion"
              optionLabel="status"
              optionValue="status"
              placeholder="Asignar"
            >
              <template #option="slotProps">
                <span
                  :class="
                    'product-badge status-' +
                      slotProps.option.status.toLowerCase()
                  "
                  >{{ slotProps.option.status }}</span
                >
              </template>
            </Dropdown>
          </template>
        </Column>
        <Column field="nombre" header="Nombre Empleado">
          <template #editor="{ data }">
            <InputText v-model="data['nombre']" />
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="p-field">
      <br />

      <div class="p-fluid p-grid">
        <div class="p-field p-col-12 p-md-12">
          <h2>DATOS GENERALES</h2>
        </div>
        <div class="p-field p-col-12 p-md-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <span class="p-float-label">
              <InputText
                id="nombre"
                type="text"
                v-model="empInfoEdit.nombre"
                v-on:keyup="rules(nombre, null)"
                v-model.trim="myText"
              />
              <label for="nombre">Nombre</label>
            </span>
          </div>
        </div>
        <div class="p-field p-col-12 p-md-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-clock"></i>
            </span>
            <span class="p-float-label">
              <InputText
                type="date"
                id="start"
                name="trip-start"
                v-model="empInfoEdits.empFechaNacimiento"
                min="1960-01-01"
                max="2020-12-31"
              />
            </span>
          </div>
          <label for="start">Fecha de Nacimiento </label>
        </div>

        <div class="p-field p-col-12 p-md-4">
          <Dropdown
            v-model="selectSexo"
            :options="sexOption"
            placeholder="Sexo"
            class="w-full md:w-14rem"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div v-if="slotProps.value.label">
                  {{ slotProps.value.label }}
                </div>
              </div>

              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.label }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="p-field p-col-12 p-md-3">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-id-card"></i>
            </span>
            <span class="p-float-label">
              <InputText
                id="INE"
                type="text"
                v-model="empInfoEdits.empIne"
                v-on:keyup="rules(null, empInfoEdits)"
              />
              <label for="INE">INE</label>
            </span>
          </div>

          <Input type="file" accept=".*" @change="onUpload($event, 'ine')" name="myfile" />
        </div>
        <div class="p-field p-col-12 p-md-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-check-circle"></i>
            </span>
            <span class="p-float-label">
              <InputText
                id="empRFC"
                v-model="empInfoEdits.empRFC"
                v-on:keyup="rules(null, empInfoEdits)"
              />
              <label for="empRFC">RFC</label>
            </span>
          </div>
        </div>
        <div class="p-field p-col-12 p-md-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-check-circle"></i>
            </span>
            <span class="p-float-label">
              <InputMask
                id="empCurp"
                v-model="empInfoEdits.empCurp"
                v-on:keyup="rules(null, empInfoEdits)"
                mask="******************"
              />
              <label for="empCurp">CURP</label>
            </span>
            <Button
              icon="pi pi-search"
              severity="warning"
              @click="verificarCurp(empInfoEdits.empCurp)"
            />
          </div>
        </div>
        -
        <div class="p-field p-col-12 p-md-4">
          <Dropdown
            v-model="selectNacionalidad"
            :options="paises"
            filter
            optionLabel="nombre"
            placeholder="Nacionalidad"
            class="w-full md:w-14rem"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div v-if="slotProps.value.nombre">
                  {{ slotProps.value.nombre }}
                </div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.nombre }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="p-field p-col-12 p-md-2">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-phone"></i>
            </span>
            <span class="p-float-label">
              <InputMask
                id="telefonoCel"
                v-model="empInfoEdits.empTelCel"
                mode="decimal"
                :useGrouping="false"
                mask="9999999999"
              />
              <label for="telefonoCel">Tel Cel</label>
            </span>
          </div>
        </div>

        <div class="p-field p-col-12 p-md-4">
          <Dropdown
            v-model="esquema"
            :options="esquemas"
            filter
            optionLabel="descripcion"
            placeholder="Selecciona Esquema"
            class="w-full md:w-14rem"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div v-if="slotProps.value.descripcion">
                  {{ (selectEsquema = slotProps.value.id) }}-{{
                    slotProps.value.descripcion
                  }}
                </div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.descripcion }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div
          class="p-field p-col-12 p-md-4"
          v-if="selectEsquema === 34 || selectEsquema === 32"
        >
          <Dropdown
            v-model="proveedor"
            :options="proveedores"
            optionLabel="nombreComercial"
            filter
            placeholder="Selecciona proveedor"
            class="w-full md:w-14rem"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div v-if="!slotProps.value.nombreComercial">
                  {{ slotProps.value }}
                </div>
                <div v-if="slotProps.value.nombreComercial">
                  {{ slotProps.value.nombreComercial }}
                </div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.nombreComercial }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="p-field p-col-12 p-md-4">
          <Button
            type="button"
            icon="pi pi-search"
            :label="
              tabulador.descripcion
                ? tabulador.descripcion
                : 'Selecciona Tabulador'
            "
            @click="openTabulador"
            aria-haspopup="true"
            aria-controls="overlay_panel"
          />
        </div>
        <div class="p-field p-col-12 p-md-2" v-if="tabulador.conUnidad === 'A'">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-check-circle"></i>
            </span>
            <span class="p-float-label">
              <InputText
                id="placas"
                type="text"
                v-model="empInfoEdits.placaAsiganda"
              />
              <label for="placas">Placas</label>
            </span>
            <Button
              icon="pi pi-search"
              severity="warning"
              @click="verificarPlacas(empInfoEdits.placaAsiganda)"
            />
          </div>
        </div>
        <br />

        <div
          class="p-field p-col-12 p-md-4"
          v-if="selectEsquema === 31 || selectEsquema === 32"
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-check-circle"></i>
            </span>
            <span class="p-float-label">
              <InputMask
                id="empNss"
                v-model="empInfoEdits.empNss"
                mask="99999999999"
                v-on:keyup="rules(null, empInfoEdits)"
                v-model.trim="myText"
              />
              <label for="empNss">Nss</label>
            </span>
          </div>
        </div>
        <div
          class="p-field p-col-12 p-md-4"
          v-if="
            selectEsquema === 31 || selectEsquema === 32 || selectEsquema === 35
          "
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-envelope"></i>
            </span>
            <span class="p-float-label">
              <InputText id="correo" type="text" v-model="empInfoEdit.email" />
              <label for="correo">Correo Electrónico</label>
            </span>
          </div>
        </div>

        <div
          class="p-field p-col-12 p-md-3"
          v-if="
            selectEsquema === 31 || selectEsquema === 32 || selectEsquema === 35
          "
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-check-circle"></i>
            </span>
            <span class="p-float-label">
              <InputText
                id="empLicencia"
                type="text"
                v-model="empInfoEdits.empLicencia"
                v-on:keyup="rules(null, empInfoEdits)"
              />
              <label for="empLicencia">Licencia</label>
              <!-- <FileUpload mode="basic" name="demo[]" url="./" accept="image/*" :maxFileSize="1000000"
                                        @upload="onUpload" :auto="true" chooseLabel="Licencia" />-->
            </span>
          </div>
          <Input type="file" accept=".*" @change="onUpload($event, 'lic')" name="licencia" />
        </div>

        <div
          class="p-field p-col-12 p-md-12"
          v-if="
            selectEsquema === 31 || selectEsquema === 32 || selectEsquema === 35
          "
        >
          <h2>DIRECCIÓN</h2>
        </div>

        <div
          class="p-field p-col-12 p-md-4"
          v-if="
            selectEsquema === 31 || selectEsquema === 32 || selectEsquema === 35
          "
        >
          <Dropdown
            v-model="selectLugarNacimiento"
            :options="estados"
            filter
            optionLabel="lugarNacimiento"
            placeholder="Lugar de Nacimiento"
            class="w-full md:w-14rem"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div v-if="slotProps.value.lugarNacimiento">
                  {{ slotProps.value.lugarNacimiento }}
                </div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.lugarNacimiento }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div
          class="p-field p-col-12 p-md-2"
          v-if="
            selectEsquema === 31 || selectEsquema === 32 || selectEsquema === 35
          "
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-check-circle"></i>
            </span>
            <span class="p-float-label">
              <InputText
                id="empColonia"
                type="text"
                v-model="empInfoEdits.empCP"
              />
              <label for="empColonia">Codigo Postal</label>
            </span>
            <Button
              icon="pi pi-search"
              severity="warning"
              @click="findDireccion(empInfoEdits.empCP, 0)"
            />

            <ProgressSpinner
              style="width: 50px; height: 50px"
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
              aria-label="Custom ProgressSpinner"
              v-if="loadingCp === 1"
            />
          </div>
        </div>

        <div class="p-field p-col-12 p-md-2" v-if="banDireccion === 1">
          <Dropdown
            v-model="selectEstadoMunicipio"
            :options="direcionCpSinR"
            filter
            optionLabel="municipio"
            placeholder="Municipio/Estado"
            class="w-full md:w-14rem"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div v-if="slotProps.value.municipio">
                  {{ slotProps.value.municipio }}
                </div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.municipio }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="p-field p-col-12 p-md-4" v-if="banDireccion === 1">
          <Dropdown
            v-model="selectColonia"
            :options="direcionCp"
            filter
            optionLabel="colonia"
            placeholder="Colonia"
            class="w-full md:w-14rem"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div v-if="slotProps.value.colonia">
                  {{ slotProps.value.colonia }}
                </div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.colonia }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div
          class="p-field p-col-12 p-md-4"
          v-if="
            selectEsquema === 31 || selectEsquema === 32 || selectEsquema === 35
          "
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-check-circle"></i>
            </span>
            <span class="p-float-label">
              <InputText
                id="empCalle"
                type="text"
                v-model="empInfoEdits.empCalle"
                v-on:keyup="rules(null, empInfoEdits)"
                v-model.trim="myText"
              />
              <label for="empCalle">Calle</label>
            </span>
          </div>
        </div>
        <div
          class="p-field p-col-12 p-md-2"
          v-if="
            selectEsquema === 31 || selectEsquema === 32 || selectEsquema === 35
          "
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-check-circle"></i>
            </span>
            <span class="p-float-label">
              <InputText
                id="empNumeroExterior"
                type="text"
                v-model="empInfoEdits.empNumeroExterior"
              />
              <label for="empNumeroExterior">Numero Exterior</label>
            </span>
          </div>
        </div>
        <div
          class="p-field p-col-12 p-md-2"
          v-if="
            selectEsquema === 31 || selectEsquema === 32 || selectEsquema === 35
          "
        >
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-check-circle"></i>
            </span>
            <span class="p-float-label">
              <InputText
                id="empNumeroInterior"
                type="text"
                v-model="empInfoEdits.empNumeroInterior"
              />
              <label for="empNumeroInterior">Numero Interior</label>
            </span>
          </div>
        </div>
        <div class="p-field p-col-12 p-md-12">
          <h2>TIENDA</h2>
        </div>
        <div class="p-field p-col-12 p-md-4">
          <Button
            type="button"
            icon="pi pi-search"
            :label="tienda ? tienda.sucursal : 'Selecciona Tienda'"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_panel"
          />
        </div>
        <div class="p-field p-col-12 p-md-2" v-if="tienda != null">
          <InputText
            id="formato"
            type="text"
            v-model="tienda.formato"
            disabled
          />
          <label for="formato">Formato</label>
        </div>
        <div class="p-field p-col-12 p-md-2" v-if="tienda != null">
          <InputText
            id="sucursal"
            type="text"
            v-model="tienda.sucursal"
            disabled
          />
          <label for="sucursal">Sucursal</label>
        </div>

        <!--  <div class="p-field p-col-12 p-md-2" v-if="empleadoInfoAdicional.empNumeroExterior != null">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-phone"></i>
                            </span>
                            <span class="p-float-label">
                                <InputMask id="empTelFijo" v-model="empleadoInfoAdicional.empTelFijo" mode="decimal"
                                    :useGrouping="false" mask="99-99999999" />
                                <label for="empTelFijo">Tel Fijo</label>
                            </span>
                        </div>
                    </div>-->
        <div class="p-field p-col-12 p-md-12">
          <h2>DATOS BETA</h2>
        </div>
        <div class="p-field p-col-12 p-md-3">
          <Dropdown
            v-model="selectArea"
            :options="areas"
            placeholder="Area"
            class="w-full md:w-14rem"
            v-on:keyup="departamentoF()"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div>
                  {{ (idSubMarca = slotProps.value.id) }}-{{
                    slotProps.value.tipoArea
                  }}
                </div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.tipoArea }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="p-field p-col-12 p-md-3">
          <Dropdown
            v-model="selectDepartamento"
            :options="departamentos"
            placeholder="Departamento"
            class="w-full md:w-14rem"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div>{{ slotProps.value.tipoDepartamento }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.tipoDepartamento }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="p-field p-col-12 p-md-3">
          <Dropdown
            v-model="selectPuesto"
            :options="puestos"
            placeholder="Puestos"
            class="w-full md:w-14rem"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div v-if="slotProps.value.tipoPuesto">
                  {{ slotProps.value.tipoPuesto }}
                </div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.tipoPuesto }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="p-field p-col-12 p-md-3">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-check-circle"></i>
            </span>
            <span class="p-float-label">
              <Calendar
                id="fechaIngreso"
                v-model="empInfoEdits.empFechaIngreso"
                tiendaSucursal="dd/mm/yy"
                showIcon
              />
              <label for="tiendaSucursal">Fecha Ingreso</label>
            </span>
          </div>
        </div>
        <div class="p-field p-col-12 p-md-3">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-check-circle"></i>
            </span>
            <span class="p-float-label">
              <Calendar
                id="fechaBaja"
                v-model="empInfoEdits.empFechaBaja"
                tiendaSucursal="dd/mm/yy"
                showIcon
              />
              <label for="tiendaSucursal">Fecha Baja</label>
            </span>
          </div>
        </div>

        <div class="p-field p-col-12 p-md-2">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-check-circle"></i>
            </span>
            <span class="p-float-label">
              <InputNumber
                id="empSueldo"
                v-model="empInfoEdits.empSueldo"
                inputId="currency-us"
                mode="currency"
                currency="USD"
                locale="en-US"
              />
              <label for="empSueldo">Sueldo</label>
            </span>
          </div>
        </div>
        <br />
        <div class="p-field p-col-12 p-md-1">
          <div class="p-inputgroup">
            <span class="p-float-label">
              <InputMask id="bancoNom" v-model="bancoNom" mask="999" />
            </span>
          </div>
        </div>
        <div class="p-field p-col-12 p-md-4">
          <div class="p-inputgroup">
            <span class="p-float-label">
              <InputMask
                id="bancoCom"
                v-model="bancoCom"
                mask="999999999999999"
                mode="decimal"
              />
              <label for="bancoCom"
                >Cuenta {{ dataBanco[0].nombreInstitucion }}</label
              >
              <Button
                icon="pi pi-search"
                severity="warning"
                @click="findBanco"
              />
            </span>
          </div>
        </div>
        <div class="p-field p-col-12 p-md-2">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-check-circle"></i>
            </span>
            <span class="p-float-label">
              <InputText
                id="numNom"
                type="text"
                v-model="empInfoEdits.numNom"
              />
              <label for="numNom">Numero Nomina</label>
            </span>
          </div>
        </div>
        <div class="p-field p-col-12 p-md-2">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-lock"></i>
            </span>
            <span class="p-float-label">
              <InputText
                id="empPassword"
                type="text"
                v-model="empInfoEdits.empRFC"
                disabled
              />
              <label for="empPassword">Contraseña</label>
            </span>
          </div>
        </div>
        <Button
          label="Guardar"
          icon="pi pi-user-plus"
          class="p-button-success p-mr-4"
          @click="guardarEditEmpleado"
          v-tooltip="'Click para editar Empleado'"
        />
      </div>
    </div>
  </Dialog>
  <div>
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
            label="Nuevo Colaborador"
            icon="pi pi-user-plus"
            class="p-button-success p-mr-4"
            @click="newEmpleado"
            v-tooltip="'Click para agregar Empleado'"
          />
          <Button
            label="Nueva Unidad"
            icon="pi pi-plus"
            class="p-button-success p-mr-4"
            @click="newUnidadEmp"
            v-tooltip="'Click para agregar Unidad'"
          />
          <Button
            label="Editar Colaborador"
            icon="pi pi-user-edit"
            class="p-button-success p-mr-4"
            v-tooltip="'Click para editar Empleado'"
            @click="editEmpleado"
          />
        </template>
        <template #right>
          <Button
            label="Reporte Colaboradores"
            icon="pi pi-search"
            class="p-button-primary p-mr-4"
            @click="generateReport"
            v-tooltip="'Click para consultar empleado'"
          />
        </template>
      </Toolbar>

      <Dialog
        v-model:visible="operadorDialog"
        :style="{ width: '600px' }"
        header="Informacion adicional"
        :modal="true"
        class="p-fluid"
      >
        <div class="p-field">
          <DataTable :value="tablaIndividual" responsiveLayout="scroll">
            <Column field="arrendador" header="arrendador"></Column>
            <Column field="empCorreo" header="Correo"></Column>
            <Column field="empLicencia" header="Licencia"></Column>
            <Column field="empTelCel" header="Cel"></Column>
          </DataTable>
          <DataTable :value="tablaFlota" responsiveLayout="scroll">
            <Column field="marca" header="marca"></Column>
            <Column field="modelo" header="modelo"></Column>
            <Column field="unidad" header="Unidad"></Column>
            <Column field="placas" header="placas"></Column>
            <Column field="nombreAseguradora" header="Aseguradora"></Column>
          </DataTable>
        </div>
      </Dialog>
      <Dialog
        header="Alta Colaborador"
        v-model:visible="displayMaximizable"
        :style="{ width: '75vw' }"
        :maximizable="true"
        :modal="true"
      >
        <Toast />
        <br />
        <Toolbar>
          <template #left>
            <!--  <div class="custom-input-file col-md-6 col-sm-6 col-xs-6">
                            <input class="input-file" type="file" name="xlfile" id="xlf"
                                v-on:change="readExcel($event)" />Importar Excel
                        </div>-->
          </template>
        </Toolbar>
        <!-- <h3>{{mensaje}}</h3> -->
        <!--<h3>{{ nombre }}</h3> -->
        <br />

        <div class="p-fluid p-grid">
          <div
            class="p-field p-col-12 p-md-12"
            v-if="empleadoInfoAdicional.empSexo != null"
          >
            <h2>DATOS GENERALES</h2>
          </div>
          <div class="p-field p-col-12 p-md-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="nombre"
                  type="text"
                  v-model="nombre.nombre"
                  v-on:keyup="rules(nombre, null)"
                  v-model.trim="myText"
                />
                <label for="nombre">Nombre</label>
              </span>
            </div>
          </div>
          <div class="p-field p-col-12 p-md-4" v-if="nombre.nombre != null">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="apellidoPaterno"
                  type="text"
                  v-model="nombre.apellidoPaterno"
                  v-on:keyup="rules(nombre, null)"
                  v-model.trim="myText"
                />
                <label for="apallidoPaterno">Apellido Paterno</label>
              </span>
            </div>
          </div>

          <div
            class="p-field p-col-12 p-md-4"
            v-if="nombre.apellidoPaterno != null"
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="apellidoMaterno"
                  type="text"
                  v-model="nombre.apellidoMaterno"
                  v-on:keyup="rules(nombre, null)"
                  v-model.trim="myText"
                />
                <label for="apellidoMaterno">Apellido Materno</label>
              </span>
            </div>
          </div>
          <div
            class="p-field p-col-12 p-md-4"
            v-if="nombre.apellidoMaterno != null"
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-clock"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  type="date"
                  id="start"
                  name="trip-start"
                  v-model="empleadoInfoAdicional.empFechaNacimiento"
                  min="1960-01-01"
                  max="2020-12-31"
                />
              </span>
            </div>
            <label for="start">Fecha de Nacimiento </label>
          </div>

          <div
            class="p-field p-col-12 p-md-4"
            v-if="empleadoInfoAdicional.empFechaNacimiento != null"
          >
            <Dropdown
              v-model="selectSexo"
              :options="sexOption"
              placeholder="Sexo"
              class="w-full md:w-14rem"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div>{{ slotProps.value.label }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <div>{{ slotProps.option.label }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="p-field p-col-12 p-md-3" v-if="selectSexo != null">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-id-card"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="INE"
                  type="text"
                  v-model="empleadoInfoAdicional.empIne"
                  v-on:keyup="rules(null, empleadoInfoAdicional)"
                />
                <label for="INE">INE</label>
              </span>
            </div>

            <Input
              type="file"
              accept=".*"
              @change="onUpload($event, 'ine')"
              name="myfile"
            />
          </div>
          <div
            class="p-field p-col-12 p-md-4"
            v-if="empleadoInfoAdicional.empIne != null"
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-check-circle"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="empRFC"
                  v-model="empleadoInfoAdicional.empRFC"
                  v-on:keyup="rules(null, empleadoInfoAdicional)"
                />
                <label for="empRFC">RFC</label>
              </span>
            </div>
          </div>
          <div
            class="p-field p-col-12 p-md-4"
            v-if="
              empleadoInfoAdicional.empRFC != '' &&
                empleadoInfoAdicional.empRFC != null
            "
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-check-circle"></i>
              </span>
              <span class="p-float-label">
                <InputMask
                  id="empCurp"
                  v-model="empleadoInfoAdicional.empCurp"
                  v-on:keyup="rules(null, empleadoInfoAdicional)"
                  mask="******************"
                />
                <label for="empCurp">CURP</label>
              </span>
              <Button
                icon="pi pi-search"
                severity="warning"
                @click="verificarCurp(empleadoInfoAdicional.empCurp)"
              />
            </div>
          </div>
          -
          <div
            class="p-field p-col-12 p-md-4"
            v-if="
              empleadoInfoAdicional.empCurp != '' &&
                empleadoInfoAdicional.empCurp != null
            "
          >
            <Dropdown
              v-model="selectNacionalidad"
              :options="paises"
              filter
              optionLabel="nombre"
              placeholder="Nacionalidad"
              class="w-full md:w-14rem"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div>{{ slotProps.value.nombre }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <div>{{ slotProps.option.nombre }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div
            class="p-field p-col-12 p-md-2"
            v-if="selectNacionalidad != null"
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-phone"></i>
              </span>
              <span class="p-float-label">
                <InputMask
                  id="telefonoCel"
                  v-model="empleadoInfoAdicional.empTelCel"
                  mode="decimal"
                  :useGrouping="false"
                  mask="9999999999"
                />
                <label for="telefonoCel">Tel Cel</label>
              </span>
            </div>
          </div>

          <div
            class="p-field p-col-12 p-md-4"
            v-if="
              empleadoInfoAdicional.empTelCel != null &&
                empleadoInfoAdicional.empTelCel != ''
            "
          >
            <Dropdown
              v-model="esquema"
              :options="esquemas"
              filter
              optionLabel="descripcion"
              placeholder="Selecciona Esquema"
              class="w-full md:w-14rem"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div>
                    {{ (selectEsquema = slotProps.value.id) }}-{{
                      slotProps.value.descripcion
                    }}
                  </div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <div>{{ slotProps.option.descripcion }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div
            class="p-field p-col-12 p-md-4"
            v-if="selectEsquema === 34 || selectEsquema === 32"
          >
            <Dropdown
              v-model="proveedor"
              :options="proveedores"
              optionLabel="nombreComercial"
              filter
              placeholder="Selecciona proveedor"
              class="w-full md:w-14rem"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div>{{ slotProps.value.nombreComercial }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <div>{{ slotProps.option.nombreComercial }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="p-field p-col-12 p-md-4" v-if="selectEsquema != null">
            <Button
              type="button"
              icon="pi pi-search"
              :label="
                tabulador.descripcion
                  ? tabulador.descripcion
                  : 'Selecciona Tabulador'
              "
              @click="openTabulador"
              aria-haspopup="true"
              aria-controls="overlay_panel"
            />
          </div>
          <div
            class="p-field p-col-12 p-md-2"
            v-if="tabulador.conUnidad === 'A'"
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-check-circle"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="placas"
                  type="text"
                  v-model="empleadoInfoAdicional.placaAsiganda"
                />
                <label for="placas">Placas</label>
              </span>
              <Button
                icon="pi pi-search"
                severity="warning"
                @click="verificarPlacas(empleadoInfoAdicional.placaAsiganda)"
              />
            </div>
          </div>

          <!-- <div class="p-field p-col-12 p-md-4" >
                        <Dropdown v-model="proveedorMixto" :options="proveedores" filter optionLabel="nombreComercial"
                            placeholder="Selecciona Proveedor" class="w-full md:w-14rem"
                           >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                    <div>{{ empleado.empId=slotProps.value.nombreComercial }} </div>
                                    <div>{{ slotProps.value.nombreComercial }} </div>

                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">

                                    <div>{{ slotProps.option.nombreComercial }}</div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>-->

          <!--<div class="p-field p-col-12 p-md-4" v-if="tienda!=null">
                        <Button type="button" icon="pi pi-search" :label="tienda ? tienda.sucursal : 'Asignar unidad'"
                            @click="toggle" aria-haspopup="true" aria-controls="overlay_panel" />

                    </div>-->
          <br />

          <div
            class="p-field p-col-12 p-md-4"
            v-if="selectEsquema === 31 || selectEsquema === 32"
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-check-circle"></i>
              </span>
              <span class="p-float-label">
                <InputMask
                  id="empNss"
                  v-model="empleadoInfoAdicional.empNss"
                  mask="99999999999"
                  v-on:keyup="rules(null, empleadoInfoAdicional)"
                  v-model.trim="myText"
                />
                <label for="empNss">Nss</label>
              </span>
            </div>
          </div>
          <div
            class="p-field p-col-12 p-md-4"
            v-if="
              selectEsquema === 31 ||
                selectEsquema === 32 ||
                selectEsquema === 35
            "
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-envelope"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="correo"
                  type="text"
                  v-model="empleadoInfoAdicional.empCorreo"
                />
                <label for="correo">Correo Electrónico</label>
              </span>
            </div>
          </div>

          <div
            class="p-field p-col-12 p-md-3"
            v-if="
              selectEsquema === 31 ||
                selectEsquema === 32 ||
                selectEsquema === 35
            "
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-check-circle"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="empLicencia"
                  type="text"
                  v-model="empleadoInfoAdicional.empLicencia"
                  v-on:keyup="rules(null, empleadoInfoAdicional)"
                />
                <label for="empLicencia">Licencia</label>
                <!-- <FileUpload mode="basic" name="demo[]" url="./" accept="image/*" :maxFileSize="1000000"
                                        @upload="onUpload" :auto="true" chooseLabel="Licencia" />-->
              </span>
            </div>
            <Input type="file" accept=".*" @change="onUpload($event, 'lic')" name="licencia" />
          </div>

          <div
            class="p-field p-col-12 p-md-12"
            v-if="
              selectEsquema === 31 ||
                selectEsquema === 32 ||
                selectEsquema === 35
            "
          >
            <h2>DIRECCIÓN</h2>
          </div>

          <div
            class="p-field p-col-12 p-md-4"
            v-if="
              selectEsquema === 31 ||
                selectEsquema === 32 ||
                selectEsquema === 35
            "
          >
            <Dropdown
              v-model="selectLugarNacimiento"
              :options="estados"
              filter
              optionLabel="lugarNacimiento"
              placeholder="Lugar de Nacimiento"
              class="w-full md:w-14rem"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div>{{ slotProps.value.lugarNacimiento }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <div>{{ slotProps.option.lugarNacimiento }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div
            class="p-field p-col-12 p-md-2"
            v-if="
              selectEsquema === 31 ||
                selectEsquema === 32 ||
                selectEsquema === 35
            "
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-check-circle"></i>
              </span>
              <span class="p-float-label">
                <InputMask
                  id="empColonia"
                  type="text"
                  v-model="empleadoInfoAdicional.empCP"
                  mask="99999"
                />
                <label for="empColonia">Codigo Postal</label>
              </span>
              <Button
                icon="pi pi-search"
                severity="warning"
                @click="findDireccion(empleadoInfoAdicional.empCP, 0)"
              />

              <ProgressSpinner
                style="width: 50px; height: 50px"
                strokeWidth="8"
                fill="var(--surface-ground)"
                animationDuration=".5s"
                aria-label="Custom ProgressSpinner"
                v-if="loadingCp === 1"
              />
            </div>
          </div>
          <div class="p-field p-col-12 p-md-2" v-if="banDireccion === 1">
            <Dropdown
              v-model="selectEstadoMunicipio"
              :options="direcionCpSinR"
              filter
              optionLabel="municipio"
              placeholder="Municipio/Estado"
              class="w-full md:w-14rem"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div>{{ slotProps.value.municipio }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <div>{{ slotProps.option.municipio }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="p-field p-col-12 p-md-4" v-if="banDireccion === 1">
            <Dropdown
              v-model="selectColonia"
              :options="direcionCp"
              filter
              optionLabel="colonia"
              placeholder="Colonia"
              class="w-full md:w-14rem"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div>{{ slotProps.value.colonia }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <div>{{ slotProps.option.colonia }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div
            class="p-field p-col-12 p-md-4"
            v-if="
              selectEsquema === 31 ||
                selectEsquema === 32 ||
                selectEsquema === 35
            "
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-check-circle"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="empCalle"
                  type="text"
                  v-model="empleadoInfoAdicional.empCalle"
                  v-on:keyup="rules(null, empleadoInfoAdicional)"
                  v-model.trim="myText"
                />
                <label for="empCalle">Calle</label>
              </span>
            </div>
          </div>
          <div
            class="p-field p-col-12 p-md-2"
            v-if="
              selectEsquema === 31 ||
                selectEsquema === 32 ||
                selectEsquema === 35
            "
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-check-circle"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="empNumeroExterior"
                  type="text"
                  v-model="empleadoInfoAdicional.empNumeroExterior"
                />
                <label for="empNumeroExterior">Numero Exterior</label>
              </span>
            </div>
          </div>
          <div
            class="p-field p-col-12 p-md-2"
            v-if="
              selectEsquema === 31 ||
                selectEsquema === 32 ||
                selectEsquema === 35
            "
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-check-circle"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="empNumeroInterior"
                  type="text"
                  v-model="empleadoInfoAdicional.empNumeroInterior"
                />
                <label for="empNumeroInterior">Numero Interior</label>
              </span>
            </div>
          </div>
          <div
            class="p-field p-col-12 p-md-12"
            v-if="
              empleadoInfoAdicional.empCalle != null ||
                tabulador.conUnidad != null
            "
          >
            <h2>TIENDA</h2>
          </div>
          <div
            class="p-field p-col-12 p-md-4"
            v-if="
              empleadoInfoAdicional.empCalle != null ||
                tabulador.conUnidad != null
            "
          >
            <Button
              type="button"
              icon="pi pi-search"
              :label="tienda ? tienda.sucursal : 'Selecciona Tienda'"
              @click="toggle"
              aria-haspopup="true"
              aria-controls="overlay_panel"
            />
          </div>
          <div class="p-field p-col-12 p-md-2" v-if="tienda != null">
            <InputText
              id="formato"
              type="text"
              v-model="tienda.formato"
              disabled
            />
            <label for="formato">Formato</label>
          </div>
          <div class="p-field p-col-12 p-md-2" v-if="tienda != null">
            <InputText
              id="sucursal"
              type="text"
              v-model="tienda.sucursal"
              disabled
            />
            <label for="sucursal">Sucursal</label>
          </div>

          <!--  <div class="p-field p-col-12 p-md-2" v-if="empleadoInfoAdicional.empNumeroExterior != null">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-phone"></i>
                            </span>
                            <span class="p-float-label">
                                <InputMask id="empTelFijo" v-model="empleadoInfoAdicional.empTelFijo" mode="decimal"
                                    :useGrouping="false" mask="99-99999999" />
                                <label for="empTelFijo">Tel Fijo</label>
                            </span>
                        </div>
                    </div>-->
          <div class="p-field p-col-12 p-md-12" v-if="tienda != null">
            <h2>DATOS BETA</h2>
          </div>
          <div class="p-field p-col-12 p-md-3" v-if="tienda != null">
            <Dropdown
              v-model="selectArea"
              :options="areas"
              placeholder="Area"
              class="w-full md:w-14rem"
              v-on:keyup="departamentoF()"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div>
                    {{ slotProps.value.tipoArea }}-{{
                      (idSubMarca = slotProps.value.id)
                    }}
                  </div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <div>{{ slotProps.option.tipoArea }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="p-field p-col-12 p-md-3" v-if="selectArea != null">
            <Dropdown
              v-model="selectDepartamento"
              :options="departamentos"
              placeholder="Departamento"
              class="w-full md:w-14rem"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div>{{ slotProps.value.tipoDepartamento }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <div>{{ slotProps.option.tipoDepartamento }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div
            class="p-field p-col-12 p-md-3"
            v-if="selectDepartamento != null"
          >
            <Dropdown
              v-model="selectPuesto"
              :options="puestos"
              placeholder="Puestos"
              class="w-full md:w-14rem"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div>{{ slotProps.value.tipoPuesto }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <div>{{ slotProps.option.tipoPuesto }}</div>
                </div>
              </template>
            </Dropdown>
          </div>

          <div class="p-field p-col-12 p-md-3" v-if="selectPuesto != null">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-check-circle"></i>
              </span>
              <span class="p-float-label">
                <Calendar
                  id="fechaIngreso"
                  v-model="empleadoInfoAdicional.empFechaIngreso"
                  tiendaSucursal="dd/mm/yy"
                  showIcon
                />
                <label for="tiendaSucursal">Fecha Ingreso</label>
              </span>
            </div>
          </div>

          <div
            class="p-field p-col-12 p-md-2"
            v-if="empleadoInfoAdicional.empFechaIngreso != null"
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-check-circle"></i>
              </span>
              <span class="p-float-label">
                <InputNumber
                  id="empSueldo"
                  v-model="empleadoInfoAdicional.empSueldo"
                  inputId="currency-us"
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                />
                <label for="empSueldo">Sueldo</label>
              </span>
            </div>
          </div>
          <br />
          <div
            class="p-field p-col-12 p-md-1"
            v-if="empleadoInfoAdicional.empSueldo != null"
          >
            <div class="p-inputgroup">
              <span class="p-float-label">
                <InputMask id="bancoNom" v-model="bancoNom" mask="999" />
              </span>
            </div>
          </div>
          <div
            class="p-field p-col-12 p-md-4"
            v-if="empleadoInfoAdicional.empSueldo != null"
          >
            <div class="p-inputgroup">
              <span class="p-float-label">
                <InputMask
                  id="bancoCom"
                  v-model="bancoCom"
                  mask="999999999999999"
                  mode="decimal"
                />
                <label for="bancoCom"
                  >Cuenta {{ dataBanco[0].nombreInstitucion }}</label
                >
                <Button
                  icon="pi pi-search"
                  severity="warning"
                  @click="findBanco"
                />
              </span>
            </div>
          </div>
          <div
            class="p-field p-col-12 p-md-2"
            v-if="empleadoInfoAdicional.empSueldo != null"
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-check-circle"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="numNom"
                  type="text"
                  v-model="empleadoInfoAdicional.numNom"
                />
                <label for="numNom">Numero Nomina</label>
              </span>
            </div>
          </div>

          <!--<div class="p-field p-col-12 p-md-2">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-pencil"></i>
                            </span>
                            <span class="p-float-label">
                                <InputText id="unidad" type="text" v-model="unidadFlota.unidad" />
                                <label for="unidad">Unidad</label>
                            </span>
                        </div>
                    </div>
                    <div class="p-field p-col-12 p-md-4">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-id-card"></i>
                            </span>
                            <span class="p-float-label">
                                <InputText id="licencia" type="text" v-model="empleadoInfoAdicional.empLicencia" />
                                <label for="licencia">Numero de Licencia de manejo</label>
                            </span>
                        </div>
                    </div>
                   
                    <div class="p-field p-col-12 p-md-2">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-pencil"></i>
                            </span>
                            <span class="p-float-label">
                                <InputText id="placas" type="text" v-model="unidadFlota.placas" />
                                <label for="placas">Placas</label>
                            </span>
                        </div>
                    </div>
                    
                    <div class="p-field p-col-12 p-md-4">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-pencil"></i>
                            </span>
                            <span class="p-float-label">
                                <InputText id="motor" type="text" v-model="unidadFlota.tiendaSucursal" />
                                <label for="motor">Esquema</label>
                            </span>
                        </div>
                    </div>
                    <div class="p-field p-col-12 p-md-4">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-pencil"></i>
                            </span>
                            <span class="p-float-label">
                                <InputText id="serie" type="text" v-model="unidadFlota.nombreAseguradora" />
                                <label for="serie">Nombre Aseguradora</label>
                            </span>
                        </div>
                    </div>
                    <div class="p-field p-col-12 p-md-4">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-shield"></i>
                            </span>
                            <span class="p-float-label">
                                <InputText id="polizaSeguro" type="text" v-model="unidadFlota.polizaSeguro"  />
                                <label for="polizaSeguro">Numero de Poliza de Seguro</label>
                            </span>
                        </div>
                    </div>
                    <div class="p-field p-col-12 p-md-2">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-pencil"></i>
                            </span>
                            <span class="p-float-label">
                                <InputText id="marca" type="text" v-model="unidadFlota.marca" />
                                <label for="marca">Marca</label>
                            </span>
                        </div>
                    </div>
                    <div class="p-field p-col-12 p-md-2">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-pencil"></i>
                            </span>
                            <span class="p-float-label">
                                <InputText id="modelo" type="text" v-model="unidadFlota.modelo" />
                                <label for="modelo">Modelo</label>
                            </span>
                        </div>
                    </div>
                    <div class="p-field p-col-12 p-md-2">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-clock"></i>
                            </span>
                            <span class="p-float-label">
                                <InputNumber id="año"  v-model="unidadFlota.año" mode="decimal" :useGrouping="false" />
                                <label for="año">año</label>
                            </span>
                        </div>
                    </div>
                    <div class="p-field p-col-12 p-md-2">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-palette"></i>
                            </span>
                            <span class="p-float-label">
                                <InputText id="color" type="text" v-model="unidadFlota.color" />
                                <label for="color">Color</label>
                            </span>
                        </div>
                            </div>
                    <div class="p-field p-col-12 p-md-2" v-if="empleadoInfoAdicional.numNom != null">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-user-plus"></i>
                            </span>
                            <span class="p-float-label">
                                <InputText id="empId" type="text" v-model="empleado.empId" disabled />
                                <label for="empId">Usuario</label>
                            </span>
                        </div>
                    </div>-->
          <div
            class="p-field p-col-12 p-md-2"
            v-if="empleadoInfoAdicional.numNom != null"
          >
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-lock"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="empPassword"
                  type="text"
                  v-model="empleado.password"
                  disabled
                />
                <label for="empPassword">Contraseña</label>
              </span>
            </div>
          </div>
          <Button
            label="Dar de Alta a Colaborador Beta"
            icon="pi pi-check"
            class="p-button-success"
            @click="guardar"
          />
        </div>
        <!-- <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeMaximizable" class="p-button-text" />
                    <Button label="Aceptar" icon="pi pi-check" @click="closeMaximizable" autofocus />
                </template>-->
      </Dialog>
      <Dialog
        header="Alta Unidad"
        v-model:visible="unidadMax"
        :style="{ width: '75vw' }"
        :maximizable="true"
        :modal="true"
      >
        <Toast />
        <br />
        <h3>{{ mensaje }}</h3>
        <br />
        <div class="p-fluid p-grid">
          <div class="p-field p-col-12 p-md-12">
            <h2>DATOS DE UNIDAD</h2>
          </div>
          <div class="p-field p-col-12 p-md-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-pencil"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="numEconomico"
                  type="text"
                  v-model="unidadFlota.numEconomico"
                />
                <label for="numEconomico">#Economico</label>
              </span>
            </div>
          </div>

          <div class="p-field p-col-12 p-md-3">
            <AutoComplete
              v-model="unidadFlota.marca"
              dropdown
              :suggestions="itemsMarca"
              @complete="searchMarca"
              placeholder="Marca"
              forceSelection
            />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <AutoComplete
              v-model="unidadFlota.subMarca"
              dropdown
              :suggestions="itemsSubMarca"
              @complete="searchSubMarca"
              placeholder="SubMarca"
              forceSelection
            />
          </div>
          <div class="p-field p-col-12 p-md-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-clock"></i>
              </span>
              <span class="p-float-label">
                <InputNumber
                  id="año"
                  v-model="unidadFlota.año"
                  mode="decimal"
                  :useGrouping="false"
                />
                <label for="año">año</label>
              </span>
            </div>
          </div>
          <div class="p-field p-col-12 p-md-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-pencil"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="placas"
                  type="text"
                  v-model="unidadFlota.placas"
                  v-on:keyup="rulesUnidades(unidadFlota)"
                  v-model.trim="myText"
                />
                <label for="placas">Placas</label>
              </span>
            </div>
          </div>
          <div class="p-field p-col-12 p-md-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-pencil"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="tipoUnidad"
                  type="text"
                  v-model="unidadFlota.tipoUnidad"
                  v-on:keyup="rulesUnidades(unidadFlota)"
                  v-model.trim="myText"
                />
                <label for="tipoUnidad">Tipo</label>
              </span>
            </div>
          </div>
          <div class="p-field p-col-12 p-md-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-palette"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="color"
                  type="text"
                  v-model="unidadFlota.color"
                  v-on:keyup="rulesUnidades(unidadFlota)"
                  v-model.trim="myText"
                />
                <label for="color">Color</label>
              </span>
            </div>
          </div>
          <div class="p-field p-col-12 p-md-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-pencil"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="serie"
                  type="text"
                  v-model="unidadFlota.nombreAseguradora"
                  v-on:keyup="rulesUnidades(unidadFlota)"
                  v-model.trim="myText"
                />
                <label for="serie">Nombre Aseguradora</label>
              </span>
            </div>
          </div>

          <div class="p-field p-col-12 p-md-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-clock"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  type="date"
                  id="fechaVigenciaPoliza"
                  name="trip-start"
                  v-model="unidadFlota.fechaVigenciaPoliza"
                  min="1960-01-01"
                  max="2024-12-31"
                />
              </span>
            </div>
            <label for="fechaVigenciaPoliza">Fecha Vigencia Poliza</label>
          </div>
          <div class="p-field p-col-12 p-md-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-clock"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  type="date"
                  id="fechaVerificacion"
                  name="trip-start"
                  v-model="unidadFlota.fechaVerificacion"
                  min="1960-01-01"
                  max="2024-12-31"
                />
              </span>
            </div>
            <label for="fechaVerificacion">Fecha Verificacion</label>
          </div>
          <div class="p-field p-col-12 p-md-12">
            <h2>DOCUMENTOS</h2>
          </div>

          <div class="p-field p-col-12 p-md-2">
            <FileUpload
              mode="basic"
              name="demo[]"
              url="./"
              accept="image/*"
              :maxFileSize="1000000"
              @upload="onUpload"
              :auto="true"
              chooseLabel="Auto Foto"
            />
          </div>

          <div class="p-field p-col-12 p-md-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-shield"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="polizaSeguro"
                  type="text"
                  v-model="unidadFlota.polizaSeguro"
                />
                <label for="polizaSeguro"># Poliza de Seguro</label>
                <FileUpload
                  mode="basic"
                  name="demo[]"
                  url="./"
                  accept="image/*"
                  :maxFileSize="1000000"
                  @upload="onUpload"
                  :auto="true"
                  chooseLabel="Poliza Digital"
                />
              </span>
            </div>
          </div>
          <div class="p-field p-col-12 p-md-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-pencil"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="tarjetaCirculacion"
                  type="text"
                  v-model="unidadFlota.tarjetaCirculacion"
                />
                <label for="tarjetaCirculacion"># Serie</label>
                <FileUpload
                  mode="basic"
                  name="demo[]"
                  url="./"
                  accept="image/*"
                  :maxFileSize="1000000"
                  @upload="onUpload"
                  :auto="true"
                  chooseLabel="Tarjeta circulacion"
                />
              </span>
            </div>
          </div>
          <div class="p-field p-col-12 p-md-12">
            <h2>DATOS BETA</h2>
          </div>

          <div class="p-field p-col-12 p-md-2">
            <Dropdown
              v-model="unidadFlota.esquemaUnidad"
              :options="esquemaUnidad"
              filter
              optionLabel="label"
              placeholder="Esquema Unidad"
              class="w-full md:w-14rem"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div>{{ slotProps.value.label }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <div>{{ slotProps.option.label }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="p-field p-col-12 p-md-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-pencil"></i>
              </span>
              <span class="p-float-label">
                <InputText
                  id="tabulador"
                  type="text"
                  v-model="unidadFlota.tabulador"
                  v-on:keyup="rulesUnidades(unidadFlota)"
                  v-model.trim="myText"
                />
                <label for="tabulador">Tabulador</label>
              </span>
            </div>
          </div>
          <div class="p-field p-col-12 p-md-3">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-pencil"></i>
              </span>
              <span class="p-float-label">
                <label for="propietario"
                  >Propietario {{ unidadesFlota.propietario }}</label
                >
              </span>
            </div>
          </div>
          <div class="p-field p-col-12 p-md-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-pencil"></i>
              </span>
              <span class="p-float-label">
                <label for="facturante"
                  >Facturado por {{ unidadesFlota.facturante }}</label
                >
              </span>
            </div>
          </div>

          <Button
            label="Dar de Alta a Unidad Beta"
            icon="pi pi-check"
            class="p-button-success"
            @click="guardarUnidad"
          />
        </div>
        <template #footer>
          <Button
            label="No"
            icon="pi pi-times"
            @click="closeMaximizableUnidad"
            class="p-button-text"
          />
          <Button
            label="Aceptar"
            icon="pi pi-check"
            @click="closeMaximizableUnidad"
            autofocus
          />
        </template>
      </Dialog>
    </div>
    <div class="card" v-if="banReporte === 1">
      <DataTable
        ref="at"
        :value="reporte"
        v-model:selection="selectedProduct1"
        dataKey="id"
        :rowHover="true"
        v-model:filters="filters1"
        filterDisplay="menu"
        :loading="loading"
        :paginator="true"
        :rows="5"
        :filters="filters1"
        editMode="cell"
        class="editable-cells-table"
        @cellEditComplete="onCellEditComplete"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        responsiveLayout="scroll"
        :globalFilterFields="[
          'nombre',
          'empId',
          'curp',
          'estatus',
          'tiendaId',
          'formato',
          'sucursal',
        ]"
      >
        <Toolbar class="p-mb-4">
          <template #right>
            <Button
              label="Generar Excel"
              icon="pi pi-upload"
              class="p-button-rounded p-button-success p-mr-2"
              @click="exportCSVAsAc($event)"
            />
          </template>
        </Toolbar>

        <!--<Column header="Imag">
                         <template #body="slotProps">
                            <img :src=getImgUrl(slotProps.data.empImg) :alt="slotProps.data.empImg" class="product-image" />
                        </template>
                            </Column>-->
        <Column field="empId" header="empId" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.empId }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por empId"
            />
          </template>
        </Column>
        <Column field="nombre" header="nombre" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.nombre }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por nombre"
            />
          </template>
        </Column>
        <Column field="curp" header="curp" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.curp }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por curp"
            />
          </template>
        </Column>
        <Column field="estatus" header="estatus" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.estatus }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por estatus"
            />
          </template>
        </Column>
        <Column field="tiendaId" header="tiendaId" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.tiendaId }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por tiendaId"
            />
          </template>
        </Column>
        <Column field="formato" header="formato" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.formato }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por formato"
            />
          </template>
        </Column>
        <Column field="sucursal" header="sucursal" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.sucursal }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por sucursal"
            />
          </template>
        </Column>
        <Column field="area" header="area" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.area }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por area"
            />
          </template>
        </Column>
        <Column
          field="departamento"
          header="departamento"
          style="min-width:12rem"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.departamento }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por departamento"
            />
          </template>
        </Column>
        <Column field="docIne" header="docIne" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.docIne }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por docIne"
            />
          </template>
        </Column>
        <Column
          field="codigoPostal"
          header="codigoPostal"
          style="min-width:12rem"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.codigoPostal }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por codigoPostal"
            />
          </template>
        </Column>
        <Column field="direccion" header="direccion" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.direccion }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por direccion"
            />
          </template>
        </Column>
        <Column field="colonia" header="colonia" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.colonia }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por colonia"
            />
          </template>
        </Column>
        <Column field="correo" header="correo" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.correo }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por correo"
            />
          </template>
        </Column>
        <Column
          field="estadoMunicipio"
          header="estadoMunicipio"
          style="min-width:12rem"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.estadoMunicipio }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por estadoMunicipio"
            />
          </template>
        </Column>
        <Column
          field="docMigratorio"
          header="docMigratorio"
          style="min-width:12rem"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.docMigratorio }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por docMigratorio"
            />
          </template>
        </Column>
        <Column field="edad" header="edad" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.edad }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por edad"
            />
          </template>
        </Column>
        <Column field="fechaBaja" header="fechaBaja" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.fechaBaja }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por fechaBaja"
            />
          </template>
        </Column>
        <Column
          field="fechaIngreso"
          header="fechaIngreso"
          style="min-width:12rem"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.fechaIngreso }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por fechaIngreso"
            />
          </template>
        </Column>
        <Column
          field="fechaNacimiento"
          header="fechaNacimiento"
          style="min-width:12rem"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.fechaNacimiento }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por fechaNacimiento"
            />
          </template>
        </Column>
        <Column field="idJefe" header="idJefe" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.idJefe }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por idJefe"
            />
          </template>
        </Column>
        <Column field="ine" header="ine" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.ine }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por ine"
            />
          </template>
        </Column>
        <Column field="licencia" header="licencia" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.licencia }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por licencia"
            />
          </template>
        </Column>
        <Column
          field="lugarNacimiento"
          header="lugarNacimiento"
          style="min-width:12rem"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.lugarNacimiento }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por lugarNacimiento"
            />
          </template>
        </Column>
        <Column
          field="nacionalidad"
          header="nacionalidad"
          style="min-width:12rem"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.nacionalidad }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por nacionalidad"
            />
          </template>
        </Column>
        <Column field="nss" header="nss" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.nss }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por nss"
            />
          </template>
        </Column>
        <Column
          field="numeroExterior"
          header="numeroExterior"
          style="min-width:12rem"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.numeroExterior }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por numeroExterior"
            />
          </template>
        </Column>
        <Column
          field="numeroInterior"
          header="numeroInterior"
          style="min-width:12rem"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.numeroInterior }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por numeroInterior"
            />
          </template>
        </Column>
        <Column field="pais" header="pais" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.pais }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por pais"
            />
          </template>
        </Column>
        <Column field="rfc" header="rfc" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.rfc }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por rfc"
            />
          </template>
        </Column>
        <Column
          field="telefonoCel"
          header="telefonoCel"
          style="min-width:12rem"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.teltelefonoCelCel }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por telefonoCel "
            />
          </template>
        </Column>
        <Column
          field="telefonoFijo"
          header="telefonoFijo"
          style="min-width:12rem"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.telefonoFijo }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por telefonoFijo"
            />
          </template>
        </Column>
        <Column field="empresa" header="empresa" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.empresa }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por empresa"
            />
          </template>
        </Column>
        <Column field="esquema" header="esquema" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.esquema }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por esquema"
            />
          </template>
        </Column>
        <Column field="numNom" header="numNom" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.numNom }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por numNom"
            />
          </template>
        </Column>
        <Column
          field="placaAsignada"
          header="placaAsignada"
          style="min-width:12rem"
        >
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.placaAsignada }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por placaAsignada"
            />
          </template>
        </Column>
        <Column field="puesto" header="puesto" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.puesto }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por puesto"
            />
          </template>
        </Column>
        <Column field="tabulador" header="tabulador" style="min-width:12rem">
          <template #body="slotProps">
            <div :class="stockClass(slotProps.data)">
              {{ slotProps.data.tabulador }}
            </div>
          </template>
          <template #filter="{ filterModel }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              placeholder="Buscar por tabulador"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import EmpleadosServicio from "../service/EmpleadosServicio";
import EmpleadosInfoAdicionalServicio from "../service/EmpleadosInfoAdicionalServicio";
import UnidadesFlotaServicio from "../service/UnidadesFlotaServicio";

import { FilterMatchMode, FilterOperator } from "primevue/api";
import XLSX from "../../node_modules/xlsx/dist/xlsx.full.min.js";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

export default {
  data() {
    return {
      edtTest: null,
      curp: null,
      banEdit: false,
      dataEmp: null,
      empInfoEdit: {
        empId: null,
        nombre: null,
        status: null,
        email: null,
        tiendas: [],
      },
      empEdit: null,
      empEdits: [],
      statusOperacionOpcion: [{ status: "A" }, { status: "B" }],
      empEdits1: {
        id: null,
        empId: null,
        email: null,
        password: null,
        status: null,
        nombre: null,
        tiendaSucursal: null,
      },
      empInfo: null,
      empInfoEd: [],
      empInf: null,
      empInfoEdits: {
        empId: null,
        numNom: null,
        empresa: null,
        empPais: null,
        empNacionalidad: null,
        empDocMigratorio: null,
        empDireccion: null,
        empCP: null,
        empEstadoMunicipio: null,
        empSexo: null,
        empIne: null,
        docIne: null,
        empCurp: null,
        empNss: null,
        empRFC: null,
        empLicencia: null,
        empSueldo: null,
        empTelFijo: null,
        empTelCel: null,
        empIdJefe: null,
        empFechaNacimiento: null,
        empEdad: null,
        empCveArea: null,
        area: null,
        empCveDepartamento: null,
        departamento: null,
        empCvePuesto: null,
        puesto: null,
        empFechaIngreso: null,
        empFechaBaja: null,
        empCorreo: null,
        arrendador: null,
        esquema: null,
        docLicencia: null,
        empLugarNacimiento: null,
        empCalle: null,
        empNumeroInterior: null,
        empNumeroExterior: null,
        empColonia: null,
        placaAsiganda: null,
        banco: null,
        tabulador: null,
      },
      empInfoEdits1: {
        empId: null,
        numNom: null,
        empresa: null,
        empPais: null,
        empNacionalidad: null,
        empDocMigratorio: null,
        empDireccion: null,
        empCP: null,
        empEstadoMunicipio: null,
        empSexo: null,
        empIne: null,
        docIne: null,
        empCurp: null,
        empNss: null,
        empRFC: null,
        empLicencia: null,
        empSueldo: null,
        empTelFijo: null,
        empTelCel: null,
        empIdJefe: null,
        empFechaNacimiento: null,
        empEdad: null,
        empCveArea: null,
        area: null,
        empCveDepartamento: null,
        departamento: null,
        empCvePuesto: null,
        puesto: null,
        empFechaIngreso: null,
        empFechaBaja: null,
        empCorreo: null,
        arrendador: null,
        esquema: null,
        docLicencia: null,
        empLugarNacimiento: null,
        empCalle: null,
        empNumeroInterior: null,
        empNumeroExterior: null,
        empColonia: null,
        placaAsiganda: null,
        banco: null,
        tabulador: null,
      },
      totalCurp: 0,
      banReporte: 0,
      reporte: null,
      selectArea: null,
      selectDepartamento: null,
      selectNacionalidad: null,
      selectSexo: null,
      selectPuesto: null,
      selectColonia: null,
      selectEstadoMunicipio: null,
      selectLugarNacimiento: null,
      selectEsquema: null,
      loadingCp: 0,
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
      placaVerificador: null,
      passwordUser: null,
      departamentos: null,
      marcas: [
        {
          tipoMarca: null,
          id: null,
        },
      ],
      opMarcas: [],
      itemsMarca: [],
      opSubMarcas: [],
      itemsSubMarca: [],
      idSubMarca: null,
      subMarcas: null,
      esquema: null,
      openCorrect: false,
      dataBanco: [
        {
          nombreInstitucion: "",
        },
      ],
      bancoNom: null,
      bancoCom: null,
      areas: null,
      puestos: null,
      banDireccion: 0,
      cpRequest: {
        cp: null,
      },
      direcionCp: null,
      direcionCpSinR: null,
      sexOption: [{ label: "FEMENINO" }, { label: "MASCULINO" }],
      esquemaUnidad: [
        { label: "EMPRESA" },
        { label: "CONSIGNA" },
        { label: "CONSIGNA BETA" },
        { label: "RENTA" },
        { label: "RENTALS" },
        { label: "ALQUILADAS" },
      ],
      esq: null,
      lugarNacimiento: null,
      numeroClaveBanco: null,
      banco: null,
      esquemas: null,
      filtrarCp: null,
      openTab: false,
      tabulador: {
        conUnidad: null,
        descripcion: null,
      },
      tabuladores: null,
      proveedorMixto: null,
      openTiendas: false,
      abrirDialogTienda: false,
      tiendas: null,
      tienda: null,
      date: null,
      data: null,
      proveedor: null,
      proveedores: [{}],
      nombre: {
        nombre: null,
        apellidoMaterno: null,
        apellidoPaterno: null,
      },
      empleadosTiendas: {
        id: null,
        empleadosEmpId: null,
        tiendasId: null,
      },
      operador: null,
      mensaje: null,
      date2: null,
      empleados: null,
      empleadosServicio: null,
      empleadosInfoAdicionalServicio: null,
      empleadosInfoAdicional: null,
      displayMaximizable: false,
      unidadMax: false,
      unidadesFlotaServicio: null,
      unidadesFlota: null,
      tablaFlota: [],
      tinendaFS: [
        {
          formato: null,
          sucursal: null,
        },
      ],
      unidadFlota: {
        unidadId: null,
        numEconomico: null,
        propietario: null,
        tipoUnidad: null,
        esquemaUnidad: null,
        tabulador: null,
        facturante: null,
        nombreAseguradora: null,
        marca: null,
        subMarca: null,
        placas: null,
        numPolizaSeguro: null,
        polizaDigital: null,
        fechaVigenciaPoliza: null,
        fechaVerificacion: null,
        estado: null,
        serie: null,
        año: null,
        color: null,
        autoFoto: null,
        tarjetaCirculacion: null,
        status: null,
      },
      operadorDialog: false,
      empleado: {
        id: null,
        empId: null,
        email: null,
        password: null,
        status: "A",
        nombre: null,
        tiendaSucursal: null,
      },
      empleadoInfoAdicional: {
        empId: null,
        numNom: null,
        empresa: null,
        empPais: null,
        empNacionalidad: null,
        empDocMigratorio: null,
        empDireccion: null,
        empCP: null,
        empEstadoMunicipio: null,
        empSexo: null,
        empIne: null,
        docIne: null,
        empCurp: null,
        empNss: null,
        empRFC: null,
        empLicencia: null,
        empSueldo: null,
        empTelFijo: null,
        empTelCel: null,
        empIdJefe: null,
        empFechaNacimiento: null,
        empEdad: null,
        empCveArea: null,
        area: null,
        empCveDepartamento: null,
        departamento: null,
        empCvePuesto: null,
        puesto: null,
        empFechaIngreso: null,
        empFechaBaja: null,
        empCorreo: null,
        arrendador: null,
        esquema: null,
        docLicencia: null,
        empLugarNacimiento: null,
        empCalle: null,
        empNumeroInterior: null,
        empNumeroExterior: null,
        empColonia: null,
        placaAsiganda: null,
        banco: null,
        tabulador: null,
      },
      file: null,
      empId: "",
      tablaIndividual: [],
      filters1: null,
      filtersTabulador: null,
      estados: null,
      paises: [
        {
          nombre: "MEXICO",
        },
        {
          nombre: "OTROS",
        },
      ],
      bitacoraServicio: null,
      bitacoraResponse: {
        id: null,
        empCurp: null,
        empId: null,
        accion: null,
        fechaAccion: null,
        empIdMod: null,
        userReg: null,
      },
    };
  },
  async created() {
    this.empleadosServicio = new EmpleadosServicio();
    this.empleadosInfoAdicionalServicio = new EmpleadosInfoAdicionalServicio();
    this.unidadesFlotaServicio = new UnidadesFlotaServicio();
    //this.bitacoraServicio = new Bitacora();
    this.initFilters1();
  },

  async mounted() {
    /*await this.empleadosServicio.getAll().then(data => { this.empleados = data.data; this.loading = false; console.log(data.data, 'hola'); }).catch(error => {
            this.mensaje = error + '----NO SE GUARDO CAMPO  EN LA BASE DE DATOS';
        });
        await this.empleadosInfoAdicionalServicio.getAll().then(data=>{this.empleadosInfoAdicional=data.data;this.loading=false; console.log(data.data,'que show');}).catch(error => {
                this.mensaje=error+'----NO SE GUARDO CAMPO  EN LA BASE DE DATOS';
              });*/
    await this.unidadesFlotaServicio
      .getAll()
      .then((data) => {
        this.unidadesFlota = data.data;
        this.loading = false;
        console.log(data.data, "2");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });
    await this.empleadosServicio
      .getAllProveedores()
      .then((data) => {
        this.proveedores = data.data;
        this.loading = false;
        console.log(this.proveedores, "proveedores");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });
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
      .getTabulador()
      .then((data) => {
        this.tabuladores = data.data;
        this.loading = false;
        console.log(this.tabuladores, "tabuladores");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });
    await this.empleadosServicio
      .getEstados()
      .then((data) => {
        this.estados = data.data;
        this.loading = false;
        console.log(this.estados, "estados");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });
    await this.empleadosServicio
      .getEsquemaFiltrar("A")
      .then((data) => {
        this.esquemas = data.data;
        this.loading = false;
        console.log(this.esquemas, "esquemas");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });
    await this.empleadosServicio
      .getAreas()
      .then((data) => {
        this.areas = data.data;
        this.loading = false;
        console.log(this.areas, "areas");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });
    await this.empleadosServicio
      .getPuestos()
      .then((data) => {
        this.puestos = data.data;
        this.loading = false;
        console.log(this.puestos, "puestos");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });
    await this.empleadosServicio
      .getDepartamentos()
      .then((data) => {
        this.departamentos = data.data;
        this.loading = false;
        console.log(this.departamentos, "departamentos");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });

    await this.empleadosServicio
      .getMarcas()
      .then((data) => {
        this.marcas = data.data;
        if (this.marcas.length > 0) {
          for (let i = 0; i < this.marcas.length; i++) {
            this.opMarcas.push(
              this.marcas[i].tipoMarca + "-" + this.marcas[i].id
            );
          }
        }
        this.loading = false;
        console.log(this.marcas, "marcas");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });
    await this.empleadosServicio
      .getSubMarcas()
      .then((data) => {
        this.subMarcas = data.data;
        //if(this.subMarcas.length>0)
        this.loading = false;
        console.log(this.subMarcas, "subMarcas");
      })
      .catch((error) => {
        this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
      });
  },
  methods: {
    async actualizarEmpleado() {
      await this.empleadosServicio
        .todos()
        .then((data) => {
          this.empEdits = data.data;
          this.loading = false;
          console.log(this.empEdits, "empInfoEdits-------");
          this.$toast.add({
            severity: "warn",
            summary: "ALERTA",
            detail: "Empleados Activos",
            life: 10000,
          });
        })
        .catch((error) => {
          this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
          this.loading = false;
        });
    },
    async verificarCurp(curp) {
      this.empleadosInfoAdicionalServicio
        .getCurp(curp)
        .then((data) => {
          this.totalCurp = data.data;
          this.loading = false;
          console.log(this.totalCurp, "totalCurp");
          if (this.totalCurp === 1) {
            this.$toast.add({
              severity: "warn",
              summary: "ALERTA",
              detail: "Atencion Usuario CURP ya Reguistrado",
              life: 10000,
            });
          } else {
            this.$toast.add({
              severity: "info",
              summary: "INFO",
              detail: "Atencion Usuario CURP Valido",
              life: 10000,
            });
          }
        })
        .catch((error) => {
          this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
          this.loading = false;
        });
    },
    async generateReport() {
      if (this.banReporte === 1) {
        this.banReporte = 0;
      } else {
        this.banReporte = 1;
        this.loading = true;
        await this.empleadosServicio
          .getReporte()
          .then((data) => {
            this.reporte = data.data;
            this.loading = false;
            console.log(this.reporte, "reporte");
          })
          .catch((error) => {
            this.mensaje =
              error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
            this.loading = false;
          });
      }
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
    async verificarPlacas(placa) {
      console.log(placa, "placa");
      await this.unidadesFlotaServicio
        .placa(placa)
        .then((data) => {
          this.placaVerificador = data.data;
          this.loading = false;
          console.log(this.placaVerificador, "placaVerificador");
          if (this.placaVerificador > 0) {
            this.$toast.add({
              severity: "info",
              summary: "INFO",
              detail: "Atencion Usuario Placa Existente",
              life: 10000,
            });
          } else {
            this.$toast.add({
              severity: "warn",
              summary: "ALERTA",
              detail: "Atencion Usuario Placa de la unidad no existe",
              life: 10000,
            });
            this.unidadFlota.placas = placa;
            if (this.selectEsquema === 36) {
              this.unidadesFlota.propietario = this.empleadoInfoAdicional.empCurp;
              this.unidadesFlota.facturante = null;
            }
            if (this.selectEsquema === 32 || this.selectEsquema === 34) {
              this.unidadesFlota.propietario = this.proveedor.usuarioBeta[0].betaNomenclatura;
              this.unidadesFlota.facturante = this.proveedor.usuarioBeta[0].betaNomenclatura;
            }
            this.newUnidadEmp();
            console.log("crear nuevo");
          }
        })
        .catch((error) => {
          this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
        });
    },
    departamentoF() {
      console.log(this.idSubMarca, "idSubMarca");
    },
    searchSubMarca(event) {
      var regex = /(\d+)/g;
      let id = this.unidadFlota.marca.match(regex);
      this.opSubMarcas = [];
      for (let i = 0; i < this.subMarcas.length; i++) {
        if (this.subMarcas[i].tipoMarca === parseInt(id)) {
          this.opSubMarcas.push(this.subMarcas[i].tipoSubmarcas);
        }
      }
      console.log(this.opSubMarcas, "opSubMarcas");
      if (!event.query.trim().length) {
        this.itemsSubMarca = [...this.opSubMarcas];
      } else {
        this.itemsSubMarca = this.opSubMarcas.filter((unidades) => {
          return unidades.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
    },
    searchMarca(event) {
      //console.log(event.query);
      //let _items = [...this.opMarcas];
      if (!event.query.trim().length) {
        this.itemsMarca = [...this.opMarcas];
      } else {
        this.itemsMarca = this.opMarcas.filter((unidades) => {
          return unidades.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
    },
    async onRowSelect(event) {
      //let tienda=event.data.tiendaSucursal;
      this.tienda = event.data;
      this.empleadosTiendas.tiendasId = this.tienda.id;
      console.log(this.empleadosTiendas, "this.empleadosTiendas");
      this.openTiendas = false;
    },
    async findBanco() {
      this.empleadoInfoAdicional.banco = this.bancoNom + "" + this.bancoCom;
      console.log(
        this.empleadoInfoAdicional.banco,
        "this.empleadoInfoAdicional.banco"
      );
      this.empleadosServicio
        .getBancos(this.bancoNom)
        .then((data) => {
          this.dataBanco = data.data;
          this.loading = false;
          console.log(this.dataBanco, "dataBanco");
          if (this.dataBanco.length === 0) {
            this.dataBanco = [
              {
                nombreInstitucion: "",
              },
            ];
          }
        })
        .catch((error) => {
          this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
        });
    },
    async definirUsuario() {},
    async onRowSelectTab(event) {
      this.tabulador = event.data;
      this.openTab = false;
    },
    async guardarEditEmpleado() {
      console.log(this.empInfoEdits, "this.empInfoEdits");
      console.log(this.empInfoEdit, "this.empInfoEdit");
      this.curp = this.empInfoEdits.empCurp;
      var newProv;

      this.empInfoEdits.empCveArea = this.selectArea.id;
      this.empInfoEdits.area = this.selectArea.tipoArea;
      this.empInfoEdits.empCveDepartamento = this.selectDepartamento.id;
      this.empInfoEdits.departamento = this.selectDepartamento.tipoDepartamento;
      this.empInfoEdits.empFechaIngreso = this.empInfoEdits.empFechaIngreso.toString();
      this.empInfoEdits.empNacionalidad = this.selectNacionalidad.nombre;
      this.empInfoEdits.empSexo = this.selectSexo.label;
      this.empInfoEdits.empCvePuesto = this.selectPuesto.id;
      this.empInfoEdits.puesto = this.selectPuesto.tipoPuesto;
      this.empInfoEdits.esquema = this.esquema.descripcion;
      this.empInfoEdits.tabulador = this.tabulador.id;
      if (this.selectColonia != null) {
        this.empleadoInfoAdicional.empColonia = this.selectColonia.colonia;
        this.empleadoInfoAdicional.empEstadoMunicipio = this.selectEstadoMunicipio.estado;
      }

      if (
        this.selectEsquema === 31 ||
        this.selectEsquema === 32 ||
        this.selectEsquema === 35
      ) {
        this.empInfoEdits.empLugarNacimiento = this.selectLugarNacimiento.lugarNacimiento;
      }

      this.passwordUser = this.empInfoEdits.empRFC.substr(0, 10);
      this.empleado.password = this.empInfoEdits.empRFC.substr(0, 10);

      // Importamos paquete
      const bcrypt = require("bcryptjs");
      // Primero vamos a hashear la contraseña
      // Entre más rondas, mejor protección, pero más consumo de recursos. 10 está bien
      const rondasDeSal = 10;
      bcrypt.hash(
        this.passwordUser,
        rondasDeSal,
        (err, palabraSecretaEncriptada) => {
          if (err) {
            //console.log("Error hasheando:", err);
          } else {
            //console.log("Y hasheada es: " + palabraSecretaEncriptada);
            this.empleado.id = this.empInfoEdit.id;
            this.empleado.nombre = this.empInfoEdit.nombre;
            this.empleado.password = palabraSecretaEncriptada;
            this.empleado.tiendaSucursal = this.tienda.id;
            this.empleado.empId = this.empInfoEdit.empId;
            this.empleado.email = this.empInfoEdit.email;
            this.empleado.status = this.empInfoEdit.status;
            if (this.empleado.status === "B") {
              this.empInfoEdits.empCurp = null;
            }
            console.log(this.proveedor, "this.proveedor-------");

            if (this.selectEsquema === 31) {
              //this.empleado.empId = "BMEXS";
              newProv = "BMEXS";
            }
            if (this.selectEsquema === 32) {
              //this.empleado.empId = "BMEXM";
              newProv = "BMEXM";
            }
            if (this.selectEsquema === 36) {
              //this.empleado.empId = "BMEXI";
              newProv = "BMEXI";
            }
            if (this.selectEsquema === 35) {
              //this.empleado.empId = "BMEXH";
              newProv = "BMEXH";
            }
            if (this.selectEsquema === 34) {
              //this.empleado.empId = this.proveedor.usuarioBeta[0].betaNomenclatura;
              newProv = this.proveedor.usuarioBeta[0].betaNomenclatura;
            }
            if (this.empInfoEdits.empId.includes(newProv)) {
              this.empleadosServicio
                .edit(this.empleado)
                .then((data) => {
                  console.log(data);
                  this.openCorrect = true;
                })
                .catch((error) => {
                  this.mensaje = error + "----Error al editar empleado";
                  alert(this.mensaje);
                });
              this.empleadosInfoAdicionalServicio
                .edit(this.empInfoEdits)
                .then((data) => {
                  console.log(data);
                  this.openCorrect = true;
                })
                .catch((error) => {
                  this.mensaje =
                    error + "----Error al editar informacion adicional";
                  alert(this.mensaje);
                });
              console.log("ok");
            } else {
              this.empleado.status = "B";
              this.empleado.password = null;
              this.empInfoEdits.empCurp = null;
              this.empleadosServicio
                .edit(this.empleado)
                .then((data) => {
                  console.log(data);
                  this.openCorrect = true;
                })
                .catch((error) => {
                  this.mensaje = error + "----Error al editar empleado";
                  alert(this.mensaje);
                });
              this.empleadosInfoAdicionalServicio
                .edit(this.empInfoEdits)
                .then((data) => {
                  console.log(data);
                  this.empInf = data.data;
                  this.empInf.empId = newProv;
                  this.empInf.empCurp = this.curp;

                  this.empleadosInfoAdicionalServicio
                    .save(this.empInf)
                    .then((data) => {
                      this.responseSave = data.data;
                      console.log(data.data);
                      this.empleado.empId = this.responseSave.empId;
                      this.empInfoEdits.empId = this.responseSave.empId;
                      this.empInfoEdits.empFechaIngreso = this.empInfoEdits.empFechaIngreso.slice(
                        0,
                        30
                      );
                      (this.empleado.id = null), (this.empleado.status = "A");
                      this.empleado.password = palabraSecretaEncriptada;
                      this.empleadosServicio
                        .save(this.empleado)
                        .then((data) => {
                          console.log(data);
                          this.openCorrect = true;
                        })
                        .catch((error) => {
                          this.mensaje =
                            error +
                            "----Error al agregar informacion adicional";
                          alert(this.mensaje);
                        });
                    })
                    .catch((error) => {
                      this.mensaje = error + "Error al crear Empleado";
                      this.$toast.add({
                        severity: "warn",
                        summary: "ALERTA",
                        detail: "Atencion Usuario Error al dar el alta",
                        life: 10000,
                      });
                      alert(this.mensaje);
                    });
                  this.openCorrect = true;
                })
                .catch((error) => {
                  this.mensaje =
                    error + "----Error al editar informacion adicional";
                  alert(this.mensaje);
                });
            }

            console.log(this.empleado, "empleado final");
            console.log(this.empInfoEdits, " this.empInfoEdits final");
          }
        }
      );
    },
    async onRowSelectEmp(event) {
      (this.proveedor = null), (this.tienda = null);
      (this.selectArea = null),
        (this.selectDepartamento = null),
        (this.selectNacionalidad = null),
        (this.selectSexo = null),
        (this.selectPuesto = null),
        (this.selectColonia = null),
        (this.selectEstadoMunicipio = null),
        (this.selectLugarNacimiento = null),
        (this.selectEsquema = null),
        (this.mensaje = null);
      (this.tabulador = {
        conUnidad: null,
        descripcion: null,
      }),
        (this.empInfoEd = []);
      this.empInfoEdit = event.data;

      await this.empleadosInfoAdicionalServicio
        .getEmpId(this.empInfoEdit.empId)
        .then((data) => {
          this.empInfoEd.push(data.data);
          console.log(data.data, "data.data");
          this.loading = false;
          this.empInfoEdits = this.empInfoEd[0];
          if (this.empInfoEdits.empCP != null) {
            if (this.empInfoEdits.empCP.toString().length === 4) {
              this.empInfoEdits.empCP = "0" + this.empInfoEdits.empCP;
            }
          }

          for (let j = 0; j < this.esquemas.length; j++) {
            if (this.esquemas[j].descripcion === this.empInfoEdits.esquema) {
              this.selectEsquema = this.esquemas[j].id;
              console.log(this.esquemas[j].id, "this.esquemas[j].id");
            }
          }

          let tabula = parseInt(this.empInfoEdits.tabulador);
          for (let i = 0; i < this.tabuladores.length; i++) {
            if (this.tabuladores[i].id === tabula) {
              this.tabulador = this.tabuladores[i];
            }
          }
          if (this.empInfoEdit.tiendas.length > 0) {
            this.tienda = this.empInfoEdit.tiendas[0];
          }
          for (let i = 0; i < this.areas.length; i++) {
            if (this.areas[i].tipoArea === this.empInfoEdits.area) {
              this.selectArea = this.areas[i];
            }
          }
          for (let i = 0; i < this.departamentos.length; i++) {
            if (
              this.departamentos[i].tipoDepartamento ===
              this.empInfoEdits.departamento
            ) {
              this.selectDepartamento = this.departamentos[i];
            }
          }
          for (let i = 0; i < this.proveedores.length; i++) {
            if (
              this.empInfoEdits.empId.includes(
                this.proveedores[i].usuarioBeta[0].betaNomenclatura
              )
            ) {
              this.proveedor = this.proveedores[i];
            }
          }
          for (let i = 0; i < this.puestos.length; i++) {
            if (this.empInfoEdits.puesto === this.puestos[i].tipoPuesto) {
              this.selectPuesto = this.puestos[i];
            }
          }
          for (let i = 0; i < this.esquemas.length; i++) {
            if (this.empInfoEdits.esquema === this.esquemas[i].descripcion) {
              this.esquema = this.esquemas[i];
            }
          }
          for (let i = 0; i < this.paises.length; i++) {
            if (this.empInfoEdits.empNacionalidad === this.paises[i].nombre) {
              this.selectNacionalidad = this.paises[i];
            }
          }
          for (let i = 0; i < this.estados.length; i++) {
            if (
              this.empInfoEdits.empLugarNacimiento ===
              this.estados[i].lugarNacimiento
            ) {
              this.selectLugarNacimiento = this.estados[i];
            }
          }
          for (let i = 0; i < this.sexOption.length; i++) {
            if (this.empInfoEdits.empSexo === this.sexOption[i].label) {
              this.selectSexo = this.sexOption[i];
            }
          }
          this.findDireccion(this.empInfoEdits.empCP, 1);
          this.$toast.add({
            severity: "warn",
            summary: "ALERTA",
            detail: "Atencion Empleado Registrado",
            life: 10000,
          });
        })
        .catch((error) => {
          this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
          this.loading = false;
        });
    },
    async guardar() {
      //console.log(this.empleado);
      if (
        this.nombre.nombre != null &&
        this.nombre.apellidoPaterno &&
        this.nombre.apellidoPaterno != null &&
        this.empleadoInfoAdicional.empRFC != null &&
        this.empleadoInfoAdicional.empCurp &&
        this.tienda != null
      ) {
        console.log(
          this.empleadoInfoAdicional.empRFC.length,
          "this.empleadoInfoAdicional.empRFC.length"
        );

        this.empleadoInfoAdicional.empCveArea = this.selectArea.id;
        this.empleadoInfoAdicional.area = this.selectArea.tipoArea;
        this.empleadoInfoAdicional.empCveDepartamento = this.selectDepartamento.id;
        this.empleadoInfoAdicional.departamento = this.selectDepartamento.tipoDepartamento;
        this.empleadoInfoAdicional.empFechaIngreso = this.empleadoInfoAdicional.empFechaIngreso.toString();
        this.empleadoInfoAdicional.empNacionalidad = this.selectNacionalidad.nombre;
        this.empleadoInfoAdicional.empSexo = this.selectSexo.label;
        this.empleadoInfoAdicional.empCvePuesto = this.selectPuesto.id;
        this.empleadoInfoAdicional.puesto = this.selectPuesto.tipoPuesto;
        this.empleadoInfoAdicional.esquema = this.esquema.descripcion;
        this.empleadoInfoAdicional.tabulador = this.tabulador.id;

        if (this.selectColonia != null) {
          this.empleadoInfoAdicional.empColonia = this.selectColonia.colonia;
          this.empleadoInfoAdicional.empEstadoMunicipio = this.selectEstadoMunicipio.estado;
          this.empleadoInfoAdicional.empLugarNacimiento = this.selectLugarNacimiento.lugarNacimiento;
        }

        this.passwordUser = this.empleadoInfoAdicional.empRFC.substr(0, 10);
        this.empleado.password = this.empleadoInfoAdicional.empRFC.substr(
          0,
          10
        );
        if (this.selectEsquema === 31) {
          this.empleado.empId = "BMEXS";
        }
        if (this.selectEsquema === 32) {
          this.empleado.empId = "BMEXM";
          console.log(this.selectEsquema, "this.selectEsquema");
        }
        if (this.selectEsquema === 36) {
          this.empleado.empId = "BMEXI";
        }
        if (this.selectEsquema === 35) {
          this.empleado.empId = "BMEXH";
        }
        if (this.selectEsquema === 34) {
          this.empleado.empId = this.proveedor.usuarioBeta[0].betaNomenclatura;
        }
        this.empleadoInfoAdicional.empId = this.empleado.empId;
        // Importamos paquete
        const bcrypt = require("bcryptjs");
        // Primero vamos a hashear la contraseña
        // Entre más rondas, mejor protección, pero más consumo de recursos. 10 está bien
        const rondasDeSal = 10;
        bcrypt.hash(
          this.passwordUser,
          rondasDeSal,
          (err, palabraSecretaEncriptada) => {
            if (err) {
              //console.log("Error hasheando:", err);
            } else {
              //console.log("Y hasheada es: " + palabraSecretaEncriptada);
              this.empleado.nombre =
                this.nombre.nombre +
                " " +
                this.nombre.apellidoPaterno +
                " " +
                this.nombre.apellidoMaterno;
              this.empleado.password = palabraSecretaEncriptada;
              this.empleado.tiendaSucursal = this.tienda.id;
              this.empleado.status = "A";

              console.log(this.empleado, "prueba final");
              console.log(
                this.empleadoInfoAdicional,
                "prueba empleadoInfoAdicional final"
              );

              this.empleadosInfoAdicionalServicio
                .save(this.empleadoInfoAdicional)
                .then((data) => {
                  this.responseSave = data.data;
                  console.log(data.data);
                  this.empleado.empId = this.responseSave.empId;
                  this.empleadoInfoAdicional.empId = this.responseSave.empId;
                  this.empleadoInfoAdicional.empFechaIngreso = this.empleadoInfoAdicional.empFechaIngreso.slice(
                    0,
                    30
                  );
                  this.empleadosServicio
                    .save(this.empleado)
                    .then((data) => {
                      console.log(data);
                      this.openCorrect = true;
                    })
                    .catch((error) => {
                      this.mensaje =
                        error + "----Error al agregar informacion adicional";
                      alert(this.mensaje);
                    });
                })
                .catch((error) => {
                  this.mensaje = error + "Error al crear Empleado";
                  this.$toast.add({
                    severity: "warn",
                    summary: "ALERTA",
                    detail: "Atencion Usuario Error al dar el alta",
                    life: 10000,
                  });
                  alert(this.mensaje);
                });
            }
          }
        );

        /*this.unidadFlota.empId=this.empleado.empId;
                await this.unidadesFlotaServicio.save(this.unidadFlota).then(data => {console.log(data);}).catch(error => {
                        this.mensaje=error+'----NO SE GUARDO CAMPO  EN LA BASE DE DATOS';
                      });*/
      } else if (this.nombre.nombre === null) {
        this.mensaje = "Falta el campo Nombre";
        alert(this.mensaje);
      } else if (this.empleado.apellidoPaterno === null) {
        this.mensaje = "Falta el campo Apellido Paterno";
        alert(this.mensaje);
      } else if (this.empleado.apellidoMaterno === null) {
        this.mensaje = "Falta el campo Apellido Materno";
        alert(this.mensaje);
      } else if (this.tienda === null) {
        this.mensaje = "Falta el campo Tenda";
        alert(this.mensaje);
      } else if (this.empleadoInfoAdicional.empRFC === null) {
        this.mensaje = "Falta el campo RFC";
        alert(this.mensaje);
      } else if (this.empleadoInfoAdicional.empCurp === null) {
        this.mensaje = "Falta el campo CURP";
        alert(this.mensaje);
      } else if (this.empleadoInfoAdicional.empIne === null) {
        this.mensaje = "Falta el campo INE";
        alert(this.mensaje);
      }
    },

    toggle() {
      this.openTiendas = true;
    },
    openTabulador() {
      this.openTab = true;
    },
    async findDireccion(empCp, ban) {
      this.loadingCp = 1;
      this.cpRequest.cp = empCp;
      await this.empleadosServicio
        .getCpFiltrar(this.cpRequest)
        .then((data) => {
          this.direcionCp = data.data;
          this.direcionCpSinR = data.data;

          if (this.direcionCp.length > 0) {
            let hash = {};
            this.direcionCpSinR = this.direcionCpSinR.filter((o) =>
              hash[o.municipio] ? false : (hash[o.municipio] = true)
            );
            if (this.direcionCpSinR.length > 0 && ban === 1) {
              this.selectEstadoMunicipio = this.direcionCpSinR[0];
              this.selectColonia = this.direcionCp[0];
              this.selectColonia.colonia = this.empInfoEdits.empColonia;
            }
            console.log(this.selectColonia, "this.selectColonia");

            this.banDireccion = 1;
            this.loadingCp = 0;
          } else {
            this.banDireccion = 0;
            this.$toast.add({
              severity: "warn",
              summary: "Advertencia",
              detail: "Atencion Usuario, Codigo Postal Invalido",
              life: 3000,
            });
            this.loadingCp = 0;
          }
          this.loadingCp = 0;
        })
        .catch((error) => {
          this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
          this.banDireccion = 0;
          this.loadingCp = 0;
        });
    },
    rules(e, b) {
      if (e != null) {
        if (e.nombre != null) {
          this.nombre.nombre = e.nombre.toUpperCase();
        }
        if (e.apellidoPaterno != null) {
          this.nombre.apellidoPaterno = e.apellidoPaterno.toUpperCase();
        }
        if (e.apellidoPaterno != null) {
          this.nombre.apellidoMaterno = e.apellidoMaterno.toUpperCase();
        }
      }
      if (b != null) {
        if (b.empLugarNacimiento != null) {
          this.empleadoInfoAdicional.empLugarNacimiento = b.empLugarNacimiento.toUpperCase();
        }
        if (b.empNacionalidad != null) {
          this.empleadoInfoAdicional.empNacionalidad = b.empNacionalidad.toUpperCase();
        }

        if (b.empRFC != null) {
          this.empleadoInfoAdicional.empRFC = b.empRFC
            .toUpperCase()
            .slice(0, 13);
        }
        if (b.empNss != null) {
          this.empleadoInfoAdicional.empNss = b.empNss.toUpperCase();
        }
        if (b.empCurp != null && b.empCurp != "") {
          this.empleadoInfoAdicional.empCurp = b.empCurp.toUpperCase();
        }
        if (b.empCalle != null) {
          this.empleadoInfoAdicional.empCalle = b.empCalle.toUpperCase();
        }
        if (b.empColonia != null) {
          this.empleadoInfoAdicional.empColonia = b.empColonia.toUpperCase();
        }
        if (b.empEstadoMunicipio != null) {
          this.empleadoInfoAdicional.empEstadoMunicipio = b.empEstadoMunicipio.toUpperCase();
        }
        if (b.area != null) {
          this.empleadoInfoAdicional.area = b.area.toUpperCase();
        }
        if (b.departamento != null) {
          this.empleadoInfoAdicional.departamento = b.departamento.toUpperCase();
        }
        if (b.puesto != null) {
          this.empleadoInfoAdicional.puesto = b.puesto.toUpperCase();
        }

        if (b.arrendador != null) {
          this.empleadoInfoAdicional.arrendador = b.arrendador.toUpperCase();
        }
        if (b.arrendador != null) {
          this.empleadoInfoAdicional.arrendador = b.arrendador.toUpperCase();
        }
        if (b.empLicencia != null) {
          this.empleadoInfoAdicional.empLicencia = b.empLicencia.toUpperCase();
        }
        if (b.empIne != null) {
          this.empleadoInfoAdicional.empIne = b.empIne.toUpperCase();
        }
      }

      /* if(p!=null){
                 if(p.marca!=null){
                 this.unidadFlota.marca= p.marca.toUpperCase();
                 }
                  unidadFlota.nombreAseguradora
             }
                 /*this.empleadoInfoAdicional.empRFC= b.empRFC.replace(/\s+/g,'');
                 this.empleadoInfoAdicional.empNss= b.empNss.replace(/\s+/g,'');
                 this.empleadoInfoAdicional.empCurp= b.empCurp.replace(/\s+/g,'');*/

      /* if(c!=null){
 
                 }*/
    },
    rulesUnidades(unidades) {
      if (unidades != null) {
        if (unidades.marca != null) {
          this.unidadFlota.marca = unidades.marca.toUpperCase();
        }
        if (unidades.subMarca != null) {
          this.unidadFlota.subMarca = unidades.subMarca.toUpperCase();
        }
        if (unidades.placas != null) {
          this.unidadFlota.placas = unidades.placas.toUpperCase();
        }
        if (unidades.tipoUnidad != null) {
          this.unidadFlota.tipoUnidad = unidades.tipoUnidad.toUpperCase();
        }
        if (unidades.color != null) {
          this.unidadFlota.color = unidades.color.toUpperCase();
        }
        if (unidades.nombreAseguradora != null) {
          this.unidadFlota.nombreAseguradora = unidades.nombreAseguradora.toUpperCase();
        }
        if (unidades.esquemaUnidad != null) {
          this.unidadFlota.esquemaUnidad = unidades.esquemaUnidad.toUpperCase();
        }
        if (unidades.tabulador != null) {
          this.unidadFlota.tabulador = unidades.tabulador.toUpperCase();
        }
        if (unidades.propietario != null) {
          this.unidadFlota.propietario = unidades.propietario.toUpperCase();
        }
        if (unidades.facturante != null) {
          this.unidadFlota.facturante = unidades.facturante.toUpperCase();
        }
      }
    },
    async onUpload(event, doc) {
      
      console.log(doc, "doc");
      console.log(event.target.files, "carga de archivo");
      const formData = new FormData();
      const archivo = event.target.files[0];
      formData.append("multipartFile", archivo);
      if (doc === "ine") {
        await this.empleadosInfoAdicionalServicio
          .saveUpload(formData)
          .then((data) => {
            console.log(data.data, "data.data-------");
            const documento = data.data;
            
              this.empleadoInfoAdicional.docIne = documento.secure_url;
              console.log(this.empleadoInfoAdicional.docIne , "dataIne-------");
              this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "Se subio correctamente el INE",
        life: 3000,
      });
            
          })
          .catch((error) => {
            this.mensaje =
              error + "----NO SE GUARDO DOCUMENTO  EN LA BASE DE DATOS";
            this.loading = false;
          });
      }
      if (doc === "lic") {
        await this.empleadosInfoAdicionalServicio
          .saveUpload(formData)
          .then((data) => {
            console.log(data.data, "data.data-------");
            const documento = data.data;
            
              this.empleadoInfoAdicional.docLicencia = documento.secure_url;
              this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "Se subio correctamente la Lic",
        life: 3000,
      });
            
          })
          .catch((error) => {
            this.mensaje =
              error + "----NO SE GUARDO DOCUMENTO  EN LA BASE DE DATOS";
            this.loading = false;
          });
      }
    },
    readExcel(e) {
      const file = e.target.files[0];
      /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      reader.onload = (e) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        /* Get first worksheet */
        const wsname1 = wb.SheetNames[0];
        const wsname2 = wb.SheetNames[1];
        const wsname3 = wb.SheetNames[2];
        const ws1 = wb.Sheets[wsname1];
        const ws2 = wb.Sheets[wsname2];
        const ws3 = wb.Sheets[wsname3];
        /* Convert array of arrays */
        const data1 = XLSX.utils.sheet_to_row_object_array(ws1);
        const data2 = XLSX.utils.sheet_to_row_object_array(ws2);
        const data3 = XLSX.utils.sheet_to_row_object_array(ws3);

        /* Update state */
        this.data1 = data1;
        //let a="hola";
        const bcrypt = require("bcryptjs");
        // Primero vamos a hashear la contraseña
        // Entre más rondas, mejor protección, pero más consumo de recursos. 10 está bien
        const rondasDeSal = 10;

        for (let i = 0; i < this.data1.length; i++) {
          /*this.unidades={
                            unidadId:null,
                            propietario:this.data1[i].propietario,
                            tipoUnidad:this.data1[i].tipo,
                            esquemaUnidad:this.data1[i].esquema,
                            tabulador:null,
                            facturante:this.data1[i].facturante,
                            nombreAseguradora:this.data1[i].aseguradora,
                            marca:this.data1[i].marca,
                            subMarca:this.data1[i].subMarca,
                            placas:this.data1[i].placas,
                            numPolizaSeguro:this.data1[i].poliza,
                            polizaDigital:this.data1[i].polizaDigital,
                            fechaVigenciaPoliza:this.data1[i].fechaVigenciaPoliza,
                            fechaVerificacion:this.data1[i].fechaVigenciaPoliza,
                            estado:this.data1[i].estado,
                            serie:null,
                            año:this.data1[i].modelo,
                            color:this.data1[i].color,
                            autoFoto:null,
                            tarjetaCirculacion:this.data1[i].circulacion,
                            status:"ALTA"
                        };
                        this.empleadosServicio.saveInfo(this.unidades).then(data => {console.log(data);}).catch(error => {
                    this.mensaje=error+'----NO SE GUARDO CAMPO  EN LA BASE DE DATOS';
                  });*/
          this.empleadoInfoAdicional = {
            empId: this.data1[i].usuario,
            puesto: this.data1[i].puesto,
            numNom: this.data1[i].nomina,
            empPais: "MEXIC0",
            empNacionalidad: "MEXICANA",
            empDocMigratorio: null,
            empDireccion:
              this.data1[i].calle +
              " " +
              this.data1[i].numeroExterior +
              " " +
              this.data1[i].numeroInterior +
              " " +
              this.data1[i].colonia +
              " " +
              this.data1[i].municipio,
            empCP: this.data1[i].codigo,
            empEstadoMunicipio: this.data1[i].municipio,
            empSexo: this.data1[i].sexo,
            empIne: this.data1[i].ine,
            empCurp: this.data1[i].curp,
            empNss: this.data1[i].nss,
            empRFC: this.data1[i].rfc,
            empLicencia: this.data1[i].licencia,
            empSueldo: this.data1[i].sueldo,
            empTelFijo: this.data1[i].telefonoFijo,
            empTelCel: this.data1[i].telefonoCelular,
            empIdJefe: null,
            empFechaNacimiento: this.data1[i].fechaNacimiento,
            empEdad: null,
            empCveArea: null,
            area: this.data1[i].area,
            empCveDepartamento: null,
            departamento: this.data1[i].departamento,
            empCvePuesto: null,
            empCveGrupo: null,
            grupo: null,
            empFechaIngreso: this.data1[i].fechadeIngreso,
            empFechaBaja: this.data1[i].fechaBaja,
            empCorreo: this.data1[i].correoElectronico,
            arrendador: null,
            esquema: this.data1[i].esquema,
            fotoPoliza: null,
            fotoLicencia: null,
            fotoTarjetaCirculacion: null,
            empLugarNacimiento: this.data1[i].lugarNacimiento,
            empCalle: this.data1[i].calle,
            empNumeroInterior: this.data1[i].numeroExterior,
            empNumeroExterior: this.data1[i].numeroInterior,
            empColonia: this.data1[i].colonia,
            docIne: null,
          };
          /*this.empleadosServicio.saveInfo(this.empInfo).then(data => {console.log(data);}).catch(error => {
                    this.mensaje=error+'----NO SE GUARDO CAMPO  EN LA BASE DE DATOS';
                    console.log(this.empInfo);
                  });*/
          bcrypt.hash(
            this.data1[i].contraseña,
            rondasDeSal,
            (err, palabraSecretaEncriptada) => {
              if (err) {
                //console.log("Error hasheando:", err);
              } else {
                console.log("Y hasheada es: " + palabraSecretaEncriptada);

                this.empleado = {
                  id: null,
                  empId: this.data1[i].usuario,
                  email: this.data1[i].correoElectronico,
                  password: palabraSecretaEncriptada,
                  status: "A",
                  nombre:
                    this.data1[i].nombre +
                    " " +
                    this.data1[i].apellidoPaterno +
                    " " +
                    this.data1[i].apellidoMaterno,
                };
                console.log(this.empleado, "aqui");
                /* this.empleadosServicio.save(this.empleado).then(data => {console.log(data);}).catch(error => {
                             this.mensaje=error+'----NO SE GUARDO CAMPO  EN LA BASE DE DATOS';
                           });*/
              }
            }
          );
        }

        this.data2 = data2;
        this.data3 = data3;
        console.log(this.data1);
        console.log(this.data2);
        console.log(this.data3);

        //const header = data.shift()
      };
      //console.log(this.data);
      reader.readAsBinaryString(file);
    },
    Info(operador) {
      this.operador = { ...operador };
      console.log(this.operador);
      for (let i = 0; i < this.empleadosInfoAdicional.length; i++) {
        if (this.empleadosInfoAdicional[i].empId === this.operador.empId) {
          let j = 0;
          this.tablaIndividual[j] = this.empleadosInfoAdicional[i];
        }
      }

      for (let h = 0; h < this.unidadesFlota.length; h++) {
        if (this.unidadesFlota[h].empId === this.operador.empId) {
          let f = 0;
          this.tablaFlota[f] = this.unidadesFlota[h];
        }
      }
      this.operadorDialog = true;
    },
    async iniciar() {
      await this.empleadosServicio.getAll().then((data) => {
        this.empleados = data.data;
        this.loading = false;
        console.log(data.data, "hola");
      });
    },
    async guardarUnidad() {
      await this.unidadesFlotaServicio
        .save(this.unidadFlota)
        .then((data) => {
          console.log(data.data, "unidad save");
          this.unidadMax = true;
          this.$toast.add({
            severity: "info",
            summary: "INFO",
            detail: "Atencios usuario alta de unidad exitosa",
            life: 10000,
          });
        })
        .catch((error) => {
          this.mensaje = error + "----Error al agregar la unidad";
          this.unidadMax = false;
          alert(this.mensaje);
        });
    },

    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        //'nombre': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        empId: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        nombre: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        estatus: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        curp: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        tiendaId: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        formato: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        //'activity': {value: null, matchMode: FilterMatchMode.BETWEEN},
        //'verified': {value: null, matchMode: FilterMatchMode.EQUALS}
      };
      this.filtersTabulador = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        //'nombre': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        empId: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        nombre: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        estatus: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        curp: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        tiendaId: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        formato: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        //'activity': {value: null, matchMode: FilterMatchMode.BETWEEN},
        //'verified': {value: null, matchMode: FilterMatchMode.EQUALS}
      };
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
    async actualizar() {
      await this.empleadosServicio
        .getAll()
        .then((data) => {
          this.empleados = data.data;
          this.loading = false;
        })
        .catch((error) => {
          this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
        });
      await this.empleadosInfoAdicionalServicio
        .getAll()
        .then((data) => {
          this.empleadosInfoAdicional = data.data;
          this.loading = false;
        })
        .catch((error) => {
          this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
        });
      await this.unidadesFlotaServicio
        .getAll()
        .then((data) => {
          this.unidadesFlota = data.data;
          this.loading = false;
        })
        .catch((error) => {
          this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
        });
    },
    getImgUrl(pic) {
      console.log(pic);
      return (
        "https://sistema-integral-beta.herokuapp.com/beta/empleados/img/upload/" +
        pic
      );
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    stockClass(data) {
      return [
        {
          R: data.tcEstatus == "R",
        },
      ];
    },
    onProductSelect(event) {
      this.$refs.op.hide();
      console.log(event);

      //this.empleadoRec.pedidoIdSucursal=this.indiceRec=data.pedidoIdSucursal;
    },
    async newUnidadEmp() {
      this.unidadFlota = {
        unidadId: null,
        numEconomico: null,
        propietario: null,
        tipoUnidad: null,
        esquemaUnidad: null,
        tabulador: null,
        facturante: null,
        nombreAseguradora: null,
        marca: null,
        subMarca: null,
        placas: null,
        numPolizaSeguro: null,
        polizaDigital: null,
        fechaVigenciaPoliza: null,
        fechaVerificacion: null,
        estado: null,
        serie: null,
        año: null,
        color: null,
        autoFoto: null,
        tarjetaCirculacion: null,
        status: null,
      };

      this.unidadMax = true;
    },
    newEmpleado() {
      this.banDireccion=0;
      this.proveedor = null;
      this.tienda = null;
      this.selectArea = null;
      this.selectDepartamento = null;
      this.selectNacionalidad = null;
      this.selectSexo = null;
      this.selectPuesto = null;
      this.selectColonia = null;
      this.selectEstadoMunicipio = null;
      this.selectLugarNacimiento = null;
      this.selectEsquema = null;
      this.mensaje = null;
      this.tabulador = {
        conUnidad: null,
        descripcion: null,
      };
      this.nombre = {
          nombre: null,
          apellidoPaterno: null,
          apellidoMaterno: null,
        };
      this.empleado = {
        id: null,
        empId: null,
        email: null,
        password: null,
        status: "A",
        nombre: null,
        tiendas: [],
      };
      this.empleadoInfoAdicional = {
        empId: null,
        numNom: null,
        empresa: null,
        empPais: null,
        empNacionalidad: null,
        empDocMigratorio: null,
        empDireccion: null,
        empCP: null,
        empEstadoMunicipio: null,
        empSexo: null,
        empIne: null,
        empCurp: null,
        empNss: null,
        empRFC: null,
        empLicencia: null,
        empSueldo: null,
        empTelFijo: null,
        empTelCel: null,
        empIdJefe: null,
        empFechaNacimiento: null,
        empEdad: null,
        empCveArea: null,
        area: null,
        empCveDepartamento: null,
        departamento: null,
        empCvePuesto: null,
        puesto: null,
        empCveGrupo: null,
        grupo: null,
        empFechaIngreso: null,
        empFechaBaja: null,
        empCorreo: null,
        arrendador: null,
        esquema: null,
        fotoPoliza: null,
        fotoLicencia: null,
        fotoTarjetaCirculacion: null,
        empLugarNacimiento: null,
        empCalle: null,
        empNumeroInterior: null,
        empNumeroExterior: null,
        empColonia: null,
      };

      this.displayMaximizable = true;
    },
    async editEmpleado() {
      this.banDireccion=0;
      this.proveedor = null;
      this.tienda = null;
      this.selectArea = null;
      this.selectDepartamento = null;
      this.selectNacionalidad = null;
      this.selectSexo = null;
      this.selectPuesto = null;
      this.selectColonia = null;
      this.selectEstadoMunicipio = null;
      this.selectLugarNacimiento = null;
      this.selectEsquema = null;
      this.mensaje = null;
      this.tabulador = {
        conUnidad: null,
        descripcion: null,
      };
      this.banEdit = true;
      this.dataEmp = "BEDF0048";
      await this.empleadosServicio
        .todos()
        .then((data) => {
          this.empEdits = data.data;
          this.loading = false;
          console.log(this.empEdits, "empInfoEdits-------");
          this.$toast.add({
            severity: "warn",
            summary: "ALERTA",
            detail: "Atencion Empleado Registrado",
            life: 10000,
          });
        })
        .catch((error) => {
          this.mensaje = error + "----NO SE GUARDO CAMPO  EN LA BASE DE DATOS";
          this.loading = false;
        });
    },
    closeMaximizable() {
      this.displayMaximizable = false;
      this.unidadMax = false;
      // console.log(this.empleado);
    },
    closeMaximizableUnidad() {
      this.unidadMax = false;
      // console.log(this.empleado);
    },
  },
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
