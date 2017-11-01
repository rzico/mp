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
	__vue_styles__.push(__webpack_require__(196)
	)

	/* script */
	__vue_exports__ = __webpack_require__(197)

	/* template */
	var __vue_template__ = __webpack_require__(199)
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
	__vue_options__.__file = "/Users/ke/mopian/GitHubMoPian/mp/src/view/member/editor/music.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-1edec78b"
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

/***/ 196:
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

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _navbar = __webpack_require__(126);

	var _navbar2 = _interopRequireDefault(_navbar);

	var _utils = __webpack_require__(78);

	var _utils2 = _interopRequireDefault(_utils);

	var _music = __webpack_require__(198);

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
	            console.log(musicId);
	            chooseMusicId = musicId;
	            chooseMusicName = musicName;
	            if (lastTickItem == -1 || lastTickItem == item) {
	                item.tickShow = true;
	            } else {
	                lastTickItem.tickShow = false;
	                item.tickShow = !item.tickShow;
	            }
	            lastTickItem = item;
	            modal.toast({ message: item, duration: 1 });
	            this.noMusicShow = false;
	        },
	        //            返回
	        goback: function goback() {
	            event.closeURL();
	        },
	        //            完成
	        goComplete: function goComplete() {
	            var E = {
	                chooseMusicId: chooseMusicId,
	                chooseMusicName: chooseMusicName
	            };
	            var backData = _utils2.default.message('success', '成功', E);
	            event.closeURL(backData);
	        }
	    }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 198:
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

/***/ 199:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('navbar', {
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