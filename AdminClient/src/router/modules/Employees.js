const routes = {
    path: '/employees',
    name: 'Employees',
    component: {
        template: '<router-view></router-view>',
    },
    meta: {
        hasMulSub: true,
        hidden: false,
        icon: 'bar_chart',
    },
    children: [{
            path: 'create',
            name: 'Create',
            component: () =>
                import ('@/views/Employees/Create.vue'),
            meta: {},
        },
        {
            path: 'view',
            name: 'View',
            component: () =>
                import ('@/views/Employees/View.vue'),
            meta: {},
        },
    ],
};

export default routes;
