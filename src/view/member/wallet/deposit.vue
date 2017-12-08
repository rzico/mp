<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <list class="list">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">下拉刷新</text>
            </refresh>
            <cell v-if="noData()" >
                <noData > </noData>
            </cell>
            <cell v-for="(deposit,index) in depositList" >
                <!--如果月份重复就不渲染该区域-->
                <div class="cell-header cell-line space-between" v-if="isRepeat(index)" @click="summary(deposit.createDate)">
                    <div class="flex-row flex-start">
                        <text class="title" >{{deposit.createDate | monthfmt}}</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row cell-clear" >
                    <div class="cell-panel newHeight"  :style="addBorder(index)">
                        <div class="flex1">
                            <image class="logo" resize="cover"
                                   :src="deposit.logo">
                            </image>
                        </div>
                        <div class="content flex5">
                            <div class="flex-row space-between align-bottom">
                                <text class="title lines-ellipsis">{{deposit.memo}}</text>
                                <text class="money" :style="moneyColor(deposit.amount)">{{deposit.amount | currencyfmt}}</text>
                            </div>
                            <div class="flex-row space-between align-bottom">
                                <text class="datetime">{{deposit.createDate | datetimefmt}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </cell>
            <cell v-if="noLoading">
                <div class="noLoading"></div>
            </cell>
            <loading class="loading" @loading="onloading" :display="loading ? 'show' : 'hide'">
                <text class="indicator">加载中..</text>
            </loading>
        </list>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .newHeight{
        height: 130px;
    }
    .cell-row {
        min-height: 120px;
        flex-direction: column;
        background-color: #ffffff;
        padding-left: 20px;
        margin-top: 20px;
    }

    .logo {
        height:80px;
        width:80px;
        border-radius:40px;
        overflow:hidden;
    }

    .align-bottom {
        align-items: flex-end;
        width:615px;
    }

    .content {
        margin-left: 10px;
        flex-direction: column;
        align-items: flex-start;
    }
    .datetime {
        color:#ccc;
        font-size: 28px;
        margin-top: 5px;
    }
    .money {
        font-weight: 700;
        margin-right: 20px;
    }

</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    var event = weex.requireModule('event')
    import navbar from '../../../include/navbar.vue'
    import noData from '../../../include/noData.vue'
    import filters from '../../../filters/filters.js'

    var pageNumber = 1;
    export default {
        data:function(){
            return{
                depositList:[],
                refreshing: false,
                loading: 'hide',
                pageStart:0,
                pageSize:20,
                noLoading:true
            }
        },
        components: {
            navbar,noData
        },
        props: {
            title: { default: "账单" }
        },
        methods: {
            noData:function () {
                return this.depositList.length==0;
            },
            moneyColor:function (amount) {
                if (amount<0) {
                    return {color:'red'}
                }  else {
                    return {color:'#000'}
                }
            },
//            是否添加底部边框
            addBorder: function (index) {
                let listLength = this.depositList.length;
//                判断是否最后一个元素并且是否每月的结尾
                if(index != listLength - 1 ){
                    if(this.getDate(this.depositList[index].createDate) == this.getDate(this.depositList[index + 1].createDate)){
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
                    if(this.getDate(this.depositList[index].createDate) == this.getDate(this.depositList[index - 1].createDate)){
                        return false;
                    }
                }
                return true;
            },
            goback: function (e) {
                event.closeURL();
            },
            open (pageStart,callback) {
                this.pageStart = pageStart;
                var _this = this;
                GET('weex/member/deposit/list.jhtml?pageNumber=' + this.pageStart +'&pageSize='+this.pageSize,function (res) {
                   if (res.type=="success") {
                       if (res.data.start==0) {
                          _this.depositList = res.data.data;
                       } else {
                           data.data.data.forEach(function (item) {
                               _this.depositList.push(item);
                           })
                       }
                       _this.pageStart = res.data.start+res.data.data.length;
                       _this.noLoading = res.data.data.length<_this.pageSize;
                   } else {
                       event.toast(err.content);
                   }
                    callback();
                 }, function (err) {
                    callback();
                    event.toast(err.content);
                })
            },
            summary:function (m) {
                let v =  utils.ymdtimefmt(timestamp);
                event.openURL(utils.locate('view/member/wallet/deposit.js?billDate='+encodeURIComponent(v)),function () {

                })
            },
//            上拉加载
            onloading (event) {
                var _this = this;
                _this.loading = true;
                setTimeout(
                  _this.open(_this.pageStart,function () {
                     _this.loading = false;
                  })
                ,1500)
            },
//            下拉刷新
            onrefresh (event) {
                var _this = this;
                _this.pageStart = 0;
                _this.refreshing = true;
                setTimeout(
                   _this.open(_this.pageStart,function () {
                     _this.refreshing = false;
                  })
                ,1500)
            },
//            获取月份
            getDate: function(value) {
                let res = utils.resolvetimefmt(value);
                let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));
                // 返回处理后的值
                let m = tds.m - res.m;
                let y = tds.y - res.y;
                if (m < 1) {
                    return "本月"
                }
                if (m < 2) {
                    return "上月"
                }
                if (y < 1) {
                    return res.m + "月"
                }
                return res.y + "年" + res.m + "月";
            }
        },
        created () {
//              页面创建时请求数据
            utils.initIconFont();
            this.open(0,function () {
                
            });
        }
    }
</script>