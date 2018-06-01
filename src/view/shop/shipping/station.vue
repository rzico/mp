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
            <cell>
                <div class="contentBox" v-for="c in list">
                    <div class="infoBox" @click="get(c.id,c.name)">
                        <text class="infoText">{{c.name}}</text>
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
    .contentBox{

    }
    .infoBox{
        background-color: white;
        flex-direction: row;
        align-items: center;
        width: 750px;
        height: 100px;
        padding-left: 10px;
        border-bottom-width: 1px;
        border-color: #cccccc;
    }
    .image{
        height: 80px;
        width: 80px;
        border-radius: 100%;
        border-width: 5px;
        border-color: #ccc;
    }
    .infoText{
        font-size: 32px;
        margin-left: 20px;
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
                list:[]
            }
        },
        components: {
            navbar,noData
        },
        props: {
            noDataHint:{default:'暂无配送站'},
            title: {default: "配送站列表"},
        },
        created() {
            utils.initIconFont();
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
                GET('weex/member/shipping/shop.jhtml?pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,
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

            get:function(id,name){
                var data = {
                    id:id,
                    name:name
                };
                let E = utils.message('success','返回配送站',data)
                event.closeURL(E);
            }

        }
    }
</script>