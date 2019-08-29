<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" > </navbar>
        <list show-scrollbar="false">
            <cell>
                <div class="headerCell" @click="pickType()">
                    <text class="fz32 primary">考核指标:  {{promoterType | watchType}}</text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
                <div class="info" v-if="promoterType != 'any'">
                    <div class="setting" @click="pickPattern()">
                        <div class="flex-row">
                            <text class="fz32 primary">升级VIP条件:  {{vipPattern | watchVipType}}</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                    <text class="fz32 color999 mt20">开通分成推广,让推广者帮你推广商品,获得更多订单。</text>
                    <div class="setting" v-if="isVipMoney()">
                        <div class="flex-row">
                            <text class="fz32 primary">{{promoterType == 'quantity' ? '指定数量':'指定金额(元)'}} :  </text>
                            <input class="input" :placeholder="promoterType == 'quantity' ? '请输入数量':'请输入金额'" type="number" v-model="amount"/>
                        </div>
                    </div>
                </div>
                <div class="info" v-if="promoterType != 'any'">
                    <div class="setting" @click="pickAgent()">
                        <div class="flex-row">
                            <text class="fz32 primary">成为代理商条件:  {{agentPattern | watchAgentType}}</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                    <text class="fz32 color999 mt20">开通分成推广,让推广者帮你推广商品,获得更多订单。</text>
                    <div class="setting" v-if="isAgentMoney()">
                        <div class="flex-row">
                            <text class="fz32 primary">{{promoterType == 'quantity' ? '指定数量':'指定金额(元)'}} :  </text>
                            <input class="input" :placeholder="promoterType == 'quantity' ? '请输入数量':'请输入金额'" type="number" v-model="agentAmount"/>
                        </div>
                    </div>
                </div>
                <div class="completeButton bkg-primary button-bkg-img" @click="complete()">
                    <text class="fz40" style="color:white">完成</text>
                </div>
                <div class="warning">
                    <text class="fz32 color999">提示:设置完成后,请添加分销政策来设置佣金比例，系统支持返现金与积分方式。</text>
                    <text class="fz32 color999">通过本平台产生的店铺积分，1分=1元可在店铺内当现金消费。</text>
                </div>
                <div style="height: 500px" v-if="promoterType != 'any'"></div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .headerCell{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        padding: 30px;
        border-color:#eeeeee;
        border-width: 1px;
        border-radius: 10px;
        background-color: white;
    }
    .info{
        flex-direction: column;
        justify-content: center;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        padding-top: 10px;
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 30px;
        border-color:#eeeeee;
        border-width: 1px;
        border-radius: 10px;
        background-color: white;
    }
    .completeButton{
        height: 80px;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        margin-top: 40px;
        margin-right: 20px;
        margin-left: 20px;
        margin-bottom: 20px;
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
        color:#5eb0fd;
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
                begin:0,
                beginPattern:0,
                beginType:0,
                beginAgent:0,
                promoterType:'',
                vipPattern:'',
                agentPattern:'',
                amount:'',
                agentAmount:''
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "分润设置"},
        },
        filters:{
          watchType(e){
              if(e == 'any'){
                  return '不启用'
              }else if(e == 'quantity'){
                  return '按购买数量考核'
              }else if(e == 'amount'){
                  return '按购买金额考核'
              }
          },
            watchVipType(e){
                if(e== 'pattern1'){
                   return '无门槛'
                } else if(e == 'pattern2'){
                    return '购买任意商品'
                } else if(e == 'pattern3'){
                    return '购买分销商品'
                }else if(e == 'pattern4'){
                    return '单笔消费满'
                }else if(e == 'pattern5'){
                    return '累计消费满'
                }
            },
            watchAgentType(e){
                if(e== 'pattern1'){
                    return '不启用'
                } else if(e == 'pattern2'){
                    return '购买任意商品'
                } else if(e == 'pattern3'){
                    return '购买分销商品'
                }else if(e == 'pattern4'){
                    return '单笔消费满'
                }else if(e == 'pattern5'){
                    return '累计消费满'
                }
            },
        },
        created() {
            utils.initIconFont();
            this.getTopic()
        },
        methods: {
            goback(){
                event.closeURL();
            },
//            控制vip指定金额是否渲染
            isVipMoney:function () {
              if(this.vipPattern == 'pattern4' || this.vipPattern == 'pattern5'){
                  return true
              }else{
                  return false
              }
            },
            //            控制代理商指定金额是否渲染
            isAgentMoney:function () {
                if(this.agentPattern == 'pattern4' || this.agentPattern == 'pattern5'){
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
                        _this.promoterType = res.data.promoterType;
                        _this.amount = res.data.amount;
                        _this.agentAmount = res.data.agentAmount;
                        if(res.data.promoterType == 'any'){
                            _this.beginType = 0;
                        } else if(res.data.promoterType == 'quantity'){
                            _this.beginType = 1;
                        } else if(res.data.promoterType == 'amount'){
                            _this.beginType = 2
                        }
                        if(res.data.pattern == 'pattern1'){
                            _this.vipPattern = res.data.pattern;
                            _this.beginPattern = 0
                        } else if(res.data.pattern == 'pattern2'){
                            _this.vipPattern = res.data.pattern;
                            _this.beginPattern = 1
                        } else if(res.data.pattern == 'pattern3'){
                            _this.vipPattern = res.data.pattern;
                            _this.beginPattern = 2
                        }else if(res.data.pattern == 'pattern4'){
                            _this.vipPattern = res.data.pattern;
                            _this.beginPattern = 3
                        }else if(res.data.pattern == 'pattern5'){
                            _this.vipPattern = res.data.pattern;
                            _this.beginPattern = 4
                        }
                        if(res.data.agentPattern == 'pattern1'){
                            _this.agentPattern = res.data.agentPattern;
                            _this.beginAgent = 0
                        } else if(res.data.agentPattern == 'pattern2'){
                            _this.agentPattern = res.data.agentPattern;
                            _this.beginAgent = 1
                        } else if(res.data.agentPattern == 'pattern3'){
                            _this.agentPattern = res.data.agentPattern;
                            _this.beginAgent = 2
                        }else if(res.data.agentPattern == 'pattern4'){
                            _this.agentPattern = res.data.agentPattern;
                            _this.beginAgent = 3
                        }else if(res.data.agentPattern == 'pattern5'){
                            _this.agentPattern = res.data.agentPattern;
                            _this.beginAgent = 4
                        }
                    } else {
                        event.toast(res.content);
                    }
                })
            },
//            选择考核类型
            pickType(){
                let _this = this
                picker.pick({
                    index:_this.beginType,
                    items:['不启用','按购买数量考核','按购买金额考核']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.promoterType = 'any';
                            _this.beginType = e.data;
                        }else if(e.data == 1){
                            _this.promoterType = 'quantity';
                            _this.beginType = e.data;
                        }else if(e.data == 2){
                            _this.promoterType = 'amount';
                            _this.beginType = e.data;
                        }
                    }
                })
            },
            // 设置vip门槛
            pickPattern:function () {
                let _this = this
                picker.pick({
                    index:_this.beginPattern,
                    items:['无门槛','购买任意商品','购买分销商品','单笔消费满','累计消费满']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.beginPattern = e.data;
                            _this.vipPattern = 'pattern1'
                        }else if(e.data == 1){
                            _this.beginPattern = e.data;
                            _this.vipPattern = 'pattern2'
                        }else if(e.data == 2){
                            _this.beginPattern = e.data;
                            _this.vipPattern = 'pattern3'
                        }else if(e.data == 3){
                            _this.beginPattern = e.data;
                            _this.vipPattern = 'pattern4'
                        }else if(e.data == 4){
                            _this.beginPattern = e.data;
                            _this.vipPattern = 'pattern5'
                        }
                    }
                })
            },
            // 设置代理商门槛
            pickAgent:function () {
                let _this = this
                picker.pick({
                    index:_this.beginAgent,
                    items:['不启用','购买任意商品','购买分销商品','单笔消费满','累计消费满']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.beginAgent = e.data;
                            _this.agentPattern = 'pattern1'
                        }else if(e.data == 1){
                            _this.beginAgent = e.data;
                            _this.agentPattern = 'pattern2'
                        }else if(e.data == 2){
                            _this.beginAgent = e.data;
                            _this.agentPattern = 'pattern3'
                        }else if(e.data == 3){
                            _this.beginAgent = e.data;
                            _this.agentPattern = 'pattern4'
                        }else if(e.data == 4){
                            _this.beginAgent = e.data;
                            _this.agentPattern = 'pattern5'
                        }
                    }
                })
            },
//            完成
            complete:function () {
                POST('weex/member/topic/update.jhtml?promoterType='+this.promoterType+'&pattern='+this.vipPattern+'&agentPattern='+this.agentPattern+'&amount='+this.amount
                    +'&agentAmount='+this.agentAmount).then(
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