import { createRouter, createWebHistory } from 'vue-router'
import ToDo from '../views/ToDo'
import Login from '../views/Login'
import Register from '../views/Register'
import NotFound from '../views/404'

const routes =
    [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },

        {
            path: '/',
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