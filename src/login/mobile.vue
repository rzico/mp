<template>
    <div class="wrapper bkg-white">
        <navbar :title="title" @goback="goback"> </navbar>
        <mobile :title="mbtitle" @onclick="onclick"> </mobile>
    </div>
</template>

<style src='../style/wx.css' />

<style scoped>

</style>

<script>
    const modal = weex.requireModule('modal')
    var navigator = weex.requireModule('navigator')
    import navbar from '../include/navbar.vue'
    import mobile from '../include/mobile.vue'
    var stream = weex.requireModule('stream')
    export default {
         components: {
            navbar,mobile
        },
        props: {
            title: { default: "登录" },
            mbtitle: { default: "短信验证码登录" }
        }
    }
</script>