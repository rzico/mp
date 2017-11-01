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
	__vue_styles__.push(__webpack_require__(191)
	)

	/* script */
	__vue_exports__ = __webpack_require__(192)

	/* template */
	var __vue_template__ = __webpack_require__(195)
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
	__vue_options__.__file = "/Users/ke/mopian/GitHubMoPian/mp/src/view/member/editor/editor.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-dd588412"
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

/***/ 12:
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


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

/***/ 191:
/***/ (function(module, exports) {

	module.exports = {
	  "processTotal": {
	    "position": "absolute",
	    "bottom": 40,
	    "right": 50,
	    "fontSize": 28,
	    "color": "#888888"
	  },
	  "processBg": {
	    "backgroundColor": "#cccccc",
	    "width": 500
	  },
	  "processStyle": {
	    "height": 10,
	    "position": "absolute",
	    "left": 50,
	    "bottom": 100
	  },
	  "processText": {
	    "position": "absolute",
	    "top": 40,
	    "left": 50,
	    "fontSize": 32
	  },
	  "processBox": {
	    "height": 250,
	    "borderRadius": 5,
	    "width": 600,
	    "backgroundColor": "#ffffff",
	    "justifyContent": "space-between"
	  },
	  "sendMask": {
	    "position": "absolute",
	    "top": 0,
	    "bottom": 0,
	    "left": 0,
	    "right": 0,
	    "backgroundColor": "rgba(0,0,0,0.8)",
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "voteMargin": {
	    "marginBottom": 15
	  },
	  "@TRANSITION": {
	    "paraTransition-enter-active": {
	      "duration": 200
	    },
	    "paraTransition-leave-active": {
	      "duration": 200
	    }
	  },
	  "paraTransition-leave-to": {
	    "transform": "translateX(300px)",
	    "opacity": 0
	  },
	  "paraTransition-enter": {
	    "transform": "translateX(0px)",
	    "opacity": 1
	  },
	  "addVoteIcon": {
	    "fontSize": 39
	  },
	  "addVote": {
	    "color": "#A89F95",
	    "fontSize": 34,
	    "marginLeft": 10
	  },
	  "flexRow": {
	    "paddingTop": 20,
	    "paddingBottom": 20,
	    "justifyContent": "center"
	  },
	  "greyColor": {
	    "color": "#999999"
	  },
	  "emptyBox": {
	    "height": 40
	  },
	  "arrowSize": {
	    "color": "#999999",
	    "fontSize": 34,
	    "fontWeight": "700"
	  },
	  "upArrow": {
	    "top": 0,
	    "paddingTop": 5,
	    "paddingLeft": 10,
	    "paddingBottom": 10
	  },
	  "downArrow": {
	    "bottom": 0,
	    "paddingTop": 10,
	    "paddingBottom": 5,
	    "paddingLeft": 10
	  },
	  "rightArrow": {
	    "position": "absolute",
	    "right": 0,
	    "paddingRight": 10
	  },
	  "paraClose": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "paddingLeft": 5,
	    "paddingTop": 5,
	    "paddingRight": 5,
	    "paddingBottom": 5
	  },
	  "paraCloseSize": {
	    "color": "#999999",
	    "fontSize": 34
	  },
	  "paraTextSize": {
	    "fontSize": 32,
	    "lineHeight": 38,
	    "color": "#444444",
	    "lines": 4,
	    "textOverflow": "ellipsis"
	  },
	  "paraText": {
	    "marginLeft": 20,
	    "width": 445
	  },
	  "paraImage": {
	    "width": 155,
	    "height": 155,
	    "borderRadius": 10
	  },
	  "paraBoxHeight": {
	    "height": 225
	  },
	  "paraBox": {
	    "flexDirection": "row",
	    "paddingLeft": 35,
	    "paddingRight": 35,
	    "paddingTop": 35,
	    "paddingBottom": 35,
	    "width": 700,
	    "marginLeft": 25,
	    "backgroundColor": "#ffffff",
	    "borderBottomRightRadius": 20,
	    "borderTopRightRadius": 20,
	    "borderBottomLeftRadius": 20,
	    "borderTopLeftRadius": 20
	  },
	  "wrapperBox": {
	    "backgroundColor": "#EFF0F5"
	  },
	  "addText": {
	    "color": "#FFE394"
	  },
	  "addImage": {
	    "color": "#1E7DEB"
	  },
	  "addVideo": {
	    "color": "#CCA7FC"
	  },
	  "iconSize": {
	    "fontSize": 38
	  },
	  "addIconBox": {
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "paddingRight": 40,
	    "paddingLeft": 40
	  },
	  "iconBox": {
	    "flexDirection": "row",
	    "backgroundColor": "#ffffff",
	    "borderBottomRightRadius": 20,
	    "borderTopRightRadius": 20,
	    "borderBottomLeftRadius": 20,
	    "borderTopLeftRadius": 20
	  },
	  "plusSign": {
	    "paddingLeft": 12,
	    "paddingRight": 12,
	    "paddingTop": 1,
	    "paddingBottom": 1,
	    "backgroundColor": "#D7DBD5",
	    "color": "#ffffff",
	    "borderStyle": "solid",
	    "borderWidth": 1,
	    "borderColor": "rgba(133,133,133,0.2)",
	    "borderRadius": 30,
	    "fontSize": 30,
	    "fontWeight": "700"
	  },
	  "addBox": {
	    "alignItems": "center",
	    "justifyContent": "center",
	    "marginTop": 15,
	    "marginBottom": 15
	  },
	  "setTitle": {
	    "position": "absolute",
	    "top": 40,
	    "color": "#ffffff",
	    "fontSize": 40,
	    "left": 25,
	    "right": 25
	  },
	  "musicSize": {
	    "color": "#666666",
	    "fontSize": 27
	  },
	  "bottomBtn": {
	    "position": "absolute",
	    "bottom": 20,
	    "borderRadius": 10,
	    "color": "#666666",
	    "paddingBottom": 5,
	    "justifyContent": "center",
	    "paddingRight": 12,
	    "paddingLeft": 12,
	    "paddingTop": 5,
	    "backgroundColor": "#ffffff"
	  },
	  "addMusic": {
	    "left": 25,
	    "maxWidth": 500
	  },
	  "editCover": {
	    "right": 25
	  },
	  "coverMaskImage": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "width": 750,
	    "height": 300,
	    "backgroundColor": "#888888",
	    "opacity": 0.5
	  },
	  "coverImage": {
	    "width": 750,
	    "height": 300
	  }
	}

/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(193);

	var _stringify2 = _interopRequireDefault(_stringify);

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
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
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
	var album = weex.requireModule('album');
	var modal = weex.requireModule('modal');
	var stream = weex.requireModule('stream');
	var lastIndex = -1;
	var musicId = -1;
	exports.default = {
	    data: function data() {
	        return {
	            toSendArticle: false, //控制进度条 遮罩显示
	            currentPro: 0, //当前进度
	            proTotal: 2, //总的进度
	            processWidth: 0, //进度条宽度
	            articleId: '',
	            refreshing: false,
	            firstPlusShow: true,
	            coverImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	            setTitle: '点击设置标题',
	            addMusic: '添加音乐',
	            musicName: '',
	            paraList: [],
	            voteList: [],
	            proportion: '', //缩略图的比例
	            serveCover: '' //用来保存图片上传服务器后存储服务器图片路径，避免覆盖图片时产生闪屏
	        };
	    },
	    filters: {
	        //            过滤html标签
	        htmlDeal: function htmlDeal(value) {
	            //                将h1-h5换成\n
	            var takeEnter = value.replace(/<\/h[0-9]>/g, "\n");
	            //                将html标签替换，可能遗留空格
	            var nbspText = takeEnter.replace(/<\/?.+?>/g, "");
	            //                将空格 &nbsp; 替换成 。
	            var spaceText = nbspText.replace(/&nbsp;/g, " ");
	            return spaceText;

	            //                将空格去除
	            //                var onlyText=spaceText.replace(/ /g,"");
	        }
	    },
	    computed: {
	        voteImg: function voteImg() {
	            return _utils2.default.locate('resources/images/vote.png');
	        }
	    },
	    components: {
	        navbar: _navbar2.default
	    },
	    props: {
	        title: { default: "编辑" },
	        complete: { default: "完成" }
	    },
	    created: function created() {
	        _utils2.default.initIconFont();
	        var _this = this;
	        //            bundleUrl = new String(bundleUrl);
	        //            取当前页面rul，将musicId取出来
	        var bundleUrl = this.$getConfig().bundleUrl;
	        var getVal = bundleUrl.split('?')[1];
	        //          创建文章编辑（首次）
	        if (getVal == '' || getVal == null || getVal == 'undefined') {
	            //       多选图片
	            //      调用安卓的相册
	            var _this = this;
	            album.openAlbumMuti(
	            //选完图片后触发回调函数
	            function (data) {
	                //                        event.toast(data);
	                if (data.type == 'success') {
	                    _this.coverImage = 'file:/' + data.data[0].originalPath;
	                    //                    data.data里存放的是用户选取的图片路径
	                    for (var i = 0; i < data.data.length; i++) {
	                        _this.paraList.push({
	                            //原图
	                            paraImage: 'file:/' + data.data[i].originalPath,
	                            //小缩略图
	                            thumbnailImage: 'file:/' + data.data[i].thumbnailSmallPath,
	                            paraText: '',
	                            show: true,
	                            serveThumbnail: ''
	                        });
	                        //                                event.toast(data.data[i].originalPath);
	                        //                                event.toast('缩略图路径');
	                        //                                event.toast(data.data[i].thumbnailSmallPath);
	                    }
	                } else {
	                    event.closeURL();
	                }
	            });
	        } else {
	            //再次文章编辑
	            var op = getVal.split('=');
	            if (op[0] == 'articleId') {
	                var options = {
	                    type: 'article',
	                    key: op[1]
	                };
	                _this.articleId = op[1];
	                event.find(options, function (data) {
	                    if (data.type == 'success') {
	                        var articleData = JSON.parse(data.data.value);
	                        event.toast(articleData);
	                        _this.setTitle = articleData.title;
	                        _this.coverImage = articleData.thumbnail;
	                        _this.musicName = articleData.music.name;
	                        musicId = articleData.music.id;
	                        var templatesData = articleData.templates;
	                        for (var i = 0; i < templatesData.length; i++) {
	                            _this.paraList.push({
	                                //原图
	                                paraImage: templatesData[i].original,
	                                //小缩略图
	                                thumbnailImage: templatesData[i].thumbnail,
	                                paraText: templatesData[i].content,
	                                show: true,
	                                serveThumbnail: '' //用来保存图片上传服务器后存储服务器图片路径，避免覆盖图片时产生闪屏
	                            });
	                        }
	                        //                            投票
	                        if (!_utils2.default.isNull(articleData.votes)) {
	                            articleData.votes.forEach(function (item) {
	                                var startDate = '';
	                                var startTime = '';
	                                //                                    event.toast('投票时间');
	                                //                                    event.toast(item.expire);
	                                if (_utils2.default.isNull(item.expire)) {
	                                    startDate = '无截止时间';
	                                } else {
	                                    var time = _utils2.default.timeChange(item.expire);
	                                    startDate = time.substring(0, 10);
	                                    startTime = time.substring(11, 19);
	                                }
	                                var optionIndex = 0;
	                                switch (item.voteType) {
	                                    case 'radiobox':
	                                        optionIndex = 0;
	                                        break;
	                                    case 'checkbox':
	                                        optionIndex = 1;
	                                        break;
	                                    case 'nolimit':
	                                        optionIndex = 2;
	                                        break;
	                                    default:
	                                        break;
	                                }
	                                //选项
	                                var optionBox = [];
	                                item.options.forEach(function (value) {
	                                    optionBox.push({
	                                        textAreaMessage: value,
	                                        textHeight: '48',
	                                        rowsNum: '1',
	                                        editSign: -1
	                                    });
	                                });

	                                _this.voteList.push({
	                                    chooseDate: startDate,
	                                    chooseTime: startTime,
	                                    optionsIndex: optionIndex,
	                                    textAreaTitle: item.title,
	                                    pageBox: optionBox
	                                });
	                            });
	                        }
	                    } else {
	                        modal.alert({
	                            message: '系统繁忙，请稍后重试',
	                            duration: 0.3
	                        }, function () {
	                            event.closeURL();
	                        });
	                    }
	                });
	            }
	        }
	    },
	    methods: {
	        //            控制进度条
	        ctrlProcess: function ctrlProcess(data) {
	            this.processWidth = data.data * 5;
	            if (this.processWidth == 500) {
	                this.currentPro++;
	            }
	        },


	        //            设置文章标题
	        articleTitle: function articleTitle(title) {
	            var _this = this;
	            if (title == '点击设置标题') {
	                title = '';
	            }
	            modal.prompt({
	                message: '请输入标题',
	                duration: 0.3,
	                okTitle: '确定',
	                cancelTitle: '取消',
	                default: title
	            }, function (value) {
	                if (value.result == '确定') {
	                    if (value.data == '' || value.data == null) {
	                        modal.toast({ message: '请输入标题', duration: 1 });
	                    } else {
	                        _this.setTitle = value.data;
	                        modal.toast({ message: '设置成功', duration: 1 });
	                    }
	                }
	            });
	        },
	        //            段落里的文本编辑
	        editorText: function editorText(index) {
	            var _this = this;
	            event.openEditor(_this.paraList[index].paraText, function (data) {
	                if (data.data != '') {
	                    //                    将返回回来的html数据赋值进去
	                    _this.paraList[index].paraText = data.data;
	                }
	            });
	        },

	        //            返回
	        goBack: function goBack() {
	            event.closeURL();
	        },
	        //            完成
	        goComplete: function goComplete() {

	            var _this = this;

	            if (this.setTitle == '点击设置标题') {
	                modal.alert({
	                    message: '请设置标题',
	                    duration: 0.3
	                }, function () {
	                    _this.articleTitle(_this.setTitle);
	                });
	                return;
	            }

	            this.toSendArticle = true;
	            this.proTotal = _this.paraList.length + 1;
	            //                获取设备宽度
	            var devWidth = weex.config.env.deviceWidth;
	            //                获取缩略图的宽高
	            _this.proportion = parseInt(155 * devWidth / 750);
	            var frontcoverUrl = this.coverImage.substring(0, 5);
	            //                event.toast(frontcoverUrl);
	            if (frontcoverUrl == 'http:') {
	                //                    event.toast('1');
	                _this.sendImage(0);
	            } else {
	                var sendcover = frontcoverUrl == 'file:' ? this.coverImage.substring(7) : this.coverImage;
	                //                将封面上传服务器
	                event.upload(sendcover, function (data) {
	                    if (data.type == 'success' && data.data != '') {
	                        //这边会由于避免重复渲染而需要再次向服务器上传该图片
	                        //                            _this.coverImage = data.data;
	                        _this.serveCover = data.data;
	                        //                        上传段落图片
	                        _this.sendImage(0);
	                    } else {
	                        _this.toSendArticle = false;
	                        event.toast(data.content);
	                    }
	                }, function (data) {
	                    _this.ctrlProcess(data);
	                    //                    _this.setTitle = data.data;
	                    //                    event.toast(data);
	                });
	            }
	        },
	        //上传图片到服务器
	        sendImage: function sendImage(sendIndex) {
	            var _this = this;
	            var sendLength = _this.paraList.length; //获取图片数组总长度
	            var frontUrl = _this.paraList[sendIndex].paraImage.substring(0, 5);
	            //                判断是否已经是服务器图片
	            if (frontUrl == 'http:') {
	                sendIndex++;
	                //                        判断是否最后一张图
	                if (sendIndex < sendLength) {
	                    //                            回调自己自己
	                    _this.sendImage(sendIndex);
	                } else {
	                    //进行上传文章
	                    _this.realSave();
	                }
	            } else {
	                var sendparaimg = frontUrl == 'file:' ? _this.paraList[sendIndex].paraImage.substring(7) : _this.paraList[sendIndex].paraImage; //将图片前的file://字符去掉
	                event.upload(sendparaimg, function (data) {
	                    if (data.type == 'success' && data.data != '') {
	                        _this.paraList[sendIndex].paraImage = data.data;
	                        //                            向后台获取缩略图
	                        _this.paraList[sendIndex].serveThumbnail = _utils2.default.thumbnail(data.data, _this.proportion, _this.proportion);
	                        sendIndex++;
	                        //                        判断是否最后一张图
	                        if (sendIndex < sendLength) {
	                            //                            回调自己自己
	                            _this.sendImage(sendIndex);
	                        } else {
	                            //进行上传文章
	                            _this.realSave();
	                        }
	                    } else {
	                        //上传失败
	                        _this.toSendArticle = false;
	                        event.toast(data.content);
	                    }
	                }, function (data) {
	                    //                    上传进度
	                    _this.ctrlProcess(data);
	                });
	            }
	        },

	        //            图片上传后，正式将文章数据上传服务器
	        realSave: function realSave() {
	            var _this = this;
	            var musicData = {
	                name: _this.musicName,
	                id: musicId
	            };
	            var voteData = [];
	            //                投票组
	            this.voteList.forEach(function (item) {
	                //                    投票选项
	                var voteOptions = [];
	                item.pageBox.forEach(function (value) {
	                    voteOptions.push(value.textAreaMessage);
	                });
	                var expireTime = '';
	                if (item.chooseDate == '无截止时间') {} else {
	                    var merge = item.chooseDate + ' ' + item.chooseTime + ':00';
	                    var mergeMore = new Date(Date.parse(merge.replace(/-/g, "/")));
	                    expireTime = mergeMore.getTime() / 1000;
	                }
	                voteData.push({
	                    title: item.textAreaTitle,
	                    expire: expireTime,
	                    voteType: item.optionsIndex,
	                    options: voteOptions
	                });
	                //                    event.toast(voteData);
	            });
	            //            获取当前时间戳 作为唯一标识符key
	            var timestamp = Math.round(new Date().getTime() / 1000);
	            var atticleTemplates = [];
	            this.paraList.forEach(function (item) {
	                atticleTemplates.push({
	                    thumbnail: item.serveThumbnail,
	                    original: item.paraImage,
	                    mediaType: "image",
	                    content: item.paraText
	                });
	            });
	            //                判断是再次编辑还是初次编辑;
	            var sendId = _this.articleId == '' ? timestamp : _this.articleId;
	            var articleData = {
	                thumbnail: this.serveCover,
	                music: musicData,
	                templates: atticleTemplates,
	                id: sendId,
	                title: _this.setTitle,
	                votes: voteData
	                //                转成json字符串后上传服务器
	            };articleData = (0, _stringify2.default)(articleData);
	            //                网络请求，保存文章
	            _this.saveArticle(articleData, function (res) {
	                //                    modal.toast({message:res});
	                if (_utils2.default.isNull(res)) {
	                    event.toast('系统繁忙,请稍后重试');
	                } else {
	                    if (res.data != '' && res.data.type == 'success') {
	                        event.toast(res.data.data.id);
	                        //                1是置顶（默认倒序）  keyword ",[1],文章title,"
	                        _utils2.default.save("article", res.data.data.id, res.data.data, '0,' + timestamp + '', ',[],' + _this.setTitle + ',', function (data) {
	                            if (data.type == 'success') {
	                                //                                    event.closeURL();
	                                _this.toSendArticle = false;
	                                event.openURL('http://192.168.2.157:8081/preview.weex.js?articleId=' + res.data.data.id, function (message) {
	                                    _this.currentPro = 0; //当前进度
	                                    _this.proTotal = 2; //总的进度
	                                    _this.processWidth = 0; //进度条宽度
	                                });
	                            } else {
	                                modal.alert({
	                                    message: '系统繁忙,请稍后重试',
	                                    duration: 0.3
	                                });
	                            }
	                        });
	                    }
	                }
	            });
	        },

	        //        向服务器发送保存文章
	        saveArticle: function saveArticle(articleData, callback) {
	            //                modal.toast({message:articleData,duration:3});
	            return stream.fetch({
	                method: 'POST',
	                type: 'json',
	                body: articleData,
	                url: 'weex/member/article/submit.jhtml'
	            }, callback);
	        },

	        //            点击"+"号里的文本时
	        addTextPara: function addTextPara(index) {
	            var _this = this;
	            event.openEditor('', function (data) {
	                var textImg = _utils2.default.locate('resources/images/text.png');
	                event.toast(data);
	                //                    将返回回来的html数据赋值进去
	                var newPara = {
	                    //原图
	                    paraImage: '',
	                    //                                    小缩略图
	                    thumbnailImage: textImg,
	                    paraText: data.data,
	                    show: true
	                };
	                _this.paraList.splice(index, 0, newPara);
	                modal.toast({ message: _this.paraList[index].paraText, duration: 3 });
	            });
	        },
	        //            点击"+"号里的图片时
	        addImgPara: function addImgPara(index) {
	            var _this = this;
	            album.openAlbumMuti(
	            //选完图片后触发回调函数
	            function (data) {
	                if (data.type == 'success') {
	                    //                    data.data里存放的是用户选取的图片路径
	                    for (var i = 0; i < data.data.length; i++) {
	                        var newPara = {
	                            //原图
	                            paraImage: 'file:/' + data.data[i].originalPath,
	                            //                                    小缩略图
	                            thumbnailImage: 'file:/' + data.data[i].thumbnailSmallPath,
	                            paraText: '',
	                            show: true
	                        };
	                        _this.paraList.splice(index + i, 0, newPara);
	                        _this.clearIconBox();
	                    }
	                }
	            });
	        },
	        //            点击第一个"+"号时触发
	        firstShow: function firstShow() {
	            var _this2 = this;

	            this.firstPlusShow = !this.firstPlusShow;
	            if (lastIndex != -1) {
	                setTimeout(function () {
	                    if (_this2.paraList[lastIndex].show == false) {
	                        _this2.paraList[lastIndex].show = true;
	                    }
	                    lastIndex = -1;
	                }, 60);
	            }
	        },
	        //            点击第2个以后的"+"号时，触发
	        showIconBox: function showIconBox(index) {
	            var _this3 = this;

	            setTimeout(function () {
	                if (_this3.firstPlusShow == false) {
	                    _this3.firstPlusShow = true;
	                }
	            }, 60);
	            if (lastIndex == -1) {
	                this.paraList[index].show = !this.paraList[index].show;
	            } else {
	                this.paraList[index].show = !this.paraList[index].show;
	                //需要加延迟 否则画面会出现卡顿。先将点击的加号转变成功能盒，再将上一个功能后转变为"+"号
	                setTimeout(function () {
	                    if (_this3.paraList[lastIndex].show == false) {
	                        _this3.paraList[lastIndex].show = true;
	                    }
	                }, 60);
	            }
	            setTimeout(function () {
	                lastIndex = index;
	            }, 60);
	        },
	        //            点击空白区域时，将功能盒子隐藏，显示出"+"号
	        clearIconBox: function clearIconBox() {
	            if (lastIndex != -1) {
	                if (this.paraList[lastIndex].show == false) {
	                    this.paraList[lastIndex].show = true;
	                }
	                lastIndex = -1;
	            }
	            if (this.firstPlusShow == false) {
	                this.firstPlusShow = true;
	            }
	        },
	        //            判断是否最后一个段落来添加向下移动的箭头。
	        lastPara: function lastPara(index) {
	            if (index != this.paraList.length - 1) {
	                return true;
	            } else {
	                return false;
	            }
	        },
	        //            上箭头
	        moveUp: function moveUp(index) {
	            this.firstPlusShow = true;
	            if (lastIndex != -1) {
	                this.paraList[lastIndex].show = true;
	                lastIndex = -1;
	            }
	            //         方法2
	            var a = this.paraList[index].thumbnailImage;
	            var b = this.paraList[index].paraText;
	            this.paraList[index].thumbnailImage = this.paraList[index - 1].thumbnailImage;
	            this.paraList[index].paraText = this.paraList[index - 1].paraText;
	            this.paraList[index - 1].thumbnailImage = a;
	            this.paraList[index - 1].paraText = b;
	        },
	        //            下箭头
	        moveBottom: function moveBottom(index) {
	            this.firstPlusShow = true;
	            if (lastIndex != -1) {
	                this.paraList[lastIndex].show = true;
	                lastIndex = -1;
	            }
	            //         方法2
	            var a = this.paraList[index].thumbnailImage;
	            var b = this.paraList[index].paraText;
	            this.paraList[index].thumbnailImage = this.paraList[index + 1].thumbnailImage;
	            this.paraList[index].paraText = this.paraList[index + 1].paraText;
	            this.paraList[index + 1].thumbnailImage = a;
	            this.paraList[index + 1].paraText = b;
	        },
	        //            用户执行删除时触发询问。
	        showConfirm: function showConfirm(index) {
	            var _this = this;
	            if (this.paraList.length == 1) {
	                modal.toast({ message: '至少要保留一张图片', duration: 0.5 });
	            } else {
	                modal.confirm({
	                    message: '确定删除该段?',
	                    okTitle: '确定',
	                    cancelTitle: '取消',
	                    duration: 0.3
	                }, function (value) {
	                    if (value == '确定') {
	                        //    将内容删掉
	                        _this.paraList.splice(index, 1);
	                    }
	                });
	            }
	        },
	        //            删除投票
	        closeVote: function closeVote(index) {
	            var _this = this;
	            modal.confirm({
	                message: '确定删除投票?',
	                okTitle: '删除',
	                cancelTitle: '取消',
	                duration: 0.3
	            }, function (value) {
	                console.log(value);
	                if (value == '删除') {
	                    //                将内容删掉
	                    _this.voteList.splice(index, 1);
	                }
	            });
	        },
	        //            编辑段落图片
	        editParaImage: function editParaImage(imgSrc, index) {
	            var _this = this;
	            //                判断是否没有图片
	            if (imgSrc == '') {
	                album.openAlbumSingle(false, function (data) {
	                    _this.paraList[index].paraImage = 'file:/' + data.data.originalPath;
	                    _this.paraList[index].thumbnailImage = 'file:/' + data.data.thumbnailSmallPath;
	                });
	                return;
	            } else {
	                modal.confirm({
	                    message: '请选择裁剪或者更换图片',
	                    duration: 0.3,
	                    okTitle: '裁剪',
	                    cancelTitle: '更换'
	                }, function (value) {
	                    event.toast(value);
	                    if (value == '更换') {
	                        //                                调用单选图片接口
	                        album.openAlbumSingle(false, function (data) {
	                            _this.paraList[index].paraImage = 'file:/' + data.data.originalPath;
	                            _this.paraList[index].thumbnailImage = 'file:/' + data.data.thumbnailSmallPath;
	                        });
	                    } else if (value == '裁剪') {
	                        //                                调用裁剪图片
	                        album.openCrop(imgSrc, function (data) {
	                            if (data.type == 'success') {
	                                _this.paraList[index].paraImage = 'file:/' + data.data.originalPath;
	                                _this.paraList[index].thumbnailImage = 'file:/' + data.data.thumbnailSmallPath;
	                            } else {
	                                modal.toast({ message: data.content, duration: 10 });
	                            }
	                        });
	                    } else {
	                        event.toast(value);
	                    }
	                });
	            }
	        },

	        //            下拉刷新
	        onrefresh: function onrefresh(event) {
	            var _this4 = this;

	            console.log('is refreshing');
	            this.refreshing = true;
	            setTimeout(function () {
	                _this4.refreshing = false;
	            }, 10);
	        },

	        //            正在下拉
	        onpullingdown: function onpullingdown(event) {
	            console.log('is onpulling down');
	        },

	        //            跳转封面页面
	        goCover: function goCover() {
	            //                event.openURL('file://assets/member/editor/cover.js');
	            var _this = this;
	            var paraLength = _this.paraList.length;
	            var listLength = paraLength >= 6 ? 6 : paraLength;
	            var imgList = [];
	            for (var i = 0; i < listLength; i++) {
	                imgList.push({
	                    path: _this.paraList[i].paraImage
	                });
	            }
	            var coverData = {
	                image: imgList,
	                cover: _this.coverImage
	            };
	            storage.setItem('coverImage', coverData);
	            event.openURL(_utils2.default.locate('view/member/editor/cover.js?name=coverImage'), function (message) {
	                //                event.openURL('http://192.168.2.157:8081/cover.weex.js?name=coverImage',function (message) {
	                //                    let jsonData = JSON.parse(data);
	                //                    modal.toast({message:message,duration:1});
	                _this.coverImage = message.data;
	            });
	        },
	        //            跳转音乐页面
	        goMusic: function goMusic() {
	            //                event.openURL('file://assets/member/editor/music.js');
	            var _this = this;
	            //                event.toast(musicId);
	            event.openURL(_utils2.default.locate('view/member/editor/music.js?musicId=' + musicId), function (message) {
	                //                event.openURL('http://192.168.2.157:8081/music.weex.js?musicId=' + musicId,function (message) {
	                //                    event.toast(message);
	                //                    let jsonData = JSON.parse(data);
	                //                    modal.toast({message:message,duration:1});
	                if (message.data != '') {
	                    _this.musicName = message.data.chooseMusicName;
	                    musicId = message.data.chooseMusicId;
	                }
	            });
	        },
	        //            跳转投票页面
	        goVote: function goVote() {
	            var _this = this;
	            //                event.openURL('http://192.168.2.157:8081/vote.weex.js',function (message) {
	            event.openURL(_utils2.default.locate('view/member/editor/vote.js'), function (message) {
	                if (message.data != '') {
	                    _this.voteList.push(message.data);
	                }
	            });
	        },
	        //            编辑投票
	        editVote: function editVote(index) {
	            var _this = this;
	            var voteData = (0, _stringify2.default)(_this.voteList[index]);
	            storage.setItem('voteData', voteData);
	            //                event.openURL('http://192.168.2.157:8081/vote.weex.js?name=voteData',function (message) {
	            event.openURL(_utils2.default.locate('view/member/editor/vote.js?name=voteData'), function (message) {
	                if (message.data != '') {
	                    _this.voteList[index] = message.data;
	                }
	            });
	        }
	    }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(194), __esModule: true };

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(12);
	var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
	module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};


/***/ }),

/***/ 195:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('navbar', {
	    attrs: {
	      "title": _vm.title,
	      "complete": _vm.complete
	    },
	    on: {
	      "goback": _vm.goBack,
	      "goComplete": _vm.goComplete
	    }
	  }), _c('list', {
	    staticClass: ["wrapperBox"]
	  }, [_c('cell', {
	    appendAsTree: true,
	    attrs: {
	      "append": "tree"
	    }
	  }, [_c('div', [_c('image', {
	    staticClass: ["coverImage"],
	    attrs: {
	      "resize": "cover",
	      "src": _vm.coverImage
	    }
	  }), _c('div', {
	    staticClass: ["coverMaskImage"]
	  }), _c('text', {
	    staticClass: ["setTitle"],
	    on: {
	      "trigger": function($event) {
	        _vm.articleTitle(_vm.setTitle)
	      },
	      "click": function($event) {
	        _vm.articleTitle(_vm.setTitle)
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.setTitle))]), _c('div', {
	    staticClass: ["bottomBtn", "addMusic"]
	  }, [(this.musicName == '') ? _c('text', {
	    staticClass: ["musicSize"],
	    on: {
	      "click": function($event) {
	        _vm.goMusic()
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.addMusic))]) : _c('text', {
	    staticClass: ["musicSize"],
	    style: {
	      fontFamily: 'iconfont'
	    },
	    on: {
	      "click": function($event) {
	        _vm.goMusic()
	      }
	    }
	  }, [_vm._v(" " + _vm._s(_vm.musicName))])]), _c('text', {
	    staticClass: ["bottomBtn", "editCover", "musicSize"],
	    on: {
	      "click": function($event) {
	        _vm.goCover()
	      }
	    }
	  }, [_vm._v("编辑封面")])])]), _c('cell', {
	    appendAsTree: true,
	    attrs: {
	      "append": "tree"
	    }
	  }, [_c('div', {
	    staticClass: ["addBox"],
	    on: {
	      "click": function($event) {
	        _vm.clearIconBox()
	      }
	    }
	  }, [(_vm.firstPlusShow) ? _c('div', {
	    on: {
	      "click": function($event) {
	        _vm.firstShow()
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["plusSign"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])]) : _c('div', {
	    staticClass: ["iconBox"]
	  }, [_c('div', {
	    staticClass: ["addIconBox"],
	    on: {
	      "click": function($event) {
	        _vm.addTextPara(0)
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["addText", "iconSize"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])]), _c('div', {
	    staticClass: ["addIconBox"],
	    on: {
	      "click": function($event) {
	        _vm.addImgPara(0)
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["addImage", "iconSize"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])]), _c('div', {
	    staticClass: ["addIconBox"]
	  }, [_c('text', {
	    staticClass: ["addVideo", "iconSize"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])])])])]), _c('cell', {
	    appendAsTree: true,
	    attrs: {
	      "append": "tree"
	    }
	  }, [_c('transition-group', {
	    attrs: {
	      "name": "paraTransition",
	      "tag": "div"
	    }
	  }, _vm._l((_vm.paraList), function(item, index) {
	    return _c('div', {
	      key: item
	    }, [_c('div', {
	      staticClass: ["paraBox", "paraBoxHeight"]
	    }, [_c('div', {
	      staticClass: ["paraClose"],
	      on: {
	        "click": function($event) {
	          _vm.showConfirm(index)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["paraCloseSize"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]), (index != 0) ? _c('div', {
	      staticClass: ["rightArrow", "upArrow"],
	      on: {
	        "click": function($event) {
	          _vm.moveUp(index)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["arrowSize"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]) : _vm._e(), (_vm.lastPara(index)) ? _c('div', {
	      staticClass: ["rightArrow", "downArrow"],
	      on: {
	        "click": function($event) {
	          _vm.moveBottom(index)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["arrowSize"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]) : _vm._e(), _c('div', [_c('image', {
	      staticClass: ["paraImage"],
	      attrs: {
	        "resize": "cover",
	        "src": item.thumbnailImage
	      },
	      on: {
	        "click": function($event) {
	          _vm.editParaImage(item.paraImage, index)
	        }
	      }
	    })]), _c('div', {
	      staticClass: ["paraText"],
	      on: {
	        "click": function($event) {
	          _vm.editorText(index)
	        }
	      }
	    }, [(item.paraText != '') ? _c('text', {
	      staticClass: ["paraTextSize"]
	    }, [_vm._v(_vm._s(_vm._f("htmlDeal")(item.paraText)))]) : _c('text', {
	      staticClass: ["paraTextSize", "greyColor"]
	    }, [_vm._v("点击添加文字")])])]), _c('div', {
	      staticClass: ["addBox"],
	      on: {
	        "click": function($event) {
	          _vm.clearIconBox()
	        }
	      }
	    }, [(item.show) ? _c('div', {
	      on: {
	        "click": function($event) {
	          _vm.showIconBox(index)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["plusSign"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]) : _c('div', {
	      staticClass: ["iconBox"]
	    }, [_c('div', {
	      staticClass: ["addIconBox"],
	      on: {
	        "click": function($event) {
	          _vm.addTextPara(index + 1)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["addText", "iconSize"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]), _c('div', {
	      staticClass: ["addIconBox"],
	      on: {
	        "click": function($event) {
	          _vm.addImgPara(index + 1)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["addImage", "iconSize"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]), _c('div', {
	      staticClass: ["addIconBox"]
	    }, [_c('text', {
	      staticClass: ["addVideo", "iconSize"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])])])])])
	  }))], 1), _c('cell', {
	    appendAsTree: true,
	    attrs: {
	      "append": "tree"
	    }
	  }, [_vm._l((_vm.voteList), function(item, index) {
	    return _c('div', {
	      staticClass: ["voteMargin"],
	      on: {
	        "click": function($event) {
	          _vm.editVote(index)
	        }
	      }
	    }, [_c('div', {
	      staticClass: ["paraBox", "paraBoxHeight"]
	    }, [_c('div', {
	      staticClass: ["paraClose"],
	      on: {
	        "click": function($event) {
	          _vm.closeVote(index)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["paraCloseSize"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]), _c('div', [_c('image', {
	      staticClass: ["paraImage"],
	      attrs: {
	        "src": _vm.voteImg
	      }
	    })]), _c('div', {
	      staticClass: ["paraText"]
	    }, [_c('text', {
	      staticClass: ["paraTextSize"]
	    }, [_vm._v(_vm._s(item.textAreaTitle))])])])])
	  }), _c('div', {
	    staticClass: ["paraBox", "flexRow"],
	    on: {
	      "click": function($event) {
	        _vm.goVote()
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["addVote", "addVoteIcon"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")]), _c('text', {
	    staticClass: ["addVote"]
	  }, [_vm._v("添加投票")])])], 2), _vm._m(0)]), (_vm.toSendArticle) ? _c('div', {
	    staticClass: ["sendMask"]
	  }, [_c('div', {
	    staticClass: ["processBox"]
	  }, [_c('text', {
	    staticClass: ["processText"]
	  }, [_vm._v("正在云同步,请稍后...")]), _c('div', {
	    staticClass: ["processStyle", "processBg"]
	  }), _c('div', {
	    staticClass: ["processStyle"],
	    staticStyle: {
	      backgroundColor: "#D9141E"
	    },
	    style: {
	      width: _vm.processWidth + 'px'
	    }
	  }), _c('text', {
	    staticClass: ["processTotal"]
	  }, [_vm._v(_vm._s(_vm.currentPro) + "/" + _vm._s(_vm.proTotal))])])]) : _vm._e()], 1)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('cell', {
	    appendAsTree: true,
	    attrs: {
	      "append": "tree"
	    }
	  }, [_c('div', {
	    staticClass: ["emptyBox"]
	  })])
	}]}
	module.exports.render._withStripped = true

/***/ })

/******/ });