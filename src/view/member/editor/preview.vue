<template>
    <scroller class="wrapper">
        <!--导航栏-->
        <navbar :title="title"  @goback="goback" :complete="complete" @goComplete="goComplete"></navbar>
        <!--网页-->
        <web class="webView" :src="webUrl"></web>
        <!--下一步-->
        <div class="footBox">
            <text class="nextStep">下一步</text>
        </div>
        <!--模版-->
        <div class="templateIcon"  @click="chooseTemplate()" key="templateIcon" v-if="!templateChoose">
            <text class="templateText" >模版</text>
        </div>
        <transition name="slide-fade" mode="out-in">
            <!--模版内容-->
            <div class="templateBox" v-if="templateChoose"  key="templateContent">
                <div class="templateBtn">
                    <div class="btnTextBox">
                        <text class="btnTextSize" :style="{fontFamily:'iconfont'}">&#xe608;</text>
                        <text class="btnTextSize " style="padding-left: 10px">图上字下</text>
                    </div>
                    <div class="btnTextBox"  @click="chooseTemplate()">
                        <text class="btnTextSize btnTextColor" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                        <text class="btnTextSize btnTextColor" style="padding-left: 10px">完成</text>
                    </div>
                </div>
                <div>
                    <scroller  class="templateImgBox" scroll-direction="horizontal">
                        <image v-for="item in imageList" :src="item.url" resize="cover" :class="[item.tickShow ? 'imgActive': '','templateImg']" @click="tickImage(item)"></image>
                    </scroller>
                </div>
                <div>
                    <scroller  class="templateTitleBox"  scroll-direction="horizontal">
                        <text v-for="item in titleList"  :class="[item.tickShow ? 'titleActive': '','templateTitle']" @click="tickTitle(item)">{{item.name}}</text>
                    </scroller>
                </div>
            </div>
        </transition>
    </scroller>
</template>

<style lang="less" src="../../../style/wx.less"/>
<style>
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .2s ease;
    }
    /*.slide-fade-leave-active {*/
    /*transition: all .3s ;*/
    /*}*/
    .slide-fade-enter{
        transform: translateY(300px);
        opacity: 1;
    }
    .btnTextColor{
        color:#F0AD3C;
    }
    .btnTextSize{
        font-size: 32px;
        color: #fff;
    }
    .btnTextBox{
        background-color: #171717;
        padding-bottom: 12px;
        padding-right: 20px;
        padding-left: 20px;
        padding-top: 12px;
        border-radius: 30px;
        flex-direction: row;
        align-items: center;
    }
    .templateBtn{
        position: fixed;
        bottom: 300px;
        left: 10px;
        right: 10px;
        flex-direction: row;
        justify-content: space-between;
    }
    .imgActive{
        border-style: solid;
        border-color: #D9141E;
        border-width: 5px;
    }
    .titleActive{
        background-color: #888;
    }
    .templateTitle{
        color: #ccc;
        font-size: 28px;
        margin-left: 10px;
        margin-right: 10px;
        padding-left: 13px;
        padding-right: 13px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 15px;
    }
    .templateImgBox{
        flex-direction: row;
        padding-bottom: 10px;
        padding-top: 20px;
        background-color: #171717;
    }
    .templateTitleBox{
        flex-direction: row;
        height: 70px;
        align-items: center;
        background-color: #0A1217;
        opacity: 0.8;
    }
    .templateImg{
        width: 130px;
        height:190px;
        margin-left: 5px;
        margin-right: 5px;
        box-sizing: content-box;
    }

    .templateBox{
        height: 290px;
        position: fixed;
        left:0;
        right: 0;
        bottom: 0;
        background-color: #333;
    }
    .templateText{
        color: #fff;
        font-size: 28px;
    }
    .templateIcon{
        position: fixed;
        bottom: 135px;
        align-items: center;
        justify-content: center;
        border-radius: 45px;
        right: 30px;
        width:90px;
        height:90px;
        background-color: red;
    }
    .nextStep{
        color: #fff;
        font-size: 38px;
    }
    .footBox{
        align-items: center;
        justify-content: center;
        width:750px;
        height:100px;
        background-color: #D9141E;
        position: fixed;
        bottom: 0;
    }
    .webView{
        width:750px;
        position: absolute;
        top:136px;
        bottom: 100px;
    }
</style>

<script>
    const modal = weex.requireModule('modal');
    import navbar from '../../../include/navbar.vue'
    import utils from '../../../assets/utils';
    const event = weex.requireModule('event');
    export default {
        data:function () {
            return{
                templateChoose:false,
                webUrl:'http://www.baidu.com',
                lastImageItem:'',
                lastTitleItem:'',
                articleId:'',
                imageList:[{
                    url:'http://static2.ivwen.com/app/template/template_8081.png?v=1',
                    tickShow:false,
                },{
                    url:'http://static2.ivwen.com/app/template/template_8082.png',
                    tickShow:false,
                },{
                    url:'http://static2.ivwen.com/app/template/template_47.png',
                    tickShow:false,
                },{
                    url:'http://static2.ivwen.com/app/template/template_41.png',
                    tickShow:false,
                },{
                    url:'http://static2.ivwen.com/app/template/template_49.png',
                    tickShow:false,
                },{
                    url:'http://static2.ivwen.com/app/template/template_44.png',
                    tickShow:false,
                },{
                    url:'http://static2.ivwen.com/app/template/template_45.png',
                    tickShow:false,
                },{
                    url:'http://static2.ivwen.com/app/template/template_46.png',
                    tickShow:false,
                },{
                    url:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    tickShow:false,
                },],
                titleList:[{name:'假期', tickShow:false,},{name:'摄影', tickShow:false,},{name:'请柬', tickShow:false,},{name:'经典', tickShow:false,},{name:'假期', tickShow:false,},{name:'摄影', tickShow:false,},{name:'请柬', tickShow:false,},{name:'经典', tickShow:false,},{name:'假期', tickShow:false,}]
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "预览"},
            complete:{ default : '编辑'}
        },
        created(){
            utils.initIconFont();
            this.articleId = utils.getUrlParameter('articleId');
           this.webUrl = utils.articleUrl('t1001',this.articleId);
        },
        methods:{
//            点击 图片 更换模版的触发
            tickImage(item){
                if(item.tickShow == 'true'){
                }else{
                    if(utils.isNull(this.lastImageItem)){
                    }else{
                        this.lastImageItem.tickShow = false;
                    }
                    this.lastImageItem = item;
                    item.tickShow = true;
                }
            },

//            点击 标题 更换模版类型的触发
            tickTitle(item){
                if(item.tickShow == 'true'){
                }else{
                    if(utils.isNull(this.lastTitleItem)){
                    }else{
                        this.lastTitleItem.tickShow = false;
                    }
                    this.lastTitleItem = item;
                    item.tickShow = true;
                }
            },
            chooseTemplate(){
                this.templateChoose = !this.templateChoose;
            },
//            点击编辑
            goComplete(){
                event.closeURL();
            },
//            点击返回
            goback(){
                event.closeURL();
            }
        }
    }
</script>