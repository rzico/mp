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
	__vue_styles__.push(__webpack_require__(151)
	)
	__vue_styles__.push(__webpack_require__(152)
	)

	/* script */
	__vue_exports__ = __webpack_require__(153)

	/* template */
	var __vue_template__ = __webpack_require__(154)
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
	__vue_options__.__file = "/Users/ke/mopian/GitHubMoPian/mp/src/view/home/header.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-a1298520"
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

/***/ 151:
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

/***/ 152:
/***/ (function(module, exports) {

	module.exports = {
	  "search_box": {
	    "paddingLeft": 20,
	    "height": 60,
	    "borderWidth": 1,
	    "borderColor": "#cccccc",
	    "borderStyle": "solid",
	    "borderRadius": 8,
	    "flexDirection": "row",
	    "justifyContent": "center",
	    "alignItems": "center",
	    "backgroundColor": "#FFFFFF"
	  },
	  "logo": {
	    "height": 55,
	    "width": 55,
	    "borderRadius": 6
	  },
	  "scan": {
	    "fontSize": 40,
	    "lineHeight": 60,
	    "height": 60,
	    "width": 60,
	    "color": "#FFFFFF"
	  }
	}

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

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


	var event = weex.requireModule('event');
	var dom = weex.requireModule("dom");
	exports.default = {
	    created: function created() {

	        _utils2.default.initIconFont();
	    },

	    methods: {
	        scan: function scan(e) {
	            event.scan(function (resp) {
	                if (resp.type = "success") {
	                    event.openURL(resp.data, function (data) {});
	                }
	            });
	        },
	        search: function search(w) {
	            this.$emit('search', this.keyword);
	        }
	    }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('div', {
	    staticClass: ["header"]
	  }, [_c('div', {
	    staticStyle: {
	      flexDirection: "row",
	      marginTop: "40px",
	      height: "96px",
	      alignItems: "center",
	      flex: "1"
	    }
	  }, [_vm._m(0), _c('div', {
	    staticClass: ["search_box", "flex4"],
	    on: {
	      "click": function($event) {
	        _vm.search()
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["ico_small", "gray"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")]), _c('text', {
	    staticClass: ["sub_title"]
	  }, [_vm._v("搜索用户和文章")])]), _c('div', {
	    staticClass: ["flex-center", "flex1"],
	    on: {
	      "click": function($event) {
	        _vm.scan()
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["scan"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["flex-center", "flex1"]
	  }, [_c('image', {
	    staticClass: ["logo"],
	    attrs: {
	      "src": "https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"
	    }
	  })])
	}]}
	module.exports.render._withStripped = true

/***/ })

/******/ });