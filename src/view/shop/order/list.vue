<template>
    <div class="wrapper" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <div  class="corpusBox" >
            <scroller scroll-direction="horizontal"  class="corpusScroll">
                <div class="articleClass" v-for="(item,index) in catagoryList" >
                    <text @click="catagoryChange(index,item.id)" class="allArticle" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</text>
                </div>
            </scroller>
        </div>
        <list  @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="ordersList.length == 0">
                <noData :noDataHint="noDataHint" ndBgColor="#fff"></noData>
            </cell>
            <!--导航栏-->
            <cell v-else v-for="(item,index) in ordersList">
                <div class="goodsLine mt20">
                    <div class="space-between goodsHead" >
                        <div class="flex-row">
                            <image :src="refreshImg" class="shopImg"></image>
                            <text class="title ml20 mr20">adima旗舰店</text>
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                        <div >
                            <text class="title red">交易成功</text>
                        </div>
                    </div>
                    <div class="flex-row goodsBody">
                        <image :src="refreshImg" class="goodsImg"></image>
                        <div class="goodsInfo" >
                            <text class="title goodsName">Adima 太阳伞防紫外线这样小清新纯色简约三折两用晴雨伞软面</text>
                            <text class="sub_title mt10">颜色分类:深蓝直伞</text>
                        </div>
                        <div class="goodsPriceNum">
                            <text class="title coral">¥ 148.00</text>
                            <text class="sub_title">x1</text>
                        </div>
                    </div>
                    <div class="flex-row goodsTotalPrice boder-bottom">
                        <text class="title mr20">共1件商品</text>
                        <text class="title">合计:¥ 148.00</text>
                    </div>
                    <div class="flex-row space-between goodsFoot">
                        <div class="footMore">
                            <text class="sub_title">删除</text>
                        </div>
                        <div class="flex-row">
                            <text class="title footText">查看物流</text>
                            <text class="title footText">评价晒单</text>
                            <text class="title footText red">再次购买</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>

    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .footMore{
        width: 206px;align-items: center;
    }
    .red{
        color: red;
        border-color: red;
    }
    .coral{
        color: coral;
    }
    .footText{
        padding: 10px;
        border-radius: 5px;
        border-color: #ccc;
        border-width: 1px;
        border-style: solid;
        margin-right: 20px;
    }
    .goodsFoot{
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: 15px;
    }
    .goodsTotalPrice{
        padding: 20px;
        justify-content: flex-end;
    }
    .goodsName{
        line-height: 32px;
        lines:2;
        text-overflow: ellipsis;
    }
    .goodsPriceNum{
        height: 160px;
        align-items: flex-end;
        justify-content: space-between;
        width: 150px;
    }
    .goodsInfo{
        height: 160px;
        width: 400px;
        padding-left: 20px;
    }
    .goodsBody{
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 20px;
        padding-right: 20px;
        background-color: #eee;
    }
    .goodsLine{
        background-color: #fff;
    }
    .goodsImg{
        height: 160px;
        width: 160px;
    }
    .goodsHead{
        background-color: #fff;
        padding: 20px;
    }
    .shopImg{
        height: 40px;
        width: 40px;
    }
    /**/
    .articleClass{
        flex-direction: row;
        height:80px;
        background-color: #fff;
        align-items: center;
        justify-content: center;
        /*flex: 1;*/
        width: 150px;

    }
    .allArticle{
        font-size: 29px;
        flex: 1;
        text-align: center;
        line-height: 80px;
    }
    .corpusScroll{
        flex-direction: row;
        width: 750px;
        background-color: #fff;
    }
    .corpusBox{
        flex-direction: row;
        height:80px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
        background-color: #fff;

    }

</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import {dom,event,animation,storage} from '../../../weex.js';
    import { POST, GET } from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';
    import noData from '../../../include/noData.vue';
    export default {
        data:function(){
            return{
                ordersList:['1','2'],
                refreshing:false,
                pageStart:0,
                pageSize:15,
                refreshImg:utils.locate('resources/images/loading.png'),
                catagoryList:[{
                    name:'全部',
                    id:'0'
                },{
                    name:'待付款',
                    id:'1'
                },{
                    name:'待发货',
                    id:'2'
                },{
                    name:'待收货',
                    id:'3'
                },{
                    name:'退款/售后',
                    id:'4'
                }],
            }
        },
        props:{
            noDataHint:{default:'暂无订单'},
            title:{default:'订单管理'}
        },
        components: {
            navbar,noData
        },
        created(){
            utils.initIconFont();
        },
        methods:{
            onloading:function () {
////            获取关注列表
            },
            onrefresh:function () {
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
                    this.refreshing = false;
////            获取关注列表
                }, 1000)
            },

            goback:function () {
                event.closeURL();
            }

        }
    }
</script>