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
    polygons: L.layerGroup()
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
        color: '#2EC4B6'
      })
      state.commit('PUSH_LAYER', polygon)
    }
  }
})
