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
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(20)
	)
	__vue_styles__.push(__webpack_require__(21)
	)

	/* script */
	__vue_exports__ = __webpack_require__(22)

	/* template */
	var __vue_template__ = __webpack_require__(23)
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
	__vue_options__.__file = "/Users/ke/mopian/GitHubMoPian/mp/src/view/index.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-291bfe45"
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

/***/ 20:
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
	  "header": {
	    "height": 118,
	    "flexDirection": "row",
	    "position": "sticky",
	    "borderBottomWidth": 1,
	    "borderBottomStyle": "solid",
	    "borderBottomColor": "#999999",
	    "backgroundColor": "#D9141E",
	    "paddingTop": 22
	  },
	  "footer": {
	    "position": "fixed",
	    "bottom": 0,
	    "left": 0,
	    "right": 0,
	    "height": 100
	  },
	  "fill": {
	    "height": 500,
	    "backgroundColor": "#eeeeee"
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
	    "borderTopColor": "#999999",
	    "borderTopStyle": "solid",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#999999",
	    "borderBottomStyle": "solid"
	  },
	  "cell-panel": {
	    "height": 98,
	    "minHeight": 98,
	    "flexDirection": "row",
	    "alignItems": "center",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#999999",
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
	  "bkg-white": {
	    "backgroundColor": "#FFFFFF"
	  },
	  "bkg-primary": {
	    "backgroundColor": "#D9141E"
	  },
	  "bkg-gray": {
	    "backgroundColor": "#eeeeee"
	  },
	  "white": {
	    "color": "#FFFFFF"
	  },
	  "primary": {
	    "color": "#D9141E"
	  },
	  "gray": {
	    "color": "#999999"
	  },
	  "ico": {
	    "fontSize": 48,
	    "color": "#D9141E"
	  },
	  "arrow": {
	    "fontSize": 32,
	    "color": "#cccccc",
	    "width": 40
	  },
	  "button": {
	    "fontSize": 36,
	    "textAlign": "center",
	    "color": "#FAFAD2",
	    "paddingTop": 20,
	    "paddingBottom": 20,
	    "borderWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#999999",
	    "backgroundColor": "#D9141E",
	    "borderRadius": 12,
	    "backgroundColor:active": "#eeeeee",
	    "backgroundColor:disabled": "#D9141E",
	    "color:disabled": "#999999"
	  },
	  "indicator": {
	    "fontSize": 36,
	    "color": "#D9141E",
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

/***/ 21:
/***/ (function(module, exports) {

	module.exports = {
	  "image": {
	    "width": 750,
	    "height": 1334
	  },
	  "slider": {
	    "flex": 1
	  },
	  "frame": {
	    "flex": 1,
	    "position": "relative"
	  },
	  "indicator": {
	    "itemColor": "#ddd",
	    "itemSelectedColor": "#888",
	    "itemSize": 15,
	    "position": "fixed",
	    "height": 20,
	    "width": 750,
	    "bottom": 300
	  },
	  "footer-panel": {
	    "width": 750,
	    "height": 230,
	    "paddingLeft": 60,
	    "paddingRight": 60,
	    "backgroundColor": "#FFFFFF"
	  },
	  "btn": {
	    "backgroundColor": "#32CD32",
	    "borderColor": "#32CD32",
	    "flexDirection": "row",
	    "justifyContent": "center",
	    "paddingTop": 0,
	    "height": 80,
	    "alignItems": "center",
	    "borderRadius": 12
	  },
	  "ico": {
	    "fontSize": 58,
	    "color": "#FFFFFF"
	  },
	  "btn-text": {
	    "marginLeft": 20,
	    "color": "#FFFFFF",
	    "fontSize": 34
	  }
	}

/***/ }),

/***/ 22:
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

	var navigator = weex.requireModule('navigator');
	var native = weex.requireModule('app');
	var stream = weex.requireModule('stream');
	exports.default = {
	    data: function data() {
	        return {
	            imageList: [{ src: 'http://cdn.rzico.com/weex/resources/images/flash1.jpg' }, { src: 'http://cdn.rzico.com/weex/resources/images/flash2.jpg' }, { src: 'http://cdn.rzico.com/weex/resources/images/flash3.jpg' }, { src: 'http://cdn.rzico.com/weex/resources/images/flash4.jpg' }]
	        };
	    },
	    created: function created() {
	        var domModule = weex.requireModule("dom");
	        domModule.addRule('fontFace', {
	            'fontFamily': 'iconfont',
	            'src': "url('http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf')"
	        });

	        native.changeWindowsBar();
	    },

	    methods: {
	        weixin: function weixin(e) {
	            native.wxAuth(function (message) {
	                if (message.type == "success") {
                              native.showToast('success');
//                        return stream.fetch({
//                            method: 'GET',
//                            type: 'json',
//                            url: '/weex/login/weixin.jhtml?code=' + message.data
//                        }, function (weex) {
//                            native.showToast(weex);
//                            //                                 if (message.type == "success") {
//                            //                                    navigator.pop({
//                            //                                        url: 'http://cdn.rzico.com/weex/app/view/index.js',
//                            //                                        animated: "true"
//                            //                                    })
//                            //                                } else {
//                            //                                    native.showToast(message.content);
//                            //                                }
//                        });
	                } else {
	                    native.showToast(message.content);
	                }
	            });
	        },
	        account: function account(e) {
	            navigator.push({
	                url: 'http://cdn.rzico.com/weex/app/view/login.js',
	                animated: "true"
	            }, function (msg) {
	                msg = "pop ";
	            });
	        },
	        goback: function goback(e) {
	            navigator.pop({
	                url: 'http://cdn.rzico.com/weex/app/view/index.js',
	                animated: "true"
	            }, function (msg) {
	                msg = "pop ";
	            });
	        }
	    }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["wrapper", "bkg-white"]
	  }, [_c('slider', {
	    staticClass: ["slider"],
	    attrs: {
	      "interval": "3000",
	      "autoPlay": "true"
	    }
	  }, [_vm._l((_vm.imageList), function(img) {
	    return _c('div', {
	      staticClass: ["frame"]
	    }, [_c('image', {
	      staticClass: ["image"],
	      attrs: {
	        "resize": "cover",
	        "src": img.src
	      }
	    })])
	  }), _c('indicator', {
	    staticClass: ["indicator"]
	  })], 2), _c('div', {
	    staticClass: ["footer", "footer-panel"]
	  }, [_c('div', {
	    staticClass: ["flex-row"]
	  }, [_c('div', {
	    staticClass: ["flex1", "btn"]
	  }, [_c('text', {
	    staticClass: ["ico"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")]), _c('text', {
	    staticClass: ["btn-text"],
	    attrs: {
	      "value": "微信快捷登录"
	    },
	    on: {
	      "click": function($event) {
	        _vm.weixin()
	      }
	    }
	  }, [_vm._v("微信快捷登录")])])]), _c('div', {
	    staticClass: ["space-between"],
	    staticStyle: {
	      marginTop: "40px"
	    }
	  }, [_c('text', {
	    staticClass: ["title", "gray"],
	    on: {
	      "click": function($event) {
	        _vm.account()
	      }
	    }
	  }, [_vm._v("其他方式登录")]), _c('text', {
	    staticClass: ["title", "gray"],
	    on: {
	      "click": function($event) {
	        _vm.goback()
	      }
	    }
	  }, [_vm._v("关闭随便看看")])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ })

/******/ });
