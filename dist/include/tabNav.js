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
	__vue_styles__.push(__webpack_require__(124)
	)
	__vue_styles__.push(__webpack_require__(125)
	)

	/* script */
	__vue_exports__ = __webpack_require__(126)

	/* template */
	var __vue_template__ = __webpack_require__(127)
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
	__vue_options__.__file = "/Users/leistercheung/Documents/mopian/mp/src/include/tabNav.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-142f0937"
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

/***/ 124:
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

/***/ 125:
/***/ (function(module, exports) {

	module.exports = {
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
	    "borderBottomStyle": "solid",
	    "borderBottomColor": "#DCDCDC",
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

/***/ 126:
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

	var dom = weex.requireModule('dom');
	exports.default = {
	    data: function data() {
	        return {
	            corpusIndex: this.whichCorpus,
	            arrayList: this.corpusList
	        };
	    },
	    props: {
	        corpusList: { default: [] },
	        whichCorpus: { default: 0 }
	    },
	    methods: {
	        //            点击导航栏时
	        corpusChange: function corpusChange(index, id) {
	            var loca = index - 3;
	            if (loca < 0) {} else {
	                //                            控制顶部导航的滑动
	                var el = this.$refs['corpus' + loca][0];
	                dom.scrollToElement(el, { offset: 0 });
	            }
	            this.$emit('corpusChange', index);
	        }
	    }

	};
	module.exports = exports['default'];

/***/ }),

/***/ 127:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["corpusBox"]
	  }, [_c('scroller', {
	    staticClass: ["corpusScroll"],
	    attrs: {
	      "scrollDirection": "horizontal",
	      "showScrollbar": "false"
	    }
	  }, [_c('div', {
	    staticClass: ["articleClass"]
	  }, _vm._l((_vm.corpusList), function(item, index) {
	    return _c('text', {
	      ref: 'corpus' + index,
	      refInFor: true,
	      staticClass: ["allArticle"],
	      class: [_vm.whichCorpus == index && _vm.corpusList.length != 0 ? 'corpusActive' : 'noActive'],
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