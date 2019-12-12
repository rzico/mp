<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" @goComplete="setting" > </navbar>
        <div class="totalBox">
            <!--            <image class="memberLogo" :src="logo"></image>-->
            <text class="totalNumber">总计:{{total}}（张）</text>
        </div>
        <noData :noDataHint="noDataHint" v-if="lists.length == 0"></noData>
        <list  class="list"  :scrollable="canScroll" @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell >
                <div class="" v-for="c in lists">
                    <div class="contentBox">
                        <div class="flex-row">
                            <div class="couponDiv">
                                <div  style="flex-direction:row; align-items:flex-end">
                                    <text class="stock">{{c.stock}}</text>
                                    <text style="font-size: 24px;color: #cccccc">张</text>
                                </div>
                            </div>
                            <div class="infoBox">
                                <text class="couponTitle">{{c.couponName}}</text>
                                <div class="infoBottomBox">
                                    <text class="price">¥ {{c.amount | currencyfmt}}</text>
                                </div>
                            </div>
                        </div>
                        <!--<text class="fz32 gray mr20" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>

<style lang="less" src="../../../style/wx.less"/>
<style>
    .totalBox{
        height: 150px;
        background-color: white;
        border-radius: 15px;
        margin: 20px;
        padding-left:20px;
        flex-direction: row;
        align-items: center;
    }
    .memberLogo{
        height: 100px;
        width: 100px;
        border-radius: 100%;
        border-width: 5px;
        border-color: #cccccc;
    }
    .totalNumber{
        font-size: 32px;
        margin-left: 20px;
    }
    .contentBox{
        padding-top: 20px;
        padding-bottom: 20px;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: white;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-radius: 15px;
    }
    .couponDiv{
        height:120px;
        width: 180px;
        padding-left:20px;
        padding-right:20px;
        border-right-width: 1px;
        border-right-color: #cccccc;
        border-right-style: dashed;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .stock{
        font-size: 60px;
        font-weight: bold;
        color: red;
    }
    .couponImg{
        height:120px;
        width: 120px;
        background-color: #cccccc;
    }
    .infoBox{
        flex-direction: column;
        justify-content: space-between;
        height: 120px;
        padding-left: 20px;
    }
    .buttonCell{
        margin-top: 10px;
        width: 710px;
        height: 80px;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        border-top-color: #cccccc;
        border-top-width: 1px;
    }
    .couponTitle{
        font-size: 32px;
        max-width: 320px;
        lines:2;
        text-overflow: ellipsis;
    }
    .infoBottomBox{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .price{
        font-size: 32px;
        color: red;
    }
    .pickBox{
        padding-top: 2px;
        padding-bottom: 2px;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 10px;
        border-color:#5eb0fd;
        border-width: 1px;
    }

    .newBottomBox{
        width: 750px;
        height: 110px;
        background-color: #ffffff;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-left: 20px;
        padding-right: 20px;
    }
    .smallBox{
        width: 250px;
        height: 70px;
        border-radius: 35px;
        align-items: center;
        justify-content: center;
        border-width: 1px;
        border-color: #888888;
    }
    .smallText{
        font-size: 32px;
    }
    .mask{
        position: fixed;
        top:0;
        left:0;
        right: 0;
        bottom: 0;
        flex-direction: column;
        align-items: center;
        background-color: rgba(0,0,0,0.7);
    }
    .editorBox{
        width: 650px;
        align-items: center;
        background-color: white;
        border-radius: 15px;
        position: absolute;
        left:50px;
        top: 200px;
    }
    .editorCell{
        margin-left: 20px;
        margin-right: 20px;
        width: 610px;
        height: 100px;
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-color: #cccccc;
    }
    .editorCellTwo{
        margin-left: 20px;
        margin-right: 20px;
        width: 610px;
        height: 100px;
        flex-direction: row;
        align-items: center;
    }
    .editorInput{
        width: 500px;
        height: 98px;
        line-height: 90px;
        font-size: 32px;
    }
    .bottomBox{
        flex-direction: row;
        align-items: center;
        width: 650px;
        height: 100px;
        border-top-width: 2px;
        border-color: #0088fb;
    }
    .leftBox{
        height: 100px;
        width: 325px;
        border-right-width: 2px;
        border-color: #0088fb;
        align-items: center;
        justify-content: center;
    }
    .leftBox:active{
        background-color: #cccccc;
    }
    .rightBox{
        height: 100px;
        width: 325px;
        align-items: center;
        justify-content: center;
    }
    .rightBox:active{
        background-color: #cccccc;
    }
    .bottomBoxText{
        font-size: 40px;
        color: #0088fb;
    }
    .maskCellVal{
        font-size: 32px;
        width: 470px;
        overflow: hidden;
        lines:1;
        text-overflow: ellipsis;
    }
    .maskCellIcon{
        font-size: 32px;
        color: #999;
    }
</style>

<script>
    var modal = weex.requireModule('modal')
    var prompting =''
    import { POST, GET ,SCAN} from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import filters from '../../../filters/filters'
    import {dom,event,animation} from '../../../weex.js';
    const picker = weex.requireModule('picker')
    import navbar from '../../../include/navbar.vue';
    import search from '../../../include/search.vue';
    import noData from '../../../include/noData.vue';
    var he = require('he');
    var animationPara;//执行动画的消息
    export default {
        components: {
            navbar,search,noData
        },
        data() {
            return   {
                clicked:false,
                refreshing:false,
                lists:[],
                pageSize:10,
                pageStart:0,
                canScroll:true,
                refreshImg:utils.locate('resources/images/loading.png'),
                cardId:'',
                logo:'',
                total:0,
                type:1,
                nowVal:'',
                quantity:'',
                pickData:[],
                pickIndex:0,
                productList:[],
                memberId:'',
                isMask:false
            }
        },
        props: {
            title: { default: "套餐记录"},
            noDataHint: { default: "尚未拥有套餐"},
        },
        created() {
            utils.initIconFont();
            this.logo = utils.getUrlParameter('logo');
            this.cardId = utils.getUrlParameter('cardId');
            this.open();
        },
        filters:{

        },
        methods: {
            open:function () {
                var _this = this;
                GET('weex/member/couponCode/list.jhtml?cardId='+ this.cardId+"&subType=card",function (mes) {
                    if (mes.type == 'success') {
                        _this.lists = mes.data;
                        _this.total = 0;
                        mes.data.forEach(function (item,index) {
                            _this.total =  _this.total+ item.stock
                        })
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
//            onloading (event) {
//                this.open();
//            },
//            下拉刷新
            onrefresh (event) {
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
                })
                setTimeout(() => {
                    animation.transition(_this.$refs.refreshImg, {
                        styles: {
                            transform: 'rotate(0)',
                        },
                        duration: 10, //ms
                        timingFunction: 'linear',//350 duration配合这个效果目前较好
                        needLayout:false,
                        delay: 0 //ms
                    })
                    this.refreshing = false
                    _this.open();
                }, 1000)
            },
            goback:function () {
                event.closeURL();
            },

        }
    }
</script>
