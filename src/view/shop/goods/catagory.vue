<template>
    <scroller class="wrapper" >
        <navbar :title="title"  @goback="goback" :complete="complete" :showComplete="showSort"  @goComplete="cleanbgChange"> </navbar>
        <div class="bgWhite addCorpus">
            <div class="lineStyle pr30" @click="addCorpus()">
                <text class="lineText">添加分类</text>
                <text  :style="{fontFamily:'iconfont'}" class="gray" style="font-size: 25px;">&#xe630;</text>
            </div>
        </div>
        <div>
            <text class="remind" >长按分类可进行排序,排序后请点击"完成"</text>
        </div>
        <!--文集行背景-->
        <div class="bgWhite ">
            <!--文集行内容-->
            <div class="lineStyle bottomBorder">
                <!--左侧文集名称-->
                <div class="flex-row">
                    <text class="lineText">全部商品</text>
                    <!--<text class="lineText">({{allTotal}})</text>-->
                </div>
            </div>
        </div>
        <!--绑定动画-->
        <transition-group name="paraTransition" tag="div">
            <!--文集行背景-->
            <div class="bgWhite " v-for="(item,index) in corpusList" :key="index" :class = "[item.bgChange ? 'active' : 'noActive']"  @longpress="onlongpress(index)"   >
                <!--文集行内容-->
                <div class="lineStyle bottomBorder">
                    <!--左侧文集名称-->
                    <div class="flex-row" style="width: 450px;">
                        <text class="lineText limitWidth"  :class = "[item.bgChange ? 'active' : 'noActive']">{{item.name}}</text>
                        <text class="lineText" :class = "[item.bgChange ? 'active' : 'noActive']">({{item.total}})</text>
                    </div>
                    <!--右侧功能-->
                    <div class="flex-row" style="width: 200px;" v-if="!item.bgChange">
                        <div class="flex-row btnHtight" @click="changeName(index,item.name,item.id)">
                            <text  :style="{fontFamily:'iconfont'}" class="gray fontSize30">&#xe607;</text>
                            <text class="gray fontSize30 ml5mr10">改名</text>
                        </div>
                        <div class="flex-row btnHtight" @click="deleteCorpus(index,item.id)" >
                            <text  :style="{fontFamily:'iconfont'}" class="gray fontSize30">&#xe615;</text>
                            <text class="gray fontSize30 ml5mr10">删除</text>
                        </div>
                    </div>
                    <div class="flex-row"  v-else>
                        <div class="flex-row btnHtight"  @click="moveUp(index)" v-if="index != 0">
                            <text  :style="{fontFamily:'iconfont'}" class="white fontSize30">&#xe608;</text>
                            <text class="white fontSize30 ml5mr10" >上移</text>
                        </div>
                        <div class="flex-row btnHtight" @click="moveBottom(index)" v-if="lastPara(index)">
                            <text  :style="{fontFamily:'iconfont'}" class="white fontSize30">&#xe601;</text>
                            <text class="white fontSize30 ml5mr10">下移</text>
                        </div>
                    </div>
                </div>
            </div>
        </transition-group>
    </scroller>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
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
                isSort:0,
                allTotal:69,
                recycle:0,
                moveSign:false,
                showSort:false,//子组件
                corpusList:[],
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "文集管理"},
            complete: {default : "完成"},
        },
        created(){
            var _this = this;
            utils.initIconFont();
            let corpus = utils.getUrlParameter('name');
            if(utils.isNull(corpus)){
                return;
            }else{
                storage.getItem(corpus, e => {
                    if(e.data != 'undefined'){
                        let corpusData =  JSON.parse(e.data);
                        corpusData.forEach(function (item) {
                            _this.corpusList.push({
                                name:item.name,
                                total:item.count,
                                id:item.id,
                                bgChange:false
                            })
                        })
                    }
                    storage.removeItem(corpus);
                })
            }
        },
        methods:{
            goback(){
                let backData = utils.message('success','成功','');
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
                        if(utils.isNull(value.data)){
                            event.toast('请输入文集名');
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
                                        event.toast('添加成功');
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
//            修改文集名称
            changeName(index,corpusName,id){
                let _this = this;
                modal.prompt({
                    message: '修改文集名',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                    default:corpusName,
                    placeholder:corpusName,
                }, function (value) {
                    if(value.result == '确定'){
                        if(value.data == '' || value.data == null ){
                            modal.toast({message:'请输入文集名',duration:1})
                        }else{
                            POST('weex/member/article_catalog/update.jhtml?id=' + id + '&name=' + value.data).then(
                                function (data) {
                                    if(data.type == 'success'){
                                        _this.corpusList[index].name = value.data;//把名字改上去
                                        event.toast('修改成功');
                                    }else{
                                        event.toast(data.content);
                                    }
                                },
                                function (err) {
                                    event.toast(err.content);
                                }
                            )
                        }
                    }
                })
            },
//            删除该文集
            deleteCorpus(index,id){
                let _this = this;
                modal.confirm({
//                    message: '不会删除文集下的文章，可在"全部文章"中找到,确定删除文集？',
                    message: '是否删除该文集？',
                    duration: 0.3,
                    okTitle:'删除',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '删除'){
                        POST('weex/member/article_catalog/delete.jhtml?id=' + id).then(
                            function (data) {
                                if(data.type == 'success'){
                                    _this.corpusList.splice(index,1);
                                }else{
                                    event.toast(data.content);
                                }
                            },
                            function (err) {
                                event.toast(err.content);
                            }
                        )
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
//            长按屏幕后
            onlongpress:function (index) {
                var _this = this;
                this.corpusList.forEach(function (item) {
                    if(item.bgChange == true){
                        item.bgChange = false;
                    }
                })
                _this.corpusList[index].bgChange = true;
                _this.showSort = true;

            },
//            点击完成时、上传排序后的数组
            cleanbgChange:function () {
//                关闭所有的文集背景变化
                this.corpusList.forEach(function (item) {
                    if(item.bgChange == true){
                        item.bgChange = false;
                    }
                })
//                隐藏完成
                this.showSort = false;
//                判断是否有更换顺序 没有就不上传服务器
                if(this.isSort == 1){
                    this.isSort = 0;
                    let url = 'weex/member/article_catalog/sort.jhtml?ids='
                    this.corpusList.forEach(function (item,index) {
                        if(index == 0){
                            url = url + item.id;
                        }else{
                            url = url + '&ids=' + item.id;
                        }
                    })
//                    向服务器提交
                    POST(url).then(
                        function (data) {
                            if(data.type == 'success'){
                                event.toast('排序成功');
                            }else{
                                event.toast(data.content);
                            }
                        },
                        function (err) {
                            event.toast("网络不稳定");
                        }
                    )
                }else{
                    return;
                }
            },
            //            判断是否最后一个段落来添加向下移动的箭头。
            lastPara:function(index){
                if(index != this.corpusList.length - 1){
                    return true;
                }else{
                    return false;
                }
            },
//            向上移动，上箭头
            moveUp(index){
                this.isSort = 1;
                //         方法2
                let a = this.corpusList[index].name;
                let b = this.corpusList[index].id;
                let c = this.corpusList[index].total;
                let d = this.corpusList[index].bgChange;
                this.corpusList[index].name = this.corpusList[index - 1].name;
                this.corpusList[index].id = this.corpusList[index - 1].id;
                this.corpusList[index].total = this.corpusList[index - 1].total;
                this.corpusList[index].bgChange = this.corpusList[index - 1].bgChange;
                this.corpusList[index - 1].name = a;
                this.corpusList[index - 1].id = b;
                this.corpusList[index - 1].total = c;
                this.corpusList[index - 1].bgChange = d;
            },
            //向下移动，下箭头
            moveBottom(index){
                this.isSort = 1;
                //         方法2
                let a = this.corpusList[index].name;
                let b = this.corpusList[index].id;
                let c = this.corpusList[index].total;
                let d = this.corpusList[index].bgChange;
                this.corpusList[index].name = this.corpusList[index + 1].name;
                this.corpusList[index].id = this.corpusList[index + 1].id;
                this.corpusList[index].total = this.corpusList[index + 1].total;
                this.corpusList[index].bgChange = this.corpusList[index + 1].bgChange;
                this.corpusList[index + 1].name = a;
                this.corpusList[index + 1].id = b;
                this.corpusList[index + 1].total = c;
                this.corpusList[index + 1].bgChange = d;
            },
        }
    }
</script>