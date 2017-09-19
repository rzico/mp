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
                    <!--勾选圆形-->
                    <text class="circle pl10"></text>
                    <!--多行文本-->
                    <div class="textareaBox">
                        <!--<textarea class="textareaClass " placeholder="选项1" data-id="1" v-model="textAreaMessage[1].text"  @input="oninput"  :style="{height:textHeight[1].height + 'px'}"  :rows="rowsNum[1].rows"></textarea>-->
                        <textarea class="textareaClass " :placeholder='setPlaceholder(index)' v-model="item.textAreaMessage"  @focus="onfocus(index)" @input="optionsOninput"  :style="{height:item.textHeight + 'px'}"  :rows="item.rowsNum"></textarea>
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
    import JsEncrypt from 'jsencrypt/bin/jsencrypt'
    Vue.prototype.$jsEncrypt = JsEncrypt
//    let jse = new this.$jsEncrypt.JSEncrypt()
//    jse.setPublicKey(MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8ygMKjJLSUpnfXqt8lRSAdDxAHWKi9GbTFkCbAjkRCR6VUakxxXLXHQUtPCizKcvNpuYqZ5bO8LEgpY7SL3JEdEI9OuMnZ6ToeHPfcHeS+EgN0oYmdQ49RB5wZkcBEFk80OBEAM6VhnE0IuHGkU5ko9oPHq3boEQ3Ej6r3T+UhQIDAQAB)

    import navbar from '../../../include/navbar.vue'
    const modal = weex.requireModule('modal')
    const picker = weex.requireModule('picker')
    var isSign = -1;
    var optionIndex = 0;
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
                    textHeight:'48',
                    rowsNum:'1',
                    editSign:-1,
                },{
                    textAreaMessage:'',
                    textHeight:48,
                    rowsNum:1,
                    editSign:-1,
                }]
            }
        },
        //引入组件
        components: {
            navbar
        },
        props: {
            title: { default: "投票设置"},
        },
        created(){
            let jse = new this.$jsEncrypt.JSEncrypt();
//            设置公钥
            jse.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8ygMKjJLSUpnfXqt8lRSAdDxAHWKi9GbTFkCbAjkRCR6VUakxxXLXHQUtPCizKcvNpuYqZ5bO8LEgpY7SL3JEdEI9OuMnZ6ToeHPfcHeS+EgN0oYmdQ49RB5wZkcBEFk80OBEAM6VhnE0IuHGkU5ko9oPHq3boEQ3Ej6r3T+UhQIDAQAB');
            let encrypted = jse.encrypt('Hello, world');
            console.log('===');
            console.log(encrypted);
//            设置秘钥
            jse.setPrivateKey('MIICXgIBAAKBgQC8ygMKjJLSUpnfXqt8lRSAdDxAHWKi9GbTFkCbAjkRCR6VUakxxXLXHQUtPCizKcvNpuYqZ5bO8LEgpY7SL3JEdEI9OuMnZ6ToeHPfcHeS+EgN0oYmdQ49RB5wZkcBEFk80OBEAM6VhnE0IuHGkU5ko9oPHq3boEQ3Ej6r3T+UhQIDAQABAoGBAIO8JwEedHlE4FBovBsT4Bl+gmhu2NxC1NlpBq3jkDSd+3RQZlLvp6IJgwo8l13lxWv8kVF3tVkzxTW1sQJjz0RYShH8vXLl94gf6mFkJbeOPP6uA0mGDG81yINwKUpE0RM6ZM9yKEeVdK3u67TkEBcC6Td5KBl8Yof3q7qxiOWhAkEA4BXEtpnfhgm37s1VjDxdIHTtWL1PihMT+SCOqp+Vv27ABVrxtDW/w2R3ZzR5ezROI2v1DVhj5wvsxPGXx6OpSQJBANetVvazS/5SQNvb+Cmjw9Rt5NilyxfX5IsSswaIojbwhZY2FVZyAlFH9K/YS2FYFyU7iIqN6IIkOxXpOcj/bV0CQQCRYM4MgWuotClmfkSgBJGOew144uj1dUch+2NTgtFOLvXZA5WICs7sXwOwKzUdH2QKSwHitJOr0+q6ItsLpDwxAkBXzvDK+/CCmIZjfMkqWsxN3nf/ZHCtQm5/2Jsem94/M+mPYHGLgltDMGKEfTEjbrPtqrFKh8ATzCBqKUwncybZAkEAmVNW1dftWWoriZZXXMvfFkTDgYvRmytoVEThhnd0J/AOhZiUAs9+kHfGKivlTE209AY6Bw8aRzuTCziSwQhhBQ== ')
            let decrypted = jse.decrypt(encrypted)
            console.log("解密");
            console.log(decrypted);
        },
//        引入字体图标
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
//            设置每个多行文本选项的提示字
            setPlaceholder:function (index) {
                return '选项' + parseInt(index+1);
            },
//            删除选项
            deleteOptions:function (index) {
                console.log(index);
                this.pageBox.splice(index,1);
            },
//            添加选项
            addOptions:function () {
                this.pageBox.push({
                    textAreaMessage:'',
                    textHeight:48,
                    rowsNum:1,
                    editSign:-1,
                })
            },
//            通过获取焦点来获取当前输入的组件下标
            onfocus:function (index) {
                optionIndex = index;
            },
//            选项输入
            optionsOninput:function (event) {
                var len = this.getLen(event);
//                当字符数超过26时，将多行输入改成2行并且高度设为96
                if(len > 26){
//                    editSign是每个组件的控制符，控制是否切换高度.不用每次输入都执行一次
                    if(this.pageBox[optionIndex].editSign == -1){
                        this.pageBox[optionIndex].rowsNum = 2;
                         this.pageBox[optionIndex].textHeight = 96;
                        this.pageBox[optionIndex].editSign = 0;
                    }
                }else{//否则将高度与行数改回来
                    if(this.pageBox[optionIndex].editSign == 0){
                        this.pageBox[optionIndex].rowsNum = 1;
                        this.pageBox[optionIndex].textHeight = 48;
                        this.pageBox[optionIndex].editSign = -1;
                    }
                }
            },

//            标题描述输入。
            titleOninput:function (event) {
                var len = this.getLen(event);
                //当字符数超过26时，将多行输入改成2行并且高度设为96
                if(len > 26){
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
            getLen(event){
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
                return len;
            }
        }
    }
</script>
