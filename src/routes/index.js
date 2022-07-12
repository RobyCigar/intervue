import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'

const routes = [
    { path: '/', component: Home, name: 'Home', meta: { auth: true } },
    { path: '/login', component: Login, name: 'Login', meta: { auth: false } },
]

const router = createRouter({
    history: createWebHistory(),
    routes, 
})

router.beforeEach((to, from, next) => {
    const isLogged = localStorage.getItem('token')
    
    if (to.name !== 'Login' && !isLogged) {
        router.push({ name: "Login" })
    } else if(to.name === "Login" && isLogged) {
        router.push({ name: "Home" })
    }
 
    next()
})


export default router;