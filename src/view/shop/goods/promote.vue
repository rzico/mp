<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" > </navbar>
        <div class="info">
            <text class="fz32 color999">开通分成推广,让推广者帮你推广商品,获得更多订单。</text>
            <text class="fz32 color999">推广者包含个人以及芸店合作渠道。</text>
            <text class="fz32 color999">你只需为因推广者而成功售出的商品付出佣金,交易不成功无需支付任何费用。</text>
            <div class="setting" @click="pickPattern()">
                <div class="flex-row">
                    <text class="fz32 colorRed">分润模式:  {{isPattern}}</text>
                </div>
                <div class="flex-row flex-end">
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
            <div class="setting" v-if="isMoney()">
                <div class="flex-row">
                    <text class="fz32 colorRed">指定金额:  </text>
                    <input class="input"   placeholder="请输入金额" type="number" v-model="amount"/>
                </div>
            </div>
            <div class="setting" @click="pickObject()">
                <div class="flex-row">
                    <text class="fz32 colorRed">分润对象:  {{isobject}}</text>
                </div>
                <div class="flex-row flex-end">
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
        </div>
        <div class="completeButton" @click="complete()">
            <text class="fz40" style="color:white">完成</text>
        </div>
        <div class="warning">
            <text class="fz32 color999">提示:设置完成后,请添加分销政策来设置佣金比例，系统支持返现金与积分方式。</text>
            <text class="fz32 color999">通过本平台产生的店铺积分，1分=1元可在店铺内当现金消费。</text>
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
    .warning{
        padding: 30px;
    }
    .setting{
        margin-top: 20px;
        border-color:#eeeeee;
        height: 80px;
        border-top-width: 1px;
        border-bottom-width: 1px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .color999{
        color:#999
    }
    .colorRed{
        color:#EB4E40
    }
    .input{
        font-size: 32px;
        color:#EB4E40;
        width: 450px;
        height: 80px;
        margin-top: 5px;
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
                isobject:'任何用户',
                begin:0,
                beginPattern:0,
                PromoterType:'',
                Pattern:'',
                isPattern:'无门槛',
                amount:''
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "分润设置"},
        },
        created() {
            utils.initIconFont();
            this.getTopic()
        },
        methods: {
            goback(){
                event.closeURL();
            },
//            控制指定金额是否渲染
            isMoney:function () {
              if(this.isPattern == '单次消费满指定金额' || this.isPattern == '累计消费满指定金额'){
                  return true
              }else{
                  return false
              }
            },
//            获取专栏信息
            getTopic:function () {
                let _this = this
                GET("weex/member/topic/option.jhtml",function (res) {
                    if (res.type=='success') {
                        if(res.data.promoterType == 'any'){
                            _this.isobject = '任何用户';
                            _this.begin = 0;
                            _this.isPattern = '无门槛'
                        }if(res.data.promoterType == 'team'){
                            _this.isobject = '团队成员';
                            _this.begin = 1;
                            _this.isPattern = '无门槛'
                        }if(res.data.promoterType == 'partenr'){
                            _this.isobject = '分红股东';
                            _this.begin = 2
                        }if(res.data.pattern == 'pattern1'){
                            _this.isPattern = '无门槛';
                            _this.beginPattern = 0
                        }if(res.data.pattern == 'pattern2'){
                            _this.isPattern = '购买任意商品';
                            _this.beginPattern = 1
                        }if(res.data.pattern == 'pattern3'){
                            _this.isPattern = '购买分销商品';
                            _this.beginPattern = 2
                        }if(res.data.pattern == 'pattern4'){
                            _this.isPattern = '单次消费满指定金额';
                            _this.beginPattern = 3
                        }if(res.data.pattern == 'pattern5'){
                            _this.isPattern = '累计消费满指定金额';
                            _this.beginPattern = 4
                        }
                        _this.amount =res.data.amount
                    } else {
                        event.toast(res.content);
                    }
                })
            },
            //            设置门槛
            pickPattern:function () {
                let _this = this
                picker.pick({
                    index:_this.beginPattern,
                    items:['无门槛','购买任意商品','购买分销商品','单次消费满指定金额','累计消费满指定金额']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.isPattern = '无门槛';
                            _this.beginPattern = e.data;
                            _this.Pattern = 'pattern1'
                        }else if(e.data == 1){
                            _this.isPattern = '购买任意商品';
                            _this.beginPattern = e.data;
                            _this.Pattern = 'pattern2'
                        }else if(e.data == 2){
                            _this.isPattern = '购买分销商品';
                            _this.beginPattern = e.data;
                            _this.Pattern = 'pattern3'
                        }else if(e.data == 3){
                            _this.isPattern = '单次消费满指定金额';
                            _this.beginPattern = e.data;
                            _this.Pattern = 'pattern4'
                        }else if(e.data == 4){
                            _this.isPattern = '累计消费满指定金额';
                            _this.beginPattern = e.data;
                            _this.Pattern = 'pattern5'
                        }
                    }
                })
            },
//            设置对象
            pickObject:function () {
                let _this = this
                picker.pick({
                    index:_this.begin,
                    items:['任何用户','团队成员','分红股东']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.isobject = '任何用户';
                            _this.begin = e.data;
                            _this.PromoterType = 'any'
                        }else if(e.data == 1){
                            _this.isobject = '团队成员';
                            _this.begin = e.data;
                            _this.PromoterType = 'team'
                        }else if(e.data == 2){
                            _this.isobject = '分红股东';
                            _this.begin = e.data;
                            _this.PromoterType = 'partenr'
                        }
                    }
                })
            },
//            完成
            complete:function () {
                POST('weex/member/topic/update.jhtml?promoterType='+this.PromoterType+'&pattern='+this.Pattern+'&amount='+this.amount).then(
                    function (data) {
                        if(data.type == 'success'){
                            event.toast('设置成功');
                            event.closeURL();
                        }else{
                            event.toast(data.content);
                        }
                    },
                    function (err) {
                        event.toast(err.content);
                    })
            }
        }
    }
</script>