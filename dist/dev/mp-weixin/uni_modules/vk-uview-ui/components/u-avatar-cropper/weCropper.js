"use strict";
var common_vendor = require("../../../../common/vendor.js");
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
    device = common_vendor.index.getSystemInfoSync();
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
    set: function set(value) {
      if (typeof value !== "string") {
        console.error("id\uFF1A" + value + " is invalid");
      }
      tmp.id = value;
    }
  },
  width: {
    default: 750,
    get: function get2() {
      return tmp.width;
    },
    set: function set2(value) {
      if (typeof value !== "number") {
        console.error("width\uFF1A" + value + " is invalid");
      }
      tmp.width = value;
    }
  },
  height: {
    default: 750,
    get: function get3() {
      return tmp.height;
    },
    set: function set3(value) {
      if (typeof value !== "number") {
        console.error("height\uFF1A" + value + " is invalid");
      }
      tmp.height = value;
    }
  },
  pixelRatio: {
    default: pixelRatio,
    get: function get4() {
      return tmp.pixelRatio;
    },
    set: function set4(value) {
      if (typeof value !== "number") {
        console.error("pixelRatio\uFF1A" + value + " is invalid");
      }
      tmp.pixelRatio = value;
    }
  },
  scale: {
    default: 2.5,
    get: function get5() {
      return tmp.scale;
    },
    set: function set5(value) {
      if (typeof value !== "number") {
        console.error("scale\uFF1A" + value + " is invalid");
      }
      tmp.scale = value;
    }
  },
  zoom: {
    default: 5,
    get: function get6() {
      return tmp.zoom;
    },
    set: function set6(value) {
      if (typeof value !== "number") {
        console.error("zoom\uFF1A" + value + " is invalid");
      } else if (value < 0 || value > 10) {
        console.error("zoom should be ranged in 0 ~ 10");
      }
      tmp.zoom = value;
    }
  },
  src: {
    default: "",
    get: function get7() {
      return tmp.src;
    },
    set: function set7(value) {
      if (typeof value !== "string") {
        console.error("src\uFF1A" + value + " is invalid");
      }
      tmp.src = value;
    }
  },
  cut: {
    default: {},
    get: function get8() {
      return tmp.cut;
    },
    set: function set8(value) {
      if (typeof value !== "object") {
        console.error("cut\uFF1A" + value + " is invalid");
      }
      tmp.cut = value;
    }
  },
  boundStyle: {
    default: {},
    get: function get9() {
      return tmp.boundStyle;
    },
    set: function set9(value) {
      if (typeof value !== "object") {
        console.error("boundStyle\uFF1A" + value + " is invalid");
      }
      tmp.boundStyle = value;
    }
  },
  onReady: {
    default: null,
    get: function get10() {
      return tmp.ready;
    },
    set: function set10(value) {
      tmp.ready = value;
    }
  },
  onBeforeImageLoad: {
    default: null,
    get: function get11() {
      return tmp.beforeImageLoad;
    },
    set: function set11(value) {
      tmp.beforeImageLoad = value;
    }
  },
  onImageLoad: {
    default: null,
    get: function get12() {
      return tmp.imageLoad;
    },
    set: function set12(value) {
      tmp.imageLoad = value;
    }
  },
  onBeforeDraw: {
    default: null,
    get: function get13() {
      return tmp.beforeDraw;
    },
    set: function set13(value) {
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
      get: function get14() {
        console.warn(
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
      self2.ctx = self2.ctx || common_vendor.index.createCanvasContext(id);
      self2.targetCtx = self2.targetCtx || common_vendor.index.createCanvasContext(targetId);
    } else {
      console.error("constructor: create canvas context failed, 'id' must be valuable");
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
var tools = createCommonjsModule(function(module, exports2) {
  exports2.isStr = function(v) {
    return typeof v === "string";
  };
  exports2.isNum = function(v) {
    return typeof v === "number";
  };
  exports2.isArr = Array.isArray;
  exports2.isUndef = function(v) {
    return v === void 0;
  };
  exports2.isTrue = function(v) {
    return v === true;
  };
  exports2.isFalse = function(v) {
    return v === false;
  };
  exports2.isFunc = function(v) {
    return typeof v === "function";
  };
  exports2.isObj = exports2.isObject = function(obj) {
    return obj !== null && typeof obj === "object";
  };
  var _toString = Object.prototype.toString;
  exports2.isPlainObject = function(obj) {
    return _toString.call(obj) === "[object Object]";
  };
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  exports2.hasOwn = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };
  exports2.noop = function(a, b, c) {
  };
  exports2.isValidArrayIndex = function(val) {
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
      console.error("event: " + event + " is invalid");
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
var getImageInfo = wxPromise(common_vendor.index.getImageInfo);
var canvasToTempFilePath = wxPromise(common_vendor.index.canvasToTempFilePath);
var base64 = createCommonjsModule(function(module, exports2) {
  /*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
  (function(root) {
    var freeExports = exports2;
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
function makeURI(strData, type) {
  return "data:" + type + ";base64," + strData;
}
function fixType(type) {
  type = type.toLowerCase().replace(/jpg/i, "jpeg");
  var r = type.match(/png|jpeg|bmp|gif/)[0];
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
  common_vendor.index.canvasGetImageData({
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
function convertToImage(canvasId, x, y, width, height, type, done) {
  if (done === void 0)
    done = function() {
    };
  if (type === void 0) {
    type = "png";
  }
  type = fixType(type);
  if (/bmp/.test(type)) {
    getImageData(canvasId, x, y, width, height, function(data, err) {
      var strData = genBitmapImage(data);
      tools_7(done) && done(makeURI(strData, "image/" + type), err);
    });
  } else {
    console.error("\u6682\u4E0D\u652F\u6301\u751F\u6210'" + type + "'\u7C7B\u578B\u7684base64\u56FE\u7247");
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
    var color = ref3.color;
    if (color === void 0)
      color = "#04b00f";
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
      self2.ctx.setStrokeStyle(color);
      self2.ctx.setLineWidth(lineWidth);
      self2.ctx.moveTo(op.start.x, op.start.y);
      self2.ctx.lineTo(op.step1.x, op.step1.y);
      self2.ctx.lineTo(op.step2.x, op.step2.y);
      self2.ctx.stroke();
    });
  };
}
var version = "1.3.9";
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
  self2.version = version;
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
exports.WeCropper = WeCropper;
