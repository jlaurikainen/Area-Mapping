<template>
  <div id="app">
    <Map />
    <BeginTrackingControls v-show="appState === 'NOT_TRACKING'" />
    <ActiveControls v-show="appState === 'TRACKING'" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Map from '@/components/Map'
import ActiveControls from '@/components/ActiveControls'
import BeginTrackingControls from '@/components/BeginTrackingControls'

export default {
  components: {
    Map,
    ActiveControls,
    BeginTrackingControls
  },
  computed: {
    ...mapState([
      'appState'
    ])
  }
}
</script>

<style lang="scss">
:root {
  font-size: 14px;
}

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: sans-serif;
}

#map {
  height: 100vh;
  width: 100vw;
}

.shadow-sm {

}

.shadow-md {
  box-shadow: 0px 1px 8px rgba(0,0,0,0.35);
}

.shadow-lg {

}

.map-controls {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1000;

  .toggler {
    padding: 1rem;

    input {
      display: none;

      &:checked ~ label i{
        color: #011627;
      }

      &:not(:checked) ~ label i{
        color: rgba(0,0,0,0.25);
      }

      &:focus {
        outline: none;
      }
    }
  }
}
</style>