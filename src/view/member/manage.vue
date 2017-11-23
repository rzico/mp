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
                    <div class="cell-panel space-between cell-clear">
                        <div class="flex-row flex-start">
                            <text class="ico" :style="{fontFamily:'iconfont'}">&#xe629;</text>
                            <text class="title ml10">我的赏金</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="sub_title"></text>
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                    <div class="cell-panel space-between cell-clear">
                        <div class="flex-row flex-start">
                            <text class="ico" :style="{fontFamily:'iconfont'}">&#xe6a7;</text>
                            <text class="title ml10">我的店铺</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="sub_title"></text>
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                    <div class="cell-panel space-between cell-clear">
                        <div class="flex-row flex-start">
                            <text class="ico" :style="{fontFamily:'iconfont'}">&#xe67a;</text>
                            <text class="title ml10">我的会员卡</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="sub_title"></text>
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                    <div class="cell-panel space-between cell-clear">
                        <div class="flex-row flex-start">
                            <text class="ico" :style="{fontFamily:'iconfont'}">&#xe632;</text>
                            <text class="title ml10">我的优惠券</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="sub_title"></text>
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                </div>

                <div class="cell-row cell-line">
                    <div class="cell-panel space-between">
                         <div class="flex-row flex-start">
                             <text class="ico" :style="{fontFamily:'iconfont'}">&#xe633;</text>
                             <text class="title ml10">推荐给好友</text>
                         </div>
                         <div class="flex-row flex-end">
                             <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                         </div>
                     </div>
                    <div class="cell-panel space-between cell-clear">
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
    export default {
        components: {
            navbar
        },
        data() {
            return {
                member:{nickName:"未登录",logo:utils.locate("logo.png"),autograph:"点击设置签名",topic:"未开通"}
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
                    utils.debug(data)
                        _this.member.logo = data.data.logo;
                        _this.member.nickName = data.data.nickName;
                        _this.member.autograph = data.data.autograph;
                        return ;
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
            }
        }
    }
</script>