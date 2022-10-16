"use strict";
var common_vendor = require("../../common/vendor.js");
var store_type_index = require("../type/index.js");
var network_api = require("../../network/api.js");
const useProductStore = common_vendor.defineStore({
  id: store_type_index.StateType.PRODUCT,
  state: () => ({
    product: []
  }),
  getters: {
    getProductList() {
      return this.product;
    }
  },
  actions: {
    async setProductList() {
      const productInfo = await network_api.getProduct();
      this.product = productInfo.data;
    }
  }
});
exports.useProductStore = useProductStore;
