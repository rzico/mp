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
                            <input class="textareaClass ml10"  v-model="vote.textAreaTitle" placeholder="输入表单主题(如:培训班在线报名)"  autofocus="true" return-key-type="next" />
                            <!--input 必须设置高度和line-height，不然在ios下会出现光标对不齐的问题-->
                        </div>
                    </div>
                    <div class="voteTell addBottomBorder">
                        <text class="gray tellSize">按钮描述</text>
                        <!--多行文本-->
                        <div class="textareaBox">
                            <input class="textareaClass ml10 " data-id="0" v-model="vote.textAreabutton" placeholder="输入提交按钮的描述(如:立即报名)"    autofocus="false" />
                        </div>
                    </div>
                    <!--第二行开始 选项-->
                    <div class="voteTell addBottomBorder optionsBox" v-for="(item,index) in vote.pageBox">
                        <!--勾选圆形-->
                        <text class="circle pl10"></text>
                        <!--多行文本-->
                        <div class="textareaBox">
                            <!--<textarea class="textareaClass " placeholder="选项1" data-id="1" v-model="textAreaMessage[1].text"  @input="oninput"  :style="{height:textHeight[1].height + 'px'}"  :rows="rowsNum[1].rows"></textarea>-->
                            <input class="textareaClass" :class="[index == 0 ? 'ml10' : '']"  :placeholder='setPlaceholder(index) + "(如:姓名/电话/性别)"' :autofocus="item.autofocus" v-model="item.textAreaMessage"  />
                        </div>
                        <!--删除按钮-->
                        <text class="closeIcon" :style="{fontFamily:'iconfont'}" v-if="index >= 1" @click="deleteOptions(index)">&#xe60a;</text>
                        <!--当隐藏删除按钮时需要有空白区域顶起布局-->
                        <text class="closeIcon" style="width:60px;"v-else></text>
                    </div>
                    <!--添加选项-->
                    <div class="voteTell addOptions " @click="addOptions()">
                        <text class="addSize">+</text>
                        <text class="addSize ml10">添加输入栏</text>
                    </div>
                </div>
            </div>
            <div>
                <text class="fz32 mt10 bt10 ml20 gray">表单在文章中的效果预览:</text>
            </div>
            <!--预览盒子-->
            <div class="voteBigBox" v-for="vote in voteList">
                <!--整个的上方箱子-->
                <div class="voteBox mt20 border-radius">
                    <!--第一行 投票描述-->
                    <div class="voteTell addBottomBorder">
                        <text class=" tellSize previewLine">{{vote.textAreaTitle | watchPreviewTitle}}</text>
                        <!--多行文本-->
                        <!--<div class="textareaBox">-->
                            <!--<textarea class="textareaClass ml10" data-id="0" v-model="vote.textAreaTitle" @input="titleOninput" placeholder="输入表单主题"  :style="{height:titleHeight + 'px'}"  :rows="titleRows" autofocus="true" return-key-type="next"></textarea>-->
                        <!--</div>-->
                    </div>
                    <!--<div class="voteTell addBottomBorder">-->
                        <!--<text class="gray tellSize">按钮描述</text>-->
                        <!--&lt;!&ndash;多行文本&ndash;&gt;-->
                        <!--<div class="textareaBox">-->
                            <!--<textarea class="textareaClass ml10 " data-id="0" v-model="vote.textAreabutton" placeholder="输入提交按钮的描述"  :style="{height:titleHeight + 'px'}"  :rows="titleRows" autofocus="false"></textarea>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--第二行开始 选项-->
                    <div class="voteTell addBottomBorder optionsBox" v-for="(item,index) in vote.pageBox">
                        <!--勾选圆形-->
                        <text class="circle pl10"></text>
                        <!--多行文本-->
                        <div class="textareaBox">
                            <!--<textarea class="textareaClass " placeholder="选项1" data-id="1" v-model="textAreaMessage[1].text"  @input="oninput"  :style="{height:textHeight[1].height + 'px'}"  :rows="rowsNum[1].rows"></textarea>-->
                            <input class="textareaClass"  :class="[index == 0 ? 'ml10' : '']"  :placeholder='setPreviewPlaceholder(index,item)'   />
                        </div>
                        <!--删除按钮-->
                        <!--<text class="closeIcon" :style="{fontFamily:'iconfont'}" v-if="index >= 1" @click="deleteOptions(index)">&#xe60a;</text>-->
                        <!--当隐藏删除按钮时需要有空白区域顶起布局-->
                        <text class="closeIcon" style="width:60px;"></text>
                    </div>
                    <!--添加选项-->
                    <div class="voteTell addOptions " @click="addOptions()">
                        <!--<text class="addSize">+</text>-->
                        <text class="addSizePreview ml10">{{vote.textAreabutton | watchPreviewBtn}}</text>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .voteBigBox{
        padding-bottom: 20px;
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
    .pl10{
        margin-left: 20px;
    }
    .closeIcon{
        font-size: 26px;
        color: #ccc;
        font-weight: 700;
        padding-bottom: 10px;
        padding-top: 10px;
        padding-right: 10px;
        padding-left: 10px
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
        line-height: 48px;
        height:48px;
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
                    textAreaTitle:'',
                    textAreabutton:'',
                    pageBox:[{
                        textAreaMessage:'',
//                        textHeight:'48',
//                        rowsNum:'1',
                        editSign:-1,
                        autofocus:false,
                    },{
                        textAreaMessage:'',
//                        textHeight:48,
//                        rowsNum:1,
                        editSign:-1,
                        autofocus:false,
                    }]
                });
                return;
            }else{
                //                编辑投票。
                storage.getItem(vote, e => {
                    let voteData =  JSON.parse(e.data);
//                    _this.chooseOptions = _this.optionArray[voteData.optionsIndex];
//                    event.toast(voteData);
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
                    storage.removeItem(vote);
                })
            }
        },
        methods:{
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
                    return '描述' + parseInt(index+1);
                }
//                return this.voteList[0].pageBox[index].textAreaMessage
                return item.textAreaMessage;
            },
//            设置每个选项的提示内容
            setPlaceholder:function (index) {
                return '描述' + parseInt(index+1);
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
//                    textHeight:48,
//                    rowsNum:1,
                    editSign:-1,
                    autofocus:true,
                })
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
////                        this.voteList[0].pageBox.forEach(function(item){
////                             if(_this.getLen(item.textAreaMessage) > 25){
////                                 item.rowsNum = 2;
////                                 item.textHeight = 96;
////                                 item.editSign = 0;
////                             }
////                        })
////                        return
////                    }
////                    editSign是每个组件的控制符，控制是否切换高度.不用每次输入都执行一次
//                    if(this.voteList[0].pageBox[index].editSign == -1){
//                        this.voteList[0].pageBox[index].rowsNum = 2;
//                        this.voteList[0].pageBox[index].textHeight = 96;
//                        this.voteList[0].pageBox[index].editSign = 0;
//                    }
//                }else{//否则将高度与行数改回来
//                    if(this.voteList[0].pageBox[index].editSign == 0){
//                        this.voteList[0].pageBox[index].rowsNum = 1;
//                        this.voteList[0].pageBox[index].textHeight = 48;
//                        this.voteList[0].pageBox[index].editSign = -1;
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
                if(utils.isNull(this.voteList[0].textAreaTitle)){
                    event.toast('请输入表单标题');
                    return;
                }
                if(utils.isNull(this.voteList[0].textAreabutton)){
                    event.toast('请输入按钮描述');
                    return;
                }
                let mesNum = 0;
                for(let i = 0; i< this.voteList[0].pageBox.length;i++) {
                    if (utils.isNull(this.voteList[0].pageBox[i].textAreaMessage)) {
                        mesNum++;
                    }
                }
                if(mesNum > 0){
                    event.toast('请将描述填写完整');
                    return;
                }
                let voteData = _this.voteList[0];
                let backData = utils.message('success','成功',voteData);
                event.closeURL(backData);
            }
        }
    }
</script>
