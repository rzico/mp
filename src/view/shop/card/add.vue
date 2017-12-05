<template>
    <div class="wrapper bkg-primary">
        <navbar :title="title" @goback="goback" border="false"> </navbar>

        <div class="box">
            <text class="name" >{{data.name}}</text>
            <image class="qrcode" resize="cover" :src="qrcode"></image>
        </div>
        <image class="logo" resize="cover" :src="data.logo"></image>
        <div class="content">
            <text class="intro" >1.{{data.prerogative}}</text>
            <text class="intro" >2.{{data.description}}</text>
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
        margin-top: 20px;
        width:450px;
        height:450px;
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
            title: { default: "领取会员卡" }
        },
        data () {
            return {
                qrcode:"",
                data:{logo:"./static/logo.png",name:"演示专栏"}
            }
        },
        created(){
            utils.initIconFont();
            this.load();
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
                        _this.qrcode = "http://pan.baidu.com/share/qrcode?w=400&h=400&url="+encodeURI(_this.data.qrcode);
                    } else {
                        event.toast(res.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            }
        }
    }
</script>