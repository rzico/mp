<template>
    <div class="wrapper" >
        <navbar :title="title"@goback="goback"></navbar>
        <scroller  :class="[bgWhite ? 'whiteColor' : '']"  @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <div :style="{minHeight:screenHeight + 'px'}" ref="adoptPull">
                <noData :noDataHint="noDataHint" ndBgColor="#fff" v-if="dataList.length == 0"></noData>
                <!--点赞-->
                <div class="lineBox"  v-else v-for="item in dataList"  @click="goAuthor(item.memberId)">
                    <div class="flex-row">
                        <image class="headImg" :src="item.logo" ></image>
                        <div class="userInfo">
                            <text class="fz30 nameColor" >{{item.nickName}}</text>
                            <text   class="infoText" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                    <!--<image class="coverImg" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>-->
                </div>
            </div>
        </scroller>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .whiteColor{
        background-color: #fff;
    }
    .infoText{
        font-size: 32px;color: #444;
        width: 480px;
        lines:1;
        text-overflow: ellipsis;
    }
    .nameColor{
        color: steelblue;
    }
    .userInfo{
        margin-left: 20px;
        height: 120px;
        justify-content: space-between;
    }
    .coverImg{
        height: 110px;
        width: 110px;
        border-radius: 10px;
    }
    .headImg{
        height: 90px;
        width: 90px;
        border-radius: 45px;
    }
    .lineBox{
        flex-direction: row;
        align-items: center;
        height: 150px;
        padding-right: 20px;
        justify-content: space-between;
        width: 725px;
        margin-left: 25px;
        background-color: #fff;
        border-color: gainsboro;
        border-style: solid;
        border-bottom-width:1px;
    }
    .fz30{
        font-size: 30px;
    }

</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import {dom,event,storage,stream,animation} from '../../../weex.js';
    import utils from '../../../assets/utils';
    import { POST, GET } from '../../../assets/fetch'
    import noData from '../../../include/noData.vue'
    import filters from '../../../filters/filters.js'
    export default {
        data(){
            return{
                bgWhite:false,
                dataList:[],
                refreshing:false,
                pageStart:0,
                pageSize:15,
                articleId:'',
                title:'0人点赞',
                screenHeight:0,
                refreshImg:utils.locate('resources/images/loading.png'),
                hadUpdate:false,
            }
        },
        components: {
            navbar
        },
        created(){
            let _this = this;
            utils.initIconFont();
            this.screenHeight = utils.fullScreen(136);
            this.articleId = utils.getUrlParameter('articleId');
            this.getAllLaud();
        },
//        dom呈现完执行滚动一下
        updated(){
//            每次加载新的内容时 dom都会刷新 会执行该函数，利用变量来控制只执行一次
            if(this.hadUpdate){
                return;
            }
            this.hadUpdate = true;
//            判断是否不是ios系统  安卓系统下需要特殊处理，模拟滑动。让初始下拉刷新box上移回去
            if(!utils.isIosSystem()){
                const el = this.$refs.adoptPull//跳转到相应的cell
                dom.scrollToElement(el, {
                    offset: -119
                })
            }
        },
        methods:{
//            获取点赞列表
            getAllLaud(){
                let _this = this;
                GET('weex/laud/list.jhtml?articleId=' + this.articleId +'&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success' && data.data.data != '' ){
                        if (_this.pageStart == 0) {
                            _this.dataList = data.data.data;
                            _this.title = data.data.recordsTotal + '人点赞';
                        }else{
                            data.data.data.forEach(function (item) {
                                _this.dataList.push(item);
                            })
                        }
                        _this.pageStart = data.data.start + data.data.data.length;
                    }else if(data.type == 'success' && data.data.data == '' ){
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            onloading:function () {
////            获取黑名单列表
                this.getAllLaud();
            },
            onrefresh:function () {
                var _this = this;

                _this.pageStart = 0;
                this.refreshing = true;
                animation.transition(_this.$refs.refreshImg, {
                    styles: {
                        transform: 'rotate(360deg)',
                    },
                    duration: 1000, //ms
                    timingFunction: 'linear',//350 duration配合这个效果目前较好
                    needLayout:false,
                    delay: 0 //ms
                })
                setTimeout(() => {
                    animation.transition(_this.$refs.refreshImg, {
                        styles: {
                            transform: 'rotate(0)',
                        },
                        duration: 10, //ms
                        timingFunction: 'linear',//350 duration配合这个效果目前较好
                        needLayout:false,
                        delay: 0 //ms
                    })
                    this.refreshing = false
                    _this.getAllLaud();
                }, 1000)
            },


            goback(){
                event.closeURL();
            },
            //            作者主页
            goAuthor:function (id) {
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                });
            },
            onrefresh:function () {
                var _this = this;
                this.refreshing = true
                setTimeout(() => {
                    this.refreshing = false
                }, 50)
            },
            onloading:function () {
                var _this = this;
                _this.showLoading = true;
//                _this.loadingState = "正在加载数据";
                setTimeout(() => {
                    _this.listCurrent = _this.listCurrent + _this.pageSize;
                    GET('weex/laud/list.jhtml?articleId=' + this.articleId +'&pageStart=' + _this.listCurrent + '&pageSize=' + _this.pageSize,function (data) {
                        if(data.type == 'success' && data.data.data != '' ){
                            data.data.data.forEach(function (item) {
                                _this.dataList.push(item);
                            })
                        }else if(data.type == 'success' && data.data.data == '' ){
                        }else{
                            event.toast(data.content);
                        }
                    },function (err) {
                        event.toast(err.content);
                    })
                    _this.showLoading = false;
                }, 1500)
            },
        }

    }
</script>