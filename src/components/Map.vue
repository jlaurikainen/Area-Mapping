<template>
  <div>
    <div id="map"></div>
    <div class="message" v-show="canAskPermission && permissionStatus != 'GRANTED'">
      <div class="text">
        <h2>Allow location?</h2>
        <p>This app requires location permission in order to function. Press "Allow" below to be prompted for permission.</p>
      </div>
      <div class="buttons">
        <button @click="cancelOut" class="btn btn-neg">Cancel</button>
        <button @click="askPermission" class="btn btn-pos">Allow</button>
      </div>
    </div>
    <div class="message" v-show="!canAskPermission">
      <div class="text">
        <h2>Location disallowed</h2>
        <p>This app requires location permission in order to function, but permission has not been allowed and cannot be prompted for. Please allow access to location manually from settings.</p>
      </div>
      <div class="buttons">
        <button @click="cancelOut" class="btn btn-neg">Close</button>
      </div>
    </div>
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
      displayLayer: false,
      permissionStatus: null,
      canAskPermission: true
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
      'toggleFollow',
      'addLayer'
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
    },
    askPermission() {
      cordova.plugins.diagnostic.requestRuntimePermission(status => {
        if(status != "GRANTED") {
          if(status === "DENIED_ALWAYS") {
            this.canAskPermission = false
          } else {
            return
          }
        } else {
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

          this.permissionStatus = status
        }
      }, error => {
          console.error(error);
      }, cordova.plugins.diagnostic.permission.ACCESS_FINE_LOCATION);
    },
    cancelOut() {
      console.log("called exit")
      if(confirm('Close app?')) {
        navigator.app.exitApp()
      }
    }
  },
  mounted() {
    document.addEventListener('deviceready', () => {
      cordova.plugins.diagnostic.getPermissionAuthorizationStatus(status => {
        switch(status) {
          case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            this.permissionStatus = status

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
            break;

          case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
            this.canAskPermission = true
            break;

          case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
            this.canAskPermission = true
            break;

          case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            this.canAskPermission = false
            break;
        }

        this.permissionStatus = status
      }, error => {
        console.log(error)
      }, cordova.plugins.diagnostic.permission.ACCESS_FINE_LOCATION)
    })

    this.addLayer(
      [
        [60.998650, 25.661795],
        [60.998689, 25.662605],
        [60.998544, 25.662642],
        [60.998510, 25.661812]
      ]
    )
  }
}
</script>

<style lang="scss" scoped>
.message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #011627;
  color: #fff;
  padding: 1rem;
  z-index: 999;
  border-radius: 5px;
  width: 80%;
  max-width: 280px;

  .text {
    h2, p {
      margin-bottom: 1rem;
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;

    button:focus {
      outline: none;
    }
  }
}
</style>