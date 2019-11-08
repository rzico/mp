<template>
    <div class="wrapper">
        <navbar title="收货地址" @goback="goback"></navbar>
        <!-- 信息部分开始 -->
        <div class="box">
                <!-- 姓名部分 -->
                <div class="subBox"></div>
            <div class="newAddre-item"  @click="amapLinkTo">
                <div class="flex-row">
                    <text class="cellTitle">所在区域:</text>
                    <text class="fz32 pl30">{{areaName}}</text>
                </div>
                <text :style="{fontFamily:'iconfont',transform:deg}" class="ico">&#xe630;</text>
            </div>
            <!-- 详细地址部分 -->
            <div class="newAddre-item">
                <text class="cellTitle">详细地址:</text>
                <div class="newAddre-right">
                    <input class="Input" type="text" placeholder="楼号,单元,门牌号" v-model='address'/>
                </div>
            </div>

            <!-- 楼层部分 -->
            <div class="newAddre-item" @click="bindPickerChange">
                <div class="flex-row">
                    <text class="cellTitle">楼层高度:</text>
                    <text class="picker">{{level==0?'有电梯':level+'楼'}}</text>
                </div>
                <text :style="{fontFamily:'iconfont',transform:deg}" class="ico">&#xe630;</text>
            </div>
                <!-- 收货地址部分 -->
                <div class="subBox"></div>
            <div class="newAddre-item">
                <text class="cellTitle">用户姓名:</text>
                <div class="newAddre-right">
                    <input type="text" class="Input" placeholder="请输入收货人" v-model="consignee"/>
                </div>
            </div>

            <!-- 电话部分 -->
            <div class="newAddre-item" v-if="defaults == false">
                <text class="cellTitle">联系电话:</text>
                <div class="newAddre-right">
                    <input class="Input" type="tel" placeholder="收货人手机号" v-model='phone'/>
                </div>
            </div>
            <div class="newAddre-item" v-if="defaults == true">
                <text class="cellTitle">联系电话:</text>
                <div class="newAddre-right">
                    <text  class="fz32">{{phone}}</text>
                </div>
            </div>

            <div class="subBox"></div>
            <div class='newAddre-default'>
                <text class="cellTitle">是否默认</text>
                <!--                    <div class="chooseAddre-garden act">-->
                <!--                        <text class="iconFont chooseIcon" :style="{fontFamily:'iconfont'}" >&#xe64d;</text>-->
                <!--                    </div>-->
                <!--                    <text :style="{fontFamily:'iconfont',transform:deg}" class="ico">{{defaults?'&#xe64d;':'&#xe60a;'}}</text>-->
                <div class="flex-row">
                    <text class="fz32 mr10" @click='Return(true)'>是</text>
                    <div class="newAddre-default-yes" :class="[defaults? 'act':'newAddre-no']"  @click='Return(true)'></div>
                    <text class="fz32 mr10" @click='Return(false)'>否</text>
                    <div class="newAddre-default-no" :class="[!defaults? 'act':'newAddre-no']" @click='Return(false)'></div>
                </div>
            </div>

        </div>
            <!-- 信息部分结束 -->
            <div class="newAddre-save bkg-primary button-bkg-img" @click="saveReceiver">
                <text class="newAddre-saveText">保存</text>
            </div>
            <div class='newAddre-save bkg-primary button-bkg-img' @click="goback">
                <text class="newAddre-saveText">返回</text>
            </div>
    </div>
</template>
<style lang="less" src="../../../../../style/wx.less"/>
<style scoped>
    .box{
        background-color: #fff;
    }
    .subBox{
        width:750px;
        height: 20px;
        background-color: #eee;
    }
    .cellTitle{
        width: 150px;
        font-size: 32px;
    }
    .newAddre-right{
        padding-left: 30px;
        width:540px;
        display:flex;
        flex-direction: row;
        align-items: center;
    }
    .Input{
        font-size:32px;
        height: 80px;
        width: 500px;
    }
    .newAddre-item{
        width: 720px;
        height:90px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-left:30px;
        padding-right: 30px;
        border-bottom-width:1px;
        border-bottom-color:  #eee;
    }

    .ico{
        font-size: 32px;
        color: #999;
    }
    .newAddre-default{
        width: 720px;
        height:90px;
        margin-left:30px;
        padding-right: 30px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .newAddre-default-yes{
        width:30px;
        height:30px;
        border-radius:50%;
        margin-right: 30px;
    }
    .newAddre-default-no{
        width:30px;
        height:30px;
        border-radius:50%;
    }

    .newAddre-no{
        border-width:1px;
        border-color: #ccc;
        background-color: white;
    }
    /*保存返回按钮  */
    .newAddre-save{
        width: 690px;
        height: 100px;
        margin-top:30px;
        margin-left: 30px;
        margin-right: 30px;
        border-radius: 15px;
        align-items: center;
        justify-content: center;
    }
    .newAddre-saveText{
        color: white;
        font-size: 40px;
    }

    /* 楼层选择 */
    .picker{
        width: 500px;
        padding-left: 30px;
        font-size: 32px;
    }
    .chooseAddre-garden {
        width: 40px;
        height: 40px;
        border-radius:100%;
        margin-right: 5px;
        display: block;
        justify-content: center;
        align-items: center;
    }
    .chooseIcon{
        font-size: 26px;
        color: #fff;
    }
    .act {
        background-image:linear-gradient(to right, #f02711, #f4ae19);
    }
</style>
<script>

    import navbar from '../../../../../include/navbar.vue';
    import utils from '../../../../../assets/utils';
    import {dom, event, animation, storage} from '../../../../../weex.js';
    import {POST, GET, URIEncrypt} from '../../../../../assets/fetch';
    import filters from '../../../../../filters/filters.js';
    import noData from '../../../../../include/noData.vue';

    const modal = weex.requireModule('modal');
    const picker = weex.requireModule('picker');
    export default {
        data() {
            return {
                clicked:false,
                defaults:true,
                areaId:'',
                areaName:'小区,写字楼',
                consignee:"",
                address:'',
                phone:'',
                level: 0,
                latitude:0,
                longitude:0,
                array: ['有电梯', '1楼', '2楼', '3楼', '4楼', '5楼', '6楼', '7楼', '8楼', '9楼'],
                memberId:0,
                phoneBox:''
            }
        },
        props: {},
        components: {
            navbar, noData
        },
        filters: {},
        created() {
            utils.initIconFont();
            let _this = this;
            _this.memberId = utils.getUrlParameter('memberId');
            _this.areaName = utils.getUrlParameter("areaName");
            _this.address = utils.getUrlParameter("address");
            _this.areaId = utils.getUrlParameter("areaId");
            _this.latitude = utils.getUrlParameter("latitude");
            _this.longitude = utils.getUrlParameter("longitude");
           GET("weex/member/receiver/view.jhtml?id=0&memberId="+ _this.memberId, function (res) {
               if (res.type == 'success') {
                   _this.consignee = res.data.consignee;
                   _this.phone = res.data.phone;
                   _this.defaults = res.data.default;
                   _this.phoneBox = res.data.phone
               } else {
                   event.toast(res.content)
               }
           }, function (err) {
               event.toast(err.content)
           })
//            this.amapLinkTo();
//            app.event.on("amap-picker",this.onChange)
        },
        methods: {
            goback() {
                event.closeURL();
            },
            bindPickerChange: function (e) {
                var _this = this
                let arr = ["有电梯","1楼","2楼","3楼","4楼","5楼","6楼","7楼","8楼","9楼"]
                picker.pick({
                    title:'请选择楼层',
                    index:0,
                    items:arr,
                    confirmTitle:'确定',
                    cancelTitle:'取消'
                    },
                    function (ret) {
                      if (ret.result=='success') {
                          _this.level = ret.data
                      }
                    }
                )
            },

            // 选择是否默认地址
            Return: function (e) {
                var _this = this
                _this.defaults = e;
                if (_this.defaults == false && _this.phoneBox == ''){
                    modal.alert({
                        message: '无法设为默认',
                        duration: 0.3
                    },function (value) {

                    })
                    return
                }
                if(_this.defaults == true){
                    _this.phone = _this.phoneBox
                }else if(_this.defaults == false){
                    _this.phone = ''
                }
            },


            // 保存
            saveReceiver: function () {
                var _this = this;
                var flag = false;
                var warn = '';
                if (utils.isNull(this.consignee)){
                    warn = "请填写您的姓名！";
                } else if (utils.isNull(this.phone)) {
                    warn = "请填写您的手机号！";
                } else if (utils.isNull(this.areaName)) {
                    warn = "请选择您的所在区域";
                }else if (utils.isNull(this.address)) {
                    warn = "请输入您的详细地址";
                } else {
                    flag = true;
                    if (utils.isNull(this.latitude)) {
                        this.latitude = 0;
                    }
                    if (utils.isNull(this.longitude)) {
                        this.longitude = 0;
                    }
                }
                    if (flag == false) {
                        modal.alert({
                            message: warn,
                            duration: 0.3
                        },function (value) {

                        })
                        return;
                    }

                    let er = {
                        areaId: this.areaId,
                        address: this.address,
                        consignee: this.consignee,
                        phone: this.phone,
                        isDefault:false,
                        lat: this.latitude,
                        lng: this.longitude,
                        level: this.level,
                        memberId:this.memberId
                   }
                    POST('weex/member/receiver/add.jhtml?'+URIEncrypt(er), null).then(function (res) {
                        if (res.type == 'success') {
                            event.closeURL(res)
                        } else {
                            event.toast(res.content)
                        }
                    }, function (err) {
                        event.toast(err.content)
                    })

            },
            amapLinkTo:function(){
                var _this=this
                event.openURL(utils.locate("view/amap-picker/amap-picker.js"),function (e) {
                    if (e.type=='success') {
                        _this.areaId = e.data.areaId
                        _this.areaName = e.data.areaName
                        _this.address = e.data.building
                        _this.latitude = e.data.latitude
                        _this.longitude = e.data.longitude
                    }

                })
            }
        }
    }
</script>
