<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller">
            <div class="cell-row cell-line">
                 <div class="cell-logo">
                    <div class="flex-row flex-start">
                        <text class="title ml10">通用设置</text>
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
                <div class="cell-panel space-between cell-clear" @click="goAutograph">
                    <div class="flex-row">
                        <text class="title ml10">个性签名</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{autograph}}</text>
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
                <div class="button primary" @click="logout">
                    <text class="buttonText ">注销账号</text>
                </div>
            </div>
         </scroller>
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
    .button{
        margin-left: 20px;
        margin-right: 40px;
        margin-top: 48px;
        margin-bottom: 20px;
        height: 82px;
        align-items:center;
        justify-content: center;
        border-radius:10px;
    }
    .buttonText{
        font-size: 40px;
        color:#ffffff;
    }
</style>
<script>
    import { POST, GET } from '../../assets/fetch';
    import utils from '../../assets/utils';
    const event = weex.requireModule('event');
    const album = weex.requireModule('album');
    const picker = weex.requireModule('picker')
    import navbar from '../../include/navbar.vue'
    const storage = weex.requireModule('storage');
    var modal = weex.requireModule('modal');
    export default {
        components: {
            navbar
        },
        data() {
            return {
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
                sex:''
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
            potting:function () {

            },
            goback: function (e) {
                var E = {
                    logo:this.logo,
                    nickName:this.nickName,
                    autograph:this.autograph

                }
                let backData = utils.message('success','成功',E);
//                utils.debug(E)
                event.closeURL(backData);
            },
            profession: function () {
                var _this = this;

                event.openURL(utils.locate('widget/list.js?listId=' + this.category + '&type=category'), function (data) {
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
                let _this = this;
                event.openURL(utils.locate('widget/city.js?type=0'),function (data) {
                    if(data.type == 'success' && !utils.isNull(data.data) ){
                        POST('weex/member/update.jhtml?areaId=' + data.data.chooseId).then(
                            function (mes) {
                                if (mes.type == "success") {
//                                        utils.debug(mes)
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

                            POST('weex/member/update.jhtml?nickName=' +encodeURI(value.data)).then(
                                function (mes) {
                                    if (mes.type == "success") {
//                                        utils.debug(mes)
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
                picker.pickDate({
                    value: this.birthday
                }, event => {
                    if (event.result === 'success') {
                        this.birthday = event.data
                        POST('weex/member/update.jhtml?birth=' +this.birthday).then(
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
            headLogo: function () {
                var _this = this;
                album.openAlbumSingle(
                    //选完图片后触发回调函数
                    true,function (data) {
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
                                                _this.logo = data.data;
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
                picker.pick({
                    index:0,
                    items:['男','女','保密']
                }, e => {
                    if (e.result === 'success') {
                        if (e.data == 0){
                            this.gender = '男'
                            this.sex = 'male'

                        }else if(e.data == 1){
                            this.gender = '女'
                            this.sex = 'female'
                        }
                        else{
                            this.gender = '保密'
                            this.sex = 'secrecy'
                        }
                        POST('weex/member/update.jhtml?gender=' +this.sex).then(
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
                let _this = this;
                let senfData = this.autograph == '未填写' ? '' : this.autograph;
                let textData = {
                    autograph:senfData
                };
                textData = JSON.stringify(textData);
                storage.setItem('oneNumber', textData,e=>{
                event.openURL(utils.locate('widget/autograph.js?name=oneNumber'), function (message) {
                    if(message.data != ''){
//                       utils.debug('weex/member/update.jhtml?autograph=' + encodeURI(message.data.text))
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
                if (attr.autograph!=null && attr.autograph!="") {
                    _this.autograph = attr.autograph;
                } else {
                    _this.autograph = "未填写";
                }
                if (attr.birthday!=null && attr.birthday!="") {
                    _this.birthday = "已设置";
                } else {
                    _this.birthday = "未设置";
                }
                if (attr.hasPassword!=null && attr.hasPassword) {
                    _this.hasPassword = "已设置";
                } else {
                    _this.hasPassword = "未设置";
                }
                if (attr.bindMobile!=null && attr.bindMobile) {
                    _this.bindMobile = "已绑定";
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
                    }
                    if (attr.gender=="female") {
                        _this.gender = "女";
                    }
                    if (attr.gender=="secrecy") {
                        _this.gender = "保密";
                    }


                } else {
                    _this.gender = "未设置";
                }
            },
            open:function () {
                var _this = this;
                GET("weex/member/attribute.jhtml",
                    function (data) {
//                    utils.debug(data)
                        if (data.type=="success") {
                            _this.attribute = data.data;
                            _this.updateStatus(_this.attribute);
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
                if (!_this.attribute.bindMobile) {
                    event.openURL(utils.locate("view/member/password/index.js"),
                        function (res) {
                            if (res.type=='success') {
                                _this.attribute.bindMobile = true;
                                _this.attribute.hasPassword = true;
                            }
                            _this.updateStatus(_this.attribute);
                        }
                    )
                } else {
                    event.openURL(utils.locate("view/member/password/captcha.js"),
                        function (res) {
                            if (res.type=='success') {
                                _this.attribute.hasPassword = updated;
                            }
                            _this.updateStatus(_this.attribute);
                        }
                    )
                }
            },
            doBindMobile: function (e) {
                var _this = this;
                if (_this.attribute.bindMobile) {
                    return;
                }
                event.openURL(utils.locate("view/member/mobile/index.js"),
                    function (res) {
                        if (res.type=="success") {
                            _this.attribute.bindMobile = true;
                        }
                        _this.updateStatus(_this.attribute);
                    }
                )

            },
            doBindWeiXin: function (e) {
                var _this = this;
                if (_this.attribute.bindWeiXin) {
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
                           },
                           function (err) {
                               event.toast(err.content);
                           }
                       )
                   } else {
                       event.toast(msg.content);
                   }
                })

            },
            logout:function () {
                POST('weex/login/logout.jhtml').then(
                function (data) {
                    if (data.type == "success") {
                        event.closeURL(data);
                    } else {
                        event.toast(data.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                }
                )
            }
        }

    }
</script>