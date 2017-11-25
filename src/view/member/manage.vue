<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller">
                <div class="cell-row cell-line">
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
                <div class="cell-row cell-line">
                    <div class="cell-panel space-between" @click="option()">
                        <div class="flex-row flex-start">
                            <text class="ico" :style="{fontFamily:'iconfont'}">&#xe651;</text>
                            <text class="title ml10">通用设置</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                    <div class="cell-panel space-between cell-clear" @click="topic()">
                        <div class="flex-row">
                            <text class="ico" :style="{fontFamily:'iconfont'}">&#xe6a4;</text>
                            <text class="title ml10">我的专栏</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="sub_title">{{member.topic}}</text>
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                </div>

            <div class="cell-row cell-line">
                <div class="cell-panel space-between " @click="store">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe6a7;</text>
                        <text class="title ml10">店铺管理</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between ">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe67a;</text>
                        <text class="title ml10">会员卡管理</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe632;</text>
                        <text class="title ml10">优惠券管理</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>


            <div class="cell-row cell-line">
                    <div class="cell-panel space-between" @click="goReviewManage()">
                        <div class="flex-row flex-start">
                            <text class="ico" :style="{fontFamily:'iconfont'}">&#xe774;</text>
                            <text class="title ml10">评价管理</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="sub_title"></text>
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                    <div class="cell-panel space-between">
                        <div class="flex-row flex-start">
                            <text class="ico" :style="{fontFamily:'iconfont'}">&#xe629;</text>
                            <text class="title ml10">投票管理</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="sub_title"></text>
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                </div>
                <div class="cell-row cell-line">
                    <div class="cell-panel space-between" @click="beginShare()">
                         <div class="flex-row flex-start">
                             <text class="ico" :style="{fontFamily:'iconfont'}">&#xe633;</text>
                             <text class="title ml10">推荐给好友</text>
                         </div>
                         <div class="flex-row flex-end">
                             <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                         </div>
                     </div>
                    <div class="cell-panel space-between cell-clear" @click="gmchat()">
                         <div class="flex-row flex-start">
                             <text class="ico" :style="{fontFamily:'iconfont'}">&#xe65a;</text>
                             <text class="title ml10">联系客服</text>
                         </div>
                         <div class="flex-row flex-end">
                             <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                         </div>
                     </div>
                 </div>

        </scroller>
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
    }
    .newModule{
        flex-direction: row;
    }

</style>
<script>
    import { POST, GET } from '../../assets/fetch';
    import utils from '../../assets/utils';
    const event = weex.requireModule('event');
    import navbar from '../../include/navbar.vue';
    import share from '../../include/share.vue'
    export default {
        components: {
            navbar,share
        },
        data() {
            return {
                member:{nickName:"未登录",logo:utils.locate("logo.png"),autograph:"点击设置签名",topic:"未开通"},
                showShare:false
            }
        },
        props: {
            title: { default: "账号管理" }
        },
        created() {
            utils.initIconFont();
            var _this = this;
            _this.open();
        },
        methods: {
            maskTouch(){
                this.showShare = false;
            },
//            取消分享
            doCancel(){
                this.showShare = false;
            },
            store:function () {
                event.openURL(utils.locate('view/shop/shop/newShop.js'),function () {

                })
            },
            open:function () {
                var _this = this;
                GET("weex/member/manager/view.jhtml",
                    function (data) {
                       if (data.type=="success") {
                           _this.member = data.data;
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
//                utils.debug(E)
                event.closeURL(backData);
                },
            attribute:function (e) {
                let _this = this
                event.openURL(utils.locate('view/member/attribute.js'),
                    function (data) {
                    if(data.type == 'success' && data.data != ''){
                        _this.member.logo = data.data.logo;
                        _this.member.nickName = data.data.nickName;
                        _this.member.autograph = data.data.autograph;
                        return ;
                        }
                    }
                );
            },
            option: function (e) {
                event.openURL(utils.locate('view/member/option.js'),
                    function (data) {
                       return ;
                    }
                );
            },
            topic: function (e) {
                event.openURL(utils.locate('view/member/topic/index.js'),
                    function (data) {
                       return ;
                    }
                );
            },
//            评论管理
            goReviewManage:function (e) {
                event.openURL(utils.locate('view/member/reviewManage.js'),
                    function (data) {
                        return ;
                    }
                );
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
                        shareType = 'favorite';
                        break;
                    default:
                        shareType = '';
                        break;
                }

                var option = {
                    title:"【"+_this.nickName+"】推荐给你一个好用的工具，快去看看",
                    text:"超强图文小视频分享社区,中国版Facebook.",
                    imageUrl:_this.logo,
                    url:utils.remote("?xuid="+_this.id),
                    type:shareType
                }
                _this.showShare = false;
                event.wxShare(option,function (data) {
                    event.toast(JSON.stringify(data));
                })
            },
            beginShare:function () {
                this.showShare = true;
            },
            gmchat:function () {
                event.navToChat("gm_10211");
            }

        }
    }
</script>