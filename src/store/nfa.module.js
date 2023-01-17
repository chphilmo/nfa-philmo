import NfaService from '../services/nfa.service';

require('dotenv').config();
const API_URL = process.env.VUE_APP_API_URL;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contractNft = require("../../artifacts/contracts/PhimoNFA.sol/PhimoNFA.json");

const contractMarketPlace = require("../../artifacts/contracts/MaketPlace.sol/Marketplace.json");

console.log(JSON.stringify(contractMarketPlace.abi));

const contractAddress = "0x1A1A411975AcF268C966a8835b430Ba02e7AbecB";
const marketPlaceAddress = "0xC43b30E351676CD9c8bd00C6670008C8e88F75EE";
const nftContract = new web3.eth.Contract(contractNft.abi, contractAddress);

const marketPlaceContract = new web3.eth.Contract(contractMarketPlace.abi, marketPlaceAddress);

export const nfa = {
  namespaced: true,
  state: {
    walletAddress: '',
    nfaArray: [],
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

      // get contract total supply and call tokenUri function for each token
      const totalSupply = await nftContract.methods.totalSupply().call();

      const nfa = [];

      for (let i = 0; i < totalSupply; i++) {
        const nfaData = await nftContract.methods.tokenURI(i).call();
        nfa.push(nfaData);


      }
      commit('loadNfa', nfa);
    },


    async mint({ commit }, payload) {
      const address = payload.walletAddress;

      console.log(address)
      if (!window.ethereum || address === null) {
        commit('setMessage', "You must install Metamask 🦊, a virtual Ethereum wallet, in your browser.");
        return;
      }
      //set up your Ethereum transaction
      const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'data': nftContract.methods.mint(window.ethereum.selectedAddress, payload.name, payload.description,
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
    setMessage({ commit }, payload) {
      commit('setMessage', payload);
    }
  },
  mutations: {
    uploadImg(state, payload) {
      state.imageUrl = payload;
    },
    loadNfa(state, payload) {
      state.nfaArray = payload;
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
      return state.nfaArray.sort((nfaA, nfaB) => {
        const da = new Date(nfaA._date)
        const db = new Date(nfaB._date)
        if (da === db) return 0

        return da < db ? 1 : -1
      });
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