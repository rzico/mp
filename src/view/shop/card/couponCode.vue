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
                        <div class="buttonCell">
                            <!--<div class="pickBox mr30" @click="settingNumber(c.id)">-->
                                <!--<text class="fz28 primary">赠送</text>-->
                            <!--</div>-->
                            <div class="pickBox mr30" @click="linkToInfo(c.id)">
                                <text class="fz28 primary">详情</text>
                            </div>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
        <div class="bottomBox">
            <div class="smallBox" @click="showMask(1)">
                <text class="smallText">核销</text>
            </div>
            <div class="smallBox" @click="showMask(2)">
                <text class="smallText">赠送</text>
            </div>
        </div>
        <div class="mask" v-if="isMask">
            <div class="maskContent">
                <text class="maskTitle">{{type <2 ?'核销':'赠送'}}</text>
                <div class="maskCell">
                    <text class="maskCellTitle">水票:</text>
                    <div class="flex-row" style="position: relative" @click="openPick">
                        <div class="maskCellValBox">
                            <text class="maskCellVal" >{{nowVal}}</text>
                        </div>
                        <div style="width: 50px;height: 50px;align-items: center;justify-content: center;position: absolute;right: 0;">
                            <text class="maskCellIcon" :style="{fontFamily:'iconfont'}">&#xe601;</text>
                        </div>
                    </div>
                </div>
                <div class="maskCell">
                    <text class="maskCellTitle">数量:</text>
                    <input class="maskCellInput" type="number" placeholder="请输入数量" v-model="quantity"/>
                </div>
                <div class="buttonBox">
                    <div class="canBox" @click="downMask()">
                        <text class="buttonBoxText">取消</text>
                    </div>
                    <div class="confrimBox" @click="confrimMask()">
                        <text class="buttonBoxText">确定</text>
                    </div>
                </div>
            </div>
        </div>
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

    .bottomBox{
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
    .maskContent{
        width: 600px;
        background-color: #ffffff;
        border-radius: 20px;
        overflow: hidden;
        flex-direction: column;
        align-items: center;
        margin-top: 250px;
    }
    .maskTitle{
        font-size: 45px;
        color: #0088fb;
        margin-top: 50px;
    }
    .maskCell{
        flex-direction: row;
        align-items: center;
        margin-top: 20px;
    }
    .maskCellTitle{
        font-size: 32px;
        margin-right: 20px;
    }
    .maskCellValBox{
        width: 450px;
        height: 70px;
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
    }
    .maskCellVal{
        font-size: 32px;
        max-width: 400px;
        overflow: hidden;
        lines:1;
        text-overflow: ellipsis;
    }
    .maskCellInput{
        width: 450px;
        height: 70px;
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
        font-size: 32px;
    }
    .maskCellIcon{
        font-size: 35px;
        color: #999;
    }
    .buttonBox{
        width: 600px;
        border-top-width: 2px;
        border-top-color: #0088fb;
        flex-direction: row;
        align-items: center;
        margin-top: 50px;
    }
    .canBox{
        width: 300px;
        height: 90px;
        border-right-width: 2px;
        border-right-color: #0088fb;
        align-items: center;
        justify-content: center;
    }
    .canBox:active{
        background-color: #ccc;
    }
    .confrimBox{
        width: 300px;
        height: 90px;
        align-items: center;
        justify-content: center;
    }
    .confrimBox:active{
        background-color: #ccc;
    }
    .buttonBoxText{
        font-size: 35px;
        color: #0088fb;
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
            title: { default: "电子水票"},
            noDataHint: { default: "尚未拥有电子水票"},
        },
        created() {
            utils.initIconFont();
            this.logo = utils.getUrlParameter('logo');
            this.cardId = utils.getUrlParameter('cardId');
            this.memberId = utils.getUrlParameter('memberId');
            this.open();
            this.openProduct()
        },
        filters:{

        },
        methods: {
            showMask(type){
              if(type<2){
                  this.type=1
              }else{
                  this.type = 2
              }
              this.pickData = [];
              this.nowVal = '';
              this.quantity = '';
              this.pickIndex = 0;
              this.isMask = true
            },
            downMask(){
                this.isMask = false
            },
            openPick:function () {
                let _this = this;
                _this.pickData = [];
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                if(this.type<2){
                    // 核销
                    if(utils.isNull(_this.lists)){
                        event.toast('暂无水票')
                        _this.clicked = false;
                        return
                    }
                    _this.lists.forEach(function (item) {
                        _this.pickData.push(item.couponName)
                    })
                    picker.pick({
                        items:_this.pickData
                    }, e => {
                        if (e.result == 'success') {
                            _this.pickIndex = e.data;
                            _this.nowVal = _this.lists[_this.pickIndex].couponName;
                        }
                    })
                    _this.clicked = false;
                }else {
                    // 赠送
                    if(utils.isNull(_this.productList)){
                        event.toast('暂无水票')
                        _this.clicked = false;
                        return
                    }
                    _this.productList.forEach(function (item) {
                        _this.pickData.push(item.name)
                    });
                    picker.pick({
                        items:_this.pickData
                    }, e => {
                        if (e.result == 'success') {
                            _this.pickIndex = e.data;
                            _this.nowVal = _this.productList[_this.pickIndex].name;
                        }
                    });
                    _this.clicked = false;
                }

            },
            confrimMask(){
                let _this = this
                if(utils.isNull(this.nowVal)){
                    event.toast('请选择水票')
                    return
                }else  if(utils.isNull(this.quantity) || this.quantity<1){
                    event.toast('请输入数量')
                    return
                }
                if(this.type<2){
                    // 核销
                    POST('weex/member/couponCode/useT.jhtml?couponCodeId='+_this.lists[_this.pickIndex].id+'&quantity='+this.quantity).then(
                        function (mes) {
                            if (mes.type == "success") {
                                _this.open();
                                event.toast('核销成功');
                                _this.isMask = false
                            } else {
                                event.toast(mes.content);
                                _this.isMask = false
                            }
                        }, function (err) {
                            event.toast(err.content);
                            _this.isMask = false
                        }
                    )
                }else {
                    // 赠送
                    POST('weex/member/couponCode/addT.jhtml?productId='+_this.productList[_this.pickIndex].id+'&quantity='+this.quantity+'&memberId='+this.memberId).then(
                        function (mes) {
                            if (mes.type == "success") {
                                _this.open();
                                event.toast('赠送成功');
                                _this.isMask = false
                            } else {
                                event.toast(mes.content);
                                _this.isMask = false
                            }
                        }, function (err) {
                            event.toast(err.content);
                            _this.isMask = false
                        }
                    )
                }
            },
//             设置赠送张数
            settingNumber:function (id) {
                let _this = this;
                modal.prompt({
                    message: '赠送水票',
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
            openProduct(){
                var _this = this;
                GET('applet/product/list.jhtml?pageStart=0&pageSize=200&subType=water',function (mes) {
                    if (mes.type == 'success') {
                        _this.productList = mes.data.data;
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
