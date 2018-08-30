<template>
    <div class="wrapper"  @viewdisappear="pageDestroy()">
        <navbar :title="title" @goback="goback" :border="false"> </navbar>
        <scroller class="scroller" show-scrollbar="false">
            <div class="flex-row ">
                <div class="topic">
                    <div>
                        <image class="logo" @click="changeLogo"
                               v-bind:src="topic.logo">
                        </image>
                    </div>
                    <div class="topic_footer">
                        <text class="name" @click="petname">{{topic.name}}</text>
                        <text class="autograph" @click="petname">点击修改专栏</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel tip" v-if="isNoActivate()" @click="activate()">
                <text class="vip">点亮VIP专栏特权（{{topic.fee | watchFee}}元/年）</text>
            </div>
            <!--<div class="sub-panel tip" style="justify-content: center" v-if="judgmentone()" @click="getShop()">-->
                <!--<text class="vip">开通店铺，体验众卖新营销模式</text>-->
            <!--</div>-->
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
            <!--<div v-if="judgmenttwo()">-->
            <!--<div class="cell-row cell-line">-->
            <!--<div class="cell-panel space-between cell-clear">-->
            <!--<div class="flex-row">-->
            <!--<text class="title ml10">开启商户模式</text>-->
            <!--</div>-->
            <!--<div class="flex-row flex-end">-->
            <!--<switch class="switch" :disabled="isNoActivate()" :checked="topic.useCashier" @change="onUseCashier"></switch>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="sub-panel">-->
            <!--<text class="sub_title">适用于有实体店铺的商家，首页默认管理后台</text>-->
            <!--</div>-->

            <!--<div class="cell-row cell-line">-->
            <!--<div class="cell-panel space-between cell-clear">-->
            <!--<div class="flex-row">-->
            <!--<text class="title ml10">开通会员卡</text>-->
            <!--</div>-->
            <!--<div class="flex-row flex-end">-->
            <!--<switch class="switch" :disabled="isNoActivate()" :checked="topic.useCard" @change="onUseCard"></switch>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="sub-panel">-->
            <!--<text class="sub_title">电子会员卡，集成微信卡包</text>-->
            <!--</div>-->
            <!--</div>-->


            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear"  @click="share()">
                    <div class="flex-row">
                        <text class="title ml10">分享专栏</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <!--<text class="sub_title">复制专栏链接并设置为小程序自定义菜单</text>-->
                <text class="sub_title">将您的专栏分享给朋友</text>
            </div>
            <!--小程序设置-->
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear"  @click="appletCopy()">
                    <div class="flex-row">
                        <text class="title ml10">小程序企业信息设置</text>
                    </div>
                    <div class="flex-row flex-end">
                        <!--<text class="sub_title">未设置 </text>-->
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <!--<text class="sub_title">复制专栏链接并设置为小程序自定义菜单</text>-->
                <text class="sub_title">快速设置自己的小程序</text>
            </div>
            <!--小程序设置-->
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear"  @click="appletShuffling()">
                    <div class="flex-row">
                        <text class="title ml10">小程序首页轮播图设置</text>
                    </div>
                    <div class="flex-row flex-end">
                        <!--<text class="sub_title">未设置 </text>-->
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <!--<text class="sub_title">复制专栏链接并设置为小程序自定义菜单</text>-->
                <text class="sub_title">快速设置自己的小程序轮播图</text>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear" @click="appletAgree()">
                    <div class="flex-row">
                        <text class="title ml10">小程序一键授权</text>
                    </div>
                    <div class="flex-row flex-end">
                        <!--<text class="sub_title">未设置 </text>-->
                        <text class="arrow" :style="{fontFamily:'iconfont'}" ref="arrow"  v-if="!steped4">&#xe630;</text>
                        <text class="check" :style="{fontFamily:'iconfont'}" v-else>&#xe64d;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel" v-if="!showOptions">
                <text class="sub_title">将您的小程序授权给我们管理</text>
            </div>
            <div v-else>
                <div class="sub-panel">
                    <text class="sub_title">1、前往微信</text>
                </div>
                <div class="sub-panel">
                    <text class="sub_title">2、搜索并进入魔篇公众号</text>
                </div>
                <div class="sub-panel">
                    <text class="sub_title">3、点击菜单栏中间的"一键授权"按钮</text>
                </div>
                <div class="sub-panel">
                    <text class="sub_title">4、跳转到新页面后点击"一键授权"按钮进行授权</text>
                </div>
                <div class="button bw bkg-primary ml30 mr30 mt30" @click="agreeSuccess()">
                    <text class="buttonText white">如已授权成功,请点这里</text>
                </div>
            </div>

            <div class="fill"></div>


        </scroller>

        <payment ref="payment" :receiveSn="receiveSn" @notify="notify" v-if="paymentShow" @paymentClose="paymentClose"></payment>

        <!--动画无效-->
        <!--<transition name="slide-fade-share" mode="out-in">-->
        <div v-if="showShare"  key="share">
            <div class="maskLayer" @touchstart="maskTouch"></div>
            <share @doShare="doShare" @doCancel="doCancel"></share>
        </div>
        <!--模版内容-->
        <!--</transition>-->

    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>

    .topic {
        flex-direction:row;
        align-items:center;
        width:750px;
        height: 150px;
        padding-top: 20px;
        padding-left: 30px;
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
        padding-left: 30px;
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
        margin-left: 20px;
    }
    .autograph {
        margin-left: 20px;
        margin-top: 10px;
        font-size: 28px;
        color: #999;
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
    import share from '../../../include/share.vue'
    import utils from '../../../assets/utils'
    import music from '../../../assets/music'
    const clipboard = weex.requireModule('clipboard');
    const animation = weex.requireModule('animation')
    const album = weex.requireModule('album');
    const event = weex.requireModule('event');
    var modal = weex.requireModule('modal');
    var globalEvent = weex.requireModule('globalEvent');
    export default {
        data() {
            return {
                sn:"",
                topic:{logo:"",name:"",id:"",useCashier:false,useCard:false,useCoupon:false,status:'success'},
                noJob:true,
                isOwner:false,
                showShare:false,
                copyPublic:'',
                copyApplet:'',
                receiveSn:'',
                paymentShow:false,
                showOptions:false,
                steped4:false,
            }
        },
        components: {
            navbar,payment,share
        },
        props: {
            title: { default: "我的专栏" }
        },
        created(){
            utils.initIconFont();
            this.load();
            this.open();
        },
        filters:{
            watchFee:function (value) {
                return value;
            }
        },
        methods: {
            maskTouch(){
                this.showShare = false;
            },
            //            获取状态
            open:function () {
                var _this = this;
                GET("weex/member/guide/view.jhtml",function (res) {
                        if (res.type=='success') {
                            _this.steped4 = res.data.steped4;
                        } else {
                            event.toast(res.content);
                        }
                    },
                    function (err) {
                        event.toast(err.content);
                    })

            },
//            判断激活状态并且没工作
//            judgmentone:function () {
//                let _this =this;
//                if(_this.noJob == true && _this.isActivate())
//                    return true
//            },
//            判断是否商家
            judgmenttwo:function () {
                let _this = this;
                if(_this.isOwner == true)
                    return true
            },
//            修改头像
            changeLogo: function () {
                var _this = this;
                var options = {
                    isCrop:true,
                    width:1,
                    height:1
                };
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    options,function (ablum) {
                        if(ablum.type == 'success') {
                            event.upload(ablum.data.originalPath,function (message) {
                                if (message.type == 'success') {
                                    POST('weex/member/topic/update.jhtml?logo=' + encodeURI(message.data)).then(
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
                                    event.toast(message.content);
                                }
                            },function(data){

                            })
                        }
                    })
            },

//            修改昵称
            petname:function () {
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
                        _this.noJob = data.data.noJob;
                        _this.isOwner =data.data.isOwner;
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
            goback: function () {
                event.closeURL()
            },

            isNoActivate:function () {
                return this.topic.status!="success";
            },
            isActivate:function () {
                return this.topic.status=="success";
            },
            activate:function (e) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500);
                POST('weex/member/topic/activate.jhtml').then(
                    function (mes) {
                        if (mes.type == "success") {
                            if (utils.isNull(mes.data)) {
                                _this.load();
                            } else {
                                _this.receiveSn = mes.data;
                                _this.paymentShow = true;

                                //            全局监听 消息
                                globalEvent.addEventListener("onMessage", function (e) {
                                    if(!utils.isNull(e.data.data.id) && e.data.data.id == 'gm_10202'){
                                        _this.load();
                                    }
                                });
                            }
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        _this.clicked = false;
                        event.toast(err.content);
                    }
                )
            },
            //            页面被关闭
            pageDestroy: function pageDestroy() {
               globalEvent.removeEventListener("onMessage");
            },
//            隐藏支付组件
            paymentClose:function () {
                this.paymentShow = false;
            },
//            申请开店
//            getShop:function (e) {
//                let _this = this;
//                POST('weex/member/topic/create_enterprise.jhtml').then(
//                    function (mes) {
//                        if (mes.type == "success") {
//                            _this.load();
//                        } else {
//                            event.toast(mes.content);
//                        }
//                    }, function (err) {
//                        event.toast(err.content);
//                    }
//                )
//            },
            onUseCard:function (e) {
                var _this = this;
                POST('weex/member/topic/update.jhtml?useCard=' + e.value).then(
                    function (mes) {
                        if (mes.type == "success") {
                            setTimeout(
                                function () {
                                    _this.load()}, 2000);
                        } else {
                            setTimeout(
                                function () {
                                    _this.load()}, 2000);
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        setTimeout(
                            function () {
                                _this.load()}, 2000);
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
                                function () {
                                    _this.load()}, 2000);
                        } else {
                            setTimeout(
                                function () {
                                    _this.load()}, 2000);
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        setTimeout(
                            function () {
                                _this.load()}, 2000);
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
                                function () {
                                    _this.load()}, 2000);
                        } else {
                            setTimeout(
                                function () {
                                    _this.load()}, 2000);
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        setTimeout(
                            function () {
                                _this.load()}, 2000);
                        event.toast(err.content);
                    }
                )

            },
            linkman:function () {
                modal.alert({
                    message: '开通设置，请联系客服:13400766646',
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
            },
            doCancel:function () {
                this.showShare = false;
            },
            share:function () {
                this.showShare = true;
            },
            doShare(id){
                var shareType;
                let _this = this;
                switch(id){
                    case 0 :
                        shareType = 'timeline';
                        break;
                    case 1 :
                        shareType = 'appMessage';
                        break;
                    case 2 :
                        shareType = 'copyHref';
                        break;
                    case 3 :
                        shareType = 'browser';
                        break;
                    default:
                        shareType = '';
                        break;
                }

                GET('share/topic.jhtml?topicId=' + this.topic.id + '&shareType=' +  shareType ,function (data) {
                    if(data.type == 'success' && data.data != ''){
                        var option = {
                            title:data.data.title,
                            text:data.data.descr,
                            imageUrl:data.data.thumbnail,
                            url:data.data.url,
                            type:shareType
                        }
                        _this.showShare = false;
                        event.share(option,function (data) {
                            if(data.type == 'success'){
                                event.toast(data.content);
                            }
                        })
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            //            小程序一键授权
            appletAgree() {
                if(this.steped4){
                    return;
                }
                let _this = this;
//                event.openURL(utils.locate("view/member/topic/appletAgree.js"), function (message) {
//                });
                this.showOptions = !this.showOptions;
                this.rotate(this.$refs['arrow']);
            },
//            小程序轮播图
            appletShuffling(){
                event.openURL(utils.locate("view/member/topic/shuffling.js"),function (message) {
                });
            },
            //            小程序信息设置
            appletCopy(){
                event.openURL(utils.locate("view/member/topic/companyInfo.js"),function (message) {
                });


//                GET('weex/topic/menu.jhtml?type=applet',function (data) {
//                    if(data.type = 'success'){
//                        _this.copyApplet = data.data;
//                        clipboard.setString(_this.copyApplet);
//                        event.toast('复制成功');
//                    }else{
//                        event.toast(data.content);
//                    }
//                },function (err) {
//                    event.toast(err.content);
//                })
            },
            rotate: function(ref, callback) {
                var self = this;
                if(!self.current_rotate) {
                    self.current_rotate = 0;
                }
                if (self.current_rotate==0) {
                    self.current_rotate = self.current_rotate + 90;
                } else {
                    self.current_rotate = self.current_rotate - 90;
                }
                self.anim(ref, {
                    transform: 'rotate(' + self.current_rotate + 'deg)'
                }, 'linear', 100, callback);
            },
            anim: function(ref, styles, timingFunction, duration, callback) {
                animation.transition(ref, {
                    styles: styles,
                    timingFunction: timingFunction,
                    duration: duration
                }, callback || function(){});
            },
            agreeSuccess(){
                var _this = this;
                GET("weex/member/guide/view.jhtml",function (res) {
                        if (res.type=='success') {
                            _this.steped4 = res.data.steped4;
                            if(res.data.steped4){
                                event.toast('授权成功');
                            }else{
                                event.toast('请您先按照授权步骤进行授权');
                            }
                        } else {
                            event.toast(res.content);
                        }
                    },
                    function (err) {
                        event.toast(err.content);
                    })
            },
        }
    }
</script>