<template>
    <div class="wrapper ">
        <!--输入栏-->
        <searchNav :searchHint="searchHint" @oninput="oninput" @search="search"  ref="childFind"> </searchNav>
        <!--搜索栏-->
        <div v-if="isInput() ">
            <div class="confm" v-if="!isSearch" @click="childSearch()">
                <text class="ico" :style="{fontFamily:'iconfont'}">&#xe611;</text>
                <text class="title">搜索: {{keyword}} </text>
            </div>
        </div>
        <!--数据显示-->
        <list  style="background-color: #fff;"  @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="goodsList.length == 0">
                <noData :noDataHint="noDataHint" ndBgColor="#fff"></noData>
            </cell>
            <!--导航栏-->
            <cell v-else v-for="(item,index) in goodsList">
                <div class="goodsLine boder-bottom" :class="[item.id == goodsId ? 'bgActive' : '']" @click="popup(item.id,index)">
                    <image class="goodsImg" :src="item.thumbnail | watchThumbnail"></image>
                    <div class="infoBox">
                        <div class="flex1 ">
                            <text class="linesCtrl title">{{item.name}}</text>
                        </div>
                        <div class="flex1 " >
                            <div class="bt10 flex1" >
                                <text class="goodsPrice" >¥ {{item.price | currencyfmt}}</text>
                            </div>
                            <div class="space-between bottomInfo flex1">
                                <text class="sub_title fz28">库存: {{item.stock}}</text>
                                <!--<text class="sub_title fz28">销量: {{item.sales}}</text>-->
                            </div>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
        <div class="shareBox" v-if="isPopup">
            <div style="width: 750px;align-items: center">
                <text class="fz30 pt30 " style="color: #444">操作</text>
            </div>
            <div>
                <div class="bottomBorder shareLineBox">
                    <div  class="singleBox" @click="doEdit()">
                        <div class="imgBox"  @click="doEdit()">
                            <text class="primary popupImg" :style="{fontFamily:'iconfont'}">&#xe61d;</text>
                        </div>
                        <text class="fz28 mt20 color444 ">编辑</text>
                    </div>
                    <div class="singleBox" @click="doDel()">
                        <div class="imgBox" @click="doDel()">
                            <text class="primary popupImg" :style="{fontFamily:'iconfont'}">&#xe67d;</text>
                        </div>
                        <text class="fz28 mt20 color444">发布</text>
                    </div>
                    <div class="singleBox" @click="doDel()">
                        <div class="imgBox" @click="doDel()">
                            <text class="primary popupImg" :style="{fontFamily:'iconfont'}">&#xe652;</text>
                        </div>
                        <text class="fz28 mt20 color444">删除</text>
                    </div>
                </div>
            </div>
            <div class="cancelBox" @click="doCancel()">
                <text class="fz32">取消</text>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>

    .confm {
        background-color: white;
        height:90px;
        flex-direction: row;
        align-items: center;
        padding-left: 20px;

    }


    /*<!--底部操作-->*/
    .shareBox{
        background-color:#F5F4F5;
        position: fixed;
        bottom:0px ;
        left: 0;
        right:0;
    }
    .singleBox{
        align-items: center;margin-right: 15px;
    }
    .shareLineBox{
        width: 730px;margin-left: 20px;padding-right: 20px;flex-direction: row;padding-top: 30px;padding-bottom: 30px;
    }
    .bottomBorder{
        border-style: solid;border-color: gainsboro;border-bottom-width: 1px;
    }
    .cancelBox{
        width: 750px;align-items: center;height:100px;background-color: #fff;justify-content: center;
    }
    .cancelBox:active{
        background-color: #999;
    }
    .imgBox:active{
        background-color: #999;
    }
    .color444{
        color:#444;
    }
    .popupImg {
        font-size: 78px;
        width:80px;
        height:80px;
    }
    .imgBox{
        background-color: #fff;
        padding-left: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-right: 20px;
        border-radius: 30px;
    }



    .bgActive{
        background-color: #ccc;
    }
    .linesCtrl{
        lines:2;
        text-overflow: ellipsis;
    }
    .bottomInfo{
        padding-right: 40px;
    }
    .infoBox{
        height: 160px;
        padding-left: 20px;
        width: 560px;
    }
    .goodsPrice{
        color: coral;
        font-size: 37px;
    }
    .goodsLine{
        padding: 20px;
        flex-direction: row;
        width: 750px;
    }
    .goodsImg{
        border-radius: 5px;
        height: 160px;
        width: 160px;
    }

</style>
<script>
    const event = weex.requireModule('event');
    const stream = weex.requireModule('stream');
    import searchNav from '../../../include/searchNav.vue';
    import noData from '../../../include/noData.vue';
    import utils from '../../../assets/utils';
    import { POST, GET } from '../../../assets/fetch'
    export default {
        components: {
            searchNav,noData
        },
        data() {
            return {
                keyword:"",
                goodsList:[],
                isSearch:false,
                refreshing:false,
                pageStart:0,
                pageSize:10,
                isPopup:false,
                refreshImg:utils.locate('resources/images/loading.png'),
            }
        },
        props: {
            searchHint: { default: "输入商品名" },
            noDataHint: { default: "输入查找商品" }
        },
        created(){
            utils.initIconFont();
//            event.changeWindowsBar('true');
        },
        methods: {
            isEmpty:function () {
                return this.goodsList.length==0;
            },
            isNoEmpty:function () {
                return this.goodsList.length!=0;
            },
            isInput:function () {
                return this.keyword!="";
            },
            oninput:function (val) {
                this.isSearch = false;
                this.keyword = val;
                if(val.length == 0){
                    this.goodsList = [];
                    this.noDataHint = "输入查找商品";
                }
            },
            search: function (e) {
                var _this = this;
                this.isSearch = true;
                this.pageStart = 0;
                this.searchGoods();
            },
            searchGoods:function () {
                GET('weex/member/product/search.jhtml?keyword='+_this.keyword  + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success'){
                        if (_this.pageStart == 0) {
                            _this.goodsList = data.data.data;
                        }else{
                            data.data.data.forEach(function (item) {
                                _this.goodsList.push(item);
                            })
                        }
                        _this.noDataHint = '商品不存在';
                        _this.pageStart = data.data.start + data.data.data.length;
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
//            通知自组件将input失去焦点
            childSearch(){
                this.$refs.childFind.search();
            },
            onloading:function () {
////            获取商品列表
                this.searchGoods();
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
////            获取商品列表
                    this.searchGoods();
                }, 1000)
            },
//            重置商品选择状态
            doReset(){
                this.isPopup = false;
                this.goodsId = 0;
            },
//            点击取消
            doCancel:function () {
                this.doReset();
            },
            popup:function (id,index) {
                if (this.isPopup==false) {
                    this.isPopup = true;
                }
                this.goodsId = id;
                this.goodsIndex = index;
            },
        }

    }

</script>