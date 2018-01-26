<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback"  > </navbar>
        <div class="">
            <div class="headTitle">
                <text class="">管理员工职位与所属店铺</text>
            </div>
            <div class="cell-panel space-between" @click="petname">
                <div class="flex-row">
                    <text class="title ml10">昵称</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title">{{data.card.name}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
            <div class="cell-panel space-between" @click="petname">
                <div class="flex-row">
                    <text class="title ml10">卡号</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title">{{nickName}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
            <div class="cell-panel space-between" @click="vipsetup()">
                <div class="flex-row">
                    <text class="title ml10">等级</text>
                </div>
                <div class="flex-row flex-end" >
                    <text class="sub_title">{{nickName}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>

</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
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
            title: {default: "会员详情"}
        },
        filters: {
            codefmt: function (val) {
                if (utils.isNull(val)) {
                    return val;
                } else {
                    return val.substr(0, 11) + "  " + val.substr(11);
                }
            }
        },
        data() {
            return {
                id: "",
                begin:0,
                data:{card:{logo:"./static/logo.png",name:"演示专栏(VIP1)",balance:3.44,code:'392203232323'},},
            }
        },
        created() {
            utils.initIconFont();
            this.id = utils.getUrlParameter("id");
            this.open();
            this.permissions()
        },
        methods: {
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
//            设置等级
            vipsetup:function () {
                var _this = this;
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
//            设置昵称
            petname:function () {
                let _this = this;
                modal.prompt({
                    message: '修改昵称',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                    default:_this.nickName,
                    placeholder:'请输入昵称'
                }, function (value) {
                    if(value.result == '确定'){
                        if(value.data == '' || value.data == null ){
                            modal.toast({message:'请输入昵称',duration:1})
                        }else{
                            POST('weex/member/update.jhtml?nickName=' +encodeURI(value.data)).then(
                                function (mes) {
                                    if (mes.type == "success") {
                                        _this.data.card.name = value.data
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