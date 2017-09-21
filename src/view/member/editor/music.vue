<template>
    <div>
        <navbar :title="title" > </navbar>
        <list class="wrapperBox">
                <cell>
                    <!--无背景音乐-->
                    <div class="musicTitleBox noMusic" @click="hiddenMusic()">
                        <text class="musicName">无背景音乐</text>
                    </div>
                </cell>
                <cell  v-for="(music,index) in musicList"  >
                    <!--音乐选集-->
                    <div class="musicLine">
                        <div class="musicTitleBox" @click="showMusic(index)" >
                            <text class="musicGather">{{music.musicGather}}</text>
                            <text class="musicTotal">{{music.musicTotal}}首</text>
                        </div>
                    <!--音乐名称-->
                        <div class="musicNameBox" v-if="music.show">
                            <text class="musicName addBorder"  v-for="item in music.musicNameList">{{item.musicName}}</text>
                        </div>
                    </div>
                </cell>
        </list>

    </div>
</template>

<style>
    .musicTotal{
        color: #999;
        font-size: 24px;
        padding-top: 5px;
    }
    .addBorder{
        padding-bottom: 25px;
        padding-top: 25px;
        border-top-width: 1px;
        border-style: solid;
        border-color: gainsboro;
    }
    .musicNameBox{
        width:700px;
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
        padding-top:30px;
        padding-bottom: 30px;
        margin-top: 15px;
        margin-bottom: 15px;
        width:750px;
        background-color: #fff;
    }

    .wrapperBox{
        background-color: #EFF0F5;
    }
</style>

<script>
    import navbar from '../../../include/navbar.vue'
    var lastIndex = -1;
    export default {
        data:function () {
            return{
                show:false,
                musicList:[{
                    musicGather:'教师节音乐选集',
                    musicTotal:3,
                    show:false,
                    musicNameList:[{
                        musicName:'每当我走过老师窗前',
                    },{
                        musicName:'长大后我就成了你',
                    },{
                        musicName:'感恩的心',
                    }]
                },{
                    musicGather:'教师节音乐选集',
                    musicTotal:3,
                    show:false,
                    musicNameList:[{
                        musicName:'每当我走过老师窗前',
                    },{
                        musicName:'长大后我就成了你',
                    },{
                        musicName:'感恩的心',
                    }]
                },{
                    musicGather:'教师节音乐选集',
                    musicTotal:3,
                    show:false,
                    musicNameList:[{
                        musicName:'每当我走过老师窗前',
                    },{
                        musicName:'长大后我就成了你',
                    },{
                        musicName:'感恩的心',
                    }]
                },{
                    musicGather:'教师节音乐选集',
                    musicTotal:3,
                    show:false,
                    musicNameList:[{
                        musicName:'每当我走过老师窗前',
                    },{
                        musicName:'长大后我就成了你',
                    },{
                        musicName:'感恩的心',
                    }]
                },{
                    musicGather:'教师节音乐选集',
                    musicTotal:3,
                    show:false,
                    musicNameList:[{
                        musicName:'每当我走过老师窗前',
                    },{
                        musicName:'长大后我就成了你',
                    },{
                        musicName:'感恩的心',
                    }]
                },{
                    musicGather:'教师节音乐选集',
                    musicTotal:3,
                    show:false,
                    musicNameList:[{
                        musicName:'每当我走过老师窗前',
                    },{
                        musicName:'长大后我就成了你',
                    },{
                        musicName:'感恩的心',
                    }]
                },{
                    musicGather:'教师节音乐选集',
                    musicTotal:3,
                    show:false,
                    musicNameList:[{
                        musicName:'每当我走过老师窗前',
                    },{
                        musicName:'长大后我就成了你',
                    },{
                        musicName:'感恩的心',
                    }]
                }]
            }
        },

        components: {
            navbar
        },
        props: {
            title: { default: "音乐设置222"},
        },
        methods:{
//            点击显示音乐文集列表
            showMusic:function(index){
                if(lastIndex == -1 || lastIndex == index){
                    this.musicList[index].show = !this.musicList[index].show;
                }else{
                    this.musicList[lastIndex].show = false;
                    this.musicList[index].show = !this.musicList[index].show;
                }
                lastIndex = index;
            },
//            点击隐藏音乐文集列表
            hiddenMusic:function () {
                if(lastIndex != -1){
                    this.musicList[lastIndex].show = false;
                }
            }
        }
    }
</script>