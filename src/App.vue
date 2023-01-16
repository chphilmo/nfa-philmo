<template>
  <div id="app">
    <b-navbar toggleable="md" variant="nature1" type="dark" fixed="top">
    <b-navbar-brand class="mx-2" href="/">
      <img src="logo.png" width="50" height="50" class="d-inline-block">
      Philmo
    </b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item>
        <router-link to="/nfa" class="nav-link">NFAs</router-link>
        </b-nav-item>
      </b-navbar-nav>

    
      <b-button @click="connectWallet" size="sm">
            <b-icon icon="bag-fill"></b-icon>
            {{ wallet }}
       
      </b-button>

      <b-nav-item-dropdown v-if="currentUser" right no-caret class="d-flex">
          <template #button-content class="my-auto">
            <b-avatar :src="currentUser.imageUrl" href="/profile"/>
          </template>
          <b-dropdown-item>
          <router-link to="/profile" class="nav-link">
            <b-icon icon="person" class="h5"/> 
            Profile
          </router-link>
          </b-dropdown-item>
          <b-dropdown-item>
          <router-link to="/mint" class="nav-link">
            <b-icon icon="columns" class="h5"/> 
            Mint
          </router-link>
          </b-dropdown-item>
          <b-dropdown-item @click.prevent="logOut">
            <b-icon icon="arrow-right" class="h5" />
            log-Out
          </b-dropdown-item>
        </b-nav-item-dropdown>


        <b-nav-item-dropdown v-else right no-caret class="d-flex">
          <template #button-content class="my-auto">
            <b-icon icon="person-fill" />
          </template>
          <b-dropdown-item @click.prevent="web3Login">
          
            <b-icon icon="box-seam" />
            Web3 Login
         
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link to="/register" class="nav-link">
            <b-icon icon="person-plus-fill" />
            Register
          </router-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link to="/login" class="nav-link">
            <b-icon icon="person-fill" />
            Login
          </router-link>
          </b-dropdown-item>
        </b-nav-item-dropdown>



    
  </b-navbar>

 

    <div class="background-container">
    <div class="cover">
    
    <div class="bckg text-light">
    
        <router-view />

    </div>
    </div>

    <div class="footer">

     <div class="content text-light">

     <div class=" text-center">

     
     

      <b-row align-v="center">
       
        <b-col lg="4" md="4" sm="4" xs="6">
        <div>network</div>
        <div class="txtfooter">
        <div>philmo.ch</div>
        <div>ssr.philmo.ch</div>
      
        </div>
        </b-col>
        <b-col lg="4" md="4" sm="4" xs="12">
         
         
          <b-img src="/logo.png" height="80"></b-img>
        


       
        </b-col>

        <b-col lg="4" md="4" sm="4" xs="12">
        <div>ecosystem</div>
        <div class="txtfooter">
        <div>ecosys.app</div>
        <div>wallet.ecosys.app</div>
      
        </div>
        </b-col>
      </b-row>

      <div class="text-center mt-3 add text-light">
      developed in Switzerland, MIT License style 2022, phil@philmo.ch
     </div>
</div>
     </div>
     </div>
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

import EventBus from "./common/EventBus";

export default {
  data() {
    return {
      showMessage : false
    };
  },
  metaInfo() {
    return { 
      title: "wallet.ecosys",
      meta: [
        { vmid: 'description', name: 'description', content:  'wallet.ecosys' },
        { vmid: 'og:title', property: 'og:title', content: "wallet.ecosys" },
        { vmid: 'og:site_name', property: 'og:site_name', content: 'wallet.ecosys' },
        { vmid: 'og:type', property: 'og:type', content: 'website' },    
        { name: 'robots', content: 'index,follow' } 
      ]
    }
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
        return String(this.walletAddress).substring(0, 6) + "..." + String(this.walletAddress).substring(38);
      }
    },
    message () {
      return this.$store.getters['nfa/getMessage'];
    }
  },
  watch: {
    message (value) {
      if (value) {
        this.showMessage = true;
      }
    },
  },
  methods: {
    connectWallet: function() {
      this.$store.dispatch('nfa/connectWallet');
    },
    web3Login: function() {
      // check if walletaddress is set or call connectWallet
      if (this.walletAddress === '') {
        this.connectWallet();
      }
      const userObj = {
        address: this.walletAddress
      };
      // dispatch login passing walletaddress
      this.$store.dispatch('auth/web3Login', userObj);
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeDestroy() {
    EventBus.remove("logout");
  }
 
};
</script>
<style scoped>
.background-container {
  position: absolute;
  min-width: 100%;
  height: 100%;
  z-index: -1;
}
.cover {
  position: relative;
  min-width: 100%;
  min-height: 100%;
  background-color: #f8f9fa;
  background-size: 400% 400%;
  z-index: -1;
}
.bckg {
  background-color: #f8f9fa;
  padding-top: 70px;
  padding-bottom: 120px;
  height: 100%;
}
.footer {
  display: flex;
}
.content {
  display: inline-block;
  align-self: flex-end;
  width: 100%;
  background: linear-gradient(to bottom, #3c5ba0, #3c5ba0);
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
}
.txtfooter {
  font-size: 9pt;
}
.add {
  font-size: 8px;
}
</style>