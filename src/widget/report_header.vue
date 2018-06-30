<template>
    <div class="">
    <div class="header"  :class="[classHeader()]">
        <!--顶部导航-->
        <div class="nav nw">
            <div class="nav_back" @click="goback()">
                <text class="nav_ico"   :style="{fontFamily:'iconfont'}">&#xe669;</text>
            </div>
            <!--页面名称-->
            <div class="userBox" >
                <text class="nav_title">{{pageName}}</text>
            </div>
            <div class="rightTop" >
            </div>
        </div>
    </div>
    <div class="timeBox bkg-primary">
        <div class="leftBox">
            <div class="deduct" @click="deductTime()"><text class="fz40" style="color: #fff" >—</text> </div>
            <div class="timeContent"><text class="fz28" style="color: #fff">2018-06-06</text> </div>
            <div class="add" @click="addTime()"><text class="fz40" style="color: #fff">+</text> </div>
        </div>
        <div class="rightBox" @click="iconTime()">
            <text class="nav_ico"   :style="{fontFamily:'iconfont'}">&#xe63c;</text>
        </div>
    </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>
    .rightTop{
        height: 96px;width: 98px;align-items: center;justify-content: center;margin-top: 5px;
    }
    .nav_ico {
        font-size: 50px;
        color: #fff;
    }
    .userBox{
        flex-direction: row;
        align-items: center;
    }
    .nw{
        width: 750px;
    }
    .timeBox{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 750px;
        height: 100px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .leftBox{
        flex-direction: row;
        align-items: center;
    }
    .deduct{
        height: 60px;
        width: 60px;
        align-items: center;
        justify-content: center;
        border-color: #fff;
        border-width: 1px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    .add{
        height: 60px;
        width: 60px;
        align-items: center;
        justify-content: center;
        border-color: #fff;
        border-width: 1px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .timeContent{
        height: 60px;
        width: 150px;
        align-items: center;
        justify-content: center;
        border-color: #fff;
        border-top-width: 1px;
        border-bottom-width: 1px;
    }
    .rightBox{

    }
</style>
<script>
    import navbar from '../include/navbar.vue';
    import {dom,event} from '../weex.js'
    import { POST, GET } from '../assets/fetch.js';
    import utils from '../assets/utils';
    import filters from '../filters/filters.js';
    import noData from '../include/noData.vue';
    export default {
        components: {

        },
        data: function () {
            return {
                pageName:'周报'
            }
        },
        props: {

        },
        filters:{

        },
        created(){

        },
        mounted(){

        },
        methods: {
            classHeader:function () {
                let dc = utils.device();
                return dc
            },
            goback(){
                event.closeURL();
            },
            deductTime: function () {
                this.$emit("deductTime");
            },
            addTime: function () {
                this.$emit("addTime");
            },
            iconTime:function () {
                this.$emit("iconTime");
            }
//methods 方法到此为止
        },
    }
</script>