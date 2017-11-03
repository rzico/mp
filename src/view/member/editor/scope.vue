<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller" show- show-scrollbar="false">
            <div class="cell-row-row cell-line mt50 cell-bottom-clear" @click="checkChange(0)">
                <div class="cell-panel-column  cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">公开</text>
                    </div>
                    <div class="flex-row ">
                        <text class="sub_title ml10">所有人可见,且录入个人专栏</text>
                    </div>
                </div>
                <div v-if="checkId == 0" >
                    <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                </div>
            </div>
            <div class="cell-row-row cell-line mt0 cell-bottom-clear" @click="checkChange(1)">
                <div class="cell-panel-column  cell-clear">
                    <div class="flex-row">
                        <text class="title ml10 cell-bottom-clear">不公开</text>
                    </div>
                    <div class="flex-row ">
                        <text class="sub_title ml10">自行控制分享范围,仅被分享的人可见</text>
                    </div>
                </div>
                <div v-if="checkId == 1" >
                    <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                </div>
            </div>
            <div class="cell-row-row cell-line mt0 cell-bottom-clear" @click="checkChange(2)">
                <div class="cell-panel-column  cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">加密</text>
                    </div>
                    <div class="flex-row ">
                        <text class="sub_title ml10">设置一个密码,凭密码访问</text>
                    </div>
                </div>
                <div v-if="checkId == 2">
                    <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                </div>
            </div>
            <div class="cell-row-row cell-line mt0 " @click="checkChange(3)">
                <div class="cell-panel-column  cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">私密</text>
                    </div>
                    <div class="flex-row ">
                        <text class="sub_title ml10">仅自己可见</text>
                    </div>
                </div>
                <div v-if="checkId == 3">
                    <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                </div>
            </div>
        </scroller>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
</style>
<script>
    import {dom,event,stream,storage} from '../../../weex.js'
    import navbar from '../../../include/navbar.vue'
    import utils from '../../../assets/utils'
    const modal = weex.requireModule('modal');
    export default {
        data(){
            return{
                checkId:0,
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "谁可以看" }
        },
        created(){
            this.checkId = utils.getUrlParameter('checkId');
        },
        methods: {
            goback: function (e) {
                let E = {
                    checkId : this.checkId
                }
                let backData = utils.message('success','成功',E);
                event.closeURL(backData);
            },
            setup: function (e) {

            },
            checkChange:function (id) {
                var _this = this;
                if(id == 2){
                    let _this = this;
                    modal.prompt({
                        message: '修改密码',
                        duration: 0.3,
                        okTitle:'确定',
                        cancelTitle:'取消',
                        placeholder:'输入4位数字密码'
                    }, function (value) {
                        if(value.result == '确定'){
                            if(value.data == '' || value.data == null ){
                                modal.toast({message:'请输入密码',duration:1})
                            }else{
                                if(value.data.length != 4){
                                    modal.toast({message:'密码必须为4位数数字',duration:1})
                                }else{
                                    _this.checkId = id;
                                    let E = {
                                        checkId : _this.checkId,
                                        password: value.data
                                    }
                                    let backData = utils.message('success','成功',E);
                                    event.closeURL(backData);
                                }
                            }
                        }
                    })
                }else{
                    this.checkId = id;
                    let E = {
                        checkId : this.checkId
                    }
                    let backData = utils.message('success','成功',E);
                    event.closeURL(backData);
                }
            }
        }
    }
</script>