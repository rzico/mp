<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" :border="false"> </navbar>
        <div class="corpusBox"  >
            <div class="articleClass">
                <text @click="corpusChange(index,item.id)"class="allArticle" v-for="(item,index) in corpusList"  :ref="'corpus'+index"  :class = "[whichCorpus == index && corpusList.length != 0 ? 'corpusActive' : 'noActive']">{{item.name}}</text>
            </div>
        </div>
        <list class="list">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-for="(deposit,index) in depositList" >
                <!--如果月份重复就不渲染该区域-->
                <div class="cell-header cell-line space-between" v-if="isRepeat(index)" @click="print(deposit.shopId)">
                    <div class="flex-row flex-start">
                        <text class="title" >{{deposit.name}}</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">打印</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="panel" >
                        <div class="monthFont">
                            <text class="ico_big mt10" :style="{fontFamily:'iconfont'}">{{deposit.type | typeico}}</text>
                         </div>
                        <div class="moneyname">
                            <div>
                                <text class="textMonth">{{deposit.type | typefmt}}</text>
                                <text class="name">{{deposit.method}}</text>
                            </div>
                            <text class="money" style="margin-right: 20px">{{deposit.amount | currencyfmt}}</text>
                        </div>
                </div>
            </cell>
            <cell v-if="noData()" >
                <noData > </noData>
            </cell>
        </list>
        <div class="panel" >
            <div class="moneyname_total">
                <text class="name" >营业额</text>
                <text class="money" style="color:red">{{total | currencyfmt}}</text>
            </div>
            <div class="moneyname_total">
                <text class="name" >充值送</text>
                <text class="money" style="color:red">{{present | currencyfmt}}</text>
            </div>
            <div class="moneyname_total">
                <text class="name" >手续费</text>
                <text class="money" style="color:red">{{fee | currencyfmt}}</text>
            </div>
            <div class="moneyname_total">
                <text class="name" >线上结算</text>
                <text class="money" style="color:red">{{account | currencyfmt}}</text>
            </div>
        </div>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .panel {
        width: auto;
        height: 120px;
        align-items: center;
        flex-direction: row;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: #ccc;
        background-color: #fff;
    }

    .textMonth {
        font-size: 32px;
        color: #444;
    }

    .monthFont {
        flex-direction: column;
        align-items: center;
        flex:1;
    }

    .moneyname_total {
        flex-direction: column;
        flex:6;
        align-items: center;
    }

    .moneyname {
        flex-direction: row;
        flex:6;
        align-items: center;
        justify-content: space-between;
    }

    .money {
        font-size: 32px;
        font-weight: bold;
    }

    .name {
        font-size: 28px;
        color: #999;
    }
    .noActive{
        border-bottom-width:0px;
    }
    .corpusBox{
        flex-direction: row;
        height:80px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
        background-color: #fff;
    }
    .articleClass{
        flex-direction: row;
        padding-left: 10px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
        height:80px;
        background-color: #fff;
        width:750px;
    }
    .allArticle{
        font-size: 29px;
        line-height: 80px;
        padding-left: 20px;
        padding-right: 20px;
        text-align:center;
        flex:1
    }

</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import {dom,event,animation} from '../../../weex.js';
    const modal = weex.requireModule('modal');
    const printer = weex.requireModule('print');
    const he = require('he');
    import navbar from '../../../include/navbar.vue'
    import noData from '../../../include/noData.vue'
    import filters from '../../../filters/filters.js'

    export default {
        data:function(){
            return{
                depositList:[],
                refreshing: false,
                shopId:"",
                billDate:"",
                total:0,
                present:0,
                fee:0,
                account:0,
                refreshImg:utils.locate('resources/images/loading.png'),
                whichCorpus:0,
                corpusList:[{
                    name:'日报',
                    id:'0'
                },{
                    name:'月报',
                    id:'1'
                },{
                    name:'年报',
                    id:'2'
                }],
            }
        },
        components: {
            navbar,noData
        },
        props: {
            title: { default: "消费统计" }
        },
        filters: {
            typefmt:function (val) {
                if (val == 'cashier') {
                    return '消费买单'
                } else if (val == 'cashierRefund') {
                    return '消费退款'
                } else if (val == 'card') {
                    return '会员卡充值'
                } else if (val == 'cardRefund') {
                    return '会员卡退款'
                } else {
                    return '未知'
                }
            },

            typeico:function (val) {
                if (val == 'cashier') {
                    return he.decode("&#xe69f;");
                } else if (val == 'cashierRefund') {
                    return he.decode("&#xe710;");
                } else if (val == 'card') {
                    return he.decode("&#xe69f;");
                } else if (val == 'cardRefund') {
                    return he.decode("&#xe710;");
                } else {
                    return he.decode("&#xe69f;");
                }
            }

        },
        created() {
//              页面创建时请求数据
            utils.initIconFont();
            this.shopId = utils.getUrlParameter("shopId");
            if (this.shopId==null) {
                this.shopId = "";
            }
            this.billDate = utils.getUrlParameter("billDate");
            if (utils.isNull(this.billDate)==false) {
                this.title = "消费统计("+this.billDate+")";
            }
            this.open();
        },
        methods: {
            corpusChange:function (index,id) {
                this.whichCorpus = index;
                this.open();
            },
            noData:function () {
                return this.depositList.length==0;
            },
//            是否添加底部边框
            addBorder: function (index) {
                let listLength = this.depositList.length;
//                判断是否最后一个元素并且是否每月的结尾
                if(index != listLength - 1 ){
                    if(this.depositList[index].shopId == this.depositList[index + 1].shopId){
                        return {
                            borderBottomWidth:'1px'
                        }
                    }else{
                        return {
                            borderBottomWidth:'0px'
                        }
                    }
                }else{
                    return {
                        borderBottomWidth:'0px'
                    }
                }
            },
            //判断月份是否重复
            isRepeat(index){
                if(index != 0){
                    if(this.depositList[index].shopId== this.depositList[index - 1].shopId){
                        return false;
                    }
                }
                return true;
            },
            goback: function (e) {
                event.closeURL();
            },
            open:function () {
                var _this = this;
                var addr = 'weex/member/paybill/summary.jhtml?shopId='+_this.shopId+'&billDate='+ encodeURIComponent(_this.billDate)+"&type="+this.whichCorpus;
                GET(addr, function (res) {
                    if (res.type=="success") {
                        _this.depositList = res.data;
                        _this.total = 0;
                        _this.present = 0;
                        _this.fee = 0;
                        _this.account = 0;
                        _this.depositList.forEach(function (item) {
                            _this.total = _this.total + item.amount;
                            _this.present = _this.present + item.present;
                            _this.fee = _this.fee + item.fee;
                            _this.account = _this.account + item.account;
                        })
                     } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                })
            },
//            下拉刷新
            onrefresh (e) {
                var _this = this;
                _this.pageStart = 0;
                this.refreshing = true;
                animation.transition(_this.$refs.refreshImg, {
                    styles: {
                        transform: 'rotate(360deg)',
                    },
                    duration: 1000, //ms
                    timingFunction: 'linear',//350 duration配合这个效果目前较好
                    needLayout:false,
                    delay: 0 //ms
                })
                setTimeout(() => {
                    animation.transition(_this.$refs.refreshImg, {
                        styles: {
                            transform: 'rotate(0)',
                        },
                        duration: 10, //ms
                        timingFunction: 'linear',//350 duration配合这个效果目前较好
                        needLayout:false,
                        delay: 0 //ms
                    })
                    this.refreshing = false
                    _this.open();
                }, 1000)
            },
            print:function (shopId) {
                var _this = this;
                GET("weex/member/paybill/summary_print.jhtml?shopId="+shopId+"&billDate="+encodeURIComponent(_this.billDate)+"&type="+this.whichCorpus,
                    function (mes) {
                    if (mes.type=='success') {
                        if (utils.device()=='V1') {
                            printer.print(mes.data);
                        } else {
                            modal.alert({
                                message: '请使用收款机',
                                okTitle: '知道了'
                            })
                        }
                    } else {
                        modal.alert({
                            message: mes.content,
                            okTitle: '知道了'
                        })
                    }
                },function (err) {
                    event.toast(err.content);
                })
            }
        },
    }
</script>