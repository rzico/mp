<template>
    <div class="wrapper" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <div  class="corpusBox" >
            <scroller scroll-direction="horizontal"  class="corpusScroll">
                <div class="articleClass">
                    <text @click="catagoryChange(index,item.id)" class="allArticle" v-for="(item,index) in catagoryList" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</text>
                </div>
            </scroller>
            <div class="corpusIconBox" @click="goCatagory()"  >
                <text  :style="{fontFamily:'iconfont'}" class="fz35">&#xe603;</text>
            </div>
        </div>
        <list  style="background-color: #fff;"  @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="goodsList.length == 0">
                <noData :noDataHint="noDataHint" ndBgColor="#fff"></noData>
            </cell>
            <!--导航栏-->
            <cell v-else v-for="(item,index) in goodsList">
                <div class="goodsLine boder-bottom" @click="popup()">
                    <image class="goodsImg" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1310014862,401506166&fm=27&gp=0.jpg"></image>
                    <div class="infoBox">
                        <div class="flex1 ">
                            <text class="linesCtrl title">逗狗小玩具逗狗</text>
                        </div>
                        <div class="flex1 " >
                            <div class="bt10 flex1" >
                                <text class="goodsPrice" >¥ 144.00</text>
                            </div>
                            <div class="space-between bottomInfo flex1">
                                <text class="sub_title fz28">库存: 292</text>
                                <text class="sub_title fz28">销量: 0</text>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="goodsLine boder-bottom" @click="popup()">
                    <image class="goodsImg" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1310014862,401506166&fm=27&gp=0.jpg"></image>
                    <div class="infoBox">
                        <div class="flex1 ">
                            <text class="linesCtrl title">逗狗小玩具逗狗小玩具逗狗小玩具逗狗小玩具逗狗小玩具逗狗小玩具逗狗小玩具</text>
                        </div>
                        <div class="flex1 " >
                            <div class="bt10 flex1" >
                                <text class="goodsPrice" >¥ 144.00</text>
                            </div>
                            <div class="space-between bottomInfo flex1">
                                <text class="sub_title fz28">库存: 292</text>
                                <text class="sub_title fz28">销量: 0</text>
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
        <div class="button bw bkg-primary" @click="addGoods()">
            <text class="buttonText ">添加商品</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .articleClass{
        flex-direction: row;
        padding-left: 10px;
        height:80px;
        background-color: #fff;
    }
    .corpusIconBox{
        width: 100px;justify-content: center;align-items: center;background-color: white;
    }
    .allArticle{
        font-size: 29px;
        line-height: 80px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .corpusScroll{
        flex-direction: row;width: 650px;
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



    .goodsLine:active{
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
    .bw{
        margin-top:20px;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 20px;
    }
    .buttonText{
        font-size: 32px;
        color:#ffffff;
    }
    .goodsImg{
        border-radius: 5px;
        height: 160px;
        width: 160px;
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
        data:{
            goodsList:['1'],
            refreshing:false,
            pageStart:0,
            pageSize:15,
            reviewNum:0,
            isPopup:false,
            refreshImg:utils.locate('resources/images/loading.png'),
            catagoryList:[{
                name:'全部',
                id:''
            }],
            whichCorpus:0,
//                分类id
            corpusId:'',
        },
        props:{
            noDataHint:{default:'暂无商品'},
            title:{default:'商品管理'}
        },
        components: {
            navbar,noData
        },
        created(){
            utils.initIconFont();
            this.getCatagory();
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

            doCancel:function () {
                this.isPopup = false;
            },
            popup:function (id) {
                if (this.isPopup==false) {
                    this.isPopup = true;
                }
            },
            addGoods(){
                event.openURL(utils.locate('view/shop/goods/edit.js?type=add'), function () {
                });
            },
//            分类
            goCatagory(){
                var _this = this;
                event.openURL(utils.locate('view/shop/goods/catagory.js?name=catagoryList'), function (data) {
                    this.getCatagory();
                });
            },
//分类切换
            catagoryChange:function(index,id){
//                event.toast(id);
                var _this = this;
                if(_this.whichCorpus == index){
                    return;
                }
                _this.whichCorpus = index;
                _this.corpusId = id;

//                _this.getAllArticle();
            },

//            获取分类
            getCatagory:function () {
                var _this = this;
                GET('weex/member/product_category/list.jhtml',function (data) {
                    if (data.type == "success") {
                        if(data.data == ''){
                        }else{
//                            event.toast(data.data);
                            _this.catagoryList = '';
                            _this.catagoryList =[{
                                name:'全部',
                                id:''
                            }];
//                                将文集名循环插入数组中
                            for(let i = 0; i<data.data.length;i++){
                                _this.catagoryList.splice(1 + i,0,data.data[i]);
                            }
                            data.data = JSON.stringify(data.data);
                            storage.setItem('catagoryList',data.data);
                        }
                    }else {
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
        }
    }
</script>