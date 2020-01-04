<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"></navbar>
        <div class="textInputBox">
            <textarea class="textInput" placeholder="请输入公告" v-model="memo"></textarea>
        </div>
        <div class="submitButton bkg-primary" :style="{opacity:memo==''?0.5:1}" @click="submit()">
            <text class="fz32 white">完成</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .textInputBox {
        width: 690px;
        border-radius: 6px;
        background-color: white;
        margin-top: 50px;
        margin-left: 30px;
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .textInput {
        width: 690px;
        height: 200px;
        padding-left: 20px;
        padding-right: 20px;
        box-sizing: border-box;
        font-size: 32px;
    }

    .submitButton {
        width: 690px;
        height: 100px;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 60px;
        margin-left: 30px;
    }
    .submitButton:active{
        opacity:0.5;
    }
</style>
<script>
    import {POST, GET, SCAN} from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    const modal = weex.requireModule('modal');
    const event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue'

    export default {
        data() {
            return {
                clicked: false,
                memo: ''
            }
        },
        props: {
            title: {default: "设置公告"}
        },
        components: {
            navbar
        },
        created() {
            utils.initIconFont();
            this.open()
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            open(){
                var _this = this;
                GET('weex/member/article/notice.jhtml',function (mes) {
                    if (mes.type == 'success') {
                        _this.memo = mes.data
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            submit(){
                var _this = this;
                POST('weex/member/article/notice.jhtml?notice='+encodeURIComponent(this.memo)).then(function (mes) {
                    if (mes.type == 'success') {
                        event.toast('设置成功');
                        event.closeURL();
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            }
        }
    }
</script>
