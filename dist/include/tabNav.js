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
	__vue_styles__.push(__webpack_require__(120)
	)

	/* script */
	__vue_exports__ = __webpack_require__(121)

	/* template */
	var __vue_template__ = __webpack_require__(122)
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
	__vue_options__.__file = "/Users/ke/mopian/GitHubMoPian/mp/src/include/tabNav.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-61402e1c"
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

/***/ 120:
/***/ (function(module, exports) {

	module.exports = {
	  "active": {
	    "color": "#F0AD3C",
	    "borderColor": "#F0AD3C",
	    "borderStyle": "solid",
	    "borderBottomWidth": 4
	  },
	  "noActive": {
	    "borderBottomWidth": 0
	  },
	  "corpusBox": {
	    "flexDirection": "row",
	    "height": 80,
	    "borderBottomWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#DCDCDC",
	    "backgroundColor": "#ffffff"
	  },
	  "articleClass": {
	    "flexDirection": "row",
	    "paddingLeft": 10,
	    "borderBottomWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#DCDCDC",
	    "height": 80,
	    "backgroundColor": "#ffffff"
	  },
	  "allArticle": {
	    "fontSize": 29,
	    "lineHeight": 80,
	    "paddingLeft": 20,
	    "paddingRight": 20
	  },
	  "corpusScroll": {
	    "flexDirection": "row",
	    "width": 750
	  }
	}

/***/ }),

/***/ 121:
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
	        corpusList: { default: [{ id: 0, name: "你好" }, { id: 1, name: "支付宝" }, { id: 2, name: "钱包余额" }, { id: 2, name: "钱包余额" }, { id: 2, name: "钱包余额" }, { id: 2, name: "钱包余额" }, { id: 2, name: "钱包余额" }] },
	        whichCorpus: { default: 0 }
	    },
	    methods: {
	        corpusChange: function corpusChange(index, id) {
	            var _this = this;
	            _this.whichCorpus = index;
	        }
	    }

	};
	module.exports = exports["default"];

/***/ }),

/***/ 122:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["corpusBox"]
	  }, [_c('scroller', {
	    staticClass: ["corpusScroll"],
	    attrs: {
	      "scrollDirection": "horizontal"
	    }
	  }, [_c('div', {
	    staticClass: ["articleClass"]
	  }, _vm._l((_vm.corpusList), function(item, index) {
	    return _c('text', {
	      staticClass: ["allArticle"],
	      class: [_vm.whichCorpus == index ? 'active' : 'noActive'],
	      on: {
	        "click": function($event) {
	          _vm.corpusChange(index, item.id)
	        }
	      }
	    }, [_vm._v(_vm._s(item.name))])
	  }))])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ })

/******/ });