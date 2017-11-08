<template>
    <div style="background-color: #eeeeee">
        <div class="header">
            <navbar :title="title" :complete="complete" @goback="goback"> </navbar>
        </div>

    <scroller class="scroller">
        <div class="cumulative">
            <text class="cumulativeMoney">累计： 元</text>
        </div>
        <div class="month">
            <text class="monthText">11月</text>
        </div>
        <div class="cell " v-for="num in lists">
            <div class="panel">
                <div class="monthFont">
                    <text class="textMonth">十月11号</text>
                    <text class="font" :style="{fontFamily:'iconfont'}" >&#xe6ce;</text>
                </div>
                <div class="moneyname">
                    <text class="money">+100元</text>
                    <text class="name">来自凉快的打赏</text>
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
    .cumulative{
        width:auto;
        height: 120px;
        border-width: 1px;
        border-style: solid;
        border-color: #ccc;
        justify-content: center;
        /*flex-direction: row;*/
        background-color: white;
        margin-top: 20px;
    }
    .cumulativeMoney{
        font-size: 32px;
        margin-left: 20px;
    }
    .month{
        height: 60px;
        justify-content: center;
    }
    .monthText{
        font-size: 32px;
        margin-left: 20px;
    }
    .panel {
        width:auto;
        height:120px;
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
        color:#cccccc;
    }
    .monthFont{
        flex-direction: row;
        align-items: center;
    }
    .font{
        margin-left: 50px;
        font-size: 70px;
        color:#D9141E;
    }
    .moneyname{
        margin-left: 50px;
    }
    .money{
        font-size: 32px;
        font-weight: bold;
    }
    .name{
        font-size: 28px;
        color:#ccc;
    }
    .loading {
        justify-content: center;
    }
</style>
<script>
    import navbar from '../../../include/navbar.vue';
    var event = weex.requireModule('event');
    const modal = weex.requireModule('modal')
    const LOADMORE_COUNT = 10
    export default {
        data () {
            return {
                showLoading: 'hide',
                lists: [1, 2, 3, 4, 5,6,7,8,9]
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "我的赏金" },
        },
        methods: {
            onloading (event) {
                modal.toast({ message: 'loading', duration: 1 })
                this.showLoading = 'show'
                setTimeout(() => {
                    const length = this.lists.length
                    for (let i = length; i < length + LOADMORE_COUNT; ++i) {
                        this.lists.push(i + 1)
                    }
                    this.showLoading = 'hide'
                }, 1500)
            },

            goback: function () {
                event.closeURL()
            },
        }
    }
</script>
