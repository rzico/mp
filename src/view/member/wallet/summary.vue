<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" :border="false"> </navbar>
        <list class="list">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-for="(deposit,index) in depositList" >
                <div class="panel" >
                    <div class="monthFont">
                        <text class="ico_big mt10" :style="{fontFamily:'iconfont'}">{{deposit.type | typeico}}</text>
                    </div>
                    <div class="moneyname">
                        <div>
                            <text class="textMonth">{{deposit.type | typefmt}}</text>
                            <text class="name">{{deposit.type | typememo}}</text>
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
            <div class="moneyname">
                <text class="name" style="margin-left:20px">合计</text>
                <text class="money" style="color:red;margin-right: 20px">{{total | currencyfmt}}</text>
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

</style>
<script>
    const he = require('he');
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import {dom,event,animation} from '../../../weex.js'
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
                total:0
            }
        },
        components: {
            navbar,noData
        },
        props: {
            title: { default: "统计" }
        },
        filters: {

            typefmt:function (val) {
                if ((val=='recharge') ||
                    (val=='refunds') ||
                    (val=='product') ||
                    (val=='reward') ||
                    (val=='rebate') ||
                    (val=='cashier') ||
                    (val=='card'))
                {
                    return "收入";
                } else
                {
                    return "支出";
                }
            },

            typeico:function (val) {
                if ((val=='recharge') ||
                    (val=='refunds') ||
                    (val=='product') ||
                    (val=='reward') ||
                    (val=='rebate') ||
                    (val=='cashier') ||
                    (val=='card'))
                {
                    return  he.decode("&#xe63e;");
                } else
                {
                    return  he.decode("&#xe80a;");
                }
            },

            typememo:function (val) {
                if (val=='recharge') {
                    return "充值"
                } else
                if (val=='refunds') {
                    return "退款"
                } else
                if (val=='product') {
                    return "货款"
                } else
                if (val=='reward') {
                    return "赞赏"
                } else
                if (val=='rebate') {
                    return "奖励金"
                } else
                if (val=='cashier') {
                    return "收款"
                } else
                if (val=='card') {
                    return '会员卡充值'
                } else
                if (val=='payment') {
                    return "付款"
                } else
                if (val=='transfer') {
                    return '提现'
                } else
                if (val=='smsSend') {
                    return '短信'
                } else {
                    return '其他'
                }
            }

        },
        created() {
//              页面创建时请求数据
            utils.initIconFont();
            this.billDate = utils.getUrlParameter("billDate");
            if (utils.isNull(this.billDate)==false) {
                this.title = "统计("+this.billDate.substring(0,7)+")";
            }
            this.open();
        },
        methods: {
            noData:function () {
                return this.depositList.length==0;
            },
            goback: function (e) {
                event.closeURL();
            },
            open:function () {
                var _this = this;
                var addr = 'weex/member/deposit/summary.jhtml?billDate='+ encodeURIComponent(_this.billDate);
                GET(addr, function (res) {
                    if (res.type=="success") {
                        _this.depositList = res.data;
                        _this.total = 0;
                        _this.depositList.forEach(function (item) {
                            _this.total = _this.total + item.amount;
                        })
                     } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                })
            },
//            下拉刷新
            onrefresh (event) {
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
        },
    }
</script>