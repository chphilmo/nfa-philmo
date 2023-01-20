<template>
  <div class="container">
    <header class="jumbotron">
      <b-jumbotron text-variant="dark" :header="currentUser.username">
        <p>edit Profile</p>
      </b-jumbotron>
    </header>
    
    <form name="form" @submit.prevent="createNode">
      <div class="form-group text-dark">
        <div class="text-dark">Username</div>
        <input
          v-model="currentUser.username"
          v-validate="'required'"
          type="text"
          class="form-control"
          name="username"
        />
      </div>

      <div class="form-group">
        <div class="text-dark">Email</div>>
        <input
          v-model="currentUser.email"
          v-validate="'required'"
          type="text"
          class="form-control"
          name="email"
        />
      </div>

      <div class="form-group mt-2">
        <div class="text-dark">Profile picture</div>>
        <b-button variant="primary" @click="onPickFile">Upload profile picture </b-button>
        <input 
          type="file" 
          style="display: none" 
          ref="fileInput" 
          accept="image/*"
          @change="onFilePicked">

        <img :src="imageUrl" height="200">

        <div class="text-dark">
          <div>Image Url</div>
          <div class="add">{{ currentUser.imageUrl }}</div>
        </div>
      </div>

     
      <div class="form-group mt-2">
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Edit</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'editprofile',
  data() {
    return {
      loading: false,
      imageUrl: '',
      image: null

    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
    createNode: function() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.currentUser.username) {
          const userData = {
            id: this.currentUser.id,
            username: this.currentUser.username,
            email: this.currentUser.email, 
            imageUrl: this.currentUser.imageUrl
          }
          this.$store.dispatch('auth/editProfile', userData)
          this.$router.push('/profile')
        }
      });

    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
      this.$store.dispatch('auth/uploadProfileImg', files[0])

    }
  }
};
</script>

<style scoped>
.add {
    font-size: 10pt;
}
</style>