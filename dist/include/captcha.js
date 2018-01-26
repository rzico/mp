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
	__vue_styles__.push(__webpack_require__(76)
	)
	__vue_styles__.push(__webpack_require__(77)
	)

	/* script */
	__vue_exports__ = __webpack_require__(78)

	/* template */
	var __vue_template__ = __webpack_require__(79)
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
	__vue_options__.__file = "/Users/leistercheung/Documents/mopian/mp/src/include/captcha.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-6a4391e1"
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

/***/ 71:
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
	var websiteURL = 'http://dev.rzico.com';
	var event = weex.requireModule('event');
	var _debug = true; //删掉该属性时请查找该页所有debug变量并删除变量
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

	    //获取网站资源
	    website: function website(url) {
	        var newUrl = websiteURL + url;
	        return newUrl;
	    },

	    //获取URL参数
	    getUrlParameter: function getUrlParameter(name, dataUrl) {
	        var url = void 0;
	        if (dataUrl == null || dataUrl == undefined || dataUrl == '') {
	            url = weex.config.bundleUrl;
	        } else {
	            url = dataUrl;
	        }
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
	    message: function message(_type, _content, _data) {
	        return {
	            type: _type,
	            content: _content,
	            data: _data
	        };
	    },

	    //判空
	    isNull: function isNull(value) {
	        if (value == null || value == undefined || value == '' || value == 'undefined') {
	            return true;
	        } else {
	            return false;
	        }
	    },

	    //获取缩略图
	    thumbnail: function thumbnail(url, w, h) {
	        //获取屏幕宽度计算得出比例
	        var proportion = weex.config.env.deviceWidth / 750;
	        //                获取缩略图的宽高
	        w = parseInt(w * proportion);
	        h = parseInt(h * proportion);
	        if (url.substring(0, 11) == "http://cdnx") {
	            return url + "?x-oss-process=image/resize,w_" + w + ",h_" + h + "";
	        } else if (url.substring(0, 10) == "http://cdn") {
	            return url + "@" + w + "w_" + h + "h_1e_1c_100Q";
	        } else {
	            return url;
	        }
	    },

	    //获取全屏的高度尺寸,可传入父组件的导航栏高度进行适配
	    fullScreen: function fullScreen(topHeight) {
	        //减1是为了能触发loading，不能够高度刚刚好
	        topHeight = topHeight == '' ? 0 : topHeight - 1;
	        return 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - topHeight;
	    },

	    //模糊图片，r , s  为 1-50，超大超模糊
	    blur: function blur(url, r, s) {
	        if (url.substring(0, 10) == "http://cdn") {
	            return url + "@" + r + "-" + s + "bl";
	        } else {
	            return url;
	        }
	    },

	    //获取文章URL地址
	    articleUrl: function articleUrl(template, id) {
	        template = template == '' ? 't1001' : template;
	        return websiteURL + "/" + template + "?id=" + id;
	    },
	    debug: function debug(msg) {
	        if (_debug) {
	            event.toast(msg);
	        }
	    },
	    isRoles: function isRoles(roles, all) {
	        for (var i = 0; i < roles.length; i++) {
	            var role = roles.substring(i, i + 1);
	            if (all.indexOf(role) >= 0) {
	                return true;
	            }
	        }
	        return false;
	    },

	    //  获取字符串的字符总长度
	    getLength: function getLength(e) {
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

	    //    将过长的字符串换成 XXX...XXX格式
	    changeStr: function changeStr(e) {
	        return e.substr(0, 4) + '...' + e.substr(-4);
	    },

	    //js中用正则表达式 过滤特殊字符, 校验所有输入域是否含有特殊符号 (无法过滤 \ )
	    //  searchFilter(s) {
	    //         event.toast(s);
	    //         var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
	    //         var rs = "";
	    //         for (var i = 0; i < s.length; i++) {
	    //             rs = rs + s.substr(i, 1).replace(pattern,'');
	    //         }
	    //         return rs;
	    //     }

	    //老的二维码转换成新格式
	    qr2scan: function qr2scan(e) {
	        var type = this.getUrlParameter("type", e);
	        var code = this.getUrlParameter("no", e);
	        if (type == "paybill") {
	            return websiteURL + "/q/818804" + code + ".jhtml";
	        } else if (type == "card_active") {
	            return websiteURL + "/q/818801" + code + ".jhtml";
	        } else {
	            return e;
	        }
	    },

	    //    二维码读取内容
	    readScan: function readScan(e, callback) {
	        e = this.qr2scan(e);
	        var backData = {};
	        //二维码字段截取. indexOf 没找到时返回-1， 此时如果2个indexof都没找到 那么 e.substring（-1 + 3 ，-1）,e的长度会变为2
	        // let subData = e.substring(e.indexOf("/q/8") + 3,e.indexOf(".jhtml"));

	        var start = e.indexOf("/q/8");
	        var end = e.indexOf(".jhtml");
	        var subData = null;
	        if (start != -1 && end != -1) {
	            subData = e.substring(start + 3, end);
	        }
	        //判断是不是web  code'000000'为无效二维码 '999999'为webView；
	        if (subData == null) {
	            //如果没有找到q/ 和 .jhtml中的字端，就执行该段代码
	            if (e.substring(0, 4) == 'http' && _debug) {
	                var data = {
	                    type: 'webView',
	                    code: '999999'
	                };
	                backData = this.message('success', 'webView', data);
	            } else {
	                var _data2 = {
	                    type: 'error',
	                    code: '000000'
	                };
	                backData = this.message('error', '无效二维码', _data2);
	            }
	            callback(backData);
	        } else {
	            //截取11位的判断码
	            var type = subData.substring(0, 6);
	            var code = subData.slice(6);
	            var _data3 = {
	                type: type,
	                code: code
	            };
	            if (code == '000000') {
	                backData = this.message('error', '无效二维码', _data3);
	            } else {
	                backData = this.message('success', '扫描成功', _data3);
	            }
	            callback(backData);
	        }
	    },

	    //判断用户是否只输入了空格
	    isAllEmpty: function isAllEmpty(str) {
	        if (str.replace(/ /g, "").length == 0) {
	            return true;
	        } else {
	            return false;
	        }
	    },

	    //判断设备型号
	    device: function device() {
	        var s = weex.config.env.deviceModel;
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s.indexOf("V1") > 0) {
	                return "V1";
	            } else if (s.indexOf("10,3") > 0 || s.indexOf("10,6") > 0) {
	                return 'IPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },

	    //    登录主页的轮播图控制
	    indexMt: function indexMt() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'indexMtV1';
	            } else if (s == 'IPhoneX') {
	                return 'indexMtIPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },


	    //    判断设备型号为fix定位的元素添加高度 (会员首页 作者专栏 顶部设置跟返回按钮)
	    addTop: function addTop() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'addTopV1';
	            } else if (s == 'IPhoneX') {
	                return 'addTopIPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //   会员首页 作者专栏 顶部信息栏
	    addInfo: function addInfo() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'addInfoV1';
	            } else if (s == 'IPhoneX') {
	                return 'addInfoIPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //    判断设备型号为fix定位的元素添加高度 (会员首页 作者专栏 顶部设置跟返回按钮)
	    addBgImg: function addBgImg() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'addBgImgV1';
	            } else if (s == 'IPhoneX') {
	                return 'addBgImgIPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //    控制滑动时文集box的显示
	    hideCorpus: function hideCorpus() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'hideCorpusV1';
	            } else if (s == 'IPhoneX') {
	                return 'hideCorpusIPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //    控制滑动时文集box的显示
	    pageTop: function pageTop() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'pageTopV1';
	            } else if (s == 'IPhoneX') {
	                return 'pageTopIPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },

	    //判断设备系统是不是ios
	    isIosSystem: function isIosSystem() {
	        var s = weex.config.env.osName;
	        if (s == 'iOS') {
	            return true;
	        } else {
	            return false;
	        }
	    },

	    resolvetimefmt: function resolvetimefmt(value) {
	        //value 传进来是个整数型，要判断是10位还是13位需要转成字符串。这边的方法是检测13位的时间戳 所以要*1000；并且转回整型。安卓下，时间早了8个小时
	        if (value.toString().length == 10) {
	            value = parseInt(value) * 1000;
	        } else {
	            value = parseInt(value);
	        }
	        // 返回处理后的值
	        var date = new Date(value);

	        var d2 = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

	        date = new Date(d2 + 28800000);

	        var y = date.getUTCFullYear();
	        var m = date.getUTCMonth() + 1;
	        var d = date.getUTCDate();
	        var h = date.getUTCHours();
	        var i = date.getUTCMinutes();
	        var s = date.getUTCSeconds();
	        if (m < 10) {
	            m = '0' + m;
	        }
	        if (d < 10) {
	            d = '0' + d;
	        }
	        if (h < 10) {
	            h = '0' + h;
	        }
	        if (i < 10) {
	            i = '0' + i;
	        }
	        if (s < 10) {
	            s = '0' + s;
	        }
	        var timeObj = {
	            y: y,
	            m: m,
	            d: d,
	            h: h,
	            i: i,
	            s: s
	        };
	        return timeObj;
	    },
	    //返回格式 2017-09-01
	    ymdtimefmt: function ymdtimefmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        var timeObj = this.resolvetimefmt(value);
	        return timeObj.y + '-' + timeObj.m + '-' + timeObj.d;
	    },
	    //返回格式 2017-09-01 06:35:59
	    ymdhistimefmt: function ymdhistimefmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        var timeObj = this.resolvetimefmt(value);

	        return timeObj.y + '-' + timeObj.m + '-' + timeObj.d + ' ' + timeObj.h + ':' + timeObj.i + ':' + timeObj.s;
	    },
	    //返回格式 2017年09月01日 06:35:59
	    ymdhisdayfmt: function ymdhisdayfmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        var timeObj = this.resolvetimefmt(value);

	        return timeObj.y + '年' + timeObj.m + '月' + timeObj.d + '日' + ' ' + timeObj.h + ':' + timeObj.i + ':' + timeObj.s;
	    },
	    //返回格式 06:35:59
	    histimefmt: function histimefmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        var timeObj = this.resolvetimefmt(value);
	        return timeObj.h + ':' + timeObj.i + ':' + timeObj.s;
	    }
	};

	exports.default = utilsFunc;
	module.exports = exports['default'];

/***/ }),

/***/ 76:
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
	    "fontSize": 30,
	    "color": "#999999"
	  },
	  "sub_date": {
	    "fontSize": 26,
	    "color": "#999999"
	  },
	  "fz28": {
	    "fontSize": 28
	  },
	  "fz30": {
	    "fontSize": 30
	  },
	  "fz32": {
	    "fontSize": 32
	  },
	  "fz35": {
	    "fontSize": 35
	  },
	  "fz40": {
	    "fontSize": 40
	  },
	  "boder-bottom": {
	    "borderStyle": "solid",
	    "borderBottomWidth": 1,
	    "borderColor": "#cccccc"
	  },
	  "boder-top": {
	    "borderStyle": "solid",
	    "borderTopWidth": 1,
	    "borderColor": "#cccccc"
	  },
	  "boder-right": {
	    "borderStyle": "solid",
	    "borderRightWidth": 1,
	    "borderColor": "#cccccc"
	  },
	  "boder-left": {
	    "borderStyle": "solid",
	    "borderLeftWidth": 1,
	    "borderColor": "#cccccc"
	  },
	  "pl10": {
	    "paddingLeft": 10
	  },
	  "pt10": {
	    "paddingTop": 10
	  },
	  "pt15": {
	    "paddingTop": 15
	  },
	  "pb10": {
	    "paddingBottom": 10
	  },
	  "pl20": {
	    "paddingLeft": 20
	  },
	  "pt20": {
	    "paddingTop": 20
	  },
	  "pb15": {
	    "paddingBottom": 15
	  },
	  "pb20": {
	    "paddingBottom": 20
	  },
	  "pt25": {
	    "paddingTop": 25
	  },
	  "pt30": {
	    "paddingTop": 30
	  },
	  "pt40": {
	    "paddingTop": 40
	  },
	  "pb40": {
	    "paddingBottom": 40
	  },
	  "pb30": {
	    "paddingBottom": 30
	  },
	  "pb25": {
	    "paddingBottom": 25
	  },
	  "pl25": {
	    "paddingLeft": 25
	  },
	  "pl30": {
	    "paddingLeft": 30
	  },
	  "pr10": {
	    "paddingRight": 10
	  },
	  "pr20": {
	    "paddingRight": 20
	  },
	  "pr25": {
	    "paddingRight": 25
	  },
	  "pr30": {
	    "paddingRight": 30
	  },
	  "pl35": {
	    "paddingLeft": 35
	  },
	  "pr35": {
	    "paddingRight": 35
	  },
	  "bgWhite": {
	    "backgroundColor": "#ffffff"
	  },
	  "textActive": {
	    "backgroundColor:active": "#cccccc"
	  },
	  "mt0": {
	    "marginTop": 0
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
	  "mt50": {
	    "marginTop": 50
	  },
	  "bt0": {
	    "marginBottom": 0
	  },
	  "bt5": {
	    "marginBottom": 5
	  },
	  "bt10": {
	    "marginBottom": 10
	  },
	  "bt15": {
	    "marginBottom": 15
	  },
	  "bt20": {
	    "marginBottom": 20
	  },
	  "bt30": {
	    "marginBottom": 30
	  },
	  "bt50": {
	    "marginBottom": 50
	  },
	  "mr5": {
	    "marginRight": 5
	  },
	  "mr30": {
	    "marginRight": 30
	  },
	  "ml5": {
	    "marginLeft": 5
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
	    "paddingTop": 44,
	    "flexDirection": "row",
	    "position": "sticky",
	    "borderBottomWidth": 1,
	    "borderBottomStyle": "solid",
	    "borderColor": "#cccccc",
	    "backgroundColor": "#EB4E40"
	  },
	  "nav": {
	    "width": 654,
	    "justifyContent": "space-between",
	    "flexDirection": "row",
	    "height": 92,
	    "alignItems": "center",
	    "marginTop": 0
	  },
	  "nav_back": {
	    "marginTop": 0,
	    "flexDirection": "row",
	    "width": 92,
	    "height": 92,
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "corpusActive": {
	    "color": "#EB4E40",
	    "borderColor": "#EB4E40",
	    "borderStyle": "solid",
	    "borderBottomWidth": 4
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
	  "iconImg": {
	    "width": 60,
	    "height": 60,
	    "fontSize": 60
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
	  "cell-row-row": {
	    "minHeight": 100,
	    "flexDirection": "row",
	    "justifyContent": "space-between",
	    "backgroundColor": "#ffffff",
	    "paddingLeft": 20,
	    "paddingRight": 20,
	    "alignItems": "center",
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
	  "borderTop": {
	    "borderTopWidth": 1,
	    "borderTopColor": "#cccccc",
	    "borderTopStyle": "solid"
	  },
	  "borderBottom": {
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
	  "cell-panel-column": {
	    "height": 98,
	    "minHeight": 98,
	    "flexDirection": "column",
	    "justifyContent": "space-around",
	    "borderBottomWidth": 1,
	    "borderBottomColor": "#cccccc",
	    "borderBottomStyle": "solid",
	    "paddingTop": 10,
	    "paddingBottom": 10
	  },
	  "cell-bottom-clear": {
	    "borderBottomWidth": 0
	  },
	  "cell-clear": {
	    "marginTop": 0,
	    "marginBottom": 0,
	    "borderTopWidth": 0,
	    "borderBottomWidth": 0
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
	  "flex6": {
	    "flex": 6
	  },
	  "bkg-white": {
	    "backgroundColor": "#FFFFFF"
	  },
	  "bkg-primary": {
	    "backgroundColor": "#EB4E40"
	  },
	  "bkg-gray": {
	    "backgroundColor": "#eeeeee"
	  },
	  "bd-primary": {
	    "borderColor": "#EB4E40"
	  },
	  "bkg-delete": {
	    "backgroundColor": "#FF0000"
	  },
	  "white": {
	    "color": "#FFFFFF"
	  },
	  "primary": {
	    "color": "#EB4E40"
	  },
	  "gray": {
	    "color": "#999999"
	  },
	  "ico": {
	    "fontSize": 48,
	    "color": "#EB4E40",
	    "marginTop": 2
	  },
	  "ico_big": {
	    "fontSize": 72,
	    "color": "#EB4E40",
	    "marginTop": 4
	  },
	  "ico_small": {
	    "fontSize": 32,
	    "color": "#EB4E40",
	    "marginTop": 1
	  },
	  "arrow": {
	    "fontSize": 32,
	    "color": "#cccccc",
	    "width": 40
	  },
	  "check": {
	    "fontSize": 32,
	    "color": "#EB4E40",
	    "width": 40
	  },
	  "shopCheck": {
	    "fontSize": 32,
	    "color": "#EB4E40",
	    "width": 40,
	    "marginLeft": 150
	  },
	  "button": {
	    "fontSize": 32,
	    "textAlign": "center",
	    "color": "#ffffff",
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "backgroundColor": "#EB4E40",
	    "borderRadius": 15,
	    "height": 80,
	    "lineHeight": 50,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "backgroundColor:active": "#cccccc",
	    "color:active": "#EB4E40",
	    "backgroundColor:disabled": "#EB4E40",
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
	  "noLoading": {
	    "height": 999
	  },
	  "gif": {
	    "width": 50,
	    "height": 50
	  },
	  "indicator": {
	    "fontSize": 36,
	    "color": "#EB4E40",
	    "width": 750,
	    "textAlign": "center",
	    "marginTop": 20,
	    "marginBottom": 20
	  },
	  "lines-ellipsis": {
	    "lines": 1,
	    "textOverflow": "ellipsis"
	  },
	  "V1": {
	    "height": 146,
	    "paddingTop": 54
	  },
	  "IPhoneX": {
	    "height": 156,
	    "paddingTop": 64
	  },
	  "addTopV1": {
	    "top": 54
	  },
	  "addTopIPhoneX": {
	    "top": 64
	  },
	  "addInfoV1": {
	    "height": 430,
	    "paddingTop": 50
	  },
	  "addInfoIPhoneX": {
	    "height": 440,
	    "paddingTop": 60
	  },
	  "addBgImgV1": {
	    "height": 430
	  },
	  "addBgImgIPhoneX": {
	    "height": 440
	  },
	  "hideCorpusV1": {
	    "top": 146
	  },
	  "hideCorpusIPhoneX": {
	    "top": 156
	  },
	  "pageTopV1": {
	    "top": 226
	  },
	  "pageTopIPhoneX": {
	    "top": 236
	  },
	  "maskLayer": {
	    "position": "fixed",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0,
	    "backgroundColor": "#000000",
	    "opacity": 0.5
	  },
	  "showBox": {
	    "position": "fixed",
	    "top": 150,
	    "right": 15,
	    "backgroundColor": "#ffffff",
	    "borderRadius": 20,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "arrowUp": {
	    "position": "fixed",
	    "top": 148,
	    "right": 30
	  },
	  "refreshImg": {
	    "width": 60,
	    "height": 60,
	    "borderRadius": 30
	  },
	  "refreshBox": {
	    "height": 120,
	    "width": 750,
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "indexMtIPhoneX": {
	    "marginTop": 124
	  }
	}

/***/ }),

/***/ 77:
/***/ (function(module, exports) {

	module.exports = {
	  "mtb50": {
	    "marginTop": 50,
	    "marginBottom": 60
	  },
	  "inputTextBox": {
	    "width": 530,
	    "position": "relative"
	  },
	  "inputText": {
	    "borderWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#999999",
	    "width": 80,
	    "height": 80,
	    "fontSize": 30,
	    "textAlign": "center",
	    "lineHeight": 80
	  },
	  "inputDiv": {
	    "flex": 1,
	    "alignItems": "center"
	  },
	  "input": {
	    "opacity": 0,
	    "width": 530,
	    "position": "absolute",
	    "height": 80,
	    "fontSize": 85
	  },
	  "captcha": {
	    "paddingLeft": 40,
	    "paddingRight": 40,
	    "flexDirection": "column",
	    "alignItems": "center"
	  },
	  "number": {
	    "fontSize": 48,
	    "color": "#000000",
	    "fontWeight": "bold"
	  },
	  "content": {
	    "flexDirection": "column"
	  },
	  "mobile-title": {
	    "fontSize": 48,
	    "color": "#000000",
	    "flexWrap": "wrap"
	  },
	  "mobile-header": {
	    "marginTop": 150,
	    "height": 100,
	    "backgroundColor": "#ffffff",
	    "flexDirection": "column",
	    "alignItems": "center"
	  },
	  "status": {
	    "fontSize": 32,
	    "lineHeight": 60,
	    "borderBottomWidth": 0
	  }
	}

/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(71);

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

	var optionIndex = 0;
	var lastCaptchaLength = 0;
	var timer = null;

	var event = weex.requireModule('event');
	exports.default = {
	    data: function data() {
	        return {
	            time: 59,
	            textList: ['', '', '', '', '', '']
	        };
	    },
	    props: {
	        title: { default: "验证码" },
	        captcha: { default: "" },
	        status: { default: "点击重新发送" },
	        retry: { default: false }
	    },
	    beforeDestory: function beforeDestory() {
	        var _this = this;
	        if (_utils2.default.isNull(timer) == false) {
	            clearInterval(timer);
	            _this.time = 59;
	            timer = null;
	        }
	    },
	    created: function created() {
	        this.beginTimer();
	        this.tel = _utils2.default.getUrlParameter("telNum");
	    },

	    methods: {
	        beginTimer: function beginTimer() {
	            var _this = this;
	            _this.retry = false;
	            if (_utils2.default.isNull(timer) == false) {
	                clearInterval(timer);
	                _this.time = 59;
	                timer = null;
	            }
	            timer = setInterval(function () {
	                _this.time = _this.time - 1;
	                if (_this.time < 1) {
	                    _this.endTimer();
	                }
	            }, 1000);
	        },
	        endTimer: function endTimer() {
	            var _this = this;
	            if (_utils2.default.isNull(timer) == false) {
	                clearInterval(timer);
	                _this.time = 59;
	                timer = null;
	            }
	            this.clear();
	            this.retry = true;
	        },
	        statusStyle: function statusStyle() {
	            if (this.retry) {
	                return "";
	            } else {
	                return "color:#ccc";
	            }
	        },
	        clear: function clear() {
	            this.captcha = "";
	            this.textList = ['', '', '', '', '', ''];
	            lastCaptchaLength = 0;
	            optionIndex = 0;
	        },
	        //            当用户输入数字时触发
	        captchaInput: function captchaInput(e) {
	            var _this = this;
	            //                判断删除还是输入  '大于' --> 删除
	            if (lastCaptchaLength > e.value.length) {
	                optionIndex--;
	                _this.textList[optionIndex] = '';
	            } else {
	                var a = e.value;
	                var b = a.substr(a.length - 1, 1);
	                _this.textList[optionIndex] = b;
	                if (_this.textList[0] != '') {
	                    optionIndex++;
	                }
	            }
	            lastCaptchaLength = e.value.length;
	            //                当用户输完验证码后进行系统验证
	            if (lastCaptchaLength == 6) {
	                _this.captcha = e.value;
	                //                    _this.beginTimer();
	                _this.$emit("onEnd", this.captcha);
	            }
	        },
	        //            点击验证框时使隐藏的input获取焦点；
	        getFocus: function getFocus() {
	            this.$refs['captchRef'].focus();
	        },
	        send: function send() {
	            this.$emit("onSend", this.captcha);
	        }

	    }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 79:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["captcha"]
	  }, [_c('div', {
	    staticClass: ["mobile-header"]
	  }, [_c('text', {
	    staticClass: ["mobile-title"]
	  }, [_vm._v(_vm._s(_vm.title))])]), _c('div', {
	    staticClass: ["content"]
	  }, [_c('div', {
	    staticStyle: {
	      flexDirection: "row"
	    }
	  }, [_c('text', {
	    staticClass: ["title"]
	  }, [_vm._v("我们已向")]), _c('text', {
	    staticClass: ["number"]
	  }, [_vm._v(_vm._s(_vm.tel))])]), _c('text', {
	    staticClass: ["title"]
	  }, [_vm._v("发送验证码短信，请查看短信并输入验证码")])]), _c('div', {
	    staticClass: ["flex-row", "inputTextBox", "mtb50"],
	    on: {
	      "click": function($event) {
	        _vm.getFocus()
	      }
	    }
	  }, [_c('input', {
	    ref: "captchRef",
	    staticClass: ["input"],
	    attrs: {
	      "type": "tel",
	      "maxlength": "6",
	      "autofocus": "true",
	      "value": (_vm.captcha)
	    },
	    on: {
	      "input": [function($event) {
	        _vm.captcha = $event.target.attr.value
	      }, _vm.captchaInput]
	    }
	  }), _vm._l((_vm.textList), function(item) {
	    return _c('div', {
	      staticClass: ["inputDiv"]
	    }, [_c('text', {
	      staticClass: ["inputText"]
	    }, [_vm._v(_vm._s(item))])])
	  })], 2), _c('div', {
	    staticClass: ["flex-center"]
	  }, [(_vm.retry) ? _c('text', {
	    staticClass: ["status", "primary"],
	    style: _vm.statusStyle(),
	    on: {
	      "click": function($event) {
	        _vm.send()
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.status))]) : _c('text', {
	    staticClass: ["status", "gray"],
	    style: _vm.statusStyle()
	  }, [_vm._v(" " + _vm._s(_vm.time) + "秒后重新发送 ")])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ })

/******/ });