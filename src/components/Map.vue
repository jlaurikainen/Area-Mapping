<template>
  <div>
    <div id="map"></div>
    <div class="map-controls">
      <div class="toggler">
        <input type="checkbox" id="layer" v-model="displayLayer" @change="toggleMapLayerVisibility">
        <label for="layer">
          <i class="material-icons">layers</i>
        </label>
      </div>
      <div class="toggler" v-show="appState === 'TRACKING'">
        <input type="checkbox" id="follow" :checked="followUser" @change="toggleFollow">
        <label for="follow">
          <i class="material-icons">gps_fixed</i>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      displayLayer: false
    }
  },
  computed: {
    ...mapState([
      'appState',
      'map',
      'followUser'
    ])
  },
  methods: {
    ...mapActions([
      'createMap',
      'toggleFollow'
    ]),
    toggleMapLayerVisibility() {
      if(this.displayLayer) {
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(this.map)
      } else {
        this.map.eachLayer((layer) => {
          if(layer instanceof L.TileLayer) {
            layer.remove()
          }
        })
      }
    }
  },
  mounted() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.createMap([
        L.map('map', {
          center: [60.98, 25.66],
          attributionControl: false,
          zoom: 18,
          zoomControl: false,
          minZoom: 16,
          maxZoom: 18,
        }), position.coords
      ])
    })
  }
}
</script>

<style>

</style>