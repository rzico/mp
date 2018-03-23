<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" ></navbar>
        <list  style="background-color: #fff;"  @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="goodsList.length == 0">
                <noData :noDataHint="noDataHint" ndBgColor="#fff"></noData>
            </cell>
            <cell v-else v-for="(item,index) in goodsList">
                <div class="goodsLine" :class="[item.id == goodsId ? 'bgActive' : '']" @click="getId(item.id)">
                    <image class="goodsImg" :src="item.thumbnail | watchThumbnail"></image>
                    <div class="infoBox">
                        <text class="goodsName">{{item.name}}</text>
                        <div class="infoBoxBottom">
                        <text class="fz32" style="color: #EB4E40;margin-right: 20px">¥ {{item.price | currencyfmt}}</text>
                        <text class="sub_title fz28">库存: {{item.stock}}</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .bgActive{
        background-color: #ccc;
    }
    .goodsLine{
        height: 120px;
        flex-direction: row;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
        background-color: white;
        border-bottom-width: 1px;
        border-color: #ccc;
    }
    .goodsImg{
        height: 80px;
        width: 80px;
        border-radius: 5px;
        background-color: #eeeeee;
    }
    .goodsName{
        font-size: 32px;
        width: 550px;
        lines:1;
        text-overflow: ellipsis;
    }
    .infoBox{
        flex-direction: column;
        height: 80px;
        justify-content: space-between;
        margin-left: 20px;
    }
    .infoBoxBottom{
        flex-direction: row;
        align-items: center;
    }
</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import {dom,event,animation,storage} from '../../../weex.js';
    import { POST, GET } from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';
    import noData from '../../../include/noData.vue';
    const modal = weex.requireModule('modal');
    import searchNav from '../../../include/searchNav.vue';
    export default {
        data:{
            goodsList:[],
            goodsId:'',
            refreshing:false,
            pageStart:0,
            pageSize:10,
            refreshImg:utils.locate('resources/images/loading.png'),
//                分类id
            productCategoryId:'',
            clicked:false,
        },
        props:{
            noDataHint:{default:'暂无商品'},
            title:{default:'选择商品'},
//            searchHint: { default: "输入商品名" },
//            searchOrCancel:{default:'取消'},
        },
        components: {
            navbar,noData,searchNav
        },
        filters:{
            watchThumbnail(value){
                return utils.thumbnail(value,160,160);
            }
        },
        created(){
            this.permissions()
            utils.initIconFont();
//            获取商品列表
            this.getAllGoods();

        },
        methods:{

            //            获取权限
            permissions:function () {
                var _this = this;
                POST("weex/member/roles.jhtml").then(function (mes) {
                    if (mes.type=="success") {
                        _this.roles = mes.data;
                    } else {
                        event.toast(mes.content);
                    }
                },function (err) {
                    event.toast(err.content);
                });
            },
//            获取商品id传回上个页面
            getId:function (goodsId) {
                if(!utils.isNull(goodsId)) {
                    this.goodsId = goodsId;
                    event.closeURL(utils.message('success','',goodsId))
                }else {
                    return;
                }
            },
//            商品列表
            getAllGoods(){
                let _this = this;
                //            获取商品列表
                GET('weex/member/product/list.jhtml?productCategoryId=' + this.productCategoryId + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success'){
                        if (_this.pageStart == 0) {
                            _this.goodsList = data.data.data;
                        }else{
                            data.data.data.forEach(function (item) {
                                _this.goodsList.push(item);
                            })
                        }
                        _this.pageStart = data.data.start + data.data.data.length;
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            onloading:function () {
                    this.getAllGoods();
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
                    this.getAllGoods();
                }, 1000)
            },
            goback:function () {
//                var data =''
                event.closeURL();
            },
        }
    }
</script>