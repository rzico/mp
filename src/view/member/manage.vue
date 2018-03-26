<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller">
            <div class="cell-row ">
                <div class="cell-logo" @click="attribute()">
                    <div class="flex-start">
                        <image class="logo" resize="cover"
                               :src="member.logo">
                        </image>
                        <div class="name">
                            <text class="title">{{member.nickName}}</text>
                            <text class="autograph">{{member.autograph}}</text>
                        </div>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <!--芸店-->
            <!--cell-line-->
            <div class="cell-row ">
                <div class="cell-panel space-between" :class="[member.hasTopic?'':'cell-clear']" @click="option()">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe651;</text>
                        <text class="title ml10">通用设置</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <!--上架注释的-->
                <!--<div class="cell-panel space-between cell-clear" v-if="member.hasTopic"  @click="topic()">-->
                <!--<div class="flex-row">-->
                <!--<text class="ico" :style="{fontFamily:'iconfont'}">&#xe6a4;</text>-->
                <!--<text class="title ml10">我的专栏</text>-->
                <!--</div>-->
                <!--<div class="flex-row flex-end">-->
                <!--<text class="sub_title">{{member.topic}}</text>-->
                <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                <!--</div>-->
                <!--</div>-->
                <div class="cell-panel space-between cell-clear" v-if="member.hasTopic"  @click="activate()">
                    <div class="flex-row">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe6a4;</text>
                        <text class="title ml10">开通专栏</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{member.topic}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <!--魔篇-->
            <!--<div class="cell-row">-->
            <!--<div class="cell-panel space-between cell-clear" @click="option()">-->
            <!--<div class="flex-row flex-start">-->
            <!--<text class="ico" :style="{fontFamily:'iconfont'}">&#xe651;</text>-->
            <!--<text class="title ml10">通用设置</text>-->
            <!--</div>-->
            <!--<div class="flex-row flex-end">-->
            <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->

            <!--上架注释的-->
            <!--<div class="cell-row cell-line"  v-if="hastopic()">-->
            <!--<div class="cell-panel space-between cell-clear" @click="store">-->
            <!--<div class="flex-row flex-start">-->
            <!--<text class="ico" :style="{fontFamily:'iconfont'}">&#xe628;</text>-->
            <!--<text class="title ml10">店铺管理</text>-->
            <!--</div>-->
            <!--<div class="flex-row flex-end">-->
            <!--<text class="sub_title"></text>-->
            <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->


            <div class="cell-row ">
                <!--上架注释的-->
                <div class="cell-panel space-between " @click="orderManage()" v-if="hasuseCashier()">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe600;</text>
                        <text class="title ml10">订单管理</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between " @click="goodsManage()" v-if="hasuseCashier()">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe6a7;</text>
                        <text class="title ml10">商品管理</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between cell-clear" @click="goReviewManage()">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe774;</text>
                        <text class="title ml10">评价管理</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <!--投票管理暂未开发，关闭连接-->
                <!--<div class="cell-panel space-between  cell-clear">-->
                <!--<div class="flex-row flex-start">-->
                <!--<text class="ico" :style="{fontFamily:'iconfont'}">&#xe629;</text>-->
                <!--<text class="title ml10">投票管理</text>-->
                <!--</div>-->
                <!--<div class="flex-row flex-end">-->
                <!--<text class="sub_title"></text>-->
                <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                <!--</div>-->
                <!--</div>-->
            </div>
            <div class="cell-row ">
                <div class="cell-panel space-between" @click="beginShare()">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe633;</text>
                        <text class="title ml10">推荐好友下载APP</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between cell-clear\" @click="gmchat()">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe65a;</text>
                        <text class="title ml10">联系客服</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <!--<div class="cell-panel space-between " >-->
                <!--<div class="flex-row flex-start">-->
                <!--<text class="ico" :style="{fontFamily:'iconfont'}">&#xe65a;</text>-->
                <!--<text class="title ml10">检查更新</text>-->
                <!--</div>-->
                <!--<div class="flex-row flex-end">-->
                <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                <!--</div>-->
                <!--</div>-->
                <div class="cell-panel space-between cell-clear" @click="subQuestion()">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe65a;</text>
                        <text class="title ml10">问题反馈</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>

        </scroller>

        <payment ref="payment" @notify="notify"></payment>
        <div v-if="showShare"  key="share">
            <div class="mask" @touchstart="maskTouch"></div>
            <share @doShare="doShare" @doCancel="doCancel"></share>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>

    .cell-logo {
        height: 160px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        width:120px;
        height:120px;
        border-radius:60px;
        overflow:hidden;
    }

    .name {
        margin-left:10px;
        flex-direction: column;
        justify-content: center;
        height:180px;
    }

    .autograph {
        font-size: 28px;
        color: #ccc;
        top:10px;
        width: 400px;
        lines:1;
        text-overflow:ellipsis;
    }
    .newModule{
        flex-direction: row;
    }

</style>
<script>
    import { POST, GET } from '../../assets/fetch';
    import utils from '../../assets/utils';
    import payment from '../../include/payment.vue'
    const event = weex.requireModule('event');
    const modal = weex.requireModule('modal');
    import navbar from '../../include/navbar.vue';
    import share from '../../include/share.vue'
    export default {
        components: {
            navbar,share,payment
        },
        data() {
            return {
                member:{nickName:"未登录",logo:utils.locate("logo.png"),autograph:"点击设置签名",topic:"未开通",hasTopic:false,useCashier:false},
                showShare:false,
                clicked:false,
                isuseCashier:false,
                roles:''
            }
        },
        props: {
            title: { default: "账号管理" }
        },
        created() {
            utils.initIconFont();
            var _this = this;
            _this.open();
            this.permissions()
        },
        methods: {
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
//            判断是否点亮专栏
            hastopic:function () {
                let _this = this
                if (utils.isRoles("A",_this.roles)) {
                    return true
                }else {
                    return false
                }
            },
//            判断是否开启商户模式
            hasuseCashier:function () {
                if(!this.isuseCashier == true){
                    return true
                }else{
                    return false
                }
            },
            maskTouch(){
                this.showShare = false;
            },
//            取消分享
            doCancel(){
                this.showShare = false;
            },
            store:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/cashier/index.js'),function (mes) {
                    _this.clicked = false;
                    if(mes.type == 'success') {
                        _this.member.useCashier = false;
                        _this.open();
                    }
                })
            },
            open:function () {
                var _this = this;
                GET("weex/member/manager/view.jhtml",
                    function (data) {
                        if (data.type=="success") {
                            _this.member = data.data;
                            _this.isuseCashier = data.data.useCashier
                        } else {
                            event.toast(data.content);
                        }
                    },
                    function (err) {
                        event.toast("网络不稳定")
                    }
                )
            },
            goback: function (e) {
                var E = {
                    occupation:this.member.logo,
                    nickName:this.member.nickName,
                    autograph :this.member.autograph
                }
                let backData = utils.message('success','成功',E);
                event.closeURL(backData);
            },
            attribute:function (e) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;

//                storage.setItem('catagoryList',data.data);
//                storage.getItem(autotext, e => {
//                    let textData = JSON.parse(e.data);
//                    _this.autograph = textData.autograph;
//                    storage.removeItem(autotext);
//                })
                event.openURL(utils.locate('view/member/attribute.js'),
                    function (data) {
                        _this.clicked = false;
                        if(data.type == 'success' && data.data != ''){
                            if(!utils.isNull(data.data.logo)){
                                _this.member.logo = data.data.logo;
                            }
                            if(!utils.isNull(data.data.nickName)){
                                _this.member.nickName = data.data.nickName;
                            }
                            if(!utils.isNull(data.data.autograph)){
                                _this.member.autograph = data.data.autograph;
                            }
                            return ;
                        }else if(data.type == 'success' && data.content == '关闭'){
                            event.closeURL();
                        }

                    }
                );
            },
            option: function (e) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate('view/member/option.js'),
                    function (data) {
                        _this.clicked = false;
                        _this.open();
                        return ;
                    }
                );
            },
            topic: function (e) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate('view/member/topic/index.js'), function (mes) {
                        _this.open();
                        _this.clicked = false;
                        return ;
                    }
                );

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
//            评论管理
            goReviewManage:function (e) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/reviewManage.js'),
                    function (data) {
                        _this.clicked = false;
                        return ;
                    }
                );
            },
            doShare(id){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var shareType;
                let _this = this;

                setTimeout(function () {
                    _this.clicked = false;
                },1500)
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
                    default:
                        shareType = 'browser';
                        break;
                }

                var option = {
                    title:"【"+_this.member.nickName+"】推荐给你一个好用的工具，快去看看",
                    text:"超强图文小视频分享社区,中国版Facebook.",
                    imageUrl:_this.member.logo,
                    url:utils.website("?xuid="+_this.member.id),
                    type:shareType
                }
                _this.showShare = false;
                event.share(option,function (data) {

                    if(data.type == 'success') {
                        if (shareType == 'copyHref') {
                            event.toast('链接已复制到剪贴板');
                        } else if (shareType == 'browser') {
                        } else {
                            event.toast('分享成功');
                        }
                        return;
                    }
                })
            },
            beginShare:function () {
                this.showShare = true;
            },
            gmchat:function () {
                event.navToChat("u10491");
            },
//            前往商品管理
            goodsManage:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if (!utils.isRoles("12",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate('view/shop/goods/manage.js'),
                    function (data) {
                        _this.clicked = false;
                        return ;
                    }
                );
            },
//            前往订单管理
            orderManage:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if (!utils.isRoles("125",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate('view/shop/order/list.js'),
                    function (data) {
                        _this.clicked = false;
                        return ;
                    }
                );
            },
//            前往问题反馈
            subQuestion:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/questionSubmit.js'),
                    function (data) {
                        _this.clicked = false;
                        return ;
                    }
                );
            }

        }
    }
</script>