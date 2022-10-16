"use strict";
var common_vendor = require("../../common/vendor.js");
var config = require("../../config.js");
const _sfc_main = {
  data() {
    return {
      avatar: "https://cdn.uviewui.com/uview/common/logo.png"
    };
  },
  created() {
    common_vendor.index.$on("uAvatarCropper", (path) => {
      this.avatar = path;
      common_vendor.index.uploadFile({
        url: config.config.base_url + "upload-platform",
        filePath: path,
        name: "file",
        complete: (res) => {
          common_vendor.index.setStorage({
            key: "avatar",
            data: JSON.parse(res.data).url,
            success: function() {
              console.log("success");
            }
          });
        }
      });
    });
  },
  methods: {
    chooseAvatar() {
      this.$u.route({
        url: "/uni_modules/vk-uview-ui/components/u-avatar-cropper/u-avatar-cropper",
        params: {
          destWidth: 300,
          rectWidth: 200,
          fileType: "jpg"
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.avatar,
    b: common_vendor.o($options.chooseAvatar)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5189426e"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/user/avatar.vue"]]);
wx.createComponent(Component);
