import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import Layout from '@/views/layouts/AppLayout.vue';

Vue.use(Router);

/**
 * TIPS:
 * meta: {
 *   hidden: false,    // If `hidden:true` will not appear in the navigation bar or sidebar(default is false)
 *   auth: [],         // It will control the page roles (you can set multiple roles)
 *   icon: 'home',     // Icon will appear in the navigation bar or sidebar
 *   hasMulSub: false, // It has multiple children
 * }
 */
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                hidden: true,
            },
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                hidden: true,
            },
        },
        {
            path: '/',
            redirect: { name: 'Dashboard' },
            meta: {
                hidden: true,
            },
        },
        {
            path: '/index',
            name: 'Index',
            component: Layout,
            redirect: { name: 'Dashboard' },
            meta: {
                hidden: false,
                hasMulSub: false,
            },
            children: [{
                    path: '/dashboard',
                    name: 'Dashboard',
                    component: () =>
                        import ('@/views/dashboard/TheIndex.vue'),
                    meta: {
                        icon: 'dashboard',
                    },
                },
                {
                    path: '/notice-boards',
                    name: 'Notice Boards',
                    component: () =>
                        import ('@/views/NoticeBoards/View.vue'),
                    meta: {
                        icon: 'dashboard',
                    },
                },
                {
                    path: '/leaves/create',
                    name: 'Create Leave',
                    component: () =>
                        import ('@/views/Leave/Create.vue'),
                    meta: {
                        icon: 'dashboard',
                    },
                }, {
                    path: '/notice-boards/details/:id',
                    name: 'Notice Board Details',
                    meta: {
                        hidden: true,
                    },
                    component: () =>
                        import ('@/views/NoticeBoards/Details.vue'),
                },
                {
                    path: '/leaves/view',
                    name: 'View Leave',
                    component: () =>
                        import ('@/views/Leave/ViewTable.vue'),
                    meta: {
                        icon: 'dashboard',
                    },
                }, {
                    path: '/leaves/view-details/:id',
                    meta: {
                        hidden: true,
                    },
                    component: () =>
                        import ('@/views/Leave/ViewTable.vue'),
                }
            ],
        },
        {
            path: '/404',
            meta: {
                hidden: true,
            },
            component: () =>
                import ('@/views/error-pages/App404.vue'),
        },
        {
            path: '*',
            redirect: '/404',
            meta: {
                hidden: true,
            },
        },
    ],
});