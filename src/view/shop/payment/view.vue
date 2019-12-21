<template>
    <div class="wrapper bkg-primary">
        <navbar :title="title" @goback="goback"></navbar>
        <div class="codeBox">
            <text class="nickName" >{{attribute.typeName=='收款'?'':attribute.nickName}}</text>
            <div class="amountBox">
                <text class="amountIco">¥</text>
                <text class="amount">{{attribute.amount}}</text>
            </div>
            <div class="contentBox">
                <div class="contentCell">
                    <text class="cellTitle">当前状态</text>
                    <text class="cellSubTitle">{{attribute.status | filterStatus}}</text>
                </div>
                <div class="contentCell">
                    <text class="cellTitle">交易时间</text>
                    <text class="cellSubTitle">{{attribute.createDate | ymdhistimefmt}}</text>
                </div>
                <div class="contentCell">
                    <text class="cellTitle">收款单号</text>
                    <text class="cellSubTitle">{{attribute.sn}}</text>
                </div>
                <div class="contentCell">
                    <text class="cellTitle">收款摘要</text>
                    <text class="cellSubTitle">{{attribute.memo}}</text>
                </div>
                <div class="contentCell" v-if="attribute.shopName!=null && attribute.shopName!=''">
                    <text class="cellTitle">收款店铺</text>
                    <text class="cellSubTitle">{{attribute.shopName}}</text>
                </div>
                <div class="contentCell" v-if="attribute.adminName!=null && attribute.adminName!=''">
                    <text class="cellTitle">收款人员</text>
                    <text class="cellSubTitle">{{attribute.adminName}}</text>
                </div>
                <div class="contentCell" v-if="attribute.paymentPluginId!=null && attribute.paymentPluginId!=''">
                    <text class="cellTitle">付款方式</text>
                    <text class="cellSubTitle">{{attribute.paymentPluginId}}</text>
                </div>
                <div class="contentCell">
                    <text class="cellTitle">付款类型</text>
                    <text class="cellSubTitle">{{attribute.typeName}}</text>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .codeBox {
        width: 690px;
        padding-bottom: 100px;
        border-radius: 10px;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 30px;
        margin-top: 30px;
    }
    .nickName{
        font-size: 32px;
        color: #666;
        margin-top: 70px;
    }
    .amountBox{
        flex-direction: row;
        align-items: flex-start;
        margin-top: 40px;
    }
    .amountIco{
        font-size: 45px;
        font-weight: 600;
        margin-top: 8px;
        margin-right: 8px;
    }
    .amount{
        font-size: 60px;
        font-weight: 600;
    }
    .contentBox{
        width: 610px;
        border-top-width: 1px;
        border-top-color: #eeeeee;
        margin-top: 40px;
        padding-top: 20px;
    }
    .contentCell{
        flex-direction: row;
        align-items: center;
        margin-top: 20px;
    }
    .cellTitle{
        font-size: 28px;
        color: #666;
    }
    .cellSubTitle{
        font-size: 28px;
        margin-left: 80px;
    }
</style>
<script>
    import {POST, GET} from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    const modal = weex.requireModule('modal');
    const event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue'
    export default {
        data() {
            return {
                clicked:false,
                id:'',
                attribute:{}
            }
        },
        props: {
            title: {default: "收款详情"}
        },
        filters:{
            filterStatus(val){
                if(val == 'waiting'){
                    return'等待支付'
                }else if(val == 'success'){
                    return'支付成功'
                }else if(val == 'failure'){
                    return'支付失败'
                }else if(val == 'refund_waiting'){
                    return'等待退款'
                }else if(val == 'refund_success'){
                    return'退款完成'
                }else if(val == 'refund_failure'){
                    return'退款失败'
                }
            },
            ymdhistimefmt(val){
                return utils.ymdhistimefmt(val)
            }
        },
        components: {
            navbar,
        },
        created() {
            let _this = this;
            utils.initIconFont()
            this.id = utils.getUrlParameter('id');
            this.open()
        },
        beforeDestory() {

        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            open(){
                let _this = this;
                GET("weex/member/payment/view.jhtml?id="+this.id,function (mes) {
                    if (mes.type == "success") {
                        _this.attribute = mes.data;
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                });
            },

        }
    }
</script>
