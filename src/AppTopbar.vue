<template>
<div class="card" v-if="sinUsu==1">
            
            <TabMenu :model="items" />
            <router-view/>
</div>
	<div class="layout-topbar" v-else-if="sinUsu==0">
		<button class="p-link layout-menu-button" @click="onMenuToggle">
			<span class="pi pi-bars"></span>
		</button>
        </div>
		<!-- <div class="layout-topbar-icons" v-else-if="sinUsu<0">
			<span class="layout-topbar-search">
				<InputText type="text" placeholder="Search" />
				<span class="layout-topbar-search-icon pi pi-search"></span>
			</span>
			<button class="p-link">
				<span class="layout-topbar-item-text">Notificaciones</span>
				<span class="layout-topbar-icon pi pi-calendar"></span>
				<span class="layout-topbar-badge">5</span>
			</button>   
			<button class="p-link">
				<span class="layout-topbar-item-text">Opciones</span>
				<span class="layout-topbar-icon pi pi-cog"></span>
			</button>
			<button class="p-link">
				<span class="layout-topbar-item-text">Usuario</span>
				<span class="layout-topbar-icon pi pi-user"></span>
			</button>
		</div> -->
	
</template>

<script>
export default {
	data() {
        return {
			sinUsu:0,
            items: [
                {
                    label: 'Inicio',
                    icon: 'pi pi-fw pi-home',
                    to: '/'
                },
                {
                    label: 'Clientes',
                    icon: 'pi pi-fw pi-users',
                    to: '/Clientes'
                },
                {
                    label: 'Empleados',
                    icon: 'pi pi-fw pi-pencil',
                    to: '/empleados'
                },
                {
                    label: 'Vacantes',
                    icon: 'pi pi-fw pi-id-card',
                    to: '/vacantes'
                },
                {
                    label: 'Rastreo',
                    icon: 'pi pi-fw pi-map-marker',
                    to: '/Rastreo'
                },
				{
                    label: 'Contacto',
                    icon: 'pi pi-fw pi-heart',
                    to: '/contacto'
                }
            ]
			}},
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        }
    }
}
</script>
<style scoped lang="scss">
::v-deep(.tabmenudemo-content) {
    padding: 2rem 1rem;
}
</style>