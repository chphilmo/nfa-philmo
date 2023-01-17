<template>
  <div class="main">

    <div class="home">


      <div class="home2 container">
        <div class="imgBckg">
          <b-row>
            <b-col md="6" sm="6" class="mt-3">

            </b-col>
            <b-col md="6" sm="6" class="mt-3">
              <b-img class="mb-3" src="/blockchain.png" fluid></b-img>
            </b-col>
          </b-row>
        </div>

        <div class="container overlap">
          <div class="content container">

            <b-row>
              <b-col lg="6" md="6" sm="8" xs="12">
                <div class="block1 container">
                  <h1>NFAs</h1>

                  <h4>Non-Fungible Applications</h4>
                  <div>
                    towards a new generation of decentralized interoperable applications
                  </div>



                </div>
              </b-col>

            </b-row>

          </div>
        </div>
      </div>


    </div>


    <div class="heading">

      <b-row align-v="center">
        <b-col md="6" sm="6">
          <b-img src="/astre.png" fluid></b-img>
        </b-col>
        <b-col md="6" sm="6">

        </b-col>
      </b-row>

    </div>


    <div class="block7">
      <div class="container text-dark">

        <div class="text-center mb-3">



        </div>
        <b-row align-v="center" class="mt-3">


          <b-col md="12" sm="12">

            <b-img class="mb-3" src="/db3.png" fluid></b-img>



          </b-col>

        </b-row>

      </div>
    </div>


    <div class="blockintro">

      <div class="container text-dark">





        <b-row class="text-justify" align-v="center">
          <b-col md="6" sm="6">
            <div class="block1">


              <h1>ERC721</h1>
              <div>
                Built on top of ERC721 standard, <b>NFAs</b> inherits of the proprieties of NFTs by tokenizing and
                decentralizing entire applications on <b>Blockchain</b>.
              </div>
              <div class="mt-3">
                Non-Fungible Applications (NFAs) make use of <b>smart contracts</b> to oversee an entire application
                ecosystem. These applications are fully <b>interoperable</b>, meaning they are able to work seamlessly
                with other systems and components.
              </div>



            </div>
          </b-col>



          <b-col md="6" sm="6">

            <b-img class="mb-3" src="/block.png" fluid></b-img>

          </b-col>

          <b-col md="6" sm="6">

            <b-img class="mb-3" src="/ethereumlogo.png" fluid></b-img>
          </b-col>

          <b-col md="6" sm="6">
            <div>
              One of the main challenges with decentralizing services is ensuring social equity and <b>transparency</b>
              while maintaining security on the web. NFAs address these issues by creating <b>censorship-resistant</b>
              platforms that have zero downtime and can be traded and exchanged as complete interoperable assets.
            </div>


          </b-col>


        </b-row>

      </div>
    </div>

    <div class="block6">
      <div class="container text-light">


       
        <b-row align-v="center" class="mt-3 text-center">
          <b-col md="12" sm="12">

           <h4>Interoperability</h4>


          </b-col>

        </b-row>

      </div>
    </div>

    <div class="block7">
      <div class="container text-dark">



        <b-row align-v="center" class="mt-3 text-justify">
          <b-col md="6" sm="6">

            <div>
              From the development phase to <b>integration</b> on the web, and from minor updates to major upgrades,
              NFAs are designed to track every process for transparency and security. This allows for a more efficient
              and secure ecosystem.
            </div>
            <div class="mt-3">
              Transparency is a key aspect of NFAs, as all processes, changes, <b>builds</b>, and updates are tracked
              and publicly visible. This ensures accountability and allows for any issues to be easily identified and
              resolved.
            </div>




          </b-col>
          <b-col md="6" sm="6">

            <b-img class="mb-3" src="/ecom.png" fluid></b-img>

          </b-col>
        </b-row>
        <b-row align-v="center" class="text-justify">
          <b-col md="6" sm="6">


            <b-img class="mb-3" src="/ipfs.png" fluid></b-img>


          </b-col>
          <b-col md="6" sm="6">

            <div>
              Security is another important aspect of NFAs. They are designed to enable monitoring and tracking of all
              processes for security, ensuring the <b>integrity</b> and confidentiality of data. Additionally, the
              decentralized nature of NFAs ensures secure <b>ownership</b> of the assets.
            </div>

          </b-col>

        </b-row>



      </div>
    </div>

    <div class="blockintro">

<div class="container text-dark">





  <b-row class="text-justify" align-v="center">
    <b-col md="12" sm="12">
      <div class="block1">


        <h1>SMART CONTRACT</h1>

        <b-row>
          <b-col md="6" sm="6">

            <h4>Overview</h4>
            <div>
              <ul>
                <li>
                  <b>ERC721</b> standard interface for non-fungible tokens.
                </li>
                <li>
                  <b>ERC165</b> standard interface detection.
                </li>
                <li>
                  <b>ERC2981</b> royalty standard interface.
                </li>
                <li>
                  <b>AccessControl</b> contract for role-based access control.
                </li>
                <li>
                  <b>Self destruct</b> removing the contract from the blockchain.
                </li>
              </ul>
              
            </div>
          </b-col>
          <b-col md="6" sm="6">
            <div class="mt-3">
              <b>Goerli testnet</b>
            </div>
            <div clas="mt-3">
              <a href="https://goerli.etherscan.io/address/0x1A1A411975AcF268C966a8835b430Ba02e7AbecB">
    Contract</a> | Token
            </div>
            <div class="mt-3">
            
              <b-button variant="nature1"  size="md">
              <b-icon icon="code"></b-icon> Interact
            </b-button>
            </div>
          </b-col>
        </b-row>

        <div>
          <code>
            <pre>
              
            </pre>
          </code>
        </div>



      </div>
    </b-col>


  </b-row>

</div>
</div>





  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  metaInfo() {
    return {
      title: "NFA | Non Fungible Applications",
      meta: [
        { vmid: 'description', name: 'description', content: 'Non Fungible Applications' },
        { vmid: 'og:title', property: 'og:title', content: "NFA | Non Fungible Applications" },
        { vmid: 'og:site_name', property: 'og:site_name', content: 'nfa.philmo.ch' },
        { vmid: 'og:type', property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index,follow' }
      ]
    }
  },
  mounted() {

  },
  computed: {

  }
};
</script>
<style scoped>
.spacer {
  height: 60px;
}

.add {
  font-size: 8px;
}

.poly {
  color: #8247e5;
}

.text2 {
  color: #d3d3d3;
}

.meta {
  color: #15e0b9;
}

.fuchsia {
  color: #ea3c4c;
}

.ether {
  color: #ffffff;
}

.heading {

  background: linear-gradient(to bottom, #2058d3, #3d9fc1);
  padding-top: 30px;

}

.block {
  position: relative;
  background: linear-gradient(to bottom, #1DE9B6, #f2e9ba);
  display: flex;

}

.block1 {
  padding-top: 60px;
  padding-bottom: 60px;
}

.block2 {
  background-color: #f8f9fa;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: justify;
}

.block22 {
  background-color: #f8f9fa;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: justify;
}

.block3 {
  background-color: #f8f9fa;
  padding-top: 60px;
  display: block;
}

.block4 {
  background: linear-gradient(to bottom, #f2e9ba, #f8f9fa);
  padding-top: 60px;
  padding-bottom: 60px;
  display: block;
}

.blockintro {
  background-color: #f8f9fa;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
}

.block5 {
  position: relative;
  background-color: #69F0AE;

}

.block6 {
  background: linear-gradient(to bottom, #2058d3, #3d9fc1);
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: justify;


}

.block65 {
  background: linear-gradient(to bottom, #82bafa, #b7b8f7);
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: justify;
  padding-top: 60px;
  padding-bottom: 60px;


}

.block7 {
  background-color: #f8f9fa;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 60px;
}

.block8 {
  position: relative;
  bottom: 0;
  display: flex;
  width: 100%;
}

.block9 {
  position: relative;

  background-color: #f8f9fa;
  padding-top: 10px;
  padding-bottom: 10px;
}

.block10 {
  position: relative;
  background-color: #b6edd3;
  padding: 10px;

}

.block11 {
  position: relative;
  background-color: #69F0AE;
  padding: 10px;

}

.block111 {
  position: relative;
  background-color: #00E676;
  padding: 10px;

}

.block112 {
  position: relative;
  background-color: #b6edd3;
  padding: 10px;

}

.block12 {
  background-color: #f8f9fa;
  text-align: justify;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

}

.block13 {
  position: relative;
  background-color: #64FFDA;
  padding-top: 40px;
  padding-bottom: 40px;

}

.block14 {
  position: relative;
  background-color: #64FFDA;
  height: 35px;

}


.box1 {
  padding: 10px;
  position: relative;
  background-color: #64FFDA;
  border-radius: 10px;

}

.box2 {
  padding: 10px;
  position: relative;
  background-color: #f2e9ba;
  border-radius: 10px;

}

.home {
  position: relative;
  top: 0;
  height: 50vh;
  display: block;
  padding-bottom: 20px;
  background: linear-gradient(to bottom, #3c5ba0, #2058d3);

}

.home1 {
  position: relative;
  top: 0;
  height: 50vh;
  display: flex;
  padding-bottom: 20px;


}

.home2 {
  position: relative;
  top: 130px;
  right: 10px;
  height: 50vh;
  display: flex;

  justify-content: center;


}

.home3 {
  position: relative;


}

.content {
  display: inline-block;
  align-self: flex-end;

}

.content2 {
  display: inline-block;
  align-self: flex-end;
  height: 20px;
  width: 100%;
  background: linear-gradient(to bottom, #A1887F, #A1887F);
}


.imgBckg {
  display: inline-block;
  align-self: flex-end;
  justify-content: center;
}

.overlap {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 10;
}

.content1 {
  display: inline-block;
  align-self: flex-end;
}

.txtdisp {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 38px;
}

.vcenter {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ln {
  border: 1px solid #7c7c7c;
}

.main {
  overflow: hidden;
}
</style>