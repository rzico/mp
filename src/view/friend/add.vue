<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller" show-scrollbar="false">
           <div class="cell-row cell-line">
                <div class="cell-panel h cell-clear">
                    <div class="flex-row flex-start" style="height: 120px;width: 750px;" @click="gosearch()">
                        <text class="ico" style="color:#ccc" :style="{fontFamily:'iconfont'}">&#xe611;</text>
                        <text class="sub_title">手机号/登录名</text>
                    </div>
                 </div>
            </div>

             <div class="cell-row cell-line">
                 <div class="cell-panel h space-between">
                     <div class="flex-row">
                         <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe672;</text>
                         <div class="ml10">
                             <text class="title">扫一扫</text>
                             <text class="sub_title mt10">扫描二维码名片</text>
                         </div>
                     </div>
                     <div class="flex-row flex-end">
                         <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                     </div>
                 </div>
                 <div class="cell-panel h space-between cell-clear">
                    <div class="flex-row">
                        <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe637;</text>
                        <div class="ml10">
                            <text class="title">手机联系人</text>
                            <text class="sub_title mt10">添加通讯录中的朋友</text>
                        </div>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
             </div>

            <div class="cell-row cell-line" @click="showQrcode()">
                 <div class="cell-panel h space-between cell-clear">
                    <div class="flex-row">
                        <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe62b;</text>
                        <div class="ml10">
                            <text class="title">二维码名片</text>
                            <text class="sub_title mt10">可通过名片发展好友</text>
                        </div>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="fill"></div>
        </scroller>
        <qrcode ref="qrcode"> </qrcode>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>

    .h {
        height: 120px;
    }


</style>
<script>
    const native = weex.requireModule('app')
    const event = weex.requireModule('event');
    const stream = weex.requireModule('stream');
    import navbar from '../../include/navbar.vue'
    import qrcode from '../../include/qrcode.vue'
    import {jsMixins} from '../../mixins/mixins.js'
    export default {
        mixins:[jsMixins],
        components: {
            navbar,qrcode
        },
        data() {
            return {
                showUserInfo:false,
                value:"",
                logo:"",
                nickName:"",
                id:""
            }
        },
        props: {
            title: { default: "添加好友" }
        },
        created(){
            var _this = this;
            var domModule=weex.requireModule("dom");
            domModule.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url('"+_this.locateURL+"/resources/fonts/iconfont.ttf')"
            });
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            showQrcode: function (e) {
                this.$refs.qrcode.show();
            },
            gosearch: function () {
                event.openURL(this.locateURL+"/view/friend/search.js",function () {
                    event.closeURL();
                });
            }
        }

    }

</script>