import { RouteComponent, RouteRecordRaw, Router, createRouter, createWebHistory } from 'vue-router';
import { RouteNames, RouteUrls } from '@/@enums';

type RouteView = Promise<RouteComponent>;

const main: () => RouteView = () => import('@/views/Main.vue');

const routes: RouteRecordRaw[] = [
    {
        path: RouteUrls.MAIN,
        name: RouteNames.MAIN,
        component: main,
        meta: { title: 'pages.insights' },
    },
    {
        path: RouteUrls.NOT_FOUND,
        name: RouteNames.NOT_FOUND,
        redirect: () => RouteUrls.MAIN,
    },
];

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
