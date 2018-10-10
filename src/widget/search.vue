<template>
    <div class="wrapper">
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
        <div  class="search">
            <div class="search_box ">
                <div class="flex-start">
                    <text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe611;</text>
                    <input class="search_input" type="text" return-key-type="done" v-model="keyword" @input="oninput"  autofocus="true" ref="searchBar" :placeholder="searchHint"/>
                </div>
                <text class="clearBuf ico_small gray" style="margin-top: 3px" :style="{fontFamily:'iconfont'}" @click="clearBuf">&#xe60a;</text>
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
    .searchCancelText{
        color: #fff;
    }
    .search {
        position:sticky;
        background:#eee;
        /*height: 100px;*/
        flex-direction: row;
        flex:1;
    }
    .search_box {
        margin-top:20px;
        margin-left:20px;
        margin-right:20px;
        margin-bottom:20px;
        padding-left: 20px;
        height: 60px;
        border-width: 1px;
        border-color: #ccc;
        border-style: solid;
        border-radius:8px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: white;
    }
    .clearBuf {
        width:58px;
        height:58px;
        text-align: center;
        padding-top: 10px;
    }
    .search_input {
        margin-left: 20px;
        font-size:32px;
        line-height: 58px;
        height: 58px;
        width:400px;
    }
</style>
<script>
    import navbar from '../include/navbar.vue';
    import {dom,event} from '../weex.js'
    import { POST, GET } from '../assets/fetch.js';
    import utils from '../assets/utils';
    import filters from '../filters/filters.js';
    import noData from '../include/noData.vue';
    const picker = weex.requireModule('picker')
    export default {
        components: {

        },
        data: function () {
            return {
                clicked:false,
                searchHint: "输入收货人、电话、地址",
                keyword:''
            }
        },
        props: {
            pageName:'自定义查询',

        },
        filters:{

        },
        created(){
            utils.initIconFont();
        },
        methods: {
            classHeader:function () {
                let dc = utils.device();
                return dc
            },
            goback(){
                event.closeURL();
            },
            //          清空关键字
            clearBuf:function () {
                this.keyword = '';
            },
            oninput:function (e) {
                this.keyword = e.value;
            },

//methods 方法到此为止
        },
    }
</script>