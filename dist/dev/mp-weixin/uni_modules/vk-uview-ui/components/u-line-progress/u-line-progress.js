"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-line-progress",
  props: {
    round: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ""
    },
    activeColor: {
      type: String,
      default: "#19be6b"
    },
    inactiveColor: {
      type: String,
      default: "#ececec"
    },
    percent: {
      type: Number,
      default: 0
    },
    showPercent: {
      type: Boolean,
      default: true
    },
    height: {
      type: [Number, String],
      default: 28
    },
    striped: {
      type: Boolean,
      default: false
    },
    stripedActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    progressStyle() {
      let style = {};
      style.width = this.percent + "%";
      if (this.activeColor)
        style.backgroundColor = this.activeColor;
      return style;
    }
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.$slots.default || _ctx.$slots.$default
  }, _ctx.$slots.default || _ctx.$slots.$default ? {} : $props.showPercent ? {
    c: common_vendor.t($props.percent + "%")
  } : {}, {
    b: $props.showPercent,
    d: common_vendor.n($props.type ? `u-type-${$props.type}-bg` : ""),
    e: common_vendor.n($props.striped ? "u-striped" : ""),
    f: common_vendor.n($props.striped && $props.stripedActive ? "u-striped-active" : ""),
    g: common_vendor.s($options.progressStyle),
    h: $props.round ? "100rpx" : 0,
    i: $props.height + "rpx",
    j: $props.inactiveColor
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0e476398"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-line-progress/u-line-progress.vue"]]);
wx.createComponent(Component);
