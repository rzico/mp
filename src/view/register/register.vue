<template>
    <div class="wrapper bkg-white">
        <navbar :title="title" @goback="goback"> </navbar>
        <mobile :title="mbtitle" @onclick="onclick"> </mobile>
        <div class="memo">
            <text class="title">注册即表同意</text>
            <text class="title">《用户注册协议》</text>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>

<style scoped>
    .memo {
        margin-top: 20px;
        padding-left: 60px;
        padding-right: 60px;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
<script>
    const modal = weex.requireModule('modal')
    var navigator = weex.requireModule('navigator')
    import navbar from '../../include/navbar.vue'
    import mobile from '../../include/mobile.vue'
    var stream = weex.requireModule('stream')
    export default {
         components: {
            navbar,mobile
        },
        props: {
            title: { default: "注册" },
            mbtitle: { default: "新用户注册" }
        }
    }
</script>