<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller">
            <div class="cell-row cell-line">
                 <div class="cell-logo">
                    <div class="flex-row flex-start">
                        <text class="title ml10">头像</text>
                    </div>
                    <div class="flex-row flex-end">
                        <image class="logo" resize="cover" @click="headLogo"
                               :src="logo">
                        </image>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between" @click="petname">
                    <div class="flex-row">
                        <text class="title ml10">昵称</text>
                    </div>
                    <div class="flex-row flex-end" >
                        <text class="sub_title">{{nickName}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row">
                        <text class="title ml10">登录名</text>
                    </div>
                    <div class="flex-row flex-end" >
                        <text class="sub_title" style="margin-right:40px">{{userId}}</text>
                    </div>
                </div>
                <div class="cell-panel space-between" @click="pick">
                    <div class="flex-row">
                         <text class="title ml10">性别</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{gender}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between" @click="pickDate">
                    <div class="flex-row">
                        <text class="title ml10">生日</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{birthday}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between" @click="profession">
                    <div class="flex-row">
                        <text class="title ml10">职业</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{occupation}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between" @click="areaChoose">
                    <div class="flex-row">
                        <text class="title ml10">所在地</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{areaName}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between " @click="goAutograph">
                    <div class="flex-row">
                        <text class="title ml10">个性签名</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title" style="width:300px;lines:1;text-overflow:ellipsis; text-align: right">{{autograph}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between cell-clear" @click="showQrcode()">
                    <div class="flex-row">
                        <text class="title ml10">我的二维码</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
             </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between"  @click="updatePassword()">
                    <div class="flex-row flex-start">
                        <text class="title ml10">密码</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{hasPassword}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between"  @click="doBindWeiXin()">
                    <div class="flex-row flex-start">
                        <text class="title ml10">绑定微信号</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{bindWeiXin}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between cell-clear" @click="doBindMobile()" >
                    <div class="flex-row flex-start">
                        <text class="title ml10">绑定手机号</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{bindMobile}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
         </scroller>
        <div class="button bw bkg-primary" @click="logout">
            <text class="buttonText ">注销账号</text>
        </div>
        <qrcode ref="qrcode" ></qrcode>
    </div>

</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .cell-logo {
        height: 160px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-bottom-color: #bbb;
        border-bottom-style: solid;
    }
    .logo {
        width:120px;
        height:120px;
        margin:10px;
        border-radius:60px;
        overflow:hidden;
    }
    .bw{
        margin-top:20px;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 20px;
    }
    .buttonText{
        font-size: 40px;
        color:#ffffff;
    }
</style>
<script>
    import { POST, GET } from '../../assets/fetch';
    import utils from '../../assets/utils';
    import filters from '../../filters/filters'
    const event = weex.requireModule('event');
    const album = weex.requireModule('album');
    const picker = weex.requireModule('picker');
    import qrcode from '../../include/qrcode.vue';
    import navbar from '../../include/navbar.vue'
    const storage = weex.requireModule('storage');
    var modal = weex.requireModule('modal');
    export default {
        components: {
            navbar,qrcode
        },
        data() {
            return {
                userId:"",
                attribute:{},
                bindWeiXin:"未绑定",
                bindMobile:"未绑定",
                hasPassword:"未设置",
                autograph:"",
                gender:"保密",
                birthday:"",
//                logo: utils.locate("logo.png"),
                logo:'',
                nickName:"未登录",
                areaName:"未设置",
                occupation:"未设置",
                category:1,
                sex:'',
                begin:2,
                tel:'',
                clicked:false,
            }
        },
        props: {
            title: { default: "账号设置" }
        },
        created() {
            utils.initIconFont();
            this.open();
//            event.toast(this.logo)
        },
        methods: {
            showQrcode: function (e) {
                this.$refs.qrcode.show();
            },
            goback: function (e) {
                var E = {
                    logo:this.logo,
                    nickName:this.nickName,
                    autograph:this.autograph

                }
                let backData = utils.message('success','成功',E);
                event.closeURL(backData);
                this.clicked = false
            },
            profession: function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('widget/list.js?listId=' + this.category + '&type=occupation'), function (data) {
                    _this.clicked = false;
                    if(data.type == 'success' ) {
                        _this.category = parseInt(data.data.listId);
                        _this.occupation = data.data.listName;
                        POST('weex/member/update.jhtml?occupationId=' +_this.category).then(
                            function (mes) {
                                if (mes.type == "success") {

                                } else {
                                    event.toast(mes.content);
                                }
                            }, function (err) {
                                event.toast("网络不稳定");
                            }
                        )
                    }
                })

            },

            areaChoose:function () {
//                event.openURL('http://192.168.2.108:8081/city.weex.js?type=0',function (data) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('widget/city.js?type=0'),function (data) {
                    _this.clicked = false;
                    if(data.type == 'success' && !utils.isNull(data.data) ){
                        POST('weex/member/update.jhtml?areaId=' + data.data.chooseId).then(
                            function (mes) {
                                if (mes.type == "success") {
                                    _this.areaName = data.data.name;
                                } else {
                                    event.toast(mes.content);
                                }
                            }, function (err) {
                                event.toast("网络不稳定");
                            }
                        )
                    }

                })
            },
            petname:function () {
                let _this = this;
                modal.prompt({
                    message: '修改昵称',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                    default:_this.nickName,
                    placeholder:'请输入昵称'
                }, function (value) {
                    if(value.result == '确定'){
                        if(value.data == '' || value.data == null ){
                            modal.toast({message:'请输入昵称',duration:1})
                        }else{
                            if(utils.getLength(value.data) > 32){
                                event.toast('输入的昵称不能超过16个字,请重试。');
                                return;
                            }
                            POST('weex/member/update.jhtml?nickName=' +encodeURI(value.data)).then(
                                function (mes) {
                                    if (mes.type == "success") {
                                        _this.nickName = value.data
                                    } else {
                                        event.toast(mes.content);
                                    }
                                }, function (err) {
                                    event.toast("网络不稳定");
                                }
                            )
                    }
                    }
                })
            },
            pickDate () {
                var _this = this;
                picker.pickDate({
                    value: _this.birthday
                }, function (e) {
                    if (e.result == 'success') {
                        POST('weex/member/update.jhtml?birth=' +e.data).then(
                            function (mes) {
                                if (mes.type == "success") {
                                    _this.birthday =e.data
                                } else {
                                    event.toast(mes.content);
                                }
                            }, function (err) {
                                event.toast("网络不稳定");
                            }
                        )
                    }
                })
            },
            headLogo: function () {
                var _this = this;
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    true,function (data) {
                        _this.clicked = false;
                        if(data.type == 'success') {
//                            _this.logo = data.data.thumbnailSmallPath;
//                    data.data里存放的是用户选取的图片路
//                            _this.original = data.data.originalPath
//                            上传原图
                            event.upload(data.data.originalPath,function (data) {
//                                event.toast(data);
                                if (data.type == 'success' ) {
//                            修改后访问修改专栏信息接口
                                    POST('weex/member/update.jhtml?logo=' + data.data).then(
                                        function (mes) {
                                            if (mes.type == "success") {
//                                                将服务器上的路径写入页面中
                                                _this.logo = utils.thumbnail(data.data,120,120);
//                                              event.toast(data);
                                            } else {
                                                event.toast(mes.content);
                                            }
                                        }, function (err) {
                                            event.toast("网络不稳定");
                                        }
                                    )
                                } else {
                                    event.toast(data.content);
                                }
                            })
                        }
            })
            },
            pick () {
                var _this = this;
                picker.pick({
                    index:_this.begin,
                    items:['男','女','保密']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0) {
                            _this.gender = '男'
                            _this.sex = 'male'
                            _this.begin = e.data

                        } else if (e.data == 1) {
                            _this.gender = '女'
                            _this.sex = 'female'
                            _this.begin = e.data
                        }
                        else {
                            _this.gender = '保密'
                            _this.sex = 'secrecy'
                            _this.begin = e.data
                        }
                        POST('weex/member/update.jhtml?gender=' + this.sex).then(
                            function (mes) {
                                if (mes.type == "success") {

                                } else {
                                    event.toast(mes.content);
                                }
                            }, function (err) {
                                event.toast("网络不稳定");
                            }
                        )
                    }
                })
            },
            goAutograph:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                let senfData = this.autograph;
                let textData = {
                    autograph:senfData
                };
                textData = JSON.stringify(textData);
                storage.setItem('oneNumber', textData,e=>{
                event.openURL(utils.locate('widget/autograph.js?name=oneNumber'), function (message) {
                    _this.clicked = false;
                    if(message.type == 'success'){
                        POST('weex/member/update.jhtml?autograph=' +encodeURI(message.data.text)).then(
                            function (mes) {
                                if (mes.type == "success") {
                                    _this.autograph = message.data.text;
                                } else {
                                    event.toast(mes.content);
                                }
                            }, function (err) {
                                event.toast("网络不稳定");
                            }
                        )
                    }
                })

                });
            },
            updateStatus: function (attr) {
                var _this = this;
                _this.logo = attr.logo;
                _this.nickName = attr.nickName;
                _this.userId = attr.userId;
                if (attr.autograph!=null && attr.autograph!="") {
                    _this.autograph = attr.autograph;
                } else {
                    _this.autograph = "未填写";
                }
                if (attr.birthday!=null && attr.birthday!="") {
                    _this.birthday = utils.ymdtimefmt(attr.birthday)
                } else {
                    _this.birthday = "未设置";
                }
                if (attr.hasPassword!=null && attr.hasPassword) {
                    _this.hasPassword = "已设置";
                } else {
                    _this.hasPassword = "未设置";
                }
                if (attr.bindMobile!=null && attr.bindMobile) {
                    _this.bindMobile = "已绑定(可换绑)";
                } else {
                    _this.bindMobile = "未绑定";
                }
//                event.toast(_this.attribute);
                if (attr.bindWeiXin!=null && attr.bindWeiXin) {
                    _this.bindWeiXin = "已绑定";
                } else {
                    _this.bindWeiXin = "未绑定";
                }
                if (attr.occupation!=null) {
                    _this.occupation = attr.occupation.name;
                } else {
                    _this.occupation = "未设置";
                }
                if (attr.area!=null) {
                    _this.areaName = attr.area.name;
                } else {
                    _this.areaName = "未设置";
                }
                if (attr.gender!=null && attr.gender!="") {
                    if (attr.gender=="male") {
                        _this.gender = "男";
                        _this.begin =0
                    }
                    if (attr.gender=="female") {
                        _this.gender = "女";
                        _this.begin =1
                    }
                    if (attr.gender=="secrecy") {
                        _this.gender = "保密";
                        _this.begin =2
                    }


                } else {
                    _this.gender = "未设置";
                }
            },
            open:function () {
                var _this = this;
                GET("weex/member/attribute.jhtml",
                    function (data) {
                        if (data.type=="success") {
                            _this.attribute = data.data;
                            _this.updateStatus(_this.attribute);
                            _this.tel =data.data.mobile
                            _this.category =data.data.occupation.id
                        } else {
                            event.toast(data.content);
                        }
                    },
                    function (err) {
                        event.toast("网络不稳定")
                    }
                )
            },
            updatePassword: function (e) {
                var _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                if (!_this.attribute.bindMobile) {
                    event.openURL(utils.locate("view/member/password/index.js"),
                        function (res) {
                        _this.clicked = false;
                            if (res.type=='success') {
                                _this.attribute.bindMobile = true;
                                _this.attribute.hasPassword = true;
                            }
                            _this.updateStatus(_this.attribute);
                        }
                    )
                } else {
                    event.openURL(utils.locate("view/member/password/captcha.js?telNum=" +_this.tel),
                        function (res) {
                        _this.clicked = false;
                            if (res.type=='success') {
                                _this.attribute.hasPassword = true;
                            }
                            _this.updateStatus(_this.attribute);
                        }
                    )
                }
            },
            doBindMobile: function (e) {
                var _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                if (_this.attribute.bindMobile!=null && _this.attribute.bindMobile!='') {
                    event.openURL(utils.locate("view/member/mobile/unbind.js?mobile=" +_this.tel),
                        function (res) {
                        _this.clicked = false;
                            if (res.type == "success") {
                               _this.open();
                            }
                        }
                    )
                }else {
                    event.openURL(utils.locate("view/member/mobile/index.js"),
                        function (res) {
                        _this.clicked = false;
                            if (res.type == "success") {
                                _this.open();
                            }
                        }
                    )
                }
            },
            doBindWeiXin: function (e) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if (_this.attribute.bindWeiXin) {
                    _this.clicked = false;
                    return;
                }
                event.wxAuth(function (msg) {
                   if (msg.type=="success") {
                       POST("weex/member/weixin/bind.jhtml?code="+msg.data).then(
                           function (data) {
                               if (data.type="success") {
                                   _this.attribute.bindWeiXin = true;
                                   _this.updateStatus(_this.attribute);
                               } else {
                                   event.toast(data.content);
                               }
                               _this.clicked = false;
                           },
                           function (err) {
                               _this.clicked = false;
                               event.toast(err.content);
                           }
                       )
                   } else {
                       _this.clicked = false;
                       event.toast(msg.content);
                   }
                })

            },
            logout:function () {
//                POST('weex/login/logout.jhtml').then(
//                function (data) {
//                    if (data.type == "success") {
//                        event.logout(function (e) {
//                            if(e.type == 'success'){
//                                event.closeURL();
//                            }else{
//                                event.toast(e.content);
//                            }
//                        })
//                    } else {
//                        event.toast(data.content);
//                    }
//                }, function (err) {
//                    event.toast(err.content);
//                }
//                )
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.logout(function (e) {
                    _this.clicked = false;
                    if(e.type == 'success'){
                        let E = utils.message('success','关闭','')
                        event.closeURL(E);
                    }else{
                        event.toast(e.content);
                    }
                })
            }
        }

    }
</script>