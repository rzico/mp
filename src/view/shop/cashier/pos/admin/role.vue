<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" ></navbar>
        <div class="headerBox">
            <div class="headerBoxBottom">
                <text class="headerBoxTotal">合计:  2人</text>
                <text class="searchIcon " :style="{fontFamily:'iconfont'}">&#xe611;</text>
            </div>
        </div>
        <list class="list "  @loadmore="onloading" loadmoreoffset="180">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell class="contentBox">
                <div class="cell">
                    <div class="info">
                        <text class="cellTitle">小刘（工号:1023141）</text>
                        <text class="cellSubTitle">2018年7月10日  18:30:22</text>
                    </div>
                    <switch></switch>
                </div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../../../../style/wx.less"/>
<style>
    .wrapper{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color:#fff;
        /*align-items: center;*/
    }
    .headerBox{
        flex-direction: column;
        justify-content: center;
        width: 750px;
        height: 100px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .headerBoxBottom{
        width: 690px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
    }
    .headerBoxTotal{
        font-size: 32px;
        color: red;
    }
    .searchIcon{
        font-size: 32px;
        color: #5eb0fd;
    }
    .contentBox{
        flex-direction: column;
        padding-right: 30px;
        padding-left: 30px;
    }
    .cell{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 690px;
        height: 120px;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
    }
    .info{
        flex-direction: column;
    }
    .cellTitle{
        font-size:32px;
    }
    .cellSubTitle{
        font-size:28px;
        color: #999999;
        margin-top: 15px;
    }
    .position{
        font-size:32px;
        color:  #5eb0fd;
    }
</style>
<script>
    import navbar from '../../../../../include/navbar.vue';
    import { POST, GET } from '../../../../../assets/fetch';
    import {dom,event,animation} from '../../../../../weex.js';
    import utils from '../../../../../assets/utils';
    export default {
        components: {
            navbar
        },
        data() {
            return {
                refreshImg:utils.locate('resources/images/loading.png'),
                refreshing: false,
            }
        },
        props: {
            title:{default:'角色维护'}
        },
        created() {
            utils.initIconFont();
        },
        methods:{
            goback: function (e) {
                event.closeURL();
            },
//            上拉加载
            onloading (event) {

            },
//            下拉刷新
            onrefresh (event) {
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

                }, 1000)
            }
        }
    }
</script>