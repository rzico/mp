<template>
    <div class="wrapper bkg-primary">
        <navbar :title="title" @goback="goback" border="false"> </navbar>

        <div class="box">
            <text class="name" >{{data.name}}</text>
            <image class="qrcode" resize="cover" :src="qrcode" ></image>
        </div>
        <image class="logo" resize="cover" :src="data.logo" ></image>
        <div class="content">
            <text class="intro" >1.邀请好友打开微信扫一扫并授权登录，办理店铺会员，享受店内会员权益。</text>
            <text class="intro" >2.办卡会员可以充值，储值卡余额只能在所属商家使用，解悉权归商家所有。</text>
            <text class="intro" >3.拨打0592-6085128，为您寄送邀请码。</text>
        </div>
        <div class="downBox">
            <!--weex保存图片必须要有一个image来放图-->
            <image class="dowImage" resize="cover" :src="saveImage" ref="downImg"></image>
            <text class="down"  @click="saveImg">下载邀请码</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .box {
        margin-top: 100px;
        width:650px;
        margin-left: 50px;
        background-color: #fff;
        height:600px;
        border-radius: 10px;
        border-color: #ccc;
        border-width: 1px;
        align-items: center;
    }
    .logo {
        /*margin-top: -40px;*/
        position: absolute;
        top: 202px;
        left:335px;
        width:80px;
        height:80px;
        border-radius: 40px;
        border-color: #ccc;
        border-width: 1px;
        z-index: 100;
    }
    .name {
        margin-top: 60px;
        color:#bbb;
        font-size: 30px;
    }
    .content {
        margin-top: 40px;
        width:650px;
        margin-left: 50px;
    }
    .intro {
        margin-left: 10px;
        width:630px;
        color:#eee;
        margin-top: 20px;
        font-size: 28px;
    }
    .qrcode {
        width:480px;
        height:480px;
    }
    .downBox{
        width: 750px;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }
    .down{
        font-size: 32px;
        color: #fff;
        text-decoration:underline;
        margin: 30px;
    }
    .dowImage{
        width: 50px;
        height: 50px;
        opacity: 0;
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
            title: { default: "邀请码" }
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
                        event.toast('邀请码已保存至相册')
                    } else {
                    }
                })
            }
        }
    }
</script>