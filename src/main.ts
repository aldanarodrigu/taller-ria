import { createApp } from 'vue'
import VueParticles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'

import App from './App.vue'
import router from './router'
import { pinia } from './stores'
import './main.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueParticles, {
  init: async (engine: Engine) => {
    await loadSlim(engine)
  },
})

app.mount('#app')
