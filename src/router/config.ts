import { RouteRecordRaw, RouteComponent } from 'vue-router'

const Layout = () => import('../view/Layout/index.vue') as RouteComponent
const Home = () => import('../view/Home/index.vue') as RouteComponent
const Service = () => import('../view/Service/index.vue') as RouteComponent
const Admin = () => import('../view/Admin/index.vue') as RouteComponent

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
            },
            {
                path: '/service',
                name: 'service',
                component: Service
            }
        ]
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin
    }
]