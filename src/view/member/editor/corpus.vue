<template>
    <scroller class="bkg-gray" :scrollable="pressScroll">
        <navbar :title="title"  @goback="goback"> </navbar>
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
        </div>
        <!--绑定动画-->
        <transition-group name="paraTransition" tag="div">
        <!--文集行背景-->
        <div class="bgWhite " v-for="(item,index) in corpusList" :key="index" :class = "[item.bgChange ? 'active' : 'noActive']" @touchstart="ontouchstart(index)" @longpress="onlongpress(index)" @touchmove="ontouchmove($event,index)" @touchend="ontouchend(index)" >
            <!--文集行内容-->
            <div class="lineStyle bottomBorder">
                <!--左侧文集名称-->
                <div class="flex-row">
                    <text class="lineText" :class = "[item.bgChange ? 'active' : 'noActive']">{{item.name}}</text>
                    <text class="lineText" :class = "[item.bgChange ? 'active' : 'noActive']">({{item.total}})</text>
                </div>
                <!--右侧功能-->
                <div class="flex-row">
                    <div class="flex-row btnHtight" @click="changeName(index,item.name,item.id)">
                        <text  :style="{fontFamily:'iconfont'}" class="gray fontSize30">&#xe607;</text>
                        <text class="gray fontSize30 ml5mr10">改名</text>
                    </div>
                    <div class="flex-row btnHtight" @click="deleteCorpus(index,item.id)" >
                        <text  :style="{fontFamily:'iconfont'}" class="gray fontSize30">&#xe615;</text>
                        <text class="gray fontSize30 ml5mr10">删除</text>
                    </div>
                </div>
            </div>
        </div>
        </transition-group>
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
    </scroller>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .btnHtight{
        height: 100px;
    }
    .paraTransition-enter-active, .paraTransition-leave-active {
        transition: all 0.2s;
    }
    /*.paraTransition-leave-to{*/
        /*transform: translateX(300px);*/
        /*opacity: 0;*/
    /*}*/

    .paraTransition-enter{
        transform: translateY(-300px);
        opacity: 1;
    }
    .paraTransition-enter-to{
        transform: translateY(0px);
        opacity: 1;
    }

    .active{
        background-color: #D8D8D8;
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
        margin-bottom: 35px;
    }
    .lineText{
        font-size: 32px;
    }
</style>
<script>
    import {dom,event,stream,storage} from '../../../weex.js'
    import utils from '../../../assets/utils.js'
    import navbar from '../../../include/navbar.vue'
    const animation = weex.requireModule('animation')
    const modal = weex.requireModule('modal');
    var timer = null;//定时器
    var pressPoint = -1;//手指按压
    var movePoint;//手机按压后移动
    var beforePointPoor = -1; //前一次手机按压时与移动后的字母数量
    var upMove = 0;//向上移动几个位置
    var bottomMove = 0;//向下移动几个位置
    var moveContent;//移动的文集内容

    export default {
        data:function () {
            return{
                pressScroll:true,
                allTotal:69,
                recycle:0,
                moveSign:false,
                canScroll:true,
                corpusList:[]
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "文集管理"},
        },
        created(){
            var _this = this;
            utils.initIconFont();
            let corpus = utils.getUrlParameter('name');
            if(utils.isNull(corpus)){
                return;
            }else{
                storage.getItem(corpus, e => {
                    let corpusData =  JSON.parse(e.data);
                    corpusData.forEach(function (item) {
                        _this.corpusList.push({
                                name:item.name,
                                total:item.count,
                                id:item.id,
                                bgChange:false
                        })
                    })
                    storage.removeItem(corpus);
                })
            }
        },
        methods:{
            goback(){
                event.closeURL()
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
                            _this.corpusList.push({
                                name:value.data,
                                total:0,
                                bgChange:false
                            });
                            let orders = _this.corpusList.length ;
                            event.toast(orders);
//                            向服务器存入文集名称
                            _this.addStream(value.data,orders,res=>{
                                modal.toast({message:res,duration:3});
                            });
                            modal.toast({message:'添加成功',duration:1});
                        }
                    }
                })
            },
            addStream (corpusName,orders,callback) {
                return stream.fetch({
                    method: 'POST',
                    type: 'json',
                    url: 'weex/member/article_catalog/add.jhtml?name=' + corpusName + '&orders=' + orders
                }, callback)
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
                            return stream.fetch({
                                method: 'POST',
                                type: 'json',
                                url: '/weex/member/article_catalog/update.jhtml?id=' + id + '&name=' + value.data,
                            },function (data) {
                                if(data.data.type == 'success'){
                                    _this.corpusList[index].name = value.data;//把名字改上去
                                }else{
                                    event.toast(data.data.content);
                                }
                            })
                        }
                    }
                })
            },
//            删除该文集
            deleteCorpus(index,id){
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
                        return stream.fetch({
                            method: 'POST',
                            type: 'json',
                            url: '/weex/member/article_catalog/delete.jhtml?id=' + id
                        },function (data) {
                            event.toast(data);
                        })

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
//            长按结束后，手指离开屏幕，背景色还原
            ontouchend:function (index) {

                if(pressPoint == -1){
                    event.toast('等于-1');
                }else{
                    event.toast('不等于-1');
                    pressPoint = -1;
                    this.canScroll = true;
                    this.pressScroll = true;
                    this.corpusList.forEach(function (item) {
                        if(item.bgChange == true){
                            item.bgChange = false;
                        }
                    })




                }

                if (timer!=null) {
                    clearInterval(timer);
                }
            },
//            长按屏幕后
            onlongpress:function (index) {
                var _this = this;
                _this.corpusList[index].bgChange = true;
                _this.canScroll = false;
                _this.pressScroll = false;
            },
//            点击屏幕时
            ontouchstart:function (index) {
            },
//            点击屏幕并滑动
            ontouchmove:function (event,index) {
                if(this.canScroll == true){
                    return;
                }
                var _this = this;
                if(pressPoint == - 1){//记录每次第一次滑动按压的点
                    pressPoint = event.changedTouches[0].pageY;
                    upMove = index;
                    bottomMove = index;
                }else{
                    var pointPoor = pressPoint - event.changedTouches[0].pageY;
                    if(index == 0 && pointPoor > 0){
                    }else if(index == _this.corpusList.length - 1 && pointPoor < 0){
                    }else {
                        movePoint = Math.abs(pointPoor);//求移动的距离(绝对值)
                        if(movePoint > 70){
                            let moveTotal = Math.floor(movePoint/70);//通过偏移量获取移动的数量
//                        pressPoint = event.changedTouches[0].pageY;
                            if(!(beforePointPoor == moveTotal)){
                                if(pointPoor  >= 0 ){
                                    if( index - moveTotal >= 0 ){
                                        moveContent = _this.corpusList[upMove];
                                        _this.corpusList.splice(upMove,1);
                                        _this.corpusList.splice(index - moveTotal,0,moveContent);
                                        upMove = index - moveTotal;
                                        bottomMove = index - moveTotal;
                                    }
                                }else {
                                    if(index + moveTotal <= _this.corpusList.length - 1 ){
                                        moveContent = _this.corpusList[bottomMove];
                                        _this.corpusList.splice(bottomMove,1);
                                        _this.corpusList.splice(index + moveTotal,0,moveContent);
                                        bottomMove = index + moveTotal;
                                        upMove = index + moveTotal;
                                    }
                                }
                            }
                            beforePointPoor = moveTotal;//把这次的滑动的数量保存起来
                            clearInterval(timer);
                            _this.moveSign = true;
                        }else{//  返回原来的点击位置
                            if(index - upMove == 1 && _this.moveSign == true){
                                moveContent = _this.corpusList[upMove];
                                _this.corpusList.splice(upMove,1);
                                _this.corpusList.splice(index,0,moveContent);
                                _this.moveSign = false;
                                upMove = index;
                                bottomMove = index;
                                beforePointPoor = 0;
                            }else if(index - bottomMove == -1  && _this.moveSign == true){
                                moveContent = _this.corpusList[bottomMove];
                                _this.corpusList.splice(bottomMove,1);
                                _this.corpusList.splice(index,0,moveContent);
                                _this.moveSign = false;
                                upMove = index;
                                bottomMove = index;
                                beforePointPoor = 0;
                            }
                        }
                    }
                }
            }
        }
    }
</script>