<template>
    <div class="wrapper" >
        <navbar :title="title"  @goback="goback"  showComplete="false"  @goComplete="cleanbgChange"> </navbar>
        <list>
            <cell>
                <div class="header ">
                    <text class=" titleColor">订单编号: 64805405523</text>
                    <text class=" mt20 titleColor">国内承运人: 京东快递</text>
                    <text class=" mt20 titleColor">预计送达: 11月13日</text>
                </div>
            </cell>
            <cell class="logisticsBox" v-for="(item,index) in logisticsList">
                <div>
                    <div class="outsideBox boder-left">
                        <div class="infoLine " :class="[index != logisticsList.length - 1 ? 'boder-bottom' : '']">
                            <text :class="[item.isDone ? 'subColor' : 'sub_title']">{{item.content}}</text>
                            <text class="sub_title mt20">{{item.createDate}}</text>
                        </div>
                    </div>
                    <!--遮住第一个项的上方-->
                    <text class="topMask" v-if="index == 0 && index != logisticsList.length - 1"></text>
                    <!--遮住最后项的下方-->
                    <text class="bottomMask" v-if="index == logisticsList.length - 1"></text>
                <!--完成后显示的红色样式-->
                    <div v-if="item.isDone" class="doneIconBox">
                        <text class="DoneBigIcon"></text>
                        <text class="DoneSmallIcon"></text>
                    </div>
                    <!--未完成的灰色样式-->
                    <text v-else class="dotIcon"></text>
                </div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .titleColor{
        color: #444;
        font-size: 32px;
    }
    .subColor{
        color: #444;
        font-size: 30px;
    }
    .doneIconBox{
        position: absolute;
        top: 20px;
        left: 20px;
        width: 40px;
        height:40px;
    }
    .DoneBigIcon{
        width: 40px;
        height:40px;
        background-color: red;
        border-radius: 20px;
        position: absolute;
        opacity: 0.5;
        top: 0px;
        left: 0px;
    }
    .DoneSmallIcon{
        width: 24px;
        height: 24px;
        background-color:red;
        border-radius: 12px;
        position: absolute;
        top: 8px;
        left: 8px;
    }
    .bottomMask{
        position: absolute;
        background-color: #fff;
        top: 46px;
        left: 38px;
        width: 4px;
        bottom:0px;
    }
    .topMask{
        position: absolute;
        background-color: #fff;
        top: 0px;
        left: 38px;
        width: 4px;
        height: 30px;
    }
    .dotIcon{
        width: 16px;
        height:16px;
        background-color:#ccc;
        border-radius: 10px;
        position: absolute;
        top: 30px;
        left: 32px;
    }
    .logisticsBox{
        background-color: #fff;
    }
    .outsideBox{
        margin-left: 40px;
        padding-top: 20px;
    }
    .infoLine{
        margin-left: 40px;
        padding-bottom: 20px;
        padding-right: 30px;
    }
    .header{
        background-color: #fff;
        padding: 20px;
        margin-bottom: 20px;
    }
</style>
<script>
    import {dom,event} from '../../../weex.js'
    import utils from '../../../assets/utils.js'
    import { POST, GET } from '../../../assets/fetch'
    import navbar from '../../../include/navbar.vue'
    const modal = weex.requireModule('modal');

    export default {
        data:function () {
            return{
                logisticsList:[{
                    content:'【厦门市】您的订单已电子签收。感谢您在xx购物，欢迎再次光临。评价后还能赢取奖品呦',
                    createDate:'2017-11-13 19:09:00',
                    isDone:true
                },{
                    content:'【厦门市】您的订单已达到【厦门湖里站】',
                    createDate:'2017-11-13 19:09:00',
                    isDone:false
                },{
                    content:'【厦门市】您的订单已电子签收。感谢您在xxx购物，欢迎再次光临。参加评价还能赢取奖品呦。',
                    createDate:'2017-11-13 19:09:00',
                    isDone:false
                },{
                    content:'【厦门市】您的订单已电子签收。感谢您在xxx购物，欢迎再次光临。参加评价还能赢取奖品呦。',
                    createDate:'2017-11-13 19:09:00',
                    isDone:false
                }]
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "订单跟踪"},
        },
        created(){
            var _this = this;
            utils.initIconFont();
        },
        methods:{
            goback(){
                event.closeURL();
            },
        }
    }
</script>