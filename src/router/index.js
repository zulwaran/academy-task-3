import { createRouter, createWebHistory } from 'vue-router'
import ToDo from '../views/ToDo'
import Login from '../views/Login'
import NotFound from '../views/404'

const routes =
    [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/ToDo',
            name: 'ToDo',
            component: ToDo
        },
        {
            path: "/:catchAll(.*)",
            name: "NotFound",
            component: NotFound,
            meta: {
                requiresAuth: false
            }
        }

    ]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router