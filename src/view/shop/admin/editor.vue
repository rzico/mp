<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback"  > </navbar>
            <div style="background-color: white">
                <div class="cell-panel space-between">
                    <div class="flex-row">
                        <text class="title ml10">管理员工职位与所属店铺</text>
                    </div>
                    <div class="flex-row flex-end">

                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row">
                        <text class="title ml10">姓名</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{name}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}"></text>
                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row">
                        <text class="title ml10">联系方式</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{mobile}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}"></text>
                    </div>
                </div>
                <div class="cell-panel space-between" @click="popup()">
                    <div class="flex-row">
                        <text class="title ml10">设置店铺:</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{shopName}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between" @click="selectPosition()">
                    <div class="flex-row">
                        <text class="title ml10">设置职位:</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{roleName}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
        <div class="shareBox" v-if="isPopup">
            <div style="width: 750px;align-items: center;justify-content: center;height: 70px">
                <text class="fz30 " style="color: #444">选择所在店铺</text>
            </div>
            <list>
                <cell  class="message" v-for="num in shops" @click="allotment(num.id)">
                    <div class="shopLogo" >
                        <text class="shopCheck" :style="{fontFamily:'iconfont'}" v-if="storeId == num.id">&#xe64d;</text>
                        <image style="width: 150px;height: 150px;"  class="img" :src="num.thedoor "></image>
                    </div>
                    <div class="shopInformation">
                        <div class="shopNameDiv">
                            <text class="shopName">店名：</text>
                            <text class="fullName">{{num.name}}</text>
                        </div>
                        <div class="shopAddressDiv">
                            <text class="shopAddress">地址：</text>
                            <text class="concretely">{{num.address}}</text>
                        </div>
                        <div class="shopAddressDiv">
                            <text class="shopAddress">负责人：</text>
                            <text class="concretely">{{num.linkman}}</text>
                        </div>
                    </div>
                </cell>
            </list>
            <div class="cancelBox" @click="doCancel()">
                <text class="fz32">取消</text>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .headTitle{
        height: 50px;
        flex-direction: row;
        align-items: center;
        margin-left: 10px;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    /*店铺选择样式*/
    .shareBox{
        height:750px;
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
        border-width: 1px;
        border-color: #cccccc;
        background-color:#F5F4F5;
        position: fixed;
        bottom:0px ;
        left: 10px;
        right:10px
    }
    .message{
        flex-direction: row;
        align-items: center;
        width: 750px;
        background-color: white;
        border-color: #cccccc;
        border-bottom-width: 1px;
    }
    .shopLogo{
        margin-left: 20px;
        flex-direction: row;
        align-items: center;
    }
    .shopCheck {
        font-size: 48px;
        color: red;
    }
    .shopInformation{
        /*justify-content: space-between;*/
        height: 170px;
        margin-left: 20px;
    }
    .shopNameDiv{
        flex-direction: row;
        margin-top: 10px;
    }
    .shopAddressDiv{
        flex-direction: row;
        margin-top: 10px;
    }
    .shopName{
        font-weight: bold;
        font-size: 32px;
    }
    .fullName{
        font-size: 32px;
    }
    .shopAddress{
        font-weight: bold;
        font-size: 32px;
    }
    .concretely{
        font-size: 32px;
    }
    .cancelBox{
        width: 730px;align-items: center;height:100px;background-color: #eee;justify-content: center;
    }
</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    const modal = weex.requireModule('modal');
    const picker = weex.requireModule('picker');
    import {dom,event,animation} from '../../../weex.js';
    import navbar from '../../../include/navbar.vue';
    export default {
        components: {
            navbar,
        },
        data() {
            return {
                shops:[],
                roles:[{id:0,name:"4e"}],
                isPopup:false,
                storeId:'',
                id:'',
                shopId:'',
                shopName:'',
                roleName:'',
                mobile:'',
                roleId:''
            }
        },
        props: {
            title: {default: "员工设置"},
        },
        created() {
            this.id = utils.getUrlParameter('id');
            this.shopId = utils.getUrlParameter('shopId');
            this.shopName = utils.getUrlParameter('shopName');
            this.roleName = utils.getUrlParameter('roleName');
            this.mobile = utils.getUrlParameter('mobile');
            this.roleId = utils.getUrlParameter('roleId');
            this.name = utils.getUrlParameter('name');
            this.open();
            this.huoqu();
            this.openlist()
        },
        methods: {
            roleof:function(id) {
                var _this = this;
                for (var i=0;i<_this.roles.length;i++) {
                    if (_this.roles[i].id==id) {
                        return i;
                    }
                }
                return -1;
            },
            rolePicker:function() {
                var _this = this;
                var rs = [];
                for (var i=0;i<this.roles.length;i++) {
                    rs.push(_this.roles[i].name);
                }

                return rs;
            },
            //            店铺列表
            open:function () {
                let _this = this;
                GET('weex/member/shop/list.jhtml?pageStart=0&pageSize=500',function (mes) {
                    if (mes.type == 'success') {
                        _this.shops = mes.data.data
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
//            获取员工信息
            openlist:function () {
                var _this = this;
                GET('weex/member/admin/list.jhtml',function (mes) {
                    if (mes.type == 'success') {
                            _this.lists = mes.data.data;
                        } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            //            获取员工职位
            huoqu:function(){
                var _this = this;
                GET('weex/member/role/list.jhtml', function (mes) {
                    if (mes.type == 'success') {
                        _this.roles = mes.data;
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            //            选择职位
            selectPosition:function () {
                var _this = this;
                picker.pick({
                    index:_this.roleof(_this.roleId),
                    items:_this.rolePicker()
                }, e => {
                    if (e.result == 'success') {
                        POST('weex/member/admin/update.jhtml?id=' +_this.id+'&roleId='+_this.roles[e.data].id).then(
                            function (mes) {
                                if (mes.type == "success") {
                                    _this.lists.forEach(function(item){
                                        if (item.id==mes.data.id) {
                                            _this.roleId = mes.data.roleId;
                                            _this.roleName = mes.data.roleName;
                                        }
                                    })
                                } else {
                                    event.toast(mes.content);
                                }
                            }, function (err) {
                                event.toast("网络不稳定");
                            }
                        )
                    }
                })
            },
//            分配店铺
            allotment:function (id) {
                let _this =this;
                POST('weex/member/admin/update.jhtml?id='+_this.id+'&shopId='+id).then(
                    function (mes) {
                        if (mes.type == "success") {
                            _this.lists.forEach(function(item){
                                if (item.id==mes.data.id) {
                                    _this.shopName  = mes.data.shopName;
                                }
                            });
                            _this.isPopup =false;
                            modal.alert({
                                message: mes.content,
                                okTitle: '知道了'
                            })
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast("网络不稳定");
                    }
                )
            },
            //            触发店铺列表
            popup:function () {
                this.storeId = this.shopId
                if (this.isPopup==false) {
                    this.isPopup = true;
                }
            },
//            关闭店铺列表
            doCancel:function () {
                this.isPopup = false;
            },
            goback:function () {
                event.closeURL();
            },
        }
    }
</script>