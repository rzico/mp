<template>
    <div class="wrapper bgWhite" >
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="submitNow" > </navbar>
        <scroller class="scroller " >
            <!--v-if="hasSliderList()"-->
            <!--<cell ref="listSlide">-->
            <div class="cell-row mt0 pr20" >
                <div class="cell-panel space-between cell-clear" >
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe61a;</text>
                        <text class="title ml20">效果预览:</text>
                    </div>
                </div>
            </div>
            <div class="bt10" v-if="hasSliderList()">
                <slider class="slider" interval="3000"  auto-play="true">
                    <div class="frame" v-for="img in sliderList">
                        <!--配合图片懒加载，先显示一个本地图片-->
                        <!--<image  :src="loadingImg"  v-if="!img.loading"  resize="cover" class="slideImage coverAbsoTop" ></image>-->
                        <div  v-if="!img.loading"  class="slideImage coverAbsoTop "></div>
                        <!--使用组件加载完成事件与组件显示在屏幕上的事件实现图片懒加载,会先触发appear事件,再触发load事件,appear会重复触发(例如：1 2 3,先触发了1 2，在滑动到下方时触发了3，此时1被移动到屏幕外，再移动回顶部，1显示出来，会继续触发1的appear事件)-->
                        <image class="slideImage" resize="cover" @load="onImageLoad(img)"  :src="img.thumbnailImage" ></image>
                    </div>
                    <indicator class="indicatorSlider"></indicator>
                </slider>
            </div>
            <div v-else class=" noSliderBg" >
                <text class="sub_title">您还未添加轮播图</text>
            </div>
            <!--</cell>-->

            <div class="cell-row mt0 pr20" >
                <div class="cell-panel space-between cell-clear" >
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe61a;</text>
                        <text class="title ml20">首页轮播图设置</text>
                    </div>
                </div>
                <div  class="imageBox  " v-if="hasImage()" >
                    <div v-for="(item,index) in imageList" >
                        <div  v-if="!item.loading"  class="goodsImg coverAbsoTop " ></div>
                        <image class="goodsImg " resize="cover" @load="onImageLoad(item)" @click="changeCover(item,index)" :src="item.thumbnailImage"></image>
                        <div class="changeCoverBox">
                            <text class="fz26 white">更换封面</text>
                        </div>
                        <!--右上角关闭按钮"x"-->
                        <div class="paraIcon paraClose bkg-gray" @click="delImage(index)" >
                            <text class="paraCloseSize blackColor" :style="{fontFamily:'iconfont'}" >&#xe60a;</text>
                        </div>
                        <!--&lt;!&ndash;左下角按钮"<"&ndash;&gt;-->
                        <div class="paraIcon paraLeft  bkg-gray" v-if="index != 0" @click="moveUp(index)" >
                            <text class="paraCloseSize blackColor" :style="{fontFamily:'iconfont'}" >&#xe669;</text>
                        </div>
                        <!--&lt;!&ndash;右下角按钮">"&ndash;&gt;-->
                        <!--<div class="paraIcon paraRight  bkg-gray"   v-if="lastPara(index)" @click="moveBottom(index)" >-->
                            <!--<text class="paraCloseSize blackColor" :style="{fontFamily:'iconfont'}" >&#xe630;</text>-->
                        <!--</div>-->
                    </div>
                </div>
                <div class="cell-panel space-between cell-clear"  v-if="imageLength()" >
                    <div class="flex-row flex-start" @click="articleShuffling()">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe6b5;</text>
                        <text class="title ml20">添加文章轮播图</text>
                    </div>
                    <div class="flex-row flex-start" @click="productShuffling()">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe6b5;</text>
                        <text class="title ml20">添加商品轮播图</text>
                    </div>
                </div>
            </div>
        </scroller>
        <!--遮罩-->
        <process  v-if="toSendArticle" :processWidth="processWidth" :currentPro="currentPro" :proTotal="proTotal" ></process>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    /*<!--轮播图-->*/
    .indicatorSlider{
        position: absolute;
        bottom: 10px;
        width:750px;
        /*height为10时 底下的点会变成椭圆，20会变成圆 */
        height: 10px;
        align-items: center;
        item-selected-color:#fff;
        item-size:15px;
    }
    .frame {
        width: 750px;
        /*height: 280px;*/
        height: 300px;
        position: relative;
    }
    .noSliderBg{
        background-color: rgba(136,136,136,0.1);
        align-items: center;
        justify-content: center;
        height: 300px;
        width: 750px;
        /*height: 280px;*/
    }
    .slider {
        height: 300px;
        width: 750px;
        /*height: 280px;*/
    }
    .slideImage {
        width: 750px;
        /*height: 280px;*/
        height: 300px;
    }
    .input{
        width: 630px;
        margin-left: 20px;
        height:98px;
        line-height:32px;
        font-size: 32px;
        border-style:none
    }
    .cell-logo {
        height: 196px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        width:150px;
        height:150px;
        border-radius:75px;
        overflow:hidden;
        margin-right: 20px;
    }
    .lineCtrlOne{
        lines:1;
        text-overflow: ellipsis;
        width: 550px;
    }

    .lineCtrlTwo{
        lines:2;
        text-overflow: ellipsis;
        width: 550px;
    }

    .name {
        margin-left:10px;
        flex-direction: column;
        justify-content: center;
        height:180px;
    }

    .autograph {
        font-size: 30px;
        color: #ccc;
        margin-top:20px;
        width: 400px;
        lines:1;
        text-overflow:ellipsis;
    }

    .newModule{
        flex-direction: row;
    }

    .paraIcon{
        position: absolute;
        padding-left: 10px;
        padding-top: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
        border-radius:22px;
    }
    .paraLeft{
        /*bottom:43px;*/
        left:10px;
        bottom:0px;
    }
    .paraRight{
        bottom:0px;
        right:0px;
    }
    .paraClose{
        top:10px;
        right:0px;
    }
    .paraCloseSize{
        color: #fff;
        font-size: 24px;
    }
    .blackColor{
        color: #000;
    }
    .imageBox{
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        width:690px;
    }
    .goodsImg{
        border-radius: 5px;
        height: 134px;
        width: 335px;
        margin-left: 10px;
        margin-top: 10px;
    }
    .changeCoverBox{
        position: absolute;
        top:10px;
        left: 10px;
        right: 0;
        bottom:0;
        height: 134px;
        width: 335px;
        border-radius: 5px;
        display: flex;
        background-color: rgba(136,136,136,0.3);
        align-items: center;
        justify-content: center;
    }

</style>
<script>
    import { POST, GET } from '../../../assets/fetch';
    import utils from '../../../assets/utils';
    const storage = weex.requireModule('storage');
    const event = weex.requireModule('event');
    const modal = weex.requireModule('modal');
    import navbar from '../../../include/navbar.vue';
    const picker = weex.requireModule('picker');
    const album = weex.requireModule('album');
    import process from '../../../widget/process.vue';
    export default {
        components: {
            navbar,process
        },
        data() {
            return {
                logoLoading:false,
                companyInfo: {
                    name: "点击设置企业名",
                    logo: utils.locate('resources/images/background.png'),
                    autograph: "点击设置企业签名",
                    area:{
                        id:'',
                        name:'点击设置企业地址',
                    },
                    startTime:'00:00',
                    endTime:'23:59',
                    image:[],
                    address:'',
                    paraLogo:'',
                },
                imageList:[],
                clicked: false,
                toSendArticle:false,//控制进度条 遮罩显示
                currentPro:0,//当前进度
                proTotal:0,//总的进度
                processWidth:0,//进度条宽度
                sliderList:[],
                imageListLength:0
            }
        },
        props: {
            title: {default: "小程序轮播图"},
            complete:{default:'保存'}
        },
        filters:{
            watchStartTime:function (value) {
                if(utils.isNull(value)){
                    return '00:00';
                }else{
                    return value;
                }
            },
            watchEndTime:function (value) {
                if(utils.isNull(value)){
                    return '23:59';
                }else{
                    return value;
                }
            },
            watchCompanyName:function (value) {
                if(utils.isNull(value)){
                    return '点击设置企业名';
                }else{
                    return value
                }
            },
            watchAutograph:function (value) {
                if(utils.isNull(value)){
                    return '点击设置企业签名';
                }else{
                    return value
                }
            },
            watchAreaName:function (value) {
                if(utils.isNull(value)){
                    return '点击设置企业所在地区';
                }else{
                    return value
                }
            },
        },
        created() {
            this.open();
            event.changeWindowsBar(true);
        },
        methods: {
            //            上箭头
            moveUp:function (index) {
                let _this = this;
//                this.firstPlusShow = true;
//                if(lastIndex != -1){
//                    this.imageList[lastIndex].show = true;
//                    lastIndex = -1;
//                }
//         方法2
                let a = this.imageList[index].thumbnailImage;
                let b = this.imageList[index].actionId;
                let c = this.imageList[index].url;
                let d = this.imageList[index].paraImage;
                let e = this.imageList[index].action;
                let f = this.sliderList[index].thumbnailImage;
                this.imageList[index].thumbnailImage = this.imageList[index - 1].thumbnailImage;
                this.imageList[index].actionId = this.imageList[index - 1].actionId;
                this.imageList[index].paraImage = this.imageList[index - 1].paraImage;
                this.imageList[index].action = this.imageList[index - 1].action;
                this.imageList[index].url = this.imageList[index - 1].url;
                this.sliderList[index].thumbnailImage = this.sliderList[index - 1].thumbnailImage;
                this.imageList[index - 1].thumbnailImage = a;
                this.imageList[index - 1].actionId = b;
                this.imageList[index - 1].url = c;
                this.imageList[index - 1].paraImage = d;
                this.imageList[index - 1].action = e;
                this.sliderList[index - 1].thumbnailImage = f;
//                if(!utils.isNull(this.imageList[index].serveThumbnail)){
//                    let g = this.imageList[index].serveThumbnail;
//                    this.imageList[index].serveThumbnail = this.imageList[index - 1].serveThumbnail;
//                    this.imageList[index - 1].paraImage = g;
//                }
            },
            //            下箭头
            moveBottom:function (index) {
                let _this = this;
//         方法2
                let a = this.imageList[index].thumbnailImage;
                let b = this.imageList[index].actionId;
                let c = this.imageList[index].url;
                let d = this.imageList[index].paraImage;
                let e = this.imageList[index].action;
                let f = this.sliderList[index].thumbnailImage;
                this.imageList[index].thumbnailImage = this.imageList[index + 1].thumbnailImage;
                this.imageList[index].actionId = this.imageList[index + 1].actionId;
                this.imageList[index].url = this.imageList[index + 1].url;
                this.imageList[index].paraImage = this.imageList[index + 1].paraImage;
                this.imageList[index].action = this.imageList[index + 1].action;
                this.sliderList[index].thumbnailImage = this.sliderList[index + 1].thumbnailImage;
                this.imageList[index + 1].thumbnailImage = a;
                this.imageList[index + 1].actionId = b;
                this.imageList[index + 1].url = c;
                this.imageList[index + 1].paraImage = d;
                this.imageList[index + 1].action = e;
                this.sliderList[index + 1].thumbnailImage = f;
            },
            //            判断是否最后一个段落来添加向下移动的箭头。
            lastPara:function(index){
                if(parseInt(index) != this.imageListLength - 1){
                    return true;
                }else{
                    return false;
                }
            },

            open(){
                var _this = this;
//                utils.debug('component/appletSowingMap/list.jhtml?memberId=' + event.getUId());
                GET('component/appletSowingMap/list.jhtml?memberId=' + event.getUId(),function (data) {
                    if(data.type == 'success'){
                        data.data.forEach(function (item) {
                            item.paraImage = item.frontcover;
                            item.thumbnailImage = item.frontcover;
                            _this.sliderList.push({
                                thumbnailImage : item.frontcover
                            });
                        })
                        _this.imageList = data.data;
//                        _this.companyInfo = data.data;
//                        _this.paraLogo = data.data.logo;
//                        data.data.image.forEach(function (item) {
//                            _this.imageList.push({
//                                thumbnailImage:item,
//                                paraImage:item,
//                                loading:false,
//                            })
//                        })
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
//                    utils.debug(err);
                    event.toast(err.content);
                })
            },

//            封面加载出来
            logoLoad(item){
                this.logoLoading = true;
            },
//            封面加载出来
            onImageLoad(item){
                item.loading = true;
            },
            pickStartTime() {
                let _this = this;
                picker.pickTime({
                    value: _this.companyInfo.startTime
                }, e => {
                    if (e.result === 'success') {
                        _this.companyInfo.startTime = e.data
                    }
                })
            },
            pickEndTime() {
                let _this = this;
                picker.pickTime({
                    value: _this.companyInfo.endTime
                }, e => {
                    if (e.result === 'success') {
                        _this.companyInfo.endTime = e.data
                    }
                })
            },
            //            立即提交
            submitNow() {
                if(this.imageList.length == 0){
                    event.closeURL();
                    return;
                }

                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                this.toSendArticle = true;
                //                判断段落图片是否已上传
                this.imageList.forEach(function (item) {
                    if (!utils.isNull(item.paraImage) && item.paraImage.substring(0, 4) != 'http') {
                        _this.proTotal++;
                    }
                });
                this.sendImage(0);

            },
            sendImage(sendIndex) {
                let _this = this;
                let sendLength = _this.imageList.length;//获取图片数组总长度
                var frontUrl = '';
                if (!utils.isNull(_this.imageList[sendIndex].paraImage)) {
                    frontUrl = _this.imageList[sendIndex].paraImage.substring(0, 4);
                }
//                判断是否已经是服务器图片
                if (frontUrl == 'http') {
                    sendIndex++;
//                        判断是否最后一张图
                    if (sendIndex < sendLength) {
//                            回调自己自己
                        _this.sendImage(sendIndex)
                    } else {//进行上传文章
                        _this.realSave();
                    }
                } else {
                    event.upload(_this.imageList[sendIndex].paraImage, function (data) {
                        if (data.type == 'success') {
                            _this.imageList[sendIndex].paraImage = data.data;
                            sendIndex++;
//                        判断是否最后一张图
                            if (sendIndex < sendLength) {
//                            回调自己自己
                                _this.sendImage(sendIndex)
                            } else {//进行上传文章
                                _this.realSave();
                            }
                        } else {
                            //上传失败
                            _this.toSendArticle = false;
//                防止重复点击
                            _this.clicked = false;
                            _this.currentPro = 0;//当前进度
                            _this.proTotal = 0;//总的进度
                            _this.processWidth = 0;//进度条宽度
                            event.toast(data.content);
                            return;

                        }
                    }, function (data) {
                        _this.ctrlProcess(data);
                    })
                }
            },
//上传头像
//            uploadLogo(){
//                let _this = this;
//                let companyLogo = _this.paraLogo;
//                var frontUrl = '';
//                if (!utils.isNull(companyLogo)) {
//                    frontUrl = companyLogo.substring(0, 4);
//                }
//                //                判断是否已经是服务器图片
//                if (frontUrl == 'http') {
//                    _this.realSave();
//                }else{
//                    event.upload(companyLogo, function (data) {
//                        if (data.type == 'success') {
//                            _this.paraLogo = data.data;
//                            _this.realSave();
//                        } else {
//                            //上传失败
//                            _this.toSendArticle = false;
////                防止重复点击
//                            _this.clicked = false;
//                            _this.currentPro = 0;//当前进度
//                            _this.proTotal = 0;//总的进度
//                            _this.processWidth = 0;//进度条宽度
//                            event.toast(data.content);
//                            return;
//
//                        }
//                    }, function (data) {
//                        _this.ctrlProcess(data);
//                    })
//                }
//            },
            realSave() {
                let _this = this;
                var imgsList = [];
                var imgsListBox;
                if (this.imageList.length > 0) {
                    this.imageList.forEach(function (item,index) {
                        imgsList.push({
                            action:item.action,
                            actionId:item.actionId,
                            url:item.url,
                            frontcover:item.paraImage,
                            orders:index + 1
                        });
                    })
                    imgsListBox = {
                        appletSowingMapModels:imgsList
                    }
                }
//                utils.debug(imgsListBox);
//                转成json字符串后上传服务器
                imgsListBox = JSON.stringify(imgsListBox);
                POST('component/appletSowingMap/submit.jhtml',imgsListBox).then(
                    function (data) {
                        if (data.type == 'success') {
                            event.toast('保存成功');
                            event.closeURL();
                        } else {
                            event.toast(data.content);
                            //上传失败
                            _this.toSendArticle = false;
                            _this.currentPro = 0;//当前进度
                            _this.proTotal = 0;//总的进度
                            _this.processWidth = 0;//进度条宽度
                        }
                    }, function (err) {
                        event.toast(err.content);
                        //上传失败
                        _this.toSendArticle = false;
                        _this.currentPro = 0;//当前进度
                        _this.proTotal = 0;//总的进度
                        _this.processWidth = 0;//进度条宽度
                    }
                )
            },
            hasSliderList(){
                return this.sliderList.length > 0;
            },
            hasImage() {
                return this.imageList.length > 0;
            },
            imageLength() {
                return this.imageList.length < 5;
            },
//            删除图片
            delImage(index) {
                this.imageList.splice(index, 1);
                this.sliderList.splice(index, 1);
                this.imageListLength --;
            },
            changeCover(item,index){
                var _this = this;
                var options = {
                    isCrop: true,
                    width: 5,
                    height: 2
                };
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    options, function (mes) {
//                        utils.debug(mes);
                        if (mes.type == 'success') {
                            _this.sliderList[index].thumbnailImage = mes.data.thumbnailSmallPath;
                            item.thumbnailImage = mes.data.thumbnailSmallPath;
                            item.paraImage = mes.data.originalPath;
                        }
                    });
            },
            doCrop(){
                var _this = this;
                var options = {
                    isCrop: true,
                    width: 5,
                    height: 2
                };
                album.cropHeadImg(
                    //选完图片后触发回调函数
                    options, function (mes) {
//                        utils.debug(mes);
                        if (mes.type == 'success') {
                            _this.sliderList[index].thumbnailImage = mes.data.thumbnailSmallPath;
                            item.thumbnailImage = mes.data.thumbnailSmallPath;
                            item.paraImage = mes.data.originalPath;
                        }
                    });
            },

            articleShuffling(index){
                index = this.imageList.length;
                let _this = this;
                event.openURL(utils.locate('view/member/topic/articleList.js?from=shuffling'),function (res) {
//                    utils.debug(res);
//                    utils.debug(res.type);
//                    utils.debug(res.data.value.thumbnail);
                    if(res.type == 'success' && !utils.isNull(res.data)){
                        album.cropHeadImg(res.data.value.thumbnail,5,2,function (data){
                            if(data.type == 'success'){
                                _this.sliderList.push({
                                    thumbnailImage:data.data.originalPath,
                                })
                                let item = {
                                    paraImage: data.data.originalPath,
                                    thumbnailImage: data.data.originalPath,
                                    actionId:res.data.id,
                                    url:'',
                                    action:'OPENARTICLE'
                                }
                                _this.imageList.splice(index,0,item);
                                _this.imageListLength ++;
                            }
                        })

//                        _this.sliderList.push({
//                            thumbnailImage:data.data.value.templates[0].original,
//                        })
//                        let item = {
//                            paraImage: data.data.value.templates[0].original,
//                            thumbnailImage: data.data.value.templates[0].original,
//                            actionId:data.data.id,
//                            url:'',
//                            action:'OPENARTICLE'
//                        }
//                        _this.imageList.splice(index,0,item);
//                        _this.imageListLength ++;

                    }
                })
            },
//            添加商品轮播图
            productShuffling(index){
                index = this.imageList.length;
                let _this = this;
                event.openURL(utils.locate('view/shop/goods/manage.js?from=shuffling'),function (res) {
                    if(res.type == 'success' && !utils.isNull(res.data) ){
                        album.cropHeadImg(res.data.thumbnail,5,2,function (data){
                            if(data.type == 'success'){
                                _this.sliderList.push({
                                    thumbnailImage:data.data.originalPath,
                                })
                                let item = {
                                    paraImage: data.data.originalPath,
                                    thumbnailImage: data.data.originalPath,
                                    actionId:res.data.id,
                                    url:'',
                                    action:'OPENPRODUCT'
                                }
                                _this.imageList.splice(index,0,item);
                                _this.imageListLength ++;
                            }
                        }

                        )

                    }

                })
            },
            goback() {
                event.closeURL();
            },
//            控制进度条
            ctrlProcess(data) {
                this.processWidth = parseInt(data.data) * 5;
                if (this.processWidth == 500) {
                    this.currentPro++;
                }

            },
            headLogo(num){
                let _this = this;
                var options = {
                    isCrop: false,
                    width: 1,
                    height: 1
                };
                album.openAlbumSingle(options, function (data) {
                    if (data.type == 'success') {
                        _this.companyInfo.logo = data.data.thumbnailSmallPath;
                        _this.paraLogo = data.data.thumbnailSmallPath;
//                        _this.imageList.push(item);
                    }
                })
            },
            areaChoose:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate('widget/city.js?type=0'),function (data) {
                    if(data.type == 'success' && !utils.isNull(data.data) ){
                        _this.companyInfo.area.id = data.data.chooseId;
//                        _this.companyInfo.area.name = data.data.name;
                        _this.$set(_this.companyInfo.area,'name',data.data.name);
                    }

                })
            },
            goAutograph:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                let senfData = this.companyInfo.autograph == '点击设置企业签名' || utils.isNull(this.companyInfo.autograph) ? '' : this.companyInfo.autograph;
                let textData = {
                    autograph:senfData
                };
                textData = JSON.stringify(textData);
                storage.setItem('oneNumber',textData,e=>{
                    event.openURL(utils.locate('widget/autograph.js?name=oneNumber'), function (message) {
                        if(message.type == 'success'){
                            _this.$set(_this.companyInfo,'autograph',message.data.text);
                        }
                    })
                });
            },
//            direction: function () {
//                if (this.clicked) {
//                    return;
//                }
//                this.clicked = true;
//                var _this = this;
//
////                event.openURL(utils.locate('widget/multChooseList.js?listId=' + this.category + '&type=direction'), function (data) {
////                    _this.clicked = false;
////                    if(data.type == 'success' && data.data != '') {
////                        _this.category = parseInt(data.data.listId);
////                        _this.occupation = data.data.listName;
////                    }
////                })
//            },
            petname:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                let senfData = this.companyInfo.name == '点击设置企业名' ? '' : this.companyInfo.name;
                let textData = {
                    autograph:senfData
                };
                textData = JSON.stringify(textData);
                storage.setItem('companyName',textData,e=>{
                    event.openURL(utils.locate('widget/autograph.js?name=companyName'), function (message) {
                        if(message.type == 'success'){
                            _this.companyInfo.name = message.data.text;
                        }
                    })
                });

            },
        },
    }

</script>