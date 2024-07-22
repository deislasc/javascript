<template>
    <div class="p-col-6">
						<Button type="button" icon="pi pi-file-excel"  size="large" label="Generar Excel" @click="toggleDataTable" class="p-button-success" v-tooltip="'Click para generar Excel'"/>
						<OverlayPanel ref="op2" appendTo="body" :showCloseIcon="true" id="overlay_panel" :modal="true" style="width: 900px">
							<DataTable ref="dt" :value="Pintar2" :rowClass="rowClass" :paginator="true" :rows="5" >
								
					<Column  field="id1" header="Id" style="min-width:2rem"></Column>
					<Column field="descripcion1" header="Descripcion" style="min-width:6rem" ></Column>
					<Column  field="id2" header="IdC2" style="min-width:12rem"></Column>
					<Column  field="descripcion2" header="Descripcion2"  style="min-width:2rem"></Column>
					<Column  field="id3" header="IdC3" style="min-width:12rem"></Column>
					<Column  field="descripcion3" header="Descripcion3"  style="min-width:6rem"></Column>
							</DataTable>
						<Button label="Descargar" icon="pi pi-download" class="p-button-success" @click="exportCSV($event)"  />
						</OverlayPanel>

					</div>
</template>
<script>

export default ({
	props:{
		catalogos:Object
	},
    data() {
        return{
            catalogosT:null,
			Pintar2:[{
				id1:null,
				descripcion1:null,
				id2:null,
				descripcion2:null,
				id3:null,
				descripcion3:null
			}],
			cat1:[{
				id1:null,
				descripcion1:null,
			}],
			cat2:[{
				id2:null,
				descripcion2:null,
			}],
			cat3:[],

        }
    },
  
	async mounted() {
		this.loading = true;				
	},
    methods:{
        toggleDataTable(event) {
			this.PintarTabla();
				this.$refs.op2.toggle(event);
			},
exportCSV() {
			this.$refs.dt.exportCSV();
			
		},
		rowClass(data) {
            return data.id1 < 4000 ? 'row-accessories': null;
        },
		PintarTabla(){
			let h=-1;
			let p=-1;
			let t=-1;
			//let k=-1;
			for(let i=0;i<this.catalogos.length;i++){
				if(this.catalogos[i].id_categoria===0){
					p=p+1;
					this.cat1[p]={
						id1:this.catalogos[i].id,
						descripcion1:this.catalogos[i].descripcion
					};
				}else if(this.catalogos[i].id<3000000 && this.catalogos[i].id!=0){
					h=h+1;
					this.cat2[h]={
						id2:this.catalogos[i].id,
						idCategoria2:this.catalogos[i].id_categoria,
						descripcion2:this.catalogos[i].descripcion
					};
				}else if(this.catalogos[i].id<4000000 && this.catalogos[i].id>3000000){
					t=t+1;
					this.cat3[t]={
						id3:this.catalogos[i].id,
						idCategoria3:this.catalogos[i].id_categoria,
						descripcion3:this.catalogos[i].descripcion
					};
				}
			}
			
		let x=0;
		let k=0;
			for(let i=0; i<this.cat1.length;i++){
			let num_c2=0;
				for(let j=0; j<this.cat2.length;j++){
					if(this.cat1[i].id1===this.cat2[j].idCategoria2){
						num_c2=num_c2+1;
						k=k+1;
						let num_c3=0;
							for(let c3=0; c3<this.cat3.length;c3++){
								if(this.cat2[j].id2===this.cat3[c3].idCategoria3){				
									num_c3=num_c3+1
									x=x+1;
									this.Pintar2[x]={
											id1:this.cat1[i].id1,
											descripcion1:this.cat1[i].descripcion1,
											id2:this.cat2[j].id2,
											descripcion2:this.cat2[j].descripcion2,
											id3:this.cat3[c3].id3,
											descripcion3:this.cat3[c3].descripcion3	
									}
								}
							}
						if(num_c3===0){
								x=x+1;
									this.Pintar2[x]={
									id1:this.cat1[i].id1,
									descripcion1:this.cat1[i].descripcion1,
									id2:this.cat2[j].id2,
									descripcion2:this.cat2[j].descripcion2,
									id3:null,
									descripcion3:null
								}

						}	

						
						}
				}
			if(num_c2===0){
								x=x+1;
								this.Pintar2[x]={
								id1:this.cat1[i].id1,
								descripcion1:this.cat1[i].descripcion1,
								id2:null,
								descripcion2:null,
								id3:null,
								descripcion3:null
			}

		}
		}
	}
    }
}
)
</script>
<style scoped lang="scss">

::v-deep(.row-accessories) {
    background-color: rgba(255, 0, 0, 0.452) !important;
}
</style>