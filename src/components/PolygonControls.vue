<template>
  <div class="button-row">
    <button @click="removePolygon('delete')" class="shadow-md btn btn-neg"><i class="material-icons">delete</i></button>
    <button @click="removePolygon('cancel')" class="shadow-md btn btn-pos"><i class="material-icons">undo</i></button>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'

export default {
  computed: {
    ...mapState([
      'activePolygon'
    ])
  },
  methods: {
    ...mapActions([
      'removeLayerAction'
    ]),
    removePolygon(action) {
      if(action === 'delete') {
        if(confirm('Delete mapped area?')) {
          this.removeLayerAction(action)
        } else {
          action = 'cancel'
          this.removeLayerAction(action)
        }
      } else {
        this.removeLayerAction(action)
      }
    }
  }
}
</script>