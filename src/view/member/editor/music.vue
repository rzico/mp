<template>
    <list class="wrapperBox">
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
                <!--音乐名称-->
                <div class="musicNameBox" v-if="music.show">
                    <div class="addBorder" v-for="(item,tickIndex) in music.musicNameList" @click="ctrlTick(item,item.musicId)">
                        <!--歌名-->
                        <text class="musicName">{{item.musicName}}</text>
                        <!--"选中"字体图标-->
                        <text class="musicName":style="{fontFamily:'iconfont'}" v-if="item.tickShow">&#xe606;</text>
                    </div>
                </div>
            </div>
        </cell>
    </list>
</template>

<style scoped>
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
    var lastIndex = -1;
    var lastTickItem = -1;
    const dom = weex.requireModule('dom');
    export default {
        data:function () {
            return{
                show:false,
                noMusicShow:true,
                musicList:[{
                    musicGather:'教师节音乐选集',
                    musicTotal:3,
                    show:false,
                    musicNameList:[{
                        musicName:'每当我走过老师窗前',
                        tickShow:false,
                        musicId:43
                    },{
                        musicName:'长大后我就成了你',
                        tickShow:false,
                        musicId:53
                    },{
                        musicName:'感恩的心',
                        tickShow:false,
                        musicId:63
                    }]
                },{
                    musicGather:'教师节音乐选集',
                    musicTotal:3,
                    show:false,
                    musicNameList:[{
                        musicName:'每当我走过老师窗前',
                        tickShow:false,
                        musicId:1
                    },{
                        musicName:'长大后我就成了你',
                        tickShow:false,
                        musicId:2
                    },{
                        musicName:'感恩的心',
                        tickShow:false,
                        musicId:3
                    }]
                },{
                    musicGather:'教师节音乐选集',
                    musicTotal:3,
                    show:false,
                    musicNameList:[{
                        musicName:'每当我走过老师窗前',
                        tickShow:false,
                        musicId:3
                    },{
                        musicName:'长大后我就成了你',
                        tickShow:false,
                        musicId:3
                    },{
                        musicName:'感恩的心',
                        tickShow:false,
                        musicId:3
                    }]
                },{
                    musicGather:'教师节音乐选集',
                    musicTotal:3,
                    show:false,
                    musicNameList:[{
                        musicName:'每当我走过老师窗前',
                        tickShow:false,
                        musicId:3
                    },{
                        musicName:'长大后我就成了你',
                        tickShow:false,
                        musicId:3
                    },{
                        musicName:'感恩的心',
                        tickShow:false,
                        musicId:3
                    }]
                },{
                    musicGather:'教师节音乐选集',
                    musicTotal:3,
                    show:false,
                    musicNameList:[{
                        musicName:'每当我走过老师窗前',
                        tickShow:false,
                        musicId:3
                    },{
                        musicName:'长大后我就成了你',
                        tickShow:false,
                        musicId:3
                    },{
                        musicName:'感恩的心',
                        tickShow:false,
                        musicId:3
                    }]
                },{
                    musicGather:'教师节音乐选集',
                    musicTotal:3,
                    show:false,
                    musicNameList:[{
                        musicName:'每当我走过老师窗前',
                        tickShow:false,
                        musicId:3
                    },{
                        musicName:'长大后我就成了你',
                        tickShow:false,
                        musicId:3
                    },{
                        musicName:'感恩的心',
                        tickShow:false,
                        musicId:3
                    }]
                },{
                    musicGather:'教师节音乐选集',
                    musicTotal:3,
                    show:false,
                    musicNameList:[{
                        musicName:'每当我走过老师窗前',
                        tickShow:false,
                        musicId:3
                    },{
                        musicName:'长大后我就成了你',
                        tickShow:false,
                        musicId:3
                    },{
                        musicName:'感恩的心',
                        tickShow:false,
                        musicId:3
                    }]
                }]
            }
        },
        mounted:function(){
            var domModule = weex.requireModule("dom");
            domModule.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url('http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf')"
            })
        },
        methods:{
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
//            点击隐藏音乐文集列表
            hiddenMusic:function () {
                if(lastIndex != -1){
                    this.musicList[lastIndex].show = false;
                }
                this.noMusicShow = !this.noMusicShow;
                lastTickItem.tickShow = false;
            },
//            点击歌名添加 "选中" 的字体图标
            ctrlTick:function (item,musicId) {
                console.log("===");
                console.log(musicId);
                if(lastTickItem == -1 || lastTickItem == item){
                    item.tickShow = true;
                }else {
                    lastTickItem.tickShow = false;
                    item.tickShow = !item.tickShow;
                }
                lastTickItem = item;
                this.noMusicShow = false;
            }
        }
    }
</script>