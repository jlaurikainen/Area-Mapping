<template>
  <div id="app">
    <Map />
    <BeginTrackingControls v-show="appState === 'NOT_TRACKING'" />
    <div class="button-components">
      <ActiveControls v-show="appState === 'TRACKING'" />
      <PolygonControls v-show="activePolygon != null" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Map from '@/components/Map'
import ActiveControls from '@/components/ActiveControls'
import BeginTrackingControls from '@/components/BeginTrackingControls'
import PolygonControls from '@/components/PolygonControls'

export default {
  components: {
    Map,
    ActiveControls,
    BeginTrackingControls,
    PolygonControls
  },
  computed: {
    ...mapState([
      'appState',
      'polygons',
      'activePolygon'
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

.shadow-md {
  box-shadow: 0px 1px 8px rgba(0,0,0,0.35);
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

.button-components {
  position: absolute;
  bottom: 3rem;
  left: 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3rem;
  z-index: 1000;

  .button-row {
    display: flex;
    flex-direction: row;
    justify-content: center;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    button {
      padding: 1rem;
      border: 0px;
      border-radius: 5px;
      background: #011627;
      color: #2EC4B6;

      &.btn-neg {
        background: #E71D36;
        color: #011627;
      }

      &.btn-pos {
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
}
</style>