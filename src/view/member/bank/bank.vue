<template>
    <div  style="background-color: #eeeeee">

        <div class="header">
            <navbar :title="title"  @goback="goback"  > </navbar>
        </div>
        <div class="big">

            <div class="A">
                <text class="text">请绑定持卡人本人的银行卡</text>
            </div>
            <div class="A1">
                <div class="one">
                    <text class="title" >开户人</text>
                </div>
                <div class="twoA">
                    <input type="text" placeholder="" class="input" :autofocus="true" value="" @input="oninput"/>
                </div>
                <div class="font">
                    <text class="title2" :style="{fontFamily:'iconfont'}" @click="showAlert">&#xe620;</text>
                </div>
            </div>
            <div class="A2">
                <div class="one">
                    <text class="title">卡号</text>
                </div>
                <div class="twoB">
                    <input type="number" placeholder="无需网银/免手续费" class="input" :autofocus="true" value="" @input="oninput2"/>
                </div>
            </div>
            <div class="A3">
                <text class="textA">智慧加密，保障你的用卡安全，</text>
                <text class="textB" @click="showAlerttwo">了解安全保障</text>
            </div>
            <div class="A4" @click="goComplete">
                <text class="textC">下一步</text>
            </div>

        </div>
    </div>
</template>

<style lang="less" src="../../../style/wx.less"/>

<style>
    .title2{
        font-size:45px;
        color:#0088fb;
    }
    .big{
        background-color:#eeeeee;

    }
    .one{
        padding-left:20px;

    }
    .twoA{
        padding-left:30px;
        padding-top:4px;
        width:550px;
    }
    .twoB{
        padding-left:62px;
        padding-top:4px;
        width:550px;

    }
    .A4{
        background-color:#D9141E;
        margin-left:20px;
        margin-right:20px;
        height:82px;
        align-items:center;
        justify-content: center;
        margin-top:48px;
    }
    .A3{
        flex-direction: row;
        padding-left:20px;
        padding-top:20px;
    }
    .A2{
        flex-direction: row;
        align-items:center;
        height:86px;
        border-style:solid;
        border-bottom-width:1px;
        border-color:#ccc;
        background-color:#fff;

    }
    .A1{
        flex-direction: row;
        align-items:center;
        height:86px;
        border-style:solid;
        border-bottom-width:1px;
        border-color:#ccc;
        background-color:#fff;
    }

    .A{
        border-style:solid;
        border-bottom-width:1px;
        border-color:#ccc;
        padding-left:20px;
        padding-top:32px;
        background-color:#F5F5F5;
        height:79px;
    }
    .text{
        color:#a9a9a9;
        font-size:28px;
    }


    .title{
        font-size:32px;
    }
    .input{
        height:80px;
        font-size:30px;
    }

    .textA{
        font-size:28px;
        color:#a9a9a9;
    }
    .textB{
        font-size:28px;
        color:#0088fb;
    }
    .textC{
        font-size:40px;
        color:#fff;

    }
</style>
<script>
    const storage = weex.requireModule('storage');
    var modal = weex.requireModule('modal')
    var event = weex.requireModule('event')
    import utils from '../../../assets/utils';
    import navbar from '../../../include/navbar.vue';
    import { POST, GET } from '../../../assets/fetch'

    export default {
        data: function () {
            return {
                txtInput: '',
                accountName:'',
                autofocus: false
            };
        },
        components: {
            navbar
        },
        props: {
            title: {default: "添加银行卡"},

        },

        created() {
            utils.initIconFont();
        },
        methods: {
            ready: function () {
                var self = this;
                setTimeout(function () {
                    self.autofocus = true;
                }, 1000);
            },

            oninput2: function (event) {
                this.txtInput = event.value;
                console.log('oninput2', event.value);
            },
            oninput:function (event){
                this.accountName = event.value;
                console.log('oninput', event.value);
            },

            showAlert(event) {
                console.log('will show alert')
                modal.alert({
                    message: '为保证账户资金安全 ，只能绑定认证用户本人的银行卡',
                    okTitle: '知道了',
                    duration: 0.3
                }, function (value) {
                    console.log('alert callback', value)
                })
            },
            showAlerttwo(event) {
                console.log('will show alert')
                modal.alert({
                    message: '安全保障：智慧风险控管系统即时监控 ，保障你的资金安全',
                    okTitle: '知道了',
                    duration: 0.3
                }, function (value) {
                    console.log('alert callback', value)
                })
            },
            goback: function () {
                event.closeURL()
            },
            goComplete: function () {
                var _this=this;
                let  twodata = {
                    cardNo : this.txtInput,
                    name :this.accountName,
                };
                twodata = JSON.stringify(twodata);
                storage.setItem('twonumber', twodata,e=> {
                    event.openURL('http://192.168.2.241:8081/bank2.weex.js?name=twonumber', function (message) {

                    })
                });
        }
    }
    }



</script>