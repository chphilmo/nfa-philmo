<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Create Attributes</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Article Section"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Trait_type"
          label-for="trait-input"
        >
          <b-form-input
            id="trait-input"
            v-model="trait_type"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Value"
          label-for="value-input"
  
        >
          <b-form-input
          id="value-input"
          v-model="value"
          required
        ></b-form-input>
        </b-form-group>

      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        trait_type: '',
        value: ''
      }
    },
    computed: {
    
    },
    methods: {
      
      resetModal() {
        this.trait_type = '',
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
        if (this.value === '' || this.trait_type === '') {
          return
        }
        
        const attributesData = {
          trait_type: this.trait_type, 
          value: this.value
        }
        this.$emit('logAttributes', attributesData)

        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    }
  }
</script>