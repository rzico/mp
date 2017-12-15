<template>
    <div class="wrapper">
        <navbar :title="title" :complete="complete" @goback="goback"></navbar>
        <list class="list"  @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell >
                <div class="cumulative">
                    <text class="cumulativeMoney primary">累计赞金：{{total}}元</text>
                </div>
                <noData :ndBgColor="'#fff'"  v-if="noData()"> </noData>
            </cell>
            <cell class="cell " v-for="(num,index) in lists"  ref="adoptPull">
                <div class="month"  v-if="isRepeat(index)">
                    <text class="monthText">{{num.createDate | datefmt}}</text>
                </div>
                <div class="panel">
                    <div class="monthFont">
                        <text class="textMonth">{{num.createDate | hitimefmt}}</text>
                        <text class="font" :style="{fontFamily:'iconfont'}">&#xe6ce;</text>
                    </div>
                    <div class="moneyname">
                        <text class="money">+{{num.amount | currencyfmt}}</text>
                        <text class="name">来自{{num.nickName}}的打赏</text>
                    </div>
                </div>
            </cell>
            <cell v-if="noLoading">
                <div class="noLoading"></div>
            </cell>
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
        margin-left: 50px;
        font-size: 70px;
        color: #D9141E;
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
    import {dom,event,animation} from '../../../weex.js';
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
                noLoading:false,
                refreshImg:utils.locate('resources/images/loading.png'),
                hadUpdate:false,
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "我的赏金"},
        },
        created() {
            utils.initIconFont();
            this.summary();
            this.open(function () {

            });
        },
//        dom呈现完执行滚动一下
        updated(){
//            每次加载新的内容时 dom都会刷新 会执行该函数，利用变量来控制只执行一次
            if(this.hadUpdate){
                return;
            }
            this.hadUpdate = true;
//            判断是否不是ios系统  安卓系统下需要特殊处理，模拟滑动。让初始下拉刷新box上移回去
            if(!utils.isIosSystem()){
                const el = this.$refs.adoptPull//跳转到相应的cell
                dom.scrollToElement(el, {
                    offset: -119
                })
            }
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
                GET('weex/member/reward/list.jhtml?pageStart=' + this.pageStart + '&pageSize=' + this.pageSize, function (res) {
                    if (res.type == 'success') {
                        if (res.data.start==0) {
                            _this.lists = res.data.data;
                        } else {
                            res.data.data.forEach(function (item) {
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
                _this.open(function () {
                })
            },
//            下拉刷新
            onrefresh:function (event) {
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
                });
                setTimeout(() => {
                    animation.transition(_this.$refs.refreshImg, {
                        styles: {
                            transform: 'rotate(0)',
                        },
                        duration: 10, //ms
                        timingFunction: 'linear',//350 duration配合这个效果目前较好
                        needLayout:false,
                        delay: 0 //ms
                    });
                    _this.open(function () {
                        _this.refreshing = false;
                    })
                }, 1000)
            },
            goback: function () {
                event.closeURL()
            },
            summary:function () {
                var _this = this;
                GET('weex/member/reward/summary.jhtml', function (res) {
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
