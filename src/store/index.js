import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    map: null,
    appState: "NOT_TRACKING",
    messages: [],
    latitude: 60.98,
    longitude: 25.66,
    followUser: true,
    polygons: L.layerGroup(),
    activePolygon: null
  },
  mutations: {
    INIT_LEAFLET(state, payload) {
      state.map = payload[0]
      state.polygons.addTo(state.map)
      state.latitude = payload[1].latitude
      state.longitude = payload[1].longitude
      state.map.panTo([state.latitude, state.longitude])
    },
    NEW_MESSAGE(state, message) {
      state.messages.push(message);
    },
    UPDATE_APP_STATE(state, appState) {
      state.appState = appState
    },
    SET_GEOLOCATION(state, location) {
      state.latitude = location.coords.latitude
      state.longitude = location.coords.longitude
    },
    SET_FOLLOWUSER(state) {
      state.followUser = !state.followUser
    },
    PUSH_LAYER(state, polygon) {
      state.polygons.addLayer(polygon)
    },
    ACTIVATE_POLYGON(state, target) {
      state.activePolygon = target
    },
    DO_POLYGON_EDIT_ACTION(state, action) {
      state.activePolygon.setStyle({
        color: '#0000ff'
      })      

      if(action === 'delete') {
        state.map.removeLayer(state.activePolygon)
      }

      state.activePolygon = null;
    }
  },
  actions: {
    createMap(state, payload) {
      state.commit('INIT_LEAFLET', payload)
    },
    changeAppState(state, payload) {
      state.commit('UPDATE_APP_STATE', payload)
    },
    addMessage(state, payload) {
      state.commit('NEW_MESSAGE', payload)
    },
    updateGeolocation(state, payload) {
      state.commit('SET_GEOLOCATION', payload)
    },
    toggleFollow(state) {
      state.commit('SET_FOLLOWUSER')
    },
    addLayer(state, payload) {
      let polygon = L.polygon(payload, {
        color: '#0000ff'
      })

      polygon.active = false

      polygon.addEventListener('click', (e) => {
        e.target.active = !e.target.active
        e.target.setStyle({
          color: '#00ff00'
        })

        state.commit('ACTIVATE_POLYGON', e.target)
      })

      state.commit('PUSH_LAYER', polygon)
    },
    removeLayerAction(state, payload) {
      state.commit('DO_POLYGON_EDIT_ACTION', payload)
    }
  }
})
