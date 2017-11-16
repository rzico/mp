<template>
    <div class="wrapper">
        <navbar :title="title" :complete="complete" @goback="goback"></navbar>
        <list class="list">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">下拉刷新</text>
            </refresh>
            <cell >
                <div class="cumulative">
                    <text class="cumulativeMoney primary">累计奖励：{{total}}元</text>
                </div>
                <noData :ndBgColor="'#fff'"  v-if="noData()"> </noData>
            </cell>
            <cell class="cell " v-for="(num,index) in lists">
                <div class="month"  v-if="isRepeat(index)">
                    <text class="monthText">{{num.createDate | datefmt}}</text>
                </div>
                <div class="panel">
                    <div class="monthFont">
                        <text class="textMonth">{{num.createDate | hitimefmt}}</text>
                        <image class="font" :src="num.logo">&#xe6ce;</image>
                    </div>
                    <div class="moneyname">
                        <text class="money">{{num.amount | currencyfmt}}</text>
                        <text class="name">{{num.memo}}</text>
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
    .cumulative {
        width: auto;
        height: 120px;
        border-width: 1px;
        border-style: solid;
        border-color: #ccc;
        justify-content: center;
        /*flex-direction: row;*/
        background-color: white;
        margin-top: 20px;
    }

    .cumulativeMoney {
        font-size: 32px;
        margin-left: 20px;
    }

    .month {
        height: 60px;
        justify-content: center;
    }

    .monthText {
        font-size: 32px;
        margin-left: 20px;
    }

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
        margin-left: 20px;
        color: #cccccc;
    }

    .monthFont {
        flex-direction: row;
        align-items: center;
    }

    .font {
        width:60px;
        height:60px;
        border-radius: 35px;
        margin-left: 20px;
    }

    .moneyname {
        margin-left: 50px;
    }

    .money {
        font-size: 32px;
        font-weight: bold;
    }

    .name {
        font-size: 28px;
        color: #ccc;
    }

    .loading {
        justify-content: center;
    }
</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import {POST, GET} from '../../../assets/fetch';
    import utils from '../../../assets/utils';
    import filters from '../../../filters/filters';

    var event = weex.requireModule('event');
    const modal = weex.requireModule('modal');

    export default {
        data() {
            return {
                loading: false,
                refreshing : false,
                pageStart: 0,
                pageSize: 20,
                lists: [],
                month: '',
                total:0,
                noLoading:false
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "我的奖励"},
        },
        created() {
            utils.initIconFont();
            this.summary();
            this.open(function () {

            });
        },
        methods: {
//            获取月份
            getDate: function(value) {
                //value 传进来是个整数型，要判断是10位还是13位需要转成字符串。这边的方法是检测13位的时间戳 所以要*1000；并且转回整型。安卓下，时间早了8个小时
                value = value + '';
                if(value.length == 10){
                    value = parseInt(value) * 1000;
                }else{
                    value = parseInt(value);
                }
                // 返回处理后的值
                let date = new Date(value);
                return date.getYear()+"年"+date.getMonth()+"月"+date.getDay()+"日";
            },
             noData:function () {
                return this.lists.length==0;
            },
            //判断月份是否重复
            isRepeat(index){
                if(index != 0){
                    if(this.getDate(this.lists[index].createDate) == this.getDate(this.lists[index - 1].createDate)){
                        return false;
                    }
                }
                return true;
            },
            open:function (callback) {
                var _this = this;
                GET('weex/member/rebate/list.jhtml?pageStart=' + this.pageStart + '&pageSize=' + this.pageSize, function (res) {
                    if (res.type == 'success') {
                        if (res.data.start==0) {
                            _this.lists = res.data.data;
                        } else {
                            data.data.data.forEach(function (item) {
                                _this.lists.push(item);
                            })
                        }
                        _this.pageStart = res.data.start+res.data.data.length;
                        _this.noLoading = res.data.data.length<_this.pageSize;
                    } else {
                        event.toast(res.content);
                    }
                    callback();
                }, function (err) {
                    callback();
                    event.toast(err.content)
                })
            },
//            上拉加载
            onloading (event) {
                var _this = this;
                _this.loading = true;
                setTimeout(
                    _this.open(function () {
                        _this.loading = false;
                    })
                ,1500)
            },
//            下拉刷新
            onrefresh (event) {
                var _this = this;
                _this.pageStart = 0;
                _this.refreshing = true;
                this.summary();
                setTimeout(
                    _this.open(function () {
                        _this.refreshing = false;
                    })
                    ,1500)
            },

            goback: function () {
                event.closeURL()
            },
            summary:function () {
                var _this = this;
                GET('weex/member/rebate/summary.jhtml?type=rebate', function (res) {
                    event.toast(res);
                    if (res.type == 'success') {
                       _this.total = res.data;
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            }
        }
    }
</script>
