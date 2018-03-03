!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("mylibrary", [], factory) : "object" == typeof exports ? exports.mylibrary = factory() : root.mylibrary = factory();
}("undefined" != typeof self ? self : this, function() {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = !0;
            return module.exports;
        }
        var installedModules = {};
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        };
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
        };
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = "./src/index.js");
    }({
        "./src/button/create.js": function(module, exports, __webpack_require__) {
            "use strict";
            function createButton(container, text, onClick) {
                var button = document.createElement("button");
                button.innerText = text;
                button.addEventListener("click", onClick);
                container.appendChild(button);
                return button;
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.createButton = createButton;
        },
        "./src/button/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _create = __webpack_require__("./src/button/create.js");
            Object.keys(_create).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _create[key];
                    }
                });
            });
        },
        "./src/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _button = __webpack_require__("./src/button/index.js");
            Object.keys(_button).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _button[key];
                    }
                });
            });
        }
    });
});
//# sourceMappingURL=mylibrary.js.map
//# sourceMappingURL=mylibrary.js.map