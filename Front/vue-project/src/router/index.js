import {createRouter, createWebHistory} from 'vue-router';

import Home from "../views/pages/Home.vue"
import Login from "../views/pages/Login.vue"
import NotFound from "../views/pages/NotFound.vue"
import SinglePost from "../views/pages/SinglePost.vue"
import profile from "../views/pages/Profile.vue"
import register from "../views/pages/register.vue"
import Dashboard from "../views/pages/Dashboard.vue"
import SearchResults from "../views/components/SearchResults.vue"
import MakePost from "../views/components/MakePost.vue"
import EditPost from "../views/components/EditPost.vue"
import {auth} from "../router/auth.js"

const routes = [
    {path:"/", component: Home},
    {path: "/login", component: Login},
    {path: "/posts/:post_id", component: SinglePost},
    {path: "/dashboard", component:Dashboard, beforeEnter: auth.ifAuthenticated},
    {path: "/profile", component: profile, beforeEnter: auth.ifAuthenticated},
    {path: "/register", component: register,},
    {path: "/:pathMatch(.*)*", component: NotFound },
    {path: "/search-results", component:SearchResults, props: true, name:"SearchResults"},
    {path: "/make-post", component: MakePost, props: true, name:"MakePost", beforeEnter: auth.ifAuthenticated},
    {path: "/editpost", component: EditPost, beforeEnter:auth.ifAuthenticated}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;