"use strict";
var common_vendor = require("../../common/vendor.js");
var config = require("../../config.js");
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_form2 + _easycom_u_button2)();
}
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  (common_vendor.unref(Avatar) + _easycom_u_input + _easycom_u_form_item + _easycom_u_form + _easycom_u_button)();
}
const Avatar = () => "./avatar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "register",
  setup(__props) {
    const form = common_vendor.reactive({
      username: "",
      password: "",
      avatar: ""
    });
    const toLogin = () => {
      if (form.username == null || form.password.length <= 5) {
        console.log("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u8D26\u53F7\u4E0E\u5BC6\u7801");
      } else {
        common_vendor.index.getStorage({
          key: "avatar",
          success: function(res) {
            form.avatar = res.data;
          }
        });
        console.log(form);
        common_vendor.index.request({
          url: config.config.base_url + "register",
          method: "POST",
          data: {
            "username": form.username,
            "avatar": form.avatar,
            "password": form.password
          },
          header: {
            "Content-Type": "application/json"
          },
          success: (res) => {
            if (res.data.code === 200) {
              setTimeout(() => {
                common_vendor.index.navigateTo({
                  url: "/pages/login/login"
                });
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
        a: common_vendor.o(($event) => form.username = $event),
        b: common_vendor.p({
          placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7",
          modelValue: form.username
        }),
        c: common_vendor.o(($event) => form.password = $event),
        d: common_vendor.p({
          type: "password",
          placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
          modelValue: form.password
        }),
        e: common_vendor.sr("uForm", "0566a113-1"),
        f: common_vendor.p({
          model: form
        }),
        g: common_vendor.o(toLogin),
        h: common_vendor.p({
          type: "primary"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0566a113"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/user/register.vue"]]);
wx.createPage(MiniProgramPage);
