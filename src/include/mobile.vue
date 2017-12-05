<template>
    <div class="mobile">
        <div class="mobile-header">
            <text class="mobile-title">{{title}}</text>
        </div>

        <div class="mobile-row space-between">
            <text class="title">手机号归属地</text>
            <text class="sub_title">(中国)</text>
        </div>

        <div class="mobile-row">
            <text class="flex1 title">+86</text>
            <input class="flex5" type="tel" style="height:45px;" v-model="vm" maxlength="11" @input="onInput" autofocus="true" placeholder="请输入手机号"/>
        </div>

        <div class="mobile-row clear">
            <text class="button flex1" value="获取验证码" type="primary" v-on:click="onSend">{{caption}}</text>
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>

    .mobile-title {
        font-size: 48px;
        color: #000;
    }
    .mobile-header {
        margin-top: 100px;
        height:100px;
        background-color: #fff;
        flex-direction: column;
        align-items: center;
    }

    .mobile-row {
        margin-left: 60px;
        margin-right: 60px;
        margin-top: 20px;
        height: 100px;
        flex-direction: row;
        background-color: #ffffff;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
        border-bottom-style: solid;
        align-items: center;
    }

    .clear {
        border-bottom-width:0px;
    }

</style>
<script>
    export default {
        data() {
            return {
                vm:this.value
            }
        },
        props: {
            value: { default: "" },
            title: { default: "短信验证码" },
            caption: { default: " 获取验证码" }
        },
        methods: {
            onSend: function (e) {
                this.$emit('onSend');
            },
            onInput: function (e)  {
                this.$emit("onChange",e.value);
            }
        }
    }
</script>