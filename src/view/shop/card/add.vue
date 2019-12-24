<template>
    <div class="wrapper bkg-primary">
        <navbar :title="title" @goback="goback" border="false"> </navbar>
        <div class="codeBox">
            <text class="codeHeaderTitle">{{data.name}}</text>
            <image class="codeImg" :src="qrcode"  ref="downImg"></image>
            <text class="down"  @click="saveImg">下载推广码</text>
            <div class="promptBox">
                <text class="intro" >邀请好友打开微信扫一扫进入小程序并授权登录，即可成为本店会员。</text>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .codeBox {
        width: 670px;
        border-radius: 6px;
        background-color: white;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 40px;
    }
    .codeHeaderTitle {
        margin-top: 80px;
        font-size: 30px;
        color: #444;
    }
    .codeImg {
        width: 520px;
        height: 520px;
    }
    .promptBox {
        width: 630px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-top-width: 1px;
        border-top-color: #ccc;
        margin-top: 50px;
        padding-top: 30px;
        padding-bottom: 50px;
    }

    .intro {
        width:630px;
        padding-left: 20px;
        padding-right: 20px;
        color:#444;
        margin-top: 20px;
        font-size: 28px;
    }

    .down{
        font-size: 30px;
        color: #6495ED;
        text-decoration:underline;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 30px;
    }

</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    const event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue'
    export default {
        components: {
            navbar
        },
        props: {
            title: { default: "推广码" }
        },
        data () {
            return {
                qrcode:"",
                data:{logo:"./static/logo.png",name:"演示专栏"},
                saveImage:''
            }
        },
        created(){
            utils.initIconFont();
            this.load();
            this.saveImage = utils.website("/spread/show.jhtml?id=&uid="+ event.getUId())
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            load:function () {
                var _this = this;
                GET("weex/member/card/qrcode.jhtml",function (res) {
                    if (res.type=='success') {
                        _this.data = res.data;
                        _this.qrcode = utils.website("/q/show.jhtml?url="+encodeURI(_this.data.qrcode));
                    } else {
                        event.toast(res.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            saveImg(){
                let _this = this;
                const $image = this.$refs.downImg
                $image.save(result => {
                    if (result.success) {
                        event.toast('推广码已保存至相册')
                    } else {
                    }
                })
            }
        }
    }
</script>
