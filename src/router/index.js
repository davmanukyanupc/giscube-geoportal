import Vue from 'vue'
import Router from 'vue-router'

import GeoportalPanel from 'components/GeoportalPanel'
import PlacePanel from 'components/PlacePanel'

import config from '../config'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('layouts/GiscubeLayout.vue'),
    children: [
      ...config.toolRoutes,
      { path: 'place/:q*', component: PlacePanel, name: 'place' },
      { path: 'geoportal/:q/', component: GeoportalPanel }
    ]
  }
]

export default new Router({
  routes: routes
})
