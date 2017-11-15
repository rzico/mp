<template>
    <div style="background-color: #eeeeee">
        <div class="header">
            <navbar :title="title" :complete="complete" @goback="goback"></navbar>
        </div>

        <scroller class="scroller">
            <div class="cumulative">
                <text class="cumulativeMoney">累计： 元</text>
            </div>
            <div class="cell " v-for="num in lists">
                <div class="month">
                    <text class="monthText">{{num.createDate | detailMonth}}月</text>
                </div>
                <div class="panel">
                    <div class="monthFont">
                        <text class="textMonth">{{num.createDate | timefmt}}</text>
                        <text class="font" :style="{fontFamily:'iconfont'}">&#xe6ce;</text>
                    </div>
                    <div class="moneyname">
                        <text class="money">+ {{num.amount}}元</text>
                        <text class="name">来自{{num.nickName}}的打赏</text>
                    </div>
                </div>
            </div>
            <loading class="loading" @loading="onloading" :display="showLoading">
                <text class="indicator">Loading ...</text>
            </loading>
        </scroller>
    </div>
</template>

<style scoped>
    .cumulative {
        width: auto;
        height: 120px;
        border-width: 1px;
        border-style: solid;
        border-color: #ccc;
        justify-content: center;
        /*flex-direction: row;*/
        background-color: white;
        margin-top: 20px;
    }

    .cumulativeMoney {
        font-size: 32px;
        margin-left: 20px;
    }

    .month {
        height: 60px;
        justify-content: center;
    }

    .monthText {
        font-size: 32px;
        margin-left: 20px;
    }

    .panel {
        width: auto;
        height: 120px;
        align-items: center;
        flex-direction: row;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: #ccc;
        background-color: #fff;
    }

    .textMonth {
        font-size: 32px;
        margin-left: 20px;
        color: #cccccc;
    }

    .monthFont {
        flex-direction: row;
        align-items: center;
    }

    .font {
        margin-left: 50px;
        font-size: 70px;
        color: #D9141E;
    }

    .moneyname {
        margin-left: 50px;
    }

    .money {
        font-size: 32px;
        font-weight: bold;
    }

    .name {
        font-size: 28px;
        color: #ccc;
    }

    .loading {
        justify-content: center;
    }
</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import {POST, GET} from '../../../assets/fetch';
    import utils from '../../../assets/utils';
    import filters from '../../../filters/filters';

    var event = weex.requireModule('event');
    const modal = weex.requireModule('modal');

    export default {
        data() {
            return {
                showLoading: 'hide',
                listCurrent: 0,
                pageSize: 10,
                lists: [],
                month: ''
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "我的赏金"},
        },
        created() {
            var _this = this;
            GET('weex/member/reward/list.jhtml?pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize, function (data) {
                if (data.type == 'success') {
                    _this.lists = data.data.data
                }
            }, function (err) {
                event.toast(err.content)
            })

        },
        methods: {
            onloading(e) {
                var _this = this;
                this.showLoading = 'show'
                setTimeout(() => {
                    this.listCurrent = this.listCurrent + this.pageSize;
                    GET('weex/member/reward/list.jhtml?pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize, function (data) {
                        if (data.type == 'success') {
                            if (utils.isNull(data.data.data)) {
                                event.toast('已经到底了');
                            } else {
                                data.data.data.forEach(function (item) {
                                   _this.lists.push(item);
                                })
                            }
                        }
                    }, function (err) {
                        event.toast(err.content)
                    })
                    this.showLoading = 'hide'
                }, 1500)
            },

            goback: function () {
                event.closeURL()
            },
        }
    }
</script>
