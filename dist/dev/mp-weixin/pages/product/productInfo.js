"use strict";
var common_vendor = require("../../common/vendor.js");
var network_api = require("../../network/api.js");
require("../../network/http.js");
require("../../config.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  (_easycom_u_image2 + _easycom_u_button2 + _easycom_u_modal2)();
}
const _easycom_u_image = () => "../../uni_modules/vk-uview-ui/components/u-image/u-image.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_modal = () => "../../uni_modules/vk-uview-ui/components/u-modal/u-modal.js";
if (!Math) {
  (_easycom_u_image + _easycom_u_button + _easycom_u_modal)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "productInfo",
  setup(__props) {
    const show = common_vendor.ref(false);
    const content = "\u4E1C\u4E34\u78A3\u77F3\uFF0C\u4EE5\u89C2\u6CA7\u6D77";
    const productInfo = common_vendor.reactive({
      id: 0,
      name: "",
      category: "",
      imageLink: "",
      descLink: "",
      auctionStartTime: "",
      auctionEndTime: "",
      startPrice: 0,
      status: "",
      conditions: ""
    });
    const routerOption = common_vendor.reactive({
      id: "",
      auctionStates: ""
    });
    common_vendor.onLoad((option) => {
      console.log(option);
      routerOption.id = option.id;
      routerOption.auctionStates = option.auctionStates;
      if (routerOption.id != "") {
        network_api.getProductById(routerOption.id).then((res) => {
          console.log(res.data);
          const product = res.data;
          productInfo.id = product.id;
          productInfo.name = product.name;
          productInfo.descLink = product.descLink;
          productInfo.startPrice = product.startPrice;
          productInfo.imageLink = product.imageLink;
          productInfo.auctionEndTime = product.auctionEndTime;
          productInfo.auctionStartTime = product.auctionStartTime;
          timeFn(product.auctionEndTime);
        });
      }
    });
    function timeFn(d1) {
      var dateBegin = new Date(d1.replace(/-/g, "/"));
      var dateEnd = new Date();
      var dateDiff = dateBegin.getTime() - dateEnd.getTime();
      if (dateDiff <= 0) {
        console.log("\u7ED3\u675F");
      } else {
        console.log(dateDiff);
        var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1e3));
        var leave1 = dateDiff % (24 * 3600 * 1e3);
        var hours = Math.floor(leave1 / (3600 * 1e3));
        var leave2 = leave1 % (3600 * 1e3);
        var minutes = Math.floor(leave2 / (60 * 1e3));
        var leave3 = leave2 % (60 * 1e3);
        var seconds = Math.round(leave3 / 1e3);
        console.log(" \u76F8\u5DEE " + dayDiff + "\u5929 " + hours + "\u5C0F\u65F6 " + minutes + " \u5206\u949F" + seconds + " \u79D2");
        console.log(
          dateDiff + "\u65F6\u95F4\u5DEE\u7684\u6BEB\u79D2\u6570",
          dayDiff + "\u8BA1\u7B97\u51FA\u76F8\u5DEE\u5929\u6570",
          leave1 + "\u8BA1\u7B97\u5929\u6570\u540E\u5269\u4F59\u7684\u6BEB\u79D2\u6570",
          hours + "\u8BA1\u7B97\u51FA\u5C0F\u65F6\u6570",
          minutes + "\u8BA1\u7B97\u76F8\u5DEE\u5206\u949F\u6570",
          seconds + "\u8BA1\u7B97\u76F8\u5DEE\u79D2\u6570"
        );
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          width: "100%",
          height: "300rpx",
          src: productInfo.imageLink
        }),
        b: common_vendor.t(productInfo.name),
        c: common_vendor.t(productInfo.startPrice),
        d: common_vendor.t(productInfo.descLink),
        e: common_vendor.t(productInfo.auctionStartTime),
        f: common_vendor.t(productInfo.auctionEndTime),
        g: common_vendor.o(($event) => show.value = true),
        h: common_vendor.p({
          type: "error",
          disabled: routerOption.auctionStates != 1
        }),
        i: common_vendor.o(($event) => show.value = $event),
        j: common_vendor.p({
          content,
          modelValue: show.value
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4ed8efc9"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/product/productInfo.vue"]]);
wx.createPage(MiniProgramPage);
