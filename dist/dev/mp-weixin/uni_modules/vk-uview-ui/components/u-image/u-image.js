"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-image",
  emits: ["click", "error", "load"],
  props: {
    src: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: "aspectFill"
    },
    width: {
      type: [String, Number],
      default: "100%"
    },
    height: {
      type: [String, Number],
      default: "auto"
    },
    shape: {
      type: String,
      default: "square"
    },
    borderRadius: {
      type: [String, Number],
      default: 0
    },
    lazyLoad: {
      type: Boolean,
      default: true
    },
    showMenuByLongpress: {
      type: Boolean,
      default: true
    },
    loadingIcon: {
      type: String,
      default: "photo"
    },
    errorIcon: {
      type: String,
      default: "error-circle"
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    showError: {
      type: Boolean,
      default: true
    },
    fade: {
      type: Boolean,
      default: true
    },
    webp: {
      type: Boolean,
      default: false
    },
    duration: {
      type: [String, Number],
      default: 500
    },
    bgColor: {
      type: String,
      default: "#f3f4f6"
    }
  },
  data() {
    return {
      isError: false,
      loading: true,
      opacity: 1,
      durationTime: this.duration,
      backgroundStyle: {}
    };
  },
  watch: {
    src: {
      immediate: true,
      handler(n) {
        if (!n) {
          this.isError = true;
          this.loading = false;
        } else {
          this.isError = false;
        }
      }
    }
  },
  computed: {
    wrapStyle() {
      let style = {};
      style.width = this.$u.addUnit(this.width);
      style.height = this.$u.addUnit(this.height);
      style.borderRadius = this.shape == "circle" ? "50%" : this.$u.addUnit(this.borderRadius);
      style.overflow = this.borderRadius > 0 ? "hidden" : "visible";
      if (this.fade) {
        style.opacity = this.opacity;
        style.transition = `opacity ${Number(this.durationTime) / 1e3}s ease-in-out`;
      }
      return style;
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
    onErrorHandler(err) {
      this.loading = false;
      this.isError = true;
      this.$emit("error", err);
    },
    onLoadHandler() {
      this.loading = false;
      this.isError = false;
      this.$emit("load");
      if (!this.fade)
        return this.removeBgColor();
      this.opacity = 0;
      this.durationTime = 0;
      setTimeout(() => {
        this.durationTime = this.duration;
        this.opacity = 1;
        setTimeout(() => {
          this.removeBgColor();
        }, this.durationTime);
      }, 50);
    },
    removeBgColor() {
      this.backgroundStyle = {
        backgroundColor: "transparent"
      };
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.isError
  }, !$data.isError ? {
    b: $props.src,
    c: $props.mode,
    d: common_vendor.o((...args) => $options.onErrorHandler && $options.onErrorHandler(...args)),
    e: common_vendor.o((...args) => $options.onLoadHandler && $options.onLoadHandler(...args)),
    f: $props.lazyLoad,
    g: $props.shape == "circle" ? "50%" : _ctx.$u.addUnit($props.borderRadius)
  } : {}, {
    h: $props.showLoading && $data.loading
  }, $props.showLoading && $data.loading ? common_vendor.e({
    i: _ctx.$slots.loading
  }, _ctx.$slots.loading ? {} : {
    j: common_vendor.p({
      name: $props.loadingIcon,
      width: $props.width,
      height: $props.height
    })
  }, {
    k: $props.shape == "circle" ? "50%" : _ctx.$u.addUnit($props.borderRadius),
    l: $props.bgColor
  }) : {}, {
    m: $props.showError && $data.isError && !$data.loading
  }, $props.showError && $data.isError && !$data.loading ? common_vendor.e({
    n: _ctx.$slots.error
  }, _ctx.$slots.error ? {} : {
    o: common_vendor.p({
      name: $props.errorIcon,
      width: $props.width,
      height: $props.height
    })
  }, {
    p: $props.shape == "circle" ? "50%" : _ctx.$u.addUnit($props.borderRadius)
  }) : {}, {
    q: common_vendor.o((...args) => $options.onClick && $options.onClick(...args)),
    r: common_vendor.s($options.wrapStyle),
    s: common_vendor.s($data.backgroundStyle)
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c8daf7c4"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-image/u-image.vue"]]);
wx.createComponent(Component);
