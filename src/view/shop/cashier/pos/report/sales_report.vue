<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" ></navbar>
        <div class="content">
            <div class="cell">
                <text class="cellTitle">销售统计查询</text>
                <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
            <div class="cell">
                <text class="cellTitle">销售统计查询</text>
                <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    .content{
        flex-direction: column;
        padding-left: 20px;
        padding-right: 20px;
    }
    .cell{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 710px;
        padding-left: 20px;
        padding-right: 20px;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
    }
    .cellTitle{
        font-size: 32px;
    }
    .cellIcon{
        font-size: 32px;
        color: #999999;
    }
</style>
<script>
    import navbar from '../../include/navbar.vue';
    import { POST, GET } from '../../assets/fetch';
    var event = weex.requireModule('event');
    import utils from '../../assets/utils';
    export default {
        components: {
            navbar
        },
        data() {
            return {

            }
        },
        props: {
            title:{default:'报表查询'}
        },
        created() {
            utils.initIconFont();
        },
        methods:{

        }
    }
</script>