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
	__vue_styles__.push(__webpack_require__(40)
	)

	/* script */
	__vue_exports__ = __webpack_require__(41)

	/* template */
	var __vue_template__ = __webpack_require__(42)
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

/***/ 9:
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

/***/ 10:
/***/ (function(module, exports) {

	module.exports = {
	  "back": {
	    "position": "relative",
	    "width": 96,
	    "height": 96,
	    "alignItems": "center"
	  },
	  "image": {
	    "fontSize": 44,
	    "width": 44,
	    "height": 44,
	    "top": 25,
	    "color": "#ffffff"
	  },
	  "nav": {
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "title": {
	    "fontFamily": "Verdana, Geneva, sans-serif",
	    "fontSize": 38,
	    "lineHeight": 38,
	    "color": "#FFFFFF"
	  }
	}

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

	"use strict";

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

	var native = weex.requireModule('wxNativeModule');
       var event = weex.requireModule('event');
	exports.default = {
	    props: {
	        title: { default: "navbar" }
	    },
	    created: function created() {
	        var domModule = weex.requireModule("dom");
	        domModule.addRule('fontFace', {
	            'fontFamily': 'iconfont',
	            'src': "url('http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf')"
	        });
	    },

	    methods: {
	        goback: function goback(e) {
//	            this.$emit('goBack');
       event.closeURL();
	        }
	    }
	};
	module.exports = exports["default"];

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["header"]
	  }, [_c('div', {
	    staticClass: ["back"],
	    on: {
	      "click": function($event) {
	        _vm.goback('/')
	      }
	    }
	  }, [_c('text', {
	    staticClass: ["image"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])]), _c('div', {
	    staticClass: ["nav"]
	  }, [_c('text', {
	    staticClass: ["title"]
	  }, [_vm._v(_vm._s(_vm.title))])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(9)
	)
	__vue_styles__.push(__webpack_require__(10)
	)

	/* script */
	__vue_exports__ = __webpack_require__(11)

	/* template */
	var __vue_template__ = __webpack_require__(12)
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

/***/ 40:
/***/ (function(module, exports) {

	module.exports = {
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
	    "top": 5
	  },
	  "downArrow": {
	    "bottom": 5
	  },
	  "rightArrow": {
	    "position": "absolute",
	    "right": 10
	  },
	  "paraClose": {
	    "position": "absolute",
	    "top": 5,
	    "left": 5
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
	    "left": 25
	  },
	  "bottomBtn": {
	    "position": "absolute",
	    "bottom": 20,
	    "color": "#666666",
	    "borderRadius": 10,
	    "fontSize": 27,
	    "paddingBottom": 5,
	    "paddingRight": 10,
	    "paddingLeft": 10,
	    "paddingTop": 5,
	    "backgroundColor": "#ffffff"
	  },
	  "addMusic": {
	    "left": 25
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

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _navbar = __webpack_require__(27);

	var _navbar2 = _interopRequireDefault(_navbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var album = weex.requireModule('albumModule'); //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
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
	var lastIndex = -1;
	exports.default = {
	    data: function data() {
	        return {
	            refreshing: false,
	            firstPlusShow: true,
	            coverImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	            setTitle: '点击设置标题',
	            addMusic: '添加音乐',
	            paraList: [{
	                paraImage: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
	                paraText: '',
	                show: true
	            }, { paraImage: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg',
	                paraText: '2',
	                show: true }]
	        };
	    },

	    components: {
	        navbar: _navbar2.default
	    },
	    props: {
	        title: { default: "编辑" }
	    },
	    //       多选图片
	    created: function created() {
	        //      调用安卓的相册
	        var _this = this;
	        album.openAlbumMuti(
	        //选完图片后触发回调函数
	        function (data) {
	            //                    data.data里存放的是用户选取的图片路径
	            for (var i = 0; i < data.data.length; i++) {
	                _this.paraList.push({
	                    paraImage: data.data[i].thumbnailSmallPath,
	                    paraText: '',
	                    show: true
	                });
	                //                        获取小缩略图
	                //                        _this.paraList[i].paraImage = data.data[i].thumbnailSmallPath;
	            }
	        });
	    },
	    mounted: function mounted() {
	        var domModule = weex.requireModule("dom");
	        domModule.addRule('fontFace', {
	            'fontFamily': 'iconfont',
	            'src': "url('http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf')"
	        });
	    },
	    methods: {
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
	            //                this.paraList.forEach(function(item){
	            //                    if(item.show == false){
	            //                        item.show = !item.show;
	            //                    }
	            //                });
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
	            //         方法1       定义一个中转值保存当前元素内容
	            //                let transit = this.paraList[index];
	            //                Vue.set(this.paraList,index,this.paraList[index - 1]);
	            //                Vue.set(this.paraList,index - 1,transit);


	            //         方法2
	            var a = this.paraList[index].paraImage;
	            var b = this.paraList[index].paraText;
	            this.paraList[index].paraImage = this.paraList[index - 1].paraImage;
	            this.paraList[index].paraText = this.paraList[index - 1].paraText;
	            this.paraList[index - 1].paraImage = a;
	            this.paraList[index - 1].paraText = b;
	            //         方法3
	            ////                将内容保存
	            //                let upContent = this.paraList[index];
	            ////                将内容删掉
	            //                this.paraList.splice(index,1);
	            ////                再将删掉的内容插入
	            ////                setTimeout(()=>{
	            //                    this.paraList.splice(index - 1,0,upContent);
	            ////                },300)
	        },
	        //            下箭头
	        moveBottom: function moveBottom(index) {
	            this.firstPlusShow = true;
	            if (lastIndex != -1) {
	                this.paraList[lastIndex].show = true;
	                lastIndex = -1;
	            }

	            //             方法1  定义一个中转值保存当前元素内容
	            //                let transit = this.paraList[index];
	            //                Vue.set(this.paraList,index,this.paraList[index + 1]);
	            //                Vue.set(this.paraList,index + 1,transit);

	            //         方法2
	            var a = this.paraList[index].paraImage;
	            var b = this.paraList[index].paraText;
	            this.paraList[index].paraImage = this.paraList[index + 1].paraImage;
	            this.paraList[index].paraText = this.paraList[index + 1].paraText;
	            this.paraList[index + 1].paraImage = a;
	            this.paraList[index + 1].paraText = b;

	            ////           方法3     将内容保存
	            //                let upContent = this.paraList[index];
	            ////                将内容删掉
	            //                this.paraList.splice(index,1);
	            ////                再将删掉的内容插入
	            ////                setTimeout(()=>{
	            //                    this.paraList.splice(index + 1,0,upContent);
	            ////                },300)
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
	                        //                将内容删掉
	                        _this.paraList.splice(index, 1);
	                    }
	                });
	            }
	        },
	        //            编辑段落图片
	        editParaImage: function editParaImage(imgSrc, index) {
	            var _this = this;
	            album.openCrop(imgSrc, function (data) {
	                _this.paraList[index].paraImage = data;
	            });
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
	        }
	    }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 42:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('navbar', {
	    attrs: {
	      "title": _vm.title
	    },
	    on: {
	      "goback": _vm.goback
	    }
	  }), _c('list', {
	    staticClass: ["wrapperBox"]
	  }, [_c('refresh', {
	    staticClass: ["refresh"],
	    attrs: {
	      "display": _vm.refreshing ? 'show' : 'hide'
	    },
	    on: {
	      "refresh": _vm.onrefresh,
	      "pullingdown": _vm.onpullingdown
	    }
	  }), _c('cell', {
	    appendAsTree: true,
	    attrs: {
	      "append": "tree"
	    }
	  }, [_c('div', [_c('image', {
	    staticClass: ["coverImage"],
	    attrs: {
	      "src": _vm.coverImage
	    }
	  }), _c('div', {
	    staticClass: ["coverMaskImage"]
	  }), _c('text', {
	    staticClass: ["setTitle"]
	  }, [_vm._v(_vm._s(_vm.setTitle))]), _c('text', {
	    staticClass: ["bottomBtn", "addMusic"]
	  }, [_vm._v(_vm._s(_vm.addMusic))]), _c('text', {
	    staticClass: ["bottomBtn", "editCover"],
	    on: {
	      "click": function($event) {
	        _vm.addCover()
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
	    staticClass: ["addIconBox"]
	  }, [_c('text', {
	    staticClass: ["addText", "iconSize"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")])]), _c('div', {
	    staticClass: ["addIconBox"]
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
	      key: item,
	      staticClass: ["paraTransitionDiv"]
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
	        "src": item.paraImage
	      },
	      on: {
	        "click": function($event) {
	          _vm.editParaImage(item.paraImage, index)
	        }
	      }
	    })]), _c('div', {
	      staticClass: ["paraText"]
	    }, [(item.paraText != '') ? _c('text', {
	      staticClass: ["paraTextSize"]
	    }, [_vm._v(_vm._s(item.paraText))]) : _c('text', {
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
	      staticClass: ["addIconBox"]
	    }, [_c('text', {
	      staticClass: ["addText", "iconSize"],
	      style: {
	        fontFamily: 'iconfont'
	      }
	    }, [_vm._v("")])]), _c('div', {
	      staticClass: ["addIconBox"]
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
	  }, [_c('div', {
	    staticClass: ["paraBox", "flexRow"]
	  }, [_c('text', {
	    staticClass: ["addVote", "addVoteIcon"],
	    style: {
	      fontFamily: 'iconfont'
	    }
	  }, [_vm._v("")]), _c('text', {
	    staticClass: ["addVote"]
	  }, [_vm._v("添加投票")])])]), _vm._m(0)], 1)], 1)
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
