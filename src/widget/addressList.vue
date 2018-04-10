<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" ></navbar>
        <list>
            <cell   v-for="(item,index) in receiverList" v-if="hasReceiver()" @click="goAddress(item)">
                <div class="address ">
                    <div class="borderBottom borderBox">
                        <div>
                            <text class="fontSize18 " style="font-weight: 600">{{item.areaName}}</text>
                            <text class="fontSize18  fzz29 addressTextBox">{{item.address}}</text>

                            <div class="space-between pt10 bottomBox">
                                <text class="fontSize18 fz28  grayColor">{{item.consignee}} {{item.phone}}</text>

                            </div>
                        </div>
                        <div v-if="addressId == item.id">
                            <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                        </div>
                    </div>
                    <div class="flex-end pr20 ">
                        <text class="fz30 grayColor mr15 pt15 pb15"  :style="{fontFamily:'iconfont'}"  @click="editAddress(item,index)">&#xe61d;编辑</text>
                        <text class="fz30 grayColor pt15 pb15"  :style="{fontFamily:'iconfont'}" @click="delAddress(item.id,index)">&#xe652;删除</text>
                    </div>
                </div>
            </cell>
            <cell v-if="receiverList.length == 0">
                <noData :noDataHint="noDataHint" ></noData>
            </cell>
        </list>
        <div class="button bw bkg-primary" @click="addAddress()">
            <text class="buttonText ">新增地址</text>
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>
    .fzz29{
        font-size: 29px;
    }
    .addressTextBox{
        width: 680px;
    }
    .bottomBox{
        width:680px;
    }
    .bw{
        margin-top:20px;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 20px;
    }
    .buttonText{
        font-size: 32px;
        color:#ffffff;
    }
    .borderBox{
        width:730px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding-top: 20px;
        padding-bottom: 20px;margin-left:20px;
        padding-right: 0px;
    }
    .address{
        margin-bottom: 10px;
        width:750px;
        background-color:#fff;
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
        font-size: 33px;
        line-height: 40px;
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
                noDataHint:'暂无收货地址',
                addressId:''
            }
        },
        props:{
            title:{default:'我的地址'},
        },
        filters:{
            watchPrice:function (value) {
                return utils.currencyfmt(value);
            }
        },
        created(){

            if(!utils.isNull(utils.getUrlParameter('id'))){
                this.addressId = utils.getUrlParameter('id');
            }
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
            },
            goAddress:function(item){
                let _this = this;
                if(utils.getUrlParameter('from') == 'buyGoods'){
                    _this.addressId = item.id;
                    event.closeURL(utils.message('success','',item));
                    return;
                }else{
                    event.openURL(utils.locate('widget/addressEdit.js?id=' + item.id + '&c=' + item),function (data) {

                    })
                }

            },
            addAddress:function(){
//                receiverList
                let _this = this;
                event.openURL(utils.locate('widget/addressEdit.js'),function (data) {
                    if(data.type == 'success' && data.data != ''){
                        if(data.data.default){
                            _this.addressId = data.data.id;
                        }
                        _this.receiverList.push(data.data);
                    }
                })
            },
//          删除地址
            delAddress:function (id,index) {
//                if(id == this.addressId){
//                    event.toast('请您先选择其他地址后再删除');
//                    return;
//                }
                let _this = this
                POST('website/member/receiver/delete.jhtml?id='+id).then(
                    function (mes) {
                        if (mes.type=="success") {
                            event.toast('删除成功');
//                            _this.open();
                            _this.receiverList.splice(index,1);
                        } else {
                            event.toast(mes.content);
                        }

                    }, function (err) {
                        event.toast(err.content);
                    })
            },
            editAddress:function (item,index) {
                let _this = this;
                event.openURL(utils.locate('widget/addressEdit.js?id=' + item.id + '&addressData=' + encodeURIComponent(JSON.stringify(item))),function (data) {
                    if(data.type == 'success' && data.data != ''){
//                        _this.receiverList.
                        _this.open();
                    }
                })
            },
            goback:function () {
                event.closeURL();
            }

//methods 方法到此为止
        },
    }
</script>

