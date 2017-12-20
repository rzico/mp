<template>
    <div class="wrapper">
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="goComplete"  > </navbar>
        <list >
            <cell :style="{minHeight:screenHeight + 'px'}">
    <div class="setting" v-for="(num,index) in div">
        <div class="titile">
            <text class="tiele">活动设置</text>
            <text class="tiele" @click="del">删除</text>
        </div>
        <div class="money">
            <text class="fz32">充</text>
            <input type="number" placeholder="设置金额" class="input" v-model="num.amount" />
            <text class="monyeTextthree fz32">送</text>
            <input type="number" placeholder="设置金额" class="inputTwo" v-model="num.present" />
        </div>
        <div class="vip" @click="select(num)">
            <text class="vipText fz32">会员等级</text>
            <text class="vipTexttwo fz32">升级至</text>
            <text class="fz32" >{{num.vip}}</text>
        </div>
    </div>
                <div style="align-items: center">
                <div class="sign" @click="add" >
                    <text class="plusSign" :style="{fontFamily:'iconfont'}" >&#xe618;</text>
                </div>
                </div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .sign{
        height: 80px;
        width: 100px;
        background-color:#cccccc;
        margin-top: 20px;
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
        border-bottom-left-radius: 40px;
        border-top-left-radius: 40px;
        justify-content: center;
        align-items: center;
    }
    .plusSign{

        font-size: 40px;
        color: white;
        font-weight: 700;
    }
    .setting{
        background-color: white;
        margin-left: 25px;
        margin-right: 25px;
        margin-top: 25px;
        border-width: 1px;
        border-color: #cccccc;
        border-radius: 15px;
    }
    .titile{
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        padding-left: 30px;
        padding-right: 30px;
        background-color: #ccc;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100px;
    }
    .money{
        padding-left: 30px;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
        height: 100px;
    }
    .vip{
        padding-left: 30px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
        height: 100px;
    }
    .vipTexttwo{
        padding-left: 20px;
    }
    .monyeTextthree{
        padding-left: 20px;
    }

    .input{
        padding-left: 20px;
        width: 150px;
        font-size: 28px;
        height: 100px;
    }
    .inputTwo{
        padding-left: 20px;
        width: 300px;
        font-size: 28px;
        height: 100px;
    }
</style>
<script>
    const picker = weex.requireModule('picker');
    var event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import { POST, GET, SCAN } from '../../../assets/fetch'
    export default {
        data: function () {
            return{
                div:[],
                vipDATA:[{id:0,name:'vip1'},{id:1,name:'vip2'},{id:2,name:'vip3'}],
                screenHeight:0,
            }
        },
        created: function () {
            utils.initIconFont();
            this.screenHeight = utils.fullScreen(136)+500;
            this.open()
        },
        components: {
            navbar
        },
        props: {
            title: {default: "设置"},
            complete:{ default:"完成"}
        },
        methods: {
            del:function (index) {
                let _this = this;
                _this.div.splice(index,1);
                event.toast('删除成功')
            },
            VIP:function(name) {
                var _this = this;
                for (var i=0;i<_this.vipDATA.length;i++) {
                    if (_this.vipDATA[i].name==name) {
                        return i;
                    }
                }
                return -1;
            },
            vipPicker:function() {
                var _this = this;
                var vp = [];
                for (var i=0;i<_this.vipDATA.length;i++) {
                    vp.push(_this.vipDATA[i].name);
                }

                return vp;
            },
//            设置会员等级
            select:function (num) {
                var _this = this;
                let vips = _this.vipPicker();
                picker.pick({
                    index:_this.VIP(num.vip),
                    items:vips
                },e => {
                    if (e.result == 'success') {
                        num.vip = vips[e.data];
                    };
                });
            },
            add:function () {
                this.div.push({amount:'',present:'0',vip:'VIP1'})
            },
            goback:function () {
                event.closeURL()
            },
            open:function () {
                var _this = this;
                GET('weex/member/topiccard/activity.jhtml',function (mes) {
                    if (mes.type == 'success') {
                        mes.data.forEach(function (item) {
                            _this.div.push(item)
                        })
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            goComplete:function () {
                var threedata = [];
                this.div.forEach(function(item,index){
                    if(item.amount != '' && item.amount != '0') {
                        threedata.push({
                            id: index,
                            amount: item.amount,
                            present: item.present,
                            vip: item.vip,
                        })
                    }else {
                        event.toast('金额不能为空')
                    }
                });
                 threedata = JSON.stringify(threedata);

                POST('weex/member/topiccard/activity.jhtml',threedata).then(
                    function (mes) {
                        if (mes.type == "success") {
                            event.toast('保存成功')
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast("网络不稳定");
                    }
                )
            }
        }
    }
</script>