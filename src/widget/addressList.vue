<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" ></navbar>
        <list>
            <cell   v-for="(item,index) in receiverList" v-if="hasReceiver()" @click="goAddress()">
                <div class="address">
                    <div>
                        <text class="fontSize18 pb10">{{item.consignee}} {{item.phone}}</text>
                        <text class="fontSize18 fz28 pt10 grayColor">{{item.areaName}}{{item.address}}</text>
                    </div>
                    <text class="arrow"  :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </cell>
            <cell v-if="receiverList.length == 0">
                <noData :noDataHint="noDataHint" ndBgColor="#fff"></noData>
            </cell>
        </list>
    </div>
</template>
<style scoped>

    .address{
        position: relative;
        border-style: solid;
        border-color: #eee;
        border-top-width: 1px;
        border-bottom-width: 1px;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .pb10{
        padding-bottom: 10px;
    }
    .pt10{
        padding-top: 10px;
    }
    .arrow{
        font-size: 26px;
        color: #999;
        width: 40px;
    }
    .fontSize18{
        font-size: 30px;
        line-height: 35px;
    }
    .grayColor{
        color:#999;
    }
</style>
<script>

    import navbar from '../include/navbar.vue';
    import {dom,event} from '../weex.js'
    import { POST, GET } from '../assets/fetch.js';
    import utils from '../assets/utils';
    import filters from '../filters/filters.js';
    import noData from '../include/noData.vue';
    export default {
        components: {
            noData,
            navbar,
        },
        data: function () {
            return {
                pageStart:0,
                pageSize:10,
                allLoaded:false,
                receiverList:[],
                isShow:false,
                refReady:false,
                noDataHint:'暂无收货地址'
            }
        },
        props:{
            title:{default:'我的地址'}
        },
        filters:{
            watchPrice:function (value) {
                return utils.currencyfmt(value);
            }
        },
        created(){
        },
        mounted(){
            this.open();
        },
        methods: {
            show:function () {
                let _this =  this;
                this.isShow = true;
                setTimeout(function () {
                    _this.$refs.chooseAddress.show();
                    _this.open();
                },50)
            },
            selectAddress:function (address) {
                address = JSON.stringify(address);
                this.$emit('selectAddress',address);
                this.close();
            },
            hasReceiver:function () {
                return this.receiverList.length > 0;
            },
//      对话框新增地址
            activateConfirm:function () {
                this.isShow = false;
                this.$emit('addressAdd');
            },
//      对话框取消选择地址 取消按钮
            closeConfirm:function () {
                this.$refs.chooseAddress.close();
            },
            open:function () {
                var _this = this;
                GET('website/member/receiver/list.jhtml',
                    function (res) {
                        if (res.type=="success") {
                            _this.receiverList = res.data;
                        } else {
                            event.toast(res.content)
                        }
                    }, function (err) {
                        event.toast(err.content);
                    })
            },
            close:function () {
                this.isShow = false;
            }

//methods 方法到此为止
        },
    }
</script>

