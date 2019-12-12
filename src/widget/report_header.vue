<template>
    <div class="">
        <div class="header bkg-primary" >
            <!--顶部导航-->
            <div class="navbar" :class="[classHeader()]">
                <div class="navBack" @click="goback()">
                    <text class="navIco" :style="{fontFamily:'iconfont'}">&#xe669;</text>
                </div>
                <!--页面名称-->
                <text class="nav_title">{{pageName}}</text>
                <div class="navRightBox"  @click="goComplete('/')">
                    <text class="nav_Complete " v-if="completeIcon == ''" >{{complete}}</text>
                    <text class="nav_CompleteIcon"  :style="{fontFamily:'iconfont'}" v-else>{{getIco}}</text>
                </div>
            </div>
            <div class="chooseBox">
                <div class="reportBox mr20" v-if="type=='all'" :class="[isStyle == reportAll ? 'reportBoxActive':'']" @click="allClick()">
                    <text class="reportBoxText">{{reportAll | watchAll}}</text>
                </div>
                <div class="reportBox mr20" :class="[isStyle == reportDay ? 'reportBoxActive':'']" @click="reportDayClick()">
                    <text class="reportBoxText">{{reportDay | watchDay}}</text>
                </div>
                <div class="reportBox mr20" :class="[isStyle == reportMonth ? 'reportBoxActive':'']" @click="reportMonthClick()">
                    <text class="reportBoxText">{{reportMonth | watchMonth}}</text>
                </div>
                <div class="reportBox" :class="[isStyle == reportYears ? 'reportBoxActive':'']" @click="reportYearsClick()">
                    <text class="reportBoxText">{{reportYears | watchYears}}</text>
                </div>
            </div>
            <div class="timeBox" v-if="isStyle != reportAll">
                <div class="leftBox">
                    <div class="deduct" @click="deductTime()">
                        <text class="fz40" style="color: #fff">-</text>
                    </div>
                    <div class="timeContent">
                        <text class="fz28" style="color: #fff">{{showTime}}</text>
                    </div>
                    <div class="add" @click="addTime()">
                        <text class="fz40" style="color: #fff">+</text>
                    </div>
                </div>
                <div class="rightBox" @click="iconTime()">
                    <text class="nav_ico" :style="{fontFamily:'iconfont'}">&#xe63c;</text>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>
    .header{
        flex-direction: column;
        position:sticky;
    }
    .navbar{
        width: 750px;
        height: 136px;
        padding-top: 44px;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .navIco {
        font-size: 38px;
        color: #fff;
        margin-top: 2px;
    }
    .navBack {
        flex-direction: row;
        width: 92px;
        height: 92px;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
    }
    .navRightBox{
        min-width: 92px;
        height: 92px;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0;
    }
    .nav_CompleteIcon{
        /*如果nav_ico的字体大小改变这个值也需要变。 （左边box宽度-back图标宽度)/2 */
        padding-left: 27px;
        padding-right: 27px;
        /*ios识别不出该字体，warn警告。  推测可能隐藏到字体图标的渲染*/
        /*font-family: Verdana, Geneva, sans-serif;*/
        font-size: 44px;
        line-height: 44px;
        color: #FFFFFF;
    }
    .nav_Complete {
        padding-left: 27px;
        padding-right: 27px;
        font-size: 32px;
        color: #ffffff;
        /*ios识别不出该字体，warn警告。  推测可能隐藏到字体图标的渲染*/
        /*font-family: Verdana, Geneva, sans-serif;*/
    }

    .rightTop {
        height: 96px;
        width: 98px;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
    }

    .nav_ico {
        font-size: 50px;
        color: #fff;
    }

    .userBox {
        flex-direction: row;
        align-items: center;
    }

    .nw {
        width: 750px;
    }

    .chooseBox {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 750px;
        padding-bottom: 20px;
    }

    .reportBox {
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 15px;
        padding-right: 15px;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
    }

    .reportBoxActive {
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 15px;
        padding-right: 15px;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        border-width: 1px;
        border-color: white;
    }

    .reportBoxText {
        font-size: 32px;
        color: white;
    }

    .timeBox {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 750px;
        height: 60px;
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 20px;
    }

    .leftBox {
        flex-direction: row;
        align-items: center;
    }

    .deduct {
        height: 60px;
        width: 60px;
        align-items: center;
        justify-content: center;
        border-color: #fff;
        border-width: 1px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    .add {
        height: 60px;
        width: 60px;
        align-items: center;
        justify-content: center;
        border-color: #fff;
        border-width: 1px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .timeContent {
        height: 60px;
        width: 170px;
        align-items: center;
        justify-content: center;
        border-color: #fff;
        border-top-width: 1px;
        border-bottom-width: 1px;
    }

    .rightBox {

    }
</style>
<script>
    import {dom, event} from '../weex.js'
    import {POST, GET} from '../assets/fetch.js';
    import utils from '../assets/utils';
    import filters from '../filters/filters.js';
    import noData from '../include/noData.vue';
    var he = require('he');
    const picker = weex.requireModule('picker')
    export default {
        components: {},
        data: function () {
            return {
                clicked: false,
                timeDate: '',
                showTime: '',
                isStyle: 'day',
                reportDay: 'day',
                reportMonth: 'month',
                reportYears: 'years',
                reportAll:'all'
            }
        },
        props: {
            pageName: '',
            pageTime: '',
            type:'',
            complete:{default:''},
            completeIcon:{default:''},
        },
        computed: {
            getIco: function() {
                return he.decode(this.completeIcon)
            }
        },
        filters: {
            watchAll:function(value){
                if (value == 'all') {
                    return '全部'
                }
            },
            watchDay: function (value) {
                if (value == 'day') {
                    return '日报'
                }
            },
            watchMonth: function (value) {
                if (value == 'month') {
                    return '月报'
                }
            },
            watchYears: function (value) {
                if (value == 'years') {
                    return '年报'
                }
            },
        },
        created() {
            utils.initIconFont();
            var _this = this
            this.timeDate = utils.resolveTimeObj(utils.resolvetime(Math.round(new Date().getTime())));
            this.showTime = utils.ymdtimefmt(this.timeDate);
        },
        mounted() {
            if (!utils.isNull(this.pageTime)) {
                var date = this.pageTime;
//                先把时间的-替换为/，new date 只认2018/09/08格式
                date = date.replace(/-/g, '/');
                this.timeDate = new Date(date).getTime();
                this.showTime = utils.ymdtimefmt(this.timeDate);
            }
            if (!utils.isNull(this.type)){
                this.isStyle = 'all';
            }
        },
        methods: {
            classHeader: function () {
                let dc = utils.device();
                return dc
            },
            goback() {
                event.closeURL();
            },
            //            点击减少一天时间
            deductTime: function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this
                var beginTime = '';
                var endTime = '';
                if (this.isStyle == 'day') {
                    _this.clicked = false;
//                运算减去一天
                    this.timeDate = utils.decDate(this.timeDate);
//                把时间戳转换为时间
                    this.showTime = utils.ymdtimefmt(this.timeDate);
                    beginTime = this.showTime + ' ' + '00:00:00';
                    endTime = this.showTime + ' ' + '23:59:59';
                } else if (this.isStyle == 'month') {
                    _this.clicked = false;
                    let d = utils.trunceDate(this.timeDate);
                    d = utils.decMonth(d);
                    this.timeDate = d;
//                  把时间戳转换为时间 2017-9
                    this.showTime = utils.ymtimefmt(d);

                    beginTime = utils.ymdtimefmt(d) + ' ' + '00:00:00';
                    var e = utils.incMonth(d);
                    e = utils.decDate(e);
                    endTime = utils.ymdtimefmt(e) + ' ' + '23:59:59';
                } else if (this.isStyle == 'years') {
                    _this.clicked = false;
                    let d = utils.trunceMonth(this.timeDate);
                    d = utils.decYears(d);
                    this.timeDate = d;
//                  把时间戳转换为时间 2017-9
                    this.showTime = utils.ytimefmt(d);

                    beginTime = utils.ymdtimefmt(d) + ' ' + '00:00:00';
                    var e = utils.incYears(d);
                    e = utils.decDate(e);
                    endTime = utils.ymdtimefmt(e) + ' ' + '23:59:59';
                }
                var data = {
                    beginTime: beginTime,
                    endTime: endTime,
                };
                this.$emit("deductTime", data);
            },
//            点击增加一天时间
            addTime: function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this
                var beginTime = '';
                var endTime = '';
                if (this.isStyle == 'day') {
                    _this.clicked = false;
//                运算减去一天
                    this.timeDate = utils.incDate(this.timeDate);
//                把时间戳转换为时间
                    this.showTime = utils.ymdtimefmt(this.timeDate);
                    beginTime = this.showTime + ' ' + '00:00:00';
                    endTime = this.showTime + ' ' + '23:59:59';
                } else if (this.isStyle == 'month') {
                    _this.clicked = false;
                    let d = utils.trunceDate(this.timeDate);
                    d = utils.incMonth(d);
                    _this.timeDate = d;
//                  把时间戳转换为时间 2017-9
                    this.showTime = utils.ymtimefmt(d);

                    beginTime = utils.ymdtimefmt(d) + ' ' + '00:00:00';
                    var e = utils.incMonth(d);
                    e = utils.decDate(e);
                    endTime = utils.ymdtimefmt(e) + ' ' + '23:59:59';
                } else if (this.isStyle == 'years') {
                    _this.clicked = false;
                    let d = utils.trunceMonth(this.timeDate);
                    d = utils.incYears(d);
                    this.timeDate = d;
//                  把时间戳转换为时间 2017-9
                    this.showTime = utils.ytimefmt(d);

                    beginTime = utils.ymdtimefmt(d) + ' ' + '00:00:00';
                    var e = utils.incYears(d);
                    e = utils.decDate(e);
                    endTime = utils.ymdtimefmt(e) + ' ' + '23:59:59';
                }
                var data = {
                    beginTime: beginTime,
                    endTime: endTime,
                };
                this.$emit("addTime", data);
            },
            iconTime() {
                this.isStyle = 'day';
                this.showTime = utils.ymdtimefmt(this.timeDate);
                var _this = this;
                var beginTime = '';
                var endTime = '';
                picker.pickDate({
                    value: _this.showTime
                }, function (e) {
                    if (e.result == 'success') {
                        _this.showTime = e.data;
                        var date = _this.showTime;
                        date = date.replace(/-/g, '/');
                        _this.timeDate = new Date(date).getTime();
                        beginTime = _this.showTime + ' ' + '00:00:00';
                        endTime = _this.showTime + ' ' + '23:59:59';
                        var data = {
                            beginTime: beginTime,
                            endTime: endTime,
                        };
                        _this.$emit("iconTime", data);
                    } else {
                        beginTime = _this.showTime + ' ' + '00:00:00';
                        endTime = _this.showTime + ' ' + '23:59:59';
                        var data = {
                            beginTime: beginTime,
                            endTime: endTime,
                        };
                        _this.$emit("iconTime", data);
                    }
                });
            },
            allClick:function(){
                this.isStyle = 'all';
                var data = {
                    beginTime: '',
                    endTime: '',
                };
                this.$emit("allClick", data);
            },
            reportDayClick: function () {
                var beginTime = '';
                var endTime = '';
                this.isStyle = 'day';
                this.showTime = utils.ymdtimefmt(this.timeDate);
                beginTime = this.showTime + ' ' + '00:00:00';
                endTime = this.showTime + ' ' + '23:59:59';
                var data = {
                    beginTime: beginTime,
                    endTime: endTime,
                };
                this.$emit("reportDayClick", data);
            },
            reportMonthClick: function () {
                var beginTime = '';
                var endTime = '';
                this.isStyle = 'month';
//                    把时间戳转换为时间 2017-9
                this.showTime = utils.ymtimefmt(this.timeDate);
                let d = utils.trunceDate(this.timeDate);
                beginTime = utils.ymdtimefmt(d) + ' ' + '00:00:00';
                var e = utils.incMonth(d);
                e = utils.decDate(e);
                endTime = utils.ymdtimefmt(e) + ' ' + '23:59:59';
                var data = {
                    beginTime: beginTime,
                    endTime: endTime,
                };
                this.$emit("reportMonthClick", data);
            },
            reportYearsClick: function () {
                var beginTime = '';
                var endTime = '';
                this.isStyle = 'years';
//                    把时间戳转换为时间 2017-9
                this.showTime = utils.ytimefmt(this.timeDate);
                let d = utils.trunceMonth(this.timeDate);
                beginTime = utils.ymdtimefmt(d) + ' ' + '00:00:00';
                var e = utils.incYears(d);
                e = utils.decDate(e);
                endTime = utils.ymdtimefmt(e) + ' ' + '23:59:59';
                var data = {
                    beginTime: beginTime,
                    endTime: endTime,
                };
                this.$emit("reportYearsClick", data);
            },

            goComplete:function (e) {
                this.$emit('goComplete');
            },

//methods 方法到此为止
        },
    }
</script>
