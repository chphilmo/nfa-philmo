<template>
  <div class="container">
    <header class="jumbotron">
      <b-jumbotron text-variant="dark" :header="currentUser.username">
        <p>Profile</p>
      </b-jumbotron>
      
    </header>
    <div class="info text-dark">
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <p>
      <strong>Address:</strong>
      {{currentUser.address}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.role" :key="index">{{role}}</li>
    </ul>
    <b-button variant="nature1" :to="'/editprofile'">Edit profile</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
<style scoped>
.info {
  margin-top: 40px;
}
</style>