<template>
    <div class="wrapper bkg-white">
        <navbar :title="title" @goback="goback"> </navbar>
        <captcha :title="cptitle" @onclick="onclick"> </captcha>
    </div>
</template>
<style src='../style/wx.css' />
<style scoped>

</style>
<script>
    const modal = weex.requireModule('modal')
    var navigator = weex.requireModule('navigator')
    import navbar from '../../include/navbar.vue'
    import captcha from '../../include/captcha.vue'
    var stream = weex.requireModule('stream')
    export default {
        components: {
            navbar,captcha
        },
        props: {
            title: { default: "登录"},
            cptitle: { default: "输入验证码" }
        }
    }
</script>