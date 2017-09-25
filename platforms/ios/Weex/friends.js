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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(4)
	)

	/* script */
	__vue_exports__ = __webpack_require__(5)

	/* template */
	var __vue_template__ = __webpack_require__(7)
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
	__vue_options__.__file = "/Users/ke/mopian/GitHubMoPian/mp/src/friends/friends.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-212c648e"
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
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

	module.exports = {
	  "letterList": {
	    "color": "#494949",
	    "fontSize": 29
	  },
	  "friendTotalBox": {
	    "width": 750,
	    "alignItems": "center",
	    "paddingTop": 40,
	    "paddingBottom": 40,
	    "backgroundColor": "#F2F3F8"
	  },
	  "friendTotalText": {
	    "fontSize": 34,
	    "color": "#888888"
	  },
	  "letterOnPress": {
	    "backgroundColor": "#B3B2B3"
	  },
	  "letterNavBox": {
	    "position": "absolute",
	    "right": 0,
	    "width": 50,
	    "top": 0,
	    "bottom": 0,
	    "paddingBottom": 15,
	    "paddingTop": 30,
	    "alignItems": "center"
	  },
	  "letterNav": {
	    "flex": 1
	  },
	  "friendsName": {
	    "height": 90,
	    "marginTop": 15,
	    "justifyContent": "space-between"
	  },
	  "letterBox": {
	    "width": 750,
	    "paddingLeft": 30,
	    "paddingTop": 5,
	    "paddingBottom": 5,
	    "backgroundColor": "#e8e8e8"
	  },
	  "addBorder": {
	    "borderBottomWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "rgba(153,153,153,0.5)"
	  },
	  "nameLetter": {
	    "color": "#888888",
	    "fontSize": 24
	  },
	  "realName": {
	    "color": "#888888",
	    "fontSize": 30,
	    "marginLeft": 20
	  },
	  "friendsImage": {
	    "marginTop": 20,
	    "height": 80,
	    "width": 80
	  },
	  "addFriendsBorder": {
	    "borderBottomWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "rgba(153,153,153,0.2)"
	  },
	  "friendsLine": {
	    "paddingLeft": 30,
	    "height": 120,
	    "width": 680,
	    "backgroundColor": "#ffffff",
	    "flexDirection": "row"
	  },
	  "listBody": {
	    "backgroundColor": "#ffffff"
	  },
	  "topLine": {
	    "flexDirection": "row",
	    "width": 680,
	    "paddingTop": 20,
	    "paddingBottom": 20,
	    "paddingLeft": 30,
	    "alignItems": "center",
	    "backgroundColor": "#ffffff"
	  },
	  "lineImage": {
	    "width": 80,
	    "height": 80
	  },
	  "lineTitle": {
	    "fontSize": 34,
	    "marginLeft": 20
	  }
	}

/***/ }),
/* 5 */
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
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
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
	var dom = weex.requireModule('dom');
	var pressPoint = -1; //手指按压
	var movePoint; //手机按压后移动
	var pointPoor; //手机按压时与移动后的字母数量
	var moveLetter; //移动后的字母
	var beforePointPoor = -1; //前一次手机按压时与移动后的字母数量
	exports.default = {
	    data: function data() {
	        return {
	            isPress: false,
	            friendTotal: 43,
	            topLineList: [{
	                lineImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                lineTitle: '新的朋友'
	            }, {
	                lineImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                lineTitle: '我的粉丝'
	            }, {
	                lineImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                lineTitle: '功能1'
	            }, {
	                lineImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                lineTitle: '功能2'
	            }],
	            friendsList: [{
	                letter: 'A',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'B',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '大咖秀',
	                    realName: '王龙'
	                }]
	            }, {
	                letter: 'C',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'D',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'E',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'F',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'H',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'J',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'K',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'L',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'M',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'N',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'O',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'P',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'Q',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'R',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'S',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'T',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'W',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'X',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'Y',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: 'Z',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '番茄',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '炒蛋',
	                    realName: '杨彩铃'
	                }]
	            }, {
	                letter: '#',
	                name: [{
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '19',
	                    realName: '炒茄子'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '2333',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '455',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '639',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '455',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '639',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '455',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '639',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '455',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '639',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '455',
	                    realName: '杨彩铃'
	                }, {
	                    friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                    friendName: '639',
	                    realName: '杨彩铃'
	                }]
	            }],
	            allLetter: ['||', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']
	        };
	    },
	    mixins: [myMixin],
	    methods: {
	        jump: function jump(vueName) {
	            //                this.$router.push(vueName);
	        },
	        jumpPage: function jumpPage(event) {
	            //                var url = this.$getConfig().bundleUrl;  //獲取當前a.we頁面的路徑(xxx/a.js)
	            //                url = url.split('/').slice(0,-1).join('/') + '/app.weex.js';  //獲取b.we編譯後的b.js的相對路徑
	            //                navigator.push({
	            //                    url: url,
	            //                    animated: true
	            //                }, event => {
	            //                    modal.toast({ message: 'callback:' + event });
	            //                })
	            this.$router.back();
	        },
	        onlongpress: function onlongpress(count) {
	            modal.toast({ message: this.allLetter[count], duration: 0.3 });
	            this.isPress = true;
	        },
	        ontouchstart: function ontouchstart(count) {
	            if (count == 0) {
	                //判断是否点击回到顶部
	                var el = this.$refs.linkref[count]; //跳转到相应的cell
	                dom.scrollToElement(el, {
	                    animated: false
	                });
	            } else {
	                for (var i = 0; i < this.friendsList.length; i++) {
	                    //循环判断是否有相应首字母的朋友
	                    if (this.friendsList[i].letter == this.allLetter[count]) {
	                        var _el = this.$refs.listref[i]; //跳转到相应的cell
	                        dom.scrollToElement(_el, {
	                            animated: false
	                        });
	                    }
	                }
	            }
	            modal.toast({ message: this.allLetter[count], duration: 0.3 });
	            this.isPress = true;
	        },
	        ontouchend: function ontouchend() {
	            this.isPress = false;
	            pressPoint = -1; //重置判断是否刚开始滑动的标志符（可以不用，点击并长按时已经帮忙弥补了该数据的漏洞）
	            beforePointPoor == -1; //（可以不用，点击并长按时已经帮忙弥补了该数据的漏洞）
	        },
	        //        ==============================
	        ontouchmove: function ontouchmove(count, event) {
	            //按住字母导航栏并拖动时触发
	            if (pressPoint == -1) {
	                //记录每次第一次滑动按压的点
	                pressPoint = event.changedTouches[0].pageY;
	            } else {
	                movePoint = Math.abs(pressPoint - event.changedTouches[0].pageY); //求移动的距离(绝对值)
	                if (movePoint > 35) {
	                    pointPoor = Math.floor(movePoint / 35); //通过偏移量获取上移的字母数量
	                    if (!(beforePointPoor == -1 || beforePointPoor == pointPoor)) {
	                        if (pressPoint - event.changedTouches[0].pageY >= 0) {
	                            moveLetter = count - pointPoor; //获取目前手指停留的字母下标
	                        } else {
	                            moveLetter = count + pointPoor; //获取目前手指停留的字母
	                        }
	                        for (var i = 0; i < this.friendsList.length; i++) {
	                            //循环判断是否有相应首字母的朋友
	                            if (this.friendsList[i].letter == this.allLetter[moveLetter]) {
	                                var el = this.$refs.listref[i]; //跳转到相应的cell
	                                dom.scrollToElement(el, {
	                                    animated: false

	                                });
	                            } else if (moveLetter == 0) {
	                                //判断是否滑到 顶部按钮
	                                var _el2 = this.$refs.linkref[moveLetter]; //跳转到相应的cell
	                                dom.scrollToElement(_el2, {
	                                    animated: false
	                                });
	                            }
	                        }
	                        modal.toast({ message: this.allLetter[moveLetter], duration: 0.001 }); //弹出提示框toast
	                    }
	                    beforePointPoor = pointPoor; //把这次的滑动的字母数量保存起来
	                }
	            }
	        }

	    }
	};
	module.exports = exports['default'];

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('list', {
	    staticClass: ["listBody"]
	  }, [_c('cell', {
	    appendAsTree: true,
	    attrs: {
	      "append": "tree"
	    }
	  }, [_c('text', [_vm._v(_vm._s(_vm.testText))])]), _vm._l((_vm.topLineList), function(item) {
	    return _c('cell', {
	      ref: "linkref",
	      refInFor: true,
	      appendAsTree: true,
	      attrs: {
	        "append": "tree"
	      }
	    }, [_c('div', {
	      staticClass: ["addBorder"]
	    }, [_c('div', {
	      staticClass: ["topLine"],
	      on: {
	        "click": function($event) {
	          _vm.jump('/member')
	        }
	      }
	    }, [_c('image', {
	      staticClass: ["lineImage"],
	      attrs: {
	        "src": item.lineImage
	      }
	    }), _c('text', {
	      staticClass: ["lineTitle"]
	    }, [_vm._v(_vm._s(item.lineTitle))])])])])
	  }), _vm._l((_vm.friendsList), function(friend) {
	    return _c('cell', {
	      ref: "listref",
	      refInFor: true,
	      appendAsTree: true,
	      attrs: {
	        "append": "tree"
	      }
	    }, [_c('div', {
	      staticClass: ["letterBox"]
	    }, [_c('text', {
	      staticClass: ["nameLetter"]
	    }, [_vm._v(_vm._s(friend.letter))])]), _vm._l((friend.name), function(item) {
	      return _c('div', [_c('div', {
	        staticClass: ["addFriendsBorder"]
	      }, [_c('div', {
	        staticClass: ["friendsLine"],
	        on: {
	          "click": function($event) {
	            _vm.jump('/member')
	          }
	        }
	      }, [_c('image', {
	        staticClass: ["friendsImage"],
	        attrs: {
	          "src": item.friendImage
	        }
	      }), _c('div', {
	        staticClass: ["friendsName"]
	      }, [_c('text', {
	        staticClass: ["lineTitle"]
	      }, [_vm._v(_vm._s(item.friendName))]), _c('text', {
	        staticClass: ["realName"]
	      }, [_vm._v("真实姓名:" + _vm._s(item.realName))])])])])])
	    })], 2)
	  }), _c('cell', {
	    appendAsTree: true,
	    attrs: {
	      "append": "tree"
	    }
	  }, [_c('div', {
	    staticClass: ["friendTotalBox"]
	  }, [_c('text', {
	    staticClass: ["friendTotalText"]
	  }, [_vm._v(_vm._s(_vm.friendTotal) + "个朋友")])])])], 2), _c('div', {
	    staticClass: ["letterNavBox"],
	    class: [_vm.isPress ? 'letterOnPress' : '']
	  }, _vm._l((_vm.allLetter), function(item, index) {
	    return _c('div', {
	      staticClass: ["letterNav"],
	      on: {
	        "longpress": function($event) {
	          _vm.onlongpress(index)
	        },
	        "touchstart": function($event) {
	          _vm.ontouchstart(index)
	        },
	        "touchend": function($event) {
	          _vm.ontouchend()
	        },
	        "touchmove": function($event) {
	          _vm.ontouchmove(index, $event)
	        }
	      }
	    }, [_c('text', {
	      staticClass: ["letterList"]
	    }, [_vm._v(_vm._s(item))])])
	  }))])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ })
/******/ ]);