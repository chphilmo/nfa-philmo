<template>
    <div class="container">
      <header class="jumbotron">
  
        <b-jumbotron text-variant="dark" header="Contract Metadata">
          <p>publish...</p>
        </b-jumbotron>
       
      </header>
  
      <div class="card card-container text-dark">
      
      <form name="form" @submit.prevent="createNode">
        <div class="form-group">
          <label for="name">Name</label>
          <div>NFA name</div>
          <input
            v-model="contract.name"
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
            v-model="contract.description"
            placeholder="..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </div>
  
        <div class="form-group">
          <label for="externalUrl">External Link</label>
          <div>Link to your website</div>
          <input
            v-model="contract.external_link"
            type="text"
            class="form-control"
            name="externalUrl"
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
  
          <b-row>
            <b-col cols="6">
                <img :src="imageUrl" height="200">

          
            </b-col>
            <b-col cols="6">

                <img :src="contract.image" height="200">

            </b-col>
          </b-row>
  
          <div class="add">{{ imgUrl }}</div>
  
          
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
      contract () {
        return this.$store.getters['nfa/loadedContract'];
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
        
  
          if (!this.contract.name && !this.contract.description) {
            this.loading = false;
            console.log('error')
            return;
          }
            const contractData = {
              name: this.contract.name,
              description: this.contract.description, 
              image: "https://ipfs.io/ipfs/" + this.imgUrl,
              externalLink: this.contract.external_link
            }
            this.$store.dispatch('nfa/setContract', contractData)
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