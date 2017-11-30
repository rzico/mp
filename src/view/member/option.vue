<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller">
            <div class="cell-row cell-line" @click="doDownLoad()">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">同步数据</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
                <div class="sub-panel">
                    <text class="sub_title">从服务器获取所有已发布的文章</text>
                </div>
            <div class="cell-row cell-line"  @click="clearCache()">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">清除缓存</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">23.3MB  </text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
             </div>
            <div class="cell-row cell-line" @click="goBlackList()">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">黑名单</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{blackNum}}人 </text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="cell-row cell-line" @click="sendQrcode()">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">我的二维码</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{setQrcode}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">分享后文章自动加上二维码，有助于打造个人品牌</text>
            </div>
        </scroller>

        <!--遮罩-->
        <div class="sendMask" v-if="toSendArticle">
            <!--进度条-->
            <div class="processBox">
                <text class="processText">正在云同步,请稍后...</text>
                <!--进度条背景-->
                <div class="processStyle processBg"></div>
                <!--进度条进度与颜色-->
                <div :style="{width:processWidth + 'px'}" style="background-color: #D9141E" class="processStyle"></div>
                <text class="processTotal">{{currentPro}}/{{proTotal}}</text>
            </div>
        </div>
    </div>

</template>
<style lang="less" src="../../style/wx.less"/>

<style scoped>
    .processTotal{
        position: absolute;
        bottom: 40px;
        right: 50px;
        font-size: 28px;
        color: #888;
    }
    .processBg{
        background-color: #ccc;
        width:500px;
    }
    .processStyle{
        height:10px;
        position: absolute;
        left: 50px;
        bottom:100px;
    }
    .processText{
        position: absolute;
        top:40px;
        left: 50px;
        font-size: 32px;
    }
    .processBox{
        height:250px;
        border-radius: 5px;
        width:600px;
        background-color: #fff;
        justify-content: space-between;
    }
    .sendMask{
        position: absolute;
        top: 0;
        bottom: 0;
        left:0;
        right: 0;
        background-color: rgba(0,0,0,0.8);
        align-items: center;
        justify-content: center;
    }

    .sub-panel {
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;

    }
</style>
<script>
    var event = weex.requireModule('event');
    import navbar from '../../include/navbar.vue';
    import { POST, GET } from '../../assets/fetch';
    import utils from '../../assets/utils';
    const storage = weex.requireModule('storage');
    const album = weex.requireModule('album');
    export default {
        data:function () {
          return{
              listCurrent:0,
              pageSize:20,
              toSendArticle:false,
              currentPro:0,//当前进度
              proTotal:0,//总的进度
              processWidth:0,//进度条宽度
              UId:0,
              lastDownLoadtamp:'',
              timestamp:'',
              blackNum:0,
              setQrcode:'未设置'
          }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "通用设置" }
        },
        create(){
            utils.initIconFont();
            let _this = this;
//            获取用户id
            this.UId = event.getUId();
            event.toast('created');
            GET('weex/member/option.jhtml',function (data) {
                event.toast(data);
                if(data.type == 'success'){
                    _this.blackNum = data.data.black;
                    if(!utils.isNull(data.data.qrcode)){
                        _this.setQrcode = '已设置';
                    }
                }else{
                    event.toast(data.content)
                }
            },function (err) {
                event.toast(err.content);
            })
        },
        methods: {
            goback: function (e) {
                event.closeURL()
            },
//            下载文章 20 20的循环
            downloadArticle(){
                var _this = this;
                event.toast('weex/member/article/list.jhtml?isDraft=false' + '&timeStamp=' + _this.lastDownLoadtamp + '&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize);
                    GET('weex/member/article/list.jhtml?isDraft=false' + '&timeStamp=' + _this.lastDownLoadtamp + '&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize,function (data) {
                        if(data.type == 'success' && data.data.data != ''){
                            event.toast(data.data.data);
                            if(data.data.start == 0 ){
//                           将本次时间戳缓存起来
                                storage.setItem('lastDownLoadtamp' + _this.UId,data.data.data[0].modifyDate);
                            }
                            _this.toSendArticle = true;
                            _this.proTotal = data.data.recordsTotal;
                            data.data.data.forEach(function (item,index) {
                                let saveData = {
                                    type:"article",
                                    key:item.id,
                                    value:item,
                                    sort:'0,'+ item.modifyDate +'',
                                    keyword:',['+ item.articleOption.articleCatalog.id + '],' + item.title + ','
                                }
                                event.save(saveData,function(e){
                                    _this.ctrlProcess();
                                    if(e.type == 'success'){
                                        if(index == 19){
                                            _this.listCurrent = _this.listCurrent + _this.pageSize;
                                            _this.downloadArticle();
                                        }else if(index == data.data.data.length - 1){
                                            _this.doneDown();
                                        }
                                    }else{
                                    }
                                })
                            })
                        }else if(data.type == 'success' && data.data.data == ''){
                            if(data.data.recordsTotal == 0){
                                event.toast('您还没有发布过文章。');
                            }else{
                               _this.doneDown();
                            }
                        }else{
                            event.toast(data.content);
                        }
                    },function (err) {
                        event.toast(err.content);
                    })
            },
//            下载完成后执行
            doneDown(){
                let _this = this;
                _this.toSendArticle = false;
//                                    全局监听文章变动
                let listenData = utils.message('success','文章改变','');
                event.sendGlobalEvent('onArticleChange',listenData);
                event.toast('同步完成');
                _this.currentPro = 0;
                _this.processWidth = 0;
                this.listCurrent = 0;
            },
//            执行下载代码
            doDownLoad(){
                let _this = this;
                storage.getItem('lastDownLoadtamp' + _this.UId, e => {
                    if(e.result == 'success' && !utils.isNull(e.data)){
                        _this.lastDownLoadtamp = e.data;
                    }else{
                        _this.lastDownLoadtamp = '';
                    }
                    this.downloadArticle();
                })
            },
            //            控制进度条
            ctrlProcess(data){
                this.currentPro ++;
                this.processWidth = this.currentPro *  (100 / this.proTotal) * 5;
//                this.processWidth = parseInt(data.data) * 5;
                if(this.processWidth >= 500){
                    this.processWidth = 500;
                }
            },
//            清除缓存
            clearCache(){
                let option = {
                    type:['cache','tim','wxstorage']
                }
                event.clearCache(option,function (data) {
                    if(data.type == 'success'){
                        event.toast('清除成功');
                    }else{
                        event.toast(data.content);
                    }
                });
            },
//            上传二维码
            sendQrcode(){
                let _this = this;
                album.openAlbumSingle(true, function(data){
                    event.toast('1');
                    event.toast(data);
//                    _this.paraList[index].paraImage = data.data.originalPath;
//                    _this.paraList[index].thumbnailImage = data.data.thumbnailSmallPath;
                    if(data.type == 'success'){
                        event.upload(data.data.originalPath,function (item) {
                            if(item.type == 'success'){
                                POST('weex/member/update.jhtml?qrcode=' + item.data).then(
                                    function(e){
                                        if(e.type == 'success'){
                                            _this.setQrcode = '已设置';
                                        }else{
                                            event.toast('1');
                                            event.toast(e.content);
                                        }
                                    },function(err){
                                        event.toast('2');
                                        event.toast(err.content);
                                    }
                                )
                            }else{
                                event.toast(item.content);
                            }
                        },function(progress){

                        })

                    }else{
                        if(data.content == '用户取消'){
                        }else{
                            event.toast(data.content);
                        }
                    }
                })
            },
//            黑名单列表
            goBlackList(){
                event.openURL(utils.locate('view/member/blackList.js'),function (data) {
                });
            }
        }

    }
</script>