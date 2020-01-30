import Vue from 'vue'
import App from './App.vue'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'material-design-icons/iconfont/material-icons.css'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(Leaflet)
