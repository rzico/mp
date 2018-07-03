<template>
    <div class="wrapper bgWhite" >
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="submitNow" > </navbar>
        <scroller class="scroller pr20" >
            <div class="cell-row  mt0">
                <div class="cell-logo">
                    <div class="flex-start">
                        <div class="name">
                            <text class="title lineCtrlOne pt20 fz35" @click="petname()">{{companyInfo.name | watchCompanyName}}</text>
                            <text class="autograph lineCtrlTwo pb20"@click="goAutograph()" >{{companyInfo.autograph | watchAutograph}}</text>
                        </div>
                    </div>
                    <div @click="headLogo(3)">
                        <div  v-if="!logoLoading"  class="logo coverAbsoTop " @click="headLogo(1)"></div>
                        <image class="logo" resize="cover" @click="headLogo(2)"  @load="logoLoad(item)"
                               :src="companyInfo.logo">
                        </image>
                    </div>
                </div>
            </div>
            <div class="ml20 boder-bottom"></div>
            <div class="cell-row mt0">
                <div class="cell-panel space-between cell-clear" @click="areaChoose()">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe792;</text>
                        <text class="title ml20">{{companyInfo.area.name | watchAreaName}}</text>
                    </div>
                    <!--<div class="flex-row flex-end">-->
                    <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                    <!--</div>-->
                </div>
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe9fb;</text>
                        <input class="input" type="text" placeholder="详细地址:街道、楼牌号等" maxlength="30" v-model="companyInfo.address" />
                    </div>
                </div>
                <div class=" boder-bottom "></div>
                <div class="cell-panel space-between cell-clear" >
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe74e;</text>
                        <text class="title ml20" @click="pickStartTime()">{{companyInfo.startTime | watchStartTime}} -</text>
                        <text class="title " @click="pickEndTime()"> {{companyInfo.endTime | watchEndTime}}</text>
                    </div>
                    <!--<div class="flex-row flex-end">-->
                    <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                    <!--</div>-->
                </div>
                <div class="cell-panel space-between cell-clear" @click="subQuestion()">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe656;</text>
                        <!--<text class="title ml20">15860785353</text>-->
                        <input class="input" type="text" placeholder="电话号码" maxlength="11" v-model="companyInfo.phone" />
                    </div>
                    <!--<div class="flex-row flex-end">-->
                    <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                    <!--</div>-->
                </div>
                <div class=" boder-bottom "></div>
                <div class="cell-panel space-between cell-clear" >
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe61a;</text>
                        <text class="title ml20">门店照片</text>
                    </div>
                </div>
                <div  class="imageBox  " v-if="hasImage()" >
                    <div v-for="(item,index) in imageList">
                        <div  v-if="!item.loading"  class="goodsImg coverAbsoTop " ></div>
                        <image class="goodsImg " resize="cover" @load="onImageLoad(item)"@click="changeCover(item,index)" :src="item.thumbnailImage"></image>
                        <div class="changeCoverBox">
                            <text class="fz26 white">更换照片</text>
                        </div>
                        <!--右上角关闭按钮"x"-->
                        <div class="paraClose  bkg-gray" @click="delImage(index)" >
                            <text class="paraCloseSize blackColor" :style="{fontFamily:'iconfont'}" >&#xe60a;</text>
                        </div>
                        <div class="paraIcon paraLeft  bkg-gray" v-if="index != 0" @click="moveUp(index)" >
                            <text class="paraCloseSize blackColor" :style="{fontFamily:'iconfont'}" >&#xe669;</text>
                        </div>
                    </div>
                </div>
                <!--底部添加照片-->
                <!--<div class="flex-row ml5 pt20 pb20" @click="addPhotos()" v-if="imageLength()" >-->
                <!--<text class="fz40 primary" style="margin-top: 3px" :style="{fontFamily:'iconfont'}">&#xe6b5;</text>-->
                <!--<text class="fz35 ml20">添加照片</text>-->
                <!--</div>-->
                <div class="cell-panel space-between cell-clear" @click="addPhotos()" v-if="imageLength()" >
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe6b5;</text>
                        <text class="title ml20">添加照片</text>
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

    .blackColor{
        color: #000;
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
        bottom:0px;
        left:10px;
    }
    .paraClose{
        position: absolute;
        top:10px;
        right:0px;
        padding-left: 10px;
        padding-top: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
        border-radius:22px;
    }
    .paraCloseSize{
        color: #fff;
        font-size: 24px;
    }
    .imageBox{
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        width:690px;
    }
    .goodsImg{
        border-radius: 5px;
        height: 200px;
        width: 200px;
        margin-left: 10px;
        margin-top: 10px;
    }
    .changeCoverBox{
        position: absolute;
        top:10px;
        left: 10px;
        right: 0;
        bottom:0;
        height: 200px;
        width: 200px;
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
            }
        },
        props: {
            title: {default: "企业信息"},
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
        },
        methods: {//            上箭头
            moveUp:function (index) {
                let _this = this;
//         方法2
                let a = this.imageList[index].thumbnailImage;
                let d = this.imageList[index].paraImage;
                this.imageList[index].thumbnailImage = this.imageList[index - 1].thumbnailImage;
                this.imageList[index].paraImage = this.imageList[index - 1].paraImage;
                this.imageList[index - 1].thumbnailImage = a;
                this.imageList[index - 1].paraImage = d;
            },
            open(){
                var _this = this;
                GET('weex/member/enterprise/views.jhtml',function (data) {
                    if(data.type == 'success'){
                        _this.companyInfo = data.data;
                        _this.paraLogo = data.data.logo;
                        data.data.image.forEach(function (item) {
                            _this.imageList.push({
                                thumbnailImage:item,
                                paraImage:item,
                                loading:false,
                            })
                        })
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
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
                if(utils.isNull(this.companyInfo.name)){
                    event.toast('请填写公司名');
                    return;
                }else if(utils.isNull(this.companyInfo.logo) || this.companyInfo == utils.locate('resources/images/background.png')){
                    event.toast('请设置公司头像');
                    return;
                }else if(utils.isNull(this.companyInfo.area)){
                    event.toast('请设置公司所在地');
                    return;
                }else if(utils.isNull(this.companyInfo.address)){
                    event.toast('请设置公司详细地址');
                    return;
                }else if(utils.isNull(this.companyInfo.phone)){
                    event.toast('请设置公司电话');
                    return;
                }
//                else if(utils.isNull(this.companyInfo.image)){
//                    event.toast('请设置公司门店照');
//                    return;
//                }


                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                this.toSendArticle = true;
                if (!utils.isNull(_this.companyInfo.logo) && _this.companyInfo.logo.substring(0, 4) != 'http') {
                    _this.proTotal++;
                }
                //                判断段落图片是否已上传
                this.imageList.forEach(function (item) {
                    if (!utils.isNull(item.paraImage) && item.paraImage.substring(0, 4) != 'http') {
                        _this.proTotal++;
                    }
                });
                if (this.imageList.length > 0) {
                    this.sendImage(0);
                } else {
                    this.uploadLogo();
                }
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
                        _this.uploadLogo();
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
                                _this.uploadLogo();
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
            uploadLogo(){
                let _this = this;
                let companyLogo = _this.paraLogo;
                var frontUrl = '';
                if (!utils.isNull(companyLogo)) {
                    frontUrl = companyLogo.substring(0, 4);
                }
                //                判断是否已经是服务器图片
                if (frontUrl == 'http') {
                    _this.realSave();
                }else{
                    event.upload(companyLogo, function (data) {
                        if (data.type == 'success') {
                            _this.paraLogo = data.data;
                            _this.realSave();
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
            realSave() {
                let _this = this;
                var imgsList = [];
                if (this.imageList.length > 0) {
                    this.imageList.forEach(function (item) {
                        imgsList.push(item.paraImage);
                    })
                }
                POST('weex/member/enterprise/add.jhtml?name=' + encodeURIComponent(this.companyInfo.name) + '&logo=' + this.paraLogo + '&phone=' + this.companyInfo.phone
                    + '&area=' + this.companyInfo.area.id + '&address=' + encodeURIComponent(this.companyInfo.address) + '&startTime=' + this.companyInfo.startTime + '&endTime=' + this.companyInfo.endTime
                    + '&img=' + imgsList + '&autogragh=' + encodeURIComponent(this.companyInfo.autograph)).then(
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
            hasImage() {
                return this.imageList.length > 0;
            },
            imageLength() {
                return this.imageList.length < 6;
            },
//            删除图片
            delImage(index) {
                this.imageList.splice(index, 1);
            },
//            添加图片
            addPhotos() {
                let _this = this;
                var options = {
                    isCrop: true,
                    width: 1,
                    height: 1
                };
                album.openAlbumSingle(options, function (data) {
                    if (data.type == 'success') {
                        let item = {
                            paraImage: data.data.originalPath,
                            thumbnailImage: data.data.thumbnailSmallPath
                        }
                        _this.imageList.push(item);
                    }
                })
            },
//            更改封面
            changeCover(item,index){
                var _this = this;
                var options = {
                    isCrop: true,
                    width: 1,
                    height: 1
                };
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    options, function (mes) {
                        if (mes.type == 'success') {
                            item.thumbnailImage = mes.data.thumbnailSmallPath;
                            item.paraImage = mes.data.originalPath;
                        }
                    });
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