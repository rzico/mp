<template>
    <div class="">
    <div class="header"  :class="[classHeader()]">
        <!--顶部导航-->
        <div class="nav nw">
            <div class="nav_back" @click="goback()">
                <text class="nav_ico"   :style="{fontFamily:'iconfont'}">&#xe669;</text>
            </div>
            <!--页面名称-->
            <div class="userBox" >
                <text class="nav_title">{{pageName}}</text>
            </div>
            <div class="rightTop" >
            </div>
        </div>
    </div>
        <div class="chooseBox bkg-primary">
            <div class="reportBox mr20" :class="[isStyle == reportDay ? 'reportBoxActive':'']" @click="reportDayClick()"><text class="reportBoxText">{{reportDay}}</text> </div>
            <div class="reportBox mr20" :class="[isStyle == reportMonth ? 'reportBoxActive':'']" @click="reportMonthClick()"><text class="reportBoxText">{{reportMonth}}</text> </div>
            <div class="reportBox" :class="[isStyle == reportYears ? 'reportBoxActive':'']" @click="reportYearsClick()"> <text class="reportBoxText">{{reportYears}}</text> </div>
        </div>
    <div class="timeBox bkg-primary">
        <div class="leftBox">
            <div class="deduct" @click="deductTime()"><text class="fz40" style="color: #fff" >—</text> </div>
            <div class="timeContent"><text class="fz28" style="color: #fff">{{showTime}}</text> </div>
            <div class="add" @click="addTime()"><text class="fz40" style="color: #fff">+</text> </div>
        </div>
        <div class="rightBox" @click="iconTime()">
            <text class="nav_ico"   :style="{fontFamily:'iconfont'}">&#xe63c;</text>
        </div>
    </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>
    .rightTop{
        height: 96px;width: 98px;align-items: center;justify-content: center;margin-top: 5px;
    }
    .nav_ico {
        font-size: 50px;
        color: #fff;
    }
    .userBox{
        flex-direction: row;
        align-items: center;
    }
    .nw{
        width: 750px;
    }
    .chooseBox{
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 750px;
    }
    .reportBox{
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 15px;
        padding-right: 15px;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
    }
    .reportBoxActive{
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
    .reportBoxText{
        font-size: 32px;
        color: white;
    }
    .timeBox{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 750px;
        height: 100px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .leftBox{
        flex-direction: row;
        align-items: center;
    }
    .deduct{
        height: 60px;
        width: 60px;
        align-items: center;
        justify-content: center;
        border-color: #fff;
        border-width: 1px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    .add{
        height: 60px;
        width: 60px;
        align-items: center;
        justify-content: center;
        border-color: #fff;
        border-width: 1px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .timeContent{
        height: 60px;
        width: 150px;
        align-items: center;
        justify-content: center;
        border-color: #fff;
        border-top-width: 1px;
        border-bottom-width: 1px;
    }
    .rightBox{

    }
</style>
<script>
    import navbar from '../include/navbar.vue';
    import {dom,event} from '../weex.js'
    import { POST, GET } from '../assets/fetch.js';
    import utils from '../assets/utils';
    import filters from '../filters/filters.js';
    import noData from '../include/noData.vue';
    const picker = weex.requireModule('picker')
    export default {
        components: {

        },
        data: function () {
            return {
                timeDate:'',
                showTime:'',
                isStyle:'日报',
                reportDay:'日报',
                reportMonth:'月报',
                reportYears:'年报',
            }
        },
        props: {
            pageName:''
        },
        filters:{
            watchCode: function (value) {
                if(this.isStyle == '月报'){
                    return value.substr(7)
                }else if(this.isStyle == '年报'){
                    return value.substr(4)
                }else {
                    return value
                }
            },

        },
        created(){
            this.timeDate = utils.ymdtimefmt(Date.parse(new Date()));
            this.showTime = utils.ymdtimefmt(Date.parse(new Date()));
        },
        mounted(){

        },
        methods: {
            classHeader:function () {
                let dc = utils.device();
                return dc
            },
            goback(){
                event.closeURL();
            },
            //            点击减少一天时间
            deductTime:function () {
                if(this.isStyle == '日报') {
//                先把时间转为时间戳
                    this.timeDate = Date.parse(this.timeDate);
//                运算减去一天
                    this.timeDate = (this.timeDate / 1000 - 86400) * 1000;
//                把时间戳转换为时间
                    this.timeDate = utils.ymdtimefmt(this.timeDate);
                    this.showTime = this.timeDate
                }else if(this.isStyle == '月报'){
                    this.timeDate = utils.reduceMonth(this.timeDate);
                    this.showTime = this.timeDate;
//                    先把时间转为时间戳
                    this.showTime = Date.parse(this.showTime);
//                    把时间戳转换为时间 2017-9
                    this.showTime = utils.ymtimefmt(this.showTime);
                }else if(this.isStyle == '年报'){
                    this.timeDate = utils.reduceYears(this.timeDate);
                    this.showTime = this.timeDate;
//                    先把时间转为时间戳
                    this.showTime = Date.parse(this.showTime);
//                    把时间戳转换为时间 2017-9
                    this.showTime = utils.ytimefmt(this.showTime);
                }

            },
//            点击增加一天时间
            addTime:function () {
                if(this.isStyle == '日报'){
                    //                先把时间转为时间戳
                    this.timeDate = Date.parse(this.timeDate);
//                运算增加一天
                    this.timeDate = (this.timeDate/1000+86400)*1000;
//                把时间戳转换为时间
                    this.timeDate = utils.ymdtimefmt(this.timeDate);
                    this.showTime = this.timeDate
                }else if(this.isStyle == '月报'){
                    this.timeDate = utils.increaseMonth(this.timeDate);
                    this.showTime = this.timeDate;
//                    先把时间转为时间戳
                    this.showTime = Date.parse(this.showTime);
//                    把时间戳转换为时间 2017-9
                    this.showTime = utils.ymtimefmt(this.showTime);
                }else if(this.isStyle == '年报'){
                    this.timeDate = utils.increaseYears(this.timeDate);
                    this.showTime = this.timeDate;
//                    先把时间转为时间戳
                    this.showTime = Date.parse(this.showTime);
//                    把时间戳转换为时间 2017-9
                    this.showTime = utils.ytimefmt(this.showTime);
                }
            },
            iconTime () {
                var _this = this;
                picker.pickDate({
                    value: _this.timeDate
                }, function (e) {
                    if (e.result == 'success') {
                        _this.timeDate = e.data;
                    }
                })
            },
            reportDayClick:function () {
                this.isStyle = '日报';
                this.showTime = this.timeDate;
                this.$emit("reportDayClick",this.isStyle);
            },
            reportMonthClick:function () {
                this.isStyle = '月报';
                this.showTime = this.timeDate;
//                    先把时间转为时间戳
                this.showTime = Date.parse(this.showTime);
//                    把时间戳转换为时间 2017-9
                this.showTime = utils.ymtimefmt(this.showTime);
                this.$emit("reportMonthClick",this.isStyle);
            },
            reportYearsClick:function () {
                this.isStyle = '年报';
                this.showTime = this.timeDate;
//                    先把时间转为时间戳
                this.showTime = Date.parse(this.showTime);
//                    把时间戳转换为时间 2017-9
                this.showTime = utils.ytimefmt(this.showTime);
                this.$emit("reportYearsClick",this.isStyle);
            },
//methods 方法到此为止
        },
    }
</script>