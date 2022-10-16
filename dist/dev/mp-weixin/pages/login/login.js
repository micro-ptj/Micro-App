"use strict";
var common_vendor = require("../../common/vendor.js");
var config = require("../../config.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_image2 + _easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_form2 + _easycom_u_button2)();
}
const _easycom_u_image = () => "../../uni_modules/vk-uview-ui/components/u-image/u-image.js";
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_image + _easycom_u_input + _easycom_u_form_item + _easycom_u_form + _easycom_u_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const src = "http://cdn.ut.tj.cn/static/auction.png";
    const form = common_vendor.reactive({
      username: "admin",
      password: "qwer1234"
    });
    const toRegister = () => {
      common_vendor.index.navigateTo({
        url: "/pages/user/register"
      });
    };
    const toLogin = () => {
      if (form.username == null || form.password.length <= 5) {
        console.log("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u8D26\u53F7\u4E0E\u5BC6\u7801");
      } else {
        console.log(form);
        common_vendor.index.request({
          url: config.config.base_url + "login",
          method: "POST",
          data: {
            "username": form.username,
            "password": form.password
          },
          header: {
            "Content-Type": "application/json"
          },
          success: (res) => {
            if (res.data.code === 200) {
              console.log(res.data.data.tokenHead + " " + res.data.data.token);
              common_vendor.index.setStorageSync("token", res.data.data.tokenHead + " " + res.data.data.token);
              setTimeout(() => {
                if (common_vendor.index.getStorageSync("token") != null) {
                  common_vendor.index.switchTab({
                    url: "/pages/product/product"
                  });
                }
              }, 1e3);
            } else {
              console.log(res.data.msg);
            }
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          width: "40rpx",
          height: "40rpx",
          src
        }),
        b: common_vendor.o(($event) => form.username = $event),
        c: common_vendor.p({
          placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7",
          modelValue: form.username
        }),
        d: common_vendor.o(($event) => form.password = $event),
        e: common_vendor.p({
          type: "password",
          placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
          modelValue: form.password
        }),
        f: common_vendor.sr("uForm", "23b3be22-1"),
        g: common_vendor.p({
          model: form
        }),
        h: common_vendor.o(toLogin),
        i: common_vendor.p({
          type: "primary"
        }),
        j: common_vendor.o(toRegister),
        k: common_vendor.p({
          type: "primary"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-23b3be22"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
