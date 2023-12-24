import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from './config'
import { token } from "../store";

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
    if (to.path === '/admin') {
        next()
        return
    }
    if (to.path !== '/home') {
        if (token.value === '') {
            next('/home')
        } else {
            next();
        }
    } else {
        next();
    }
})

export default router