"use strict";
var common_vendor = require("../../common/vendor.js");
var store_modules_app = require("../../store/modules/app.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const title = common_vendor.ref("Hello");
    const useAppState = store_modules_app.useAppStore();
    const test = common_vendor.computed$1(() => useAppState.getTest);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(title.value),
        b: common_vendor.t(common_vendor.unref(test))
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
