<template>
  <div class="container text-dark">
    
    <b-row>
     <b-col md="12" sm="12" lg="6" class="mt-3">

     <div class="spacer"></div>
  
  <b-card class="mt-3" bg-variant="light">
    <h2>Wallet</h2>

    <b-button variant="light" @click="connectWallet">
          <b-icon icon="bag-fill"></b-icon>
          {{ wallet }}</b-button>

    <b-button variant="light" @click="fetchBalance">
      Fetch Balance</b-button>
    </b-card>
    <b-card class="mt-3" bg-variant="light">

    <div>Account</div>
    <b-row>
     <b-col cols="6" class="mt-3">
    <b-card class="mt-3" bg-variant="light">
    <div> {{ Balance / Math.pow(10,18) }} ECO</div> 
    </b-card>
    </b-col>
    
   
    <b-col cols="6" class="mt-3">
    <b-card class="mt-3" bg-variant="light">
    <div> {{ EthPrice/10*Balance / Math.pow(10,18) }} $ ECO</div> 
    </b-card>
    </b-col>



    </b-row>

  





    </b-card>
    </b-col>

    <b-col md="12" sm="12" lg="6" class="mt-3">

     <div class="spacer"></div>
    
    <b-card class="mt-3" bg-variant="light">

    <div>Stats</div>
    

    <b-row>
     <b-col cols="6" class="mt-3">
    <b-card class="mt-3" bg-variant="light">
    <div> {{ EthPrice }} $/ETH</div> 
    </b-card>
    </b-col>
    <b-col cols="6" class="mt-3">
    <b-card class="mt-3" bg-variant="light">
    <div> {{ EthPrice/10 }} $/ECO</div> 
    </b-card>
    </b-col>
    
   



    </b-row>

    </b-card>

    <b-card class="mt-3" bg-variant="light">
    <div>Transaction</div> 
    <b-card class="mt-3" bg-variant="light">
    

       <b-button variant="light" v-b-modal.modal-prevent-closing size="md">
              <b-icon icon="bag-plus"></b-icon> Buy ECO
            </b-button>
            <b-modal
              id="modal-prevent-closing"
              ref="modal"
              title="Buy Ecosys Token"
              @show="resetModal"
              @hidden="resetModal"
              @ok="handleOk"
            >
              <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                  label="amount"
                  label-for="amount-input"
                  invalid-feedback="amount is required"
                  :state="amountState"
                >
                  <b-form-input
                    id="amount-input"
                    v-model="amount"
                    :state="amountState"
                    required
                  ></b-form-input>
                  <span>ETH</span>
                  <div>{{ EthPrice * amount }} $</div>
                  <div>{{ 10 * amount }} ECO</div>
                </b-form-group>
              </form>
            </b-modal>

        <b-button variant="light" v-b-modal.modal-set-sell size="md">
           <b-icon icon="bag-dash"></b-icon> Sell ECO
            </b-button>
            <b-modal
              id="modal-set-sell"
              ref="modal"
              title="Set amount to sell"
              @show="resetSell"
              @hidden="resetSell"
              @ok="sellOk"
            >
              <form ref="form" @submit.stop.prevent="sellSubmit">
                <b-form-group
                  label="Value"
                  label-for="value-input"
                  invalid-feedback="Value is required"
                  :state="sellState"
                >
                  <b-form-input
                    id="value-input"
                    v-model="sellAmount"
                    :state="sellState"
                    required
                  ></b-form-input>
                  <span>ETH</span>
                  <div>{{ EthPrice * sellAmount }} $</div>
                  <div>{{ 10 * sellAmount }} ECO</div>
                </b-form-group>
              </form>
            </b-modal>
        <b-button variant="light" size="md" @click="withdrawToken">
              <b-icon icon="bag-x"></b-icon> Withdraw
            </b-button>
    </b-card>

    </b-card>


    </b-col>


    </b-row>

    <b-row>
      <b-col cols="12">
      <b-card class="mt-3" bg-variant="light">

    <b-card class="mt-3" bg-variant="light">
    <div>
    <div>Smart Contract</div>
    <a href="https://etherscan.io/address/0x8b7da288348D4668B037e07213784692799806b9">
    0x8b7da288348D4668B037e07213784692799806b9</a> |
    <a href="https://etherscan.io/token/0x8b7da288348D4668B037e07213784692799806b9">Ecosys Token</a>
    </div>
    </b-card>
    </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>

export default {
  name: 'Meta',
  data() {
    return {
      content: '',
      amount: '',
      amountState: null,
      sellAmount: '',
      sellState: null
    };
  },
  mounted() {
    if (this.walletAddress) {
    this.$store.dispatch('nft/getAccountBalance', this.walletAddress);
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    walletAddress () {
      return this.$store.getters['nft/loadedWallet'];
    },
    wallet () {
      if (this.walletAddress === '') {
        return 'Connect Wallet'
      } else {
        return String(this.walletAddress);
      }
    },
    Balance () {
      return this.$store.getters['nft/getBalance'];
    },
    EthPrice () {
      let price = this.$store.getters['matter/getEthPrice'];
      let priceNum = Number(price).toFixed(2);
    
      return priceNum;
    },
    
  },
  watch: {
    walletAddress (value) {
      if (value) {
        this.$store.dispatch('nft/getAccountBalance', value);
      }
    },
  },
  methods: {
    connectWallet: function() {
      this.$store.dispatch('nft/connectWallet');
    },
    fetchBalance: function() {
      this.$store.dispatch('nft/getAccountBalance', this.walletAddress);
    },
    getEthPrice: function() {
      
      this.$store.dispatch('matter/getEthPrice')
    },
    withdrawToken: function() {
      if (this.walletAddress === "") {
        console.log("connect a wallet");
        return;
      }
      
      const Data = {
        address: this.walletAddress
      }
      this.$store.dispatch('nft/withdrawToken', Data);
    },
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.amountState = valid
        return valid
      },
      resetModal() {
        this.amount = ''
        this.amountState = null
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
          return;
        }

        const Data = {
          amount: this.amount,
          walletAddress: this.walletAddress
        }
        this.$store.dispatch('nft/buyEco', Data);
        
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },
      checkSellValidity() {
        const valid = this.$refs.form.checkValidity()
        this.sellState = valid
        return valid
      },
      resetSell() {
        this.sellAmount = ''
        this.sellState = null
      },
      sellOk(bvModalEvt) {
      
        bvModalEvt.preventDefault()
  
        this.sellSubmit()
      },
      sellSubmit() {

        if (!this.checkSellValidity()) {
          return
        }

        if (this.walletAddress === "") {
          console.log("connect a wallet");
          return;
        }

        const Data = {
          amount: this.sellAmount,
          walletAddress: this.walletAddress
        }
       
        this.$store.dispatch('nft/sellEco', Data);
        
        this.$nextTick(() => {
          this.$bvModal.hide('modal-set-sell')
        })
      }
  }
};
</script>
<style scoped>
.spacer {
  margin-top: 40px;
}
.title {
  font-weight: bold;
}
</style>