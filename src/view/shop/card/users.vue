<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <list class="list" :scrollable="canScroll">
            <cell v-for="(c,index) in list">
                <div class="">
                    <div class="deleteBox" @click="del(c.id,index)">
                        <text class="deleteText">删除</text>
                    </div>
                    <div class="usersBox" @swipe="onpanmove($event,index)" @touchstart="onFriendtouchstart($event,index)" @click="setting(c.id)">
                        <image class="usersImg" :src="c.logo"></image>
                        <div class="ml20">
                            <text class="usersName" v-if="c.username != '' && c.username != null">{{c.username}}</text>
                            <text class="usersName" v-if="c.username == '' || c.username == null">{{c.nickName}}</text>
                            <text class="usersMaster" v-if="c.id == memberId">(卡主)</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .usersBox{
        background-color: white;
        height: 120px;
        padding-left: 30px;
        border-bottom-width: 1px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
    }
    .usersBox:active {
        background-color:#ccc;
    }
    .usersImg{
        height: 80px;
        width: 80px;
    }
    .usersName{
        font-size: 32px;
    }
    .usersMaster{
        font-size: 28px;
        color: #888888;
    }
    .deleteBox{
        position: absolute;right: 0px;top: 0px;height: 120px;align-items: center;width: 120px;justify-content: center;
        background-color: red;
    }
    .deleteText{
        font-size: 32px;
        color: white;
    }
</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import {dom,event,animation} from '../../../weex.js';
    import navbar from '../../../include/navbar.vue'
    import noData from '../../../include/noData.vue'
    import filters from '../../../filters/filters.js'
    var modal = weex.requireModule('modal')
    var animationPara;//执行动画的消息
    export default {
        data:function(){
            return{
                canScroll:true,
                list:[],
                cardId:'',
                memberId:''
            }
        },
        components: {
            navbar,noData
        },
        props: {
            title: { default: "授权用户" },
            noDataHint: { default: "尚未添加授权用户"},
        },
        created () {
//              页面创建时请求数据
            utils.initIconFont();
            this.cardId = utils.getUrlParameter('cardId');
            this.memberId = utils.getUrlParameter('memberId');
            this.open()
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            open(){
                var _this = this;
                GET('weex/member/card/users.jhtml?id='+this.cardId,function (res) {
                    if (res.type=="success") {
                        _this.list = res.data
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                })
            },
            setting:function (id) {
                if(id == this.memberId){
                    event.toast('该用户已经是卡主');
                    return
                }
                let _this = this;
                modal.confirm({
                    message: '是否设置该用户为卡主?',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '确定'){
                        POST('weex/member/card/cardowner.jhtml?cardId='+_this.cardId+'&memberId='+id).then(
                            function (data) {
                                if(data.type == 'success'){
                                    _this.open()
                                }else{
                                    event.toast(data.content);
                                }
                            },function (err) {
                                event.toast(err.content);
                            }
                        )
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
                            transform: 'translateX(-120)',
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
                if(id == this.memberId){
                    event.toast('卡主不能删除');
                    return
                }
                let _this =this
                POST('weex/member/card/userDelete.jhtml?cardId='+this.cardId+'&memberId='+id).then(
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
                            _this.list.splice(index,1);
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast("网络不稳定");
                    }
                )
            },
        },

    }
</script>