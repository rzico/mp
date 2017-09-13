// { "framework": "Vue" }
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(10)
	)
	__vue_styles__.push(__webpack_require__(11)
	)

	/* script */
	__vue_exports__ = __webpack_require__(12)

	/* template */
	var __vue_template__ = __webpack_require__(13)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/zhangsr/Documents/GitHub/weex/mp/src/login/login.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-d41c4bfe"
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	  for (var name in module) {
	    __vue_options__.style[name] = module[name]
	  }
	})
	if (typeof __register_static_styles__ === "function") {
	  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
	}

	module.exports = __vue_exports__
	module.exports.el = 'true'
	new Vue(module.exports)


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

	module.exports = {
	  "wrapper": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0,
	    "width": 750,
	    "backgroundColor": "#eeeeee"
	  },
	  "title": {
	    "fontSize": 32,
	    "color": "#000000"
	  },
	  "sub_title": {
	    "fontSize": 28,
	    "color": "#999999"
	  },
	  "mt10": {
	    "marginTop": 10
	  },
	  "mt20": {
	    "marginTop": 20
	  },
	  "mt30": {
	    "marginTop": 30
	  },
	  "ml10": {
	    "marginLeft": 10
	  },
	  "ml20": {
	    "marginLeft": 20
	  },
	  "ml30": {
	    "marginLeft": 30
	  },
	  "border-top-line": {
	    "borderTopWidth": 1,
	    "borderTopColor": "#dddddd",
	    "borderTopStyle": "solid"
	  },
	  "border-bottom-line": {
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#dddddd",
	    "borderBottomStyle": "solid"
	  },
	  "cell-header": {
	    "height": 70,
	    "flexDirection": "row",
	    "backgroundColor": "#dddddd",
	    "paddingLeft": 20
	  },
	  "cell-row": {
	    "minHeight": 100,
	    "flexDirection": "column",
	    "backgroundColor": "#ffffff",
	    "paddingLeft": 20,
	    "marginTop": 20
	  },
	  "cell-line": {
	    "borderTopWidth": 1,
	    "borderTopColor": "#cccccc",
	    "borderTopStyle": "solid",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#cccccc",
	    "borderBottomStyle": "solid"
	  },
	  "cell-panel": {
	    "height": 98,
	    "minHeight": 98,
	    "flexDirection": "row",
	    "alignItems": "center",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#cccccc",
	    "borderBottomStyle": "solid"
	  },
	  "cell-clear": {
	    "marginTop": 0,
	    "marginBottom": 0,
	    "borderBottomWidth": 0,
	    "borderTopWidth": 0
	  },
	  "space-between": {
	    "justifyContent": "space-between",
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "flex-start": {
	    "justifyContent": "flex-start",
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "flex-end": {
	    "justifyContent": "flex-end",
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "flex-center": {
	    "justifyContent": "center",
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "space-around": {
	    "justifyContent": "space-around",
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "flex-row": {
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "flex-column": {
	    "flexDirection": "column",
	    "alignItems": "center"
	  },
	  "align-items": {
	    "alignItems": "center"
	  },
	  "flex1": {
	    "flex": 1
	  },
	  "flex2": {
	    "flex": 2
	  },
	  "flex3": {
	    "flex": 3
	  },
	  "flex4": {
	    "flex": 4
	  },
	  "flex5": {
	    "flex": 6
	  },
	  "flex6": {
	    "flex": 6
	  },
	  "flex7": {
	    "flex": 7
	  },
	  "flex8": {
	    "flex": 8
	  },
	  "flex9": {
	    "flex": 9
	  },
	  "bkg-white": {
	    "backgroundColor": "#FFFFFF"
	  },
	  "bkg-primary": {
	    "backgroundColor": "#F0AD3C"
	  },
	  "bkg-gray": {
	    "backgroundColor": "#cccccc"
	  },
	  "bkg-color": {
	    "backgroundColor": "#eeeeee"
	  },
	  "white": {
	    "color": "#FFFFFF"
	  },
	  "primary": {
	    "color": "#F0AD3C"
	  },
	  "gray": {
	    "color": "#999999"
	  },
	  "color": {
	    "color": "#eeeeee"
	  },
	  "ico": {
	    "fontSize": 48,
	    "color": "#F0AD3C"
	  },
	  "arrow": {
	    "fontSize": 32,
	    "color": "#cccccc",
	    "width": 40
	  },
	  "button": {
	    "fontSize": 36,
	    "textAlign": "center",
	    "paddingTop": 20,
	    "paddingBottom": 20,
	    "borderWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#999999",
	    "backgroundColor": "#dddddd",
	    "borderRadius": 8
	  },
	  "indicator": {
	    "fontSize": 36,
	    "color": "#cccccc",
	    "width": 750,
	    "textAlign": "center",
	    "marginTop": 20,
	    "marginBottom": 20
	  },
	  "lines-ellipsis": {
	    "lines": 1,
	    "textOverflow": "ellipsis"
	  }
	}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = {
	  "login-header": {
	    "height": 350,
	    "backgroundColor": "#ffffff",
	    "flexDirection": "column",
	    "alignItems": "center"
	  },
	  "logo": {
	    "marginTop": 100,
	    "height": 150,
	    "width": 150,
	    "borderRadius": 75,
	    "overflow": "hidden"
	  },
	  "login-footer": {
	    "backgroundColor": "#ffffff",
	    "flexDirection": "column",
	    "alignItems": "center"
	  },
	  "login-panel": {
	    "flexDirection": "column",
	    "marginTop": 20,
	    "paddingLeft": 60,
	    "paddingRight": 60
	  },
	  "login-row": {
	    "height": 100,
	    "flexDirection": "row",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#cccccc",
	    "borderBottomStyle": "solid",
	    "alignItems": "center",
	    "justifyContent": "space-between"
	  },
	  "login-caption": {
	    "marginTop": 60,
	    "width": 750,
	    "backgroundColor": "#ffffff",
	    "height": 60,
	    "flexDirection": "row",
	    "flex": 1
	  },
	  "username": {
	    "height": 70,
	    "fontSize": 32
	  },
	  "password": {
	    "height": 70,
	    "fontSize": 32
	  },
	  "see": {
	    "fontSize": 48
	  },
	  "weixin": {
	    "fontSize": 150,
	    "color": "#008000"
	  },
	  "register": {
	    "flexDirection": "column",
	    "alignItems": "center",
	    "position": "fixed",
	    "bottom": 10,
	    "left": 0,
	    "right": 0,
	    "height": 80
	  }
	}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	    created: function created() {
	        var domModule = weex.requireModule("dom");
	        domModule.addRule('fontFace', {
	            'fontFamily': 'iconfont',
	            'src': "url('http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf')"
	        });
	    }
	};
	module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["wrapper", "bkg-white"]
	  }, [_vm._m(0), _c('div', {
	    staticClass: ["login-panel"]
	  }, [_c('div', {
	    staticClass: ["login-row"]
	  }, [_c('text', {
	    staticClass: ["title", "flex1"]
	  }, [_vm._v("账号")]), _c('input', {
	    staticClass: ["flex4", "username"],
	    attrs: {
	      "type": "text",
	      "placeholder": "登录名/手机号",
	      "autofocus": true,
	      "value": ""
	    },
	    on: {
	      "change": _vm.onchange,
	      "input": _vm.oninput
	    }
	  }), _c('div', {
	    staticClass: ["flex1"]
	  })]), _c('div', {
	    staticClass: ["login-row"]
	  }, [_c('text', {
	    staticClass: ["title", "flex1"]
	  }, [_vm._v("密码")]), _c('input', {
	    staticClass: ["flex4", "password"],
	    attrs: {
	      "type": "password",
	      "placeholder": "请输入登录密码"
	    },
	    on: {
	      "change": _vm.onchange,
	      "input": _vm.oninput
	    }
	  }), _c('div', {
	    staticClass: ["flex1", "flex-column"]
	  }, [_c('text', {
	    staticClass: ["see"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])])]), _vm._m(1), _c('text', {
	    staticClass: ["button", "bkg-color", "primary"],
	    attrs: {
	      "value": "登录",
	      "type": "primary"
	    }
	  }, [_vm._v("登录")])]), _c('div', {
	    staticClass: ["login-footer"]
	  }, [_vm._m(2), _c('div', [_c('text', {
	    staticClass: ["weixin"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])]), _vm._m(3)])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["login-header", "bkg-primary"]
	  }, [_c('image', {
	    staticClass: ["logo"],
	    attrs: {
	      "resize": "cover",
	      "src": "https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"
	    }
	  }), _c('text', {
	    staticClass: ["title"],
	    staticStyle: {
	      marginTop: "20px"
	    }
	  }, [_vm._v("张三")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["login-row", "cell-clear"]
	  }, [_c('text', {
	    staticClass: ["title", "gray"]
	  }, [_vm._v("手机验证码登录")]), _c('text', {
	    staticClass: ["title", "gray"]
	  }, [_vm._v("忘记密码？")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["login-caption"]
	  }, [_c('div', {
	    staticClass: ["flex1"]
	  }), _c('div', {
	    staticClass: ["flex1"]
	  }, [_c('div', {
	    staticClass: ["border-bottom-line"],
	    staticStyle: {
	      height: "28px"
	    }
	  })]), _c('div', {
	    staticClass: ["flex1", "gray", "flex-column"]
	  }, [_c('text', {
	    staticClass: ["title", "gray"]
	  }, [_vm._v("微信登录")])]), _c('div', {
	    staticClass: ["flex1"]
	  }, [_c('div', {
	    staticClass: ["border-bottom-line"],
	    staticStyle: {
	      height: "28px"
	    }
	  })]), _c('div', {
	    staticClass: ["flex1"]
	  })])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["register"]
	  }, [_c('text', {
	    staticClass: ["title"]
	  }, [_vm._v("点击注册新用户")])])
	}]}
	module.exports.render._withStripped = true

/***/ })
/******/ ]);