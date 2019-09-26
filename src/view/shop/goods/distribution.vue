<template>
    <scroller class="wrapper" >
        <navbar :title="title"  @goback="goback" :complete="complete" :showComplete="showSort"  @goComplete="cleanbgChange"> </navbar>
        <!--<div class="setting" @click="gosetting()">-->
            <!--<text class="title " >营销推广设置</text>-->
            <!--<text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
        <!--</div>-->
        <!--<div class="setting" @click="cardSetting()">-->
            <!--<text class="title " >充值活动设置</text>-->
            <!--<text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
        <!--</div>-->
        <!--<div class="setting" @click="openWebView()">-->
            <!--<text class="title " >云打印机设置</text>-->
            <!--<text class="print">{{typeBegin == '0' ? '接单手动打印' : '接单自动打印'}}</text>-->
            <!--<text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
        <!--</div>-->
        <div class="bgWhite addCorpus">
            <div class="lineStyle pr30" @click="jump()">
                <text class="lineText">添加策略</text>
                <text  :style="{fontFamily:'iconfont'}" class="gray" style="font-size: 25px;">&#xe630;</text>
            </div>
        </div>
        <div>
            <text class="remind" >长按策略可进行排序,排序后请点击"完成"</text>
        </div>
        <!--分类行背景-->
        <!--<div class="bgWhite ">-->
            <!--&lt;!&ndash;分类行内容&ndash;&gt;-->
            <!--<div class="lineStyle bottomBorder">-->
                <!--&lt;!&ndash;左侧分类名称&ndash;&gt;-->
                <!--<div class="flex-row">-->
                    <!--<text class="lineText">全部策略</text>-->
                    <!--&lt;!&ndash;<text class="lineText">({{allTotal}})</text>&ndash;&gt;-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--绑定动画-->
        <transition-group name="paraTransition" tag="div">
            <!--分类行背景-->
            <div class="bgWhite " v-for="(item,index) in catagoryList" :key="index" :class = "[item.bgChange ? 'active' : 'noActive']"  @longpress="onlongpress(index)"   >
                <!--分类行内容-->
                <div class="lineStyle bottomBorder">
                    <!--左侧分类名称-->
                    <div class="flex-row" style="width: 450px;">
                        <text class="lineText limitWidth"  :class = "[item.bgChange ? 'active' : 'noActive']">{{item.name}}</text>
                    </div>
                    <!--右侧功能-->
                    <div class="flex-row" style="width: 200px;" v-if="!item.bgChange">
                        <div class="flex-row btnHtight" @click="changeName(item.id,item.name,item.given,item.percent1,item.percent2,item.percent3,item.point,item.tota,item.type)">
                            <text  :style="{fontFamily:'iconfont'}" class="gray fontSize30">&#xe61d;</text>
                            <text class="gray fontSize30 ml5mr10">修改</text>
                        </div>
                        <div class="flex-row btnHtight" @click="deleteCorpus(index,item.id)" >
                            <text  :style="{fontFamily:'iconfont'}" class="gray fontSize30">&#xe652;</text>
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
        <!--<div class="dialog" v-if="isShow">
            <div class="flex-row ml30">
                <text class="title">策略名称:</text>
                <input type="text" autofocus="true" v-model="item.name" return-key-type="next" class="lineContent pr20"  placeholder="请输入策略名称" />
            </div>
            <div class="flex-row ml30">
                <text class="title">直接佣金:</text>
                <input type="number" v-model="item.percent1" return-key-type="next" class="lineContent pr20"  placeholder="直接佣金比例（%）" />
            </div>
            <div class="flex-row ml30">
                <text class="title">间接佣金:</text>
                <input type="number" v-model="item.percent2" return-key-type="next" class="lineContent pr20"  placeholder="间接佣金比例（%）" />
            </div>
            <div class="flex-row ml30">
                <text class="title">三级佣金:</text>
                <input type="number" v-model="item.percent3" return-key-type="next" class="lineContent pr20"  placeholder="三级佣金比例（%）" />
            </div>
            <div class="flex-row button_box">
                <text class="button no" @click="close">取消</text>
                <text class="button ok" @click="save">确定</text>
            </div>
        </div>-->
    </scroller>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .setting {
        width: 750px;
        height: 100px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 30px;
        padding-right: 30px;
        background-color: white;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #ccc;
        position:relative;
    }
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
    .print{
        position: absolute;
        right: 70px;
        color: #888888;
        font-size: 24px;
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
    const picker = weex.requireModule('picker');
    export default {
        data:function () {
            return{
                clicked:false,
                isShow:false,
                isSort:0,
                allTotal:69,
                recycle:0,
                moveSign:false,
                showSort:false,//子组件
                catagoryList:[],
                item:{id:"",name:"",percent1:"",percent2:"",percent3:"",point:'',tota:'',type:'',bgChange:false},
                roles:'',
                catagory:'',
                typeName:'手动打印',
                typeBegin:0
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "设置"},
            complete: {default : "完成"},
        },
        created(){
            this.permissions();
            utils.initIconFont();
            this.catagory = utils.getUrlParameter('name');
            this.open();
            this.print();
        },
        methods:{
            openWebView(){
                    let _this = this;
                picker.pick({
                    index:_this.typeBegin,
                    items:['接单手动打印','接单自动打印']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.typeName = '接单手动打印';
                            _this.typeBegin = e.data;
                            POST("weex/member/topic/update.jhtml?orderMode=manual").then(
                                function(data){
                                    if(data.type == "success"){
                                        event.toast(data.content)
                                    }else {
                                        event.toast(data.content)
                                    }
                                }
                            )
                        }else if(e.data == 1){
                            _this.typeName = '接单自动打印';
                            _this.typeBegin = e.data;
                            POST("weex/member/topic/update.jhtml?orderMode=automatic").then(
                                function(data){
                                    if(data.type == "success"){
                                        event.toast(data.content)
                                    }else {
                                        event.toast(data.content)
                                    }
                                }
                            )
                        }
                    }
                })
            },
//            设置分成推广
            gosetting:function () {
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                event.openURL(utils.locate("view/shop/goods/promote.js"),function (e) {
                    _this.clicked = false;
                });
            },
            //            获取权限
            permissions:function () {
                var _this = this;
                POST("weex/member/roles.jhtml").then(function (mes) {
                    if (mes.type=="success") {
                        _this.roles = mes.data;
                    } else {
                        event.toast(mes.content);
                    }
                },function (err) {
                    event.toast(err.content);
                });
            },
            goback(){
                let backData = utils.message('success','成功','');
                event.closeURL(backData);
            },
            close:function () {
                this.isShow = false;
            },
            open:function () {
                var _this = this;
                if(utils.isNull(this.catagory)){
                    GET("weex/member/distribution/list.jhtml",function (res) {
                        if (res.type=='success') {
                            res.data.forEach(function (item) {
                                _this.catagoryList.push({
                                    name:item.name,
                                    given:item.given,
                                    percent1:item.percent1,
                                    percent2:item.percent2,
                                    percent3:item.percent3,
                                    point:item.point,
                                    tota:item.dividend,
                                    id:item.id,
                                    type:item.type,
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
                    storage.getItem(_this.catagory, e => {
                        if(e.data != 'undefined'){
                            let catagoryData =  JSON.parse(e.data);
                            catagoryData.forEach(function (item) {
                                _this.catagoryList.push({
                                    name:item.name,
                                    given:item.given,
                                    percent1:item.precent1,
                                    percent2:item.precent2,
                                    percent3:item.precent3,
                                    point:item.point,
                                    tota:item.dividend,
                                    id:item.id,
                                    type:item.type,
                                    bgChange:false
                                })
                            })
                        }
                        storage.removeItem(_this.catagory);
                    })
                }
            },
            print:function(){
                var _this = this
                GET("weex/member/topic/option.jhtml",function(res){
                    if(res.type == "success"){
                         if(res.data.orderMode == "manual"){
                             _this.typeBegin = 0
                         }else if(res.data.orderMode == "automatic"){
                             _this.typeBegin = 1
                         }
                    }else {
                        event.toast(tes.data.content)
                    }
                })
            },
//            save:function () {
//                var _this = this;
//                if (utils.isNull(this.item.name)) {
//                    event.toast('请输入名称');
//                    return;
//                }
//                if (utils.isNull(this.item.percent1)) {
//                    event.toast('请输入佣金比例');
//                    return;
//                }
//                if (utils.isNull(this.item.percent2)) {
//                    event.toast('请输入佣金比例');
//                    return;
//                }
//                if (utils.isNull(this.item.percent3)) {
//                    event.toast('请输入佣金比例');
//                    return;
//                }
//                if (utils.isNull(this.item.id)) {
//                    let orders = _this.catagoryList.length + 1;
//                    let name = encodeURI(_this.item.name);
//                    POST('weex/member/distribution/add.jhtml?name=' + name + '&orders=' + orders+'&percent1=' + this.item.percent1+'&percent2=' + this.item.percent2+'&percent3=' + this.item.percent3).then(
//                        function (res) {
//                            if(res.type == 'success'){
//                                _this.catagoryList.push({
//                                    name:res.data.name,
//                                    percent1:res.data.percent1,
//                                    percent2:res.data.percent2,
//                                    percent3:res.data.percent3,
//                                    bgChange:false,
//                                    id:res.data.id,
//                                });
//                                event.toast('添加成功');
//                                _this.isShow = false;
//                            }else{
//                                event.toast(res.content);
//                            }
//                        },function (err) {
//                            event.toast(err);
//                        }
//                    )
//                } else {
//                    let name = encodeURI(_this.item.name);
//                    POST('weex/member/distribution/update.jhtml?id=' + _this.item.id + '&name=' + name+'&percent1=' + this.item.percent1+'&percent2=' + this.item.percent2+'&percent3=' + this.item.percent3).then(
//                        function (data) {
//                            if(data.type == 'success'){
//                                _this.catagoryList.forEach( function(item) {
//                                    if (item.id==data.data.id) {
//                                        item.name = data.data.name;
//                                        item.percent1 = data.data.percent1;
//                                        item.percent2 = data.data.percent2;
//                                        item.percent3 = data.data.percent3;
//                                    }
//                                });
//                                event.toast('修改成功');
//                                _this.isShow = false;
//                            }else{
//                                event.toast(data.content);
//                            }
//                        },
//                        function (err) {
//                            event.toast(err.content);
//                        }
//                    )
//                }
//            },
////            添加分类
//            addCatagory(){
//                let _this = this;
//                if (!utils.isRoles("A",_this.roles)) {
//                    modal.alert({
//                        message: '请点亮专栏',
//                        okTitle: 'OK'
//                    })
//                    return
//                }
//                _this.item = {id:"",name:"",percent1:"",percent2:"",percent3:"",point:"",tota:"",bgChange:false};
//                _this.isShow  = true;
//             },
//            修改分类名称
            changeName(id,name,given,percent1,percent2,percent3,point,tota,type){
                let _this = this;
                if (!utils.isRoles("A",_this.roles)) {
                    modal.alert({
                        message: '请点亮专栏',
                        okTitle: 'OK'
                    })
                    return
                }else  if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    return
                }
                event.openURL(utils.locate("view/shop/goods/distributionList.js?id="+id+'&name='+encodeURI(name)+'&given='+given+'&percent1='+percent1+'&percent2='+percent2+'&percent3='+percent3+'&point='+point+'&tota='+tota+'&type='+type),function () {
                    _this.catagoryList =[]
                    _this.open()
                })
            },
//            删除该分类
            deleteCorpus(index,id){
                let _this = this;
                modal.confirm({
//                    message: '不会删除分类下的文章，可在"全部文章"中找到,确定删除分类？',
                    message: '是否删除该策略？',
                    duration: 0.3,
                    okTitle:'删除',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '删除'){
                        POST('weex/member/distribution/delete.jhtml?id=' + id).then(
                            function (data) {
                                if(data.type == 'success'){
                                    _this.catagoryList.splice(index,1);
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
                if(index != this.catagoryList.length - 1){
                    return true;
                }else{
                    return false;
                }
            },
//            长按屏幕后
            onlongpress:function (index) {
                var _this = this;
                this.catagoryList.forEach(function (item) {
                    if(item.bgChange == true){
                        item.bgChange = false;
                    }
                })
                _this.catagoryList[index].bgChange = true;
                _this.showSort = true;

            },
//            点击完成时、上传排序后的数组
            cleanbgChange:function () {
                var _this = this;
//                关闭所有的分类背景变化
                this.catagoryList.forEach(function (item) {
                    if(item.bgChange == true){
                        item.bgChange = false;
                    }
                })
//                隐藏完成
                this.showSort = false;
//                判断是否有更换顺序 没有就不上传服务器
                if(this.isSort == 1){
                    this.isSort = 0;
                    var url = 'weex/member/distribution/sort.jhtml?ids=';
                    this.catagoryList.forEach(function (item,index) {
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
                                _this.catagoryList =[]
                                _this.open()
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
                if(index != this.catagoryList.length - 1){
                    return true;
                }else{
                    return false;
                }
            },
//            向上移动，上箭头
            moveUp(index){
                this.isSort = 1;
                //         方法2
                let a = this.catagoryList[index].name;
                let b = this.catagoryList[index].id;
                let g = this.catagoryList[index].given;
                let c1 = this.catagoryList[index].percent1;
                let c2 = this.catagoryList[index].percent2;
                let c3 = this.catagoryList[index].percent3;
                let c4 = this.catagoryList[index].tota;
                let c5 = this.catagoryList[index].point;
                let d = this.catagoryList[index].bgChange;
                this.catagoryList[index].name = this.catagoryList[index - 1].name;
                this.catagoryList[index].id = this.catagoryList[index - 1].id;
                this.catagoryList[index].given = this.catagoryList[index - 1].given;
                this.catagoryList[index].percent1 = this.catagoryList[index - 1].percent1;
                this.catagoryList[index].percent2 = this.catagoryList[index - 1].percent2;
                this.catagoryList[index].percent3 = this.catagoryList[index - 1].percent3;
                this.catagoryList[index].tota = this.catagoryList[index - 1].tota;
                this.catagoryList[index].point = this.catagoryList[index - 1].point;
                this.catagoryList[index].bgChange = this.catagoryList[index - 1].bgChange;
                this.catagoryList[index - 1].name = a;
                this.catagoryList[index - 1].id = b;
                this.catagoryList[index - 1].given = g;
                this.catagoryList[index - 1].percent1 = c1;
                this.catagoryList[index - 1].percent2 = c2;
                this.catagoryList[index - 1].percent3 = c3;
                this.catagoryList[index - 1].tota = c4;
                this.catagoryList[index - 1].point = c5;
                this.catagoryList[index - 1].bgChange = d;
            },
            //向下移动，下箭头
            moveBottom(index){
                this.isSort = 1;
                //         方法2
                let a = this.catagoryList[index].name;
                let b = this.catagoryList[index].id;
                let g = this.catagoryList[index].given;
                let c1 = this.catagoryList[index].percent1;
                let c2 = this.catagoryList[index].percent2;
                let c3 = this.catagoryList[index].percent3;
                let c4 = this.catagoryList[index].tota;
                let c5 = this.catagoryList[index].point;
                let d = this.catagoryList[index].bgChange;
                this.catagoryList[index].name = this.catagoryList[index + 1].name;
                this.catagoryList[index].id = this.catagoryList[index + 1].id;
                this.catagoryList[index].given = this.catagoryList[index + 1].given;
                this.catagoryList[index].percent1 = this.catagoryList[index + 1].percent1;
                this.catagoryList[index].percent2 = this.catagoryList[index + 1].percent2;
                this.catagoryList[index].percent3 = this.catagoryList[index + 1].percent3;
                this.catagoryList[index].tota = this.catagoryList[index + 1].tota;
                this.catagoryList[index].point = this.catagoryList[index + 1].point;
                this.catagoryList[index].bgChange = this.catagoryList[index + 1].bgChange;
                this.catagoryList[index + 1].name = a;
                this.catagoryList[index + 1].id = b;
                this.catagoryList[index + 1].given = g;
                this.catagoryList[index + 1].percent1 = c1;
                this.catagoryList[index + 1].percent2 = c2;
                this.catagoryList[index + 1].percent3 = c3;
                this.catagoryList[index + 1].tota = c4;
                this.catagoryList[index + 1].point = c5;
                this.catagoryList[index + 1].bgChange = d;
            },
            jump:function () {
                let _this = this;
                if (!utils.isRoles("A",_this.roles)) {
                    modal.alert({
                        message: '请点亮专栏',
                        okTitle: 'OK'
                    })
                    return
                }
                event.openURL(utils.locate("view/shop/goods/distributionList.js"),function () {
                    _this.catagoryList =[]
                    _this.open()
                })
            },

            cardSetting:function () {
                let _this = this;
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    return
                }
                event.openURL(utils.locate('view/shop/card/setting.js'),function () {

                })
            }
        }
    }
</script>