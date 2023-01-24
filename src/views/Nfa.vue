<template>
  <div class="container">
    <header class="jumbotron">

      <b-jumbotron text-variant="dark" header="NFA">
        <p>Tokenized Application</p>
      </b-jumbotron>
    </header>

    <div>
      <b-row>
        <b-col xs="12" md="4" lg="3" class="mt-3" v-for="(nfa,index) in nfaArray" :key="index">
          <b-card text-variant="dark">

            <b-img class="mb-3" :src="nfa.image" fluid></b-img>

            <div class="add">{{ nfa.owner }}</div>


            <b-row>
              <b-col>
                <h4>{{ nfa.name }}</h4>
                <div>{{ nfa.description }}</div>
                <div>{{ nfa.external_url }}</div>
              </b-col>
              <b-col cols="auto">
                <b-button variant="faded" v-if="nfa.onSale" @click="transferFrom(index, nfa.value)" size="sm">
              <b-icon icon="cart-plus"></b-icon> Buy
              <span class="subheading mx-1">{{ nfa.value / Math.pow(10,18) }} ETH</span>
            </b-button>
            <div v-else class="price">{{ nfa.value / Math.pow(10, 18) }} ETH</div>
                <div class="price">{{ nfa.royalty['1'] / 100 }} %</div>

                <b-button variant="faded" v-if="userIsOwner(nfa.owner)" :to="'/manage/'+ index" size="sm">
              <b-icon icon="gear"></b-icon> Manage
  
            </b-button>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" class="mt-3">
                <div v-for="(attr, index ) in nfa.attributes" :key="index">
                  {{ attr.trait_type }}: {{ attr.value }}
                </div>
              </b-col>
              <b-col cols="12">

                <div v-html="nfa.animation_url" class="mt-3">

                </div>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>


export default {
  name: 'NFA',
  components: {
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  computed: {
    nfaArray() {
      return this.$store.getters['nfa/loadedNfas'];
    },
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

  },
  methods: {
    transferFrom: function(tokenId, value) {
      if (this.walletAddress === "") {
        console.log("connect a wallet");
        this.$store.dispatch('nfa/setMessage', "connect a wallet");
        return;
      }
      
      const sellData = {
        id: tokenId,
        value: value
      }
      this.$store.dispatch('nfa/transferNft', sellData);
    },
    userIsOwner (address) {
      if (!this.walletAddress) {
        return false
      }
      return this.walletAddress === address
    },
  }
};
</script>
<style scoped>
.card {
  /*display: inline-block;*/
}

.add {
  font-size: 8px;
}

.price {
  font-size: 14px;
  color: #7a7c7f;
}

iframe {
  width: 100%;
  height: 250px;
}
</style>