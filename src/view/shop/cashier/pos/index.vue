<template>
    <div class="wrapper">
        <div class="headerBox">
            <text class="headerIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
            <text class="headerTitle">xxx门店开单系统</text>
        </div>
        <div class="inputBox">
            <div class="inputCell">
                <text class="inputIcon primary" :style="{fontFamily:'iconfont'}">&#xe628;</text>
                <input  class="input" placeholder="请输入门店编号"/>
            </div>
            <div class="inputCell">
                <text class="inputIcon primary" :style="{fontFamily:'iconfont'}">&#xe643;</text>
                <input  class="input" type="email" placeholder="请输入登陆账号"/>
            </div>
            <div class="inputCell">
                <text class="inputIcon primary" :style="{fontFamily:'iconfont'}">&#xe643;</text>
                <input  class="input" type="password" placeholder="请输入登陆密码"/>
            </div>
        </div>
        <div class="button bkg-primary" @click="linkToLogin()">
            <text class="buttonText">登陆</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../../style/wx.less"/>
<style>
    .wrapper{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color:#fff;
        align-items: center;
    }
    .headerBox{
        flex-direction: row;
        align-items: center;
        margin-top: 200px;
    }
    .headerIcon{
        font-size: 80px;
    }
    .headerTitle{
        font-size:40px;
        margin-left: 50px;
    }
    .inputBox{
        margin-top: 100px;
        flex-direction: column;
        align-items: center;
    }
    .inputCell{
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #999999;
        height: 100px;
    }
    .inputIcon{
        font-size: 60px;
    }
    .input{
        padding-left:20px;
        width: 500px;
        height: 80px;
        line-height: 78px;
    }
    .button{
        width: 580px;
        height: 80px;
        border-radius: 15px;
        align-items: center;
        justify-content: center;
        margin-top: 100px;
    }
    .buttonText{
        font-size:32px;
    }
</style>
<script>
    import navbar from '../../../../include/navbar.vue';
    import { POST, GET } from '../../../../assets/fetch';
    var event = weex.requireModule('event');
    import utils from '../../../../assets/utils';
    export default {
        components: {
            navbar,
        },
        data() {
            return {

            }
        },
        props: {

        },
        created() {
            utils.initIconFont();
        },
        methods:{
            linkToLogin(){
                event.openURL(utils.locate("view/shop/cashier/pos/home/index.js"),function (e) {});
            },
        }
    }
</script>