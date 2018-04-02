<template>
    <div class="wrapper" style="z-index: 3000000001">
        <div class="addressBox" v-if="hasReceiver()">
            <div class="content" v-for="(c,index) in receiverList" :class="index != 0 ? 'mt10' : ''"  @click="selectAddress(c)">
                <div class="topDiv">
                    <div class="information">
                        <text class="name">{{c.consignee}}</text><text class="tel">{{c.phone}}</text>
                    </div>
                    <div class="address">
                        <text class="coarse">{{c.areaName}}</text>
                        <text class="fine">{{c.address}}</text>
                    </div>
                </div>
                <text class="rightArrow"></text>
            </div>
        </div>
        <div class="noData" v-else>
            <text class="iconfont icon-weizhi"></text>
            <span>暂无收货地址.</span>
        </div>
    </div>
</template>
<style scoped>
    .addressBox{
        height: 280px;
        overflow: scroll;
    }
    .rightArrow{
        content: " ";
        display: inline-block;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        height: 8px;
        width: 8px;
        border-width: 2px 2px 0 0;
        border-color: #C8C8CD;
        border-style: solid;
        position: absolute;
        top: 49% ;
        right: 10px;
    }

    .noData {
        height: 100%;
        text-align: center;
        flex-direction: column;
        justify-content: center;
        min-height: 100px;
        padding-top: 10px;
    }
    .noData i {
        color:#ccc;
        font-size: 32px;
        display:block;
    }
    .noData span {
        color:#ccc;
        font-size: 16px;
        display:block;
    }
    .mt10{
        margin-top: 10px;
    }
    .content{
        position: relative;
        background-color: #ffffff;
        padding: 10px;
        padding-right: 18px;
    }
    .content .topDiv{
    }
    .content .topDiv .information{
        min-height: 30px;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        align-items: center;
        color: #444;
    }
    .content .topDiv .information .name{
        font-size: 14px;
    }
    .content .topDiv .information .tel{
        font-size: 14px;
        margin-left: 10px;
    }
    .content .topDiv .address{
        min-height: 30px;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        align-items: center;
        color: #000;
    }
    .content .topDiv .address .coarse{
        font-size: 14px;
        line-height: 15px;
        /*font-weight:500;*/
    }
    .content .topDiv .address .fine{
        font-size: 14px;
        margin-left: 10px;
        line-height: 15px;
        /*font-weight:500;*/
    }
</style>
<script>

    import { POST, GET } from '../assets/fetch.js';
    import utils from '../assets/utils';
    export default {
        components: {
        },
        data: function () {
            return {
                pageStart:0,
                pageSize:10,
                allLoaded:false,
                receiverList:[],
                isShow:false,
                refReady:false,
            }
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
                GET('website/member/receiver/list.jhtml').then(
                    function (res) {
                        if (res.type=="success") {
                            _this.receiverList = res.data;
                        } else {
                            _this.$emit('toastShow',res.content);
                        }
                    }, function (err) {
                        _this.$emit('toastShow',err.content);
                    })
            },
            close:function () {
                this.isShow = false;
            }

//methods 方法到此为止
        },
    }
</script>

