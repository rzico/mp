<template>
    <div class="wrapper" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <div  class="corpusBox">
            <div  class="corpusScroll">
                <div class="articleClass" v-for="(item,index) in catagoryList" >
                    <text @click="catagoryChange(index,item.id)" class="allArticle" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</text>
                </div>
            </div>
        </div>
        <list  @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="shippingList.length == 0">
                <noData :noDataHint="noDataHint"></noData>
            </cell>
            <!--导航栏-->
            <cell v-else v-for="(item,index) in shippingList">
                <!--如果分类重复就不渲染该区域-->
                <!--<div v-if="item.status == 'unconfirmed'">-->
                <!--<div class="cell-header cell-line space-between" v-if="isRepeat(index) " :class="[index == 0 ? 'mt20' : '']">-->
                    <!--<div class="flex-row flex-start">-->
                        <!--<text class="title" >{{item.groupName}}</text>-->
                    <!--</div>-->
                    <!--<div class="selected mr20">-->
                        <!--<text :style="{fontFamily:'iconfont'}" class="selectedIcon primary">&#xe64d;</text>-->
                    <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <div class="goodsLine mt20">
                    <div class="space-between goodsHead" >
                        <div class="flex-row">
                            <image :src="item.logo | watchLogo" class="shopImg"></image>
                            <text class="title ml20 mr20">{{item.name}}</text>
                            <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                        </div>
                        <div >
                            <text class="title red">{{item.statusDescr}}</text>
                        </div>
                    </div>
                    <div class="flex-row goodsBody"  v-for="goods in item.shippingItems"  @click="info(item.orderSn,item.sn)">
                        <image :src="goods.thumbnail | watchThumbnail" class="goodsImg"></image>
                        <div class="goodsInfo"  >
                            <text class="title goodsName" >{{goods.name}}</text>
                            <text  class="sub_title ">规格:{{goods.spec | watchSpec}}</text>
                            <div class="goodsPriceNum" >
                                <!--<text class="title coral">¥ {{goods.price | currencyfmt}}</text>-->
                                <text class="sub_title">x{{goods.quantity}}</text>
                            </div>
                        </div>
                    </div>
                    <div class="flex-row goodsTotalPrice boder-bottom">
                        <div v-if="productCategoryId != 2">
                            <text class="sub_title">下单时间:{{item.createDate | watchCreateDate}}</text>
                        </div>
                        <div v-if="productCategoryId == 2">
                            <text class="sub_title">预约时间:{{item.hopeDate | watchCreateDate}}</text>
                        </div>
                        <div class="flex-row">
                            <text class="title mr20">共{{item.quantity}}件商品</text>
                            <!--<text class="title">合计:¥ {{item.amount | currencyfmt}}</text>-->
                        </div>
                    </div>
                    <div class="flex-row space-between goodsFoot" v-if="item.status == 'unconfirmed'">
                        <div class="flex-row">
                        <div class="selected" @click="singleChoose(index,item.groupName)">
                            <text :style="{fontFamily:'iconfont'}" class="selectedIcon primary" v-if="checkChoose(index)">&#xe64d;</text>
                        </div>
                            <text class="fz32 ml20" @click="singleChoose(index)">{{item.groupName}}</text>
                        </div>
                        <div class="flex-row">
                            <div class="flex-row" v-if="totalSingle <=1">
                            <div class="flex-row" v-if="item.isSelf == true">
                                <text class="title footText " @click="trunSend(item.orderSn,item.sn)">转派</text>
                            </div>
                            <div class="flex-row" v-if="item.isSelf == false">
                                <text class="title footText " @click="rejected(item.sn)">驳回</text>
                            </div>
                            </div>
                            <div class="flex-row" v-if="totalSingle <=1">
                            <text class="title footText " @click="sendSingle(item.orderSn,item.sn)">派单</text>
                            </div>
                        <div class="flex-row" v-else>
                            <text class="title footText " @click="openMask(item.orderSn,item.sn)">批量派单</text>
                        </div>
                        </div>
                    </div>
                    <div class="flex-row space-between goodsFoot" v-else-if="item.status == 'dispatch'">
                        <div class="footMore">
                            <!--<text class="sub_title">删除</text>-->
                        </div>
                        <div class="flex-row">
                            <text class="title footText " @click="delivery(item.orderSn,item.sn,item.id)">送达</text>
                        </div>
                    </div>
                    <div class="flex-row space-between goodsFoot" v-else-if="item.status == 'receive'">
                        <div class="footMore">
                            <!--<text class="sub_title">删除</text>-->
                        </div>
                        <div class="flex-row">
                            <text class="title footText " @click="confirm(item.orderSn,item.sn)">核销</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
        <div class="mask" v-if="isMask" @click="downMask()">
            <div class="info">
                <text class="maskTitle">共  {{totalSingle}}  单</text>
                <div class="setting" @click="pickPattern()">
                    <div class="flex-row">
                        <text class="fz32">配送站:  {{isPattern}}</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="setting" @click="goMarki()">
                    <div class="flex-row">
                        <text class="fz32">配送员:  {{isMarki}}</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="setting" >
                    <div class="flex-row">
                        <text class="fz32">备注    :</text>
                        <input class="input" placeholder="请输入备注" v-model="message"/>
                    </div>
                    <div class="flex-row flex-end" @click="linkTo()">
                        <div class="chooseBox"><text class="fz28 primary">快速话语</text> </div>
                    </div>
                </div>
                <div class="button" @click="moreSingle()">
                    <text class="fz40 primary">批量派单</text>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .mask{
        position: fixed;top: 0px;left: 0px;right: 0px;bottom: 0px;background-color:rgba(000,000,000,0.4);
    }
    .maskTitle{
        font-size: 40px;
    }
    .chooseBox{
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 5px;
        border-color: #5eb0fd;
        border-width: 1px;
    }
    .input{
        width: 360px;
        height: 80px;
        line-height: 40px;
        font-size: 32px;
        padding-left:20px;
        padding-top: 3px;
    }
    .info{
        position: absolute;
        top: 200px;
        left: 30px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 30px;
        /*border-color:#ccc;*/
        /*border-width: 1px;*/
        border-radius: 10px;
        background-color: white;
    }
    .button{
        height:80px;
        width: 568px;
        margin-top: 30px;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 10px;
        border-width: 1px;
        border-color: #5eb0fd;
        border-radius: 15px;
        align-items: center;
        justify-content: center;
    }
    .button:active{
        background-color: #cccccc;
    }
    .setting{
        margin-top: 20px;
        border-color:#ccc;
        height: 80px;
        width: 630px;
        border-bottom-width: 1px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .selected{
        height: 50px;
        width: 50px;
        border-width: 1px;
        border-color: #999;
        border-radius: 10px;
        align-items: center;
        justify-content: center;
    }
    .selectedIcon{
        font-size: 35px;
    }
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
        padding-left: 30px;
        padding-right: 30px;
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
        justify-content: space-between;
    }
    .goodsName{
        line-height: 32px;
        lines:2;
        text-overflow: ellipsis;
    }
    .goodsPriceNum{
        /*height: 160px;*/
        align-items: flex-end;
        justify-content: space-between;
        /*width: 150px;*/
        width:530px;
        display: flex;flex-direction: row;justify-content: space-between;
    }
    .goodsInfo{
        display: flex;flex-direction: column;justify-content: space-between;
        height: 160px;
        /*width: 400px;*/
        width: 550px;
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
        height:98px;
        background-color: #fff;
        align-items: center;
        justify-content: center;
        /*flex: 1;*/
        width: 125px;
    }
    .allArticle{
        font-size: 31px;
        flex: 1;
        text-align: center;
        line-height: 96px;
    }
    .corpusScroll{
        flex-direction: row;
        width: 500px;
        height:98px;
        background-color:#fff;
    }
    .corpusBox{
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 750px;
        height:100px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
        background-color:#fff;

    }

</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import {dom,event,animation,storage} from '../../../weex.js';
    import { POST, GET } from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';
    import noData from '../../../include/noData.vue';
    var modal = weex.requireModule('modal');
    export default {
        data:function(){
            return{
                shippingList:[],
                refreshing:false,
                pageStart:0,
                pageSize:15,
                refreshImg:utils.locate('resources/images/loading.png'),
                catagoryList:[{
                    name:'待确认',
                    id:1
                },{
                    name:'预约单',
                    id:2
                },{
                    name:'配送中',
                    id:3
                },{
                    name:'已送达',
                    id:4
                }],
                whichCorpus:0,
                productCategoryId:1,
                clicked:false,
                time:'',
                isPattern:'',
                shopId:'',
                isMarki:'',
                markiId:'',
                message:'',
                ids:[],
                totalSingle:0,
                isMask:false,
                isPageType:false,
            }
        },
        props:{
            noDataHint:{default:'暂无运单'},
            title:{default:'送货管理'}
        },
        filters:{
            watchSpec:function (value) {
                if(utils.isNull(value)){
                    return '无';
                }else{
                    return value;
                }
            },
            watchCreateDate:function (value) {
                return utils.ymdhistimefmt(value);
            },
            watchThumbnail:function (value) {
//                    没过滤前是原图
                return utils.thumbnail(value,160,160);
            },
            watchlogo:function (value) {
                return utils.thumbnail(value,40,40);
            },
        },
        components: {
            navbar,noData
        },
        created(){
            utils.initIconFont();
            if(!utils.isNull(utils.getUrlParameter('index'))){
                this.whichCorpus = utils.getUrlParameter('index')
            }
            if(!utils.isNull(utils.getUrlParameter('productCategoryId'))){
                this.productCategoryId = utils.getUrlParameter('productCategoryId')
//                把字符串转换成整型，否则switch识别不了
                this.productCategoryId = parseInt(this.productCategoryId)
                this.pageStart = 0;
            }
            this.open();
            this.permissions()

        },
        methods:{
            //判断分类是否重复
            isRepeat(index){
                if(index != 0){
                    if(this.shippingList[index].groupName == this.shippingList[index - 1].groupName){
                        return false;
                    }
                }
                return true;
            },
            checkChoose(index){
                return (this.shippingList[index].choose == true);

            },
//            单选
            singleChoose(index,groupName){
                let _this = this;
                var dd = this.shippingList;
                    if(dd[index].choose == true){
                        dd[index].choose = false
                    }else{
                        dd[index].choose = true
                    }
                    var total = 0;
                    dd.forEach(function (item) {
                    if(item.choose == true){
                        total = total + 1
                    }
                    });
                    this.totalSingle = total
                    this.shippingList = dd;

            },
//            关闭遮罩层
            downMask(){
                this.isMask = false
            },
//            开启遮罩层
            openMask(){
                let _this = this;
                this.isMask = true;
                this.ids = [];
                this.totalSingle = 0;
                this.shippingList.forEach(function (item) {
                    if(item.choose == true){
                        _this.ids.push(item.id);
                        _this.totalSingle = _this.totalSingle + 1
                    }
                });
            },
            moreSingle(){
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                if(utils.isNull(this.shopId)){
                    event.toast('请选择配送站');
                    _this.clicked = false;
                    return
                }else if(utils.isNull(this.markiId)){
                    event.toast('请选择配送人员');
                    _this.clicked = false;
                    return
                }
                POST('weex/member/shipping/batch_dispatch.jhtml?ids='+ _this.ids+'&shopId='+_this.shopId+'&adminId='+_this.markiId +'&memo=' +encodeURIComponent(_this.message)).then(
                    function (data) {
                        _this.clicked = false;
                        if(data.type == 'success'){
                            _this.isMask = false;
                            _this.pageStart = 0;
                            _this.open()
                            event.toast('批量派单成功');
                        }else{
                            event.toast(data.content);
                        }
                    },
                    function (err) {
                        _this.clicked = false;
                        event.toast(err.content);
                    })
            },
            //            设置配送站
            pickPattern:function () {

                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    });
                    _this.permissions();
                    _this.clicked = false;
                    return
                }
                event.openURL(utils.locate('view/shop/shipping/station.js'), function (data) {
                    _this.clicked = false;
                    if(data.type == 'success' && data.data != '') {
                        _this.isPattern = data.data.name;
                        _this.shopId = data.data.id;
                        _this.isMarki = '';
                        _this.markiId = ''
                    }
                })
            },
            //            跳转备注快速话语
            linkTo: function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('widget/list.js?type=xdict'), function (data) {
                    _this.clicked = false;
                    if(data.type == 'success' && data.data != '') {
                        _this.message = data.data.listName;
                    }
                })

            },

//            跳转配送员
            goMarki:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if(utils.isNull(this.shopId)){
                    event.toast('请先选择配送站');
                    _this.clicked = false;
                    return
                }
                event.openURL(utils.locate('view/shop/shipping/marki.js?shopId='+ this.shopId),function (data) {
                    _this.clicked = false;
                    if(data.type=='success') {
                        _this.isMarki = data.data.name;
                        _this.markiId = data.data.id
                    }
                });
            },
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
//            //  关闭定时器.
//            clearDummyProcess(){
////              解除定时器
//                if (!utils.isNull(this.time))  {
//                    clearInterval(this.time);
//                    this.time = null;
//                }
//            },
////            获取经纬度
//            getGps:function(){
//                let _this = this
//                var uId = event.getUId();
//                event.getLocation(function (data) {
//                    if(data.type == 'success'){
//                        POST("/lbs/location.jhtml?lng=" + data.data.lng + "&lat=" +data.data.lat +'&memberId=' + uId).then(function (mes) {
//                            if (mes.type == 'success') {
//
//                            } else {
//                                event.toast(mes.content);
//                            }
//                        }, function (err) {
//                            event.toast(err.content)
//                        })
//                    }else {
//                        event.toast('定位失败，请开启GPS')
//                    }
//                })
//            },
            //分类切换
            catagoryChange:function(index,id){
//                event.toast(id);
                var _this = this;
                if(_this.whichCorpus == index){
                    return;
                }
                _this.whichCorpus = index;
                _this.productCategoryId = id;
                this.pageStart = 0;
                _this.open();
            },
            open:function (type) {
                var _this = this;
                var status = '';
                switch(this.productCategoryId){
                    case 1:
                        status = 'unconfirmed';
                        break;
                    case 2:
                        status = 'hope';
                        break;
                    case 3:
                        status = 'confirmed';
                        break;
                    case 4:
                        status = 'completed';
                        break;
                    default:
                        status = '';
                        break;
                }
                GET('weex/member/shipping/list.jhtml?status=' + status + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,
                    function (res) {
                        if (res.type=="success") {
                            if (res.data.start == 0) {
                                res.data.data.forEach(function (item) {
                                    item.choose = false;
                                });
                                _this.shippingList = res.data.data;
                            } else {
                                res.data.data.forEach(function (item) {
                                    item.choose = false;
                                    _this.shippingList.push(item);
                                });
                            }
                            _this.pageStart = res.data.start+res.data.data.length;
                        } else {
                            event.toast(res.content);
                        }

                    }, function (err) {
                        event.toast(err.content);
                    })
            },
            onloading:function () {
////            获取订单列表
                this.open();
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
                    this.open();
////            获取关注列表
                }, 1000)
            },

            goback:function () {
//                this.clearDummyProcess()
                event.closeURL();
            },
            goDetails:function (sn) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shipping/details.js?sn=' + sn), function () {
                    _this.clicked = false;
                });
            },
//            前往作者主页
            goAuthor(id) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                    _this.clicked = false;
                });
            },
            //            跳转详情
            info:function (orderSn,sn) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shipping/info.js?orderSn=' + orderSn +'&sn=' + sn ),function (data) {
                    _this.clicked = false;
                    if(data.type=='success') {

                    }
                });
            },
            //            跳转派单
            sendSingle:function (orderSn,sn) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if (utils.isRoles("3",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    });
                    _this.clicked = false;
                    return
                }
                    this.isPageType = true
                event.openURL(utils.locate('view/shop/shipping/sendSingle.js?orderSn=' + orderSn + '&sn='+sn +'&isPageType='+ this.isPageType),function (data) {
                    _this.clicked = false;
                    if(data.type == 'success'){
                        _this.pageStart = 0;
                        _this.open();
                        event.toast('派单成功');
                    }else{

                    }
                });
            },
            //            跳转转派
            trunSend:function (orderSn,sn) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if (utils.isRoles("3",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    });
                    _this.clicked = false;
                    return
                }
                this.isPageType = false;
                event.openURL(utils.locate('view/shop/shipping/sendSingle.js?orderSn=' + orderSn + '&sn='+sn +'&isPageType='+ this.isPageType),function (data) {
                    _this.clicked = false;
                    if(data.type == 'success'){
                        _this.pageStart = 0;
                        _this.open();
                        event.toast('派单成功');
                    }else{

                    }
                });
            },
            //            驳回
            rejected(sn){
                let _this = this;
                modal.confirm({
                    message: '是否驳回该运单？',
                    duration: 0.3,
                    okTitle:'驳回',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '驳回'){
                        POST('weex/member/shipping/reject.jhtml?sn=' + sn).then(
                            function (data) {
                                if(data.type == 'success'){
                                    _this.pageStart = 0;
                                    _this.open();
                                    event.toast('驳回成功');
                                }else{
                                    event.toast(data.content);
                                }
                            },
                            function (err) {
                                event.toast(err.content);
                            }
                        )
                    }
                })
            },
            //            跳转送达
            delivery:function (orderSn,sn,shippingId) {

                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shipping/delivery.js?orderSn=' + orderSn + '&sn='+sn +'&shippingId=' + shippingId),function (data) {
                    _this.clicked = false;
                    if(data.type=='success') {
                        _this.pageStart = 0;
                        _this.open();
                        event.toast('送达成功');
                    }
                });
            },
            //            跳转核销
            confirm:function (orderSn,sn) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if (utils.isRoles("3",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    });
                    _this.clicked = false;
                    return
                }
                event.openURL(utils.locate('view/shop/shipping/confirm.js?orderSn=' + orderSn + '&sn='+sn),function (data) {
                    _this.clicked = false;
                    if(data.type=='success') {
                        _this.pageStart = 0;
                        _this.open();
                        event.toast('核销成功');
                    }
                });
            },
        }
    }
</script>