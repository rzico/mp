<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" @goComplete="setting" > </navbar>
        <div class="totalBox">
            <div class="totalBoxLeft">
                <text class="totalNumber">总计:{{total}}（个）</text>
            </div>
            <div class="totalBoxRight" >
                <text class="totalNumber">押金:{{money}}（元）</text>
                <!--<text class="editor" :style="{fontFamily:'iconfont'}">&#xe61d;</text>-->
            </div>
        </div>
        <!--<noData :noDataHint="noDataHint" v-if="lists.length == 0"></noData>-->
        <list  class="list"  :scrollable="canScroll" @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell >
                <div class="" v-for="c in lists">
                    <div class="contentBox">
                        <div class="couponDiv">
                            <image class="couponImg" :src="c.logo"></image>
                        </div>
                        <div class="infoBox">
                            <text class="couponTitle">{{c.name}}</text>
                            <text class="money">押金:{{c.pledge}}</text>
                            <text class="stock">余桶:{{c.stock}}   押桶:{{c.mortgage}}  借桶:{{c.borrow}}</text>
                        </div>
                        <div class="iconBox"  @click="openMask(c)">
                            <text class="editorIcon" :style="{fontFamily:'iconfont'}">&#xe61d;</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
        <div class="mask" v-if="isMask" >
            <div class="editorBox">
                <text class="fz40 mt30">编辑桶</text>
                <div class="editorCell">
                    <text class="fz32">押金:</text>
                    <input class="editorInput pl20" type="number" placeholder="请输入押金" autofocus="true" v-model="pledge"/>
                </div>
                <div class="editorCell">
                    <text class="fz32">押桶:</text>
                    <input class="editorInput pl20" type="number" placeholder="请输入押桶数量" v-model="mortgage"/>
                </div>
                <div class="editorCellTwo">
                    <text class="fz32">借桶:</text>
                    <input class="editorInput pl20" type="number" placeholder="请输入借桶数量" v-model="borrow"/>
                </div>
                <div class="bottomBox">
                    <div class="leftBox" @click="downMask()"><text class="bottomBoxText">取消</text></div>
                    <div class="rightBox" @click="confirm()"><text class="bottomBoxText">确认</text></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" src="../../../style/wx.less"/>
<style>
    .mask{
        position: fixed;top: 0px;left: 0px;right: 0px;bottom: 0px;background-color:rgba(000,000,000,0.4);
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
    .totalBox{
        height: 150px;
        background-color: white;
        border-radius: 15px;
        margin: 20px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .editor{

        font-size: 40px;
        color: #888888;
    }
    .totalBoxLeft{
        width:355px;
        height:110px;
        align-items: center;
        justify-content: center;
        border-color:#ccc;
        border-style: dashed;
        border-right-width:1px;
    }
    .totalBoxRight{
        width:354px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .totalNumber{
        font-size: 32px;
        margin-left: 20px;
    }
    .contentBox{
        height: 160px;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: white;
        flex-direction: row;
        align-items: center;
        border-radius: 15px;
    }
    .couponDiv{
        padding-left:20px;
        padding-right:20px;
        border-right-width: 1px;
        border-right-color: #cccccc;
        border-right-style: dashed;
    }
    .couponImg{
        height:120px;
        width: 120px;
    }
    .infoBox{
        flex-direction: column;
        justify-content: space-between;
        height: 120px;
        width: 430px;
        padding-left: 20px;
    }
    .couponTitle{
        font-size: 32px;
        width: 400px;
        lines:2;
        text-overflow: ellipsis;
    }
    .money{
        font-size: 28px;
        color: #888888;
    }
    .stock{
        font-size: 28px;
        color: #888888;
    }
    .iconBox{
        width: 100px;
        height: 120px;
        align-items: center;
        justify-content: center;
    }
    .editorIcon{
        font-size: 60px;
        color: #999;
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
                pageSize:15,
                pageStart:0,
                canScroll:true,
                refreshImg:utils.locate('resources/images/loading.png'),
                cardId:'',
                total:0,
                money:0,
                isMask:false,
                barrelId:'',
                pledge:0,
                mortgage:0,
                borrow:0
            }
        },
        props: {
            title: { default: "我的桶"},
            noDataHint: { default: "尚未拥有桶"},
        },
        created() {
            utils.initIconFont();
            this.cardId = utils.getUrlParameter('cardId');
            this.open();
        },
        filters:{

        },
        methods: {
            downMask(){
              this.isMask = false
            },
            openMask(c){
                this.isMask = true;
                this.barrelId = c.id;
                this.pledge = c.pledge;
                this.borrow = c.borrow;
                this.mortgage = c.mortgage;
            },
            confirm(){
                var _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                if(utils.isNull(this.pledge)){
                    this.pledge = 0
                }if(utils.isNull(this.borrow)){
                    this.borrow = 0
                }if(utils.isNull(this.mortgage)){
                    this.mortgage = 0
                }
                POST('weex/member/barrel_stock/update.jhtml?id='+ this.barrelId+'&pledge='+this.pledge+'&borrow='+this.borrow +'&mortgage='+this.mortgage).then(
                    function (data) {
                        _this.clicked = false;
                        if(data.type == 'success'){
                            _this.isMask = false;
                            event.toast('修改成功');
                            _this.open()
                        }else{
                            event.toast(data.content);
                        }
                    },
                    function (err) {
                        _this.clicked = false;
                        event.toast(err.content);
                    })
            },
            open:function () {
                var _this = this;
                GET('weex/member/barrel_stock/list.jhtml?cardId='+ this.cardId + '&pageStart='+this.pageStart +'&pageSize='+this.pageSize,function (mes) {
                    if (mes.type == 'success') {
                        _this.total = mes.data.stock;
                        _this.money = mes.data.pledge;
                        if (_this.pageStart==0) {
                            _this.lists = mes.data.data;
                        } else {
                            mes.data.data.forEach(function(item){
                                _this.lists.push(item);
                            })
                        }
                        _this.pageStart = _this.lists.length;
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            onloading (event) {
                this.open();
            },
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
