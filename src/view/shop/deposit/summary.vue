<template>
    <div class="wrapper">
        <!--<navbar :title="title" @goback="goback"> </navbar>-->
        <list class="list">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">下拉刷新 ...</text>
            </refresh>
            <cell v-for="(deposit,index) in depositList" >
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
                                <text class="datetime">{{deposit.create_date | datetimefmt}}</text>
                                <text class="money">{{deposit.amount | currencyfmt}}</text>
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
    import navbar from '../../../include/navbar.vue'
    import filters from '../../../filters/filters.js'
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'

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
        props: {
            title: { default: "账单" }
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            open (pageNumber,callback) {
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
                let d = date.getYear() +'-'+ date.getMonth() +'-'+ date.getDay();
                return d;
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