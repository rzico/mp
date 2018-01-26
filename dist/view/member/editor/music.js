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
	__vue_styles__.push(__webpack_require__(271)
	)

	/* script */
	__vue_exports__ = __webpack_require__(272)

	/* template */
	var __vue_template__ = __webpack_require__(274)
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
	__vue_options__.__file = "/Users/leistercheung/Documents/mopian/mp/src/view/member/editor/music.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-b62bd4e0"
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

/***/ 95:
/***/ (function(module, exports) {

	module.exports = {
	  "cb": {
	    "borderBottomWidth": 0
	  },
	  "navRightBox": {
	    "minWidth": 92,
	    "height": 92,
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "nav_bg": {
	    "width": 750,
	    "height": 156,
	    "backgroundSize": "cover",
	    "position": "absolute",
	    "top": 0
	  },
	  "nav_ico": {
	    "fontSize": 38,
	    "color": "#ffffff",
	    "marginTop": 2
	  },
	  "nav_CompleteIcon": {
	    "paddingLeft": 27,
	    "paddingRight": 27,
	    "fontSize": 44,
	    "lineHeight": 44,
	    "color": "#FFFFFF"
	  },
	  "nav_Complete": {
	    "paddingLeft": 27,
	    "paddingRight": 27
	  }
	}

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(71);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    props: {
	        title: { default: "navbar" },
	        complete: { default: '' },
	        showComplete: { default: true },
	        border: { default: true }
	    },
	    methods: {
	        classHeader: function classHeader() {
	            var dc = _utils2.default.device();

	            return dc;
	        },
	        goback: function goback(e) {
	            this.$emit('goback');
	        },
	        goComplete: function goComplete(e) {
	            this.$emit('goComplete');
	        }
	    }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	module.exports = exports['default'];

/***/ }),

/***/ 97:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["header"],
	    class: [_vm.classHeader(), _vm.border == true ? '' : 'cb']
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
	  }, [_vm._v(_vm._s(_vm.title))]), (_vm.showComplete) ? _c('div', {
	    staticClass: ["navRightBox"],
	    on: {
	      "click": function($event) {
	        _vm.goComplete('/')
	      }
	    }
	  }, [(_vm.complete != 'textIcon') ? _c('text', {
	    staticClass: ["nav_Complete", "nav_title"]
	  }, [_vm._v(_vm._s(_vm.complete))]) : _c('text', {
	    staticClass: ["nav_CompleteIcon"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])]) : _vm._e()])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }),

/***/ 131:
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
	__vue_options__.__file = "/Users/leistercheung/Documents/mopian/mp/src/include/navbar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-cc5bb20e"
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

/***/ 271:
/***/ (function(module, exports) {

	module.exports = {
	  "nameStyle": {
	    "width": 600,
	    "color": "#888888"
	  },
	  "@TRANSITION": {
	    "paraTransition-enter-active": {
	      "duration": 50
	    },
	    "paraTransition-leave-active": {
	      "duration": 50
	    }
	  },
	  "paraTransition-leave-to": {
	    "transform": "translateY(-50px)",
	    "opacity": 0
	  },
	  "paraTransition-enter": {
	    "transform": "translateY(-50px)",
	    "opacity": 0
	  },
	  "paraTransition-enter-to": {
	    "transform": "translateY(0px)",
	    "opacity": 1
	  },
	  "musicTotal": {
	    "color": "#999999",
	    "fontSize": 24,
	    "paddingTop": 5
	  },
	  "noMusicBorder": {
	    "flexDirection": "row",
	    "justifyContent": "space-between",
	    "paddingRight": 25
	  },
	  "addBorder": {
	    "flexDirection": "row",
	    "justifyContent": "space-between",
	    "paddingBottom": 25,
	    "paddingTop": 25,
	    "paddingRight": 25,
	    "borderTopWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#DCDCDC"
	  },
	  "musicNameBox": {
	    "width": 725,
	    "marginLeft": 25
	  },
	  "musicName": {
	    "fontSize": 33,
	    "color": "#4E4F51"
	  },
	  "musicGather": {
	    "paddingBottom": 5,
	    "fontSize": 38,
	    "color": "#4E4F51"
	  },
	  "musicTitleBox": {
	    "paddingTop": 25,
	    "paddingBottom": 25,
	    "paddingLeft": 25,
	    "width": 750
	  },
	  "musicLine": {
	    "backgroundColor": "#ffffff",
	    "marginBottom": 15
	  },
	  "noMusic": {
	    "marginTop": 15,
	    "marginBottom": 15,
	    "backgroundColor": "#ffffff",
	    "paddingBottom": 30,
	    "paddingTop": 30
	  },
	  "wrapperBox": {
	    "backgroundColor": "#EFF0F5"
	  }
	}

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _navbar = __webpack_require__(131);

	var _navbar2 = _interopRequireDefault(_navbar);

	var _utils = __webpack_require__(71);

	var _utils2 = _interopRequireDefault(_utils);

	var _music = __webpack_require__(273);

	var _music2 = _interopRequireDefault(_music);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var event = weex.requireModule('event'); //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var audio = weex.requireModule('audio');
	var dom = weex.requireModule('dom');
	var modal = weex.requireModule('modal');
	var lastIndex = -1;
	var lastTickItem = -1;
	var chooseMusicId = -1;
	var chooseMusicName = '';
	exports.default = {
	    data: function data() {
	        return {
	            show: false,
	            noMusicShow: true,
	            musicList: ''
	        };
	    },
	    components: {
	        navbar: _navbar2.default
	    },
	    props: {
	        title: { default: "音乐设置" },
	        complete: { default: "完成" }
	    },
	    created: function created() {
	        _utils2.default.initIconFont();
	        //            js里导入音乐列表
	        this.musicList = _music2.default;
	        //            bundleUrl = new String(bundleUrl);
	        //            modal.toast({message:bundleUrl,duration:1})
	        var _this = this;
	        //            取当前页面rul，将musicId取出来
	        var bundleUrl = this.$getConfig().bundleUrl;
	        var getVal = bundleUrl.split('?')[1];
	        var op = getVal.split('=');
	        if (op[0] == 'musicId') {
	            chooseMusicId = op[1];
	            //                如果已添加音乐 则遍历数组
	            if (chooseMusicId != -1) {
	                _this.musicList.forEach(function (item) {
	                    item.musicNameList.forEach(function (itemChild) {
	                        if (itemChild.musicId == chooseMusicId) {
	                            itemChild.tickShow = true;
	                            _this.noMusicShow = false;
	                            item.show = true;
	                            lastTickItem = itemChild;
	                            chooseMusicName = itemChild.musicName;
	                        }
	                    });
	                });
	            }
	        }
	    },
	    methods: {
	        //            在页面销毁时触发，可用来捕捉安卓的回退
	        viewdisappear: function viewdisappear() {
	            audio.stop();
	        },
	        //            点击显示音乐文集列表
	        showMusic: function showMusic(index) {
	            var _this2 = this;

	            if (lastIndex == -1 || lastIndex == index) {
	                this.musicList[index].show = !this.musicList[index].show;
	                //                    if(lastIndex == -1){
	                //                    滚动到相应的行。就是将当前选中的歌集置顶
	                //                        setTimeout(()=>{
	                //                            const el = this.$refs.musicref[index]//跳转到相应的cell
	                //                            dom.scrollToElement(el, {
	                //                                animated:true
	                //                            })
	                //                        },50)
	                //                    }
	            } else {
	                this.musicList[lastIndex].show = false;
	                setTimeout(function () {
	                    _this2.musicList[index].show = !_this2.musicList[index].show;
	                }, 50);
	                //                    滚动到相应的行。就是将当前选中的歌集置顶
	                //                    setTimeout(()=>{
	                //                        const el = this.$refs.musicref[index]//跳转到相应的cell
	                //                        dom.scrollToElement(el, {
	                //                            animated:true
	                //                        })
	                //                    },50)
	            }
	            lastIndex = index;
	        },
	        //            点击隐藏音乐文集列表(无背景音乐)
	        hiddenMusic: function hiddenMusic() {
	            audio.stop();
	            if (lastIndex != -1) {
	                this.musicList[lastIndex].show = false;
	            }
	            this.noMusicShow = !this.noMusicShow;
	            lastTickItem.tickShow = false;
	            chooseMusicId = -1;
	            chooseMusicName = '';
	        },
	        //            点击歌名添加 "选中" 的字体图标
	        ctrlTick: function ctrlTick(item, musicId, musicName) {
	            chooseMusicId = musicId;
	            chooseMusicName = musicName;
	            //                播放音乐
	            audio.play(_utils2.default.remote('resources/music/' + musicId + '.mp3'));
	            if (lastTickItem == -1 || lastTickItem == item) {
	                item.tickShow = true;
	            } else {
	                lastTickItem.tickShow = false;
	                item.tickShow = !item.tickShow;
	            }
	            lastTickItem = item;
	            //                modal.toast({message:item,duration:1});
	            this.noMusicShow = false;
	        },
	        //            返回
	        goback: function goback() {
	            audio.stop();
	            event.closeURL();
	        },
	        //            完成
	        goComplete: function goComplete() {
	            var E = {
	                chooseMusicId: chooseMusicId,
	                chooseMusicName: chooseMusicName
	            };
	            audio.stop();
	            var backData = _utils2.default.message('success', '成功', E);
	            event.closeURL(backData);
	        }
	    }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 273:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var musicList = [{
	    musicGather: '父亲节音乐背景',
	    musicTotal: 7,
	    show: false,
	    musicNameList: [{
	        musicName: '纯音乐 - 旋律',
	        tickShow: false,
	        musicId: '0101'
	    }, {
	        musicName: '父亲    纯音乐',
	        tickShow: false,
	        musicId: '0102'
	    }, {
	        musicName: '父亲致辞背景纯音乐',
	        tickShow: false,
	        musicId: '0103'
	    }, {
	        musicName: '给父母敬茶背景音乐',
	        tickShow: false,
	        musicId: '0104'
	    }, {
	        musicName: '龚_ - 父亲',
	        tickShow: false,
	        musicId: '0105'
	    }, {
	        musicName: '筷子兄弟 - 父亲音乐',
	        tickShow: false,
	        musicId: '0106'
	    }, {
	        musicName: '刘和刚 - 父亲',
	        tickShow: false,
	        musicId: '0107'
	    }]
	}, {
	    musicGather: '母亲节音乐背景',
	    musicTotal: 3,
	    show: false,
	    musicNameList: [{
	        musicName: '音乐 - 母亲颂',
	        tickShow: false,
	        musicId: '0201'
	    }, {
	        musicName: '朗诵纯音乐',
	        tickShow: false,
	        musicId: '0202'
	    }, {
	        musicName: '世上只有妈妈好  童音',
	        tickShow: false,
	        musicId: '0203'
	    }]
	}, {
	    musicGather: '儿童音乐背景',
	    musicTotal: 15,
	    show: false,
	    musicNameList: [{
	        musicName: '拔萝卜 (纯音乐)',
	        tickShow: false,
	        musicId: '0301'
	    }, {
	        musicName: '虫儿飞  歌曲',
	        tickShow: false,
	        musicId: '0302'
	    }, {
	        musicName: '春天在哪里 (纯音乐)',
	        tickShow: false,
	        musicId: '0303'
	    }, {
	        musicName: '纯音乐 - 儿童进行曲',
	        tickShow: false,
	        musicId: '0304'
	    }, {
	        musicName: '快乐的节日 (纯音乐)',
	        tickShow: false,
	        musicId: '0305'
	    }, {
	        musicName: '劳动最光荣 (纯音乐)',
	        tickShow: false,
	        musicId: '0306'
	    }, {
	        musicName: '两只老虎 (纯音乐版',
	        tickShow: false,
	        musicId: '0307'
	    }, {
	        musicName: '林妙可 - 歌唱祖国',
	        tickShow: false,
	        musicId: '0308'
	    }, {
	        musicName: '送别 (纯音乐)',
	        tickShow: false,
	        musicId: '0309'
	    }, {
	        musicName: '小白兔乖乖 (纯音乐)',
	        tickShow: false,
	        musicId: '0310'
	    }, {
	        musicName: '小蜜蜂 (纯音乐)慢',
	        tickShow: false,
	        musicId: '0311'
	    }, {
	        musicName: '小小粉刷匠 (纯音乐慢',
	        tickShow: false,
	        musicId: '0312'
	    }, {
	        musicName: '小星星 (纯音乐)慢',
	        tickShow: false,
	        musicId: '0313'
	    }, {
	        musicName: '小燕子 (纯音慢',
	        tickShow: false,
	        musicId: '0314'
	    }, {
	        musicName: '英文字母歌 (纯音乐)',
	        tickShow: false,
	        musicId: '0315'
	    }]
	}, {
	    musicGather: '欢快音乐背景',
	    musicTotal: 9,
	    show: false,
	    musicNameList: [{
	        musicName: '采蘑菇的小姑娘 (纯音乐)',
	        tickShow: false,
	        musicId: '0401'
	    }, {
	        musicName: '纯音乐 - 欢快的小鸟',
	        tickShow: false,
	        musicId: '0402'
	    }, {
	        musicName: '纯音乐 - 轻快音乐',
	        tickShow: false,
	        musicId: '0403'
	    }, {
	        musicName: '纯音乐 - 喜庆的氛围背景音乐',
	        tickShow: false,
	        musicId: '0404'
	    }, {
	        musicName: '胡伟立 - 纯音乐',
	        tickShow: false,
	        musicId: '0405'
	    }, {
	        musicName: '极品家丁 - 纯音乐',
	        tickShow: false,
	        musicId: '0406'
	    }, {
	        musicName: '熊出没 - 纯音乐',
	        tickShow: false,
	        musicId: '0407'
	    }, {
	        musicName: '血色浪漫 纯 音乐',
	        tickShow: false,
	        musicId: '0408'
	    }, {
	        musicName: '猪八戒背媳妇 (纯音乐)',
	        tickShow: false,
	        musicId: '0409'
	    }]
	}, {
	    musicGather: '激情音乐背景',
	    musicTotal: 7,
	    show: false,
	    musicNameList: [{
	        musicName: '纯音乐 - 激昂背景音乐',
	        tickShow: false,
	        musicId: '0501'
	    }, {
	        musicName: '纯音乐 - 激昂背景音乐',
	        tickShow: false,
	        musicId: '0502'
	    }, {
	        musicName: '非常大气紧张激烈的背景音乐',
	        tickShow: false,
	        musicId: '0503'
	    }, {
	        musicName: '火影忍者 - 纯音乐',
	        tickShow: false,
	        musicId: '0504'
	    }, {
	        musicName: '境界大气- 纯音乐',
	        tickShow: false,
	        musicId: '0505'
	    }, {
	        musicName: '网络歌手 - 纯音乐',
	        tickShow: false,
	        musicId: '0506'
	    }, {
	        musicName: '音乐 - 重鼓',
	        tickShow: false,
	        musicId: '0507'
	    }]
	}, {
	    musicGather: '情景音乐背景',
	    musicTotal: 8,
	    show: false,
	    musicNameList: [{
	        musicName: '纯音乐 - 下雨声',
	        tickShow: false,
	        musicId: '0601'
	    }, {
	        musicName: '大话西游插曲',
	        tickShow: false,
	        musicId: '0602'
	    }, {
	        musicName: '龚_ - 十五的月亮',
	        tickShow: false,
	        musicId: '0603'
	    }, {
	        musicName: '梦幻西游 - 背景音乐',
	        tickShow: false,
	        musicId: '0604'
	    }, {
	        musicName: '生日快乐歌 (纯音乐)',
	        tickShow: false,
	        musicId: '0605'
	    }, {
	        musicName: '汤灿 - 祝福祖国',
	        tickShow: false,
	        musicId: '0606'
	    }, {
	        musicName: '音乐 - 婚礼开场旁白',
	        tickShow: false,
	        musicId: '0607'
	    }, {
	        musicName: '音乐 - 英雄本色',
	        tickShow: false,
	        musicId: '0608'
	    }]
	}, {
	    musicGather: '圣诞节音乐背景',
	    musicTotal: 4,
	    show: false,
	    musicNameList: [{
	        musicName: 'children\'s christmas favorites - Jingle Bells (Album Version)',
	        tickShow: false,
	        musicId: '0701'
	    }, {
	        musicName: 'children\'s christmas favorites - We Wish You A Merry Christmas (Album Version)',
	        tickShow: false,
	        musicId: '0702'
	    }, {
	        musicName: 'Jingle Bells (纯音乐)',
	        tickShow: false,
	        musicId: '0703'
	    }, {
	        musicName: 'Jingle Bells (DJ版)圣诞',
	        tickShow: false,
	        musicId: '0704'
	    }]
	}, {
	    musicGather: '新年音乐背景',
	    musicTotal: 8,
	    show: false,
	    musicNameList: [{
	        musicName: '背景音乐 - 过年 ',
	        tickShow: false,
	        musicId: '0801'
	    }, {
	        musicName: '过年了 (佳音版)',
	        tickShow: false,
	        musicId: '0802'
	    }, {
	        musicName: '齐来你家拜年+恭喜发财',
	        tickShow: false,
	        musicId: '0803'
	    }, {
	        musicName: '喜气洋洋共贺新年',
	        tickShow: false,
	        musicId: '0804'
	    }, {
	        musicName: '卓依婷 - 情人拜年 纯音乐',
	        tickShow: false,
	        musicId: '0805'
	    }]
	}, {
	    musicGather: '优美音乐背景',
	    musicTotal: 11,
	    show: false,
	    musicNameList: [{
	        musicName: 'Song Cry Girlz、',
	        tickShow: false,
	        musicId: '0901'
	    }, {
	        musicName: '艾乐乐的罗曼蒂克 -音乐',
	        tickShow: false,
	        musicId: '0902'
	    }, {
	        musicName: '纯音乐 - 背景音乐',
	        tickShow: false,
	        musicId: '0903'
	    }, {
	        musicName: '纯音乐 - 感人肺腑',
	        tickShow: false,
	        musicId: '0904'
	    }, {
	        musicName: '琴之乐 - 纯音乐',
	        tickShow: false,
	        musicId: '0905'
	    }, {
	        musicName: '旅游风光 - 纯音乐',
	        tickShow: false,
	        musicId: '0906'
	    }, {
	        musicName: '心静 - 纯音乐',
	        tickShow: false,
	        musicId: '0907'
	    }, {
	        musicName: '优雅音乐 纯 音乐',
	        tickShow: false,
	        musicId: '0908'
	    }, {
	        musicName: '月光下的凤尾竹 (葫芦丝) (纯音乐)',
	        tickShow: false,
	        musicId: '0909'
	    }, {
	        musicName: '旅游 纯 音乐',
	        tickShow: false,
	        musicId: '0910'
	    }, {
	        musicName: '在水一方口哨 纯音乐',
	        tickShow: false,
	        musicId: '0911'
	    }]
	}, {
	    musicGather: '忧伤音乐背景',
	    musicTotal: 3,
	    show: false,
	    musicNameList: [{
	        musicName: '心情伤感背景音乐 纯音乐',
	        tickShow: false,
	        musicId: '1001'
	    }, {
	        musicName: '犬夜叉 - 背景音乐 (哼唱版)',
	        tickShow: false,
	        musicId: '1002'
	    }, {
	        musicName: '纯音乐 - 蝶恋花',
	        tickShow: false,
	        musicId: '1003'
	    }]
	}, {
	    musicGather: '另类音乐背景',
	    musicTotal: 3,
	    show: false,
	    musicNameList: [{
	        musicName: '纯音乐 - 恐怖背景音乐 ',
	        tickShow: false,
	        musicId: '1101'
	    }, {
	        musicName: '纯音乐 - 令人紧张背景音乐',
	        tickShow: false,
	        musicId: '1102'
	    }, {
	        musicName: '音乐 - 生化危机',
	        tickShow: false,
	        musicId: '1103'
	    }]
	}];

	exports.default = musicList;
	module.exports = exports['default'];

/***/ }),

/***/ 274:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["wrapper"],
	    on: {
	      "viewdisappear": function($event) {
	        _vm.viewdisappear()
	      }
	    }
	  }, [_c('navbar', {
	    attrs: {
	      "title": _vm.title,
	      "complete": _vm.complete
	    },
	    on: {
	      "goback": _vm.goback,
	      "goComplete": _vm.goComplete
	    }
	  }), _c('list', {
	    staticClass: ["wrapperBox"]
	  }, [_c('cell', {
	    appendAsTree: true,
	    attrs: {
	      "append": "tree"
	    }
	  }, [_c('div', {
	    staticClass: ["musicTitleBox", "noMusic"],
	    on: {
	      "click": function($event) {
	        _vm.hiddenMusic()
	      }
	    }
	  }, [_c('div', {
	    staticClass: ["noMusicBorder"]
	  }, [_c('text', {
	    staticClass: ["musicName"]
	  }, [_vm._v("无背景音乐")]), (_vm.noMusicShow) ? _c('text', {
	    staticClass: ["musicName"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")]) : _vm._e()])])]), _vm._l((_vm.musicList), function(music, index) {
	    return _c('cell', {
	      ref: "musicref",
	      refInFor: true,
	      appendAsTree: true,
	      attrs: {
	        "append": "tree"
	      }
	    }, [_c('div', {
	      staticClass: ["musicLine"]
	    }, [_c('div', {
	      staticClass: ["musicTitleBox"],
	      on: {
	        "click": function($event) {
	          _vm.showMusic(index)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["musicGather"]
	    }, [_vm._v(_vm._s(music.musicGather))]), _c('text', {
	      staticClass: ["musicTotal"]
	    }, [_vm._v(_vm._s(music.musicTotal) + "首")])]), _c('transition-group', {
	      attrs: {
	        "name": "paraTransition",
	        "tag": "div"
	      }
	    }, [(music.show) ? _c('div', {
	      key: "musicBox",
	      staticClass: ["musicNameBox"]
	    }, _vm._l((music.musicNameList), function(item, tickIndex) {
	      return _c('div', {
	        staticClass: ["addBorder"],
	        on: {
	          "click": function($event) {
	            _vm.ctrlTick(item, item.musicId, item.musicName)
	          }
	        }
	      }, [_c('text', {
	        staticClass: ["musicName", "nameStyle"]
	      }, [_vm._v(_vm._s(item.musicName))]), (item.tickShow) ? _c('text', {
	        staticClass: ["musicName"],
	        style: {
	          fontFamily: 'iconfont'
	        }
	      }, [_vm._v("")]) : _vm._e()])
	    })) : _vm._e()])], 1)])
	  })], 2)], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ })

/******/ });