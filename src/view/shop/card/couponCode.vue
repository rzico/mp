<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" @goComplete="setting" > </navbar>
        <div class="totalBox">
            <image class="memberLogo" :src="logo"></image>
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
                        <div class="buttonCell">
                            <div class="pickBox mr30" @click="settingNumber(c.id)">
                                <text class="fz28 primary">赠送</text>
                            </div>
                            <div class="pickBox mr30" @click="linkToInfo(c.id)">
                                <text class="fz28 primary">详情</text>
                            </div>
                        </div>
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
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: white;
        flex-direction: column;
        align-items: center;
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
        width: 530px;
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
        width: 510px;
        lines:2;
        text-overflow: ellipsis;
    }
    .infoBottomBox{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 510px;
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
                total:0
            }
        },
        props: {
            title: { default: "电子水票"},
            noDataHint: { default: "尚未拥有电子水票"},
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
//             设置赠送张数
            settingNumber:function (id) {
                let _this = this;
                modal.prompt({
                    message: '赠送电子券',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                    placeholder:'请输赠送数量'
                }, function (value) {
                    if(value.result == '确定'){
                        if(value.data == '' || value.data == null ){
                            modal.toast({message:'请输入赠送数量',duration:1})
                        }else{
                            POST('weex/member/couponCode/add.jhtml?couponCodeId='+id +'&quantity=' + value.data).then(
                                function (mes) {
                                    if (mes.type == "success") {
                                        _this.open();
                                        event.toast('赠送成功');
                                    } else {
                                        event.toast(mes.content);
                                    }
                                }, function (err) {
                                    event.toast(err.content);
                                }
                            )
                        }
                    }
                })
            },
            linkToInfo(id){
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                event.openURL(utils.locate('view/shop/card/couponCodeDeposit.js?id='+id),function (data) {
                    _this.clicked = false;
                });
            },
            open:function () {
                var _this = this;
                GET('weex/member/couponCode/list.jhtml?cardId='+ this.cardId,function (mes) {
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
