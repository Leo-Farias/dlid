// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"lib/phaser-input.min.js":[function(require,module,exports) {
/*!
 * phaser-input - version 2.0.5 
 * Adds input boxes to Phaser like CanvasInput, but also works for WebGL and Mobile, made for Phaser only.
 *
 * Azerion
 * Build at 18-03-2019
 * Released under MIT License 
 */
var __extends = this && this.__extends || function () {
  var a = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (a, b) {
    a.__proto__ = b;
  } || function (a, b) {
    for (var c in b) {
      b.hasOwnProperty(c) && (a[c] = b[c]);
    }
  };

  return function (b, c) {
    function d() {
      this.constructor = b;
    }

    a(b, c), b.prototype = null === c ? Object.create(c) : (d.prototype = c.prototype, new d());
  };
}(),
    PhaserInput;

!function (a) {
  var b;
  !function (a) {
    a[a.text = 0] = "text", a[a.password = 1] = "password", a[a.number = 2] = "number";
  }(b = a.InputType || (a.InputType = {}));

  var c = function () {
    function a(a, c, d, e, f, g) {
      void 0 === d && (d = b.text), void 0 === e && (e = "");
      var h = this;
      this.id = c, this.type = d, this.game = a, this.focusIn = f, this.focusOut = g;
      var i = this.game.canvas.getBoundingClientRect().top + document.body.scrollTop;
      this.element = document.createElement("input"), this.element.id = c, this.element.style.position = "absolute", this.element.style.top = i + "px", this.element.style.left = (-40).toString() + "px", this.element.style.width = 10..toString() + "px", this.element.style.height = 10..toString() + "px", this.element.style.border = "0px", this.element.value = this.value, this.element.type = b[d], this.element.addEventListener("focusin", function () {
        h.focusIn instanceof Phaser.Signal && h.focusIn.dispatch();
      }), this.element.addEventListener("focusout", function () {
        h.focusOut instanceof Phaser.Signal && h.focusOut.dispatch();
      }), document.body.appendChild(this.element);
    }

    return a.prototype.addKeyUpListener = function (a) {
      this.keyUpCallback = a, document.addEventListener("keyup", this.keyUpCallback), this.element.addEventListener("input", this.keyUpCallback);
    }, a.prototype.blockKeyDownEvents = function () {
      document.addEventListener("keydown", this.preventKeyPropagation);
    }, a.prototype.preventKeyPropagation = function (a) {
      a.stopPropagation ? a.stopPropagation() : event.cancelBubble = !0;
    }, a.prototype.unblockKeyDownEvents = function () {
      document.removeEventListener("keydown", this.preventKeyPropagation);
    }, a.prototype.removeEventListener = function () {
      document.removeEventListener("keyup", this.keyUpCallback), this.element.removeEventListener("input", this.keyUpCallback);
    }, a.prototype.destroy = function () {
      document.body.removeChild(this.element);
    }, a.prototype.setMax = function (a, c) {
      if (void 0 !== a) if (this.type === b.text || this.type === b.password) this.element.maxLength = parseInt(a, 10);else if (this.type === b.number) {
        if (this.element.max = a, void 0 === c) return;
        this.element.min = c;
      }
    }, Object.defineProperty(a.prototype, "value", {
      get: function get() {
        return this.element.value;
      },
      set: function set(a) {
        this.element.value = a;
      },
      enumerable: !0,
      configurable: !0
    }), a.prototype.focus = function () {
      var a = this;
      if (this.element.focus(), !this.game.device.desktop && this.game.device.chrome) var b = window.innerWidth,
          c = window.innerHeight,
          d = !1,
          e = setInterval(function () {
        (b > window.innerWidth || c > window.innerHeight) && (d = !0), d && b === window.innerWidth && c === window.innerHeight && (a.focusOut instanceof Phaser.Signal && a.focusOut.dispatch(), clearInterval(e));
      }, 50);
    }, a.prototype.blur = function () {
      this.element.blur();
    }, Object.defineProperty(a.prototype, "hasSelection", {
      get: function get() {
        return this.type === b.number ? !1 : this.element.selectionStart !== this.element.selectionEnd;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(a.prototype, "caretStart", {
      get: function get() {
        return this.element.selectionEnd;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(a.prototype, "caretEnd", {
      get: function get() {
        return this.element.selectionStart;
      },
      enumerable: !0,
      configurable: !0
    }), a.prototype.getCaretPosition = function () {
      return this.type === b.number ? -1 : this.element.selectionStart;
    }, a.prototype.setCaretPosition = function (a) {
      this.type !== b.number && this.element.setSelectionRange(a, a);
    }, a;
  }();

  a.InputElement = c;
}(PhaserInput || (PhaserInput = {}));
var PhaserInput;
!function (a) {
  var b;
  !function (a) {
    a[a.none = 0] = "none", a[a.lower = 1] = "lower", a[a.upper = 2] = "upper";
  }(b = a.ForceCase || (a.ForceCase = {}));

  var c = function (c) {
    function d(d, e, f, g) {
      void 0 === g && (g = {});
      var h = c.call(this, d, e, f) || this;
      return h.focusOutOnEnter = !0, h.placeHolder = null, h.box = null, h.focus = !1, h.value = "", h.windowScale = 1, h.blockInput = !0, h.focusIn = new Phaser.Signal(), h.focusOut = new Phaser.Signal(), h.blink = !0, h.cnt = 0, h.inputOptions = g, h.inputOptions.width = "number" == typeof g.width ? g.width : 150, h.inputOptions.padding = "number" == typeof g.padding ? g.padding : 0, h.inputOptions.textAlign = g.textAlign || "left", h.inputOptions.type = g.type || a.InputType.text, h.inputOptions.forceCase = g.forceCase ? g.forceCase : b.none, h.inputOptions.borderRadius = "number" == typeof g.borderRadius ? g.borderRadius : 0, h.inputOptions.height = "number" == typeof g.height ? g.height : 14, h.inputOptions.fillAlpha = void 0 === g.fillAlpha ? 1 : g.fillAlpha, h.inputOptions.selectionColor = g.selectionColor || "rgba(179, 212, 253, 0.8)", h.inputOptions.zoom = d.device.desktop ? !1 : g.zoom || !1, h.box = new a.InputBox(h.game, g), h.setTexture(h.box.generateTexture()), h.textMask = new a.TextMask(h.game, g), h.addChild(h.textMask), h.domElement = new a.InputElement(h.game, "phaser-input-" + (1e4 * Math.random() | 0).toString(), h.inputOptions.type, h.value, h.focusIn, h.focusOut), h.domElement.setMax(h.inputOptions.max, h.inputOptions.min), h.selection = new a.SelectionHighlight(h.game, h.inputOptions), h.selection.mask = h.textMask, h.addChild(h.selection), g.placeHolder && g.placeHolder.length > 0 && (h.placeHolder = new Phaser.Text(d, h.inputOptions.padding, h.inputOptions.padding, g.placeHolder, {
        font: g.font || "14px Arial",
        fontWeight: g.fontWeight || "normal",
        fill: g.placeHolderColor || "#bfbebd"
      }), h.placeHolder.mask = h.textMask, h.addChild(h.placeHolder)), h.cursor = new Phaser.Text(d, h.inputOptions.padding, h.inputOptions.padding - 2, "|", {
        font: g.font || "14px Arial",
        fontWeight: g.fontWeight || "normal",
        fill: g.cursorColor || "#000000"
      }), h.cursor.visible = !1, h.addChild(h.cursor), h.text = new Phaser.Text(d, h.inputOptions.padding, h.inputOptions.padding, "", {
        font: g.font || "14px Arial",
        fontWeight: g.fontWeight || "normal",
        fill: g.fill || "#000000"
      }), h.text.mask = h.textMask, h.addChild(h.text), h.offscreenText = new Phaser.Text(d, h.inputOptions.padding, h.inputOptions.padding, "", {
        font: g.font || "14px Arial",
        fontWeight: g.fontWeight || "normal",
        fill: g.fill || "#000000"
      }), h.updateTextAlignment(), h.inputEnabled = !0, h.input.useHandCursor = !0, h.game.input.onDown.add(h.checkDown, h), h.focusOut.add(function () {
        a.KeyboardOpen && (h.endFocus(), h.inputOptions.zoom && h.zoomOut());
      }), h;
    }

    return __extends(d, c), Object.defineProperty(d.prototype, "width", {
      get: function get() {
        return this.inputOptions.width;
      },
      set: function set(a) {
        this.inputOptions.width = a, this.box.resize(a), this.textMask.resize(a), this.updateTextAlignment();
      },
      enumerable: !0,
      configurable: !0
    }), d.prototype.updateTextAlignment = function () {
      switch (this.inputOptions.textAlign) {
        case "left":
          this.text.anchor.set(0, 0), this.text.x = this.inputOptions.padding, null !== this.placeHolder && this.placeHolder.anchor.set(0, 0), this.cursor.x = this.inputOptions.padding + this.getCaretPosition();
          break;

        case "center":
          this.text.anchor.set(.5, 0), this.text.x = this.inputOptions.padding + this.inputOptions.width / 2, null !== this.placeHolder && (this.placeHolder.anchor.set(.5, 0), this.placeHolder.x = this.inputOptions.padding + this.inputOptions.width / 2), this.cursor.x = this.inputOptions.padding + this.inputOptions.width / 2 - this.text.width / 2 + this.getCaretPosition();
          break;

        case "right":
          this.text.anchor.set(1, 0), this.text.x = this.inputOptions.padding + this.inputOptions.width, null !== this.placeHolder && (this.placeHolder.anchor.set(1, 0), this.placeHolder.x = this.inputOptions.padding + this.inputOptions.width), this.cursor.x = this.inputOptions.padding + this.inputOptions.width;
      }
    }, d.prototype.checkDown = function (b) {
      if (this.value || this.resetText(), this.input.checkPointerOver(b)) {
        if (this.focus) return void this.setCaretOnclick(b);
        this.inputOptions.zoom && !a.Zoomed && this.zoomIn(), this.startFocus();
      } else this.focus === !0 && (this.endFocus(), this.inputOptions.zoom && this.zoomOut());
    }, d.prototype.update = function () {
      if (this.text.update(), this.placeHolder && this.placeHolder.update(), this.focus) {
        if (30 !== this.cnt) return this.cnt++;
        this.cursor.visible = this.blink, this.blink = !this.blink, this.cnt = 0;
      }
    }, d.prototype.endFocus = function () {
      var b = this;
      this.focus && (this.domElement.removeEventListener(), this.blockInput === !0 && this.domElement.unblockKeyDownEvents(), this.focus = !1, 0 === this.value.length && null !== this.placeHolder && (this.placeHolder.visible = !0), this.cursor.visible = !1, this.game.device.desktop ? setTimeout(function () {
        b.domElement.blur();
      }, 0) : this.domElement.blur(), this.game.device.desktop || (a.KeyboardOpen = !1, a.onKeyboardClose.dispatch()));
    }, d.prototype.startFocus = function () {
      var b = this;
      this.focus = !0, null !== this.placeHolder && (this.placeHolder.visible = !1), this.game.device.desktop ? setTimeout(function () {
        b.keyUpProcessor();
      }, 0) : this.keyUpProcessor(), this.game.device.desktop || (a.KeyboardOpen = !0, a.onKeyboardOpen.dispatch());
    }, d.prototype.keyUpProcessor = function () {
      this.domElement.addKeyUpListener(this.keyListener.bind(this)), this.domElement.focus(), this.blockInput === !0 && this.domElement.blockKeyDownEvents();
    }, d.prototype.updateText = function () {
      var b = "";
      if (this.inputOptions.type === a.InputType.password) for (var c = 0; c < this.value.length; c++) {
        b += "*";
      } else if (this.inputOptions.type === a.InputType.number) {
        var d = parseInt(this.value);
        b = d < parseInt(this.inputOptions.min) ? this.value = this.domElement.value = this.inputOptions.min : d > parseInt(this.inputOptions.max) ? this.value = this.domElement.value = this.inputOptions.max : this.value;
      } else b = this.value;
      if (this.text.setText(b), this.text.width > this.inputOptions.width) this.text.anchor.x = 1, this.text.x = this.inputOptions.padding + this.inputOptions.width;else switch (this.inputOptions.textAlign) {
        case "left":
          this.text.anchor.set(0, 0), this.text.x = this.inputOptions.padding;
          break;

        case "center":
          this.text.anchor.set(.5, 0), this.text.x = this.inputOptions.padding + this.inputOptions.width / 2;
          break;

        case "right":
          this.text.anchor.set(1, 0), this.text.x = this.inputOptions.padding + this.inputOptions.width;
      }
    }, d.prototype.updateCursor = function () {
      if (this.text.width > this.inputOptions.width || "right" === this.inputOptions.textAlign) this.cursor.x = this.inputOptions.padding + this.inputOptions.width;else switch (this.inputOptions.textAlign) {
        case "left":
          this.cursor.x = this.inputOptions.padding + this.getCaretPosition();
          break;

        case "center":
          this.cursor.x = this.inputOptions.padding + this.inputOptions.width / 2 - this.text.width / 2 + this.getCaretPosition();
      }
    }, d.prototype.getCaretPosition = function () {
      var b = this.domElement.getCaretPosition();
      if (-1 === b) return this.text.width;
      var c = this.value;

      if (this.inputOptions.type === a.InputType.password) {
        c = "";

        for (var d = 0; d < this.value.length; d++) {
          c += "*";
        }
      }

      return this.offscreenText.setText(c.slice(0, b)), this.offscreenText.width;
    }, d.prototype.setCaretOnclick = function (a) {
      var b = this.text.toLocal(new PIXI.Point(a.x, a.y), this.game.world).x;
      this.inputOptions.textAlign && "center" === this.inputOptions.textAlign && (b += this.text.width / 2);

      for (var c = this.text.width / this.value.length, d = 0, e = 0; e < this.value.length; e++) {
        if (b >= e * c && (e + 1) * c >= b) {
          d = e;
          break;
        }
      }

      b > (this.value.length - 1) * c && (d = this.value.length), this.startFocus(), this.domElement.setCaretPosition(d), this.updateCursor();
    }, d.prototype.updateSelection = function () {
      if (this.domElement.hasSelection) {
        var b = this.value;

        if (this.inputOptions.type === a.InputType.password) {
          b = "";

          for (var c = 0; c < this.value.length; c++) {
            b += "*";
          }
        }

        switch (b = b.substring(this.domElement.caretStart, this.domElement.caretEnd), this.offscreenText.setText(b), this.selection.updateSelection(this.offscreenText.getBounds()), this.inputOptions.textAlign) {
          case "left":
            this.selection.x = this.inputOptions.padding;
            break;

          case "center":
            this.selection.x = this.inputOptions.padding + this.inputOptions.width / 2 - this.text.width / 2;
        }
      } else this.selection.clear();
    }, d.prototype.zoomIn = function () {
      if (!a.Zoomed) {
        var b = this.getBounds();
        window.innerHeight > window.innerWidth ? this.windowScale = this.game.width / (1.5 * b.width) : this.windowScale = this.game.width / 2 / (1.5 * b.width);
        var c = (this.game.width - 1.5 * b.width) / 2 / this.windowScale;
        this.game.world.scale.set(this.game.world.scale.x * this.windowScale, this.game.world.scale.y * this.windowScale), this.game.world.pivot.set(b.x - c, b.y - 2 * this.inputOptions.padding), a.Zoomed = !0;
      }
    }, d.prototype.zoomOut = function () {
      a.Zoomed && (this.game.world.scale.set(this.game.world.scale.x / this.windowScale, this.game.world.scale.y / this.windowScale), this.game.world.pivot.set(0, 0), a.Zoomed = !1);
    }, d.prototype.keyListener = function (a) {
      return this.value = this.getFormattedText(this.domElement.value), 13 === a.keyCode ? void (this.focusOutOnEnter && this.endFocus()) : (this.updateText(), this.updateCursor(), this.updateSelection(), void a.preventDefault());
    }, d.prototype.destroy = function (a) {
      this.game.input.onDown.remove(this.checkDown, this), this.focusIn.removeAll(), this.focusOut.removeAll(), this.domElement.destroy(), c.prototype.destroy.call(this, a);
    }, d.prototype.resetText = function () {
      this.setText();
    }, d.prototype.setText = function (a) {
      void 0 === a && (a = ""), null !== this.placeHolder && (a.length > 0 ? this.placeHolder.visible = !1 : this.placeHolder.visible = !0), this.value = this.getFormattedText(a), this.domElement.value = this.value, this.updateText(), this.updateCursor(), this.endFocus();
    }, d.prototype.getFormattedText = function (a) {
      switch (this.inputOptions.forceCase) {
        default:
        case b.none:
          return a;

        case b.lower:
          return a.toLowerCase();

        case b.upper:
          return a.toUpperCase();
      }
    }, d;
  }(Phaser.Sprite);

  a.InputField = c;
}(PhaserInput || (PhaserInput = {}));
var PhaserInput;
!function (a) {
  var b = function (a) {
    function b(b, c) {
      var d = a.call(this, b, 0, 0) || this;
      d.bgColor = c.backgroundColor ? parseInt(c.backgroundColor.slice(1), 16) : 16777215, d.borderRadius = c.borderRadius = "number" == typeof c.borderRadius ? c.borderRadius : 0, d.borderWidth = c.borderWidth = "number" == typeof c.borderWidth ? c.borderWidth : 1, d.borderColor = c.borderColor ? parseInt(c.borderColor.slice(1), 16) : 9803157, d.boxAlpha = c.fillAlpha, d.padding = c.padding;
      var e,
          e = c.height,
          f = c.width;
      c.font && (e = Math.max(parseInt(c.font.substr(0, c.font.indexOf("px")), 10), e)), d.boxHeight = 2 * d.padding + e;
      var f = c.width;
      return d.boxWidth = 2 * d.padding + f, d.drawBox(), d;
    }

    return __extends(b, a), b.prototype.resize = function (a) {
      this.boxWidth = 2 * this.padding + a, this.drawBox();
    }, b.prototype.drawBox = function () {
      this.clear().beginFill(this.bgColor, this.boxAlpha).lineStyle(this.borderWidth, this.borderColor, this.boxAlpha), this.borderRadius > 0 ? this.drawRoundedRect(0, 0, this.boxWidth, this.boxHeight, this.borderRadius) : this.drawRect(0, 0, this.boxWidth, this.boxHeight);
    }, b;
  }(Phaser.Graphics);

  a.InputBox = b;
}(PhaserInput || (PhaserInput = {}));
var PhaserInput;
!function (a) {
  var b = function (a) {
    function b(b, c) {
      var d = a.call(this, b, c.padding, c.padding) || this;
      return d.inputOptions = c, d;
    }

    return __extends(b, a), b.prototype.updateSelection = function (a) {
      var c = Phaser.Color.webToColor(this.inputOptions.selectionColor);
      this.clear(), this.beginFill(b.rgb2hex(c), c.a), this.drawRect(a.x, a.y, a.width, a.height - this.inputOptions.padding);
    }, b.rgb2hex = function (a) {
      return parseInt(("0" + a.r.toString(16)).slice(-2) + ("0" + a.g.toString(16)).slice(-2) + ("0" + a.b.toString(16)).slice(-2), 16);
    }, b;
  }(Phaser.Graphics);

  a.SelectionHighlight = b;
}(PhaserInput || (PhaserInput = {}));
var PhaserInput;
!function (a) {
  var b = function (a) {
    function b(b, c) {
      var d = a.call(this, b, c.padding, c.padding) || this,
          e = c.height;
      return c.font && (e = Math.max(parseInt(c.font.substr(0, c.font.indexOf("px")), 10), e)), d.maskWidth = c.width, d.maskHeight = 1.3 * e, d.drawMask(), d;
    }

    return __extends(b, a), b.prototype.resize = function (a) {
      this.maskWidth = a, this.drawMask();
    }, b.prototype.drawMask = function () {
      this.clear().beginFill(0).drawRect(0, 0, this.maskWidth, this.maskHeight).endFill();
    }, b;
  }(Phaser.Graphics);

  a.TextMask = b;
}(PhaserInput || (PhaserInput = {}));
var PhaserInput;
!function (a) {
  a.Zoomed = !1, a.KeyboardOpen = !1, a.onKeyboardOpen = new Phaser.Signal(), a.onKeyboardClose = new Phaser.Signal();

  var b = function (b) {
    function c(a, c) {
      var d = b.call(this, a, c) || this;
      return d.addInputFieldFactory(), d;
    }

    return __extends(c, b), c.prototype.addInputFieldFactory = function () {
      Phaser.GameObjectFactory.prototype.inputField = function (b, c, d, e) {
        void 0 === e && (e = this.world);
        var f = new a.InputField(this.game, b, c, d);
        return e.add(f);
      }, Phaser.GameObjectCreator.prototype.inputField = function (b, c, d) {
        return new a.InputField(this.game, b, c, d);
      };
    }, c;
  }(Phaser.Plugin);

  b.Zoomed = !1, b.KeyboardOpen = !1, b.onKeyboardOpen = new Phaser.Signal(), b.onKeyboardClose = new Phaser.Signal(), a.Plugin = b;
}(PhaserInput || (PhaserInput = {}));
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50313" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","lib/phaser-input.min.js"], null)
//# sourceMappingURL=/phaser-input.min.2c026d3e.js.map