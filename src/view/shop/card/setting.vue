<template>
    <div style="background-color: #eeeeee">
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete=""  > </navbar>
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
                <div style="align-items: center">
                <div class="sign" @click="add" >
                    <text class="plusSign" :style="{fontFamily:'iconfont'}" >&#xe618;</text>
                </div>
                </div>
            </cell>
        </list>
    </div>
</template>
<style>
    .sign{
        height: 80px;
        width: 100px;
        background-color:#cccccc;
        margin-top: 20px;
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
        border-bottom-left-radius: 40px;
        border-top-left-radius: 40px;
        justify-content: center;
        align-items: center;
    }
    .plusSign{

        font-size: 40px;
        color: white;
        font-weight: 700;
    }
    .setting{
        background-color: white;
        margin-left: 25px;
        margin-right: 25px;
        margin-top: 25px;
        border-radius: 15px;
    }
    .titile{
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        padding-left: 30px;
        background-color: #ccc;
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
            complete:{ default:"完成"}
        },
        methods: {
            add:function () {
                this.div.push('')
            }
        }
    }
</script>