<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <list class="list">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
            <text class="indicator">下拉刷新 ...</text>
            </refresh>
            <cell v-for="(deposit,index) in depositList" >
                <!--如果月份重复就不渲染该区域-->
                <div class="cell-header cell-line space-between" v-if="isRepeat(index)">
                    <div class="flex-row flex-start">
                        <text class="title" >{{deposit.create_date | detailMonth}}月份</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"   >查看账单</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row cell-clear" >
                    <div class="cell-panel newHeight"  :style="addBorder(index)">
                        <div class="flex1">
                            <image class="logo" resize="cover"
                                   src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
                            </image>
                        </div>
                        <div class="content flex5">
                            <text class="title lines-ellipsis">{{deposit.memo}}</text>
                            <div class="flex-row space-between align-bottom">
                                <text class="datetime">{{deposit.create_date | detailTime}}</text>
                                <text class="money">{{deposit.amount | formatting}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </cell>
            <loading class="loading" @loading="onloading" :display="showLoading">
                <text class="indicator">Loading ...</text>
            </loading>
        </list>
    </div>

</template>
<style src='../style/wx.css' />
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
        height:100px;
        width:100px;
        border-radius:50px;
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
    }
    .money {
        font-weight: 700;
        margin-right: 20px;
    }

</style>
<script>
    const modal = weex.requireModule('modal')
    var navigator = weex.requireModule('navigator')
    import navbar from '../include/navbar.vue'
    var stream = weex.requireModule('stream')
    var pageNumber = 1;
    export default {
        data:function(){
          return{
              depositList:[],
              refreshing: false,
              showLoading: 'hide',
          }
        },
        components: {
            navbar
        },
//        过滤器
        filters: {
            detailMonth: function (value) {
                let date = new Date(value);
                let    m = date.getMonth() + 1;
                return m;
         },
            detailTime: function (value) {
                let    date = new Date(value);
                let    m = date.getMonth() + 1;
                let    d = date.getDate();
                let    H = date.getHours();
                let    i = date.getMinutes();
                if (m < 10) {
                    m = '0' + m;
                }
                if (d < 10) {
                    d = '0' + d;
                }
                if (H < 10) {
                    H = '0' + H;
                }
                if (i < 10) {
                    i = '0' + i;
                }
                let t = m + '-' + d + '  ' + H + ':' + i ;
                return t;

            },
            formatting:function(value){
                let dealValue = value.toFixed(2);
                return dealValue;
            }
        },

        props: {
            title: { default: "账单" }
        },
        methods: {
//            是否添加底部边框
            addBorder: function (index) {
                let listLength = this.depositList.length;
//                判断是否最后一个元素并且是否每月的结尾
                if(index != listLength - 1 ){
                    if(this.getDate(this.depositList[index].create_date) == this.getDate(this.depositList[index + 1].create_date)){
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
                    if(this.getDate(this.depositList[index].create_date) == this.getDate(this.depositList[index - 1].create_date)){
                        return false;
                    }
                }
                return true;
            },
            goback: function (e) {
                navigator.pop({
                    url: 'http://cdn.rzico.com/weex/app/member/setup.js',
                    animated: "true"
                })
            },
            setup: function (e) {
                toPage(e);
            },
            open (pageNumber,callback) {
                return stream.fetch({
                    method: 'GET',
                    type: 'json',
                    url: 'http://www.rzico.com/applet/member/wallet/bill.jhtml?begin_date=2017-01-01%2000:00:00&end_date=2018-01-01%2000:00:00&pageNumber=' + pageNumber +'&pageSize=10'
                }, callback)
            },
//            上拉加载
            onloading (event) {
                pageNumber ++ ;
                modal.toast({ message: '加载中...', duration: 0.5 })
                this.showLoading = 'show'
                    this.open(pageNumber, res => {
                        if(res.data.message.type == 'success'){
                            this.depositList = this.depositList.concat(res.data.data);
                        }else{
                            modal.toast({ message: '系统繁忙', duration: 1 })
                        }
                        this.showLoading = 'hide'
                    })
            },
//            下拉刷新
            onrefresh (event) {
                pageNumber = 1;
                modal.toast({ message: '加载中...', duration: 1 })
                this.refreshing = true
                    this.open(pageNumber, res => {
                        if(res.data.message.type == 'success'){
                            this.depositList = res.data.data;
                        }else{
                            modal.toast({ message: '系统繁忙', duration: 1 })
                        }
                        this.refreshing = false
                    })
            },
//            获取月份
            getDate: function(value) {
                let date = new Date(value);
                let     m = date.getMonth() + 1;
                return m;
            }
    },
        created:function () {
//              页面创建时请求数据
            this.open( pageNumber,res => {
                if(res.data.message.type == 'success'){
                    this.depositList = res.data.data;
                }else{
                    modal.alert({
                        message: '系统繁忙',
                        duration: 0.3
                    })
                }
            });
        }
    }
</script>