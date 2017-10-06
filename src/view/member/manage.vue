<template>
    <div class="wrapper">
        <scroller class="scroller">
                <div class="cell-row cell-line">
                    <div class="cell-panel space-between cell-clear" @click="attribute()" style="height:160px;">
                        <div class="flex-start">
                            <image class="logo" resize="cover"
                                   :src="member.logo">
                            </image>
                            <div class="name">
                                <text class="title">{{member.nickName}}</text>
                                <text class="autograph">{{member.autograph | autograph}}</text>
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
                            <text class="sub_title">已认证</text>
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                </div>

                <div class="cell-row cell-line">
                    <div class="cell-panel space-between">
                        <div class="flex-row flex-start">
                            <text class="ico" :style="{fontFamily:'iconfont'}">&#xe774;</text>
                            <text class="title ml10">评价管理</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="sub_title"></text>
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                    <div class="cell-panel space-between cell-clear">
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

</style>
<script>
    var event = weex.requireModule('event')
    const dom = weex.requireModule('dom');
    const modal = weex.requireModule('modal');
    import navbar from '../../include/navbar.vue'
    import {jsMixins} from '../../mixins/mixins.js'
    export default {
        mixins:[jsMixins],
        components: {
            navbar
        },
        data() {
            return {
                member:{nickName:"",logo:"",autograph:"点击设置签名"}
            }
        },
        props: {
            title: { default: "账号管理" }
        },
        created() {
            var _this = this;
            dom.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url('"+_this.locateURL+"/resources/fonts/iconfont.ttf')"
            });
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            attribute:function (e) {
                modal.toast({message:this.locateURL+'/view/member/attribute.js'});
                event.openURL(this.locateURL+'/view/member/attribute.js',
                    function (data) {
                        return ;
                    }
                );
            },
            option: function (e) {
                event.openURL(this.locateURL+'/view/member/option.js',
                    function (data) {
                       return ;
                    }
                );
            },
            topic: function (e) {
                event.openURL(this.locateURL+'/view/member/topic/index.js',
                    function (data) {
                        return ;
                    }
                );
            }
        }
    }
</script>