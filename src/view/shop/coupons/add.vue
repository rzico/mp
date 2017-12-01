<template>
    <div style="background-color: #eeeeee">
            <navbar :title="title"  @goback="goback"  > </navbar>
        <div style="background-color: white">
    <div class="titleOne">
        <text class="titleText">填写优惠券信息:</text>
    </div>
    <div class="name">
        <text class="nameText">优惠券类型</text>
        <input type="text" placeholder="请输入优惠券类型" class="inputone" @change="" @input="oninput"/>
    </div>
    <div class="scope">
        <text class="scopeText">适用范围</text>
        <input type="text" placeholder="请输入优惠券适用范围" class="input" @change="" @input="oninput"/>
    </div>
    <div class="money">
        <text class="moneyText">满减面额</text>
        <input type="text" placeholder="请输入满减面额" class="input" @change="" @input="oninput"/>
        <text class="conditionsText">元</text>
    </div>
    <div class="conditions">
        <text class="conditionsText">使用条件</text>
        <text class="man" style="padding-left: 100px">满</text>
        <input type="text" placeholder="0为无门槛" class="inputconditions" @change="" @input="oninput"/>
        <text class="conditionsText">元使用</text>
    </div>
    <div class="time" >
        <text class="textTime">使用时间</text>
        <div style="background-color: red" @click="Date">
        <text class="begindate" >{{beginDate}}2222</text>
        </div>
        <text class="textTime">一</text>
        <input type="text" placeholder="" class="inputtime" @change="" @input="oninput"/>
    </div>
    <div class="introduced">
        <text class="introducedText">规则介绍</text>
        <input type="text" placeholder="使用规则介绍" class="input" @change="" @input="oninputeight"/>
    </div>
        </div>
    <div class="button">
        <text class="bottonText">完成</text>
    </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .titleOne{
        height: 80px;
        border-left-width: 5px;
        flex-direction: row;
        align-items: center;
        background-color: white;
        padding-left: 20px;
        margin-left: 20px;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .titleText{

    }
    .begindate{
        width:300px;
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
    .inputone{
        padding-left: 70px;
        font-size: 28px;
        height: 32px;
        width: 300px;
    }
    .inputconditions{
        font-size: 28px;
        height: 32px;
        margin-left: 20px;
        width: 100px;
    }
    .inputtime{
        font-size: 28px;
        height: 32px;
        margin-left: 20px;
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
    .discount{
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
                beginDate:'未设置',
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
            oninput: function (event) {
                this.vendorName = event.value;
                console.log('oninput', event.value);
            },
            Date:function () {
                utils.debug(111)
                var _this = this;
                picker.pickDate({
                    value: _this.beginDate
                }, event => {
                    if (event.result === 'success') {
                        _this.beginDate = event.data
                    }
                })

            }
        }
    }
</script>