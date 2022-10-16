if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const ON_SHOW = "onShow";
  const ON_HIDE = "onHide";
  const ON_LAUNCH = "onLaunch";
  const ON_LOAD = "onLoad";
  function formatAppLog(type2, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type2, filename, ...args);
    } else {
      console[type2].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onHide = /* @__PURE__ */ createHook(ON_HIDE);
  const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$t = {
    name: "u-icon",
    emits: ["click", "touchstart"],
    props: {
      name: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: ""
      },
      size: {
        type: [Number, String],
        default: "inherit"
      },
      bold: {
        type: Boolean,
        default: false
      },
      index: {
        type: [Number, String],
        default: ""
      },
      hoverClass: {
        type: String,
        default: ""
      },
      customPrefix: {
        type: String,
        default: "uicon"
      },
      label: {
        type: [String, Number],
        default: ""
      },
      labelPos: {
        type: String,
        default: "right"
      },
      labelSize: {
        type: [String, Number],
        default: "28"
      },
      labelColor: {
        type: String,
        default: "#606266"
      },
      marginLeft: {
        type: [String, Number],
        default: "6"
      },
      marginTop: {
        type: [String, Number],
        default: "6"
      },
      marginRight: {
        type: [String, Number],
        default: "6"
      },
      marginBottom: {
        type: [String, Number],
        default: "6"
      },
      imgMode: {
        type: String,
        default: "widthFix"
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      width: {
        type: [String, Number],
        default: ""
      },
      height: {
        type: [String, Number],
        default: ""
      },
      top: {
        type: [String, Number],
        default: 0
      },
      showDecimalIcon: {
        type: Boolean,
        default: false
      },
      inactiveColor: {
        type: String,
        default: "#ececec"
      },
      percent: {
        type: [Number, String],
        default: "50"
      }
    },
    computed: {
      customClass() {
        let classes = [];
        let { customPrefix, name } = this;
        let index = name.indexOf("-icon-");
        if (index > -1) {
          customPrefix = name.substring(0, index + 5);
          classes.push(name);
        } else {
          classes.push(`${customPrefix}-${name}`);
        }
        if (customPrefix === "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(customPrefix);
        }
        if (this.showDecimalIcon && this.inactiveColor && this.$u.config.type.includes(this.inactiveColor)) {
          classes.push("u-icon__icon--" + this.inactiveColor);
        } else if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          top: this.$u.addUnit(this.top)
        };
        if (this.showDecimalIcon && this.inactiveColor && !this.$u.config.type.includes(this.inactiveColor)) {
          style.color = this.inactiveColor;
        } else if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      isImg() {
        return this.name.indexOf("/") !== -1;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? this.$u.addUnit(this.width) : this.$u.addUnit(this.size);
        style.height = this.height ? this.$u.addUnit(this.height) : this.$u.addUnit(this.size);
        return style;
      },
      decimalIconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          top: this.$u.addUnit(this.top),
          width: this.percent + "%"
        };
        if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      decimalIconClass() {
        let classes = [];
        classes.push(this.customPrefix + "-" + this.name);
        if (this.customPrefix == "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(this.customPrefix);
        }
        if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        else
          classes.push("u-icon__icon--primary");
        return classes;
      }
    },
    methods: {
      click() {
        this.$emit("click", this.index);
      },
      touchstart() {
        this.$emit("touchstart", this.index);
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      style: vue.normalizeStyle([$props.customStyle]),
      class: vue.normalizeClass(["u-icon", ["u-icon--" + $props.labelPos]]),
      onClick: _cache[1] || (_cache[1] = (...args) => $options.click && $options.click(...args))
    }, [
      $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        class: "u-icon__img",
        src: $props.name,
        mode: $props.imgMode,
        style: vue.normalizeStyle([$options.imgStyle])
      }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: vue.normalizeClass(["u-icon__icon", $options.customClass]),
        style: vue.normalizeStyle([$options.iconStyle]),
        "hover-class": $props.hoverClass,
        onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.touchstart && $options.touchstart(...args))
      }, [
        $props.showDecimalIcon ? (vue.openBlock(), vue.createElementBlock("text", {
          key: 0,
          style: vue.normalizeStyle([$options.decimalIconStyle]),
          class: vue.normalizeClass([$options.decimalIconClass, "u-icon__decimal"]),
          "hover-class": $props.hoverClass
        }, null, 14, ["hover-class"])) : vue.createCommentVNode("v-if", true)
      ], 46, ["hover-class"])),
      vue.createCommentVNode(' \u8FD9\u91CC\u8FDB\u884C\u7A7A\u5B57\u7B26\u4E32\u5224\u65AD\uFF0C\u5982\u679C\u4EC5\u4EC5\u662Fv-if="label"\uFF0C\u53EF\u80FD\u4F1A\u51FA\u73B0\u4F20\u90120\u7684\u65F6\u5019\uFF0C\u7ED3\u679C\u4E5F\u65E0\u6CD5\u663E\u793A\uFF0C\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u4E0D\u4F20\u503C\u9ED8\u8BA4\u4E3Anull\uFF0C\u6545\u9700\u8981\u589E\u52A0null\u7684\u5224\u65AD '),
      $props.label !== "" && $props.label !== null ? (vue.openBlock(), vue.createElementBlock("text", {
        key: 2,
        class: "u-icon__label",
        style: vue.normalizeStyle({
          color: $props.labelColor,
          fontSize: _ctx.$u.addUnit($props.labelSize),
          marginLeft: $props.labelPos == "right" ? _ctx.$u.addUnit($props.marginLeft) : 0,
          marginTop: $props.labelPos == "bottom" ? _ctx.$u.addUnit($props.marginTop) : 0,
          marginRight: $props.labelPos == "left" ? _ctx.$u.addUnit($props.marginRight) : 0,
          marginBottom: $props.labelPos == "top" ? _ctx.$u.addUnit($props.marginBottom) : 0
        })
      }, vue.toDisplayString($props.label), 5)) : vue.createCommentVNode("v-if", true)
    ], 6);
  }
  var __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$l], ["__scopeId", "data-v-6b8ae5b6"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-icon/u-icon.vue"]]);
  const _sfc_main$s = {
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
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "u-image",
      onClick: _cache[2] || (_cache[2] = (...args) => $options.onClick && $options.onClick(...args)),
      style: vue.normalizeStyle([$options.wrapStyle, $data.backgroundStyle])
    }, [
      !$data.isError ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        src: $props.src,
        mode: $props.mode,
        onError: _cache[0] || (_cache[0] = (...args) => $options.onErrorHandler && $options.onErrorHandler(...args)),
        onLoad: _cache[1] || (_cache[1] = (...args) => $options.onLoadHandler && $options.onLoadHandler(...args)),
        "lazy-load": $props.lazyLoad,
        class: "u-image__image",
        style: vue.normalizeStyle({
          borderRadius: $props.shape == "circle" ? "50%" : _ctx.$u.addUnit($props.borderRadius)
        })
      }, null, 44, ["src", "mode", "lazy-load"])) : vue.createCommentVNode("v-if", true),
      $props.showLoading && $data.loading ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "u-image__loading",
        style: vue.normalizeStyle({
          borderRadius: $props.shape == "circle" ? "50%" : _ctx.$u.addUnit($props.borderRadius),
          backgroundColor: $props.bgColor
        })
      }, [
        _ctx.$slots.loading ? vue.renderSlot(_ctx.$slots, "loading", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createBlock(_component_u_icon, {
          key: 1,
          name: $props.loadingIcon,
          width: $props.width,
          height: $props.height
        }, null, 8, ["name", "width", "height"]))
      ], 4)) : vue.createCommentVNode("v-if", true),
      $props.showError && $data.isError && !$data.loading ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "u-image__error",
        style: vue.normalizeStyle({
          borderRadius: $props.shape == "circle" ? "50%" : _ctx.$u.addUnit($props.borderRadius)
        })
      }, [
        _ctx.$slots.error ? vue.renderSlot(_ctx.$slots, "error", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createBlock(_component_u_icon, {
          key: 1,
          name: $props.errorIcon,
          width: $props.width,
          height: $props.height
        }, null, 8, ["name", "width", "height"]))
      ], 4)) : vue.createCommentVNode("v-if", true)
    ], 4);
  }
  var __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$k], ["__scopeId", "data-v-c8daf7c4"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-image/u-image.vue"]]);
  function broadcast(componentName, eventName, params) {
  }
  var Emitter = {
    methods: {
      dispatch(componentName, eventName, params) {
        let parent = this.$parent || this.$root;
        let name = parent.$options.name;
        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;
          if (parent) {
            name = parent.$options.name;
          }
        }
        if (parent) {
          parent[eventName](params);
        }
      },
      broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
      }
    }
  };
  const _sfc_main$r = {
    name: "u-input",
    emits: ["update:modelValue", "input", "change", "blur", "focus", "click", "touchstart"],
    mixins: [Emitter],
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      type: {
        type: String,
        default: "text"
      },
      inputAlign: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      placeholderStyle: {
        type: String,
        default: "color: #c0c4cc;"
      },
      confirmType: {
        type: String,
        default: "done"
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      fixed: {
        type: Boolean,
        default: false
      },
      focus: {
        type: Boolean,
        default: false
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      border: {
        type: Boolean,
        default: false
      },
      borderColor: {
        type: String,
        default: "#dcdfe6"
      },
      autoHeight: {
        type: Boolean,
        default: true
      },
      selectOpen: {
        type: Boolean,
        default: false
      },
      height: {
        type: [Number, String],
        default: ""
      },
      clearable: {
        type: [Boolean, String]
      },
      cursorSpacing: {
        type: [Number, String],
        default: 0
      },
      selectionStart: {
        type: [Number, String],
        default: -1
      },
      selectionEnd: {
        type: [Number, String],
        default: -1
      },
      trim: {
        type: Boolean,
        default: true
      },
      showConfirmbar: {
        type: Boolean,
        default: true
      },
      backgroundColor: {
        type: String
      },
      padding: {
        type: String
      }
    },
    data() {
      return {
        defaultValue: "",
        inputHeight: 70,
        textareaHeight: 100,
        validateState: false,
        focused: false,
        showPassword: false,
        lastValue: "",
        uForm: {
          inputAlign: "",
          clearable: ""
        }
      };
    },
    watch: {
      valueCom(nVal, oVal) {
        this.defaultValue = nVal;
        if (nVal != oVal && this.type == "select")
          this.handleInput({
            detail: {
              value: nVal
            }
          });
      }
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      inputAlignCom() {
        return this.inputAlign || this.uForm.inputAlign || "left";
      },
      clearableCom() {
        if (typeof this.clearable == "boolean")
          return this.clearable;
        if (typeof this.uForm.clearable == "boolean")
          return this.uForm.clearable;
        return true;
      },
      inputMaxlength() {
        return Number(this.maxlength);
      },
      getStyle() {
        let style = {};
        style.minHeight = this.height ? this.height + "rpx" : this.type == "textarea" ? this.textareaHeight + "rpx" : this.inputHeight + "rpx";
        style = Object.assign(style, this.customStyle);
        return style;
      },
      getCursorSpacing() {
        return Number(this.cursorSpacing);
      },
      uSelectionStart() {
        return String(this.selectionStart);
      },
      uSelectionEnd() {
        return String(this.selectionEnd);
      }
    },
    created() {
      this.defaultValue = this.valueCom;
    },
    mounted() {
      let parent = this.$u.$parent.call(this, "u-form");
      if (parent) {
        Object.keys(this.uForm).map((key) => {
          this.uForm[key] = parent[key];
        });
      }
    },
    methods: {
      handleInput(event) {
        let value = event.detail.value;
        if (this.trim)
          value = this.$u.trim(value);
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
        this.defaultValue = value;
        setTimeout(() => {
          this.dispatch("u-form-item", "onFieldChange", value);
        }, 40);
      },
      handleBlur(event) {
        setTimeout(() => {
          this.focused = false;
        }, 100);
        this.$emit("blur", event.detail.value);
        setTimeout(() => {
          this.dispatch("u-form-item", "onFieldBlur", event.detail.value);
        }, 40);
      },
      onFormItemError(status) {
        this.validateState = status;
      },
      onFocus(event) {
        this.focused = true;
        this.$emit("focus");
      },
      onConfirm(e) {
        this.$emit("confirm", e.detail.value);
      },
      onClear(event) {
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
      },
      inputClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["u-input", {
        "u-input--border": $props.border,
        "u-input--error": $data.validateState
      }]),
      style: vue.normalizeStyle({
        padding: $props.padding ? $props.padding : `0 ${$props.border ? 20 : 0}rpx`,
        borderColor: $props.borderColor,
        textAlign: $options.inputAlignCom,
        backgroundColor: $props.backgroundColor
      }),
      onClick: _cache[10] || (_cache[10] = vue.withModifiers((...args) => $options.inputClick && $options.inputClick(...args), ["stop"]))
    }, [
      $props.type == "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
        key: 0,
        class: "u-input__input u-input__textarea",
        style: vue.normalizeStyle([$options.getStyle]),
        value: $data.defaultValue,
        placeholder: $props.placeholder,
        placeholderStyle: $props.placeholderStyle,
        disabled: $props.disabled,
        maxlength: $options.inputMaxlength,
        fixed: $props.fixed,
        focus: $props.focus,
        autoHeight: $props.autoHeight,
        "selection-end": $options.uSelectionEnd,
        "selection-start": $options.uSelectionStart,
        "cursor-spacing": $options.getCursorSpacing,
        onInput: _cache[0] || (_cache[0] = (...args) => $options.handleInput && $options.handleInput(...args)),
        onBlur: _cache[1] || (_cache[1] = (...args) => $options.handleBlur && $options.handleBlur(...args)),
        onFocus: _cache[2] || (_cache[2] = (...args) => $options.onFocus && $options.onFocus(...args)),
        onConfirm: _cache[3] || (_cache[3] = (...args) => $options.onConfirm && $options.onConfirm(...args))
      }, null, 44, ["value", "placeholder", "placeholderStyle", "disabled", "maxlength", "fixed", "focus", "autoHeight", "selection-end", "selection-start", "cursor-spacing"])) : (vue.openBlock(), vue.createElementBlock("input", {
        key: 1,
        class: "u-input__input",
        type: $props.type == "password" ? "text" : $props.type,
        style: vue.normalizeStyle([$options.getStyle]),
        value: $data.defaultValue,
        password: $props.type == "password" && !$data.showPassword,
        placeholder: $props.placeholder,
        placeholderStyle: $props.placeholderStyle,
        disabled: $props.disabled || $props.type === "select",
        maxlength: $options.inputMaxlength,
        focus: $props.focus,
        confirmType: $props.confirmType,
        "cursor-spacing": $options.getCursorSpacing,
        "selection-end": $options.uSelectionEnd,
        "selection-start": $options.uSelectionStart,
        onFocus: _cache[4] || (_cache[4] = (...args) => $options.onFocus && $options.onFocus(...args)),
        onBlur: _cache[5] || (_cache[5] = (...args) => $options.handleBlur && $options.handleBlur(...args)),
        onInput: _cache[6] || (_cache[6] = (...args) => $options.handleInput && $options.handleInput(...args)),
        onConfirm: _cache[7] || (_cache[7] = (...args) => $options.onConfirm && $options.onConfirm(...args))
      }, null, 44, ["type", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing", "selection-end", "selection-start"])),
      vue.createElementVNode("view", { class: "u-input__right-icon u-flex" }, [
        $options.clearableCom && $options.valueCom != "" && $data.focused ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "u-input__right-icon__clear u-input__right-icon__item",
          onClick: _cache[8] || (_cache[8] = (...args) => $options.onClear && $options.onClear(...args))
        }, [
          vue.createVNode(_component_u_icon, {
            size: "32",
            name: "close-circle-fill",
            color: "#c0c4cc"
          })
        ])) : vue.createCommentVNode("v-if", true),
        $props.passwordIcon && $props.type == "password" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "u-input__right-icon__clear u-input__right-icon__item"
        }, [
          vue.createVNode(_component_u_icon, {
            size: "32",
            name: !$data.showPassword ? "eye" : "eye-fill",
            color: "#c0c4cc",
            onClick: _cache[9] || (_cache[9] = ($event) => $data.showPassword = !$data.showPassword)
          }, null, 8, ["name"])
        ])) : vue.createCommentVNode("v-if", true),
        $props.type == "select" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: vue.normalizeClass(["u-input__right-icon--select u-input__right-icon__item", {
            "u-input__right-icon--select--reverse": $props.selectOpen
          }])
        }, [
          vue.createVNode(_component_u_icon, {
            name: "arrow-down-fill",
            size: "26",
            color: "#c0c4cc"
          })
        ], 2)) : vue.createCommentVNode("v-if", true)
      ])
    ], 6);
  }
  var __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$j], ["__scopeId", "data-v-a2383a08"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-input/u-input.vue"]]);
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  var formatRegExp = /%[sdj%]/g;
  var warning = function warning2() {
  };
  if (typeof process !== "undefined" && process.env && true && typeof window !== "undefined" && typeof document !== "undefined") {
    warning = function warning2(type2, errors) {
      if (typeof console !== "undefined" && console.warn) {
        if (errors.every(function(e) {
          return typeof e === "string";
        })) {
          formatAppLog("warn", "at uni_modules/vk-uview-ui/libs/util/async-validator.js:30", type2, errors);
        }
      }
    };
  }
  function convertFieldsError(errors) {
    if (!errors || !errors.length)
      return null;
    var fields = {};
    errors.forEach(function(error) {
      var field = error.field;
      fields[field] = fields[field] || [];
      fields[field].push(error);
    });
    return fields;
  }
  function format() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var i = 1;
    var f = args[0];
    var len = args.length;
    if (typeof f === "function") {
      return f.apply(null, args.slice(1));
    }
    if (typeof f === "string") {
      var str = String(f).replace(formatRegExp, function(x) {
        if (x === "%%") {
          return "%";
        }
        if (i >= len) {
          return x;
        }
        switch (x) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
            break;
          default:
            return x;
        }
      });
      for (var arg = args[i]; i < len; arg = args[++i]) {
        str += " " + arg;
      }
      return str;
    }
    return f;
  }
  function isNativeStringType(type2) {
    return type2 === "string" || type2 === "url" || type2 === "hex" || type2 === "email" || type2 === "pattern";
  }
  function isEmptyValue(value, type2) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (type2 === "array" && Array.isArray(value) && !value.length) {
      return true;
    }
    if (isNativeStringType(type2) && typeof value === "string" && !value) {
      return true;
    }
    return false;
  }
  function asyncParallelArray(arr, func, callback) {
    var results = [];
    var total = 0;
    var arrLength = arr.length;
    function count(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === arrLength) {
        callback(results);
      }
    }
    arr.forEach(function(a) {
      func(a, count);
    });
  }
  function asyncSerialArray(arr, func, callback) {
    var index = 0;
    var arrLength = arr.length;
    function next(errors) {
      if (errors && errors.length) {
        callback(errors);
        return;
      }
      var original = index;
      index = index + 1;
      if (original < arrLength) {
        func(arr[original], next);
      } else {
        callback([]);
      }
    }
    next([]);
  }
  function flattenObjArr(objArr) {
    var ret = [];
    Object.keys(objArr).forEach(function(k) {
      ret.push.apply(ret, objArr[k]);
    });
    return ret;
  }
  function asyncMap(objArr, option, func, callback) {
    if (option.first) {
      var _pending = new Promise(function(resolve, reject) {
        var next = function next2(errors) {
          callback(errors);
          return errors.length ? reject({
            errors,
            fields: convertFieldsError(errors)
          }) : resolve();
        };
        var flattenArr = flattenObjArr(objArr);
        asyncSerialArray(flattenArr, func, next);
      });
      _pending["catch"](function(e) {
        return e;
      });
      return _pending;
    }
    var firstFields = option.firstFields || [];
    if (firstFields === true) {
      firstFields = Object.keys(objArr);
    }
    var objArrKeys = Object.keys(objArr);
    var objArrLength = objArrKeys.length;
    var total = 0;
    var results = [];
    var pending = new Promise(function(resolve, reject) {
      var next = function next2(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === objArrLength) {
          callback(results);
          return results.length ? reject({
            errors: results,
            fields: convertFieldsError(results)
          }) : resolve();
        }
      };
      if (!objArrKeys.length) {
        callback(results);
        resolve();
      }
      objArrKeys.forEach(function(key) {
        var arr = objArr[key];
        if (firstFields.indexOf(key) !== -1) {
          asyncSerialArray(arr, func, next);
        } else {
          asyncParallelArray(arr, func, next);
        }
      });
    });
    pending["catch"](function(e) {
      return e;
    });
    return pending;
  }
  function complementError(rule) {
    return function(oe) {
      if (oe && oe.message) {
        oe.field = oe.field || rule.fullField;
        return oe;
      }
      return {
        message: typeof oe === "function" ? oe() : oe,
        field: oe.field || rule.fullField
      };
    };
  }
  function deepMerge$1(target, source) {
    if (source) {
      for (var s in source) {
        if (source.hasOwnProperty(s)) {
          var value = source[s];
          if (typeof value === "object" && typeof target[s] === "object") {
            target[s] = _extends({}, target[s], {}, value);
          } else {
            target[s] = value;
          }
        }
      }
    }
    return target;
  }
  function required(rule, value, source, errors, options, type2) {
    if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type2 || rule.type))) {
      errors.push(format(options.messages.required, rule.fullField));
    }
  }
  function whitespace(rule, value, source, errors, options) {
    if (/^\s+$/.test(value) || value === "") {
      errors.push(format(options.messages.whitespace, rule.fullField));
    }
  }
  var pattern = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    ),
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
  };
  var types = {
    integer: function integer2(value) {
      return types.number(value) && parseInt(value, 10) === value;
    },
    "float": function float(value) {
      return types.number(value) && !types.integer(value);
    },
    array: function array2(value) {
      return Array.isArray(value);
    },
    regexp: function regexp2(value) {
      if (value instanceof RegExp) {
        return true;
      }
      try {
        return !!new RegExp(value);
      } catch (e) {
        return false;
      }
    },
    date: function date2(value) {
      return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function";
    },
    number: function number2(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof +value === "number";
    },
    object: function object2(value) {
      return typeof value === "object" && !types.array(value);
    },
    method: function method2(value) {
      return typeof value === "function";
    },
    email: function email2(value) {
      return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
    },
    url: function url2(value) {
      return typeof value === "string" && !!value.match(pattern.url);
    },
    hex: function hex(value) {
      return typeof value === "string" && !!value.match(pattern.hex);
    }
  };
  function type(rule, value, source, errors, options) {
    if (rule.required && value === void 0) {
      required(rule, value, source, errors, options);
      return;
    }
    var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
    var ruleType = rule.type;
    if (custom.indexOf(ruleType) > -1) {
      if (!types[ruleType](value)) {
        errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
      }
    } else if (ruleType && typeof value !== rule.type) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  }
  function range$1(rule, value, source, errors, options) {
    var len = typeof rule.len === "number";
    var min = typeof rule.min === "number";
    var max = typeof rule.max === "number";
    var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var val = value;
    var key = null;
    var num = typeof value === "number";
    var str = typeof value === "string";
    var arr = Array.isArray(value);
    if (num) {
      key = "number";
    } else if (str) {
      key = "string";
    } else if (arr) {
      key = "array";
    }
    if (!key) {
      return false;
    }
    if (arr) {
      val = value.length;
    }
    if (str) {
      val = value.replace(spRegexp, "_").length;
    }
    if (len) {
      if (val !== rule.len) {
        errors.push(format(options.messages[key].len, rule.fullField, rule.len));
      }
    } else if (min && !max && val < rule.min) {
      errors.push(format(options.messages[key].min, rule.fullField, rule.min));
    } else if (max && !min && val > rule.max) {
      errors.push(format(options.messages[key].max, rule.fullField, rule.max));
    } else if (min && max && (val < rule.min || val > rule.max)) {
      errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
    }
  }
  var ENUM = "enum";
  function enumerable(rule, value, source, errors, options) {
    rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
    if (rule[ENUM].indexOf(value) === -1) {
      errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(", ")));
    }
  }
  function pattern$1(rule, value, source, errors, options) {
    if (rule.pattern) {
      if (rule.pattern instanceof RegExp) {
        rule.pattern.lastIndex = 0;
        if (!rule.pattern.test(value)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      } else if (typeof rule.pattern === "string") {
        var _pattern = new RegExp(rule.pattern);
        if (!_pattern.test(value)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      }
    }
  }
  var rules = {
    required,
    whitespace,
    type,
    range: range$1,
    "enum": enumerable,
    pattern: pattern$1
  };
  function string(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, "string");
      if (!isEmptyValue(value, "string")) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
        rules.pattern(rule, value, source, errors, options);
        if (rule.whitespace === true) {
          rules.whitespace(rule, value, source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function method(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function number$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (value === "") {
        value = void 0;
      }
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function _boolean(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function regexp(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value)) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function integer(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function floatFn(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function array$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, "array") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, "array");
      if (!isEmptyValue(value, "array")) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function object$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  var ENUM$1 = "enum";
  function enumerable$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules[ENUM$1](rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function pattern$2(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value, "string")) {
        rules.pattern(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function date$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value)) {
        var dateObject;
        if (typeof value === "number") {
          dateObject = new Date(value);
        } else {
          dateObject = value;
        }
        rules.type(rule, dateObject, source, errors, options);
        if (dateObject) {
          rules.range(rule, dateObject.getTime(), source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function required$1(rule, value, callback, source, options) {
    var errors = [];
    var type2 = Array.isArray(value) ? "array" : typeof value;
    rules.required(rule, value, source, errors, options, type2);
    callback(errors);
  }
  function type$1(rule, value, callback, source, options) {
    var ruleType = rule.type;
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, ruleType) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, ruleType);
      if (!isEmptyValue(value, ruleType)) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function any(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
    }
    callback(errors);
  }
  var validators = {
    string,
    method,
    number: number$1,
    "boolean": _boolean,
    regexp,
    integer,
    "float": floatFn,
    array: array$1,
    object: object$1,
    "enum": enumerable$1,
    pattern: pattern$2,
    date: date$1,
    url: type$1,
    hex: type$1,
    email: type$1,
    required: required$1,
    any
  };
  function newMessages() {
    return {
      "default": "Validation error on field %s",
      required: "%s is required",
      "enum": "%s must be one of %s",
      whitespace: "%s cannot be empty",
      date: {
        format: "%s date %s is invalid for format %s",
        parse: "%s date could not be parsed, %s is invalid ",
        invalid: "%s date %s is invalid"
      },
      types: {
        string: "%s is not a %s",
        method: "%s is not a %s (function)",
        array: "%s is not an %s",
        object: "%s is not an %s",
        number: "%s is not a %s",
        date: "%s is not a %s",
        "boolean": "%s is not a %s",
        integer: "%s is not an %s",
        "float": "%s is not a %s",
        regexp: "%s is not a valid %s",
        email: "%s is not a valid %s",
        url: "%s is not a valid %s",
        hex: "%s is not a valid %s"
      },
      string: {
        len: "%s must be exactly %s characters",
        min: "%s must be at least %s characters",
        max: "%s cannot be longer than %s characters",
        range: "%s must be between %s and %s characters"
      },
      number: {
        len: "%s must equal %s",
        min: "%s cannot be less than %s",
        max: "%s cannot be greater than %s",
        range: "%s must be between %s and %s"
      },
      array: {
        len: "%s must be exactly %s in length",
        min: "%s cannot be less than %s in length",
        max: "%s cannot be greater than %s in length",
        range: "%s must be between %s and %s in length"
      },
      pattern: {
        mismatch: "%s value %s does not match pattern %s"
      },
      clone: function clone() {
        var cloned = JSON.parse(JSON.stringify(this));
        cloned.clone = this.clone;
        return cloned;
      }
    };
  }
  var messages = newMessages();
  function Schema(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }
  Schema.prototype = {
    messages: function messages2(_messages) {
      if (_messages) {
        this._messages = deepMerge$1(newMessages(), _messages);
      }
      return this._messages;
    },
    define: function define(rules2) {
      if (!rules2) {
        throw new Error("Cannot configure a schema with no rules");
      }
      if (typeof rules2 !== "object" || Array.isArray(rules2)) {
        throw new Error("Rules must be an object");
      }
      this.rules = {};
      var z;
      var item;
      for (z in rules2) {
        if (rules2.hasOwnProperty(z)) {
          item = rules2[z];
          this.rules[z] = Array.isArray(item) ? item : [item];
        }
      }
    },
    validate: function validate(source_, o, oc) {
      var _this = this;
      if (o === void 0) {
        o = {};
      }
      if (oc === void 0) {
        oc = function oc2() {
        };
      }
      var source = source_;
      var options = o;
      var callback = oc;
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      if (!this.rules || Object.keys(this.rules).length === 0) {
        if (callback) {
          callback();
        }
        return Promise.resolve();
      }
      function complete(results) {
        var i;
        var errors = [];
        var fields = {};
        function add(e) {
          if (Array.isArray(e)) {
            var _errors;
            errors = (_errors = errors).concat.apply(_errors, e);
          } else {
            errors.push(e);
          }
        }
        for (i = 0; i < results.length; i++) {
          add(results[i]);
        }
        if (!errors.length) {
          errors = null;
          fields = null;
        } else {
          fields = convertFieldsError(errors);
        }
        callback(errors, fields);
      }
      if (options.messages) {
        var messages$1 = this.messages();
        if (messages$1 === messages) {
          messages$1 = newMessages();
        }
        deepMerge$1(messages$1, options.messages);
        options.messages = messages$1;
      } else {
        options.messages = this.messages();
      }
      var arr;
      var value;
      var series = {};
      var keys = options.keys || Object.keys(this.rules);
      keys.forEach(function(z) {
        arr = _this.rules[z];
        value = source[z];
        arr.forEach(function(r) {
          var rule = r;
          if (typeof rule.transform === "function") {
            if (source === source_) {
              source = _extends({}, source);
            }
            value = source[z] = rule.transform(value);
          }
          if (typeof rule === "function") {
            rule = {
              validator: rule
            };
          } else {
            rule = _extends({}, rule);
          }
          rule.validator = _this.getValidationMethod(rule);
          rule.field = z;
          rule.fullField = rule.fullField || z;
          rule.type = _this.getType(rule);
          if (!rule.validator) {
            return;
          }
          series[z] = series[z] || [];
          series[z].push({
            rule,
            value,
            source,
            field: z
          });
        });
      });
      var errorFields = {};
      return asyncMap(series, options, function(data, doIt) {
        var rule = data.rule;
        var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
        deep = deep && (rule.required || !rule.required && data.value);
        rule.field = data.field;
        function addFullfield(key, schema) {
          return _extends({}, schema, {
            fullField: rule.fullField + "." + key
          });
        }
        function cb(e) {
          if (e === void 0) {
            e = [];
          }
          var errors = e;
          if (!Array.isArray(errors)) {
            errors = [errors];
          }
          if (!options.suppressWarning && errors.length) {
            Schema.warning("async-validator:", errors);
          }
          if (errors.length && rule.message) {
            errors = [].concat(rule.message);
          }
          errors = errors.map(complementError(rule));
          if (options.first && errors.length) {
            errorFields[rule.field] = 1;
            return doIt(errors);
          }
          if (!deep) {
            doIt(errors);
          } else {
            if (rule.required && !data.value) {
              if (rule.message) {
                errors = [].concat(rule.message).map(complementError(rule));
              } else if (options.error) {
                errors = [options.error(rule, format(options.messages.required, rule.field))];
              } else {
                errors = [];
              }
              return doIt(errors);
            }
            var fieldsSchema = {};
            if (rule.defaultField) {
              for (var k in data.value) {
                if (data.value.hasOwnProperty(k)) {
                  fieldsSchema[k] = rule.defaultField;
                }
              }
            }
            fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);
            for (var f in fieldsSchema) {
              if (fieldsSchema.hasOwnProperty(f)) {
                var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
                fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
              }
            }
            var schema = new Schema(fieldsSchema);
            schema.messages(options.messages);
            if (data.rule.options) {
              data.rule.options.messages = options.messages;
              data.rule.options.error = options.error;
            }
            schema.validate(data.value, data.rule.options || options, function(errs) {
              var finalErrors = [];
              if (errors && errors.length) {
                finalErrors.push.apply(finalErrors, errors);
              }
              if (errs && errs.length) {
                finalErrors.push.apply(finalErrors, errs);
              }
              doIt(finalErrors.length ? finalErrors : null);
            });
          }
        }
        var res;
        if (rule.asyncValidator) {
          res = rule.asyncValidator(rule, data.value, cb, data.source, options);
        } else if (rule.validator) {
          res = rule.validator(rule, data.value, cb, data.source, options);
          if (res === true) {
            cb();
          } else if (res === false) {
            cb(rule.message || rule.field + " fails");
          } else if (res instanceof Array) {
            cb(res);
          } else if (res instanceof Error) {
            cb(res.message);
          }
        }
        if (res && res.then) {
          res.then(function() {
            return cb();
          }, function(e) {
            return cb(e);
          });
        }
      }, function(results) {
        complete(results);
      });
    },
    getType: function getType(rule) {
      if (rule.type === void 0 && rule.pattern instanceof RegExp) {
        rule.type = "pattern";
      }
      if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
        throw new Error(format("Unknown rule type %s", rule.type));
      }
      return rule.type || "string";
    },
    getValidationMethod: function getValidationMethod(rule) {
      if (typeof rule.validator === "function") {
        return rule.validator;
      }
      var keys = Object.keys(rule);
      var messageIndex = keys.indexOf("message");
      if (messageIndex !== -1) {
        keys.splice(messageIndex, 1);
      }
      if (keys.length === 1 && keys[0] === "required") {
        return validators.required;
      }
      return validators[this.getType(rule)] || false;
    }
  };
  Schema.register = function register(type2, validator2) {
    if (typeof validator2 !== "function") {
      throw new Error("Cannot register a validator by type, validator is not a function");
    }
    validators[type2] = validator2;
  };
  Schema.warning = warning;
  Schema.messages = messages;
  Schema.warning = function() {
  };
  const _sfc_main$q = {
    name: "u-form-item",
    mixins: [Emitter],
    inject: {
      uForm: {
        default() {
          return null;
        }
      }
    },
    props: {
      label: {
        type: String,
        default: ""
      },
      prop: {
        type: String,
        default: ""
      },
      borderBottom: {
        type: [String, Boolean],
        default: ""
      },
      labelPosition: {
        type: String,
        default: ""
      },
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      labelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      labelAlign: {
        type: String,
        default: ""
      },
      rightIcon: {
        type: String,
        default: ""
      },
      leftIcon: {
        type: String,
        default: ""
      },
      leftIconStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      rightIconStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      required: {
        type: Boolean,
        default: false
      },
      inputAlign: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        initialValue: "",
        validateState: "",
        validateMessage: "",
        errorType: ["message"],
        fieldValue: "",
        parentData: {
          borderBottom: true,
          labelWidth: 90,
          labelPosition: "left",
          labelStyle: {},
          labelAlign: "left",
          inputAlign: "left"
        }
      };
    },
    watch: {
      validateState(val) {
        this.broadcastInputError();
      },
      "uForm.errorType"(val) {
        this.errorType = val;
        this.broadcastInputError();
      }
    },
    computed: {
      uLabelWidth() {
        return this.elLabelPosition == "left" ? this.label === "true" || this.label === "" ? "auto" : this.$u.addUnit(this.elLabelWidth) : "100%";
      },
      showError() {
        return (type2) => {
          if (this.errorType.indexOf("none") >= 0)
            return false;
          else if (this.errorType.indexOf(type2) >= 0)
            return true;
          else
            return false;
        };
      },
      elLabelWidth() {
        return this.labelWidth != 0 || this.labelWidth != "" ? this.labelWidth : this.parentData.labelWidth ? this.parentData.labelWidth : 90;
      },
      elLabelStyle() {
        return Object.keys(this.labelStyle).length ? this.labelStyle : this.parentData.labelStyle ? this.parentData.labelStyle : {};
      },
      elLabelPosition() {
        return this.labelPosition ? this.labelPosition : this.parentData.labelPosition ? this.parentData.labelPosition : "left";
      },
      elLabelAlign() {
        return this.labelAlign ? this.labelAlign : this.parentData.labelAlign ? this.parentData.labelAlign : "left";
      },
      elBorderBottom() {
        return this.borderBottom !== "" ? this.borderBottom : this.parentData.borderBottom ? this.parentData.borderBottom : true;
      },
      elInputAlign() {
        return this.inputAlign ? this.inputAlign : this.parentData.inputAlign ? this.parentData.inputAlign : "left";
      }
    },
    methods: {
      broadcastInputError() {
        this.broadcast("u-input", "onFormItemError", this.validateState === "error" && this.showError("border"));
      },
      setRules() {
      },
      getRules() {
        let rules2 = this.parent.rules;
        rules2 = rules2 ? rules2[this.prop] : [];
        return [].concat(rules2 || []);
      },
      onFieldBlur() {
        this.validation("blur");
      },
      onFieldChange() {
        this.validation("change");
      },
      getFilteredRule(triggerType = "") {
        let rules2 = this.getRules();
        if (!triggerType)
          return rules2;
        return rules2.filter((res) => res.trigger && res.trigger.indexOf(triggerType) !== -1);
      },
      getData(dataObj, name, defaultValue) {
        let newDataObj;
        if (dataObj) {
          newDataObj = JSON.parse(JSON.stringify(dataObj));
          let k = "", d = ".", l = "[", r = "]";
          name = name.replace(/\s+/g, k) + d;
          let tstr = k;
          for (let i = 0; i < name.length; i++) {
            let theChar = name.charAt(i);
            if (theChar != d && theChar != l && theChar != r) {
              tstr += theChar;
            } else if (newDataObj) {
              if (tstr != k)
                newDataObj = newDataObj[tstr];
              tstr = k;
            }
          }
        }
        if (typeof newDataObj === "undefined" && typeof defaultValue !== "undefined")
          newDataObj = defaultValue;
        return newDataObj;
      },
      setData(dataObj, name, value) {
        let dataValue;
        if (typeof value === "object") {
          dataValue = JSON.parse(JSON.stringify(value));
        } else {
          dataValue = value;
        }
        let regExp = new RegExp("([\\w$]+)|\\[(:\\d)\\]", "g");
        const patten = name.match(regExp);
        for (let i = 0; i < patten.length - 1; i++) {
          let keyName = patten[i];
          if (typeof dataObj[keyName] !== "object")
            dataObj[keyName] = {};
          dataObj = dataObj[keyName];
        }
        dataObj[patten[patten.length - 1]] = dataValue;
      },
      validation(trigger, callback = () => {
      }) {
        this.fieldValue = this.getData(this.parent.model, this.prop);
        let rules2 = this.getFilteredRule(trigger);
        if (!rules2 || rules2.length === 0) {
          return callback("");
        }
        this.validateState = "validating";
        let validator2 = new Schema({
          [this.prop]: rules2
        });
        validator2.validate({
          [this.prop]: this.fieldValue
        }, {
          firstFields: true
        }, (errors, fields) => {
          this.validateState = !errors ? "success" : "error";
          this.validateMessage = errors ? errors[0].message : "";
          let field = errors ? errors[0].field : "";
          callback(this.validateMessage, {
            state: this.validateState,
            key: field,
            msg: this.validateMessage
          });
        });
      },
      resetField() {
        this.setData(this.parent.model, this.prop, this.initialValue);
        this.validateState = "success";
      }
    },
    mounted() {
      this.parent = this.$u.$parent.call(this, "u-form");
      if (this.parent) {
        Object.keys(this.parentData).map((key) => {
          this.parentData[key] = this.parent[key];
        });
        if (this.prop) {
          this.parent.fields.push(this);
          this.errorType = this.parent.errorType;
          this.initialValue = this.fieldValue;
          this.$nextTick(() => {
            this.setRules();
          });
        }
      }
    },
    beforeUnmount() {
      if (this.parent && this.prop) {
        this.parent.fields.map((item, index) => {
          if (item === this)
            this.parent.fields.splice(index, 1);
        });
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["u-form-item", { "u-border-bottom": $options.elBorderBottom, "u-form-item__border-bottom--error": $data.validateState === "error" && $options.showError("border-bottom") }])
    }, [
      vue.createElementVNode("view", {
        class: "u-form-item__body",
        style: vue.normalizeStyle({
          flexDirection: $options.elLabelPosition == "left" ? "row" : "column"
        })
      }, [
        vue.createCommentVNode(' \u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u4E2D\uFF0C\u5C06\u4E00\u4E2A\u53C2\u6570\u8BBE\u7F6E\u7A7A\u5B57\u7B26\u4E32\uFF0C\u7ED3\u679C\u4F1A\u53D8\u6210\u5B57\u7B26\u4E32"true" '),
        vue.createElementVNode("view", {
          class: "u-form-item--left",
          style: vue.normalizeStyle({
            width: $options.uLabelWidth,
            flex: `0 0 ${$options.uLabelWidth}`,
            marginBottom: $options.elLabelPosition == "left" ? 0 : "10rpx"
          })
        }, [
          vue.createCommentVNode(" \u4E3A\u4E86\u5757\u5BF9\u9F50 "),
          $props.required || $props.leftIcon || $props.label ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "u-form-item--left__content"
          }, [
            vue.createCommentVNode(" nvue\u4E0D\u652F\u6301\u4F2A\u5143\u7D20before "),
            $props.required ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "u-form-item--left__content--required"
            }, "*")) : vue.createCommentVNode("v-if", true),
            $props.leftIcon ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "u-form-item--left__content__icon"
            }, [
              vue.createVNode(_component_u_icon, {
                name: $props.leftIcon,
                "custom-style": $props.leftIconStyle
              }, null, 8, ["name", "custom-style"])
            ])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", {
              class: "u-form-item--left__content__label",
              style: vue.normalizeStyle([$options.elLabelStyle, {
                "justify-content": $options.elLabelAlign == "left" ? "flex-start" : $options.elLabelAlign == "center" ? "center" : "flex-end"
              }])
            }, vue.toDisplayString($props.label), 5)
          ])) : vue.createCommentVNode("v-if", true)
        ], 4),
        vue.createElementVNode("view", { class: "u-form-item--right u-flex" }, [
          vue.createElementVNode("view", { class: "u-form-item--right__content" }, [
            vue.createElementVNode("view", {
              class: "u-form-item--right__content__slot",
              style: vue.normalizeStyle($options.elLabelPosition == "left" && $options.elInputAlign == "right" ? "text-align:right;display: inline-block;line-height:initial;" : "")
            }, [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 4),
            _ctx.$slots.right || $props.rightIcon ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "u-form-item--right__content__icon u-flex"
            }, [
              $props.rightIcon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                key: 0,
                "custom-style": $props.rightIconStyle,
                name: $props.rightIcon
              }, null, 8, ["custom-style", "name"])) : vue.createCommentVNode("v-if", true),
              vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ])
      ], 4),
      $data.validateState === "error" && $options.showError("message") ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "u-form-item__message",
        style: vue.normalizeStyle({
          paddingLeft: $options.elLabelPosition == "left" ? _ctx.$u.addUnit($options.elLabelWidth) : "0",
          textAlign: $options.elInputAlign == "right" ? "right" : "left"
        })
      }, vue.toDisplayString($data.validateMessage), 5)) : vue.createCommentVNode("v-if", true)
    ], 2);
  }
  var __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$i], ["__scopeId", "data-v-3c456ae0"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-form-item/u-form-item.vue"]]);
  const _sfc_main$p = {
    name: "u-form",
    props: {
      model: {
        type: Object,
        default() {
          return {};
        }
      },
      errorType: {
        type: Array,
        default() {
          return ["message", "toast"];
        }
      },
      borderBottom: {
        type: Boolean,
        default: true
      },
      labelPosition: {
        type: String,
        default: "left"
      },
      labelWidth: {
        type: [String, Number],
        default: 90
      },
      labelAlign: {
        type: String,
        default: "left"
      },
      labelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      inputAlign: {
        type: String,
        default: "left"
      },
      clearable: {
        type: Boolean,
        default: true
      }
    },
    provide() {
      return {
        uForm: this
      };
    },
    data() {
      return {
        rules: {}
      };
    },
    created() {
      this.fields = [];
    },
    methods: {
      setRules(rules2) {
        this.rules = rules2;
      },
      resetFields() {
        this.fields.map((field) => {
          field.resetField();
        });
      },
      validate(callback) {
        return new Promise((resolve) => {
          let valid = true;
          let count = 0;
          let errorArr = [];
          let errorObjArr = [];
          this.fields.map((field) => {
            field.validation("", (errorMsg, errObj) => {
              if (errorMsg) {
                valid = false;
                errorArr.push(errorMsg);
                errorObjArr.push(errObj);
              }
              if (++count === this.fields.length) {
                resolve(valid, errorObjArr[0]);
                if (this.errorType.indexOf("none") === -1 && this.errorType.indexOf("toast") >= 0 && errorArr.length) {
                  this.$u.toast(errorArr[0]);
                }
                if (typeof callback == "function")
                  callback(valid, errorObjArr[0]);
              }
            });
          });
        });
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-form" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  var __easycom_7 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$h], ["__scopeId", "data-v-006d3b56"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-form/u-form.vue"]]);
  const _sfc_main$o = {
    name: "u-button",
    emits: ["click", "getphonenumber", "getuserinfo", "error", "opensetting", "launchapp"],
    props: {
      hairLine: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: "default"
      },
      size: {
        type: String,
        default: "default"
      },
      shape: {
        type: String,
        default: "square"
      },
      plain: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      openType: {
        type: String,
        default: ""
      },
      formType: {
        type: String,
        default: ""
      },
      appParameter: {
        type: String,
        default: ""
      },
      hoverStopPropagation: {
        type: Boolean,
        default: false
      },
      lang: {
        type: String,
        default: "en"
      },
      sessionFrom: {
        type: String,
        default: ""
      },
      sendMessageTitle: {
        type: String,
        default: ""
      },
      sendMessagePath: {
        type: String,
        default: ""
      },
      sendMessageImg: {
        type: String,
        default: ""
      },
      showMessageCard: {
        type: Boolean,
        default: false
      },
      hoverBgColor: {
        type: String,
        default: ""
      },
      rippleBgColor: {
        type: String,
        default: ""
      },
      ripple: {
        type: Boolean,
        default: false
      },
      hoverClass: {
        type: String,
        default: ""
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      dataName: {
        type: String,
        default: ""
      },
      throttleTime: {
        type: [String, Number],
        default: 500
      },
      hoverStartTime: {
        type: [String, Number],
        default: 20
      },
      hoverStayTime: {
        type: [String, Number],
        default: 150
      },
      timerId: {
        type: [String, Number]
      }
    },
    computed: {
      getHoverClass() {
        if (this.loading || this.disabled || this.ripple || this.hoverClass)
          return "";
        let hoverClass = "";
        hoverClass = this.plain ? "u-" + this.type + "-plain-hover" : "u-" + this.type + "-hover";
        return hoverClass;
      },
      showHairLineBorder() {
        if (["primary", "success", "error", "warning"].indexOf(this.type) >= 0 && !this.plain) {
          return "";
        } else {
          return "u-hairline-border";
        }
      }
    },
    data() {
      let btnTimerId = this.timerId || "button_" + Math.floor(Math.random() * 1e8 + 0);
      return {
        btnTimerId,
        rippleTop: 0,
        rippleLeft: 0,
        fields: {},
        waveActive: false
      };
    },
    methods: {
      click(e) {
        this.$u.throttle(() => {
          if (this.loading === true || this.disabled === true)
            return;
          if (this.ripple) {
            this.waveActive = false;
            this.$nextTick(function() {
              this.getWaveQuery(e);
            });
          }
          this.$emit("click", e);
        }, this.throttleTime, true, this.btnTimerId);
      },
      getWaveQuery(e) {
        this.getElQuery().then((res) => {
          let data = res[0];
          if (!data.width || !data.width)
            return;
          data.targetWidth = data.height > data.width ? data.height : data.width;
          if (!data.targetWidth)
            return;
          this.fields = data;
          let touchesX = "", touchesY = "";
          touchesX = e.touches[0].clientX;
          touchesY = e.touches[0].clientY;
          this.rippleTop = touchesY - data.top - data.targetWidth / 2;
          this.rippleLeft = touchesX - data.left - data.targetWidth / 2;
          this.$nextTick(() => {
            this.waveActive = true;
          });
        });
      },
      getElQuery() {
        return new Promise((resolve) => {
          let queryInfo = "";
          queryInfo = uni.createSelectorQuery().in(this);
          queryInfo.select(".u-btn").boundingClientRect();
          queryInfo.exec((data) => {
            resolve(data);
          });
        });
      },
      getphonenumber(res) {
        this.$emit("getphonenumber", res);
      },
      getuserinfo(res) {
        this.$emit("getuserinfo", res);
      },
      error(res) {
        this.$emit("error", res);
      },
      opensetting(res) {
        this.$emit("opensetting", res);
      },
      launchapp(res) {
        this.$emit("launchapp", res);
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("button", {
      id: "u-wave-btn",
      class: vue.normalizeClass(["u-btn u-line-1 u-fix-ios-appearance", [
        "u-size-" + $props.size,
        $props.plain ? "u-btn--" + $props.type + "--plain" : "",
        $props.loading ? "u-loading" : "",
        $props.shape == "circle" ? "u-round-circle" : "",
        $props.hairLine ? $options.showHairLineBorder : "u-btn--bold-border",
        "u-btn--" + $props.type,
        $props.disabled ? `u-btn--${$props.type}--disabled` : ""
      ]]),
      "hover-start-time": Number($props.hoverStartTime),
      "hover-stay-time": Number($props.hoverStayTime),
      disabled: $props.disabled,
      "form-type": $props.formType,
      "open-type": $props.openType,
      "app-parameter": $props.appParameter,
      "hover-stop-propagation": $props.hoverStopPropagation,
      "send-message-title": $props.sendMessageTitle,
      "send-message-path": "sendMessagePath",
      lang: $props.lang,
      "data-name": $props.dataName,
      "session-from": $props.sessionFrom,
      "send-message-img": $props.sendMessageImg,
      "show-message-card": $props.showMessageCard,
      onGetphonenumber: _cache[0] || (_cache[0] = (...args) => $options.getphonenumber && $options.getphonenumber(...args)),
      onGetuserinfo: _cache[1] || (_cache[1] = (...args) => $options.getuserinfo && $options.getuserinfo(...args)),
      onError: _cache[2] || (_cache[2] = (...args) => $options.error && $options.error(...args)),
      onOpensetting: _cache[3] || (_cache[3] = (...args) => $options.opensetting && $options.opensetting(...args)),
      onLaunchapp: _cache[4] || (_cache[4] = (...args) => $options.launchapp && $options.launchapp(...args)),
      style: vue.normalizeStyle([$props.customStyle, {
        overflow: $props.ripple ? "hidden" : "visible"
      }]),
      onClick: _cache[5] || (_cache[5] = vue.withModifiers(($event) => $options.click($event), ["stop"])),
      "hover-class": $options.getHoverClass,
      loading: $props.loading
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.ripple ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: vue.normalizeClass(["u-wave-ripple", [$data.waveActive ? "u-wave-active" : ""]]),
        style: vue.normalizeStyle({
          top: $data.rippleTop + "px",
          left: $data.rippleLeft + "px",
          width: $data.fields.targetWidth + "px",
          height: $data.fields.targetWidth + "px",
          "background-color": $props.rippleBgColor || "rgba(0, 0, 0, 0.15)"
        })
      }, null, 6)) : vue.createCommentVNode("v-if", true)
    ], 46, ["hover-start-time", "hover-stay-time", "disabled", "form-type", "open-type", "app-parameter", "hover-stop-propagation", "send-message-title", "lang", "data-name", "session-from", "send-message-img", "show-message-card", "hover-class", "loading"]);
  }
  var __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$g], ["__scopeId", "data-v-00138ed6"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-button/u-button.vue"]]);
  const config$1 = {
    base_url: "http://175.178.17.109:8080/"
  };
  const _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
    __name: "login",
    setup(__props) {
      const src = "http://cdn.ut.tj.cn/static/auction.png";
      const form = vue.reactive({
        username: "admin",
        password: "qwer1234"
      });
      const toRegister = () => {
        uni.navigateTo({
          url: "/pages/user/register"
        });
      };
      const toLogin = () => {
        if (form.username == null || form.password.length <= 5) {
          formatAppLog("log", "at pages/login/login.vue:41", "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u8D26\u53F7\u4E0E\u5BC6\u7801");
        } else {
          formatAppLog("log", "at pages/login/login.vue:43", form);
          uni.request({
            url: config$1.base_url + "login",
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
                formatAppLog("log", "at pages/login/login.vue:65", res.data.data.tokenHead + " " + res.data.data.token);
                uni.setStorageSync("token", res.data.data.tokenHead + " " + res.data.data.token);
                setTimeout(() => {
                  if (uni.getStorageSync("token") != null) {
                    uni.switchTab({
                      url: "/pages/product/product"
                    });
                  }
                }, 1e3);
              } else {
                formatAppLog("log", "at pages/login/login.vue:75", res.data.msg);
              }
            }
          });
        }
      };
      return (_ctx, _cache) => {
        const _component_u_image = resolveEasycom(vue.resolveDynamicComponent("u-image"), __easycom_0$5);
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_0$4);
        const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_1$4);
        const _component_u_form = resolveEasycom(vue.resolveDynamicComponent("u-form"), __easycom_7);
        const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_1$3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "login" }, [
          vue.createElementVNode("view", { class: "login-header" }, [
            vue.createElementVNode("view", { class: "login-icon" }, [
              vue.createVNode(_component_u_image, {
                width: "40rpx",
                height: "40rpx",
                src
              })
            ]),
            vue.createElementVNode("view", { class: "login-title" }, "\u57FA\u4E8E\u533A\u5757\u94FE\u7684\u62CD\u5356\u5E73\u53F0")
          ]),
          vue.createVNode(_component_u_form, {
            model: form,
            ref: "uForm",
            style: { "margin": "10rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_u_form_item, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    modelValue: form.username,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.username = $event),
                    placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              vue.createVNode(_component_u_form_item, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    type: "password",
                    modelValue: form.password,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.password = $event),
                    placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"]),
          vue.createVNode(_component_u_button, {
            type: "primary",
            onClick: toLogin,
            style: { "margin": "10rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("\u767B\u5F55")
            ]),
            _: 1
          }),
          vue.createVNode(_component_u_button, {
            type: "primary",
            onClick: toRegister,
            style: { "margin": "10rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("\u6CE8\u518C")
            ]),
            _: 1
          })
        ]);
      };
    }
  });
  var PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-23b3be22"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/login/login.vue"]]);
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * pinia v2.0.23
    * (c) 2022 Eduardo San Martin Morote
    * @license MIT
    */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url2, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url2);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url2) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url2, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : "msSaveOrOpenBlob" in _navigator ? msSaveAs : fileSaverSaveAs;
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url2 = reader.result;
        if (typeof url2 !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url2 = isChromeIOS ? url2 : url2.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url2;
        } else {
          location.assign(url2);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url2 = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url2);
      else
        location.href = url2;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url2);
      }, 4e4);
    }
  }
  function toastMessage(message, type2) {
    const piniaMessage = "\u{1F34D} " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type2);
    } else if (type2 === "error") {
      console.error(piniaMessage);
    } else if (type2 === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      pinia.state.value = JSON.parse(await navigator.clipboard.readText());
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia.state.value = JSON.parse(text);
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "\u{1F34D} Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store2) {
    return isPinia(store2) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store2.$id,
      label: store2.$id
    };
  }
  function formatStoreForInspectorState(store2) {
    if (isPinia(store2)) {
      const storeNames = Array.from(store2._s.keys());
      const storeMap = store2._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store2.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store3 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store3._getters.reduce((getters, key) => {
              getters[key] = store3[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store2.$state).map((key) => ({
        editable: true,
        key,
        value: store2.$state[key]
      }))
    };
    if (store2._getters && store2._getters.length) {
      state.getters = store2._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store2[getterName]
      }));
    }
    if (store2._customProperties.size) {
      state.customProperties = Array.from(store2._customProperties).map((key) => ({
        editable: true,
        key,
        value: store2[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type2) {
    switch (type2) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const getStoreType = (id) => "\u{1F34D} " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia \u{1F34D}",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia \u{1F34D}`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia \u{1F34D}",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: "Reset the state (option store only)",
            action: (nodeId) => {
              const store2 = pinia._s.get(nodeId);
              if (!store2) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (!store2._isOptionsAPI) {
                toastMessage(`Cannot reset "${nodeId}" store because it's a setup store.`, "warn");
              } else {
                store2.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store2) => {
            payload.instanceData.state.push({
              type: getStoreType(store2.$id),
              key: "state",
              editable: true,
              value: store2._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store2.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store2.$reset()
                    }
                  ]
                }
              } : Object.keys(store2.$state).reduce((state, key) => {
                state[key] = store2.$state[key];
                return state;
              }, {})
            });
            if (store2._getters && store2._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store2.$id),
                key: "getters",
                editable: false,
                value: store2._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store2[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store2) => "$id" in store2 ? store2.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("\u{1F34D}")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store2 = pinia._s.get(storeId);
          if (!store2) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store2, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store2) {
    if (!componentStateTypes.includes(getStoreType(store2.$id))) {
      componentStateTypes.push(getStoreType(store2.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia \u{1F34D}",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store2.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "\u{1F6EB} " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store2.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "\u{1F6EC} " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store2.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "\u{1F4A5} " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store2.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store2._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store2[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store2.$subscribe(({ events, type: type2 }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type2),
          data: {
            store: formatDisplay(store2.$id),
            ...formatEventData(events)
          },
          groupId: activeAction
        };
        activeAction = void 0;
        if (type2 === MutationType.patchFunction) {
          eventData.subtitle = "\u2935\uFE0F";
        } else if (type2 === MutationType.patchObject) {
          eventData.subtitle = "\u{1F9E9}";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store2._hotUpdate;
      store2._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "\u{1F525} " + store2.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store2.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store2;
      store2.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store2.$id}" store \u{1F5D1}`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store2.$id}" store installed \u{1F195}`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store2, actionNames) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store2)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store2[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = new Proxy(store2, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        });
        return actions[actionName].apply(trackedStore, arguments);
      };
    }
  }
  function devtoolsPlugin({ app, store: store2, options }) {
    if (store2.$id.startsWith("__hot:")) {
      return;
    }
    if (options.state) {
      store2._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
      patchActionForGrouping(
        store2,
        Object.keys(options.actions)
      );
      const originalHotUpdate = store2._hotUpdate;
      vue.toRaw(store2)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store2, Object.keys(newStore._hmrPayload.actions));
      };
    }
    addStoreToDevtools(
      app,
      store2
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentInstance()) {
      vue.onUnmounted(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
    return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store2;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? vue.toRefs(vue.ref(state ? state() : {}).value) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[\u{1F34D}]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store3 = pinia._s.get(id);
          return getters[name].call(store3, store3);
        }));
        return computedGetters;
      }, {}));
    }
    store2 = createSetupStore(id, setup, options, pinia, hot, true);
    store2.$reset = function $reset() {
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    };
    return store2;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store2._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("\u{1F34D} debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = vue.markRaw([]);
    let actionSubscriptions = vue.markRaw([]);
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = () => {
      throw new Error(`\u{1F34D}: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    };
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store: store2,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store2, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store2 = vue.reactive(
      assign(
        {
          _hmrPayload,
          _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
        },
        partialStore
      )
    );
    pinia._s.set($id, store2);
    const setupStore2 = pinia._e.run(() => {
      scope = vue.effectScope();
      return scope.run(() => setup());
    });
    for (const key in setupStore2) {
      const prop = setupStore2[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore2, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore2[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? options.getters[key] : prop;
          if (IS_CLIENT) {
            const getters = setupStore2._getters || (setupStore2._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store2, setupStore2);
      assign(vue.toRaw(store2), setupStore2);
    }
    Object.defineProperty(store2, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store2._hotUpdate = vue.markRaw((newStore) => {
        store2._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store2.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store2.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store2, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store2.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store2, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store2, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? vue.computed(() => {
            setActivePinia(pinia);
            return getter.call(store2, store2);
          }) : getter;
          set(store2, getterName, getterValue);
        }
        Object.keys(store2._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store2, key);
          }
        });
        Object.keys(store2._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store2, key);
          }
        });
        store2._hmrPayload = newStore._hmrPayload;
        store2._getters = newStore._getters;
        store2._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
        Object.defineProperty(store2, p, {
          value: store2[p],
          ...nonEnumerable
        });
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store: store2,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store2._customProperties.add(key));
        assign(store2, extensions);
      } else {
        assign(store2, scope.run(() => extender({
          store: store2,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store2.$state && typeof store2.$state === "object" && typeof store2.$state.constructor === "function" && !store2.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[\u{1F34D}]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store2.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store2.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store2;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
    }
    function useStore(pinia, hot) {
      const currentInstance = vue.getCurrentInstance();
      pinia = pinia || currentInstance && vue.inject(piniaSymbol);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[\u{1F34D}]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store2 = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT && currentInstance && currentInstance.proxy && !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store2;
      }
      return store2;
    }
    useStore.$id = id;
    return useStore;
  }
  const useAppStore = defineStore({
    id: "app-store",
    state: () => ({
      test: "\u4ED3\u5E93\u6D4B\u8BD5\u503C"
    }),
    getters: {
      getTest() {
        return this.test;
      }
    },
    actions: {
      changeVal() {
        this.test = "\u6539\u53D8\u503C\u4E3A\uFF1A14";
      }
    }
  });
  const _sfc_main$m = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const title = vue.ref("Hello");
      const useAppState = useAppStore();
      const test2 = vue.computed(() => useAppState.getTest);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
          vue.createElementVNode("image", {
            class: "logo",
            src: "/static/logo.png"
          }),
          vue.createElementVNode("view", { class: "text-area" }, [
            vue.createElementVNode("text", { class: "title" }, vue.toDisplayString(title.value), 1)
          ]),
          vue.createElementVNode("view", null, vue.toDisplayString(vue.unref(test2)), 1)
        ]);
      };
    }
  });
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/index/index.vue"]]);
  let base64Avatar = "data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMEQwRkY0RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMEQwRkY1RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQwRDBGRjJGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwRDBGRjNGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDg8QDw4MExMUFBMTHBsbGxwfHx8fHx8fHx8fAQcHBw0MDRgQEBgaFREVGh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCADIAMgDAREAAhEBAxEB/8QAcQABAQEAAwEBAAAAAAAAAAAAAAUEAQMGAgcBAQAAAAAAAAAAAAAAAAAAAAAQAAIBAwICBgkDBQAAAAAAAAABAhEDBCEFMVFBYXGREiKBscHRMkJSEyOh4XLxYjNDFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHbHFyZ/Dam+yLA+Z2L0Pjtyj2poD4AAAAAAAAAAAAAAAAAAAAAAAAKWFs9y6lcvvwQeqj8z9wFaziY1n/HbUX9XF97A7QAGXI23EvJ1goyfzR0YEfN269jeZ+a03pNe0DIAAAAAAAAAAAAAAAAAAAACvtO3RcVkXlWutuL9YFYAAAAAOJRjKLjJVi9GmB5/csH/mu1h/in8PU+QGMAAAAAAAAAAAAAAAAAAaMDG/6MmMH8C80+xAelSSVFolwQAAAAAAAHVlWI37ErUulaPk+hgeYnCUJuElSUXRrrQHAAAAAAAAAAAAAAAAABa2Oz4bM7r4zdF2ICmAAAAAAAAAg7zZ8GX41wuJP0rRgYAAAAAAAAAAAAAAAAAD0m2R8ODaXU33tsDSAAAAAAAAAlb9HyWZcnJd9PcBHAAAAAAAAAAAAAAAAAPS7e64Vn+KA0AAAAAAAAAJm+v8Ftf3ewCKAAAAAAAAAAAAAAAAAX9muqeGo9NttP06+0DcAAAAAAAAAjb7dTu2ra+VOT9P8AQCWAAAAAAAAAAAAAAAAAUNmyPt5Ltv4bui/kuAF0AAAAAAADiUlGLlJ0SVW+oDzOXfd/Ind6JPRdS0QHSAAAAAAAAAAAAAAAAAE2nVaNcGB6Lbs6OTao9LsF51z60BrAAAAAABJ3jOVHjW3r/sa9QEgAAAAAAAAAAAAAAAAAAAPu1duWriuW34ZR4MC9hbnZyEoy8l36XwfYBsAAADaSq9EuLAlZ+7xSdrGdW9Hc5dgEdtt1erfFgAAAAAAAAAAAAAAAAADVjbblX6NR8MH80tEBRs7HYivyzlN8lovaBPzduvY0m6eK10TXtAyAarO55lpJK54orolr+4GqO/Xaea1FvqbXvA+Z77kNeW3GPbV+4DJfzcm/pcm3H6Vou5AdAFLC2ed2Pjv1txa8sV8T6wOL+yZEKu1JXFy4MDBOE4ScZxcZLinoB8gAAAAAAAAAAAB242LeyJ+C3GvN9C7QLmJtePYpKS+5c+p8F2IDYAANJqj1T4oCfk7Nj3G5Wn9qXJax7gJ93Z82D8sVNc4v30A6Xg5i42Z+iLfqARwcyT0sz9MWvWBps7LlTf5Grce9/oBTxdtxseklHxT+uWr9AGoAB138ezfj4bsFJdD6V2MCPm7RdtJzs1uW1xXzL3gTgAAAAAAAAADRhYc8q74I6RWs5ckB6GxYtWLat21SK731sDsAAAAAAAAAAAAAAAASt021NO/YjrxuQXT1oCOAAAAAAABzGLlJRSq26JAelwsWONYjbXxcZvmwO8AAAAAAAAAAAAAAAAAAef3TEWPkVivx3NY9T6UBiAAAAAABo2+VmGXblddIJ8eivRUD0oAAAAAAAAAAAAAAAAAAAYt4tKeFKVNYNSXfRgefAAAAAAAAr7VuSSWPedKaW5v1MCsAAAAAAAAAAAAAAAAAAIe6bj96Ts2n+JPzSXzP3ATgAAAAAAAAFbbt1UUrOQ9FpC4/UwK6aaqtU+DAAAAAAAAAAAAAAA4lKMIuUmoxWrb4ARNx3R3q2rLpa4Sl0y/YCcAAAAAAAAAAANmFud7G8r89r6X0dgFvGzLGRGtuWvTF6NAdwAAAAAAAAAAAy5W442PVN+K59EePp5ARMvOv5MvO6QXCC4AZwAAAAAAAAAAAAAcxlKLUotprg1owN+PvORborq+7Hnwl3gUbO74VzRydt8pKn68ANcJwmqwkpLmnUDkAAAAfNy9atqtyagut0AxXt5xIV8Fbj6lRd7Am5G65V6qUvtwfyx94GMAAAAAAAAAAAAAAAAAAAOU2nVOj5gdsc3LiqRvTpyqwOxbnnrhdfpSfrQB7pnv/AGvuS9gHXPMy5/Fem1yq0v0A6W29XqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z";
  const _sfc_main$l = {
    name: "u-avatar",
    emits: ["click"],
    props: {
      bgColor: {
        type: String,
        default: "transparent"
      },
      src: {
        type: String,
        default: ""
      },
      size: {
        type: [String, Number],
        default: "default"
      },
      mode: {
        type: String,
        default: "circle"
      },
      text: {
        type: String,
        default: ""
      },
      imgMode: {
        type: String,
        default: "aspectFill"
      },
      index: {
        type: [String, Number],
        default: ""
      },
      sexIcon: {
        type: String,
        default: "man"
      },
      levelIcon: {
        type: String,
        default: "level"
      },
      levelBgColor: {
        type: String,
        default: ""
      },
      sexBgColor: {
        type: String,
        default: ""
      },
      showSex: {
        type: Boolean,
        default: false
      },
      showLevel: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        error: false,
        avatar: this.src ? this.src : base64Avatar
      };
    },
    watch: {
      src(n) {
        if (!n) {
          this.avatar = base64Avatar;
          this.error = true;
        } else {
          this.avatar = n;
          this.error = false;
        }
      }
    },
    computed: {
      wrapStyle() {
        let style = {};
        style.height = this.size == "large" ? "120rpx" : this.size == "default" ? "90rpx" : this.size == "mini" ? "70rpx" : this.size + "rpx";
        style.width = style.height;
        style.flex = `0 0 ${style.height}`;
        style.backgroundColor = this.bgColor;
        style.borderRadius = this.mode == "circle" ? "500px" : "5px";
        if (this.text)
          style.padding = `0 6rpx`;
        return style;
      },
      imgStyle() {
        let style = {};
        style.borderRadius = this.mode == "circle" ? "500px" : "5px";
        return style;
      },
      uText() {
        return String(this.text)[0];
      },
      uSexStyle() {
        let style = {};
        if (this.sexBgColor)
          style.backgroundColor = this.sexBgColor;
        return style;
      },
      uLevelStyle() {
        let style = {};
        if (this.levelBgColor)
          style.backgroundColor = this.levelBgColor;
        return style;
      }
    },
    methods: {
      loadError() {
        this.error = true;
        this.avatar = base64Avatar;
      },
      click() {
        this.$emit("click", this.index);
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "u-avatar",
      style: vue.normalizeStyle([$options.wrapStyle]),
      onClick: _cache[1] || (_cache[1] = (...args) => $options.click && $options.click(...args))
    }, [
      !$options.uText && $data.avatar ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        onError: _cache[0] || (_cache[0] = (...args) => $options.loadError && $options.loadError(...args)),
        style: vue.normalizeStyle([$options.imgStyle]),
        class: "u-avatar__img",
        src: $data.avatar,
        mode: $props.imgMode
      }, null, 44, ["src", "mode"])) : $options.uText ? (vue.openBlock(), vue.createElementBlock("text", {
        key: 1,
        class: "u-line-1",
        style: {
          fontSize: "38rpx"
        }
      }, vue.toDisplayString($options.uText), 1)) : vue.renderSlot(_ctx.$slots, "default", { key: 2 }, void 0, true),
      $props.showSex ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 3,
        class: vue.normalizeClass(["u-avatar__sex", ["u-avatar__sex--" + $props.sexIcon]]),
        style: vue.normalizeStyle([$options.uSexStyle])
      }, [
        vue.createVNode(_component_u_icon, {
          name: $props.sexIcon,
          size: "20"
        }, null, 8, ["name"])
      ], 6)) : vue.createCommentVNode("v-if", true),
      $props.showLevel ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 4,
        class: "u-avatar__level",
        style: vue.normalizeStyle([$options.uLevelStyle])
      }, [
        vue.createVNode(_component_u_icon, {
          name: $props.levelIcon,
          size: "20"
        }, null, 8, ["name"])
      ], 4)) : vue.createCommentVNode("v-if", true)
    ], 4);
  }
  var __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$f], ["__scopeId", "data-v-6a701ab6"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-avatar/u-avatar.vue"]]);
  const _sfc_main$k = {
    name: "u-cell-item",
    emits: ["click"],
    props: {
      icon: {
        type: String,
        default: ""
      },
      title: {
        type: [String, Number],
        default: ""
      },
      value: {
        type: [String, Number],
        default: ""
      },
      label: {
        type: [String, Number],
        default: ""
      },
      borderBottom: {
        type: Boolean,
        default: true
      },
      borderTop: {
        type: Boolean,
        default: false
      },
      hoverClass: {
        type: String,
        default: "u-cell-hover"
      },
      arrow: {
        type: Boolean,
        default: true
      },
      center: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      titleWidth: {
        type: [Number, String],
        default: ""
      },
      arrowDirection: {
        type: String,
        default: "right"
      },
      titleStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      valueStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      labelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      bgColor: {
        type: String,
        default: "transparent"
      },
      index: {
        type: [String, Number],
        default: ""
      },
      useLabelSlot: {
        type: Boolean,
        default: false
      },
      iconSize: {
        type: [Number, String],
        default: 34
      },
      iconStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      arrowStyle() {
        let style = {};
        if (this.arrowDirection == "up")
          style.transform = "rotate(-90deg)";
        else if (this.arrowDirection == "down")
          style.transform = "rotate(90deg)";
        else
          style.transform = "rotate(0deg)";
        return style;
      }
    },
    methods: {
      click() {
        this.$emit("click", this.index);
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", {
      onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args)),
      class: vue.normalizeClass(["u-cell", { "u-border-bottom": $props.borderBottom, "u-border-top": $props.borderTop, "u-col-center": $props.center, "u-cell--required": $props.required }]),
      "hover-stay-time": "150",
      "hover-class": $props.hoverClass,
      style: vue.normalizeStyle({
        backgroundColor: $props.bgColor
      })
    }, [
      $props.icon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
        key: 0,
        size: $props.iconSize,
        name: $props.icon,
        "custom-style": $props.iconStyle,
        class: "u-cell__left-icon-wrap"
      }, null, 8, ["size", "name", "custom-style"])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "u-flex"
      }, [
        vue.renderSlot(_ctx.$slots, "icon", {}, void 0, true)
      ])),
      vue.createElementVNode("view", {
        class: "u-cell_title",
        style: vue.normalizeStyle([
          {
            width: $props.titleWidth ? $props.titleWidth + "rpx" : "auto"
          },
          $props.titleStyle
        ])
      }, [
        $props.title !== "" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
          vue.createTextVNode(vue.toDisplayString($props.title), 1)
        ], 64)) : vue.renderSlot(_ctx.$slots, "title", { key: 1 }, void 0, true),
        $props.label || _ctx.$slots.label ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "u-cell__label",
          style: vue.normalizeStyle([$props.labelStyle])
        }, [
          $props.label !== "" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            vue.createTextVNode(vue.toDisplayString($props.label), 1)
          ], 64)) : vue.renderSlot(_ctx.$slots, "label", { key: 1 }, void 0, true)
        ], 4)) : vue.createCommentVNode("v-if", true)
      ], 4),
      vue.createElementVNode("view", {
        class: "u-cell__value",
        style: vue.normalizeStyle([$props.valueStyle])
      }, [
        $props.value !== "" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
          vue.createTextVNode(vue.toDisplayString($props.value), 1)
        ], 64)) : vue.renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true)
      ], 4),
      _ctx.$slots["right-icon"] ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "u-flex u-cell_right"
      }, [
        vue.renderSlot(_ctx.$slots, "right-icon", {}, void 0, true)
      ])) : vue.createCommentVNode("v-if", true),
      $props.arrow ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
        key: 3,
        name: "arrow-right",
        style: vue.normalizeStyle([$options.arrowStyle]),
        class: "u-icon-wrap u-cell__right-icon-wrap"
      }, null, 8, ["style"])) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  var __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$e], ["__scopeId", "data-v-09d67224"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-cell-item/u-cell-item.vue"]]);
  var StateType = /* @__PURE__ */ ((StateType2) => {
    StateType2["USER"] = "user";
    StateType2["PRODUCT"] = "product";
    return StateType2;
  })(StateType || {});
  const request = (prams) => {
    return new Promise((resolve, reject) => {
      let url2 = config$1.base_url + prams.url;
      uni.request({
        url: url2,
        data: prams.data,
        method: prams.method,
        header: prams.header,
        success: (res) => {
          resolve(res.data);
        },
        fail: (err) => {
          reject(err);
        },
        complete: () => {
        }
      });
    });
  };
  const logout = () => {
    return request({
      url: "logout",
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": uni.getStorageSync("token")
      }
    });
  };
  const getUserInfo = () => {
    return request({
      url: "admin/userInfo",
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": uni.getStorageSync("token")
      }
    });
  };
  const getBalance = () => {
    return request({
      url: "admin/getBalance",
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": uni.getStorageSync("token")
      }
    });
  };
  const addProduct = (product) => {
    return request({
      url: "contract/addProduct",
      method: "POST",
      data: product,
      header: {
        "Content-Type": "application/json",
        "Authorization": uni.getStorageSync("token")
      }
    });
  };
  const getProduct = () => {
    return request({
      url: "product/getProduct",
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": uni.getStorageSync("token")
      }
    });
  };
  const totalBids = (id) => {
    return request({
      url: "contract/totalBids/" + id,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": uni.getStorageSync("token")
      }
    });
  };
  const getProductById = (id) => {
    return request({
      url: "contract/getProduct/" + id,
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": uni.getStorageSync("token")
      }
    });
  };
  const useUserStore = defineStore({
    id: StateType.USER,
    state: () => ({
      user: {},
      money: ""
    }),
    getters: {
      getUserInfo() {
        return this.user;
      },
      getMoney() {
        return this.money;
      }
    },
    actions: {
      async setUserInfo() {
        const userInfo = await getUserInfo();
        this.user = userInfo.data;
      },
      async setBalance() {
        const userBalance = await getBalance();
        this.money = userBalance.data;
      }
    }
  });
  const _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
    __name: "user",
    setup(__props) {
      const useUserState = useUserStore();
      const user = vue.computed(() => useUserState.getUserInfo);
      const money = vue.computed(() => useUserState.getMoney);
      onLoad(async () => {
        await useUserState.setUserInfo();
        await useUserState.setBalance();
      });
      vue.ref("http://cdn.ut.tj.cn/test/bg.jpg");
      const toLogout = () => {
        logout().then((res) => {
          formatAppLog("log", "at pages/user/user.vue:37", res);
          uni.removeStorage({
            key: "token",
            success: function() {
              uni.redirectTo({
                url: "/pages/login/login"
              });
            }
          });
        });
      };
      const toProdoctRelease = () => {
        uni.navigateTo({
          url: "/pages/product/newProduct"
        });
      };
      return (_ctx, _cache) => {
        const _component_u_avatar = resolveEasycom(vue.resolveDynamicComponent("u-avatar"), __easycom_0$3);
        const _component_u_cell_item = resolveEasycom(vue.resolveDynamicComponent("u-cell-item"), __easycom_5);
        return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
          vue.createElementVNode("view", { class: "content-user" }, [
            vue.createVNode(_component_u_avatar, {
              src: vue.unref(user).avatar,
              mode: "square"
            }, null, 8, ["src"]),
            vue.createCommentVNode(" <view>{{user}}</view> "),
            vue.createElementVNode("view", null, vue.toDisplayString(vue.unref(user).username), 1),
            vue.createElementVNode("view", null, vue.toDisplayString(vue.unref(user).address), 1),
            vue.createElementVNode("view", null, "ETH\uFF1A" + vue.toDisplayString(vue.unref(money)), 1)
          ]),
          vue.createVNode(_component_u_cell_item, {
            icon: "shopping-cart-fill",
            title: "\u6211\u7684\u8D2D\u4E70"
          }),
          vue.createVNode(_component_u_cell_item, {
            icon: "bookmark-fill",
            title: "\u53D1\u5E03",
            onClick: toProdoctRelease
          }),
          vue.createVNode(_component_u_cell_item, {
            icon: "setting-fill",
            title: "\u9000\u51FA",
            onClick: toLogout
          })
        ]);
      };
    }
  });
  var PagesUserUser = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-1198f63b"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/user/user.vue"]]);
  const _sfc_main$i = {
    name: "u-lazy-load",
    emits: ["click", "load", "error"],
    props: {
      index: {
        type: [Number, String]
      },
      image: {
        type: String,
        default: ""
      },
      imgMode: {
        type: String,
        default: "widthFix"
      },
      loadingImg: {
        type: String,
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAMAAAC3Ycb+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUM0QjNBQjkyQUQ2MTFFQTlCNUQ4RTIzNDE5RUIxNjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUM0QjNBQkEyQUQ2MTFFQTlCNUQ4RTIzNDE5RUIxNjciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QzRCM0FCNzJBRDYxMUVBOUI1RDhFMjM0MTlFQjE2NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QzRCM0FCODJBRDYxMUVBOUI1RDhFMjM0MTlFQjE2NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtRHfPcAAAAzUExURZWVldfX18PDw62trZubm9zc3Li4uKGhoebm5tLS0uHh4c3Nzaenp729vcjIyLKysuvr6141L40AAAcXSURBVHja7NzZlqpGAEBR5lG0//9rIw7IJKJi4or7PGTdtN10wr5SVAEGf/qqArsAiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAIiIAAERAgAgJEQIAICBABERAgAgJEQIAICBABERAgAgJEQIAICBABERAgAgJEQIAICBABERAgAgJEQIAICBABERAgAgJEQIAICBABERAgAgJEQIAICBABERAgAgJEQIAICBABERAgAgJEQIAICBABERAg+nmQFMi5Jis+sIniED23jSzIgLTtg2D//iYme/8QBM/9lQ+CAEhbNLM3N9hEHAThX7GPCiBfAxK1b51kD+R7QMLjXg7iCsgWIPUh7pfVozG791oeBPngm48G583uW5GkBvI+SBaM2xXDn1oqum423bX/mgF5FySc2cv93Voug9TdZotsggnkBZB2NzbhrSY5HnoG07jei8dvzsJB/c3W60SALILE46+WCztsbhPR7R2VJq0ukEcT49nyy8QhaKcRa3fYHZD4+ufqOJAcgDz8/59vtw1I3QP5K6JsOG0vm3hce4I8LQp/BaRZGJC3AAn7IKOKXbC+7EdA5vdmmVwOLksgRThqOqiH4XEGsht+peoPUE8U/jJIO5OLH4GEwUslV5G0PTBG5Uiw/Y2jyigO3l9HAHKv9PYb82LloH74dZBoBUgar+l48NsNvtD0fkez9iwrAvIYZDRCl+Xs149Hm/KZmQ+QjUCiO1ei4ru7EsgnQYrkznlQb7thCuRfAzlOAPN72427P4VA/i2Q/DKT/Ls/VR8fvIBsDZIuz7TPF6TCbnk4GJkB2RokejTjuE7/unlgCuSTIO0Cy+Plp6vDfnQlBchy8QtjSHVd3EgmK1bHLm+H6+nXYbz2DuQRSPnqoL7vvq0u70on4zvxgCyWD3b9UyDVdW24PaWaiGTnFZJwPIQAebDpIKheBIm7n124ZthMJipAlkqHO+IZkP1tbfzOJark/A7MgKyvvl60fRqkvXfhuow+t9+q00+0/yyBrK8ZngOtBzldhw2X9tvpNGty0gvkmbPeJ0Cy/r09s/stbmfo0yMWkEdjevgKyOn2t2pxv7UXoibTdCDLje9/Ww1ymqzn87dbp92242ZmMRjI8hASvwKSLq4udqN6ksw8nxXN3tszD9L8Gkg+2mFrQYql5az4tvFj5xOx4VwnSdeBtGdyPwUytxK77pBVlNHdO7OK3rh/eTPUvdutT3fO52tuHMqD4N7llv8pyOQQ//w19YVDfX27+Sfuby9/6nau4pdA8vEdOZuChEH/quHt0Jg+IRJ/5+PrHwKZXfjbDiS73Zo7mu5UkzX7uTsXe0e/7nC3ePf1O69+BUg2XDfZCqSqOu7rGVf8cHBe8zhC2b61dtUHXv0OkGo6ZL4JkpbRYXdUaFevivx2M/1GIOctNh949TtAoumQ+TpIHMX54CJu+8BDd8FkE5BqcZh/59XvAClmTvKfB0nDqIlHo3T70SftyW1eX9dXtgQJqs1f/Q6QaOa/7wmQKtxH8eiGoCRuovODIO3VxOMmruZbHrLyD7z6DSDtGyT7ew1kf9hNn07c986JTovzzem0Id9wUG+Vk/IDr34DSNR7huZJkMFT6vEhqrPx/j5cnlZML8N6/PAzh9Y99Flm5Yde/c9BquDOkvkKkMP58dA4qi9vivE8JOvGz/j8FokfPpr288+pH2ZPOZrLmeGD+7KOh6dqYWJ48ki7yUg0tz0go/fv/LLddfV3sgOLJyaGPY/zrSlh1a36Arkzoue9CyG35ze6E6/dzO2Ga0EGHqdRJIkfn9/8OEjTW8Vq91ZWh39FeehWA7Nu9ft8CpUEk1WWOyDF0OPyEU2Pnzf/bZC0P6IPzmAvu7KauQBVrgKpJ0tG2arHzX8e5Pb3PezNs/PrX+3JMyCLn9XXf37tPFHvt09WfCDDjx+yyn1/p1V11j7GnB/q3leLuVva79S/tzed+db08YpF4uOZtmz/9oXWMq6BCAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiACAgQAQEiIEAEBIiAALELvqt/BBgACqVeUBXxcCkAAAAASUVORK5CYII="
      },
      errorImg: {
        type: String,
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAMAAAC3Ycb+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODdDMjhENDYyQUQ2MTFFQTlDQ0VBODgxQjFFOEEyMEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODdDMjhENDcyQUQ2MTFFQTlDQ0VBODgxQjFFOEEyMEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4N0MyOEQ0NDJBRDYxMUVBOUNDRUE4ODFCMUU4QTIwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4N0MyOEQ0NTJBRDYxMUVBOUNDRUE4ODFCMUU4QTIwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhLwhikAAAAzUExURZWVldfX162trcPDw5ubm7i4uNzc3Obm5s3NzaGhoeHh4cjIyKenp9LS0r29vbKysuvr67sDMEkAAAlpSURBVHja7NzpYqMgAIVRUVHc8/5PO66R1WAbOzX97q+ZtDEpR0AWTR7kVyWhCAAhgABCAAGEAAIIAQQQAggBBBACCCAEEEAIIIAQQAgggBBAACGAAEIAAYQAQgABhAACCAEEEAIIIAQQAgggBBBACCCAEEAAIYAQQAAhgABCAAGEAAIIAYQAAggBBBACCCAEEEAIIAQQQAgggBBAACGAAEIAIYAAQgABhAACCAEEEAIIAQQQAgggBBBACCCAEEAAIYAQQAAhgABCAAGEAAIIAYQAAggBBBACCCAEEEAIIAQQQAgggBBAACGAAEIAIYAAQgABhAACCAEEEAIIAQQQAgggBBBACCCAEEAIIIAQQAAhgABCAAGEAEIAAYQAAggBBBACCCAEEAIIIAQQQAgggBBAACGAEEAAIYAAsqeX5QWHKIcs/Ptl03lfL4zDFPWfBGmSpPn+IZzSH5KkCL5B+n+oklwz6Iz//R2QzFOabzhEmiRirAmZt/bl0w/dpMbLqeeo4wEdpC7zR5WAPKziHKtO7ql+ReKvIa9BxgNaL5ZtEkpeAGIVp5jKJa09xVo9vgSSzQcszdYvmOqjQNSQ6pHK6rO1n1Xj32788miwHLaZz1Tl9i/yayDlYJ/60/+lp8GSY7OY1B8E4p55bWmfquFk22GLuUUxi78cX+m+BjL2GLkhMrV+/muS6Sfic0CEp5T1Yu2OQdTzsKV0MJV73KVjroyTffxfuv5Tf3fd6iLT9wz8YdVHgUzF2Is9/Xhi5sYJqP1w/GUpjOiHVbaI0w2L+pg3GZzvtokcgHxWDXHaiy78l3sPke01qphamT5c+dqyeAGSumdL/mkggauTam0e3L/mPEiqtzKDbl0Z1Wn8xOa4ySo8X/7TQIJnY/seEKWf12UmC72CKP9xYjr19RPT7NNA+oMO+R0gwmlotAry+C6I0f59ch8yXVQOr0BKYcXt1IUYRyCt+Ur9HGsrQKI79WY9sY9ARPKlzFOFdb41ioD8b5Bp+mqeeRKAxINkESBFGpOpKhgv9OuYpH8A8l4Qa3qp60Kl2/k+rG2sWafuuyCBafb2j4JkgZUob3nWcmicpkxEgmTLLGejTxnWSWCi8lPmsk6DlIHFJv24ojiYyYoGacwL8zXTLEAVaDI/Ybb3NIgKDSv2oXpmHkvNs+PTpMASEdlk7fOZeRk37fwJ6yGnQarQsGIfqqcvx43rTOXY6jf7uKXdRzdLDRPbjIrx1cIj3Kr4KyBFezzgUGuR5893qkOQ19fR2uVBaU+r16LphJNOiatK7PeBZK/Kb+tUn71rcQjSvARpghfH/yG/D2RetTuI3N5QrMWdP46brP7FmKZ//CGQ9At9SL01DLkzY/Vs8Z97fQZ7gelw7jHqCz+/Wile5J4g3Vc79eb5a6oLSue+Ve83gaSv2jp5PxCzjzwFUm9zw9MllSMil1kS4d2E9SaQ1xNo9wMxx0+nQNLnew/WDHvveMAHYm08mofl3TFI/8pD3Q6kMAv6DIi2jTCwRJUvNdDYrrJum9oHhusCbWALonwxBRk1vXMnEGWuT5wAmfYuVGUYpJ7fUZujCN92hvzwWlrFgxSfANKb10DxIMbShnfrynyZZV30imA7P43ArXXHbvBVkTCIuGy25AdBrHmNeBCpL214QdLp9LZarG3IMWrmW0ehtuO7F2PS09UcgqS3B7FKPhpknrStD0HGF/vQRne37LwLG8EbHT4WxN7/Fg0yD9Yr/3br4nnstA+0Il6QxzdBmg8A6a2/IRbkcK9h/uzV8zywF/oSkOyageCPglRWgcWClHnEzs9q/t/SENVXgFijlsq3VtXdCsRp4qObrLLLgjuzSq3fX89ZZW6AfxNIzF6X9FYgThN/fk093KkvHX/hbWd+DqS/FUhlf+G3gohEXzVs3g9iDluWoaW8fL73QhB34u+tIHIf19nLuF4Q98a09Eynnl56q+ePgEhnX+dbQOp6H5XnJ0ACd8dFgkwf12nTOTcEqd2pom+CFF02TIPw6dKmrLS5qOtBpo8b5quUtrwrSGbuqPkeSJqllTFHO02NPxdMrm+y5LKdWyWXjw4vA5nGEtnjuyCFyHqNYvEolzmASm3zK1Eg5zr13lhqV1tlksnVw8Pkwgri7O07AVKLJkutRYw87bPlRpBpNXE8xGb+fhBlvEGrGPLqViu5sILIx9dAmqF1705sxF4M8+R8P5dOdQwi12fMnATpjJ2JSt/POIvU9wPJEs/jduJAjLvU0yFT0i64Yb1bsVi79dA4pEy3TzoHMq2O7Re4vXm5O9+l290NpE4CU+YRIMNye2iaqbVS2AUnn2fsekthYKReVNutVedA5juttyIXrT38mOds+ps9DWhwL7GWc61/DVKPzVN9UHDarf1icU98IOU8tm6L031Iq63t1tKzj3fe/FCpO4F0/i0Z2+yvA1KeGBjqj1qYx8/zoxpKZ1Yl367I1k+sfcft/QPy9csXy/32qX1qLZsrryG5BGQaRj0vc/b7N54XXq293TCLB5HO42Fy517obW19b+qjl3CHp0fdLJcWvmdy1etESi/uAdJrs1hTaUklHuW8qSDdC3UfXVR5cnD3rAFSSqtFb7z7eapErx7rC739jCXfbK3aWiipjXo8UbmxXPa7QQq9R289j2Gr88N7Ag5AlHPRKc37pNZv0CZtX1tVMG6rm8qW1/KlCgQvcMss933ybwXZz3dReW5yce4ByZtHFIhwT9kmjxg8BzbKDUe1PB9edBJqSN7/KM1LmqyuMZ5BpeTUw1aD/uDI0relPfSHa/Wn8Pxq1BNfxy/h3IdwOJqIKumb9CHvTqMefyY82RoQAgggBBBACCCAEEAAIYAQQAAhgABCAAGEAAIIAYQAAggBBBACCCAEEEAIIAQQQAgggBBAACGAAEIAIYAAQgABhAACCAEEEAIIAQQQAgggBBBACCCAEEAIIIAQQAAhgABCAAGEAEIAAYQAAggBBBACCCAEEAIIIAQQQAgggBBAACGAEEAAIYAAQgABhAACCAEEEAIIAQQQAgggBBBACCCAEEAIIIAQQAAhgABCAAGEAEIAAYQAAggBBBACCCAEEAIIIAQQQAgggBBAACGAEEAAIYAAQgABhAACCAGEAAIIAQQQAgggBBBACCAEEEAIIIAQQAAhgABCACGAAEIAAYQAAggBBBACCAEEEAIIIAQQQAggfyL/BBgA8PgLdH0TBtkAAAAASUVORK5CYII="
      },
      threshold: {
        type: [Number, String],
        default: 100
      },
      duration: {
        type: [Number, String],
        default: 500
      },
      effect: {
        type: String,
        default: "ease-in-out"
      },
      isEffect: {
        type: Boolean,
        default: true
      },
      borderRadius: {
        type: [Number, String],
        default: 0
      },
      height: {
        type: [Number, String],
        default: "450"
      }
    },
    data() {
      return {
        isShow: false,
        opacity: 1,
        time: this.duration,
        loadStatus: "",
        isError: false,
        elIndex: this.$u.guid()
      };
    },
    computed: {
      getThreshold() {
        let thresholdPx = uni.upx2px(Math.abs(this.threshold));
        return this.threshold < 0 ? -thresholdPx : thresholdPx;
      },
      imgHeight() {
        return this.$u.addUnit(this.height);
      }
    },
    created() {
      this.observer = {};
    },
    watch: {
      isShow(nVal) {
        if (!this.isEffect)
          return;
        this.time = 0;
        this.opacity = 0;
        setTimeout(() => {
          this.time = this.duration;
          this.opacity = 1;
        }, 30);
      },
      image(n) {
        if (!n) {
          this.isError = true;
        } else {
          this.init();
          this.isError = false;
        }
      }
    },
    methods: {
      init() {
        this.isError = false;
        this.loadStatus = "";
      },
      clickImg() {
        if (this.isShow == false)
          ;
        else if (this.isError == true)
          ;
        else
          ;
        this.$emit("click", this.index);
      },
      imgLoaded() {
        if (this.loadStatus == "") {
          this.loadStatus = "lazyed";
        } else if (this.loadStatus == "lazyed") {
          this.loadStatus = "loaded";
          this.$emit("load", this.index);
        }
      },
      errorImgLoaded() {
        this.$emit("error", this.index);
      },
      loadError() {
        this.isError = true;
      },
      disconnectObserver(observerName) {
        const observer2 = this[observerName];
        observer2 && observer2.disconnect();
      }
    },
    beforeUnmount() {
    },
    mounted() {
      this.$nextTick(() => {
        uni.$once("uOnReachBottom", () => {
          if (!this.isShow)
            this.isShow = true;
        });
      });
      setTimeout(() => {
        this.disconnectObserver("contentObserver");
        const contentObserver = uni.createIntersectionObserver(this);
        contentObserver.relativeToViewport({
          bottom: this.getThreshold
        }).observe(".u-lazy-item-" + this.elIndex, (res) => {
          if (res.intersectionRatio > 0) {
            this.isShow = true;
            this.disconnectObserver("contentObserver");
          }
        });
        this.contentObserver = contentObserver;
      }, 30);
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["u-wrap", "u-lazy-item-" + $data.elIndex]),
      style: vue.normalizeStyle({
        opacity: Number($data.opacity),
        borderRadius: $props.borderRadius + "rpx",
        transition: `opacity ${$data.time / 1e3}s ease-in-out`
      })
    }, [
      vue.createElementVNode("view", {
        class: vue.normalizeClass("u-lazy-item-" + $data.elIndex)
      }, [
        !$data.isError ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          style: vue.normalizeStyle({ borderRadius: $props.borderRadius + "rpx", height: $options.imgHeight }),
          class: "u-lazy-item",
          src: $data.isShow ? $props.image : $props.loadingImg,
          mode: $props.imgMode,
          onLoad: _cache[0] || (_cache[0] = (...args) => $options.imgLoaded && $options.imgLoaded(...args)),
          onError: _cache[1] || (_cache[1] = (...args) => $options.loadError && $options.loadError(...args)),
          onClick: _cache[2] || (_cache[2] = (...args) => $options.clickImg && $options.clickImg(...args))
        }, null, 44, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("image", {
          key: 1,
          style: vue.normalizeStyle({ borderRadius: $props.borderRadius + "rpx", height: $options.imgHeight }),
          class: "u-lazy-item error",
          src: $props.errorImg,
          mode: $props.imgMode,
          onLoad: _cache[3] || (_cache[3] = (...args) => $options.errorImgLoaded && $options.errorImgLoaded(...args)),
          onClick: _cache[4] || (_cache[4] = (...args) => $options.clickImg && $options.clickImg(...args))
        }, null, 44, ["src", "mode"]))
      ], 2)
    ], 6);
  }
  var __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$d], ["__scopeId", "data-v-65385da6"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-lazy-load/u-lazy-load.vue"]]);
  const _sfc_main$h = {
    name: "u-waterfall",
    emits: ["update:modelValue", "input"],
    props: {
      value: {
        type: Array,
        default: function() {
          return [];
        }
      },
      modelValue: {
        type: Array,
        default: function() {
          return [];
        }
      },
      addTime: {
        type: [Number, String],
        default: 200
      },
      idKey: {
        type: String,
        default: "id"
      }
    },
    data() {
      return {
        leftList: [],
        rightList: [],
        tempList: [],
        children: []
      };
    },
    watch: {
      copyFlowList(nVal, oVal) {
        let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0;
        this.tempList = this.tempList.concat(this.cloneData(nVal.slice(startIndex)));
        this.splitData();
      }
    },
    mounted() {
      this.tempList = this.cloneData(this.copyFlowList);
      this.splitData();
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      copyFlowList() {
        return this.cloneData(this.valueCom);
      }
    },
    methods: {
      async splitData() {
        if (!this.tempList.length)
          return;
        let leftRect = await this.$uGetRect("#u-left-column");
        let rightRect = await this.$uGetRect("#u-right-column");
        let item = this.tempList[0];
        if (!item)
          return;
        if (leftRect.height < rightRect.height) {
          this.leftList.push(item);
        } else if (leftRect.height > rightRect.height) {
          this.rightList.push(item);
        } else {
          if (this.leftList.length <= this.rightList.length) {
            this.leftList.push(item);
          } else {
            this.rightList.push(item);
          }
        }
        this.tempList.splice(0, 1);
        if (this.tempList.length) {
          setTimeout(() => {
            this.splitData();
          }, this.addTime);
        }
      },
      cloneData(data) {
        return JSON.parse(JSON.stringify(data));
      },
      clear() {
        this.leftList = [];
        this.rightList = [];
        this.$emit("input", []);
        this.$emit("update:modelValue", []);
        this.tempList = [];
      },
      remove(id) {
        let index = -1;
        index = this.leftList.findIndex((val) => val[this.idKey] == id);
        if (index != -1) {
          this.leftList.splice(index, 1);
        } else {
          index = this.rightList.findIndex((val) => val[this.idKey] == id);
          if (index != -1)
            this.rightList.splice(index, 1);
        }
        index = this.value.findIndex((val) => val[this.idKey] == id);
        if (index != -1) {
          this.$emit("input", this.valueCom.splice(index, 1));
          this.$emit("update:modelValue", this.valueCom.splice(index, 1));
        }
      },
      modify(id, key, value) {
        let index = -1;
        index = this.leftList.findIndex((val) => val[this.idKey] == id);
        if (index != -1) {
          this.leftList[index][key] = value;
        } else {
          index = this.rightList.findIndex((val) => val[this.idKey] == id);
          if (index != -1)
            this.rightList[index][key] = value;
        }
        index = this.valueCom.findIndex((val) => val[this.idKey] == id);
        if (index != -1) {
          let data = this.cloneData(this.valueCom);
          data[index][key] = value;
          this.$emit("input", data);
          this.$emit("update:modelValue", data);
        }
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-waterfall" }, [
      vue.createElementVNode("view", {
        id: "u-left-column",
        class: "u-column"
      }, [
        vue.renderSlot(_ctx.$slots, "left", { leftList: $data.leftList }, void 0, true)
      ]),
      vue.createElementVNode("view", {
        id: "u-right-column",
        class: "u-column"
      }, [
        vue.renderSlot(_ctx.$slots, "right", { rightList: $data.rightList }, void 0, true)
      ])
    ]);
  }
  var __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$c], ["__scopeId", "data-v-349a3de8"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-waterfall/u-waterfall.vue"]]);
  const useProductStore = defineStore({
    id: StateType.PRODUCT,
    state: () => ({
      product: []
    }),
    getters: {
      getProductList() {
        return this.product;
      }
    },
    actions: {
      async setProductList() {
        const productInfo = await getProduct();
        this.product = productInfo.data;
      }
    }
  });
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
    __name: "product",
    setup(__props) {
      const useProductState = useProductStore();
      onLoad(async () => {
        await useProductState.setProductList();
        initData();
      });
      const product = vue.computed(() => useProductState.getProductList);
      const productList = vue.reactive([]);
      const initData = async () => {
        for (var i = 0; i < product.value.length; i++) {
          formatAppLog("log", "at pages/product/product.vue:109", product.value[i].id);
          const result = await totalBids(product.value[i].id);
          formatAppLog("log", "at pages/product/product.vue:111", result.data);
          var auctionState;
          var auctionStartTimeReplace = replaceDate(product.value[i].auctionStartTime);
          var auctionEndTimeReplace = replaceDate(product.value[i].auctionEndTime);
          var dateNow = new Date();
          var dateDiff = dateNow.getTime() - auctionStartTimeReplace.getTime();
          if (dateDiff <= 0) {
            auctionState = 0;
          } else {
            var dateDiff01 = auctionEndTimeReplace.getTime() - dateNow.getTime();
            if (dateDiff01 >= 0) {
              auctionState = 1;
            } else {
              auctionState = 2;
            }
          }
          productList.push({
            id: product.value[i].id,
            name: product.value[i].name,
            category: product.value[i].category,
            imageLink: product.value[i].imageLink,
            descLink: product.value[i].descLink,
            auctionStartTime: product.value[i].auctionStartTime,
            auctionEndTime: product.value[i].auctionEndTime,
            startPrice: product.value[i].startPrice,
            status: product.value[i].status,
            conditions: product.value[i].conditions,
            totalBid: result.data,
            dataAuctionStates: auctionState
          });
        }
        function replaceDate(d1) {
          var dateBegin = new Date(d1.replace(/-/g, "/"));
          return dateBegin;
        }
      };
      const toProductInfo = (event) => {
        uni.navigateTo({
          url: "/pages/product/productInfo?id=" + event.id + "&auctionStates=" + event.dataAuctionStates
        });
      };
      return (_ctx, _cache) => {
        const _component_u_lazy_load = resolveEasycom(vue.resolveDynamicComponent("u-lazy-load"), __easycom_0$2);
        const _component_u_waterfall = resolveEasycom(vue.resolveDynamicComponent("u-waterfall"), __easycom_1$2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "wrap" }, [
          vue.createVNode(_component_u_waterfall, {
            modelValue: productList,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(productList) ? productList.value = $event : null)
          }, {
            left: vue.withCtx(({ leftList }) => [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(leftList, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "demo-warter",
                  key: index,
                  onClick: ($event) => toProductInfo(item)
                }, [
                  vue.createCommentVNode(" \u8B66\u544A\uFF1A\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u4E2D\u9700\u8981hx2.8.11\u7248\u672C\u624D\u652F\u6301\u5728template\u4E2D\u7ED3\u5408\u5176\u4ED6\u7EC4\u4EF6\uFF0C\u6BD4\u5982\u4E0B\u65B9\u7684lazy-load\u7EC4\u4EF6 "),
                  vue.createVNode(_component_u_lazy_load, {
                    threshold: "-450",
                    "border-radius": "10",
                    image: item.imageLink,
                    index
                  }, null, 8, ["image", "index"]),
                  vue.createElementVNode("view", { class: "demo-title" }, vue.toDisplayString(item.name), 1),
                  vue.createElementVNode("view", { class: "demo-tag" }, [
                    item.conditions == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "demo-tag-text"
                    }, " \u65B0\u54C1 ")) : (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "demo-tag-text"
                    }, " \u4E8C\u624B ")),
                    item.dataAuctionStates === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 2,
                      class: "demo-tag-text"
                    }, " \u672A\u5F00\u59CB ")) : vue.createCommentVNode("v-if", true),
                    item.dataAuctionStates === 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 3,
                      class: "demo-tag-text"
                    }, " \u6B63\u5728\u8FDB\u884C ")) : vue.createCommentVNode("v-if", true),
                    item.dataAuctionStates === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 4,
                      class: "demo-tag-text"
                    }, " \u5DF2\u7ED3\u675F ")) : vue.createCommentVNode("v-if", true)
                  ]),
                  vue.createElementVNode("view", { class: "demo-price" }, [
                    vue.createElementVNode("view", { class: "demo-price-a" }, "ETH " + vue.toDisplayString(item.startPrice), 1),
                    vue.createElementVNode("view", { class: "demo-price-b" }, "\u5DF2\u51FA\u4EF7" + vue.toDisplayString(item.totalBid) + "\u6B21", 1)
                  ])
                ], 8, ["onClick"]);
              }), 128))
            ]),
            right: vue.withCtx(({ rightList }) => [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(rightList, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "demo-warter",
                  key: index,
                  onClick: ($event) => toProductInfo(item)
                }, [
                  vue.createCommentVNode(" \u8B66\u544A\uFF1A\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u4E2D\u9700\u8981hx2.8.11\u7248\u672C\u624D\u652F\u6301\u5728template\u4E2D\u7ED3\u5408\u5176\u4ED6\u7EC4\u4EF6\uFF0C\u6BD4\u5982\u4E0B\u65B9\u7684lazy-load\u7EC4\u4EF6 "),
                  vue.createVNode(_component_u_lazy_load, {
                    threshold: "-450",
                    "border-radius": "10",
                    image: item.imageLink,
                    index
                  }, null, 8, ["image", "index"]),
                  vue.createElementVNode("view", { class: "demo-title" }, vue.toDisplayString(item.name), 1),
                  vue.createElementVNode("view", { class: "demo-tag" }, [
                    item.conditions == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "demo-tag-text"
                    }, " \u65B0\u54C1 ")) : (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "demo-tag-text"
                    }, " \u4E8C\u624B ")),
                    item.dataAuctionStates === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 2,
                      class: "demo-tag-text"
                    }, " \u672A\u5F00\u59CB ")) : vue.createCommentVNode("v-if", true),
                    item.dataAuctionStates === 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 3,
                      class: "demo-tag-text"
                    }, " \u6B63\u5728\u8FDB\u884C ")) : vue.createCommentVNode("v-if", true),
                    item.dataAuctionStates === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 4,
                      class: "demo-tag-text"
                    }, " \u5DF2\u7ED3\u675F ")) : vue.createCommentVNode("v-if", true)
                  ]),
                  vue.createElementVNode("view", { class: "demo-price" }, [
                    vue.createElementVNode("view", { class: "demo-price-a" }, "ETH " + vue.toDisplayString(item.startPrice), 1),
                    vue.createElementVNode("view", { class: "demo-price-b" }, "\u5DF2\u51FA\u4EF7" + vue.toDisplayString(item.totalBid) + "\u6B21", 1)
                  ])
                ], 8, ["onClick"]);
              }), 128))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]);
      };
    }
  });
  var PagesProductProduct = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-8f03510a"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/product/product.vue"]]);
  const _sfc_main$f = {
    data() {
      return {
        avatar: "https://cdn.uviewui.com/uview/common/logo.png"
      };
    },
    created() {
      uni.$on("uAvatarCropper", (path) => {
        this.avatar = path;
        uni.uploadFile({
          url: config$1.base_url + "upload-platform",
          filePath: path,
          name: "file",
          complete: (res) => {
            uni.setStorage({
              key: "avatar",
              data: JSON.parse(res.data).url,
              success: function() {
                formatAppLog("log", "at pages/user/avatar.vue:33", "success");
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
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "wrap" }, [
      vue.createElementVNode("view", { class: "u-avatar-wrap" }, [
        vue.createElementVNode("image", {
          class: "u-avatar-demo",
          src: $data.avatar,
          mode: "aspectFill"
        }, null, 8, ["src"])
      ]),
      vue.createVNode(_component_u_button, { onClick: $options.chooseAvatar }, {
        default: vue.withCtx(() => [
          vue.createTextVNode("\u9009\u62E9\u5934\u50CF")
        ]),
        _: 1
      }, 8, ["onClick"])
    ]);
  }
  var Avatar = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$b], ["__scopeId", "data-v-5189426e"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/user/avatar.vue"]]);
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
    __name: "register",
    setup(__props) {
      const form = vue.reactive({
        username: "",
        password: "",
        avatar: ""
      });
      const toLogin = () => {
        if (form.username == null || form.password.length <= 5) {
          formatAppLog("log", "at pages/user/register.vue:28", "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u8D26\u53F7\u4E0E\u5BC6\u7801");
        } else {
          uni.getStorage({
            key: "avatar",
            success: function(res) {
              form.avatar = res.data;
            }
          });
          formatAppLog("log", "at pages/user/register.vue:36", form);
          uni.request({
            url: config$1.base_url + "register",
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
                  uni.navigateTo({
                    url: "/pages/login/login"
                  });
                }, 1e3);
              } else {
                formatAppLog("log", "at pages/user/register.vue:56", res.data.msg);
              }
            }
          });
        }
      };
      return (_ctx, _cache) => {
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_0$4);
        const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_1$4);
        const _component_u_form = resolveEasycom(vue.resolveDynamicComponent("u-form"), __easycom_7);
        const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_1$3);
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "login-title" }, "\u57FA\u4E8E\u533A\u5757\u94FE\u7684\u62CD\u5356\u5E73\u53F0"),
          vue.createVNode(vue.unref(Avatar)),
          vue.createVNode(_component_u_form, {
            model: form,
            ref: "uForm",
            style: { "margin": "10rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_u_form_item, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    modelValue: form.username,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.username = $event),
                    placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              vue.createVNode(_component_u_form_item, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    type: "password",
                    modelValue: form.password,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.password = $event),
                    placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"]),
          vue.createVNode(_component_u_button, {
            type: "primary",
            onClick: toLogin,
            style: { "margin": "10rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("\u6CE8\u518C")
            ]),
            _: 1
          })
        ], 64);
      };
    }
  });
  var PagesUserRegister = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-0566a113"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/user/register.vue"]]);
  var device = void 0;
  var TOUCH_STATE = ["touchstarted", "touchmoved", "touchended"];
  function firstLetterUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function setTouchState(instance) {
    var arg = [], len = arguments.length - 1;
    while (len-- > 0)
      arg[len] = arguments[len + 1];
    TOUCH_STATE.forEach(function(key, i) {
      if (arg[i] !== void 0) {
        instance[key] = arg[i];
      }
    });
  }
  function validator(instance, o) {
    Object.defineProperties(instance, o);
  }
  function getDevice() {
    if (!device) {
      device = uni.getSystemInfoSync();
    }
    return device;
  }
  var tmp = {};
  var ref = getDevice();
  var pixelRatio = ref.pixelRatio;
  var DEFAULT = {
    id: {
      default: "cropper",
      get: function get() {
        return tmp.id;
      },
      set: function set2(value) {
        if (typeof value !== "string") {
          formatAppLog("error", "at uni_modules/vk-uview-ui/components/u-avatar-cropper/weCropper.js:51", "id\uFF1A" + value + " is invalid");
        }
        tmp.id = value;
      }
    },
    width: {
      default: 750,
      get: function get() {
        return tmp.width;
      },
      set: function set2(value) {
        if (typeof value !== "number") {
          formatAppLog("error", "at uni_modules/vk-uview-ui/components/u-avatar-cropper/weCropper.js:63", "width\uFF1A" + value + " is invalid");
        }
        tmp.width = value;
      }
    },
    height: {
      default: 750,
      get: function get() {
        return tmp.height;
      },
      set: function set2(value) {
        if (typeof value !== "number") {
          formatAppLog("error", "at uni_modules/vk-uview-ui/components/u-avatar-cropper/weCropper.js:75", "height\uFF1A" + value + " is invalid");
        }
        tmp.height = value;
      }
    },
    pixelRatio: {
      default: pixelRatio,
      get: function get() {
        return tmp.pixelRatio;
      },
      set: function set2(value) {
        if (typeof value !== "number") {
          formatAppLog("error", "at uni_modules/vk-uview-ui/components/u-avatar-cropper/weCropper.js:87", "pixelRatio\uFF1A" + value + " is invalid");
        }
        tmp.pixelRatio = value;
      }
    },
    scale: {
      default: 2.5,
      get: function get() {
        return tmp.scale;
      },
      set: function set2(value) {
        if (typeof value !== "number") {
          formatAppLog("error", "at uni_modules/vk-uview-ui/components/u-avatar-cropper/weCropper.js:99", "scale\uFF1A" + value + " is invalid");
        }
        tmp.scale = value;
      }
    },
    zoom: {
      default: 5,
      get: function get() {
        return tmp.zoom;
      },
      set: function set2(value) {
        if (typeof value !== "number") {
          formatAppLog("error", "at uni_modules/vk-uview-ui/components/u-avatar-cropper/weCropper.js:111", "zoom\uFF1A" + value + " is invalid");
        } else if (value < 0 || value > 10) {
          formatAppLog("error", "at uni_modules/vk-uview-ui/components/u-avatar-cropper/weCropper.js:113", "zoom should be ranged in 0 ~ 10");
        }
        tmp.zoom = value;
      }
    },
    src: {
      default: "",
      get: function get() {
        return tmp.src;
      },
      set: function set2(value) {
        if (typeof value !== "string") {
          formatAppLog("error", "at uni_modules/vk-uview-ui/components/u-avatar-cropper/weCropper.js:125", "src\uFF1A" + value + " is invalid");
        }
        tmp.src = value;
      }
    },
    cut: {
      default: {},
      get: function get() {
        return tmp.cut;
      },
      set: function set2(value) {
        if (typeof value !== "object") {
          formatAppLog("error", "at uni_modules/vk-uview-ui/components/u-avatar-cropper/weCropper.js:137", "cut\uFF1A" + value + " is invalid");
        }
        tmp.cut = value;
      }
    },
    boundStyle: {
      default: {},
      get: function get() {
        return tmp.boundStyle;
      },
      set: function set2(value) {
        if (typeof value !== "object") {
          formatAppLog("error", "at uni_modules/vk-uview-ui/components/u-avatar-cropper/weCropper.js:149", "boundStyle\uFF1A" + value + " is invalid");
        }
        tmp.boundStyle = value;
      }
    },
    onReady: {
      default: null,
      get: function get() {
        return tmp.ready;
      },
      set: function set2(value) {
        tmp.ready = value;
      }
    },
    onBeforeImageLoad: {
      default: null,
      get: function get() {
        return tmp.beforeImageLoad;
      },
      set: function set2(value) {
        tmp.beforeImageLoad = value;
      }
    },
    onImageLoad: {
      default: null,
      get: function get() {
        return tmp.imageLoad;
      },
      set: function set2(value) {
        tmp.imageLoad = value;
      }
    },
    onBeforeDraw: {
      default: null,
      get: function get() {
        return tmp.beforeDraw;
      },
      set: function set2(value) {
        tmp.beforeDraw = value;
      }
    }
  };
  var ref$1 = getDevice();
  var windowWidth = ref$1.windowWidth;
  function prepare() {
    var self2 = this;
    self2.attachPage = function() {
      var pages = getCurrentPages();
      var pageContext = pages[pages.length - 1];
      Object.defineProperty(pageContext, "wecropper", {
        get: function get() {
          formatAppLog(
            "warn",
            "at uni_modules/vk-uview-ui/components/u-avatar-cropper/weCropper.js:206",
            "Instance will not be automatically bound to the page after v1.4.0\n\nPlease use a custom instance name instead\n\nExample: \nthis.mycropper = new WeCropper(options)\n\n// ...\nthis.mycropper.getCropperImage()"
          );
          return self2;
        },
        configurable: true
      });
    };
    self2.createCtx = function() {
      var id = self2.id;
      var targetId = self2.targetId;
      if (id) {
        self2.ctx = self2.ctx || uni.createCanvasContext(id);
        self2.targetCtx = self2.targetCtx || uni.createCanvasContext(targetId);
      } else {
        formatAppLog("error", "at uni_modules/vk-uview-ui/components/u-avatar-cropper/weCropper.js:228", "constructor: create canvas context failed, 'id' must be valuable");
      }
    };
    self2.deviceRadio = windowWidth / 750;
  }
  var commonjsGlobal = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }
  var tools = createCommonjsModule(function(module, exports) {
    exports.isStr = function(v) {
      return typeof v === "string";
    };
    exports.isNum = function(v) {
      return typeof v === "number";
    };
    exports.isArr = Array.isArray;
    exports.isUndef = function(v) {
      return v === void 0;
    };
    exports.isTrue = function(v) {
      return v === true;
    };
    exports.isFalse = function(v) {
      return v === false;
    };
    exports.isFunc = function(v) {
      return typeof v === "function";
    };
    exports.isObj = exports.isObject = function(obj) {
      return obj !== null && typeof obj === "object";
    };
    var _toString = Object.prototype.toString;
    exports.isPlainObject = function(obj) {
      return _toString.call(obj) === "[object Object]";
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    exports.hasOwn = function(obj, key) {
      return hasOwnProperty.call(obj, key);
    };
    exports.noop = function(a, b, c) {
    };
    exports.isValidArrayIndex = function(val) {
      var n = parseFloat(String(val));
      return n >= 0 && Math.floor(n) === n && isFinite(val);
    };
  });
  var tools_7 = tools.isFunc;
  var tools_10 = tools.isPlainObject;
  var EVENT_TYPE = ["ready", "beforeImageLoad", "beforeDraw", "imageLoad"];
  function observer() {
    var self2 = this;
    self2.on = function(event, fn) {
      if (EVENT_TYPE.indexOf(event) > -1) {
        if (tools_7(fn)) {
          event === "ready" ? fn(self2) : self2["on" + firstLetterUpper(event)] = fn;
        }
      } else {
        formatAppLog("error", "at uni_modules/vk-uview-ui/components/u-avatar-cropper/weCropper.js:343", "event: " + event + " is invalid");
      }
      return self2;
    };
  }
  function wxPromise(fn) {
    return function(obj) {
      var args = [], len = arguments.length - 1;
      while (len-- > 0)
        args[len] = arguments[len + 1];
      if (obj === void 0)
        obj = {};
      return new Promise(function(resolve, reject) {
        obj.success = function(res) {
          resolve(res);
        };
        obj.fail = function(err) {
          reject(err);
        };
        fn.apply(void 0, [obj].concat(args));
      });
    };
  }
  function draw(ctx, reserve) {
    if (reserve === void 0)
      reserve = false;
    return new Promise(function(resolve) {
      ctx.draw(reserve, resolve);
    });
  }
  var getImageInfo = wxPromise(uni.getImageInfo);
  var canvasToTempFilePath = wxPromise(uni.canvasToTempFilePath);
  var base64 = createCommonjsModule(function(module, exports) {
    /*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
    (function(root) {
      var freeExports = exports;
      var freeModule = module && module.exports == freeExports && module;
      var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal;
      if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
        root = freeGlobal;
      }
      var InvalidCharacterError = function(message) {
        this.message = message;
      };
      InvalidCharacterError.prototype = new Error();
      InvalidCharacterError.prototype.name = "InvalidCharacterError";
      var error = function(message) {
        throw new InvalidCharacterError(message);
      };
      var TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;
      var decode = function(input) {
        input = String(input).replace(REGEX_SPACE_CHARACTERS, "");
        var length = input.length;
        if (length % 4 == 0) {
          input = input.replace(/==?$/, "");
          length = input.length;
        }
        if (length % 4 == 1 || /[^+a-zA-Z0-9/]/.test(input)) {
          error(
            "Invalid character: the string to be decoded is not correctly encoded."
          );
        }
        var bitCounter = 0;
        var bitStorage;
        var buffer;
        var output = "";
        var position = -1;
        while (++position < length) {
          buffer = TABLE.indexOf(input.charAt(position));
          bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
          if (bitCounter++ % 4) {
            output += String.fromCharCode(
              255 & bitStorage >> (-2 * bitCounter & 6)
            );
          }
        }
        return output;
      };
      var encode = function(input) {
        input = String(input);
        if (/[^\0-\xFF]/.test(input)) {
          error(
            "The string to be encoded contains characters outside of the Latin1 range."
          );
        }
        var padding = input.length % 3;
        var output = "";
        var position = -1;
        var a;
        var b;
        var c;
        var buffer;
        var length = input.length - padding;
        while (++position < length) {
          a = input.charCodeAt(position) << 16;
          b = input.charCodeAt(++position) << 8;
          c = input.charCodeAt(++position);
          buffer = a + b + c;
          output += TABLE.charAt(buffer >> 18 & 63) + TABLE.charAt(buffer >> 12 & 63) + TABLE.charAt(buffer >> 6 & 63) + TABLE.charAt(buffer & 63);
        }
        if (padding == 2) {
          a = input.charCodeAt(position) << 8;
          b = input.charCodeAt(++position);
          buffer = a + b;
          output += TABLE.charAt(buffer >> 10) + TABLE.charAt(buffer >> 4 & 63) + TABLE.charAt(buffer << 2 & 63) + "=";
        } else if (padding == 1) {
          buffer = input.charCodeAt(position);
          output += TABLE.charAt(buffer >> 2) + TABLE.charAt(buffer << 4 & 63) + "==";
        }
        return output;
      };
      var base642 = {
        "encode": encode,
        "decode": decode,
        "version": "0.1.0"
      };
      if (freeExports && !freeExports.nodeType) {
        if (freeModule) {
          freeModule.exports = base642;
        } else {
          for (var key in base642) {
            base642.hasOwnProperty(key) && (freeExports[key] = base642[key]);
          }
        }
      } else {
        root.base64 = base642;
      }
    })(commonjsGlobal);
  });
  function makeURI(strData, type2) {
    return "data:" + type2 + ";base64," + strData;
  }
  function fixType(type2) {
    type2 = type2.toLowerCase().replace(/jpg/i, "jpeg");
    var r = type2.match(/png|jpeg|bmp|gif/)[0];
    return "image/" + r;
  }
  function encodeData(data) {
    var str = "";
    if (typeof data === "string") {
      str = data;
    } else {
      for (var i = 0; i < data.length; i++) {
        str += String.fromCharCode(data[i]);
      }
    }
    return base64.encode(str);
  }
  function getImageData(canvasId, x, y, width, height, done) {
    uni.canvasGetImageData({
      canvasId,
      x,
      y,
      width,
      height,
      success: function success(res) {
        done(res, null);
      },
      fail: function fail(res) {
        done(null, res);
      }
    });
  }
  function genBitmapImage(oData) {
    var biWidth = oData.width;
    var biHeight = oData.height;
    var biSizeImage = biWidth * biHeight * 3;
    var bfSize = biSizeImage + 54;
    var BITMAPFILEHEADER = [
      66,
      77,
      bfSize & 255,
      bfSize >> 8 & 255,
      bfSize >> 16 & 255,
      bfSize >> 24 & 255,
      0,
      0,
      0,
      0,
      54,
      0,
      0,
      0
    ];
    var BITMAPINFOHEADER = [
      40,
      0,
      0,
      0,
      biWidth & 255,
      biWidth >> 8 & 255,
      biWidth >> 16 & 255,
      biWidth >> 24 & 255,
      biHeight & 255,
      biHeight >> 8 & 255,
      biHeight >> 16 & 255,
      biHeight >> 24 & 255,
      1,
      0,
      24,
      0,
      0,
      0,
      0,
      0,
      biSizeImage & 255,
      biSizeImage >> 8 & 255,
      biSizeImage >> 16 & 255,
      biSizeImage >> 24 & 255,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var iPadding = (4 - biWidth * 3 % 4) % 4;
    var aImgData = oData.data;
    var strPixelData = "";
    var biWidth4 = biWidth << 2;
    var y = biHeight;
    var fromCharCode = String.fromCharCode;
    do {
      var iOffsetY = biWidth4 * (y - 1);
      var strPixelRow = "";
      for (var x = 0; x < biWidth; x++) {
        var iOffsetX = x << 2;
        strPixelRow += fromCharCode(aImgData[iOffsetY + iOffsetX + 2]) + fromCharCode(aImgData[iOffsetY + iOffsetX + 1]) + fromCharCode(aImgData[iOffsetY + iOffsetX]);
      }
      for (var c = 0; c < iPadding; c++) {
        strPixelRow += String.fromCharCode(0);
      }
      strPixelData += strPixelRow;
    } while (--y);
    var strEncoded = encodeData(BITMAPFILEHEADER.concat(BITMAPINFOHEADER)) + encodeData(strPixelData);
    return strEncoded;
  }
  function convertToImage(canvasId, x, y, width, height, type2, done) {
    if (done === void 0)
      done = function() {
      };
    if (type2 === void 0) {
      type2 = "png";
    }
    type2 = fixType(type2);
    if (/bmp/.test(type2)) {
      getImageData(canvasId, x, y, width, height, function(data, err) {
        var strData = genBitmapImage(data);
        tools_7(done) && done(makeURI(strData, "image/" + type2), err);
      });
    } else {
      formatAppLog("error", "at uni_modules/vk-uview-ui/components/u-avatar-cropper/weCropper.js:727", "\u6682\u4E0D\u652F\u6301\u751F\u6210'" + type2 + "'\u7C7B\u578B\u7684base64\u56FE\u7247");
    }
  }
  var CanvasToBase64 = {
    convertToImage,
    convertToBMP: function(ref2, done) {
      if (ref2 === void 0)
        ref2 = {};
      var canvasId = ref2.canvasId;
      var x = ref2.x;
      var y = ref2.y;
      var width = ref2.width;
      var height = ref2.height;
      if (done === void 0)
        done = function() {
        };
      return convertToImage(canvasId, x, y, width, height, "bmp", done);
    }
  };
  function methods() {
    var self2 = this;
    var boundWidth = self2.width;
    var boundHeight = self2.height;
    var id = self2.id;
    var targetId = self2.targetId;
    var pixelRatio2 = self2.pixelRatio;
    var ref2 = self2.cut;
    var x = ref2.x;
    if (x === void 0)
      x = 0;
    var y = ref2.y;
    if (y === void 0)
      y = 0;
    var width = ref2.width;
    if (width === void 0)
      width = boundWidth;
    var height = ref2.height;
    if (height === void 0)
      height = boundHeight;
    self2.updateCanvas = function(done) {
      if (self2.croperTarget) {
        self2.ctx.drawImage(
          self2.croperTarget,
          self2.imgLeft,
          self2.imgTop,
          self2.scaleWidth,
          self2.scaleHeight
        );
      }
      tools_7(self2.onBeforeDraw) && self2.onBeforeDraw(self2.ctx, self2);
      self2.setBoundStyle(self2.boundStyle);
      self2.ctx.draw(false, done);
      return self2;
    };
    self2.pushOrigin = self2.pushOrign = function(src) {
      self2.src = src;
      tools_7(self2.onBeforeImageLoad) && self2.onBeforeImageLoad(self2.ctx, self2);
      return getImageInfo({
        src
      }).then(function(res) {
        var innerAspectRadio = res.width / res.height;
        var customAspectRadio = width / height;
        self2.croperTarget = res.path;
        if (innerAspectRadio < customAspectRadio) {
          self2.rectX = x;
          self2.baseWidth = width;
          self2.baseHeight = width / innerAspectRadio;
          self2.rectY = y - Math.abs((height - self2.baseHeight) / 2);
        } else {
          self2.rectY = y;
          self2.baseWidth = height * innerAspectRadio;
          self2.baseHeight = height;
          self2.rectX = x - Math.abs((width - self2.baseWidth) / 2);
        }
        self2.imgLeft = self2.rectX;
        self2.imgTop = self2.rectY;
        self2.scaleWidth = self2.baseWidth;
        self2.scaleHeight = self2.baseHeight;
        self2.update();
        return new Promise(function(resolve) {
          self2.updateCanvas(resolve);
        });
      }).then(function() {
        tools_7(self2.onImageLoad) && self2.onImageLoad(self2.ctx, self2);
      });
    };
    self2.removeImage = function() {
      self2.src = "";
      self2.croperTarget = "";
      return draw(self2.ctx);
    };
    self2.getCropperBase64 = function(done) {
      if (done === void 0)
        done = function() {
        };
      CanvasToBase64.convertToBMP({
        canvasId: id,
        x,
        y,
        width,
        height
      }, done);
    };
    self2.getCropperImage = function(opt, fn) {
      var customOptions = opt;
      var canvasOptions = {
        canvasId: id,
        x,
        y,
        width,
        height
      };
      var task = function() {
        return Promise.resolve();
      };
      if (tools_10(customOptions) && customOptions.original) {
        task = function() {
          self2.targetCtx.drawImage(
            self2.croperTarget,
            self2.imgLeft * pixelRatio2,
            self2.imgTop * pixelRatio2,
            self2.scaleWidth * pixelRatio2,
            self2.scaleHeight * pixelRatio2
          );
          canvasOptions = {
            canvasId: targetId,
            x: x * pixelRatio2,
            y: y * pixelRatio2,
            width: width * pixelRatio2,
            height: height * pixelRatio2
          };
          return draw(self2.targetCtx);
        };
      }
      return task().then(function() {
        if (tools_10(customOptions)) {
          canvasOptions = Object.assign({}, canvasOptions, customOptions);
        }
        if (tools_7(customOptions)) {
          fn = customOptions;
        }
        var arg = canvasOptions.componentContext ? [canvasOptions, canvasOptions.componentContext] : [canvasOptions];
        return canvasToTempFilePath.apply(null, arg);
      }).then(function(res) {
        var tempFilePath = res.tempFilePath;
        return tools_7(fn) ? fn.call(self2, tempFilePath, null) : tempFilePath;
      }).catch(function(err) {
        if (tools_7(fn)) {
          fn.call(self2, null, err);
        } else {
          throw err;
        }
      });
    };
  }
  var getNewScale = function(oldScale, oldDistance, zoom, touch0, touch1) {
    var xMove, yMove, newDistance;
    xMove = Math.round(touch1.x - touch0.x);
    yMove = Math.round(touch1.y - touch0.y);
    newDistance = Math.round(Math.sqrt(xMove * xMove + yMove * yMove));
    return oldScale + 1e-3 * zoom * (newDistance - oldDistance);
  };
  function update() {
    var self2 = this;
    if (!self2.src) {
      return;
    }
    self2.__oneTouchStart = function(touch) {
      self2.touchX0 = Math.round(touch.x);
      self2.touchY0 = Math.round(touch.y);
    };
    self2.__oneTouchMove = function(touch) {
      var xMove, yMove;
      if (self2.touchended) {
        return self2.updateCanvas();
      }
      xMove = Math.round(touch.x - self2.touchX0);
      yMove = Math.round(touch.y - self2.touchY0);
      var imgLeft = Math.round(self2.rectX + xMove);
      var imgTop = Math.round(self2.rectY + yMove);
      self2.outsideBound(imgLeft, imgTop);
      self2.updateCanvas();
    };
    self2.__twoTouchStart = function(touch0, touch1) {
      var xMove, yMove, oldDistance;
      self2.touchX1 = Math.round(self2.rectX + self2.scaleWidth / 2);
      self2.touchY1 = Math.round(self2.rectY + self2.scaleHeight / 2);
      xMove = Math.round(touch1.x - touch0.x);
      yMove = Math.round(touch1.y - touch0.y);
      oldDistance = Math.round(Math.sqrt(xMove * xMove + yMove * yMove));
      self2.oldDistance = oldDistance;
    };
    self2.__twoTouchMove = function(touch0, touch1) {
      var oldScale = self2.oldScale;
      var oldDistance = self2.oldDistance;
      var scale = self2.scale;
      var zoom = self2.zoom;
      self2.newScale = getNewScale(oldScale, oldDistance, zoom, touch0, touch1);
      self2.newScale <= 1 && (self2.newScale = 1);
      self2.newScale >= scale && (self2.newScale = scale);
      self2.scaleWidth = Math.round(self2.newScale * self2.baseWidth);
      self2.scaleHeight = Math.round(self2.newScale * self2.baseHeight);
      var imgLeft = Math.round(self2.touchX1 - self2.scaleWidth / 2);
      var imgTop = Math.round(self2.touchY1 - self2.scaleHeight / 2);
      self2.outsideBound(imgLeft, imgTop);
      self2.updateCanvas();
    };
    self2.__xtouchEnd = function() {
      self2.oldScale = self2.newScale;
      self2.rectX = self2.imgLeft;
      self2.rectY = self2.imgTop;
    };
  }
  var handle = {
    touchStart: function touchStart(e) {
      var self2 = this;
      var ref2 = e.touches;
      var touch0 = ref2[0];
      var touch1 = ref2[1];
      if (!self2.src) {
        return;
      }
      setTouchState(self2, true, null, null);
      self2.__oneTouchStart(touch0);
      if (e.touches.length >= 2) {
        self2.__twoTouchStart(touch0, touch1);
      }
    },
    touchMove: function touchMove(e) {
      var self2 = this;
      var ref2 = e.touches;
      var touch0 = ref2[0];
      var touch1 = ref2[1];
      if (!self2.src) {
        return;
      }
      setTouchState(self2, null, true);
      if (e.touches.length === 1) {
        self2.__oneTouchMove(touch0);
      }
      if (e.touches.length >= 2) {
        self2.__twoTouchMove(touch0, touch1);
      }
    },
    touchEnd: function touchEnd(e) {
      var self2 = this;
      if (!self2.src) {
        return;
      }
      setTouchState(self2, false, false, true);
      self2.__xtouchEnd();
    }
  };
  function cut() {
    var self2 = this;
    var boundWidth = self2.width;
    var boundHeight = self2.height;
    var ref2 = self2.cut;
    var x = ref2.x;
    if (x === void 0)
      x = 0;
    var y = ref2.y;
    if (y === void 0)
      y = 0;
    var width = ref2.width;
    if (width === void 0)
      width = boundWidth;
    var height = ref2.height;
    if (height === void 0)
      height = boundHeight;
    self2.outsideBound = function(imgLeft, imgTop) {
      self2.imgLeft = imgLeft >= x ? x : self2.scaleWidth + imgLeft - x <= width ? x + width - self2.scaleWidth : imgLeft;
      self2.imgTop = imgTop >= y ? y : self2.scaleHeight + imgTop - y <= height ? y + height - self2.scaleHeight : imgTop;
    };
    self2.setBoundStyle = function(ref3) {
      if (ref3 === void 0)
        ref3 = {};
      var color2 = ref3.color;
      if (color2 === void 0)
        color2 = "#04b00f";
      var mask = ref3.mask;
      if (mask === void 0)
        mask = "rgba(0, 0, 0, 0.3)";
      var lineWidth = ref3.lineWidth;
      if (lineWidth === void 0)
        lineWidth = 1;
      var half = lineWidth / 2;
      var boundOption = [
        {
          start: {
            x: x - half,
            y: y + 10 - half
          },
          step1: {
            x: x - half,
            y: y - half
          },
          step2: {
            x: x + 10 - half,
            y: y - half
          }
        },
        {
          start: {
            x: x - half,
            y: y + height - 10 + half
          },
          step1: {
            x: x - half,
            y: y + height + half
          },
          step2: {
            x: x + 10 - half,
            y: y + height + half
          }
        },
        {
          start: {
            x: x + width - 10 + half,
            y: y - half
          },
          step1: {
            x: x + width + half,
            y: y - half
          },
          step2: {
            x: x + width + half,
            y: y + 10 - half
          }
        },
        {
          start: {
            x: x + width + half,
            y: y + height - 10 + half
          },
          step1: {
            x: x + width + half,
            y: y + height + half
          },
          step2: {
            x: x + width - 10 + half,
            y: y + height + half
          }
        }
      ];
      self2.ctx.beginPath();
      self2.ctx.setFillStyle(mask);
      self2.ctx.fillRect(0, 0, x, boundHeight);
      self2.ctx.fillRect(x, 0, width, y);
      self2.ctx.fillRect(x, y + height, width, boundHeight - y - height);
      self2.ctx.fillRect(x + width, 0, boundWidth - x - width, boundHeight);
      self2.ctx.fill();
      boundOption.forEach(function(op) {
        self2.ctx.beginPath();
        self2.ctx.setStrokeStyle(color2);
        self2.ctx.setLineWidth(lineWidth);
        self2.ctx.moveTo(op.start.x, op.start.y);
        self2.ctx.lineTo(op.step1.x, op.step1.y);
        self2.ctx.lineTo(op.step2.x, op.step2.y);
        self2.ctx.stroke();
      });
    };
  }
  var version$1 = "1.3.9";
  var WeCropper = function WeCropper2(params) {
    var self2 = this;
    var _default = {};
    validator(self2, DEFAULT);
    Object.keys(DEFAULT).forEach(function(key) {
      _default[key] = DEFAULT[key].default;
    });
    Object.assign(self2, _default, params);
    self2.prepare();
    self2.attachPage();
    self2.createCtx();
    self2.observer();
    self2.cutt();
    self2.methods();
    self2.init();
    self2.update();
    return self2;
  };
  WeCropper.prototype.init = function init() {
    var self2 = this;
    var src = self2.src;
    self2.version = version$1;
    typeof self2.onReady === "function" && self2.onReady(self2.ctx, self2);
    if (src) {
      self2.pushOrign(src);
    } else {
      self2.updateCanvas();
    }
    setTouchState(self2, false, false, false);
    self2.oldScale = 1;
    self2.newScale = 1;
    return self2;
  };
  Object.assign(WeCropper.prototype, handle);
  WeCropper.prototype.prepare = prepare;
  WeCropper.prototype.observer = observer;
  WeCropper.prototype.methods = methods;
  WeCropper.prototype.cutt = cut;
  WeCropper.prototype.update = update;
  const _sfc_main$d = {
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
            lineWidth: uni.upx2px(this.boundStyle.lineWidth),
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
      let rectInfo = uni.getSystemInfoSync();
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
      this.cropper = new WeCropper(this.cropperOpt).on("ready", (ctx) => {
      }).on("beforeImageLoad", (ctx) => {
      }).on("imageLoad", (ctx) => {
      }).on("beforeDraw", (ctx, instance) => {
      });
      uni.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#000000"
      });
      uni.chooseImage({
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
            uni.showModal({
              title: "\u6E29\u99A8\u63D0\u793A",
              content: err.message
            });
          } else {
            if (isPre) {
              uni.previewImage({
                current: "",
                urls: [path]
              });
            } else {
              uni.$emit("uAvatarCropper", path);
              this.$u.route({
                type: "back"
              });
            }
          }
        });
      },
      uploadTap() {
        const self2 = this;
        uni.chooseImage({
          count: 1,
          sizeType: ["original", "compressed"],
          sourceType: ["album", "camera"],
          success: (res) => {
            self2.src = res.tempFilePaths[0];
            self2.cropper.pushOrign(this.src);
          }
        });
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", {
        class: "cropper-wrapper",
        style: vue.normalizeStyle({ height: $data.cropperOpt.height + "px" })
      }, [
        vue.createElementVNode("canvas", {
          class: "cropper",
          "disable-scroll": true,
          onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.touchStart && $options.touchStart(...args)),
          onTouchmove: _cache[1] || (_cache[1] = (...args) => $options.touchMove && $options.touchMove(...args)),
          onTouchend: _cache[2] || (_cache[2] = (...args) => $options.touchEnd && $options.touchEnd(...args)),
          style: vue.normalizeStyle({ width: $data.cropperOpt.width, height: $data.cropperOpt.height, backgroundColor: "rgba(0, 0, 0, 0.8)" }),
          "canvas-id": "cropper",
          id: "cropper"
        }, null, 36),
        vue.createElementVNode("canvas", {
          class: "cropper",
          "disable-scroll": true,
          style: vue.normalizeStyle({
            position: "fixed",
            top: `-${$data.cropperOpt.width * $data.cropperOpt.pixelRatio}px`,
            left: `-${$data.cropperOpt.height * $data.cropperOpt.pixelRatio}px`,
            width: `${$data.cropperOpt.width * $data.cropperOpt.pixelRatio}px`,
            height: `${$data.cropperOpt.height * $data.cropperOpt.pixelRatio}`
          }),
          "canvas-id": "targetId",
          id: "targetId"
        }, null, 4)
      ], 4),
      vue.createElementVNode("view", {
        class: "cropper-buttons safe-area-padding",
        style: vue.normalizeStyle({ height: $data.bottomNavHeight + "px" })
      }, [
        vue.createElementVNode("view", {
          class: "upload",
          onClick: _cache[3] || (_cache[3] = (...args) => $options.uploadTap && $options.uploadTap(...args))
        }, "\u91CD\u65B0\u9009\u62E9"),
        vue.createElementVNode("view", {
          class: "getCropperImage",
          onClick: _cache[4] || (_cache[4] = ($event) => $options.getCropperImage(false))
        }, "\u786E\u5B9A")
      ], 4)
    ]);
  }
  var Uni_modulesVkUviewUiComponentsUAvatarCropperUAvatarCropper = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$a], ["__scopeId", "data-v-425276b6"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-avatar-cropper/u-avatar-cropper.vue"]]);
  const _sfc_main$c = {
    name: "u-radio",
    emits: ["change"],
    props: {
      name: {
        type: [String, Number],
        default: ""
      },
      size: {
        type: [String, Number],
        default: 34
      },
      shape: {
        type: String,
        default: ""
      },
      disabled: {
        type: [String, Boolean],
        default: ""
      },
      labelDisabled: {
        type: [String, Boolean],
        default: ""
      },
      activeColor: {
        type: String,
        default: ""
      },
      iconSize: {
        type: [String, Number],
        default: ""
      },
      labelSize: {
        type: [String, Number],
        default: ""
      }
    },
    data() {
      return {
        parentData: {
          iconSize: null,
          labelDisabled: null,
          disabled: null,
          shape: null,
          activeColor: null,
          size: null,
          width: null,
          height: null,
          value: null,
          wrap: null
        }
      };
    },
    created() {
      this.parent = false;
      this.updateParentData();
      this.parent.children.push(this);
    },
    computed: {
      elDisabled() {
        return this.disabled !== "" ? this.disabled : this.parentData.disabled !== null ? this.parentData.disabled : false;
      },
      elLabelDisabled() {
        return this.labelDisabled !== "" ? this.labelDisabled : this.parentData.labelDisabled !== null ? this.parentData.labelDisabled : false;
      },
      elSize() {
        return this.size ? this.size : this.parentData.size ? this.parentData.size : 34;
      },
      elIconSize() {
        return this.iconSize ? this.iconSize : this.parentData.iconSize ? this.parentData.iconSize : 20;
      },
      elActiveColor() {
        return this.activeColor ? this.activeColor : this.parentData.activeColor ? this.parentData.activeColor : "primary";
      },
      elShape() {
        return this.shape ? this.shape : this.parentData.shape ? this.parentData.shape : "circle";
      },
      iconStyle() {
        let style = {};
        if (this.elActiveColor && this.parentData.value === this.name && !this.elDisabled) {
          style.borderColor = this.elActiveColor;
          style.backgroundColor = this.elActiveColor;
        }
        style.width = this.$u.addUnit(this.elSize);
        style.height = this.$u.addUnit(this.elSize);
        return style;
      },
      iconColor() {
        return this.name === this.parentData.value ? "#ffffff" : "transparent";
      },
      iconClass() {
        let classes = [];
        classes.push("u-radio__icon-wrap--" + this.elShape);
        if (this.name === this.parentData.value)
          classes.push("u-radio__icon-wrap--checked");
        if (this.elDisabled)
          classes.push("u-radio__icon-wrap--disabled");
        if (this.name === this.parentData.value && this.elDisabled)
          classes.push("u-radio__icon-wrap--disabled--checked");
        return classes.join(" ");
      },
      radioStyle() {
        let style = {};
        if (this.parentData.width) {
          style.width = this.$u.addUnit(this.parentData.width);
          style.flex = `0 0 ${this.$u.addUnit(this.parentData.width)}`;
        }
        if (this.parentData.wrap) {
          style.width = "100%";
          style.flex = "0 0 100%";
        }
        return style;
      }
    },
    methods: {
      updateParentData() {
        this.getParentData("u-radio-group");
      },
      onClickLabel() {
        if (!this.elLabelDisabled && !this.elDisabled) {
          this.setRadioCheckedStatus();
        }
      },
      toggle() {
        if (!this.elDisabled) {
          this.setRadioCheckedStatus();
        }
      },
      emitEvent() {
        if (this.parentData.value != this.name)
          this.$emit("change", this.name);
      },
      setRadioCheckedStatus() {
        this.emitEvent();
        if (this.parent) {
          this.parent.setValue(this.name);
          this.parentData.value = this.name;
        }
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "u-radio",
      style: vue.normalizeStyle([$options.radioStyle])
    }, [
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["u-radio__icon-wrap", [$options.iconClass]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.toggle && $options.toggle(...args)),
        style: vue.normalizeStyle([$options.iconStyle])
      }, [
        vue.createVNode(_component_u_icon, {
          class: "u-radio__icon-wrap__icon",
          name: "checkbox-mark",
          size: $options.elIconSize,
          color: $options.iconColor
        }, null, 8, ["size", "color"])
      ], 6),
      vue.createElementVNode("view", {
        class: "u-radio__label",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.onClickLabel && $options.onClickLabel(...args)),
        style: vue.normalizeStyle({ fontSize: _ctx.$u.addUnit($props.labelSize) })
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4)
    ], 4);
  }
  var __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$9], ["__scopeId", "data-v-08b7cd44"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-radio/u-radio.vue"]]);
  const _sfc_main$b = {
    name: "u-radio-group",
    emits: ["update:modelValue", "input", "change"],
    mixins: [Emitter],
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      disabled: {
        type: Boolean,
        default: false
      },
      activeColor: {
        type: String,
        default: "#2979ff"
      },
      size: {
        type: [String, Number],
        default: 34
      },
      labelDisabled: {
        type: Boolean,
        default: false
      },
      shape: {
        type: String,
        default: "circle"
      },
      iconSize: {
        type: [String, Number],
        default: 20
      },
      width: {
        type: [String, Number],
        default: "auto"
      },
      wrap: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        uFromData: {
          inputAlign: "left"
        }
      };
    },
    created() {
      this.children = [];
    },
    mounted() {
      let parent = this.$u.$parent.call(this, "u-form");
      if (parent) {
        Object.keys(this.uFromData).map((key) => {
          this.uFromData[key] = parent[key];
        });
      }
    },
    watch: {
      parentData() {
        if (this.children.length) {
          this.children.map((child) => {
            typeof child.updateParentData == "function" && child.updateParentData();
          });
        }
      }
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      parentData() {
        return [
          this.value,
          this.disabled,
          this.activeColor,
          this.size,
          this.labelDisabled,
          this.shape,
          this.iconSize,
          this.width,
          this.wrap
        ];
      }
    },
    methods: {
      setValue(val) {
        this.children.map((child) => {
          if (child.parentData.value != val)
            child.parentData.value = "";
        });
        this.$emit("input", val);
        this.$emit("update:modelValue", val);
        this.$emit("change", val);
        setTimeout(() => {
          this.dispatch("u-form-item", "onFieldChange", val);
        }, 60);
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["u-radio-group u-clearfix", $data.uFromData.inputAlign == "right" ? "flex-end" : ""])
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 2);
  }
  var __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$8], ["__scopeId", "data-v-b5c71a7c"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-radio-group/u-radio-group.vue"]]);
  const _sfc_main$a = {
    name: "u-mask",
    emits: ["click"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      zIndex: {
        type: [Number, String],
        default: ""
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      zoom: {
        type: Boolean,
        default: true
      },
      duration: {
        type: [Number, String],
        default: 300
      },
      maskClickAble: {
        type: Boolean,
        default: true
      },
      blur: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        zoomStyle: {
          transform: ""
        },
        scale: "scale(1.2, 1.2)"
      };
    },
    watch: {
      show(n) {
        if (n && this.zoom) {
          this.zoomStyle.transform = "scale(1, 1)";
        } else if (!n && this.zoom) {
          this.zoomStyle.transform = this.scale;
        }
      }
    },
    computed: {
      maskStyle() {
        let style = {};
        style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        if (this.show)
          style.zIndex = this.zIndex ? this.zIndex : this.$u.zIndex.mask;
        else
          style.zIndex = -1;
        style.transition = `all ${this.duration / 1e3}s ease-in-out`;
        if (Object.keys(this.customStyle).length)
          style = {
            ...style,
            ...this.customStyle
          };
        return style;
      },
      filterStyle() {
        let { blur } = this;
        let style = {};
        if (blur) {
          style.backdropFilter = `blur(${blur}rpx)`;
        }
        return style;
      }
    },
    methods: {
      click() {
        if (!this.maskClickAble)
          return;
        this.$emit("click");
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["u-mask", {
        "u-mask-zoom": $props.zoom,
        "u-mask-show": $props.show
      }]),
      "hover-stop-propagation": "",
      style: vue.normalizeStyle([$options.maskStyle, $data.zoomStyle, $options.filterStyle]),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args)),
      onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
      }, ["stop", "prevent"]))
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 38);
  }
  var __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$7], ["__scopeId", "data-v-22d50354"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-mask/u-mask.vue"]]);
  const _sfc_main$9 = {
    name: "u-popup",
    emits: ["update:modelValue", "input", "open", "close"],
    props: {
      value: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      show: {
        type: Boolean,
        default: false
      },
      mode: {
        type: String,
        default: "left"
      },
      mask: {
        type: Boolean,
        default: true
      },
      length: {
        type: [Number, String],
        default: "auto"
      },
      zoom: {
        type: Boolean,
        default: true
      },
      safeAreaInsetBottom: {
        type: Boolean,
        default: false
      },
      maskCloseAble: {
        type: Boolean,
        default: true
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      popup: {
        type: Boolean,
        default: true
      },
      borderRadius: {
        type: [Number, String],
        default: 0
      },
      zIndex: {
        type: [Number, String],
        default: ""
      },
      closeable: {
        type: Boolean,
        default: false
      },
      closeIcon: {
        type: String,
        default: "close"
      },
      closeIconPos: {
        type: String,
        default: "top-right"
      },
      closeIconColor: {
        type: String,
        default: "#909399"
      },
      closeIconSize: {
        type: [String, Number],
        default: "30"
      },
      width: {
        type: String,
        default: ""
      },
      height: {
        type: String,
        default: ""
      },
      negativeTop: {
        type: [String, Number],
        default: 0
      },
      maskCustomStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      duration: {
        type: [String, Number],
        default: 250
      },
      blur: {
        type: [String, Number],
        default: 0
      }
    },
    data() {
      return {
        visibleSync: false,
        showDrawer: false,
        timer: null,
        closeFromInner: false
      };
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      style() {
        let style = {};
        if (this.mode == "left" || this.mode == "right") {
          style = {
            width: this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length),
            height: "100%",
            transform: `translate3D(${this.mode == "left" ? "-100%" : "100%"},0px,0px)`
          };
        } else if (this.mode == "top" || this.mode == "bottom") {
          style = {
            width: "100%",
            height: this.height ? this.getUnitValue(this.height) : this.getUnitValue(this.length),
            transform: `translate3D(0px,${this.mode == "top" ? "-100%" : "100%"},0px)`
          };
        }
        style.zIndex = this.uZindex;
        if (this.borderRadius) {
          switch (this.mode) {
            case "left":
              style.borderRadius = `0 ${this.borderRadius}rpx ${this.borderRadius}rpx 0`;
              break;
            case "top":
              style.borderRadius = `0 0 ${this.borderRadius}rpx ${this.borderRadius}rpx`;
              break;
            case "right":
              style.borderRadius = `${this.borderRadius}rpx 0 0 ${this.borderRadius}rpx`;
              break;
            case "bottom":
              style.borderRadius = `${this.borderRadius}rpx ${this.borderRadius}rpx 0 0`;
              break;
          }
          style.overflow = "hidden";
        }
        if (this.duration)
          style.transition = `all ${this.duration / 1e3}s linear`;
        return style;
      },
      centerStyle() {
        let style = {};
        style.width = this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length);
        style.height = this.height ? this.getUnitValue(this.height) : "auto";
        style.zIndex = this.uZindex;
        style.marginTop = `-${this.$u.addUnit(this.negativeTop)}`;
        if (this.borderRadius) {
          style.borderRadius = `${this.borderRadius}rpx`;
          style.overflow = "hidden";
        }
        return style;
      },
      uZindex() {
        return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
      }
    },
    watch: {
      valueCom(val) {
        if (val) {
          this.open();
        } else if (!this.closeFromInner) {
          this.close();
        }
        this.closeFromInner = false;
      }
    },
    mounted() {
      this.valueCom && this.open();
    },
    methods: {
      getUnitValue(val) {
        if (/(%|px|rpx|auto)$/.test(val))
          return val;
        else
          return val + "rpx";
      },
      maskClick() {
        this.close();
      },
      close() {
        this.closeFromInner = true;
        this.change("showDrawer", "visibleSync", false);
      },
      modeCenterClose(mode) {
        if (mode != "center" || !this.maskCloseAble)
          return;
        this.close();
      },
      open() {
        this.change("visibleSync", "showDrawer", true);
      },
      change(param1, param2, status) {
        if (this.popup == true) {
          this.$emit("input", status);
          this.$emit("update:modelValue", status);
        }
        this[param1] = status;
        if (status) {
          this.$nextTick(() => {
            this[param2] = status;
            this.$emit(status ? "open" : "close");
          });
        } else {
          this.timer = setTimeout(() => {
            this[param2] = status;
            this.$emit(status ? "open" : "close");
          }, this.duration);
        }
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_mask = resolveEasycom(vue.resolveDynamicComponent("u-mask"), __easycom_0$1);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$6);
    return $data.visibleSync ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      style: vue.normalizeStyle([$props.customStyle, {
        zIndex: $options.uZindex - 1
      }]),
      class: "u-drawer",
      "hover-stop-propagation": ""
    }, [
      vue.createVNode(_component_u_mask, {
        blur: $props.blur,
        duration: $props.duration,
        "custom-style": $props.maskCustomStyle,
        maskClickAble: $props.maskCloseAble,
        "z-index": $options.uZindex - 2,
        show: $data.showDrawer && $props.mask,
        onClick: $options.maskClick
      }, null, 8, ["blur", "duration", "custom-style", "maskClickAble", "z-index", "show", "onClick"]),
      vue.createCommentVNode(" \u79FB\u9664	@tap.stop.prevent "),
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["u-drawer-content", [
          $props.safeAreaInsetBottom ? "safe-area-inset-bottom" : "",
          "u-drawer-" + $props.mode,
          $data.showDrawer ? "u-drawer-content-visible" : "",
          $props.zoom && $props.mode == "center" ? "u-animation-zoom" : ""
        ]]),
        onClick: _cache[3] || (_cache[3] = ($event) => $options.modeCenterClose($props.mode)),
        onTouchmove: _cache[4] || (_cache[4] = vue.withModifiers(() => {
        }, ["stop", "prevent"])),
        style: vue.normalizeStyle([$options.style])
      }, [
        $props.mode == "center" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "u-mode-center-box",
          onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
          }, ["stop", "prevent"])),
          onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
          }, ["stop", "prevent"])),
          style: vue.normalizeStyle([$options.centerStyle])
        }, [
          $props.closeable ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
            key: 0,
            onClick: $options.close,
            class: vue.normalizeClass(["u-close", ["u-close--" + $props.closeIconPos]]),
            name: $props.closeIcon,
            color: $props.closeIconColor,
            size: $props.closeIconSize
          }, null, 8, ["onClick", "class", "name", "color", "size"])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("scroll-view", {
            class: "u-drawer__scroll-view",
            "scroll-y": "true"
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])
        ], 36)) : (vue.openBlock(), vue.createElementBlock("scroll-view", {
          key: 1,
          class: "u-drawer__scroll-view",
          "scroll-y": "true"
        }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])),
        vue.createElementVNode("view", {
          onClick: _cache[2] || (_cache[2] = (...args) => $options.close && $options.close(...args)),
          class: vue.normalizeClass(["u-close", ["u-close--" + $props.closeIconPos]])
        }, [
          $props.mode != "center" && $props.closeable ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
            key: 0,
            name: $props.closeIcon,
            color: $props.closeIconColor,
            size: $props.closeIconSize
          }, null, 8, ["name", "color", "size"])) : vue.createCommentVNode("v-if", true)
        ], 2)
      ], 38)
    ], 4)) : vue.createCommentVNode("v-if", true);
  }
  var __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$6], ["__scopeId", "data-v-fed2de80"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-popup/u-popup.vue"]]);
  var provinces = [
    {
      code: "110000",
      name: "\u5317\u4EAC\u5E02"
    },
    {
      code: "120000",
      name: "\u5929\u6D25\u5E02"
    },
    {
      code: "130000",
      name: "\u6CB3\u5317\u7701"
    },
    {
      code: "140000",
      name: "\u5C71\u897F\u7701"
    },
    {
      code: "150000",
      name: "\u5185\u8499\u53E4\u81EA\u6CBB\u533A"
    },
    {
      code: "210000",
      name: "\u8FBD\u5B81\u7701"
    },
    {
      code: "220000",
      name: "\u5409\u6797\u7701"
    },
    {
      code: "230000",
      name: "\u9ED1\u9F99\u6C5F\u7701"
    },
    {
      code: "310000",
      name: "\u4E0A\u6D77\u5E02"
    },
    {
      code: "320000",
      name: "\u6C5F\u82CF\u7701"
    },
    {
      code: "330000",
      name: "\u6D59\u6C5F\u7701"
    },
    {
      code: "340000",
      name: "\u5B89\u5FBD\u7701"
    },
    {
      code: "350000",
      name: "\u798F\u5EFA\u7701"
    },
    {
      code: "360000",
      name: "\u6C5F\u897F\u7701"
    },
    {
      code: "370000",
      name: "\u5C71\u4E1C\u7701"
    },
    {
      code: "410000",
      name: "\u6CB3\u5357\u7701"
    },
    {
      code: "420000",
      name: "\u6E56\u5317\u7701"
    },
    {
      code: "430000",
      name: "\u6E56\u5357\u7701"
    },
    {
      code: "440000",
      name: "\u5E7F\u4E1C\u7701"
    },
    {
      code: "450000",
      name: "\u5E7F\u897F\u58EE\u65CF\u81EA\u6CBB\u533A"
    },
    {
      code: "460000",
      name: "\u6D77\u5357\u7701"
    },
    {
      code: "500000",
      name: "\u91CD\u5E86\u5E02"
    },
    {
      code: "510000",
      name: "\u56DB\u5DDD\u7701"
    },
    {
      code: "520000",
      name: "\u8D35\u5DDE\u7701"
    },
    {
      code: "530000",
      name: "\u4E91\u5357\u7701"
    },
    {
      code: "540000",
      name: "\u897F\u85CF\u81EA\u6CBB\u533A"
    },
    {
      code: "610000",
      name: "\u9655\u897F\u7701"
    },
    {
      code: "620000",
      name: "\u7518\u8083\u7701"
    },
    {
      code: "630000",
      name: "\u9752\u6D77\u7701"
    },
    {
      code: "640000",
      name: "\u5B81\u590F\u56DE\u65CF\u81EA\u6CBB\u533A"
    },
    {
      code: "650000",
      name: "\u65B0\u7586\u7EF4\u543E\u5C14\u81EA\u6CBB\u533A"
    },
    {
      code: "710000",
      name: "\u53F0\u6E7E\u7701"
    },
    {
      code: "810000",
      name: "\u9999\u6E2F\u7279\u522B\u884C\u653F\u533A"
    },
    {
      code: "820000",
      name: "\u6FB3\u95E8\u7279\u522B\u884C\u653F\u533A"
    }
  ];
  var citys = [
    [
      {
        code: "110100",
        name: "\u5317\u4EAC\u5E02"
      }
    ],
    [
      {
        code: "120100",
        name: "\u5929\u6D25\u5E02"
      }
    ],
    [
      {
        code: "130100",
        name: "\u77F3\u5BB6\u5E84\u5E02"
      },
      {
        code: "130200",
        name: "\u5510\u5C71\u5E02"
      },
      {
        code: "130300",
        name: "\u79E6\u7687\u5C9B\u5E02"
      },
      {
        code: "130400",
        name: "\u90AF\u90F8\u5E02"
      },
      {
        code: "130500",
        name: "\u90A2\u53F0\u5E02"
      },
      {
        code: "130600",
        name: "\u4FDD\u5B9A\u5E02"
      },
      {
        code: "130700",
        name: "\u5F20\u5BB6\u53E3\u5E02"
      },
      {
        code: "130800",
        name: "\u627F\u5FB7\u5E02"
      },
      {
        code: "130900",
        name: "\u6CA7\u5DDE\u5E02"
      },
      {
        code: "131000",
        name: "\u5ECA\u574A\u5E02"
      },
      {
        code: "131100",
        name: "\u8861\u6C34\u5E02"
      }
    ],
    [
      {
        code: "140100",
        name: "\u592A\u539F\u5E02"
      },
      {
        code: "140200",
        name: "\u5927\u540C\u5E02"
      },
      {
        code: "140300",
        name: "\u9633\u6CC9\u5E02"
      },
      {
        code: "140400",
        name: "\u957F\u6CBB\u5E02"
      },
      {
        code: "140500",
        name: "\u664B\u57CE\u5E02"
      },
      {
        code: "140600",
        name: "\u6714\u5DDE\u5E02"
      },
      {
        code: "140700",
        name: "\u664B\u4E2D\u5E02"
      },
      {
        code: "140800",
        name: "\u8FD0\u57CE\u5E02"
      },
      {
        code: "140900",
        name: "\u5FFB\u5DDE\u5E02"
      },
      {
        code: "141000",
        name: "\u4E34\u6C7E\u5E02"
      },
      {
        code: "141100",
        name: "\u5415\u6881\u5E02"
      }
    ],
    [
      {
        code: "150100",
        name: "\u547C\u548C\u6D69\u7279\u5E02"
      },
      {
        code: "150200",
        name: "\u5305\u5934\u5E02"
      },
      {
        code: "150300",
        name: "\u4E4C\u6D77\u5E02"
      },
      {
        code: "150400",
        name: "\u8D64\u5CF0\u5E02"
      },
      {
        code: "150500",
        name: "\u901A\u8FBD\u5E02"
      },
      {
        code: "150600",
        name: "\u9102\u5C14\u591A\u65AF\u5E02"
      },
      {
        code: "150700",
        name: "\u547C\u4F26\u8D1D\u5C14\u5E02"
      },
      {
        code: "150800",
        name: "\u5DF4\u5F66\u6DD6\u5C14\u5E02"
      },
      {
        code: "150900",
        name: "\u4E4C\u5170\u5BDF\u5E03\u5E02"
      },
      {
        code: "152200",
        name: "\u5174\u5B89\u76DF"
      },
      {
        code: "152500",
        name: "\u9521\u6797\u90ED\u52D2\u76DF"
      },
      {
        code: "152900",
        name: "\u963F\u62C9\u5584\u76DF"
      }
    ],
    [
      {
        code: "210100",
        name: "\u6C88\u9633\u5E02"
      },
      {
        code: "210200",
        name: "\u5927\u8FDE\u5E02"
      },
      {
        code: "210300",
        name: "\u978D\u5C71\u5E02"
      },
      {
        code: "210400",
        name: "\u629A\u987A\u5E02"
      },
      {
        code: "210500",
        name: "\u672C\u6EAA\u5E02"
      },
      {
        code: "210600",
        name: "\u4E39\u4E1C\u5E02"
      },
      {
        code: "210700",
        name: "\u9526\u5DDE\u5E02"
      },
      {
        code: "210800",
        name: "\u8425\u53E3\u5E02"
      },
      {
        code: "210900",
        name: "\u961C\u65B0\u5E02"
      },
      {
        code: "211000",
        name: "\u8FBD\u9633\u5E02"
      },
      {
        code: "211100",
        name: "\u76D8\u9526\u5E02"
      },
      {
        code: "211200",
        name: "\u94C1\u5CAD\u5E02"
      },
      {
        code: "211300",
        name: "\u671D\u9633\u5E02"
      },
      {
        code: "211400",
        name: "\u846B\u82A6\u5C9B\u5E02"
      }
    ],
    [
      {
        code: "220100",
        name: "\u957F\u6625\u5E02"
      },
      {
        code: "220200",
        name: "\u5409\u6797\u5E02"
      },
      {
        code: "220300",
        name: "\u56DB\u5E73\u5E02"
      },
      {
        code: "220400",
        name: "\u8FBD\u6E90\u5E02"
      },
      {
        code: "220500",
        name: "\u901A\u5316\u5E02"
      },
      {
        code: "220600",
        name: "\u767D\u5C71\u5E02"
      },
      {
        code: "220700",
        name: "\u677E\u539F\u5E02"
      },
      {
        code: "220800",
        name: "\u767D\u57CE\u5E02"
      },
      {
        code: "222400",
        name: "\u5EF6\u8FB9\u671D\u9C9C\u65CF\u81EA\u6CBB\u5DDE"
      }
    ],
    [
      {
        code: "230100",
        name: "\u54C8\u5C14\u6EE8\u5E02"
      },
      {
        code: "230200",
        name: "\u9F50\u9F50\u54C8\u5C14\u5E02"
      },
      {
        code: "230300",
        name: "\u9E21\u897F\u5E02"
      },
      {
        code: "230400",
        name: "\u9E64\u5C97\u5E02"
      },
      {
        code: "230500",
        name: "\u53CC\u9E2D\u5C71\u5E02"
      },
      {
        code: "230600",
        name: "\u5927\u5E86\u5E02"
      },
      {
        code: "230700",
        name: "\u4F0A\u6625\u5E02"
      },
      {
        code: "230800",
        name: "\u4F73\u6728\u65AF\u5E02"
      },
      {
        code: "230900",
        name: "\u4E03\u53F0\u6CB3\u5E02"
      },
      {
        code: "231000",
        name: "\u7261\u4E39\u6C5F\u5E02"
      },
      {
        code: "231100",
        name: "\u9ED1\u6CB3\u5E02"
      },
      {
        code: "231200",
        name: "\u7EE5\u5316\u5E02"
      },
      {
        code: "232700",
        name: "\u5927\u5174\u5B89\u5CAD\u5730\u533A"
      }
    ],
    [
      {
        code: "310100",
        name: "\u4E0A\u6D77\u5E02"
      }
    ],
    [
      {
        code: "320100",
        name: "\u5357\u4EAC\u5E02"
      },
      {
        code: "320200",
        name: "\u65E0\u9521\u5E02"
      },
      {
        code: "320300",
        name: "\u5F90\u5DDE\u5E02"
      },
      {
        code: "320400",
        name: "\u5E38\u5DDE\u5E02"
      },
      {
        code: "320500",
        name: "\u82CF\u5DDE\u5E02"
      },
      {
        code: "320600",
        name: "\u5357\u901A\u5E02"
      },
      {
        code: "320700",
        name: "\u8FDE\u4E91\u6E2F\u5E02"
      },
      {
        code: "320800",
        name: "\u6DEE\u5B89\u5E02"
      },
      {
        code: "320900",
        name: "\u76D0\u57CE\u5E02"
      },
      {
        code: "321000",
        name: "\u626C\u5DDE\u5E02"
      },
      {
        code: "321100",
        name: "\u9547\u6C5F\u5E02"
      },
      {
        code: "321200",
        name: "\u6CF0\u5DDE\u5E02"
      },
      {
        code: "321300",
        name: "\u5BBF\u8FC1\u5E02"
      }
    ],
    [
      {
        code: "330100",
        name: "\u676D\u5DDE\u5E02"
      },
      {
        code: "330200",
        name: "\u5B81\u6CE2\u5E02"
      },
      {
        code: "330300",
        name: "\u6E29\u5DDE\u5E02"
      },
      {
        code: "330400",
        name: "\u5609\u5174\u5E02"
      },
      {
        code: "330500",
        name: "\u6E56\u5DDE\u5E02"
      },
      {
        code: "330600",
        name: "\u7ECD\u5174\u5E02"
      },
      {
        code: "330700",
        name: "\u91D1\u534E\u5E02"
      },
      {
        code: "330800",
        name: "\u8862\u5DDE\u5E02"
      },
      {
        code: "330900",
        name: "\u821F\u5C71\u5E02"
      },
      {
        code: "331000",
        name: "\u53F0\u5DDE\u5E02"
      },
      {
        code: "331100",
        name: "\u4E3D\u6C34\u5E02"
      }
    ],
    [
      {
        code: "340100",
        name: "\u5408\u80A5\u5E02"
      },
      {
        code: "340200",
        name: "\u829C\u6E56\u5E02"
      },
      {
        code: "340300",
        name: "\u868C\u57E0\u5E02"
      },
      {
        code: "340400",
        name: "\u6DEE\u5357\u5E02"
      },
      {
        code: "340500",
        name: "\u9A6C\u978D\u5C71\u5E02"
      },
      {
        code: "340600",
        name: "\u6DEE\u5317\u5E02"
      },
      {
        code: "340700",
        name: "\u94DC\u9675\u5E02"
      },
      {
        code: "340800",
        name: "\u5B89\u5E86\u5E02"
      },
      {
        code: "341000",
        name: "\u9EC4\u5C71\u5E02"
      },
      {
        code: "341100",
        name: "\u6EC1\u5DDE\u5E02"
      },
      {
        code: "341200",
        name: "\u961C\u9633\u5E02"
      },
      {
        code: "341300",
        name: "\u5BBF\u5DDE\u5E02"
      },
      {
        code: "341500",
        name: "\u516D\u5B89\u5E02"
      },
      {
        code: "341600",
        name: "\u4EB3\u5DDE\u5E02"
      },
      {
        code: "341700",
        name: "\u6C60\u5DDE\u5E02"
      },
      {
        code: "341800",
        name: "\u5BA3\u57CE\u5E02"
      }
    ],
    [
      {
        code: "350100",
        name: "\u798F\u5DDE\u5E02"
      },
      {
        code: "350200",
        name: "\u53A6\u95E8\u5E02"
      },
      {
        code: "350300",
        name: "\u8386\u7530\u5E02"
      },
      {
        code: "350400",
        name: "\u4E09\u660E\u5E02"
      },
      {
        code: "350500",
        name: "\u6CC9\u5DDE\u5E02"
      },
      {
        code: "350600",
        name: "\u6F33\u5DDE\u5E02"
      },
      {
        code: "350700",
        name: "\u5357\u5E73\u5E02"
      },
      {
        code: "350800",
        name: "\u9F99\u5CA9\u5E02"
      },
      {
        code: "350900",
        name: "\u5B81\u5FB7\u5E02"
      }
    ],
    [
      {
        code: "360100",
        name: "\u5357\u660C\u5E02"
      },
      {
        code: "360200",
        name: "\u666F\u5FB7\u9547\u5E02"
      },
      {
        code: "360300",
        name: "\u840D\u4E61\u5E02"
      },
      {
        code: "360400",
        name: "\u4E5D\u6C5F\u5E02"
      },
      {
        code: "360500",
        name: "\u65B0\u4F59\u5E02"
      },
      {
        code: "360600",
        name: "\u9E70\u6F6D\u5E02"
      },
      {
        code: "360700",
        name: "\u8D63\u5DDE\u5E02"
      },
      {
        code: "360800",
        name: "\u5409\u5B89\u5E02"
      },
      {
        code: "360900",
        name: "\u5B9C\u6625\u5E02"
      },
      {
        code: "361000",
        name: "\u629A\u5DDE\u5E02"
      },
      {
        code: "361100",
        name: "\u4E0A\u9976\u5E02"
      }
    ],
    [
      {
        code: "370100",
        name: "\u6D4E\u5357\u5E02"
      },
      {
        code: "370200",
        name: "\u9752\u5C9B\u5E02"
      },
      {
        code: "370300",
        name: "\u6DC4\u535A\u5E02"
      },
      {
        code: "370400",
        name: "\u67A3\u5E84\u5E02"
      },
      {
        code: "370500",
        name: "\u4E1C\u8425\u5E02"
      },
      {
        code: "370600",
        name: "\u70DF\u53F0\u5E02"
      },
      {
        code: "370700",
        name: "\u6F4D\u574A\u5E02"
      },
      {
        code: "370800",
        name: "\u6D4E\u5B81\u5E02"
      },
      {
        code: "370900",
        name: "\u6CF0\u5B89\u5E02"
      },
      {
        code: "371000",
        name: "\u5A01\u6D77\u5E02"
      },
      {
        code: "371100",
        name: "\u65E5\u7167\u5E02"
      },
      {
        code: "371200",
        name: "\u83B1\u829C\u5E02"
      },
      {
        code: "371300",
        name: "\u4E34\u6C82\u5E02"
      },
      {
        code: "371400",
        name: "\u5FB7\u5DDE\u5E02"
      },
      {
        code: "371500",
        name: "\u804A\u57CE\u5E02"
      },
      {
        code: "371600",
        name: "\u6EE8\u5DDE\u5E02"
      },
      {
        code: "371700",
        name: "\u83CF\u6CFD\u5E02"
      }
    ],
    [
      {
        code: "410100",
        name: "\u90D1\u5DDE\u5E02"
      },
      {
        code: "410200",
        name: "\u5F00\u5C01\u5E02"
      },
      {
        code: "410300",
        name: "\u6D1B\u9633\u5E02"
      },
      {
        code: "410400",
        name: "\u5E73\u9876\u5C71\u5E02"
      },
      {
        code: "410500",
        name: "\u5B89\u9633\u5E02"
      },
      {
        code: "410600",
        name: "\u9E64\u58C1\u5E02"
      },
      {
        code: "410700",
        name: "\u65B0\u4E61\u5E02"
      },
      {
        code: "410800",
        name: "\u7126\u4F5C\u5E02"
      },
      {
        code: "410900",
        name: "\u6FEE\u9633\u5E02"
      },
      {
        code: "411000",
        name: "\u8BB8\u660C\u5E02"
      },
      {
        code: "411100",
        name: "\u6F2F\u6CB3\u5E02"
      },
      {
        code: "411200",
        name: "\u4E09\u95E8\u5CE1\u5E02"
      },
      {
        code: "411300",
        name: "\u5357\u9633\u5E02"
      },
      {
        code: "411400",
        name: "\u5546\u4E18\u5E02"
      },
      {
        code: "411500",
        name: "\u4FE1\u9633\u5E02"
      },
      {
        code: "411600",
        name: "\u5468\u53E3\u5E02"
      },
      {
        code: "411700",
        name: "\u9A7B\u9A6C\u5E97\u5E02"
      },
      {
        code: "419000",
        name: "\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212"
      }
    ],
    [
      {
        code: "420100",
        name: "\u6B66\u6C49\u5E02"
      },
      {
        code: "420200",
        name: "\u9EC4\u77F3\u5E02"
      },
      {
        code: "420300",
        name: "\u5341\u5830\u5E02"
      },
      {
        code: "420500",
        name: "\u5B9C\u660C\u5E02"
      },
      {
        code: "420600",
        name: "\u8944\u9633\u5E02"
      },
      {
        code: "420700",
        name: "\u9102\u5DDE\u5E02"
      },
      {
        code: "420800",
        name: "\u8346\u95E8\u5E02"
      },
      {
        code: "420900",
        name: "\u5B5D\u611F\u5E02"
      },
      {
        code: "421000",
        name: "\u8346\u5DDE\u5E02"
      },
      {
        code: "421100",
        name: "\u9EC4\u5188\u5E02"
      },
      {
        code: "421200",
        name: "\u54B8\u5B81\u5E02"
      },
      {
        code: "421300",
        name: "\u968F\u5DDE\u5E02"
      },
      {
        code: "422800",
        name: "\u6069\u65BD\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "429000",
        name: "\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212"
      }
    ],
    [
      {
        code: "430100",
        name: "\u957F\u6C99\u5E02"
      },
      {
        code: "430200",
        name: "\u682A\u6D32\u5E02"
      },
      {
        code: "430300",
        name: "\u6E58\u6F6D\u5E02"
      },
      {
        code: "430400",
        name: "\u8861\u9633\u5E02"
      },
      {
        code: "430500",
        name: "\u90B5\u9633\u5E02"
      },
      {
        code: "430600",
        name: "\u5CB3\u9633\u5E02"
      },
      {
        code: "430700",
        name: "\u5E38\u5FB7\u5E02"
      },
      {
        code: "430800",
        name: "\u5F20\u5BB6\u754C\u5E02"
      },
      {
        code: "430900",
        name: "\u76CA\u9633\u5E02"
      },
      {
        code: "431000",
        name: "\u90F4\u5DDE\u5E02"
      },
      {
        code: "431100",
        name: "\u6C38\u5DDE\u5E02"
      },
      {
        code: "431200",
        name: "\u6000\u5316\u5E02"
      },
      {
        code: "431300",
        name: "\u5A04\u5E95\u5E02"
      },
      {
        code: "433100",
        name: "\u6E58\u897F\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE"
      }
    ],
    [
      {
        code: "440100",
        name: "\u5E7F\u5DDE\u5E02"
      },
      {
        code: "440200",
        name: "\u97F6\u5173\u5E02"
      },
      {
        code: "440300",
        name: "\u6DF1\u5733\u5E02"
      },
      {
        code: "440400",
        name: "\u73E0\u6D77\u5E02"
      },
      {
        code: "440500",
        name: "\u6C55\u5934\u5E02"
      },
      {
        code: "440600",
        name: "\u4F5B\u5C71\u5E02"
      },
      {
        code: "440700",
        name: "\u6C5F\u95E8\u5E02"
      },
      {
        code: "440800",
        name: "\u6E5B\u6C5F\u5E02"
      },
      {
        code: "440900",
        name: "\u8302\u540D\u5E02"
      },
      {
        code: "441200",
        name: "\u8087\u5E86\u5E02"
      },
      {
        code: "441300",
        name: "\u60E0\u5DDE\u5E02"
      },
      {
        code: "441400",
        name: "\u6885\u5DDE\u5E02"
      },
      {
        code: "441500",
        name: "\u6C55\u5C3E\u5E02"
      },
      {
        code: "441600",
        name: "\u6CB3\u6E90\u5E02"
      },
      {
        code: "441700",
        name: "\u9633\u6C5F\u5E02"
      },
      {
        code: "441800",
        name: "\u6E05\u8FDC\u5E02"
      },
      {
        code: "441900",
        name: "\u4E1C\u839E\u5E02"
      },
      {
        code: "442000",
        name: "\u4E2D\u5C71\u5E02"
      },
      {
        code: "445100",
        name: "\u6F6E\u5DDE\u5E02"
      },
      {
        code: "445200",
        name: "\u63ED\u9633\u5E02"
      },
      {
        code: "445300",
        name: "\u4E91\u6D6E\u5E02"
      }
    ],
    [
      {
        code: "450100",
        name: "\u5357\u5B81\u5E02"
      },
      {
        code: "450200",
        name: "\u67F3\u5DDE\u5E02"
      },
      {
        code: "450300",
        name: "\u6842\u6797\u5E02"
      },
      {
        code: "450400",
        name: "\u68A7\u5DDE\u5E02"
      },
      {
        code: "450500",
        name: "\u5317\u6D77\u5E02"
      },
      {
        code: "450600",
        name: "\u9632\u57CE\u6E2F\u5E02"
      },
      {
        code: "450700",
        name: "\u94A6\u5DDE\u5E02"
      },
      {
        code: "450800",
        name: "\u8D35\u6E2F\u5E02"
      },
      {
        code: "450900",
        name: "\u7389\u6797\u5E02"
      },
      {
        code: "451000",
        name: "\u767E\u8272\u5E02"
      },
      {
        code: "451100",
        name: "\u8D3A\u5DDE\u5E02"
      },
      {
        code: "451200",
        name: "\u6CB3\u6C60\u5E02"
      },
      {
        code: "451300",
        name: "\u6765\u5BBE\u5E02"
      },
      {
        code: "451400",
        name: "\u5D07\u5DE6\u5E02"
      }
    ],
    [
      {
        code: "460100",
        name: "\u6D77\u53E3\u5E02"
      },
      {
        code: "460200",
        name: "\u4E09\u4E9A\u5E02"
      },
      {
        code: "460300",
        name: "\u4E09\u6C99\u5E02"
      },
      {
        code: "460400",
        name: "\u510B\u5DDE\u5E02"
      },
      {
        code: "469000",
        name: "\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212"
      }
    ],
    [
      {
        code: "500100",
        name: "\u91CD\u5E86\u5E02"
      },
      {
        code: "500200",
        name: "\u53BF"
      }
    ],
    [
      {
        code: "510100",
        name: "\u6210\u90FD\u5E02"
      },
      {
        code: "510300",
        name: "\u81EA\u8D21\u5E02"
      },
      {
        code: "510400",
        name: "\u6500\u679D\u82B1\u5E02"
      },
      {
        code: "510500",
        name: "\u6CF8\u5DDE\u5E02"
      },
      {
        code: "510600",
        name: "\u5FB7\u9633\u5E02"
      },
      {
        code: "510700",
        name: "\u7EF5\u9633\u5E02"
      },
      {
        code: "510800",
        name: "\u5E7F\u5143\u5E02"
      },
      {
        code: "510900",
        name: "\u9042\u5B81\u5E02"
      },
      {
        code: "511000",
        name: "\u5185\u6C5F\u5E02"
      },
      {
        code: "511100",
        name: "\u4E50\u5C71\u5E02"
      },
      {
        code: "511300",
        name: "\u5357\u5145\u5E02"
      },
      {
        code: "511400",
        name: "\u7709\u5C71\u5E02"
      },
      {
        code: "511500",
        name: "\u5B9C\u5BBE\u5E02"
      },
      {
        code: "511600",
        name: "\u5E7F\u5B89\u5E02"
      },
      {
        code: "511700",
        name: "\u8FBE\u5DDE\u5E02"
      },
      {
        code: "511800",
        name: "\u96C5\u5B89\u5E02"
      },
      {
        code: "511900",
        name: "\u5DF4\u4E2D\u5E02"
      },
      {
        code: "512000",
        name: "\u8D44\u9633\u5E02"
      },
      {
        code: "513200",
        name: "\u963F\u575D\u85CF\u65CF\u7F8C\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "513300",
        name: "\u7518\u5B5C\u85CF\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "513400",
        name: "\u51C9\u5C71\u5F5D\u65CF\u81EA\u6CBB\u5DDE"
      }
    ],
    [
      {
        code: "520100",
        name: "\u8D35\u9633\u5E02"
      },
      {
        code: "520200",
        name: "\u516D\u76D8\u6C34\u5E02"
      },
      {
        code: "520300",
        name: "\u9075\u4E49\u5E02"
      },
      {
        code: "520400",
        name: "\u5B89\u987A\u5E02"
      },
      {
        code: "520500",
        name: "\u6BD5\u8282\u5E02"
      },
      {
        code: "520600",
        name: "\u94DC\u4EC1\u5E02"
      },
      {
        code: "522300",
        name: "\u9ED4\u897F\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "522600",
        name: "\u9ED4\u4E1C\u5357\u82D7\u65CF\u4F97\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "522700",
        name: "\u9ED4\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE"
      }
    ],
    [
      {
        code: "530100",
        name: "\u6606\u660E\u5E02"
      },
      {
        code: "530300",
        name: "\u66F2\u9756\u5E02"
      },
      {
        code: "530400",
        name: "\u7389\u6EAA\u5E02"
      },
      {
        code: "530500",
        name: "\u4FDD\u5C71\u5E02"
      },
      {
        code: "530600",
        name: "\u662D\u901A\u5E02"
      },
      {
        code: "530700",
        name: "\u4E3D\u6C5F\u5E02"
      },
      {
        code: "530800",
        name: "\u666E\u6D31\u5E02"
      },
      {
        code: "530900",
        name: "\u4E34\u6CA7\u5E02"
      },
      {
        code: "532300",
        name: "\u695A\u96C4\u5F5D\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "532500",
        name: "\u7EA2\u6CB3\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "532600",
        name: "\u6587\u5C71\u58EE\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "532800",
        name: "\u897F\u53CC\u7248\u7EB3\u50A3\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "532900",
        name: "\u5927\u7406\u767D\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "533100",
        name: "\u5FB7\u5B8F\u50A3\u65CF\u666F\u9887\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "533300",
        name: "\u6012\u6C5F\u5088\u50F3\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "533400",
        name: "\u8FEA\u5E86\u85CF\u65CF\u81EA\u6CBB\u5DDE"
      }
    ],
    [
      {
        code: "540100",
        name: "\u62C9\u8428\u5E02"
      },
      {
        code: "540200",
        name: "\u65E5\u5580\u5219\u5E02"
      },
      {
        code: "540300",
        name: "\u660C\u90FD\u5E02"
      },
      {
        code: "540400",
        name: "\u6797\u829D\u5E02"
      },
      {
        code: "540500",
        name: "\u5C71\u5357\u5E02"
      },
      {
        code: "542400",
        name: "\u90A3\u66F2\u5730\u533A"
      },
      {
        code: "542500",
        name: "\u963F\u91CC\u5730\u533A"
      }
    ],
    [
      {
        code: "610100",
        name: "\u897F\u5B89\u5E02"
      },
      {
        code: "610200",
        name: "\u94DC\u5DDD\u5E02"
      },
      {
        code: "610300",
        name: "\u5B9D\u9E21\u5E02"
      },
      {
        code: "610400",
        name: "\u54B8\u9633\u5E02"
      },
      {
        code: "610500",
        name: "\u6E2D\u5357\u5E02"
      },
      {
        code: "610600",
        name: "\u5EF6\u5B89\u5E02"
      },
      {
        code: "610700",
        name: "\u6C49\u4E2D\u5E02"
      },
      {
        code: "610800",
        name: "\u6986\u6797\u5E02"
      },
      {
        code: "610900",
        name: "\u5B89\u5EB7\u5E02"
      },
      {
        code: "611000",
        name: "\u5546\u6D1B\u5E02"
      }
    ],
    [
      {
        code: "620100",
        name: "\u5170\u5DDE\u5E02"
      },
      {
        code: "620200",
        name: "\u5609\u5CEA\u5173\u5E02"
      },
      {
        code: "620300",
        name: "\u91D1\u660C\u5E02"
      },
      {
        code: "620400",
        name: "\u767D\u94F6\u5E02"
      },
      {
        code: "620500",
        name: "\u5929\u6C34\u5E02"
      },
      {
        code: "620600",
        name: "\u6B66\u5A01\u5E02"
      },
      {
        code: "620700",
        name: "\u5F20\u6396\u5E02"
      },
      {
        code: "620800",
        name: "\u5E73\u51C9\u5E02"
      },
      {
        code: "620900",
        name: "\u9152\u6CC9\u5E02"
      },
      {
        code: "621000",
        name: "\u5E86\u9633\u5E02"
      },
      {
        code: "621100",
        name: "\u5B9A\u897F\u5E02"
      },
      {
        code: "621200",
        name: "\u9647\u5357\u5E02"
      },
      {
        code: "622900",
        name: "\u4E34\u590F\u56DE\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "623000",
        name: "\u7518\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE"
      }
    ],
    [
      {
        code: "630100",
        name: "\u897F\u5B81\u5E02"
      },
      {
        code: "630200",
        name: "\u6D77\u4E1C\u5E02"
      },
      {
        code: "632200",
        name: "\u6D77\u5317\u85CF\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "632300",
        name: "\u9EC4\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "632500",
        name: "\u6D77\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "632600",
        name: "\u679C\u6D1B\u85CF\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "632700",
        name: "\u7389\u6811\u85CF\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "632800",
        name: "\u6D77\u897F\u8499\u53E4\u65CF\u85CF\u65CF\u81EA\u6CBB\u5DDE"
      }
    ],
    [
      {
        code: "640100",
        name: "\u94F6\u5DDD\u5E02"
      },
      {
        code: "640200",
        name: "\u77F3\u5634\u5C71\u5E02"
      },
      {
        code: "640300",
        name: "\u5434\u5FE0\u5E02"
      },
      {
        code: "640400",
        name: "\u56FA\u539F\u5E02"
      },
      {
        code: "640500",
        name: "\u4E2D\u536B\u5E02"
      }
    ],
    [
      {
        code: "650100",
        name: "\u4E4C\u9C81\u6728\u9F50\u5E02"
      },
      {
        code: "650200",
        name: "\u514B\u62C9\u739B\u4F9D\u5E02"
      },
      {
        code: "650400",
        name: "\u5410\u9C81\u756A\u5E02"
      },
      {
        code: "650500",
        name: "\u54C8\u5BC6\u5E02"
      },
      {
        code: "652300",
        name: "\u660C\u5409\u56DE\u65CF\u81EA\u6CBB\u5DDE"
      },
      {
        code: "652700",
        name: "\u535A\u5C14\u5854\u62C9\u8499\u53E4\u81EA\u6CBB\u5DDE"
      },
      {
        code: "652800",
        name: "\u5DF4\u97F3\u90ED\u695E\u8499\u53E4\u81EA\u6CBB\u5DDE"
      },
      {
        code: "652900",
        name: "\u963F\u514B\u82CF\u5730\u533A"
      },
      {
        code: "653000",
        name: "\u514B\u5B5C\u52D2\u82CF\u67EF\u5C14\u514B\u5B5C\u81EA\u6CBB\u5DDE"
      },
      {
        code: "653100",
        name: "\u5580\u4EC0\u5730\u533A"
      },
      {
        code: "653200",
        name: "\u548C\u7530\u5730\u533A"
      },
      {
        code: "654000",
        name: "\u4F0A\u7281\u54C8\u8428\u514B\u81EA\u6CBB\u5DDE"
      },
      {
        code: "654200",
        name: "\u5854\u57CE\u5730\u533A"
      },
      {
        code: "654300",
        name: "\u963F\u52D2\u6CF0\u5730\u533A"
      },
      {
        code: "659000",
        name: "\u81EA\u6CBB\u533A\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212"
      }
    ],
    [
      {
        code: "710100",
        name: "\u53F0\u5317\u5E02"
      },
      {
        code: "710200",
        name: "\u9AD8\u96C4\u5E02"
      },
      {
        code: "710300",
        name: "\u53F0\u5357\u5E02"
      },
      {
        code: "710400",
        name: "\u53F0\u4E2D\u5E02"
      },
      {
        code: "710600",
        name: "\u5357\u6295\u53BF"
      },
      {
        code: "710700",
        name: "\u57FA\u9686\u5E02"
      },
      {
        code: "710800",
        name: "\u65B0\u7AF9\u5E02"
      },
      {
        code: "710900",
        name: "\u5609\u4E49\u5E02"
      },
      {
        code: "711100",
        name: "\u65B0\u5317\u5E02"
      },
      {
        code: "711200",
        name: "\u5B9C\u5170\u53BF"
      },
      {
        code: "711300",
        name: "\u65B0\u7AF9\u53BF"
      },
      {
        code: "711400",
        name: "\u6843\u56ED\u5E02"
      },
      {
        code: "711500",
        name: "\u82D7\u6817\u53BF"
      },
      {
        code: "711700",
        name: "\u5F70\u5316\u53BF"
      },
      {
        code: "711900",
        name: "\u5609\u4E49\u53BF"
      },
      {
        code: "712100",
        name: "\u4E91\u6797\u53BF"
      },
      {
        code: "712400",
        name: "\u5C4F\u4E1C\u53BF"
      },
      {
        code: "712500",
        name: "\u53F0\u4E1C\u53BF"
      },
      {
        code: "712600",
        name: "\u82B1\u83B2\u53BF"
      },
      {
        code: "712700",
        name: "\u6F8E\u6E56\u53BF"
      }
    ],
    [
      {
        code: "810100",
        name: "\u9999\u6E2F\u7279\u522B\u884C\u653F\u533A"
      }
    ],
    [
      {
        code: "820100",
        name: "\u6FB3\u95E8\u7279\u522B\u884C\u653F\u533A"
      }
    ]
  ];
  var areas = [
    [
      [
        {
          code: "110101",
          name: "\u4E1C\u57CE\u533A"
        },
        {
          code: "110102",
          name: "\u897F\u57CE\u533A"
        },
        {
          code: "110105",
          name: "\u671D\u9633\u533A"
        },
        {
          code: "110106",
          name: "\u4E30\u53F0\u533A"
        },
        {
          code: "110107",
          name: "\u77F3\u666F\u5C71\u533A"
        },
        {
          code: "110108",
          name: "\u6D77\u6DC0\u533A"
        },
        {
          code: "110109",
          name: "\u95E8\u5934\u6C9F\u533A"
        },
        {
          code: "110111",
          name: "\u623F\u5C71\u533A"
        },
        {
          code: "110112",
          name: "\u901A\u5DDE\u533A"
        },
        {
          code: "110113",
          name: "\u987A\u4E49\u533A"
        },
        {
          code: "110114",
          name: "\u660C\u5E73\u533A"
        },
        {
          code: "110115",
          name: "\u5927\u5174\u533A"
        },
        {
          code: "110116",
          name: "\u6000\u67D4\u533A"
        },
        {
          code: "110117",
          name: "\u5E73\u8C37\u533A"
        },
        {
          code: "110118",
          name: "\u5BC6\u4E91\u533A"
        },
        {
          code: "110119",
          name: "\u5EF6\u5E86\u533A"
        }
      ]
    ],
    [
      [
        {
          code: "120101",
          name: "\u548C\u5E73\u533A"
        },
        {
          code: "120102",
          name: "\u6CB3\u4E1C\u533A"
        },
        {
          code: "120103",
          name: "\u6CB3\u897F\u533A"
        },
        {
          code: "120104",
          name: "\u5357\u5F00\u533A"
        },
        {
          code: "120105",
          name: "\u6CB3\u5317\u533A"
        },
        {
          code: "120106",
          name: "\u7EA2\u6865\u533A"
        },
        {
          code: "120110",
          name: "\u4E1C\u4E3D\u533A"
        },
        {
          code: "120111",
          name: "\u897F\u9752\u533A"
        },
        {
          code: "120112",
          name: "\u6D25\u5357\u533A"
        },
        {
          code: "120113",
          name: "\u5317\u8FB0\u533A"
        },
        {
          code: "120114",
          name: "\u6B66\u6E05\u533A"
        },
        {
          code: "120115",
          name: "\u5B9D\u577B\u533A"
        },
        {
          code: "120116",
          name: "\u6EE8\u6D77\u65B0\u533A"
        },
        {
          code: "120117",
          name: "\u5B81\u6CB3\u533A"
        },
        {
          code: "120118",
          name: "\u9759\u6D77\u533A"
        },
        {
          code: "120119",
          name: "\u84DF\u5DDE\u533A"
        }
      ]
    ],
    [
      [
        {
          code: "130102",
          name: "\u957F\u5B89\u533A"
        },
        {
          code: "130104",
          name: "\u6865\u897F\u533A"
        },
        {
          code: "130105",
          name: "\u65B0\u534E\u533A"
        },
        {
          code: "130107",
          name: "\u4E95\u9649\u77FF\u533A"
        },
        {
          code: "130108",
          name: "\u88D5\u534E\u533A"
        },
        {
          code: "130109",
          name: "\u85C1\u57CE\u533A"
        },
        {
          code: "130110",
          name: "\u9E7F\u6CC9\u533A"
        },
        {
          code: "130111",
          name: "\u683E\u57CE\u533A"
        },
        {
          code: "130121",
          name: "\u4E95\u9649\u53BF"
        },
        {
          code: "130123",
          name: "\u6B63\u5B9A\u53BF"
        },
        {
          code: "130125",
          name: "\u884C\u5510\u53BF"
        },
        {
          code: "130126",
          name: "\u7075\u5BFF\u53BF"
        },
        {
          code: "130127",
          name: "\u9AD8\u9091\u53BF"
        },
        {
          code: "130128",
          name: "\u6DF1\u6CFD\u53BF"
        },
        {
          code: "130129",
          name: "\u8D5E\u7687\u53BF"
        },
        {
          code: "130130",
          name: "\u65E0\u6781\u53BF"
        },
        {
          code: "130131",
          name: "\u5E73\u5C71\u53BF"
        },
        {
          code: "130132",
          name: "\u5143\u6C0F\u53BF"
        },
        {
          code: "130133",
          name: "\u8D75\u53BF"
        },
        {
          code: "130181",
          name: "\u8F9B\u96C6\u5E02"
        },
        {
          code: "130183",
          name: "\u664B\u5DDE\u5E02"
        },
        {
          code: "130184",
          name: "\u65B0\u4E50\u5E02"
        }
      ],
      [
        {
          code: "130202",
          name: "\u8DEF\u5357\u533A"
        },
        {
          code: "130203",
          name: "\u8DEF\u5317\u533A"
        },
        {
          code: "130204",
          name: "\u53E4\u51B6\u533A"
        },
        {
          code: "130205",
          name: "\u5F00\u5E73\u533A"
        },
        {
          code: "130207",
          name: "\u4E30\u5357\u533A"
        },
        {
          code: "130208",
          name: "\u4E30\u6DA6\u533A"
        },
        {
          code: "130209",
          name: "\u66F9\u5983\u7538\u533A"
        },
        {
          code: "130223",
          name: "\u6EE6\u53BF"
        },
        {
          code: "130224",
          name: "\u6EE6\u5357\u53BF"
        },
        {
          code: "130225",
          name: "\u4E50\u4EAD\u53BF"
        },
        {
          code: "130227",
          name: "\u8FC1\u897F\u53BF"
        },
        {
          code: "130229",
          name: "\u7389\u7530\u53BF"
        },
        {
          code: "130281",
          name: "\u9075\u5316\u5E02"
        },
        {
          code: "130283",
          name: "\u8FC1\u5B89\u5E02"
        }
      ],
      [
        {
          code: "130302",
          name: "\u6D77\u6E2F\u533A"
        },
        {
          code: "130303",
          name: "\u5C71\u6D77\u5173\u533A"
        },
        {
          code: "130304",
          name: "\u5317\u6234\u6CB3\u533A"
        },
        {
          code: "130306",
          name: "\u629A\u5B81\u533A"
        },
        {
          code: "130321",
          name: "\u9752\u9F99\u6EE1\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "130322",
          name: "\u660C\u9ECE\u53BF"
        },
        {
          code: "130324",
          name: "\u5362\u9F99\u53BF"
        }
      ],
      [
        {
          code: "130402",
          name: "\u90AF\u5C71\u533A"
        },
        {
          code: "130403",
          name: "\u4E1B\u53F0\u533A"
        },
        {
          code: "130404",
          name: "\u590D\u5174\u533A"
        },
        {
          code: "130406",
          name: "\u5CF0\u5CF0\u77FF\u533A"
        },
        {
          code: "130407",
          name: "\u80A5\u4E61\u533A"
        },
        {
          code: "130408",
          name: "\u6C38\u5E74\u533A"
        },
        {
          code: "130423",
          name: "\u4E34\u6F33\u53BF"
        },
        {
          code: "130424",
          name: "\u6210\u5B89\u53BF"
        },
        {
          code: "130425",
          name: "\u5927\u540D\u53BF"
        },
        {
          code: "130426",
          name: "\u6D89\u53BF"
        },
        {
          code: "130427",
          name: "\u78C1\u53BF"
        },
        {
          code: "130430",
          name: "\u90B1\u53BF"
        },
        {
          code: "130431",
          name: "\u9E21\u6CFD\u53BF"
        },
        {
          code: "130432",
          name: "\u5E7F\u5E73\u53BF"
        },
        {
          code: "130433",
          name: "\u9986\u9676\u53BF"
        },
        {
          code: "130434",
          name: "\u9B4F\u53BF"
        },
        {
          code: "130435",
          name: "\u66F2\u5468\u53BF"
        },
        {
          code: "130481",
          name: "\u6B66\u5B89\u5E02"
        }
      ],
      [
        {
          code: "130502",
          name: "\u6865\u4E1C\u533A"
        },
        {
          code: "130503",
          name: "\u6865\u897F\u533A"
        },
        {
          code: "130521",
          name: "\u90A2\u53F0\u53BF"
        },
        {
          code: "130522",
          name: "\u4E34\u57CE\u53BF"
        },
        {
          code: "130523",
          name: "\u5185\u4E18\u53BF"
        },
        {
          code: "130524",
          name: "\u67CF\u4E61\u53BF"
        },
        {
          code: "130525",
          name: "\u9686\u5C27\u53BF"
        },
        {
          code: "130526",
          name: "\u4EFB\u53BF"
        },
        {
          code: "130527",
          name: "\u5357\u548C\u53BF"
        },
        {
          code: "130528",
          name: "\u5B81\u664B\u53BF"
        },
        {
          code: "130529",
          name: "\u5DE8\u9E7F\u53BF"
        },
        {
          code: "130530",
          name: "\u65B0\u6CB3\u53BF"
        },
        {
          code: "130531",
          name: "\u5E7F\u5B97\u53BF"
        },
        {
          code: "130532",
          name: "\u5E73\u4E61\u53BF"
        },
        {
          code: "130533",
          name: "\u5A01\u53BF"
        },
        {
          code: "130534",
          name: "\u6E05\u6CB3\u53BF"
        },
        {
          code: "130535",
          name: "\u4E34\u897F\u53BF"
        },
        {
          code: "130581",
          name: "\u5357\u5BAB\u5E02"
        },
        {
          code: "130582",
          name: "\u6C99\u6CB3\u5E02"
        }
      ],
      [
        {
          code: "130602",
          name: "\u7ADE\u79C0\u533A"
        },
        {
          code: "130606",
          name: "\u83B2\u6C60\u533A"
        },
        {
          code: "130607",
          name: "\u6EE1\u57CE\u533A"
        },
        {
          code: "130608",
          name: "\u6E05\u82D1\u533A"
        },
        {
          code: "130609",
          name: "\u5F90\u6C34\u533A"
        },
        {
          code: "130623",
          name: "\u6D9E\u6C34\u53BF"
        },
        {
          code: "130624",
          name: "\u961C\u5E73\u53BF"
        },
        {
          code: "130626",
          name: "\u5B9A\u5174\u53BF"
        },
        {
          code: "130627",
          name: "\u5510\u53BF"
        },
        {
          code: "130628",
          name: "\u9AD8\u9633\u53BF"
        },
        {
          code: "130629",
          name: "\u5BB9\u57CE\u53BF"
        },
        {
          code: "130630",
          name: "\u6D9E\u6E90\u53BF"
        },
        {
          code: "130631",
          name: "\u671B\u90FD\u53BF"
        },
        {
          code: "130632",
          name: "\u5B89\u65B0\u53BF"
        },
        {
          code: "130633",
          name: "\u6613\u53BF"
        },
        {
          code: "130634",
          name: "\u66F2\u9633\u53BF"
        },
        {
          code: "130635",
          name: "\u8821\u53BF"
        },
        {
          code: "130636",
          name: "\u987A\u5E73\u53BF"
        },
        {
          code: "130637",
          name: "\u535A\u91CE\u53BF"
        },
        {
          code: "130638",
          name: "\u96C4\u53BF"
        },
        {
          code: "130681",
          name: "\u6DBF\u5DDE\u5E02"
        },
        {
          code: "130682",
          name: "\u5B9A\u5DDE\u5E02"
        },
        {
          code: "130683",
          name: "\u5B89\u56FD\u5E02"
        },
        {
          code: "130684",
          name: "\u9AD8\u7891\u5E97\u5E02"
        }
      ],
      [
        {
          code: "130702",
          name: "\u6865\u4E1C\u533A"
        },
        {
          code: "130703",
          name: "\u6865\u897F\u533A"
        },
        {
          code: "130705",
          name: "\u5BA3\u5316\u533A"
        },
        {
          code: "130706",
          name: "\u4E0B\u82B1\u56ED\u533A"
        },
        {
          code: "130708",
          name: "\u4E07\u5168\u533A"
        },
        {
          code: "130709",
          name: "\u5D07\u793C\u533A"
        },
        {
          code: "130722",
          name: "\u5F20\u5317\u53BF"
        },
        {
          code: "130723",
          name: "\u5EB7\u4FDD\u53BF"
        },
        {
          code: "130724",
          name: "\u6CBD\u6E90\u53BF"
        },
        {
          code: "130725",
          name: "\u5C1A\u4E49\u53BF"
        },
        {
          code: "130726",
          name: "\u851A\u53BF"
        },
        {
          code: "130727",
          name: "\u9633\u539F\u53BF"
        },
        {
          code: "130728",
          name: "\u6000\u5B89\u53BF"
        },
        {
          code: "130730",
          name: "\u6000\u6765\u53BF"
        },
        {
          code: "130731",
          name: "\u6DBF\u9E7F\u53BF"
        },
        {
          code: "130732",
          name: "\u8D64\u57CE\u53BF"
        }
      ],
      [
        {
          code: "130802",
          name: "\u53CC\u6865\u533A"
        },
        {
          code: "130803",
          name: "\u53CC\u6EE6\u533A"
        },
        {
          code: "130804",
          name: "\u9E70\u624B\u8425\u5B50\u77FF\u533A"
        },
        {
          code: "130821",
          name: "\u627F\u5FB7\u53BF"
        },
        {
          code: "130822",
          name: "\u5174\u9686\u53BF"
        },
        {
          code: "130824",
          name: "\u6EE6\u5E73\u53BF"
        },
        {
          code: "130825",
          name: "\u9686\u5316\u53BF"
        },
        {
          code: "130826",
          name: "\u4E30\u5B81\u6EE1\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "130827",
          name: "\u5BBD\u57CE\u6EE1\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "130828",
          name: "\u56F4\u573A\u6EE1\u65CF\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "130881",
          name: "\u5E73\u6CC9\u5E02"
        }
      ],
      [
        {
          code: "130902",
          name: "\u65B0\u534E\u533A"
        },
        {
          code: "130903",
          name: "\u8FD0\u6CB3\u533A"
        },
        {
          code: "130921",
          name: "\u6CA7\u53BF"
        },
        {
          code: "130922",
          name: "\u9752\u53BF"
        },
        {
          code: "130923",
          name: "\u4E1C\u5149\u53BF"
        },
        {
          code: "130924",
          name: "\u6D77\u5174\u53BF"
        },
        {
          code: "130925",
          name: "\u76D0\u5C71\u53BF"
        },
        {
          code: "130926",
          name: "\u8083\u5B81\u53BF"
        },
        {
          code: "130927",
          name: "\u5357\u76AE\u53BF"
        },
        {
          code: "130928",
          name: "\u5434\u6865\u53BF"
        },
        {
          code: "130929",
          name: "\u732E\u53BF"
        },
        {
          code: "130930",
          name: "\u5B5F\u6751\u56DE\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "130981",
          name: "\u6CCA\u5934\u5E02"
        },
        {
          code: "130982",
          name: "\u4EFB\u4E18\u5E02"
        },
        {
          code: "130983",
          name: "\u9EC4\u9A85\u5E02"
        },
        {
          code: "130984",
          name: "\u6CB3\u95F4\u5E02"
        }
      ],
      [
        {
          code: "131002",
          name: "\u5B89\u6B21\u533A"
        },
        {
          code: "131003",
          name: "\u5E7F\u9633\u533A"
        },
        {
          code: "131022",
          name: "\u56FA\u5B89\u53BF"
        },
        {
          code: "131023",
          name: "\u6C38\u6E05\u53BF"
        },
        {
          code: "131024",
          name: "\u9999\u6CB3\u53BF"
        },
        {
          code: "131025",
          name: "\u5927\u57CE\u53BF"
        },
        {
          code: "131026",
          name: "\u6587\u5B89\u53BF"
        },
        {
          code: "131028",
          name: "\u5927\u5382\u56DE\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "131081",
          name: "\u9738\u5DDE\u5E02"
        },
        {
          code: "131082",
          name: "\u4E09\u6CB3\u5E02"
        }
      ],
      [
        {
          code: "131102",
          name: "\u6843\u57CE\u533A"
        },
        {
          code: "131103",
          name: "\u5180\u5DDE\u533A"
        },
        {
          code: "131121",
          name: "\u67A3\u5F3A\u53BF"
        },
        {
          code: "131122",
          name: "\u6B66\u9091\u53BF"
        },
        {
          code: "131123",
          name: "\u6B66\u5F3A\u53BF"
        },
        {
          code: "131124",
          name: "\u9976\u9633\u53BF"
        },
        {
          code: "131125",
          name: "\u5B89\u5E73\u53BF"
        },
        {
          code: "131126",
          name: "\u6545\u57CE\u53BF"
        },
        {
          code: "131127",
          name: "\u666F\u53BF"
        },
        {
          code: "131128",
          name: "\u961C\u57CE\u53BF"
        },
        {
          code: "131182",
          name: "\u6DF1\u5DDE\u5E02"
        }
      ]
    ],
    [
      [
        {
          code: "140105",
          name: "\u5C0F\u5E97\u533A"
        },
        {
          code: "140106",
          name: "\u8FCE\u6CFD\u533A"
        },
        {
          code: "140107",
          name: "\u674F\u82B1\u5CAD\u533A"
        },
        {
          code: "140108",
          name: "\u5C16\u8349\u576A\u533A"
        },
        {
          code: "140109",
          name: "\u4E07\u67CF\u6797\u533A"
        },
        {
          code: "140110",
          name: "\u664B\u6E90\u533A"
        },
        {
          code: "140121",
          name: "\u6E05\u5F90\u53BF"
        },
        {
          code: "140122",
          name: "\u9633\u66F2\u53BF"
        },
        {
          code: "140123",
          name: "\u5A04\u70E6\u53BF"
        },
        {
          code: "140181",
          name: "\u53E4\u4EA4\u5E02"
        }
      ],
      [
        {
          code: "140202",
          name: "\u57CE\u533A"
        },
        {
          code: "140203",
          name: "\u77FF\u533A"
        },
        {
          code: "140211",
          name: "\u5357\u90CA\u533A"
        },
        {
          code: "140212",
          name: "\u65B0\u8363\u533A"
        },
        {
          code: "140221",
          name: "\u9633\u9AD8\u53BF"
        },
        {
          code: "140222",
          name: "\u5929\u9547\u53BF"
        },
        {
          code: "140223",
          name: "\u5E7F\u7075\u53BF"
        },
        {
          code: "140224",
          name: "\u7075\u4E18\u53BF"
        },
        {
          code: "140225",
          name: "\u6D51\u6E90\u53BF"
        },
        {
          code: "140226",
          name: "\u5DE6\u4E91\u53BF"
        },
        {
          code: "140227",
          name: "\u5927\u540C\u53BF"
        }
      ],
      [
        {
          code: "140302",
          name: "\u57CE\u533A"
        },
        {
          code: "140303",
          name: "\u77FF\u533A"
        },
        {
          code: "140311",
          name: "\u90CA\u533A"
        },
        {
          code: "140321",
          name: "\u5E73\u5B9A\u53BF"
        },
        {
          code: "140322",
          name: "\u76C2\u53BF"
        }
      ],
      [
        {
          code: "140402",
          name: "\u57CE\u533A"
        },
        {
          code: "140411",
          name: "\u90CA\u533A"
        },
        {
          code: "140421",
          name: "\u957F\u6CBB\u53BF"
        },
        {
          code: "140423",
          name: "\u8944\u57A3\u53BF"
        },
        {
          code: "140424",
          name: "\u5C6F\u7559\u53BF"
        },
        {
          code: "140425",
          name: "\u5E73\u987A\u53BF"
        },
        {
          code: "140426",
          name: "\u9ECE\u57CE\u53BF"
        },
        {
          code: "140427",
          name: "\u58F6\u5173\u53BF"
        },
        {
          code: "140428",
          name: "\u957F\u5B50\u53BF"
        },
        {
          code: "140429",
          name: "\u6B66\u4E61\u53BF"
        },
        {
          code: "140430",
          name: "\u6C81\u53BF"
        },
        {
          code: "140431",
          name: "\u6C81\u6E90\u53BF"
        },
        {
          code: "140481",
          name: "\u6F5E\u57CE\u5E02"
        }
      ],
      [
        {
          code: "140502",
          name: "\u57CE\u533A"
        },
        {
          code: "140521",
          name: "\u6C81\u6C34\u53BF"
        },
        {
          code: "140522",
          name: "\u9633\u57CE\u53BF"
        },
        {
          code: "140524",
          name: "\u9675\u5DDD\u53BF"
        },
        {
          code: "140525",
          name: "\u6CFD\u5DDE\u53BF"
        },
        {
          code: "140581",
          name: "\u9AD8\u5E73\u5E02"
        }
      ],
      [
        {
          code: "140602",
          name: "\u6714\u57CE\u533A"
        },
        {
          code: "140603",
          name: "\u5E73\u9C81\u533A"
        },
        {
          code: "140621",
          name: "\u5C71\u9634\u53BF"
        },
        {
          code: "140622",
          name: "\u5E94\u53BF"
        },
        {
          code: "140623",
          name: "\u53F3\u7389\u53BF"
        },
        {
          code: "140624",
          name: "\u6000\u4EC1\u53BF"
        }
      ],
      [
        {
          code: "140702",
          name: "\u6986\u6B21\u533A"
        },
        {
          code: "140721",
          name: "\u6986\u793E\u53BF"
        },
        {
          code: "140722",
          name: "\u5DE6\u6743\u53BF"
        },
        {
          code: "140723",
          name: "\u548C\u987A\u53BF"
        },
        {
          code: "140724",
          name: "\u6614\u9633\u53BF"
        },
        {
          code: "140725",
          name: "\u5BFF\u9633\u53BF"
        },
        {
          code: "140726",
          name: "\u592A\u8C37\u53BF"
        },
        {
          code: "140727",
          name: "\u7941\u53BF"
        },
        {
          code: "140728",
          name: "\u5E73\u9065\u53BF"
        },
        {
          code: "140729",
          name: "\u7075\u77F3\u53BF"
        },
        {
          code: "140781",
          name: "\u4ECB\u4F11\u5E02"
        }
      ],
      [
        {
          code: "140802",
          name: "\u76D0\u6E56\u533A"
        },
        {
          code: "140821",
          name: "\u4E34\u7317\u53BF"
        },
        {
          code: "140822",
          name: "\u4E07\u8363\u53BF"
        },
        {
          code: "140823",
          name: "\u95FB\u559C\u53BF"
        },
        {
          code: "140824",
          name: "\u7A37\u5C71\u53BF"
        },
        {
          code: "140825",
          name: "\u65B0\u7EDB\u53BF"
        },
        {
          code: "140826",
          name: "\u7EDB\u53BF"
        },
        {
          code: "140827",
          name: "\u57A3\u66F2\u53BF"
        },
        {
          code: "140828",
          name: "\u590F\u53BF"
        },
        {
          code: "140829",
          name: "\u5E73\u9646\u53BF"
        },
        {
          code: "140830",
          name: "\u82AE\u57CE\u53BF"
        },
        {
          code: "140881",
          name: "\u6C38\u6D4E\u5E02"
        },
        {
          code: "140882",
          name: "\u6CB3\u6D25\u5E02"
        }
      ],
      [
        {
          code: "140902",
          name: "\u5FFB\u5E9C\u533A"
        },
        {
          code: "140921",
          name: "\u5B9A\u8944\u53BF"
        },
        {
          code: "140922",
          name: "\u4E94\u53F0\u53BF"
        },
        {
          code: "140923",
          name: "\u4EE3\u53BF"
        },
        {
          code: "140924",
          name: "\u7E41\u5CD9\u53BF"
        },
        {
          code: "140925",
          name: "\u5B81\u6B66\u53BF"
        },
        {
          code: "140926",
          name: "\u9759\u4E50\u53BF"
        },
        {
          code: "140927",
          name: "\u795E\u6C60\u53BF"
        },
        {
          code: "140928",
          name: "\u4E94\u5BE8\u53BF"
        },
        {
          code: "140929",
          name: "\u5CA2\u5C9A\u53BF"
        },
        {
          code: "140930",
          name: "\u6CB3\u66F2\u53BF"
        },
        {
          code: "140931",
          name: "\u4FDD\u5FB7\u53BF"
        },
        {
          code: "140932",
          name: "\u504F\u5173\u53BF"
        },
        {
          code: "140981",
          name: "\u539F\u5E73\u5E02"
        }
      ],
      [
        {
          code: "141002",
          name: "\u5C27\u90FD\u533A"
        },
        {
          code: "141021",
          name: "\u66F2\u6C83\u53BF"
        },
        {
          code: "141022",
          name: "\u7FFC\u57CE\u53BF"
        },
        {
          code: "141023",
          name: "\u8944\u6C7E\u53BF"
        },
        {
          code: "141024",
          name: "\u6D2A\u6D1E\u53BF"
        },
        {
          code: "141025",
          name: "\u53E4\u53BF"
        },
        {
          code: "141026",
          name: "\u5B89\u6CFD\u53BF"
        },
        {
          code: "141027",
          name: "\u6D6E\u5C71\u53BF"
        },
        {
          code: "141028",
          name: "\u5409\u53BF"
        },
        {
          code: "141029",
          name: "\u4E61\u5B81\u53BF"
        },
        {
          code: "141030",
          name: "\u5927\u5B81\u53BF"
        },
        {
          code: "141031",
          name: "\u96B0\u53BF"
        },
        {
          code: "141032",
          name: "\u6C38\u548C\u53BF"
        },
        {
          code: "141033",
          name: "\u84B2\u53BF"
        },
        {
          code: "141034",
          name: "\u6C7E\u897F\u53BF"
        },
        {
          code: "141081",
          name: "\u4FAF\u9A6C\u5E02"
        },
        {
          code: "141082",
          name: "\u970D\u5DDE\u5E02"
        }
      ],
      [
        {
          code: "141102",
          name: "\u79BB\u77F3\u533A"
        },
        {
          code: "141121",
          name: "\u6587\u6C34\u53BF"
        },
        {
          code: "141122",
          name: "\u4EA4\u57CE\u53BF"
        },
        {
          code: "141123",
          name: "\u5174\u53BF"
        },
        {
          code: "141124",
          name: "\u4E34\u53BF"
        },
        {
          code: "141125",
          name: "\u67F3\u6797\u53BF"
        },
        {
          code: "141126",
          name: "\u77F3\u697C\u53BF"
        },
        {
          code: "141127",
          name: "\u5C9A\u53BF"
        },
        {
          code: "141128",
          name: "\u65B9\u5C71\u53BF"
        },
        {
          code: "141129",
          name: "\u4E2D\u9633\u53BF"
        },
        {
          code: "141130",
          name: "\u4EA4\u53E3\u53BF"
        },
        {
          code: "141181",
          name: "\u5B5D\u4E49\u5E02"
        },
        {
          code: "141182",
          name: "\u6C7E\u9633\u5E02"
        }
      ]
    ],
    [
      [
        {
          code: "150102",
          name: "\u65B0\u57CE\u533A"
        },
        {
          code: "150103",
          name: "\u56DE\u6C11\u533A"
        },
        {
          code: "150104",
          name: "\u7389\u6CC9\u533A"
        },
        {
          code: "150105",
          name: "\u8D5B\u7F55\u533A"
        },
        {
          code: "150121",
          name: "\u571F\u9ED8\u7279\u5DE6\u65D7"
        },
        {
          code: "150122",
          name: "\u6258\u514B\u6258\u53BF"
        },
        {
          code: "150123",
          name: "\u548C\u6797\u683C\u5C14\u53BF"
        },
        {
          code: "150124",
          name: "\u6E05\u6C34\u6CB3\u53BF"
        },
        {
          code: "150125",
          name: "\u6B66\u5DDD\u53BF"
        }
      ],
      [
        {
          code: "150202",
          name: "\u4E1C\u6CB3\u533A"
        },
        {
          code: "150203",
          name: "\u6606\u90FD\u4ED1\u533A"
        },
        {
          code: "150204",
          name: "\u9752\u5C71\u533A"
        },
        {
          code: "150205",
          name: "\u77F3\u62D0\u533A"
        },
        {
          code: "150206",
          name: "\u767D\u4E91\u9102\u535A\u77FF\u533A"
        },
        {
          code: "150207",
          name: "\u4E5D\u539F\u533A"
        },
        {
          code: "150221",
          name: "\u571F\u9ED8\u7279\u53F3\u65D7"
        },
        {
          code: "150222",
          name: "\u56FA\u9633\u53BF"
        },
        {
          code: "150223",
          name: "\u8FBE\u5C14\u7F55\u8302\u660E\u5B89\u8054\u5408\u65D7"
        }
      ],
      [
        {
          code: "150302",
          name: "\u6D77\u52C3\u6E7E\u533A"
        },
        {
          code: "150303",
          name: "\u6D77\u5357\u533A"
        },
        {
          code: "150304",
          name: "\u4E4C\u8FBE\u533A"
        }
      ],
      [
        {
          code: "150402",
          name: "\u7EA2\u5C71\u533A"
        },
        {
          code: "150403",
          name: "\u5143\u5B9D\u5C71\u533A"
        },
        {
          code: "150404",
          name: "\u677E\u5C71\u533A"
        },
        {
          code: "150421",
          name: "\u963F\u9C81\u79D1\u5C14\u6C81\u65D7"
        },
        {
          code: "150422",
          name: "\u5DF4\u6797\u5DE6\u65D7"
        },
        {
          code: "150423",
          name: "\u5DF4\u6797\u53F3\u65D7"
        },
        {
          code: "150424",
          name: "\u6797\u897F\u53BF"
        },
        {
          code: "150425",
          name: "\u514B\u4EC0\u514B\u817E\u65D7"
        },
        {
          code: "150426",
          name: "\u7FC1\u725B\u7279\u65D7"
        },
        {
          code: "150428",
          name: "\u5580\u5587\u6C81\u65D7"
        },
        {
          code: "150429",
          name: "\u5B81\u57CE\u53BF"
        },
        {
          code: "150430",
          name: "\u6556\u6C49\u65D7"
        }
      ],
      [
        {
          code: "150502",
          name: "\u79D1\u5C14\u6C81\u533A"
        },
        {
          code: "150521",
          name: "\u79D1\u5C14\u6C81\u5DE6\u7FFC\u4E2D\u65D7"
        },
        {
          code: "150522",
          name: "\u79D1\u5C14\u6C81\u5DE6\u7FFC\u540E\u65D7"
        },
        {
          code: "150523",
          name: "\u5F00\u9C81\u53BF"
        },
        {
          code: "150524",
          name: "\u5E93\u4F26\u65D7"
        },
        {
          code: "150525",
          name: "\u5948\u66FC\u65D7"
        },
        {
          code: "150526",
          name: "\u624E\u9C81\u7279\u65D7"
        },
        {
          code: "150581",
          name: "\u970D\u6797\u90ED\u52D2\u5E02"
        }
      ],
      [
        {
          code: "150602",
          name: "\u4E1C\u80DC\u533A"
        },
        {
          code: "150603",
          name: "\u5EB7\u5DF4\u4EC0\u533A"
        },
        {
          code: "150621",
          name: "\u8FBE\u62C9\u7279\u65D7"
        },
        {
          code: "150622",
          name: "\u51C6\u683C\u5C14\u65D7"
        },
        {
          code: "150623",
          name: "\u9102\u6258\u514B\u524D\u65D7"
        },
        {
          code: "150624",
          name: "\u9102\u6258\u514B\u65D7"
        },
        {
          code: "150625",
          name: "\u676D\u9526\u65D7"
        },
        {
          code: "150626",
          name: "\u4E4C\u5BA1\u65D7"
        },
        {
          code: "150627",
          name: "\u4F0A\u91D1\u970D\u6D1B\u65D7"
        }
      ],
      [
        {
          code: "150702",
          name: "\u6D77\u62C9\u5C14\u533A"
        },
        {
          code: "150703",
          name: "\u624E\u8D49\u8BFA\u5C14\u533A"
        },
        {
          code: "150721",
          name: "\u963F\u8363\u65D7"
        },
        {
          code: "150722",
          name: "\u83AB\u529B\u8FBE\u74E6\u8FBE\u65A1\u5C14\u65CF\u81EA\u6CBB\u65D7"
        },
        {
          code: "150723",
          name: "\u9102\u4F26\u6625\u81EA\u6CBB\u65D7"
        },
        {
          code: "150724",
          name: "\u9102\u6E29\u514B\u65CF\u81EA\u6CBB\u65D7"
        },
        {
          code: "150725",
          name: "\u9648\u5DF4\u5C14\u864E\u65D7"
        },
        {
          code: "150726",
          name: "\u65B0\u5DF4\u5C14\u864E\u5DE6\u65D7"
        },
        {
          code: "150727",
          name: "\u65B0\u5DF4\u5C14\u864E\u53F3\u65D7"
        },
        {
          code: "150781",
          name: "\u6EE1\u6D32\u91CC\u5E02"
        },
        {
          code: "150782",
          name: "\u7259\u514B\u77F3\u5E02"
        },
        {
          code: "150783",
          name: "\u624E\u5170\u5C6F\u5E02"
        },
        {
          code: "150784",
          name: "\u989D\u5C14\u53E4\u7EB3\u5E02"
        },
        {
          code: "150785",
          name: "\u6839\u6CB3\u5E02"
        }
      ],
      [
        {
          code: "150802",
          name: "\u4E34\u6CB3\u533A"
        },
        {
          code: "150821",
          name: "\u4E94\u539F\u53BF"
        },
        {
          code: "150822",
          name: "\u78F4\u53E3\u53BF"
        },
        {
          code: "150823",
          name: "\u4E4C\u62C9\u7279\u524D\u65D7"
        },
        {
          code: "150824",
          name: "\u4E4C\u62C9\u7279\u4E2D\u65D7"
        },
        {
          code: "150825",
          name: "\u4E4C\u62C9\u7279\u540E\u65D7"
        },
        {
          code: "150826",
          name: "\u676D\u9526\u540E\u65D7"
        }
      ],
      [
        {
          code: "150902",
          name: "\u96C6\u5B81\u533A"
        },
        {
          code: "150921",
          name: "\u5353\u8D44\u53BF"
        },
        {
          code: "150922",
          name: "\u5316\u5FB7\u53BF"
        },
        {
          code: "150923",
          name: "\u5546\u90FD\u53BF"
        },
        {
          code: "150924",
          name: "\u5174\u548C\u53BF"
        },
        {
          code: "150925",
          name: "\u51C9\u57CE\u53BF"
        },
        {
          code: "150926",
          name: "\u5BDF\u54C8\u5C14\u53F3\u7FFC\u524D\u65D7"
        },
        {
          code: "150927",
          name: "\u5BDF\u54C8\u5C14\u53F3\u7FFC\u4E2D\u65D7"
        },
        {
          code: "150928",
          name: "\u5BDF\u54C8\u5C14\u53F3\u7FFC\u540E\u65D7"
        },
        {
          code: "150929",
          name: "\u56DB\u5B50\u738B\u65D7"
        },
        {
          code: "150981",
          name: "\u4E30\u9547\u5E02"
        }
      ],
      [
        {
          code: "152201",
          name: "\u4E4C\u5170\u6D69\u7279\u5E02"
        },
        {
          code: "152202",
          name: "\u963F\u5C14\u5C71\u5E02"
        },
        {
          code: "152221",
          name: "\u79D1\u5C14\u6C81\u53F3\u7FFC\u524D\u65D7"
        },
        {
          code: "152222",
          name: "\u79D1\u5C14\u6C81\u53F3\u7FFC\u4E2D\u65D7"
        },
        {
          code: "152223",
          name: "\u624E\u8D49\u7279\u65D7"
        },
        {
          code: "152224",
          name: "\u7A81\u6CC9\u53BF"
        }
      ],
      [
        {
          code: "152501",
          name: "\u4E8C\u8FDE\u6D69\u7279\u5E02"
        },
        {
          code: "152502",
          name: "\u9521\u6797\u6D69\u7279\u5E02"
        },
        {
          code: "152522",
          name: "\u963F\u5DF4\u560E\u65D7"
        },
        {
          code: "152523",
          name: "\u82CF\u5C3C\u7279\u5DE6\u65D7"
        },
        {
          code: "152524",
          name: "\u82CF\u5C3C\u7279\u53F3\u65D7"
        },
        {
          code: "152525",
          name: "\u4E1C\u4E4C\u73E0\u7A46\u6C81\u65D7"
        },
        {
          code: "152526",
          name: "\u897F\u4E4C\u73E0\u7A46\u6C81\u65D7"
        },
        {
          code: "152527",
          name: "\u592A\u4EC6\u5BFA\u65D7"
        },
        {
          code: "152528",
          name: "\u9576\u9EC4\u65D7"
        },
        {
          code: "152529",
          name: "\u6B63\u9576\u767D\u65D7"
        },
        {
          code: "152530",
          name: "\u6B63\u84DD\u65D7"
        },
        {
          code: "152531",
          name: "\u591A\u4F26\u53BF"
        }
      ],
      [
        {
          code: "152921",
          name: "\u963F\u62C9\u5584\u5DE6\u65D7"
        },
        {
          code: "152922",
          name: "\u963F\u62C9\u5584\u53F3\u65D7"
        },
        {
          code: "152923",
          name: "\u989D\u6D4E\u7EB3\u65D7"
        }
      ]
    ],
    [
      [
        {
          code: "210102",
          name: "\u548C\u5E73\u533A"
        },
        {
          code: "210103",
          name: "\u6C88\u6CB3\u533A"
        },
        {
          code: "210104",
          name: "\u5927\u4E1C\u533A"
        },
        {
          code: "210105",
          name: "\u7687\u59D1\u533A"
        },
        {
          code: "210106",
          name: "\u94C1\u897F\u533A"
        },
        {
          code: "210111",
          name: "\u82CF\u5BB6\u5C6F\u533A"
        },
        {
          code: "210112",
          name: "\u6D51\u5357\u533A"
        },
        {
          code: "210113",
          name: "\u6C88\u5317\u65B0\u533A"
        },
        {
          code: "210114",
          name: "\u4E8E\u6D2A\u533A"
        },
        {
          code: "210115",
          name: "\u8FBD\u4E2D\u533A"
        },
        {
          code: "210123",
          name: "\u5EB7\u5E73\u53BF"
        },
        {
          code: "210124",
          name: "\u6CD5\u5E93\u53BF"
        },
        {
          code: "210181",
          name: "\u65B0\u6C11\u5E02"
        }
      ],
      [
        {
          code: "210202",
          name: "\u4E2D\u5C71\u533A"
        },
        {
          code: "210203",
          name: "\u897F\u5C97\u533A"
        },
        {
          code: "210204",
          name: "\u6C99\u6CB3\u53E3\u533A"
        },
        {
          code: "210211",
          name: "\u7518\u4E95\u5B50\u533A"
        },
        {
          code: "210212",
          name: "\u65C5\u987A\u53E3\u533A"
        },
        {
          code: "210213",
          name: "\u91D1\u5DDE\u533A"
        },
        {
          code: "210214",
          name: "\u666E\u5170\u5E97\u533A"
        },
        {
          code: "210224",
          name: "\u957F\u6D77\u53BF"
        },
        {
          code: "210281",
          name: "\u74E6\u623F\u5E97\u5E02"
        },
        {
          code: "210283",
          name: "\u5E84\u6CB3\u5E02"
        }
      ],
      [
        {
          code: "210302",
          name: "\u94C1\u4E1C\u533A"
        },
        {
          code: "210303",
          name: "\u94C1\u897F\u533A"
        },
        {
          code: "210304",
          name: "\u7ACB\u5C71\u533A"
        },
        {
          code: "210311",
          name: "\u5343\u5C71\u533A"
        },
        {
          code: "210321",
          name: "\u53F0\u5B89\u53BF"
        },
        {
          code: "210323",
          name: "\u5CAB\u5CA9\u6EE1\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "210381",
          name: "\u6D77\u57CE\u5E02"
        }
      ],
      [
        {
          code: "210402",
          name: "\u65B0\u629A\u533A"
        },
        {
          code: "210403",
          name: "\u4E1C\u6D32\u533A"
        },
        {
          code: "210404",
          name: "\u671B\u82B1\u533A"
        },
        {
          code: "210411",
          name: "\u987A\u57CE\u533A"
        },
        {
          code: "210421",
          name: "\u629A\u987A\u53BF"
        },
        {
          code: "210422",
          name: "\u65B0\u5BBE\u6EE1\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "210423",
          name: "\u6E05\u539F\u6EE1\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "210502",
          name: "\u5E73\u5C71\u533A"
        },
        {
          code: "210503",
          name: "\u6EAA\u6E56\u533A"
        },
        {
          code: "210504",
          name: "\u660E\u5C71\u533A"
        },
        {
          code: "210505",
          name: "\u5357\u82AC\u533A"
        },
        {
          code: "210521",
          name: "\u672C\u6EAA\u6EE1\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "210522",
          name: "\u6853\u4EC1\u6EE1\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "210602",
          name: "\u5143\u5B9D\u533A"
        },
        {
          code: "210603",
          name: "\u632F\u5174\u533A"
        },
        {
          code: "210604",
          name: "\u632F\u5B89\u533A"
        },
        {
          code: "210624",
          name: "\u5BBD\u7538\u6EE1\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "210681",
          name: "\u4E1C\u6E2F\u5E02"
        },
        {
          code: "210682",
          name: "\u51E4\u57CE\u5E02"
        }
      ],
      [
        {
          code: "210702",
          name: "\u53E4\u5854\u533A"
        },
        {
          code: "210703",
          name: "\u51CC\u6CB3\u533A"
        },
        {
          code: "210711",
          name: "\u592A\u548C\u533A"
        },
        {
          code: "210726",
          name: "\u9ED1\u5C71\u53BF"
        },
        {
          code: "210727",
          name: "\u4E49\u53BF"
        },
        {
          code: "210781",
          name: "\u51CC\u6D77\u5E02"
        },
        {
          code: "210782",
          name: "\u5317\u9547\u5E02"
        }
      ],
      [
        {
          code: "210802",
          name: "\u7AD9\u524D\u533A"
        },
        {
          code: "210803",
          name: "\u897F\u5E02\u533A"
        },
        {
          code: "210804",
          name: "\u9C85\u9C7C\u5708\u533A"
        },
        {
          code: "210811",
          name: "\u8001\u8FB9\u533A"
        },
        {
          code: "210881",
          name: "\u76D6\u5DDE\u5E02"
        },
        {
          code: "210882",
          name: "\u5927\u77F3\u6865\u5E02"
        }
      ],
      [
        {
          code: "210902",
          name: "\u6D77\u5DDE\u533A"
        },
        {
          code: "210903",
          name: "\u65B0\u90B1\u533A"
        },
        {
          code: "210904",
          name: "\u592A\u5E73\u533A"
        },
        {
          code: "210905",
          name: "\u6E05\u6CB3\u95E8\u533A"
        },
        {
          code: "210911",
          name: "\u7EC6\u6CB3\u533A"
        },
        {
          code: "210921",
          name: "\u961C\u65B0\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "210922",
          name: "\u5F70\u6B66\u53BF"
        }
      ],
      [
        {
          code: "211002",
          name: "\u767D\u5854\u533A"
        },
        {
          code: "211003",
          name: "\u6587\u5723\u533A"
        },
        {
          code: "211004",
          name: "\u5B8F\u4F1F\u533A"
        },
        {
          code: "211005",
          name: "\u5F13\u957F\u5CAD\u533A"
        },
        {
          code: "211011",
          name: "\u592A\u5B50\u6CB3\u533A"
        },
        {
          code: "211021",
          name: "\u8FBD\u9633\u53BF"
        },
        {
          code: "211081",
          name: "\u706F\u5854\u5E02"
        }
      ],
      [
        {
          code: "211102",
          name: "\u53CC\u53F0\u5B50\u533A"
        },
        {
          code: "211103",
          name: "\u5174\u9686\u53F0\u533A"
        },
        {
          code: "211104",
          name: "\u5927\u6D3C\u533A"
        },
        {
          code: "211122",
          name: "\u76D8\u5C71\u53BF"
        }
      ],
      [
        {
          code: "211202",
          name: "\u94F6\u5DDE\u533A"
        },
        {
          code: "211204",
          name: "\u6E05\u6CB3\u533A"
        },
        {
          code: "211221",
          name: "\u94C1\u5CAD\u53BF"
        },
        {
          code: "211223",
          name: "\u897F\u4E30\u53BF"
        },
        {
          code: "211224",
          name: "\u660C\u56FE\u53BF"
        },
        {
          code: "211281",
          name: "\u8C03\u5175\u5C71\u5E02"
        },
        {
          code: "211282",
          name: "\u5F00\u539F\u5E02"
        }
      ],
      [
        {
          code: "211302",
          name: "\u53CC\u5854\u533A"
        },
        {
          code: "211303",
          name: "\u9F99\u57CE\u533A"
        },
        {
          code: "211321",
          name: "\u671D\u9633\u53BF"
        },
        {
          code: "211322",
          name: "\u5EFA\u5E73\u53BF"
        },
        {
          code: "211324",
          name: "\u5580\u5587\u6C81\u5DE6\u7FFC\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "211381",
          name: "\u5317\u7968\u5E02"
        },
        {
          code: "211382",
          name: "\u51CC\u6E90\u5E02"
        }
      ],
      [
        {
          code: "211402",
          name: "\u8FDE\u5C71\u533A"
        },
        {
          code: "211403",
          name: "\u9F99\u6E2F\u533A"
        },
        {
          code: "211404",
          name: "\u5357\u7968\u533A"
        },
        {
          code: "211421",
          name: "\u7EE5\u4E2D\u53BF"
        },
        {
          code: "211422",
          name: "\u5EFA\u660C\u53BF"
        },
        {
          code: "211481",
          name: "\u5174\u57CE\u5E02"
        }
      ]
    ],
    [
      [
        {
          code: "220102",
          name: "\u5357\u5173\u533A"
        },
        {
          code: "220103",
          name: "\u5BBD\u57CE\u533A"
        },
        {
          code: "220104",
          name: "\u671D\u9633\u533A"
        },
        {
          code: "220105",
          name: "\u4E8C\u9053\u533A"
        },
        {
          code: "220106",
          name: "\u7EFF\u56ED\u533A"
        },
        {
          code: "220112",
          name: "\u53CC\u9633\u533A"
        },
        {
          code: "220113",
          name: "\u4E5D\u53F0\u533A"
        },
        {
          code: "220122",
          name: "\u519C\u5B89\u53BF"
        },
        {
          code: "220182",
          name: "\u6986\u6811\u5E02"
        },
        {
          code: "220183",
          name: "\u5FB7\u60E0\u5E02"
        }
      ],
      [
        {
          code: "220202",
          name: "\u660C\u9091\u533A"
        },
        {
          code: "220203",
          name: "\u9F99\u6F6D\u533A"
        },
        {
          code: "220204",
          name: "\u8239\u8425\u533A"
        },
        {
          code: "220211",
          name: "\u4E30\u6EE1\u533A"
        },
        {
          code: "220221",
          name: "\u6C38\u5409\u53BF"
        },
        {
          code: "220281",
          name: "\u86DF\u6CB3\u5E02"
        },
        {
          code: "220282",
          name: "\u6866\u7538\u5E02"
        },
        {
          code: "220283",
          name: "\u8212\u5170\u5E02"
        },
        {
          code: "220284",
          name: "\u78D0\u77F3\u5E02"
        }
      ],
      [
        {
          code: "220302",
          name: "\u94C1\u897F\u533A"
        },
        {
          code: "220303",
          name: "\u94C1\u4E1C\u533A"
        },
        {
          code: "220322",
          name: "\u68A8\u6811\u53BF"
        },
        {
          code: "220323",
          name: "\u4F0A\u901A\u6EE1\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "220381",
          name: "\u516C\u4E3B\u5CAD\u5E02"
        },
        {
          code: "220382",
          name: "\u53CC\u8FBD\u5E02"
        }
      ],
      [
        {
          code: "220402",
          name: "\u9F99\u5C71\u533A"
        },
        {
          code: "220403",
          name: "\u897F\u5B89\u533A"
        },
        {
          code: "220421",
          name: "\u4E1C\u4E30\u53BF"
        },
        {
          code: "220422",
          name: "\u4E1C\u8FBD\u53BF"
        }
      ],
      [
        {
          code: "220502",
          name: "\u4E1C\u660C\u533A"
        },
        {
          code: "220503",
          name: "\u4E8C\u9053\u6C5F\u533A"
        },
        {
          code: "220521",
          name: "\u901A\u5316\u53BF"
        },
        {
          code: "220523",
          name: "\u8F89\u5357\u53BF"
        },
        {
          code: "220524",
          name: "\u67F3\u6CB3\u53BF"
        },
        {
          code: "220581",
          name: "\u6885\u6CB3\u53E3\u5E02"
        },
        {
          code: "220582",
          name: "\u96C6\u5B89\u5E02"
        }
      ],
      [
        {
          code: "220602",
          name: "\u6D51\u6C5F\u533A"
        },
        {
          code: "220605",
          name: "\u6C5F\u6E90\u533A"
        },
        {
          code: "220621",
          name: "\u629A\u677E\u53BF"
        },
        {
          code: "220622",
          name: "\u9756\u5B87\u53BF"
        },
        {
          code: "220623",
          name: "\u957F\u767D\u671D\u9C9C\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "220681",
          name: "\u4E34\u6C5F\u5E02"
        }
      ],
      [
        {
          code: "220702",
          name: "\u5B81\u6C5F\u533A"
        },
        {
          code: "220721",
          name: "\u524D\u90ED\u5C14\u7F57\u65AF\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "220722",
          name: "\u957F\u5CAD\u53BF"
        },
        {
          code: "220723",
          name: "\u4E7E\u5B89\u53BF"
        },
        {
          code: "220781",
          name: "\u6276\u4F59\u5E02"
        }
      ],
      [
        {
          code: "220802",
          name: "\u6D2E\u5317\u533A"
        },
        {
          code: "220821",
          name: "\u9547\u8D49\u53BF"
        },
        {
          code: "220822",
          name: "\u901A\u6986\u53BF"
        },
        {
          code: "220881",
          name: "\u6D2E\u5357\u5E02"
        },
        {
          code: "220882",
          name: "\u5927\u5B89\u5E02"
        }
      ],
      [
        {
          code: "222401",
          name: "\u5EF6\u5409\u5E02"
        },
        {
          code: "222402",
          name: "\u56FE\u4EEC\u5E02"
        },
        {
          code: "222403",
          name: "\u6566\u5316\u5E02"
        },
        {
          code: "222404",
          name: "\u73F2\u6625\u5E02"
        },
        {
          code: "222405",
          name: "\u9F99\u4E95\u5E02"
        },
        {
          code: "222406",
          name: "\u548C\u9F99\u5E02"
        },
        {
          code: "222424",
          name: "\u6C6A\u6E05\u53BF"
        },
        {
          code: "222426",
          name: "\u5B89\u56FE\u53BF"
        }
      ]
    ],
    [
      [
        {
          code: "230102",
          name: "\u9053\u91CC\u533A"
        },
        {
          code: "230103",
          name: "\u5357\u5C97\u533A"
        },
        {
          code: "230104",
          name: "\u9053\u5916\u533A"
        },
        {
          code: "230108",
          name: "\u5E73\u623F\u533A"
        },
        {
          code: "230109",
          name: "\u677E\u5317\u533A"
        },
        {
          code: "230110",
          name: "\u9999\u574A\u533A"
        },
        {
          code: "230111",
          name: "\u547C\u5170\u533A"
        },
        {
          code: "230112",
          name: "\u963F\u57CE\u533A"
        },
        {
          code: "230113",
          name: "\u53CC\u57CE\u533A"
        },
        {
          code: "230123",
          name: "\u4F9D\u5170\u53BF"
        },
        {
          code: "230124",
          name: "\u65B9\u6B63\u53BF"
        },
        {
          code: "230125",
          name: "\u5BBE\u53BF"
        },
        {
          code: "230126",
          name: "\u5DF4\u5F66\u53BF"
        },
        {
          code: "230127",
          name: "\u6728\u5170\u53BF"
        },
        {
          code: "230128",
          name: "\u901A\u6CB3\u53BF"
        },
        {
          code: "230129",
          name: "\u5EF6\u5BFF\u53BF"
        },
        {
          code: "230183",
          name: "\u5C1A\u5FD7\u5E02"
        },
        {
          code: "230184",
          name: "\u4E94\u5E38\u5E02"
        }
      ],
      [
        {
          code: "230202",
          name: "\u9F99\u6C99\u533A"
        },
        {
          code: "230203",
          name: "\u5EFA\u534E\u533A"
        },
        {
          code: "230204",
          name: "\u94C1\u950B\u533A"
        },
        {
          code: "230205",
          name: "\u6602\u6602\u6EAA\u533A"
        },
        {
          code: "230206",
          name: "\u5BCC\u62C9\u5C14\u57FA\u533A"
        },
        {
          code: "230207",
          name: "\u78BE\u5B50\u5C71\u533A"
        },
        {
          code: "230208",
          name: "\u6885\u91CC\u65AF\u8FBE\u65A1\u5C14\u65CF\u533A"
        },
        {
          code: "230221",
          name: "\u9F99\u6C5F\u53BF"
        },
        {
          code: "230223",
          name: "\u4F9D\u5B89\u53BF"
        },
        {
          code: "230224",
          name: "\u6CF0\u6765\u53BF"
        },
        {
          code: "230225",
          name: "\u7518\u5357\u53BF"
        },
        {
          code: "230227",
          name: "\u5BCC\u88D5\u53BF"
        },
        {
          code: "230229",
          name: "\u514B\u5C71\u53BF"
        },
        {
          code: "230230",
          name: "\u514B\u4E1C\u53BF"
        },
        {
          code: "230231",
          name: "\u62DC\u6CC9\u53BF"
        },
        {
          code: "230281",
          name: "\u8BB7\u6CB3\u5E02"
        }
      ],
      [
        {
          code: "230302",
          name: "\u9E21\u51A0\u533A"
        },
        {
          code: "230303",
          name: "\u6052\u5C71\u533A"
        },
        {
          code: "230304",
          name: "\u6EF4\u9053\u533A"
        },
        {
          code: "230305",
          name: "\u68A8\u6811\u533A"
        },
        {
          code: "230306",
          name: "\u57CE\u5B50\u6CB3\u533A"
        },
        {
          code: "230307",
          name: "\u9EBB\u5C71\u533A"
        },
        {
          code: "230321",
          name: "\u9E21\u4E1C\u53BF"
        },
        {
          code: "230381",
          name: "\u864E\u6797\u5E02"
        },
        {
          code: "230382",
          name: "\u5BC6\u5C71\u5E02"
        }
      ],
      [
        {
          code: "230402",
          name: "\u5411\u9633\u533A"
        },
        {
          code: "230403",
          name: "\u5DE5\u519C\u533A"
        },
        {
          code: "230404",
          name: "\u5357\u5C71\u533A"
        },
        {
          code: "230405",
          name: "\u5174\u5B89\u533A"
        },
        {
          code: "230406",
          name: "\u4E1C\u5C71\u533A"
        },
        {
          code: "230407",
          name: "\u5174\u5C71\u533A"
        },
        {
          code: "230421",
          name: "\u841D\u5317\u53BF"
        },
        {
          code: "230422",
          name: "\u7EE5\u6EE8\u53BF"
        }
      ],
      [
        {
          code: "230502",
          name: "\u5C16\u5C71\u533A"
        },
        {
          code: "230503",
          name: "\u5CAD\u4E1C\u533A"
        },
        {
          code: "230505",
          name: "\u56DB\u65B9\u53F0\u533A"
        },
        {
          code: "230506",
          name: "\u5B9D\u5C71\u533A"
        },
        {
          code: "230521",
          name: "\u96C6\u8D24\u53BF"
        },
        {
          code: "230522",
          name: "\u53CB\u8C0A\u53BF"
        },
        {
          code: "230523",
          name: "\u5B9D\u6E05\u53BF"
        },
        {
          code: "230524",
          name: "\u9976\u6CB3\u53BF"
        }
      ],
      [
        {
          code: "230602",
          name: "\u8428\u5C14\u56FE\u533A"
        },
        {
          code: "230603",
          name: "\u9F99\u51E4\u533A"
        },
        {
          code: "230604",
          name: "\u8BA9\u80E1\u8DEF\u533A"
        },
        {
          code: "230605",
          name: "\u7EA2\u5C97\u533A"
        },
        {
          code: "230606",
          name: "\u5927\u540C\u533A"
        },
        {
          code: "230621",
          name: "\u8087\u5DDE\u53BF"
        },
        {
          code: "230622",
          name: "\u8087\u6E90\u53BF"
        },
        {
          code: "230623",
          name: "\u6797\u7538\u53BF"
        },
        {
          code: "230624",
          name: "\u675C\u5C14\u4F2F\u7279\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "230702",
          name: "\u4F0A\u6625\u533A"
        },
        {
          code: "230703",
          name: "\u5357\u5C94\u533A"
        },
        {
          code: "230704",
          name: "\u53CB\u597D\u533A"
        },
        {
          code: "230705",
          name: "\u897F\u6797\u533A"
        },
        {
          code: "230706",
          name: "\u7FE0\u5CE6\u533A"
        },
        {
          code: "230707",
          name: "\u65B0\u9752\u533A"
        },
        {
          code: "230708",
          name: "\u7F8E\u6EAA\u533A"
        },
        {
          code: "230709",
          name: "\u91D1\u5C71\u5C6F\u533A"
        },
        {
          code: "230710",
          name: "\u4E94\u8425\u533A"
        },
        {
          code: "230711",
          name: "\u4E4C\u9A6C\u6CB3\u533A"
        },
        {
          code: "230712",
          name: "\u6C64\u65FA\u6CB3\u533A"
        },
        {
          code: "230713",
          name: "\u5E26\u5CAD\u533A"
        },
        {
          code: "230714",
          name: "\u4E4C\u4F0A\u5CAD\u533A"
        },
        {
          code: "230715",
          name: "\u7EA2\u661F\u533A"
        },
        {
          code: "230716",
          name: "\u4E0A\u7518\u5CAD\u533A"
        },
        {
          code: "230722",
          name: "\u5609\u836B\u53BF"
        },
        {
          code: "230781",
          name: "\u94C1\u529B\u5E02"
        }
      ],
      [
        {
          code: "230803",
          name: "\u5411\u9633\u533A"
        },
        {
          code: "230804",
          name: "\u524D\u8FDB\u533A"
        },
        {
          code: "230805",
          name: "\u4E1C\u98CE\u533A"
        },
        {
          code: "230811",
          name: "\u90CA\u533A"
        },
        {
          code: "230822",
          name: "\u6866\u5357\u53BF"
        },
        {
          code: "230826",
          name: "\u6866\u5DDD\u53BF"
        },
        {
          code: "230828",
          name: "\u6C64\u539F\u53BF"
        },
        {
          code: "230881",
          name: "\u540C\u6C5F\u5E02"
        },
        {
          code: "230882",
          name: "\u5BCC\u9526\u5E02"
        },
        {
          code: "230883",
          name: "\u629A\u8FDC\u5E02"
        }
      ],
      [
        {
          code: "230902",
          name: "\u65B0\u5174\u533A"
        },
        {
          code: "230903",
          name: "\u6843\u5C71\u533A"
        },
        {
          code: "230904",
          name: "\u8304\u5B50\u6CB3\u533A"
        },
        {
          code: "230921",
          name: "\u52C3\u5229\u53BF"
        }
      ],
      [
        {
          code: "231002",
          name: "\u4E1C\u5B89\u533A"
        },
        {
          code: "231003",
          name: "\u9633\u660E\u533A"
        },
        {
          code: "231004",
          name: "\u7231\u6C11\u533A"
        },
        {
          code: "231005",
          name: "\u897F\u5B89\u533A"
        },
        {
          code: "231025",
          name: "\u6797\u53E3\u53BF"
        },
        {
          code: "231081",
          name: "\u7EE5\u82AC\u6CB3\u5E02"
        },
        {
          code: "231083",
          name: "\u6D77\u6797\u5E02"
        },
        {
          code: "231084",
          name: "\u5B81\u5B89\u5E02"
        },
        {
          code: "231085",
          name: "\u7A46\u68F1\u5E02"
        },
        {
          code: "231086",
          name: "\u4E1C\u5B81\u5E02"
        }
      ],
      [
        {
          code: "231102",
          name: "\u7231\u8F89\u533A"
        },
        {
          code: "231121",
          name: "\u5AE9\u6C5F\u53BF"
        },
        {
          code: "231123",
          name: "\u900A\u514B\u53BF"
        },
        {
          code: "231124",
          name: "\u5B59\u5434\u53BF"
        },
        {
          code: "231181",
          name: "\u5317\u5B89\u5E02"
        },
        {
          code: "231182",
          name: "\u4E94\u5927\u8FDE\u6C60\u5E02"
        }
      ],
      [
        {
          code: "231202",
          name: "\u5317\u6797\u533A"
        },
        {
          code: "231221",
          name: "\u671B\u594E\u53BF"
        },
        {
          code: "231222",
          name: "\u5170\u897F\u53BF"
        },
        {
          code: "231223",
          name: "\u9752\u5188\u53BF"
        },
        {
          code: "231224",
          name: "\u5E86\u5B89\u53BF"
        },
        {
          code: "231225",
          name: "\u660E\u6C34\u53BF"
        },
        {
          code: "231226",
          name: "\u7EE5\u68F1\u53BF"
        },
        {
          code: "231281",
          name: "\u5B89\u8FBE\u5E02"
        },
        {
          code: "231282",
          name: "\u8087\u4E1C\u5E02"
        },
        {
          code: "231283",
          name: "\u6D77\u4F26\u5E02"
        }
      ],
      [
        {
          code: "232701",
          name: "\u52A0\u683C\u8FBE\u5947\u533A"
        },
        {
          code: "232702",
          name: "\u677E\u5CAD\u533A"
        },
        {
          code: "232703",
          name: "\u65B0\u6797\u533A"
        },
        {
          code: "232704",
          name: "\u547C\u4E2D\u533A"
        },
        {
          code: "232721",
          name: "\u547C\u739B\u53BF"
        },
        {
          code: "232722",
          name: "\u5854\u6CB3\u53BF"
        },
        {
          code: "232723",
          name: "\u6F20\u6CB3\u53BF"
        }
      ]
    ],
    [
      [
        {
          code: "310101",
          name: "\u9EC4\u6D66\u533A"
        },
        {
          code: "310104",
          name: "\u5F90\u6C47\u533A"
        },
        {
          code: "310105",
          name: "\u957F\u5B81\u533A"
        },
        {
          code: "310106",
          name: "\u9759\u5B89\u533A"
        },
        {
          code: "310107",
          name: "\u666E\u9640\u533A"
        },
        {
          code: "310109",
          name: "\u8679\u53E3\u533A"
        },
        {
          code: "310110",
          name: "\u6768\u6D66\u533A"
        },
        {
          code: "310112",
          name: "\u95F5\u884C\u533A"
        },
        {
          code: "310113",
          name: "\u5B9D\u5C71\u533A"
        },
        {
          code: "310114",
          name: "\u5609\u5B9A\u533A"
        },
        {
          code: "310115",
          name: "\u6D66\u4E1C\u65B0\u533A"
        },
        {
          code: "310116",
          name: "\u91D1\u5C71\u533A"
        },
        {
          code: "310117",
          name: "\u677E\u6C5F\u533A"
        },
        {
          code: "310118",
          name: "\u9752\u6D66\u533A"
        },
        {
          code: "310120",
          name: "\u5949\u8D24\u533A"
        },
        {
          code: "310151",
          name: "\u5D07\u660E\u533A"
        }
      ]
    ],
    [
      [
        {
          code: "320102",
          name: "\u7384\u6B66\u533A"
        },
        {
          code: "320104",
          name: "\u79E6\u6DEE\u533A"
        },
        {
          code: "320105",
          name: "\u5EFA\u90BA\u533A"
        },
        {
          code: "320106",
          name: "\u9F13\u697C\u533A"
        },
        {
          code: "320111",
          name: "\u6D66\u53E3\u533A"
        },
        {
          code: "320113",
          name: "\u6816\u971E\u533A"
        },
        {
          code: "320114",
          name: "\u96E8\u82B1\u53F0\u533A"
        },
        {
          code: "320115",
          name: "\u6C5F\u5B81\u533A"
        },
        {
          code: "320116",
          name: "\u516D\u5408\u533A"
        },
        {
          code: "320117",
          name: "\u6EA7\u6C34\u533A"
        },
        {
          code: "320118",
          name: "\u9AD8\u6DF3\u533A"
        }
      ],
      [
        {
          code: "320205",
          name: "\u9521\u5C71\u533A"
        },
        {
          code: "320206",
          name: "\u60E0\u5C71\u533A"
        },
        {
          code: "320211",
          name: "\u6EE8\u6E56\u533A"
        },
        {
          code: "320213",
          name: "\u6881\u6EAA\u533A"
        },
        {
          code: "320214",
          name: "\u65B0\u5434\u533A"
        },
        {
          code: "320281",
          name: "\u6C5F\u9634\u5E02"
        },
        {
          code: "320282",
          name: "\u5B9C\u5174\u5E02"
        }
      ],
      [
        {
          code: "320302",
          name: "\u9F13\u697C\u533A"
        },
        {
          code: "320303",
          name: "\u4E91\u9F99\u533A"
        },
        {
          code: "320305",
          name: "\u8D3E\u6C6A\u533A"
        },
        {
          code: "320311",
          name: "\u6CC9\u5C71\u533A"
        },
        {
          code: "320312",
          name: "\u94DC\u5C71\u533A"
        },
        {
          code: "320321",
          name: "\u4E30\u53BF"
        },
        {
          code: "320322",
          name: "\u6C9B\u53BF"
        },
        {
          code: "320324",
          name: "\u7762\u5B81\u53BF"
        },
        {
          code: "320381",
          name: "\u65B0\u6C82\u5E02"
        },
        {
          code: "320382",
          name: "\u90B3\u5DDE\u5E02"
        }
      ],
      [
        {
          code: "320402",
          name: "\u5929\u5B81\u533A"
        },
        {
          code: "320404",
          name: "\u949F\u697C\u533A"
        },
        {
          code: "320411",
          name: "\u65B0\u5317\u533A"
        },
        {
          code: "320412",
          name: "\u6B66\u8FDB\u533A"
        },
        {
          code: "320413",
          name: "\u91D1\u575B\u533A"
        },
        {
          code: "320481",
          name: "\u6EA7\u9633\u5E02"
        }
      ],
      [
        {
          code: "320505",
          name: "\u864E\u4E18\u533A"
        },
        {
          code: "320506",
          name: "\u5434\u4E2D\u533A"
        },
        {
          code: "320507",
          name: "\u76F8\u57CE\u533A"
        },
        {
          code: "320508",
          name: "\u59D1\u82CF\u533A"
        },
        {
          code: "320509",
          name: "\u5434\u6C5F\u533A"
        },
        {
          code: "320581",
          name: "\u5E38\u719F\u5E02"
        },
        {
          code: "320582",
          name: "\u5F20\u5BB6\u6E2F\u5E02"
        },
        {
          code: "320583",
          name: "\u6606\u5C71\u5E02"
        },
        {
          code: "320585",
          name: "\u592A\u4ED3\u5E02"
        }
      ],
      [
        {
          code: "320602",
          name: "\u5D07\u5DDD\u533A"
        },
        {
          code: "320611",
          name: "\u6E2F\u95F8\u533A"
        },
        {
          code: "320612",
          name: "\u901A\u5DDE\u533A"
        },
        {
          code: "320621",
          name: "\u6D77\u5B89\u53BF"
        },
        {
          code: "320623",
          name: "\u5982\u4E1C\u53BF"
        },
        {
          code: "320681",
          name: "\u542F\u4E1C\u5E02"
        },
        {
          code: "320682",
          name: "\u5982\u768B\u5E02"
        },
        {
          code: "320684",
          name: "\u6D77\u95E8\u5E02"
        }
      ],
      [
        {
          code: "320703",
          name: "\u8FDE\u4E91\u533A"
        },
        {
          code: "320706",
          name: "\u6D77\u5DDE\u533A"
        },
        {
          code: "320707",
          name: "\u8D63\u6986\u533A"
        },
        {
          code: "320722",
          name: "\u4E1C\u6D77\u53BF"
        },
        {
          code: "320723",
          name: "\u704C\u4E91\u53BF"
        },
        {
          code: "320724",
          name: "\u704C\u5357\u53BF"
        }
      ],
      [
        {
          code: "320803",
          name: "\u6DEE\u5B89\u533A"
        },
        {
          code: "320804",
          name: "\u6DEE\u9634\u533A"
        },
        {
          code: "320812",
          name: "\u6E05\u6C5F\u6D66\u533A"
        },
        {
          code: "320813",
          name: "\u6D2A\u6CFD\u533A"
        },
        {
          code: "320826",
          name: "\u6D9F\u6C34\u53BF"
        },
        {
          code: "320830",
          name: "\u76F1\u7719\u53BF"
        },
        {
          code: "320831",
          name: "\u91D1\u6E56\u53BF"
        }
      ],
      [
        {
          code: "320902",
          name: "\u4EAD\u6E56\u533A"
        },
        {
          code: "320903",
          name: "\u76D0\u90FD\u533A"
        },
        {
          code: "320904",
          name: "\u5927\u4E30\u533A"
        },
        {
          code: "320921",
          name: "\u54CD\u6C34\u53BF"
        },
        {
          code: "320922",
          name: "\u6EE8\u6D77\u53BF"
        },
        {
          code: "320923",
          name: "\u961C\u5B81\u53BF"
        },
        {
          code: "320924",
          name: "\u5C04\u9633\u53BF"
        },
        {
          code: "320925",
          name: "\u5EFA\u6E56\u53BF"
        },
        {
          code: "320981",
          name: "\u4E1C\u53F0\u5E02"
        }
      ],
      [
        {
          code: "321002",
          name: "\u5E7F\u9675\u533A"
        },
        {
          code: "321003",
          name: "\u9097\u6C5F\u533A"
        },
        {
          code: "321012",
          name: "\u6C5F\u90FD\u533A"
        },
        {
          code: "321023",
          name: "\u5B9D\u5E94\u53BF"
        },
        {
          code: "321081",
          name: "\u4EEA\u5F81\u5E02"
        },
        {
          code: "321084",
          name: "\u9AD8\u90AE\u5E02"
        }
      ],
      [
        {
          code: "321102",
          name: "\u4EAC\u53E3\u533A"
        },
        {
          code: "321111",
          name: "\u6DA6\u5DDE\u533A"
        },
        {
          code: "321112",
          name: "\u4E39\u5F92\u533A"
        },
        {
          code: "321181",
          name: "\u4E39\u9633\u5E02"
        },
        {
          code: "321182",
          name: "\u626C\u4E2D\u5E02"
        },
        {
          code: "321183",
          name: "\u53E5\u5BB9\u5E02"
        }
      ],
      [
        {
          code: "321202",
          name: "\u6D77\u9675\u533A"
        },
        {
          code: "321203",
          name: "\u9AD8\u6E2F\u533A"
        },
        {
          code: "321204",
          name: "\u59DC\u5830\u533A"
        },
        {
          code: "321281",
          name: "\u5174\u5316\u5E02"
        },
        {
          code: "321282",
          name: "\u9756\u6C5F\u5E02"
        },
        {
          code: "321283",
          name: "\u6CF0\u5174\u5E02"
        }
      ],
      [
        {
          code: "321302",
          name: "\u5BBF\u57CE\u533A"
        },
        {
          code: "321311",
          name: "\u5BBF\u8C6B\u533A"
        },
        {
          code: "321322",
          name: "\u6CAD\u9633\u53BF"
        },
        {
          code: "321323",
          name: "\u6CD7\u9633\u53BF"
        },
        {
          code: "321324",
          name: "\u6CD7\u6D2A\u53BF"
        }
      ]
    ],
    [
      [
        {
          code: "330102",
          name: "\u4E0A\u57CE\u533A"
        },
        {
          code: "330105",
          name: "\u62F1\u5885\u533A"
        },
        {
          code: "330106",
          name: "\u897F\u6E56\u533A"
        },
        {
          code: "330108",
          name: "\u6EE8\u6C5F\u533A"
        },
        {
          code: "330109",
          name: "\u8427\u5C71\u533A"
        },
        {
          code: "330110",
          name: "\u4F59\u676D\u533A"
        },
        {
          code: "330111",
          name: "\u5BCC\u9633\u533A"
        },
        {
          code: "330112",
          name: "\u4E34\u5B89\u533A"
        },
        {
          code: "330113",
          name: "\u4E34\u5E73\u533A"
        },
        {
          code: "330114",
          name: "\u94B1\u5858\u533A"
        },
        {
          code: "330122",
          name: "\u6850\u5E90\u53BF"
        },
        {
          code: "330127",
          name: "\u6DF3\u5B89\u53BF"
        },
        {
          code: "330182",
          name: "\u5EFA\u5FB7\u5E02"
        }
      ],
      [
        {
          code: "330203",
          name: "\u6D77\u66D9\u533A"
        },
        {
          code: "330205",
          name: "\u6C5F\u5317\u533A"
        },
        {
          code: "330206",
          name: "\u5317\u4ED1\u533A"
        },
        {
          code: "330211",
          name: "\u9547\u6D77\u533A"
        },
        {
          code: "330212",
          name: "\u911E\u5DDE\u533A"
        },
        {
          code: "330213",
          name: "\u5949\u5316\u533A"
        },
        {
          code: "330225",
          name: "\u8C61\u5C71\u53BF"
        },
        {
          code: "330226",
          name: "\u5B81\u6D77\u53BF"
        },
        {
          code: "330281",
          name: "\u4F59\u59DA\u5E02"
        },
        {
          code: "330282",
          name: "\u6148\u6EAA\u5E02"
        }
      ],
      [
        {
          code: "330302",
          name: "\u9E7F\u57CE\u533A"
        },
        {
          code: "330303",
          name: "\u9F99\u6E7E\u533A"
        },
        {
          code: "330304",
          name: "\u74EF\u6D77\u533A"
        },
        {
          code: "330305",
          name: "\u6D1E\u5934\u533A"
        },
        {
          code: "330324",
          name: "\u6C38\u5609\u53BF"
        },
        {
          code: "330326",
          name: "\u5E73\u9633\u53BF"
        },
        {
          code: "330327",
          name: "\u82CD\u5357\u53BF"
        },
        {
          code: "330328",
          name: "\u6587\u6210\u53BF"
        },
        {
          code: "330329",
          name: "\u6CF0\u987A\u53BF"
        },
        {
          code: "330381",
          name: "\u745E\u5B89\u5E02"
        },
        {
          code: "330382",
          name: "\u4E50\u6E05\u5E02"
        }
      ],
      [
        {
          code: "330402",
          name: "\u5357\u6E56\u533A"
        },
        {
          code: "330411",
          name: "\u79C0\u6D32\u533A"
        },
        {
          code: "330421",
          name: "\u5609\u5584\u53BF"
        },
        {
          code: "330424",
          name: "\u6D77\u76D0\u53BF"
        },
        {
          code: "330481",
          name: "\u6D77\u5B81\u5E02"
        },
        {
          code: "330482",
          name: "\u5E73\u6E56\u5E02"
        },
        {
          code: "330483",
          name: "\u6850\u4E61\u5E02"
        }
      ],
      [
        {
          code: "330502",
          name: "\u5434\u5174\u533A"
        },
        {
          code: "330503",
          name: "\u5357\u6D54\u533A"
        },
        {
          code: "330521",
          name: "\u5FB7\u6E05\u53BF"
        },
        {
          code: "330522",
          name: "\u957F\u5174\u53BF"
        },
        {
          code: "330523",
          name: "\u5B89\u5409\u53BF"
        }
      ],
      [
        {
          code: "330602",
          name: "\u8D8A\u57CE\u533A"
        },
        {
          code: "330603",
          name: "\u67EF\u6865\u533A"
        },
        {
          code: "330604",
          name: "\u4E0A\u865E\u533A"
        },
        {
          code: "330624",
          name: "\u65B0\u660C\u53BF"
        },
        {
          code: "330681",
          name: "\u8BF8\u66A8\u5E02"
        },
        {
          code: "330683",
          name: "\u5D4A\u5DDE\u5E02"
        }
      ],
      [
        {
          code: "330702",
          name: "\u5A7A\u57CE\u533A"
        },
        {
          code: "330703",
          name: "\u91D1\u4E1C\u533A"
        },
        {
          code: "330723",
          name: "\u6B66\u4E49\u53BF"
        },
        {
          code: "330726",
          name: "\u6D66\u6C5F\u53BF"
        },
        {
          code: "330727",
          name: "\u78D0\u5B89\u53BF"
        },
        {
          code: "330781",
          name: "\u5170\u6EAA\u5E02"
        },
        {
          code: "330782",
          name: "\u4E49\u4E4C\u5E02"
        },
        {
          code: "330783",
          name: "\u4E1C\u9633\u5E02"
        },
        {
          code: "330784",
          name: "\u6C38\u5EB7\u5E02"
        }
      ],
      [
        {
          code: "330802",
          name: "\u67EF\u57CE\u533A"
        },
        {
          code: "330803",
          name: "\u8862\u6C5F\u533A"
        },
        {
          code: "330822",
          name: "\u5E38\u5C71\u53BF"
        },
        {
          code: "330824",
          name: "\u5F00\u5316\u53BF"
        },
        {
          code: "330825",
          name: "\u9F99\u6E38\u53BF"
        },
        {
          code: "330881",
          name: "\u6C5F\u5C71\u5E02"
        }
      ],
      [
        {
          code: "330902",
          name: "\u5B9A\u6D77\u533A"
        },
        {
          code: "330903",
          name: "\u666E\u9640\u533A"
        },
        {
          code: "330921",
          name: "\u5CB1\u5C71\u53BF"
        },
        {
          code: "330922",
          name: "\u5D4A\u6CD7\u53BF"
        }
      ],
      [
        {
          code: "331002",
          name: "\u6912\u6C5F\u533A"
        },
        {
          code: "331003",
          name: "\u9EC4\u5CA9\u533A"
        },
        {
          code: "331004",
          name: "\u8DEF\u6865\u533A"
        },
        {
          code: "331022",
          name: "\u4E09\u95E8\u53BF"
        },
        {
          code: "331023",
          name: "\u5929\u53F0\u53BF"
        },
        {
          code: "331024",
          name: "\u4ED9\u5C45\u53BF"
        },
        {
          code: "331081",
          name: "\u6E29\u5CAD\u5E02"
        },
        {
          code: "331082",
          name: "\u4E34\u6D77\u5E02"
        },
        {
          code: "331083",
          name: "\u7389\u73AF\u5E02"
        }
      ],
      [
        {
          code: "331102",
          name: "\u83B2\u90FD\u533A"
        },
        {
          code: "331121",
          name: "\u9752\u7530\u53BF"
        },
        {
          code: "331122",
          name: "\u7F19\u4E91\u53BF"
        },
        {
          code: "331123",
          name: "\u9042\u660C\u53BF"
        },
        {
          code: "331124",
          name: "\u677E\u9633\u53BF"
        },
        {
          code: "331125",
          name: "\u4E91\u548C\u53BF"
        },
        {
          code: "331126",
          name: "\u5E86\u5143\u53BF"
        },
        {
          code: "331127",
          name: "\u666F\u5B81\u7572\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "331181",
          name: "\u9F99\u6CC9\u5E02"
        }
      ]
    ],
    [
      [
        {
          code: "340102",
          name: "\u7476\u6D77\u533A"
        },
        {
          code: "340103",
          name: "\u5E90\u9633\u533A"
        },
        {
          code: "340104",
          name: "\u8700\u5C71\u533A"
        },
        {
          code: "340111",
          name: "\u5305\u6CB3\u533A"
        },
        {
          code: "340121",
          name: "\u957F\u4E30\u53BF"
        },
        {
          code: "340122",
          name: "\u80A5\u4E1C\u53BF"
        },
        {
          code: "340123",
          name: "\u80A5\u897F\u53BF"
        },
        {
          code: "340124",
          name: "\u5E90\u6C5F\u53BF"
        },
        {
          code: "340181",
          name: "\u5DE2\u6E56\u5E02"
        }
      ],
      [
        {
          code: "340202",
          name: "\u955C\u6E56\u533A"
        },
        {
          code: "340203",
          name: "\u5F0B\u6C5F\u533A"
        },
        {
          code: "340207",
          name: "\u9E20\u6C5F\u533A"
        },
        {
          code: "340208",
          name: "\u4E09\u5C71\u533A"
        },
        {
          code: "340221",
          name: "\u829C\u6E56\u53BF"
        },
        {
          code: "340222",
          name: "\u7E41\u660C\u53BF"
        },
        {
          code: "340223",
          name: "\u5357\u9675\u53BF"
        },
        {
          code: "340225",
          name: "\u65E0\u4E3A\u53BF"
        }
      ],
      [
        {
          code: "340302",
          name: "\u9F99\u5B50\u6E56\u533A"
        },
        {
          code: "340303",
          name: "\u868C\u5C71\u533A"
        },
        {
          code: "340304",
          name: "\u79B9\u4F1A\u533A"
        },
        {
          code: "340311",
          name: "\u6DEE\u4E0A\u533A"
        },
        {
          code: "340321",
          name: "\u6000\u8FDC\u53BF"
        },
        {
          code: "340322",
          name: "\u4E94\u6CB3\u53BF"
        },
        {
          code: "340323",
          name: "\u56FA\u9547\u53BF"
        }
      ],
      [
        {
          code: "340402",
          name: "\u5927\u901A\u533A"
        },
        {
          code: "340403",
          name: "\u7530\u5BB6\u5EB5\u533A"
        },
        {
          code: "340404",
          name: "\u8C22\u5BB6\u96C6\u533A"
        },
        {
          code: "340405",
          name: "\u516B\u516C\u5C71\u533A"
        },
        {
          code: "340406",
          name: "\u6F58\u96C6\u533A"
        },
        {
          code: "340421",
          name: "\u51E4\u53F0\u53BF"
        },
        {
          code: "340422",
          name: "\u5BFF\u53BF"
        }
      ],
      [
        {
          code: "340503",
          name: "\u82B1\u5C71\u533A"
        },
        {
          code: "340504",
          name: "\u96E8\u5C71\u533A"
        },
        {
          code: "340506",
          name: "\u535A\u671B\u533A"
        },
        {
          code: "340521",
          name: "\u5F53\u6D82\u53BF"
        },
        {
          code: "340522",
          name: "\u542B\u5C71\u53BF"
        },
        {
          code: "340523",
          name: "\u548C\u53BF"
        }
      ],
      [
        {
          code: "340602",
          name: "\u675C\u96C6\u533A"
        },
        {
          code: "340603",
          name: "\u76F8\u5C71\u533A"
        },
        {
          code: "340604",
          name: "\u70C8\u5C71\u533A"
        },
        {
          code: "340621",
          name: "\u6FC9\u6EAA\u53BF"
        }
      ],
      [
        {
          code: "340705",
          name: "\u94DC\u5B98\u533A"
        },
        {
          code: "340706",
          name: "\u4E49\u5B89\u533A"
        },
        {
          code: "340711",
          name: "\u90CA\u533A"
        },
        {
          code: "340722",
          name: "\u679E\u9633\u53BF"
        }
      ],
      [
        {
          code: "340802",
          name: "\u8FCE\u6C5F\u533A"
        },
        {
          code: "340803",
          name: "\u5927\u89C2\u533A"
        },
        {
          code: "340811",
          name: "\u5B9C\u79C0\u533A"
        },
        {
          code: "340822",
          name: "\u6000\u5B81\u53BF"
        },
        {
          code: "340824",
          name: "\u6F5C\u5C71\u53BF"
        },
        {
          code: "340825",
          name: "\u592A\u6E56\u53BF"
        },
        {
          code: "340826",
          name: "\u5BBF\u677E\u53BF"
        },
        {
          code: "340827",
          name: "\u671B\u6C5F\u53BF"
        },
        {
          code: "340828",
          name: "\u5CB3\u897F\u53BF"
        },
        {
          code: "340881",
          name: "\u6850\u57CE\u5E02"
        }
      ],
      [
        {
          code: "341002",
          name: "\u5C6F\u6EAA\u533A"
        },
        {
          code: "341003",
          name: "\u9EC4\u5C71\u533A"
        },
        {
          code: "341004",
          name: "\u5FBD\u5DDE\u533A"
        },
        {
          code: "341021",
          name: "\u6B59\u53BF"
        },
        {
          code: "341022",
          name: "\u4F11\u5B81\u53BF"
        },
        {
          code: "341023",
          name: "\u9EDF\u53BF"
        },
        {
          code: "341024",
          name: "\u7941\u95E8\u53BF"
        }
      ],
      [
        {
          code: "341102",
          name: "\u7405\u740A\u533A"
        },
        {
          code: "341103",
          name: "\u5357\u8C2F\u533A"
        },
        {
          code: "341122",
          name: "\u6765\u5B89\u53BF"
        },
        {
          code: "341124",
          name: "\u5168\u6912\u53BF"
        },
        {
          code: "341125",
          name: "\u5B9A\u8FDC\u53BF"
        },
        {
          code: "341126",
          name: "\u51E4\u9633\u53BF"
        },
        {
          code: "341181",
          name: "\u5929\u957F\u5E02"
        },
        {
          code: "341182",
          name: "\u660E\u5149\u5E02"
        }
      ],
      [
        {
          code: "341202",
          name: "\u988D\u5DDE\u533A"
        },
        {
          code: "341203",
          name: "\u988D\u4E1C\u533A"
        },
        {
          code: "341204",
          name: "\u988D\u6CC9\u533A"
        },
        {
          code: "341221",
          name: "\u4E34\u6CC9\u53BF"
        },
        {
          code: "341222",
          name: "\u592A\u548C\u53BF"
        },
        {
          code: "341225",
          name: "\u961C\u5357\u53BF"
        },
        {
          code: "341226",
          name: "\u988D\u4E0A\u53BF"
        },
        {
          code: "341282",
          name: "\u754C\u9996\u5E02"
        }
      ],
      [
        {
          code: "341302",
          name: "\u57C7\u6865\u533A"
        },
        {
          code: "341321",
          name: "\u7800\u5C71\u53BF"
        },
        {
          code: "341322",
          name: "\u8427\u53BF"
        },
        {
          code: "341323",
          name: "\u7075\u74A7\u53BF"
        },
        {
          code: "341324",
          name: "\u6CD7\u53BF"
        }
      ],
      [
        {
          code: "341502",
          name: "\u91D1\u5B89\u533A"
        },
        {
          code: "341503",
          name: "\u88D5\u5B89\u533A"
        },
        {
          code: "341504",
          name: "\u53F6\u96C6\u533A"
        },
        {
          code: "341522",
          name: "\u970D\u90B1\u53BF"
        },
        {
          code: "341523",
          name: "\u8212\u57CE\u53BF"
        },
        {
          code: "341524",
          name: "\u91D1\u5BE8\u53BF"
        },
        {
          code: "341525",
          name: "\u970D\u5C71\u53BF"
        }
      ],
      [
        {
          code: "341602",
          name: "\u8C2F\u57CE\u533A"
        },
        {
          code: "341621",
          name: "\u6DA1\u9633\u53BF"
        },
        {
          code: "341622",
          name: "\u8499\u57CE\u53BF"
        },
        {
          code: "341623",
          name: "\u5229\u8F9B\u53BF"
        }
      ],
      [
        {
          code: "341702",
          name: "\u8D35\u6C60\u533A"
        },
        {
          code: "341721",
          name: "\u4E1C\u81F3\u53BF"
        },
        {
          code: "341722",
          name: "\u77F3\u53F0\u53BF"
        },
        {
          code: "341723",
          name: "\u9752\u9633\u53BF"
        }
      ],
      [
        {
          code: "341802",
          name: "\u5BA3\u5DDE\u533A"
        },
        {
          code: "341821",
          name: "\u90CE\u6EAA\u53BF"
        },
        {
          code: "341822",
          name: "\u5E7F\u5FB7\u53BF"
        },
        {
          code: "341823",
          name: "\u6CFE\u53BF"
        },
        {
          code: "341824",
          name: "\u7EE9\u6EAA\u53BF"
        },
        {
          code: "341825",
          name: "\u65CC\u5FB7\u53BF"
        },
        {
          code: "341881",
          name: "\u5B81\u56FD\u5E02"
        }
      ]
    ],
    [
      [
        {
          code: "350102",
          name: "\u9F13\u697C\u533A"
        },
        {
          code: "350103",
          name: "\u53F0\u6C5F\u533A"
        },
        {
          code: "350104",
          name: "\u4ED3\u5C71\u533A"
        },
        {
          code: "350105",
          name: "\u9A6C\u5C3E\u533A"
        },
        {
          code: "350111",
          name: "\u664B\u5B89\u533A"
        },
        {
          code: "350112",
          name: "\u957F\u4E50\u533A"
        },
        {
          code: "350121",
          name: "\u95FD\u4FAF\u53BF"
        },
        {
          code: "350122",
          name: "\u8FDE\u6C5F\u53BF"
        },
        {
          code: "350123",
          name: "\u7F57\u6E90\u53BF"
        },
        {
          code: "350124",
          name: "\u95FD\u6E05\u53BF"
        },
        {
          code: "350125",
          name: "\u6C38\u6CF0\u53BF"
        },
        {
          code: "350128",
          name: "\u5E73\u6F6D\u53BF"
        },
        {
          code: "350181",
          name: "\u798F\u6E05\u5E02"
        }
      ],
      [
        {
          code: "350203",
          name: "\u601D\u660E\u533A"
        },
        {
          code: "350205",
          name: "\u6D77\u6CA7\u533A"
        },
        {
          code: "350206",
          name: "\u6E56\u91CC\u533A"
        },
        {
          code: "350211",
          name: "\u96C6\u7F8E\u533A"
        },
        {
          code: "350212",
          name: "\u540C\u5B89\u533A"
        },
        {
          code: "350213",
          name: "\u7FD4\u5B89\u533A"
        }
      ],
      [
        {
          code: "350302",
          name: "\u57CE\u53A2\u533A"
        },
        {
          code: "350303",
          name: "\u6DB5\u6C5F\u533A"
        },
        {
          code: "350304",
          name: "\u8354\u57CE\u533A"
        },
        {
          code: "350305",
          name: "\u79C0\u5C7F\u533A"
        },
        {
          code: "350322",
          name: "\u4ED9\u6E38\u53BF"
        }
      ],
      [
        {
          code: "350404",
          name: "\u4E09\u5143\u533A"
        },
        {
          code: "350405",
          name: "\u6C99\u53BF\u533A"
        },
        {
          code: "350421",
          name: "\u660E\u6EAA\u53BF"
        },
        {
          code: "350423",
          name: "\u6E05\u6D41\u53BF"
        },
        {
          code: "350424",
          name: "\u5B81\u5316\u53BF"
        },
        {
          code: "350425",
          name: "\u5927\u7530\u53BF"
        },
        {
          code: "350426",
          name: "\u5C24\u6EAA\u53BF"
        },
        {
          code: "350428",
          name: "\u5C06\u4E50\u53BF"
        },
        {
          code: "350429",
          name: "\u6CF0\u5B81\u53BF"
        },
        {
          code: "350430",
          name: "\u5EFA\u5B81\u53BF"
        },
        {
          code: "350481",
          name: "\u6C38\u5B89\u5E02"
        }
      ],
      [
        {
          code: "350502",
          name: "\u9CA4\u57CE\u533A"
        },
        {
          code: "350503",
          name: "\u4E30\u6CFD\u533A"
        },
        {
          code: "350504",
          name: "\u6D1B\u6C5F\u533A"
        },
        {
          code: "350505",
          name: "\u6CC9\u6E2F\u533A"
        },
        {
          code: "350521",
          name: "\u60E0\u5B89\u53BF"
        },
        {
          code: "350524",
          name: "\u5B89\u6EAA\u53BF"
        },
        {
          code: "350525",
          name: "\u6C38\u6625\u53BF"
        },
        {
          code: "350526",
          name: "\u5FB7\u5316\u53BF"
        },
        {
          code: "350527",
          name: "\u91D1\u95E8\u53BF"
        },
        {
          code: "350581",
          name: "\u77F3\u72EE\u5E02"
        },
        {
          code: "350582",
          name: "\u664B\u6C5F\u5E02"
        },
        {
          code: "350583",
          name: "\u5357\u5B89\u5E02"
        }
      ],
      [
        {
          code: "350602",
          name: "\u8297\u57CE\u533A"
        },
        {
          code: "350603",
          name: "\u9F99\u6587\u533A"
        },
        {
          code: "350604",
          name: "\u9F99\u6D77\u533A"
        },
        {
          code: "350605",
          name: "\u957F\u6CF0\u533A"
        },
        {
          code: "350622",
          name: "\u4E91\u9704\u53BF"
        },
        {
          code: "350623",
          name: "\u6F33\u6D66\u53BF"
        },
        {
          code: "350624",
          name: "\u8BCF\u5B89\u53BF"
        },
        {
          code: "350626",
          name: "\u4E1C\u5C71\u53BF"
        },
        {
          code: "350627",
          name: "\u5357\u9756\u53BF"
        },
        {
          code: "350628",
          name: "\u5E73\u548C\u53BF"
        },
        {
          code: "350629",
          name: "\u534E\u5B89\u53BF"
        }
      ],
      [
        {
          code: "350702",
          name: "\u5EF6\u5E73\u533A"
        },
        {
          code: "350703",
          name: "\u5EFA\u9633\u533A"
        },
        {
          code: "350721",
          name: "\u987A\u660C\u53BF"
        },
        {
          code: "350722",
          name: "\u6D66\u57CE\u53BF"
        },
        {
          code: "350723",
          name: "\u5149\u6CFD\u53BF"
        },
        {
          code: "350724",
          name: "\u677E\u6EAA\u53BF"
        },
        {
          code: "350725",
          name: "\u653F\u548C\u53BF"
        },
        {
          code: "350781",
          name: "\u90B5\u6B66\u5E02"
        },
        {
          code: "350782",
          name: "\u6B66\u5937\u5C71\u5E02"
        },
        {
          code: "350783",
          name: "\u5EFA\u74EF\u5E02"
        }
      ],
      [
        {
          code: "350802",
          name: "\u65B0\u7F57\u533A"
        },
        {
          code: "350803",
          name: "\u6C38\u5B9A\u533A"
        },
        {
          code: "350821",
          name: "\u957F\u6C40\u53BF"
        },
        {
          code: "350823",
          name: "\u4E0A\u676D\u53BF"
        },
        {
          code: "350824",
          name: "\u6B66\u5E73\u53BF"
        },
        {
          code: "350825",
          name: "\u8FDE\u57CE\u53BF"
        },
        {
          code: "350881",
          name: "\u6F33\u5E73\u5E02"
        }
      ],
      [
        {
          code: "350902",
          name: "\u8549\u57CE\u533A"
        },
        {
          code: "350921",
          name: "\u971E\u6D66\u53BF"
        },
        {
          code: "350922",
          name: "\u53E4\u7530\u53BF"
        },
        {
          code: "350923",
          name: "\u5C4F\u5357\u53BF"
        },
        {
          code: "350924",
          name: "\u5BFF\u5B81\u53BF"
        },
        {
          code: "350925",
          name: "\u5468\u5B81\u53BF"
        },
        {
          code: "350926",
          name: "\u67D8\u8363\u53BF"
        },
        {
          code: "350981",
          name: "\u798F\u5B89\u5E02"
        },
        {
          code: "350982",
          name: "\u798F\u9F0E\u5E02"
        }
      ]
    ],
    [
      [
        {
          code: "360102",
          name: "\u4E1C\u6E56\u533A"
        },
        {
          code: "360103",
          name: "\u897F\u6E56\u533A"
        },
        {
          code: "360104",
          name: "\u9752\u4E91\u8C31\u533A"
        },
        {
          code: "360105",
          name: "\u6E7E\u91CC\u533A"
        },
        {
          code: "360111",
          name: "\u9752\u5C71\u6E56\u533A"
        },
        {
          code: "360112",
          name: "\u65B0\u5EFA\u533A"
        },
        {
          code: "360121",
          name: "\u5357\u660C\u53BF"
        },
        {
          code: "360123",
          name: "\u5B89\u4E49\u53BF"
        },
        {
          code: "360124",
          name: "\u8FDB\u8D24\u53BF"
        }
      ],
      [
        {
          code: "360202",
          name: "\u660C\u6C5F\u533A"
        },
        {
          code: "360203",
          name: "\u73E0\u5C71\u533A"
        },
        {
          code: "360222",
          name: "\u6D6E\u6881\u53BF"
        },
        {
          code: "360281",
          name: "\u4E50\u5E73\u5E02"
        }
      ],
      [
        {
          code: "360302",
          name: "\u5B89\u6E90\u533A"
        },
        {
          code: "360313",
          name: "\u6E58\u4E1C\u533A"
        },
        {
          code: "360321",
          name: "\u83B2\u82B1\u53BF"
        },
        {
          code: "360322",
          name: "\u4E0A\u6817\u53BF"
        },
        {
          code: "360323",
          name: "\u82A6\u6EAA\u53BF"
        }
      ],
      [
        {
          code: "360402",
          name: "\u6FC2\u6EAA\u533A"
        },
        {
          code: "360403",
          name: "\u6D54\u9633\u533A"
        },
        {
          code: "360404",
          name: "\u67F4\u6851\u533A"
        },
        {
          code: "360423",
          name: "\u6B66\u5B81\u53BF"
        },
        {
          code: "360424",
          name: "\u4FEE\u6C34\u53BF"
        },
        {
          code: "360425",
          name: "\u6C38\u4FEE\u53BF"
        },
        {
          code: "360426",
          name: "\u5FB7\u5B89\u53BF"
        },
        {
          code: "360428",
          name: "\u90FD\u660C\u53BF"
        },
        {
          code: "360429",
          name: "\u6E56\u53E3\u53BF"
        },
        {
          code: "360430",
          name: "\u5F6D\u6CFD\u53BF"
        },
        {
          code: "360481",
          name: "\u745E\u660C\u5E02"
        },
        {
          code: "360482",
          name: "\u5171\u9752\u57CE\u5E02"
        },
        {
          code: "360483",
          name: "\u5E90\u5C71\u5E02"
        }
      ],
      [
        {
          code: "360502",
          name: "\u6E1D\u6C34\u533A"
        },
        {
          code: "360521",
          name: "\u5206\u5B9C\u53BF"
        }
      ],
      [
        {
          code: "360602",
          name: "\u6708\u6E56\u533A"
        },
        {
          code: "360622",
          name: "\u4F59\u6C5F\u533A"
        },
        {
          code: "360681",
          name: "\u8D35\u6EAA\u5E02"
        }
      ],
      [
        {
          code: "360702",
          name: "\u7AE0\u8D21\u533A"
        },
        {
          code: "360703",
          name: "\u5357\u5EB7\u533A"
        },
        {
          code: "360704",
          name: "\u8D63\u53BF\u533A"
        },
        {
          code: "360722",
          name: "\u4FE1\u4E30\u53BF"
        },
        {
          code: "360723",
          name: "\u5927\u4F59\u53BF"
        },
        {
          code: "360724",
          name: "\u4E0A\u72B9\u53BF"
        },
        {
          code: "360725",
          name: "\u5D07\u4E49\u53BF"
        },
        {
          code: "360726",
          name: "\u5B89\u8FDC\u53BF"
        },
        {
          code: "360727",
          name: "\u9F99\u5357\u53BF"
        },
        {
          code: "360728",
          name: "\u5B9A\u5357\u53BF"
        },
        {
          code: "360729",
          name: "\u5168\u5357\u53BF"
        },
        {
          code: "360730",
          name: "\u5B81\u90FD\u53BF"
        },
        {
          code: "360731",
          name: "\u4E8E\u90FD\u53BF"
        },
        {
          code: "360732",
          name: "\u5174\u56FD\u53BF"
        },
        {
          code: "360733",
          name: "\u4F1A\u660C\u53BF"
        },
        {
          code: "360734",
          name: "\u5BFB\u4E4C\u53BF"
        },
        {
          code: "360735",
          name: "\u77F3\u57CE\u53BF"
        },
        {
          code: "360781",
          name: "\u745E\u91D1\u5E02"
        }
      ],
      [
        {
          code: "360802",
          name: "\u5409\u5DDE\u533A"
        },
        {
          code: "360803",
          name: "\u9752\u539F\u533A"
        },
        {
          code: "360821",
          name: "\u5409\u5B89\u53BF"
        },
        {
          code: "360822",
          name: "\u5409\u6C34\u53BF"
        },
        {
          code: "360823",
          name: "\u5CE1\u6C5F\u53BF"
        },
        {
          code: "360824",
          name: "\u65B0\u5E72\u53BF"
        },
        {
          code: "360825",
          name: "\u6C38\u4E30\u53BF"
        },
        {
          code: "360826",
          name: "\u6CF0\u548C\u53BF"
        },
        {
          code: "360827",
          name: "\u9042\u5DDD\u53BF"
        },
        {
          code: "360828",
          name: "\u4E07\u5B89\u53BF"
        },
        {
          code: "360829",
          name: "\u5B89\u798F\u53BF"
        },
        {
          code: "360830",
          name: "\u6C38\u65B0\u53BF"
        },
        {
          code: "360881",
          name: "\u4E95\u5188\u5C71\u5E02"
        }
      ],
      [
        {
          code: "360902",
          name: "\u8881\u5DDE\u533A"
        },
        {
          code: "360921",
          name: "\u5949\u65B0\u53BF"
        },
        {
          code: "360922",
          name: "\u4E07\u8F7D\u53BF"
        },
        {
          code: "360923",
          name: "\u4E0A\u9AD8\u53BF"
        },
        {
          code: "360924",
          name: "\u5B9C\u4E30\u53BF"
        },
        {
          code: "360925",
          name: "\u9756\u5B89\u53BF"
        },
        {
          code: "360926",
          name: "\u94DC\u9F13\u53BF"
        },
        {
          code: "360981",
          name: "\u4E30\u57CE\u5E02"
        },
        {
          code: "360982",
          name: "\u6A1F\u6811\u5E02"
        },
        {
          code: "360983",
          name: "\u9AD8\u5B89\u5E02"
        }
      ],
      [
        {
          code: "361002",
          name: "\u4E34\u5DDD\u533A"
        },
        {
          code: "361003",
          name: "\u4E1C\u4E61\u533A"
        },
        {
          code: "361021",
          name: "\u5357\u57CE\u53BF"
        },
        {
          code: "361022",
          name: "\u9ECE\u5DDD\u53BF"
        },
        {
          code: "361023",
          name: "\u5357\u4E30\u53BF"
        },
        {
          code: "361024",
          name: "\u5D07\u4EC1\u53BF"
        },
        {
          code: "361025",
          name: "\u4E50\u5B89\u53BF"
        },
        {
          code: "361026",
          name: "\u5B9C\u9EC4\u53BF"
        },
        {
          code: "361027",
          name: "\u91D1\u6EAA\u53BF"
        },
        {
          code: "361028",
          name: "\u8D44\u6EAA\u53BF"
        },
        {
          code: "361030",
          name: "\u5E7F\u660C\u53BF"
        }
      ],
      [
        {
          code: "361102",
          name: "\u4FE1\u5DDE\u533A"
        },
        {
          code: "361103",
          name: "\u5E7F\u4E30\u533A"
        },
        {
          code: "361121",
          name: "\u4E0A\u9976\u53BF"
        },
        {
          code: "361123",
          name: "\u7389\u5C71\u53BF"
        },
        {
          code: "361124",
          name: "\u94C5\u5C71\u53BF"
        },
        {
          code: "361125",
          name: "\u6A2A\u5CF0\u53BF"
        },
        {
          code: "361126",
          name: "\u5F0B\u9633\u53BF"
        },
        {
          code: "361127",
          name: "\u4F59\u5E72\u53BF"
        },
        {
          code: "361128",
          name: "\u9131\u9633\u53BF"
        },
        {
          code: "361129",
          name: "\u4E07\u5E74\u53BF"
        },
        {
          code: "361130",
          name: "\u5A7A\u6E90\u53BF"
        },
        {
          code: "361181",
          name: "\u5FB7\u5174\u5E02"
        }
      ]
    ],
    [
      [
        {
          code: "370102",
          name: "\u5386\u4E0B\u533A"
        },
        {
          code: "370103",
          name: "\u5E02\u4E2D\u533A"
        },
        {
          code: "370104",
          name: "\u69D0\u836B\u533A"
        },
        {
          code: "370105",
          name: "\u5929\u6865\u533A"
        },
        {
          code: "370112",
          name: "\u5386\u57CE\u533A"
        },
        {
          code: "370113",
          name: "\u957F\u6E05\u533A"
        },
        {
          code: "370114",
          name: "\u7AE0\u4E18\u533A"
        },
        {
          code: "370124",
          name: "\u5E73\u9634\u53BF"
        },
        {
          code: "370125",
          name: "\u6D4E\u9633\u53BF"
        },
        {
          code: "370126",
          name: "\u5546\u6CB3\u53BF"
        }
      ],
      [
        {
          code: "370202",
          name: "\u5E02\u5357\u533A"
        },
        {
          code: "370203",
          name: "\u5E02\u5317\u533A"
        },
        {
          code: "370211",
          name: "\u9EC4\u5C9B\u533A"
        },
        {
          code: "370212",
          name: "\u5D02\u5C71\u533A"
        },
        {
          code: "370213",
          name: "\u674E\u6CA7\u533A"
        },
        {
          code: "370214",
          name: "\u57CE\u9633\u533A"
        },
        {
          code: "370215",
          name: "\u5373\u58A8\u533A"
        },
        {
          code: "370281",
          name: "\u80F6\u5DDE\u5E02"
        },
        {
          code: "370283",
          name: "\u5E73\u5EA6\u5E02"
        },
        {
          code: "370285",
          name: "\u83B1\u897F\u5E02"
        }
      ],
      [
        {
          code: "370302",
          name: "\u6DC4\u5DDD\u533A"
        },
        {
          code: "370303",
          name: "\u5F20\u5E97\u533A"
        },
        {
          code: "370304",
          name: "\u535A\u5C71\u533A"
        },
        {
          code: "370305",
          name: "\u4E34\u6DC4\u533A"
        },
        {
          code: "370306",
          name: "\u5468\u6751\u533A"
        },
        {
          code: "370321",
          name: "\u6853\u53F0\u53BF"
        },
        {
          code: "370322",
          name: "\u9AD8\u9752\u53BF"
        },
        {
          code: "370323",
          name: "\u6C82\u6E90\u53BF"
        }
      ],
      [
        {
          code: "370402",
          name: "\u5E02\u4E2D\u533A"
        },
        {
          code: "370403",
          name: "\u859B\u57CE\u533A"
        },
        {
          code: "370404",
          name: "\u5CC4\u57CE\u533A"
        },
        {
          code: "370405",
          name: "\u53F0\u513F\u5E84\u533A"
        },
        {
          code: "370406",
          name: "\u5C71\u4EAD\u533A"
        },
        {
          code: "370481",
          name: "\u6ED5\u5DDE\u5E02"
        }
      ],
      [
        {
          code: "370502",
          name: "\u4E1C\u8425\u533A"
        },
        {
          code: "370503",
          name: "\u6CB3\u53E3\u533A"
        },
        {
          code: "370505",
          name: "\u57A6\u5229\u533A"
        },
        {
          code: "370522",
          name: "\u5229\u6D25\u53BF"
        },
        {
          code: "370523",
          name: "\u5E7F\u9976\u53BF"
        }
      ],
      [
        {
          code: "370602",
          name: "\u829D\u7F58\u533A"
        },
        {
          code: "370611",
          name: "\u798F\u5C71\u533A"
        },
        {
          code: "370612",
          name: "\u725F\u5E73\u533A"
        },
        {
          code: "370613",
          name: "\u83B1\u5C71\u533A"
        },
        {
          code: "370634",
          name: "\u957F\u5C9B\u53BF"
        },
        {
          code: "370681",
          name: "\u9F99\u53E3\u5E02"
        },
        {
          code: "370682",
          name: "\u83B1\u9633\u5E02"
        },
        {
          code: "370683",
          name: "\u83B1\u5DDE\u5E02"
        },
        {
          code: "370684",
          name: "\u84EC\u83B1\u5E02"
        },
        {
          code: "370685",
          name: "\u62DB\u8FDC\u5E02"
        },
        {
          code: "370686",
          name: "\u6816\u971E\u5E02"
        },
        {
          code: "370687",
          name: "\u6D77\u9633\u5E02"
        }
      ],
      [
        {
          code: "370702",
          name: "\u6F4D\u57CE\u533A"
        },
        {
          code: "370703",
          name: "\u5BD2\u4EAD\u533A"
        },
        {
          code: "370704",
          name: "\u574A\u5B50\u533A"
        },
        {
          code: "370705",
          name: "\u594E\u6587\u533A"
        },
        {
          code: "370724",
          name: "\u4E34\u6710\u53BF"
        },
        {
          code: "370725",
          name: "\u660C\u4E50\u53BF"
        },
        {
          code: "370781",
          name: "\u9752\u5DDE\u5E02"
        },
        {
          code: "370782",
          name: "\u8BF8\u57CE\u5E02"
        },
        {
          code: "370783",
          name: "\u5BFF\u5149\u5E02"
        },
        {
          code: "370784",
          name: "\u5B89\u4E18\u5E02"
        },
        {
          code: "370785",
          name: "\u9AD8\u5BC6\u5E02"
        },
        {
          code: "370786",
          name: "\u660C\u9091\u5E02"
        }
      ],
      [
        {
          code: "370811",
          name: "\u4EFB\u57CE\u533A"
        },
        {
          code: "370812",
          name: "\u5156\u5DDE\u533A"
        },
        {
          code: "370826",
          name: "\u5FAE\u5C71\u53BF"
        },
        {
          code: "370827",
          name: "\u9C7C\u53F0\u53BF"
        },
        {
          code: "370828",
          name: "\u91D1\u4E61\u53BF"
        },
        {
          code: "370829",
          name: "\u5609\u7965\u53BF"
        },
        {
          code: "370830",
          name: "\u6C76\u4E0A\u53BF"
        },
        {
          code: "370831",
          name: "\u6CD7\u6C34\u53BF"
        },
        {
          code: "370832",
          name: "\u6881\u5C71\u53BF"
        },
        {
          code: "370881",
          name: "\u66F2\u961C\u5E02"
        },
        {
          code: "370883",
          name: "\u90B9\u57CE\u5E02"
        }
      ],
      [
        {
          code: "370902",
          name: "\u6CF0\u5C71\u533A"
        },
        {
          code: "370911",
          name: "\u5CB1\u5CB3\u533A"
        },
        {
          code: "370921",
          name: "\u5B81\u9633\u53BF"
        },
        {
          code: "370923",
          name: "\u4E1C\u5E73\u53BF"
        },
        {
          code: "370982",
          name: "\u65B0\u6CF0\u5E02"
        },
        {
          code: "370983",
          name: "\u80A5\u57CE\u5E02"
        }
      ],
      [
        {
          code: "371002",
          name: "\u73AF\u7FE0\u533A"
        },
        {
          code: "371003",
          name: "\u6587\u767B\u533A"
        },
        {
          code: "371082",
          name: "\u8363\u6210\u5E02"
        },
        {
          code: "371083",
          name: "\u4E73\u5C71\u5E02"
        }
      ],
      [
        {
          code: "371102",
          name: "\u4E1C\u6E2F\u533A"
        },
        {
          code: "371103",
          name: "\u5C9A\u5C71\u533A"
        },
        {
          code: "371121",
          name: "\u4E94\u83B2\u53BF"
        },
        {
          code: "371122",
          name: "\u8392\u53BF"
        }
      ],
      [
        {
          code: "371202",
          name: "\u83B1\u57CE\u533A"
        },
        {
          code: "371203",
          name: "\u94A2\u57CE\u533A"
        }
      ],
      [
        {
          code: "371302",
          name: "\u5170\u5C71\u533A"
        },
        {
          code: "371311",
          name: "\u7F57\u5E84\u533A"
        },
        {
          code: "371312",
          name: "\u6CB3\u4E1C\u533A"
        },
        {
          code: "371321",
          name: "\u6C82\u5357\u53BF"
        },
        {
          code: "371322",
          name: "\u90EF\u57CE\u53BF"
        },
        {
          code: "371323",
          name: "\u6C82\u6C34\u53BF"
        },
        {
          code: "371324",
          name: "\u5170\u9675\u53BF"
        },
        {
          code: "371325",
          name: "\u8D39\u53BF"
        },
        {
          code: "371326",
          name: "\u5E73\u9091\u53BF"
        },
        {
          code: "371327",
          name: "\u8392\u5357\u53BF"
        },
        {
          code: "371328",
          name: "\u8499\u9634\u53BF"
        },
        {
          code: "371329",
          name: "\u4E34\u6CAD\u53BF"
        }
      ],
      [
        {
          code: "371402",
          name: "\u5FB7\u57CE\u533A"
        },
        {
          code: "371403",
          name: "\u9675\u57CE\u533A"
        },
        {
          code: "371422",
          name: "\u5B81\u6D25\u53BF"
        },
        {
          code: "371423",
          name: "\u5E86\u4E91\u53BF"
        },
        {
          code: "371424",
          name: "\u4E34\u9091\u53BF"
        },
        {
          code: "371425",
          name: "\u9F50\u6CB3\u53BF"
        },
        {
          code: "371426",
          name: "\u5E73\u539F\u53BF"
        },
        {
          code: "371427",
          name: "\u590F\u6D25\u53BF"
        },
        {
          code: "371428",
          name: "\u6B66\u57CE\u53BF"
        },
        {
          code: "371481",
          name: "\u4E50\u9675\u5E02"
        },
        {
          code: "371482",
          name: "\u79B9\u57CE\u5E02"
        }
      ],
      [
        {
          code: "371502",
          name: "\u4E1C\u660C\u5E9C\u533A"
        },
        {
          code: "371521",
          name: "\u9633\u8C37\u53BF"
        },
        {
          code: "371522",
          name: "\u8398\u53BF"
        },
        {
          code: "371523",
          name: "\u830C\u5E73\u53BF"
        },
        {
          code: "371524",
          name: "\u4E1C\u963F\u53BF"
        },
        {
          code: "371525",
          name: "\u51A0\u53BF"
        },
        {
          code: "371526",
          name: "\u9AD8\u5510\u53BF"
        },
        {
          code: "371581",
          name: "\u4E34\u6E05\u5E02"
        }
      ],
      [
        {
          code: "371602",
          name: "\u6EE8\u57CE\u533A"
        },
        {
          code: "371603",
          name: "\u6CBE\u5316\u533A"
        },
        {
          code: "371621",
          name: "\u60E0\u6C11\u53BF"
        },
        {
          code: "371622",
          name: "\u9633\u4FE1\u53BF"
        },
        {
          code: "371623",
          name: "\u65E0\u68E3\u53BF"
        },
        {
          code: "371625",
          name: "\u535A\u5174\u53BF"
        },
        {
          code: "371626",
          name: "\u90B9\u5E73\u53BF"
        }
      ],
      [
        {
          code: "371702",
          name: "\u7261\u4E39\u533A"
        },
        {
          code: "371703",
          name: "\u5B9A\u9676\u533A"
        },
        {
          code: "371721",
          name: "\u66F9\u53BF"
        },
        {
          code: "371722",
          name: "\u5355\u53BF"
        },
        {
          code: "371723",
          name: "\u6210\u6B66\u53BF"
        },
        {
          code: "371724",
          name: "\u5DE8\u91CE\u53BF"
        },
        {
          code: "371725",
          name: "\u90D3\u57CE\u53BF"
        },
        {
          code: "371726",
          name: "\u9104\u57CE\u53BF"
        },
        {
          code: "371728",
          name: "\u4E1C\u660E\u53BF"
        }
      ]
    ],
    [
      [
        {
          code: "410102",
          name: "\u4E2D\u539F\u533A"
        },
        {
          code: "410103",
          name: "\u4E8C\u4E03\u533A"
        },
        {
          code: "410104",
          name: "\u7BA1\u57CE\u56DE\u65CF\u533A"
        },
        {
          code: "410105",
          name: "\u91D1\u6C34\u533A"
        },
        {
          code: "410106",
          name: "\u4E0A\u8857\u533A"
        },
        {
          code: "410108",
          name: "\u60E0\u6D4E\u533A"
        },
        {
          code: "410122",
          name: "\u4E2D\u725F\u53BF"
        },
        {
          code: "410181",
          name: "\u5DE9\u4E49\u5E02"
        },
        {
          code: "410182",
          name: "\u8365\u9633\u5E02"
        },
        {
          code: "410183",
          name: "\u65B0\u5BC6\u5E02"
        },
        {
          code: "410184",
          name: "\u65B0\u90D1\u5E02"
        },
        {
          code: "410185",
          name: "\u767B\u5C01\u5E02"
        }
      ],
      [
        {
          code: "410202",
          name: "\u9F99\u4EAD\u533A"
        },
        {
          code: "410203",
          name: "\u987A\u6CB3\u56DE\u65CF\u533A"
        },
        {
          code: "410204",
          name: "\u9F13\u697C\u533A"
        },
        {
          code: "410205",
          name: "\u79B9\u738B\u53F0\u533A"
        },
        {
          code: "410212",
          name: "\u7965\u7B26\u533A"
        },
        {
          code: "410221",
          name: "\u675E\u53BF"
        },
        {
          code: "410222",
          name: "\u901A\u8BB8\u53BF"
        },
        {
          code: "410223",
          name: "\u5C09\u6C0F\u53BF"
        },
        {
          code: "410225",
          name: "\u5170\u8003\u53BF"
        }
      ],
      [
        {
          code: "410302",
          name: "\u8001\u57CE\u533A"
        },
        {
          code: "410303",
          name: "\u897F\u5DE5\u533A"
        },
        {
          code: "410304",
          name: "\u700D\u6CB3\u56DE\u65CF\u533A"
        },
        {
          code: "410305",
          name: "\u6DA7\u897F\u533A"
        },
        {
          code: "410307",
          name: "\u5043\u5E08\u533A"
        },
        {
          code: "410308",
          name: "\u5B5F\u6D25\u533A"
        },
        {
          code: "410311",
          name: "\u6D1B\u9F99\u533A"
        },
        {
          code: "410323",
          name: "\u65B0\u5B89\u53BF"
        },
        {
          code: "410324",
          name: "\u683E\u5DDD\u53BF"
        },
        {
          code: "410325",
          name: "\u5D69\u53BF"
        },
        {
          code: "410326",
          name: "\u6C5D\u9633\u53BF"
        },
        {
          code: "410327",
          name: "\u5B9C\u9633\u53BF"
        },
        {
          code: "410328",
          name: "\u6D1B\u5B81\u53BF"
        },
        {
          code: "410329",
          name: "\u4F0A\u5DDD\u53BF"
        }
      ],
      [
        {
          code: "410402",
          name: "\u65B0\u534E\u533A"
        },
        {
          code: "410403",
          name: "\u536B\u4E1C\u533A"
        },
        {
          code: "410404",
          name: "\u77F3\u9F99\u533A"
        },
        {
          code: "410411",
          name: "\u6E5B\u6CB3\u533A"
        },
        {
          code: "410421",
          name: "\u5B9D\u4E30\u53BF"
        },
        {
          code: "410422",
          name: "\u53F6\u53BF"
        },
        {
          code: "410423",
          name: "\u9C81\u5C71\u53BF"
        },
        {
          code: "410425",
          name: "\u90CF\u53BF"
        },
        {
          code: "410481",
          name: "\u821E\u94A2\u5E02"
        },
        {
          code: "410482",
          name: "\u6C5D\u5DDE\u5E02"
        }
      ],
      [
        {
          code: "410502",
          name: "\u6587\u5CF0\u533A"
        },
        {
          code: "410503",
          name: "\u5317\u5173\u533A"
        },
        {
          code: "410505",
          name: "\u6BB7\u90FD\u533A"
        },
        {
          code: "410506",
          name: "\u9F99\u5B89\u533A"
        },
        {
          code: "410522",
          name: "\u5B89\u9633\u53BF"
        },
        {
          code: "410523",
          name: "\u6C64\u9634\u53BF"
        },
        {
          code: "410526",
          name: "\u6ED1\u53BF"
        },
        {
          code: "410527",
          name: "\u5185\u9EC4\u53BF"
        },
        {
          code: "410581",
          name: "\u6797\u5DDE\u5E02"
        }
      ],
      [
        {
          code: "410602",
          name: "\u9E64\u5C71\u533A"
        },
        {
          code: "410603",
          name: "\u5C71\u57CE\u533A"
        },
        {
          code: "410611",
          name: "\u6DC7\u6EE8\u533A"
        },
        {
          code: "410621",
          name: "\u6D5A\u53BF"
        },
        {
          code: "410622",
          name: "\u6DC7\u53BF"
        }
      ],
      [
        {
          code: "410702",
          name: "\u7EA2\u65D7\u533A"
        },
        {
          code: "410703",
          name: "\u536B\u6EE8\u533A"
        },
        {
          code: "410704",
          name: "\u51E4\u6CC9\u533A"
        },
        {
          code: "410711",
          name: "\u7267\u91CE\u533A"
        },
        {
          code: "410721",
          name: "\u65B0\u4E61\u53BF"
        },
        {
          code: "410724",
          name: "\u83B7\u5609\u53BF"
        },
        {
          code: "410725",
          name: "\u539F\u9633\u53BF"
        },
        {
          code: "410726",
          name: "\u5EF6\u6D25\u53BF"
        },
        {
          code: "410727",
          name: "\u5C01\u4E18\u53BF"
        },
        {
          code: "410728",
          name: "\u957F\u57A3\u53BF"
        },
        {
          code: "410781",
          name: "\u536B\u8F89\u5E02"
        },
        {
          code: "410782",
          name: "\u8F89\u53BF\u5E02"
        }
      ],
      [
        {
          code: "410802",
          name: "\u89E3\u653E\u533A"
        },
        {
          code: "410803",
          name: "\u4E2D\u7AD9\u533A"
        },
        {
          code: "410804",
          name: "\u9A6C\u6751\u533A"
        },
        {
          code: "410811",
          name: "\u5C71\u9633\u533A"
        },
        {
          code: "410821",
          name: "\u4FEE\u6B66\u53BF"
        },
        {
          code: "410822",
          name: "\u535A\u7231\u53BF"
        },
        {
          code: "410823",
          name: "\u6B66\u965F\u53BF"
        },
        {
          code: "410825",
          name: "\u6E29\u53BF"
        },
        {
          code: "410882",
          name: "\u6C81\u9633\u5E02"
        },
        {
          code: "410883",
          name: "\u5B5F\u5DDE\u5E02"
        }
      ],
      [
        {
          code: "410902",
          name: "\u534E\u9F99\u533A"
        },
        {
          code: "410922",
          name: "\u6E05\u4E30\u53BF"
        },
        {
          code: "410923",
          name: "\u5357\u4E50\u53BF"
        },
        {
          code: "410926",
          name: "\u8303\u53BF"
        },
        {
          code: "410927",
          name: "\u53F0\u524D\u53BF"
        },
        {
          code: "410928",
          name: "\u6FEE\u9633\u53BF"
        }
      ],
      [
        {
          code: "411002",
          name: "\u9B4F\u90FD\u533A"
        },
        {
          code: "411003",
          name: "\u5EFA\u5B89\u533A"
        },
        {
          code: "411024",
          name: "\u9122\u9675\u53BF"
        },
        {
          code: "411025",
          name: "\u8944\u57CE\u53BF"
        },
        {
          code: "411081",
          name: "\u79B9\u5DDE\u5E02"
        },
        {
          code: "411082",
          name: "\u957F\u845B\u5E02"
        }
      ],
      [
        {
          code: "411102",
          name: "\u6E90\u6C47\u533A"
        },
        {
          code: "411103",
          name: "\u90FE\u57CE\u533A"
        },
        {
          code: "411104",
          name: "\u53EC\u9675\u533A"
        },
        {
          code: "411121",
          name: "\u821E\u9633\u53BF"
        },
        {
          code: "411122",
          name: "\u4E34\u988D\u53BF"
        }
      ],
      [
        {
          code: "411202",
          name: "\u6E56\u6EE8\u533A"
        },
        {
          code: "411203",
          name: "\u9655\u5DDE\u533A"
        },
        {
          code: "411221",
          name: "\u6E11\u6C60\u53BF"
        },
        {
          code: "411224",
          name: "\u5362\u6C0F\u53BF"
        },
        {
          code: "411281",
          name: "\u4E49\u9A6C\u5E02"
        },
        {
          code: "411282",
          name: "\u7075\u5B9D\u5E02"
        }
      ],
      [
        {
          code: "411302",
          name: "\u5B9B\u57CE\u533A"
        },
        {
          code: "411303",
          name: "\u5367\u9F99\u533A"
        },
        {
          code: "411321",
          name: "\u5357\u53EC\u53BF"
        },
        {
          code: "411322",
          name: "\u65B9\u57CE\u53BF"
        },
        {
          code: "411323",
          name: "\u897F\u5CE1\u53BF"
        },
        {
          code: "411324",
          name: "\u9547\u5E73\u53BF"
        },
        {
          code: "411325",
          name: "\u5185\u4E61\u53BF"
        },
        {
          code: "411326",
          name: "\u6DC5\u5DDD\u53BF"
        },
        {
          code: "411327",
          name: "\u793E\u65D7\u53BF"
        },
        {
          code: "411328",
          name: "\u5510\u6CB3\u53BF"
        },
        {
          code: "411329",
          name: "\u65B0\u91CE\u53BF"
        },
        {
          code: "411330",
          name: "\u6850\u67CF\u53BF"
        },
        {
          code: "411381",
          name: "\u9093\u5DDE\u5E02"
        }
      ],
      [
        {
          code: "411402",
          name: "\u6881\u56ED\u533A"
        },
        {
          code: "411403",
          name: "\u7762\u9633\u533A"
        },
        {
          code: "411421",
          name: "\u6C11\u6743\u53BF"
        },
        {
          code: "411422",
          name: "\u7762\u53BF"
        },
        {
          code: "411423",
          name: "\u5B81\u9675\u53BF"
        },
        {
          code: "411424",
          name: "\u67D8\u57CE\u53BF"
        },
        {
          code: "411425",
          name: "\u865E\u57CE\u53BF"
        },
        {
          code: "411426",
          name: "\u590F\u9091\u53BF"
        },
        {
          code: "411481",
          name: "\u6C38\u57CE\u5E02"
        }
      ],
      [
        {
          code: "411502",
          name: "\u6D49\u6CB3\u533A"
        },
        {
          code: "411503",
          name: "\u5E73\u6865\u533A"
        },
        {
          code: "411521",
          name: "\u7F57\u5C71\u53BF"
        },
        {
          code: "411522",
          name: "\u5149\u5C71\u53BF"
        },
        {
          code: "411523",
          name: "\u65B0\u53BF"
        },
        {
          code: "411524",
          name: "\u5546\u57CE\u53BF"
        },
        {
          code: "411525",
          name: "\u56FA\u59CB\u53BF"
        },
        {
          code: "411526",
          name: "\u6F62\u5DDD\u53BF"
        },
        {
          code: "411527",
          name: "\u6DEE\u6EE8\u53BF"
        },
        {
          code: "411528",
          name: "\u606F\u53BF"
        }
      ],
      [
        {
          code: "411602",
          name: "\u5DDD\u6C47\u533A"
        },
        {
          code: "411621",
          name: "\u6276\u6C9F\u53BF"
        },
        {
          code: "411622",
          name: "\u897F\u534E\u53BF"
        },
        {
          code: "411623",
          name: "\u5546\u6C34\u53BF"
        },
        {
          code: "411624",
          name: "\u6C88\u4E18\u53BF"
        },
        {
          code: "411625",
          name: "\u90F8\u57CE\u53BF"
        },
        {
          code: "411626",
          name: "\u6DEE\u9633\u53BF"
        },
        {
          code: "411627",
          name: "\u592A\u5EB7\u53BF"
        },
        {
          code: "411628",
          name: "\u9E7F\u9091\u53BF"
        },
        {
          code: "411681",
          name: "\u9879\u57CE\u5E02"
        }
      ],
      [
        {
          code: "411702",
          name: "\u9A7F\u57CE\u533A"
        },
        {
          code: "411721",
          name: "\u897F\u5E73\u53BF"
        },
        {
          code: "411722",
          name: "\u4E0A\u8521\u53BF"
        },
        {
          code: "411723",
          name: "\u5E73\u8206\u53BF"
        },
        {
          code: "411724",
          name: "\u6B63\u9633\u53BF"
        },
        {
          code: "411725",
          name: "\u786E\u5C71\u53BF"
        },
        {
          code: "411726",
          name: "\u6CCC\u9633\u53BF"
        },
        {
          code: "411727",
          name: "\u6C5D\u5357\u53BF"
        },
        {
          code: "411728",
          name: "\u9042\u5E73\u53BF"
        },
        {
          code: "411729",
          name: "\u65B0\u8521\u53BF"
        }
      ],
      [
        {
          code: "419001",
          name: "\u6D4E\u6E90\u5E02"
        }
      ]
    ],
    [
      [
        {
          code: "420102",
          name: "\u6C5F\u5CB8\u533A"
        },
        {
          code: "420103",
          name: "\u6C5F\u6C49\u533A"
        },
        {
          code: "420104",
          name: "\u785A\u53E3\u533A"
        },
        {
          code: "420105",
          name: "\u6C49\u9633\u533A"
        },
        {
          code: "420106",
          name: "\u6B66\u660C\u533A"
        },
        {
          code: "420107",
          name: "\u9752\u5C71\u533A"
        },
        {
          code: "420111",
          name: "\u6D2A\u5C71\u533A"
        },
        {
          code: "420112",
          name: "\u4E1C\u897F\u6E56\u533A"
        },
        {
          code: "420113",
          name: "\u6C49\u5357\u533A"
        },
        {
          code: "420114",
          name: "\u8521\u7538\u533A"
        },
        {
          code: "420115",
          name: "\u6C5F\u590F\u533A"
        },
        {
          code: "420116",
          name: "\u9EC4\u9642\u533A"
        },
        {
          code: "420117",
          name: "\u65B0\u6D32\u533A"
        }
      ],
      [
        {
          code: "420202",
          name: "\u9EC4\u77F3\u6E2F\u533A"
        },
        {
          code: "420203",
          name: "\u897F\u585E\u5C71\u533A"
        },
        {
          code: "420204",
          name: "\u4E0B\u9646\u533A"
        },
        {
          code: "420205",
          name: "\u94C1\u5C71\u533A"
        },
        {
          code: "420222",
          name: "\u9633\u65B0\u53BF"
        },
        {
          code: "420281",
          name: "\u5927\u51B6\u5E02"
        }
      ],
      [
        {
          code: "420302",
          name: "\u8305\u7BAD\u533A"
        },
        {
          code: "420303",
          name: "\u5F20\u6E7E\u533A"
        },
        {
          code: "420304",
          name: "\u90E7\u9633\u533A"
        },
        {
          code: "420322",
          name: "\u90E7\u897F\u53BF"
        },
        {
          code: "420323",
          name: "\u7AF9\u5C71\u53BF"
        },
        {
          code: "420324",
          name: "\u7AF9\u6EAA\u53BF"
        },
        {
          code: "420325",
          name: "\u623F\u53BF"
        },
        {
          code: "420381",
          name: "\u4E39\u6C5F\u53E3\u5E02"
        }
      ],
      [
        {
          code: "420502",
          name: "\u897F\u9675\u533A"
        },
        {
          code: "420503",
          name: "\u4F0D\u5BB6\u5C97\u533A"
        },
        {
          code: "420504",
          name: "\u70B9\u519B\u533A"
        },
        {
          code: "420505",
          name: "\u7307\u4EAD\u533A"
        },
        {
          code: "420506",
          name: "\u5937\u9675\u533A"
        },
        {
          code: "420525",
          name: "\u8FDC\u5B89\u53BF"
        },
        {
          code: "420526",
          name: "\u5174\u5C71\u53BF"
        },
        {
          code: "420527",
          name: "\u79ED\u5F52\u53BF"
        },
        {
          code: "420528",
          name: "\u957F\u9633\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "420529",
          name: "\u4E94\u5CF0\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "420581",
          name: "\u5B9C\u90FD\u5E02"
        },
        {
          code: "420582",
          name: "\u5F53\u9633\u5E02"
        },
        {
          code: "420583",
          name: "\u679D\u6C5F\u5E02"
        }
      ],
      [
        {
          code: "420602",
          name: "\u8944\u57CE\u533A"
        },
        {
          code: "420606",
          name: "\u6A0A\u57CE\u533A"
        },
        {
          code: "420607",
          name: "\u8944\u5DDE\u533A"
        },
        {
          code: "420624",
          name: "\u5357\u6F33\u53BF"
        },
        {
          code: "420625",
          name: "\u8C37\u57CE\u53BF"
        },
        {
          code: "420626",
          name: "\u4FDD\u5EB7\u53BF"
        },
        {
          code: "420682",
          name: "\u8001\u6CB3\u53E3\u5E02"
        },
        {
          code: "420683",
          name: "\u67A3\u9633\u5E02"
        },
        {
          code: "420684",
          name: "\u5B9C\u57CE\u5E02"
        }
      ],
      [
        {
          code: "420702",
          name: "\u6881\u5B50\u6E56\u533A"
        },
        {
          code: "420703",
          name: "\u534E\u5BB9\u533A"
        },
        {
          code: "420704",
          name: "\u9102\u57CE\u533A"
        }
      ],
      [
        {
          code: "420802",
          name: "\u4E1C\u5B9D\u533A"
        },
        {
          code: "420804",
          name: "\u6387\u5200\u533A"
        },
        {
          code: "420821",
          name: "\u4EAC\u5C71\u53BF"
        },
        {
          code: "420822",
          name: "\u6C99\u6D0B\u53BF"
        },
        {
          code: "420881",
          name: "\u949F\u7965\u5E02"
        }
      ],
      [
        {
          code: "420902",
          name: "\u5B5D\u5357\u533A"
        },
        {
          code: "420921",
          name: "\u5B5D\u660C\u53BF"
        },
        {
          code: "420922",
          name: "\u5927\u609F\u53BF"
        },
        {
          code: "420923",
          name: "\u4E91\u68A6\u53BF"
        },
        {
          code: "420981",
          name: "\u5E94\u57CE\u5E02"
        },
        {
          code: "420982",
          name: "\u5B89\u9646\u5E02"
        },
        {
          code: "420984",
          name: "\u6C49\u5DDD\u5E02"
        }
      ],
      [
        {
          code: "421002",
          name: "\u6C99\u5E02\u533A"
        },
        {
          code: "421003",
          name: "\u8346\u5DDE\u533A"
        },
        {
          code: "421022",
          name: "\u516C\u5B89\u53BF"
        },
        {
          code: "421023",
          name: "\u76D1\u5229\u53BF"
        },
        {
          code: "421024",
          name: "\u6C5F\u9675\u53BF"
        },
        {
          code: "421081",
          name: "\u77F3\u9996\u5E02"
        },
        {
          code: "421083",
          name: "\u6D2A\u6E56\u5E02"
        },
        {
          code: "421087",
          name: "\u677E\u6ECB\u5E02"
        }
      ],
      [
        {
          code: "421102",
          name: "\u9EC4\u5DDE\u533A"
        },
        {
          code: "421121",
          name: "\u56E2\u98CE\u53BF"
        },
        {
          code: "421122",
          name: "\u7EA2\u5B89\u53BF"
        },
        {
          code: "421123",
          name: "\u7F57\u7530\u53BF"
        },
        {
          code: "421124",
          name: "\u82F1\u5C71\u53BF"
        },
        {
          code: "421125",
          name: "\u6D60\u6C34\u53BF"
        },
        {
          code: "421126",
          name: "\u8572\u6625\u53BF"
        },
        {
          code: "421127",
          name: "\u9EC4\u6885\u53BF"
        },
        {
          code: "421181",
          name: "\u9EBB\u57CE\u5E02"
        },
        {
          code: "421182",
          name: "\u6B66\u7A74\u5E02"
        }
      ],
      [
        {
          code: "421202",
          name: "\u54B8\u5B89\u533A"
        },
        {
          code: "421221",
          name: "\u5609\u9C7C\u53BF"
        },
        {
          code: "421222",
          name: "\u901A\u57CE\u53BF"
        },
        {
          code: "421223",
          name: "\u5D07\u9633\u53BF"
        },
        {
          code: "421224",
          name: "\u901A\u5C71\u53BF"
        },
        {
          code: "421281",
          name: "\u8D64\u58C1\u5E02"
        }
      ],
      [
        {
          code: "421303",
          name: "\u66FE\u90FD\u533A"
        },
        {
          code: "421321",
          name: "\u968F\u53BF"
        },
        {
          code: "421381",
          name: "\u5E7F\u6C34\u5E02"
        }
      ],
      [
        {
          code: "422801",
          name: "\u6069\u65BD\u5E02"
        },
        {
          code: "422802",
          name: "\u5229\u5DDD\u5E02"
        },
        {
          code: "422822",
          name: "\u5EFA\u59CB\u53BF"
        },
        {
          code: "422823",
          name: "\u5DF4\u4E1C\u53BF"
        },
        {
          code: "422825",
          name: "\u5BA3\u6069\u53BF"
        },
        {
          code: "422826",
          name: "\u54B8\u4E30\u53BF"
        },
        {
          code: "422827",
          name: "\u6765\u51E4\u53BF"
        },
        {
          code: "422828",
          name: "\u9E64\u5CF0\u53BF"
        }
      ],
      [
        {
          code: "429004",
          name: "\u4ED9\u6843\u5E02"
        },
        {
          code: "429005",
          name: "\u6F5C\u6C5F\u5E02"
        },
        {
          code: "429006",
          name: "\u5929\u95E8\u5E02"
        },
        {
          code: "429021",
          name: "\u795E\u519C\u67B6\u6797\u533A"
        }
      ]
    ],
    [
      [
        {
          code: "430102",
          name: "\u8299\u84C9\u533A"
        },
        {
          code: "430103",
          name: "\u5929\u5FC3\u533A"
        },
        {
          code: "430104",
          name: "\u5CB3\u9E93\u533A"
        },
        {
          code: "430105",
          name: "\u5F00\u798F\u533A"
        },
        {
          code: "430111",
          name: "\u96E8\u82B1\u533A"
        },
        {
          code: "430112",
          name: "\u671B\u57CE\u533A"
        },
        {
          code: "430121",
          name: "\u957F\u6C99\u53BF"
        },
        {
          code: "430181",
          name: "\u6D4F\u9633\u5E02"
        },
        {
          code: "430182",
          name: "\u5B81\u4E61\u5E02"
        }
      ],
      [
        {
          code: "430202",
          name: "\u8377\u5858\u533A"
        },
        {
          code: "430203",
          name: "\u82A6\u6DDE\u533A"
        },
        {
          code: "430204",
          name: "\u77F3\u5CF0\u533A"
        },
        {
          code: "430211",
          name: "\u5929\u5143\u533A"
        },
        {
          code: "430221",
          name: "\u682A\u6D32\u53BF"
        },
        {
          code: "430223",
          name: "\u6538\u53BF"
        },
        {
          code: "430224",
          name: "\u8336\u9675\u53BF"
        },
        {
          code: "430225",
          name: "\u708E\u9675\u53BF"
        },
        {
          code: "430281",
          name: "\u91B4\u9675\u5E02"
        }
      ],
      [
        {
          code: "430302",
          name: "\u96E8\u6E56\u533A"
        },
        {
          code: "430304",
          name: "\u5CB3\u5858\u533A"
        },
        {
          code: "430321",
          name: "\u6E58\u6F6D\u53BF"
        },
        {
          code: "430381",
          name: "\u6E58\u4E61\u5E02"
        },
        {
          code: "430382",
          name: "\u97F6\u5C71\u5E02"
        }
      ],
      [
        {
          code: "430405",
          name: "\u73E0\u6656\u533A"
        },
        {
          code: "430406",
          name: "\u96C1\u5CF0\u533A"
        },
        {
          code: "430407",
          name: "\u77F3\u9F13\u533A"
        },
        {
          code: "430408",
          name: "\u84B8\u6E58\u533A"
        },
        {
          code: "430412",
          name: "\u5357\u5CB3\u533A"
        },
        {
          code: "430421",
          name: "\u8861\u9633\u53BF"
        },
        {
          code: "430422",
          name: "\u8861\u5357\u53BF"
        },
        {
          code: "430423",
          name: "\u8861\u5C71\u53BF"
        },
        {
          code: "430424",
          name: "\u8861\u4E1C\u53BF"
        },
        {
          code: "430426",
          name: "\u7941\u4E1C\u53BF"
        },
        {
          code: "430481",
          name: "\u8012\u9633\u5E02"
        },
        {
          code: "430482",
          name: "\u5E38\u5B81\u5E02"
        }
      ],
      [
        {
          code: "430502",
          name: "\u53CC\u6E05\u533A"
        },
        {
          code: "430503",
          name: "\u5927\u7965\u533A"
        },
        {
          code: "430511",
          name: "\u5317\u5854\u533A"
        },
        {
          code: "430521",
          name: "\u90B5\u4E1C\u53BF"
        },
        {
          code: "430522",
          name: "\u65B0\u90B5\u53BF"
        },
        {
          code: "430523",
          name: "\u90B5\u9633\u53BF"
        },
        {
          code: "430524",
          name: "\u9686\u56DE\u53BF"
        },
        {
          code: "430525",
          name: "\u6D1E\u53E3\u53BF"
        },
        {
          code: "430527",
          name: "\u7EE5\u5B81\u53BF"
        },
        {
          code: "430528",
          name: "\u65B0\u5B81\u53BF"
        },
        {
          code: "430529",
          name: "\u57CE\u6B65\u82D7\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "430581",
          name: "\u6B66\u5188\u5E02"
        }
      ],
      [
        {
          code: "430602",
          name: "\u5CB3\u9633\u697C\u533A"
        },
        {
          code: "430603",
          name: "\u4E91\u6EAA\u533A"
        },
        {
          code: "430611",
          name: "\u541B\u5C71\u533A"
        },
        {
          code: "430621",
          name: "\u5CB3\u9633\u53BF"
        },
        {
          code: "430623",
          name: "\u534E\u5BB9\u53BF"
        },
        {
          code: "430624",
          name: "\u6E58\u9634\u53BF"
        },
        {
          code: "430626",
          name: "\u5E73\u6C5F\u53BF"
        },
        {
          code: "430681",
          name: "\u6C68\u7F57\u5E02"
        },
        {
          code: "430682",
          name: "\u4E34\u6E58\u5E02"
        }
      ],
      [
        {
          code: "430702",
          name: "\u6B66\u9675\u533A"
        },
        {
          code: "430703",
          name: "\u9F0E\u57CE\u533A"
        },
        {
          code: "430721",
          name: "\u5B89\u4E61\u53BF"
        },
        {
          code: "430722",
          name: "\u6C49\u5BFF\u53BF"
        },
        {
          code: "430723",
          name: "\u6FA7\u53BF"
        },
        {
          code: "430724",
          name: "\u4E34\u6FA7\u53BF"
        },
        {
          code: "430725",
          name: "\u6843\u6E90\u53BF"
        },
        {
          code: "430726",
          name: "\u77F3\u95E8\u53BF"
        },
        {
          code: "430781",
          name: "\u6D25\u5E02\u5E02"
        }
      ],
      [
        {
          code: "430802",
          name: "\u6C38\u5B9A\u533A"
        },
        {
          code: "430811",
          name: "\u6B66\u9675\u6E90\u533A"
        },
        {
          code: "430821",
          name: "\u6148\u5229\u53BF"
        },
        {
          code: "430822",
          name: "\u6851\u690D\u53BF"
        }
      ],
      [
        {
          code: "430902",
          name: "\u8D44\u9633\u533A"
        },
        {
          code: "430903",
          name: "\u8D6B\u5C71\u533A"
        },
        {
          code: "430921",
          name: "\u5357\u53BF"
        },
        {
          code: "430922",
          name: "\u6843\u6C5F\u53BF"
        },
        {
          code: "430923",
          name: "\u5B89\u5316\u53BF"
        },
        {
          code: "430981",
          name: "\u6C85\u6C5F\u5E02"
        }
      ],
      [
        {
          code: "431002",
          name: "\u5317\u6E56\u533A"
        },
        {
          code: "431003",
          name: "\u82CF\u4ED9\u533A"
        },
        {
          code: "431021",
          name: "\u6842\u9633\u53BF"
        },
        {
          code: "431022",
          name: "\u5B9C\u7AE0\u53BF"
        },
        {
          code: "431023",
          name: "\u6C38\u5174\u53BF"
        },
        {
          code: "431024",
          name: "\u5609\u79BE\u53BF"
        },
        {
          code: "431025",
          name: "\u4E34\u6B66\u53BF"
        },
        {
          code: "431026",
          name: "\u6C5D\u57CE\u53BF"
        },
        {
          code: "431027",
          name: "\u6842\u4E1C\u53BF"
        },
        {
          code: "431028",
          name: "\u5B89\u4EC1\u53BF"
        },
        {
          code: "431081",
          name: "\u8D44\u5174\u5E02"
        }
      ],
      [
        {
          code: "431102",
          name: "\u96F6\u9675\u533A"
        },
        {
          code: "431103",
          name: "\u51B7\u6C34\u6EE9\u533A"
        },
        {
          code: "431122",
          name: "\u4E1C\u5B89\u53BF"
        },
        {
          code: "431123",
          name: "\u53CC\u724C\u53BF"
        },
        {
          code: "431124",
          name: "\u9053\u53BF"
        },
        {
          code: "431125",
          name: "\u6C5F\u6C38\u53BF"
        },
        {
          code: "431126",
          name: "\u5B81\u8FDC\u53BF"
        },
        {
          code: "431127",
          name: "\u84DD\u5C71\u53BF"
        },
        {
          code: "431128",
          name: "\u65B0\u7530\u53BF"
        },
        {
          code: "431129",
          name: "\u6C5F\u534E\u7476\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "431181",
          name: "\u7941\u9633\u5E02"
        }
      ],
      [
        {
          code: "431202",
          name: "\u9E64\u57CE\u533A"
        },
        {
          code: "431221",
          name: "\u4E2D\u65B9\u53BF"
        },
        {
          code: "431222",
          name: "\u6C85\u9675\u53BF"
        },
        {
          code: "431223",
          name: "\u8FB0\u6EAA\u53BF"
        },
        {
          code: "431224",
          name: "\u6E86\u6D66\u53BF"
        },
        {
          code: "431225",
          name: "\u4F1A\u540C\u53BF"
        },
        {
          code: "431226",
          name: "\u9EBB\u9633\u82D7\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "431227",
          name: "\u65B0\u6643\u4F97\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "431228",
          name: "\u82B7\u6C5F\u4F97\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "431229",
          name: "\u9756\u5DDE\u82D7\u65CF\u4F97\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "431230",
          name: "\u901A\u9053\u4F97\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "431281",
          name: "\u6D2A\u6C5F\u5E02"
        }
      ],
      [
        {
          code: "431302",
          name: "\u5A04\u661F\u533A"
        },
        {
          code: "431321",
          name: "\u53CC\u5CF0\u53BF"
        },
        {
          code: "431322",
          name: "\u65B0\u5316\u53BF"
        },
        {
          code: "431381",
          name: "\u51B7\u6C34\u6C5F\u5E02"
        },
        {
          code: "431382",
          name: "\u6D9F\u6E90\u5E02"
        }
      ],
      [
        {
          code: "433101",
          name: "\u5409\u9996\u5E02"
        },
        {
          code: "433122",
          name: "\u6CF8\u6EAA\u53BF"
        },
        {
          code: "433123",
          name: "\u51E4\u51F0\u53BF"
        },
        {
          code: "433124",
          name: "\u82B1\u57A3\u53BF"
        },
        {
          code: "433125",
          name: "\u4FDD\u9756\u53BF"
        },
        {
          code: "433126",
          name: "\u53E4\u4E08\u53BF"
        },
        {
          code: "433127",
          name: "\u6C38\u987A\u53BF"
        },
        {
          code: "433130",
          name: "\u9F99\u5C71\u53BF"
        }
      ]
    ],
    [
      [
        {
          code: "440103",
          name: "\u8354\u6E7E\u533A"
        },
        {
          code: "440104",
          name: "\u8D8A\u79C0\u533A"
        },
        {
          code: "440105",
          name: "\u6D77\u73E0\u533A"
        },
        {
          code: "440106",
          name: "\u5929\u6CB3\u533A"
        },
        {
          code: "440111",
          name: "\u767D\u4E91\u533A"
        },
        {
          code: "440112",
          name: "\u9EC4\u57D4\u533A"
        },
        {
          code: "440113",
          name: "\u756A\u79BA\u533A"
        },
        {
          code: "440114",
          name: "\u82B1\u90FD\u533A"
        },
        {
          code: "440115",
          name: "\u5357\u6C99\u533A"
        },
        {
          code: "440117",
          name: "\u4ECE\u5316\u533A"
        },
        {
          code: "440118",
          name: "\u589E\u57CE\u533A"
        }
      ],
      [
        {
          code: "440203",
          name: "\u6B66\u6C5F\u533A"
        },
        {
          code: "440204",
          name: "\u6D48\u6C5F\u533A"
        },
        {
          code: "440205",
          name: "\u66F2\u6C5F\u533A"
        },
        {
          code: "440222",
          name: "\u59CB\u5174\u53BF"
        },
        {
          code: "440224",
          name: "\u4EC1\u5316\u53BF"
        },
        {
          code: "440229",
          name: "\u7FC1\u6E90\u53BF"
        },
        {
          code: "440232",
          name: "\u4E73\u6E90\u7476\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "440233",
          name: "\u65B0\u4E30\u53BF"
        },
        {
          code: "440281",
          name: "\u4E50\u660C\u5E02"
        },
        {
          code: "440282",
          name: "\u5357\u96C4\u5E02"
        }
      ],
      [
        {
          code: "440303",
          name: "\u7F57\u6E56\u533A"
        },
        {
          code: "440304",
          name: "\u798F\u7530\u533A"
        },
        {
          code: "440305",
          name: "\u5357\u5C71\u533A"
        },
        {
          code: "440306",
          name: "\u5B9D\u5B89\u533A"
        },
        {
          code: "440307",
          name: "\u9F99\u5C97\u533A"
        },
        {
          code: "440308",
          name: "\u76D0\u7530\u533A"
        },
        {
          code: "440309",
          name: "\u9F99\u534E\u533A"
        },
        {
          code: "440310",
          name: "\u576A\u5C71\u533A"
        }
      ],
      [
        {
          code: "440402",
          name: "\u9999\u6D32\u533A"
        },
        {
          code: "440403",
          name: "\u6597\u95E8\u533A"
        },
        {
          code: "440404",
          name: "\u91D1\u6E7E\u533A"
        }
      ],
      [
        {
          code: "440507",
          name: "\u9F99\u6E56\u533A"
        },
        {
          code: "440511",
          name: "\u91D1\u5E73\u533A"
        },
        {
          code: "440512",
          name: "\u6FE0\u6C5F\u533A"
        },
        {
          code: "440513",
          name: "\u6F6E\u9633\u533A"
        },
        {
          code: "440514",
          name: "\u6F6E\u5357\u533A"
        },
        {
          code: "440515",
          name: "\u6F84\u6D77\u533A"
        },
        {
          code: "440523",
          name: "\u5357\u6FB3\u53BF"
        }
      ],
      [
        {
          code: "440604",
          name: "\u7985\u57CE\u533A"
        },
        {
          code: "440605",
          name: "\u5357\u6D77\u533A"
        },
        {
          code: "440606",
          name: "\u987A\u5FB7\u533A"
        },
        {
          code: "440607",
          name: "\u4E09\u6C34\u533A"
        },
        {
          code: "440608",
          name: "\u9AD8\u660E\u533A"
        }
      ],
      [
        {
          code: "440703",
          name: "\u84EC\u6C5F\u533A"
        },
        {
          code: "440704",
          name: "\u6C5F\u6D77\u533A"
        },
        {
          code: "440705",
          name: "\u65B0\u4F1A\u533A"
        },
        {
          code: "440781",
          name: "\u53F0\u5C71\u5E02"
        },
        {
          code: "440783",
          name: "\u5F00\u5E73\u5E02"
        },
        {
          code: "440784",
          name: "\u9E64\u5C71\u5E02"
        },
        {
          code: "440785",
          name: "\u6069\u5E73\u5E02"
        }
      ],
      [
        {
          code: "440802",
          name: "\u8D64\u574E\u533A"
        },
        {
          code: "440803",
          name: "\u971E\u5C71\u533A"
        },
        {
          code: "440804",
          name: "\u5761\u5934\u533A"
        },
        {
          code: "440811",
          name: "\u9EBB\u7AE0\u533A"
        },
        {
          code: "440823",
          name: "\u9042\u6EAA\u53BF"
        },
        {
          code: "440825",
          name: "\u5F90\u95FB\u53BF"
        },
        {
          code: "440881",
          name: "\u5EC9\u6C5F\u5E02"
        },
        {
          code: "440882",
          name: "\u96F7\u5DDE\u5E02"
        },
        {
          code: "440883",
          name: "\u5434\u5DDD\u5E02"
        }
      ],
      [
        {
          code: "440902",
          name: "\u8302\u5357\u533A"
        },
        {
          code: "440904",
          name: "\u7535\u767D\u533A"
        },
        {
          code: "440981",
          name: "\u9AD8\u5DDE\u5E02"
        },
        {
          code: "440982",
          name: "\u5316\u5DDE\u5E02"
        },
        {
          code: "440983",
          name: "\u4FE1\u5B9C\u5E02"
        }
      ],
      [
        {
          code: "441202",
          name: "\u7AEF\u5DDE\u533A"
        },
        {
          code: "441203",
          name: "\u9F0E\u6E56\u533A"
        },
        {
          code: "441204",
          name: "\u9AD8\u8981\u533A"
        },
        {
          code: "441223",
          name: "\u5E7F\u5B81\u53BF"
        },
        {
          code: "441224",
          name: "\u6000\u96C6\u53BF"
        },
        {
          code: "441225",
          name: "\u5C01\u5F00\u53BF"
        },
        {
          code: "441226",
          name: "\u5FB7\u5E86\u53BF"
        },
        {
          code: "441284",
          name: "\u56DB\u4F1A\u5E02"
        }
      ],
      [
        {
          code: "441302",
          name: "\u60E0\u57CE\u533A"
        },
        {
          code: "441303",
          name: "\u60E0\u9633\u533A"
        },
        {
          code: "441322",
          name: "\u535A\u7F57\u53BF"
        },
        {
          code: "441323",
          name: "\u60E0\u4E1C\u53BF"
        },
        {
          code: "441324",
          name: "\u9F99\u95E8\u53BF"
        }
      ],
      [
        {
          code: "441402",
          name: "\u6885\u6C5F\u533A"
        },
        {
          code: "441403",
          name: "\u6885\u53BF\u533A"
        },
        {
          code: "441422",
          name: "\u5927\u57D4\u53BF"
        },
        {
          code: "441423",
          name: "\u4E30\u987A\u53BF"
        },
        {
          code: "441424",
          name: "\u4E94\u534E\u53BF"
        },
        {
          code: "441426",
          name: "\u5E73\u8FDC\u53BF"
        },
        {
          code: "441427",
          name: "\u8549\u5CAD\u53BF"
        },
        {
          code: "441481",
          name: "\u5174\u5B81\u5E02"
        }
      ],
      [
        {
          code: "441502",
          name: "\u57CE\u533A"
        },
        {
          code: "441521",
          name: "\u6D77\u4E30\u53BF"
        },
        {
          code: "441523",
          name: "\u9646\u6CB3\u53BF"
        },
        {
          code: "441581",
          name: "\u9646\u4E30\u5E02"
        }
      ],
      [
        {
          code: "441602",
          name: "\u6E90\u57CE\u533A"
        },
        {
          code: "441621",
          name: "\u7D2B\u91D1\u53BF"
        },
        {
          code: "441622",
          name: "\u9F99\u5DDD\u53BF"
        },
        {
          code: "441623",
          name: "\u8FDE\u5E73\u53BF"
        },
        {
          code: "441624",
          name: "\u548C\u5E73\u53BF"
        },
        {
          code: "441625",
          name: "\u4E1C\u6E90\u53BF"
        }
      ],
      [
        {
          code: "441702",
          name: "\u6C5F\u57CE\u533A"
        },
        {
          code: "441704",
          name: "\u9633\u4E1C\u533A"
        },
        {
          code: "441721",
          name: "\u9633\u897F\u53BF"
        },
        {
          code: "441781",
          name: "\u9633\u6625\u5E02"
        }
      ],
      [
        {
          code: "441802",
          name: "\u6E05\u57CE\u533A"
        },
        {
          code: "441803",
          name: "\u6E05\u65B0\u533A"
        },
        {
          code: "441821",
          name: "\u4F5B\u5188\u53BF"
        },
        {
          code: "441823",
          name: "\u9633\u5C71\u53BF"
        },
        {
          code: "441825",
          name: "\u8FDE\u5C71\u58EE\u65CF\u7476\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "441826",
          name: "\u8FDE\u5357\u7476\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "441881",
          name: "\u82F1\u5FB7\u5E02"
        },
        {
          code: "441882",
          name: "\u8FDE\u5DDE\u5E02"
        }
      ],
      [
        {
          code: "441901",
          name: "\u4E1C\u57CE\u8857\u9053"
        },
        {
          code: "441902",
          name: "\u5357\u57CE\u8857\u9053"
        },
        {
          code: "441903",
          name: "\u4E07\u6C5F\u8857\u9053"
        },
        {
          code: "441904",
          name: "\u839E\u57CE\u8857\u9053"
        },
        {
          code: "441905",
          name: "\u77F3\u78A3\u9547"
        },
        {
          code: "441906",
          name: "\u77F3\u9F99\u9547"
        },
        {
          code: "441907",
          name: "\u8336\u5C71\u9547"
        },
        {
          code: "441908",
          name: "\u77F3\u6392\u9547"
        },
        {
          code: "441909",
          name: "\u4F01\u77F3\u9547"
        },
        {
          code: "441910",
          name: "\u6A2A\u6CA5\u9547"
        },
        {
          code: "441911",
          name: "\u6865\u5934\u9547"
        },
        {
          code: "441912",
          name: "\u8C22\u5C97\u9547"
        },
        {
          code: "441913",
          name: "\u4E1C\u5751\u9547"
        },
        {
          code: "441914",
          name: "\u5E38\u5E73\u9547"
        },
        {
          code: "441915",
          name: "\u5BEE\u6B65\u9547"
        },
        {
          code: "441916",
          name: "\u6A1F\u6728\u5934\u9547"
        },
        {
          code: "441917",
          name: "\u5927\u6717\u9547"
        },
        {
          code: "441918",
          name: "\u9EC4\u6C5F\u9547"
        },
        {
          code: "441919",
          name: "\u6E05\u6EAA\u9547"
        },
        {
          code: "441920",
          name: "\u5858\u53A6\u9547"
        },
        {
          code: "441921",
          name: "\u51E4\u5C97\u9547"
        },
        {
          code: "441922",
          name: "\u5927\u5CAD\u5C71\u9547"
        },
        {
          code: "441923",
          name: "\u957F\u5B89\u9547"
        },
        {
          code: "441924",
          name: "\u864E\u95E8\u9547"
        },
        {
          code: "441925",
          name: "\u539A\u8857\u9547"
        },
        {
          code: "441926",
          name: "\u6C99\u7530\u9547"
        },
        {
          code: "441927",
          name: "\u9053\u6ED8\u9547"
        },
        {
          code: "441928",
          name: "\u6D2A\u6885\u9547"
        },
        {
          code: "441929",
          name: "\u9EBB\u6D8C\u9547"
        },
        {
          code: "441930",
          name: "\u671B\u725B\u58A9\u9547"
        },
        {
          code: "441931",
          name: "\u4E2D\u5802\u9547"
        },
        {
          code: "441932",
          name: "\u9AD8\u57D7\u9547"
        },
        {
          code: "441933",
          name: "\u677E\u5C71\u6E56\u7BA1\u59D4\u4F1A"
        },
        {
          code: "441934",
          name: "\u864E\u95E8\u6E2F\u7BA1\u59D4\u4F1A"
        },
        {
          code: "441935",
          name: "\u4E1C\u839E\u751F\u6001\u56ED"
        }
      ],
      [
        {
          code: "442001",
          name: "\u77F3\u5C90\u533A\u8857\u9053"
        },
        {
          code: "442002",
          name: "\u4E1C\u533A\u8857\u9053"
        },
        {
          code: "442003",
          name: "\u706B\u70AC\u5F00\u53D1\u533A"
        },
        {
          code: "442004",
          name: "\u897F\u533A\u8857\u9053"
        },
        {
          code: "442005",
          name: "\u5357\u533A\u8857\u9053"
        },
        {
          code: "442006",
          name: "\u4E94\u6842\u5C71\u8857\u9053"
        },
        {
          code: "442007",
          name: "\u5C0F\u6984\u9547"
        },
        {
          code: "442008",
          name: "\u9EC4\u5703\u9547"
        },
        {
          code: "442009",
          name: "\u6C11\u4F17\u9547"
        },
        {
          code: "442010",
          name: "\u4E1C\u51E4\u9547"
        },
        {
          code: "442011",
          name: "\u4E1C\u5347\u9547"
        },
        {
          code: "442012",
          name: "\u53E4\u9547\u9547"
        },
        {
          code: "442013",
          name: "\u6C99\u6EAA\u9547"
        },
        {
          code: "442014",
          name: "\u5766\u6D32\u9547"
        },
        {
          code: "442015",
          name: "\u6E2F\u53E3\u9547"
        },
        {
          code: "442016",
          name: "\u4E09\u89D2\u9547"
        },
        {
          code: "442017",
          name: "\u6A2A\u680F\u9547"
        },
        {
          code: "442018",
          name: "\u5357\u5934\u9547"
        },
        {
          code: "442019",
          name: "\u961C\u6C99\u9547"
        },
        {
          code: "442020",
          name: "\u5357\u6717\u9547"
        },
        {
          code: "442021",
          name: "\u4E09\u4E61\u9547"
        },
        {
          code: "442022",
          name: "\u677F\u8299\u9547"
        },
        {
          code: "442023",
          name: "\u5927\u6D8C\u9547"
        },
        {
          code: "442024",
          name: "\u795E\u6E7E\u9547"
        }
      ],
      [
        {
          code: "445102",
          name: "\u6E58\u6865\u533A"
        },
        {
          code: "445103",
          name: "\u6F6E\u5B89\u533A"
        },
        {
          code: "445122",
          name: "\u9976\u5E73\u53BF"
        }
      ],
      [
        {
          code: "445202",
          name: "\u6995\u57CE\u533A"
        },
        {
          code: "445203",
          name: "\u63ED\u4E1C\u533A"
        },
        {
          code: "445222",
          name: "\u63ED\u897F\u53BF"
        },
        {
          code: "445224",
          name: "\u60E0\u6765\u53BF"
        },
        {
          code: "445281",
          name: "\u666E\u5B81\u5E02"
        }
      ],
      [
        {
          code: "445302",
          name: "\u4E91\u57CE\u533A"
        },
        {
          code: "445303",
          name: "\u4E91\u5B89\u533A"
        },
        {
          code: "445321",
          name: "\u65B0\u5174\u53BF"
        },
        {
          code: "445322",
          name: "\u90C1\u5357\u53BF"
        },
        {
          code: "445381",
          name: "\u7F57\u5B9A\u5E02"
        }
      ]
    ],
    [
      [
        {
          code: "450102",
          name: "\u5174\u5B81\u533A"
        },
        {
          code: "450103",
          name: "\u9752\u79C0\u533A"
        },
        {
          code: "450105",
          name: "\u6C5F\u5357\u533A"
        },
        {
          code: "450107",
          name: "\u897F\u4E61\u5858\u533A"
        },
        {
          code: "450108",
          name: "\u826F\u5E86\u533A"
        },
        {
          code: "450109",
          name: "\u9095\u5B81\u533A"
        },
        {
          code: "450110",
          name: "\u6B66\u9E23\u533A"
        },
        {
          code: "450123",
          name: "\u9686\u5B89\u53BF"
        },
        {
          code: "450124",
          name: "\u9A6C\u5C71\u53BF"
        },
        {
          code: "450125",
          name: "\u4E0A\u6797\u53BF"
        },
        {
          code: "450126",
          name: "\u5BBE\u9633\u53BF"
        },
        {
          code: "450181",
          name: "\u6A2A\u5DDE\u5E02"
        }
      ],
      [
        {
          code: "450202",
          name: "\u57CE\u4E2D\u533A"
        },
        {
          code: "450203",
          name: "\u9C7C\u5CF0\u533A"
        },
        {
          code: "450204",
          name: "\u67F3\u5357\u533A"
        },
        {
          code: "450205",
          name: "\u67F3\u5317\u533A"
        },
        {
          code: "450206",
          name: "\u67F3\u6C5F\u533A"
        },
        {
          code: "450222",
          name: "\u67F3\u57CE\u53BF"
        },
        {
          code: "450223",
          name: "\u9E7F\u5BE8\u53BF"
        },
        {
          code: "450224",
          name: "\u878D\u5B89\u53BF"
        },
        {
          code: "450225",
          name: "\u878D\u6C34\u82D7\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "450226",
          name: "\u4E09\u6C5F\u4F97\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "450302",
          name: "\u79C0\u5CF0\u533A"
        },
        {
          code: "450303",
          name: "\u53E0\u5F69\u533A"
        },
        {
          code: "450304",
          name: "\u8C61\u5C71\u533A"
        },
        {
          code: "450305",
          name: "\u4E03\u661F\u533A"
        },
        {
          code: "450311",
          name: "\u96C1\u5C71\u533A"
        },
        {
          code: "450312",
          name: "\u4E34\u6842\u533A"
        },
        {
          code: "450321",
          name: "\u9633\u6714\u53BF"
        },
        {
          code: "450323",
          name: "\u7075\u5DDD\u53BF"
        },
        {
          code: "450324",
          name: "\u5168\u5DDE\u53BF"
        },
        {
          code: "450325",
          name: "\u5174\u5B89\u53BF"
        },
        {
          code: "450326",
          name: "\u6C38\u798F\u53BF"
        },
        {
          code: "450327",
          name: "\u704C\u9633\u53BF"
        },
        {
          code: "450328",
          name: "\u9F99\u80DC\u5404\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "450329",
          name: "\u8D44\u6E90\u53BF"
        },
        {
          code: "450330",
          name: "\u5E73\u4E50\u53BF"
        },
        {
          code: "450331",
          name: "\u8354\u6D66\u53BF"
        },
        {
          code: "450332",
          name: "\u606D\u57CE\u7476\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "450403",
          name: "\u4E07\u79C0\u533A"
        },
        {
          code: "450405",
          name: "\u957F\u6D32\u533A"
        },
        {
          code: "450406",
          name: "\u9F99\u5729\u533A"
        },
        {
          code: "450421",
          name: "\u82CD\u68A7\u53BF"
        },
        {
          code: "450422",
          name: "\u85E4\u53BF"
        },
        {
          code: "450423",
          name: "\u8499\u5C71\u53BF"
        },
        {
          code: "450481",
          name: "\u5C91\u6EAA\u5E02"
        }
      ],
      [
        {
          code: "450502",
          name: "\u6D77\u57CE\u533A"
        },
        {
          code: "450503",
          name: "\u94F6\u6D77\u533A"
        },
        {
          code: "450512",
          name: "\u94C1\u5C71\u6E2F\u533A"
        },
        {
          code: "450521",
          name: "\u5408\u6D66\u53BF"
        }
      ],
      [
        {
          code: "450602",
          name: "\u6E2F\u53E3\u533A"
        },
        {
          code: "450603",
          name: "\u9632\u57CE\u533A"
        },
        {
          code: "450621",
          name: "\u4E0A\u601D\u53BF"
        },
        {
          code: "450681",
          name: "\u4E1C\u5174\u5E02"
        }
      ],
      [
        {
          code: "450702",
          name: "\u94A6\u5357\u533A"
        },
        {
          code: "450703",
          name: "\u94A6\u5317\u533A"
        },
        {
          code: "450721",
          name: "\u7075\u5C71\u53BF"
        },
        {
          code: "450722",
          name: "\u6D66\u5317\u53BF"
        }
      ],
      [
        {
          code: "450802",
          name: "\u6E2F\u5317\u533A"
        },
        {
          code: "450803",
          name: "\u6E2F\u5357\u533A"
        },
        {
          code: "450804",
          name: "\u8983\u5858\u533A"
        },
        {
          code: "450821",
          name: "\u5E73\u5357\u53BF"
        },
        {
          code: "450881",
          name: "\u6842\u5E73\u5E02"
        }
      ],
      [
        {
          code: "450902",
          name: "\u7389\u5DDE\u533A"
        },
        {
          code: "450903",
          name: "\u798F\u7EF5\u533A"
        },
        {
          code: "450921",
          name: "\u5BB9\u53BF"
        },
        {
          code: "450922",
          name: "\u9646\u5DDD\u53BF"
        },
        {
          code: "450923",
          name: "\u535A\u767D\u53BF"
        },
        {
          code: "450924",
          name: "\u5174\u4E1A\u53BF"
        },
        {
          code: "450981",
          name: "\u5317\u6D41\u5E02"
        }
      ],
      [
        {
          code: "451002",
          name: "\u53F3\u6C5F\u533A"
        },
        {
          code: "451021",
          name: "\u7530\u9633\u53BF"
        },
        {
          code: "451022",
          name: "\u7530\u4E1C\u53BF"
        },
        {
          code: "451023",
          name: "\u5E73\u679C\u53BF"
        },
        {
          code: "451024",
          name: "\u5FB7\u4FDD\u53BF"
        },
        {
          code: "451026",
          name: "\u90A3\u5761\u53BF"
        },
        {
          code: "451027",
          name: "\u51CC\u4E91\u53BF"
        },
        {
          code: "451028",
          name: "\u4E50\u4E1A\u53BF"
        },
        {
          code: "451029",
          name: "\u7530\u6797\u53BF"
        },
        {
          code: "451030",
          name: "\u897F\u6797\u53BF"
        },
        {
          code: "451031",
          name: "\u9686\u6797\u5404\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "451081",
          name: "\u9756\u897F\u5E02"
        }
      ],
      [
        {
          code: "451102",
          name: "\u516B\u6B65\u533A"
        },
        {
          code: "451103",
          name: "\u5E73\u6842\u533A"
        },
        {
          code: "451121",
          name: "\u662D\u5E73\u53BF"
        },
        {
          code: "451122",
          name: "\u949F\u5C71\u53BF"
        },
        {
          code: "451123",
          name: "\u5BCC\u5DDD\u7476\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "451202",
          name: "\u91D1\u57CE\u6C5F\u533A"
        },
        {
          code: "451203",
          name: "\u5B9C\u5DDE\u533A"
        },
        {
          code: "451221",
          name: "\u5357\u4E39\u53BF"
        },
        {
          code: "451222",
          name: "\u5929\u5CE8\u53BF"
        },
        {
          code: "451223",
          name: "\u51E4\u5C71\u53BF"
        },
        {
          code: "451224",
          name: "\u4E1C\u5170\u53BF"
        },
        {
          code: "451225",
          name: "\u7F57\u57CE\u4EEB\u4F6C\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "451226",
          name: "\u73AF\u6C5F\u6BDB\u5357\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "451227",
          name: "\u5DF4\u9A6C\u7476\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "451228",
          name: "\u90FD\u5B89\u7476\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "451229",
          name: "\u5927\u5316\u7476\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "451302",
          name: "\u5174\u5BBE\u533A"
        },
        {
          code: "451321",
          name: "\u5FFB\u57CE\u53BF"
        },
        {
          code: "451322",
          name: "\u8C61\u5DDE\u53BF"
        },
        {
          code: "451323",
          name: "\u6B66\u5BA3\u53BF"
        },
        {
          code: "451324",
          name: "\u91D1\u79C0\u7476\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "451381",
          name: "\u5408\u5C71\u5E02"
        }
      ],
      [
        {
          code: "451402",
          name: "\u6C5F\u5DDE\u533A"
        },
        {
          code: "451421",
          name: "\u6276\u7EE5\u53BF"
        },
        {
          code: "451422",
          name: "\u5B81\u660E\u53BF"
        },
        {
          code: "451423",
          name: "\u9F99\u5DDE\u53BF"
        },
        {
          code: "451424",
          name: "\u5927\u65B0\u53BF"
        },
        {
          code: "451425",
          name: "\u5929\u7B49\u53BF"
        },
        {
          code: "451481",
          name: "\u51ED\u7965\u5E02"
        }
      ]
    ],
    [
      [
        {
          code: "460105",
          name: "\u79C0\u82F1\u533A"
        },
        {
          code: "460106",
          name: "\u9F99\u534E\u533A"
        },
        {
          code: "460107",
          name: "\u743C\u5C71\u533A"
        },
        {
          code: "460108",
          name: "\u7F8E\u5170\u533A"
        }
      ],
      [
        {
          code: "460202",
          name: "\u6D77\u68E0\u533A"
        },
        {
          code: "460203",
          name: "\u5409\u9633\u533A"
        },
        {
          code: "460204",
          name: "\u5929\u6DAF\u533A"
        },
        {
          code: "460205",
          name: "\u5D16\u5DDE\u533A"
        }
      ],
      [
        {
          code: "460321",
          name: "\u897F\u6C99\u7FA4\u5C9B"
        },
        {
          code: "460322",
          name: "\u5357\u6C99\u7FA4\u5C9B"
        },
        {
          code: "460323",
          name: "\u4E2D\u6C99\u7FA4\u5C9B\u7684\u5C9B\u7901\u53CA\u5176\u6D77\u57DF"
        }
      ],
      [
        {
          code: "460401",
          name: "\u90A3\u5927\u9547"
        },
        {
          code: "460402",
          name: "\u548C\u5E86\u9547"
        },
        {
          code: "460403",
          name: "\u5357\u4E30\u9547"
        },
        {
          code: "460404",
          name: "\u5927\u6210\u9547"
        },
        {
          code: "460405",
          name: "\u96C5\u661F\u9547"
        },
        {
          code: "460406",
          name: "\u5170\u6D0B\u9547"
        },
        {
          code: "460407",
          name: "\u5149\u6751\u9547"
        },
        {
          code: "460408",
          name: "\u6728\u68E0\u9547"
        },
        {
          code: "460409",
          name: "\u6D77\u5934\u9547"
        },
        {
          code: "460410",
          name: "\u5CE8\u8513\u9547"
        },
        {
          code: "460411",
          name: "\u4E09\u90FD\u9547"
        },
        {
          code: "460412",
          name: "\u738B\u4E94\u9547"
        },
        {
          code: "460413",
          name: "\u767D\u9A6C\u4E95\u9547"
        },
        {
          code: "460414",
          name: "\u4E2D\u548C\u9547"
        },
        {
          code: "460415",
          name: "\u6392\u6D66\u9547"
        },
        {
          code: "460416",
          name: "\u4E1C\u6210\u9547"
        },
        {
          code: "460417",
          name: "\u65B0\u5DDE\u9547"
        },
        {
          code: "460418",
          name: "\u56FD\u8425\u897F\u57F9\u519C\u573A"
        },
        {
          code: "460419",
          name: "\u56FD\u8425\u897F\u8054\u519C\u573A"
        },
        {
          code: "460420",
          name: "\u56FD\u8425\u84DD\u6D0B\u519C\u573A"
        },
        {
          code: "460421",
          name: "\u56FD\u8425\u516B\u4E00\u519C\u573A"
        },
        {
          code: "460422",
          name: "\u6D0B\u6D66\u7ECF\u6D4E\u5F00\u53D1\u533A"
        },
        {
          code: "460423",
          name: "\u534E\u5357\u70ED\u4F5C\u5B66\u9662"
        },
        {
          code: "460424",
          name: "\u7EA2\u5CAD\u519C\u573A"
        }
      ],
      [
        {
          code: "469001",
          name: "\u4E94\u6307\u5C71\u5E02"
        },
        {
          code: "469002",
          name: "\u743C\u6D77\u5E02"
        },
        {
          code: "469005",
          name: "\u6587\u660C\u5E02"
        },
        {
          code: "469006",
          name: "\u4E07\u5B81\u5E02"
        },
        {
          code: "469007",
          name: "\u4E1C\u65B9\u5E02"
        },
        {
          code: "469021",
          name: "\u5B9A\u5B89\u53BF"
        },
        {
          code: "469022",
          name: "\u5C6F\u660C\u53BF"
        },
        {
          code: "469023",
          name: "\u6F84\u8FC8\u53BF"
        },
        {
          code: "469024",
          name: "\u4E34\u9AD8\u53BF"
        },
        {
          code: "469025",
          name: "\u767D\u6C99\u9ECE\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "469026",
          name: "\u660C\u6C5F\u9ECE\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "469027",
          name: "\u4E50\u4E1C\u9ECE\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "469028",
          name: "\u9675\u6C34\u9ECE\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "469029",
          name: "\u4FDD\u4EAD\u9ECE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "469030",
          name: "\u743C\u4E2D\u9ECE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF"
        }
      ]
    ],
    [
      [
        {
          code: "500101",
          name: "\u4E07\u5DDE\u533A"
        },
        {
          code: "500102",
          name: "\u6DAA\u9675\u533A"
        },
        {
          code: "500103",
          name: "\u6E1D\u4E2D\u533A"
        },
        {
          code: "500104",
          name: "\u5927\u6E21\u53E3\u533A"
        },
        {
          code: "500105",
          name: "\u6C5F\u5317\u533A"
        },
        {
          code: "500106",
          name: "\u6C99\u576A\u575D\u533A"
        },
        {
          code: "500107",
          name: "\u4E5D\u9F99\u5761\u533A"
        },
        {
          code: "500108",
          name: "\u5357\u5CB8\u533A"
        },
        {
          code: "500109",
          name: "\u5317\u789A\u533A"
        },
        {
          code: "500110",
          name: "\u7DA6\u6C5F\u533A"
        },
        {
          code: "500111",
          name: "\u5927\u8DB3\u533A"
        },
        {
          code: "500112",
          name: "\u6E1D\u5317\u533A"
        },
        {
          code: "500113",
          name: "\u5DF4\u5357\u533A"
        },
        {
          code: "500114",
          name: "\u9ED4\u6C5F\u533A"
        },
        {
          code: "500115",
          name: "\u957F\u5BFF\u533A"
        },
        {
          code: "500116",
          name: "\u6C5F\u6D25\u533A"
        },
        {
          code: "500117",
          name: "\u5408\u5DDD\u533A"
        },
        {
          code: "500118",
          name: "\u6C38\u5DDD\u533A"
        },
        {
          code: "500119",
          name: "\u5357\u5DDD\u533A"
        },
        {
          code: "500120",
          name: "\u74A7\u5C71\u533A"
        },
        {
          code: "500151",
          name: "\u94DC\u6881\u533A"
        },
        {
          code: "500152",
          name: "\u6F7C\u5357\u533A"
        },
        {
          code: "500153",
          name: "\u8363\u660C\u533A"
        },
        {
          code: "500154",
          name: "\u5F00\u5DDE\u533A"
        },
        {
          code: "500155",
          name: "\u6881\u5E73\u533A"
        },
        {
          code: "500156",
          name: "\u6B66\u9686\u533A"
        }
      ],
      [
        {
          code: "500229",
          name: "\u57CE\u53E3\u53BF"
        },
        {
          code: "500230",
          name: "\u4E30\u90FD\u53BF"
        },
        {
          code: "500231",
          name: "\u57AB\u6C5F\u53BF"
        },
        {
          code: "500233",
          name: "\u5FE0\u53BF"
        },
        {
          code: "500235",
          name: "\u4E91\u9633\u53BF"
        },
        {
          code: "500236",
          name: "\u5949\u8282\u53BF"
        },
        {
          code: "500237",
          name: "\u5DEB\u5C71\u53BF"
        },
        {
          code: "500238",
          name: "\u5DEB\u6EAA\u53BF"
        },
        {
          code: "500240",
          name: "\u77F3\u67F1\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "500241",
          name: "\u79C0\u5C71\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "500242",
          name: "\u9149\u9633\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "500243",
          name: "\u5F6D\u6C34\u82D7\u65CF\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF"
        }
      ]
    ],
    [
      [
        {
          code: "510104",
          name: "\u9526\u6C5F\u533A"
        },
        {
          code: "510105",
          name: "\u9752\u7F8A\u533A"
        },
        {
          code: "510106",
          name: "\u91D1\u725B\u533A"
        },
        {
          code: "510107",
          name: "\u6B66\u4FAF\u533A"
        },
        {
          code: "510108",
          name: "\u6210\u534E\u533A"
        },
        {
          code: "510112",
          name: "\u9F99\u6CC9\u9A7F\u533A"
        },
        {
          code: "510113",
          name: "\u9752\u767D\u6C5F\u533A"
        },
        {
          code: "510114",
          name: "\u65B0\u90FD\u533A"
        },
        {
          code: "510115",
          name: "\u6E29\u6C5F\u533A"
        },
        {
          code: "510116",
          name: "\u53CC\u6D41\u533A"
        },
        {
          code: "510117",
          name: "\u90EB\u90FD\u533A"
        },
        {
          code: "510121",
          name: "\u91D1\u5802\u53BF"
        },
        {
          code: "510129",
          name: "\u5927\u9091\u53BF"
        },
        {
          code: "510131",
          name: "\u84B2\u6C5F\u53BF"
        },
        {
          code: "510132",
          name: "\u65B0\u6D25\u53BF"
        },
        {
          code: "510181",
          name: "\u90FD\u6C5F\u5830\u5E02"
        },
        {
          code: "510182",
          name: "\u5F6D\u5DDE\u5E02"
        },
        {
          code: "510183",
          name: "\u909B\u5D03\u5E02"
        },
        {
          code: "510184",
          name: "\u5D07\u5DDE\u5E02"
        },
        {
          code: "510185",
          name: "\u7B80\u9633\u5E02"
        }
      ],
      [
        {
          code: "510302",
          name: "\u81EA\u6D41\u4E95\u533A"
        },
        {
          code: "510303",
          name: "\u8D21\u4E95\u533A"
        },
        {
          code: "510304",
          name: "\u5927\u5B89\u533A"
        },
        {
          code: "510311",
          name: "\u6CBF\u6EE9\u533A"
        },
        {
          code: "510321",
          name: "\u8363\u53BF"
        },
        {
          code: "510322",
          name: "\u5BCC\u987A\u53BF"
        }
      ],
      [
        {
          code: "510402",
          name: "\u4E1C\u533A"
        },
        {
          code: "510403",
          name: "\u897F\u533A"
        },
        {
          code: "510411",
          name: "\u4EC1\u548C\u533A"
        },
        {
          code: "510421",
          name: "\u7C73\u6613\u53BF"
        },
        {
          code: "510422",
          name: "\u76D0\u8FB9\u53BF"
        }
      ],
      [
        {
          code: "510502",
          name: "\u6C5F\u9633\u533A"
        },
        {
          code: "510503",
          name: "\u7EB3\u6EAA\u533A"
        },
        {
          code: "510504",
          name: "\u9F99\u9A6C\u6F6D\u533A"
        },
        {
          code: "510521",
          name: "\u6CF8\u53BF"
        },
        {
          code: "510522",
          name: "\u5408\u6C5F\u53BF"
        },
        {
          code: "510524",
          name: "\u53D9\u6C38\u53BF"
        },
        {
          code: "510525",
          name: "\u53E4\u853A\u53BF"
        }
      ],
      [
        {
          code: "510603",
          name: "\u65CC\u9633\u533A"
        },
        {
          code: "510604",
          name: "\u7F57\u6C5F\u533A"
        },
        {
          code: "510623",
          name: "\u4E2D\u6C5F\u53BF"
        },
        {
          code: "510681",
          name: "\u5E7F\u6C49\u5E02"
        },
        {
          code: "510682",
          name: "\u4EC0\u90A1\u5E02"
        },
        {
          code: "510683",
          name: "\u7EF5\u7AF9\u5E02"
        }
      ],
      [
        {
          code: "510703",
          name: "\u6DAA\u57CE\u533A"
        },
        {
          code: "510704",
          name: "\u6E38\u4ED9\u533A"
        },
        {
          code: "510705",
          name: "\u5B89\u5DDE\u533A"
        },
        {
          code: "510722",
          name: "\u4E09\u53F0\u53BF"
        },
        {
          code: "510723",
          name: "\u76D0\u4EAD\u53BF"
        },
        {
          code: "510725",
          name: "\u6893\u6F7C\u53BF"
        },
        {
          code: "510726",
          name: "\u5317\u5DDD\u7F8C\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "510727",
          name: "\u5E73\u6B66\u53BF"
        },
        {
          code: "510781",
          name: "\u6C5F\u6CB9\u5E02"
        }
      ],
      [
        {
          code: "510802",
          name: "\u5229\u5DDE\u533A"
        },
        {
          code: "510811",
          name: "\u662D\u5316\u533A"
        },
        {
          code: "510812",
          name: "\u671D\u5929\u533A"
        },
        {
          code: "510821",
          name: "\u65FA\u82CD\u53BF"
        },
        {
          code: "510822",
          name: "\u9752\u5DDD\u53BF"
        },
        {
          code: "510823",
          name: "\u5251\u9601\u53BF"
        },
        {
          code: "510824",
          name: "\u82CD\u6EAA\u53BF"
        }
      ],
      [
        {
          code: "510903",
          name: "\u8239\u5C71\u533A"
        },
        {
          code: "510904",
          name: "\u5B89\u5C45\u533A"
        },
        {
          code: "510921",
          name: "\u84EC\u6EAA\u53BF"
        },
        {
          code: "510922",
          name: "\u5C04\u6D2A\u53BF"
        },
        {
          code: "510923",
          name: "\u5927\u82F1\u53BF"
        }
      ],
      [
        {
          code: "511002",
          name: "\u5E02\u4E2D\u533A"
        },
        {
          code: "511011",
          name: "\u4E1C\u5174\u533A"
        },
        {
          code: "511024",
          name: "\u5A01\u8FDC\u53BF"
        },
        {
          code: "511025",
          name: "\u8D44\u4E2D\u53BF"
        },
        {
          code: "511083",
          name: "\u9686\u660C\u5E02"
        }
      ],
      [
        {
          code: "511102",
          name: "\u5E02\u4E2D\u533A"
        },
        {
          code: "511111",
          name: "\u6C99\u6E7E\u533A"
        },
        {
          code: "511112",
          name: "\u4E94\u901A\u6865\u533A"
        },
        {
          code: "511113",
          name: "\u91D1\u53E3\u6CB3\u533A"
        },
        {
          code: "511123",
          name: "\u728D\u4E3A\u53BF"
        },
        {
          code: "511124",
          name: "\u4E95\u7814\u53BF"
        },
        {
          code: "511126",
          name: "\u5939\u6C5F\u53BF"
        },
        {
          code: "511129",
          name: "\u6C90\u5DDD\u53BF"
        },
        {
          code: "511132",
          name: "\u5CE8\u8FB9\u5F5D\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "511133",
          name: "\u9A6C\u8FB9\u5F5D\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "511181",
          name: "\u5CE8\u7709\u5C71\u5E02"
        }
      ],
      [
        {
          code: "511302",
          name: "\u987A\u5E86\u533A"
        },
        {
          code: "511303",
          name: "\u9AD8\u576A\u533A"
        },
        {
          code: "511304",
          name: "\u5609\u9675\u533A"
        },
        {
          code: "511321",
          name: "\u5357\u90E8\u53BF"
        },
        {
          code: "511322",
          name: "\u8425\u5C71\u53BF"
        },
        {
          code: "511323",
          name: "\u84EC\u5B89\u53BF"
        },
        {
          code: "511324",
          name: "\u4EEA\u9647\u53BF"
        },
        {
          code: "511325",
          name: "\u897F\u5145\u53BF"
        },
        {
          code: "511381",
          name: "\u9606\u4E2D\u5E02"
        }
      ],
      [
        {
          code: "511402",
          name: "\u4E1C\u5761\u533A"
        },
        {
          code: "511403",
          name: "\u5F6D\u5C71\u533A"
        },
        {
          code: "511421",
          name: "\u4EC1\u5BFF\u53BF"
        },
        {
          code: "511423",
          name: "\u6D2A\u96C5\u53BF"
        },
        {
          code: "511424",
          name: "\u4E39\u68F1\u53BF"
        },
        {
          code: "511425",
          name: "\u9752\u795E\u53BF"
        }
      ],
      [
        {
          code: "511502",
          name: "\u7FE0\u5C4F\u533A"
        },
        {
          code: "511503",
          name: "\u5357\u6EAA\u533A"
        },
        {
          code: "511521",
          name: "\u5B9C\u5BBE\u53BF"
        },
        {
          code: "511523",
          name: "\u6C5F\u5B89\u53BF"
        },
        {
          code: "511524",
          name: "\u957F\u5B81\u53BF"
        },
        {
          code: "511525",
          name: "\u9AD8\u53BF"
        },
        {
          code: "511526",
          name: "\u73D9\u53BF"
        },
        {
          code: "511527",
          name: "\u7B60\u8FDE\u53BF"
        },
        {
          code: "511528",
          name: "\u5174\u6587\u53BF"
        },
        {
          code: "511529",
          name: "\u5C4F\u5C71\u53BF"
        }
      ],
      [
        {
          code: "511602",
          name: "\u5E7F\u5B89\u533A"
        },
        {
          code: "511603",
          name: "\u524D\u950B\u533A"
        },
        {
          code: "511621",
          name: "\u5CB3\u6C60\u53BF"
        },
        {
          code: "511622",
          name: "\u6B66\u80DC\u53BF"
        },
        {
          code: "511623",
          name: "\u90BB\u6C34\u53BF"
        },
        {
          code: "511681",
          name: "\u534E\u84E5\u5E02"
        }
      ],
      [
        {
          code: "511702",
          name: "\u901A\u5DDD\u533A"
        },
        {
          code: "511703",
          name: "\u8FBE\u5DDD\u533A"
        },
        {
          code: "511722",
          name: "\u5BA3\u6C49\u53BF"
        },
        {
          code: "511723",
          name: "\u5F00\u6C5F\u53BF"
        },
        {
          code: "511724",
          name: "\u5927\u7AF9\u53BF"
        },
        {
          code: "511725",
          name: "\u6E20\u53BF"
        },
        {
          code: "511781",
          name: "\u4E07\u6E90\u5E02"
        }
      ],
      [
        {
          code: "511802",
          name: "\u96E8\u57CE\u533A"
        },
        {
          code: "511803",
          name: "\u540D\u5C71\u533A"
        },
        {
          code: "511822",
          name: "\u8365\u7ECF\u53BF"
        },
        {
          code: "511823",
          name: "\u6C49\u6E90\u53BF"
        },
        {
          code: "511824",
          name: "\u77F3\u68C9\u53BF"
        },
        {
          code: "511825",
          name: "\u5929\u5168\u53BF"
        },
        {
          code: "511826",
          name: "\u82A6\u5C71\u53BF"
        },
        {
          code: "511827",
          name: "\u5B9D\u5174\u53BF"
        }
      ],
      [
        {
          code: "511902",
          name: "\u5DF4\u5DDE\u533A"
        },
        {
          code: "511903",
          name: "\u6069\u9633\u533A"
        },
        {
          code: "511921",
          name: "\u901A\u6C5F\u53BF"
        },
        {
          code: "511922",
          name: "\u5357\u6C5F\u53BF"
        },
        {
          code: "511923",
          name: "\u5E73\u660C\u53BF"
        }
      ],
      [
        {
          code: "512002",
          name: "\u96C1\u6C5F\u533A"
        },
        {
          code: "512021",
          name: "\u5B89\u5CB3\u53BF"
        },
        {
          code: "512022",
          name: "\u4E50\u81F3\u53BF"
        }
      ],
      [
        {
          code: "513201",
          name: "\u9A6C\u5C14\u5EB7\u5E02"
        },
        {
          code: "513221",
          name: "\u6C76\u5DDD\u53BF"
        },
        {
          code: "513222",
          name: "\u7406\u53BF"
        },
        {
          code: "513223",
          name: "\u8302\u53BF"
        },
        {
          code: "513224",
          name: "\u677E\u6F58\u53BF"
        },
        {
          code: "513225",
          name: "\u4E5D\u5BE8\u6C9F\u53BF"
        },
        {
          code: "513226",
          name: "\u91D1\u5DDD\u53BF"
        },
        {
          code: "513227",
          name: "\u5C0F\u91D1\u53BF"
        },
        {
          code: "513228",
          name: "\u9ED1\u6C34\u53BF"
        },
        {
          code: "513230",
          name: "\u58E4\u5858\u53BF"
        },
        {
          code: "513231",
          name: "\u963F\u575D\u53BF"
        },
        {
          code: "513232",
          name: "\u82E5\u5C14\u76D6\u53BF"
        },
        {
          code: "513233",
          name: "\u7EA2\u539F\u53BF"
        }
      ],
      [
        {
          code: "513301",
          name: "\u5EB7\u5B9A\u5E02"
        },
        {
          code: "513322",
          name: "\u6CF8\u5B9A\u53BF"
        },
        {
          code: "513323",
          name: "\u4E39\u5DF4\u53BF"
        },
        {
          code: "513324",
          name: "\u4E5D\u9F99\u53BF"
        },
        {
          code: "513325",
          name: "\u96C5\u6C5F\u53BF"
        },
        {
          code: "513326",
          name: "\u9053\u5B5A\u53BF"
        },
        {
          code: "513327",
          name: "\u7089\u970D\u53BF"
        },
        {
          code: "513328",
          name: "\u7518\u5B5C\u53BF"
        },
        {
          code: "513329",
          name: "\u65B0\u9F99\u53BF"
        },
        {
          code: "513330",
          name: "\u5FB7\u683C\u53BF"
        },
        {
          code: "513331",
          name: "\u767D\u7389\u53BF"
        },
        {
          code: "513332",
          name: "\u77F3\u6E20\u53BF"
        },
        {
          code: "513333",
          name: "\u8272\u8FBE\u53BF"
        },
        {
          code: "513334",
          name: "\u7406\u5858\u53BF"
        },
        {
          code: "513335",
          name: "\u5DF4\u5858\u53BF"
        },
        {
          code: "513336",
          name: "\u4E61\u57CE\u53BF"
        },
        {
          code: "513337",
          name: "\u7A3B\u57CE\u53BF"
        },
        {
          code: "513338",
          name: "\u5F97\u8363\u53BF"
        }
      ],
      [
        {
          code: "513401",
          name: "\u897F\u660C\u5E02"
        },
        {
          code: "513402",
          name: "\u4F1A\u7406\u5E02"
        },
        {
          code: "513422",
          name: "\u6728\u91CC\u85CF\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "513423",
          name: "\u76D0\u6E90\u53BF"
        },
        {
          code: "513424",
          name: "\u5FB7\u660C\u53BF"
        },
        {
          code: "513426",
          name: "\u4F1A\u4E1C\u53BF"
        },
        {
          code: "513427",
          name: "\u5B81\u5357\u53BF"
        },
        {
          code: "513428",
          name: "\u666E\u683C\u53BF"
        },
        {
          code: "513429",
          name: "\u5E03\u62D6\u53BF"
        },
        {
          code: "513430",
          name: "\u91D1\u9633\u53BF"
        },
        {
          code: "513431",
          name: "\u662D\u89C9\u53BF"
        },
        {
          code: "513432",
          name: "\u559C\u5FB7\u53BF"
        },
        {
          code: "513433",
          name: "\u5195\u5B81\u53BF"
        },
        {
          code: "513434",
          name: "\u8D8A\u897F\u53BF"
        },
        {
          code: "513435",
          name: "\u7518\u6D1B\u53BF"
        },
        {
          code: "513436",
          name: "\u7F8E\u59D1\u53BF"
        },
        {
          code: "513437",
          name: "\u96F7\u6CE2\u53BF"
        }
      ]
    ],
    [
      [
        {
          code: "520102",
          name: "\u5357\u660E\u533A"
        },
        {
          code: "520103",
          name: "\u4E91\u5CA9\u533A"
        },
        {
          code: "520111",
          name: "\u82B1\u6EAA\u533A"
        },
        {
          code: "520112",
          name: "\u4E4C\u5F53\u533A"
        },
        {
          code: "520113",
          name: "\u767D\u4E91\u533A"
        },
        {
          code: "520115",
          name: "\u89C2\u5C71\u6E56\u533A"
        },
        {
          code: "520121",
          name: "\u5F00\u9633\u53BF"
        },
        {
          code: "520122",
          name: "\u606F\u70FD\u53BF"
        },
        {
          code: "520123",
          name: "\u4FEE\u6587\u53BF"
        },
        {
          code: "520181",
          name: "\u6E05\u9547\u5E02"
        }
      ],
      [
        {
          code: "520201",
          name: "\u949F\u5C71\u533A"
        },
        {
          code: "520203",
          name: "\u516D\u679D\u7279\u533A"
        },
        {
          code: "520221",
          name: "\u6C34\u57CE\u53BF"
        },
        {
          code: "520281",
          name: "\u76D8\u5DDE\u5E02"
        }
      ],
      [
        {
          code: "520302",
          name: "\u7EA2\u82B1\u5C97\u533A"
        },
        {
          code: "520303",
          name: "\u6C47\u5DDD\u533A"
        },
        {
          code: "520304",
          name: "\u64AD\u5DDE\u533A"
        },
        {
          code: "520322",
          name: "\u6850\u6893\u53BF"
        },
        {
          code: "520323",
          name: "\u7EE5\u9633\u53BF"
        },
        {
          code: "520324",
          name: "\u6B63\u5B89\u53BF"
        },
        {
          code: "520325",
          name: "\u9053\u771F\u4EE1\u4F6C\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "520326",
          name: "\u52A1\u5DDD\u4EE1\u4F6C\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "520327",
          name: "\u51E4\u5188\u53BF"
        },
        {
          code: "520328",
          name: "\u6E44\u6F6D\u53BF"
        },
        {
          code: "520329",
          name: "\u4F59\u5E86\u53BF"
        },
        {
          code: "520330",
          name: "\u4E60\u6C34\u53BF"
        },
        {
          code: "520381",
          name: "\u8D64\u6C34\u5E02"
        },
        {
          code: "520382",
          name: "\u4EC1\u6000\u5E02"
        }
      ],
      [
        {
          code: "520402",
          name: "\u897F\u79C0\u533A"
        },
        {
          code: "520403",
          name: "\u5E73\u575D\u533A"
        },
        {
          code: "520422",
          name: "\u666E\u5B9A\u53BF"
        },
        {
          code: "520423",
          name: "\u9547\u5B81\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "520424",
          name: "\u5173\u5CAD\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "520425",
          name: "\u7D2B\u4E91\u82D7\u65CF\u5E03\u4F9D\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "520502",
          name: "\u4E03\u661F\u5173\u533A"
        },
        {
          code: "520521",
          name: "\u5927\u65B9\u53BF"
        },
        {
          code: "520523",
          name: "\u91D1\u6C99\u53BF"
        },
        {
          code: "520524",
          name: "\u7EC7\u91D1\u53BF"
        },
        {
          code: "520525",
          name: "\u7EB3\u96CD\u53BF"
        },
        {
          code: "520526",
          name: "\u5A01\u5B81\u5F5D\u65CF\u56DE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "520527",
          name: "\u8D6B\u7AE0\u53BF"
        },
        {
          code: "520581",
          name: "\u9ED4\u897F\u5E02"
        }
      ],
      [
        {
          code: "520602",
          name: "\u78A7\u6C5F\u533A"
        },
        {
          code: "520603",
          name: "\u4E07\u5C71\u533A"
        },
        {
          code: "520621",
          name: "\u6C5F\u53E3\u53BF"
        },
        {
          code: "520622",
          name: "\u7389\u5C4F\u4F97\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "520623",
          name: "\u77F3\u9621\u53BF"
        },
        {
          code: "520624",
          name: "\u601D\u5357\u53BF"
        },
        {
          code: "520625",
          name: "\u5370\u6C5F\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "520626",
          name: "\u5FB7\u6C5F\u53BF"
        },
        {
          code: "520627",
          name: "\u6CBF\u6CB3\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "520628",
          name: "\u677E\u6843\u82D7\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "522301",
          name: "\u5174\u4E49\u5E02"
        },
        {
          code: "522322",
          name: "\u5174\u4EC1\u53BF"
        },
        {
          code: "522323",
          name: "\u666E\u5B89\u53BF"
        },
        {
          code: "522324",
          name: "\u6674\u9686\u53BF"
        },
        {
          code: "522325",
          name: "\u8D1E\u4E30\u53BF"
        },
        {
          code: "522326",
          name: "\u671B\u8C1F\u53BF"
        },
        {
          code: "522327",
          name: "\u518C\u4EA8\u53BF"
        },
        {
          code: "522328",
          name: "\u5B89\u9F99\u53BF"
        }
      ],
      [
        {
          code: "522601",
          name: "\u51EF\u91CC\u5E02"
        },
        {
          code: "522622",
          name: "\u9EC4\u5E73\u53BF"
        },
        {
          code: "522623",
          name: "\u65BD\u79C9\u53BF"
        },
        {
          code: "522624",
          name: "\u4E09\u7A57\u53BF"
        },
        {
          code: "522625",
          name: "\u9547\u8FDC\u53BF"
        },
        {
          code: "522626",
          name: "\u5C91\u5DE9\u53BF"
        },
        {
          code: "522627",
          name: "\u5929\u67F1\u53BF"
        },
        {
          code: "522628",
          name: "\u9526\u5C4F\u53BF"
        },
        {
          code: "522629",
          name: "\u5251\u6CB3\u53BF"
        },
        {
          code: "522630",
          name: "\u53F0\u6C5F\u53BF"
        },
        {
          code: "522631",
          name: "\u9ECE\u5E73\u53BF"
        },
        {
          code: "522632",
          name: "\u6995\u6C5F\u53BF"
        },
        {
          code: "522633",
          name: "\u4ECE\u6C5F\u53BF"
        },
        {
          code: "522634",
          name: "\u96F7\u5C71\u53BF"
        },
        {
          code: "522635",
          name: "\u9EBB\u6C5F\u53BF"
        },
        {
          code: "522636",
          name: "\u4E39\u5BE8\u53BF"
        }
      ],
      [
        {
          code: "522701",
          name: "\u90FD\u5300\u5E02"
        },
        {
          code: "522702",
          name: "\u798F\u6CC9\u5E02"
        },
        {
          code: "522722",
          name: "\u8354\u6CE2\u53BF"
        },
        {
          code: "522723",
          name: "\u8D35\u5B9A\u53BF"
        },
        {
          code: "522725",
          name: "\u74EE\u5B89\u53BF"
        },
        {
          code: "522726",
          name: "\u72EC\u5C71\u53BF"
        },
        {
          code: "522727",
          name: "\u5E73\u5858\u53BF"
        },
        {
          code: "522728",
          name: "\u7F57\u7538\u53BF"
        },
        {
          code: "522729",
          name: "\u957F\u987A\u53BF"
        },
        {
          code: "522730",
          name: "\u9F99\u91CC\u53BF"
        },
        {
          code: "522731",
          name: "\u60E0\u6C34\u53BF"
        },
        {
          code: "522732",
          name: "\u4E09\u90FD\u6C34\u65CF\u81EA\u6CBB\u53BF"
        }
      ]
    ],
    [
      [
        {
          code: "530102",
          name: "\u4E94\u534E\u533A"
        },
        {
          code: "530103",
          name: "\u76D8\u9F99\u533A"
        },
        {
          code: "530111",
          name: "\u5B98\u6E21\u533A"
        },
        {
          code: "530112",
          name: "\u897F\u5C71\u533A"
        },
        {
          code: "530113",
          name: "\u4E1C\u5DDD\u533A"
        },
        {
          code: "530114",
          name: "\u5448\u8D21\u533A"
        },
        {
          code: "530115",
          name: "\u664B\u5B81\u533A"
        },
        {
          code: "530124",
          name: "\u5BCC\u6C11\u53BF"
        },
        {
          code: "530125",
          name: "\u5B9C\u826F\u53BF"
        },
        {
          code: "530126",
          name: "\u77F3\u6797\u5F5D\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530127",
          name: "\u5D69\u660E\u53BF"
        },
        {
          code: "530128",
          name: "\u7984\u529D\u5F5D\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530129",
          name: "\u5BFB\u7538\u56DE\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530181",
          name: "\u5B89\u5B81\u5E02"
        }
      ],
      [
        {
          code: "530302",
          name: "\u9E92\u9E9F\u533A"
        },
        {
          code: "530303",
          name: "\u6CBE\u76CA\u533A"
        },
        {
          code: "530321",
          name: "\u9A6C\u9F99\u53BF"
        },
        {
          code: "530322",
          name: "\u9646\u826F\u53BF"
        },
        {
          code: "530323",
          name: "\u5E08\u5B97\u53BF"
        },
        {
          code: "530324",
          name: "\u7F57\u5E73\u53BF"
        },
        {
          code: "530325",
          name: "\u5BCC\u6E90\u53BF"
        },
        {
          code: "530326",
          name: "\u4F1A\u6CFD\u53BF"
        },
        {
          code: "530381",
          name: "\u5BA3\u5A01\u5E02"
        }
      ],
      [
        {
          code: "530402",
          name: "\u7EA2\u5854\u533A"
        },
        {
          code: "530403",
          name: "\u6C5F\u5DDD\u533A"
        },
        {
          code: "530422",
          name: "\u6F84\u6C5F\u53BF"
        },
        {
          code: "530423",
          name: "\u901A\u6D77\u53BF"
        },
        {
          code: "530424",
          name: "\u534E\u5B81\u53BF"
        },
        {
          code: "530425",
          name: "\u6613\u95E8\u53BF"
        },
        {
          code: "530426",
          name: "\u5CE8\u5C71\u5F5D\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530427",
          name: "\u65B0\u5E73\u5F5D\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530428",
          name: "\u5143\u6C5F\u54C8\u5C3C\u65CF\u5F5D\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "530502",
          name: "\u9686\u9633\u533A"
        },
        {
          code: "530521",
          name: "\u65BD\u7538\u53BF"
        },
        {
          code: "530523",
          name: "\u9F99\u9675\u53BF"
        },
        {
          code: "530524",
          name: "\u660C\u5B81\u53BF"
        },
        {
          code: "530581",
          name: "\u817E\u51B2\u5E02"
        }
      ],
      [
        {
          code: "530602",
          name: "\u662D\u9633\u533A"
        },
        {
          code: "530621",
          name: "\u9C81\u7538\u53BF"
        },
        {
          code: "530622",
          name: "\u5DE7\u5BB6\u53BF"
        },
        {
          code: "530623",
          name: "\u76D0\u6D25\u53BF"
        },
        {
          code: "530624",
          name: "\u5927\u5173\u53BF"
        },
        {
          code: "530625",
          name: "\u6C38\u5584\u53BF"
        },
        {
          code: "530626",
          name: "\u7EE5\u6C5F\u53BF"
        },
        {
          code: "530627",
          name: "\u9547\u96C4\u53BF"
        },
        {
          code: "530628",
          name: "\u5F5D\u826F\u53BF"
        },
        {
          code: "530629",
          name: "\u5A01\u4FE1\u53BF"
        },
        {
          code: "530630",
          name: "\u6C34\u5BCC\u53BF"
        }
      ],
      [
        {
          code: "530702",
          name: "\u53E4\u57CE\u533A"
        },
        {
          code: "530721",
          name: "\u7389\u9F99\u7EB3\u897F\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530722",
          name: "\u6C38\u80DC\u53BF"
        },
        {
          code: "530723",
          name: "\u534E\u576A\u53BF"
        },
        {
          code: "530724",
          name: "\u5B81\u8497\u5F5D\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "530802",
          name: "\u601D\u8305\u533A"
        },
        {
          code: "530821",
          name: "\u5B81\u6D31\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530822",
          name: "\u58A8\u6C5F\u54C8\u5C3C\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530823",
          name: "\u666F\u4E1C\u5F5D\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530824",
          name: "\u666F\u8C37\u50A3\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530825",
          name: "\u9547\u6C85\u5F5D\u65CF\u54C8\u5C3C\u65CF\u62C9\u795C\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530826",
          name: "\u6C5F\u57CE\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530827",
          name: "\u5B5F\u8FDE\u50A3\u65CF\u62C9\u795C\u65CF\u4F64\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530828",
          name: "\u6F9C\u6CA7\u62C9\u795C\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530829",
          name: "\u897F\u76DF\u4F64\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "530902",
          name: "\u4E34\u7FD4\u533A"
        },
        {
          code: "530921",
          name: "\u51E4\u5E86\u53BF"
        },
        {
          code: "530922",
          name: "\u4E91\u53BF"
        },
        {
          code: "530923",
          name: "\u6C38\u5FB7\u53BF"
        },
        {
          code: "530924",
          name: "\u9547\u5EB7\u53BF"
        },
        {
          code: "530925",
          name: "\u53CC\u6C5F\u62C9\u795C\u65CF\u4F64\u65CF\u5E03\u6717\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530926",
          name: "\u803F\u9A6C\u50A3\u65CF\u4F64\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "530927",
          name: "\u6CA7\u6E90\u4F64\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "532301",
          name: "\u695A\u96C4\u5E02"
        },
        {
          code: "532302",
          name: "\u7984\u4E30\u5E02"
        },
        {
          code: "532322",
          name: "\u53CC\u67CF\u53BF"
        },
        {
          code: "532323",
          name: "\u725F\u5B9A\u53BF"
        },
        {
          code: "532324",
          name: "\u5357\u534E\u53BF"
        },
        {
          code: "532325",
          name: "\u59DA\u5B89\u53BF"
        },
        {
          code: "532326",
          name: "\u5927\u59DA\u53BF"
        },
        {
          code: "532327",
          name: "\u6C38\u4EC1\u53BF"
        },
        {
          code: "532328",
          name: "\u5143\u8C0B\u53BF"
        },
        {
          code: "532329",
          name: "\u6B66\u5B9A\u53BF"
        }
      ],
      [
        {
          code: "532501",
          name: "\u4E2A\u65E7\u5E02"
        },
        {
          code: "532502",
          name: "\u5F00\u8FDC\u5E02"
        },
        {
          code: "532503",
          name: "\u8499\u81EA\u5E02"
        },
        {
          code: "532504",
          name: "\u5F25\u52D2\u5E02"
        },
        {
          code: "532523",
          name: "\u5C4F\u8FB9\u82D7\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "532524",
          name: "\u5EFA\u6C34\u53BF"
        },
        {
          code: "532525",
          name: "\u77F3\u5C4F\u53BF"
        },
        {
          code: "532527",
          name: "\u6CF8\u897F\u53BF"
        },
        {
          code: "532528",
          name: "\u5143\u9633\u53BF"
        },
        {
          code: "532529",
          name: "\u7EA2\u6CB3\u53BF"
        },
        {
          code: "532530",
          name: "\u91D1\u5E73\u82D7\u65CF\u7476\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "532531",
          name: "\u7EFF\u6625\u53BF"
        },
        {
          code: "532532",
          name: "\u6CB3\u53E3\u7476\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "532601",
          name: "\u6587\u5C71\u5E02"
        },
        {
          code: "532622",
          name: "\u781A\u5C71\u53BF"
        },
        {
          code: "532623",
          name: "\u897F\u7574\u53BF"
        },
        {
          code: "532624",
          name: "\u9EBB\u6817\u5761\u53BF"
        },
        {
          code: "532625",
          name: "\u9A6C\u5173\u53BF"
        },
        {
          code: "532626",
          name: "\u4E18\u5317\u53BF"
        },
        {
          code: "532627",
          name: "\u5E7F\u5357\u53BF"
        },
        {
          code: "532628",
          name: "\u5BCC\u5B81\u53BF"
        }
      ],
      [
        {
          code: "532801",
          name: "\u666F\u6D2A\u5E02"
        },
        {
          code: "532822",
          name: "\u52D0\u6D77\u53BF"
        },
        {
          code: "532823",
          name: "\u52D0\u814A\u53BF"
        }
      ],
      [
        {
          code: "532901",
          name: "\u5927\u7406\u5E02"
        },
        {
          code: "532922",
          name: "\u6F3E\u6FDE\u5F5D\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "532923",
          name: "\u7965\u4E91\u53BF"
        },
        {
          code: "532924",
          name: "\u5BBE\u5DDD\u53BF"
        },
        {
          code: "532925",
          name: "\u5F25\u6E21\u53BF"
        },
        {
          code: "532926",
          name: "\u5357\u6DA7\u5F5D\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "532927",
          name: "\u5DCD\u5C71\u5F5D\u65CF\u56DE\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "532928",
          name: "\u6C38\u5E73\u53BF"
        },
        {
          code: "532929",
          name: "\u4E91\u9F99\u53BF"
        },
        {
          code: "532930",
          name: "\u6D31\u6E90\u53BF"
        },
        {
          code: "532931",
          name: "\u5251\u5DDD\u53BF"
        },
        {
          code: "532932",
          name: "\u9E64\u5E86\u53BF"
        }
      ],
      [
        {
          code: "533102",
          name: "\u745E\u4E3D\u5E02"
        },
        {
          code: "533103",
          name: "\u8292\u5E02"
        },
        {
          code: "533122",
          name: "\u6881\u6CB3\u53BF"
        },
        {
          code: "533123",
          name: "\u76C8\u6C5F\u53BF"
        },
        {
          code: "533124",
          name: "\u9647\u5DDD\u53BF"
        }
      ],
      [
        {
          code: "533301",
          name: "\u6CF8\u6C34\u5E02"
        },
        {
          code: "533323",
          name: "\u798F\u8D21\u53BF"
        },
        {
          code: "533324",
          name: "\u8D21\u5C71\u72EC\u9F99\u65CF\u6012\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "533325",
          name: "\u5170\u576A\u767D\u65CF\u666E\u7C73\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "533401",
          name: "\u9999\u683C\u91CC\u62C9\u5E02"
        },
        {
          code: "533422",
          name: "\u5FB7\u94A6\u53BF"
        },
        {
          code: "533423",
          name: "\u7EF4\u897F\u5088\u50F3\u65CF\u81EA\u6CBB\u53BF"
        }
      ]
    ],
    [
      [
        {
          code: "540102",
          name: "\u57CE\u5173\u533A"
        },
        {
          code: "540103",
          name: "\u5806\u9F99\u5FB7\u5E86\u533A"
        },
        {
          code: "540104",
          name: "\u8FBE\u5B5C\u533A"
        },
        {
          code: "540121",
          name: "\u6797\u5468\u53BF"
        },
        {
          code: "540122",
          name: "\u5F53\u96C4\u53BF"
        },
        {
          code: "540123",
          name: "\u5C3C\u6728\u53BF"
        },
        {
          code: "540124",
          name: "\u66F2\u6C34\u53BF"
        },
        {
          code: "540127",
          name: "\u58A8\u7AF9\u5DE5\u5361\u53BF"
        }
      ],
      [
        {
          code: "540202",
          name: "\u6851\u73E0\u5B5C\u533A"
        },
        {
          code: "540221",
          name: "\u5357\u6728\u6797\u53BF"
        },
        {
          code: "540222",
          name: "\u6C5F\u5B5C\u53BF"
        },
        {
          code: "540223",
          name: "\u5B9A\u65E5\u53BF"
        },
        {
          code: "540224",
          name: "\u8428\u8FE6\u53BF"
        },
        {
          code: "540225",
          name: "\u62C9\u5B5C\u53BF"
        },
        {
          code: "540226",
          name: "\u6602\u4EC1\u53BF"
        },
        {
          code: "540227",
          name: "\u8C22\u901A\u95E8\u53BF"
        },
        {
          code: "540228",
          name: "\u767D\u6717\u53BF"
        },
        {
          code: "540229",
          name: "\u4EC1\u5E03\u53BF"
        },
        {
          code: "540230",
          name: "\u5EB7\u9A6C\u53BF"
        },
        {
          code: "540231",
          name: "\u5B9A\u7ED3\u53BF"
        },
        {
          code: "540232",
          name: "\u4EF2\u5DF4\u53BF"
        },
        {
          code: "540233",
          name: "\u4E9A\u4E1C\u53BF"
        },
        {
          code: "540234",
          name: "\u5409\u9686\u53BF"
        },
        {
          code: "540235",
          name: "\u8042\u62C9\u6728\u53BF"
        },
        {
          code: "540236",
          name: "\u8428\u560E\u53BF"
        },
        {
          code: "540237",
          name: "\u5C97\u5DF4\u53BF"
        }
      ],
      [
        {
          code: "540302",
          name: "\u5361\u82E5\u533A"
        },
        {
          code: "540321",
          name: "\u6C5F\u8FBE\u53BF"
        },
        {
          code: "540322",
          name: "\u8D21\u89C9\u53BF"
        },
        {
          code: "540323",
          name: "\u7C7B\u4E4C\u9F50\u53BF"
        },
        {
          code: "540324",
          name: "\u4E01\u9752\u53BF"
        },
        {
          code: "540325",
          name: "\u5BDF\u96C5\u53BF"
        },
        {
          code: "540326",
          name: "\u516B\u5BBF\u53BF"
        },
        {
          code: "540327",
          name: "\u5DE6\u8D21\u53BF"
        },
        {
          code: "540328",
          name: "\u8292\u5EB7\u53BF"
        },
        {
          code: "540329",
          name: "\u6D1B\u9686\u53BF"
        },
        {
          code: "540330",
          name: "\u8FB9\u575D\u53BF"
        }
      ],
      [
        {
          code: "540402",
          name: "\u5DF4\u5B9C\u533A"
        },
        {
          code: "540421",
          name: "\u5DE5\u5E03\u6C5F\u8FBE\u53BF"
        },
        {
          code: "540422",
          name: "\u7C73\u6797\u53BF"
        },
        {
          code: "540423",
          name: "\u58A8\u8131\u53BF"
        },
        {
          code: "540424",
          name: "\u6CE2\u5BC6\u53BF"
        },
        {
          code: "540425",
          name: "\u5BDF\u9685\u53BF"
        },
        {
          code: "540426",
          name: "\u6717\u53BF"
        }
      ],
      [
        {
          code: "540502",
          name: "\u4E43\u4E1C\u533A"
        },
        {
          code: "540521",
          name: "\u624E\u56CA\u53BF"
        },
        {
          code: "540522",
          name: "\u8D21\u560E\u53BF"
        },
        {
          code: "540523",
          name: "\u6851\u65E5\u53BF"
        },
        {
          code: "540524",
          name: "\u743C\u7ED3\u53BF"
        },
        {
          code: "540525",
          name: "\u66F2\u677E\u53BF"
        },
        {
          code: "540526",
          name: "\u63AA\u7F8E\u53BF"
        },
        {
          code: "540527",
          name: "\u6D1B\u624E\u53BF"
        },
        {
          code: "540528",
          name: "\u52A0\u67E5\u53BF"
        },
        {
          code: "540529",
          name: "\u9686\u5B50\u53BF"
        },
        {
          code: "540530",
          name: "\u9519\u90A3\u53BF"
        },
        {
          code: "540531",
          name: "\u6D6A\u5361\u5B50\u53BF"
        }
      ],
      [
        {
          code: "542421",
          name: "\u90A3\u66F2\u53BF"
        },
        {
          code: "542422",
          name: "\u5609\u9ECE\u53BF"
        },
        {
          code: "542423",
          name: "\u6BD4\u5982\u53BF"
        },
        {
          code: "542424",
          name: "\u8042\u8363\u53BF"
        },
        {
          code: "542425",
          name: "\u5B89\u591A\u53BF"
        },
        {
          code: "542426",
          name: "\u7533\u624E\u53BF"
        },
        {
          code: "542427",
          name: "\u7D22\u53BF"
        },
        {
          code: "542428",
          name: "\u73ED\u6208\u53BF"
        },
        {
          code: "542429",
          name: "\u5DF4\u9752\u53BF"
        },
        {
          code: "542430",
          name: "\u5C3C\u739B\u53BF"
        },
        {
          code: "542431",
          name: "\u53CC\u6E56\u53BF"
        }
      ],
      [
        {
          code: "542521",
          name: "\u666E\u5170\u53BF"
        },
        {
          code: "542522",
          name: "\u672D\u8FBE\u53BF"
        },
        {
          code: "542523",
          name: "\u5676\u5C14\u53BF"
        },
        {
          code: "542524",
          name: "\u65E5\u571F\u53BF"
        },
        {
          code: "542525",
          name: "\u9769\u5409\u53BF"
        },
        {
          code: "542526",
          name: "\u6539\u5219\u53BF"
        },
        {
          code: "542527",
          name: "\u63AA\u52E4\u53BF"
        }
      ]
    ],
    [
      [
        {
          code: "610102",
          name: "\u65B0\u57CE\u533A"
        },
        {
          code: "610103",
          name: "\u7891\u6797\u533A"
        },
        {
          code: "610104",
          name: "\u83B2\u6E56\u533A"
        },
        {
          code: "610111",
          name: "\u705E\u6865\u533A"
        },
        {
          code: "610112",
          name: "\u672A\u592E\u533A"
        },
        {
          code: "610113",
          name: "\u96C1\u5854\u533A"
        },
        {
          code: "610114",
          name: "\u960E\u826F\u533A"
        },
        {
          code: "610115",
          name: "\u4E34\u6F7C\u533A"
        },
        {
          code: "610116",
          name: "\u957F\u5B89\u533A"
        },
        {
          code: "610117",
          name: "\u9AD8\u9675\u533A"
        },
        {
          code: "610118",
          name: "\u9120\u9091\u533A"
        },
        {
          code: "610122",
          name: "\u84DD\u7530\u53BF"
        },
        {
          code: "610124",
          name: "\u5468\u81F3\u53BF"
        }
      ],
      [
        {
          code: "610202",
          name: "\u738B\u76CA\u533A"
        },
        {
          code: "610203",
          name: "\u5370\u53F0\u533A"
        },
        {
          code: "610204",
          name: "\u8000\u5DDE\u533A"
        },
        {
          code: "610222",
          name: "\u5B9C\u541B\u53BF"
        }
      ],
      [
        {
          code: "610302",
          name: "\u6E2D\u6EE8\u533A"
        },
        {
          code: "610303",
          name: "\u91D1\u53F0\u533A"
        },
        {
          code: "610304",
          name: "\u9648\u4ED3\u533A"
        },
        {
          code: "610305",
          name: "\u51E4\u7FD4\u533A"
        },
        {
          code: "610323",
          name: "\u5C90\u5C71\u53BF"
        },
        {
          code: "610324",
          name: "\u6276\u98CE\u53BF"
        },
        {
          code: "610326",
          name: "\u7709\u53BF"
        },
        {
          code: "610327",
          name: "\u9647\u53BF"
        },
        {
          code: "610328",
          name: "\u5343\u9633\u53BF"
        },
        {
          code: "610329",
          name: "\u9E9F\u6E38\u53BF"
        },
        {
          code: "610330",
          name: "\u51E4\u53BF"
        },
        {
          code: "610331",
          name: "\u592A\u767D\u53BF"
        }
      ],
      [
        {
          code: "610402",
          name: "\u79E6\u90FD\u533A"
        },
        {
          code: "610403",
          name: "\u6768\u9675\u533A"
        },
        {
          code: "610404",
          name: "\u6E2D\u57CE\u533A"
        },
        {
          code: "610422",
          name: "\u4E09\u539F\u53BF"
        },
        {
          code: "610423",
          name: "\u6CFE\u9633\u53BF"
        },
        {
          code: "610424",
          name: "\u4E7E\u53BF"
        },
        {
          code: "610425",
          name: "\u793C\u6CC9\u53BF"
        },
        {
          code: "610426",
          name: "\u6C38\u5BFF\u53BF"
        },
        {
          code: "610427",
          name: "\u5F6C\u5DDE\u5E02"
        },
        {
          code: "610428",
          name: "\u957F\u6B66\u53BF"
        },
        {
          code: "610429",
          name: "\u65EC\u9091\u53BF"
        },
        {
          code: "610430",
          name: "\u6DF3\u5316\u53BF"
        },
        {
          code: "610431",
          name: "\u6B66\u529F\u53BF"
        },
        {
          code: "610481",
          name: "\u5174\u5E73\u5E02"
        }
      ],
      [
        {
          code: "610502",
          name: "\u4E34\u6E2D\u533A"
        },
        {
          code: "610503",
          name: "\u534E\u5DDE\u533A"
        },
        {
          code: "610522",
          name: "\u6F7C\u5173\u53BF"
        },
        {
          code: "610523",
          name: "\u5927\u8354\u53BF"
        },
        {
          code: "610524",
          name: "\u5408\u9633\u53BF"
        },
        {
          code: "610525",
          name: "\u6F84\u57CE\u53BF"
        },
        {
          code: "610526",
          name: "\u84B2\u57CE\u53BF"
        },
        {
          code: "610527",
          name: "\u767D\u6C34\u53BF"
        },
        {
          code: "610528",
          name: "\u5BCC\u5E73\u53BF"
        },
        {
          code: "610581",
          name: "\u97E9\u57CE\u5E02"
        },
        {
          code: "610582",
          name: "\u534E\u9634\u5E02"
        }
      ],
      [
        {
          code: "610602",
          name: "\u5B9D\u5854\u533A"
        },
        {
          code: "610603",
          name: "\u5B89\u585E\u533A"
        },
        {
          code: "610621",
          name: "\u5EF6\u957F\u53BF"
        },
        {
          code: "610622",
          name: "\u5EF6\u5DDD\u53BF"
        },
        {
          code: "610623",
          name: "\u5B50\u957F\u53BF"
        },
        {
          code: "610625",
          name: "\u5FD7\u4E39\u53BF"
        },
        {
          code: "610626",
          name: "\u5434\u8D77\u53BF"
        },
        {
          code: "610627",
          name: "\u7518\u6CC9\u53BF"
        },
        {
          code: "610628",
          name: "\u5BCC\u53BF"
        },
        {
          code: "610629",
          name: "\u6D1B\u5DDD\u53BF"
        },
        {
          code: "610630",
          name: "\u5B9C\u5DDD\u53BF"
        },
        {
          code: "610631",
          name: "\u9EC4\u9F99\u53BF"
        },
        {
          code: "610632",
          name: "\u9EC4\u9675\u53BF"
        }
      ],
      [
        {
          code: "610702",
          name: "\u6C49\u53F0\u533A"
        },
        {
          code: "610703",
          name: "\u5357\u90D1\u533A"
        },
        {
          code: "610722",
          name: "\u57CE\u56FA\u53BF"
        },
        {
          code: "610723",
          name: "\u6D0B\u53BF"
        },
        {
          code: "610724",
          name: "\u897F\u4E61\u53BF"
        },
        {
          code: "610725",
          name: "\u52C9\u53BF"
        },
        {
          code: "610726",
          name: "\u5B81\u5F3A\u53BF"
        },
        {
          code: "610727",
          name: "\u7565\u9633\u53BF"
        },
        {
          code: "610728",
          name: "\u9547\u5DF4\u53BF"
        },
        {
          code: "610729",
          name: "\u7559\u575D\u53BF"
        },
        {
          code: "610730",
          name: "\u4F5B\u576A\u53BF"
        }
      ],
      [
        {
          code: "610802",
          name: "\u6986\u9633\u533A"
        },
        {
          code: "610803",
          name: "\u6A2A\u5C71\u533A"
        },
        {
          code: "610822",
          name: "\u5E9C\u8C37\u53BF"
        },
        {
          code: "610824",
          name: "\u9756\u8FB9\u53BF"
        },
        {
          code: "610825",
          name: "\u5B9A\u8FB9\u53BF"
        },
        {
          code: "610826",
          name: "\u7EE5\u5FB7\u53BF"
        },
        {
          code: "610827",
          name: "\u7C73\u8102\u53BF"
        },
        {
          code: "610828",
          name: "\u4F73\u53BF"
        },
        {
          code: "610829",
          name: "\u5434\u5821\u53BF"
        },
        {
          code: "610830",
          name: "\u6E05\u6DA7\u53BF"
        },
        {
          code: "610831",
          name: "\u5B50\u6D32\u53BF"
        },
        {
          code: "610881",
          name: "\u795E\u6728\u5E02"
        }
      ],
      [
        {
          code: "610902",
          name: "\u6C49\u6EE8\u533A"
        },
        {
          code: "610921",
          name: "\u6C49\u9634\u53BF"
        },
        {
          code: "610922",
          name: "\u77F3\u6CC9\u53BF"
        },
        {
          code: "610923",
          name: "\u5B81\u9655\u53BF"
        },
        {
          code: "610924",
          name: "\u7D2B\u9633\u53BF"
        },
        {
          code: "610925",
          name: "\u5C9A\u768B\u53BF"
        },
        {
          code: "610926",
          name: "\u5E73\u5229\u53BF"
        },
        {
          code: "610927",
          name: "\u9547\u576A\u53BF"
        },
        {
          code: "610929",
          name: "\u767D\u6CB3\u53BF"
        },
        {
          code: "610981",
          name: "\u65EC\u9633\u5E02"
        }
      ],
      [
        {
          code: "611002",
          name: "\u5546\u5DDE\u533A"
        },
        {
          code: "611021",
          name: "\u6D1B\u5357\u53BF"
        },
        {
          code: "611022",
          name: "\u4E39\u51E4\u53BF"
        },
        {
          code: "611023",
          name: "\u5546\u5357\u53BF"
        },
        {
          code: "611024",
          name: "\u5C71\u9633\u53BF"
        },
        {
          code: "611025",
          name: "\u9547\u5B89\u53BF"
        },
        {
          code: "611026",
          name: "\u67DE\u6C34\u53BF"
        }
      ]
    ],
    [
      [
        {
          code: "620102",
          name: "\u57CE\u5173\u533A"
        },
        {
          code: "620103",
          name: "\u4E03\u91CC\u6CB3\u533A"
        },
        {
          code: "620104",
          name: "\u897F\u56FA\u533A"
        },
        {
          code: "620105",
          name: "\u5B89\u5B81\u533A"
        },
        {
          code: "620111",
          name: "\u7EA2\u53E4\u533A"
        },
        {
          code: "620121",
          name: "\u6C38\u767B\u53BF"
        },
        {
          code: "620122",
          name: "\u768B\u5170\u53BF"
        },
        {
          code: "620123",
          name: "\u6986\u4E2D\u53BF"
        }
      ],
      [
        {
          code: "620201",
          name: "\u96C4\u5173\u533A"
        },
        {
          code: "620202",
          name: "\u955C\u94C1\u533A"
        },
        {
          code: "620203",
          name: "\u957F\u57CE\u533A"
        }
      ],
      [
        {
          code: "620302",
          name: "\u91D1\u5DDD\u533A"
        },
        {
          code: "620321",
          name: "\u6C38\u660C\u53BF"
        }
      ],
      [
        {
          code: "620402",
          name: "\u767D\u94F6\u533A"
        },
        {
          code: "620403",
          name: "\u5E73\u5DDD\u533A"
        },
        {
          code: "620421",
          name: "\u9756\u8FDC\u53BF"
        },
        {
          code: "620422",
          name: "\u4F1A\u5B81\u53BF"
        },
        {
          code: "620423",
          name: "\u666F\u6CF0\u53BF"
        }
      ],
      [
        {
          code: "620502",
          name: "\u79E6\u5DDE\u533A"
        },
        {
          code: "620503",
          name: "\u9EA6\u79EF\u533A"
        },
        {
          code: "620521",
          name: "\u6E05\u6C34\u53BF"
        },
        {
          code: "620522",
          name: "\u79E6\u5B89\u53BF"
        },
        {
          code: "620523",
          name: "\u7518\u8C37\u53BF"
        },
        {
          code: "620524",
          name: "\u6B66\u5C71\u53BF"
        },
        {
          code: "620525",
          name: "\u5F20\u5BB6\u5DDD\u56DE\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "620602",
          name: "\u51C9\u5DDE\u533A"
        },
        {
          code: "620621",
          name: "\u6C11\u52E4\u53BF"
        },
        {
          code: "620622",
          name: "\u53E4\u6D6A\u53BF"
        },
        {
          code: "620623",
          name: "\u5929\u795D\u85CF\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "620702",
          name: "\u7518\u5DDE\u533A"
        },
        {
          code: "620721",
          name: "\u8083\u5357\u88D5\u56FA\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "620722",
          name: "\u6C11\u4E50\u53BF"
        },
        {
          code: "620723",
          name: "\u4E34\u6CFD\u53BF"
        },
        {
          code: "620724",
          name: "\u9AD8\u53F0\u53BF"
        },
        {
          code: "620725",
          name: "\u5C71\u4E39\u53BF"
        }
      ],
      [
        {
          code: "620802",
          name: "\u5D06\u5CD2\u533A"
        },
        {
          code: "620821",
          name: "\u6CFE\u5DDD\u53BF"
        },
        {
          code: "620822",
          name: "\u7075\u53F0\u53BF"
        },
        {
          code: "620823",
          name: "\u5D07\u4FE1\u53BF"
        },
        {
          code: "620824",
          name: "\u534E\u4EAD\u53BF"
        },
        {
          code: "620825",
          name: "\u5E84\u6D6A\u53BF"
        },
        {
          code: "620826",
          name: "\u9759\u5B81\u53BF"
        }
      ],
      [
        {
          code: "620902",
          name: "\u8083\u5DDE\u533A"
        },
        {
          code: "620921",
          name: "\u91D1\u5854\u53BF"
        },
        {
          code: "620922",
          name: "\u74DC\u5DDE\u53BF"
        },
        {
          code: "620923",
          name: "\u8083\u5317\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "620924",
          name: "\u963F\u514B\u585E\u54C8\u8428\u514B\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "620981",
          name: "\u7389\u95E8\u5E02"
        },
        {
          code: "620982",
          name: "\u6566\u714C\u5E02"
        }
      ],
      [
        {
          code: "621002",
          name: "\u897F\u5CF0\u533A"
        },
        {
          code: "621021",
          name: "\u5E86\u57CE\u53BF"
        },
        {
          code: "621022",
          name: "\u73AF\u53BF"
        },
        {
          code: "621023",
          name: "\u534E\u6C60\u53BF"
        },
        {
          code: "621024",
          name: "\u5408\u6C34\u53BF"
        },
        {
          code: "621025",
          name: "\u6B63\u5B81\u53BF"
        },
        {
          code: "621026",
          name: "\u5B81\u53BF"
        },
        {
          code: "621027",
          name: "\u9547\u539F\u53BF"
        }
      ],
      [
        {
          code: "621102",
          name: "\u5B89\u5B9A\u533A"
        },
        {
          code: "621121",
          name: "\u901A\u6E2D\u53BF"
        },
        {
          code: "621122",
          name: "\u9647\u897F\u53BF"
        },
        {
          code: "621123",
          name: "\u6E2D\u6E90\u53BF"
        },
        {
          code: "621124",
          name: "\u4E34\u6D2E\u53BF"
        },
        {
          code: "621125",
          name: "\u6F33\u53BF"
        },
        {
          code: "621126",
          name: "\u5CB7\u53BF"
        }
      ],
      [
        {
          code: "621202",
          name: "\u6B66\u90FD\u533A"
        },
        {
          code: "621221",
          name: "\u6210\u53BF"
        },
        {
          code: "621222",
          name: "\u6587\u53BF"
        },
        {
          code: "621223",
          name: "\u5B95\u660C\u53BF"
        },
        {
          code: "621224",
          name: "\u5EB7\u53BF"
        },
        {
          code: "621225",
          name: "\u897F\u548C\u53BF"
        },
        {
          code: "621226",
          name: "\u793C\u53BF"
        },
        {
          code: "621227",
          name: "\u5FBD\u53BF"
        },
        {
          code: "621228",
          name: "\u4E24\u5F53\u53BF"
        }
      ],
      [
        {
          code: "622901",
          name: "\u4E34\u590F\u5E02"
        },
        {
          code: "622921",
          name: "\u4E34\u590F\u53BF"
        },
        {
          code: "622922",
          name: "\u5EB7\u4E50\u53BF"
        },
        {
          code: "622923",
          name: "\u6C38\u9756\u53BF"
        },
        {
          code: "622924",
          name: "\u5E7F\u6CB3\u53BF"
        },
        {
          code: "622925",
          name: "\u548C\u653F\u53BF"
        },
        {
          code: "622926",
          name: "\u4E1C\u4E61\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "622927",
          name: "\u79EF\u77F3\u5C71\u4FDD\u5B89\u65CF\u4E1C\u4E61\u65CF\u6492\u62C9\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "623001",
          name: "\u5408\u4F5C\u5E02"
        },
        {
          code: "623021",
          name: "\u4E34\u6F6D\u53BF"
        },
        {
          code: "623022",
          name: "\u5353\u5C3C\u53BF"
        },
        {
          code: "623023",
          name: "\u821F\u66F2\u53BF"
        },
        {
          code: "623024",
          name: "\u8FED\u90E8\u53BF"
        },
        {
          code: "623025",
          name: "\u739B\u66F2\u53BF"
        },
        {
          code: "623026",
          name: "\u788C\u66F2\u53BF"
        },
        {
          code: "623027",
          name: "\u590F\u6CB3\u53BF"
        }
      ]
    ],
    [
      [
        {
          code: "630102",
          name: "\u57CE\u4E1C\u533A"
        },
        {
          code: "630103",
          name: "\u57CE\u4E2D\u533A"
        },
        {
          code: "630104",
          name: "\u57CE\u897F\u533A"
        },
        {
          code: "630105",
          name: "\u57CE\u5317\u533A"
        },
        {
          code: "630121",
          name: "\u5927\u901A\u56DE\u65CF\u571F\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "630122",
          name: "\u6E5F\u4E2D\u53BF"
        },
        {
          code: "630123",
          name: "\u6E5F\u6E90\u53BF"
        }
      ],
      [
        {
          code: "630202",
          name: "\u4E50\u90FD\u533A"
        },
        {
          code: "630203",
          name: "\u5E73\u5B89\u533A"
        },
        {
          code: "630222",
          name: "\u6C11\u548C\u56DE\u65CF\u571F\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "630223",
          name: "\u4E92\u52A9\u571F\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "630224",
          name: "\u5316\u9686\u56DE\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "630225",
          name: "\u5FAA\u5316\u6492\u62C9\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "632221",
          name: "\u95E8\u6E90\u56DE\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "632222",
          name: "\u7941\u8FDE\u53BF"
        },
        {
          code: "632223",
          name: "\u6D77\u664F\u53BF"
        },
        {
          code: "632224",
          name: "\u521A\u5BDF\u53BF"
        }
      ],
      [
        {
          code: "632321",
          name: "\u540C\u4EC1\u53BF"
        },
        {
          code: "632322",
          name: "\u5C16\u624E\u53BF"
        },
        {
          code: "632323",
          name: "\u6CFD\u5E93\u53BF"
        },
        {
          code: "632324",
          name: "\u6CB3\u5357\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "632521",
          name: "\u5171\u548C\u53BF"
        },
        {
          code: "632522",
          name: "\u540C\u5FB7\u53BF"
        },
        {
          code: "632523",
          name: "\u8D35\u5FB7\u53BF"
        },
        {
          code: "632524",
          name: "\u5174\u6D77\u53BF"
        },
        {
          code: "632525",
          name: "\u8D35\u5357\u53BF"
        }
      ],
      [
        {
          code: "632621",
          name: "\u739B\u6C81\u53BF"
        },
        {
          code: "632622",
          name: "\u73ED\u739B\u53BF"
        },
        {
          code: "632623",
          name: "\u7518\u5FB7\u53BF"
        },
        {
          code: "632624",
          name: "\u8FBE\u65E5\u53BF"
        },
        {
          code: "632625",
          name: "\u4E45\u6CBB\u53BF"
        },
        {
          code: "632626",
          name: "\u739B\u591A\u53BF"
        }
      ],
      [
        {
          code: "632701",
          name: "\u7389\u6811\u5E02"
        },
        {
          code: "632722",
          name: "\u6742\u591A\u53BF"
        },
        {
          code: "632723",
          name: "\u79F0\u591A\u53BF"
        },
        {
          code: "632724",
          name: "\u6CBB\u591A\u53BF"
        },
        {
          code: "632725",
          name: "\u56CA\u8C26\u53BF"
        },
        {
          code: "632726",
          name: "\u66F2\u9EBB\u83B1\u53BF"
        }
      ],
      [
        {
          code: "632801",
          name: "\u683C\u5C14\u6728\u5E02"
        },
        {
          code: "632802",
          name: "\u5FB7\u4EE4\u54C8\u5E02"
        },
        {
          code: "632821",
          name: "\u4E4C\u5170\u53BF"
        },
        {
          code: "632822",
          name: "\u90FD\u5170\u53BF"
        },
        {
          code: "632823",
          name: "\u5929\u5CFB\u53BF"
        },
        {
          code: "632824",
          name: "\u51B7\u6E56\u884C\u653F\u59D4\u5458\u4F1A"
        },
        {
          code: "632825",
          name: "\u5927\u67F4\u65E6\u884C\u653F\u59D4\u5458\u4F1A"
        },
        {
          code: "632826",
          name: "\u832B\u5D16\u884C\u653F\u59D4\u5458\u4F1A"
        }
      ]
    ],
    [
      [
        {
          code: "640104",
          name: "\u5174\u5E86\u533A"
        },
        {
          code: "640105",
          name: "\u897F\u590F\u533A"
        },
        {
          code: "640106",
          name: "\u91D1\u51E4\u533A"
        },
        {
          code: "640121",
          name: "\u6C38\u5B81\u53BF"
        },
        {
          code: "640122",
          name: "\u8D3A\u5170\u53BF"
        },
        {
          code: "640181",
          name: "\u7075\u6B66\u5E02"
        }
      ],
      [
        {
          code: "640202",
          name: "\u5927\u6B66\u53E3\u533A"
        },
        {
          code: "640205",
          name: "\u60E0\u519C\u533A"
        },
        {
          code: "640221",
          name: "\u5E73\u7F57\u53BF"
        }
      ],
      [
        {
          code: "640302",
          name: "\u5229\u901A\u533A"
        },
        {
          code: "640303",
          name: "\u7EA2\u5BFA\u5821\u533A"
        },
        {
          code: "640323",
          name: "\u76D0\u6C60\u53BF"
        },
        {
          code: "640324",
          name: "\u540C\u5FC3\u53BF"
        },
        {
          code: "640381",
          name: "\u9752\u94DC\u5CE1\u5E02"
        }
      ],
      [
        {
          code: "640402",
          name: "\u539F\u5DDE\u533A"
        },
        {
          code: "640422",
          name: "\u897F\u5409\u53BF"
        },
        {
          code: "640423",
          name: "\u9686\u5FB7\u53BF"
        },
        {
          code: "640424",
          name: "\u6CFE\u6E90\u53BF"
        },
        {
          code: "640425",
          name: "\u5F6D\u9633\u53BF"
        }
      ],
      [
        {
          code: "640502",
          name: "\u6C99\u5761\u5934\u533A"
        },
        {
          code: "640521",
          name: "\u4E2D\u5B81\u53BF"
        },
        {
          code: "640522",
          name: "\u6D77\u539F\u53BF"
        }
      ]
    ],
    [
      [
        {
          code: "650102",
          name: "\u5929\u5C71\u533A"
        },
        {
          code: "650103",
          name: "\u6C99\u4F9D\u5DF4\u514B\u533A"
        },
        {
          code: "650104",
          name: "\u65B0\u5E02\u533A"
        },
        {
          code: "650105",
          name: "\u6C34\u78E8\u6C9F\u533A"
        },
        {
          code: "650106",
          name: "\u5934\u5C6F\u6CB3\u533A"
        },
        {
          code: "650107",
          name: "\u8FBE\u5742\u57CE\u533A"
        },
        {
          code: "650109",
          name: "\u7C73\u4E1C\u533A"
        },
        {
          code: "650121",
          name: "\u4E4C\u9C81\u6728\u9F50\u53BF"
        }
      ],
      [
        {
          code: "650202",
          name: "\u72EC\u5C71\u5B50\u533A"
        },
        {
          code: "650203",
          name: "\u514B\u62C9\u739B\u4F9D\u533A"
        },
        {
          code: "650204",
          name: "\u767D\u78B1\u6EE9\u533A"
        },
        {
          code: "650205",
          name: "\u4E4C\u5C14\u79BE\u533A"
        }
      ],
      [
        {
          code: "650402",
          name: "\u9AD8\u660C\u533A"
        },
        {
          code: "650421",
          name: "\u912F\u5584\u53BF"
        },
        {
          code: "650422",
          name: "\u6258\u514B\u900A\u53BF"
        }
      ],
      [
        {
          code: "650502",
          name: "\u4F0A\u5DDE\u533A"
        },
        {
          code: "650521",
          name: "\u5DF4\u91CC\u5764\u54C8\u8428\u514B\u81EA\u6CBB\u53BF"
        },
        {
          code: "650522",
          name: "\u4F0A\u543E\u53BF"
        }
      ],
      [
        {
          code: "652301",
          name: "\u660C\u5409\u5E02"
        },
        {
          code: "652302",
          name: "\u961C\u5EB7\u5E02"
        },
        {
          code: "652323",
          name: "\u547C\u56FE\u58C1\u53BF"
        },
        {
          code: "652324",
          name: "\u739B\u7EB3\u65AF\u53BF"
        },
        {
          code: "652325",
          name: "\u5947\u53F0\u53BF"
        },
        {
          code: "652327",
          name: "\u5409\u6728\u8428\u5C14\u53BF"
        },
        {
          code: "652328",
          name: "\u6728\u5792\u54C8\u8428\u514B\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "652701",
          name: "\u535A\u4E50\u5E02"
        },
        {
          code: "652702",
          name: "\u963F\u62C9\u5C71\u53E3\u5E02"
        },
        {
          code: "652722",
          name: "\u7CBE\u6CB3\u53BF"
        },
        {
          code: "652723",
          name: "\u6E29\u6CC9\u53BF"
        }
      ],
      [
        {
          code: "652801",
          name: "\u5E93\u5C14\u52D2\u5E02"
        },
        {
          code: "652822",
          name: "\u8F6E\u53F0\u53BF"
        },
        {
          code: "652823",
          name: "\u5C09\u7281\u53BF"
        },
        {
          code: "652824",
          name: "\u82E5\u7F8C\u53BF"
        },
        {
          code: "652825",
          name: "\u4E14\u672B\u53BF"
        },
        {
          code: "652826",
          name: "\u7109\u8006\u56DE\u65CF\u81EA\u6CBB\u53BF"
        },
        {
          code: "652827",
          name: "\u548C\u9759\u53BF"
        },
        {
          code: "652828",
          name: "\u548C\u7855\u53BF"
        },
        {
          code: "652829",
          name: "\u535A\u6E56\u53BF"
        }
      ],
      [
        {
          code: "652901",
          name: "\u963F\u514B\u82CF\u5E02"
        },
        {
          code: "652922",
          name: "\u6E29\u5BBF\u53BF"
        },
        {
          code: "652923",
          name: "\u5E93\u8F66\u53BF"
        },
        {
          code: "652924",
          name: "\u6C99\u96C5\u53BF"
        },
        {
          code: "652925",
          name: "\u65B0\u548C\u53BF"
        },
        {
          code: "652926",
          name: "\u62DC\u57CE\u53BF"
        },
        {
          code: "652927",
          name: "\u4E4C\u4EC0\u53BF"
        },
        {
          code: "652928",
          name: "\u963F\u74E6\u63D0\u53BF"
        },
        {
          code: "652929",
          name: "\u67EF\u576A\u53BF"
        }
      ],
      [
        {
          code: "653001",
          name: "\u963F\u56FE\u4EC0\u5E02"
        },
        {
          code: "653022",
          name: "\u963F\u514B\u9676\u53BF"
        },
        {
          code: "653023",
          name: "\u963F\u5408\u5947\u53BF"
        },
        {
          code: "653024",
          name: "\u4E4C\u6070\u53BF"
        }
      ],
      [
        {
          code: "653101",
          name: "\u5580\u4EC0\u5E02"
        },
        {
          code: "653121",
          name: "\u758F\u9644\u53BF"
        },
        {
          code: "653122",
          name: "\u758F\u52D2\u53BF"
        },
        {
          code: "653123",
          name: "\u82F1\u5409\u6C99\u53BF"
        },
        {
          code: "653124",
          name: "\u6CFD\u666E\u53BF"
        },
        {
          code: "653125",
          name: "\u838E\u8F66\u53BF"
        },
        {
          code: "653126",
          name: "\u53F6\u57CE\u53BF"
        },
        {
          code: "653127",
          name: "\u9EA6\u76D6\u63D0\u53BF"
        },
        {
          code: "653128",
          name: "\u5CB3\u666E\u6E56\u53BF"
        },
        {
          code: "653129",
          name: "\u4F3D\u5E08\u53BF"
        },
        {
          code: "653130",
          name: "\u5DF4\u695A\u53BF"
        },
        {
          code: "653131",
          name: "\u5854\u4EC0\u5E93\u5C14\u5E72\u5854\u5409\u514B\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "653201",
          name: "\u548C\u7530\u5E02"
        },
        {
          code: "653221",
          name: "\u548C\u7530\u53BF"
        },
        {
          code: "653222",
          name: "\u58A8\u7389\u53BF"
        },
        {
          code: "653223",
          name: "\u76AE\u5C71\u53BF"
        },
        {
          code: "653224",
          name: "\u6D1B\u6D66\u53BF"
        },
        {
          code: "653225",
          name: "\u7B56\u52D2\u53BF"
        },
        {
          code: "653226",
          name: "\u4E8E\u7530\u53BF"
        },
        {
          code: "653227",
          name: "\u6C11\u4E30\u53BF"
        }
      ],
      [
        {
          code: "654002",
          name: "\u4F0A\u5B81\u5E02"
        },
        {
          code: "654003",
          name: "\u594E\u5C6F\u5E02"
        },
        {
          code: "654004",
          name: "\u970D\u5C14\u679C\u65AF\u5E02"
        },
        {
          code: "654021",
          name: "\u4F0A\u5B81\u53BF"
        },
        {
          code: "654022",
          name: "\u5BDF\u5E03\u67E5\u5C14\u9521\u4F2F\u81EA\u6CBB\u53BF"
        },
        {
          code: "654023",
          name: "\u970D\u57CE\u53BF"
        },
        {
          code: "654024",
          name: "\u5DE9\u7559\u53BF"
        },
        {
          code: "654025",
          name: "\u65B0\u6E90\u53BF"
        },
        {
          code: "654026",
          name: "\u662D\u82CF\u53BF"
        },
        {
          code: "654027",
          name: "\u7279\u514B\u65AF\u53BF"
        },
        {
          code: "654028",
          name: "\u5C3C\u52D2\u514B\u53BF"
        }
      ],
      [
        {
          code: "654201",
          name: "\u5854\u57CE\u5E02"
        },
        {
          code: "654202",
          name: "\u4E4C\u82CF\u5E02"
        },
        {
          code: "654203",
          name: "\u6C99\u6E7E\u5E02"
        },
        {
          code: "654221",
          name: "\u989D\u654F\u53BF"
        },
        {
          code: "654224",
          name: "\u6258\u91CC\u53BF"
        },
        {
          code: "654225",
          name: "\u88D5\u6C11\u53BF"
        },
        {
          code: "654226",
          name: "\u548C\u5E03\u514B\u8D5B\u5C14\u8499\u53E4\u81EA\u6CBB\u53BF"
        }
      ],
      [
        {
          code: "654301",
          name: "\u963F\u52D2\u6CF0\u5E02"
        },
        {
          code: "654321",
          name: "\u5E03\u5C14\u6D25\u53BF"
        },
        {
          code: "654322",
          name: "\u5BCC\u8574\u53BF"
        },
        {
          code: "654323",
          name: "\u798F\u6D77\u53BF"
        },
        {
          code: "654324",
          name: "\u54C8\u5DF4\u6CB3\u53BF"
        },
        {
          code: "654325",
          name: "\u9752\u6CB3\u53BF"
        },
        {
          code: "654326",
          name: "\u5409\u6728\u4E43\u53BF"
        }
      ],
      [
        {
          code: "659001",
          name: "\u77F3\u6CB3\u5B50\u5E02"
        },
        {
          code: "659002",
          name: "\u963F\u62C9\u5C14\u5E02"
        },
        {
          code: "659003",
          name: "\u56FE\u6728\u8212\u514B\u5E02"
        },
        {
          code: "659004",
          name: "\u4E94\u5BB6\u6E20\u5E02"
        },
        {
          code: "659005",
          name: "\u5317\u5C6F\u5E02"
        },
        {
          code: "659006",
          name: "\u94C1\u95E8\u5173\u5E02"
        },
        {
          code: "659007",
          name: "\u53CC\u6CB3\u5E02"
        },
        {
          code: "659008",
          name: "\u53EF\u514B\u8FBE\u62C9\u5E02"
        },
        {
          code: "659009",
          name: "\u6606\u7389\u5E02"
        }
      ]
    ],
    [
      [
        {
          code: "710101",
          name: "\u4E2D\u6B63\u533A"
        },
        {
          code: "710102",
          name: "\u5927\u540C\u533A"
        },
        {
          code: "710103",
          name: "\u4E2D\u5C71\u533A"
        },
        {
          code: "710104",
          name: "\u677E\u5C71\u533A"
        },
        {
          code: "710105",
          name: "\u5927\u5B89\u533A"
        },
        {
          code: "710106",
          name: "\u4E07\u534E\u533A"
        },
        {
          code: "710107",
          name: "\u4FE1\u4E49\u533A"
        },
        {
          code: "710108",
          name: "\u58EB\u6797\u533A"
        },
        {
          code: "710109",
          name: "\u5317\u6295\u533A"
        },
        {
          code: "710110",
          name: "\u5185\u6E56\u533A"
        },
        {
          code: "710111",
          name: "\u5357\u6E2F\u533A"
        },
        {
          code: "710112",
          name: "\u6587\u5C71\u533A"
        }
      ],
      [
        {
          code: "710201",
          name: "\u65B0\u5174\u533A"
        },
        {
          code: "710202",
          name: "\u524D\u91D1\u533A"
        },
        {
          code: "710203",
          name: "\u82D3\u96C5\u533A"
        },
        {
          code: "710204",
          name: "\u76D0\u57D5\u533A"
        },
        {
          code: "710205",
          name: "\u9F13\u5C71\u533A"
        },
        {
          code: "710206",
          name: "\u65D7\u6D25\u533A"
        },
        {
          code: "710207",
          name: "\u524D\u9547\u533A"
        },
        {
          code: "710208",
          name: "\u4E09\u6C11\u533A"
        },
        {
          code: "710209",
          name: "\u5DE6\u8425\u533A"
        },
        {
          code: "710210",
          name: "\u6960\u6893\u533A"
        },
        {
          code: "710211",
          name: "\u5C0F\u6E2F\u533A"
        },
        {
          code: "710242",
          name: "\u4EC1\u6B66\u533A"
        },
        {
          code: "710243",
          name: "\u5927\u793E\u533A"
        },
        {
          code: "710244",
          name: "\u5188\u5C71\u533A"
        },
        {
          code: "710245",
          name: "\u8DEF\u7AF9\u533A"
        },
        {
          code: "710246",
          name: "\u963F\u83B2\u533A"
        },
        {
          code: "710247",
          name: "\u7530\u5BEE\u533A"
        },
        {
          code: "710248",
          name: "\u71D5\u5DE2\u533A"
        },
        {
          code: "710249",
          name: "\u6865\u5934\u533A"
        },
        {
          code: "710250",
          name: "\u6893\u5B98\u533A"
        },
        {
          code: "710251",
          name: "\u5F25\u9640\u533A"
        },
        {
          code: "710252",
          name: "\u6C38\u5B89\u533A"
        },
        {
          code: "710253",
          name: "\u6E56\u5185\u533A"
        },
        {
          code: "710254",
          name: "\u51E4\u5C71\u533A"
        },
        {
          code: "710255",
          name: "\u5927\u5BEE\u533A"
        },
        {
          code: "710256",
          name: "\u6797\u56ED\u533A"
        },
        {
          code: "710257",
          name: "\u9E1F\u677E\u533A"
        },
        {
          code: "710258",
          name: "\u5927\u6811\u533A"
        },
        {
          code: "710259",
          name: "\u65D7\u5C71\u533A"
        },
        {
          code: "710260",
          name: "\u7F8E\u6D53\u533A"
        },
        {
          code: "710261",
          name: "\u516D\u9F9F\u533A"
        },
        {
          code: "710262",
          name: "\u5185\u95E8\u533A"
        },
        {
          code: "710263",
          name: "\u6749\u6797\u533A"
        },
        {
          code: "710264",
          name: "\u7532\u4ED9\u533A"
        },
        {
          code: "710265",
          name: "\u6843\u6E90\u533A"
        },
        {
          code: "710266",
          name: "\u90A3\u739B\u590F\u533A"
        },
        {
          code: "710267",
          name: "\u8302\u6797\u533A"
        },
        {
          code: "710268",
          name: "\u8304\u8423\u533A"
        }
      ],
      [
        {
          code: "710301",
          name: "\u4E2D\u897F\u533A"
        },
        {
          code: "710302",
          name: "\u4E1C\u533A"
        },
        {
          code: "710303",
          name: "\u5357\u533A"
        },
        {
          code: "710304",
          name: "\u5317\u533A"
        },
        {
          code: "710305",
          name: "\u5B89\u5E73\u533A"
        },
        {
          code: "710306",
          name: "\u5B89\u5357\u533A"
        },
        {
          code: "710339",
          name: "\u6C38\u5EB7\u533A"
        },
        {
          code: "710340",
          name: "\u5F52\u4EC1\u533A"
        },
        {
          code: "710341",
          name: "\u65B0\u5316\u533A"
        },
        {
          code: "710342",
          name: "\u5DE6\u9547\u533A"
        },
        {
          code: "710343",
          name: "\u7389\u4E95\u533A"
        },
        {
          code: "710344",
          name: "\u6960\u897F\u533A"
        },
        {
          code: "710345",
          name: "\u5357\u5316\u533A"
        },
        {
          code: "710346",
          name: "\u4EC1\u5FB7\u533A"
        },
        {
          code: "710347",
          name: "\u5173\u5E99\u533A"
        },
        {
          code: "710348",
          name: "\u9F99\u5D0E\u533A"
        },
        {
          code: "710349",
          name: "\u5B98\u7530\u533A"
        },
        {
          code: "710350",
          name: "\u9EBB\u8C46\u533A"
        },
        {
          code: "710351",
          name: "\u4F73\u91CC\u533A"
        },
        {
          code: "710352",
          name: "\u897F\u6E2F\u533A"
        },
        {
          code: "710353",
          name: "\u4E03\u80A1\u533A"
        },
        {
          code: "710354",
          name: "\u5C06\u519B\u533A"
        },
        {
          code: "710355",
          name: "\u5B66\u7532\u533A"
        },
        {
          code: "710356",
          name: "\u5317\u95E8\u533A"
        },
        {
          code: "710357",
          name: "\u65B0\u8425\u533A"
        },
        {
          code: "710358",
          name: "\u540E\u58C1\u533A"
        },
        {
          code: "710359",
          name: "\u767D\u6CB3\u533A"
        },
        {
          code: "710360",
          name: "\u4E1C\u5C71\u533A"
        },
        {
          code: "710361",
          name: "\u516D\u7532\u533A"
        },
        {
          code: "710362",
          name: "\u4E0B\u8425\u533A"
        },
        {
          code: "710363",
          name: "\u67F3\u8425\u533A"
        },
        {
          code: "710364",
          name: "\u76D0\u6C34\u533A"
        },
        {
          code: "710365",
          name: "\u5584\u5316\u533A"
        },
        {
          code: "710366",
          name: "\u5927\u5185\u533A"
        },
        {
          code: "710367",
          name: "\u5C71\u4E0A\u533A"
        },
        {
          code: "710368",
          name: "\u65B0\u5E02\u533A"
        },
        {
          code: "710369",
          name: "\u5B89\u5B9A\u533A"
        }
      ],
      [
        {
          code: "710401",
          name: "\u4E2D\u533A"
        },
        {
          code: "710402",
          name: "\u4E1C\u533A"
        },
        {
          code: "710403",
          name: "\u5357\u533A"
        },
        {
          code: "710404",
          name: "\u897F\u533A"
        },
        {
          code: "710405",
          name: "\u5317\u533A"
        },
        {
          code: "710406",
          name: "\u5317\u5C6F\u533A"
        },
        {
          code: "710407",
          name: "\u897F\u5C6F\u533A"
        },
        {
          code: "710408",
          name: "\u5357\u5C6F\u533A"
        },
        {
          code: "710431",
          name: "\u592A\u5E73\u533A"
        },
        {
          code: "710432",
          name: "\u5927\u91CC\u533A"
        },
        {
          code: "710433",
          name: "\u96FE\u5CF0\u533A"
        },
        {
          code: "710434",
          name: "\u4E4C\u65E5\u533A"
        },
        {
          code: "710435",
          name: "\u4E30\u539F\u533A"
        },
        {
          code: "710436",
          name: "\u540E\u91CC\u533A"
        },
        {
          code: "710437",
          name: "\u77F3\u5188\u533A"
        },
        {
          code: "710438",
          name: "\u4E1C\u52BF\u533A"
        },
        {
          code: "710439",
          name: "\u548C\u5E73\u533A"
        },
        {
          code: "710440",
          name: "\u65B0\u793E\u533A"
        },
        {
          code: "710441",
          name: "\u6F6D\u5B50\u533A"
        },
        {
          code: "710442",
          name: "\u5927\u96C5\u533A"
        },
        {
          code: "710443",
          name: "\u795E\u5188\u533A"
        },
        {
          code: "710444",
          name: "\u5927\u809A\u533A"
        },
        {
          code: "710445",
          name: "\u6C99\u9E7F\u533A"
        },
        {
          code: "710446",
          name: "\u9F99\u4E95\u533A"
        },
        {
          code: "710447",
          name: "\u68A7\u6816\u533A"
        },
        {
          code: "710448",
          name: "\u6E05\u6C34\u533A"
        },
        {
          code: "710449",
          name: "\u5927\u7532\u533A"
        },
        {
          code: "710450",
          name: "\u5916\u57D4\u533A"
        },
        {
          code: "710451",
          name: "\u5927\u5B89\u533A"
        }
      ],
      [
        {
          code: "710614",
          name: "\u5357\u6295\u5E02"
        },
        {
          code: "710615",
          name: "\u4E2D\u5BEE\u4E61"
        },
        {
          code: "710616",
          name: "\u8349\u5C6F\u9547"
        },
        {
          code: "710617",
          name: "\u56FD\u59D3\u4E61"
        },
        {
          code: "710618",
          name: "\u57D4\u91CC\u9547"
        },
        {
          code: "710619",
          name: "\u4EC1\u7231\u4E61"
        },
        {
          code: "710620",
          name: "\u540D\u95F4\u4E61"
        },
        {
          code: "710621",
          name: "\u96C6\u96C6\u9547"
        },
        {
          code: "710622",
          name: "\u6C34\u91CC\u4E61"
        },
        {
          code: "710623",
          name: "\u9C7C\u6C60\u4E61"
        },
        {
          code: "710624",
          name: "\u4FE1\u4E49\u4E61"
        },
        {
          code: "710625",
          name: "\u7AF9\u5C71\u9547"
        },
        {
          code: "710626",
          name: "\u9E7F\u8C37\u4E61"
        }
      ],
      [
        {
          code: "710701",
          name: "\u4EC1\u7231\u533A"
        },
        {
          code: "710702",
          name: "\u4FE1\u4E49\u533A"
        },
        {
          code: "710703",
          name: "\u4E2D\u6B63\u533A"
        },
        {
          code: "710704",
          name: "\u4E2D\u5C71\u533A"
        },
        {
          code: "710705",
          name: "\u5B89\u4E50\u533A"
        },
        {
          code: "710706",
          name: "\u6696\u6696\u533A"
        },
        {
          code: "710707",
          name: "\u4E03\u5835\u533A"
        }
      ],
      [
        {
          code: "710801",
          name: "\u4E1C\u533A"
        },
        {
          code: "710802",
          name: "\u5317\u533A"
        },
        {
          code: "710803",
          name: "\u9999\u5C71\u533A"
        }
      ],
      [
        {
          code: "710901",
          name: "\u4E1C\u533A"
        },
        {
          code: "710902",
          name: "\u897F\u533A"
        }
      ],
      [
        {
          code: "711130",
          name: "\u4E07\u91CC\u533A"
        },
        {
          code: "711131",
          name: "\u91D1\u5C71\u533A"
        },
        {
          code: "711132",
          name: "\u677F\u6865\u533A"
        },
        {
          code: "711133",
          name: "\u6C50\u6B62\u533A"
        },
        {
          code: "711134",
          name: "\u6DF1\u5751\u533A"
        },
        {
          code: "711135",
          name: "\u77F3\u7887\u533A"
        },
        {
          code: "711136",
          name: "\u745E\u82B3\u533A"
        },
        {
          code: "711137",
          name: "\u5E73\u6EAA\u533A"
        },
        {
          code: "711138",
          name: "\u53CC\u6EAA\u533A"
        },
        {
          code: "711139",
          name: "\u8D21\u5BEE\u533A"
        },
        {
          code: "711140",
          name: "\u65B0\u5E97\u533A"
        },
        {
          code: "711141",
          name: "\u576A\u6797\u533A"
        },
        {
          code: "711142",
          name: "\u4E4C\u6765\u533A"
        },
        {
          code: "711143",
          name: "\u6C38\u548C\u533A"
        },
        {
          code: "711144",
          name: "\u4E2D\u548C\u533A"
        },
        {
          code: "711145",
          name: "\u571F\u57CE\u533A"
        },
        {
          code: "711146",
          name: "\u4E09\u5CE1\u533A"
        },
        {
          code: "711147",
          name: "\u6811\u6797\u533A"
        },
        {
          code: "711148",
          name: "\u83BA\u6B4C\u533A"
        },
        {
          code: "711149",
          name: "\u4E09\u91CD\u533A"
        },
        {
          code: "711150",
          name: "\u65B0\u5E84\u533A"
        },
        {
          code: "711151",
          name: "\u6CF0\u5C71\u533A"
        },
        {
          code: "711152",
          name: "\u6797\u53E3\u533A"
        },
        {
          code: "711153",
          name: "\u82A6\u6D32\u533A"
        },
        {
          code: "711154",
          name: "\u4E94\u80A1\u533A"
        },
        {
          code: "711155",
          name: "\u516B\u91CC\u533A"
        },
        {
          code: "711156",
          name: "\u6DE1\u6C34\u533A"
        },
        {
          code: "711157",
          name: "\u4E09\u829D\u533A"
        },
        {
          code: "711158",
          name: "\u77F3\u95E8\u533A"
        }
      ],
      [
        {
          code: "711214",
          name: "\u5B9C\u5170\u5E02"
        },
        {
          code: "711215",
          name: "\u5934\u57CE\u9547"
        },
        {
          code: "711216",
          name: "\u7901\u6EAA\u4E61"
        },
        {
          code: "711217",
          name: "\u58EE\u56F4\u4E61"
        },
        {
          code: "711218",
          name: "\u5458\u5C71\u4E61"
        },
        {
          code: "711219",
          name: "\u7F57\u4E1C\u9547"
        },
        {
          code: "711220",
          name: "\u4E09\u661F\u4E61"
        },
        {
          code: "711221",
          name: "\u5927\u540C\u4E61"
        },
        {
          code: "711222",
          name: "\u4E94\u7ED3\u4E61"
        },
        {
          code: "711223",
          name: "\u51AC\u5C71\u4E61"
        },
        {
          code: "711224",
          name: "\u82CF\u6FB3\u9547"
        },
        {
          code: "711225",
          name: "\u5357\u6FB3\u4E61"
        }
      ],
      [
        {
          code: "711314",
          name: "\u7AF9\u5317\u5E02"
        },
        {
          code: "711315",
          name: "\u6E56\u53E3\u4E61"
        },
        {
          code: "711316",
          name: "\u65B0\u4E30\u4E61"
        },
        {
          code: "711317",
          name: "\u65B0\u57D4\u9547"
        },
        {
          code: "711318",
          name: "\u5173\u897F\u9547"
        },
        {
          code: "711319",
          name: "\u828E\u6797\u4E61"
        },
        {
          code: "711320",
          name: "\u5B9D\u5C71\u4E61"
        },
        {
          code: "711321",
          name: "\u7AF9\u4E1C\u9547"
        },
        {
          code: "711322",
          name: "\u4E94\u5CF0\u4E61"
        },
        {
          code: "711323",
          name: "\u6A2A\u5C71\u4E61"
        },
        {
          code: "711324",
          name: "\u5C16\u77F3\u4E61"
        },
        {
          code: "711325",
          name: "\u5317\u57D4\u4E61"
        },
        {
          code: "711326",
          name: "\u5CE8\u7709\u4E61"
        }
      ],
      [
        {
          code: "711414",
          name: "\u4E2D\u575C\u533A"
        },
        {
          code: "711415",
          name: "\u5E73\u9547\u533A"
        },
        {
          code: "711416",
          name: "\u9F99\u6F6D\u533A"
        },
        {
          code: "711417",
          name: "\u6768\u6885\u533A"
        },
        {
          code: "711418",
          name: "\u65B0\u5C4B\u533A"
        },
        {
          code: "711419",
          name: "\u89C2\u97F3\u533A"
        },
        {
          code: "711420",
          name: "\u6843\u56ED\u533A"
        },
        {
          code: "711421",
          name: "\u9F9F\u5C71\u533A"
        },
        {
          code: "711422",
          name: "\u516B\u5FB7\u533A"
        },
        {
          code: "711423",
          name: "\u5927\u6EAA\u533A"
        },
        {
          code: "711424",
          name: "\u590D\u5174\u533A"
        },
        {
          code: "711425",
          name: "\u5927\u56ED\u533A"
        },
        {
          code: "711426",
          name: "\u82A6\u7AF9\u533A"
        }
      ],
      [
        {
          code: "711519",
          name: "\u7AF9\u5357\u9547"
        },
        {
          code: "711520",
          name: "\u5934\u4EFD\u5E02"
        },
        {
          code: "711521",
          name: "\u4E09\u6E7E\u4E61"
        },
        {
          code: "711522",
          name: "\u5357\u5E84\u4E61"
        },
        {
          code: "711523",
          name: "\u72EE\u6F6D\u4E61"
        },
        {
          code: "711524",
          name: "\u540E\u9F99\u9547"
        },
        {
          code: "711525",
          name: "\u901A\u9704\u9547"
        },
        {
          code: "711526",
          name: "\u82D1\u91CC\u9547"
        },
        {
          code: "711527",
          name: "\u82D7\u6817\u5E02"
        },
        {
          code: "711528",
          name: "\u9020\u6865\u4E61"
        },
        {
          code: "711529",
          name: "\u5934\u5C4B\u4E61"
        },
        {
          code: "711530",
          name: "\u516C\u9986\u4E61"
        },
        {
          code: "711531",
          name: "\u5927\u6E56\u4E61"
        },
        {
          code: "711532",
          name: "\u6CF0\u5B89\u4E61"
        },
        {
          code: "711533",
          name: "\u94DC\u9523\u4E61"
        },
        {
          code: "711534",
          name: "\u4E09\u4E49\u4E61"
        },
        {
          code: "711535",
          name: "\u897F\u6E56\u4E61"
        },
        {
          code: "711536",
          name: "\u5353\u5170\u9547"
        }
      ],
      [
        {
          code: "711727",
          name: "\u5F70\u5316\u5E02"
        },
        {
          code: "711728",
          name: "\u82AC\u56ED\u4E61"
        },
        {
          code: "711729",
          name: "\u82B1\u575B\u4E61"
        },
        {
          code: "711730",
          name: "\u79C0\u6C34\u4E61"
        },
        {
          code: "711731",
          name: "\u9E7F\u6E2F\u9547"
        },
        {
          code: "711732",
          name: "\u798F\u5174\u4E61"
        },
        {
          code: "711733",
          name: "\u7EBF\u897F\u4E61"
        },
        {
          code: "711734",
          name: "\u548C\u7F8E\u9547"
        },
        {
          code: "711735",
          name: "\u4F38\u6E2F\u4E61"
        },
        {
          code: "711736",
          name: "\u5458\u6797\u5E02"
        },
        {
          code: "711737",
          name: "\u793E\u5934\u4E61"
        },
        {
          code: "711738",
          name: "\u6C38\u9756\u4E61"
        },
        {
          code: "711739",
          name: "\u57D4\u5FC3\u4E61"
        },
        {
          code: "711740",
          name: "\u6EAA\u6E56\u9547"
        },
        {
          code: "711741",
          name: "\u5927\u6751\u4E61"
        },
        {
          code: "711742",
          name: "\u57D4\u76D0\u4E61"
        },
        {
          code: "711743",
          name: "\u7530\u4E2D\u9547"
        },
        {
          code: "711744",
          name: "\u5317\u6597\u9547"
        },
        {
          code: "711745",
          name: "\u7530\u5C3E\u4E61"
        },
        {
          code: "711746",
          name: "\u57E4\u5934\u4E61"
        },
        {
          code: "711747",
          name: "\u6EAA\u5DDE\u4E61"
        },
        {
          code: "711748",
          name: "\u7AF9\u5858\u4E61"
        },
        {
          code: "711749",
          name: "\u4E8C\u6797\u9547"
        },
        {
          code: "711750",
          name: "\u5927\u57CE\u4E61"
        },
        {
          code: "711751",
          name: "\u82B3\u82D1\u4E61"
        },
        {
          code: "711752",
          name: "\u4E8C\u6C34\u4E61"
        }
      ],
      [
        {
          code: "711919",
          name: "\u756A\u8DEF\u4E61"
        },
        {
          code: "711920",
          name: "\u6885\u5C71\u4E61"
        },
        {
          code: "711921",
          name: "\u7AF9\u5D0E\u4E61"
        },
        {
          code: "711922",
          name: "\u963F\u91CC\u5C71\u4E61"
        },
        {
          code: "711923",
          name: "\u4E2D\u57D4\u4E61"
        },
        {
          code: "711924",
          name: "\u5927\u57D4\u4E61"
        },
        {
          code: "711925",
          name: "\u6C34\u4E0A\u4E61"
        },
        {
          code: "711926",
          name: "\u9E7F\u8349\u4E61"
        },
        {
          code: "711927",
          name: "\u592A\u4FDD\u5E02"
        },
        {
          code: "711928",
          name: "\u6734\u5B50\u5E02"
        },
        {
          code: "711929",
          name: "\u4E1C\u77F3\u4E61"
        },
        {
          code: "711930",
          name: "\u516D\u811A\u4E61"
        },
        {
          code: "711931",
          name: "\u65B0\u6E2F\u4E61"
        },
        {
          code: "711932",
          name: "\u6C11\u96C4\u4E61"
        },
        {
          code: "711933",
          name: "\u5927\u6797\u9547"
        },
        {
          code: "711934",
          name: "\u6EAA\u53E3\u4E61"
        },
        {
          code: "711935",
          name: "\u4E49\u7AF9\u4E61"
        },
        {
          code: "711936",
          name: "\u5E03\u888B\u9547"
        }
      ],
      [
        {
          code: "712121",
          name: "\u6597\u5357\u9547"
        },
        {
          code: "712122",
          name: "\u5927\u57E4\u4E61"
        },
        {
          code: "712123",
          name: "\u864E\u5C3E\u9547"
        },
        {
          code: "712124",
          name: "\u571F\u5E93\u9547"
        },
        {
          code: "712125",
          name: "\u8912\u5FE0\u4E61"
        },
        {
          code: "712126",
          name: "\u4E1C\u52BF\u4E61"
        },
        {
          code: "712127",
          name: "\u53F0\u897F\u4E61"
        },
        {
          code: "712128",
          name: "\u4ED1\u80CC\u4E61"
        },
        {
          code: "712129",
          name: "\u9EA6\u5BEE\u4E61"
        },
        {
          code: "712130",
          name: "\u6597\u516D\u5E02"
        },
        {
          code: "712131",
          name: "\u6797\u5185\u4E61"
        },
        {
          code: "712132",
          name: "\u53E4\u5751\u4E61"
        },
        {
          code: "712133",
          name: "\u83BF\u6850\u4E61"
        },
        {
          code: "712134",
          name: "\u897F\u87BA\u9547"
        },
        {
          code: "712135",
          name: "\u4E8C\u4ED1\u4E61"
        },
        {
          code: "712136",
          name: "\u5317\u6E2F\u9547"
        },
        {
          code: "712137",
          name: "\u6C34\u6797\u4E61"
        },
        {
          code: "712138",
          name: "\u53E3\u6E56\u4E61"
        },
        {
          code: "712139",
          name: "\u56DB\u6E56\u4E61"
        },
        {
          code: "712140",
          name: "\u5143\u957F\u4E61"
        }
      ],
      [
        {
          code: "712434",
          name: "\u5C4F\u4E1C\u5E02"
        },
        {
          code: "712435",
          name: "\u4E09\u5730\u95E8\u4E61"
        },
        {
          code: "712436",
          name: "\u96FE\u53F0\u4E61"
        },
        {
          code: "712437",
          name: "\u739B\u5BB6\u4E61"
        },
        {
          code: "712438",
          name: "\u4E5D\u5982\u4E61"
        },
        {
          code: "712439",
          name: "\u91CC\u6E2F\u4E61"
        },
        {
          code: "712440",
          name: "\u9AD8\u6811\u4E61"
        },
        {
          code: "712441",
          name: "\u76D0\u57D4\u4E61"
        },
        {
          code: "712442",
          name: "\u957F\u6CBB\u4E61"
        },
        {
          code: "712443",
          name: "\u9E9F\u6D1B\u4E61"
        },
        {
          code: "712444",
          name: "\u7AF9\u7530\u4E61"
        },
        {
          code: "712445",
          name: "\u5185\u57D4\u4E61"
        },
        {
          code: "712446",
          name: "\u4E07\u4E39\u4E61"
        },
        {
          code: "712447",
          name: "\u6F6E\u5DDE\u9547"
        },
        {
          code: "712448",
          name: "\u6CF0\u6B66\u4E61"
        },
        {
          code: "712449",
          name: "\u6765\u4E49\u4E61"
        },
        {
          code: "712450",
          name: "\u4E07\u5CE6\u4E61"
        },
        {
          code: "712451",
          name: "\u5D01\u9876\u4E61"
        },
        {
          code: "712452",
          name: "\u65B0\u57E4\u4E61"
        },
        {
          code: "712453",
          name: "\u5357\u5DDE\u4E61"
        },
        {
          code: "712454",
          name: "\u6797\u8FB9\u4E61"
        },
        {
          code: "712455",
          name: "\u4E1C\u6E2F\u9547"
        },
        {
          code: "712456",
          name: "\u7409\u7403\u4E61"
        },
        {
          code: "712457",
          name: "\u4F73\u51AC\u4E61"
        },
        {
          code: "712458",
          name: "\u65B0\u56ED\u4E61"
        },
        {
          code: "712459",
          name: "\u678B\u5BEE\u4E61"
        },
        {
          code: "712460",
          name: "\u678B\u5C71\u4E61"
        },
        {
          code: "712461",
          name: "\u6625\u65E5\u4E61"
        },
        {
          code: "712462",
          name: "\u72EE\u5B50\u4E61"
        },
        {
          code: "712463",
          name: "\u8F66\u57CE\u4E61"
        },
        {
          code: "712464",
          name: "\u7261\u4E39\u4E61"
        },
        {
          code: "712465",
          name: "\u6052\u6625\u9547"
        },
        {
          code: "712466",
          name: "\u6EE1\u5DDE\u4E61"
        }
      ],
      [
        {
          code: "712517",
          name: "\u53F0\u4E1C\u5E02"
        },
        {
          code: "712518",
          name: "\u7EFF\u5C9B\u4E61"
        },
        {
          code: "712519",
          name: "\u5170\u5C7F\u4E61"
        },
        {
          code: "712520",
          name: "\u5EF6\u5E73\u4E61"
        },
        {
          code: "712521",
          name: "\u5351\u5357\u4E61"
        },
        {
          code: "712522",
          name: "\u9E7F\u91CE\u4E61"
        },
        {
          code: "712523",
          name: "\u5173\u5C71\u9547"
        },
        {
          code: "712524",
          name: "\u6D77\u7AEF\u4E61"
        },
        {
          code: "712525",
          name: "\u6C60\u4E0A\u4E61"
        },
        {
          code: "712526",
          name: "\u4E1C\u6CB3\u4E61"
        },
        {
          code: "712527",
          name: "\u6210\u529F\u9547"
        },
        {
          code: "712528",
          name: "\u957F\u6EE8\u4E61"
        },
        {
          code: "712529",
          name: "\u91D1\u5CF0\u4E61"
        },
        {
          code: "712530",
          name: "\u5927\u6B66\u4E61"
        },
        {
          code: "712531",
          name: "\u8FBE\u4EC1\u4E61"
        },
        {
          code: "712532",
          name: "\u592A\u9EBB\u91CC\u4E61"
        }
      ],
      [
        {
          code: "712615",
          name: "\u82B1\u83B2\u5E02"
        },
        {
          code: "712616",
          name: "\u65B0\u57CE\u4E61"
        },
        {
          code: "712618",
          name: "\u79C0\u6797\u4E61"
        },
        {
          code: "712619",
          name: "\u5409\u5B89\u4E61"
        },
        {
          code: "712620",
          name: "\u5BFF\u4E30\u4E61"
        },
        {
          code: "712621",
          name: "\u51E4\u6797\u9547"
        },
        {
          code: "712622",
          name: "\u5149\u590D\u4E61"
        },
        {
          code: "712623",
          name: "\u4E30\u6EE8\u4E61"
        },
        {
          code: "712624",
          name: "\u745E\u7A57\u4E61"
        },
        {
          code: "712625",
          name: "\u4E07\u8363\u4E61"
        },
        {
          code: "712626",
          name: "\u7389\u91CC\u9547"
        },
        {
          code: "712627",
          name: "\u5353\u6EAA\u4E61"
        },
        {
          code: "712628",
          name: "\u5BCC\u91CC\u4E61"
        }
      ],
      [
        {
          code: "712707",
          name: "\u9A6C\u516C\u5E02"
        },
        {
          code: "712708",
          name: "\u897F\u5C7F\u4E61"
        },
        {
          code: "712709",
          name: "\u671B\u5B89\u4E61"
        },
        {
          code: "712710",
          name: "\u4E03\u7F8E\u4E61"
        },
        {
          code: "712711",
          name: "\u767D\u6C99\u4E61"
        },
        {
          code: "712712",
          name: "\u6E56\u897F\u4E61"
        }
      ]
    ],
    [
      [
        {
          code: "810101",
          name: "\u4E2D\u897F\u533A"
        },
        {
          code: "810102",
          name: "\u4E1C\u533A"
        },
        {
          code: "810103",
          name: "\u4E5D\u9F99\u57CE\u533A"
        },
        {
          code: "810104",
          name: "\u89C2\u5858\u533A"
        },
        {
          code: "810105",
          name: "\u5357\u533A"
        },
        {
          code: "810106",
          name: "\u6DF1\u6C34\u57D7\u533A"
        },
        {
          code: "810107",
          name: "\u6E7E\u4ED4\u533A"
        },
        {
          code: "810108",
          name: "\u9EC4\u5927\u4ED9\u533A"
        },
        {
          code: "810109",
          name: "\u6CB9\u5C16\u65FA\u533A"
        },
        {
          code: "810110",
          name: "\u79BB\u5C9B\u533A"
        },
        {
          code: "810111",
          name: "\u8475\u9752\u533A"
        },
        {
          code: "810112",
          name: "\u5317\u533A"
        },
        {
          code: "810113",
          name: "\u897F\u8D21\u533A"
        },
        {
          code: "810114",
          name: "\u6C99\u7530\u533A"
        },
        {
          code: "810115",
          name: "\u5C6F\u95E8\u533A"
        },
        {
          code: "810116",
          name: "\u5927\u57D4\u533A"
        },
        {
          code: "810117",
          name: "\u8343\u6E7E\u533A"
        },
        {
          code: "810118",
          name: "\u5143\u6717\u533A"
        }
      ]
    ],
    [
      [
        {
          code: "820101",
          name: "\u6FB3\u95E8\u534A\u5C9B"
        },
        {
          code: "820102",
          name: "\u51FC\u4ED4"
        },
        {
          code: "820103",
          name: "\u8DEF\u51FC\u57CE"
        },
        {
          code: "820104",
          name: "\u8DEF\u73AF"
        }
      ]
    ]
  ];
  const _sfc_main$8 = {
    name: "u-picker",
    emits: ["update:modelValue", "input", "confirm", "cancel"],
    props: {
      value: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      params: {
        type: Object,
        default() {
          return {
            year: true,
            month: true,
            day: true,
            hour: false,
            minute: false,
            second: false,
            province: true,
            city: true,
            area: true,
            timestamp: true
          };
        }
      },
      range: {
        type: Array,
        default() {
          return [];
        }
      },
      defaultSelector: {
        type: Array,
        default() {
          return [0];
        }
      },
      rangeKey: {
        type: String,
        default: ""
      },
      mode: {
        type: String,
        default: "time"
      },
      startYear: {
        type: [String, Number],
        default: 1950
      },
      endYear: {
        type: [String, Number],
        default: 2050
      },
      cancelColor: {
        type: String,
        default: "#606266"
      },
      confirmColor: {
        type: String,
        default: "#2979ff"
      },
      defaultTime: {
        type: String,
        default: ""
      },
      defaultRegion: {
        type: Array,
        default() {
          return [];
        }
      },
      showTimeTag: {
        type: Boolean,
        default: true
      },
      areaCode: {
        type: Array,
        default() {
          return [];
        }
      },
      safeAreaInsetBottom: {
        type: Boolean,
        default: false
      },
      maskCloseAble: {
        type: Boolean,
        default: true
      },
      zIndex: {
        type: [String, Number],
        default: 0
      },
      title: {
        type: String,
        default: ""
      },
      cancelText: {
        type: String,
        default: "\u53D6\u6D88"
      },
      confirmText: {
        type: String,
        default: "\u786E\u8BA4"
      },
      blur: {
        type: [String, Number],
        default: 0
      }
    },
    data() {
      return {
        popupValue: false,
        years: [],
        months: [],
        days: [],
        hours: [],
        minutes: [],
        seconds: [],
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        reset: false,
        startDate: "",
        endDate: "",
        valueArr: [],
        provinces,
        citys: citys[0],
        areas: areas[0][0],
        province: 0,
        city: 0,
        area: 0,
        moving: false
      };
    },
    mounted() {
      this.init();
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      propsChange() {
        return `${this.mode}-${this.defaultTime}-${this.startYear}-${this.endYear}-${this.defaultRegion}-${this.areaCode}`;
      },
      regionChange() {
        return `${this.province}-${this.city}`;
      },
      yearAndMonth() {
        return `${this.year}-${this.month}`;
      },
      uZIndex() {
        return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
      }
    },
    watch: {
      propsChange() {
        this.reset = true;
        setTimeout(() => this.init(), 10);
      },
      regionChange(val) {
        this.citys = citys[this.province];
        this.areas = areas[this.province][this.city];
      },
      yearAndMonth(val) {
        if (this.params.year)
          this.setDays();
      },
      valueCom(n) {
        if (n) {
          this.reset = true;
          setTimeout(() => this.init(), 10);
        }
        this.popupValue = n;
      }
    },
    methods: {
      pickstart() {
      },
      pickend() {
      },
      getItemValue(item, mode) {
        if (this.mode == mode) {
          return typeof item == "object" ? item[this.rangeKey] : item;
        }
      },
      formatNumber(num) {
        return +num < 10 ? "0" + num : String(num);
      },
      generateArray: function(start, end) {
        start = Number(start);
        end = Number(end);
        end = end > start ? end : start;
        return [...Array(end + 1).keys()].slice(start);
      },
      getIndex: function(arr, val) {
        let index = arr.indexOf(val);
        return ~index ? index : 0;
      },
      initTimeValue() {
        let fdate = this.defaultTime.replace(/\-/g, "/");
        fdate = fdate && fdate.indexOf("/") == -1 ? `2020/01/01 ${fdate}` : fdate;
        let time = null;
        if (fdate)
          time = new Date(fdate);
        else
          time = new Date();
        this.year = time.getFullYear();
        this.month = Number(time.getMonth()) + 1;
        this.day = time.getDate();
        this.hour = time.getHours();
        this.minute = time.getMinutes();
        this.second = time.getSeconds();
      },
      init() {
        this.valueArr = [];
        this.reset = false;
        if (this.mode == "time") {
          this.initTimeValue();
          if (this.params.year) {
            this.valueArr.push(0);
            this.setYears();
          }
          if (this.params.month) {
            this.valueArr.push(0);
            this.setMonths();
          }
          if (this.params.day) {
            this.valueArr.push(0);
            this.setDays();
          }
          if (this.params.hour) {
            this.valueArr.push(0);
            this.setHours();
          }
          if (this.params.minute) {
            this.valueArr.push(0);
            this.setMinutes();
          }
          if (this.params.second) {
            this.valueArr.push(0);
            this.setSeconds();
          }
        } else if (this.mode == "region") {
          if (this.params.province) {
            this.valueArr.push(0);
            this.setProvinces();
          }
          if (this.params.city) {
            this.valueArr.push(0);
            this.setCitys();
          }
          if (this.params.area) {
            this.valueArr.push(0);
            this.setAreas();
          }
        } else if (this.mode == "selector") {
          this.valueArr = this.defaultSelector;
        } else if (this.mode == "multiSelector") {
          this.valueArr = this.defaultSelector;
          this.multiSelectorValue = this.defaultSelector;
        }
        this.$forceUpdate();
      },
      setYears() {
        this.years = this.generateArray(this.startYear, this.endYear);
        this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.years, this.year));
      },
      setMonths() {
        this.months = this.generateArray(1, 12);
        this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.months, this.month));
      },
      setDays() {
        let totalDays = new Date(this.year, this.month, 0).getDate();
        this.days = this.generateArray(1, totalDays);
        let index = 0;
        if (this.params.year && this.params.month)
          index = 2;
        else if (this.params.month)
          index = 1;
        else if (this.params.year)
          index = 1;
        else
          index = 0;
        if (this.day > this.days.length)
          this.day = this.days.length;
        this.valueArr.splice(index, 1, this.getIndex(this.days, this.day));
      },
      setHours() {
        this.hours = this.generateArray(0, 23);
        this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.hours, this.hour));
      },
      setMinutes() {
        this.minutes = this.generateArray(0, 59);
        this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.minutes, this.minute));
      },
      setSeconds() {
        this.seconds = this.generateArray(0, 59);
        this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.seconds, this.second));
      },
      setProvinces() {
        if (!this.params.province)
          return;
        let tmp2 = "";
        let useCode = false;
        if (this.areaCode.length) {
          tmp2 = this.areaCode[0];
          useCode = true;
        } else if (this.defaultRegion.length)
          tmp2 = this.defaultRegion[0];
        else
          tmp2 = 0;
        provinces.map((v, k) => {
          if (useCode ? v.code == tmp2 : v.name == tmp2) {
            tmp2 = k;
          }
        });
        this.province = tmp2;
        this.provinces = provinces;
        this.valueArr.splice(0, 1, this.province);
      },
      setCitys() {
        if (!this.params.city)
          return;
        let tmp2 = "";
        let useCode = false;
        if (this.areaCode.length) {
          tmp2 = this.areaCode[1];
          useCode = true;
        } else if (this.defaultRegion.length)
          tmp2 = this.defaultRegion[1];
        else
          tmp2 = 0;
        citys[this.province].map((v, k) => {
          if (useCode ? v.code == tmp2 : v.name == tmp2) {
            tmp2 = k;
          }
        });
        this.city = tmp2;
        this.citys = citys[this.province];
        this.valueArr.splice(1, 1, this.city);
      },
      setAreas() {
        if (!this.params.area)
          return;
        let tmp2 = "";
        let useCode = false;
        if (this.areaCode.length) {
          tmp2 = this.areaCode[2];
          useCode = true;
        } else if (this.defaultRegion.length)
          tmp2 = this.defaultRegion[2];
        else
          tmp2 = 0;
        areas[this.province][this.city].map((v, k) => {
          if (useCode ? v.code == tmp2 : v.name == tmp2) {
            tmp2 = k;
          }
        });
        this.area = tmp2;
        this.areas = areas[this.province][this.city];
        this.valueArr.splice(2, 1, this.area);
      },
      close() {
        this.$emit("input", false);
        this.$emit("update:modelValue", false);
      },
      change(e) {
        this.valueArr = e.detail.value;
        let i = 0;
        if (this.mode == "time") {
          if (this.params.year)
            this.year = this.years[this.valueArr[i++]];
          if (this.params.month)
            this.month = this.months[this.valueArr[i++]];
          if (this.params.day)
            this.day = this.days[this.valueArr[i++]];
          if (this.params.hour)
            this.hour = this.hours[this.valueArr[i++]];
          if (this.params.minute)
            this.minute = this.minutes[this.valueArr[i++]];
          if (this.params.second)
            this.second = this.seconds[this.valueArr[i++]];
        } else if (this.mode == "region") {
          if (this.params.province)
            this.province = this.valueArr[i++];
          if (this.params.city)
            this.city = this.valueArr[i++];
          if (this.params.area)
            this.area = this.valueArr[i++];
        } else if (this.mode == "multiSelector") {
          let index = null;
          this.defaultSelector.map((val, idx) => {
            if (val != e.detail.value[idx])
              index = idx;
          });
          if (index != null) {
            this.$emit("columnchange", {
              column: index,
              index: e.detail.value[index]
            });
          }
        }
      },
      getResult(event = null) {
        let result = {};
        if (this.mode == "time") {
          if (this.params.year)
            result.year = this.formatNumber(this.year || 0);
          if (this.params.month)
            result.month = this.formatNumber(this.month || 0);
          if (this.params.day)
            result.day = this.formatNumber(this.day || 0);
          if (this.params.hour)
            result.hour = this.formatNumber(this.hour || 0);
          if (this.params.minute)
            result.minute = this.formatNumber(this.minute || 0);
          if (this.params.second)
            result.second = this.formatNumber(this.second || 0);
          if (this.params.timestamp)
            result.timestamp = this.getTimestamp();
        } else if (this.mode == "region") {
          if (this.params.province)
            result.province = provinces[this.province];
          if (this.params.city)
            result.city = citys[this.province][this.city];
          if (this.params.area)
            result.area = areas[this.province][this.city][this.area];
        } else if (this.mode == "selector") {
          result = this.valueArr;
        } else if (this.mode == "multiSelector") {
          result = this.valueArr;
        }
        if (event)
          this.$emit(event, result);
        this.close();
      },
      getTimestamp() {
        let time = this.year + "/" + this.month + "/" + this.day + " " + this.hour + ":" + this.minute + ":" + this.second;
        return new Date(time).getTime() / 1e3;
      },
      getDateSource() {
        return {
          provinces,
          citys,
          areas
        };
      },
      regionDiscern(addressText) {
        let address = "";
        let province = {};
        let city = {};
        let area = {};
        if (!addressText)
          return { code: -1, msg: "\u5730\u5740\u6587\u672C\u4E0D\u80FD\u4E3A\u7A7A" };
        addressText.trim();
        let firstTwoKey = addressText.substring(0, 2);
        let provinceIndex = -1;
        for (let i = 0; i < provinces.length; i++) {
          let { code: code2, name } = provinces[i];
          if (name.indexOf(firstTwoKey) == 0) {
            province = { code: code2, name };
            provinceIndex = i;
            break;
          }
        }
        if (provinceIndex == -1)
          return { code: -1, msg: `\u7701\u4EFD\u3010${firstTwoKey}\u3011\u6CA1\u6709\u627E\u5230\uFF0C\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u5730\u5740` };
        let citysArr = citys[provinceIndex];
        let cityIndex = -1;
        for (let i = 0; i < citysArr.length; i++) {
          let { name, code: code2 } = citysArr[i];
          let cityName = name.substr(0, name.length - 1);
          if (addressText.indexOf(cityName) > -1) {
            city = { code: code2, name };
            cityIndex = i;
            break;
          }
        }
        if (cityIndex == -1)
          return { code: -1, msg: `\u5730\u7EA7\u5E02\u6CA1\u6709\u627E\u5230\uFF0C\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u5730\u5740` };
        let areasArr = areas[provinceIndex][cityIndex];
        let areaIndex = -1;
        for (let i = 0; i < areasArr.length; i++) {
          let { code: code2, name } = areasArr[i];
          let reg = name;
          if (name.length > 2)
            reg += `|${name.substr(0, name.length - 1)}`;
          let areaRegExp = new RegExp(reg);
          if (addressText.search(areaRegExp) > -1) {
            area = { code: code2, name };
            address = addressText.replace(new RegExp(reg), "{{~}}").split("{{~}}")[1];
            areaIndex = i;
            break;
          }
        }
        if (areaIndex == -1)
          return { code: -1, msg: "\u53BF\u7EA7\u5E02\u6CA1\u6709\u627E\u5230\uFF0C\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u5730\u5740" };
        let formatted_address = `${province.name}${city.name}${area.name}${address}`;
        let res = {
          code: 0,
          msg: "ok",
          data: {
            province,
            city,
            area,
            address,
            formatted_address
          }
        };
        return res;
      },
      addressDiscern(text) {
        let name = "";
        let mobile2 = "";
        if (!text)
          return { code: -1, msg: "\u5730\u5740\u6587\u672C\u4E0D\u80FD\u4E3A\u7A7A" };
        let textArr = text.split(/[^\u4e00-\u9fa5a-zA-Z0-9+-（）()]+/g).filter((v) => v.length);
        if (textArr.length != 3)
          return { code: -1, msg: "\u5730\u5740\u683C\u5F0F\u4E0D\u6B63\u786E\uFF0C\u8BF7\u6309\u59D3\u540D \u624B\u673A\u53F7 \u6536\u8D27\u5730\u5740\u683C\u5F0F\u3002" };
        let temp;
        let addressText;
        for (let [k, v] of textArr.entries()) {
          if (/^1[3,4,5,6,7,8,9][0-9]{9}$/.test(v)) {
            mobile2 = v;
            continue;
          }
          if (!temp) {
            temp = v;
            continue;
          }
          temp.length > v.length ? (addressText = temp, name = v) : (addressText = v, name = temp);
        }
        let positionRes = this.regionDiscern(addressText);
        if (positionRes.code !== 0)
          return positionRes;
        let res = {
          code: 0,
          msg: "ok",
          data: {
            name,
            mobile: mobile2,
            position: positionRes.data
          }
        };
        return res;
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_1$1);
    return vue.openBlock(), vue.createBlock(_component_u_popup, {
      maskCloseAble: $props.maskCloseAble,
      mode: "bottom",
      popup: false,
      modelValue: $data.popupValue,
      "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $data.popupValue = $event),
      length: "auto",
      safeAreaInsetBottom: $props.safeAreaInsetBottom,
      onClose: $options.close,
      "z-index": $options.uZIndex,
      blur: $props.blur
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "u-datetime-picker" }, [
          vue.createElementVNode("view", {
            class: "u-picker-header",
            onTouchmove: _cache[3] || (_cache[3] = vue.withModifiers(() => {
            }, ["stop", "prevent"]))
          }, [
            vue.createElementVNode("view", {
              class: "u-btn-picker u-btn-picker--tips",
              style: vue.normalizeStyle({ color: $props.cancelColor }),
              "hover-class": "u-opacity",
              "hover-stay-time": 150,
              onClick: _cache[0] || (_cache[0] = ($event) => $options.getResult("cancel"))
            }, vue.toDisplayString($props.cancelText), 5),
            vue.createElementVNode("view", { class: "u-picker__title" }, vue.toDisplayString($props.title), 1),
            vue.createElementVNode("view", {
              class: "u-btn-picker u-btn-picker--primary",
              style: vue.normalizeStyle({ color: $data.moving ? $props.cancelColor : $props.confirmColor }),
              "hover-class": "u-opacity",
              "hover-stay-time": 150,
              onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
              }, ["stop"])),
              onClick: _cache[2] || (_cache[2] = vue.withModifiers(($event) => $options.getResult("confirm"), ["stop"]))
            }, vue.toDisplayString($props.confirmText), 37)
          ], 32),
          vue.createElementVNode("view", { class: "u-picker-body" }, [
            $props.mode == "region" ? (vue.openBlock(), vue.createElementBlock("picker-view", {
              key: 0,
              value: $data.valueArr,
              onChange: _cache[4] || (_cache[4] = (...args) => $options.change && $options.change(...args)),
              class: "u-picker-view",
              onPickstart: _cache[5] || (_cache[5] = (...args) => $options.pickstart && $options.pickstart(...args)),
              onPickend: _cache[6] || (_cache[6] = (...args) => $options.pickend && $options.pickend(...args))
            }, [
              !$data.reset && $props.params.province ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.provinces, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "u-column-item",
                    key: index
                  }, [
                    vue.createElementVNode("view", { class: "u-line-1" }, vue.toDisplayString(item.name), 1)
                  ]);
                }), 128))
              ])) : vue.createCommentVNode("v-if", true),
              !$data.reset && $props.params.city ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 1 }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.citys, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "u-column-item",
                    key: index
                  }, [
                    vue.createElementVNode("view", { class: "u-line-1" }, vue.toDisplayString(item.name), 1)
                  ]);
                }), 128))
              ])) : vue.createCommentVNode("v-if", true),
              !$data.reset && $props.params.area ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 2 }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.areas, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "u-column-item",
                    key: index
                  }, [
                    vue.createElementVNode("view", { class: "u-line-1" }, vue.toDisplayString(item.name), 1)
                  ]);
                }), 128))
              ])) : vue.createCommentVNode("v-if", true)
            ], 40, ["value"])) : $props.mode == "time" ? (vue.openBlock(), vue.createElementBlock("picker-view", {
              key: 1,
              value: $data.valueArr,
              onChange: _cache[7] || (_cache[7] = (...args) => $options.change && $options.change(...args)),
              class: "u-picker-view",
              onPickstart: _cache[8] || (_cache[8] = (...args) => $options.pickstart && $options.pickstart(...args)),
              onPickend: _cache[9] || (_cache[9] = (...args) => $options.pickend && $options.pickend(...args))
            }, [
              !$data.reset && $props.params.year ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.years, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "u-column-item",
                    key: index
                  }, [
                    vue.createTextVNode(vue.toDisplayString(item) + " ", 1),
                    $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      class: "u-text"
                    }, "\u5E74")) : vue.createCommentVNode("v-if", true)
                  ]);
                }), 128))
              ])) : vue.createCommentVNode("v-if", true),
              !$data.reset && $props.params.month ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 1 }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.months, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "u-column-item",
                    key: index
                  }, [
                    vue.createTextVNode(vue.toDisplayString($options.formatNumber(item)) + " ", 1),
                    $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      class: "u-text"
                    }, "\u6708")) : vue.createCommentVNode("v-if", true)
                  ]);
                }), 128))
              ])) : vue.createCommentVNode("v-if", true),
              !$data.reset && $props.params.day ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 2 }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.days, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "u-column-item",
                    key: index
                  }, [
                    vue.createTextVNode(vue.toDisplayString($options.formatNumber(item)) + " ", 1),
                    $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      class: "u-text"
                    }, "\u65E5")) : vue.createCommentVNode("v-if", true)
                  ]);
                }), 128))
              ])) : vue.createCommentVNode("v-if", true),
              !$data.reset && $props.params.hour ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 3 }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.hours, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "u-column-item",
                    key: index
                  }, [
                    vue.createTextVNode(vue.toDisplayString($options.formatNumber(item)) + " ", 1),
                    $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      class: "u-text"
                    }, "\u65F6")) : vue.createCommentVNode("v-if", true)
                  ]);
                }), 128))
              ])) : vue.createCommentVNode("v-if", true),
              !$data.reset && $props.params.minute ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 4 }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.minutes, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "u-column-item",
                    key: index
                  }, [
                    vue.createTextVNode(vue.toDisplayString($options.formatNumber(item)) + " ", 1),
                    $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      class: "u-text"
                    }, "\u5206")) : vue.createCommentVNode("v-if", true)
                  ]);
                }), 128))
              ])) : vue.createCommentVNode("v-if", true),
              !$data.reset && $props.params.second ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 5 }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.seconds, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "u-column-item",
                    key: index
                  }, [
                    vue.createTextVNode(vue.toDisplayString($options.formatNumber(item)) + " ", 1),
                    $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      class: "u-text"
                    }, "\u79D2")) : vue.createCommentVNode("v-if", true)
                  ]);
                }), 128))
              ])) : vue.createCommentVNode("v-if", true)
            ], 40, ["value"])) : $props.mode == "selector" ? (vue.openBlock(), vue.createElementBlock("picker-view", {
              key: 2,
              value: $data.valueArr,
              onChange: _cache[10] || (_cache[10] = (...args) => $options.change && $options.change(...args)),
              class: "u-picker-view",
              onPickstart: _cache[11] || (_cache[11] = (...args) => $options.pickstart && $options.pickstart(...args)),
              onPickend: _cache[12] || (_cache[12] = (...args) => $options.pickend && $options.pickend(...args))
            }, [
              !$data.reset ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.range, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "u-column-item",
                    key: index
                  }, [
                    vue.createElementVNode("view", { class: "u-line-1" }, vue.toDisplayString($options.getItemValue(item, "selector")), 1)
                  ]);
                }), 128))
              ])) : vue.createCommentVNode("v-if", true)
            ], 40, ["value"])) : $props.mode == "multiSelector" ? (vue.openBlock(), vue.createElementBlock("picker-view", {
              key: 3,
              value: $data.valueArr,
              onChange: _cache[13] || (_cache[13] = (...args) => $options.change && $options.change(...args)),
              class: "u-picker-view",
              onPickstart: _cache[14] || (_cache[14] = (...args) => $options.pickstart && $options.pickstart(...args)),
              onPickend: _cache[15] || (_cache[15] = (...args) => $options.pickend && $options.pickend(...args))
            }, [
              !$data.reset ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList($props.range, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("picker-view-column", { key: index }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item, (item1, index1) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index1
                    }, [
                      vue.createElementVNode("view", { class: "u-line-1" }, vue.toDisplayString($options.getItemValue(item1, "multiSelector")), 1)
                    ]);
                  }), 128))
                ]);
              }), 128)) : vue.createCommentVNode("v-if", true)
            ], 40, ["value"])) : vue.createCommentVNode("v-if", true)
          ])
        ])
      ]),
      _: 1
    }, 8, ["maskCloseAble", "modelValue", "safeAreaInsetBottom", "onClose", "z-index", "blur"]);
  }
  var __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$5], ["__scopeId", "data-v-59f59656"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-picker/u-picker.vue"]]);
  const _sfc_main$7 = {
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
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "u-progress",
      style: vue.normalizeStyle({
        borderRadius: $props.round ? "100rpx" : 0,
        height: $props.height + "rpx",
        backgroundColor: $props.inactiveColor
      })
    }, [
      vue.createElementVNode("view", {
        class: vue.normalizeClass([[
          $props.type ? `u-type-${$props.type}-bg` : "",
          $props.striped ? "u-striped" : "",
          $props.striped && $props.stripedActive ? "u-striped-active" : ""
        ], "u-active"]),
        style: vue.normalizeStyle([$options.progressStyle])
      }, [
        _ctx.$slots.default || _ctx.$slots.$default ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : $props.showPercent ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
          vue.createTextVNode(vue.toDisplayString($props.percent + "%"), 1)
        ], 64)) : vue.createCommentVNode("v-if", true)
      ], 6)
    ], 4);
  }
  var __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$4], ["__scopeId", "data-v-0e476398"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-line-progress/u-line-progress.vue"]]);
  const _sfc_main$6 = {
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
            let tmp2 = lists.some((val2) => {
              return val2.url == value.url;
            });
            if (!tmp2) {
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
          uni.chooseImage({
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
          uni.showToast({
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
        uni.showLoading({
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
        const task = uni.uploadFile({
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
            uni.hideLoading();
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
        uni.showModal({
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
      doPreviewImage(url2, index) {
        if (!this.previewFullImage) {
          this.$emit("on-preview", url2, this.lists, this.index);
          return;
        }
        const images = this.lists.map((item) => item.url || item.path);
        uni.previewImage({
          urls: images,
          current: url2,
          success: () => {
            this.$emit("on-preview", url2, this.lists, this.index);
          },
          fail: () => {
            uni.showToast({
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
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$6);
    const _component_u_line_progress = resolveEasycom(vue.resolveDynamicComponent("u-line-progress"), __easycom_1);
    return !$props.disabled ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "u-upload"
    }, [
      $props.showUploadList ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList($data.lists, (item, index) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "u-list-item u-preview-wrap",
          key: index,
          style: vue.normalizeStyle({
            width: _ctx.$u.addUnit($props.width),
            height: _ctx.$u.addUnit($props.height)
          })
        }, [
          $props.deletable ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "u-delete-icon",
            onClick: vue.withModifiers(($event) => $options.deleteItem(index), ["stop"]),
            style: vue.normalizeStyle({
              background: $props.delBgColor
            })
          }, [
            vue.createVNode(_component_u_icon, {
              class: "u-icon",
              name: $props.delIcon,
              size: "20",
              color: $props.delColor
            }, null, 8, ["name", "color"])
          ], 12, ["onClick"])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(' <view\r\n				v-if="item.progress >= 100"\r\n				class="u-success-icon"\r\n			>\r\n				<u-icon class="u-icon" :name="successIcon" size="20" :color="successColor"></u-icon>\r\n			</view> '),
          $props.showProgress && item.progress > 0 && !item.error && item.progress < 100 ? (vue.openBlock(), vue.createBlock(_component_u_line_progress, {
            key: 1,
            "show-percent": false,
            height: "16",
            class: "u-progress",
            percent: item.progress
          }, null, 8, ["percent"])) : vue.createCommentVNode("v-if", true),
          item.error ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            onClick: vue.withModifiers(($event) => $options.retry(index), ["stop"]),
            class: "u-error-btn"
          }, "\u70B9\u51FB\u91CD\u8BD5", 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
          !item.isImage ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 3,
            onClick: vue.withModifiers(($event) => $options.doPreviewImage(item.url || item.path, index), ["stop"]),
            class: "u-preview-image",
            src: item.url || item.path,
            mode: $props.imageMode
          }, null, 8, ["onClick", "src", "mode"])) : vue.createCommentVNode("v-if", true)
        ], 4);
      }), 128)) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "file", { file: $data.lists }, void 0, true),
      $props.maxCount > $data.lists.length ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        style: { "display": "inline-block" },
        onClick: _cache[0] || (_cache[0] = (...args) => $options.selectFile && $options.selectFile(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "addBtn", {}, void 0, true),
        !$props.customBtn ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "u-list-item u-add-wrap",
          "hover-class": "u-add-wrap__hover",
          "hover-stay-time": "150",
          style: vue.normalizeStyle({
            width: _ctx.$u.addUnit($props.width),
            height: _ctx.$u.addUnit($props.height)
          })
        }, [
          vue.createVNode(_component_u_icon, {
            name: "plus",
            class: "u-add-btn",
            size: "40"
          }),
          vue.createElementVNode("view", { class: "u-add-tips" }, vue.toDisplayString($props.uploadText), 1)
        ], 4)) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true)
    ])) : vue.createCommentVNode("v-if", true);
  }
  var __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$3], ["__scopeId", "data-v-c19d5094"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-upload/u-upload.vue"]]);
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
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
      const startTimeShow = vue.ref(false);
      const endTimeShow = vue.ref(false);
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
      const radio = vue.ref("");
      const form = vue.reactive({
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
      const action = config$1.base_url + "upload-platform";
      const onSuccessUpload = (data) => {
        formatAppLog("log", "at pages/product/newProduct.vue:85", data);
        form.imageLink = data.url;
      };
      const toProduct = () => {
        formatAppLog("log", "at pages/product/newProduct.vue:89", form);
        if (radio.value === "\u65B0\u54C1") {
          form.conditions = "0";
        } else {
          form.conditions = "1";
        }
        addProduct(form).then((res) => {
          formatAppLog("log", "at pages/product/newProduct.vue:96", res);
        });
      };
      return (_ctx, _cache) => {
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_0$4);
        const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_1$4);
        const _component_u_radio = resolveEasycom(vue.resolveDynamicComponent("u-radio"), __easycom_2$1);
        const _component_u_radio_group = resolveEasycom(vue.resolveDynamicComponent("u-radio-group"), __easycom_3);
        const _component_u_picker = resolveEasycom(vue.resolveDynamicComponent("u-picker"), __easycom_4);
        const _component_u_cell_item = resolveEasycom(vue.resolveDynamicComponent("u-cell-item"), __easycom_5);
        const _component_u_upload = resolveEasycom(vue.resolveDynamicComponent("u-upload"), __easycom_6);
        const _component_u_form = resolveEasycom(vue.resolveDynamicComponent("u-form"), __easycom_7);
        const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_1$3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
          vue.createVNode(_component_u_form, {
            model: form,
            ref: "uForm"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_u_form_item, { label: "\u540D\u79F0" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    modelValue: form.name,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.name = $event),
                    clearable: "true"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              vue.createVNode(_component_u_form_item, { label: "\u5206\u7C7B" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    modelValue: form.category,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.category = $event),
                    clearable: "true"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              vue.createVNode(_component_u_form_item, { label: "\u63CF\u8FF0" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    modelValue: form.descLink,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.descLink = $event),
                    clearable: "true"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              vue.createVNode(_component_u_form_item, { label: "\u4EF7\u683C" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_input, {
                    modelValue: form.startPrice,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => form.startPrice = $event),
                    type: "number"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              vue.createVNode(_component_u_form_item, { label: "\u72B6\u6001" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_radio_group, {
                    modelValue: radio.value,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => radio.value = $event)
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(radioList, (item, index) => {
                        return vue.createVNode(_component_u_radio, {
                          key: index,
                          name: item.name,
                          disabled: item.disabled
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(vue.toDisplayString(item.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["name", "disabled"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              vue.createElementVNode("view", null, [
                vue.createVNode(_component_u_picker, {
                  modelValue: startTimeShow.value,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => startTimeShow.value = $event),
                  mode: "time",
                  params,
                  onConfirm: setStartTime
                }, null, 8, ["modelValue"]),
                vue.createVNode(_component_u_cell_item, {
                  title: "\u5F00\u59CB\u65F6\u95F4",
                  value: form.auctionStartTime,
                  onClick: _cache[6] || (_cache[6] = ($event) => startTimeShow.value = true)
                }, null, 8, ["value"])
              ]),
              vue.createElementVNode("view", null, [
                vue.createVNode(_component_u_picker, {
                  modelValue: endTimeShow.value,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => endTimeShow.value = $event),
                  mode: "time",
                  params,
                  onConfirm: setEndTime
                }, null, 8, ["modelValue"]),
                vue.createVNode(_component_u_cell_item, {
                  title: "\u7ED3\u675F\u65F6\u95F4",
                  value: form.auctionEndTime,
                  onClick: _cache[8] || (_cache[8] = ($event) => endTimeShow.value = true)
                }, null, 8, ["value"])
              ]),
              vue.createVNode(_component_u_form_item, { label: "\u56FE\u7247" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_upload, {
                    action,
                    onOnSuccess: onSuccessUpload,
                    "max-size": 5 * 1024 * 1024,
                    "max-count": "1"
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"]),
          vue.createVNode(_component_u_button, {
            type: "default",
            onClick: toProduct
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("\u63D0\u4EA4")
            ]),
            _: 1
          })
        ]);
      };
    }
  });
  var PagesProductNewProduct = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/product/newProduct.vue"]]);
  const _sfc_main$4 = {
    name: "u-loading",
    props: {
      mode: {
        type: String,
        default: "circle"
      },
      color: {
        type: String,
        default: "#c7c7c7"
      },
      size: {
        type: [String, Number],
        default: "34"
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      cricleStyle() {
        let style = {};
        style.width = this.size + "rpx";
        style.height = this.size + "rpx";
        if (this.mode == "circle")
          style.borderColor = `#e4e4e4 #e4e4e4 #e4e4e4 ${this.color ? this.color : "#c7c7c7"}`;
        return style;
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.show ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: vue.normalizeClass(["u-loading", $props.mode == "circle" ? "u-loading-circle" : "u-loading-flower"]),
      style: vue.normalizeStyle([$options.cricleStyle])
    }, null, 6)) : vue.createCommentVNode("v-if", true);
  }
  var __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$2], ["__scopeId", "data-v-35d0dd20"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-loading/u-loading.vue"]]);
  const _sfc_main$3 = {
    name: "u-modal",
    emits: ["update:modelValue", "input", "confirm", "cancel"],
    props: {
      value: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      zIndex: {
        type: [Number, String],
        default: ""
      },
      title: {
        type: [String],
        default: "\u63D0\u793A"
      },
      width: {
        type: [Number, String],
        default: 600
      },
      content: {
        type: String,
        default: "\u5185\u5BB9"
      },
      showTitle: {
        type: Boolean,
        default: true
      },
      showConfirmButton: {
        type: Boolean,
        default: true
      },
      showCancelButton: {
        type: Boolean,
        default: false
      },
      confirmText: {
        type: String,
        default: "\u786E\u8BA4"
      },
      cancelText: {
        type: String,
        default: "\u53D6\u6D88"
      },
      confirmColor: {
        type: String,
        default: "#2979ff"
      },
      cancelColor: {
        type: String,
        default: "#606266"
      },
      borderRadius: {
        type: [Number, String],
        default: 16
      },
      titleStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      contentStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      cancelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      confirmStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      zoom: {
        type: Boolean,
        default: true
      },
      asyncClose: {
        type: Boolean,
        default: false
      },
      maskCloseAble: {
        type: Boolean,
        default: false
      },
      negativeTop: {
        type: [String, Number],
        default: 0
      },
      blur: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        loading: false,
        popupValue: false
      };
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      cancelBtnStyle() {
        return Object.assign(
          {
            color: this.cancelColor
          },
          this.cancelStyle
        );
      },
      confirmBtnStyle() {
        return Object.assign(
          {
            color: this.confirmColor
          },
          this.confirmStyle
        );
      },
      uZIndex() {
        return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
      }
    },
    watch: {
      valueCom(n) {
        if (n === true)
          this.loading = false;
        this.popupValue = n;
      }
    },
    methods: {
      confirm() {
        if (this.asyncClose) {
          this.loading = true;
        } else {
          this.$emit("input", false);
          this.$emit("update:modelValue", false);
        }
        this.$emit("confirm");
      },
      cancel() {
        this.$emit("cancel");
        this.$emit("input", false);
        this.$emit("update:modelValue", false);
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },
      popupClose() {
        this.$emit("input", false);
        this.$emit("update:modelValue", false);
      },
      clearLoading() {
        this.loading = false;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_loading = resolveEasycom(vue.resolveDynamicComponent("u-loading"), __easycom_0);
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_u_popup, {
        blur: $props.blur,
        zoom: $props.zoom,
        mode: "center",
        popup: false,
        "z-index": $options.uZIndex,
        modelValue: $data.popupValue,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.popupValue = $event),
        length: $props.width,
        "mask-close-able": $props.maskCloseAble,
        "border-radius": $props.borderRadius,
        onClose: $options.popupClose,
        "negative-top": $props.negativeTop
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "u-model" }, [
            $props.showTitle ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "u-model__title u-line-1",
              style: vue.normalizeStyle([$props.titleStyle])
            }, vue.toDisplayString($props.title), 5)) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "u-model__content" }, [
              _ctx.$slots.default || _ctx.$slots.$default ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                style: vue.normalizeStyle([$props.contentStyle])
              }, [
                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ], 4)) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "u-model__content__message",
                style: vue.normalizeStyle([$props.contentStyle])
              }, vue.toDisplayString($props.content), 5))
            ]),
            $props.showCancelButton || $props.showConfirmButton ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "u-model__footer u-border-top"
            }, [
              $props.showCancelButton ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                "hover-stay-time": 100,
                "hover-class": "u-model__btn--hover",
                class: "u-model__footer__button",
                style: vue.normalizeStyle([$options.cancelBtnStyle]),
                onClick: _cache[0] || (_cache[0] = (...args) => $options.cancel && $options.cancel(...args))
              }, vue.toDisplayString($props.cancelText), 5)) : vue.createCommentVNode("v-if", true),
              $props.showConfirmButton || _ctx.$slots["confirm-button"] ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                "hover-stay-time": 100,
                "hover-class": $props.asyncClose ? "none" : "u-model__btn--hover",
                class: "u-model__footer__button hairline-left",
                style: vue.normalizeStyle([$options.confirmBtnStyle]),
                onClick: _cache[1] || (_cache[1] = (...args) => $options.confirm && $options.confirm(...args))
              }, [
                _ctx.$slots["confirm-button"] ? vue.renderSlot(_ctx.$slots, "confirm-button", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                  $data.loading ? (vue.openBlock(), vue.createBlock(_component_u_loading, {
                    key: 0,
                    mode: "circle",
                    color: $props.confirmColor
                  }, null, 8, ["color"])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                    vue.createTextVNode(vue.toDisplayString($props.confirmText), 1)
                  ], 64))
                ], 64))
              ], 12, ["hover-class"])) : vue.createCommentVNode("v-if", true)
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ]),
        _: 3
      }, 8, ["blur", "zoom", "z-index", "modelValue", "length", "mask-close-able", "border-radius", "onClose", "negative-top"])
    ]);
  }
  var __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$1], ["__scopeId", "data-v-c2027a7c"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/uni_modules/vk-uview-ui/components/u-modal/u-modal.vue"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "productInfo",
    setup(__props) {
      const show = vue.ref(false);
      const content = "\u4E1C\u4E34\u78A3\u77F3\uFF0C\u4EE5\u89C2\u6CA7\u6D77";
      const productInfo = vue.reactive({
        id: 0,
        name: "",
        category: "",
        imageLink: "",
        descLink: "",
        auctionStartTime: "",
        auctionEndTime: "",
        startPrice: 0,
        status: "",
        conditions: ""
      });
      const routerOption = vue.reactive({
        id: "",
        auctionStates: ""
      });
      onLoad((option) => {
        formatAppLog("log", "at pages/product/productInfo.vue:45", option);
        routerOption.id = option.id;
        routerOption.auctionStates = option.auctionStates;
        if (routerOption.id != "") {
          getProductById(routerOption.id).then((res) => {
            formatAppLog("log", "at pages/product/productInfo.vue:51", res.data);
            const product = res.data;
            productInfo.id = product.id;
            productInfo.name = product.name;
            productInfo.descLink = product.descLink;
            productInfo.startPrice = product.startPrice;
            productInfo.imageLink = product.imageLink;
            productInfo.auctionEndTime = product.auctionEndTime;
            productInfo.auctionStartTime = product.auctionStartTime;
            timeFn(product.auctionEndTime);
          });
        }
      });
      function timeFn(d1) {
        var dateBegin = new Date(d1.replace(/-/g, "/"));
        var dateEnd = new Date();
        var dateDiff = dateBegin.getTime() - dateEnd.getTime();
        if (dateDiff <= 0) {
          formatAppLog("log", "at pages/product/productInfo.vue:72", "\u7ED3\u675F");
        } else {
          formatAppLog("log", "at pages/product/productInfo.vue:74", dateDiff);
          var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1e3));
          var leave1 = dateDiff % (24 * 3600 * 1e3);
          var hours = Math.floor(leave1 / (3600 * 1e3));
          var leave2 = leave1 % (3600 * 1e3);
          var minutes = Math.floor(leave2 / (60 * 1e3));
          var leave3 = leave2 % (60 * 1e3);
          var seconds = Math.round(leave3 / 1e3);
          formatAppLog("log", "at pages/product/productInfo.vue:84", " \u76F8\u5DEE " + dayDiff + "\u5929 " + hours + "\u5C0F\u65F6 " + minutes + " \u5206\u949F" + seconds + " \u79D2");
          formatAppLog(
            "log",
            "at pages/product/productInfo.vue:85",
            dateDiff + "\u65F6\u95F4\u5DEE\u7684\u6BEB\u79D2\u6570",
            dayDiff + "\u8BA1\u7B97\u51FA\u76F8\u5DEE\u5929\u6570",
            leave1 + "\u8BA1\u7B97\u5929\u6570\u540E\u5269\u4F59\u7684\u6BEB\u79D2\u6570",
            hours + "\u8BA1\u7B97\u51FA\u5C0F\u65F6\u6570",
            minutes + "\u8BA1\u7B97\u76F8\u5DEE\u5206\u949F\u6570",
            seconds + "\u8BA1\u7B97\u76F8\u5DEE\u79D2\u6570"
          );
        }
      }
      return (_ctx, _cache) => {
        const _component_u_image = resolveEasycom(vue.resolveDynamicComponent("u-image"), __easycom_0$5);
        const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_1$3);
        const _component_u_modal = resolveEasycom(vue.resolveDynamicComponent("u-modal"), __easycom_2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "productInfo" }, [
          vue.createVNode(_component_u_image, {
            width: "100%",
            height: "300rpx",
            src: productInfo.imageLink
          }, null, 8, ["src"]),
          vue.createElementVNode("view", null, "\u3010\u540D\u79F0\u3011" + vue.toDisplayString(productInfo.name), 1),
          vue.createElementVNode("view", null, "\u3010\u8D77\u62CD\u4EF7\u683C\u3011" + vue.toDisplayString(productInfo.startPrice), 1),
          vue.createElementVNode("view", null, vue.toDisplayString(productInfo.descLink), 1),
          vue.createElementVNode("view", null, vue.toDisplayString(productInfo.auctionStartTime) + "-" + vue.toDisplayString(productInfo.auctionEndTime), 1),
          vue.createVNode(_component_u_button, {
            type: "error",
            onClick: _cache[0] || (_cache[0] = ($event) => show.value = true),
            disabled: routerOption.auctionStates != 1
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("\u7ADE\u62CD")
            ]),
            _: 1
          }, 8, ["disabled"]),
          vue.createVNode(_component_u_modal, {
            modelValue: show.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => show.value = $event),
            content
          }, null, 8, ["modelValue"])
        ]);
      };
    }
  });
  var PagesProductProductInfo = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-4ed8efc9"], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/product/productInfo.vue"]]);
  const _sfc_main$1 = {};
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", null, " error! ");
  }
  var PagesErrorError = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/pages/error/error.vue"]]);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/user/user", PagesUserUser);
  __definePage("pages/product/product", PagesProductProduct);
  __definePage("pages/user/register", PagesUserRegister);
  __definePage("uni_modules/vk-uview-ui/components/u-avatar-cropper/u-avatar-cropper", Uni_modulesVkUviewUiComponentsUAvatarCropperUAvatarCropper);
  __definePage("pages/product/newProduct", PagesProductNewProduct);
  __definePage("pages/product/productInfo", PagesProductProductInfo);
  __definePage("pages/error/error", PagesErrorError);
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      onLaunch(() => {
        formatAppLog("log", "at App.vue:4", "App Launch");
      });
      onShow(() => {
        formatAppLog("log", "at App.vue:7", "App Show");
      });
      onHide(() => {
        formatAppLog("log", "at App.vue:10", "App Hide");
      });
      return () => {
      };
    }
  });
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/Administrator/Desktop/\u6BD5\u4E1A\u8BBE\u8BA1/auction-uniapp/src/App.vue"]]);
  var mixin = {
    data() {
      return {};
    },
    onLoad() {
      this.$u.getRect = this.$uGetRect;
    },
    methods: {
      $uGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = false;
        this.parent = this.$u.$parent.call(this, parentName);
        if (this.parent) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
          this.parentData.value = this.parent.modelValue;
        }
      },
      preventEvent(e) {
        e && e.stopPropagation && e.stopPropagation();
      }
    },
    onReachBottom() {
      uni.$emit("uOnReachBottom");
    },
    beforeUnmount() {
      if (this.parent && uni.$u.test.array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index) => {
          if (child === this) {
            childrenList.splice(index, 1);
          }
        });
      }
    }
  };
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    var o = isArray(obj) ? [] : {};
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
      }
    }
    return o;
  }
  function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (var prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else {
          if (typeof source[prop] !== "object") {
            target[prop] = source[prop];
          } else {
            if (target[prop].concat && source[prop].concat) {
              target[prop] = target[prop].concat(source[prop]);
            } else {
              target[prop] = deepMerge(target[prop], source[prop]);
            }
          }
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function email(value) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
  }
  function mobile(value) {
    return /^1[23456789]\d{9}$/.test(value);
  }
  function url(value) {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
  }
  function date(value) {
    return !/Invalid|NaN/.test(new Date(value).toString());
  }
  function dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
  }
  function number(value) {
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
  }
  function digits(value) {
    return /^\d+$/.test(value);
  }
  function idCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  }
  function carNo(value) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    } else if (value.length === 8) {
      return xreg.test(value);
    } else {
      return false;
    }
  }
  function amount(value) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
  }
  function chinese(value) {
    let reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
  }
  function letter(value) {
    return /^[a-zA-Z]*$/.test(value);
  }
  function enOrNum(value) {
    let reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
  }
  function contains(value, param) {
    return value.indexOf(param) >= 0;
  }
  function range(value, param) {
    return value >= param[0] && value <= param[1];
  }
  function rangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1];
  }
  function landline(value) {
    let reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value);
  }
  function empty(value) {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value)
          return true;
        break;
      case "number":
        if (0 === value || isNaN(value))
          return true;
        break;
      case "object":
        if (null === value || value.length === 0)
          return true;
        for (var i in value) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value) {
    if (typeof value == "string") {
      try {
        var obj = JSON.parse(value);
        if (typeof obj == "object" && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    } else {
      return Object.prototype.toString.call(value) === "[object Array]";
    }
  }
  function object(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function code(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value);
  }
  var test = {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code
  };
  class Request {
    setConfig(customConfig) {
      this.config = deepMerge(this.config, customConfig);
    }
    request(options = {}) {
      if (this.interceptor.request && typeof this.interceptor.request === "function") {
        let interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          return new Promise(() => {
          });
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || "";
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;
      return new Promise((resolve, reject) => {
        options.complete = (response) => {
          uni.hideLoading();
          clearTimeout(this.config.timer);
          this.config.timer = null;
          if (this.config.originalData) {
            if (this.interceptor.response && typeof this.interceptor.response === "function") {
              let resInterceptors = this.interceptor.response(response);
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                reject(response);
              }
            } else {
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (this.interceptor.response && typeof this.interceptor.response === "function") {
                let resInterceptors = this.interceptor.response(response.data);
                if (resInterceptors !== false) {
                  resolve(resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                resolve(response.data);
              }
            } else {
              reject(response);
            }
          }
        };
        options.url = test.url(options.url) ? options.url : this.config.baseUrl + (options.url.indexOf("/") == 0 ? options.url : "/" + options.url);
        if (this.config.showLoading && !this.config.timer) {
          this.config.timer = setTimeout(() => {
            uni.showLoading({
              title: this.config.loadingText,
              mask: this.config.loadingMask
            });
            this.config.timer = null;
          }, this.config.loadingTime);
        }
        uni.request(options);
      });
    }
    constructor() {
      this.config = {
        baseUrl: "",
        header: {},
        method: "POST",
        dataType: "json",
        responseType: "text",
        showLoading: true,
        loadingText: "\u8BF7\u6C42\u4E2D...",
        loadingTime: 800,
        timer: null,
        originalData: false,
        loadingMask: true
      };
      this.interceptor = {
        request: null,
        response: null
      };
      this.get = (url2, data = {}, header = {}) => {
        return this.request({
          method: "GET",
          url: url2,
          header,
          data
        });
      };
      this.post = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "POST",
          header,
          data
        });
      };
      this.put = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "PUT",
          header,
          data
        });
      };
      this.delete = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "DELETE",
          header,
          data
        });
      };
    }
  }
  var http = new Request();
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    let prefix = isPrefix ? "?" : "";
    let _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (let key in data) {
      let value = data[key];
      if (["", void 0, null].indexOf(value) >= 0) {
        continue;
      }
      if (value.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value.length; i++) {
              _result.push(key + "[" + i + "]=" + value[i]);
            }
            break;
          case "brackets":
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
            break;
          case "repeat":
            value.forEach((_value) => {
              _result.push(key + "=" + _value);
            });
            break;
          case "comma":
            let commaStr = "";
            value.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(key + "=" + commaStr);
            break;
          default:
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
        }
      } else {
        _result.push(key + "=" + value);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        params: {},
        animationType: "pop-in",
        animationDuration: 300,
        intercept: false
      };
      this.route = this.route.bind(this);
    }
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = uni.$u.queryParams(params, false);
        return url2 += "&" + query;
      } else {
        query = uni.$u.queryParams(params);
        return url2 += query;
      }
    }
    async route(options = {}, params = {}) {
      let mergeConfig = {};
      if (typeof options === "string") {
        mergeConfig.url = this.mixinParam(options, params);
        mergeConfig.type = "navigateTo";
      } else {
        mergeConfig = uni.$u.deepClone(options, this.config);
        mergeConfig.url = this.mixinParam(options.url, options.params);
      }
      if (params.intercept) {
        this.config.intercept = params.intercept;
      }
      mergeConfig.params = params;
      mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
      if (typeof uni.$u.routeIntercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          uni.$u.routeIntercept(mergeConfig, resolve);
        });
        isNext && this.openPage(mergeConfig);
      } else {
        this.openPage(mergeConfig);
      }
    }
    openPage(config2) {
      const {
        url: url2,
        type: type2,
        delta,
        animationType,
        animationDuration
      } = config2;
      if (config2.type == "navigateTo" || config2.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration
        });
      }
      if (config2.type == "redirectTo" || config2.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config2.type == "switchTab" || config2.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config2.type == "reLaunch" || config2.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config2.type == "navigateBack" || config2.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  var route = new Router().route;
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]")
        throw new TypeError(
          "fillString must be String"
        );
      let str = this;
      if (str.length >= maxLength)
        return String(str);
      let fillLength = maxLength - str.length, times = Math.ceil(fillLength / fillString.length);
      while (times >>= 1) {
        fillString += fillString;
        if (times === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, fmt = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let date2 = new Date(dateTime);
    let ret;
    let opt = {
      "y+": date2.getFullYear().toString(),
      "m+": (date2.getMonth() + 1).toString(),
      "d+": date2.getDate().toString(),
      "h+": date2.getHours().toString(),
      "M+": date2.getMinutes().toString(),
      "s+": date2.getSeconds().toString()
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
      }
    }
    return fmt;
  }
  function timeFrom(dateTime = null, format2 = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let timestamp = +new Date(Number(dateTime));
    let timer = (Number(new Date()) - timestamp) / 1e3;
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "\u521A\u521A";
        break;
      case (timer >= 300 && timer < 3600):
        tips = parseInt(timer / 60) + "\u5206\u949F\u524D";
        break;
      case (timer >= 3600 && timer < 86400):
        tips = parseInt(timer / 3600) + "\u5C0F\u65F6\u524D";
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = parseInt(timer / 86400) + "\u5929\u524D";
        break;
      default:
        if (format2 === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = parseInt(timer / (86400 * 30)) + "\u4E2A\u6708\u524D";
          } else {
            tips = parseInt(timer / (86400 * 365)) + "\u5E74\u524D";
          }
        } else {
          tips = timeFormat(timestamp, format2);
        }
    }
    return tips;
  }
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    let startRGB = hexToRgb(startColor, false);
    let startR = startRGB[0];
    let startG = startRGB[1];
    let startB = startRGB[2];
    let endRGB = hexToRgb(endColor, false);
    let endR = endRGB[0];
    let endG = endRGB[1];
    let endB = endRGB[2];
    let sR = (endR - startR) / step;
    let sG = (endG - startG) / step;
    let sB = (endB - startB) / step;
    let colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex("rgb(" + Math.round(sR * i + startR) + "," + Math.round(sG * i + startG) + "," + Math.round(sB * i + startB) + ")");
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      if (!str) {
        return sColorChange;
      } else {
        return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
      }
    } else if (/^(rgb|RGB)/.test(sColor)) {
      let arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    } else {
      return sColor;
    }
  }
  function rgbToHex(rgb) {
    let _this = rgb;
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      let aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? 0 + "" + hex : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    } else if (reg.test(_this)) {
      let aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      } else if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  function colorToRgba(color2, alpha = 0.3) {
    color2 = rgbToHex(color2);
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = color2.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      var sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
    } else {
      return sColor;
    }
  }
  var colorGradient$1 = {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba
  };
  function guid(len = 32, firstU = true, radix = null) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    let uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return "u" + uuid.join("");
    } else {
      return uuid.join("");
    }
  }
  let color = {
    primary: "#2979ff",
    primaryDark: "#2b85e4",
    primaryDisabled: "#a0cfff",
    primaryLight: "#ecf5ff",
    bgColor: "#f3f4f6",
    info: "#909399",
    infoDark: "#82848a",
    infoDisabled: "#c8c9cc",
    infoLight: "#f4f4f5",
    warning: "#ff9900",
    warningDark: "#f29100",
    warningDisabled: "#fcbd71",
    warningLight: "#fdf6ec",
    error: "#fa3534",
    errorDark: "#dd6161",
    errorDisabled: "#fab6b6",
    errorLight: "#fef0f0",
    success: "#19be6b",
    successDark: "#18b566",
    successDisabled: "#71d5a1",
    successLight: "#dbf1e1",
    mainColor: "#303133",
    contentColor: "#606266",
    tipsColor: "#909399",
    lightColor: "#c0c4cc",
    borderColor: "#e4e7ed"
  };
  function type2icon(type2 = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type2) == -1)
      type2 = "success";
    let iconName = "";
    switch (type2) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  function addUnit(value = "auto", unit = "rpx") {
    value = String(value);
    return test.number(value) ? `${value}${unit}` : value;
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      let gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    } else {
      return 0;
    }
  }
  function trim(str, pos = "both") {
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    } else if (pos == "left") {
      return str.replace(/^\s*/, "");
    } else if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    } else if (pos == "all") {
      return str.replace(/\s+/g, "");
    } else {
      return str;
    }
  }
  function toast(title, duration = 1500) {
    uni.showToast({
      title,
      icon: "none",
      duration
    });
  }
  function getParent(name, keys) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        let data = {};
        if (Array.isArray(keys)) {
          keys.map((val) => {
            data[val] = parent[val] ? parent[val] : "";
          });
        } else {
          for (let i in keys) {
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return data;
      }
    }
    return {};
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function os() {
    return uni.getSystemInfoSync().platform;
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  let timeout = null;
  function debounce(func, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func === "function" && func();
    } else {
      timeout = setTimeout(function() {
        typeof func === "function" && func();
      }, wait);
    }
  }
  let timeoutArr = [];
  let flagArr = [];
  function throttle(fn, time = 500, isImmediate = true, timeoutName = "default") {
    if (!timeoutArr[timeoutName])
      timeoutArr[timeoutName] = null;
    if (isImmediate) {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        if (typeof fn === "function")
          fn();
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
        }, time);
      }
    } else {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
          if (typeof fn === "function")
            fn();
        }, time);
      }
    }
  }
  let version = "1.10.1";
  var config = {
    v: version,
    version,
    type: [
      "primary",
      "success",
      "info",
      "error",
      "warning"
    ]
  };
  var zIndex = {
    toast: 10090,
    noNetwork: 10080,
    popup: 10075,
    mask: 10070,
    navbar: 980,
    topTips: 975,
    sticky: 970,
    indexListSticky: 965
  };
  function wranning(str) {
    {
      formatAppLog("warn", "at uni_modules/vk-uview-ui/index.js:13", str);
    }
  }
  const $u = {
    queryParams,
    route,
    timeFormat,
    date: timeFormat,
    timeFrom,
    colorGradient: colorGradient$1.colorGradient,
    colorToRgba: colorGradient$1.colorToRgba,
    guid,
    color,
    sys,
    os,
    type2icon,
    randomArray,
    wranning,
    get: http.get,
    post: http.post,
    put: http.put,
    "delete": http.delete,
    hexToRgb: colorGradient$1.hexToRgb,
    rgbToHex: colorGradient$1.rgbToHex,
    test,
    random,
    deepClone,
    deepMerge,
    getParent,
    $parent,
    addUnit,
    trim,
    type: ["primary", "success", "error", "warning", "info"],
    http,
    toast,
    config,
    zIndex,
    debounce,
    throttle
  };
  uni.$u = $u;
  const install = (Vue2) => {
    Vue2.mixin(mixin);
    Vue2.config.globalProperties.$u = $u;
  };
  var uView = {
    install
  };
  const store = createPinia();
  function setupStore(app) {
    app.use(store);
  }
  function createApp() {
    const app = vue.createVueApp(App);
    setupStore(app);
    app.use(uView);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
