<template>
    <div class="wrapper bkg-primary">
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="vipsetup()"> </navbar>

        <div class="box">
            <div class="flex-center">
              <text class="name" >{{data.card.name}}</text>
                <div class="labelType"><text class="labelText">{{data.card.type | watchType}}</text> </div>
                <div :class="[vipClass(data.card.vip)]" style="margin-top: 60px"><text class="labelText">{{data.card.vip | watchVip}}</text> </div>
              <!--<text :class="[vipClass(data.card.vip)]" :style="{fontFamily:'iconfont'}">{{vip(data.card.vip)}}</text>-->
            </div>
            <text class="code" >NO.{{data.card.code | codefmt}}</text>
            <text class="balance" >{{data.card.balance | currencyfmt}}</text>
            <div class="flex-center">
                <text class="label" @click="deposit()">消费记录</text>
                <text class="label" >|</text>
                <text class="label" @click="integral()" >积分记录</text>
            </div>
        </div>
        <image class="logo" resize="cover" :src="data.card.logo" @click="vipsetup()"></image>
        <div class="bbox">
            <text class="button bw" @click="fill()">充值</text>
            <text class="button bw" @click="refund()">退款</text>
        </div>
        <div class="content">
            <text class="intro" >1.{{data.prerogative}}</text>
            <text class="intro" >2.{{data.description}}</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .labelType{
        height: 28px;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background-color: #EB4E40;
        padding-left:5px;
        padding-right: 5px;
        margin-left: 10px;
        margin-top: 60px;
    }
    .labelText{
        color: white;
        font-size: 24px;
    }
    .box {
        margin-top: 100px;
        width:650px;
        margin-left: 50px;
        background-color: #fff;
        height:450px;
        border-radius: 10px;
        border-color: #ccc;
        border-width: 1px;
        align-items: center;
    }
    .bbox {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 40px;
    }
    .logo {
        /*margin-top: -40px;*/
        position: absolute;
        top: 203px;
        left:335px;
        width:80px;
        height:80px;
        border-radius: 40px;
        border-color: #ccc;
        border-width: 1px;
        z-index: 100;
    }
    .name {
        margin-top: 60px;
        color:#bbb;
        font-size: 30px;
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
        margin-left: 10px;
        margin-right: 10px;
        font-size: 32px;
    }
    .code {
        margin-top: 40px;
        color:#999;
        font-size: 30px;
    }
    .balance {
        margin-top: 50px;
        color:red;
        font-size: 52px;
    }
    .label {
        margin-top: 60px;
        margin-left: 10px;
        margin-right: 10px;
        color:#999;
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
                data:{card:{logo:"./static/logo.png",name:"演示专栏(VIP1)",balance:3.44,code:'392203232323'},},
                begin:0,
                roles:'',
                clicked:false
            }
        },
        created(){
            utils.initIconFont();
            this.id = utils.getUrlParameter("id");
            this.load();
            this.permissions()
        },
        methods: {
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
                event.openURL(utils.locate("view/shop/card/fill.js?id="+this.id),function (data) {
                    if (data.type=='success') {
                        _this.load();
                    }
                })
            },
            refund: function () {
                var _this = this;
                if (!utils.isRoles("15",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    return
                }
                event.openURL(utils.locate("view/shop/card/refund.js?id="+this.id),function (data) {
                    if (data.type=='success') {
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