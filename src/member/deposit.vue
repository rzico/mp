<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <list class="list">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
            <text class="indicator">下拉刷新 ...</text>
            </refresh>
            <cell>
                 <div class="cell-header clear-row">
                    <div class="left">
                        <text class="title">8月份</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">查看账单</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <!--<div class="cell-row clear-row">-->
                    <!--<div class="left">-->
                        <!--<image class="logo" resize="cover"-->
                               <!--src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">-->
                        <!--</image>-->
                        <!--<div style="flex-direction: column;">-->
                            <!--<text class="title">张三给你转账</text>-->
                            <!--<text class="datetime">08-21 10：24</text>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="">-->
                        <!--<text class="money">+84,356.00</text>-->
                    <!--</div>-->
                <!--</div>-->
                <div class="cell-row clear-one" v-for="deposit in depositList">
                    <div class="left">
                        <image class="logo" resize="cover"
                               src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
                        </image>
                        <div style="flex-direction: column;">
                            <text class="title">{{deposit.memo}}</text>
                            <text class="datetime">08-21 10：24</text>
                        </div>
                    </div>
                    <div class="">
                        <text class="money">{{deposit.amount}}</text>
                    </div>
                </div>

            </cell>
            <cell>
                <div class="cell-header clear-row">
                    <div class="left">
                        <text class="title">17年8月</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">查看账单</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-one">
                    <div class="left">
                        <image class="logo" resize="cover"
                               src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
                        </image>
                        <div style="flex-direction: column;">
                            <text class="title">购买定制台卡</text>
                            <text class="datetime">08-21 10：24</text>
                        </div>
                    </div>
                    <div class="">
                        <text class="money">-84,356.00</text>
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
    .indicator{
        width:750px;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .logo {
        height:100px;
        width:100px;
        margin:20px;
        border-radius:50px;
        overflow:hidden;
    }

    .datetime {
        color:#ccc;
        font-size: 28px;
        margin-top:15px;
        margin-left:10px;
    }
    .money {
        margin-top:25px;
        font-weight: 700;
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
              testTest:[],
              testTest2:[],
              depositList:[],
              refreshing: false,
              showLoading: 'hide',
          }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "账单" }
        },
        methods: {
            goback: function (e) {
                navigator.pop({
                    url: 'http://cdn.rzico.com/weex/app/member/setup.js',
                    animated: "true"
                })
            },
            setup: function (e) {

            },
            getStarCount ( pageNumber,callback) {
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
                    this.getStarCount(pageNumber, res => {
                        if(res.data.message.type == 'success'){
                            this.depositList = this.depositList.concat(res.data.data);
                        }else{
                            modal.toast({ message: '系统繁忙', duration: 1 })
                        }
                        this.showLoading = 'hide'
                    })
                resetLoadmore();
            },
//            下拉刷新
            onrefresh (event) {
                pageNumber = 1;
                modal.toast({ message: '加载中...', duration: 1 })
                this.refreshing = true
                    this.getStarCount(pageNumber, res => {
                        if(res.data.message.type == 'success'){
                            this.depositList = res.data.data;
                        }else{
                            modal.toast({ message: '系统繁忙', duration: 1 })
                        }

                        this.refreshing = false
                    })
            }
        },
        created:function () {
//              页面创建时请求数据
            this.getStarCount( pageNumber,res => {
                if(res.data.message.type == 'success'){
                    this.depositList = res.data.data;
                }else{
                    modal.alert({
                        message: '系统繁忙',
                        duration: 0.3
                    })
                }
            })
        }


    }
</script>