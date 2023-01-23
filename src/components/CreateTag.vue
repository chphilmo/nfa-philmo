<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>
      <b-icon icon="plus"></b-icon>
    </b-button>

    <b-modal id="modal-prevent-closing" ref="modal" title="Update String" @show="resetModal"
      @hidden="resetModal" @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="String" label-for="value-input">
          <b-form-input id="value-input" v-model="value" required></b-form-input>
        </b-form-group>

      </form>
    </b-modal>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'CreateTag',
  props : ['field'],
  data() {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState('auth.module', {
      currentUser: (state) => state.user
    }),

  },
  methods: {

    resetModal() {
    
        this.value = ''
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (this.value === '') {
        return
      }

      let valueData = {}
      valueData[this.field] = this.value
      this.$emit('logValue', valueData)

      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}
</script>