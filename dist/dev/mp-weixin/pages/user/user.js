"use strict";
var common_vendor = require("../../common/vendor.js");
var store_modules_user = require("../../store/modules/user.js");
var network_api = require("../../network/api.js");
require("../../store/type/index.js");
require("../../network/http.js");
require("../../config.js");
if (!Array) {
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_u_cell_item2 = common_vendor.resolveComponent("u-cell-item");
  (_easycom_u_avatar2 + _easycom_u_cell_item2)();
}
const _easycom_u_avatar = () => "../../uni_modules/vk-uview-ui/components/u-avatar/u-avatar.js";
const _easycom_u_cell_item = () => "../../uni_modules/vk-uview-ui/components/u-cell-item/u-cell-item.js";
if (!Math) {
  (_easycom_u_avatar + _easycom_u_cell_item)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "user",
  setup(__props) {
    const useUserState = store_modules_user.useUserStore();
    const user = common_vendor.computed$1(() => useUserState.getUserInfo);
    const money = common_vendor.computed$1(() => useUserState.getMoney);
    common_vendor.onLoad(async () => {
      await useUserState.setUserInfo();
      await useUserState.setBalance();
    });
    common_vendor.ref("http://cdn.ut.tj.cn/test/bg.jpg");
    const toLogout = () => {
      network_api.logout().then((res) => {
        console.log(res);
        common_vendor.index.removeStorage({
          key: "token",
          success: function() {
            common_vendor.index.redirectTo({
              url: "/pages/login/login"
            });
          }
        });
      });
    };
    const toProdoctRelease = () => {
      common_vendor.index.navigateTo({
        url: "/pages/product/newProduct"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: common_vendor.unref(user).avatar,
          mode: "square"
        }),
        b: common_vendor.t(common_vendor.unref(user).username),
        c: common_vendor.t(common_vendor.unref(user).address),
        d: common_vendor.t(common_vendor.unref(money)),
        e: common_vendor.p({
          icon: "shopping-cart-fill",
          title: "\u6211\u7684\u8D2D\u4E70"
        }),
        f: common_vendor.o(toProdoctRelease),
        g: common_vendor.p({
          icon: "bookmark-fill",
          title: "\u53D1\u5E03"
        }),
        h: common_vendor.o(toLogout),
        i: common_vendor.p({
          icon: "setting-fill",
          title: "\u9000\u51FA"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1198f63b"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
