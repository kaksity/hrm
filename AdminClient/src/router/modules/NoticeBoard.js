const routes = {
    path: '/notice-boards',
    name: 'Notice Boards',
    component: {
        template: '<router-view></router-view>',
    },
    meta: {
        hasMulSub: true,
        hidden: false,
        icon: 'developer_board',
    },
    children: [{
            path: 'create',
            name: 'Create Notice',
            component: () =>
                import ('@/views/NoticeBoards/Create.vue'),
            meta: {
                icon: '',
            },
        },
        {
            path: 'view',
            name: 'View Notices',
            component: () =>
                import ('@/views/NoticeBoards/View.vue'),
            meta: {
                icon: '',
            },
        },
    ],
};
export default routes;