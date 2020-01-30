<template>
  <div class="drawing-controls">
    <button class="shadow-md" @click="addAreaPosition"><i class="material-icons">add_circle_outline</i></button>
    <button class="shadow-md" @click="cancelDrawing"><i class="material-icons">delete</i></button>
    <button class="shadow-md" @click="completeDrawing"><i class="material-icons">done</i></button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      areaTracked: false,
      trackedArea: L.layerGroup(),
      trackedAreaLine: L.polyline([], {color: 'black'})
    }
  },
  computed: {
    ...mapState([
      'map',
      'latitude',
      'longitude'
    ])
  },
  methods: {
    ...mapActions([
      'changeAppState',
      'addLayer'
    ]),
    addAreaPosition() {
      if(!this.areaTracked) {
        this.areaTracked = true
        this.trackedArea.addLayer(this.trackedAreaLine)
        this.trackedArea.addTo(this.map)
      }
      this.trackedAreaLine.addLatLng([this.latitude, this.longitude])

      this.trackedArea.addLayer(
        L.marker([this.latitude, this.longitude], {
          icon: L.icon({
            iconUrl: "./point-marker.png",
            iconSize: [24,24],
            iconAnchor: [12,12]
          })
        })
      )
    },
    cancelDrawing() {
      if(confirm("Cancel tracking?")) {
        this.trackedArea.eachLayer((layer) => {
          layer.remove()
        })

        this.trackedAreaLine.setLatLngs([])
        this.areaTracked = false
        this.changeAppState("NOT_TRACKING")
      }
    },
    completeDrawing() {
      if(confirm("Finish tracking area and save?")) {
        this.addLayer(this.trackedAreaLine.getLatLngs())

        this.trackedArea.eachLayer((layer) => {
          layer.remove()
        })

        this.trackedAreaLine.setLatLngs([])
        this.areaTracked = false
        this.changeAppState("NOT_TRACKING")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drawing-controls {
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 3rem;
  z-index: 1000;

  button {
    padding: 1rem;
    border: 0px;
    border-radius: 5px;
    background: #011627;
    color: #2EC4B6;

    &:nth-child(2) {
      background: #E71D36;
      color: #011627;
    }

    &:last-child {
      background: #2EC4B6;
      color: #011627;
    }

    &:not(:last-child) {
      margin-right: 1rem;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>