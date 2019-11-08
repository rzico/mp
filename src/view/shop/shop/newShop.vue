<template>
    <div style="background-color: #eeeeee">
            <navbar :title="title"  @goback="goback"  > </navbar>
        <div class="head">
            <text class="one">① 新增  一</text>
            <text class="two">② 物料铺设  一</text>
            <text class="three">③ 打印设置  </text>
            <text class="four">④ 打印测试</text>
        </div>
        <scroller>
        <div class="appellation">
            <text class="vendorName">商家名称</text>
            <div style="flex-direction: row;align-items: center">
            <input type="text" placeholder="请输入商家名称" class="input" v-model="vendorName" />
            <text class="fontsIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
        </div>
        <div class="industry" @click="industry">
            <div class="left">
            <text class="belongIndustry">所属行业</text>
            </div>
            <div class="right">
            <text class="industryName">{{industryName}}</text>
                <text class="fontsIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
        </div>
        <div class="location" @click="location">
            <div class="left">
            <text class="businessLocation">所在地区</text>
            </div>
            <div class="right">
                <text class="generalLocation">{{addressName}}</text>
                <text class="fontsIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
        </div>
        <div class="appellation"  >
            <text class="detailedAddress">详细地址</text>
            <div class="flex-row">
            <input type="text" placeholder="请输入详细地址" class="addressInput"  v-model="detailedAddress"/>
            <text class="fontsIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
        </div>
        <div class="appellation">
            <text class="contactName">联系姓名</text>
            <div style="flex-direction: row;align-items: center">
            <input type="text" placeholder="请输入法人姓名" class="input" v-model="contactName" @change="" />
            <text class="fontsIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
        </div>
        <div class="appellation">
            <text class="contactNumber">联系电话</text>
            <div style="flex-direction: row;align-items: center">
            <input type="number" placeholder="请输入法人电话"  maxlength="11" class="input" v-model="contactNumber" />
            <text class="fontsIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
        </div>
        <div style="height: 750px"></div>
        </scroller>
        <div class="button bkg-primary button-bkg-img" @click="goComplete">
            <text class="buttonText">下一步</text>
        </div>

    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .changeGpsBox{
        flex-direction: row;
        align-items: center;
        justify-content:space-between;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        height: 200px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .changeAddress{
        width: 500px;
        font-size: 30px;
        color: #999;
    }
    .gpsBox{
        align-items: center;
        justify-content:center;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        height: 200px;
    }
    .gpsIcon{
        font-size: 80px;
        color: #999;
    }
    .changeBox{
        flex-direction: column;
        align-items: center;
    }
    .changeIcon{
        font-size: 60px;
        color: #999;
    }
    .changeText{
        font-size: 28px;
        color: #999;
    }
    .head{
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-bottom-color: #cccccc;
        border-bottom-width: 1px;
        height: 120px;
    }
    .one{
        font-size: 28px;
        color:deepskyblue;
    }
    .two{
        padding-left: 20px;
        font-size: 28px;
        color: #cccccc;
    }
    .three{
        padding-left: 20px;
        font-size: 28px;
        color: #cccccc;
    }
    .four{
        padding-left: 20px;
        font-size: 28px;
        color: #cccccc;
    }
    .right{
        flex-direction: row;
        align-items: center;
    }
    /*商家名称*/
    .appellation{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .vendorName{
        font-size: 32px;
    }
    .fontsIcon{
        font-size: 28px;
        color: #999;
    }
    /*所属行业*/
    .industry{
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        border-bottom-color: #ccc;
        border-bottom-width: 1px;
        height: 100px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .belongIndustry{
        font-size: 32px;
    }
    .industryName{
        font-size: 32px;
        color: #999;
    }
    /*商家区位*/
    .location{
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        border-bottom-color: #ccc;
        border-bottom-width: 1px;
        height: 100px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .businessLocation{
        font-size: 32px;
    }
    .generalLocation{
        font-size: 32px;
        color: #999;
    }
    /*详细地址*/
    .address{
        flex-direction: row;
        align-items: center;
        background-color: white;
        border-bottom-color: #ccc;
        border-bottom-width: 1px;
        height: 100px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .detailedAddress{
        font-size: 32px;
        line-height: 32px;
    }
    /*联系姓名*/
    .name{
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        margin-top: 50px;
        height: 100px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .contactName{
        font-size: 32px;
    }
    .contactNumber{
        font-size: 32px;
    }
    .input{
        padding-left: 100px;
        font-size: 32px;
        line-height: 32px;
        text-align: right;
        height: 100px;
        width: 500px;
        color: #999;
    }
    .addressInput{
        text-align: right;
        font-size: 32px;
        line-height: 32px;
        width: 500px;
        height: 100px;
        color: #999;
    }
    /*联系电话*/
    .call{
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        height: 100px;
        padding-left: 20px;
        padding-right: 20px;
    }
    /*下一步*/
    .button{
        margin-left:40px;
        margin-right:40px;
        height:82px;
        align-items:center;
        justify-content: center;
        border-radius:15px;
        position: absolute;
        bottom:30px;
        left: 0;
        right: 0;
    }
    .buttonText{
        font-size: 40px;
        color: white;
    }
</style>
<script>
    const storage = weex.requireModule('storage');
    var event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import { POST, GET } from '../../../assets/fetch'

    export default {
        data: function () {
          return{
//              商家名称
              vendorName:'',
//              联系人
              contactName:'',
//              联系电话
              contactNumber:'',
//              地址
              detailedAddress:'',
//              店铺id
              shopId:'',
//              营业执照
              licensePhoto:'',
//              场所照片
              palcePhoto:'',
//              门面照
              logo:'',
//              区位id
              areaId:'',
//              =========================================
//              具体地址
              addressName:'',
              hasChange:false,
              category:1,
              industryName:'',
              clicked:false,
//              经纬度
              lng:'',
              lat:''

          }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "第一步"},

        },
        created() {
            utils.initIconFont();
            this.shopId = utils.getUrlParameter('shopId');
            if(utils.isNull(this.shopId)) {
                this.shopId = ''
            }else {
                if(this.shopId == '#'){
                    this.shopId = ''
                }
                this.hasChange = true;
                this.modification();
            }
        },
        methods:{
            modification:function () {
                var _this = this;
                GET('weex/member/shop/view.jhtml?shopId='+_this.shopId,function (mes) {
                    if (mes.type == 'success') {
                        _this.shopId = mes.data.id;
                        _this.addressName = mes.data.areaName;
                        _this.licensePhoto = mes.data.license;
                        _this.logo = mes.data.thedoor;
                        _this.areaId = mes.data.areaId;
                        _this.palcePhoto = mes.data.scene;
                        _this.vendorName = mes.data.name;
                        _this.detailedAddress = mes.data.address;
                        _this.contactName = mes.data.linkman;
                        _this.contactNumber = mes.data.telephone
                        _this.category = mes.data.categoryId
                        _this.industryName = mes.data.categoryName

                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            goback:function () {
                event.closeURL()
            },
            industry:function () {
                var _this = this;
                event.openURL(utils.locate('widget/list.js?listId=' + this.category + '&type=category'), function (data) {
                    if(data.type == 'success' ) {
                        _this.category = parseInt(data.data.listId);
                        _this.industryName = data.data.listName;
                    }
                })
            },
            location:function () {
                var _this = this;
                event.openURL(utils.locate('view/amap-picker/amap-picker.js?title='+encodeURIComponent('选择地址')+'&isPolygon=false'), function (data) {
                    if(data.type == 'success' && data.data !='' ) {
                        _this.addressName = data.data.areaName;
                        _this.detailedAddress = data.data.building;
                        _this.areaId = data.data.areaId;
                        _this.lat = data.data.latitude;
                        _this.lng = data.data.longitude;
                    }
                })
            },
            goComplete:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this=this;
                if(utils.isNull(_this.vendorName)){
                    event.toast('商家名称未填写');
                    _this.clicked =false
                    return
                }else if(utils.isNull(_this.industryName)){
                    event.toast('所属行业未选择');
                    _this.clicked =false
                    return
                }else if(utils.isNull(_this.addressName)){
                    event.toast('商家区位未选择');
                    _this.clicked =false
                    return
                }else if(utils.isNull(_this.detailedAddress)){
                    event.toast('商家地址未填写');
                    _this.clicked =false
                    return
                }else if(utils.isNull(_this.contactName)){
                    event.toast('法人姓名未填写');
                    _this.clicked =false
                    return
                }else if(utils.isNull(_this.contactNumber)){
                    event.toast('法人电话未填写');
                    _this.clicked =false
                    return
                }else if(!/^[0-9]+$/.test(_this.contactNumber)){
                    event.toast('请填写正确法人电话');
                    _this.clicked =false
                    return
                }
                POST('weex/member/shop/submit.jhtml?id='+this.shopId +'&name=' +encodeURI(this.vendorName)+'&areaId='+this.areaId+'&address=' +encodeURI(this.detailedAddress)+'&license=' +this.licensePhoto+
                    '&scene=' +this.palcePhoto+'&thedoor=' +this.logo+'&linkman=' +encodeURI(this.contactName)+'&telephone=' +this.contactNumber+'&categoryId='+this.category+"&lng=" + _this.lng + "&lat=" +_this.lat).then(
                    function (mes) {
                        _this.clicked =false
                        if (mes.type == "success") {
                            _this.shopId = mes.data.id;
                            let  elevendata = {
                                addressName: _this.addressName,
                                licensePhoto: _this.licensePhoto,
                                logo: _this.logo,
                                palcePhoto: _this.palcePhoto,
                                name : _this.vendorName,
                                id:_this.shopId,
                                areaId :_this.areaId,
                                address:_this.detailedAddress,
                                inkman:_this.contactName,
                                telephone:_this.contactNumber,
                                categoryId:_this.category,
                                categoryName:_this.industryName,
                            };
                            elevendata = JSON.stringify(elevendata);
                            storage.setItem('elevennumber', elevendata,e=> {
                                event.openURL(utils.locate('view/shop/shop/materialLaying.js?name=elevennumber'), function (message) {
                                    _this.clicked =false;
                                    if (message.type == "success") {
                                        event.closeURL(message);
                                    }
                                })
                            })
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast("网络不稳定");
                        _this.clicked =false
                    }
                )
    }
        }
    }
</script>
