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
	__vue_styles__.push(__webpack_require__(254)
	)
	__vue_styles__.push(__webpack_require__(255)
	)

	/* script */
	__vue_exports__ = __webpack_require__(256)

	/* template */
	var __vue_template__ = __webpack_require__(257)
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
	__vue_options__.__file = "/Users/ke/mopian/GitHubMoPian/mp/src/view/member/wallet/deposit.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-f1189ee0"
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

/***/ 94:
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
	  "nav_title": {
	    "fontSize": 38,
	    "color": "#ffffff",
	    "lineHeight": 38
	  },
	  "title": {
	    "fontSize": 32,
	    "color": "#000000"
	  },
	  "sub_title": {
	    "fontSize": 28,
	    "color": "#bbbbbb"
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
	    "height": 136,
	    "flexDirection": "row",
	    "position": "sticky",
	    "borderBottomWidth": 1,
	    "borderBottomStyle": "solid",
	    "borderBottomColor": "#bbbbbb",
	    "backgroundColor": "#D9141E"
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
	    "width": 750,
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
	    "borderTopColor": "#bbbbbb",
	    "borderTopStyle": "solid",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#bbbbbb",
	    "borderBottomStyle": "solid"
	  },
	  "cell-panel": {
	    "height": 98,
	    "minHeight": 98,
	    "flexDirection": "row",
	    "alignItems": "center",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#bbbbbb",
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
	    "color": "#bbbbbb"
	  },
	  "ico": {
	    "fontSize": 48,
	    "color": "#D9141E"
	  },
	  "ico_big": {
	    "fontSize": 72,
	    "color": "#D9141E"
	  },
	  "ico_small": {
	    "fontSize": 32,
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
	    "color": "#ffffff",
	    "paddingTop": 20,
	    "paddingBottom": 20,
	    "backgroundColor": "#D9141E",
	    "borderRadius": 15,
	    "backgroundColor:active": "#bbbbbb",
	    "color:active": "#D9141E",
	    "backgroundColor:disabled": "#D9141E",
	    "color:disabled": "#999999"
	  },
	  "refresh": {
	    "flexDirection": "column",
	    "alignItems": "center",
	    "paddingTop": 10
	  },
	  "loading": {
	    "flexDirection": "column",
	    "alignItems": "center",
	    "paddingTop": 10
	  },
	  "gif": {
	    "width": 50,
	    "height": 50
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

/***/ 95:
/***/ (function(module, exports) {

	module.exports = {
	  "nav_back": {
	    "marginTop": 40,
	    "flexDirection": "row",
	    "width": 96,
	    "height": 96,
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "nav_ico": {
	    "fontSize": 38,
	    "color": "#ffffff"
	  },
	  "nav": {
	    "width": 654,
	    "justifyContent": "space-between",
	    "flexDirection": "row",
	    "alignItems": "center",
	    "paddingRight": 30,
	    "marginTop": 40
	  },
	  "nav_Complete": {
	    "fontFamily": "Verdana, Geneva, sans-serif",
	    "fontSize": 34,
	    "lineHeight": 34,
	    "color": "#FFFFFF"
	  }
	}

/***/ }),

/***/ 96:
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

	exports.default = {
	    props: {
	        title: { default: "navbar" },
	        complete: { default: '' },
	        showComplete: { default: true }
	    },
	    methods: {
	        goback: function goback(e) {
	            this.$emit('goback');
	        },
	        goComplete: function goComplete(e) {
	            this.$emit('goComplete');
	        }
	    }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 97:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["header"]
	  }, [_c('div', {
	    staticClass: ["nav_back"],
	    on: {
	      "click": function($event) {
	        _vm.goback('/')
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["nav_ico"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])]), _c('div', {
	    staticClass: ["nav"]
	  }, [_c('text', {
	    staticClass: ["nav_title"]
	  }, [_vm._v(_vm._s(_vm.title))]), (_vm.showComplete) ? _c('text', {
	    staticClass: ["nav_Complete"],
	    on: {
	      "click": function($event) {
	        _vm.goComplete('/')
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.complete))]) : _vm._e()])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(94)
	)
	__vue_styles__.push(__webpack_require__(95)
	)

	/* script */
	__vue_exports__ = __webpack_require__(96)

	/* template */
	var __vue_template__ = __webpack_require__(97)
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
	__vue_options__.__file = "/Users/ke/mopian/GitHubMoPian/mp/src/include/navbar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-550306b4"
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


/***/ }),

/***/ 144:
/***/ (function(module, exports) {

	'use strict';

	//时间格式化 今天 近三天 近七天  七天前
	Vue.filter('dayfmt', function (value) {
	    //value 传进来是个整数型，要判断是10位还是13位需要转成字符串。这边的方法是检测13位的时间戳 所以要*1000；并且转回整型。安卓下，时间早了8个小时
	    value = value + '';
	    if (value.length == 10) {
	        value = parseInt(value) * 1000;
	    } else {
	        value = parseInt(value);
	    }
	    var date = new Date(value);
	    var tody = new Date();
	    var m = tody.getDate() - date.getDate();
	    if (m < 1) {
	        return "今天";
	    }
	    if (m < 3) {
	        return "近三天";
	    }
	    if (m < 7) {
	        return "近七天";
	    }
	    return "七天前";
	});
	// 时间格式化 10:30 昨天 前天 2017-09-01 09-01
	Vue.filter('timefmt', function (value) {
	    //value 传进来是个整数型，要判断是10位还是13位需要转成字符串。这边的方法是检测13位的时间戳 所以要*1000；并且转回整型。安卓下，时间早了8个小时
	    value = value + '';
	    if (value.length == 10) {
	        value = parseInt(value) * 1000;
	    } else {
	        value = parseInt(value);
	    }
	    var date = new Date(value);
	    var tody = new Date();
	    var y = date.getFullYear();
	    var nowy = tody.getFullYear();
	    var m = date.getMonth() + 1;
	    var w = tody.getDate() - date.getDate();
	    if (w < 1) {
	        var h = date.getHours();
	        var i = date.getMinutes();
	        if (h < 10) {
	            h = '0' + h;
	        }
	        if (i < 10) {
	            i = '0' + i;
	        }
	        return h + ":" + i;
	        // return value;
	    }
	    if (w < 2) {
	        return "昨天";
	    }
	    if (w < 3) {
	        return "前天";
	    }
	    if (m < 10) {
	        m = '0' + m;
	    }
	    //如果是今年 就不返回年份
	    if (nowy != y) {
	        return m + '月' + date.getDate() + '日';
	    } else {
	        return y + '年' + m + '月' + date.getDate() + '日';
	    }
	    // return value;
	});

	//月份格式化 本月 上月 2..12月  2016年1月..
	Vue.filter('monthfmt', function (value) {
	    //value 传进来是个整数型，要判断是10位还是13位需要转成字符串。这边的方法是检测13位的时间戳 所以要*1000；并且转回整型。安卓下，时间早了8个小时
	    value = value + '';
	    if (value.length == 10) {
	        value = parseInt(value) * 1000;
	    } else {
	        value = parseInt(value);
	    }
	    // 返回处理后的值
	    var date = new Date(value);
	    var tody = new Date();
	    var m = tody.getMonth() - date.getMonth();
	    var y = tody.getYear() - date.getYear();
	    if (m < 1) {
	        return "本月";
	    }
	    if (m < 2) {
	        return "上月";
	    }
	    if (y < 1) {
	        return date.getMonth() + "月";
	    }
	    return date.getYear() + "年" + date.getMonth() + "月";
	});

	//返回月份 7 8 9 单数字
	Vue.filter('detailMonth', function (value) {
	    //value 传进来是个整数型，要判断是10位还是13位需要转成字符串。这边的方法是检测13位的时间戳 所以要*1000；并且转回整型。安卓下，时间早了8个小时
	    value = value + '';
	    if (value.length == 10) {
	        value = parseInt(value) * 1000;
	    } else {
	        value = parseInt(value);
	    }
	    // 返回处理后的值
	    var date = new Date(value);
	    var m = date.getMonth() + 1;
	    return m;
	});

	//时间格式化 返回 09-30 03:07
	Vue.filter('datetimefmt', function (value) {
	    //value 传进来是个整数型，要判断是10位还是13位需要转成字符串。这边的方法是检测13位的时间戳 所以要*1000；并且转回整型。安卓下，时间早了8个小时
	    value = value + '';
	    if (value.length == 10) {
	        value = parseInt(value) * 1000;
	    } else {
	        value = parseInt(value);
	    }
	    // 返回处理后的值
	    var date = new Date(value);
	    var m = date.getMonth() + 1;
	    var d = date.getDate();
	    var H = date.getHours();
	    var i = date.getMinutes();
	    if (m < 10) {
	        m = '0' + m;
	    }
	    if (d < 10) {
	        d = '0' + d;
	    }
	    if (H < 10) {
	        H = '0' + H;
	    }
	    if (i < 10) {
	        i = '0' + i;
	    }
	    var t = m + '-' + d + '  ' + H + ':' + i;
	    return t;
	});
	//金额保留两位小数点
	Vue.filter('currencyfmt', function (value) {
	    // 返回处理后的值
	    if (value != null) {
	        if (value == 0) {
	            return value;
	        } else {
	            var price = (Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2);
	            return price;
	        }
	    }
	});

/***/ }),

/***/ 254:
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
	  "nav_title": {
	    "fontSize": 38,
	    "color": "#ffffff",
	    "lineHeight": 38
	  },
	  "title": {
	    "fontSize": 32,
	    "color": "#000000"
	  },
	  "sub_title": {
	    "fontSize": 28,
	    "color": "#bbbbbb"
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
	    "height": 136,
	    "flexDirection": "row",
	    "position": "sticky",
	    "borderBottomWidth": 1,
	    "borderBottomStyle": "solid",
	    "borderBottomColor": "#bbbbbb",
	    "backgroundColor": "#D9141E"
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
	    "width": 750,
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
	    "borderTopColor": "#bbbbbb",
	    "borderTopStyle": "solid",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#bbbbbb",
	    "borderBottomStyle": "solid"
	  },
	  "cell-panel": {
	    "height": 98,
	    "minHeight": 98,
	    "flexDirection": "row",
	    "alignItems": "center",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#bbbbbb",
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
	    "color": "#bbbbbb"
	  },
	  "ico": {
	    "fontSize": 48,
	    "color": "#D9141E"
	  },
	  "ico_big": {
	    "fontSize": 72,
	    "color": "#D9141E"
	  },
	  "ico_small": {
	    "fontSize": 32,
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
	    "color": "#ffffff",
	    "paddingTop": 20,
	    "paddingBottom": 20,
	    "backgroundColor": "#D9141E",
	    "borderRadius": 15,
	    "backgroundColor:active": "#bbbbbb",
	    "color:active": "#D9141E",
	    "backgroundColor:disabled": "#D9141E",
	    "color:disabled": "#999999"
	  },
	  "refresh": {
	    "flexDirection": "column",
	    "alignItems": "center",
	    "paddingTop": 10
	  },
	  "loading": {
	    "flexDirection": "column",
	    "alignItems": "center",
	    "paddingTop": 10
	  },
	  "gif": {
	    "width": 50,
	    "height": 50
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

/***/ 255:
/***/ (function(module, exports) {

	module.exports = {
	  "newHeight": {
	    "height": 130
	  },
	  "cell-row": {
	    "minHeight": 120,
	    "flexDirection": "column",
	    "backgroundColor": "#ffffff",
	    "paddingLeft": 20,
	    "marginTop": 20
	  },
	  "logo": {
	    "height": 100,
	    "width": 100,
	    "borderRadius": 50,
	    "overflow": "hidden"
	  },
	  "align-bottom": {
	    "alignItems": "flex-end",
	    "width": 615
	  },
	  "content": {
	    "marginLeft": 10,
	    "flexDirection": "column",
	    "alignItems": "flex-start"
	  },
	  "datetime": {
	    "color": "#cccccc",
	    "fontSize": 28
	  },
	  "money": {
	    "fontWeight": "700",
	    "marginRight": 20
	  }
	}

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _navbar = __webpack_require__(126);

	var _navbar2 = _interopRequireDefault(_navbar);

	var _filters = __webpack_require__(144);

	var _filters2 = _interopRequireDefault(_filters);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	var modal = weex.requireModule('modal');
	var navigator = weex.requireModule('navigator');

	var stream = weex.requireModule('stream');


	var pageNumber = 1;
	exports.default = {
	    data: function data() {
	        return {
	            depositList: [],
	            refreshing: false,
	            showLoading: 'hide'
	        };
	    },
	    components: {
	        navbar: _navbar2.default
	    },
	    props: {
	        title: { default: "账单" }
	    },
	    methods: {
	        //            是否添加底部边框
	        addBorder: function addBorder(index) {
	            var listLength = this.depositList.length;
	            //                判断是否最后一个元素并且是否每月的结尾
	            if (index != listLength - 1) {
	                if (this.getDate(this.depositList[index].create_date) == this.getDate(this.depositList[index + 1].create_date)) {
	                    return {
	                        borderBottomWidth: '1px'
	                    };
	                } else {
	                    return {
	                        borderBottomWidth: '0px'
	                    };
	                }
	            } else {
	                return {
	                    borderBottomWidth: '0px'
	                };
	            }
	        },
	        //判断月份是否重复
	        isRepeat: function isRepeat(index) {
	            if (index != 0) {
	                if (this.getDate(this.depositList[index].create_date) == this.getDate(this.depositList[index - 1].create_date)) {
	                    return false;
	                }
	            }
	            return true;
	        },

	        goback: function goback(e) {
	            navigator.pop({
	                url: 'http://cdn.rzico.com/weex/app/member/setup.js',
	                animated: "true"
	            });
	        },
	        setup: function setup(e) {
	            toPage(e);
	        },
	        open: function open(pageNumber, callback) {
	            return stream.fetch({
	                method: 'GET',
	                type: 'json',
	                url: 'http://www.rzico.com/applet/member/wallet/bill.jhtml?begin_date=2017-01-01%2000:00:00&end_date=2018-01-01%2000:00:00&pageNumber=' + pageNumber + '&pageSize=10'
	            }, callback);
	        },

	        //            上拉加载
	        onloading: function onloading(event) {
	            var _this = this;

	            pageNumber++;
	            modal.toast({ message: '加载中...', duration: 0.5 });
	            this.showLoading = 'show';
	            this.open(pageNumber, function (res) {
	                if (res.data.message.type == 'success') {
	                    _this.depositList = _this.depositList.concat(res.data.data);
	                } else {
	                    modal.toast({ message: '系统繁忙', duration: 1 });
	                }
	                _this.showLoading = 'hide';
	            });
	        },

	        //            下拉刷新
	        onrefresh: function onrefresh(event) {
	            var _this2 = this;

	            pageNumber = 1;
	            modal.toast({ message: '加载中...', duration: 1 });
	            this.refreshing = true;
	            this.open(pageNumber, function (res) {
	                if (res.data.message.type == 'success') {
	                    _this2.depositList = res.data.data;
	                } else {
	                    modal.toast({ message: '系统繁忙', duration: 1 });
	                }
	                _this2.refreshing = false;
	            });
	        },

	        //            获取月份
	        getDate: function getDate(value) {
	            var date = new Date(value);
	            var m = date.getMonth() + 1;
	            return m;
	        }
	    },
	    created: function created() {
	        var _this3 = this;

	        //              页面创建时请求数据
	        this.open(pageNumber, function (res) {
	            if (res.data.message.type == 'success') {
	                _this3.depositList = res.data.data;
	                modal.toast({ message: res.data.data, duration: 3 });
	            } else {
	                modal.alert({
	                    message: '系统繁忙',
	                    duration: 0.3
	                });
	            }
	        });
	    }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 257:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["wrapper"]
	  }, [_c('list', {
	    staticClass: ["list"]
	  }, [_c('refresh', {
	    staticClass: ["refresh"],
	    attrs: {
	      "display": _vm.refreshing ? 'show' : 'hide'
	    },
	    on: {
	      "refresh": _vm.onrefresh
	    }
	  }, [_c('text', {
	    staticClass: ["indicator"]
	  }, [_vm._v("下拉刷新 ...")])]), _vm._l((_vm.depositList), function(deposit, index) {
	    return _c('cell', {
	      appendAsTree: true,
	      attrs: {
	        "append": "tree"
	      }
	    }, [(_vm.isRepeat(index)) ? _c('div', {
	      staticClass: ["cell-header", "cell-line", "space-between"]
	    }, [_c('div', {
	      staticClass: ["flex-row", "flex-start"]
	    }, [_c('text', {
	      staticClass: ["title"]
	    }, [_vm._v(_vm._s(_vm._f("monthfmt")(deposit.create_date)))])]), _c('div', {
	      staticClass: ["flex-row", "flex-end"]
	    }, [_c('text', {
	      staticClass: ["sub_title"]
	    }, [_vm._v("查看账单")]), _c('text', {
	      staticClass: ["arrow"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])])]) : _vm._e(), _c('div', {
	      staticClass: ["cell-row", "cell-clear"]
	    }, [_c('div', {
	      staticClass: ["cell-panel", "newHeight"],
	      style: _vm.addBorder(index)
	    }, [_vm._m(0, true), _c('div', {
	      staticClass: ["content", "flex5"]
	    }, [_c('text', {
	      staticClass: ["title", "lines-ellipsis"]
	    }, [_vm._v(_vm._s(deposit.memo))]), _c('div', {
	      staticClass: ["flex-row", "space-between", "align-bottom"]
	    }, [_c('text', {
	      staticClass: ["datetime"]
	    }, [_vm._v(_vm._s(_vm._f("datetimefmt")(deposit.create_date)))]), _c('text', {
	      staticClass: ["money"]
	    }, [_vm._v(_vm._s(_vm._f("currencyfmt")(deposit.amount)))])])])])])])
	  }), _c('loading', {
	    staticClass: ["loading"],
	    attrs: {
	      "display": _vm.showLoading
	    },
	    on: {
	      "loading": _vm.onloading
	    }
	  }, [_c('text', {
	    staticClass: ["indicator"]
	  }, [_vm._v("Loading ...")])])], 2)])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["flex1"]
	  }, [_c('image', {
	    staticClass: ["logo"],
	    attrs: {
	      "resize": "cover",
	      "src": "https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"
	    }
	  })])
	}]}
	module.exports.render._withStripped = true

/***/ })

/******/ });