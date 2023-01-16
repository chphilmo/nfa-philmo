<template>
  <div class="container">
    <header class="jumbotron">
      
        <b-row>
          <b-col>
            <div v-if="userIsAuthor">
            <b-button variant="light" :to="'/editsketch/' + sketch.id" v-if="!sketch.ipfs" size="sm">
              <b-icon icon="code"></b-icon> code
            </b-button>
            <b-button variant="light" @click="pinSketch" v-if="!sketch.ipfs && userIsAuthor" size="sm">
              <b-icon icon="diagram3"></b-icon> Pin IPFS
            </b-button>
            <b-button variant="light" @click="mintNft" v-if="!sketchMinted && userIsAuthor && sketch.ipfs" size="sm">
              <b-icon icon="diagram3"></b-icon> Mint
            </b-button>
            <b-button variant="light" v-b-modal.modal-prevent-closing v-if="!sketchOnSale && userIsAuthor && sketchMinted && sketch.ipfs" size="sm">
              <b-icon icon="bag"></b-icon> Sell
            </b-button>
            <b-modal
              id="modal-prevent-closing"
              ref="modal"
              title="Mint NFA"
              @show="resetModal"
              @hidden="resetModal"
              @ok="handleOk"
            >
              <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                  label="Name"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="nfa.name"
                    required
                  ></b-form-input>
   
                </b-form-group>
                <b-form-group
                  label="Description"
                  label-for="description-input"
                  invalid-feedback="Description is required"
                >
                  <b-form-input
                    id="description-input"
                    v-model="nfa.description"
                    required
                  ></b-form-input>
                
                </b-form-group>
                <b-form-group
                  label="Image"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="nfa.name"
                    required
                  ></b-form-input>
                  <span>ETH</span>
                </b-form-group>
              </form>
            </b-modal>
            </div>
          </b-col>
          <b-col cols="auto">
            <b-button variant="light" :disabled="!currentUser" @click="setLike(sketch.id)" size="sm">
              <b-icon v-if="hasLiked" icon="heart"></b-icon>
              <b-icon v-else icon="heart-fill"></b-icon>
              <span class="subheading mx-1">{{ sketch.likes }}</span>
            </b-button>
          </b-col>
        </b-row>
           
    </header>
    <div>
      <b-card bg-variant="light" 
        text-variant="dark">
        <b-card-text>
          <b-row>
          <b-col>
            <iframe :src="sketch.animation_url"></iframe>
          </b-col>
          </b-row>
          
        </b-card-text>


        <div class="add"><b-icon icon="person-fill"></b-icon> {{ sketch.author }} - {{ sketch.date | date }}</div>

        <b-row>
      <b-col cols="8" class="mt-2 mb-3">
        <h3>{{ sketch.name }}</h3>
        <div>
            {{ sketch.description }}
        </div>
        
        <b-row>
          <b-col cols="8">
            <b-button-group class="m-1" v-for="footprint in sketch.footprint" :key="footprint" size="sm">
              <b-button>{{ footprint }}</b-button>
            </b-button-group>
          </b-col>
          <b-col cols="4">
        
          <b-button-group>
            <b-button variant="primary" :href="sketch.animation_url" size="sm">view Asset</b-button>
          </b-button-group>
        </b-col>

        </b-row>
          
            
        
      </b-col>
          <b-col cols="4" class="mt-3 mb-3">
          <b-img :src="sketch.image" fluid></b-img>
          </b-col>
          </b-row>


            <div v-if="sketch.attributes.length > 0">
            <b-row>
              <b-col cols="4" v-for="attribute in sketch.attributes" :key="attribute._id">
                  <b-card bg-variant="light" class="text-center text-dark">
                    <div class="poly"><b>{{ attribute.trait_type }}</b></div>
                    <div>{{ attribute.value }}</div>
                  </b-card>
                </b-col>
            </b-row>
          </div>

      <div class="link mt-3">IPFS <span v-if="sketch.ipfs">{{ sketch.ipfs }}</span></div>

      <b-row>
        <b-col>
        </b-col>
        <b-col cols="auto">
        </b-col>
      </b-row>

      </b-card>

     
    </div>

    <b-alert
      v-model="showMessage"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="warning"
      dismissible
    >
      {{ message }}
    </b-alert>

  </div>
</template>

<script>


export default {
  name: 'Pen',
  components: {

  },
  data() {
    return {
      loading: false,
      showMessage : false,
      nfa: {
        name: '',
        description: '',
        image: '',
        attributes: [],
        external_url: '',
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
  mounted() {

  },
  computed: {
    
    walletAddress () {
      return this.$store.getters['nfa/loadedWallet'];
    },
    
  },
  watch: {
    message (value) {
      if (value) {
        this.showMessage = true;
      }
    },
  },
  methods: {
    mintNft: function() {
      if (this.walletAddress === "") {
        console.log("connect a wallet");
        return;
      }
      
      const mintData = {
        address: this.walletAddress,
        id: this.id,
        ipfs: this.sketch.ipfs
      }
      this.$store.dispatch('nft/mintNft', mintData);
    },
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.priceState = valid
        return valid
      },
      resetModal() {
        this.price = ''
        this.priceState = null
      },
      handleOk(bvModalEvt) {
      
        bvModalEvt.preventDefault()
  
        this.handleSubmit()
      },
      handleSubmit() {

        if (!this.checkFormValidity()) {
          return
        }
      
        if (this.walletAddress === "") {
          console.log("connect a wallet");
          this.$store.dispatch('nft/setMessage', "connect a wallet");
          return;
        }
        

        const nftData = {
          price: this.price,
          id: this.sketchIndex,
          walletAddress: this.walletAddress
        }

        this.$store.dispatch('nft/sellNft', nftData);
        
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
  }
};
</script>
<style scoped>
.likedby {
  font-size: 12px;
}
.link {
  font-size: 8px;
}
iframe {
  width: 100%;
  height: 450px;
}
</style>