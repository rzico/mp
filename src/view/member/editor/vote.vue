<template>
    <scroller class="wrapper">
        <!--<refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown"  :display="refreshing ? 'show' : 'hide'"></refresh>-->
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="goComplete"> </navbar>
        <div class="voteBigBox" v-for="vote in voteList">
            <!--整个的上方箱子-->
            <div class="voteBox mt20 border-radius">
                <!--第一行 投票描述-->
                <div class="voteTell addBottomBorder">
                    <text class="gray tellSize">投票描述</text>
                    <!--多行文本-->
                    <div class="textareaBox">
                        <textarea class="textareaClass ml10 " data-id="0" v-model="vote.textAreaTitle" @input="titleOninput"  :style="{height:titleHeight + 'px'}"  :rows="titleRows" autofocus="true"></textarea>
                    </div>
                </div>
                <!--第二行开始 选项-->
                <div class="voteTell addBottomBorder optionsBox" v-for="(item,index) in vote.pageBox">
                    <!--勾选圆形-->
                    <text class="circle pl10"></text>
                    <!--多行文本-->
                    <div class="textareaBox">
                        <!--<textarea class="textareaClass " placeholder="选项1" data-id="1" v-model="textAreaMessage[1].text"  @input="oninput"  :style="{height:textHeight[1].height + 'px'}"  :rows="rowsNum[1].rows"></textarea>-->
                        <textarea class="textareaClass " :placeholder='setPlaceholder(index)' v-model="item.textAreaMessage" @input="optionsOninput($event,index)"  :style="{height:item.textHeight + 'px'}" :rows="item.rowsNum"></textarea>
                    </div>
                    <!--删除按钮-->
                    <text class="closeIcon" :style="{fontFamily:'iconfont'}" v-if="index >= 2" @click="deleteOptions(index)">&#xe60a;</text>
                    <!--当隐藏删除按钮时需要有空白区域顶起布局-->
                    <text class="closeIcon" style="width:60px;"v-else></text>
                </div>
                <!--添加选项-->
                <div class="voteTell addOptions " @click="addOptions()">
                    <text class="addSize">+</text>
                    <text class="addSize ml10">添加选项</text>
                </div>
            </div>
            <div class="voteBox mt20 border-radius">
                <!-- 截止时间-->
                <div class="voteTell addBottomBorder optionsBox">
                    <div class="flexRow">
                        <text class="gray bottomSize">截止时间</text>
                        <!--时间-->
                        <div class="textareaBox ml10 flexRow"  >
                            <!--选择日期-->
                            <text class="bottomSize" @click="pickDate()">{{vote.chooseDate}}</text>
                            <!--选择时间-->
                            <text class="bottomSize ml10" @click="pickTime()">{{vote.chooseTime}}</text>
                        </div>
                    </div>
                    <!--重置时间按钮-->
                    <text class="closeIcon " :style="{fontFamily:'iconfont'}" v-if="vote.chooseTime != '' "  @click="noEndTime()">&#xe60a;</text>
                </div>
                <!-- 投票类型-->
                <div class="voteTell ">
                    <text class="gray bottomSize">投票类型</text>
                    <!--单选-->
                    <div class="textareaBox ml10" @click="pickOptions()">
                        <text class="bottomSize">{{chooseOptions}}</text>
                    </div>
                </div>
            </div>
        </div>
    </scroller>
</template>

<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .voteBigBox{
        padding-bottom: 20px;
    }
    .flexRow{
        flex-direction: row;
        align-items: center;
    }
    .addVote{
        padding-bottom: 15px;
        padding-top: 15px;
        padding-left: 45px;
        padding-right: 45px;
        border-radius: 10px;
        background-color: #fff;
    }
    .circle{
        width:50px;
        height:50px;
        border-radius: 25px;
        background-color: #fff;
        border-width: 1px;
        border-style: solid;
        border-color: #999;
    }
    .addSize{
        color: #D9141E;
        font-size: 35px;
    }
    .bottomSize{
        font-size: 35px;
    }
    .addOptions{
        justify-content: center;
    }
    .pl10{
        margin-left: 20px;
    }
    .closeIcon{
        font-size: 40px;
        color: #999;
        font-weight: 700;
        padding-bottom: 10px;
        padding-top: 10px;
        padding-right: 10px;
        padding-left: 10px
    }
    .textareaClass{
        width:485px;
        font-size: 35px;
        line-height: 48px;
    }
    .textareaBox{
        height:120px;
        justify-content: center;
    }
    .optionsBox{
        justify-content: space-between;
        padding-right: 30px;
    }
    .voteTell{
        flex-direction: row;
        height:110px;
        align-items: center;
    }
    .addBottomBorder{
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
    }
    .tellSize{
        font-size:37px;
    }
    .voteBox{
        width:710px;
        margin-left: 20px;
        padding-left: 25px;
        border-radius: 20px;
        background-color: #fff;
    }
</style>

<script>

    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    const storage = weex.requireModule('storage');
    const event = weex.requireModule('event');
    const modal = weex.requireModule('modal');
    const picker = weex.requireModule('picker');
    var isSign = -1;
    var optionIndex = -1;
    export default {
        data:function () {
            return{
                refreshing: false,
                voteList:[],
                chooseOptions:'单选(默认)',
                optionArray:['单选(默认)','多选，最多2项','多选,无限制'],
                titleHeight:48,
                titleRows:1,
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "投票设置"},
            complete:{ default:"完成"}
        },
        created(){
            var _this = this;
            utils.initIconFont();
            var vote = utils.getUrlParameter('name');
            if(utils.isNull(vote)){
//               添加新的投票
                this.voteList.push({
                    chooseDate:'无截止时间',
                    chooseTime:'',
                    optionsIndex:0,
                    textAreaTitle:'',
                    pageBox:[{
                        textAreaMessage:'',
                        textHeight:'48',
                        rowsNum:'1',
                        editSign:-1,
                    },{
                        textAreaMessage:'',
                        textHeight:48,
                        rowsNum:1,
                        editSign:-1,
                    },{
                        textAreaMessage:'',
                        textHeight:48,
                        rowsNum:1,
                        editSign:-1,
                    }]
                });
                return;
            }else{
                //                编辑投票。
                storage.getItem(vote, e => {
                    let voteData =  JSON.parse(e.data);
                    _this.chooseOptions = _this.optionArray[voteData.optionsIndex];
                    event.toast(voteData);
//                    添加上服务器过滤掉的属性
//                    if(utils.isNull(voteData.pageBox[0].textHeight)){
//                        event.toast('执行下');
//                        for(let i = 0; i < voteData.pageBox.length ; i++){
//                            voteData.pageBox[i].push({
//                                textHeight:'48',
//                                rowsNum:'1',
//                                editSign:-1,
//                            })
//                        }
//                    }else{
//                        event.toast('执行上');
//                    }
                    _this.voteList.push(voteData);
                    storage.removeItem('voteData');
                })
            }
        },
        methods:{
//            将选择好的时间 重置
            noEndTime:function () {
                this.voteList[0].chooseDate = '无截止时间';
                this.voteList[0].chooseTime = '';
            },
//            选择投票类型
            pickOptions(){
                picker.pick({
//                    默认选中
                    index: this.voteList[0].optionsIndex,
//                    数据选项
                    items: this.optionArray
                }, e => {
                    if (e.result === 'success') {
//                        更改默认选中的下标
                        this.voteList[0].optionsIndex = e.data;
//                        将选择的数据写入chooseOptions
                        this.chooseOptions = this.optionArray[e.data];
                    }
                })
            },
//            选择日期
            pickDate () {
                picker.pickDate({
                    value: this.voteList[0].chooseDate
                }, e => {
                    if (e.result === 'success') {
                        this.voteList[0].chooseDate = e.data;
                        //日期选择完后 马上选择时间。
                        this.pickTime();
                        if(this.voteList[0].chooseTime == ''){
                            this.voteList[0].chooseTime = '请设置时间'
                        }
                    }
                })
            },
//            选择时间
            pickTime () {
                picker.pickTime({
                    value: this.voteList[0].chooseTime
                }, e => {
                    if (e.result === 'success') {
                        this.voteList[0].chooseTime = e.data;
                    }
                })
            },
//            设置每个选项的提示内容
            setPlaceholder:function (index) {
                return '选项' + parseInt(index+1);
            },
//            删除制定选项
            deleteOptions:function (index) {
                console.log(index);
//                modal.toast({message:index,duration:0.3});
                this.voteList[0].pageBox.splice(index,1);
            },
//            添加选项
            addOptions:function () {
                this.voteList[0].pageBox.push({
                    textAreaMessage:'',
                    textHeight:48,
                    rowsNum:1,
                    editSign:-1,
                })
            },
//            选项输入（当一进页面选项里有数据时，会触发该函数）
            optionsOninput:function (e,index) {
                event.toast(index);
                var _this = this;
                var len = this.getLen(e.value);
//                当字符数超过25时，将多行输入改成2行并且高度设为96
//                modal.toast({message:len,duration:0.3})
                if(len > 25){
//                    if(optionIndex == -1){
////            选项输入（当一进页面选项里有数据时，会触发该函数）此时不会更新optionIndex，所以需要手动刷新。
//                        this.voteList[0].pageBox.forEach(function(item){
//                             if(_this.getLen(item.textAreaMessage) > 25){
//                                 item.rowsNum = 2;
//                                 item.textHeight = 96;
//                                 item.editSign = 0;
//                             }
//                        })
//                        return
//                    }
//                    editSign是每个组件的控制符，控制是否切换高度.不用每次输入都执行一次
                    if(this.voteList[0].pageBox[index].editSign == -1){
                        this.voteList[0].pageBox[index].rowsNum = 2;
                        this.voteList[0].pageBox[index].textHeight = 96;
                        this.voteList[0].pageBox[index].editSign = 0;
                    }
                }else{//否则将高度与行数改回来
                    if(this.voteList[0].pageBox[index].editSign == 0){
                        this.voteList[0].pageBox[index].rowsNum = 1;
                        this.voteList[0].pageBox[index].textHeight = 48;
                        this.voteList[0].pageBox[index].editSign = -1;
                    }
                }
            },
//            标题描述输入。
            titleOninput:function (e) {
                var len = this.getLen(e);
                //当字符数超过25时，将多行输入改成2行并且高度设为96
                if(len > 25){
//                    控制是否切换高度.不用每次输入都执行一次
                    if(isSign == -1){
                        this.titleRows = 2;
                        this.titleHeight = 96;
                        isSign = 0;
                    }
                }else{//否则将高度与行数改回来
                    if(isSign == 0){
                        this.titleRows = 1;
                        this.titleHeight = 48;
                        isSign = -1;
                    }
                }
            },
//            获取已输入的字符总长度
            getLen(e){
                var name = e;
                var len = 0;
                for (let i = 0; i < name.length; i++) {
                    var a = name.charAt(i);
                    if (a.match(/[^\x00-\xff]/ig) != null) {
                        len += 2;
                    }
                    else {
                        len += 1;
                    }
                }
                return len;
            },

//            下拉刷新
            onrefresh (e) {
                console.log('is refreshing')
                this.refreshing = true
                setTimeout(() => {
                    this.refreshing = false
                }, 2000)
            },
//            正在下拉
            onpullingdown (e) {
                console.log('is onpulling down')
            },
//            返回
            goback:function () {
                event.closeURL();
            },
//            完成
            goComplete:function () {
                var _this = this;
                let voteData = _this.voteList[0];
                let backData = utils.message('success','成功',voteData);
                event.closeURL(backData);
            }
        }
    }
</script>
