<template>
    <div  @viewdisappear="viewdisappear()" class="wrapper" >
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="goComplete" > </navbar>
        <list class="wrapperBox" >
            <cell>
                <!--无背景音乐-->
                <div class="musicTitleBox noMusic" @click="hiddenMusic()">
                    <div class="noMusicBorder">
                        <text class="musicName">无背景音乐</text>
                        <!--"选中"字体图标-->
                        <text class="musicName" v-if="noMusicShow" :style="{fontFamily:'iconfont'}">&#xe606;</text>
                    </div>
                </div>
            </cell>
            <cell  v-for="(music,index) in musicList" ref="musicref" >
                <!--音乐选集-->
                <div class="musicLine">
                    <div class="musicTitleBox" @click="showMusic(index)" >
                        <!--歌集-->
                        <text class="musicGather">{{music.musicGather}}</text>
                        <!--歌的数量-->
                        <text class="musicTotal">{{music.musicTotal}}首</text>
                    </div>
                    <!--添加动画-->
                    <transition-group name="paraTransition" tag="div">
                    <!--音乐名称-->
                    <div class="musicNameBox" key="musicBox" v-if="music.show">
                        <div class="addBorder" v-for="(item,tickIndex) in music.musicNameList" @click="ctrlTick(item,item.musicId,item.musicName)">
                            <!--歌名-->
                            <text class="musicName nameStyle" >{{item.musicName}}</text>
                            <!--"选中"字体图标-->
                            <text class="musicName":style="{fontFamily:'iconfont'}" v-if="item.tickShow">&#xe606;</text>
                        </div>
                    </div>
                    </transition-group>
                </div>
            </cell>
        </list>
    </div>
</template>

<style scoped>
    .nameStyle{
        width: 600px;
        color: #888;
    }
    .paraTransition-enter-active, .paraTransition-leave-active {
        transition: all 0.05s;
    }
    .paraTransition-leave-to{
        transform: translateY(-50px);
        opacity: 0;
    }
    .paraTransition-enter{
        transform: translateY(-50px);
        opacity: 0;
    }
    .paraTransition-enter-to{
        transform: translateY(0px);
        opacity: 1;
    }
    .musicTotal{
        color: #999;
        font-size: 24px;
        padding-top: 5px;
    }
    .noMusicBorder{
        flex-direction: row;
        justify-content: space-between;
        flex-direction: row;
        padding-right: 25px;
    }
    .addBorder{
        flex-direction: row;
        justify-content: space-between;
        padding-bottom: 25px;
        padding-top: 25px;
        padding-right: 25px;
        border-top-width: 1px;
        border-style: solid;
        border-color: gainsboro;
    }
    .musicNameBox{
        width:725px;
        margin-left: 25px;
    }
    .musicName{
        font-size: 33px;
        color: #4E4F51;
    }
    .musicGather{
        padding-bottom: 5px;
        font-size: 38px;
        color: #4E4F51;
    }

    .musicTitleBox{
        padding-top:25px;
        padding-bottom: 25px;
        padding-left: 25px;
        width:750px;
    }
    .musicLine{
        background-color: #fff;
        margin-bottom: 15px;
    }
    .noMusic{
        margin-top: 15px;
        margin-bottom: 15px;
        background-color:#fff;
        padding-bottom: 30px;
        padding-top: 30px;
    }

    .wrapperBox{
        background-color: #EFF0F5;
    }
</style>

<script>
    import navbar from '../../../include/navbar.vue'
    import utils from '../../../assets/utils'
    import music from '../../../assets/music'
    const event = weex.requireModule('event');
    const audio = weex.requireModule('audio');
    const dom = weex.requireModule('dom');
    const modal = weex.requireModule('modal');
    var lastIndex = -1;
    var lastTickItem = -1;
    var chooseMusicId = -1;
    var chooseMusicName = '';
    export default {
        data:function () {
            return{
                show:false,
                noMusicShow:true,
                musicList:''
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "音乐设置"},
            complete:{default: "完成"}
        },
        created:function () {
            utils.initIconFont();
//            js里导入音乐列表
            this.musicList = music;
//            bundleUrl = new String(bundleUrl);
//            modal.toast({message:bundleUrl,duration:1})
            var _this = this;
//            取当前页面rul，将musicId取出来
            var bundleUrl = this.$getConfig().bundleUrl;
            var getVal = bundleUrl.split('?')[1];
            var op = getVal.split('=');
            if(op[0] == 'musicId'){
                chooseMusicId = op[1];
//                如果已添加音乐 则遍历数组
                if(chooseMusicId != -1){
                    _this.musicList.forEach(function(item){
                        item.musicNameList.forEach(function(itemChild){
                            if( itemChild.musicId == chooseMusicId) {
                                itemChild.tickShow = true;
                                _this.noMusicShow = false;
                                item.show = true;
                                lastTickItem = itemChild;
                                chooseMusicName =  itemChild.musicName;
                            }
                        })
                    })
                }
            }
        },
        methods:{
            //            在页面销毁时触发，可用来捕捉安卓的回退
            viewdisappear: function viewdisappear() {
                audio.stop();
            },
//            点击显示音乐文集列表
            showMusic:function(index){
                if(lastIndex == -1 || lastIndex == index){
                    this.musicList[index].show = !this.musicList[index].show;
//                    if(lastIndex == -1){
//                    滚动到相应的行。就是将当前选中的歌集置顶
//                        setTimeout(()=>{
//                            const el = this.$refs.musicref[index]//跳转到相应的cell
//                            dom.scrollToElement(el, {
//                                animated:true
//                            })
//                        },50)
//                    }
                }else{
                    this.musicList[lastIndex].show = false;
                    setTimeout(()=>{
                        this.musicList[index].show = !this.musicList[index].show;
                    },50)
//                    滚动到相应的行。就是将当前选中的歌集置顶
//                    setTimeout(()=>{
//                        const el = this.$refs.musicref[index]//跳转到相应的cell
//                        dom.scrollToElement(el, {
//                            animated:true
//                        })
//                    },50)
                }
                lastIndex = index;
            },
//            点击隐藏音乐文集列表(无背景音乐)
            hiddenMusic:function () {
                audio.stop();
                if(lastIndex != -1){
                    this.musicList[lastIndex].show = false;
                }
                this.noMusicShow = !this.noMusicShow;
                lastTickItem.tickShow = false;
                chooseMusicId = -1;
                chooseMusicName = '';
            },
//            点击歌名添加 "选中" 的字体图标
            ctrlTick:function (item,musicId,musicName) {
                chooseMusicId = musicId;
                chooseMusicName = musicName;
//                播放音乐
                audio.play(utils.remote('resources/music/'+ musicId +'.mp3'));
                if(lastTickItem == -1 || lastTickItem == item){
                    item.tickShow = true;
                }else {
                    lastTickItem.tickShow = false;
                    item.tickShow = !item.tickShow;
                }
                lastTickItem = item;
//                modal.toast({message:item,duration:1});
                this.noMusicShow = false;
            },
//            返回
            goback:function () {
                audio.stop();
                event.closeURL();
            },
//            完成
            goComplete:function () {
                var E = {
                    chooseMusicId:chooseMusicId,
                    chooseMusicName:chooseMusicName
                }
                audio.stop();
                let backData = utils.message('success','成功',E);
                event.closeURL(backData);
            }
        }
    }
</script>