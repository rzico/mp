<template>
    <list class="wrapper">
        <cell>
            <navbar :title="title" > </navbar>
            <!--整个的上方箱子-->
            <div class="voteBox mt20 border-radius">
                <!--第一行 投票描述-->
                <div class="voteTell addBottomBorder">
                    <text class="gray tellSize">投票描述</text>
                    <!--多行文本-->
                    <div class="textareaBox">
                        <textarea class="textareaClass ml10 " data-id="0" v-model="textAreaTitle" @input="titleOninput"  :style="{height:titleHeight + 'px'}"  :rows="titleRows" autofocus="true"></textarea>
                    </div>
                </div>
                <!--第二行开始 选项-->
                <div class="voteTell addBottomBorder optionsBox" v-for="(item,index) in pageBox">
                    <text class="circle pl10"></text>
                    <!--多行文本-->
                    <div class="textareaBox">
                        <!--<textarea class="textareaClass " placeholder="选项1" data-id="1" v-model="textAreaMessage[1].text"  @input="oninput"  :style="{height:textHeight[1].height + 'px'}"  :rows="rowsNum[1].rows"></textarea>-->
                        <textarea class="textareaClass " :placeholder='setPlaceholder(index)' :data-id="index" v-model="item.textAreaMessage"  @input="oninput(index)"  :style="{height:item.textHeight + 'px'}"  :rows="item.rowsNum"></textarea>
                    </div>
                    <text class="closeIcon" :style="{fontFamily:'iconfont'}" v-if="index >= 2" @click="deleteOptions(index)">&#xe60a;</text>
                    <text class="closeIcon" style="width: 40px;"  v-else></text>
                </div>
                <div class="voteTell addOptions" @click="addOptions()">
                    <text class="addSize">+</text>
                    <text class="addSize ml10">添加选项</text>
                </div>
            </div>
        </cell>
        <cell>
            <div class="voteBox mt20 border-radius">
                <!-- 截止时间-->
                <div class="voteTell addBottomBorder optionsBox ">
                    <div class="flexRow">
                        <text class="gray bottomSize">截止时间</text>
                        <!--时间-->
                        <div class="textareaBox ml10 flexRow"  >
                            <!--选择日期-->
                            <text class="bottomSize" @click="pickDate()">{{chooseDate}}</text>
                            <!--选择时间-->
                            <text class="bottomSize ml10" @click="pickTime()">{{chooseTime}}</text>
                        </div>
                    </div>
                    <!--重置时间按钮-->
                    <text class="closeIcon " :style="{fontFamily:'iconfont'}" v-if="this.chooseTime != '' "  @click="noEndTime()">&#xe60a;</text>
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
        </cell>
    </list>
</template>

<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .flexRow{
        flex-direction: row;
        align-items: center;
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
        height:120px;
        align-items: center;
    }
    .addBottomBorder{
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
    }
    .tellSize{
        font-size:38px;
    }
    .voteBox{
        width:710px;
        margin-left: 20px;
        padding-left: 25px;
        background-color: #fff;
    }
</style>


<script>
    import navbar from '../../../include/navbar.vue'
    const modal = weex.requireModule('modal')
    const picker = weex.requireModule('picker')
    var isSign = -1;
    export default {
        data:function () {
            return{
                chooseOptions:'单选(默认)',
                optionsIndex:0,
                chooseDate:'无截止时间',
                chooseTime:'',
                optionArray:['单选(默认)','多选,无限制','多选，最多2项'],
                textAreaTitle:'',
                titleHeight:48,
                titleRows:1,
                pageBox:[{
                    textAreaMessage:'',
                    textHeight:48,
                    rowsNum:1
                },{
                    textAreaMessage:'',
                    textHeight:48,
                    rowsNum:1
                }]
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "投票设置"},
        },
        mounted:function(){
            var domModule = weex.requireModule("dom");
            domModule.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url('http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf')"
            })
        },
        methods:{
//            将选择好的时间 重置
            noEndTime:function () {
              this.chooseDate = '无截止时间';
              this.chooseTime = '';
            },
//            选择投票类型
            pickOptions(){
                picker.pick({
//                    默认选中
                    index: this.optionsIndex,
//                    数据选项
                    items: this.optionArray
                }, event => {
                    if (event.result === 'success') {
//                        更改默认选中的下标
                        this.optionsIndex = event.data;
//                        将选择的数据写入chooseOptions
                        this.chooseOptions = this.optionArray[event.data];
                    }
                })
            },
//            选择日期
            pickDate () {
                picker.pickDate({
                    value: this.chooseDate
                }, event => {
                    if (event.result === 'success') {
                        this.chooseDate = event.data;
                        //日期选择完后 马上选择时间。
                        this.pickTime();
                        if(this.chooseTime == ''){
                            this.chooseTime = '请设置时间'
                        }
                    }
                })
            },
//            选择时间
            pickTime () {
                picker.pickTime({
                    value: this.chooseTime
                }, event => {
                    if (event.result === 'success') {
                        this.chooseTime = event.data;
                    }
                })
            },
            setPlaceholder:function (index) {
                return '选项' + parseInt(index+1);
            },
            deleteOptions:function (index) {
                console.log(index);
                modal.toast({message:index,duration:0.3});
                this.pageBox.splice(index,1);
            },
            addOptions:function () {
                this.pageBox.push({
                    textAreaMessage:'',
                    textHeight:48,
                    rowsNum:1
                })
            },
            //===========以下代码还需要修改=================
            oninput:function (index) {
                var _this = this;
//                实时判断用户输入的字符长度，来动态改变多行输入框的高度
                var name = event.value;
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
//                当字符数超过26时，将多行输入改成2行并且高度设为96
                if(len > 26){
                    _this.pageBox[index].rowsNum = 2;
                    if(isSign == -1){
                        _this.pageBox[index].textHeight = 96;
                        isSign = 0;
                    }
                }else{//否则将高度与行数改回来
                    _this.pageBox[index].rowsNum = 1;
                    if(isSign == 0){
                        _this.pageBox[index].textHeight = 48;
                        isSign = -1;
                    }
                }
            },
            titleOninput:function (event) {

                modal.toast({message: '222', duration: 0.5})
                var name = event.value;
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
                //当字符数超过26时，将多行输入改成2行并且高度设为96
                if(len > 26){
                    this.titleRows = 2;
                    if(isSign == -1){
                        this.titleHeight = 96;
                        isSign = 0;
                    }
                }else{//否则将高度与行数改回来
                    this.titleRows = 1;
                    if(isSign == 0){
                        this.titleHeight = 48;
                        isSign = -1;
                    }
                }
            }
        }
    }
</script>