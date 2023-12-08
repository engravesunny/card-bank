import { RouteRecordRaw, RouteComponent } from 'vue-router'

const Layout = () => import('../view/Layout/index.vue') as RouteComponent
const Home = () => import('../view/Home/index.vue') as RouteComponent

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'layout',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home
            }
        ]
    }
]