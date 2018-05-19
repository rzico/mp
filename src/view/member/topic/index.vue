<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" :border="false"> </navbar>
        <scroller class="scroller" show-scrollbar="false">
            <div class="cell-row cell-line">
                <div class="cell-logo" @click="changeLogo">
                    <div class="flex-row flex-start">
                        <text class="title ml10">专栏封面</text>
                    </div>
                    <div class="flex-row flex-end">
                        <image class="logo" resize="cover"
                               v-bind:src="topic.logo">
                        </image>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between cell-clear" @click="petname">
                    <div class="flex-row">
                        <text class="title ml10">专栏名称</text>
                    </div>
                    <div class="flex-row flex-end" >
                        <text class="sub_title">{{topic.name}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel tip" v-if="!isStatus" @click="activate()">
                <text class="vip">点亮VIP专栏特权（588元/年）</text>
            </div>
            <div class="sub-panel tip" style="justify-content: center" v-if="judgmentone()" @click="getShop()">
                <text class="vip">开通店铺，体验众卖新营销模式</text>
            </div>
            <div class="cell-row cell-line" @click="goTemplate()">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">专栏模板</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{templateName}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">点亮专栏，更多精美模板选择</text>
            </div>
            <div v-if="judgmenttwo()">
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">开启直播间</text>
                    </div>
                    <div class="flex-row flex-end">
                        <switch class="switch" :disabled="isBottomLive" :checked="topic.useLive" @change="createLive"></switch>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">适用于有实体店铺的商家</text>
            </div>

            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">开通会员卡</text>
                    </div>
                    <div class="flex-row flex-end">
                        <switch class="switch" :disabled="isBottomCard" :checked="topic.useCard" @change="onUseCard"></switch>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">电子会员卡，集成微信卡包</text>
            </div>
            </div>
            <!--小程序设置-->
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear"  @click="appletCopy()">
                    <div class="flex-row">
                        <text class="title ml10">小程序设置</text>
                    </div>
                    <div class="flex-row flex-end">
                        <!--<text class="sub_title">未设置 </text>-->
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">复制专栏链接并设置为小程序自定义菜单</text>
                <!--<text class="sub_title" style="color:blue">《操作手册》</text>-->
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear" @click="copy()">
                    <div class="flex-row">
                        <text class="title ml10">公众号设置</text>
                    </div>
                    <div class="flex-row flex-end">
                        <!--<text class="sub_title">未设置 </text>-->
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">复制专栏链接并设置为公众号自定义菜单</text>
                <!--<text class="sub_title" style="color:blue">《操作手册》</text>-->
            </div>

            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear"  @click="share()">
                    <div class="flex-row">
                        <text class="title ml10">分享专栏至朋友圈</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>

            <div class="fill"></div>


        </scroller>

        <payment ref="payment" @notify="notify"></payment>

        <!--动画无效-->
        <!--<transition name="slide-fade-share" mode="out-in">-->
        <div v-if="showShare"  key="share">
            <div class="mask" @touchstart="maskTouch"></div>
            <share @doShare="doShare" @doCancel="doCancel"></share>
        </div>
        <!--模版内容-->
        <!--</transition>-->

    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .cell-logo {
        height: 160px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-bottom-color: #bbb;
        border-bottom-style: solid;
    }
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
        width:200px;
        height:120px;
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
    const album = weex.requireModule('album');
    const event = weex.requireModule('event');
    var modal = weex.requireModule('modal');
    export default {
        data() {
          return {
              sn:"",
              topic:{logo:"",name:"",id:"",useCashier:false,useCard:false,useCoupon:false,useLive:false},
              noJob:true,
              isOwner:false,
              showShare:false,
              copyPublic:'',
              copyApplet:'',
              templateId:'',
              templateName:'默认',
              liveId:'',
              isStatus:true,
              isBottomLive:false,
              isBottomCard:false
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
        },
        methods: {
//            判断激活状态并且没工作
            judgmentone:function () {
                let _this =this;
                if (_this.noJob == true && _this.isActivate())
                return true
            },
//            判断是否商家
            judgmenttwo:function () {
                let _this = this;
                if(_this.isOwner == true)
                    return true
            },
//            修改模版
            goTemplate:function () {
                let _this = this;
                event.openURL(utils.locate('widget/list.js?listId=' + this.templateId + '&type=template'),function (data) {
                    if(data.type == 'success' && !utils.isNull(data.data) ) {
                        _this.templateId = data.data.listId;
                        _this.templateName = data.data.listName;
                        POST('weex/member/topic/update.jhtml?templateId=' + _this.templateId ).then(
                            function (mes) {
                                if (mes.type == "success") {
                                    event.toast(mes.content);
                                } else {
                                    event.toast(mes.content);
                                }
                            }, function (err) {
                                event.toast(err.content);
                            }
                        )
                    }
                })
            },
//            修改头像
            changeLogo: function () {
                var _this = this;
                var options = {
                    isCrop:true,
                    width:2,
                    height:1
                };
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    options,function (ablum) {
                        if(ablum.type == 'success') {
                            event.upload(ablum.data.originalPath,function (message) {
                                if (message.type == 'success') {
                                    POST('weex/member/topic/update.jhtml?logo=' + encodeURIComponent(message.data) ).then(
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
//                                    event.toast(message.content);
                                }
                            },function (err) {
                                event.toast(err.content);
                            })
                        }
                    })
            },
//            修改昵称
            petname:function () {
                if(this.topic.useCard == true){
                    return
                }
                let _this = this;
                modal.prompt({
                    message: '设置专栏名称',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                    default:_this.topic.name,
                }, function (value) {
                    if(value.result == '确定'){
                        if(utils.isNull(value.data)){
                            modal.toast({message:'请输入专栏名称',duration:1})
                        }else{
                            var dataContent = value.data;
                            modal.confirm({
                                message: '专栏名称设定后将不可修改',
                                duration: 0.3,
                                okTitle:'确定',
                                cancelTitle:'取消',
                            }, function (e) {
                                if(e == '确定'){
                                    POST('weex/member/topic/update.jhtml?name=' + encodeURI(dataContent)).then(
                                        function (mes) {
                                            if (mes.type == "success") {
                                                _this.topic.name = dataContent;
                                            } else {
                                                event.toast(mes.content);
                                            }
                                        }, function (err) {
                                            event.toast(err.content);
                                        }
                                    )
                                }
                            })
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
                        _this.templateId = data.data.templateId;
                        _this.templateName = data.data.templateName;
                        if(data.data.status == 'success'){
                            _this.isStatus = true;
                            _this.isBottomLive = false;
                            _this.isBottomCard = false;
                        }else {
                            _this.isStatus = false;
                            _this.isBottomLive = true;
                            _this.isBottomCard = true;
                        }
                        if(data.data.status == 'success' && data.data.useLive == true){
                            _this.isBottomLive = true;
                        }
                        if(data.data.status == 'success' && data.data.useCard == true){
                            _this.isBottomCard = true;
                        }
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
                var _this = this;
                POST('weex/member/topic/activate.jhtml').then(
                    function (mes) {
                        _this.clicked = false;
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
                        _this.clicked = false;
                        event.toast(err.content);
                    }
                )

            },
//            申请开店
            getShop:function (e) {
                let _this = this;
                POST('weex/member/topic/create_enterprise.jhtml').then(
                    function (mes) {
                        if (mes.type == "success") {
                            _this.load();
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast(err.content);
                    }
                )
            },
            onUseCard:function (e) {
                if(utils.isNull(this.topic.name) || utils.isNull(this.topic.logo)){
                    modal.alert({
                        message: '请先设置专栏名称与专栏封面',
                        duration: 0.3,
                        okTitle:'确定',
                    })
                    return
                }
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
            //            创建直播
            createLive(){
                let _this = this;
                POST('weex/live/create.jhtml?title=' + encodeURIComponent(this.topic.name) + '&frontcover=' + this.topic.logo).then(
                    function (data) {
                        if(data.type == 'success'){
                            _this.load()
                        }else{
                            event.toast(data.content);
                        }
                    },function (err) {
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
            //            公众号点击复制
            copy(){
                let _this =this;
                GET('weex/topic/menu.jhtml',function (data) {
                    if(data.type = 'success'){
                        _this.copyPublic = data.data;
                        clipboard.setString(_this.copyPublic);
                        event.toast('复制成功');
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            //            小程序点击复制
            appletCopy(){
                let _this =this;
                GET('weex/topic/menu.jhtml?type=applet',function (data) {
                    if(data.type = 'success'){
                        _this.copyApplet = data.data;
                        clipboard.setString(_this.copyApplet);
                        event.toast('复制成功');
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },

        }

    }
</script>