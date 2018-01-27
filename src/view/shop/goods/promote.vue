<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" > </navbar>
        <div class="info">
            <text class="fz32 color999">开通分成推广,让推广者帮你推广商品,获得更多订单。</text>
            <text class="fz32 color999">推广者包含个人以及芸店合作渠道。</text>
            <text class="fz32 color999">你只需为因推广者而成功售出的商品付出佣金,交易不成功无需支付任何费用。</text>
            <text class="fz32 colorRed mt30 bt30" @click="pickObject()">分成对象:  {{isobject}}</text>
            <text class="fz32 color999">提示:设置完成后,请添加分销政策来设置佣金比例，系统支持返现金与积分方式。</text>
            <text class="fz32 color999">通过本平台产生的店铺积分，1分=1元可在店铺内当现金消费。</text>
        </div>
        <div class="completeButton">
            <text class="fz40" style="color:white">完成</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .info{
        flex-direction: column;
        justify-content: center;
        margin: 20px;
        padding: 30px;
        border-color:#eeeeee;
        border-width: 1px;
        border-radius: 10px;
        background-color: white;
    }
    .completeButton{
        height: 80px;
        align-items: center;
        justify-content: center;
        background-color:#EB4E40;
        border-radius: 15px;
        margin: 20px;
    }
    .color999{
        color:#999
    }
    .colorRed{
        color:#EB4E40
    }
</style>
<script>
    import {dom,event,stream,storage} from '../../../weex.js'
    import utils from '../../../assets/utils.js'
    import { POST, GET } from '../../../assets/fetch'
    import navbar from '../../../include/navbar.vue'
    const picker = weex.requireModule('picker');
    const modal = weex.requireModule('modal');
    export default {
        data: function () {
            return {
                isobject:'点击设置',
                begin:0
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "分成推广"},
        },
        created() {
            utils.initIconFont();

        },
        methods: {
            goback(){
                event.closeURL();
            },
//            设置对象
            pickObject:function () {
                let _this = this
                picker.pick({
                    index:_this.begin,
                    items:['任何人','普通会员(VIP1)','金卡会员(VIP2)','钻石会员(VIP3)']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.isobject = '任何人';
                            _this.begin = e.data
                        }else if(e.data == 1){
                            _this.isobject = '普通会员(VIP1)';
                            _this.begin = e.data
                        }else if(e.data == 2){
                            _this.isobject = '金卡会员(VIP2)';
                            _this.begin = e.data
                        }else{
                            _this.isobject = '钻石会员(VIP3)';
                            _this.begin = e.data
                        }
                    }
                })
            },
        }
    }
</script>