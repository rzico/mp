<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback"  > </navbar>
        <scroller class="scroller" v-if="data!=null">
        <div class="cell-row cell-line">
            <div class="cell-logo">
                <div class="flex-row flex-start">
                    <text class="title ml10">头像</text>
                </div>
                <div class="flex-row flex-end">
                    <image class="logo" resize="cover"
                           :src="data.card.logo">
                    </image>
                </div>
            </div>
            <div class="cell-panel space-between" @click="petname">
                <div class="flex-row">
                    <text class="title ml10">姓名</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title">{{data.card.name}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
            <div class="cell-panel space-between" @click="pettel">
                <div class="flex-row">
                    <text class="title ml10">手机号</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title">{{data.card.mobile}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
            <div class="cell-panel space-between " @click="vipsetup()">
                <div class="flex-row">
                    <text class="title ml10">等级</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title">{{data.card.vip}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
            <div class="cell-panel space-between " @click="typesetup()" :class="[data.card.type == 'member' ? 'cell-clear' : '',data.card.type == 'team' ? 'cell-clear' : '']">
                <div class="flex-row">
                    <text class="title ml10">会员类型</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title">{{data.card.type | watchType}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
            <div class="cell-panel space-between cell-clear" @click="petdividend()" v-if="data.card.type == 'partner'">
                <div class="flex-row">
                    <text class="title ml10">分红比例</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title">{{data.card.bonus}}%</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
        </div>
            <div class="cell-row cell-line">
                <!--<div class="cell-panel space-between " @click="goAddress()">-->
                    <!--<div class="flex-row">-->
                        <!--<text class="title ml10">收货地址</text>-->
                    <!--</div>-->
                    <!--<div class="flex-row flex-end" >-->
                        <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="cell-panel space-between " @click="gousers()">-->
                    <!--<div class="flex-row">-->
                        <!--<text class="title ml10">授权用户</text>-->
                    <!--</div>-->
                    <!--<div class="flex-row flex-end" >-->
                        <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                    <!--</div>-->
                <!--</div>-->
                <div class="cell-panel space-between cell-clear" @click="settlemenSetup()">
                    <div class="flex-row">
                        <text class="title ml10">用户类型</text>
                    </div>
                    <div class="flex-row flex-end" >
                        <text class="sub_title">{{data.card.cardType | watchCardType}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <!--<div class="cell-row cell-line">-->
                <!--<div class="cell-panel space-between" :class="[appType() ? '':'cell-clear']" @click="goCouponCode()">-->
                    <!--<div class="flex-row">-->
                        <!--<text class="title ml10">电子票</text>-->
                    <!--</div>-->
                    <!--<div class="flex-row flex-end" >-->
                        <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="cell-panel space-between cell-clear" @click="goBarrel()" v-if="appType()">-->
                    <!--<div class="flex-row">-->
                        <!--<text class="title ml10">我的桶</text>-->
                    <!--</div>-->
                    <!--<div class="flex-row flex-end" >-->
                        <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <div class="cell-row cell-line">
            <div class="cell-panel space-between">
                <div class="flex-row">
                    <text class="title ml10">卡号</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title">NO.{{data.card.code | codefmt}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}"></text>
                </div>
            </div>
            <div class="cell-panel space-between ">
                <div class="flex-row">
                    <text class="title ml10">余额</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title red">{{data.card.balance}}元</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}"></text>
                </div>
            </div>
            <div class="cell-panel space-between " v-if="data.card.point != 0">
                <div class="flex-row">
                    <text class="title ml10">金币</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title red">{{data.card.point}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}"></text>
                </div>
            </div>
            <div class="cell-panel space-between "  v-if="data.card.arrears != 0">
                <div class="flex-row">
                    <text class="title ml10">欠款</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title red">{{data.card.arrears}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}"></text>
                </div>
            </div>
            <div class="cell-panel space-between " v-if="data.card.ticket != 0">
                <div class="flex-row">
                    <text class="title ml10 red">欠票</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title">{{data.card.ticket}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}"></text>
                </div>
            </div>
            <div class="cell-panel space-between ">
                <div class="flex-row">
                    <text class="title ml10">推荐人</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title">{{data.card.promoter | watchName}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}"></text>
                </div>
            </div>

            <div class="cell-panel space-between cell-clear">
                <div class="flex-row">
                    <text class="title ml10">办卡店铺</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title">{{data.card.shopName}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}"></text>
                </div>
            </div>
        </div>
            <div style="min-height: 300px"></div>
        </scroller>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .red{
        color:red;
    }
    .cell-logo {
        height: 160px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-bottom-color: #bbb;
        border-bottom-style: solid;
    }
    .logo {
        width:120px;
        height:120px;
        margin:10px;
        border-radius:60px;
        overflow:hidden;
    }
</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    const event = weex.requireModule('event');
    import filters from '../../../filters/filters.js';
    import navbar from '../../../include/navbar.vue'
    const picker = weex.requireModule('picker');
    const modal = weex.requireModule('modal');
    export default {
        components: {
            navbar
        },
        props: {
            title: {default: "会员详情"}
        },
        filters: {

            codefmt: function (val) {
                if (utils.isNull(val)) {
                    return val;
                } else {
                    return val.substr(0, 11) + "  " + val.substr(11);
                }
            },
            watchName: function (val) {
                if (utils.isNull(val)) {
                    return '无';
                }else{
                    return val
                }
            },
            watchType:function (data) {
                if(data == 'team'){
                    return '推广员'
                }else{
                    return '普通会员'
                }
            },
            watchCardType:function (data) {
                if(data == 'family'){
                    return '个人用户'
                }else if(data == 'company') {
                    return '企业用户'
                } else {
                    return '个人用户'
                }
            },
        },
        data() {
            return {
                id: "",
                memberId:'',
                begin:0,
                typebegin:0,
                settlemenBegin:0,
                data:null,
                roles:"",
                clicked:false
            }
        },
        created() {
            utils.initIconFont();
            this.id = utils.getUrlParameter("id");
            this.open();
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
            //            获取权限
            permissions: function () {
                var _this = this;
                POST("weex/member/roles.jhtml").then(function (mes) {
                    if (mes.type == "success") {
                        _this.roles = mes.data;
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                });
            },
//            我的地址
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

                event.openURL(utils.locate('view/shop/card/address.js?cardId='+this.id+'&memberId='+this.memberId),function (data) {
                    _this.clicked = false;
                    if(data.type=='success') {

                    }
                });
            },
            gousers(){
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

                event.openURL(utils.locate('view/shop/card/users.js?cardId='+this.id+'&memberId='+this.memberId),function (data) {
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
            //            结算方式
            settlemenSetup:function () {
                var _this = this;
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle:'确定'
                    })
                    return
                }
                picker.pick({
                    index:_this.settlemenBegin,
                    items:['个人用户','企业用户']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.settlemenBegin = e.data;
                            _this.data.card.cardType = 'family'
                        }else if(e.data == 1){
                            _this.settlemenBegin = e.data;
                            _this.data.card.cardType = 'company'
                        }
                        POST('weex/member/card/update.jhtml?id='+_this.id+'&cardType='+_this.data.card.cardType).then(
                            function (mes) {
                                if (mes.type == "success") {

                                } else {
                                    event.toast(mes.content);
                                }
                            }, function (err) {
                                event.toast("网络不稳定");
                            }
                        )
                    }
                })
            },
//            设置等级
            vipsetup:function () {
                var _this = this;
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle:'确定'
                    })
                    return
                }
                picker.pick({
                    index:_this.begin,
                    items:['VIP1','VIP2','VIP3']
                }, e => {
                    if (e.result == 'success') {
                        let vp = 'vip1';
                        if (e.data == 0){
                            vp = 'vip1';
                            _this.begin = e.data
                        }else if(e.data == 1){
                            vp = 'vip2';
                            _this.begin = e.data
                        }
                        else{
                            vp = 'vip3';
                            _this.begin = e.data
                        }
                        POST('weex/member/card/update.jhtml?id='+_this.id+'&vip=' +vp).then(
                            function (mes) {
                                if (mes.type == "success") {
                                    _this.data.card.vip = vp;
                                } else {
                                    event.toast(mes.content);
                                }
                            }, function (err) {
                                event.toast("网络不稳定");
                            }
                        )
                    }
                })
            },
            //            设置会员类型
           typesetup:function () {
                var _this = this;
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle:'确定'
                    })
                    return
                }
                picker.pick({
                    index:_this.typebegin,
                    items:['会员','推广员']
                }, e => {
                    if (e.result == 'success') {
                        let type = 'member';
                        if (e.data == 0){
                                type = 'member';
                                _this.typebegin = e.data
                        }else if(e.data == 1){
                                type = 'team';
                                _this.typebegin = e.data
                        }
                        POST('weex/member/card/update.jhtml?id='+_this.id+'&type=' +type).then(
                            function (mes) {
                                if (mes.type == "success") {
                                    _this.data.card.type = type;
                                } else {
                                    event.toast(mes.content);
                                }
                            }, function (err) {
                                event.toast("网络不稳定");
                            }
                        )
                    }
                })
            },

//            设置昵称
            petname:function () {
                let _this = this;
                if(this.data.card.bindName == true){
                    return
                }
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle:'确定'
                    })
                    return
                }
                modal.prompt({
                    message: '修改昵称',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                    default:_this.data.card.name,
                    placeholder:'请输入昵称'
                }, function (value) {
                    if(value.result == '确定'){
                        if(value.data == '' || value.data == null ){
                            modal.toast({message:'请输入昵称',duration:1})
                        }else{
                            POST('weex/member/card/update.jhtml?id='+_this.id+'&name=' +encodeURI(value.data)).then(
                                function (mes) {
                                    if (mes.type == "success") {
                                        _this.data.card.name = value.data
                                        utils.debug( _this.data.card.name )
                                    } else {
                                        event.toast(mes.content);
                                    }
                                }, function (err) {
                                    event.toast("网络不稳定");
                                }
                            )
                        }
                    }
                })
            },
            //            设置手机
            pettel:function () {
                let _this = this;
                if(this.data.card.bindMobile == true){
                    return
                }
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: '确定'
                    })
                    return
                }
                modal.prompt({
                    message: '修改手机号码',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                    default:_this.data.card.mobile,
                    placeholder:'请输手机号码'
                }, function (value) {
                    if(value.result == '确定'){
                        if(value.data == '' || value.data == null ){
                            modal.toast({message:'请输入手机号码',duration:1})
                        }else{
                            POST('weex/member/card/update.jhtml?id='+_this.id+'&mobile='+value.data).then(
                                function (mes) {
                                    if (mes.type == "success") {
                                        _this.data.card.mobile = value.data
                                        utils.debug( _this.data.card.mobile )
                                    } else {
                                        event.toast(mes.content);
                                    }
                                }, function (err) {
                                    event.toast("网络不稳定");
                                }
                            )
                        }
                    }
                })
            },
            //            设置股东比例
            petdividend:function () {
                let _this = this;
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: '确定'
                    })
                    return
                }

                modal.prompt({
                    message: '设置股东比例',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                    default:_this.data.card.bonus,
                    placeholder:'请输入股东比例（%）'
                }, function (value) {
                    if(value.result == '确定'){
                        if(value.data == '' || value.data == null ){
                            modal.toast({message:'请输入股东比例（%）',duration:1})
                        }else{
                            POST('weex/member/card/update.jhtml?id='+_this.id+'&bonus=' +value.data).then(
                                function (mes) {
                                    if (mes.type == "success") {
                                        _this.data.card.bonus = value.data
                                    } else {
                                        event.toast(mes.content);
                                    }
                                }, function (err) {
                                    event.toast("网络不稳定");
                                }
                            )
                        }
                    }
                })
            },
            goback: function (e) {
                event.closeURL();
            },
            open:function () {
                var _this = this;
                GET("weex/member/card/info.jhtml?id="+_this.id,function (res) {
                    if (res.type=='success') {
                        if(res.data.card.vip == 'vip1'){
                            _this.begin =0
                        }else if(res.data.card.vip == 'vip2'){
                            _this.begin =1
                        }else if(res.data.card.vip == 'vip3'){
                            _this.begin =2
                        }
                        if(res.data.card.type == 'member'){
                            _this.typebegin =0
                        }else if(res.data.card.type == 'team'){
                            _this.typebegin =1
                        }else if(res.data.card.type == 'partner'){
                            _this.typebegin =2
                        }else if(res.data.card.type == 'agent'){
                            _this.typebegin =3
                        }
                        if(res.data.card.paymentMethod == 'immediate'){
                            _this.settlemenBegin =0
                        }
                        if(res.data.card.paymentMethod == 'monthly'){
                            _this.settlemenBegin =1
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