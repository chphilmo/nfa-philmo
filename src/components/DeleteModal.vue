<template>
  <div>
    <div>
     <b-button @click="confirmDelete" size="sm" variant="danger">
     <b-icon icon="trash"></b-icon>
     </b-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['id'],
    data() {
      return {
        
      }
    },
    computed: {
    
    },
    methods: {
      confirmDelete() {
      
        this.$bvModal.msgBoxConfirm('Delete Sketch?')
          .then(value => {
            if (value) {
              this.$store.dispatch('playground/deleteSketch', this.id)
              this.$router.push('/sketchbook')
            }
          })
          .catch(err => {
            console.log(err);
          })
      },
    }
  }
</script>