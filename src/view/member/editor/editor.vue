<template>
    <list class="wrapperBox" >
        <cell>
            <div>
                <image class="coverImage" :src="coverImage"></image>
                <div class="coverMaskImage"></div>
                <text class="setTitle">{{setTitle}}</text>
                <text class="bottomBtn addMusic">{{addMusic}}</text>
                <text class="bottomBtn editCover" @click="addCover()">编辑封面</text>
            </div>
        </cell>
        <cell >
            <!--加号跟功能盒子-->
            <div class="addBox" @click="clearIconBox()">
                <!--加号-->
                <div  v-if="firstPlusShow" @click="firstShow()">
                    <text class="plusSign" :style="{fontFamily:'iconfont'}" >&#xe618;</text>
                </div>
                <!--图标-->
                <div class="iconBox" v-else>
                    <!--添加文本-->
                    <div class="addIconBox ">
                        <text class="addText iconSize" :style="{fontFamily:'iconfont'}">&#xe609;</text>
                    </div>
                    <!--添加图片-->
                    <div class="addIconBox ">
                        <text class="addImage iconSize" :style="{fontFamily:'iconfont'}">&#xe61a;</text>
                    </div>
                    <!--添加视频-->
                    <div class="addIconBox ">
                        <text class="addVideo iconSize" :style="{fontFamily:'iconfont'}">&#xe624;</text>
                    </div>
                </div>
            </div>
        </cell>
        <cell>

            <transition-group name="paraTransition" tag="div">
            <div  v-for="(item,index) in paraList" :key="item"  class="paraTransitionDiv">
                <!--段落-->
                <div class="paraBox">
                    <!--左上角关闭按钮"x"-->
                    <div class="paraClose" @click="showConfirm(index)">
                        <text class="paraCloseSize" :style="{fontFamily:'iconfont'}" >&#xe60a;</text>
                    </div>
                    <!--上箭头-->
                    <div class="rightArrow upArrow" v-if="index != 0" @click="moveUp(index)">
                        <text class="arrowSize" :style="{fontFamily:'iconfont'}" >&#xe608;</text>
                    </div>
                    <!--下箭头-->
                    <div class="rightArrow downArrow" v-if="lastPara(index)" @click="moveBottom(index)">
                        <text class="arrowSize" :style="{fontFamily:'iconfont'}" >&#xe601;</text>
                    </div>
                    <!--图片-->
                    <div>
                        <image class="paraImage"  :src="item.paraImage"></image>
                    </div>
                    <!--文章内容-->
                    <div class="paraText">
                        <!--判断是否有文字，没有文字就显示  "点击添加文字"-->
                        <text class="paraTextSize" v-if="item.paraText != ''">{{item.paraText}}</text>
                        <text class="paraTextSize greyColor" v-else  >点击添加文字</text>
                    </div>
                </div>
                <!--加号跟功能盒子-->
                <div class="addBox" @click="clearIconBox()">
                    <!--加号-->
                    <div v-if="item.show" @click="showIconBox(index)" ref="plusSignList">
                        <text class="plusSign" :style="{fontFamily:'iconfont'}" >&#xe618;</text>
                    </div>
                    <!--图标-->
                    <div class="iconBox"  v-else>
                        <!--添加文本-->
                        <div class="addIconBox ">
                            <text class="addText iconSize" :style="{fontFamily:'iconfont'}">&#xe609;</text>
                        </div>
                        <!--添加图片-->
                        <div class="addIconBox ">
                            <text class="addImage iconSize" :style="{fontFamily:'iconfont'}">&#xe61a;</text>
                        </div>
                        <!--添加视频-->
                        <div class="addIconBox ">
                            <text class="addVideo iconSize" :style="{fontFamily:'iconfont'}">&#xe624;</text>
                        </div>
                    </div>
                </div>
            </div>

            </transition-group>
        </cell>
        <!--用来撑起底部空白区域-->
        <cell><div class="emptyBox"></div></cell>
    </list>
</template>
<style>
    .paraTransition-enter-active, .paraTransition-leave-active {
        transition: all 0.2s;
    }
    .paraTransition-enter, .paraTransition-leave-to{
        transform: translateX(300px);
        opacity: 0.2;
    }
    .greyColor{
        color: #999;
    }
    .emptyBox{
        height:40px;
    }
    .arrowSize{
        color: #999;
        font-size: 34px;
        font-weight: 700;
    }
    .upArrow{
        top:5px;
    }
    .downArrow{
        bottom:5px;
    }
    .rightArrow{
        position: absolute;
        right: 10px;
    }
    .paraClose{
        position: absolute;
        top:5px;
        left:5px;
    }
    .paraCloseSize{
        color: #999;
        font-size: 34px;
    }
    .paraTextSize{
        font-size: 32px;
        line-height:38px;
        color: #444;
        lines:4;
        text-overflow: ellipsis;
    }
    .paraText{
        margin-left: 20px;
        /*background-color: red;*/
        width:445px;
    }
    .paraImage{
        width:155px;
        height:155px;
        border-radius: 10px;
    }
    .paraBox{
        flex-direction: row;
        padding-left: 35px;
        padding-right: 35px;
        padding-top: 35px;
        padding-bottom: 35px;
        width:700px;
        margin-left: 25px;
        height:225px;
        background-color: #fff;
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        border-top-left-radius: 20px;
    }
    .wrapperBox{
        background-color: #EFF0F5;
    }
    .addText{
        color: #FFE394;
    }
    .addImage{
        color: #1E7DEB;
    }
    .addVideo{
        color: #CCA7FC;
    }
    .iconSize{
        font-size: 38px;
    }
    .addIconBox{
        padding-top: 15px;
        padding-bottom: 15px;
        padding-right:40px;
        padding-left: 40px;
    }
    .iconBox{
        flex-direction: row;
        background-color: #fff;
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        border-top-left-radius: 20px;
    }
    .plusSign{
        padding-left: 12px;
        padding-right: 12px;
        padding-top: 1px;
        padding-bottom: 1px;
        background-color:#D7DBD5;
        color: #fff;
        border-style: solid;
        border-width: 1px;
        border-color: rgba(133,133,133,0.2);
        border-radius: 30px;
        font-size: 30px;
        font-weight: 700;
    }
    .addBox{
        align-items: center;
        justify-content: center;
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .setTitle{
        position: absolute;
        top:40px;
        color: #fff;
        font-size: 40px;
        left: 25px;
    }
    .bottomBtn{
        position: absolute;
        bottom: 20px;
        color: #666;
        border-radius: 10px;
        font-size: 27px;
        padding-bottom: 5px;
        padding-right: 10px;
        padding-left: 10px;
        padding-top: 5px;
        background-color: #fff;
    }
    .addMusic{
        left: 25px;
    }
    .editCover{
        right: 25px;
    }
    .coverMaskImage{
        position: absolute;
        top:0;
        left:0;
        width:750px;
        height:300px;
        background-color: #888;
        opacity: 0.5;
    }
    .coverImage{
        width:750px;
        height:300px;
    }
</style>

<script>
    const album = weex.requireModule('albumModule');
    var modal = weex.requireModule('modal');
    var lastIndex = -1;
    export default {
        data:function(){
            return{
                firstPlusShow:true,
                coverImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                setTitle:'点击设置标题',
                addMusic:'添加音乐',
                paraList:[{
                    paraImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    paraText:'',
                    show:true
                },{
                    paraImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    paraText:'前三个段落是死数据',
                    show:true
                },{
                    paraImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    paraText:'2',
                    show:true
                }]
            }
        },

//       多选图片
        created:function(){
//      调用安卓的相册
//            album.openAlbumMuti(
//            //选完图片后触发回调函数
//                function (data) {
//                    var _this = this;
//                    for(let i = 0;i < data.length;i++){
//                        _this.paraList.push({
//                            paraImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                            paraText:'',
//                            show:true
//                        })
//                        _this.paraList[i].paraImage = data[i].originalPath;
//                    }
//                }
//            )
        },
        mounted:function(){
            var domModule = weex.requireModule("dom");
            domModule.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url('http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf')"
            })
        },
        methods:{
//            点击第一个"+"号时触发
            firstShow:function(){
                this.firstPlusShow = !this.firstPlusShow;
                if(lastIndex != -1){
                    setTimeout(()=>{
                        if(this.paraList[lastIndex].show == false){
                            this.paraList[lastIndex].show = true;
                        }
                        lastIndex = -1;
                    },60)
                }
            },
//            点击第2个以后的"+"号时，触发
            showIconBox:function (index) {
                setTimeout(()=>{
                    if(this.firstPlusShow == false){
                        this.firstPlusShow = true;
                    }
                },60)
                if(lastIndex == -1){
                    this.paraList[index].show = !this.paraList[index].show;
                }else{
                    this.paraList[index].show = !this.paraList[index].show;
                    //需要加延迟 否则画面会出现卡顿。先将点击的加号转变成功能盒，再将上一个功能后转变为"+"号
                    setTimeout(()=>{
                        if(this.paraList[lastIndex].show == false){
                            this.paraList[lastIndex].show = true;
                        }
                    },60)
                }
                setTimeout(()=>{
                    lastIndex = index;
                },60)
//                this.paraList.forEach(function(item){
//                    if(item.show == false){
//                        item.show = !item.show;
//                    }
//                });
            },
//            点击空白区域时，将功能盒子隐藏，显示出"+"号
            clearIconBox:function(){
                if(lastIndex != -1){
                    if(this.paraList[lastIndex].show == false){
                        this.paraList[lastIndex].show = true;
                    }
                    lastIndex = -1;
                }
                if(this.firstPlusShow == false){
                    this.firstPlusShow = true;
                }
            },
//            判断是否最后一个段落来添加向下移动的箭头。
            lastPara:function(index){
                if(index != this.paraList.length-1){
                    return true;
                }else{
                    return false;
                }
            },
//            上箭头
            moveUp:function (index) {
                this.firstPlusShow = true;
                if(lastIndex != -1){
                    this.paraList[lastIndex].show = true;
                    lastIndex = -1;
                }
//                将内容保存
                let upContent = this.paraList[index];
//                将内容删掉
                this.paraList.splice(index,1);
//                再将删掉的内容插入
                this.paraList.splice(index - 1,0,upContent);
            },
//            下箭头
            moveBottom:function (index) {
                this.firstPlusShow = true;
                if(lastIndex != -1){
                    this.paraList[lastIndex].show = true;
                    lastIndex = -1;
                }
//                将内容保存
                let upContent = this.paraList[index];
//                将内容删掉
                this.paraList.splice(index,1);
//                再将删掉的内容插入
                this.paraList.splice(index + 1,0,upContent);
            },
//            用户执行删除时触发询问。
            showConfirm :function(index) {
                var _this = this;
                if(this.paraList.length == 1){
                    modal.toast({message: '至少要保留一张图片', duration: 0.5})
                }else{
                    modal.confirm({
                        message: '确定删除该段?',
                        okTitle:'确定',
                        cancelTitle:'取消',
                        duration: 0.3
                    }, function (value) {
                        if(value == '确定'){
                            //                将内容删掉
                            _this.paraList.splice(index,1);

                        }
                    })
                }
            }
        }
    }
</script>


