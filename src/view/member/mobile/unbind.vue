<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"  > </navbar>
        <div class="headPrompting">
            <text class="fz28" style="color: #999">如遇手机号更换的情况，导致账号需换绑手机号，第一步需验证原手机号，再验证新手机号，即可完成换绑。</text>
        </div>
        <div class="middle mt20">
            <text class="fz32">目前已绑定手机尾号:  {{tel}}</text>
        </div>
        <div class="middle">
            <text class="fz32">验证码:</text>
            <input type="number" maxlength="6" placeholder="请输入验证码" class="input" />
            <div class="code">
                <text class="fz28" style="color: #EB4E40">发送验证码</text>
            </div>
        </div>
        <div class="button mt50 ml30 mr30">
            <text class="fz40" style="color: #ffffff">下一步</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .headPrompting{
        padding-right: 20px;
        padding-left: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        margin-left: 30px;
        margin-right: 30px;
        margin-top: 40px;
        background-color: #dddddd;
    }
    .middle{
        height: 100px;
        margin-left: 30px;
        margin-right: 30px;
        padding-left: 20px;
        flex-direction: row;
        align-items: center;
        border-color: #cccccc;
        border-bottom-width: 1px;
    }
    .input{
        width: 300px;
        height: 60px;
        margin-left: 50px;
    }
    .code{
        margin-left: 50px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-color:#EB4E40;
        border-radius: 10px;
        border-width: 1px;
    }
</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import { POST, GET } from '../../../assets/fetch';
    var event = weex.requireModule('event');
    import utils from '../../../assets/utils';
    export default {
        components: {
            navbar,
        },
        data() {
            return {
                tel:''
            }
        },
        props: {
            title: {default: "换绑手机号"},
        },
        created() {
            this.tel = utils.getUrlParameter("mobile");
            utils.debug(this.tel)
        },
    }
</script>