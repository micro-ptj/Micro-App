"use strict";
var common_vendor = require("../../common/vendor.js");
var config = require("../../config.js");
var network_api = require("../../network/api.js");
require("../../network/http.js");
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_radio2 = common_vendor.resolveComponent("u-radio");
  const _easycom_u_radio_group2 = common_vendor.resolveComponent("u-radio-group");
  const _easycom_u_picker2 = common_vendor.resolveComponent("u-picker");
  const _easycom_u_cell_item2 = common_vendor.resolveComponent("u-cell-item");
  const _easycom_u_upload2 = common_vendor.resolveComponent("u-upload");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_radio2 + _easycom_u_radio_group2 + _easycom_u_picker2 + _easycom_u_cell_item2 + _easycom_u_upload2 + _easycom_u_form2 + _easycom_u_button2)();
}
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_radio = () => "../../uni_modules/vk-uview-ui/components/u-radio/u-radio.js";
const _easycom_u_radio_group = () => "../../uni_modules/vk-uview-ui/components/u-radio-group/u-radio-group.js";
const _easycom_u_picker = () => "../../uni_modules/vk-uview-ui/components/u-picker/u-picker.js";
const _easycom_u_cell_item = () => "../../uni_modules/vk-uview-ui/components/u-cell-item/u-cell-item.js";
const _easycom_u_upload = () => "../../uni_modules/vk-uview-ui/components/u-upload/u-upload.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_form_item + _easycom_u_radio + _easycom_u_radio_group + _easycom_u_picker + _easycom_u_cell_item + _easycom_u_upload + _easycom_u_form + _easycom_u_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "newProduct",
  setup(__props) {
    const params = {
      year: true,
      month: true,
      day: true,
      hour: true,
      minute: true,
      second: true
    };
    const startTimeShow = common_vendor.ref(false);
    const endTimeShow = common_vendor.ref(false);
    const radioList = [
      {
        name: "\u65B0\u54C1",
        disabled: false
      },
      {
        name: "\u4E8C\u624B",
        disabled: false
      }
    ];
    const radio = common_vendor.ref("");
    const form = common_vendor.reactive({
      name: "",
      category: "",
      imageLink: "",
      descLink: "",
      auctionStartTime: "",
      auctionEndTime: "",
      startPrice: 0,
      conditions: ""
    });
    const setStartTime = (res) => {
      form.auctionStartTime = res.year + "-" + res.month + "-" + res.day + " " + res.hour + ":" + res.minute + ":" + res.second;
    };
    const setEndTime = (res) => {
      form.auctionEndTime = res.year + "-" + res.month + "-" + res.day + " " + res.hour + ":" + res.minute + ":" + res.second;
    };
    const action = config.config.base_url + "upload-platform";
    const onSuccessUpload = (data) => {
      console.log(data);
      form.imageLink = data.url;
    };
    const toProduct = () => {
      console.log(form);
      if (radio.value === "\u65B0\u54C1") {
        form.conditions = "0";
      } else {
        form.conditions = "1";
      }
      network_api.addProduct(form).then((res) => {
        console.log(res);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => form.name = $event),
        b: common_vendor.p({
          clearable: "true",
          modelValue: form.name
        }),
        c: common_vendor.p({
          label: "\u540D\u79F0"
        }),
        d: common_vendor.o(($event) => form.category = $event),
        e: common_vendor.p({
          clearable: "true",
          modelValue: form.category
        }),
        f: common_vendor.p({
          label: "\u5206\u7C7B"
        }),
        g: common_vendor.o(($event) => form.descLink = $event),
        h: common_vendor.p({
          clearable: "true",
          modelValue: form.descLink
        }),
        i: common_vendor.p({
          label: "\u63CF\u8FF0"
        }),
        j: common_vendor.o(($event) => form.startPrice = $event),
        k: common_vendor.p({
          type: "number",
          modelValue: form.startPrice
        }),
        l: common_vendor.p({
          label: "\u4EF7\u683C"
        }),
        m: common_vendor.f(radioList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index,
            c: "152c9df0-11-" + i0 + ",152c9df0-10",
            d: common_vendor.p({
              name: item.name,
              disabled: item.disabled
            })
          };
        }),
        n: common_vendor.o(($event) => radio.value = $event),
        o: common_vendor.p({
          modelValue: radio.value
        }),
        p: common_vendor.p({
          label: "\u72B6\u6001"
        }),
        q: common_vendor.o(setStartTime),
        r: common_vendor.o(($event) => startTimeShow.value = $event),
        s: common_vendor.p({
          mode: "time",
          params,
          modelValue: startTimeShow.value
        }),
        t: common_vendor.o(($event) => startTimeShow.value = true),
        v: common_vendor.p({
          title: "\u5F00\u59CB\u65F6\u95F4",
          value: form.auctionStartTime
        }),
        w: common_vendor.o(setEndTime),
        x: common_vendor.o(($event) => endTimeShow.value = $event),
        y: common_vendor.p({
          mode: "time",
          params,
          modelValue: endTimeShow.value
        }),
        z: common_vendor.o(($event) => endTimeShow.value = true),
        A: common_vendor.p({
          title: "\u7ED3\u675F\u65F6\u95F4",
          value: form.auctionEndTime
        }),
        B: common_vendor.o(onSuccessUpload),
        C: common_vendor.p({
          action,
          ["max-size"]: 5 * 1024 * 1024,
          ["max-count"]: "1"
        }),
        D: common_vendor.p({
          label: "\u56FE\u7247"
        }),
        E: common_vendor.sr("uForm", "152c9df0-0"),
        F: common_vendor.p({
          model: form
        }),
        G: common_vendor.o(toProduct),
        H: common_vendor.p({
          type: "default"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/product/newProduct.vue"]]);
wx.createPage(MiniProgramPage);
