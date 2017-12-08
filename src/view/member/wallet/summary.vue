<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" :border="false"> </navbar>
        <list class="list">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">下拉刷新</text>
            </refresh>
            <cell v-if="noData()" >
                <noData > </noData>
            </cell>
            <cell v-for="(deposit,index) in depositList" >
                <!--&lt;!&ndash;如果月份重复就不渲染该区域&ndash;&gt;-->
                <!--<div class="cell-header cell-line space-between" v-if="isRepeat(index)">-->
                    <!--<div class="flex-row flex-start">-->
                        <!--&lt;!&ndash;<image class="logo" resize="cover"&ndash;&gt;-->
                               <!--&lt;!&ndash;:src="deposit.logo">&ndash;&gt;-->
                        <!--&lt;!&ndash;</image>&ndash;&gt;-->
                        <!--&lt;!&ndash;<text class="title" >{{deposit.name}}</text>&ndash;&gt;-->
                    <!--</div>-->
                <!--</div>-->
                <div class="panel" >
                        <div class="monthFont">
                            <text class="textMonth flex1">{{deposit.type | typefmt}}</text>
                            <text class="ico flex1 mt10" :style="{fontFamily:'iconfont'}">{{deposit.type | typeico}}</text>
                        </div>
                        <div class="moneyname">
                            <text class="name">{{deposit.type | typememo}}</text>
                            <text class="money">{{deposit.amount | currencyfmt}}</text>
                        </div>

                </div>
            </cell>
        </list>
        <div class="panel" >
            <div class="moneyname">
                <text class="name" style="margin-left:20px">合计</text>
                <text class="money" style="color:red">{{total | currencyfmt}}</text>
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


    .logo {
        height:40px;
        width:40px;
        border-radius:20px;
        overflow:hidden;
        margin: 20px;
    }

    .textMonth {
        font-size: 32px;
        margin-left: 20px;
        color: #444;
    }

    .monthFont {
        flex-direction: row;
        align-items: center;
        flex:2;
    }

    .moneyname {
        flex-direction: row;
        flex:6;
        justify-content: space-between;
    }

    .money {
        font-size: 32px;
        font-weight: bold;
        margin-right: 20px;
    }

    .name {
        font-size: 28px;
        color: #ccc;
    }

</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    var event = weex.requireModule('event')
    var he = require('he');
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
            title: { default: "账单统计" }
        },
        filters: {

            typefmt:function (val) {
                if ((type=='recharge') ||
                    (type=='refunds') ||
                    (type=='product') ||
                    (type=='reward') ||
                    (type=='rebate') ||
                    (type=='cashier') ||
                    (type=='card'))
                {
                    return "收入";
                } else
                {
                    return "支出";
                }
            },

            typeico:function (val) {
                if ((type=='recharge') ||
                    (type=='refunds') ||
                    (type=='product') ||
                    (type=='reward') ||
                    (type=='rebate') ||
                    (type=='cashier') ||
                    (type=='card'))
                {
                    return  he.decode("&#xe63e;");
                } else
                {
                    return  he.decode("&#xe80a;");
                }
            },

            typememo:function (val) {
                if (type=='recharge') {
                    return "充值"
                } else
                if
                (type=='refunds') {
                    return "退款"
                } else
                if (type=='product') {
                    return "货款"
                } else
                if (type=='reward') {
                    return "赞赏"
                } else
                if (type=='rebate') {
                    return "奖励金"
                } else
                if (type=='cashier') {
                    return "收款"
                } else if
                (type=='card') {
                    return '会员卡充值'
                } else
                if (type=='payment') {
                    return "付款"
                } else
                if (type=='transfer') {
                    return '提现'
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
                this.title = "账单统计("+this.billDate.substring(0,7)+")";
            }
            this.open();
        },
        methods: {
            readType:function(type) {
               if ((type=='recharge') ||
                   (type=='refunds') ||
                   (type=='product') ||
                   (type=='reward') ||
                   (type=='rebate') ||
                   (type=='cashier') ||
                   (type=='card'))
               {
                   return 0;
               } else
               {
                   return 1;
               }


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
                    if (this.depositList[index].shopId== this.depositList[index - 1].shopId){
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
                _this.refreshing = true;
                setTimeout(
                    _this.open()
                    ,1500)
            },
        },
    }
</script>