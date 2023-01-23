<template>
    <div>
      <b-button v-b-modal.modal-prevent-closing2>
        <b-icon icon="plus"></b-icon>
      </b-button>
  
      <b-modal id="modal-prevent-closing2" ref="modal" title="Set Value" @show="resetModal"
        @hidden="resetModal" @ok="handleOk">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Value" label-for="value-input">
            <b-form-input id="value-input" v-model="value2" required></b-form-input>
          </b-form-group>
  
        </form>
      </b-modal>
    </div>
  </template>
  
  <script>
  
  import { mapState } from 'vuex';
  
  export default {
    name: 'SetValue',
    props : ['value'],
    data() {
      return {
        value2: ''
      }
    },
    computed: {
      ...mapState('auth.module', {
        currentUser: (state) => state.user
      }),
  
    },
    methods: {
  
      resetModal() {
      
          this.value2 = ''
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (this.value2 === '') {
          return
        }
  
        let valueData = {}
        valueData[this.value] = this.value2
        this.$emit('logData', valueData)
  
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing2')
        })
      }
    }
  }
  </script>