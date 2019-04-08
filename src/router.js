
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


import TemplateMode from '@/views/TemplateMode.vue'
import CanvasMode from '@/views/CanvasMode.vue'
import WebglMode from '@/views/WebglMode.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path:      '/',
      name:      'home',
      component: Home
    },
    {
      path:      '/template',
      name:      'template',
      component: TemplateMode
    },
    {
      path:      '/canvas',
      name:      'canvas',
      component: CanvasMode
    },
    {
      path:      '/webgl',
      name:      'webgl',
      component: WebglMode
    }
  ]
})
