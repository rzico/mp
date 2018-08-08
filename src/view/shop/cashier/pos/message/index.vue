<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" ></navbar>
        <div class="headerBox">
            <div class="headerBoxBottom">
                <text class="searchIcon " :style="{fontFamily:'iconfont'}">&#xe611;</text>
            </div>
        </div>
        <list class="list "  @loadmore="onloading" loadmoreoffset="180">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell class="contentBox">
                <div class="cell">
                        <text class="cellTitle">系统通知</text>
                        <text class="cellSubTitle">关于国庆节商场安全工作安排</text>
                    <div class="cellBottom">
                            <text class="position">2018年7月10日  18:30:22</text>
                            <text class="position">安检部</text>
                        <div class="flex-row">
                            <text class="position">已读</text>
                            <text class="fz32" style="color: #5eb0fd">反馈</text>
                        </div>
                    </div>
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
        height: 80px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .headerBoxBottom{
        width: 690px;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
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
        flex-direction: column;
        justify-content: space-between;
        width: 690px;
        height: 200px;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
    }
    .cellBottom{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 690px;
    }
    .cellTitle{
        font-size:32px;
    }
    .cellSubTitle{
        font-size:32px;
    }
    .position{
        font-size:32px;
        color:  #999;
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
            title:{default:'系统消息'}
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