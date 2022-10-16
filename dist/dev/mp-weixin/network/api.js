"use strict";
var common_vendor = require("../common/vendor.js");
var network_http = require("./http.js");
const logout = () => {
  return network_http.request({
    url: "logout",
    method: "GET",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": common_vendor.index.getStorageSync("token")
    }
  });
};
const getUserInfo = () => {
  return network_http.request({
    url: "admin/userInfo",
    method: "GET",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": common_vendor.index.getStorageSync("token")
    }
  });
};
const getBalance = () => {
  return network_http.request({
    url: "admin/getBalance",
    method: "GET",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": common_vendor.index.getStorageSync("token")
    }
  });
};
const addProduct = (product) => {
  return network_http.request({
    url: "contract/addProduct",
    method: "POST",
    data: product,
    header: {
      "Content-Type": "application/json",
      "Authorization": common_vendor.index.getStorageSync("token")
    }
  });
};
const getProduct = () => {
  return network_http.request({
    url: "product/getProduct",
    method: "GET",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": common_vendor.index.getStorageSync("token")
    }
  });
};
const totalBids = (id) => {
  return network_http.request({
    url: "contract/totalBids/" + id,
    method: "GET",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": common_vendor.index.getStorageSync("token")
    }
  });
};
const getProductById = (id) => {
  return network_http.request({
    url: "contract/getProduct/" + id,
    method: "GET",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": common_vendor.index.getStorageSync("token")
    }
  });
};
exports.addProduct = addProduct;
exports.getBalance = getBalance;
exports.getProduct = getProduct;
exports.getProductById = getProductById;
exports.getUserInfo = getUserInfo;
exports.logout = logout;
exports.totalBids = totalBids;
