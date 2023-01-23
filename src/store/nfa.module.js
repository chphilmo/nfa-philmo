import NfaService from '../services/nfa.service';

require('dotenv').config();
const API_URL = process.env.VUE_APP_API_URL;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contractNft = require("../../artifacts/contracts/PhimoNFA.sol/PhimoNFA.json");

const contractMarketPlace = require("../../artifacts/contracts/MaketPlace.sol/Marketplace.json");

console.log(JSON.stringify(contractMarketPlace.abi));

const contractAddress = "0xd71BcB652882d7306Dd67E57128c8731E53dBF26";
const marketPlaceAddress = "0xC43b30E351676CD9c8bd00C6670008C8e88F75EE";
const nftContract = new web3.eth.Contract(contractNft.abi, contractAddress);

const marketPlaceContract = new web3.eth.Contract(contractMarketPlace.abi, marketPlaceAddress);

export const nfa = {
  namespaced: true,
  state: {
    walletAddress: '',
    nfa: [],
    nfaAddress: [],
    imageUrl: '',
    message: ''
  },
  actions: {
    uploadImg({ commit }, payload) {
      return NfaService.upload(payload).then(
        data => {
          commit('uploadImg', data);
          return Promise.resolve(data);
        },
        error => {
          console.log(error)

          return Promise.reject(error);
        }
      );
    },

    // Load NFA from smart contract tokenUri function
    async loadNfa({ commit }) {

      // get the total number of NFA minted
      const totalNfa = await nftContract.methods.totalSupply().call();
      const data = [];

      for (let i = 0; i < totalNfa; i++) {
      const nfaData = await nftContract.methods.tokenURI(i).call();

      const royalty = await nftContract.methods._getTokenRoyalty(i).call();
      
      // convert base64 to json
      const json = atob(nfaData.split(',')[1]);
   
      //parse json        
      const nfaJson = JSON.parse(json);

      data.push( {
        ...nfaJson,
        royalty: royalty
      })
    }

      // }
      commit('loadNfa', data);
    },

    async loadContract() {

      // get the total number of NFA minted
   
      const contractData = await nftContract.methods.contractURI().call();

  
      const json = atob(contractData.split(',')[1]);
   
      //parse json        
      const nfaJson = JSON.parse(json);

      console.log(nfaJson);
    

     
    },


    async mint({ commit }, payload) {
      const address = payload.walletAddress;

      if (!window.ethereum || address === null) {
        commit('setMessage', "You must install Metamask 🦊, a virtual Ethereum wallet, in your browser.");
        return;
      }
      //set up your Ethereum transaction
      const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'data': nftContract.methods.mint(window.ethereum.selectedAddress, payload.name, payload.description.replaceAll(/\n/g, '\\n'), payload.image,
          payload.externalUrl, payload.ENS, payload.commitHash, payload.gitRepository, payload.animation).encodeABI() //make call to NFT smart contract 
      };
      //sign transaction via Metamask
      try {
        const txHash = await window.ethereum
          .request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });
        console.log("The hash of your transaction is: ", txHash, "\nCheck Alchemy's Mempool to view the status of your transaction!");
        commit('setMessage', txHash);

      } catch (error) {
        console.log("Something went wrong when submitting your transaction:", error.message)
        commit('setMessage', error.message);
      }

    },
    async burnNft({ commit }, payload) {

      const nftId = payload.id;
      const wAddress = payload.walletAddress;


      if (!window.ethereum) {
        commit('setMessage', "You must install Metamask 🦊, a virtual Ethereum wallet, in your browser.");
        return;
      }

      await nftContract.methods.burn(nftId)
        .send({
          'from': wAddress,
          'gas': 300000
        })
        .on("confirmation", () => {
          commit('setMessage', "Completed")
        })
        .catch(function (error) {
          console.log(error);
          commit('setMessage', error);
        })

    },
    async sellNft({ commit }, payload) {

      const price = payload.price;
      const nftId = payload.id;
      const wAddress = payload.walletAddress;

      if (!window.ethereum) {
        commit('setMessage', "You must install Metamask 🦊, a virtual Ethereum wallet, in your browser.");
        return;
      }

      await nftContract.methods.sellNFT(marketPlaceAddress, nftId, web3.utils.toWei(price.toString(), "ether"))
        .send({
          'from': wAddress,
          'gas': 500000
        })
        .on("confirmation", () => {
          commit('setMessage', "Completed")
        })
        .catch(function (error) {
          console.log(error);
          commit('setMessage', error);
        })

    },
    async setNftRoyalty({ commit }, payload) {

      const royalty = payload.royalty;
      const nftId = payload.id;
      const wAddress = payload.walletAddress;

      console.log(royalty);

      if (!window.ethereum) {
        commit('setMessage', "You must install Metamask 🦊, a virtual Ethereum wallet, in your browser.");
        return;
      }

      await nftContract.methods.setRoyalties(wAddress, nftId, royalty)
        .send({
          'from': wAddress,
          'gas': 200000
        })
        .on("confirmation", () => {
          commit('setMessage', "Completed")
        })
        .catch(function (error) {
          console.log(error);
          commit('setMessage', error);
        })

    },
    async unlistNft({ commit }, payload) {

      const nftId = payload.id;
      const wAddress = payload.address;

      if (!window.ethereum) {
        commit('setMessage', "You must install Metamask 🦊, a virtual Ethereum wallet, in your browser.");
        return;
      }

      await nftContract.methods.unlistNFT(nftId)
        .send({
          'from': wAddress,
          'gas': 200000
        })
        .on("confirmation", () => {
          commit('setMessage', "Completed")
        })
        .catch(function (error) {
          console.log(error);
          commit('setMessage', error);
        })

    },
    async transferNft({ commit }, payload) {
      const price = payload.price;
      const nftId = payload.id;
      const wAddress = payload.address;

      if (!window.ethereum) {
        commit('setMessage', "You must install Metamask 🦊, a virtual Ethereum wallet, in your browser.");
        return;
      }

      await marketPlaceContract.methods.transferFrom(contractAddress, nftId)
        .send({
          'from': wAddress,
          'value': price.toString(),
          'gas': 500000
        })
        .on("confirmation", () => {
          commit('setMessage', "Completed")
        })
        .catch(function (error) {
          console.log(error);
          commit('setMessage', error);
        })

    },
    async connectWallet({ commit }) {
      if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          commit('connectWallet', addressArray[0]);
        } catch (err) {
          console.log(err.message);
        }
      } else {
        commit('setMessage', "You must install Metamask 🦊, a virtual Ethereum wallet, in your browser.");
        console.log("You must install Metamask");
      }
    },
    async getCurrentWallet({ commit }) {
      if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (addressArray.length > 0) {
            commit('connectWallet', addressArray[0]);
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    },
    async loadNftByAddress({ commit }, payload) {

      const wAddress = payload

      const balance = await nftContract.methods.balanceOf(wAddress).call();
      const objects = [];
      const tokens = [];
      const nftData = [];

      for (let i = 0; i < balance; i++) {
        tokens.push(await nftContract.methods.tokenOfOwnerByIndex(wAddress, i).call());
      }

      for (let i = 0; i < tokens.length; i++) {
        const token = await nftContract.methods.tokenURI(tokens[i]).call();
        objects.push(token);
      }

      for (let i = 0; i < objects.length; i++) {
        NfaService.loadNft(objects[i]).then(
          data => {


            const NFT = {
              id: i,
              _id: data.id,
              name: data.name,
              description: data.description,
              author: data.author,
              _date: data.date,
              footprint: data.footprint,
              image: data.image,
              attributes: data.attributes || [],
              ipfs: objects[i],
              animation_url: data.animation_url,
              project: data.project,
              comment: data.comment,
              like: data.like,
              likes: data.likes
            }

            nftData.push(NFT);
            return Promise.resolve(data);
          },
          error => {
            console.log(error)
            return Promise.reject(error);
          }
        );
      }

      commit('nftByAddress', nftData);

    },

    async updatename({ commit }, payload) {

      const val = payload.val;
      const tokenId = payload.tokenId;

      if (!window.ethereum) {
        commit('setMessage', "You must install Metamask 🦊, a virtual Ethereum wallet, in your browser.");
        return;
      }

      await nftContract.methods.setTokenName(tokenId, val)
        .send({
          'from': window.ethereum.selectedAddress,
          'gas': 200000
        })
        .on("confirmation", () => {
          commit('setMessage', "Completed")
        })
        .catch(function (error) {
          console.log(error);
          commit('setMessage', error);
        })

    },

    async updateImage({ commit }, payload) {

      const image = payload.image;
      const tokenId = payload.tokenId;

      if (!window.ethereum) {
        commit('setMessage', "You must install Metamask 🦊, a virtual Ethereum wallet, in your browser.");
        return;
      }

      await nftContract.methods.setTokenImage(tokenId, image)
        .send({
          'from': window.ethereum.selectedAddress,
          'gas': 200000
        })
        .on("confirmation", () => {
          commit('setMessage', "Completed")
        })
        .catch(function (error) {
          console.log(error);
          commit('setMessage', error);
        })

    },

    async setRoyalty({ commit }, payload) {

      const val = Math.floor(payload.val * 100);
      const tokenId = payload.tokenId;

      if (!window.ethereum) {
        commit('setMessage', "You must install Metamask 🦊, a virtual Ethereum wallet, in your browser.");
        return;
      }

      await nftContract.methods.setTokenRoyalty(window.ethereum.selectedAddress,tokenId, val)
        .send({
          'from': window.ethereum.selectedAddress,
          'gas': 200000
        })
        .on("confirmation", () => {
          commit('setMessage', "Completed")
        })
        .catch(function (error) {
          console.log(error);
          commit('setMessage', error);
        })

    },

    async setPrice({ commit }, payload) {

      const val = payload.val;
      const tokenId = payload.tokenId;
      console.log(payload)
      if (!window.ethereum) {
        commit('setMessage', "You must install Metamask 🦊, a virtual Ethereum wallet, in your browser.");
        return;
      }

      await nftContract.methods.setTokenValue(marketPlaceAddress, tokenId, web3.utils.toWei(val.toString()))
        .send({
          'from': window.ethereum.selectedAddress,
          'gas': 200000
        })
        .on("confirmation", () => {
          commit('setMessage', "Completed")
        })
        .catch(function (error) {
          console.log(error);
          commit('setMessage', error);
        })

    },

    async updateAnimation({ commit }, payload) {

      const html = payload.html;
      const css = payload.css;  
      const js = payload.js;
      const tokenId = payload.tokenId;

      console.log(payload)

      if (!window.ethereum) {
        commit('setMessage', "You must install Metamask 🦊, a virtual Ethereum wallet, in your browser.");
        return;
      }

      await nftContract.methods.setTokenAnimation(tokenId, html, css, js)
        .send({
          'from': window.ethereum.selectedAddress,
          'gas': 200000
        })
        .on("confirmation", () => {
          commit('setMessage', "Completed")
        })
        .catch(function (error) {
          console.log(error);
          commit('setMessage', error);
        })

    },

    async setContract({ commit }, payload) {

      const name = payload.name;
      const description = payload.description;  
      const image = payload.image;
      const externalLink = payload.externalLink;

      console.log(payload)

      if (!window.ethereum) {
        commit('setMessage', "You must install Metamask 🦊, a virtual Ethereum wallet, in your browser.");
        return;
      }

      await nftContract.methods.setContract(name, description.replaceAll(/\n/g, '\\n'), image, externalLink)
        .send({
          'from': window.ethereum.selectedAddress,
          'gas': 200000
        })
        .on("confirmation", () => {
          commit('setMessage', "Completed")
        })
        .catch(function (error) {
          console.log(error);
          commit('setMessage', error);
        })

    },
    
    setMessage({ commit }, payload) {
      commit('setMessage', payload);
    }
  },
  mutations: {
    uploadImg(state, payload) {
      state.imageUrl = payload.ipfsHash;
    },
    loadNfa(state, payload) {
      state.nfa = payload;
    },
    nftByAddress(state, payload) {
      state.nfaAddress = payload;
    },
    connectWallet(state, payload) {
      state.walletAddress = payload;
    },
    setMessage(state, payload) {
      state.message = payload;
    }
  },
  getters: {
    loadedImgUrl(state) {
      //return state.loadedMatter.reverse()
      return state.imageUrl;
    },
    loadedNfas(state) {
      //return state.nfaArray.reverse()
      return state.nfa
    },
    loadedNft(state) {
      return (elementId) => {
        return state.nfaArray.find((element) => {
          return element._id === elementId
        })
      }
    },
    loadedNftsByOwner: (state, getters) => (address) => {
      return getters.loadedNfts.filter(element => element.owner.toLowerCase() === address);
    },
    loadedNftByAddress(state) {
      //return state.nfaArray.reverse()
      return state.nfaAddress.sort((nftA, nftB) => {
        const da = new Date(nftA._date)
        const db = new Date(nftB._date)
        if (da === db) return 0

        return da < db ? 1 : -1
      });
    },
    loadedWallet(state) {
      return state.walletAddress;
    },
    getMessage(state) {
      return state.message;
    },
    sketchIsNft(state) {
      return (elementId) => {
        return state.nfaArray.some(element => element._id === elementId)
      }
    },
    nftId(state) {
      return (elementId) => {
        const nft = state.nfaArray.find(nft => {
          return nft._id === elementId
        })
        return nft.id;
      }
    },
    nftIsOnSale(state, getters) {
      return (elementId) => {
        const isNft = getters.sketchIsNft(elementId)

        if (isNft) {
          const nft = state.nfaArray.find(nft => {
            return nft._id === elementId
          })
          return nft.OnSale;
        } else return false;
      }
    }
  }
};