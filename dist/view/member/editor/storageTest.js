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
	__vue_styles__.push(__webpack_require__(211)
	)

	/* script */
	__vue_exports__ = __webpack_require__(212)

	/* template */
	var __vue_template__ = __webpack_require__(213)
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
	__vue_options__.__file = "/Users/ke/mopian/GitHubMoPian/mp/src/view/member/editor/storageTest.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-3e9e6893"
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

/***/ 211:
/***/ (function(module, exports) {

	module.exports = {}

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(193);

	var _stringify2 = _interopRequireDefault(_stringify);

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

	var storage = weex.requireModule('storage');
	var native = weex.requireModule('nativeModule');
	var modal = weex.requireModule('modal');
	var aSave = 9999;
	exports.default = {
	    data: function data() {
	        return {
	            saveMessage: '',
	            state: '',
	            stateEnd: '',
	            testData: [{
	                paraImage: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
	                paraText: '',
	                show: true
	            }]
	        };
	    },
	    created: function created() {
	        native.changeWindowsBar(true);
	    },

	    methods: {
	        testSetStorage: function testSetStorage() {
	            var _this = this;

	            //                存储对象时要将其先转成字符串，取出来时再转回对象
	            var s = (0, _stringify2.default)(this.testData);
	            storage.setItem('name', s, function (event) {
	                _this.state = 'set success';
	                console.log('set success');
	            });
	            storage.setItem('taaas', '123', function (event) {
	                _this.state = 'set success';
	                console.log('set success');
	            });
	        },
	        testGetStorage: function testGetStorage() {
	            var _this2 = this;

	            storage.getItem('name', function (event) {
	                console.log(event);
	                var a = JSON.parse(event.data);
	                _this2.stateEnd = 'get success';
	                console.log(a[0]);
	            });
	        },
	        //            读取缓存
	        getStorage: function getStorage() {
	            storage.getItem('name', function (event) {
	                var a = JSON.parse(event.data);
	                console.log(event);
	                console.log(a[0]);
	                if (event.result == 'success') {
	                    modal.toast({ message: a[0].paraImage, duration: 1 });
	                } else {
	                    modal.toast({ message: '失败', duration: 1 });
	                }
	            });
	        },

	        //            清除缓存
	        removeStorage: function removeStorage() {
	            storage.removeItem('name', function (event) {
	                modal.toast({ message: '删除成功', duration: 1 });
	            });
	        },

	        //            获取所有的缓存名s
	        getAll: function getAll() {
	            storage.getAllKeys(function (event) {
	                // modal.toast({ message: event.result })
	                if (event.result === 'success') {
	                    modal.toast({
	                        message: '所有: ' + event.data.join(', ')
	                    });
	                }
	            });
	        },
	        save: function save() {
	            var a = '果蔬汁';
	            aSave--;
	            this.saveMessage = '距离调试成功还有' + aSave + '次,加油吧 老铁。';
	            //                native.showToast("success");
	            native.save(1, 'nameAA', '你好AA', 1, '1', function () {
	                modal.toast({ message: '存入成功' });
	            });
	        },
	        find: function find() {
	            native.find(1, 'nameAA', function (data) {
	                modal.toast({ message: data });
	            });
	        },
	        findList: function findList() {
	            native.findList(1, '1', 'desc', function (data) {
	                modal.toast({ message: data });
	            });
	        }
	    }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 213:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('text', {
	    staticStyle: {
	      marginTop: "40px",
	      marginLeft: "40px"
	    },
	    on: {
	      "click": function($event) {
	        _vm.testSetStorage()
	      }
	    }
	  }, [_vm._v("Start")]), _c('text', [_vm._v(_vm._s(_vm.state))]), _c('text', {
	    staticStyle: {
	      marginTop: "40px",
	      marginLeft: "40px"
	    },
	    on: {
	      "click": function($event) {
	        _vm.testGetStorage()
	      }
	    }
	  }, [_vm._v("End")]), _c('text', [_vm._v(_vm._s(_vm.stateEnd))]), _c('text', {
	    staticStyle: {
	      marginTop: "140px",
	      marginLeft: "40px"
	    },
	    on: {
	      "click": function($event) {
	        _vm.getStorage()
	      }
	    }
	  }, [_vm._v("getStorage")]), _c('text', {
	    staticStyle: {
	      marginTop: "140px",
	      marginLeft: "40px"
	    },
	    on: {
	      "click": function($event) {
	        _vm.removeStorage()
	      }
	    }
	  }, [_vm._v("removeStorage")]), _c('text', {
	    staticStyle: {
	      marginTop: "140px",
	      marginLeft: "40px"
	    },
	    on: {
	      "click": function($event) {
	        _vm.getAll()
	      }
	    }
	  }, [_vm._v("getAllStorage")]), _c('text', [_vm._v("===============================")]), _c('text', {
	    staticStyle: {
	      marginTop: "100px",
	      marginLeft: "40px",
	      fontSize: "45px",
	      color: "peru"
	    },
	    on: {
	      "click": function($event) {
	        _vm.save()
	      }
	    }
	  }, [_vm._v("save " + _vm._s(_vm.saveMessage))]), _c('text', {
	    staticStyle: {
	      marginTop: "100px",
	      marginLeft: "40px",
	      fontSize: "55px",
	      color: "#afddff"
	    },
	    on: {
	      "click": function($event) {
	        _vm.find()
	      }
	    }
	  }, [_vm._v("find")]), _c('text', {
	    staticStyle: {
	      marginTop: "100px",
	      marginLeft: "40px",
	      fontSize: "55px",
	      color: "red"
	    },
	    on: {
	      "click": function($event) {
	        _vm.findList()
	      }
	    }
	  }, [_vm._v("findList")])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ })

/******/ });