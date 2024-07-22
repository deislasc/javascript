<template>

<div class="card">
<Toolbar class="p-mb-4">
    <template #left>
   <Button label="Generar CFDI-INGRESO" icon="pi pi-bell" class="p-button-success" @click="AgregarCfdi()"  />
    </template>
</Toolbar>        
    </div>
    <Dialog header="CFDI INGRESO" v-model:visible="agregarCFDI" :breakpoints="{'960px': '75vw'}" :style="{width: '50vw'}" :maximizable="true" :modal="true">
    
            
            <Toolbar class="p-mb-4">
<template #left>
    
     <div class="p-fluid p-grid">
    <div class="field col-12 md:col-4">
                <label for="dateformat">Fecha Inicio:</label>
                <Calendar id="dateformat" v-model="fechaInicio"  dateFormat="dd-mm-yy" />
            </div>
            
            <h6> -AL- </h6>
            
            <div class="field col-12 md:col-4">
                <label for="dateformat">Fecha Fin:</label>
                <Calendar id="dateformat" v-model="fechaFin"  dateFormat="dd-mm-yy" />
                
            </div>
            <div class="field col-12 md:col-4">
                <br>
            <Button type="button" icon="pi pi-search" class="p-button-outlined p-mb-2" @click="FiltrarRutas()" v-tooltip="'Buscar'"/>
            <!--<Button type="button"  class="p-button-outlined p-mb-2" @click="compararFol()" v-tooltip="'Buscar'"/>-->
            </div>
     </div>        
                    </template>
				<template #right>
                   
                <!--<Button type="button" icon="pi pi-upload" :label="selectedProduct ? selectedProduct.name : 'Generar Excel'" @click="prueba" aria:haspopup="true" aria-controls="overlay_panel" class="p-button-success p-mr-2" />-->
            
						<div class="custom-input-file col-md-6 col-sm-6 col-xs-6">
						<input  class="input-file" type="file" name="xlfile" id="xlf" v-on:change="readExcel($event)" />Importar Excel
						</div>
                        </template>
				</Toolbar>
              <div class="p-fluid p-grid">
                  
                  
                  <DataTable ref="dls" :rowHover="true" :paginator="true" :value="rutasComplementarias" dataKey="empId"  responsiveLayout="scroll" :rows="5" :rowsPerPageOptions="[5,10,15]" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" >
                <Toolbar>
                    <template #left>
                        <Button type="button" label='Relacionar Unidades' class=" p-mb-2" @click="relacionarUnidades()" v-tooltip="'RelacionarUnidades'"/>

                    </template>
                    <template #right>
                        
                       <Button label="Generar Excel" icon="pi pi-upload" class="p-button-success" @click="exportCSV($event)"  />
                    </template>
                       
                  </Toolbar>
                <Column field="fecha" header="Fecha">
                </Column>
                <Column field="hora" header="Hora">
                
                </Column>
                <Column field="ruta" header="Ruta">
                
                </Column>
                
                <Column field="entity_id" header="Ruta Id">
                
                </Column>
                
                <Column field="nomTiendaMeli" header="MELI">
                
                </Column>
                <Column field="paquetes" header="Paquetes">
                
                </Column>
                <Column field="cost" header="Costo">
                
                </Column>
                <Column field="tipoServicio" header="Tipo Servicio">
                
                </Column>
                <Column field="empNombre" header="Nombre">
                
                </Column>
                <Column field="placas" header="Placas">
                
                </Column>
                <Column field="tipoUnidad" header="tipoUnidad">
                
                </Column>
                
                
                

                
            </DataTable>
                  <div class="p-field p-col-12 p-md-12">
                      <label>RUTAS ID</label>
                   <Textarea v-model="rutasId" rows="5" cols="30" />
                  </div>
                  <div class="p-field p-col-12 p-md-12">
                      <label>SHIPMENTS</label>
                   <Textarea v-model="shipments" rows="5" cols="30" />
                  </div>
                  <div class="p-field p-col-12 p-md-12">
                      <label>CFDI'S RELACIONADOS Total: {{uuidTabla.length}}</label>
                      <DataTable ref="dt" :rowHover="true" :paginator="true" :value="uuidTabla" dataKey="uuid"  responsiveLayout="scroll" :rows="5" :rowsPerPageOptions="[5,10,15]" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" >
                <Column field="uuid" header="Folio Fiscal">
                
                </Column>
                
            </DataTable>
                   
                  </div>
                <div class="p-field p-col-12 p-md-2">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-pencil"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="cfdi_Ingreso" type="text" v-model="cfdi_Ingreso.TipoDeComprobante" />
                            <label for="cfdi_Ingreso">Tipo</label>
                        </span>
                    </div>
                </div>
                    <div class="p-field p-col-12 p-md-2">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-pencil"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="cfdi_Ingreso" type="text" v-model="cfdi_Ingreso.Folio" />
                            <label for="cfdi_Ingreso">Folio</label>
                        </span>
                    </div>
                </div>
                <div class="p-field p-col-12 p-md-2">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-pencil"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="cfdi_Ingreso" type="text" v-model="cfdi_Ingreso.Serie" />
                            <label for="cfdi_Ingreso">Serie</label>
                        </span>
                    </div>
                </div>
                <div class="p-field p-col-12 p-md-2">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-pencil"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="cfdi_Ingreso" type="text" v-model="cfdi_Ingreso.MetodoPago" />
                            <label for="cfdi_Ingreso">MetodoPago</label>
                        </span>
                    </div>
                </div>
                <div class="p-field p-col-12 p-md-3">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-pencil"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="cfdi_Ingreso" type="text" v-model="cfdi_Ingreso.Descuento" />
                            <label for="cfdi_Ingreso">Descuento</label>
                        </span>
                    </div>
                </div>
                 <div class="p-field p-col-12 p-md-3">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-pencil"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="cfdi_Ingreso" type="text" v-model="cfdi_Ingreso.SubTotal" />
                            <label for="cfdi_Ingreso">SubTotal</label>
                        </span>
                    </div>
                </div>
                <div class="p-field p-col-12 p-md-3">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-pencil"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="cfdi_Ingreso" type="text" v-model="cfdi_Ingreso.Total" />
                            <label for="cfdi_Ingreso">Total</label>
                        </span>
                    </div>
                </div>
                <br>
                </div>
                
                <DataTable ref="dt" :value="emisor" dataKey="Rfc"  responsiveLayout="scroll" >
                <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
							<h3 class="p-m-0">Emisor</h3>
                                </div>
                <Column field="Rfc" header="Rfc">
                
                </Column>
                <Column field="Nombre" header="Nombre">
               
                </Column>
                <Column field="RegimenFiscal" header="RegimenFiscal">
                
                </Column>  
            </DataTable>
            <DataTable ref="dt" :value="receptor" dataKey="Rfc"  responsiveLayout="scroll" >
                <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
							<h3 class="p-m-0">Receptor</h3>
                                </div>
                <Column field="Rfc" header="Rfc">
                
                </Column>
                <Column field="Nombre" header="Nombre">
               
                </Column>
                <Column field="UsoCFDI" header="UsoCFDI">
                
                </Column>  
            </DataTable>
                <!--<DataTable ref="dt" :value="noValido" dataKey="id" responsiveLayout="scroll" >
                <Column field="UUID" header="UUID"></Column>
                <Column field="Folio" header="Folio"></Column>  
            </DataTable>-->
            <Toolbar>
                <template #right> 
                <Button icon="pi pi-plus" label="TRASLADO" class="p-button-rounded p-button-success p-button-outlined" @click="agregarTraslado()" />
            </template>
            </Toolbar>
            <br><br>
            <div class="p-fluid p-grid" v-if="mostrarBotton===true">
                <div class="p-field p-col-12 p-md-2">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-pencil"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="concepto" type="text" v-model="concepto.ClaveProdServ" />
                            <label for="concepto">ClaveProdServ</label>
                        </span>
                    </div>
                </div>
                <div class="p-field p-col-12 p-md-2">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-pencil"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="concepto" type="text" v-model="concepto.Unidad" />
                            <label for="concepto">Unidad</label>
                        </span>
                    </div>
                </div>
                <div class="p-field p-col-12 p-md-2">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-pencil"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="concepto" type="text" v-model="concepto.ClaveUnidad" />
                            <label for="concepto">ClaveUnidad</label>
                        </span>
                    </div>
                </div>
                <div class="p-field p-col-12 p-md-2">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-pencil"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="concepto" type="text" v-model="concepto.Cantidad" />
                            <label for="concepto">Cantidad</label>
                        </span>
                    </div>
                </div>
                <div class="p-field p-col-12 p-md-2">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-pencil"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="concepto" type="text" v-model="concepto.Descripcion" />
                            <label for="concepto">Descripcion</label>
                        </span>
                    </div>
                </div>
                <div class="p-field p-col-12 p-md-2">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-pencil"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="concepto" type="text" v-model="concepto.ValorUnitario" />
                            <label for="concepto">ValorUnitario</label>
                        </span>
                    </div>
                </div>
                    <div class="p-field p-col-12 p-md-2">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-pencil"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="concepto" type="text" v-model="concepto.Importe" />
                            <label for="concepto">Importe</label>
                        </span>
                    </div>
                </div>
                
                <div class="p-field p-col-12 p-md-2">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-pencil"></i>
                        </span>
                        <span class="p-float-label">
                            <InputText id="traslado" type="text" v-model="traslado.Base" />
                            <label for="traslado">Base</label>
                        </span>
                    </div>
                </div>
                
                <Button  label="Guardar" class="p-button-rounded p-button-success p-button-outlined" @click="guardarTraslado()" />
                <br>
                
                </div>
                <div class="p-fluid p-grid" >
                <Button icon="pi pi-bell" label="Timbrar CFDI" class="p-button-rounded p-button-success " @click="timbrarCFDIIngreso()" />
                </div>
                {{cfdi_Ingreso}}-->
             
                
        </Dialog>
</template>
<script>
import XLSX from '../../node_modules/xlsx/dist/xlsx.full.min.js';
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import CfdiTrasladoMeliServicio from '../service/CfdiTrasladoMeliServicio';
import RutasServicio from '../service/RutasServicio';
import AsignacionDiariaServicio from '../service/AsignacionDiariaServicio.js';
export default ({
    data(){
        return{
            asignacionDiariaService:null,
            asignacionD:null,
            emisor:[{
                   Rfc:"EKU9003173C9",
                   Nombre:"SERVICIOS AL SUPER BETA, S.A. DE C.V.",
                   RegimenFiscal:"601"
                }],
            receptor:[{
                   Rfc:"DCM991109KR2",
                    Nombre:"DEREMATE COM DE MEXICO",
                    NumRegIdTrib:null,
                    UsoCFDI:"G03"
                }],
                totalComplementario:null,
            rutasComplementarias:[{
                empId:null,
                empNombre:null,
                entity_id:null,
                ruta:null,
                fecha:null,
                hora:null,
                paquetes:null,
                nomTiendaMeli:null,
                placas:null,
                tipoServicio:null,
                tipoUnidad:null,

            }],
            uuidTabla:[],
            mostrarBotton:false,
            valido:[],
            noValido:[],
            rutasTimbradas:[],
            rutasFaltantes:[],
            UUID:[],
            folios:[],
            cfdiTrasladoMeliServicio:null,
            dataTimbrada:[],
            fech:[],
            agregarCFDI:false,
            empIds:[],
            rutasIdAr:[],
            rutasTotales:[],
            rutasServicio:null,
            rutas:[],
            shipments:'',
            rutasId:'',
            fechaInicio:null,
            fechaFin:null,
            
            traslado:[{
                             Base:null,
                             Importe:null,
                             Impuesto:"002",
                             TasaOCuota:"0.160000",
                             TipoFactor:"Tasa"     
                               }],
            concepto:{
                        Impuestos:{
                            Traslados:[]
                        },
                       InformacionAduanera:null,
                        CuentaPredial:null,
                        ComplementoConcepto:null,
                        Parte:null,
                        ClaveProdServ:"78102200",
                        Cantidad:null,
                        ClaveUnidad:"E48",
                        Unidad: "No aplica",
                        Descripcion: "Servicio de última Milla",
                        ValorUnitario:null,
                        Importe:null,
                        Descuento:null

                    },
            cfdi_Ingreso:{
                Complemento:null,
                Version:"3.3",
                Serie:"ML",
                Folio:null,
                Fecha:null,
                Sello:null,
                FormaPago:"99",
                Certificado:null,
                CondicionesDePago:null,
                SubTotal:null,
                Descuento:null,
                Moneda:"MXN",
                TipoDeComprobante:"I",
                Total:null,
                MetodoPago:"PPD",
                LugarExpedicion:"03800",
                Emisor:{
                   Rfc:"EKU9003173C9",
                   Nombre:"SERVICIOS AL SUPER BETA, S.A. DE C.V.",
                   RegimenFiscal:"601"
                },
                Receptor:{
                   Rfc:"DCM991109KR2",
                    Nombre:"DEREMATE COM DE MEXICO",
                    NumRegIdTrib:null,
                    UsoCFDI:"G03"
                },
                CfdiRelacionados:{
                    TipoRelacion:"06",
                    CfdiRelacionado:[],
                
                },
                Conceptos:[],
                Impuestos:{
            TotalImpuestosTrasladados:null,
        
        Traslados:[]},
        AddendaSpecified:true,
        Addenda:{
            any:[{
                Addenda:{
                   "@xmlns:Addenda":"http://www.Addenda/",
                   "@xsi:schemaLocation": "http://www.addenda.xsd",
                   "@version":"1.0",
                   "Addenda:Datos":{
                       "Addenda:rutasId":null,
                        "Addenda:shipments":null
                   }
                }
            }]
        }


            },
        
    
        }
    },
    async created(){
        this.asignacionDiariaService=new AsignacionDiariaServicio();
        this.rutasServicio=new RutasServicio();
        this.cfdiTrasladoMeliServicio=new CfdiTrasladoMeliServicio();
    this.initFilters1()
    },
    async mounted(){
         this.emisor[0]={
                   Rfc:"EKU9003173C9",
                   Nombre:"SERVICIOS AL SUPER BETA, S.A. DE C.V.",
                   RegimenFiscal:"601"
                },
       this.receptor[0]={
                   Rfc:"DCM991109KR2",
                    Nombre:"DEREMATE COM DE MEXICO",
                    NumRegIdTrib:null,
                    UsoCFDI:"G03"
                },
        this.inicio();    
    },
    methods:{
        timbrarCFDIIngreso(){
            this.cfdi_Ingreso.Conceptos.push(this.concepto);
            console.log(this.cfdi_Ingreso);
        },
        agregarTraslado(){
            this.mostrarBotton=true;
            this.traslado.Base=null;
            this.traslado.Importe=null;
            this.concepto.ValorUnitario=null;
            this.concepto.Importe=null;
            this.concepto.Cantidad=null;
            this.concepto.Descuento=null;

        }, 
        guardarTraslado(){
            this.mostrarBotton=false;
            this.concepto.Impuestos.Traslados.push(this.traslado);
            console.log(this.concepto);
        },
        AgregarCfdi(){
            this.agregarCFDI=true;
        },
        async FiltrarRutas(){
    //var fechaIn;
        let a=0;
        let o=-1;
        this.fech=[];
        this.fech[a]=('0' +this.fechaInicio.getDate()).slice(-2) + '-' + ('0' +(this.fechaInicio.getMonth() + 1)).slice(-2) + '-' +this.fechaInicio.getFullYear();
        while(this.fechaInicio.getTime()<this.fechaFin.getTime() ){
            a=a+1;
            this.fechaInicio.setDate(this.fechaInicio.getDate() +1);
            this.fech[a]=('0' +this.fechaInicio.getDate()).slice(-2) + '-' + ('0' +(this.fechaInicio.getMonth() + 1)).slice(-2) + '-' +this.fechaInicio.getFullYear();
            
               
}
console.log(this.fech);
console.log(this.fech.length);

for(let y=0;y<this.fech.length;y++){
    await this.rutasServicio.getRutasFech(this.fech[y]).then(data=>{this.rutas=data.data; 
       
        for(let i=0;i<this.rutas.length;i++){
            o=o+1;
            //console.log(this.rutas[i].entity_id);
            this.rutasTotales[o]=this.rutas[i];
            //this.rutasId=this.rutas[i].entity_id+','+this.rutasId;
            //this.rutasIdAr[o]=this.rutas[i].entity_id
            //this.shipments[o]=
            /*for(let j=0;j<this.rutas[i].shipments.length;j++){
                //console.log(this.rutas[i].shipments[j].entity_id);
                this.shipments=this.rutas[i].shipments[j].entity_id+','+this.shipments
            }*/
        }
        })

}
        //console.log(this.rutasIdAr);
      console.log(this.rutasTotales,"totales");
      
      this.cfdi_Ingreso={
                Complemento:null,
                Version:"3.3",
                Serie:"ML",
                Folio:"1",
                Fecha:null,
                Sello:null,
                FormaPago:"99",
                Certificado:null,
                CondicionesDePago:null,
                SubTotal:null,
                Descuento:null,
                Moneda:"MXN",
                TipoDeComprobante:"I",
                Total:null,
                MetodoPago:"PPD",
                LugarExpedicion:"03800",
                Emisor:{
                   Rfc:"EKU9003173C9",
                   Nombre:"SERVICIOS AL SUPER BETA, S.A. DE C.V.",
                   RegimenFiscal:"601"
                },
                Receptor:{
                   Rfc:"DCM991109KR2",
                    Nombre:"DEREMATE COM DE MEXICO",
                    NumRegIdTrib:null,
                    UsoCFDI:"G03"
                },
                CfdiRelacionados:{
                    TipoRelacion:"06",
                    CfdiRelacionado:[],
                Conceptos:[
                    {
                        Impuestos:{
                            Traslados:[
                               {
                             Base:null,
                             Importe:null,
                             Impuesto:"002",
                             TasaOCuota:"0.160000",
                             TipoFactor:"Tasa"     
                               } 
                            ]
                        },
                       InformacionAduanera:null,
                        CuentaPredial:null,
                        ComplementoConcepto:null,
                        Parte:null,
                        ClaveProdServ:"78102200",
                        Cantidad:null,
                        ClaveUnidad:"E48",
                        Unidad: "No aplica",
                        Descripcion: "Servicio de última Milla",
                        ValorUnitario:null,
                        Importe:null,
                        Descuento:null

                    }
                ]
                },
                Impuestos:{
            TotalImpuestosTrasladados:null,
        },
        Traslados:[{
            Importe:null,
            Impuesto:"002",
            TasaOCuota:"0.160000",
            TipoFactor:"Tasa"
        }],
        AddendaSpecified:true,
        Addenda:{
            any:[{
                Addenda:{
                   "@xmlns:Addenda":"http://www.Addenda/",
                   "@xsi:schemaLocation": "http://www.addenda.xsd",
                   "@version":"1.0",
                   "Addenda:Datos":{
                       "Addenda:rutasId":this.rutasId,
                        "Addenda:shipments":this.shipments
                   }
                }
            }]
        }


            };console.log(this.cfdi_Ingreso);
     /* for(let ini=0;ini<this.rutasIdAr.length;ini++){
          await this.cfdiTrasladoMeliServicio.getFolioFis(this.rutasIdAr[ini]).then(data=>{
              //console.log(data.data.uuid);
              this.UUID=[{
          UIID:data.data.uuid
      }];
              this.cfdi_Ingreso[0].CfdiRelacionados.CfdiRelacionado.push(this.UUID);
              
              //console.log(this.dataTimbrada);
          })
      }*/
    
      
      //this.cfdi_Ingreso[0].CfdiRelacionados.CfdiRelacionado.push(this.UUID);
      //this.cfdi_Ingreso[0].CfdiRelacionados.CfdiRelacionado.push("UIID:hola");
      //this.cfdi_Ingreso[0].CfdiRelacionados.CfdiRelacionado.push("UIID:hola");
      //this.cfdi_Ingreso[0].CfdiRelacionados.CfdiRelacionado.push("UIID:hola");
      console.log(this.cfdi_Ingreso);
        //console.log(this.cfdi_Ingreso[0].CfdiRelacionados.CfdiRelacionado[1].UUID);
        //var k=-1;
        
        },
       async compararFol(){
           //let a=-1;
 for(let j=0;j<this.rutasTotales.length;j++){
    await this.cfdiTrasladoMeliServicio.getFolioFis(this.rutasTotales[j].entity_id).then(data=>{
         //a=a+1;
         //console.log(a);
         this.folios.push(data.data.uuid);
     });

 }console.log(this.folios);
        },
       async readExcel (e) {
  const file = e.target.files[0]
  /* Boilerplate to set up FileReader */
  const reader = new FileReader()
  reader.onload = (e) => {
    /* Parse data */
    const bstr = e.target.result
    const wb = XLSX.read(bstr, { type: 'binary' })
    /* Get first worksheet */
    const wsname1 = wb.SheetNames[0]
	const wsname2 = wb.SheetNames[1]
	const wsname3 = wb.SheetNames[2]
	const ws1 = wb.Sheets[wsname1]
    const ws2 = wb.Sheets[wsname2]
	const ws3 = wb.Sheets[wsname3]
    /* Convert array of arrays */
	const data1 = XLSX.utils.sheet_to_row_object_array(ws1)
    const data2 = XLSX.utils.sheet_to_row_object_array(ws2)
	const data3 = XLSX.utils.sheet_to_row_object_array(ws3)

	
    /* Update state */
    this.data1 = data1;
	//let a="hola";
	//const bcrypt = require("bcryptjs");
// Primero vamos a hashear la contraseña
// Entre más rondas, mejor protección, pero más consumo de recursos. 10 está bien
//const rondasDeSal = 10;


	/*for(let i=0; i<this.data1.length;i++){
		
		bcrypt.hash(this.data1[i].contraseña, rondasDeSal, (err, palabraSecretaEncriptada) => {
	if (err) {
		//console.log("Error hasheando:", err);
		
	} else {
		console.log("Y hasheada es: " + palabraSecretaEncriptada);
        
		this.empleado={
            id:null,
            empId:this.data1[i].usuario,
            email:this.data1[i].CorreoElectronico,
            password:palabraSecretaEncriptada,
            status:'A',
            nombre:this.data1[i].nombre + ' '+this.data1[i].ApellidoPaterno+' '+this.data1[i].ApellidoMaterno,
            empCodTarjeta:null,
            clienteId:null,
            tiendaSucursal:this.data1[i].Formato+ ' '+this.data1[i].Sucursal
        };
		console.log(this.empleado,'aqui');
        this.empleadosServicio.save(this.empleado).then(data => {console.log(data);}).catch(error => {
        this.mensaje=error+'----NO SE GUARDO CAMPO  EN LA BASE DE DATOS';
      });
	}
});
		
	
	}*/
	//let con,sin,li=-1;};
    let con=0;
    let int=0;
    let initi=-1;
	this.data2 = data2;
	this.data3 = data3;  	
   console.log(this.data1);
   console.log(this.data2);
   console.log(this.data3);
   console.log(this.rutasTotales);
   
   for(let a=0;a<this.data1.length;a++){
       con=0;
       //con=-1;
       //console.log(this.data1[a]);
      /* sin=-1;
       for(let y=0;y<this.folios.length;y++){
           if(this.data1[a].UUID===this.folios[y]){
               con=con+1;
               console.log(this.data1[a].UUID);
               this.valido.push(this.data1[a].UUID);
           }else {
               sin=sin+1;
               
              

           }
           
       }
       if(sin===727){
           li=li+1;
this.noValido.push(this.data1[a]);

               }console.log(sin,li);*/
               //con=0;
      for(let j=0;j<this.rutasTotales.length;j++){
           //console.log(this.rutasTotales[j].entity_id,"rutasTotales");
           
           if(this.data1[a].idRuta===this.rutasTotales[j].entity_id){
               
               this.rutasTimbradas.push(this.rutasTotales[j]);
              //console.log(j,'j');
              con=0;

           }
           else{
               
               con=con+1;
               
              
if(con===this.rutasTotales.length){
    console.log( this.data1[a],'data[!A');
}

           }
           
       }//console.log(con,"con");
   }
for(let ki=0;ki<this.rutasTotales.length;ki++){
    int=0;
for(let aj=0;aj<this.rutasTimbradas.length;aj++){
     
if(this.rutasTotales[ki].entity_id!=this.rutasTimbradas[aj].entity_id){
                   int=int+1;
                  // console.log(int);
                   if(int===this.rutasTimbradas.length){
                       initi=initi+1;
                       //console.log(this.rutasTotales[ki]);
                       
                this.rutasComplementarias[initi]={
                empId:this.rutasTotales[ki].empId,
                empNombre:this.rutasTotales[ki].empNombre,
                entity_id:this.rutasTotales[ki].entity_id,
                ruta:this.rutasTotales[ki].ruta,
                fecha:this.rutasTotales[ki].fecha,
                hora:this.rutasTotales[ki].hora,
                paquetes:this.rutasTotales[ki].shipments.length,
                nomTiendaMeli:this.rutasTotales[ki].nomTiendaMeli,
                tipoServicio:this.rutasTotales[ki].tipoServicio,
                placas:null,
                tipoUnidad:null,

                       }
                       this.totalComplementario=this.totalComplementario+this.rutasTotales[ki].cost;
                   }
                   //
                   //
               }
     }
    

}
   
   //console.log(this.valido,"valido");
   //console.log(this.noValido,"Novalido");
   console.log(this.rutasTimbradas,"this.rutasTimbradas");
   console.log(this.rutasComplementarias,"rutasComplementarias");
   console.log(this.totalComplementario,"totalComplementario");
   let la=-1;
   for(let ini=0;ini<this.rutasTimbradas.length;ini++){
          this.cfdiTrasladoMeliServicio.getFolioFis(this.rutasTimbradas[ini].entity_id).then(data=>{
              console.log(data.data.uuid,this.rutasTimbradas[ini].entity_id);
              la=la+1;
              this.uuidTabla[la]=data.data;
              this.UUID={
          UUID:data.data.uuid
      };
              this.cfdi_Ingreso.CfdiRelacionados.CfdiRelacionado.push(this.UUID);
              
              
          });
      }
      console.log(this.rutasTimbradas);
      for(let tim=0;tim<this.rutasTimbradas.length;tim++){
          this.rutasId=this.rutasTimbradas[tim].entity_id+','+this.rutasId;
          for(let ji=0;ji<this.rutasTimbradas[tim].shipments.length;ji++){
                //console.log(this.rutasTimbradas,"timbradas");
                this.shipments=this.rutasTimbradas[tim].shipments[ji].id+','+this.shipments
            }
      }
      
      this.cfdi_Ingreso={
                Complemento:null,
                Version:"3.3",
                Serie:"ML",
                Folio:"1",
                Fecha:null,
                Sello:null,
                FormaPago:"99",
                Certificado:null,
                CondicionesDePago:null,
                SubTotal:null,
                Descuento:null,
                Moneda:"MXN",
                TipoDeComprobante:"I",
                Total:null,
                MetodoPago:"PPD",
                LugarExpedicion:"03800",
                Emisor:{
                   Rfc:"EKU9003173C9",
                   Nombre:"SERVICIOS AL SUPER BETA, S.A. DE C.V.",
                   RegimenFiscal:"601"
                },
                Receptor:{
                   Rfc:"DCM991109KR2",
                    Nombre:"DEREMATE COM DE MEXICO",
                    NumRegIdTrib:null,
                    UsoCFDI:"G03"
                },
                CfdiRelacionados:{
                    TipoRelacion:"06",
                    CfdiRelacionado:[],
                Conceptos:[]
                },
                Impuestos:{
            TotalImpuestosTrasladados:null,
        },
        Traslados:[],
        AddendaSpecified:true,
        Addenda:{
            any:[{
                Addenda:{
                   "@xmlns:Addenda":"http://www.Addenda/",
                   "@xsi:schemaLocation": "http://www.addenda.xsd",
                   "@version":"1.0",
                   "Addenda:Datos":{
                       "Addenda:rutasId":this.rutasId,
                        "Addenda:shipments":this.shipments
                   }
                }
            }]
        }


            };
    //const header = data.shift()
  }
  //console.log(this.data);
  reader.readAsBinaryString(file)

},
        async inicio(){
        //let empId;
        this.reporteSemanal=[];
        var hoy = new Date();
        var dia= hoy.getDate()+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear();
        
        console.log(dia);
       // empId=localStorage.usuario;
        //console.log(empId);

        
       
        },
        toggle(event) {
            this.$refs.op.toggle(event);
           
        },
        toggleDos(event){
            this.$refs.oc.toggle(event);
            
        },
      async  actualizar(){
          
await this.asistenciaServicio.getAllAsistencia().then(data=>{this.asistencianov=data.data;this.loading=false;});

        },
        Info(operador){
            this.operador = {...operador};
            for(let i=0; i<this.empleadoInfoAdicional.length;i++){
                    if(this.empleadoInfoAdicional[i].empId===this.operador.empId)
                    {
                        let j=0;
                        this.tablaIndividual[j]=this.empleadoInfoAdicional[i];
                    }
            }
            this.contar();
          this.operadorDialog = true;
        },
        initFilters1() {
				this.filters1 = {
					'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
					'empId':{operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
					'dia':{operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
                    'nombre':{operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
                    'tiendaSucursal':{operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]}
					//'activity': {value: null, matchMode: FilterMatchMode.BETWEEN},
					//'verified': {value: null, matchMode: FilterMatchMode.EQUALS}
				}
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

        exportCSV(){
this.$refs.dls.exportCSV();
        },
       
stockClass(data) {
            return [
                {
                    'LISTO': data.estatusActual=='LISTO',
                   'CARGANDO': data.estatusActual==='CARGANDO',
                   'ENRUTA': data.estatusActual ==='ENRUTA',
                   'ENTREGADO':data.estatusActual ==='ENTREGADO',
                   'COBRO':data.estatusActual ==='COBRO',
                   'SINCARGAR':data.estatusActual ==='SINCARGAR'
                 }
            ];
        },
 onProductSelect(event) {
            this.$refs.op.hide();
           console.log(event.data);
            
            
            //this.empleadoRec.pedidoIdSucursal=this.indiceRec=data.pedidoIdSucursal;

            
        },

        
async relacionarUnidades(){
     for(let r=0;this.rutasComplementarias.length;r++){
      await this.asignacionDiariaService.getDiaEmpId(this.rutasComplementarias[r].empId,this.rutasComplementarias[r].fecha).then(data=>{
           this.rutasComplementarias[r].placas=data.data.placas;
           this.rutasComplementarias[r].tipoUnidad=data.data.tipo; 
           //console.log(data.data);
       });
   }
 },
 contar(){
    let camionetas=-1;
    let sedan=-1;
    for(let f=0;f<this.reporteAsistencia.length;f++){
        //console.log('datos');
        if(this.reporteAsistencia[f].unidad!=null){
camionetas=camionetas+1;
        }else{
sedan=sedan+1;
        }
        
    }
   // console.log(camionetas,'camionetas');
    //console.log(sedan,'sedan');
}
      }

})
</script>
<style scoped>
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
/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 4px 8px 0 #fbfbfb;
}
.LISTO {
    font-weight: 700;
    color: #008cff;
    
}
.SINCARGAR{
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
.ENTREGADO{
    font-weight: 700;
    color: #58af54;
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
.product-image {
    width: 200px;
    height:200px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}
</style>
