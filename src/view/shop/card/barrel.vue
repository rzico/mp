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
                            <text class="stock">余桶:{{c.stock}}   押桶:</text>
                        </div>
                        <div class="iconBox">
                            <text class="editorIcon" :style="{fontFamily:'iconfont'}">&#xe61d;</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
        <div class="mask">
            <div class="editorBox">
                <text class="fz40 mt30">编辑桶</text>
                <div class="editorCell">
                    <text class="fz32">押金:</text>
                    <input class="editorInput" type="number" placeholder="请输入押金" autofocus="true"/>
                </div>
                <div class="editorCell">
                    <text class="fz32">押桶:</text>
                    <input class="editorInput" type="number" placeholder="请输入押桶"/>
                </div>
                <div class="editorCell">
                    <text class="fz32">借桶:</text>
                    <input class="editorInput" type="number" placeholder="请输入借桶"/>
                </div>
                <div class="bottomBox">
                    <div class="leftBox"><text class="bottomBoxText">取消</text></div>
                    <div class="rightBox"><text class="bottomBoxText">确认</text></div>
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
    .editorInput{
        width: 500px;
        height: 98px;
        line-height: 90px;
        font-size: 32px;
        background-color: red;
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
        width: 510px;
        lines:2;
        text-overflow: ellipsis;
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
                refreshing:false,
                lists:[],
                pageSize:15,
                pageStart:0,
                canScroll:true,
                refreshImg:utils.locate('resources/images/loading.png'),
                cardId:'',
                total:0,
                money:0
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
            //             修改押金
            editorMoney:function () {
                let _this = this;
                modal.prompt({
                    message: '修改押金',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                    default:_this.money,
                }, function (value) {
                    if(value.result == '确定'){
                        if(value.data == '' || value.data == null ){
                            modal.toast({message:'请输入押金',duration:1})
                        }else{

                        }
                    }
                })
            },
            open:function () {
                var _this = this;
                GET('weex/member/barrel_stock/list.jhtml?cardId='+ this.cardId + '&pageStart='+this.pageStart +'&pageSize='+this.pageSize,function (mes) {
                    utils.debug(mes)
                    if (mes.type == 'success') {
                        _this.total = mes.data.stock;
                        _this.money = mes.data.pledge;
                        if (mes.data.start==0) {
                            _this.lists = mes.data.data;
                        } else {
                            mes.data.data.forEach(function(item){
                                _this.lists.push(item);
                            })
                        }
                        _this.pageStart = mes.data.start+mes.data.data.length;
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
