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

	'use strict';

	var _utils = __webpack_require__(71);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//时间格式化 今天 昨天 前天  年月日
	Vue.filter('daydayfmt', function (value) {
	    var res = _utils2.default.resolvetimefmt(value);
	    var tds = _utils2.default.resolvetimefmt(Math.round(new Date().getTime()));

	    var d1 = Date.parse(_utils2.default.ymdtimefmt(value));
	    var d2 = Date.parse(_utils2.default.ymdtimefmt(Math.round(new Date().getTime())));
	    var span = Math.abs(d2 - d1);
	    var daySub = Math.floor(span / (24 * 3600 * 1000));

	    if (daySub < 1) {
	        return "今天";
	    } else if (daySub < 2) {
	        return "昨天";
	    } else if (daySub < 3) {
	        return "前天";
	    } else {
	        return res.y + '年' + res.m + '月' + res.d + '日';
	    }
	});

	//时间格式化 今天 近三天 近七天  七天前
	Vue.filter('dayfmt', function (value) {
	    var res = _utils2.default.resolvetimefmt(value);
	    var tds = _utils2.default.resolvetimefmt(Math.round(new Date().getTime()));

	    var d1 = Date.parse(_utils2.default.ymdtimefmt(value));
	    var d2 = Date.parse(_utils2.default.ymdtimefmt(Math.round(new Date().getTime())));
	    var span = Math.abs(d2 - d1);
	    var daySub = Math.floor(span / (24 * 3600 * 1000));
	    if (daySub < 1) {
	        return "今天";
	    }
	    if (daySub < 3) {
	        return "近三天";
	    }
	    if (daySub < 7) {
	        return "近七天";
	    }
	    return "七天前";
	});
	// 时间格式化 10:30 昨天 前天 2017年09月01日 09月01日
	Vue.filter('timefmt', function (value) {
	    var res = _utils2.default.resolvetimefmt(value);
	    var tds = _utils2.default.resolvetimefmt(Math.round(new Date().getTime()));

	    var d1 = Date.parse(_utils2.default.ymdtimefmt(value));
	    var d2 = Date.parse(_utils2.default.ymdtimefmt(Math.round(new Date().getTime())));
	    var span = Math.abs(d2 - d1);
	    var daySub = Math.floor(span / (24 * 3600 * 1000));
	    if (daySub < 1) {
	        return res.h + ":" + res.i;
	    }
	    if (daySub < 2) {
	        return "昨天";
	    }
	    if (daySub < 3) {
	        return "前天";
	    }
	    if (res.y == tds.y) {
	        return res.m + '月' + res.d + '日';
	    } else {
	        return res.y + '年' + res.m + '月' + res.d + '日';
	    }
	});

	// 时间格式化  2017年09月01日 09月01日
	Vue.filter('ymdtimefmt', function (value) {
	    var res = _utils2.default.resolvetimefmt(value);
	    var tds = _utils2.default.resolvetimefmt(Math.round(new Date().getTime()));
	    if (res.y == tds.y) {
	        return res.m + '月' + res.d + '日';
	    } else {
	        return res.y + '年' + res.m + '月' + res.d + '日';
	    }
	});

	// 时间格式化 10:30 昨天10:30  2017年09月01日10:30 09月01日10:30
	Vue.filter('timefmtMore', function (value) {
	    var res = _utils2.default.resolvetimefmt(value);
	    var tds = _utils2.default.resolvetimefmt(Math.round(new Date().getTime()));

	    var d1 = Date.parse(_utils2.default.ymdtimefmt(value));
	    var d2 = Date.parse(_utils2.default.ymdtimefmt(Math.round(new Date().getTime())));
	    var span = Math.abs(d2 - d1);
	    var daySub = Math.floor(span / (24 * 3600 * 1000));
	    if (daySub < 1) {
	        return res.h + ":" + res.i;
	    }
	    if (daySub < 2) {
	        return "昨天" + ' ' + res.h + ":" + res.i;
	    }
	    if (res.y == tds.y) {
	        return res.m + '月' + res.d + '日' + ' ' + res.h + ":" + res.i;
	    } else {
	        return res.y + '年' + res.m + '月' + res.d + '日' + ' ' + res.h + ":" + res.i;
	    }
	});

	// 时间格式化 10:30 昨天 前天 2017-09-01 09-01
	Vue.filter('timefmtOther', function (value) {
	    var res = _utils2.default.resolvetimefmt(value);
	    var tds = _utils2.default.resolvetimefmt(Math.round(new Date().getTime()));

	    var d1 = Date.parse(_utils2.default.ymdtimefmt(value));
	    var d2 = Date.parse(_utils2.default.ymdtimefmt(Math.round(new Date().getTime())));
	    var span = Math.abs(d2 - d1);
	    var daySub = Math.floor(span / (24 * 3600 * 1000));
	    if (daySub < 1) {
	        return res.h + ":" + res.i;
	    }
	    if (daySub < 2) {
	        return "昨天";
	    }
	    if (daySub < 3) {
	        return "前天";
	    }
	    //如果是今年 就不返回年份
	    if (res.y == tds.y) {
	        return res.m + '-' + res.d;
	    } else {
	        return res.y + '-' + res.m + '-' + res.d;
	    }
	});

	// 时间格式化  2017-09-01
	Vue.filter('timeDatefmt', function (value) {
	    if (_utils2.default.isNull(value)) {
	        return value;
	    }
	    var res = _utils2.default.resolvetimefmt(value);
	    return res.y + '-' + res.m + '-' + res.d;
	});

	//时间格式化 返回 2017-09-30 03:07:56
	Vue.filter('timeDatefmtMinutes', function (value) {
	    var res = _utils2.default.resolvetimefmt(value);
	    var tds = _utils2.default.resolvetimefmt(Math.round(new Date().getTime()));

	    return res.y + '-' + res.m + '-' + res.d + '  ' + res.h + ':' + res.i + ':' + res.s;
	});

	//月份格式化 本月 上月 2..12月  2016年1月..
	Vue.filter('monthfmt', function (value) {
	    var res = _utils2.default.resolvetimefmt(value);
	    var tds = _utils2.default.resolvetimefmt(Math.round(new Date().getTime()));

	    var m = tds.m - res.m;
	    var y = tds.y - tds.y;
	    if (y < 1 && m < 1) {
	        return "本月";
	    }
	    if (y < 1 && m < 2) {
	        return "上月";
	    }
	    if (y < 1) {
	        return res.m + "月";
	    }
	    return res.y + "年" + res.m + "月";
	});

	//2017-01-01
	Vue.filter('datefmt', function (value) {
	    var res = _utils2.default.resolvetimefmt(value);
	    return res.y + "年" + res.m + "月" + res.d + "日";
	});

	//返回月份 7 8 9 单数字
	Vue.filter('detailMonth', function (value) {
	    var res = _utils2.default.resolvetimefmt(value);
	    return res.m;
	});

	//时间格式化 返回 09-30 03:07
	Vue.filter('datetimefmt', function (value) {

	    var res = _utils2.default.resolvetimefmt(value);
	    var tds = _utils2.default.resolvetimefmt(Math.round(new Date().getTime()));

	    //如果是今年 就不返回年份
	    if (res.y == tds.y) {
	        return res.m + '-' + res.d + '  ' + res.h + ':' + res.i;
	    } else {
	        return res.y + '-' + res.m + '-' + res.d + '  ' + res.h + ':' + res.i;
	    }
	});

	//时间格式化 返回 09-30 03:07
	Vue.filter('ydfmt', function (value) {

	    var res = _utils2.default.resolvetimefmt(value);

	    return res.m + '-' + res.d;
	});

	//时间格式化 返回 09-30 03:07:56 2017-09-30 03:07:56
	Vue.filter('datemoretimefmt', function (value) {
	    var res = _utils2.default.resolvetimefmt(value);
	    var tds = _utils2.default.resolvetimefmt(Math.round(new Date().getTime()));

	    //如果是今年 就不返回年份
	    if (res.y == tds.y) {
	        return res.m + '-' + res.d + '  ' + res.h + ':' + res.i + ':' + res.s;
	    } else {
	        return res.y + '-' + res.m + '-' + res.d + '  ' + res.h + ':' + res.i + ':' + res.s;
	    }
	});
	//时间格式化 返回 09-30 03:07周日 2017-09-30 03:07周日
	Vue.filter('dateweektimefmt', function (value) {
	    var res = _utils2.default.resolvetimefmt(value);
	    var tds = _utils2.default.resolvetimefmt(Math.round(new Date().getTime()));
	    // 返回处理后的值
	    var date = new Date(value);
	    var d2 = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
	    date = new Date(d2 + 28800000);
	    var day = date.getUTCDay();
	    switch (day) {
	        case 0:
	            day = "周日";
	            break;
	        case 1:
	            day = "周一";
	            break;
	        case 2:
	            day = "周二";
	            break;
	        case 3:
	            day = "周三";
	            break;
	        case 4:
	            day = "周四";
	            break;
	        case 5:
	            day = "周五";
	            break;
	        case 6:
	            day = "周六";
	            break;
	    }

	    //如果是今年 就不返回年份
	    if (res.y == tds.y) {
	        return res.m + '-' + res.d + '  ' + res.h + ':' + res.i + day;
	    } else {
	        return res.y + '-' + res.m + '-' + res.d + '  ' + res.h + ':' + res.i + day;
	    }
	});
	//时间格式化 返回 03:07
	Vue.filter('hitimefmt', function (value) {
	    var res = _utils2.default.resolvetimefmt(value);
	    return res.h + ':' + res.i;
	});

	//金额保留两位小数点
	Vue.filter('currencyfmt', function (value) {
	    if (value == '' || value == null || value == undefined) {
	        return value;
	    }
	    // 返回处理后的值
	    if (value != null) {
	        value = parseFloat(value);
	        if (value == 0 || value == '0') {
	            return '0.00';
	        } else {
	            var price = (Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2);
	            return price;
	        }
	    }
	});

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(72);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by zwwill on 2017/8/27.
	 */
	var modal = weex.requireModule('modal');
	var resLocateURL = 'file://';
	var resRemoteURL = 'http://cdn.rzico.com/weex/';
	var websiteURL = 'https://small.rzico.com';
	var event = weex.requireModule('event');
	var _debug = false; //删掉该属性时请查找该页所有debug变量并删除变量
	var appName = 'yundian'; // app类型  water 或 yundian
	var utilsFunc = {
	    //0 标准版 1生鲜版 2桶装水
	    version: 2,
	    xmid: 43,
	    // app类型
	    appType: function appType() {
	        return appName;
	    },
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
	        if (value == null || value == 'null' || value == undefined || value == '' || value == 'undefined') {
	            return true;
	        } else {
	            return false;
	        }
	    },

	    //把缩略图过滤为原图
	    filterThumbnail: function filterThumbnail(url) {

	        if (this.isNull(url)) {
	            return url;
	        }
	        if (url.indexOf('?x-oss-') != -1) {
	            url = url.substring(0, url.indexOf('?x-oss-'));
	        } else if (url.indexOf('@') != -1) {
	            url = url.substring(0, url.indexOf('@'));
	        }
	        return url;
	    },

	    //获取缩略图
	    thumbnail: function thumbnail(url, w, h) {
	        if (this.isNull(url)) {
	            return url;
	        }
	        //获取屏幕宽度计算得出比例
	        var proportion = weex.config.env.deviceWidth / 750;
	        //                获取缩略图的宽高
	        w = parseInt(w * proportion);
	        h = parseInt(h * proportion);
	        if (url.substring(0, 11) == "http://cdnx") {
	            return url + "?x-oss-process=image/resize,m_fill,w_" + w + ",h_" + h + "";
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

	    //模糊图片，r, s  为 1-50，超大超模糊
	    blur: function blur(url, r, s) {
	        if (this.isNull(url)) {
	            return url;
	        }
	        if (url.substring(0, 10) == "http://cdn") {
	            return url + "@" + r + "-" + s + "bl";
	        } else {
	            return url;
	        }
	    },

	    //获取文章URL地址
	    articleUrl: function articleUrl(template, id) {
	        template = template == '' ? 't1001' : template;
	        var d = new Date();
	        return websiteURL + "/#/" + template + "?id=" + id + '&noticstr=' + d.getTime();
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

	    //    将过长的字符串换成 XXX...格式 默认取前7个字符
	    changeStrLast: function changeStrLast(value, length, maxLength) {
	        length = this.isNull(length) ? 7 : length;
	        maxLength = this.isNull(maxLength) ? 16 : maxLength;
	        //              如果用户名称过长，便截取拼成名字
	        if (this.getLength(value) > maxLength) {
	            value = value.substr(0, length) + '...';
	        }
	        return value;
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


	    //    登录主页的轮播图slider控制
	    indexMtSlider: function indexMtSlider() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'IPhoneX') {
	                return 'indexSliderMtIPhoneX';
	            } else if (this.isIosSystem()) {
	                return 'indexSliderMtIPhone';
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

	    //   新会员首页 专栏 顶部信息栏
	    topicInfo: function topicInfo() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'memberBox';
	            } else if (s == 'IPhoneX') {
	                return 'memberBoxIPHONEX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //   新会员首页 专栏 顶部粉丝栏
	    topicFans: function topicFans() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'fansBox';
	            } else if (s == 'IPhoneX') {
	                return 'fansBoxIPHONEX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //   新会员首页 专栏 顶部操作栏
	    topicOperation: function topicOperation() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'operationBox';
	            } else if (s == 'IPhoneX') {
	                return 'operationBoxIPHONEX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //判断设备型号
	    getHeaderHeight: function getHeaderHeight() {
	        var s = weex.config.env.deviceModel;
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s.indexOf("10,3") > 0 || s.indexOf("10,6") > 0) {
	                return 156;
	            } else {
	                return 136;
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
	                return 'headerBox';
	            } else if (s == 'IPhoneX') {
	                return 'headerBoxIPHONEX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //    判断设备型号为fix定位的元素添加高度 (会员首页 作者专栏 顶部设置跟返回按钮)
	    topicBgImg: function topicBgImg() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'topicBgImg';
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
	    //    控制preview文章box的top
	    artOutTop: function artOutTop() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return "";
	        } else {
	            if (s == 'V1') {
	                return 'artOutBoxTopV1';
	            } else if (s == 'IPhoneX') {
	                return 'artOutBoxTopIPhoneX';
	            } else {
	                return s;
	            }
	        }
	    },
	    //    控制预览文章页底部栏的bottom高度
	    previewBottom: function previewBottom() {
	        var s = this.device();
	        if (this.isNull(s)) {
	            return '';
	        } else {
	            if (s == 'IPhoneX') {
	                return s;
	            } else {
	                return '';
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
	        if (this.isNull(value)) {
	            return value;
	        }
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
	    resolvetime: function resolvetime(value) {
	        if (this.isNull(value)) {
	            return value;
	        }
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
	    resolveTimeObj: function resolveTimeObj(obj) {
	        return new Date(obj.y, obj.m - 1, obj.d).getTime();
	    },
	    // 点击一次增加一月
	    incMonth: function incMonth(date) {
	        var obj = this.resolvetime(date);
	        // 必须转为整型，否则快速点击会出现问题
	        obj.m = parseInt(obj.m);
	        obj.y = parseInt(obj.y);
	        if (obj.m >= 12) {
	            obj.y = obj.y + 1;
	            obj.m = 1;
	        } else {
	            obj.m = obj.m + 1;
	        }

	        return this.resolveTimeObj(obj);
	    },
	    // 点击一次减一月
	    decMonth: function decMonth(date) {
	        var obj = this.resolvetime(date);
	        // 必须转为整型，否则快速点击会出现问题
	        obj.m = parseInt(obj.m);
	        obj.y = parseInt(obj.y);
	        if (obj.m <= 1) {
	            obj.y = obj.y - 1;
	            obj.m = 12;
	        } else {
	            obj.m = obj.m - 1;
	        }
	        return this.resolveTimeObj(obj);
	    },
	    trunceDate: function trunceDate(date) {
	        var obj = this.resolvetime(date);

	        obj.d = 1;
	        obj.h = 0;
	        obj.i = 0;
	        obj.s = 0;
	        return this.resolveTimeObj(obj);
	    },
	    trunceMonth: function trunceMonth(date) {
	        var obj = this.resolvetime(date);
	        obj.m = 1;
	        obj.d = 1;
	        obj.h = 0;
	        obj.i = 0;
	        obj.s = 0;
	        return this.resolveTimeObj(obj);
	    },
	    // 减一天
	    decDate: function decDate(date) {

	        return (date / 1000 - 86400) * 1000;
	    },
	    // 增一天
	    incDate: function incDate(date) {

	        return (date / 1000 + 86400) * 1000;
	    },
	    // 点击一次减一年
	    decYears: function decYears(date) {
	        var obj = this.resolvetime(date);

	        // 必须要先转为整型，否者快速操作时会出错
	        obj.y = obj.y - 1;

	        return this.resolveTimeObj(obj);
	    },
	    // 点击一次增加一年
	    incYears: function incYears(date) {
	        var obj = this.resolvetime(date);
	        // 必须要先转为整型，否者快速操作时会出错
	        obj.y = obj.y + 1;

	        return this.resolveTimeObj(obj);
	    },
	    //返回格式 2017-09-01
	    ymdtimefmt: function ymdtimefmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        var timeObj = this.resolvetimefmt(value);
	        var d = (0, _stringify2.default)(timeObj);
	        return timeObj.y + '-' + timeObj.m + '-' + timeObj.d;
	    },
	    //返回格式 2017-09
	    ymtimefmt: function ymtimefmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        var timeObj = this.resolvetimefmt(value);
	        return timeObj.y + '-' + timeObj.m;
	    },
	    //返回格式 2017
	    ytimefmt: function ytimefmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        var timeObj = this.resolvetimefmt(value);
	        return timeObj.y;
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
	    },
	    //过滤表情
	    filteremoji: function filteremoji(text, type) {
	        var ranges = ['\uD83C[\uDF00-\uDFFF]', '\uD83D[\uDC00-\uDE4F]', '\uD83D[\uDE80-\uDEFF]'];
	        text = text.replace(new RegExp(ranges.join('|'), 'g'), '');
	        if (this.isNull(text) && type == 'article') {
	            return '点击设置标题';
	        }
	        return text;
	    },

	    //金额保留两位小数点
	    currencyfmt: function currencyfmt(value) {
	        if (value == '' || value == null || value == undefined) {
	            return value;
	        }
	        // 返回处理后的值
	        if (value != null) {
	            if (value == 0) {
	                return value.toFixed(2);
	            } else {
	                var price = (Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2);
	                return price;
	            }
	        }
	    }
	};

	exports.default = utilsFunc;
	module.exports = exports['default'];

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(12);
	var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
	module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};


/***/ })

/******/ });