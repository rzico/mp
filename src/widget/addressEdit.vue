<template>
    <div class="wrapper bgWhite" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <div class="addressBox" >
            <div class="name">
                <div class="leftWidth">
                    <text class="font-size " >收货人</text>
                </div>
                <input class="input pll54" type="text" v-model="name" placeholder="姓名" maxlength="6" autofocus="true" />
            </div>
            <div class="tel">
                <div class="leftWidth">
                    <text class="font-size ">联系方式</text>
                </div>
                <input class="input" type="number" maxlength="11"  v-model="number" placeholder="手机号码"/>
            </div>
            <div class="region" @click="chooseArea()">
                <div class="flex-row">
                    <text class="font-size ">地区信息</text>
                    <text class="font-size pl20" >{{regionName}}</text>
                </div>
                <div>
                    <text class="arrow primary fz40"  :style="{fontFamily:'iconfont'}">&#xe792;</text>
                </div>
            </div>
            <div class="adress">
                <div class="leftWidth">
                    <text class="font-size ">详细地址</text>
                </div>
                <input class="input" type="text" placeholder="街道、楼牌号等" maxlength="30" v-model="address" />
            </div>
            <div class="isDefault">
                <text class="font-size ">是否默认</text>
                <div class="xiaoyuan" :style="yesColor()" @click="yes()"></div><text  @click="yes()" class="font-size">是</text>
                <div class="xiaoyuan" :style="noColor()" @click="no()"></div><text @click="no()" class="font-size">否</text>
            </div>
        </div>
        <div class="bottomBox bkg-primary" @click="activateConfirm()">
            <text class="bottomButton" >保存</text>
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>
    .pll54{
        padding-left: 36px;
    }
    .bottomBox{
        /*margin-top: 10px;*/
        /*width:90%;*/
        /*margin-left: 5%;*/
        margin-top:20px;
        width:720px;
        margin-left:15px;
        height:80px;
        display: flex;
        flex-direction: row;
        /*justify-content: space-between;*/
        justify-content:center;

        align-items: center;
    }
    .bottomButton{
        /*padding: 10px 0;*/
        /*display: inline-block;*/
        /*width:200px;*/
        /*border: 1px solid #eee;*/
        color:#fff;
        font-size: 32px;
        /*text-align: center;*/
        line-height: 32px;
        /*border-radius:5px;*/
    }
    .addAdressText{
        font-size: 36px;
        font-weight: 600px;
    }
    /*.topBox{*/
    /*height:90px;*/
    /*width:750px;*/
    /*padding-left: 10px;*/
    /*padding-right: 10px;*/
    /*box-sizing: border-box;*/
    /*display: flex;*/
    /*justify-content: flex-start;*/
    /*align-items: center;*/
    /*border-bottom: 1px solid #eee;*/
    /*}*/
    .addressBox{
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
    }
    .leftWidth{
        /*width: 120px !important;*/
        /*min-width: 70px !important;*/
    }
    .name{
        background-color: #ffffff;
        height: 90px;
        padding-left: 10px;
        padding-right: 10px;
        border-bottom-width:1px;
        border-color: #eee;
        border-style: solid;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .tel{
        background-color: #ffffff;
        height: 90px;
        padding-left: 10px;
        padding-right: 10px;
        border-bottom-width:1px;
        border-color: #eee;
        border-style: solid;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .region{
        background-color: #ffffff;
        height: 90px;
        padding-left: 10px;
        padding-right: 10px;
        border-bottom-width:1px;
        border-color: #eee;
        border-style: solid;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .adress{
        background-color: #ffffff;
        height: 90px;
        padding-left: 10px;
        padding-right: 10px;
        border-bottom-width:1px;
        border-color: #eee;
        border-style: solid;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .isDefault{
        background-color: #ffffff;
        border-bottom: 1px solid #eee;
        height: 90px;
        padding-left: 20px;
        padding-right: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .xiaoyuan{
        height: 32px;
        width: 32px;
        border-radius:16px;
        border-color: #888888;
        border-width:1px;
        border-style:solid;
        margin-left: 10px;
        margin-right: 5px;
    }
    .button{
        height: 80px;
        border-radius: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        margin-right: 20px;
        margin-left: 20px;
    }
    .button .span{
        font-size: 32px;
    }
    .input{
        width: 530px;
        margin-left: 20px;
        height:90px;
        line-height:32px;
        font-size: 32px;
        border-style:none
    }
    .font-size{
        font-size: 32px;
    }
    .flex-row{
        display: flex;
        flex-direction: row;
    }
</style>
<script>
    import navbar from '../include/navbar.vue';
    import {dom,event} from '../weex.js'
    import { POST, GET } from '../assets/fetch.js';
    import utils from '../assets/utils';
    import filters from '../filters/filters.js';
    export default {
        data() {
            return {
//        此id为收货地址列表id
                id:'',
                citycontrol:this.control,
                name:'',
                number:'',
                regionId:'',
                regionName:'',
                address:'',
                isDefault:true,
                ismask:false
            }
        },
        components: {
            navbar,
        },
        props:{
            title:{default:'编辑地址'}
        },
        filters: {

        },
        created() {
            var c = utils.getUrlParameter('addressData');
            this.id = utils.getUrlParameter('id');
            c =JSON.parse(decodeURIComponent(c));
            if(!utils.isNull(this.id)) {
                this.name = c.consignee;
                this.number = c.phone;
                this.regionName = c.areaName;
                this.regionId = c.areaId;
                this.address = c.address;
                this.isDefault = c.default
            }else{
                this.title = '新增地址'
            }
        },
        methods: {
            chooseArea:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('widget/city.js?type=0'),function (data) {
                    _this.clicked = false;
                    if(data.type == 'success' && !utils.isNull(data.data) ){
                        _this.regionId = data.data.chooseId;
                        _this.regionName = data.data.name;
                    }
                })
            },
//            cityname:function (data,mes) {
//                this.regionName = data;
//                this.regionId = mes;
//                this.citycontrol =false
//                this.ismask = false
//            },
            yesColor:function () {
                if(this.isDefault == true){
                    return {backgroundColor:'#5eb0fd'}
                }else{
                    return {backgroundColor:'#ffffff'}
                }
            },
            noColor:function () {
                if(this.isDefault == false){
                    return {backgroundColor:'#5eb0fd'}
                }else{
                    return {backgroundColor:'#ffffff'}
                }
            },
            yes:function () {
                this.isDefault = true;
            },
            no:function () {
                this.isDefault = false;
            },
            activateConfirm:function () {
                if(this.name == ''){
                    event.toast('请填写收货人')
                }else if(this.number == ''){
                    event.toast('请填写手机号码')
                }else if(this.regionName == ''){
                    event.toast('请选择收货区域')
                }else if(this.address == ''){
                    event.toast('请填写收货地址')
                }else {
                    var _this = this;
//                    id为空为创建，不为空走修改接口
                    if(utils.isNull(this.id)){
                        POST('website/member/receiver/add.jhtml?areaId=' + this.regionId + '&address=' + encodeURIComponent(this.address) + '&consignee=' + encodeURIComponent(this.name) + '&phone=' + this.number + '&isDefault=' + this.isDefault).then(
                            function (res) {
                                if (res.type == "success") {
                                    event.toast('添加成功');
                                    event.closeURL(res);
                                } else {
                                    evet.toast(res.content);
                                }
                            }, function (err) {
                                evet.toast(err.content);
                            })
                    }else{
                        POST('website/member/receiver/update.jhtml?id='+this.id+'&areaId=' + this.regionId + '&address=' + encodeURIComponent(this.address) + '&consignee=' + encodeURIComponent(this.name) + '&phone=' + this.number + '&isDefault=' + this.isDefault).then(
                            function (res) {
                                if (res.type == "success") {
                                    event.toast('修改成功');
                                    event.closeURL(res);
                                } else {
                                    evet.toast(res.content);
                                }
                            }, function (err) {
                                evet.toast(err.content);
                            })
                    }
                }

            },
//      对话框取消选择地址 取消按钮
            closeConfirm:function () {
                this.$refs.addressAdd.close();
            },
            close:function () {
                this.isShow = false;
            },
            goback:function () {
                event.closeURL();
            }
        }
    }
</script>

