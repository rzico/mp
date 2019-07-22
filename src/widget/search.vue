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
                <text class="clearBuf fz40 gray" style="margin-top: 3px" :style="{fontFamily:'iconfont'}" @click="clearBuf">&#xe60a;</text>
            </div>
        </div>
        <div class="searchBox">
            <div class="cell" @click="pickDate()">
                <text class="cellTitle">送货时间</text>
                <text class="cellSubTitle">{{time}}</text>
            </div>
            <div class="cell" @click="pickPattern()">
                <text class="cellTitle">配送站点</text>
                <text class="cellSubTitle">{{station}}</text>
            </div>
            <div class="cellTwo" @click="goMarki()">
                <text class="cellTitle">配送人员</text>
                <text class="cellSubTitle">{{people}}</text>
            </div>
        </div>
        <div class="searchButton" @click="searchButton()">
            <text class="searchButtonText primary">搜索</text>
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
    .search {
        position:sticky;
        background:#eee;
        /*height: 100px;*/
        flex-direction: row;
    }
    .search_box {
        margin-top:20px;
        margin-left:20px;
        margin-right:20px;
        margin-bottom:20px;
        padding-left: 20px;
        height: 80px;
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
        width:78px;
        height:78px;
        text-align: center;
        padding-top: 15px;
    }
    .search_input {
        margin-left: 20px;
        font-size:32px;
        line-height: 78px;
        height: 78px;
        width:560px;
    }
    .searchBox{
        background-color: white;
        flex-direction: column;
        width: 750px;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-color: #ccc;
        padding-left: 20px;
    }
    .cell{
        height: 120px;
        width: 730px;
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-color: #ccc;
    }
    .cellTwo{
        height: 120px;
        width: 730px;
        flex-direction: row;
        align-items: center;
    }
    .cellTitle{
        font-size: 36px;
    }
    .cellSubTitle{
        font-size: 32px;
        color: #888888;
        margin-left: 30px;
    }
    .searchButton{
        width: 750px;
        height: 120px;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
    }
    .searchButton:active{
       background-color: #cccccc;
    }
    .searchButtonText{
        font-size: 32px;
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
                keyword:'',
                pageName:'自定义查询',
                time:'选择送货时间',
                station:'选择配送站点',
                shopId:'',
                people:'选择配送人员',
                adminId:'',
            }
        },
        props: {


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
            pickDate(){
                var _this = this;
                picker.pickDate({
                    value: _this.time
                }, function (e) {
                    if (e.result == 'success') {
                        var date = e.data;
                        date = parseInt(new Date(date).getTime()/1000);
                        _this.time = utils.ymdtimefmt(date);
                    }
                })
            },
            //            设置配送站
            pickPattern:function () {

                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('view/shop/shipping/station.js'), function (data) {
                    _this.clicked = false;
                    if(data.type == 'success' && data.data != '') {
                        _this.station = data.data.name;
                        _this.shopId = data.data.id;
                        _this.people = '选择配送人员';
                        _this.adminId = ''
                    }
                })
            },
            //            跳转配送员
            goMarki:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if(utils.isNull(this.shopId)){
                    event.toast('请先选择配送站');
                    _this.clicked = false;
                    return
                }
                event.openURL(utils.locate('view/shop/shipping/marki.js?shopId='+ this.shopId),function (data) {
                    _this.clicked = false;
                    if(data.type=='success') {
                        _this.people = data.data.name;
                        _this.adminId = data.data.id
                    }
                });
            },
            searchButton(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                if(this.time == '选择送货时间'){
                    this.time = ''
                }
                var data = {
                    keyword:this.keyword,
                    time:this.time,
                    shopId:this.shopId,
                    adminId:this.adminId
                };
                let E = utils.message('success','返回搜索条件',data)
                event.closeURL(E);
                this.clicked = false;
            }

//methods 方法到此为止
        },
    }
</script>