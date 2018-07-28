<template>
    <div class="wrapper">
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="goComplete"> </navbar>
        <scroller>
            <div class="voteBigBox" v-for="vote in voteList">
                <!--整个的上方箱子-->
                <div class="voteBox mt20 border-radius">
                    <!--第一行 投票描述-->
                    <div class="voteTell addBottomBorder">
                        <text class="gray tellSize">标题描述</text>
                        <!--多行文本-->
                        <div class="textareaBox">
                            <!--<textarea class="textareaClass ml10" data-id="0" v-model="vote.textAreaTitle" placeholder="输入表单主题"  :style="{height:titleHeight + 'px'}"  :rows="titleRows" autofocus="true" return-key-type="next"></textarea>-->
                            <input class="textareaClass ml10"  v-model="vote.title" placeholder="输入表单主题(如:培训班在线报名)"  autofocus="true" return-key-type="next" />
                            <!--input 必须设置高度和line-height，不然在ios下会出现光标对不齐的问题-->
                        </div>
                    </div>
                    <div class="voteTell addBottomBorder">
                        <text class="gray tellSize">按钮描述</text>
                        <!--多行文本-->
                        <div class="textareaBox">
                            <input class="textareaClass ml10 " data-id="0" v-model="vote.buttonName" placeholder="输入提交按钮的描述(如:立即报名)"    autofocus="false" />
                        </div>
                    </div>
                    <div v-for="(data,mesIndex) in vote.options">
                        <!--输入栏-->
                        <div class="voteTell addBottomBorder optionsBox" v-if="data.type == 'option'">
                            <!--勾选圆形-->
                            <text class="fz50 ml20" :style="{fontFamily:'iconfont'}">&#xe61d;</text>
                            <!--多行文本-->
                            <div class="textareaBox" >
                                <!--<textarea class="textareaClass " placeholder="选项1" data-id="1" v-model="textAreaMessage[1].text"  @input="oninput"  :style="{height:textHeight[1].height + 'px'}"  :rows="rowsNum[1].rows"></textarea>-->
                                <input class="textareaClass" placeholder='输入栏描述(如:姓名/电话/性别)' :autofocus="data.autofocus" v-model="data.textAreaMessage"  />
                            </div>
                            <!--删除按钮-->
                            <text class="closeIcon" :style="{fontFamily:'iconfont'}" v-if="mesIndex >= 1" @click="deleteOptions(mesIndex)">&#xe60a;</text>
                            <!--当隐藏删除按钮时需要有空白区域顶起布局-->
                            <text class="closeIcon" style="width:60px;"v-else></text>
                        </div>
                        <!--单选-->
                        <div  class="addBottomBorder" v-else-if="data.type == 'single'">
                            <div class="voteTell optionsBox">
                                <!--勾选圆形-->
                                <text class="fz48 ml20" :style="{fontFamily:'iconfont'}">&#xe609;</text>
                                <!--多行文本-->
                                <div class="textareaBox">
                                    <!--<textarea class="textareaClass " placeholder="选项1" data-id="1" v-model="textAreaMessage[1].text"  @input="oninput"  :style="{height:textHeight[1].height + 'px'}"  :rows="rowsNum[1].rows"></textarea>-->
                                    <input class="textareaClass ml10 "   placeholder='单选框标题(如:请选择幼儿园班级)' autofocus="true" v-model="data.title"  />
                                </div>
                                <!--删除按钮-->
                                <text class="closeIcon" :style="{fontFamily:'iconfont'}"  @click="deleteOptions(mesIndex)">&#xe60a;</text>
                            </div>
                            <div class="voteTell optionsBox smallHeight" v-for="(item,index) in data.single">
                                <!--勾选圆形-->
                                <text class="circle ml25"></text>
                                <!--多行文本-->
                                <div class="textareaBox">
                                    <!--<textarea class="textareaClass " placeholder="选项1" data-id="1" v-model="textAreaMessage[1].text"  @input="oninput"  :style="{height:textHeight[1].height + 'px'}"  :rows="rowsNum[1].rows"></textarea>-->
                                    <input class="textareaClass ml10 fz30"   placeholder='选项描述(如:幼儿园大/小班)' :autofocus="item.autofocus" v-model="item.textAreaMessage"  />
                                </div>
                                <!--<div v-if="isLastSingle(index,data)">-->
                                <div v-if="index >= 2">
                                    <!--添加按钮-->
                                    <text class="closeIcon" :style="{fontFamily:'iconfont'}" @click="deleteSingleOptions(mesIndex,index)">&#xe60a;</text>
                                </div>
                                <div v-else>
                                    <!--删除按钮-->
                                    <!--<text class="closeIcon" :style="{fontFamily:'iconfont'}" v-if="index == 0" @click="deleteSingleOptions(mesIndex)">&#xe60a;</text>-->
                                    <!--当隐藏删除按钮时需要有空白区域顶起布局-->
                                    <text class="closeIcon" style="width:60px;" ></text>
                                </div>
                            </div>
                            <div class="voteTell flex1  flex-center smallHeight pb10" @click="addSingleLine(mesIndex)">
                                <text class="addSize ml10 gray fz30">+ 添加选择行</text>
                            </div>
                        </div>
                    </div>
                    <!--添加选项-->
                    <div class="voteTell addOptions">
                        <!--<text class="addSize">+</text>-->
                        <div class="voteTell flex1  flex-center" @click="addSingleOptions()">
                            <text class="addSize ml10">添加单项选择</text>
                        </div>
                        <div class="voteTell flex1  flex-center" @click="addOptions()">
                            <text class="addSize ml10">添加输入栏</text>
                        </div>
                    </div>
                </div>
            </div>
            <!--预览盒子-->
            <div class="voteBigBox" v-for="vote in voteList">
                <div>
                    <text class="fz32 mt10 bt10 ml20 gray">表单在文章中的效果预览:</text>
                </div>
                <!--整个的上方箱子-->
                <div class="voteBox mt20 border-radius">
                    <!--第一行 投票描述-->
                    <div class="voteTell addBottomBorder">
                        <text class=" tellSize previewLine">{{vote.title | watchPreviewTitle}}</text>
                    </div>

                    <div v-for="(data,mesIndex) in vote.options">
                        <!--输入栏-->
                        <div class="voteTell addBottomBorder optionsBox" v-if="data.type == 'option'">
                            <!--勾选圆形-->
                            <text class="fz50 ml20" :style="{fontFamily:'iconfont'}">&#xe61d;</text>
                            <!--多行文本-->
                            <div class="textareaBox" >
                                <input class="textareaClass ml10"   :placeholder='setPreviewPlaceholder(mesIndex,data)'   />
                            </div>
                            <text class="closeIcon"></text>
                        </div>
                        <!--单选-->
                        <div  class="addBottomBorder" v-else-if="data.type == 'single'">
                            <div class="voteTell optionsBox">
                                <!--勾选圆形-->
                                <text class="fz48 ml20" :style="{fontFamily:'iconfont'}">&#xe609;</text>
                                <!--多行文本-->
                                <div class="textareaBox">
                                    <text class="textareaClass lineCtrl ml10" >{{data.title | watchsingleMes}}</text>
                                </div>
                                <!--删除按钮-->
                                <text class="closeIcon"></text>
                            </div>
                            <div class="voteTell optionsBox smallHeight" v-for="(item,index) in data.single">
                                <!--勾选圆形-->
                                <text class="circle ml25"></text>
                                <!--多行文本-->
                                <div class="textareaBox">
                                    <!--<textarea class="textareaClass " placeholder="选项1" data-id="1" v-model="textAreaMessage[1].text"  @input="oninput"  :style="{height:textHeight[1].height + 'px'}"  :rows="rowsNum[1].rows"></textarea>-->
                                    <text class="textareaClass lineCtrl ml10 fz30" >{{item.textAreaMessage | watchsingleMes}}</text>
                                </div>
                                <!--当隐藏删除按钮时需要有空白区域顶起布局-->
                                <text class="closeIcon"></text>
                            </div>
                        </div>
                    </div>
                    <!--添加选项-->
                    <div class="voteTell addOptions " >
                        <!--<text class="addSize">+</text>-->
                        <text class="addSizePreview ml10">{{vote.buttonName | watchPreviewBtn}}</text>
                    </div>
                </div>
            </div>
            <div class="fullHegigt">

            </div>
        </scroller>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .smallHeight{
        height:80px;
    }

    .fullHegigt{
        height:700px;
    }
    .voteBigBox{
        padding-bottom: 20px;
    }
    .circle{
        width:40px;
        height:40px;
        border-radius: 20px;
        background-color: #fff;
        border-width: 1px;
        border-style: solid;
        border-color: #999;
    }
    .addSizePreview{
        color: #000;
        font-size: 35px;
    }
    .addSize{
        color: #D9141E;
        font-size: 35px;
    }
    .addOptions{
        justify-content: center;
    }
    .closeIcon{
        font-size: 26px;
        color: #ccc;
        font-weight: 700;
        padding-bottom: 10px;
        padding-top: 10px;
        padding-right: 10px;
        padding-left: 10px;
        width:60px;
        text-align:center;
    }
    .previewLine{
        width:620px;
        /*lines:2;*/
        /*text-overflow:ellipsis;*/
    }
    .textareaClass{
        width:485px;
        /*font-size: 35px;*/
        font-size: 32px;
        /*line-height: 48px;*/
        /*height:48px;*/

        line-height: 120px;
        height:120px;
    }
    .lineCtrl{
        lines:1;
        text-overflow: ellipsis;
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
        font-size:35px;
    }
    .voteBox{
        width:710px;
        margin-left: 20px;
        padding-right: 25px;
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
//                chooseOptions:'单选(默认)',
//                optionArray:['单选(默认)','多选，最多2项','多选,无限制'],
//                titleHeight:48,
//                titleRows:1,
            }
        },
        components: {
            navbar
        },
        filters:{
            watchPreviewTitle(value){
                if(utils.isNull(value)){
                    return '表单主题'
                }
                return value;
            },
            watchPreviewBtn(value){
                if(utils.isNull(value)){
                    return '按钮描述'
                }
                return value;
            },
            watchsingleMes(value){
                if(utils.isNull(value)){
                    return '未设置';
                }
                return value;
            }
        },
        props: {
            title: { default: "表单设置"},
            complete:{ default:"完成"}
        },
        created(){
            var _this = this;
            utils.initIconFont();
            var vote = utils.getUrlParameter('name');
            if(utils.isNull(vote)){
//               添加新的投票
                this.voteList.push({
                    title:'',
                    buttonName:'',
                    options:[
                        {
                            type:'option',
                            textAreaMessage:'',
                            autofocus:false,
                        }
                    ],
                    values:['']
                });
                return;
            }else{
                //                编辑投票。
                storage.getItem(vote, e => {
                    let voteData =  JSON.parse(e.data);
//                    let optionBox = [];
//                    voteData.values.forEach(function (mes,mesIndex) {
//                        if(utils.isNull(mes)){
//                            optionBox.push({
//                                type:'option',
//                                textAreaMessage:voteData.options[mesIndex],
//                                autofocus:false,
//                            })
//                        }else{
//                            let a = mes.split(',');
//                            let b = [];
//                            for(let i = 0; i < a.length; i++){
//                                b.push({
//                                    textAreaMessage:a[i],
//                                    autofocus:false,
//                                    choose:false,
//                                })
//                            }
//                            optionBox.push({
//                                type:'single',
//                                title:voteData.options[mesIndex],
//                                single:b,
//                            })
//                        }
//                    })
//                    voteData.options = optionBox;
                    _this.voteList.push(voteData);
                    storage.removeItem(vote);
                })
            }
        },
        methods:{
            isLastSingle(index,mes){
                return index == mes.single.length -1;
            },
//            选择投票类型
//            pickOptions(){
//                picker.pick({
////                    默认选中
//                    index: this.voteList[0].optionsIndex,
////                    数据选项
//                    items: this.optionArray
//                }, e => {
//                    if (e.result === 'success') {
////                        更改默认选中的下标
//                        this.voteList[0].optionsIndex = e.data;
////                        将选择的数据写入chooseOptions
//                        this.chooseOptions = this.optionArray[e.data];
//                    }
//                })
//            },
//            设置preview的事例
            setPreviewPlaceholder:function (index,item) {
                if(utils.isNull(item.textAreaMessage)){
                    return '单选框描述' + parseInt(index+1);
                }
//                return this.voteList[0].options[index].textAreaMessage
                return item.textAreaMessage;
            },
//            设置每个选项的提示内容
            setPlaceholder:function (index) {
                return '输入栏描述' + parseInt(index+1);
            },
//            设置每个单选框的提示内容
            setPrePlaceholder:function (index) {
                return '输入栏描述' + parseInt(index+1);
            },
//            删除输入栏选项
            deleteOptions:function (index) {
                let _this = this;
//                modal.toast({message:index,duration:0.3});
//                utils.debug(this.voteList[0].options);
//                this.voteList[0].options[index].textAreaMessage = '你好';
//                this.voteList[0].options[index].single[1].textAreaMessage = '你好';
//                this.voteList[0].options.splice(index,1);
//                utils.debug(this.voteList[0].options);
                let middleList = [];
                this.voteList[0].options.forEach(function (item,itemIndex) {
                    if(itemIndex != index){
                        middleList.push(item);
                    }
                })
                this.voteList[0].options = [];
                setTimeout(function () {
                    _this.voteList[0].options = middleList;
                },10)
//                this.voteList[0].options = middleList;
//                utils.debug(middleList);
//                utils.debug('哈伦');
//                utils.debug(this.voteList[0].options);

//                this.voteList[0].values.splice(index,1);
            },
//            删除单项选择单行
            deleteSingleOptions:function(mesIndex,index){
                this.voteList[0].options[mesIndex].single.splice(index,1);
//                let a = this.voteList[0].values[mesIndex].split(',');
//                a.splice(index,1);
//                let b = '';
//                for(let i = 0; i < a.length; i++){
//                    if(i + 1 >= a.length){
//                        b  += a[i]
//                    }else{
//                        b  += a[i] + ',';
//                    }
//                }
//                this.voteList[0].values[mesIndex] = b;
            },
//            添加选项
            addOptions:function () {
                this.voteList[0].options.push({
                    type:'option',
                    textAreaMessage:'',
                    autofocus:true,
                });
//                this.voteList[0].values.push('');
            },
//            添加单选
            addSingleOptions:function () {
                this.voteList[0].options.push({
                    type:'single',
                    title:'',
                    single:[{
                        textAreaMessage:'',
                        autofocus:false,
                        choose:false,
                    },{
                        textAreaMessage:'',
                        autofocus:false,
                        choose:false,
                    }]
                });
//                this.voteList[0].values.push(',');
            },
            addSingleLine:function (index) {
                this.voteList[0].options[index].single.push({
                    textAreaMessage:'',
                    autofocus:true,
                    choose:false,
                })
//                this.voteList[0].values[index] += ',';
            },
//            选项输入（当一进页面选项里有数据时，会触发该函数）
//            optionsOninput:function (e,index) {
//                var _this = this;
//                var len = this.getLen(e.value);
////                当字符数超过25时，将多行输入改成2行并且高度设为96
////                modal.toast({message:len,duration:0.3})
//                if(len > 29){
////                    if(optionIndex == -1){
//////            选项输入（当一进页面选项里有数据时，会触发该函数）此时不会更新optionIndex，所以需要手动刷新。
////                        this.voteList[0].options.forEach(function(item){
////                             if(_this.getLen(item.textAreaMessage) > 25){
////                                 item.rowsNum = 2;
////                                 item.textHeight = 96;
////                                 item.editSign = 0;
////                             }
////                        })
////                        return
////                    }
////                    editSign是每个组件的控制符，控制是否切换高度.不用每次输入都执行一次
//                    if(this.voteList[0].options[index].editSign == -1){
//                        this.voteList[0].options[index].rowsNum = 2;
//                        this.voteList[0].options[index].textHeight = 96;
//                        this.voteList[0].options[index].editSign = 0;
//                    }
//                }else{//否则将高度与行数改回来
//                    if(this.voteList[0].options[index].editSign == 0){
//                        this.voteList[0].options[index].rowsNum = 1;
//                        this.voteList[0].options[index].textHeight = 48;
//                        this.voteList[0].options[index].editSign = -1;
//                    }
//                }
//            },
////            标题描述输入。
//            titleOninput:function (e) {
//                var len = this.getLen(e);
//                //当字符数超过25时，将多行输入改成2行并且高度设为96
//                if(len > 25){
////                    控制是否切换高度.不用每次输入都执行一次
//                    if(isSign == -1){
//                        this.titleRows = 2;
//                        this.titleHeight = 96;
//                        isSign = 0;
//                    }
//                }else{//否则将高度与行数改回来
//                    if(isSign == 0){
//                        this.titleRows = 1;
//                        this.titleHeight = 48;
//                        isSign = -1;
//                    }
//                }
//            },
////            获取已输入的字符总长度
//            getLen(e){
//                var name = e;
//                var len = 0;
//                for (let i = 0; i < name.length; i++) {
//                    var a = name.charAt(i);
//                    if (a.match(/[^\x00-\xff]/ig) != null) {
//                        len += 2;
//                    }
//                    else {
//                        len += 1;
//                    }
//                }
//                return len;
//            },

//            下拉刷新
            onrefresh (e) {
                console.log('is refreshing')
                this.refreshing = true
                setTimeout(() => {
                    this.refreshing = false
                }, 2000)
            },
//            返回
            goback:function () {
                event.closeURL();
            },
//            完成
            goComplete:function () {
                var _this = this;
                if(utils.isNull(this.voteList[0].title)){
                    event.toast('请输入表单标题');
                    return;
                }
                if(utils.isNull(this.voteList[0].buttonName)){
                    event.toast('请输入按钮描述');
                    return;
                }
                let mesNum = 0;
                for(let i = 0; i< this.voteList[0].options.length;i++) {
                    if(this.voteList[0].options[i].type == 'option'){
                        if (utils.isNull(this.voteList[0].options[i].textAreaMessage)) {
                            mesNum++;
                        }
                    }else if(this.voteList[0].options[i].type == 'single'){
                        for(let j = 0;j < this.voteList[0].options[i].single.length;j++){
                            if (utils.isNull(this.voteList[0].options[i].single[j].textAreaMessage)) {
                                mesNum++;
                            }
                        }
                    }
                }
                if(mesNum > 0){
                    event.toast('请将描述填写完整');
                    return;
                }

//                for(let i = 0; i< this.voteList[0].options.length;i++) {
//                    for(let j = 0;j < this.voteList[0].options[i].single.length;j++){
//                        if (utils.isNull(this.voteList[0].options[i].single[j].textAreaMessage)) {
//                            mesNum++;
//                        }
//                    }
//                }
//                if(mesNum > 0){
//                    event.toast('请将单选描述填写完整');
//                    return;
//                }

                let voteData = _this.voteList[0];
                let backData = utils.message('success','成功',voteData);
                event.closeURL(backData);
            }
        }
    }
</script>
