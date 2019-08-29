<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" :border="false"> </navbar>
        <list class="list"  @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="noData()" >
                <noData > </noData>
            </cell>
            <cell v-for="(deposit,index) in depositList"  >
                <!--如果月份重复就不渲染该区域-->
                <div class="cell-header cell-line space-between" v-if="isRepeat(index)">
                    <div class="flex-row flex-start">
                        <text class="title" >{{deposit.createDate | daydayfmt}}</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row cell-clear" >
                    <div class="cell-panel newHeight"  :style="addBorder(index)">
                        <div class="flex1">
                            <image class="logo" resize="cover"
                                   :src="deposit.logo">
                            </image>
                        </div>
                        <div class="content flex5">
                            <div class="flex-row space-between align-bottom">
                                <text class="title lines-ellipsis memo">{{deposit.memo}}</text>
                                <text class="money">{{deposit.amount | currencyfmt}}</text>
                            </div>
                            <div class="flex-row space-between align-bottom">
                                <text class="datetime">{{deposit.createDate | hitimefmt}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </cell>
            <cell v-if="noLoading">
                <div class="noLoading"></div>
            </cell>
        </list>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .newHeight{
        height: 130px;
    }
    .cell-row {
        min-height: 120px;
        flex-direction: column;
        background-color: #ffffff;
        padding-left: 20px;
        margin-top: 20px;
    }

    .logo {
        height:80px;
        width:80px;
        border-radius:40px;
        overflow:hidden;
        margin: 10px;
    }

    .align-bottom {
        align-items: flex-end;
        width:615px;
    }

    .content {
        margin-left: 10px;
        flex-direction: column;
        align-items: flex-start;
    }
    .datetime {
        color:#ccc;
        font-size: 28px;
        margin-top: 5px;
    }
    .memo {
        width:350px;
    }
    .money {
        font-weight: 700;
        margin-right: 20px;
    }

</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import {dom,event,animation} from '../../../weex.js';
    import navbar from '../../../include/navbar.vue'
    import noData from '../../../include/noData.vue'
    import filters from '../../../filters/filters.js'

    var pageNumber = 1;
    export default {
        data:function(){
            return{
                id:"",
                depositList:[],
                refreshing: false,
                loading: 'hide',
                pageStart:0,
                pageSize:20,
                noLoading:true,
                refreshImg:utils.locate('resources/images/loading.png'),
            }
        },
        components: {
            navbar,noData
        },
        props: {
            title: { default: "消费记录" }
        },
        methods: {
            noData:function () {
                return this.depositList.length==0;
            },
//            是否添加底部边框
            addBorder: function (index) {
                let listLength = this.depositList.length;
//                判断是否最后一个元素并且是否每月的结尾
                if(index != listLength - 1 ){
                    if(this.getDate(this.depositList[index].create_date) == this.getDate(this.depositList[index + 1].create_date)){
                        return {
                            borderBottomWidth:'1px'
                        }
                    }else{
                        return {
                            borderBottomWidth:'0px'
                        }
                    }
                }else{
                    return {
                        borderBottomWidth:'0px'
                    }
                }
            },
            //判断月份是否重复
            isRepeat(index){
                if(index != 0){
                    if(this.getDate(this.depositList[index].create_date) == this.getDate(this.depositList[index - 1].create_date)){
                        return false;
                    }
                }
                return true;
            },
            goback: function (e) {
                event.closeURL();
            },
            open (pageStart,callback) {
                this.pageStart = pageStart;
                var _this = this;
                GET('weex/member/card/point_bill.jhtml?id='+this.id+'&pageNumber=' + this.pageStart +'&pageSize='+this.pageSize,function (res) {
                    if (res.type=="success") {
                        if (res.data.start==0) {
                            _this.depositList = res.data.data;
                        } else {
                            res.data.data.forEach(function (item) {
                                _this.depositList.push(item);
                            })
                        }
                        _this.pageStart = res.data.start+res.data.data.length;
                        _this.noLoading = res.data.data.length<_this.pageSize;
                    } else {
                        event.toast(res.content);
                    }
                    callback();
                }, function (err) {
                    callback();
                    event.toast(err.content);
                })
            },
//            上拉加载
            onloading (event) {
                var _this = this;
                _this.open(_this.pageStart,function () {
                })
            },
//            下拉刷新
            onrefresh:function (event) {
                var _this = this;
                _this.pageStart = 0;
                this.refreshing = true;
                animation.transition(_this.$refs.refreshImg, {
                    styles: {
                        transform: 'rotate(360deg)',
                    },
                    duration: 1000, //ms
                    timingFunction: 'linear',//350 duration配合这个效果目前较好
                    needLayout:false,
                    delay: 0 //ms
                });
                setTimeout(() => {
                    animation.transition(_this.$refs.refreshImg, {
                        styles: {
                            transform: 'rotate(0)',
                        },
                        duration: 10, //ms
                        timingFunction: 'linear',//350 duration配合这个效果目前较好
                        needLayout:false,
                        delay: 0 //ms
                    });
                    _this.open(_this.pageStart,function () {
                        _this.refreshing = false;
                    })
                }, 1000)
            },
//            获取月份
            getDate: function(value) {
                value = value + '';
                if(value.length == 10){
                    value = parseInt(value) * 1000;
                }else{
                    value = parseInt(value);
                }
                let date = new Date(value);
                let tody = new Date();
                let m = tody.getDate() - date.getDate();
                if (m<1) {
                    return "今天"
                } else
                if (m<2) {
                    return "昨天"
                } else
                if (m<3) {
                    return "前天"
                } else {
                    let    y = date.getFullYear();
                    let    d = date.getDate();
                    let    m = date.getMonth();
                    if (m < 10) {
                        m = '0' + m;
                    }
                    if (d < 10) {
                        d = '0' + d;
                    }
                    return y + '年' + m + '月' + d+ '日';
                }
            }
        },
        created () {
//              页面创建时请求数据
            utils.initIconFont();
            this.id = utils.getUrlParameter("id");
            this.open(0,function () {

            });
        }
    }
</script>