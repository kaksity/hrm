const routes = {
    path: '/leaves-applications',
    name: 'Leaves Applications',
    component: {
        template: '<router-view></router-view>',
    },
    meta: {
        hasMulSub: true,
        hidden: false,
        icon: 'developer_board',
    },
    children: [{
            path: 'pending',
            name: 'Pending',
            component: () =>
                import ('@/views/LeaveApplications/Pending.vue'),
            meta: {
                icon: '',
            },
        },
        {
            path: 'approved',
            name: 'Approved',
            component: () =>
                import ('@/views/LeaveApplications/Approved.vue'),
            meta: {
                icon: '',
            },
        },
        {
            path: 'rejected',
            name: 'Rejected',
            component: () =>
                import ('@/views/LeaveApplications/Rejected.vue'),
            meta: {
                icon: '',
            },
        },
    ],
};
export default routes;