// { "framework": "Vue" }
/******/ (function(modules) { // webpackBootstrap
/******/     // The module cache
/******/     var installedModules = {};
          
/******/     // The require function
/******/     function __webpack_require__(moduleId) {
          
/******/         // Check if module is in cache
/******/         if(installedModules[moduleId])
/******/             return installedModules[moduleId].exports;
          
/******/         // Create a new module (and put it into the cache)
/******/         var module = installedModules[moduleId] = {
/******/             exports: {},
/******/             id: moduleId,
/******/             loaded: false
/******/         };
          
/******/         // Execute the module function
/******/         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
          
/******/         // Flag the module as loaded
/******/         module.loaded = true;
          
/******/         // Return the exports of the module
/******/         return module.exports;
/******/     }
          
          
/******/     // expose the modules object (__webpack_modules__)
/******/     __webpack_require__.m = modules;
          
/******/     // expose the module cache
/******/     __webpack_require__.c = installedModules;
          
/******/     // __webpack_public_path__
/******/     __webpack_require__.p = "";
          
/******/     // Load entry module and return exports
/******/     return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {
       
       var __vue_exports__, __vue_options__
       var __vue_styles__ = []
       
       /* styles */
       __vue_styles__.push(__webpack_require__(1)
                           )
       
       /* script */
       __vue_exports__ = __webpack_require__(2)
       
       /* template */
       var __vue_template__ = __webpack_require__(8)
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
/* 1 */
/***/ (function(module, exports) {
       
       module.exports = {
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {
       
       'use strict';
       
       Object.defineProperty(exports, "__esModule", {
                             value: true
                             });
       
       var _navbar = __webpack_require__(3);
       
       var _navbar2 = _interopRequireDefault(_navbar);
       
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
       musicList: [{
                   musicGather: '教师节音乐选集',
                   musicTotal: 3,
                   show: false,
                   musicNameList: [{
                                   musicName: '每当我走过老师窗前',
                                   tickShow: false,
                                   musicId: 43
                                   }, {
                                   musicName: '长大后我就成了你',
                                   tickShow: false,
                                   musicId: 53
                                   }, {
                                   musicName: '感恩的心',
                                   tickShow: false,
                                   musicId: 63
                                   }]
                   }, {
                   musicGather: '教师节音乐选集',
                   musicTotal: 3,
                   show: false,
                   musicNameList: [{
                                   musicName: '每当我走过老师窗前',
                                   tickShow: false,
                                   musicId: 1222
                                   }, {
                                   musicName: '长大后我就成了你',
                                   tickShow: false,
                                   musicId: 2111
                                   }, {
                                   musicName: '感恩的心',
                                   tickShow: false,
                                   musicId: 3112
                                   }]
                   }, {
                   musicGather: '教师节音乐选集',
                   musicTotal: 3,
                   show: false,
                   musicNameList: [{
                                   musicName: '每当我走过老师窗前',
                                   tickShow: false,
                                   musicId: 315
                                   }, {
                                   musicName: '长大后我就成了你',
                                   tickShow: false,
                                   musicId: 314
                                   }, {
                                   musicName: '感恩的心',
                                   tickShow: false,
                                   musicId: 313
                                   }]
                   }, {
                   musicGather: '教师节音乐选集',
                   musicTotal: 3,
                   show: false,
                   musicNameList: [{
                                   musicName: '每当我走过老师窗前',
                                   tickShow: false,
                                   musicId: 312
                                   }, {
                                   musicName: '长大后我就成了你',
                                   tickShow: false,
                                   musicId: 311
                                   }, {
                                   musicName: '感恩的心',
                                   tickShow: false,
                                   musicId: 30
                                   }]
                   }, {
                   musicGather: '教师节音乐选集',
                   musicTotal: 3,
                   show: false,
                   musicNameList: [{
                                   musicName: '每当我走过老师窗前',
                                   tickShow: false,
                                   musicId: 39
                                   }, {
                                   musicName: '长大后我就成了你',
                                   tickShow: false,
                                   musicId: 38
                                   }, {
                                   musicName: '感恩的心',
                                   tickShow: false,
                                   musicId: 37
                                   }]
                   }, {
                   musicGather: '教师节音乐选集',
                   musicTotal: 3,
                   show: false,
                   musicNameList: [{
                                   musicName: '每当我走过老师窗前',
                                   tickShow: false,
                                   musicId: 36
                                   }, {
                                   musicName: '长大后我就成了你',
                                   tickShow: false,
                                   musicId: 35
                                   }, {
                                   musicName: '感恩的心',
                                   tickShow: false,
                                   musicId: 34
                                   }]
                   }, {
                   musicGather: '教师节音乐选集',
                   musicTotal: 3,
                   show: false,
                   musicNameList: [{
                                   musicName: '每当我走过老师窗前',
                                   tickShow: false,
                                   musicId: 33
                                   }, {
                                   musicName: '长大后我就成了你',
                                   tickShow: false,
                                   musicId: 32
                                   }, {
                                   musicName: '感恩的心',
                                   tickShow: false,
                                   musicId: 31
                                   }]
                   }]
       };
       },
       components: {
       navbar: _navbar2.default
       },
       props: {
       title: { default: "音乐设置" },
       complete: { default: "完成" }
       },
       mounted: function mounted() {
       var domModule = weex.requireModule("dom");
       domModule.addRule('fontFace', {
                         'fontFamily': 'iconfont',
                         'src': "url('http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf')"
                         });
       },
       created: function created() {
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
       event.closeURL(E);
       }
       }
       };
       module.exports = exports['default'];
       
/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {
       
       var __vue_exports__, __vue_options__
       var __vue_styles__ = []
       
       /* styles */
       __vue_styles__.push(__webpack_require__(4)
                           )
       __vue_styles__.push(__webpack_require__(5)
                           )
       
       /* script */
       __vue_exports__ = __webpack_require__(6)
       
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
/* 4 */
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
/* 5 */
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
/* 6 */
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
       
       exports.default = {
       props: {
       title: { default: "navbar" },
       complete: { default: '' }
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
/* 7 */
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
                                                              }, [_vm._v(_vm._s(_vm.title))]), _c('text', {
                                                                                                  staticClass: ["nav_Complete"],
                                                                                                  on: {
                                                                                                  "click": function($event) {
                                                                                                  _vm.goComplete('/')
                                                                                                  }
                                                                                                  }
                                                                                                  }, [_vm._v(_vm._s(_vm.complete))])])])
       },staticRenderFns: []}
       module.exports.render._withStripped = true
       
/***/ }),
/* 8 */
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
                                                                                                                                                                                                                                   }, [_vm._v(_vm._s(music.musicTotal) + "首")])]), (music.show) ? _c('div', {
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
                                                                                                                                                                                                                                                                                                                                staticClass: ["musicName"]
                                                                                                                                                                                                                                                                                                                                }, [_vm._v(_vm._s(item.musicName))]), (item.tickShow) ? _c('text', {
                                                                                                                                                                                                                                                                                                                                                                                           staticClass: ["musicName"],
                                                                                                                                                                                                                                                                                                                                                                                           style: {
                                                                                                                                                                                                                                                                                                                                                                                           fontFamily: 'iconfont'
                                                                                                                                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                                                                                                                                           }, [_vm._v("")]) : _vm._e()])
                                                                                                                                                                                                                                                                                                               })) : _vm._e()])])
                                                                                                                                                        })], 2)], 1)
       },staticRenderFns: []}
       module.exports.render._withStripped = true
       
/***/ })
/******/ ]);
