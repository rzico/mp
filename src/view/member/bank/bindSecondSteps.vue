<template>
    <div style="background-color:#eeeeee">

            <navbar :title="title" :complete="complete" @goback="goback" > </navbar>

    <div class="big">
        <div class="inputA">
            <text class="textA">卡类型</text>
            <text class="textAA">{{cardname}}</text>
        </div>
        <div class="inputB">
            <text class="textB">手机号</text>
            <input class="input" type="number" placeholder="请输入手机号" :autofocus="true" value="" @input="telphone"/>
        </div>
        <div class="inputC">
            <text class="textID">证件号</text>
            <input class="input" type="text" placeholder="请输入证件号码" :autofocus="true" value="" @input="idcard"/>
        </div>
        <div class="textdiv">
            <text class="textC">同意</text>
            <text class="textD">《服务协定》</text>
        </div>
        <div class="button bkg-primary" @click=" goComplete">
            <text class="textE" >下一步</text>
        </div>
    </div>
        <div class="bottom">
            <text class="textF">资讯加密处理，仅用于银行验证</text>
        </div>
    </div>

</template>

<style lang="less" src="../../../style/wx.less"/>

<style>

    .inputA{
        flex-direction: row;
        background-color:#ffffff;
        margin-top: 30px;
        padding-left: 20px;
        height: 86px;
        border-style:solid;
        border-bottom-width:1px;
        border-top-width: 1px;
        border-color:#ccc;
        align-items:center;
    }
    .inputB{
        flex-direction: row;
        background-color: #ffffff;
        margin-top: 40px;
        padding-left: 20px;
        height: 86px;
        border-style:solid;
        border-bottom-width:1px;
        border-color:#ccc;
        align-items:center;
    }
    .inputC{
        flex-direction: row;
        background-color: #ffffff;
        margin-top: 40px;
        padding-left: 20px;
        height: 86px;
        border-style:solid;
        border-bottom-width:1px;
        border-color:#ccc;
        align-items:center;
    }
    .input{
        padding-left: 30px;
        font-size: 32px;
        line-height: 32px;
        width:550px;
        height: 80px;
    }
    .textdiv{
        flex-direction: row;
        padding-left: 20px;
        margin-top: 20px;
    }
    .button{
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 48px;
        height: 82px;
        align-items:center;
        justify-content: center;
        border-radius:15px;
    }
    .bottom{
        position: absolute;
        bottom:50px;
        align-items: center;
        justify-content: center;
        left: 0;
        right: 0;
    }
    .textA{
        font-size: 32px;
    }
    .textB{
        font-size: 32px;
    }
    .textID{
        font-size: 32px;
    }
    .textC{
        font-size: 28px;
        color:#cccccc;
    }
    .textD{
        font-size:28px;
        color:#0088fb;
    }
    .textE{
        font-size: 40px;
        color:#ffffff;

    }
    .textF{
        font-size: 28px;
        color:#cccccc;
    }
    .textAA{
        margin-left: 30px;
        font-size: 32px;
        color:#999;
    }
</style>

<script>
    const storage = weex.requireModule('storage');
    var event = weex.requireModule('event')
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import { POST, GET } from '../../../assets/fetch'

    export default {
        data(){
          return{
              txtInput:'',
              phone:'',
              idno:'',
              cardname:'',
              bankname:'',
              banknum:'',
              cardtype:'',
              bankimage:'',
              province:'',
              city:'',
                autofocus: false,
              clicked:false
          }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "填写银行卡资讯"},
        },
        created() {
            var _this=this;
            var two = utils.getUrlParameter('name');
            storage.getItem(two, e => {
//                event.toast(e);
                let twodata =  JSON.parse(e.data);
//                event.toast(threedata);
                _this.txtInput = twodata.cardNo;
                _this.accountName = twodata.name;
                storage.removeItem(two);
                _this.binding();
        });
//            this.txtInput= utils.getUrlParameter("txtInput");
        },
        methods: {
            binding:function(){
                var _this = this;
                event.encrypt(this.txtInput, function (message) {
                    if (message.type == "success") {
                        POST('weex/member/bankcard/query.jhtml?banknum=' +message.data).then(function (data) {
                                if (data.type == "success" && data.data != '') {
                                    _this.cardname = data.data.cardname;
                                    _this.bankname = data.data.bankname;
                                    _this.banknum = data.data.banknum;
                                    _this.cardtype = data.data.cardtype;
                                    _this.bankimage = data.data.bankimage;
                                    _this.province = data.data.province;
                                    _this.city =data.data.city;
                                } else {
                                    event.toast(data.content);
                                }
                            }, function (err) {
                                event.toast(err.content);
                            }
                        )
                    }
                    else {
                        event.toast(message.content);
                    }
                })
            },
            ready: function () {
                var self = this;
                setTimeout(function () {
                    self.autofocus = true;
                }, 1000);
            },
            telphone: function (event) {
                this.phone = event.value;
                console.log('telphone', event.value);
            },
            idcard:function (event) {
                this.idno = event.value;
                console.log('idcard', event.value);
            },
            goback: function () {
                event.closeURL()
            },
           goComplete: function () {
               if (this.clicked==true) {
                   return;
               }
               this.clicked = true;
                var _this=this;
               if (utils.isNull(this.phone)) {
                   modal.alert({
                       message: "请输入手机号",
                       okTitle: '知道了'
                   })
                   return;
               }
               if (this.phone.length!=11) {
                   modal.alert({
                       message: "请输入11位手机号",
                       okTitle: '知道了'
                   })
                   return;
               }
               if (utils.isNull(this.idno)) {
                   modal.alert({
                       message: "请输入证件号",
                       okTitle: '知道了'
                   })
                   return;
               }

               let  threedata = {
                    cardNo : this.txtInput,
                    mobile :this.phone,
                    identity:this.idno,
                    name:this.accountName,
                    cardname:this.cardname,
                    bankname:this.bankname,
                    banknum:this.banknum,
                    cardtype:this.cardtype,
                    bankimage:this.bankimage,
                    province:this.province,
                    city:this.city

                };
                threedata = JSON.stringify(threedata);
                storage.setItem('threenumber', threedata,e=>{
                    event.openURL (utils.locate('view/member/bank/bindThirdSteps.js?name=threenumber'), function (mes) {
                        if (mes.type=="success") {
                            event.closeURL(mes);
                        }
                        _this.clicked =false
                    })
                });

            }
    }
    }
</script>