<template>
    <div  class="wrapper">
        <navbar :title="title"  @goback="goback" :complete="complete" :showComplete="showSort"  @goComplete="cleanbgChange"> </navbar>
        <scroller >
            <div class="bgWhite addCorpus">
                <div class="lineStyle pr30" @click="addCatagory()">
                    <text class="lineText">添加策略</text>
                    <text  :style="{fontFamily:'iconfont'}" class="gray" style="font-size: 25px;">&#xe630;</text>
                </div>
            </div>
            <!--分类行背景-->
            <div class="bgWhite ">
                <!--分类行内容-->
                <div class="lineStyle bottomBorder" @click="noneDistribution('','')">
                    <!--左侧分类名称-->
                    <div class="flex-row">
                        <text class="lineText">暂不用策略</text>
                        <!--<text class="lineText">({{allTotal}})</text>-->
                    </div>
                    <div v-if="catagoryId == 0 || catagoryId == 'undefined'  || catagoryId == ''" >
                        <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                    </div>
                </div>
            </div>
            <!--绑定动画-->
            <transition-group name="paraTransition" tag="div">
                <!--分类行背景-->
                <div class="bgWhite " v-for="(item,index) in catagoryList" :key="index"   @click="chooseCorpus(item.id,item.name,item.count)"   >
                    <!--分类行内容-->
                    <div class="lineStyle bottomBorder">
                        <!--左侧分类名称-->
                        <div class="flex-row" style="width: 450px;">
                            <text class="lineText limitWidth"  :class = "[item.bgChange ? 'active' : 'noActive']">{{item.name}}</text>
                        </div>
                        <div v-if="catagoryId == item.id" >
                            <text class="check" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                        </div>
                    </div>
                </div>
            </transition-group>
            <div class="dialog" v-if="isShow">
                <div class="flex-row ml30">
                    <text class="title">策略名称:</text>
                    <input type="text" autofocus="true" v-model="item.name" return-key-type="next" class="lineContent pr20"  placeholder="请输入策略名称" />
                </div>
                <div class="flex-row ml30">
                    <text class="title">直接佣金(%):</text>
                    <input type="number" v-model="item.percent1" return-key-type="next" class="lineContent pr20"  placeholder="直接佣金比例（%）" />
                </div>
                <div class="flex-row ml30">
                    <text class="title">间接佣金(%):</text>
                    <input type="number" v-model="item.percent2" return-key-type="next" class="lineContent pr20"  placeholder="间接佣金比例（%）" />
                </div>
                <div class="flex-row ml30">
                    <text class="title">三级佣金(%):</text>
                    <input type="number" v-model="item.percent3" return-key-type="next" class="lineContent pr20"  placeholder="三级佣金比例（%）" />
                </div>
                <div class="flex-row button_box">
                    <text class="button no" @click="close">取消</text>
                    <text class="button ok" @click="save">确定</text>
                </div>
            </div>
        </scroller>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .button_box {
        margin-top: 20px;
        background-color: #ccc;
        height: 130px;
        justify-content: space-around;
    }
    .no {
        width:200px;
        padding-top: 15px;
        background-color:#999;
    }
    .ok {
        padding-top: 15px;
        width:200px;
    }
    .dialog {
        margin: 20px;
        width:710px;
        border-width: 1px;
        border-radius: 10px;
        background-color: white;
        position: absolute;
        padding-top: 20px;
        top:180px;
        border-color: #ccc;
    }
    .lineContent{
        height: 80px;
        font-size: 32px;
        width: 346px;
        margin-left: 20px;
    }

    .remind{
        color: #888;
        padding-left: 30px;
        font-size: 28px;
        margin-bottom: 5px;
    }
    .white{
        color: #fff;
    }
    .limitWidth{
        text-overflow: ellipsis;
        max-width: 400px;
        lines:1;
    }
    .btnHtight{
        height: 100px;
    }
    .paraTransition-enter-active {
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

    .active{
        background-color: #999;
        color: #fff;
    }
    .arrowSize{
        font-size: 30px;
        font-weight: 700;
    }
    .upArrow{
        top:0px;
        padding-top: 5px;
        padding-left: 10px;
        padding-bottom: 10px;
    }
    .downArrow{
        bottom:0px;
        padding-top: 10px;
        padding-bottom: 5px;
        padding-left: 10px;
    }
    .rightArrow{
        position: absolute;
        position: absolute;
        right: 0px;
        padding-right: 10px;
    }
    .pr30{
        padding-right: 30px;
    }
    .fontSize30{
        font-size: 30px;
    }
    .ml5mr10{
        margin-left: 5px;
        margin-right: 10px
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
    import {dom,event,stream,storage} from '../../../weex.js'
    import utils from '../../../assets/utils.js'
    import { POST, GET } from '../../../assets/fetch'
    import navbar from '../../../include/navbar.vue'
    const animation = weex.requireModule('animation')
    const modal = weex.requireModule('modal');

    export default {
        data:function () {
            return{
                isShow:false,
                isSort:0,
                allTotal:69,
                recycle:0,
                moveSign:false,
                showSort:false,//子组件
                catagoryList:[],
                item:{id:"",name:"",percent1:"",percent2:"",percent3:"",bgChange:false},
                catagoryId:0,
                catagoryName:'',
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "销售策略"},
            complete: {default : "完成"},
        },
        created(){
            var _this = this;
            utils.initIconFont();
            let urlId = utils.getUrlParameter('catagoryId');
//            ''值被parseInt后会变成NaN
            if(!utils.isNull(urlId) && urlId != 'NaN'){
                this.catagoryId = urlId;
            }
            let catagory = utils.getUrlParameter('name');
            if(utils.isNull(catagory)){
                GET("weex/member/distribution/list.jhtml",function (res) {
                    if (res.type=='success') {
                        res.data.forEach(function (item) {
                            _this.catagoryList.push({
                                name:item.name,
                                percent1:item.percent1,
                                percent2:item.percent2,
                                percent3:item.percent3,
                                id:item.id,
                                bgChange:false
                            })
                        })
                    } else {
                        event.toast(res.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            }else{
                storage.getItem(catagory, e => {
                    if(e.data != 'undefined'){
                        let catagoryData =  JSON.parse(e.data);
                        catagoryData.forEach(function (item) {
                            _this.catagoryList.push({
                                name:item.name,
                                percent1:item.precent1,
                                percent2:item.precent2,
                                percent3:item.precent3,
                                id:item.id,
                                bgChange:false
                            })
                        })
                    }
                    storage.removeItem(catagory);
                })
            }
        },
        methods:{
            goback(){
                let backData = utils.message('success','成功','');
                event.closeURL(backData);
            },
            close:function () {
                this.isShow = false;
            },
            save:function () {
                var _this = this;
                if (utils.isNull(this.item.name)) {
                    event.toast('请输入名称');
                    return;
                }
                if (utils.isNull(this.item.percent1)) {
                    event.toast('请输入佣金比例');
                    return;
                }
                if (utils.isNull(this.item.percent2)) {
                    event.toast('请输入佣金比例');
                    return;
                }
                if (utils.isNull(this.item.percent3)) {
                    event.toast('请输入佣金比例');
                    return;
                }
                if (utils.isNull(this.item.id)) {
                    let orders = _this.catagoryList.length + 1;
                    let name = encodeURI(_this.item.name);
                    POST('weex/member/distribution/add.jhtml?name=' + name + '&orders=' + orders+'&percent1=' + this.item.percent1+'&percent2=' + this.item.percent2+'&percent3=' + this.item.percent3).then(
                        function (res) {
                            if(res.type == 'success'){
                                _this.catagoryList.push({
                                    name:res.data.name,
                                    percent1:res.data.percent1,
                                    percent2:res.data.percent2,
                                    percent3:res.data.percent3,
                                    bgChange:false,
                                    id:res.data.id,
                                });
                                event.toast('添加成功');
                                _this.isShow = false;
                            }else{
                                event.toast(res.content);
                            }
                        },function (err) {
                            event.toast(err);
                        }
                    )
                } else {
                    let name = encodeURI(_this.item.name);
                    POST('weex/member/distribution/update.jhtml?id=' + _this.item.id + '&name=' + name+'&percent1=' + this.item.percent1+'&percent2=' + this.item.percent2+'&percent3=' + this.item.percent3).then(
                        function (data) {
                            if(data.type == 'success'){
                                _this.catagoryList.forEach( function(item) {
                                    if (item.id==data.data.id) {
                                        item.name = data.data.name;
                                        item.percent1 = data.data.percent1;
                                        item.percent2 = data.data.percent2;
                                        item.percent3 = data.data.percent3;
                                    }
                                });
                                event.toast('修改成功');
                                _this.isShow = false;
                            }else{
                                event.toast(data.content);
                            }
                        },
                        function (err) {
                            event.toast(err.content);
                        }
                    )
                }
            },
//            添加分类
            addCatagory(){
                let _this = this;
                _this.item = {id:"",name:"",percent1:"",percent2:"",percent3:"",bgChange:false};
                _this.isShow  = true;
            },
//            更改分类后
            chooseCorpus:function (id,name,itemCount) {
                let _this = this;
                if(_this.catagoryId == id){
                    return;
                };
                _this.catagoryId = id;
                _this.catagoryName = name;
                let E = {
                    catagoryId : _this.catagoryId,
                    catagoryName : _this.catagoryName,
                    count:parseInt(itemCount) + 1
                }
                let backData = utils.message('success','成功',E);
                event.closeURL(backData);
            },
//            暂不用策略
            noneDistribution:function (id,name) {
                let _this = this;
                if(_this.catagoryId == id){
                    return;
                };
                _this.catagoryId = id;
                _this.catagoryName = name;
                let E = {
                    catagoryId : _this.catagoryId,
                    catagoryName : _this.catagoryName,
                }
                let backData = utils.message('success','成功',E);
                event.closeURL(backData);
            }
        }
    }
</script>