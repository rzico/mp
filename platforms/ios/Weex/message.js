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
	__vue_styles__.push(__webpack_require__(60)
	)

	/* script */
	__vue_exports__ = __webpack_require__(61)

	/* template */
	var __vue_template__ = __webpack_require__(62)
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
	__vue_options__.__file = "/Users/ke/mopian/GitHubMoPian/mp/src/message/message.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-7701a51c"
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

/***/ 60:
/***/ (function(module, exports) {

	module.exports = {
	  "messageTotal": {
	    "backgroundColor": "#FF0000",
	    "lineHeight": 38,
	    "lines": 1,
	    "color": "#ffffff",
	    "width": 38,
	    "height": 38,
	    "textAlign": "center",
	    "borderRadius": 19,
	    "fontSize": 20,
	    "fontWeight": "700"
	  },
	  "newMessage": {
	    "position": "absolute",
	    "left": 95,
	    "top": 5,
	    "width": 60,
	    "alignItems": "center"
	  },
	  "messageTimeBox": {
	    "paddingTop": 8,
	    "flex": 2,
	    "alignItems": "flex-end",
	    "paddingRight": 10
	  },
	  "messageTime": {
	    "color": "#999999",
	    "fontSize": 24,
	    "lines": 1
	  },
	  "wrapper": {
	    "backgroundColor": "#ffffff"
	  },
	  "friendName": {
	    "lines": 1,
	    "textOverflow": "ellipsis",
	    "fontSize": 34
	  },
	  "messageText": {
	    "paddingTop": 8,
	    "paddingBottom": 8,
	    "flex": 4,
	    "height": 100,
	    "justifyContent": "space-between",
	    "marginLeft": 20
	  },
	  "friendMessage": {
	    "lines": 1,
	    "textOverflow": "ellipsis",
	    "color": "#999999",
	    "fontSize": 28
	  },
	  "friendsImageBox": {
	    "flex": 1
	  },
	  "friendsImage": {
	    "height": 100,
	    "width": 100
	  },
	  "friendsLine": {
	    "paddingLeft": 30,
	    "paddingRight": 20,
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "width": 750,
	    "backgroundColor": "#ffffff",
	    "flexDirection": "row",
	    "borderBottomWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "rgba(153,153,153,0.2)"
	  }
	}

/***/ }),

/***/ 61:
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

	exports.default = {
	    data: function data() {
	        return {
	            messageList: [{
	                friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                friendName: '信徒',
	                friendMessage: '怎么不回消息？',
	                messageTime: '10:07',
	                messageTotal: 99
	            }, {
	                friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                friendName: '霍建华',
	                friendMessage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXX',
	                messageTime: '11:08',
	                messageTotal: 17
	            }, {
	                friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                friendName: '胡歌',
	                friendMessage: '胡歌邀请你参加《琅琊榜2》的录制,点击链接即可报名！',
	                messageTime: '12:09',
	                messageTotal: 1
	            }, {
	                friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                friendName: 'Famous、库',
	                friendMessage: '哈哈哈，好无聊',
	                messageTime: '昨天',
	                messageTotal: ''
	            }, {
	                friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                friendName: '陈小春',
	                friendMessage: '',
	                messageTime: '12:07',
	                messageTotal: ''
	            }, {
	                friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                friendName: '番茄',
	                friendMessage: '炒蛋吗？',
	                messageTime: '9月8日',
	                messageTotal: '1'
	            }, {
	                friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                friendName: '豪客来',
	                friendMessage: '秋天，又到了吃货的季节。快上库鲁子网挑选吧！',
	                messageTime: '2016年9月8日',
	                messageTotal: '1'
	            }, {
	                friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                friendName: '中国有嘻哈',
	                friendMessage: '你会freestyle吗？',
	                messageTime: '昨天',
	                messageTotal: ''
	            }, {
	                friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                friendName: '那英',
	                friendMessage: '！',
	                messageTime: '昨天',
	                messageTotal: ''
	            }, {
	                friendImage: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
	                friendName: '中国新歌声',
	                friendMessage: '',
	                messageTime: '昨天',
	                messageTotal: ''
	            }]
	        };
	    },
	    methods: {
	        jump: function jump(page) {}
	    }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 62:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('list', {
	    staticClass: ["wrapper"]
	  }, _vm._l((_vm.messageList), function(item) {
	    return _c('cell', {
	      appendAsTree: true,
	      attrs: {
	        "append": "tree"
	      }
	    }, [_c('div', {
	      staticClass: ["friendsLine"],
	      on: {
	        "click": function($event) {
	          _vm.jump('/member')
	        }
	      }
	    }, [_c('div', {
	      staticClass: ["friendsImageBox"]
	    }, [_c('image', {
	      staticClass: ["friendsImage"],
	      attrs: {
	        "src": item.friendImage
	      }
	    })]), (item.messageTotal != '') ? _c('div', {
	      staticClass: ["newMessage"]
	    }, [_c('text', {
	      staticClass: ["messageTotal"]
	    }, [_vm._v(_vm._s(item.messageTotal))])]) : _vm._e(), _c('div', {
	      staticClass: ["messageText"]
	    }, [_c('text', {
	      staticClass: ["friendName"]
	    }, [_vm._v(_vm._s(item.friendName))]), _c('text', {
	      staticClass: ["friendMessage"]
	    }, [_vm._v(_vm._s(item.friendMessage))])]), _c('div', {
	      staticClass: ["messageTimeBox"]
	    }, [_c('text', {
	      staticClass: ["messageTime"]
	    }, [_vm._v(_vm._s(item.messageTime))])])])])
	  }))
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ })

/******/ });