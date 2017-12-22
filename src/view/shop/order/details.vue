<template>
    <div class="wrapper" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <scroller   @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <noData :noDataHint="noDataHint" v-if="ordersList.length == 0" ndBgColor="#fff"></noData>
            <!--导航栏-->
            <div v-else v-for="(item,index) in ordersList">
                <div class="flex-row infoLines mt20" style="background-color: #fff">
                    <text class="carIcon"  :style="{fontFamily:'iconfont'}">&#xe604;</text>
                    <text class="title">感谢您在xxx购物,欢迎您再次光临!</text>
                </div>
                <div class="addressBox flex-row mt20">
                    <div style="width: 70px;">
                        <text class="addressIcon" :style="{fontFamily:'iconfont'}">&#xe792;</text>
                    </div>
                    <div style="width: 630px">
                        <div class="flex-row">
                            <text class="title">柯志杰</text>
                            <text class="title ml20">158****1039</text>
                        </div>
                        <div class="mt10">
                            <text class="sub_title" style="line-height: 42px">地址: 福建厦门市思明区城区谊爱路16号海西文创大厦228</text>
                        </div>
                    </div>
                </div>
                <div class="goodsLine mt20">
                    <div class="space-between goodsHead boder-bottom">
                        <div class="flex-row">
                            <image :src="refreshImg" class="shopImg"></image>
                            <text class="title ml20 mr20">adima旗舰店</text>
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                        <div class="flex-row">
                            <text class="sub_title" style="color: #666" :style="{fontFamily:'iconfont'}">联系卖家 </text>
                            <text class="sub_title primary"  :style="{fontFamily:'iconfont'}">&#xe628;</text>
                        </div>
                    </div>
                    <div class="flex-row goodsBody boder-bottom">
                        <image :src="refreshImg" class="goodsImg"></image>
                        <div class="goodsInfo" >
                            <text class="title goodsName">Adima 太阳伞防紫外线这样小清新纯色简约三折两用晴雨伞软面</text>
                            <text class="sub_title mt10">颜色分类:深蓝直伞</text>
                        </div>
                        <div class="goodsPriceNum">
                            <text class="title ">¥ 148.00</text>
                            <text class="sub_title">x1</text>
                            <text class="sub_title border shopCar" >加购物车</text>
                        </div>
                    </div>
                    <div class="flex-row goodsBody">
                        <image :src="refreshImg" class="goodsImg"></image>
                        <div class="goodsInfo " >
                            <text class="title goodsName">Adima 太阳伞防紫外线这样小清新纯色简约三折两用晴雨伞软面</text>
                            <text class="sub_title mt10">颜色分类:深蓝直伞</text>
                        </div>
                        <div class="goodsPriceNum">
                            <text class="title ">¥ 148.00</text>
                            <text class="sub_title">x1</text>
                            <text class="sub_title border shopCar" >加购物车</text>
                        </div>
                    </div>
                </div>
                <div class="mt20 infoBox">
                    <div class="infoLines boder-bottom">
                        <div class="flex-row">
                            <text class="sub_title">订单编号: 64805405523</text>
                            <text class="sub_title copyBtn border ml20">复制</text>
                        </div>
                        <div class="mt10 ">
                            <text class="sub_title">下单时间: 2017-12-05 10:43:46</text>
                        </div>
                    </div>
                    <div class="infoLines boder-bottom">
                        <text class="sub_title fz32">支付方式: 快捷支付</text>
                    </div>
                    <div class="infoLines">
                        <text class="sub_title fz32">配送方式: 普通快递</text>
                    </div>
                </div>
                <div class="mt20  boder-bottom" style="background-color: #fff">
                    <div class="priceLine boder-bottom">
                        <div class="space-between">
                            <text class="sub_title">商品总额</text>
                            <text class="sub_title">¥39.00</text>
                        </div>
                        <div class="mt10 space-between">
                            <text class="sub_title">+运费</text>
                            <text class="sub_title">¥0.00</text>
                        </div>
                    </div>
                    <div class="priceLine flex-end">
                        <div class="flex-row">
                            <text class="title mr20">实付款:</text>
                            <text class="title" style="color: red">¥39.00</text>
                        </div>
                    </div>
                </div>

            </div>
        </scroller>

        <div class="flex-row space-between goodsFoot">
            <div class="footMore">
                <text class="title" style="color: #444">删除订单</text>
            </div>
            <div class="flex-row">
                <text class="title footText">查看物流</text>
                <text class="title footText">评价晒单</text>
                <text class="title footText ">再次购买</text>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .carIcon{
        width: 60px;color: #444;font-size: 35px;
    }
    /*<!--底部金额-->*/
    .priceLine{
        background-color: #fff;
        padding-right: 30px;
        padding-top: 30px;
        padding-bottom: 30px;
        margin-left: 30px;
    }
    /**/
    /*<!--订单 支付方式 信息行-->*/
    .infoBox{
        background-color: #fff;
    }
    .copyBtn{
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 6px;
        padding-bottom: 6px;
        border-radius: 5px;
        font-size: 26px;
    }
    .infoLines{
        padding: 30px;

    }
    /**/

    /*<!--收货地址-->*/
    .addressIcon{
        width: 70px;
        font-size: 50px;
        color: #666;
    }
    .addressBox{
        padding: 20px;
        background-color: #fff;
    }

    /**/
    .footMore{
        width: 158px;align-items: center;
    }
    .red{
        color: red;
        border-color: red;
    }
    .coral{
        color: coral;
    }
    .footText{
        padding: 18px;
        border-radius: 5px;
        color: #444;
        border-color: #ccc;
        border-width: 1px;
        border-style: solid;
        margin-right: 20px;
    }
    .goodsFoot{
        padding-top: 20px;
        padding-bottom: 20px;
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
        width: 380px;
        padding-left: 20px;
    }
    .goodsBody{
        padding-top: 20px;
        padding-bottom: 20px;
        margin-left: 30px;
        padding-right: 30px;
    }
    .goodsLine{
        background-color: #fff;
    }
    .goodsImg{
        height: 160px;
        width: 160px;
        border-radius: 5px;
    }
    .goodsHead{
        background-color: #fff;
        padding: 20px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .shopImg{
        height: 40px;
        width: 40px;
    }
    .shopCar{
        font-size: 20px;color: #444;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 20px;
        padding-left: 20px;
        border-radius: 5px;
    }

</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import {dom,event,animation,storage} from '../../../weex.js';
    import { POST, GET } from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';
    import noData from '../../../include/noData.vue';
    const clipboard = weex.requireModule('clipboard');
    export default {
        data: {
            ordersList: ['1'],
            refreshing: false,
            pageStart: 0,
            pageSize: 15,
//            refreshImg:utils.locate('resources/images/loading.png'),
            refreshImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514462683&di=8f6e78d98e3cc8a0480c93058e674b14&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F18%2F27%2F68%2F55f95158e34f2_1024.jpg',
        },
        props: {
            noDataHint: {default: '暂无订单'},
            title: {default: '订单详情'}
        },
        components: {
            navbar, noData
        },
        created() {
            utils.initIconFont();
        },
        methods: {
            onloading: function () {
////            获取关注列表
            },
            onrefresh: function () {
                var _this = this;

                _this.pageStart = 0;
                this.refreshing = true;
                animation.transition(_this.$refs.refreshImg, {
                    styles: {
                        transform: 'rotate(360deg)',
                    },
                    duration: 1000, //ms
                    timingFunction: 'linear',//350 duration配合这个效果目前较好
                    needLayout: false,
                    delay: 0 //ms
                })
                setTimeout(() => {
                    animation.transition(_this.$refs.refreshImg, {
                        styles: {
                            transform: 'rotate(0)',
                        },
                        duration: 10, //ms
                        timingFunction: 'linear',//350 duration配合这个效果目前较好
                        needLayout: false,
                        delay: 0 //ms
                    })
                    this.refreshing = false;
////            获取关注列表
                }, 1000)
            },
//            点击复制
            copyCode(){
                clipboard.setString(this.copy);
                event.toast('复制成功');
            }
        }
    }
</script>