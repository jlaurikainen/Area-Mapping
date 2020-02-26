<template>
  <div class="tracking-controls">
    <button @click="beginTracking"><i class="material-icons">border_style</i>Track Area</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      marker: null,
      geolocationMaximumAge: 0,
      geolocationTimeout: 15000,
      geolocationEnableHighAccuracy: true
    }
  },
  computed: {
    ...mapState([
      'map',
      'latitude',
      'longitude',
      'followUser'
    ])
  },
  methods: {
    ...mapActions([
      'changeAppState',
      'updateGeolocation'
    ]),
    beginTracking() {
      if(navigator.geolocation) {
        this.changeAppState('TRACKING')

        navigator.geolocation.watchPosition(this.onGeolocationSuccess, null, {
          maximumAge: this.geolocationMaximumAge,
          timeout: this.geolocationTimeout,
          enableHighAccuracy: this.geolocationEnableHighAccuracy
        })
      }
    },
    onGeolocationSuccess(position) {
      this.updateGeolocation(position)

      if(this.marker === null) {
        this.marker = L.marker([this.latitude, this.longitude], {
          icon: L.icon({
            iconUrl: "./map-marker.png",
            iconSize: [25,25],
            iconAnchor: [12,25]
          })
        })
        this.marker.addTo(this.map)
      }

      this.marker.setLatLng([this.latitude, this.longitude])

      if(this.followUser) {
        this.map.panTo([this.latitude, this.longitude], {animate: true})
      }
    }
  }
}
</script>

<style lang="scss">
.tracking-controls {
  display: flex;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  z-index: 1000;

  button {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    border: 0px;
    background: #011627;
    color: #2EC4B6;
    text-transform: uppercase;

    &:first-child {
      border-right: 1px solid rgba(0,0,0,0.1)
    }

    &:focus {
      outline: none;
    }

    i {
      margin-right: 0.5rem;
    }
  }
}
</style>