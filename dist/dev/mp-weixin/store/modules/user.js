"use strict";
var common_vendor = require("../../common/vendor.js");
var store_type_index = require("../type/index.js");
var network_api = require("../../network/api.js");
const useUserStore = common_vendor.defineStore({
  id: store_type_index.StateType.USER,
  state: () => ({
    user: {},
    money: ""
  }),
  getters: {
    getUserInfo() {
      return this.user;
    },
    getMoney() {
      return this.money;
    }
  },
  actions: {
    async setUserInfo() {
      const userInfo = await network_api.getUserInfo();
      this.user = userInfo.data;
    },
    async setBalance() {
      const userBalance = await network_api.getBalance();
      this.money = userBalance.data;
    }
  }
});
exports.useUserStore = useUserStore;
