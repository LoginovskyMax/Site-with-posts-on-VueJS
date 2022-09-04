
import { createRouter, createWebHashHistory} from "vue-router"
import PropsVue from '@/views/PropsVue.vue'
import VuexVue from '@/views/VuexVue.vue'
import CompsitionApi from '@/views/CompositionAPI.vue'

const routes = [
    {
        path:'/',
        component:PropsVue
    },
    {
        path:'/vuex',
        component:VuexVue
    },
    {
        path:'/API',
        component:CompsitionApi
    }
]
const router = createRouter({
routes,
history: createWebHashHistory(process.env.BASE_URL)
}
)
export default router