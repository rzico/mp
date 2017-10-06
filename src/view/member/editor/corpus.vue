<template>
    <div class="bkg-gray">
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="goComplete"> </navbar>
        <div class="bgWhite addCorpus">
            <div class="lineStyle pr30" @click="addCorpus()">
                <text class="lineText">添加文集</text>
                <text  :style="{fontFamily:'iconfont'}" class="gray" style="font-size: 25px;">&#xe630;</text>
            </div>
        </div>
        <!--文集行背景-->
        <div class="bgWhite ">
            <!--文集行内容-->
            <div class="lineStyle bottomBorder">
                <!--左侧文集名称-->
                <div class="flex-row">
                    <text class="lineText">全部文章</text>
                    <text class="lineText">({{allTotal}})</text>
                </div>
            </div>
        </div> <!--文集行背景-->
        <div class="bgWhite " v-for="(item,index) in corpusList">
            <!--文集行内容-->
            <div class="lineStyle bottomBorder">
                <!--左侧文集名称-->
                <div class="flex-row">
                    <text class="lineText">{{item.name}}</text>
                    <text class="lineText">({{item.total}})</text>
                </div>
                <!--右侧功能-->
                <div class="flex-row">
                    <div class="flex-row" @click="changeName(index)">
                        <text  :style="{fontFamily:'iconfont'}" class="gray fontSize30" >&#xe607;</text>
                        <text class="gray fontSize30 ml5mr10 " >改名</text>
                    </div>
                    <div class="flex-row " @click="deleteCorpus(index)">
                        <text  :style="{fontFamily:'iconfont'}" class="gray fontSize30" >&#xe615;</text>
                        <text class="gray fontSize30 ml5mr10">删除</text>
                    </div>
                </div>
            </div>
            <!--上箭头-->
            <div class="rightArrow upArrow" v-if="index != 0" @click="moveUp(index)">
                <text class="arrowSize gray" :style="{fontFamily:'iconfont'}" >&#xe608;</text>
            </div>
            <!--下箭头-->
            <div class="rightArrow downArrow" v-if="lastPara(index)" @click="moveBottom(index)">
                <text class="arrowSize gray" :style="{fontFamily:'iconfont'}" >&#xe601;</text>
            </div>
        </div>
        <!--文集行背景-->
        <div class="bgWhite ">
            <!--文集行内容-->
            <div class="lineStyle bottomBorder">
                <!--左侧文集名称-->
                <div class="flex-row">
                    <text class="lineText">回收站</text>
                    <text class="lineText">({{recycle}})</text>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>

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
        padding-right: 50px;
        margin-left: 30px;
        flex-direction: row;
    }
    .bgWhite{
        background-color: #fff;
    }
    .addCorpus{
        margin-top: 35px;
        margin-bottom: 35px;
    }
    .lineText{
        font-size: 32px;
    }
</style>
<script>
    import {dom,event,stream} from '../../../weex.js'
    import utils from '../../../assets/utils.js'
    import navbar from '../../../include/navbar.vue'
    const modal = weex.requireModule('modal');
    export default {
        data:function () {
            return{
                allTotal:69,
                recycle:0,
                corpusList:[{
                    name:'诚毅学院',
                    total:45
                },{
                    name:'厦门双子塔',
                    total:0
                },{
                    name:'集美',
                    total:23
                }]
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "文集管理"},
            complete:{default:"完成"}
        },
        beforeCreated(){
            utils.initIconFont();
        },
        methods:{
            goback(){
                event.closeURL()
            },
            goComplete(){

            },
//            添加文集
            addCorpus(){
                let _this = this;
                modal.prompt({
                    message: '请输入文集名',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value.result == '确定'){
                        if(value.data == '' || value.data == null ){
                            modal.toast({message:'请输入文集名',duration:1})
                        }else{
                            _this.corpusList.push({
                                name:value.data,
                                total:0
                            })
                            modal.toast({message:'添加成功',duration:1})
                        }
                    }
                })
            },
//            修改文集名称
            changeName(index){
                let _this = this;
                modal.prompt({
                    message: '请输入文集名(修改)',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                    value:'111'
                }, function (value) {
                    if(value.result == '确定'){
                        if(value.data == '' || value.data == null ){
                            modal.toast({message:'请输入文集名',duration:1})
                        }else{
                            _this.corpusList[index].name = value.data;
                            modal.toast({message:'修改成功',duration:1})
                        }
                    }
                })
            },
//            删除该文集
            deleteCorpus(index){
                let _this = this;
                    modal.confirm({
                        message: '不会删除文集下的文章，可在"全部文章"中找到,确定删除文集？',
                        duration: 0.3,
                        okTitle:'确定',
                        cancelTitle:'取消',
                    }, function (value) {
                        if(value == '确定'){
                            _this.corpusList.splice(index,1);
                            modal.toast({message:'删除成功',duration:1})
                        }
                    })
            },
//            判断是否最后一个段落来添加向下移动的箭头。
            lastPara:function(index){
                if(index != this.corpusList.length - 1){
                    return true;
                }else{
                    return false;
                }
            },
//            上箭头
        moveUp:function (index) {
//         方法2
            let a = this.corpusList[index].name;
            let b = this.corpusList[index].total;
            this.corpusList[index].name = this.corpusList[index - 1].name;
            this.corpusList[index].total = this.corpusList[index - 1].total;
            this.corpusList[index - 1].name = a;
            this.corpusList[index - 1].total = b;
        },
//            下箭头
        moveBottom:function (index) {
//         方法2
            let a = this.corpusList[index].name;
            let b = this.corpusList[index].total;
            this.corpusList[index].name = this.corpusList[index + 1].name;
            this.corpusList[index].total = this.corpusList[index + 1].total;
            this.corpusList[index + 1].name = a;
            this.corpusList[index + 1].total = b;
        },
        }
    }

</script>