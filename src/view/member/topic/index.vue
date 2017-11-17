<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" :border="false"> </navbar>
        <scroller class="scroller" show-scrollbar="false">
            <div class="flex-column bkg">
                <image class="bg"
                       v-bind:src="topic.logo">
                </image>
                <div class="topic">
                    <image class="logo" @click="changeLogo"
                           v-bind:src="topic.logo">
                    </image>
                    <div class="topic_footer">
                        <text class="name" @click="petname">{{topic.name}}</text>
                        <text class="autograph" @click="petname">{{opened()?'点击修改专栏':'点击开通专栏'}}</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel tip" v-if="isActivate()" @click="activate()">
                <text class="vip">点亮VIP专栏特权（388元/年）</text>
            </div>

            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">专栏模板</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">标准模版</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">点亮专栏，更多精美模板选择</text>
            </div>

            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">启用优惠券</text>
                    </div>
                    <div class="flex-row flex-end">
                        <switch class="switch"  :checked="topic.useCoupon" @change="onUseCoupon"></switch>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">营销利器，支持满折、满减</text>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">开通会员卡</text>
                    </div>
                    <div class="flex-row flex-end">
                        <switch class="switch" :checked="topic.useCard" @change="onUseCard"></switch>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">电子会员卡，集成支付宝、微信</text>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">开通收银台</text>
                    </div>
                    <div class="flex-row flex-end">
                        <switch class="switch" :checked="topic.useCashier" @change="onUseCashier"></switch>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">适用于实体店收银前台使用</text>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear"  @click="linkman()">
                    <div class="flex-row">
                        <text class="title ml10">小程序设置</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">未设置 </text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">一键完成小程序部署,快速上架</text>
                <!--<text class="sub_title" style="color:blue">《操作手册》</text>-->
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear" @click="linkman()">
                    <div class="flex-row">
                        <text class="title ml10">公众号设置</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">未设置 </text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">信息同步至公众号,自已也能管理</text>
                <!--<text class="sub_title" style="color:blue">《操作手册》</text>-->
            </div>
            <div class="fill"></div>
        </scroller>
        <payment ref="payment" @notify="notify"></payment>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>

    .bkg {
        background-color: #777;
    }
    .bg {
        position:absolute;
        width:750px;
        height: 375px;
        filter: blur(10px);
        opacity: 0.3;
        background-size: cover;
    }

    .topic {
        flex-direction:column;
        align-items:center;
        margin-top: 50px;
        width:750px;
        height: 325px;
    }

    .vip {
        font-size:28px;
        color:red;
    }

    .tip {
        background-color:#FFBE00;
        padding-bottom: 20px;
    }

    .sub-panel {
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        flex-direction: row;
    }

    .logo {
        width:120px;
        height:120px;
        border-radius:60px;
        overflow:hidden;
    }

    .topic_footer {
        margin-left:10px;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height:180px;
    }
    .name {
        font-size: 34px;
        color: white;
    }
    .autograph {
        margin-top: 10px;
        font-size: 28px;
        color: #eee;
    }
    .switch {
        margin-right: 20px;
        align-items:flex-start;
    }
</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import navbar from '../../../include/navbar.vue'
    import payment from '../../../include/payment.vue'
    import utils from '../../../assets/utils'
    import music from '../../../assets/music'
    const album = weex.requireModule('album');
    const event = weex.requireModule('event');
    var modal = weex.requireModule('modal');
    export default {
        data() {
          return {
              sn:"",
              topic:{logo:"",name:"",id:"",useCashier:false,useCard:false,useCoupon:false},
          }
        },
        components: {
            navbar,payment
        },
        props: {
            title: { default: "我的专栏" }
        },
        created(){
            utils.initIconFont();
            this.load();
        },
        methods: {
//            修改头像
            changeLogo: function () {
                if (!this.opened()) {
                    this.create();
                    return;
                }
                var _this = this;
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    true,function (ablum) {
                        if(ablum.type == 'success') {
                            event.upload(ablum.data.originalPath,function (message) {
                                if (message.type == 'success') {
                                    POST('weex/member/topic/update.jhtml?logo=' + encodeURI(message.data) ).then(
                                        function (mes) {
                                            if (mes.type == "success") {
                                                _this.topic.logo = message.data;
                                            } else {
                                                event.toast(mes.content);
                                            }
                                        }, function (err) {
                                            event.toast(err.content);
                                        }
                                    )
                                } else {
                                    event.toast(data.content);
                                }
                            },function (data) {
                            })


                        }
                    })
            },
//            修改昵称
            petname:function () {
                if (!this.opened()) {
                    this.create();
                    return;
                }
                let _this = this;
                modal.prompt({
                    message: '修改专栏名称',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                    default:_this.topic.name,
                    placeholder:"请输入专栏名称",
                }, function (value) {
                    if(value.result == '确定'){
                        if(utils.isNull(value.data)){
                            modal.toast({message:'请输入专栏名称',duration:1})
                        }else{
                            POST('weex/member/topic/update.jhtml?name=' + encodeURI(value.data)).then(
                                function (mes) {
                                    if (mes.type == "success") {
                                        _this.topic.name = value.data;
                                    } else {
                                        event.toast(mes.content);
                                    }
                                }, function (err) {
                                    event.toast(err.content);
                                }
                            )
                        }
                    }
                })
            },
//            获取专栏信息
            load:function () {
                var _this = this;
                GET('weex/member/topic/view.jhtml', function (data) {
                    if (data.type == 'success') {
                        _this.topic = data.data;
                    } else {
                        event.toast(err.content)
                    }
                },function (err) {
                    event.toast(err.content)
                })
            },
//             开通专栏
            create:function () {
                var _this = this;
                POST('weex/member/topic/submit.jhtml').then(
                function (data) {
                    if (data.type == 'success') {
                        _this.topic = data.data;
                        event.toast("开通专栏成功");
                    } else {
                        event.toast(err.content)
                    }
                },function (err) {
                    event.toast(err.content)
                })
            },
            goback: function (e) {
                event.closeURL();
            },
            opened:function () {
                return this.topic.id>0;
            },
            isActivate:function () {
                return this.topic.status!="success";
            },
            activate:function (e) {
                var _this = this;
                POST('weex/member/topic/activate.jhtml').then(
                    function (mes) {
                        if (mes.type == "success") {
                            if (utils.isNull(mes.data)) {
                                _this.load();
                            } else {
                                _this.$refs.payment.show(mes.data);
                            }
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast(err.content);
                    }
                )

            },
            onUseCard:function (e) {
                var _this = this;
                POST('weex/member/topic/update.jhtml?useCard=' + e.value).then(
                    function (mes) {
                        if (mes.type == "success") {
                            setTimeout(
                               _this.load(), 2000);
                        } else {
                            setTimeout(
                                _this.load(), 2000);
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        setTimeout(
                            _this.load(), 2000);
                        event.toast(err.content);
                    }
                )

            },
            onUseCashier:function (e) {
                var _this = this;
                POST('weex/member/topic/update.jhtml?useCashier=' + e.value).then(
                    function (mes) {
                        if (mes.type == "success") {
                            setTimeout(
                                _this.load(), 2000);
                        } else {
                            setTimeout(
                                _this.load(), 2000);
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        setTimeout(
                            _this.load(), 2000);
                        event.toast(err.content);
                    }
                )

            },
            onUseCoupon:function (e) {
                var _this = this;
                POST('weex/member/topic/update.jhtml?useCoupon=' + e.value).then(
                    function (mes) {
                        if (mes.type == "success") {
                            setTimeout(
                                _this.load(), 2000);
                        } else {
                            setTimeout(
                                _this.load(), 2000);
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        setTimeout(
                            _this.load(), 2000);
                        event.toast(err.content);
                    }
                )

            },
            linkman:function () {
                modal.alert({
                    message: '开通设置，请联系客服:13860431130',
                    okTitle: '知道了'
                })
            },
            //支付完成通成
            notify:function (e) {
                if (e.type=="success") {
                    modal.alert({
                        message: '点亮专栏成功',
                        okTitle: '知道了'
                    })
                    this.load();
                }
            }
        }

    }
</script>