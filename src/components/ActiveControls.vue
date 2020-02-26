<template>
  <div class="button-row">
    <button class="shadow-md" @click="addAreaPosition"><i class="material-icons">add_circle_outline</i></button>
    <button class="shadow-md btn-neg" @click="cancelDrawing"><i class="material-icons">delete</i></button>
    <button class="shadow-md btn-pos" @click="completeDrawing"><i class="material-icons">done</i></button>
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
      'addLayer',
      'toggleFollow'
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