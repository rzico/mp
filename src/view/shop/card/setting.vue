<template>
    <div style="background-color: #eeeeee;align-items: center">
        <navbar :title="title"  @goback="goback"  > </navbar>
    <div class="sign" @click="add" >
        <text class="plusSign" :style="{fontFamily:'iconfont'}" >&#xe618;</text>
    </div>
        <list>
            <cell>
    <div class="setting" v-for="num in div">
        <div class="titile">
            <text class="tiele">活动设置</text>
        </div>
        <div class="money">
            <text class="monyeTexttwo">充</text>
            <input type="text" placeholder="设置金额" class="input"  @change="" @input="oninput"/>
            <text class="monyeTextthree">送</text>
            <input type="text" placeholder="设置金额" class="input"  @change="" @input="oninput"/>
        </div>
        <div class="vip">
            <text class="vipText">会员等级</text>
            <text class="vipTexttwo">升级至</text>
            <input type="text" placeholder="设置等级" class="input"  @change="" @input="oninput"/>
        </div>
    </div>
            </cell>
        </list>
    </div>
</template>
<style>
    .sign{
        height: 80px;
        width: 200px;
        background-color:#cccccc;
        margin-top: 80px;
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
        border-bottom-left-radius: 40px;
        border-top-left-radius: 40px;
        justify-content: center;
        align-items: center;
    }
    .plusSign{
        margin-top: 10px;
        font-size: 80px;
        color: white;
        font-weight: 700;
    }
    .setting{
        background-color: white;
        width: 700px;
        margin-top: 50px;
        border-radius: 40px;
    }
    .titile{
        padding-left: 30px;
        border-top-width: 1px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
        height: 100px;
    }
    .money{
        padding-left: 30px;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
        height: 100px;
    }
    .vip{
        padding-left: 30px;
        border-bottom-width: 1px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
        height: 100px;
    }
    .vipTexttwo{
        padding-left: 20px;
    }
    .monyeTexttwo{

    }
    .monyeTextthree{
        padding-left: 20px;
    }

    .input{
        padding-left: 20px;
        width: 150px;
        font-size: 28px;
        height: 32px;
    }
</style>
<script>
    var event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import { POST, GET, SCAN } from '../../../assets/fetch'
    export default {
        data: function () {
            return{
                plusShow:true,
                div:[]
            }
        },
        created: function () {
            utils.initIconFont();
        },
        components: {
            navbar
        },
        props: {
            title: {default: "设置"},

        },
        methods: {
            add:function () {
                this.div.push('')
            }
        }
    }
</script>