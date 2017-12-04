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
                <!--如果月份重复就不渲染该区域-->
                <div class="cell-header cell-line space-between" v-if="isRepeat(index)">
                    <div class="flex-row flex-start">
                        <image class="logo" resize="cover"
                               :src="deposit.logo">
                        </image>
                        <text class="title" >{{deposit.name}}</text>
                    </div>
                </div>
                <div class="panel" >
                        <div class="monthFont">
                            <text class="textMonth flex1">{{deposit.type | typefmt}}</text>
                            <text class="ico_big flex1 mt10" :style="{fontFamily:'iconfont'}">{{deposit.type | typeico}}</text>
                        </div>
                        <div class="moneyname">
                            <text class="name">{{deposit.method}}</text>
                            <text class="money">{{deposit.amount | currencyfmt}}</text>
                        </div>

                </div>
            </cell>
        </list>
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
        margin-left: 50px;
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
                billDate:""
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
                    return '消费'
                } else if (val == 'cashierRefunds') {
                    return '退款'
                } else if (val == 'card') {
                    return '充值'
                } else if (val == 'cardRefunds') {
                    return '退卡'
                } else {
                    return '未知'
                }
            },

            typeico:function (val) {
                if (val == 'cashier') {
                    return he.decode("&#xe622;");
                } else if (val == 'cashierRefunds') {
                    return he.decode("&#xe710;");
                } else if (val == 'card') {
                    return he.decode("&#xe622;");
                } else if (val == 'cardRefunds') {
                    return he.decode("&#xe710;");
                } else {
                    return he.decode("&#xe622;");
                }
            }

        },
        methods: {
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
            open () {
                var _this = this;
                GET('weex/member/paybill/summary.jhtml?shopId='+_this.shopId+"&billDate="+_this.billDate,function (res) {
                    if (res.type=="success") {
                        _this.depositList = res.data;
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
        created () {
//              页面创建时请求数据
            utils.initIconFont();
            this.shopId = utils.getUrlParameter("shopId");
            this.billDate = utils.getUrlParameter("billDate");
            this.open(0,function () {

            });
        }
    }
</script>