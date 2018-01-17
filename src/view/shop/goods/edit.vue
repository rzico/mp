<template>
    <div  class="wrapper" >
        <scroller>
            <navbar :title="title"  @goback="goback" ></navbar>
            <!--商品名称-->
            <div class="textareaBox boder-bottom boder-top" ref="textareaRef">
                <textarea class="textarea " v-model="goodsName"  return-key-type="next" placeholder="请输入商品名称" @input="oninput" @change="onchange" @focus="onfocus" @blur="onblur"></textarea>
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
            <div style="width: 750px;background-color: #fff" class="mt30 boder-bottom boder-top" >
                <div class="inputLine flex-row" >
                    <text class="title">单位</text>
                    <input type="text" v-model="goodsUnit" return-key-type="next"class="lineContent goodsAdress" placeholder="个、件、袋等" />
                </div>
            </div>
            <transition name="paraTransition" tag="div">
                <!--第一次出来时的商品规格行-->
                <div class="flex-row topGoodsBox boder-top boder-bottom"  v-if="list.length == 0">
                    <div>
                        <image class="goodsImg" :class="[firstThumbnailImg == '' ? 'goodsImgBorder' : '']" @click="firstImg()" :src="firstThumbnailImg"></image>
                    </div>
                    <div class="topPriceNum " >
                        <div class="inputLine flex-row boder-bottom ">
                            <text class="title">价格</text>
                            <input type="number" v-model="topLinePrice" return-key-type="next"class="lineContent toplineContentHeight" placeholder="给商品定个好价格" />
                        </div>
                        <div class="inputLine flex-row ">
                            <text class="title">库存</text>
                            <input type="number" v-model="topLineNum"  return-key-type="next" class="lineContent toplineContentHeight" placeholder="设置合理库存避免超卖" />
                        </div>
                    </div>
                </div>
            </transition>
            <!--整个商品规格行-->
            <div v-for="(item,index) in list" ref="goodsRef">
                <div class="flex-row goodsBox boder-top boder-bottom boder-right"  :class="[item.isNew ? 'borderColor' : '']" >
                    <div>
                        <image class="goodsImg" @click="goodsImg(item)"  :class="[firstThumbnailImg == '' ? 'goodsImgBorder' : '']" :src="item.thumbnail"></image>
                    </div>
                    <div class="priceNum">
                        <div class="inputLine flex-row boder-bottom">
                            <div class="flex-row">
                                <text class="title">规格</text>
                                <input type="text" autofocus="true" @input="oninput(item,index)" v-model="item.spec1" return-key-type="next" class="lineContent specification pr20"  placeholder="规格1" />
                            </div>
                            <!--2个规格中间的框-->
                            <div style="width: 1px;height: 40px" class="boder-left"></div>
                            <div class="flex-row" >
                                <input type="text" v-model="item.spec2" @input="oninput(item,index)" return-key-type="next" class="lineContent specification "   placeholder="规格2" />
                            </div>
                        </div>
                        <div class="inputLine flex-row boder-bottom">
                            <text class="title">价格</text>
                            <input type="number" v-model="item.price" @input="oninput(item,index)" return-key-type="next" class="lineContent" placeholder="给商品定个好价格" />
                        </div>
                        <div class="inputLine flex-row">
                            <text class="title">库存</text>
                            <input type="number" v-model="item.stock" @input="oninput(item,index)" return-key-type="next" class="lineContent" placeholder="设置合理库存避免超卖" />
                        </div>
                    </div>

                    <!--上箭头-->
                    <div class="rightArrow upArrow" v-if="index != 0" @click="moveUp(index)">
                        <text class="arrowSize" :style="{fontFamily:'iconfont'}" >&#xe608;</text>
                    </div>
                    <!--下箭头-->
                    <div class="rightArrow downArrow" v-if="lastPara(index)" @click="moveBottom(index)">
                        <text class="arrowSize" :style="{fontFamily:'iconfont'}" >&#xe601;</text>
                    </div>
                </div>

                <!--添加大圈后 安卓出不来样式-->
                <!--<div class="delBox" @click="delLines(index)">-->
                <!--外圆，弄出整个圆圈框-->
                <div class="delBigBox" :class="[item.isNew ? 'borderColor' : '']"></div>
                <!--遮住右边半圈边框-->
                <div class="delBoxRight"></div>
                <!--删除框-->
                <div class="delSmallBox" @click="delLines(item,index)">
                    <text style="color: #fff;font-size: 32px">一</text>
                </div>
                <!--</div>-->
            </div>
            <!--底部添加商品规格栏-->
            <div class="flex-row ml20 pt30 pb30" @click="addLines()">
                <text class="fz35 primary" style="margin-top: 3px" :style="{fontFamily:'iconfont'}">&#xe6b5;</text>
                <text class="fz35 ml10">添加商品规格</text>
            </div>
            <div class="sub-panel ml20 ">
                <text class="sub_title">通过分类有效管理不同类型的商品</text>
            </div>
            <div class="cell-row cell-line mt10" @click="goChooseCatagory()">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ">选择分类</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{catagoryName}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>

            <!--<div class="sub-panel ml20 mt10">-->
                <!--<text class="sub_title">设置你的专属营销策略</text>-->
            <!--</div>-->
            <!--<div class="cell-row cell-line mt10" @click="goChooseDistri()">-->
                <!--<div class="cell-panel space-between cell-clear">-->
                    <!--<div class="flex-row">-->
                        <!--<text class="title ">营销策略</text>-->
                    <!--</div>-->
                    <!--<div class="flex-row flex-end">-->
                        <!--<text class="sub_title">{{catagoryName}}</text>-->
                        <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->

            <div style="height: 400px"></div>
        </scroller>
        <div class="button bw bkg-primary" @click="goComplete()">
            <text class="buttonText ">保存</text>
        </div>

        <!--遮罩-->
        <div class="sendMask" @click="maskClick()" v-if="toSendArticle">
            <!--进度条-->
            <div class="processBox">
                <text class="processText">正在云同步,请稍候...</text>
                <!--进度条背景-->
                <div class="processStyle processBg"></div>
                <!--进度条进度与颜色-->
                <div :style="{width:processWidth + 'px'}"  class="processStyle bkg-primary"></div>
                <text class="processTotal">{{currentPro}}/{{proTotal}}</text>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    /*<!--进度条-->*/
    .processTotal{
        position: absolute;
        bottom: 40px;
        right: 50px;
        font-size: 28px;
        color: #888;
    }
    .processBg{
        background-color: #ccc;
        width:500px;
    }
    .processStyle{
        height:10px;
        position: absolute;
        left: 50px;
        bottom:100px;
    }
    .processText{
        position: absolute;
        top:40px;
        left: 50px;
        font-size: 32px;
    }
    .processBox{
        height:250px;
        border-radius: 5px;
        width:600px;
        background-color: #fff;
        justify-content: space-between;
    }
    .sendMask{
        position: absolute;
        top: 0;
        bottom: 0;
        left:0;
        right: 0;
        background-color: rgba(0,0,0,0.8);
        align-items: center;
        justify-content: center;
    }
    /**/
    .arrowSize{
        color: #999;
        font-size: 34px;
        font-weight: 700;
    }
    .upArrow{
        top:0px;
        padding-top: 5px;
        padding-left: 10px;
        padding-bottom: 10px;
    }
    .downArrow{
        bottom:0px;
        padding-top: 10px;
        padding-bottom: 5px;
        padding-left: 10px;
    }
    .rightArrow{
        position: absolute;
        right: 0px;
        padding-right: 10px;
    }
    .goodsImgBorder{
        border-width: 1px;
        border-color: #ccc;
        border-style: dashed;
    }
    .borderColor{
        border-color: red;
    }
    /*商品段落动画*/
    .paraTransition-enter-active{
        transition: all 0.2s;
    }
    .paraTransition-leave-active {
        transition: all 0.1s;
    }
    .paraTransition-leave-to{
        transform: translateX(0px);
        opacity: 0;
    }
    .paraTransition-enter-to{
        transform: translateX(0px);
        opacity: 1;
    }
    /*ios下 -enter 会直接变成结束状态。所以opacity只能为1。为0.5 结束后就变为0.5*/
    .paraTransition-enter{
        transform: translateX(0px);
        opacity: 1;
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
    .goodsAdress{
        width: 600px;
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
        width: 165px;
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
        /*width: 480px;*/
        width: 460px;
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
        font-size: 35px;
    }
</style>
<script>
    const modal = weex.requireModule('modal');
    const album = weex.requireModule('album');
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import {dom,event,animation} from '../../../weex.js';
    import { POST, GET } from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';
    export default {
        data:{
            list:[],
            goodsName:'',
            catagoryName:'全部商品',
            catagoryId:'',
            topLinePrice:'',
            topLineNum:'',
            firstThumbnailImg:'',
            firstParaImage:'',
            firstProductId:'',
            toSendArticle:false,//控制进度条 遮罩显示
            currentPro:0,//当前进度
            proTotal:0,//总的进度
            processWidth:0,//进度条宽度
            goodsUnit:'',
            productTemplates:[],
            goodsId:'',
            clicked:false,
        },
        props:{
            title:{default:'新增商品'}
        },
        components: {
            navbar
        },
        created(){
            let _this = this;
            utils.initIconFont();
            if(!utils.isNull(utils.getUrlParameter('id'))){
                this.title = '编辑商品';
                this.goodsId = utils.getUrlParameter('id');
                GET('weex/member/product/view.jhtml?id=' + this.goodsId,function (data) {
                    if(data.type == 'success'){
                        _this.goodsName = data.data.name;
                        _this.goodsUnit = data.data.unit;
                        if(!utils.isNull(data.data.productCategory.id)){
                            _this.catagoryId = data.data.productCategory.id;
                        }
                        if(!utils.isNull(data.data.productCategory.name)){
                            _this.catagoryName = data.data.productCategory.name;
                        }
                        if(data.data.products.length == 1 &&  utils.isNull(data.data.products[0].spec1)){
                            _this.firstProductId = data.data.products[0].productId;
                            _this.firstThumbnailImg = data.data.products[0].thumbnail;
                            _this.firstParaImage = data.data.products[0].thumbnail;
                            _this.topLinePrice = data.data.products[0].price;
                            _this.topLineNum = data.data.products[0].stock;
                        }else{
                            data.data.products.forEach(function (item) {
                                item.paraImage = item.thumbnail;
                                item.isNew = false;
                                _this.list.push(item);
                            })
                        }
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            }
        },
        methods: {
//            添加商品规格行
            addLines() {
                if (this.list.length == 0) {
//                    第一个商品规格的价格和库存默认为页面单独填写的商品初始价格和库存
                    this.list.push({
                        spec1: '',
                        spec2: '',
                        price: this.topLinePrice,
                        stock: this.topLineNum,
                        isNew: true,
                        thumbnail: this.firstThumbnailImg,
                        paraImage: this.firstParaImage,
                        productId:''
                    })
                    let _this = this;
//                    滑动到多行输入框,优化用户体验
                    setTimeout(function () {
                        const el = _this.$refs.textareaRef//跳转到相应的cell
                        dom.scrollToElement(el, {})
                    }, 200)
                } else {
                    let goodsIndex = this.list.length - 1;
//                    新加的商品规格默认为上一个物品的商品规格
                    this.list.push({
                        spec1: this.list[goodsIndex].spec1,
                        spec2: this.list[goodsIndex].spec2,
                        price: this.list[goodsIndex].price,
                        stock: this.list[goodsIndex].stock,
                        isNew: true,
                        thumbnail: this.list[goodsIndex].thumbnail,
                        paraImage: this.list[goodsIndex].paraImage,
                        productId:''
                    })
                    //                    滑动到上一个输入框,优化用户体验
                    let _this = this;
                    setTimeout(function () {
                        const el = _this.$refs.goodsRef[goodsIndex]//跳转到相应的cell
                        dom.scrollToElement(el, {
                            offset: 100
                        })
                    }, 200)

                }
            },
//            删除商品规格行
            delLines(item, index) {
                if (item.isNew) {
                    this.list.splice(index, 1);
                } else {
                    let _this = this;
                    modal.confirm({
                        message: '是否删除该商品规格?',
                        duration: 0.3,
                        okTitle: '删除',
                        cancelTitle: '取消',
                    }, function (value) {
                        if (value == '删除') {
                            _this.list.splice(index, 1);
                        }
                    })
                }

            },
//            输入框输入事件   input的oninput事件，在安卓上 通过v-model事件预设input内的值时会触发oninput事件，ios上不会
            oninput(item, index) {
//                if(index != 0){
                var isRepeat = 0;
//                    规格1不能为空
                if (item.spec1 == '') {
                    item.isNew = true;
                    return;
                }
//                    每次输入 遍历规格1 2的名称是否重复
                this.list.forEach(function (listItem) {
                    if (item.spec1 == listItem.spec1 && item.spec2 == listItem.spec2) {
                        isRepeat++;
                    }
                })
//                    因为本身肯定等于本身，所以isRepeat至少会为1。
                if (isRepeat >= 2) {
                    item.isNew = true;
                } else {
                    item.isNew = false;
                }
//                    if(item.specificationFirst != this.list[index - 1].spec1 && item.sepcificationSecond != this.list[index - 1].sepcificationSecond){
//                        item.isNew = false;
//                    }
//                }else{
//                    if(item.spec1 != '' ){
//                        item.isNew = false;
//                    }else{
//                        item.isNew = true;
//                    }
//                }
            },
//            初始商品选择图片
            firstImg() {
                let _this = this;
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    true, function (mes) {
                        if (mes.type == 'success') {
                                _this.firstParaImage = mes.data.originalPath;
                                _this.firstThumbnailImg = mes.data.thumbnailSmallPath;
                        }
                    })
            },
//            新增的商品行选择图片
            goodsImg(item) {
                let _this = this;
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    true, function (mes) {
                        if (mes.type == 'success') {
                                item.paraImage = mes.data.originalPath;
                                item.thumbnail = mes.data.thumbnailSmallPath;
                        }
                    })
            },

//            选择商品分类
            goChooseCatagory() {
                let _this = this;
                event.openURL(utils.locate('view/shop/goods/chooseCatagory.js?catagoryId=' + this.catagoryId), function (data) {
                    if(data.type == 'success' && data.data != ''){
                        _this.catagoryId = parseInt(data.data.catagoryId);
                        _this.catagoryName = data.data.catagoryName;
                    }
                });
            },
//            选择营销策略
            goChooseDistri(){
                let _this = this;
                event.openURL(utils.locate('view/shop/goods/distribution.js?catagoryId=' + this.catagoryId), function (data) {
                    if(data.type == 'success' && data.data != ''){
                        _this.catagoryId = parseInt(data.data.catagoryId);
                        _this.catagoryName = data.data.catagoryName;
                    }
                });
            },

//            判断是否最后一个段落来添加向下移动的箭头。
            lastPara: function (index) {
                if (index != this.list.length - 1) {
                    return true;
                } else {
                    return false;
                }
            },

//            上箭头
            moveUp: function (index) {
                let _this = this;
//         方法2
                let a = this.list[index].spec1;
                let b = this.list[index].spec2;
                let c = this.list[index].price;
                let d = this.list[index].stock;
                let e = this.list[index].isNew;
                let f = this.list[index].thumbnail;
                let g = this.list[index].paraImage;
                let h = this.list[index].productId;
                this.list[index].spec1 = this.list[index - 1].spec1;
                this.list[index].spec2 = this.list[index - 1].spec2;
                this.list[index].price = this.list[index - 1].price;
                this.list[index].stock = this.list[index - 1].stock;
                this.list[index].isNew = this.list[index - 1].isNew;
                this.list[index].thumbnail = this.list[index - 1].thumbnail;
                this.list[index].paraImage = this.list[index - 1].paraImage;
                this.list[index].productId = this.list[index - 1].productId;
                this.list[index - 1].spec1 = a;
                this.list[index - 1].spec2 = b;
                this.list[index - 1].price = c;
                this.list[index - 1].stock = d;
                this.list[index - 1].isNew = e;
                this.list[index - 1].thumbnail = f;
                this.list[index - 1].paraImage = g;
                this.list[index - 1].productId = h;
            },
//            下箭头
            moveBottom: function (index) {
                let _this = this;
//         方法2
                let a = this.list[index].spec1;
                let b = this.list[index].spec2;
                let c = this.list[index].price;
                let d = this.list[index].stock;
                let e = this.list[index].isNew;
                let f = this.list[index].thumbnail;
                let g = this.list[index].paraImage;
                let h = this.list[index].productId;
                this.list[index].spec1 = this.list[index + 1].spec1;
                this.list[index].spec2 = this.list[index + 1].spec2;
                this.list[index].price = this.list[index + 1].price;
                this.list[index].stock = this.list[index + 1].stock;
                this.list[index].isNew = this.list[index + 1].isNew;
                this.list[index].thumbnail = this.list[index + 1].thumbnail;
                this.list[index].paraImage = this.list[index + 1].paraImage;
                this.list[index].productId = this.list[index + 1].productId;
                this.list[index + 1].spec1 = a;
                this.list[index + 1].spec2 = b;
                this.list[index + 1].price = c;
                this.list[index + 1].stock = d;
                this.list[index + 1].isNew = e;
                this.list[index + 1].thumbnail = f;
                this.list[index + 1].paraImage = g;
                this.list[index + 1].productId = h;
            },
//            完成
            goComplete: function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;

                if(utils.isNull(this.goodsName)){
                    event.toast('请完善商品名称');
                    this.clicked = false;
                    return;
                }else if(utils.isNull(this.goodsUnit)){
                    event.toast('单位不能为空');
                    this.clicked = false;
                    return;
                }


                this.proTotal = 0;
                let _this = this;
                if(this.list.length == 0){
                    if(utils.isNull(this.topLinePrice) || utils.isNull(this.topLineNum) || utils.isNull(this.firstParaImage)){
                        event.toast('请完善商品信息');
                        this.clicked = false;
                        return;
                    }
                    var frontUrl = '';
                    if (!utils.isNull(_this.firstParaImage)) {
                        frontUrl = _this.firstParaImage.substring(0,4);
                    }
//                判断是否已经是服务器图片
                    if (frontUrl == 'http') {
                            _this.realSave();
                    }else{
                        _this.proTotal++;
                        _this.toSendArticle = true;
                        event.upload(_this.firstParaImage, function (data) {
                            if (data.type == 'success') {
                                _this.firstParaImage = data.data;
                                    _this.realSave();
                            } else {//上传失败
                                _this.toSendArticle = false;
                                _this.currentPro = 0;//当前进度
                                _this.proTotal = 0;//总的进度
                                _this.processWidth = 0;//进度条宽度
                                event.toast(data.content);
                                _this.clicked = false;
                                return;
                            }
                            _this.toSendArticle = false;
                        }, function (data) {
//                    上传进度
                            _this.ctrlProcess(data);
                        })
                    }
                }else{
                    var sign = 0;
//                    判断规格有没有完整
                    this.list.forEach(function (item) {
                        if(item.isNew ){
                            sign ++ ;
                        }
                    })
                    if(sign > 0){
                        event.toast('商品规格1不能为空或重复');
                        this.clicked = false;
                        return;
                    }
//                    判断规格有没有完整
                    this.list.forEach(function (item) {
                        if(utils.isNull(item.paraImage) ){
                            sign ++ ;
                        }
                    })
                    if(sign > 0){
                        event.toast('请添加商品图片');
                        this.clicked = false;
                        return;
                    }
//                    判断规格有没有完整
                    this.list.forEach(function (item) {
                        if(utils.isNull(item.price)){
                            sign ++ ;
                        }
                    })
                    if(sign > 0){
                        event.toast('商品价格不能为空');
                        this.clicked = false;
                        return;
                    }
//                    判断规格有没有完整
                    this.list.forEach(function (item) {
                        if(utils.isNull(item.stock)){
                            sign ++ ;
                        }
                    })
                    if(sign > 0){
                        event.toast('商品库存不能为空');
                        this.clicked = false;
                        return;
                    }
//                判断段落图片是否已上传
                    this.list.forEach(function (item,index) {
                        if (!utils.isNull(item.paraImage) && item.paraImage.substring(0, 4) != 'http') {
                            _this.proTotal++;
                        }
                    });
                    _this.sendImage(0);
                }
            },
            //上传图片到服务器
            sendImage(sendIndex) {
                this.toSendArticle = true;
                var _this = this;
//                var frontUrl;
                let sendLength = _this.list.length;//获取图片数组总长度
                var frontUrl = '';
                if (!utils.isNull(_this.list[sendIndex].paraImage)) {
                    frontUrl = _this.list[sendIndex].paraImage.substring(0,4);
                }
//                判断是否已经是服务器图片
                if (frontUrl == 'http') {
                    sendIndex++;
//                        判断是否最后一张图
                    if (sendIndex < sendLength) {
//                            回调自己自己
                        _this.sendImage(sendIndex)
                    } else {//进行上传文章
                        _this.realSave();
                    }
                } else {
                    event.upload(_this.list[sendIndex].paraImage, function (data) {
                        if (data.type == 'success') {
                            _this.list[sendIndex].paraImage = data.data;
//                         因为异步操作,所以要分别在if elseif里写下列代码
                            sendIndex++;
//                        判断是否最后一张图
                            if (sendIndex < sendLength) {
//                            回调自己自己
                                _this.sendImage(sendIndex);
                            } else {//进行上传文章
                                _this.realSave();
                            }
                        } else {//上传失败
                            _this.toSendArticle = false;
                            _this.currentPro = 0;//当前进度
                            _this.proTotal = 0;//总的进度
                            _this.processWidth = 0;//进度条宽度
                            event.toast(data.content);
                            _this.clicked = false;
                            return;
                        }
                    }, function (data) {
//                    上传进度
                        _this.ctrlProcess(data);
                    })
                }
            },
//            图片上传后，正式将文章数据上传服务器
            realSave() {
                var _this = this;
//                将页面上的数据存储起来
                this.savePage();
//                判断是再次编辑还是初次编辑;
                let sendId = utils.isNull(_this.goodsId) ? '' : _this.goodsId;
                let categoryTemplate = {
                    id:_this.catagoryId,
                    name:_this.catagoryName
                }
                let productData = {
                    id: sendId,
                    name: _this.goodsName,
                    unit: _this.goodsUnit,
                    productCategory: categoryTemplate,
                    products: _this.productTemplates,
                };
//                转成json字符串后上传服务器
                productData = JSON.stringify(productData);
//                网络请求，保存文章
                POST('weex/member/product/submit.jhtml', productData).then(
                    function (res) {
                        if (res.data != '' && res.type == 'success') {
                                _this.currentPro = 0;//当前进度
                                _this.proTotal = 0;//总的进度
                                _this.processWidth = 0;//进度条宽度
                                event.closeURL(res);
                        } else {
                            event.toast(res.content);
                            _this.toSendArticle = false;
                            _this.currentPro = 0;//当前进度
                            _this.proTotal = 0;//总的进度
                            _this.processWidth = 0;//进度条宽度
                        }

                        _this.clicked = false;
                    },
                    function (err) {
                        event.toast(err.content);
                        _this.toSendArticle = false;
                        _this.currentPro = 0;//当前进度
                        _this.proTotal = 0;//总的进度
                        _this.processWidth = 0;//进度条宽度
                        _this.clicked = false;
                    }
                )
            },

//            将页面上的数据存储起来
            savePage() {
                let _this = this;
//                每次保存前 将下列3个变量重新置空;
                this.productTemplates = [];//文章段落数组

                if(this.list.length == 0){
                    _this.productTemplates.push({
                        productId:this.firstProductId,
                        thumbnail:this.firstParaImage,
                        spec1: '',
                        spec2: '',
                        price:_this.topLinePrice,
                        stock: parseInt(_this.topLineNum),
                        distribution:0
                    })
                }else{
                    this.list.forEach(function (item) {
                        _this.productTemplates.push({
                            productId:item.productId,
                            thumbnail: item.paraImage,
                            spec1: item.spec1,
                            spec2: item.spec2,
                            price: item.price,
                            stock: parseInt(item.stock),
                            distribution:0
                        })
                    })
                }


            },

            //            控制进度条
            ctrlProcess(data){
                this.processWidth = parseInt(data.data) * 5;
                if(this.processWidth == 500){
                    this.currentPro ++ ;
                };
            },
            maskClick(){
                return;
            },
            goback(){
                event.closeURL();
            }
        }
    }
</script>