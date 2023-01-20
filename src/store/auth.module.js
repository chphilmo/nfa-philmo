import AuthService from '../services/auth.service';
require('dotenv').config();
const API_URL = process.env.VUE_APP_API_URL;

//import EventBus from '../common/EventBus';

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    async web3Login({ commit }, user) {
      // check if user is registered
      let registered = await AuthService.isWeb3Registered(user).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );

      if (!registered) {
        // register user
        registered = await AuthService.registerWeb3(user).then(
          response => {
            return Promise.resolve(response.data);
          },
          error => {
            return Promise.reject(error);
          }
        );
      }

  
      // get nonce from server
      const userObj = await AuthService.getNonce(user);
      const nonce = userObj.nonce;
      // sign message
      const userData = {
        address: user.address,
        nonce: nonce
      }

      const message = nonce + user.address;
      const signature = await web3.eth.personal.sign(message, user.address);

      // send signature to server
      return AuthService.web3Login(userData, signature).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    refreshToken({ commit }, accessToken) {
      commit('refreshToken', accessToken);
    },

    editProfile({ commit }, payload) {
      return AuthService.editProfile(payload).then(
        data => {
          commit('editProfile', data);
          return Promise.resolve(data);
        },
        error => {
          console.log(error)
          return Promise.reject(error);
        }
      );
    },
    uploadProfileImg({ commit, dispatch }, payload) {
      return AuthService.upload(payload).then(
        data => {
          commit('uploadProfileImg', data);
          return Promise.resolve(data);
        },
        error => {
          if (error.response && error.response.status === 403) {
            dispatch('logout')
          }
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    refreshToken(state, accessToken) {
      state.status.loggedIn = true;
      state.user = { ...state.user, accessToken: accessToken };
    },
    uploadProfileImg(state, payload) {
      state.user['imageUrl'] = payload.imageUrl;
    },
    editProfile(state, user) {
      state.user.username = user.username;
      state.user.email = user.email;
      state.user.imageUrl = user.imageUrl;
    },
  },
  getters: {
   
  }
};