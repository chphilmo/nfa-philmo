<template>
  <div class="container">
    <header class="jumbotron">

      <b-jumbotron text-variant="dark" header="NFA">
        <p>Tokenized Application</p>
      </b-jumbotron>
    </header>
    
    <div>
      <b-row>
        <b-col md="5" lg="3" class="mt-3" v-for="nfa in NFA" :key="nfa.id">
          <b-card text-variant="dark">
            
            <iframe :src="nfa.animation_url" loading="lazy"></iframe>
         
            <div class="add">{{ nfa.owner }}</div>
          
          
          <b-row>
            <b-col>
              <b-button :to="'/nft/' + nfa._id" variant="light">Open</b-button> 
            </b-col>
            <b-col cols="auto">
              <div class="price">{{ nfa.price / Math.pow(10,18) }} Ethers</div>
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
  name: 'NFT',
  components: {
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  computed: {
    NFA () {
      return this.$store.getters['nfa/loadedNfas'];
    },

  },
  methods: {
  
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