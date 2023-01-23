<template>
  <div class="container">
    <header class="jumbotron">

      <b-jumbotron text-variant="dark" header="NFA">
        <p>Tokenized Application</p>
      </b-jumbotron>
    </header>

    <div>
      <b-row>
        <b-col md="5" lg="3" class="mt-3" v-for="(nfa,index) in nfaArray" :key="index">
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
                <div class="price">{{ nfa.value / Math.pow(10, 18) }} Ethers</div>
                <div class="price">{{ nfa.royalty['1'] / 100 }} %</div>
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