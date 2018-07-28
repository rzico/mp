<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller" show- show-scrollbar="false">
            <div class="redBagLine mt40 rowLineHeight space-between pl30 pr30" >
                <div class="flex-row" v-if="isRandom">
                    <text class="title  iconColor" :style="{fontFamily:'iconfont'}">&#xe671;</text>
                    <text class="title ml10">总金额</text>
                </div>
                <div class="flex-row" v-else>
                    <text class="title ml10">总金额</text>
                </div>
                <div class="flex-row flex-end" >
                    <input type="number" ref="redPriceRef" autofocus="true"  v-model="priceNum"  placeholder="0.00" class="leaveMes fz30 mr10" />
                    <text class="fz32">元</text>
                </div>
            </div>
            <div class="sub-panel ml30 bt15 ">
                <div class="flex-row" v-if="isRandom">
                    <text class="sub_title fz26">每人抽到的金额随机,</text>
                    <text class="fz26 blueColor" @click="changeBag">改为普通红包</text>
                </div>
                <div class="flex-row" v-else>
                    <text class="sub_title fz26">每人收到固定金额,</text>
                    <text class="fz26 blueColor" @click="changeBag">改为拼手气红包</text>
                </div>
            </div>
            <div class="redBagLine mt40 rowLineHeight  space-between pl30 pr30" >
                <div class="flex-row">
                    <text class="title ml10" :class="[bagNum == 0 && bagNum != '' ? 'redNum' : '']">红包个数</text>
                </div>
                <div class="flex-row flex-end">
                    <input type="number" ref="redNumRef" v-model="bagNum"  maxlength="3"  placeholder="填写个数" class="leaveMes fz30 mr10" :class="[bagNum == 0 && bagNum != '' ? 'redNum' : '']"/>
                    <text class="fz32" :class="[bagNum == 0 && bagNum != '' ? 'redNum' : '']">个</text>
                </div>
            </div>
            <div class="sub-panel ml30">
                <text class="sub_title fz26 bt15">最多可发999个红包</text>
            </div>
            <!--<div class="redBagLine mt40 rowLineHeight  space-between pl30 pr30" >-->
                <!--<div class="flex-row">-->
                    <!--<text class="title ml10">留言</text>-->
                <!--</div>-->
                <!--<div class="flex-row flex-end">-->
                    <!--<input type="text" ref="captchRef" maxlength="15" v-model="bagMessage" placeholder="恭喜发财,大吉大利" class="leaveMes fz30" />-->
                <!--</div>-->
            <!--</div>-->
            <div class="priceBox">
                <text class="fz40 fontWeight" >¥</text>
                <text class="  priceFont" >{{priceNum | watchPrice}}</text>
            </div>
            <div  class="rowLineHeight redBagLine flex-center bkg-primary" :class="[isDone ? '' : 'smallBlue']" @click="goDone()">
                <text class="fz32 white" :class="[isDone ? '' : 'smallGray']" >塞钱进红包</text>
            </div>
        </scroller>

        <payment ref="payment" :receiveSn="receiveSn" @notify="notify"  v-if="paymentShow" @paymentClose="paymentClose"></payment>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>

<style scoped>
    .redNum{
        color: red;
    }
    .smallGray{
        color: #EDEDED;
    }
    .smallBlue{
        background-color: #C6E2FF;
    }
    .blueColor{
        color: #0088fb;
    }
    .iconColor{
        color: #FF9011;
    }
    .rowLineHeight{
        height: 90px;
        background-color: white;
        min-height: 90px;
    }
    .fontWeight{
        font-weight: 900;
    }
    .priceFont{
        font-size: 60px;
        line-height: 55px;
        font-weight: 500;
        margin-left: 10px;
    }
    .priceBox{
        width:750px;
        margin-top:50px;
        margin-bottom:50px;
        display: flex;
        flex-direction: row;
        /*align-items: center;*/
        justify-content: center;
    }
    .borderRadius{
        border-radius: 5px;
    }
    .redBagLine{
        width: 700px;
        margin-left: 25px;
        border-top-width: 0px;
        border-bottom-width: 0px;
        border-radius: 5px;
    }
    .leaveMes{
        width:400px;
        height:100px;
        text-align: right;
    }
    .posiAbsolute{
        position: absolute;
    }
    .sub-panel {
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .button-panel {
        padding-left: 60px;
        padding-right: 60px;
    }
    .switch {
        margin-right: 20px;
    }
</style>
<script>
    import {dom,event,stream,storage} from '../../../weex.js';
    import { POST, GET } from '../../../assets/fetch';
    import utils from '../../../assets/utils';
    import navbar from '../../../include/navbar.vue';
    import payment from '../../../include/payment.vue';
    const modal = weex.requireModule('modal');
    export default {
        data(){
            return{
                priceNum:'',
                isRandom:true,
                bagMessage:'',
                bagNum:'',
                clicked:false,
                articleId:'',
                redBagData:'',
                receiveSn:'',
                paymentShow:false,
            }
        },
        created(){
            var _this = this;
            this.articleId = utils.getUrlParameter('articleId');
            this.redBagData = JSON.parse(decodeURIComponent(utils.getUrlParameter('redBagData')));
            if(!utils.isNull(this.redBagData.remainSize)){
                this.bagNum = this.redBagData.remainSize;
            }
            if(!utils.isNull(this.redBagData.remainMoney)) {
                this.priceNum = this.redBagData.remainMoney;
            }
            if(!utils.isNull(this.redBagData.redPackageType)) {
                if(this.redBagData.remainMoney == 'AVE'){
                    this.isRandom = false;
                }else{
                    this.isRandom = true;
                }
            }
        },
        components: {
            navbar,payment
        },
        filters:{
            watchPrice(value){
                if(utils.isNull(value)){
                    return '0.00';
                }else{
                    return (Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2);
                }
            }
        },
        computed:{
          isDone:function () {
              return !utils.isNull(this.priceNum) && this.priceNum != 0 && !utils.isNull(this.bagNum) && this.bagNum != 0;
          }
        },
        props: {
            title: { default: "发红包" }
        },
        methods: {
            changeBag:function () {
              this.isRandom = !this.isRandom;
            },
            goback: function (e) {
                event.closeURL();
//                event.closeRouter();
            },
//            点击完成，进行发布
            goDone:function () {
                if (this.clicked || !this.isDone) {
                    return;
                }

                if(this.priceNum/this.bagNum < 0.01){
                    event.toast('单个红包金额不可低于0.01元');
                    return;
                }



                this.clicked = true;
                var _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500);
//                将input失去焦点
                _this.$refs.redPriceRef.blur();
                _this.$refs.redNumRef.blur();
                let redBagtype = this.isRandom ? 'RAN' : 'AVE';
                let urlData = 'weex/member/article/setRedPackage.jhtml?articleId=' + this.articleId + '&redPackageType=' + redBagtype + '&remainSize=' + this.bagNum + '&remainMoney='
                    + this.priceNum + '&isRedPackage=true';
                POST(urlData).then(function (data) {
                    if(data.type == 'success'){
                        if (utils.isNull(data.data)) {
                        } else {
                            _this.receiveSn = data.data;
                            _this.paymentShow = true;
                        }
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
//            隐藏支付组件
            paymentClose:function (e) {
                if(e == 'redBagNoclose'){
                    return;
                }
                this.paymentShow = false;
            },

            //支付完成通成
            notify:function (e) {
                if (e.type == "success") {
                    event.toast('红包设置成功');
                    event.closeURL(e)
                }
            },
        }
    }
</script>a
