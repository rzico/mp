<template>
    <scroller class="bkg-gray" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <div class="bgWhite addCorpus">
            <div class="lineStyle pr30" @click="addCorpus()">
                <text class="lineText">添加文集</text>
                <text  :style="{fontFamily:'iconfont'}" class="gray" style="font-size: 25px;">&#xe630;</text>
            </div>
        </div>
        <!--文集行背景-->
        <div class="bgWhite" @click="chooseCorpus(0,'全部文章')">
            <!--文集行内容-->
            <div class="lineStyle bottomBorder">
                <!--左侧文集名称-->
                <div class="flex-row">
                    <text class="lineText">全部文章</text>
                    <text class="lineText">({{allTotal}})</text>
                </div>
                <div v-if="corpusId == 0" >
                    <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                </div>
            </div>
        </div>
        <!--绑定动画-->
        <transition-group name="paraTransition" tag="div">
            <!--文集行背景-->
            <div class="bgWhite " v-for="(item,index) in corpusList" :key="index"   @click="chooseCorpus(item.id,item.name)">
                <!--文集行内容-->
                <div class="lineStyle bottomBorder">
                    <!--左侧文集名称-->
                    <div class="flex-row" style="width: 450px;" >
                        <text class="lineText limitWidth"  >{{item.name}}</text>
                        <text class="lineText">({{item.count}})</text>
                    </div>
                    <div v-if="corpusId == item.id" >
                        <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                    </div>
                </div>
            </div>
        </transition-group>
    </scroller>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .limitWidth{
        text-overflow: ellipsis;
        max-width: 400px;
        lines:1;
    }
    .paraTransition-enter-active, .paraTransition-leave-active {
        transition: all 0.2s;
    }
    .paraTransition-enter{
        transform: translateY(-300px);
        opacity: 1;
    }
    .paraTransition-enter-to{
        transform: translateY(0px);
        opacity: 1;
    }
    .pr30{
        padding-right: 30px;
    }
    .bottomBorder{
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
    }
    .lineStyle{
        height:100px;
        align-items: center;
        justify-content: space-between;
        padding-right: 30px;
        margin-left: 30px;
        flex-direction: row;
    }
    .bgWhite{
        background-color: #fff;
    }
    .addCorpus{
        margin-top: 35px;
        margin-bottom: 15px;
    }
    .lineText{
        font-size: 32px;
    }
</style>
<script>
    import {dom,event,stream,storage} from '../../../weex.js';
    import utils from '../../../assets/utils.js';
    import { POST, GET } from '../../../assets/fetch';
    import navbar from '../../../include/navbar.vue';
    const animation = weex.requireModule('animation');
    const modal = weex.requireModule('modal');

    export default {
        data:function () {
            return{
                allTotal:69,
                corpusList:[],
                corpusId:0,
                corpusName:'全部文章'
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "选择文集"},
        },
        created(){
            var _this = this;
            utils.initIconFont();
            this.getCorpus();
            this.corpusId = utils.getUrlParameter('corpusId');
        },
        methods:{
            goback(){
                var _this = this;
                this.corpusList.forEach(function (item) {
                    if(item.corpusId == _this.corpusId){
                        _this.corpusName = item.name;
                    }
                })
                let E = {
                    corpusId : this.corpusId,
                    corpusName : this.corpusName
                }
                let backData = utils.message('success','成功',E);
                event.closeURL(backData);
            },
//            添加文集
            addCorpus(){
                let _this = this;
                modal.prompt({
                    message: '新建文集',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                    placeholder:'输入文集名'
                }, function (value) {
                    if(value.result == '确定'){
                        if(value.data == '' || value.data == null ){
                            modal.toast({message:'请输入文集名',duration:1})
                        }else{
                            let orders = _this.corpusList.length + 1;
                            value.data = encodeURI(value.data);
//                            向服务器存入文集名称
                            POST('weex/member/article_catalog/add.jhtml?name=' + value.data + '&orders=' + orders).then(
                                function (res) {
                                    if(res.type == 'success' && res.data != ''){
                                        _this.corpusList.push({
                                            name:res.data.name,
                                            total:0,
                                            bgChange:false,
                                            id:res.data.id,
                                        });
                                    }else{
                                        event.toast(res.content);
                                    }
                                },function (err) {
                                    event.toast(err);
                                }
                            )
                        }
                    }
                })
            },
//            向服务器获取文集名称
            getCorpus:function () {
                var _this = this;
                GET('weex/member/article_catalog/list.jhtml',function (data) {
                    if (data.type == "success") {
                        if(data.data == ''){
                        }else{
                            _this.corpusList = [];
//                                将文集名循环插入数组中
                            for(let i = 0; i<data.data.length;i++){
                                _this.corpusList.splice(1 + i,0,data.data[i]);
                            }
                        }
                    } else {
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })

            },
//            更改文集后
            chooseCorpus:function (id,name) {
                this.corpusId = id;
                this.corpusName = name;
                let E = {
                    corpusId : this.corpusId,
                    corpusName : this.corpusName
                }
                let backData = utils.message('success','成功',E);
                event.closeURL(backData);
            }
        }
    }
</script>