<template>
    <div class="wrapper">
        <navbar title="营业汇总" @goback="goback"></navbar>
        <div class="lineCell" @click="linkToDetail('balance')">
            <text class="name">余额</text>
            <div class="flex-row">
                <text class="number">{{status.balance}}元</text>
                <text class="moreIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
        </div>
        <div class="lineCell" @click="linkToDetail('point')">
            <text class="name">金币</text>
            <div class="flex-row">
                <text class="number">{{status.point}}个</text>
                <text class="moreIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
        </div>
        <div class="lineCell" @click="linkToDetail('gift')">
            <text class="name">礼卡</text>
            <div class="flex-row">
                <text class="number">{{status.gift}}张</text>
                <text class="moreIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
        </div>
        <div class="lineCell" @click="linkToDetail('card')">
            <text class="name">套餐</text>
            <div class="flex-row">
                <text class="number">{{status.card}}次</text>
                <text class="moreIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
        </div>
        <div class="lineCell" @click="linkToDetail('water')">
            <text class="name">水票</text>
            <div class="flex-row">
                <text class="number">{{status.water}}张</text>
                <text class="moreIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
        </div>
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
                status: {}
            }
        },
        components: {
            navbar, noData
        },
        props: {},
        created() {
//              页面创建时请求数据
            utils.initIconFont();
            this.open();
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            open: function () {
                var _this = this;
                GET('weex/member/report/business_status.jhtml', function (res) {
                    if (res.type == "success") {
                        _this.status = res.data
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                })
            },

            linkToDetail(type) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if(type == 'balance' || type =='point' || type =='gift'){
                    event.openURL(utils.locate('view/shop/report/business_detail.js?type='+type), function (data) {
                        _this.clicked = false;
                    })
                }else {
                    event.openURL(utils.locate('view/shop/report/business_info.js?type='+type), function (data) {
                        _this.clicked = false;
                    })
                }

            }
        },

    }
</script>