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
	__vue_styles__.push(__webpack_require__(214)
	)
	__vue_styles__.push(__webpack_require__(215)
	)

	/* script */
	__vue_exports__ = __webpack_require__(216)

	/* template */
	var __vue_template__ = __webpack_require__(217)
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
	__vue_options__.__file = "/Users/ke/mopian/GitHubMoPian/mp/src/view/member/editor/vote.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-53235d74"
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

/***/ 78:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by zwwill on 2017/8/27.
	 */
	var resLocateURL = 'file://';
	var resRemoteURL = 'http://cdn.rzico.com/weex/';
	var dataURL = 'http://weex.rzico.com:8088/';

	var utilsFunc = {
	    initIconFont: function initIconFont() {
	        var domModule = weex.requireModule('dom');
	        domModule.addRule('fontFace', {
	            'fontFamily': "iconfont",
	            'src': "url('" + resLocateURL + "resources/fonts/iconfont.ttf')"
	        });
	    },

	    //获取本地资源
	    locate: function locate(url) {
	        var newUrl = resLocateURL + url;
	        return newUrl;
	    },

	    //获取远程资源
	    remote: function remote(url) {
	        var newUrl = resRemoteURL + url;
	        return newUrl;
	    },

	    //获取URL参数
	    getUrlParameter: function getUrlParameter(name) {
	        var url = weex.config.bundleUrl;
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	        var r = url.slice(url.indexOf('?') + 1).match(reg);
	        if (r != null) {
	            try {
	                return decodeURIComponent(r[2]);
	            } catch (_e) {
	                return null;
	            }
	        }
	        return null;
	    },
	    dayfmt: function dayfmt(value) {
	        var date = new Date(value);
	        var tody = new Date();
	        var m = tody.getDay() - date.getDay();
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
	    },
	    message: function message(_type, _content, _data) {
	        return {
	            type: _type,
	            content: _content,
	            data: _data
	        };
	    },

	    //判空
	    isNull: function isNull(value) {
	        if (value == null || value == undefined || value == '') {
	            return true;
	        } else {
	            return false;
	        }
	    },

	    //本地缓存查找多条数据。
	    findList: function findList(value, start, size, callback) {
	        var partevent = weex.requireModule('event'); //在ios无法识别出该语句，考虑弃用该方法
	        partevent.findList({
	            type: 'article',
	            keyword: value,
	            orderBy: 'desc',
	            current: start,
	            pageSize: size
	        }, callback);
	    },
	    save: function save(datatype, datakey, datavalue, datasort, datakeyword, callback) {
	        var partevent = weex.requireModule('event');
	        partevent.save({
	            type: datatype,
	            key: datakey,
	            value: datavalue,
	            sort: datasort,
	            keyword: datakeyword
	        }, callback);
	    },

	    //时间戳
	    timeChange: function timeChange(value) {
	        if (value.toString().length == 10) {
	            value = value * 1000;
	        }
	        var date = new Date(value);
	        var Y = date.getFullYear();
	        var m = date.getMonth() + 1;
	        var d = date.getDate();
	        var H = date.getHours();
	        var i = date.getMinutes();
	        var s = date.getSeconds();
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
	        if (s < 10) {
	            s = '0' + s;
	        }
	        var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
	        // var t = Y + '-' + m + '-' + d;
	        return t;
	    },
	    thumbnail: function thumbnail(url, w, h) {
	        if (url.substring(0, 10) == "http://cdn") {
	            return url + "@" + w + "w_" + h + "h_1e_1c_100Q";
	        } else {
	            return url;
	        }
	    },

	    //获取文章URL地址
	    articleUrl: function articleUrl(template, id) {
	        return dataURL + "article/#/" + template + "?id=" + id;
	    }
	};

	exports.default = utilsFunc;
	module.exports = exports['default'];

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

/***/ 214:
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

/***/ 215:
/***/ (function(module, exports) {

	module.exports = {
	  "voteBigBox": {
	    "paddingBottom": 20
	  },
	  "flexRow": {
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "addVote": {
	    "paddingBottom": 15,
	    "paddingTop": 15,
	    "paddingLeft": 45,
	    "paddingRight": 45,
	    "borderRadius": 10,
	    "backgroundColor": "#ffffff"
	  },
	  "circle": {
	    "width": 50,
	    "height": 50,
	    "borderRadius": 25,
	    "backgroundColor": "#ffffff",
	    "borderWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#999999"
	  },
	  "addSize": {
	    "color": "#D9141E",
	    "fontSize": 35
	  },
	  "bottomSize": {
	    "fontSize": 35
	  },
	  "addOptions": {
	    "justifyContent": "center"
	  },
	  "pl10": {
	    "marginLeft": 20
	  },
	  "closeIcon": {
	    "fontSize": 40,
	    "color": "#999999",
	    "fontWeight": "700",
	    "paddingBottom": 10,
	    "paddingTop": 10,
	    "paddingRight": 10,
	    "paddingLeft": 10
	  },
	  "textareaClass": {
	    "width": 485,
	    "fontSize": 35,
	    "lineHeight": 48
	  },
	  "textareaBox": {
	    "height": 120,
	    "justifyContent": "center"
	  },
	  "optionsBox": {
	    "justifyContent": "space-between",
	    "paddingRight": 30
	  },
	  "voteTell": {
	    "flexDirection": "row",
	    "height": 110,
	    "alignItems": "center"
	  },
	  "addBottomBorder": {
	    "borderBottomWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#DCDCDC"
	  },
	  "tellSize": {
	    "fontSize": 37
	  },
	  "voteBox": {
	    "width": 710,
	    "marginLeft": 20,
	    "paddingLeft": 25,
	    "borderRadius": 20,
	    "backgroundColor": "#ffffff"
	  }
	}

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _navbar = __webpack_require__(126);

	var _navbar2 = _interopRequireDefault(_navbar);

	var _utils = __webpack_require__(78);

	var _utils2 = _interopRequireDefault(_utils);

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
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var storage = weex.requireModule('storage');
	var event = weex.requireModule('event');
	var modal = weex.requireModule('modal');
	var picker = weex.requireModule('picker');
	var isSign = -1;
	var optionIndex = -1;
	exports.default = {
	    data: function data() {
	        return {
	            refreshing: false,
	            voteList: [],
	            chooseOptions: '单选(默认)',
	            optionArray: ['单选(默认)', '多选，最多2项', '多选,无限制'],
	            titleHeight: 48,
	            titleRows: 1
	        };
	    },
	    components: {
	        navbar: _navbar2.default
	    },
	    props: {
	        title: { default: "投票设置" },
	        complete: { default: "完成" }
	    },
	    created: function created() {
	        var _this = this;
	        _utils2.default.initIconFont();
	        var vote = _utils2.default.getUrlParameter('name');
	        if (_utils2.default.isNull(vote)) {
	            //               添加新的投票
	            this.voteList.push({
	                chooseDate: '无截止时间',
	                chooseTime: '',
	                optionsIndex: 0,
	                textAreaTitle: '',
	                pageBox: [{
	                    textAreaMessage: '',
	                    textHeight: '48',
	                    rowsNum: '1',
	                    editSign: -1
	                }, {
	                    textAreaMessage: '',
	                    textHeight: 48,
	                    rowsNum: 1,
	                    editSign: -1
	                }, {
	                    textAreaMessage: '',
	                    textHeight: 48,
	                    rowsNum: 1,
	                    editSign: -1
	                }]
	            });
	            return;
	        } else {
	            //                编辑投票。
	            storage.getItem(vote, function (e) {
	                var voteData = JSON.parse(e.data);
	                _this.chooseOptions = _this.optionArray[voteData.optionsIndex];
	                event.toast(voteData);
	                //                    添加上服务器过滤掉的属性
	                //                    if(utils.isNull(voteData.pageBox[0].textHeight)){
	                //                        event.toast('执行下');
	                //                        for(let i = 0; i < voteData.pageBox.length ; i++){
	                //                            voteData.pageBox[i].push({
	                //                                textHeight:'48',
	                //                                rowsNum:'1',
	                //                                editSign:-1,
	                //                            })
	                //                        }
	                //                    }else{
	                //                        event.toast('执行上');
	                //                    }
	                _this.voteList.push(voteData);
	                storage.removeItem(vote);
	            });
	        }
	    },

	    methods: {
	        //            将选择好的时间 重置
	        noEndTime: function noEndTime() {
	            this.voteList[0].chooseDate = '无截止时间';
	            this.voteList[0].chooseTime = '';
	        },
	        //            选择投票类型
	        pickOptions: function pickOptions() {
	            var _this2 = this;

	            picker.pick({
	                //                    默认选中
	                index: this.voteList[0].optionsIndex,
	                //                    数据选项
	                items: this.optionArray
	            }, function (e) {
	                if (e.result === 'success') {
	                    //                        更改默认选中的下标
	                    _this2.voteList[0].optionsIndex = e.data;
	                    //                        将选择的数据写入chooseOptions
	                    _this2.chooseOptions = _this2.optionArray[e.data];
	                }
	            });
	        },

	        //            选择日期
	        pickDate: function pickDate() {
	            var _this3 = this;

	            picker.pickDate({
	                value: this.voteList[0].chooseDate
	            }, function (e) {
	                if (e.result === 'success') {
	                    _this3.voteList[0].chooseDate = e.data;
	                    //日期选择完后 马上选择时间。
	                    _this3.pickTime();
	                    if (_this3.voteList[0].chooseTime == '') {
	                        _this3.voteList[0].chooseTime = '请设置时间';
	                    }
	                }
	            });
	        },

	        //            选择时间
	        pickTime: function pickTime() {
	            var _this4 = this;

	            picker.pickTime({
	                value: this.voteList[0].chooseTime
	            }, function (e) {
	                if (e.result === 'success') {
	                    _this4.voteList[0].chooseTime = e.data;
	                }
	            });
	        },

	        //            设置每个选项的提示内容
	        setPlaceholder: function setPlaceholder(index) {
	            return '选项' + parseInt(index + 1);
	        },
	        //            删除制定选项
	        deleteOptions: function deleteOptions(index) {
	            console.log(index);
	            //                modal.toast({message:index,duration:0.3});
	            this.voteList[0].pageBox.splice(index, 1);
	        },
	        //            添加选项
	        addOptions: function addOptions() {
	            this.voteList[0].pageBox.push({
	                textAreaMessage: '',
	                textHeight: 48,
	                rowsNum: 1,
	                editSign: -1
	            });
	        },
	        //            选项输入（当一进页面选项里有数据时，会触发该函数）
	        optionsOninput: function optionsOninput(e, index) {
	            event.toast(index);
	            var _this = this;
	            var len = this.getLen(e.value);
	            //                当字符数超过25时，将多行输入改成2行并且高度设为96
	            //                modal.toast({message:len,duration:0.3})
	            if (len > 25) {
	                //                    if(optionIndex == -1){
	                ////            选项输入（当一进页面选项里有数据时，会触发该函数）此时不会更新optionIndex，所以需要手动刷新。
	                //                        this.voteList[0].pageBox.forEach(function(item){
	                //                             if(_this.getLen(item.textAreaMessage) > 25){
	                //                                 item.rowsNum = 2;
	                //                                 item.textHeight = 96;
	                //                                 item.editSign = 0;
	                //                             }
	                //                        })
	                //                        return
	                //                    }
	                //                    editSign是每个组件的控制符，控制是否切换高度.不用每次输入都执行一次
	                if (this.voteList[0].pageBox[index].editSign == -1) {
	                    this.voteList[0].pageBox[index].rowsNum = 2;
	                    this.voteList[0].pageBox[index].textHeight = 96;
	                    this.voteList[0].pageBox[index].editSign = 0;
	                }
	            } else {
	                //否则将高度与行数改回来
	                if (this.voteList[0].pageBox[index].editSign == 0) {
	                    this.voteList[0].pageBox[index].rowsNum = 1;
	                    this.voteList[0].pageBox[index].textHeight = 48;
	                    this.voteList[0].pageBox[index].editSign = -1;
	                }
	            }
	        },
	        //            标题描述输入。
	        titleOninput: function titleOninput(e) {
	            var len = this.getLen(e);
	            //当字符数超过25时，将多行输入改成2行并且高度设为96
	            if (len > 25) {
	                //                    控制是否切换高度.不用每次输入都执行一次
	                if (isSign == -1) {
	                    this.titleRows = 2;
	                    this.titleHeight = 96;
	                    isSign = 0;
	                }
	            } else {
	                //否则将高度与行数改回来
	                if (isSign == 0) {
	                    this.titleRows = 1;
	                    this.titleHeight = 48;
	                    isSign = -1;
	                }
	            }
	        },
	        //            获取已输入的字符总长度
	        getLen: function getLen(e) {
	            var name = e;
	            var len = 0;
	            for (var i = 0; i < name.length; i++) {
	                var a = name.charAt(i);
	                if (a.match(/[^\x00-\xff]/ig) != null) {
	                    len += 2;
	                } else {
	                    len += 1;
	                }
	            }
	            return len;
	        },


	        //            下拉刷新
	        onrefresh: function onrefresh(e) {
	            var _this5 = this;

	            console.log('is refreshing');
	            this.refreshing = true;
	            setTimeout(function () {
	                _this5.refreshing = false;
	            }, 2000);
	        },

	        //            正在下拉
	        onpullingdown: function onpullingdown(e) {
	            console.log('is onpulling down');
	        },

	        //            返回
	        goback: function goback() {
	            event.closeURL();
	        },
	        //            完成
	        goComplete: function goComplete() {
	            var _this = this;
	            var voteData = _this.voteList[0];
	            var backData = _utils2.default.message('success', '成功', voteData);
	            event.closeURL(backData);
	        }
	    }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 217:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('scroller', {
	    staticClass: ["wrapper"]
	  }, [_c('navbar', {
	    attrs: {
	      "title": _vm.title,
	      "complete": _vm.complete
	    },
	    on: {
	      "goback": _vm.goback,
	      "goComplete": _vm.goComplete
	    }
	  }), _vm._l((_vm.voteList), function(vote) {
	    return _c('div', {
	      staticClass: ["voteBigBox"]
	    }, [_c('div', {
	      staticClass: ["voteBox", "mt20", "border-radius"]
	    }, [_c('div', {
	      staticClass: ["voteTell", "addBottomBorder"]
	    }, [_c('text', {
	      staticClass: ["gray", "tellSize"]
	    }, [_vm._v("投票描述")]), _c('div', {
	      staticClass: ["textareaBox"]
	    }, [_c('textarea', {
	      staticClass: ["textareaClass", "ml10"],
	      style: {
	        height: _vm.titleHeight + 'px'
	      },
	      attrs: {
	        "dataId": "0",
	        "rows": _vm.titleRows,
	        "autofocus": "true",
	        "value": (vote.textAreaTitle)
	      },
	      on: {
	        "input": [function($event) {
	          vote.textAreaTitle = $event.target.attr.value
	        }, _vm.titleOninput]
	      }
	    })], 1)]), _vm._l((vote.pageBox), function(item, index) {
	      return _c('div', {
	        staticClass: ["voteTell", "addBottomBorder", "optionsBox"]
	      }, [_c('text', {
	        staticClass: ["circle", "pl10"]
	      }), _c('div', {
	        staticClass: ["textareaBox"]
	      }, [_c('textarea', {
	        staticClass: ["textareaClass"],
	        style: {
	          height: item.textHeight + 'px'
	        },
	        attrs: {
	          "placeholder": _vm.setPlaceholder(index),
	          "rows": item.rowsNum,
	          "value": (item.textAreaMessage)
	        },
	        on: {
	          "input": [function($event) {
	            item.textAreaMessage = $event.target.attr.value
	          }, function($event) {
	            _vm.optionsOninput($event, index)
	          }]
	        }
	      })], 1), (index >= 2) ? _c('text', {
	        staticClass: ["closeIcon"],
	        style: {
	          fontFamily: 'iconfont'
	        },
	        on: {
	          "click": function($event) {
	            _vm.deleteOptions(index)
	          }
	        }
	      }, [_vm._v("")]) : _c('text', {
	        staticClass: ["closeIcon"],
	        staticStyle: {
	          width: "60px"
	        }
	      })])
	    }), _c('div', {
	      staticClass: ["voteTell", "addOptions"],
	      on: {
	        "click": function($event) {
	          _vm.addOptions()
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["addSize"]
	    }, [_vm._v("+")]), _c('text', {
	      staticClass: ["addSize", "ml10"]
	    }, [_vm._v("添加选项")])])], 2), _c('div', {
	      staticClass: ["voteBox", "mt20", "border-radius"]
	    }, [_c('div', {
	      staticClass: ["voteTell", "addBottomBorder", "optionsBox"]
	    }, [_c('div', {
	      staticClass: ["flexRow"]
	    }, [_c('text', {
	      staticClass: ["gray", "bottomSize"]
	    }, [_vm._v("截止时间")]), _c('div', {
	      staticClass: ["textareaBox", "ml10", "flexRow"]
	    }, [_c('text', {
	      staticClass: ["bottomSize"],
	      on: {
	        "click": function($event) {
	          _vm.pickDate()
	        }
	      }
	    }, [_vm._v(_vm._s(vote.chooseDate))]), _c('text', {
	      staticClass: ["bottomSize", "ml10"],
	      on: {
	        "click": function($event) {
	          _vm.pickTime()
	        }
	      }
	    }, [_vm._v(_vm._s(vote.chooseTime))])])]), (vote.chooseTime != '') ? _c('text', {
	      staticClass: ["closeIcon"],
	      style: {
	        fontFamily: 'iconfont'
	      },
	      on: {
	        "click": function($event) {
	          _vm.noEndTime()
	        }
	      }
	    }, [_vm._v("")]) : _vm._e()]), _c('div', {
	      staticClass: ["voteTell"]
	    }, [_c('text', {
	      staticClass: ["gray", "bottomSize"]
	    }, [_vm._v("投票类型")]), _c('div', {
	      staticClass: ["textareaBox", "ml10"],
	      on: {
	        "click": function($event) {
	          _vm.pickOptions()
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["bottomSize"]
	    }, [_vm._v(_vm._s(_vm.chooseOptions))])])])])])
	  })], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ })

/******/ });