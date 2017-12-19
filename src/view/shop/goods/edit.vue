<template>
    <scroller class="wrapper" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <!--商品名称-->
        <div class="textareaBox boder-bottom boder-top">
            <textarea class="textarea "  return-key-type="next" placeholder="请输入商品名称" @input="oninput" @change="onchange" @focus="onfocus" @blur="onblur"></textarea>
        </div>
        <!--<div class="onlyPriceNum boder-top boder-bottom mt30">-->
        <!--<div class="inputLine flex-row boder-bottom">-->
        <!--<text class="title">价格</text>-->
        <!--<input type="number" return-key-type="next" class="lineContent" style="width:646px" placeholder="给商品定个好价格" />-->
        <!--</div>-->
        <!--<div class="inputLine flex-row">-->
        <!--<text class="title">库存</text>-->
        <!--<input type="number"  return-key-type="next"class="lineContent"  style="width:646px" placeholder="设置合力库存避免超卖" />-->
        <!--</div>-->
        <!--</div>-->

        <!--第一次出来时的商品规格行-->
        <div class="flex-row topGoodsBox boder-top boder-bottom" v-if="list.length == 0">
            <div>
                <image class="goodsImg" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1310014862,401506166&fm=27&gp=0.jpg"></image>
            </div>
            <div class="topPriceNum " >
                <div class="inputLine flex-row boder-bottom ">
                    <text class="title">价格</text>
                    <input type="number"  return-key-type="next"class="lineContent toplineContentHeight" placeholder="给商品定个好价格" />
                </div>
                <div class="inputLine flex-row ">
                    <text class="title">库存</text>
                    <input type="number"  return-key-type="next" class="lineContent toplineContentHeight" placeholder="设置合理库存避免超卖" />
                </div>
            </div>
        </div>
        <!--整个商品规格行-->
        <div v-for="(item,index) in list">
            <div class="flex-row goodsBox boder-top boder-bottom boder-right">
                <div>
                    <image class="goodsImg" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1310014862,401506166&fm=27&gp=0.jpg"></image>
                </div>
                <div class="priceNum">
                    <div class="inputLine flex-row boder-bottom">
                        <div class="flex-row">
                            <text class="title">规格</text>
                            <input type="text" return-key-type="next" class="lineContent specification"  placeholder="规格1" />
                        </div>
                        <!--2个规格中间的框-->
                        <div style="width: 1px;height: 40px" class="boder-left"></div>
                        <div class="flex-row">
                            <input type="text" return-key-type="next" class="lineContent specification "   placeholder="规格2" />
                        </div>
                    </div>
                    <div class="inputLine flex-row boder-bottom">
                        <text class="title">价格</text>
                        <input type="number"  return-key-type="next"class="lineContent" placeholder="给商品定个好价格" />
                    </div>
                    <div class="inputLine flex-row">
                        <text class="title">库存</text>
                        <input type="number"  return-key-type="next"class="lineContent" placeholder="设置合理库存避免超卖" />
                    </div>
                </div>
            </div>
            <!--添加大圈后 安卓出不来样式-->
            <!--<div class="delBox" @click="delLines(index)">-->
                <!--外圆，弄出整个圆圈框-->
                <div class="delBigBox"></div>
                <!--遮住右边半圈边框-->
                <div class="delBoxRight"></div>
                <!--删除框-->
                <div class="delSmallBox" @click="delLines(index)">
                    <text style="color: #fff;font-size: 32px">一</text>
                </div>
            <!--</div>-->
        </div>
        <!--底部添加商品规格栏-->
        <div class="flex-row ml20 mt30 bt30" @click="addLines()">
            <text class="fz35 primary" style="margin-top: 4px" :style="{fontFamily:'iconfont'}">&#xe6b5;</text>
            <text class="fz35 ml10">添加商品规格</text>
        </div>
        <div class="sub-panel ml20">
            <text class="sub_title">通过分类有效管理不同类型的商品</text>
        </div>
        <div class="cell-row cell-line mt0" @click="goChooseCorpus()">
            <div class="cell-panel space-between cell-clear">
                <div class="flex-row">
                    <text class="title ">选择分类</text>
                </div>
                <div class="flex-row flex-end">
                    <text class="sub_title">{{categoryName}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
        </div>
        <div class="button bw bkg-primary" @click="addGoods()">
            <text class="buttonText ">添加商品</text>
        </div>
    </scroller>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>

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



    .delSmallBox{
        position: absolute;
        right: 15px;
        top: 150px;
        background-color: red;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 25px;
    }
    /*.delBox{*/
        /*position: absolute;top: 140px;right: 5px;*/
    /*}*/
    .delBigBox{
        border-width: 1px;
        border-style: solid;
        border-color: #ccc;
        width: 70px;
        height: 70px;
        border-radius: 35px;
        background-color: #eee;
        align-items: center;
        justify-content: center;
        position: absolute;
        top:140px;
        right: 5px;
    }
    .delBoxRight{
        height: 72px;
        width: 40px;
        right: 0px;
        top: 139px;
        background-color: #eee;
        position: absolute;
    }
    .topGoodsBox{
        width: 750px;
        background-color: #fff;
        margin-top: 30px;
    }
    .goodsBox{
        width: 710px;
        background-color: #fff;
        margin-top: 30px;
    }
    .goodsImg{
        border-radius: 5px;
        height: 160px;
        width: 160px;
        margin-left: 20px;
    }
    .toplineContentHeight{
        width:446px;
    }
    .lineContent{
        height: 80px;
        font-size: 32px;
        width: 346px;
        margin-left: 20px;
    }
    .specification{
        width: 173px;
    }
    .onlyPriceNum{
        width:750px;
        background-color: #fff;
    }
    .topPriceNum{
        width: 550px;
        margin-left: 20px;
    }
    .priceNum{
        width: 480px;
        margin-left: 20px;
    }
    .inputLine{
        height: 100px;
        margin-left: 20px;
    }
    .textareaBox{
        margin-top: 30px;
        background-color: #fff;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        width: 750px;
    }
    .textarea {
        height: 120px;
        font-size: 32px;
        color: #666666;
    }
</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import {dom,event,animation} from '../../../weex.js';
    import { POST, GET } from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';
    export default {
        data:{
            list:[],
            categoryName:'全部商品'
        },
        props:{
            title:{default:'新增商品'}
        },
        components: {
            navbar
        },
        created(){
            utils.initIconFont();
            if(utils.getUrlParameter('type') == 'edit'){
                this.title = '编辑商品';
            }
        },
        methods:{
            addLines(){
                this.list.push(' ');
            },
            delLines(index){
                this.list.splice(index,1);
            }
        }
    }
</script>