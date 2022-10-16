"use strict";
var common_vendor = require("../common/vendor.js");
var config = require("../config.js");
const request = (prams) => {
  return new Promise((resolve, reject) => {
    let url = config.config.base_url + prams.url;
    common_vendor.index.request({
      url,
      data: prams.data,
      method: prams.method,
      header: prams.header,
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
      }
    });
  });
};
exports.request = request;
