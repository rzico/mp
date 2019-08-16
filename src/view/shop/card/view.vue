<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback"> </navbar>
        <list>
            <cell v-if="data!=null">
                <div class="box bkg-primary button-bkg-img">
                    <div class="flex-row"  style="margin-top: 60px">
                        <image class="logo" resize="cover" :src="data.card.logo" @click="vipsetup()"></image>
                        <text class="name" >{{data.card.name}}</text>
                        <div class="labelType"><text class="labelText">{{data.card.type | watchType}}</text> </div>
                        <div :class="[vipClass(data.card.vip)]"><text class="labelText">{{data.card.vip | watchVip}}</text> </div>
                         <!--<text :class="[vipClass(data.card.vip)]" :style="{fontFamily:'iconfont'}">{{vip(data.card.vip)}}</text>-->
                    </div>
                    <text class="code" >NO.{{data.card.code | codefmt}}</text>
                    <text class="balance" >￥{{data.card.balance | currencyfmt}}</text>
                    <div class="flex-center">
                        <text class="button bw" @click="fill()">充值</text>
                        <text class="button bw" @click="refund()">退款</text>
                        <!--<text class="label" @click="fill()">充值</text>-->
                        <!--<text class="label" >|</text>-->
                        <!--<text class="label" @click="refund()" >退款</text>-->
                    </div>
                </div>
                <!--<div class="bbox">-->
                    <!--<text class="button bw" @click="fill()">充值</text>-->
                    <!--<text class="button bw" @click="refund()">退款</text>-->
                <!--</div>-->
                <div class="boxTwo">
                    <div class="cell"  @click="vipsetup()">
                        <text class="cellTitle">详细资料</text>
                        <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                    <div class="cell"  @click="goAddress()">
                        <text class="cellTitle">收货地址</text>
                        <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                    <div class="cell"  @click="deposit()">
                        <text class="cellTitle">消费记录</text>
                        <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                    <div class="cell"  @click="integral()">
                        <text class="cellTitle">积分记录</text>
                        <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                    <div class="cell"  @click="goCouponCode()" >
                        <text class="cellTitle">电子水票</text>
                        <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                    <div class="cell"  @click="goBarrel()">
                        <text class="cellTitle">送货记录</text>
                        <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color:#ffffff;
    }
    .cell{
        width: 690px;
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
        margin-top: 50px;
        width:690px;
        margin-left: 30px;
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
                if(data == 'partner'){
                    return '股东'
                }else if(data == 'team'){
                    return '团队'
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
                memberId:0
            }
        },
        created(){
            utils.initIconFont();
            this.id = utils.getUrlParameter("id");
            this.load();
            this.permissions()
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
                event.openURL(utils.locate('view/shop/card/couponCode.js?cardId='+this.id +'&logo='+this.data.card.logo),function (data) {
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
                event.openURL(utils.locate('view/shop/card/barrel.js?cardId='+this.id),function (data) {
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
                if(utils.appType() == 'water'){
                    if (!utils.isRoles("12",_this.roles)) {
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
                }else {
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
                }

            },
            refund: function () {
                var _this = this;
                if(utils.appType() == 'water') {
                    if (!utils.isRoles("12", _this.roles)) {
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
                }else {
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
                }
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