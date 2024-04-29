import { createApp } from 'vue'
import App from './views/pages/App.vue'
import { BootstrapVueNext } from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import router from './router'


createApp(App).use(BootstrapVueNext).use(router).mount('#app')
