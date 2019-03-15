import Options from './options.js'

class Config extends Options {
  get toolRoutes () {
    let defaultTool = null
    const routes = Object.keys(this.tools)
      .filter(toolName => this.tools[toolName].panel)
      .map(toolName => {
        const tool = this.tools[toolName]

        const route = {}
        route.name = toolName
        route.path = toolName + '/'
        route.component = tool.panel

        if (tool.default) {
          if (defaultTool) {
            console.error('Multiple default tools')
          } else {
            defaultTool = toolName
          }
        }
        return route
      })

    if (defaultTool) {
      routes.unshift({ path: '', redirect: { name: defaultTool } })
    }
    return routes
  }
}

export default new Config({
  layout: {
    header: () => import('components/AppHeader.vue'),
    geoportalMap: () => import('components/GeoportalMap.vue'),
    printHeader: () => import('components/PrintHeader.vue'),

    headerToolbar: [
      'home',
      'search',
      'catalog',
      'contact',
      'measure',
      'print',
      '----------',
      'fullscreen'
    ]
  },
  tools: {
    catalog: {
      icon: 'ion-compass',
      to: 'catalog',
      panel: () => import('components/CatalogPanel.vue')
    },
    contact: {
      icon: 'email',
      to: 'contact',
      panel: () => import('components/ContactPanel.vue')
    },
    fullscreen: {
      conditional () {
        return this.$q.fullscreen.isCapable
      },
      icon () {
        return this.$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'
      },
      action () {
        this.$q.fullscreen.toggle()
      }
    },
    home: {
      icon: 'home',
      to: 'home',
      panel: () => import('components/HomePanel.vue'),
      default: true
    },
    measure: {
      icon: 'mdi-ruler',
      to: 'measure',
      panel: () => import('components/MeasurePanel.vue')
    },
    print: {
      icon: 'print',
      emit: 'print'
    },
    search: {
      icon: 'search',
      to: 'search',
      panel: () => import('components/SearchPanel.vue')
    }
  },
  catalog: {
    'categories': 'https://mapes.salt.cat/apps/giscube-admin/api/v1/giscube/category/',
    'search': 'https://mapes.salt.cat/apps/giscube-admin/geoportal/catalog/'
  },
  home: {
    'zoom': 15,
    'center': {
      'lat': 41.973,
      'lng': 2.780
    }
  },
  searches: [
    // {
    //   'name': 'geoportal',
    //   'title': 'Geoportal search',
    //   'url': 'http://www.giscube.org/apps/giscube/geoportal/search/'
    // },
    {
      'name': 'place',
      'title': 'General search',
      'is_geojson': true,
      'url': 'https://mapes.salt.cat/apps/cercador/cercar/'
    }
  ],
  basemaps: [
    {
      default: true,
      type: 'tilelayer',
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    },
    {
      default: false,
      type: 'tilelayer',
      name: 'OpenTopoMap',
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      maxZoom: 19
    },
    {
      default: false,
      type: 'tilelayer',
      name: 'Stamen TonerLite',
      url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}',
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png'
    }
  ]
})
