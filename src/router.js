import { createRouter, createWebHashHistory } from 'vue-router';



const routes = [{
        path: '/',
        name: 'Menu',
        component: () =>
            import ('./components/Menu.vue'),
    },
    {
        path: '/ControlRutasMeli',
        name: 'ControlRutasMeli',
        component: () =>
            import ('./pages/ControlRutasMeli.vue'),
    },
    {
        path: '/ControlProveedorPowerDriver',
        name: 'ControlProveedorPowerDriver',
        component: () =>
            import ('./pages/ControlProveedorPowerDriver.vue'),
    },
    {
        path: '/ControlRutasOtros',
        name: 'ControlRutasOtros',
        component: () =>
            import ('./pages/ControlRutasOtros.vue'),
    },
    {
        path: '/ControlProceso',
        name: 'ControlProceso',
        component: () =>
            import ('./pages/ControlProceso.vue'),
    },
    {
        path: '/ControlAsistencia',
        name: 'ControlAsistencia',
        component: () =>
            import ('./pages/ControlAsistencia.vue'),
    },
    {
        path:'/ControlAltaEmpleados',
        name:'ControlAltaEmpleados',
        component:()=>
            import('./pages/ControlAltaEmpleados.vue'),
    },
    {
        path:'/ControlAsignaciones',
        name:'ControlAsignaciones',
        component:()=>
            import('./pages/ControlAsignaciones.vue'),
    },
    {
        path:'/CfdiIngreso',
        name:'CfdiIngreso',
        component:()=>
            import('./pages/CfdiIngreso.vue'),
    },
    {
        path:'/ControlCasaLey',
        name:'ControlCasaLey',
        component:()=>
            import('./pages/ControlCasaLey.vue'),
    },
    
    {
        path: '/excel',
        name: 'excel',
        component: () =>
            import ('./components/TablaExcel.vue'),
    },
    {
        path: '/ControlAltaEmpleados/datosGenerales',
        name: 'Datos Generales',
        component: () =>
            import ('./pages/ControlCasaLey.vue'),
    },
    {
        path: '/catalogos',
        name: 'Catalogos',
        component: () =>
            import ('./pages/Catalogos.vue'),
    }
    

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;