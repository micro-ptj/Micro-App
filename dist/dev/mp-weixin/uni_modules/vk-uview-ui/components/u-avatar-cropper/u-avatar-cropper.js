"use strict";
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_vkUviewUi_components_uAvatarCropper_weCropper = require("./weCropper.js");
const _sfc_main = {
  props: {
    boundStyle: {
      type: Object,
      default() {
        return {
          lineWidth: 4,
          borderColor: "rgb(245, 245, 245)",
          mask: "rgba(0, 0, 0, 0.35)"
        };
      }
    }
  },
  data() {
    return {
      bottomNavHeight: 50,
      originWidth: 200,
      width: 0,
      height: 0,
      cropperOpt: {
        id: "cropper",
        targetId: "targetCropper",
        pixelRatio: 1,
        width: 0,
        height: 0,
        scale: 2.5,
        zoom: 8,
        cut: {
          x: (this.width - this.originWidth) / 2,
          y: (this.height - this.originWidth) / 2,
          width: this.originWidth,
          height: this.originWidth
        },
        boundStyle: {
          lineWidth: common_vendor.index.upx2px(this.boundStyle.lineWidth),
          mask: this.boundStyle.mask,
          color: this.boundStyle.borderColor
        }
      },
      destWidth: 200,
      rectWidth: 200,
      fileType: "jpg",
      src: ""
    };
  },
  onLoad(option) {
    let rectInfo = common_vendor.index.getSystemInfoSync();
    this.width = rectInfo.windowWidth;
    this.height = rectInfo.windowHeight - this.bottomNavHeight;
    this.cropperOpt.width = this.width;
    this.cropperOpt.height = this.height;
    this.cropperOpt.pixelRatio = rectInfo.pixelRatio;
    if (option.destWidth)
      this.destWidth = option.destWidth;
    if (option.rectWidth) {
      let rectWidth = Number(option.rectWidth);
      this.cropperOpt.cut = {
        x: (this.width - rectWidth) / 2,
        y: (this.height - rectWidth) / 2,
        width: rectWidth,
        height: rectWidth
      };
    }
    this.rectWidth = option.rectWidth;
    if (option.fileType)
      this.fileType = option.fileType;
    this.cropper = new uni_modules_vkUviewUi_components_uAvatarCropper_weCropper.WeCropper(this.cropperOpt).on("ready", (ctx) => {
    }).on("beforeImageLoad", (ctx) => {
    }).on("imageLoad", (ctx) => {
    }).on("beforeDraw", (ctx, instance) => {
    });
    common_vendor.index.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#000000"
    });
    common_vendor.index.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        this.src = res.tempFilePaths[0];
        this.cropper.pushOrign(this.src);
      }
    });
  },
  methods: {
    touchStart(e) {
      this.cropper.touchStart(e);
    },
    touchMove(e) {
      this.cropper.touchMove(e);
    },
    touchEnd(e) {
      this.cropper.touchEnd(e);
    },
    getCropperImage(isPre = false) {
      if (!this.src)
        return this.$u.toast("\u8BF7\u5148\u9009\u62E9\u56FE\u7247\u518D\u88C1\u526A");
      let cropper_opt = {
        destHeight: Number(this.destWidth),
        destWidth: Number(this.destWidth),
        fileType: this.fileType
      };
      this.cropper.getCropperImage(cropper_opt, (path, err) => {
        if (err) {
          common_vendor.index.showModal({
            title: "\u6E29\u99A8\u63D0\u793A",
            content: err.message
          });
        } else {
          if (isPre) {
            common_vendor.index.previewImage({
              current: "",
              urls: [path]
            });
          } else {
            common_vendor.index.$emit("uAvatarCropper", path);
            this.$u.route({
              type: "back"
            });
          }
        }
      });
    },
    uploadTap() {
      const self = this;
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          self.src = res.tempFilePaths[0];
          self.cropper.pushOrign(this.src);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    b: common_vendor.o((...args) => $options.touchMove && $options.touchMove(...args)),
    c: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args)),
    d: $data.cropperOpt.width,
    e: $data.cropperOpt.height,
    f: `-${$data.cropperOpt.width * $data.cropperOpt.pixelRatio}px`,
    g: `-${$data.cropperOpt.height * $data.cropperOpt.pixelRatio}px`,
    h: `${$data.cropperOpt.width * $data.cropperOpt.pixelRatio}px`,
    i: `${$data.cropperOpt.height * $data.cropperOpt.pixelRatio}`,
    j: $data.cropperOpt.height + "px",
    k: common_vendor.o((...args) => $options.uploadTap && $options.uploadTap(...args)),
    l: common_vendor.o(($event) => $options.getCropperImage(false)),
    m: $data.bottomNavHeight + "px"
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-425276b6"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-avatar-cropper/u-avatar-cropper.vue"]]);
wx.createPage(MiniProgramPage);
