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
	__vue_styles__.push(__webpack_require__(208)
	)

	/* script */
	__vue_exports__ = __webpack_require__(209)

	/* template */
	var __vue_template__ = __webpack_require__(210)
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
	__vue_options__.__file = "/Users/ke/mopian/GitHubMoPian/mp/src/view/member/editor/rsaTest.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-61943b50"
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

/***/ 208:
/***/ (function(module, exports) {

	module.exports = {}

/***/ }),

/***/ 209:
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


	var storage = weex.requireModule('storage');
	var modal = weex.requireModule('modal');
	var stream = weex.requireModule('stream');
	//    import JsEncrypt from 'jsencrypt/bin/jsencrypt'
	//    Vue.prototype.$jsEncrypt = JsEncrypt
	exports.default = {
	    data: function data() {
	        return {};
	    },
	    created: function created() {
	        //            let jse = new this.$jsEncrypt.JSEncrypt();
	        //            设置公钥
	        //            jse.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8ygMKjJLSUpnfXqt8lRSAdDxAHWKi9GbTFkCbAjkRCR6VUakxxXLXHQUtPCizKcvNpuYqZ5bO8LEgpY7SL3JEdEI9OuMnZ6ToeHPfcHeS+EgN0oYmdQ49RB5wZkcBEFk80OBEAM6VhnE0IuHGkU5ko9oPHq3boEQ3Ej6r3T+UhQIDAQAB');
	        //            let encrypted = jse.encrypt('Hello, world');
	        //            console.log('===');
	        //            console.log(encrypted);
	        //            设置秘钥
	        //            jse.setPrivateKey('MIICXgIBAAKBgQC8ygMKjJLSUpnfXqt8lRSAdDxAHWKi9GbTFkCbAjkRCR6VUakxxXLXHQUtPCizKcvNpuYqZ5bO8LEgpY7SL3JEdEI9OuMnZ6ToeHPfcHeS+EgN0oYmdQ49RB5wZkcBEFk80OBEAM6VhnE0IuHGkU5ko9oPHq3boEQ3Ej6r3T+UhQIDAQABAoGBAIO8JwEedHlE4FBovBsT4Bl+gmhu2NxC1NlpBq3jkDSd+3RQZlLvp6IJgwo8l13lxWv8kVF3tVkzxTW1sQJjz0RYShH8vXLl94gf6mFkJbeOPP6uA0mGDG81yINwKUpE0RM6ZM9yKEeVdK3u67TkEBcC6Td5KBl8Yof3q7qxiOWhAkEA4BXEtpnfhgm37s1VjDxdIHTtWL1PihMT+SCOqp+Vv27ABVrxtDW/w2R3ZzR5ezROI2v1DVhj5wvsxPGXx6OpSQJBANetVvazS/5SQNvb+Cmjw9Rt5NilyxfX5IsSswaIojbwhZY2FVZyAlFH9K/YS2FYFyU7iIqN6IIkOxXpOcj/bV0CQQCRYM4MgWuotClmfkSgBJGOew144uj1dUch+2NTgtFOLvXZA5WICs7sXwOwKzUdH2QKSwHitJOr0+q6ItsLpDwxAkBXzvDK+/CCmIZjfMkqWsxN3nf/ZHCtQm5/2Jsem94/M+mPYHGLgltDMGKEfTEjbrPtqrFKh8ATzCBqKUwncybZAkEAmVNW1dftWWoriZZXXMvfFkTDgYvRmytoVEThhnd0J/AOhZiUAs9+kHfGKivlTE209AY6Bw8aRzuTCziSwQhhBQ== ')
	        //            let decrypted = jse.decrypt(encrypted)
	        //            console.log("解密");
	        //            console.log(decrypted);
	    },

	    methods: {
	        streamTest: function streamTest(callback) {
	            return stream.fetch({
	                method: 'GET',
	                type: 'json',
	                url: 'http://weex.rzico.com/weex/common/public_key.jhtml'
	            }, callback);
	        },
	        getPublicKey: function getPublicKey() {
	            var _this = this;

	            this.streamTest(function (res) {
	                var jse = new _this.$jsEncrypt.JSEncrypt();
	                jse.setPublicKey(res.data.key);
	                var encrypted = jse.encrypt('Hello, world');
	                console.log(encrypted);
	            });
	        },
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
	        removeStorage: function removeStorage() {
	            storage.removeItem('name', function (event) {
	                modal.toast({ message: '删除成功', duration: 1 });
	            });
	        },
	        getAll: function getAll() {
	            storage.getAllKeys(function (event) {
	                // modal.toast({ message: event.result })
	                if (event.result === 'success') {
	                    modal.toast({
	                        message: 'props: ' + event.data.join(', ')
	                    });
	                }
	            });
	        }
	    }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 210:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticStyle: {
	      marginLeft: "80px",
	      marginTop: "80px"
	    }
	  }, [_c('text', {
	    staticStyle: {
	      marginTop: "40px",
	      marginLeft: "40px"
	    },
	    on: {
	      "click": function($event) {
	        _vm.getPublicKey()
	      }
	    }
	  }, [_vm._v("click Me")]), _c('text', {
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
	  }, [_vm._v("removeStorage")])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ })

/******/ });