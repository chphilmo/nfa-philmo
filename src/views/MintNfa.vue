<template>
  <div class="container">
    <header class="jumbotron">

      <b-jumbotron text-variant="dark" header="Mint NFA">
        <p>publish...</p>
      </b-jumbotron>
     
    </header>

    <div class="card card-container text-dark">
    
    <form name="form" @submit.prevent="createNode">
      <div class="form-group">
        <label for="name">Name</label>
        <div>NFA name</div>
        <input
          v-model="nfa.name"
          v-validate="'required'"
          type="text"
          class="form-control"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="content">Description</label>
        <div>A description of the Non Fungible App</div>
        <b-form-textarea
          id="description"
          v-model="nfa.description"
          placeholder="..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </div>

      <div class="form-group">
        <label for="externalUrl">External URL</label>
        <div>Link to your website</div>
        <input
          v-model="nfa.externalUrl"
          type="text"
          class="form-control"
          name="externalUrl"
        />
      </div>

      <div class="form-group">
        <label for="ENS">ENS</label>
        <div>Link to your ENS</div>
        <input
          v-model="nfa.ENS"
          type="text"
          class="form-control"
          name="ENS"
        />
      </div>

      <div class="form-group">
        <label for="commitHash">Commit Hash</label>
        <div>Link to your commit hash</div>
        <input
          v-model="nfa.commitHash"
          type="text"
          class="form-control"
          name="commitHash"
        />
      </div>

      <div class="form-group">
        <label for="gitRepository">Git Repository</label>
        <div>Link to your git repository</div>
        <input
          v-model="nfa.gitRepository"
          type="text"
          class="form-control"
          name="gitRepository"
        />
      </div>

      <div class="form-group mt-2">
      <div><b>Image content</b></div>
      <div>The main asset of your NFT, can be <b>JPEG, PNG or GIF</b></div>
        <b-button variant="primary" @click="onPickFile">Upload image </b-button>
        <input 
          type="file" 
          style="display: none" 
          ref="fileInput" 
          accept="image/*"
          @change="onFilePicked">

        <img :src="imageUrl" height="200">

        <div class="add">{{ imgUrl }}</div>

        
      </div>

      <div class="form-group">
        <label for="html">html</label>
        <b-form-textarea
          id="html"
          v-model="nfa.animation.html"
          placeholder="..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </div>

      <div class="form-group">
        <label for="css">css</label>
        <b-form-textarea
          id="css"
          v-model="nfa.animation.css"
          placeholder="..."
          rows="3"
          max-rows="6"
        ></b-form-textarea> 
      </div>

      <div class="form-group">
        <label for="js">js</label>
        <b-form-textarea
          id="js"
          v-model="nfa.animation.js"
          placeholder="..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </div>

      

      <div class="form-group mt-2">
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Create</span>
        </button>
      </div>
    </form>
    </div>
  </div>
</template>

<script>


export default {
  name: 'mintnfa',
  components: {
  },
  data() {
    return {
      loading: false,
      message: '',
      imageUrl: '',
      image: '',
      nfa: {
        name: '',
        description: '',
        image: '',
        externalUrl: '',
        ENS: '',
        commitHash: '',
        gitRepository: '',
        animation: {
          html: '',
          css: '',
          js: ''
        }
      }

    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    walletAddress () {
      return this.$store.getters['nfa/loadedWallet'];
    },
    wallet () {
      if (this.walletAddress === '') {
        return 'Connect Wallet'
      } else {
        return String(this.walletAddress);
      }
    },
    imgUrl () {
      return this.$store.getters['nfa/loadedImgUrl'];
    }
  
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/user/login');
    }
  },
  methods: {
    createNode: function() {
      this.loading = true;
      

        if (!this.nfa.name && !this.nfa.description) {
          this.loading = false;
          console.log('error')
          return;
        }
          const mintData = {
            name: this.nfa.name,
            description: this.nfa.description, 
            image: "https://ipfs.io/ipfs/" + this.imgUrl,
            externalUrl: this.nfa.externalUrl,
            ENS: this.nfa.ENS,
            commitHash: this.nfa.commitHash,
            gitRepository: this.nfa.gitRepository,
            animation: this.nfa.animation,
            walletAddress: this.walletAddress
          }
          this.$store.dispatch('nfa/mint', mintData)
          this.loading = false;
          //this.$router.push('/sketchbook')
        
    

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
      this.$store.dispatch('nfa/uploadImg', files[0])

    }
  }
};
</script>
<style scoped>
.card-container.card {
  min-width: 450px !important;
  padding: 40px 40px;
}

.card {
  background-color: #fdfdfd;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.add {
    font-size: 10pt;
}
</style>