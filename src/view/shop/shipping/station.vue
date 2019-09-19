<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" > </navbar>
        <list  @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="list.length == 0">
                <noData :noDataHint="noDataHint"></noData>
            </cell>
            <cell  v-for="item in list">
                <div class='addressBox' @click="get(item.id,item.name,item.isSelf)">
                    <text class="addressIcon" :style="{fontFamily:'iconfont'}">&#xe792;</text>
                    <div class='addressContent'>
                        <div class='addressTitleBox'>
                            <text class='addressTitle'>{{item.name}}</text>
                        </div>
                        <div class='addressSubTitleBox'>
                            <text class='addressSubTitle'>{{item.areaName}}{{item.address}}</text>
                            <text class='addressSubTitleTwo'>{{item.distance | watchKM}}KM</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .wrapper{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color:#eee;
    }
    .addressBox{
        width: 750px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
    }
    .addressBox:active{
        background-color: #f5f5f5;
    }
    .addressIcon{
        width: 100px;
        text-align: center;
        font-size: 40px;
        color: #999;
    }
    .addressContent{
        width: 650px;
        display: flex;
        flex-direction: column;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-right: 30px;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        box-sizing: border-box;
    }
    .addressTitleBox{
        width: 620px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .addressTitle{
        font-size: 32px;
        font-weight: 500;
        max-width: 500px;
        lines:1;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .addressSubTitleBox{
        width: 620px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
    }
    .addressSubTitle{
        font-size: 26px;
        color: #999;
        max-width: 500px;
        lines:1;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .addressSubTitleTwo{
        font-size: 26px;
        color: #999;
    }
</style>
<script>
    import {dom,event,stream,storage,animation} from '../../../weex.js'
    import utils from '../../../assets/utils.js'
    import { POST, GET } from '../../../assets/fetch'
    import navbar from '../../../include/navbar.vue'
    import noData from '../../../include/noData.vue';
    const picker = weex.requireModule('picker');
    const modal = weex.requireModule('modal');
    export default {
        data: function () {
            return {
                pageStart:0,
                pageSize:20,
                refreshImg:utils.locate('resources/images/loading.png'),
                refreshing:false,
                list:[],
                lat:0,
                lng:0,
            }
        },
        components: {
            navbar,noData
        },
        filters:{
          watchKM(val){
             return (val/1000).toFixed(2)
          }
        },
        props: {
            noDataHint:{default:'暂无配送站'},
            title: {default: "配送站列表"},
        },
        created() {
            utils.initIconFont();
            this.lat = utils.getUrlParameter('lat');
            this.lng = utils.getUrlParameter('lng');
            this.open()
        },
        methods: {
            onloading:function () {
////            获取订单列表
                this.open();
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
                    this.refreshing = false;
                    this.open();
////            获取关注列表
                }, 1000)
            },
            goback(){
                event.closeURL();
            },

            open:function () {
                let _this = this
                if(utils.isNull(this.lat)){
                    this.lat = 0
                }if(utils.isNull(this.lng)){
                    this.lng = 0
                }
                GET('weex/member/shipping/shop.jhtml?pageStart=' + this.pageStart + '&pageSize=' + this.pageSize+'&lat='+this.lat+'&lng='+this.lng,
                    function (res) {
                        if (res.type=="success") {
                            if (res.data.start == 0) {
                                _this.list = res.data.data;
                            } else {
                                res.data.data.forEach(function (item) {
                                    _this.list.push(item);
                                })
                            }
                            _this.pageStart = res.data.start+res.data.data.length;
                        } else {
                            event.toast(res.content);
                        }

                    }, function (err) {
                        event.toast(err.content);
                    })
            },

            get:function(id,name,isSelf){
                var data = {
                    id:id,
                    name:name,
                    isSelf:isSelf
                };
                let E = utils.message('success','返回配送站',data)
                event.closeURL(E);
            }

        }
    }
</script>