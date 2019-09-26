<template>
    <div class="wrapper">
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="setting" > </navbar>
        <noData :noDataHint="noDataHint" v-if="isEmpty()"></noData>
        <list  class="list" v-if="isNoEmpty()" :scrollable="canScroll" @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
                <cell v-for="(num,index) in lists" >
                    <!--如果店铺名重复，则不渲染该区域-->
                    <div class="headShopName" v-if="isRepeat(index)" @click="isScaling(num.shopName)">
                        <div style="flex-direction: row;align-items: center">
                        <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe6ab;</text>
                        <text class="name">{{num.shopName}}</text>
                        </div>
                        <text class="xiajiantou" :style="{fontFamily:'iconfont'}">&#xe601;</text>
                    </div>
                    <div v-if="num.isShow">
                    <div class="deleteBox bkg-delete" @click="del(num.id,index)">
                        <text class="deleteText">删除</text>
                    </div>
                    <div class="addFriendsBorder" @click="goeditor(num.id,num.shopId,num.shopName,num.roleName,num.mobile,num.roleId,num.name)" @swipe="onpanmove($event,index)" @touchstart="onFriendtouchstart($event,index)">
                        <div class="friendsLine">
                            <div style="flex-direction: row;justify-content: space-between;align-items:center;width:710px">
                            <div class="friendsName">
                                <text class="lineTitle ">{{num.name}}:{{num.mobile}}</text>
                                <text class="realName">店铺:{{num.shopName}}</text>
                                <text class="realName">职位:{{num.roleName}}</text>
                            </div>
                            <text class="youjiantou" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                            </div>
                        </div>
                        <!--<div class="bottomBotton">-->
                            <!--<div class="button" @click="popup(num.id,num.shopId)">-->
                                <!--<text style="color:#ffffff;font-size: 30px">设置店铺</text>-->
                            <!--</div>-->
                            <!--<div class="button"@click="selectPosition(num.id,num.shopId,num.roleId)">-->
                                <!--<text style="color:#ffffff;font-size: 30px">设置职位</text>-->
                            <!--</div>-->
                        <!--</div>-->
                    </div>
                    </div>
                </cell>
            <cell>
                <div style="height: 300px"></div>
            </cell>
        </list>
        <div class="codeBox bkg-primary button-bkg-img" @click="scan">
            <text class="codeText" >扫码添加员工</text>
        </div>
        <!--<div class="shareBox" v-if="isPopup">-->
            <!--<div style="width: 750px;align-items: center;justify-content: center;height: 70px">-->
                <!--<text class="fz30 " style="color: #444">选择所在店铺</text>-->
            <!--</div>-->
            <!--<list>-->
                <!--<cell  class="message" v-for="num in shops" @click="allotment(num.id)">-->
                    <!--<div class="shopLogo" >-->
                        <!--<text class="shopCheck" :style="{fontFamily:'iconfont'}" v-if="storeId == num.id">&#xe64d;</text>-->
                        <!--<image style="width: 150px;height: 150px;"  class="img" :src="num.thedoor "></image>-->
                    <!--</div>-->
                    <!--<div class="shopInformation">-->
                        <!--<div class="shopNameDiv">-->
                            <!--<text class="shopName">店名：</text>-->
                            <!--<text class="fullName">{{num.name}}</text>-->
                        <!--</div>-->
                        <!--<div class="shopAddressDiv">-->
                            <!--<text class="shopAddress">地址：</text>-->
                            <!--<text class="concretely">{{num.address}}</text>-->
                        <!--</div>-->
                        <!--<div class="shopAddressDiv">-->
                            <!--<text class="shopAddress">负责人：</text>-->
                            <!--<text class="concretely">{{num.linkman}}</text>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</cell>-->
            <!--</list>-->
            <!--<div class="cancelBox" @click="doCancel()">-->
                <!--<text class="fz32">取消</text>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .headShopName{
        height: 100px;
        width: 750px;
        padding-left: 20px;
        padding-right: 10px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: rgba(153,153,153,0.2);
    }
     .name{
        font-size: 32px;
        margin-left: 20px;
         font-weight: bold;
    }
     .youjiantou{
         color: #cccccc;
         font-size: 40px;
     }
    .xiajiantou{
        color:#ccc;
        font-size: 60px;
    }
    /*.bottomBotton{*/
        /*flex-direction: row;justify-content: flex-end;align-items:flex-end;*/
        /*padding-right: 30px;*/
    /*}*/
    /*.button {*/
        /*margin-top: 10px;*/
        /*margin-bottom: 10px;*/
        /*margin-right: 20px;*/
        /*border-width: 1px;*/
        /*border-radius: 5px;*/
        /*border-color: #ccc;*/
        /*padding-left: 10px;*/
        /*padding-right: 10px;*/
        /*padding-top: 10px;*/
        /*padding-bottom: 10px;*/
        /*background-color:#EB4E40;*/
        /*height:50px;*/
        /*line-height: 50px;*/
        /*align-items: center;*/
        /*justify-content: center;*/
    /*}*/

    /*.cancelBox{*/
        /*width: 730px;align-items: center;height:100px;background-color: #eee;justify-content: center;*/
    /*}*/
    /*.shareBox{*/
        /*height:750px;*/
        /*border-top-right-radius: 15px;*/
        /*border-top-left-radius: 15px;*/
        /*border-width: 1px;*/
        /*border-color: #cccccc;*/
        /*background-color:#F5F4F5;*/
        /*position: fixed;*/
        /*bottom:0px ;*/
        /*left: 10px;*/
        /*right:10px*/
    /*}*/
    /*.shopInformation{*/
        /*!*justify-content: space-between;*!*/
        /*height: 170px;*/
        /*margin-left: 20px;*/
    /*}*/
    /*.shopNameDiv{*/
        /*flex-direction: row;*/
        /*margin-top: 10px;*/
    /*}*/
    /*.shopAddressDiv{*/
        /*flex-direction: row;*/
        /*margin-top: 10px;*/
    /*}*/
    /*.shopName{*/
        /*font-weight: bold;*/
        /*font-size: 32px;*/
    /*}*/
    /*.shopCheck {*/
        /*font-size: 48px;*/
        /*color:red;*/
    /*}*/
    /*.fullName{*/
        /*font-size: 32px;*/
    /*}*/
    /*.shopAddress{*/
        /*font-weight: bold;*/
        /*font-size: 32px;*/
    /*}*/
    /*.concretely{*/
        /*font-size: 32px;*/
    /*}*/
    /*.message{*/
        /*flex-direction: row;*/
        /*align-items: center;*/
        /*width: 750px;*/
        /*background-color: white;*/
        /*border-color: #cccccc;*/
        /*border-bottom-width: 1px;*/
    /*}*/
    /*.shopLogo{*/
        /*margin-left: 20px;*/
        /*flex-direction: row;*/
        /*align-items: center;*/
    /*}*/
    .deleteText{
        font-size: 32px;color: #fff;
    }
    .deleteBox{
        position: absolute;right: 0px;top: 0px;height: 160px;align-items: center;width: 130px;justify-content: center;
    }
    .iconfont{
        color: #cccccc;
        margin-top: 5px;
        margin-right: 20px;
        font-size: 28px;
    }
    .codeBox{
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 690px;
        height: 84px;
        border-radius: 42px;
        position: fixed;
        bottom: 40px;
        left: 30px;
    }
    .codeText{
        font-size:35px;
        color: #ffffff;
    }
    .list {
        background-color: white;
    }

    .friendsName{
        height:130px;
        justify-content: space-between;
    }
    .realName{
        color: #888;
        font-size: 30px;
        margin-left: 20px;
    }
    .friendsImage{
        margin-top: 20px ;
        height: 80px;
        width:80px;
    }
    .image{
        height: 100px;
        width: 100px;
    }
    .addFriendsBorder{
        border-bottom-width: 1px;
        border-style: solid;
        border-color: rgba(153,153,153,0.2);
        justify-content: space-between;
        flex-direction: column;
    }
    .friendsLine{
        padding-left: 30px;
        height:160px;
        background-color: #fff;
        flex-direction: row;
    }
    .lineTitle{
        font-size: 34px;
        margin-left: 20px;
        lines:1;
        text-overflow: ellipsis;
        max-width: 450px;
    }

</style>

<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import filters from '../../../filters/filters'
    const modal = weex.requireModule('modal');
    const picker = weex.requireModule('picker');
    import {dom,event,animation} from '../../../weex.js';
    import navbar from '../../../include/navbar.vue';
    import search from '../../../include/search.vue';
    import noData from '../../../include/noData.vue';
    var he = require('he');
    var animationPara;//执行动画的消息
    export default {
        components: {
            navbar,search,noData
        },
        data() {
            return   {
                start:0,
                refreshing:false,
                showLoading:false,
                lists:[],
                shops:[],
                roles:[{id:0,name:"4e"}],
                pageSize:10,
                pageStart:0,
                code:'',
                id:'',
                isPopup:false,
//                点击弹窗获取的员工id存入此变量
                memberId:'',
                positionId:0,
                position:'',
                storeId:'',
                canScroll:true,
                refreshImg:utils.locate('resources/images/loading.png'),
            }
        },
        props: {
            title: { default: "员工"},
            noDataHint: { default: "尚未添加员工"},
        },
        created() {
            utils.initIconFont();
            this.open();
        },

        filters:{

        },
        methods: {
            //判断所属店铺是否重复
            isRepeat(index){
                if(index != 0){
                    if((this.lists[index].shopName) == (this.lists[index - 1].shopName)){
                        return false;
                    }
                }
                return true;
            },
//            控制店铺伸缩
            isScaling:function(shopName){
                this.lists.forEach(function (item) {
                    if(item.shopName == shopName){
                        item.isShow = !item.isShow
                    }
                })
            },
//            roleof:function(id) {
//                var _this = this;
//              for (var i=0;i<_this.roles.length;i++) {
//                  if (_this.roles[i].id==id) {
//                      return i;
//                  }
//              }
//              return -1;
//            },
//            rolePicker:function() {
//                var _this = this;
//                var rs = [];
//                for (var i=0;i<this.roles.length;i++) {
//                   rs.push(_this.roles[i].name);
//                }
//
//                return rs;
//            },
////            获取员工职位
//            huoqu:function(){
//                var _this = this;
//                GET('weex/member/role/list.jhtml', function (mes) {
//                    if (mes.type == 'success') {
//                        _this.roles = mes.data;
//                    } else {
//                        event.toast(mes.content);
//                    }
//                }, function (err) {
//                    event.toast(err.content)
//                })
//            },
////            选择职位
//            selectPosition:function (id,shopId,roleId) {
//                var _this = this;
//                picker.pick({
//                    index:_this.roleof(roleId),
//                    items:_this.rolePicker()
//                }, e => {
//                    if (e.result == 'success') {
//                        POST('weex/member/admin/update.jhtml?id=' +id+'&shopId='+shopId+'&roleId='+_this.roles[e.data].id).then(
//                            function (mes) {
//
//                                if (mes.type == "success") {
//                                    _this.lists.forEach(function(item){
//                                        if (item.id==mes.data.id) {
//                                            item.roleId = mes.data.roleId;
//                                            item.roleName = mes.data.roleName;
//                                        }
//                                    })
//                                } else {
//                                    event.toast(mes.content);
//                                }
//                            }, function (err) {
//                                event.toast("网络不稳定");
//                            }
//                        )
//                    }
//                })
//            },
////            分配店铺
//            allotment:function (id) {
//                let _this =this;
//
//                POST('weex/member/admin/update.jhtml?id='+_this.memberId+'&shopId='+id).then(
//                    function (mes) {
//                        if (mes.type == "success") {
//                            _this.lists.forEach(function(item){
//                                if (item.id==mes.data.id) {
//                                    item.shopName  = mes.data.shopName;
//                                }
//                            });
//                            _this.onrefresh()
//                            _this.isPopup =false;
//                            modal.alert({
//                                message: mes.content,
//                                okTitle: '知道了'
//                            })
//                        } else {
//                            event.toast(mes.content);
//                        }
//                    }, function (err) {
//                        event.toast("网络不稳定");
//                    }
//                )
//            },
            onpanmove:function (e,index) {
//                获取当前点击的元素。
                var _this = this;
                if(e.direction == 'right'){
                    _this.canScroll = false;
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    },function () {
                        _this.canScroll = true;
                    })
                }else if(e.direction == 'left'){
                    _this.canScroll = false;
//                  modal.toast({message:distance});
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(-190)',
                        },
                        duration:350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    },function () {
                        _this.canScroll = true;
                    })
                }
            },
            //            点击屏幕时
            onFriendtouchstart:function (e,index) {
                var _this = this;
                if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                }else{
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    })
                }
//                获取当前点击的元素。
                animationPara =  e.currentTarget;
            },
            del:function (id,index) {
                let _this =this
                POST('weex/member/admin/delete.jhtml?id='+id).then(
                    function (mes) {
                        if (mes.type == "success") {
                            //                            把动画收回来。
                            if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                            }else{
                                animation.transition(animationPara, {
                                    styles: {
                                        transform: 'translateX(0)',
                                    },
                                    duration: 10, //ms
                                    timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                                    needLayout:false,
                                    delay: 0 //ms
                                })
                            }
                            _this.lists.splice(index,1);
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast("网络不稳定");
                    }
                )
            },
            open:function () {
                var _this = this;
                GET('weex/member/admin/list.jhtml?pageStart='+this.pageStart +'&pageSize='+this.pageSize,function (mes) {
                if (mes.type == 'success') {
                    if (_this.pageStart==0) {
                        mes.data.data.forEach(function(item){
                            item.isShow = true
                            if(item.shopName == '未分配'){
                                item.shopName ='请分配店铺'
                            }
                        });
                        _this.lists = mes.data.data;
                    } else {
                        mes.data.data.forEach(function(item){
                            item.isShow = true
                            if(item.shopName == '未分配'){
                                item.shopName ='请分配店铺'
                            }
                            _this.lists.push(item);
                        })
                    }
                    _this.pageStart = mes.data.start+mes.data.data.length;
                } else {
                    event.toast(mes.content);
                }
            }, function (err) {
                event.toast(err.content)
            })
    },
////            店铺列表
//            openTwo:function () {
//                let _this = this;
//                GET('weex/member/shop/list.jhtml?pageStart=0&pageSize=500',function (mes) {
//                    if (mes.type == 'success') {
//                        _this.shops = mes.data.data
//                    } else {
//                        event.toast(res.content);
//                    }
//                }, function (err) {
//                    event.toast(err.content)
//                })
//            },
////            触发店铺列表
//            popup:function (id,shopId) {
//                this.memberId = id;
//                this.storeId = shopId
//                if (this.isPopup==false) {
//                    this.isPopup = true;
//                }
//            },
////            关闭店铺列表
//            doCancel:function () {
//                this.isPopup = false;
//            },
//            触发自组件的二维码方法
            scan:function () {
                let _this=this
                event.scan(function (message) {
                    utils.readScan(message.data,function (data) {
                        if(data.data.type == '865380'){
                            _this.code =data.data.code
                            POST('weex/member/admin/add.jhtml?code='+_this.code).then(
                                function (mes) {
                                if (mes.type == 'success') {
                                    _this.lists.splice(0,0,mes.data);
                                    modal.alert({
                                        message: mes.content,
                                        okTitle: '知道了'
                                    })
                                } else {
                                    event.toast(mes.content);
                                }
                            }, function (err) {
                                event.toast(err.content)
                            })
                        }
                    })

                });
            },
            isNoEmpty:function() {
                return this.lists.length!=0;
            },
            isEmpty:function() {
                return this.lists.length==0;
            },
            onloading (event) {
                this.open();
            },
//            下拉刷新
            onrefresh (event) {
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
                })
                setTimeout(() => {
                    animation.transition(_this.$refs.refreshImg, {
                        styles: {
                            transform: 'rotate(0)',
                        },
                        duration: 10, //ms
                        timingFunction: 'linear',//350 duration配合这个效果目前较好
                        needLayout:false,
                        delay: 0 //ms
                    })
                    this.refreshing = false
                    _this.open();
                }, 1000)
            },
            goback:function () {
                event.closeURL();
            },

            goeditor:function (id,shopId,shopName,roleName,mobile,roleId,name) {
                let _this =this
                event.openURL(utils.locate('view/shop/admin/editor.js?id='+id+'&shopId='+shopId+'&shopName='+encodeURI(shopName)+'&roleName='+encodeURI(roleName)+'&mobile='+mobile+'&roleId='+roleId+'&name='+encodeURI(name)), function (message) {
                        _this.onrefresh()
                })
            },

        }
    }
</script>
