<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback"> </navbar>
        <list>
            <cell v-if="data!=null">
                <div class="newcardBox">
                    <div class='vipCell' @click="vipsetup()">
                        <image class="logo" resize="cover" :src="data.card.logo" ></image>
                        <text class="name" >{{data.card.name}}</text>
                    </div>
                    <div class='newmoneyBox'>
                        <div @click="deposit()" class='moneyBox_box'>
                            <text class='moneyBox_title'>¥ {{data.card.balance | currencyfmt}}</text>
                            <text class='moneyBox_subTitle'>余额</text>
                        </div>
                        <div  @click="integral()" class='moneyBox_box'>
                            <div class="flex-row">
                                <image class='moneyBox_img'
                                       src='http://rzico.oss-cn-shenzhen.aliyuncs.com/znzx/image/memberGold.png'></image>
                                <text class='moneyBox_titleTwo'>{{data.card.point | currencyfmt}}</text>
                            </div>
                            <text class='moneyBox_subTitle'>金币</text>
                        </div>
                    </div>
                </div>

                <div class="boxTwo">
                    <div class="cell"  @click="fill()">
                        <text class="cellTitle">充值</text>
                        <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                    <div class="cell"  @click="refund()">
                        <text class="cellTitle">退款</text>
                        <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                    <div class="cell"  @click="vipsetup()">
                        <text class="cellTitle">详细资料</text>
                        <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                    <div class="cell"  @click="goAddress()">
                        <text class="cellTitle">收货地址</text>
                        <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                    <div class="cell"  @click="toOrder()">
                        <text class="cellTitle">订单明细</text>
                        <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                    <div class="cell"  @click="toSummary()">
                        <text class="cellTitle">订单汇总</text>
                        <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                        <div class="cell"  @click="goCouponCode()">
                            <text class="cellTitle">电子水票</text>
                            <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                        <div class="cellTwo"  @click="goBarrel()">
                            <text class="cellTitle">空桶押金</text>
                            <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                </div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>

<style scoped>
    .cell{
        width: 720px;
        height: 100px;
        padding-left: 20px;
        padding-right: 20px;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .cell:active{
        background-color: #eee;
    }
    .cellTwo{
        width: 720px;
        height: 100px;
        padding-left: 20px;
        padding-right: 20px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .cellTwo:active{
        background-color: #eee;
    }
    .cellTitle{
        font-size: 32px;
        color: #333;
    }
    .cellIcon{
        font-size: 32px;
        color: #999;
    }
    .labelType{
        height: 28px;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background-color: #5eb0fd;
        padding-left:5px;
        padding-right: 5px;
        margin-left: 10px;
    }
    .labelText{
        color: white;
        font-size: 24px;
    }
    .box {
        margin-top: 30px;
        width:690px;
        margin-left: 30px;
        border-radius: 20px;
        align-items: center;
        padding-bottom: 30px;
    }
    .boxTwo{
        margin-top: 30px;
        width:720px;
        margin-left: 15px;
        background-color: #fff;
        border-radius: 10px;
        align-items: center;
    }
    .bbox {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 40px;
    }
    .logo {
        width:80px;
        height:80px;
        border-radius: 40px;
        border-color: #ccc;
        border-width: 1px;
    }
    .name {
        color:#fff;
        font-size: 30px;
        max-width: 300px;
        lines:1;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-left: 20px;
    }
    .vip1 {
        height: 28px;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background-color: silver;
        padding-left:5px;
        padding-right: 5px;
        margin-left: 10px;
    }
    .vip2 {
        height: 28px;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background-color: gold;
        padding-left:5px;
        padding-right: 5px;
        margin-left: 10px;
    }
    .vip3 {
        height: 28px;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background-color: #6EBCE9;
        padding-left:5px;
        padding-right: 5px;
        margin-left: 10px;
    }
    .content {
        margin-top: 40px;
        width:650px;
        margin-left: 50px;
    }
    .intro {
        margin-left: 10px;
        width:630px;
        color:#999;
        margin-top: 20px;
        font-size: 28px;
    }
    .bw {
        width:200px;
        background-color: #fff;
        color:#999;
        margin-left: 20px;
        margin-right: 20px;
        font-size: 32px;
    }
    .code {
        margin-top: 20px;
        color:#fff;
        font-size: 30px;
    }
    .balance {
        margin-top: 20px;
        margin-bottom: 20px;
        color:red;
        font-size: 52px;
    }
    .label {
        margin-top: 40px;
        margin-left: 10px;
        margin-right: 10px;
        color:#fff;
        height:60px;
        font-size: 32px;
    }


    .newcardBox{
        border-radius: 11px;
        overflow: hidden;
    }
    .vipCell {
        width: 720px;
        height: 100px;
        background-color: #434343;
        margin-top: 10px;
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 20px;
        padding-right: 20px;
        flex-direction: row;
        align-items: center;
        border-top-left-radius: 11px;
        border-top-right-radius: 11px;
        overflow: hidden;
    }

    .vipCell_img {
        position: absolute;
        left: 0;
        top: 0;
        width: 720px;
        height: 100px;
    }

    .flex-column {
        display: flex;
        flex-direction: column;
    }


    .newmoneyBox {
        width: 720px;
        height: 147px;
        margin-left: 15px;
        margin-right: 15px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-left-radius: 11px;
        border-bottom-right-radius: 11px;
        overflow: hidden;
    }

    .moneyBox_box {
        height: 147px;
        width: 357px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
    }
    .moneyBox_box:active{
        background-color: #e6e6e6;
    }

    .moneyBox_title {
        font-size: 37px;
        font-weight: 500;
        color: #006837;
    }

    .moneyBox_titleTwo {
        font-size: 37px;
        font-weight: 500;
        color: rgba(241, 90, 36, 1);
    }

    .moneyBox_subTitle {
        font-size: 24px;
        color: #808080;
    }

</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import filters from '../../../filters/filters.js';
    const event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue'
    const picker = weex.requireModule('picker')
    const modal = weex.requireModule('modal');
    var he = require('he');
    export default {
        components: {
            navbar
        },
        props: {
            title: { default: "会员卡" },
            complete: {default: "设置"}
        },
        filters:{
            codefmt:function (val) {
                if (utils.isNull(val)) {
                    return val;
                } else  {
                    return val.substr(0,11)+"  "+val.substr(11);
                }
            },
            watchType:function (data) {
                if(data == 'team'){
                    return '推广员'
                }else{
                    return '普通'
                }
            },
            watchVip:function (data) {
                if(data == 'vip3'){
                    return '钻石'
                }else if(data == 'vip2'){
                    return '金卡'
                }else{
                    return '银卡'
                }
            },
        } ,
        data () {
            return {
                id:"",
                qrcode:"",
                data:null,
                begin:0,
                roles:'',
                clicked:false,
                memberId:0,
                version:2
            }
        },
        created(){
            this.permissions()
            utils.initIconFont();
            this.id = utils.getUrlParameter("id");
            this.version = utils.version;
            this.load();
        },
        methods: {
            //            当前app状态
            appType(){
                if(utils.appType() == 'water'){
                    return true
                }else{
                    return false
                }
            },
            classHeader:function () {
                let dc = utils.device();

                return dc
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
            vipClass:function (v) {
                if (v=='vip3') {
                    return "vip3";
                } else
                if (v=='vip2') {
                    return "vip2";
                } else {
                    return "vip1";
                }
            },
            vip:function (v) {
               if (v=='vip3') {
                   return he.decode('&#xe639;');
               } else
               if (v=='vip2') {
                   return he.decode('&#xe638;');
               } else {
                   return he.decode('&#xe636;');
               }
            },
            goback: function (e) {
                event.closeURL();
            },
            deposit:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate("view/shop/card/deposit.js?id="+this.id),function (data) {
                    _this.clicked =false
                })
            },
            integral:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate("view/shop/card/integral.js?id="+this.id),function (data) {
                    _this.clicked =false
                })
            },
            toOrder:function () {
                var _this = this;
                if (!utils.isRoles("12",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: '确定'
                    })
                    return
                }
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                event.openURL(utils.locate("view/shop/card/orderList.js?sellerId="+this.memberId),function (data) {
                    _this.clicked =false
                })
            },
            toSummary:function () {
                var _this = this;
                if (!utils.isRoles("12",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: '确定'
                    })
                    return
                }
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                event.openURL(utils.locate("view/shop/card/orderSummary.js?memberId="+this.memberId+'&id='+this.id),function (data) {
                    _this.clicked =false
                })
            },
            goAddress(){
                let _this = this;
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: '确定'
                    })
                    return
                }

                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                event.openURL(utils.locate('view/shop/card/receiver/index.js?memberId=' +this.memberId),function (data) {
                    _this.clicked = false;
                    if(data.type=='success') {

                    }
                });
            },
            goCouponCode(){
                let _this = this;
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: '确定'
                    })
                    return
                }

                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                event.openURL(utils.locate('view/shop/card/couponCode.js?cardId='+this.id +'&logo='+this.data.card.logo+'&memberId='+this.memberId),function (data) {
                    _this.clicked = false;
                    if(data.type=='success') {

                    }
                });
            },
            goBarrel(){
                let _this = this;
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: '确定'
                    })
                    return
                }

                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                event.openURL(utils.locate('view/shop/card/barrel.js?cardId='+this.id+'&memberId='+this.memberId),function (data) {
                    _this.clicked = false;
                    if(data.type=='success') {

                    }
                });
            },
            vipsetup:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate("view/shop/card/memberInfo.js?id="+this.id),function (data) {
                    _this.load()
                    _this.clicked =false
                })
            },
            fill: function () {
                var _this = this;
                    if (!utils.isRoles("15",_this.roles)) {
                        modal.alert({
                            message: '暂无权限',
                            okTitle: 'OK'
                        })
                        return
                    }
                    event.openURL(utils.locate("view/shop/card/fill.js?id="+_this.id),function (data) {
                        if (data.type=='success') {
                            _this.load();
                        }
                    })
            },
            refund: function () {
                var _this = this;
                    if (!utils.isRoles("15", _this.roles)) {
                        modal.alert({
                            message: '暂无权限',
                            okTitle: 'OK'
                        })
                        return
                    }
                    event.openURL(utils.locate("view/shop/card/refund.js?id=" + _this.id), function (data) {
                        if (data.type == 'success') {
                            _this.load();
                        }
                    })
            },
            load:function () {
                var _this = this;
                GET("weex/member/card/info.jhtml?id="+_this.id,function (res) {
                    if (res.type=='success') {
                        if(res.data.card.vip == 'vip1'){
                            _this.begin =0
                        }else if(res.data.card.vip == 'vip2'){
                            _this.begin =1
                        }else {
                            _this.begin =2
                        }
                        _this.data = res.data;
                        _this.memberId = res.data.card.memberId
                    } else {
                        event.toast(res.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            }
        }
    }
</script>
