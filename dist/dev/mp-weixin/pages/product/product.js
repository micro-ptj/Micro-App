"use strict";
var common_vendor = require("../../common/vendor.js");
var network_api = require("../../network/api.js");
var store_modules_product = require("../../store/modules/product.js");
require("../../network/http.js");
require("../../config.js");
require("../../store/type/index.js");
if (!Array) {
  const _easycom_u_lazy_load2 = common_vendor.resolveComponent("u-lazy-load");
  const _easycom_u_waterfall2 = common_vendor.resolveComponent("u-waterfall");
  (_easycom_u_lazy_load2 + _easycom_u_waterfall2)();
}
const _easycom_u_lazy_load = () => "../../uni_modules/vk-uview-ui/components/u-lazy-load/u-lazy-load.js";
const _easycom_u_waterfall = () => "../../uni_modules/vk-uview-ui/components/u-waterfall/u-waterfall.js";
if (!Math) {
  (_easycom_u_lazy_load + _easycom_u_waterfall)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "product",
  setup(__props) {
    const useProductState = store_modules_product.useProductStore();
    common_vendor.onLoad(async () => {
      await useProductState.setProductList();
      initData();
    });
    const product = common_vendor.computed$1(() => useProductState.getProductList);
    const productList = common_vendor.reactive([]);
    const initData = async () => {
      for (var i = 0; i < product.value.length; i++) {
        console.log(product.value[i].id);
        const result = await network_api.totalBids(product.value[i].id);
        console.log(result.data);
        var auctionState;
        var auctionStartTimeReplace = replaceDate(product.value[i].auctionStartTime);
        var auctionEndTimeReplace = replaceDate(product.value[i].auctionEndTime);
        var dateNow = new Date();
        var dateDiff = dateNow.getTime() - auctionStartTimeReplace.getTime();
        if (dateDiff <= 0) {
          auctionState = 0;
        } else {
          var dateDiff01 = auctionEndTimeReplace.getTime() - dateNow.getTime();
          if (dateDiff01 >= 0) {
            auctionState = 1;
          } else {
            auctionState = 2;
          }
        }
        productList.push({
          id: product.value[i].id,
          name: product.value[i].name,
          category: product.value[i].category,
          imageLink: product.value[i].imageLink,
          descLink: product.value[i].descLink,
          auctionStartTime: product.value[i].auctionStartTime,
          auctionEndTime: product.value[i].auctionEndTime,
          startPrice: product.value[i].startPrice,
          status: product.value[i].status,
          conditions: product.value[i].conditions,
          totalBid: result.data,
          dataAuctionStates: auctionState
        });
      }
      function replaceDate(d1) {
        var dateBegin = new Date(d1.replace(/-/g, "/"));
        return dateBegin;
      }
    };
    const toProductInfo = (event) => {
      common_vendor.index.navigateTo({
        url: "/pages/product/productInfo?id=" + event.id + "&auctionStates=" + event.dataAuctionStates
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          leftList
        }, s0, i0) => {
          return {
            a: common_vendor.f(leftList, (item, index, i1) => {
              return common_vendor.e({
                a: "8f03510a-1-" + i0 + "-" + i1 + ",8f03510a-0",
                b: common_vendor.p({
                  threshold: "-450",
                  ["border-radius"]: "10",
                  image: item.imageLink,
                  index
                }),
                c: common_vendor.t(item.name),
                d: item.conditions == 0
              }, item.conditions == 0 ? {} : {}, {
                e: item.dataAuctionStates === 0
              }, item.dataAuctionStates === 0 ? {} : {}, {
                f: item.dataAuctionStates === 1
              }, item.dataAuctionStates === 1 ? {} : {}, {
                g: item.dataAuctionStates === 2
              }, item.dataAuctionStates === 2 ? {} : {}, {
                h: common_vendor.t(item.startPrice),
                i: common_vendor.t(item.totalBid),
                j: index,
                k: common_vendor.o(($event) => toProductInfo(item), index)
              });
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "left",
          path: "a",
          vueId: "8f03510a-0"
        }),
        b: common_vendor.w(({
          rightList
        }, s0, i0) => {
          return {
            a: common_vendor.f(rightList, (item, index, i1) => {
              return common_vendor.e({
                a: "8f03510a-2-" + i0 + "-" + i1 + ",8f03510a-0",
                b: common_vendor.p({
                  threshold: "-450",
                  ["border-radius"]: "10",
                  image: item.imageLink,
                  index
                }),
                c: common_vendor.t(item.name),
                d: item.conditions == 0
              }, item.conditions == 0 ? {} : {}, {
                e: item.dataAuctionStates === 0
              }, item.dataAuctionStates === 0 ? {} : {}, {
                f: item.dataAuctionStates === 1
              }, item.dataAuctionStates === 1 ? {} : {}, {
                g: item.dataAuctionStates === 2
              }, item.dataAuctionStates === 2 ? {} : {}, {
                h: common_vendor.t(item.startPrice),
                i: common_vendor.t(item.totalBid),
                j: index,
                k: common_vendor.o(($event) => toProductInfo(item), index)
              });
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "right",
          path: "b",
          vueId: "8f03510a-0"
        }),
        c: common_vendor.o(($event) => common_vendor.isRef(productList) ? productList.value = $event : null),
        d: common_vendor.p({
          modelValue: productList
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8f03510a"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/product/product.vue"]]);
wx.createPage(MiniProgramPage);
