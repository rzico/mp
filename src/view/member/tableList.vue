<template>
    <div class="wrapper">
        <navbar :title="title" :complete="complete" @goback="goback" > </navbar>
        <list>
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="voteList.length == 0">
                <noData :noDataHint="noDataHint" ></noData>
            </cell>
            <cell v-for="(data,dataIndex) in voteList">
                <div class="voteBigBox" >
                    <div class="voteBox" :class="[dataIndex == 0 ? 'mt20' : 0]">
                        <div class="voteTell optionsBox" :class="[index == data.optionBox.length - 1 ? '' : 'addBottomBorder']" v-for="(item,index) in data.optionBox" >
                            <!--勾选圆形-->
                            <div class="flex-row">
                                <text class="circle "></text>
                                <text class="fz30">{{item.option}}</text>
                            </div>
                            <!--多行文本-->
                            <div class="textareaBox">
                                <!--<textarea class="textareaClass ml10 gray" :placeholder='setPlaceholder(index)' :autofocus="item.autofocus" v-model="item.textAreaMessage" @input="optionsOninput($event,index)"  :style="{height:item.textHeight + 'px'}" :rows="item.rowsNum"></textarea>-->
                                <text class="textareaClass ml10 gray" >{{item.value}}</text>
                            </div>
                            <!--添加选项-->
                            <text class="closeIcon" style="width:60px;"></text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .voteBigBox{
        padding-bottom: 20px;
    }
    .voteBox{
        width:710px;
        margin-left: 20px;
        padding-left: 25px;
        padding-right: 25px;
        border-radius: 20px;
        background-color: #fff;
    }
    .circle{
        width:30px;
        height:30px;
        border-radius: 15px;
        background-color: #fff;
        border-width: 1px;
        border-style: solid;
        border-color: #999;
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
    .textareaClass{
        width:485px;
        /*font-size: 35px;*/
        font-size: 32px;
        line-height: 48px;
    }
    .textareaBox{
        /*height:120px;*/
        height: 100px;
        justify-content: center;
    }
    .optionsBox{
        justify-content: space-between;
        padding-right: 30px;
    }
    .voteTell{
        flex-direction: row;
        /*height:110px;*/
        height: 100px;
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
</style>
<script>
    import navbar from '../../include/navbar.vue';
    import utils from '../../assets/utils';
    const animation = weex.requireModule('animation');
    const event = weex.requireModule('event');
    import { POST, GET } from '../../assets/fetch';
    import noData from '../../include/noData.vue';
    var isSign = -1;
    var optionIndex = -1;
    export default {
        data:function () {
            return{
                refreshing: false,
                voteList:[],
                pageStart:0,
                pageSize:15,
                refreshImg:utils.locate('resources/images/loading.png'),
                clicked:false,
                articleId:''
            }
        },
        components: {
            navbar,
            noData,
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
            title: { default: "表单添加"},
            noDataHint:{default:'暂无表单'},
        },
        created(){
            this.articleId = utils.getUrlParameter('articleId');
            this.title = decodeURIComponent(utils.getUrlParameter('title'));
            this.getAllTable();
        },
        methods:{
            getAllTable(){
                let _this = this;
                GET('weex/member/article/form/list.jhtml?articleId=' + this.articleId + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success' ){
                        if (data.data.start==0) {
                            _this.middleList = [];
                        }
                        data.data.data.forEach(function (item) {
                                if(!utils.isNull(item.data) && item.data != 'null'){
                                    item.data = JSON.parse(item.data);
                                    let optionBox = [];
                                    item.data.options.forEach(function (res,index) {
                                        optionBox.push({
                                            option : res,
                                            value : item.data.values[index]
                                        })
                                    })
                                    item.data.optionBox = optionBox;
                                    _this.middleList.push(item.data);
                                }
                        });
                        _this.voteList = _this.middleList;
                        _this.pageStart = data.data.start + data.data.data.length;
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            onloading:function () {
//                        重新搜索商品
                this.getAllTable();
            },
            onrefresh:function () {
                var _this = this;
                _this.pageStart = 0;
                this.refreshing = true;
                animation.transition(_this.$refs.refreshImg, {
                    styles: {
                        transform: 'rotate(360deg)',
                    },
                    duration: 1000, //ms
                    timingFunction: 'linear',//350 duration配合这个效果目前较好
                    needLayout:false,
                    delay: 0 //ms
                })
                setTimeout(() => {
                    animation.transition(_this.$refs.refreshImg, {
                        styles: {
                            transform: 'rotate(0)',
                        },
                        duration: 10, //ms
                        timingFunction: 'linear',//350 duration配合这个效果目前较好
                        needLayout:false,
                        delay: 0 //ms
                    })
                    this.refreshing = false
                    _this.getAllTable();
                }, 1000)
            },
//            返回
            goback:function () {
                event.closeURL();
            },
        }
    }
</script>
