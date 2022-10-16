"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-upload",
  emits: ["update:file-list", "on-oversize", "on-list-change", "on-preview", "on-remove", "on-success", "on-change", "on-error", "on-progress", "on-uploaded", "on-choose-complete", "on-choose-fail"],
  props: {
    showUploadList: {
      type: Boolean,
      default: true
    },
    action: {
      type: String,
      default: ""
    },
    maxCount: {
      type: [String, Number],
      default: 52
    },
    showProgress: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    imageMode: {
      type: String,
      default: "aspectFill"
    },
    header: {
      type: Object,
      default() {
        return {};
      }
    },
    formData: {
      type: Object,
      default() {
        return {};
      }
    },
    name: {
      type: String,
      default: "file"
    },
    sizeType: {
      type: Array,
      default() {
        return ["original", "compressed"];
      }
    },
    sourceType: {
      type: Array,
      default() {
        return ["album", "camera"];
      }
    },
    previewFullImage: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: true
    },
    deletable: {
      type: Boolean,
      default: true
    },
    maxSize: {
      type: [String, Number],
      default: Number.MAX_VALUE
    },
    fileList: {
      type: Array,
      default() {
        return [];
      }
    },
    uploadText: {
      type: String,
      default: "\u9009\u62E9\u56FE\u7247"
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    showTips: {
      type: Boolean,
      default: true
    },
    customBtn: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: 200
    },
    height: {
      type: [String, Number],
      default: 200
    },
    delBgColor: {
      type: String,
      default: "#fa3534"
    },
    delColor: {
      type: String,
      default: "#ffffff"
    },
    delIcon: {
      type: String,
      default: "close"
    },
    successIcon: {
      type: String,
      default: "checkbox-mark"
    },
    successColor: {
      type: String,
      default: "#ffffff"
    },
    toJson: {
      type: Boolean,
      default: true
    },
    beforeUpload: {
      type: Function,
      default: null
    },
    beforeRemove: {
      type: Function,
      default: null
    },
    limitType: {
      type: Array,
      default() {
        return ["png", "jpg", "jpeg", "webp", "gif", "image"];
      }
    },
    index: {
      type: [Number, String],
      default: ""
    }
  },
  mounted() {
  },
  data() {
    return {
      lists: [],
      isInCount: true,
      uploading: false
    };
  },
  watch: {
    fileList: {
      immediate: true,
      handler(val) {
        let that = this;
        let lists = JSON.parse(JSON.stringify(that.lists));
        val.map((value) => {
          let tmp = lists.some((val2) => {
            return val2.url == value.url;
          });
          if (!tmp) {
            lists.push({ url: value.url, error: false, progress: 100 });
          }
        });
        that.lists = JSON.parse(JSON.stringify(lists));
      }
    },
    lists: {
      deep: true,
      handler(n) {
        this.$emit("update:file-list", n);
        this.$emit("on-list-change", n, this.index);
      }
    }
  },
  methods: {
    clear() {
      this.lists = [];
    },
    reUpload() {
      this.uploadFile();
    },
    selectFile() {
      let that = this;
      if (that.disabled)
        return;
      const { name = "", maxCount, multiple, maxSize, sizeType, camera, compressed, maxDuration, sourceType } = that;
      let chooseFile = null;
      let lists = JSON.parse(JSON.stringify(that.lists));
      const newMaxCount = maxCount - lists.length;
      chooseFile = new Promise((resolve, reject) => {
        common_vendor.index.chooseImage({
          count: multiple ? newMaxCount > 9 ? 9 : newMaxCount : 1,
          sourceType,
          sizeType,
          success: resolve,
          fail: reject
        });
      });
      chooseFile.then((res) => {
        let listOldLength = that.lists.length;
        res.tempFiles.map((val, index) => {
          if (!that.checkFileExt(val))
            return;
          if (!multiple && index >= 1)
            return;
          if (val.size > maxSize) {
            that.$emit("on-oversize", val, that.lists, that.index);
            that.showToast("\u8D85\u51FA\u5141\u8BB8\u7684\u6587\u4EF6\u5927\u5C0F");
          } else {
            if (maxCount <= lists.length) {
              that.$emit("on-exceed", val, that.lists, that.index);
              that.showToast("\u8D85\u51FA\u6700\u5927\u5141\u8BB8\u7684\u6587\u4EF6\u4E2A\u6570");
              return;
            }
            lists.push({
              url: val.path,
              progress: 0,
              error: false,
              file: val
            });
          }
        });
        this.deepClone(lists, that.lists);
        that.$emit("on-choose-complete", that.lists, that.index);
        if (that.autoUpload)
          that.uploadFile(listOldLength);
      }).catch((error) => {
        that.$emit("on-choose-fail", error);
      });
    },
    showToast(message, force = false) {
      if (this.showTips || force) {
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      }
    },
    upload() {
      this.uploadFile();
    },
    retry(index) {
      this.lists[index].progress = 0;
      this.lists[index].error = false;
      this.lists[index].response = null;
      common_vendor.index.showLoading({
        title: "\u91CD\u65B0\u4E0A\u4F20"
      });
      this.uploadFile(index);
    },
    async uploadFile(index = 0) {
      if (this.disabled)
        return;
      if (this.uploading)
        return;
      if (index >= this.lists.length) {
        this.$emit("on-uploaded", this.lists, this.index);
        return;
      }
      if (this.lists[index].progress == 100) {
        if (this.autoUpload == false)
          this.uploadFile(index + 1);
        return;
      }
      if (this.beforeUpload && typeof this.beforeUpload === "function") {
        let beforeResponse = this.beforeUpload.bind(this.$u.$parent.call(this))(index, this.lists);
        if (!!beforeResponse && typeof beforeResponse.then === "function") {
          await beforeResponse.then((res) => {
          }).catch((err) => {
            return this.uploadFile(index + 1);
          });
        } else if (beforeResponse === false) {
          return this.uploadFile(index + 1);
        } else
          ;
      }
      if (!this.action) {
        this.showToast("\u8BF7\u914D\u7F6E\u4E0A\u4F20\u5730\u5740", true);
        return;
      }
      this.lists[index].error = false;
      this.uploading = true;
      const task = common_vendor.index.uploadFile({
        url: this.action,
        filePath: this.lists[index].url,
        name: this.name,
        formData: this.formData,
        header: this.header,
        success: (res) => {
          let data = this.toJson && this.$u.test.jsonString(res.data) ? JSON.parse(res.data) : res.data;
          if (![200, 201, 204].includes(res.statusCode)) {
            this.uploadError(index, data);
          } else {
            this.lists[index].response = data;
            this.lists[index].progress = 100;
            this.lists[index].error = false;
            this.$emit("on-success", data, index, this.lists, this.index);
          }
        },
        fail: (e) => {
          this.uploadError(index, e);
        },
        complete: (res) => {
          common_vendor.index.hideLoading();
          this.uploading = false;
          this.uploadFile(index + 1);
          this.$emit("on-change", res, index, this.lists, this.index);
        }
      });
      task.onProgressUpdate((res) => {
        if (res.progress > 0) {
          this.lists[index].progress = res.progress;
          this.$emit("on-progress", res, index, this.lists, this.index);
        }
      });
    },
    uploadError(index, err) {
      this.lists[index].progress = 0;
      this.lists[index].error = true;
      this.lists[index].response = null;
      this.$emit("on-error", err, index, this.lists, this.index);
      this.showToast("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
    },
    deleteItem(index) {
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u60A8\u786E\u5B9A\u8981\u5220\u9664\u6B64\u9879\u5417\uFF1F",
        success: async (res) => {
          if (res.confirm) {
            if (this.beforeRemove && typeof this.beforeRemove === "function") {
              let beforeResponse = this.beforeRemove.bind(this.$u.$parent.call(this))(index, this.lists);
              if (!!beforeResponse && typeof beforeResponse.then === "function") {
                await beforeResponse.then((res2) => {
                  this.handlerDeleteItem(index);
                }).catch((err) => {
                  this.showToast("\u5DF2\u7EC8\u6B62\u79FB\u9664");
                });
              } else if (beforeResponse === false) {
                this.showToast("\u5DF2\u7EC8\u6B62\u79FB\u9664");
              } else {
                this.handlerDeleteItem(index);
              }
            } else {
              this.handlerDeleteItem(index);
            }
          }
        }
      });
    },
    handlerDeleteItem(index) {
      if (this.lists[index].process < 100 && this.lists[index].process > 0) {
        typeof this.lists[index].uploadTask != "undefined" && this.lists[index].uploadTask.abort();
      }
      this.lists.splice(index, 1);
      this.$forceUpdate();
      this.$emit("on-remove", index, this.lists, this.index);
    },
    remove(index) {
      if (index >= 0 && index < this.lists.length) {
        this.lists.splice(index, 1);
      }
    },
    doPreviewImage(url, index) {
      if (!this.previewFullImage) {
        this.$emit("on-preview", url, this.lists, this.index);
        return;
      }
      const images = this.lists.map((item) => item.url || item.path);
      common_vendor.index.previewImage({
        urls: images,
        current: url,
        success: () => {
          this.$emit("on-preview", url, this.lists, this.index);
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "\u9884\u89C8\u56FE\u7247\u5931\u8D25",
            icon: "none"
          });
        }
      });
    },
    checkFileExt(file) {
      let noArrowExt = false;
      let fileExt = "";
      const reg = /.+\./;
      fileExt = file.path.replace(reg, "").toLowerCase();
      noArrowExt = this.limitType.some((ext) => {
        return ext.toLowerCase() === fileExt;
      });
      if (!noArrowExt)
        this.showToast(`\u4E0D\u5141\u8BB8\u9009\u62E9${fileExt}\u683C\u5F0F\u7684\u6587\u4EF6`);
      return noArrowExt;
    },
    deepClone(obj, newObj) {
      for (let k in obj) {
        const value = obj[k];
        if (Array.isArray(value)) {
          newObj[k] = [];
          this.deepClone(value, newObj[k]);
        } else if (value !== null && typeof value === "object") {
          newObj[k] = {};
          this.deepClone(value, newObj[k]);
        } else {
          newObj[k] = value;
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_line_progress2 = common_vendor.resolveComponent("u-line-progress");
  (_easycom_u_icon2 + _easycom_u_line_progress2)();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
const _easycom_u_line_progress = () => "../u-line-progress/u-line-progress.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_line_progress)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.disabled
  }, !$props.disabled ? common_vendor.e({
    b: $props.showUploadList
  }, $props.showUploadList ? {
    c: common_vendor.f($data.lists, (item, index, i0) => {
      return common_vendor.e($props.deletable ? {
        a: "c19d5094-0-" + i0,
        b: common_vendor.p({
          name: $props.delIcon,
          size: "20",
          color: $props.delColor
        }),
        c: common_vendor.o(($event) => $options.deleteItem(index)),
        d: $props.delBgColor
      } : {}, {
        e: $props.showProgress && item.progress > 0 && !item.error && item.progress < 100
      }, $props.showProgress && item.progress > 0 && !item.error && item.progress < 100 ? {
        f: "c19d5094-1-" + i0,
        g: common_vendor.p({
          ["show-percent"]: false,
          height: "16",
          percent: item.progress
        })
      } : {}, {
        h: item.error
      }, item.error ? {
        i: common_vendor.o(($event) => $options.retry(index))
      } : {}, {
        j: !item.isImage
      }, !item.isImage ? {
        k: common_vendor.o(($event) => $options.doPreviewImage(item.url || item.path, index)),
        l: item.url || item.path,
        m: $props.imageMode
      } : {}, {
        n: index
      });
    }),
    d: $props.deletable,
    e: _ctx.$u.addUnit($props.width),
    f: _ctx.$u.addUnit($props.height)
  } : {}, {
    g: common_vendor.r("file", {
      file: $data.lists
    }),
    h: $props.maxCount > $data.lists.length
  }, $props.maxCount > $data.lists.length ? common_vendor.e({
    i: !$props.customBtn
  }, !$props.customBtn ? {
    j: common_vendor.p({
      name: "plus",
      size: "40"
    }),
    k: common_vendor.t($props.uploadText),
    l: _ctx.$u.addUnit($props.width),
    m: _ctx.$u.addUnit($props.height)
  } : {}, {
    n: common_vendor.o((...args) => $options.selectFile && $options.selectFile(...args))
  }) : {}) : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c19d5094"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-upload/u-upload.vue"]]);
wx.createComponent(Component);
