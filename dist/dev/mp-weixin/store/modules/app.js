"use strict";
var common_vendor = require("../../common/vendor.js");
const useAppStore = common_vendor.defineStore({
  id: "app-store",
  state: () => ({
    test: "\u4ED3\u5E93\u6D4B\u8BD5\u503C"
  }),
  getters: {
    getTest() {
      return this.test;
    }
  },
  actions: {
    changeVal() {
      this.test = "\u6539\u53D8\u503C\u4E3A\uFF1A14";
    }
  }
});
exports.useAppStore = useAppStore;
