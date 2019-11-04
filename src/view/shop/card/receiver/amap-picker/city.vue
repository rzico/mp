<template>
    <div class="wrapper">
        <navbar @goback="goback" title="地址"></navbar>
        <list class="address">
            <cell  v-for="(item,index) in friendsList" :ref="index+1">
                <div class="addressBox" >
                    <!--                    v-if="index==0 ||  item.group != citys[index-1].group"-->
                    <div class="addressGroupText"  v-if="item.name != ''">
                        <text class="addressTitle">{{item.letter}}</text>
                    </div>
                    <div v-for="(frigt,index) in item.name" @click="chooseCity(frigt.id,frigt.shortName)" class="addressGroup">
                        <text class="addressTitle">{{frigt.shortName}}</text>
                    </div>
                </div>
            </cell>
        </list>
        <div class="rightGroup" :class = "[isPress ? 'letterOnPress' : '']">
            <div  class="rightGroupBox" v-for="(item,index) in allLetter" @longpress="onlongpress(index)" @touchstart="ontouchstart(index)" @touchend="ontouchend()"  @touchmove="ontouchmove(index,$event)">
                <text class="rightGroupTitle" :class="[moveLetter == index ? 'primary' : 'noColor']">{{item}}</text>
            </div>
        </div>
        <div  class="bouncedBox"  :class="[isShowToast?'isvisible':'novisible']">
            <text class="bouncedTitle">{{showText}}</text>
        </div>
    </div>
</template>

<style lang="less" src="../../../../../style/wx.less"/>
<style scoped>
    .addressBox{
        width: 750px;
        background-color: white;
    }
    .addressGroup{
        width: 750px;
        height: 80px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #cccccc;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: #cccccc;
        justify-content: center;
    }
    .address{
        width: 750px;
    }
    .addressTitle{
        font-size: 28px;
        color: black;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-left: 20px;
    }
    .rightGroup{
        position: absolute;
        right: 0px;
        width:60px;
        top:140px;
        bottom: 0px;
        padding-bottom: 15px;
        padding-top: 20px;
        align-items: center;
    }
    .addressGroupText{
        background-color: #d7d7d7;
        height: 80px;
        justify-content: center;
    }
    .rightGroupBox{
        padding-top: 4px;
        padding-bottom: 4px;
        padding-left: 10px;
        padding-right: 10px;
        align-items: center;
    }
    .rightGroupTitle{
        font-size: 26px;
        color: #666;
    }
    .bouncedBox{
        position: absolute;
        height: 70px;
        width: 180px;
        border-radius: 40px;
        background-color: #333;
        align-items:center;
        justify-content: center;
        opacity: 0.9;
        /*top: 613px;*/
        top: 632px;
        left: 285px;
    }
    .letterOnPress{
        background-color: #B3B2B3;
    }
    .noColor{
        color: #000;
    }
    .bouncedTitle{
        font-size: 28px;
        color: white;
        font-weight: 700;
        text-align: center;
        line-height: 50px;
    }
    .isvisible{
        visibility: visible;
    }
    .novisible{
        visibility: hidden;
    }
</style>


<script>
    import navbar from '../../../../../include/navbar.vue';
    import utils from '../../../../../assets/utils';
    import {dom, event, animation, storage} from '../../../../../weex.js';
    import {POST, GET, URIEncrypt} from '../../../../../assets/fetch';
    export default {
        data(){
            return{
                citys:[],
                rightArr:[],
                addid:"",
                addgroup:'',
                height:"",
                info:'',
                start:false,
                beforePointPoor:-1,//前一次手机按压时与移动后的字母数量
                pressPoint:-1,//手指按压
                pointPoor:0,//手机按压时与移动后的字母数量
                movePoint:0,//手机按压后移动
                moveLetter:0,//移动后的字母
//                    text:'Jum333132p',
                isShowToast:false,
                showText:'',
                isPress:false,
                friendTotal:0,
                canScroll:true,
                allLetter:['||','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'],
                friendsList:[{
                    letter:'A',
                    name:[]
                },{
                    letter:'B',
                    name:[]
                },{
                    letter:'C',
                    name:[]
                },{
                    letter:'D',
                    name:[]
                },{
                    letter:'E',
                    name:[]
                },{
                    letter:'F',
                    name:[]
                },{
                    letter:'G',
                    name:[]
                },{
                    letter:'H',
                    name:[]
                },{
                    letter:'I',
                    name:[]
                },{
                    letter:'J',
                    name:[]
                },{
                    letter:'K',
                    name:[]
                },{
                    letter:'L',
                    name:[]
                },{
                    letter:'M',
                    name:[]
                },{
                    letter:'N',
                    name:[]
                },{
                    letter:'O',
                    name:[]
                },{
                    letter:'P',
                    name:[]
                },{
                    letter:'Q',
                    name:[]
                },{
                    letter:'R',
                    name:[]
                },{
                    letter:'S',
                    name:[]
                },{
                    letter:'T',
                    name:[]
                },{
                    letter:'U',
                    name:[]
                },{
                    letter:'V',
                    name:[]
                },{
                    letter:'W',
                    name:[]
                },{
                    letter:'X',
                    name:[]
                },{
                    letter:'Y',
                    name:[]
                },{
                    letter:'Z',
                    name:[]
                },{
                    letter:'#',
                    name:[]
                }],
            }
        },
        components: {
            navbar
        },
        created() {
            var _this = this
            _this.city()
        },
        methods:{
            city:function () {
                var _this = this
                GET("common/citys.jhtml", function (res) {
                    if (res.type == 'success') {
                        _this.citys = res.data
                        // _this.citys.forEach(function (item, index) {
                        //     if(index == 0){
                        //         let E = {
                        //             group : item.group,
                        //             id: index
                        //         }
                        //         _this.rightArr.push(E)
                        //     }else if( _this.citys[index].group != _this.citys[index - 1].group) {
                        //         let E = {
                        //             group : item.group,
                        //             id: index
                        //         }
                        //         _this.rightArr.push(E)
                        //     }
                        // })
                        _this.citys.forEach(function (item,index) {
                            _this.friendsList.forEach(function(it,index){
                                if(item.group == it.letter){
                                    it.name.push(item)
                                }
                            })
                        })
                    } else {
                        event.toast(res.content)
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            goback: function () {
                event.closeURL();
            },
            chooseCity(id,shortName) {
                var _this = this
                let data ={
                    id : id,
                    shortName : shortName
                }
                event.sendGlobalEvent('onProductChange',data);
                event.closeURL();
            },
            onlongpress :function(count) {
//                modal.toast({ message:this.allLetter[count] ,duration: 0.3});
                this.isPress = true;
            },
            ontouchstart:function(count){
                if(count == 0){//判断是否点击回到顶部
                    const el = this.$refs[count][0]//跳转到相应的cell
//                    const el = this.$refs.linkref[count]//跳转到相应的cell
                    dom.scrollToElement(el, {
                        animated:false
                    })
                }else{
                    for(var i = 0;i<this.friendsList.length ;i++){//循环判断是否有相应首字母的朋友
                        if(this.friendsList[i].letter == this.allLetter[count]){
                            if(this.friendsList[i].name == ''){
                                break;
                            }
                            const el = this.$refs[count][0]//跳转到相应的cell
                            dom.scrollToElement(el, {
                                animated:false
                            })
                        }
                    }
                }
//                红色字母
                this.moveLetter = count;
//                modal.toast({ message:this.allLetter[count] ,duration: 0.3});
                this.showText = this.allLetter[count];
                this.isPress = true;
                this.isShowToast = true;
            },
            ontouchend:function(){
                var _this = this;
                this.isPress = false;
                this.pressPoint = -1;//重置判断是否刚开始滑动的标志符（可以不用，点击并长按时已经帮忙弥补了该数据的漏洞）
                this.beforePointPoor = -1;//（可以不用，点击并长按时已经帮忙弥补了该数据的漏洞）
//                setTimeout(function () {
                _this.isShowToast = false;
//                },500);
            },
//        ==============================
            ontouchmove:function(count,e){//按住字母导航栏并拖动时触发
                if(this.pressPoint == - 1){//记录每次第一次滑动按压的点
                    this.pressPoint = e.changedTouches[0].pageY;
                }else{
                    this.movePoint = Math.abs(this.pressPoint - e.changedTouches[0].pageY);//求移动的距离(绝对值)
                    if(this.movePoint > 35){
                        this.pointPoor = Math.floor(this.movePoint/35);//通过偏移量获取上移的字母数量
                        if(!(this.beforePointPoor == -1 || this.beforePointPoor == this.pointPoor)){
                            if(this.pressPoint - e.changedTouches[0].pageY >= 0){
                                this.moveLetter = count - this.pointPoor;//获取目前手指停留的字母下标
                            }else{
                                this.moveLetter = count + this.pointPoor;//获取目前手指停留的字母
                            }
                            for(var i = 0;i<this.friendsList.length;i++){//循环判断是否有相应首字母的朋友
                                if(this.friendsList[i].letter == this.allLetter[this.moveLetter]){
                                    if(this.friendsList[i].name == ''){
                                        break;
                                    }
                                    const el = this.$refs[this.moveLetter][0]//跳转到相应的cell
                                    dom.scrollToElement(el, {
//                                        animated:false
                                    })
                                }else if(this.moveLetter == 0){//判断是否滑到 顶部按钮
                                    const el = this.$refs[this.moveLetter][0]//跳转到相应的cell
//                                    const el = this.$refs.linkref[this.moveLetter]//跳转到相应的cell
                                    dom.scrollToElement(el, {
                                        animated:false
                                    })
                                }
                            }
//                            控制滑动范围 =》触发效果
                            if(this.moveLetter >= 0 && this.moveLetter < this.allLetter.length ){
                                this.showText = this.allLetter[this.moveLetter];
                                // const el = this.$refs[this.moveLetter][0]//跳转到相应的cell
//                                 dom.scrollToElement(el, {
// //                                        animated:false
//                                 })
                            }
//                            modal.toast({ message:this.allLetter[this.moveLetter] ,duration: 0.001});//弹出提示框toast
                        }
                        this.beforePointPoor = this.pointPoor;//把这次的滑动的字母数量保存起来
                    }
                }
            },
        }
    }
</script>
