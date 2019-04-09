import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
// import 'highlight.js/styles/sunburst.css'
import '@/assets/sass/style.scss'

import StepLayout from '@/layouts/StepLayout.vue'

import Vuebar from 'vuebar'
import { particles } from 'pixi.js'
Vue.use(Vuebar)

Vue.config.productionTip = false

Vue.component('StepLayout', StepLayout)

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')

window.d3 = require('d3')


export class Testing extends particles.ParticleContainer {
  constructor(){
    super()
    console.log('ok then')
  }
}