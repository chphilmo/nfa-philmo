<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing3>Manage Build</b-button>

    <b-modal
      id="modal-prevent-closing3"
      ref="modal"
      title="Submit Article Section"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Commit Hash"
          label-for="commit-input"
        >
          <b-form-input
            id="commit-input"
            v-model="commitHash"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Git Repository"
          label-for="git-input"
  
        >
          <b-form-input
          id="git-input"
          v-model="gitRepository"
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
        commitHash: '',
        gitRepository: ''
      }
    },
    computed: {
    
    },
    methods: {
      
      resetModal() {
        this.commitHash = ''
        this.gitRepository = ''
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (this.commitHash === '' || this.gitRepository === '') {
          return
        }
        
        const attributesData = {
          commitHash: this.commitHash,
          gitRepository: this.gitRepository
        }
        this.$emit('logBuild', attributesData)

        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing3')
        })
      }
    }
  }
</script>