<template>
    <div class="container text-dark">
      <header class="jumbotron">
  
        <b-jumbotron text-variant="dark" header="Manage NFA">
          <p>manage...</p>
        </b-jumbotron>
       
      </header>
      <div v-if="nfa" class="mt-3">Token ID: {{ nfa.id }}</div>
      <div class="mt-3">Upload Strings</div>
      <b-form-select v-model="selected" :options="options"></b-form-select>
      <CreateTag class="mt-2" :field="selected" @logValue="logValue" />

      <div v-if="nfa">
      <div>Name: {{ nfa.name }}</div>
        <div>Description: {{ nfa.description }}</div>
        <div>External URL: {{ nfa.external_url }}</div>

        <div v-for="(attr, index ) in nfa.attributes" :key="index">
                  {{ attr.trait_type }}: {{ attr.value }}
                </div>
        </div>
      <div class="form-group mt-3">
      <div><b>Image content</b></div>
        <b-button variant="nature1" @click="onPickFile">Upload image </b-button>
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

                <img v-if="nfa"  :src="nfa.image" height="200">

            </b-col>
          </b-row>

        <div class="add">{{ imgUrl }}</div>

        <b-button v-if="imgUrl" class="mt-2" variant="nature1" @click="updateImage">Update contract</b-button>
        
      </div>

      <div class="form-group">
        <label for="html">html</label>
        <b-form-textarea
          id="html"
          v-model="nfaData.animation.html"
          placeholder="..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </div>

      <div class="form-group">
        <label for="css">css</label>
        <b-form-textarea
          id="css"
          v-model="nfaData.animation.css"
          placeholder="..."
          rows="3"
          max-rows="6"
        ></b-form-textarea> 
      </div>

      <div class="form-group">
        <label for="js">js</label>
        <b-form-textarea
          id="js"
          v-model="nfaData.animation.js"
          placeholder="..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </div>

      <b-button variant="nature1" @click="updateAnimation">Update animation</b-button>

      <b-form-select class="mt-3" v-model="selected3" :options="options3"></b-form-select>
      <SetValue class="mt-3" :value="selected3" @logData="logData" />

      <AttributesModal class="mt-3" @logBuild="logBuild" />

      <b-button v-if="nfa.onSale" class="mt-3" variant="nature1" @click="unlistNft">
              <b-icon icon="bag-x"></b-icon> Unlist
            </b-button>

            <b-card bg-variant="light">
              <iframe :srcdoc="nfa.animation_url"></iframe>
           
            </b-card>
      
    </div>
  </template>
  
  <script>
  
  import CreateTag from '../components/CreateTag.vue';
    import SetValue from '../components/SetValue.vue';
    import AttributesModal from '../components/AttributesModal.vue';
  
  export default {
    name: 'mintnfa',
    props: ['id'],
    components: {
        CreateTag,
        SetValue,
        AttributesModal
    },
    data() {
      return {
        loading: false,
        message: '',
        imageUrl: '',
        image: '',
        selected: null,
            options: [
                { value: 'Name', text: 'Name' },
                { value: 'Description', text: 'Description' },
                { value: 'ExternaUrl', text: 'ExternalUrl' },
                { value: 'ENS', text: 'ENS' },
            ],
         
            selected3: null,
            options3: [
                { value: 'Price', text: 'Price' },
                { value: 'Royalty', text: 'Royalty' }
            ],
        nfaData: {
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
      nfa () {
      return this.$store.getters['nfa/loadedNfa'](this.id);
    },
      imgUrl () {
        return this.$store.getters['nfa/loadedImgUrl'];
      },
    
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/user/login');
      }
    },
    methods: {
      
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
  
      },
      logValue: function (value) {
       let key = Object.keys(value);
       // get the value of the key
         let newValue = {
            val: value[key[0]],
            tokenId: this.id
         } 

       this.$store.dispatch('nfa/update' + key[0], newValue)
        },
        logData: function (value) {
       let key = Object.keys(value);
       // get the value of the key
         let newValue = {
            val: value[key[0]],
            tokenId: this.id
         } 
         

       this.$store.dispatch('nfa/set' + key[0], newValue)
        },
      
    logBuild: function (value) {

        const data = {
            commitHash: value.commitHash,
            gitRepository: value.gitRepository,
            tokenId: this.id
        }

        this.$store.dispatch('nfa/updateBuild', data)

    },
        updateImage: function () {
            const imgData = "https://ipfs.io/ipfs/" + this.imgUrl

            const data = {
                image: imgData,
                tokenId: this.id
            }
    
            this.$store.dispatch('nfa/updateImage', data)
        },
        updateAnimation: function () {
            const data = {
                html: this.nfaData.animation.html,
                css: this.nfaData.animation.css,
                js: this.nfaData.animation.js
            }

            const dataObj = {
                ...data,
                tokenId: this.id
            }

            this.$store.dispatch('nfa/updateAnimation', dataObj)
        },
        unlistNft: function() {
      if (this.walletAddress === "") {
        console.log("connect a wallet");
        return;
      }
      
      const nfaData = {
        address: this.walletAddress,
        id: this.id
      }
      this.$store.dispatch('nfa/unlistNfa', nfaData);
    },
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

  iframe {
  width: 100%;
  height: 350px;
}
  </style>