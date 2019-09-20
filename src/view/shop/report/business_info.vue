<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"></navbar>
        <list >
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-for="item in list">
                <div class="lineCell" @click="linkToDetail(item.goodsId,item.name)">
                    <text class="name">{{item.name}}</text>
                    <div class="flex-row">
                        <text class="number">{{item.balance}}</text>
                        <text class="moreIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </cell>
            <loading @loading="onloading" :display="loadinging ? 'show' : 'hide'"></loading>
            <cell v-if="list.length == 0" >
                <noData > </noData>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>

    .lineCell {
        width: 750px;
        height: 100px;
        padding-left: 30px;
        padding-right: 30px;
        border-bottom-color: #cccccc;
        border-bottom-width: 1px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: #ffffff;
    }
    .lineCell:active {
        background-color: #ccc;
    }
    .number {
        font-size: 32px;
        color: red;
    }
    .name {
        font-size: 32px;
    }

    .moreIcon {
        font-size: 32px;
        color: #999;
        margin-left: 20px;
    }
</style>
<script>
    var modal = weex.requireModule('modal')
    import {POST, GET} from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import {dom, event, animation} from '../../../weex.js';
    import navbar from '../../../include/navbar.vue'
    import noData from '../../../include/noData.vue'
    import filters from '../../../filters/filters.js'

    export default {
        data: function () {
            return {
                clicked: false,
                refreshing: false,
                loadinging:false,
                pageStart:0,
                pageSize:20,
                refreshImg:utils.locate('resources/images/loading.png'),
                title:'',
                type:'',
                list:[]
            }
        },
        components: {
            navbar, noData
        },
        props: {},
        created() {
//              页面创建时请求数据
            let _this = this;
            utils.initIconFont();
            this.type = utils.getUrlParameter('type');
            switch (this.type) {
                case 'gift':
                    _this.title = '礼卡汇总';
                    break;
                case 'card':
                    _this.title = '套餐汇总';
                    break;
                case 'water':
                    _this.title = '水票汇总';
                    break;
            }
            this.open();
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            //            上拉加载
            onloading (event) {
                this.loadinging = true
                this.open();
            },
//            下拉刷新
            onrefresh:function (event) {
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
                    _this.open();
                }, 1000)
            },
            open: function () {
                var _this = this;
                GET('weex/member/report/business_product_list.jhtml?type='+this.type+'&pageStart='+this.pageStart+'&pageSize='+this.pageSize, function (res) {
                    if (res.type == "success") {
                        _this.list = res.data
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                })
            },

            linkToDetail(goodsId,goodsName) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('view/shop/report/business_detail.js?type='+this.type+'&goodsId='+goodsId+'&goodsName='+encodeURIComponent(goodsName)), function (data) {
                    _this.clicked = false;
                })
            }
        },

    }
</script>