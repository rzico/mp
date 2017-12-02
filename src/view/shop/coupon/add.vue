<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback"  > </navbar>
        <div style="background-color: white">
            <div class="titleOne">
                <text class="titleText" style="font-size: 32px">填写优惠券信息:</text>
            </div>
            <div class="name">
                <text class="nameText" style="font-size: 32px">优惠券类型</text>
                <text class="nameText" style="font-size: 32px;padding-left: 70px" @click="typesetting">{{type}}</text>
            </div>
            <div class="scope">
                <text class="scopeText" style="font-size: 32px">适用范围</text>
                <text class="scopeText" style="font-size: 32px;padding-left: 100px" @click="scopesetting">{{address}}</text>
            </div>
            <div class="money">
                <text class="moneyText" style="font-size: 32px">满减面额</text>
                <input type="number" placeholder="请输入满减面额" class="inputMoney" v-model="money" @change="" @input=""/>
                <text class="conditionsText" style="font-size: 32px">元/折</text>
            </div>
            <div class="conditions">
                <text class="conditionsText" style="font-size: 32px">使用条件</text>
                <text class="man" style="padding-left: 100px;font-size: 32px">满</text>
                <input type="number" placeholder="0为无门槛" class="inputconditions" v-model="conditions" @change="" @input=""/>
                <text class="conditionsText" style="font-size: 32px">元使用</text>
            </div>
            <div class="time" >
                <text class="textTime" style="font-size: 32px">使用时间</text>
                <div  style="padding-left: 100px"@click="date" >
                    <text class="begindate" >{{beginDate}}</text>
                </div>
                <text class="textTime" style="font-size: 32px">一</text>
                <div  style="padding-left: 10px"@click="dateTwo" >
                    <text class="enddate" >{{endDate}}</text>
                </div>
            </div>
            <div class="introduced">
                <text class="introducedText" style="font-size: 32px">规则介绍</text>
                <input type="text" placeholder="使用规则介绍" class="input" v-model="rule" @change="" @input=""/>
            </div>
        </div>
        <div class="button bw" @click="complete">
            <text class="bottonText">完成</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .titleOne{
        height: 50px;
        border-left-width: 5px;
        flex-direction: row;
        align-items: center;
        background-color: white;
        padding-left: 20px;
        margin-left: 20px;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .begindate{
        color: #888;
        width:190px;
    }
    .enddate{
        color: #888;
        width:190px;
    }
    .name{
        flex-direction: row;
        align-items: center;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;
    }
    .input{
        padding-left: 100px;
        font-size: 28px;
        height: 32px;
        width: 500px;
    }
    .inputconditions{
        font-size: 28px;
        height: 32px;
        margin-left: 20px;
        width: 150px;
    }
    .inputMoney{
        font-size: 28px;
        height: 32px;
        margin-left: 100px;
        width: 200px;
    }
    .scope{
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;
    }
    .money{
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;
    }
    .conditions{
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;
    }
    .time{
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;
    }
    .introduced{
        flex-direction: row;
        align-items: center;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;
    }
    .bw {
        width:650px;
        margin-left:50px;
        margin-top: 30px;
    }
    .bottonText{
        font-size: 40px;
        color:white;
    }
</style>
<script>
    const picker = weex.requireModule('picker');
    const storage = weex.requireModule('storage');
    var event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import { POST, GET } from '../../../assets/fetch'
    export default {
        data:function () {
            return{
                beginDate:'点击设置',
                endDate:'点击设置',
                scope:'',
                money:'',
                conditions:'',
                rule:'',
                type:'满减',
                codeName:'fullcut',
                address:'全场',
                scene:'all',
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "新增优惠券"},

        },
        created() {
            utils.initIconFont();
        },
        methods: {
            goback:function () {
                event.closeURL();
            },
//            适用范围选择
            scopesetting:function () {
                var _this = this;
                picker.pick({
                    index:0,
                    items:['全场','店内','商城']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.address = '全场'
                            _this.scene = 'all'

                        }else if(e.data == 1){
                            _this.address = '店内'
                            _this.scene = 'shop'
                        }
                        else{
                            _this.address = '商城'
                            _this.scene = 'mall'
                        }
                    }
                })
            },
//            优惠券类型选择
            typesetting:function () {
                var _this = this;
                picker.pick({
                    index:0,
                    items:['满减','满折']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.type = '满减'
                            _this.codeName = 'fullcut'

                        }else if(e.data == 1){
                            _this.type = '满折'
                            _this.codeName = 'discount'
                        }
                    }
                })
            },
            date:function () {
                var _this = this;
                picker.pickDate({
                    value: _this.beginDate
                }, event => {
                    if (event.result === 'success') {
                        _this.beginDate = event.data
                    }
                })
            },
            dateTwo:function () {
                var _this = this;
                picker.pickDate({
                    value: _this.endDate
                }, event => {
                    if (event.result === 'success') {
                        _this.endDate = event.data
                    }
                })
            },
            complete:function () {
                let _this = this;
                POST('weex/member/coupon/submit.jhtml?type='+_this.codeName+'&scope='+_this.scene+'&beginDate='+_this.beginDate
                    +'&endDate='+_this.endDate +'&amount='+_this.money+'&minimumPrice='+_this.conditions+'&introduction='+encodeURI(_this.rule)).then(
                    function (mes) {
                        if (mes.type == "success") {
                            event.closeURL(mes)
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast(err.content);
                    }
                )
            }
        }
    }
</script>