<template>
    <div  class="bkg-primary">
        <navbar :title="title" :complete="complete" @goback="goback" border=false></navbar>
        <div class="shopstwo bkg-primary">
            <div class="deleteBoxTwo bkg-delete" @click="out()">
                <text class="deleteText">离职</text>
            </div>
            <div style="height: 475px;align-items: center" @swipe="onpanmove($event,index)" @touchstart="onFriendtouchstart($event,index)">
            <div  class="messageTwo " >
                <div  style="flex-direction: column;align-items: center">
                    <div class="shopNameDivthree">
                        <text style="font-size: 32px">{{name}}</text>
                    </div>
                    <div class="shopNameDivone">
                        <text style="font-size: 32px">所在店铺：</text>
                        <text style="font-size: 32px">{{shopName}}</text>
                    </div>
                    <div class="shopNameDivtwo">
                        <text style="font-size: 32px">职位：</text>
                        <text style="font-size: 32px">{{roleName}}</text>
                    </div>
                </div>
            </div>
            <div class="shopLogotwo" >
                <image style="width: 100px;height: 100px;border-radius: 100px"  class="img" :src="logo"></image>
            </div>
            </div>
        </div>
        <div style="background-color: #eeeeee" v-if="isOwner">
            <div class="head" @click="add" >
                <text class="clickAdd" >+点击添加商铺</text>
            </div>
        </div>
        <div class="outtwo bkg-primary"  @click="outtwo" v-else>
            <text style="font-size: 32px;color:#ffffff;">点我离职</text>
        </div>
        <noData :noDataHint="noDataHint" v-if="isEmpty()&&isOwner" :style="{minHeight:screenHeight + 'px'}"></noData>

        <list style="background-color: #eeeeee" v-if="isNoEmpty()&&isOwner" :scrollable="canScroll" @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
        <cell class="shops" v-for="(num,index) in lists" >
            <div class="deleteBox bkg-delete" @click="del(num.id,index)">
                <text class="deleteText">删除</text>
            </div>
            <div  class="message" @click="modification(num.id)" @swipe="onpanmove($event,index)" @touchstart="onFriendtouchstart($event,index)">
            <div class="shopLogo" >
                <image style="width: 250px;height: 200px;"  class="img" :src="num.thedoor "></image>
            </div>
            <div class="shopInformation">
                <div class="shopNameDiv">
                <text class="shopName">店铺名：</text>
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
            </div>
        </cell>
        </list>
        </div>


</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .message{
        flex-direction: row;
        align-items: center;
        width: 750px;
        background-color: white;
    }
    .messageTwo{
        background-color: white;
        width: 710px;
        height: 375px;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 50px;
        border-radius: 10px;
    }
    .deleteText{
        font-size: 32px;color: #fff;
    }
    .deleteBox{
        position: absolute;right: 0px;top: 0px;height: 230px;align-items: center;width: 130px;justify-content: center;
    }
    .deleteBoxTwo{
        position: absolute;right: 20px;top: 63px;height: 375px;align-items: center;width: 190px;justify-content: center;border-bottom-right-radius: 10px
    ;border-top-right-radius: 10px;
    }
    .head {
        background-color: white;
        border-width: 0px;
        border-radius: 10px;
        margin-bottom: 20px;
        margin-top: 20px;
        margin-right: 20px;
        margin-left: 20px;
        height: 80px;
        align-items: center;
        justify-content: center;

    }
    .outtwo {
        flex-direction: column;
        align-items: center;
        width:750px;
        height:80px;
    }
    .headtwo {
        background-color: white;
        border-width: 0px;
        border-radius: 10px;
        height: 80px;
        align-items: center;
        justify-content: center;

    }
    .clickAdd{
        font-size: 40px;
    }
    .shops{
        background-color: white;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        height: 230px;
    }
    .shopstwo{
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 500px;
    }
    .shopLogo{
        margin-left: 20px;
    }
    .shopLogotwo{
        height: 100px;
        width: 100px;
        border-radius: 50px;
        position: absolute;
        top: 0;
        left: 325px;
    }
    .shopInformation{
        /*justify-content: space-between;*/
        height: 230px;
        margin-left: 20px;
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
    .shopNameDiv{
        flex-direction: row;
        margin-top: 20px;
    }
    .shopNameDivthree{
        flex-direction: row;
        margin-top: 80px;
    }
    .shopNameDivone{
        flex-direction: row;
        margin-top: 40px;
    }
    .shopNameDivtwo{
        flex-direction: row;
        margin-top: 40px;
    }
    .shopAddressDiv{
        flex-direction: row;
        margin-top: 30px;
    }
    .concretely{
        width: 350px;
    }
</style>
<script>
import navbar from '../../../include/navbar.vue';
import {POST, GET} from '../../../assets/fetch';
import utils from '../../../assets/utils';
import filters from '../../../filters/filters';
import noData from '../../../include/noData.vue';
import {dom,event,animation} from '../../../weex.js';
const modal = weex.requireModule('modal');
var animationPara;//执行动画的消息

export default {
    data() {
        return {
            loading: false,
            refreshing : false,
            lists: [],
            run:[],
            isOwner:true,
            name:'',
            shopName:'',
            logo:'',
            roleName:'',
            canScroll:true,
            refreshImg:utils.locate('resources/images/loading.png'),
        }
    },
    components: {
        navbar,noData
    },
    props: {
        title: {default: "我的店铺"},
        noDataHint: { default: "尚未添加店铺"},
    },
    created() {
        utils.initIconFont();
        this.open(function () {});
        this.openTwo(function () {});
    },
    filters:{
        filterHead:function (value) {
            return utils.filterHead(value,250,200);
        },

    },
    methods:{
        modification:function (id) {
                    let _this =this;
                    event.openURL(utils.locate('view/shop/shop/newShop.js?shopId='+id),function (message) {
                        if(message.type == 'success'){
                            _this.onrefresh()
                        }
                    })
        },
        open:function () {
            let _this = this;
            GET('weex/member/shop/list.jhtml?pageStart=0&pageSize=500',function (mes) {
                if (mes.type == 'success') {
                    _this.lists = mes.data.data
                } else {
                    event.toast(res.content);
                }
            }, function (err) {
                event.toast(err.content)
            })
        },
        openTwo:function () {
            let _this = this;
            GET('weex/member/enterprise/view.jhtml',function (mes) {
                if (mes.type == 'success') {
                    _this.isOwner = mes.data.isOwner;
                    _this.logo = mes.data.logo;
                    _this.shopName =mes.data.shopName;
                    _this.name = mes.data.name;
                    _this.roleName =mes.data.roleName
                } else {
                    event.toast(res.content);
                }
            }, function (err) {
                event.toast(err.content)
            })
        },
        isNoEmpty:function() {
            return this.lists.length!=0;
        },
        isEmpty:function() {
            return this.lists.length==0;
        },
        //            上拉加载
        onloading (event) {
            this.open()
        },
//            下拉刷新
        onrefresh (event) {
            var _this = this;
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

        goback: function () {
            event.closeURL()
        },

        add:function () {
            let _this= this;
            event.openURL(utils.locate('view/shop/shop/newShop.js'),function (message) {

                if(message.type == 'success'){
                    _this.onrefresh()
                }
            })
        },
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
//        删除
        del:function (id,index) {
            let _this =this
            POST('weex/member/shop/delete.jhtml?shopId='+id).then(
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
        //        退出
        out:function (id,index) {
            let _this =this
            POST('weex/member/enterprise/delete.jhtml').then(
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
                        event.closeURL(mes)
                        } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast("网络不稳定");
                }
            )
        },
        outtwo:function (id,index) {
            let _this =this
            modal.confirm({
                message: '确认离职?',
                okTitle:'确认',
                cancelTitle:'取消',
                duration: 0.3
            }, function (value) {
                console.log(value);
                if(value == '确认'){
                    POST('weex/member/enterprise/delete.jhtml').then(
                        function (mes) {
                            if (mes.type == "success") {
                                event.toast('离职成功');
                                event.closeURL(mes)
                            } else {
                                event.toast(mes.content);
                            }
                        }, function (err) {
                            event.toast("网络不稳定");
                        }
                    )
                }
            })
        }
    }
}
</script>