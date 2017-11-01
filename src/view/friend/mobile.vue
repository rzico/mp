<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" > </navbar>
        <!--输入栏-->
        <searchNav :searchHint="searchHint" @oninput="oninput" @search="search" :showCancel="showCancel"  :hNum="hNum" :ptNum="ptNum" ref="childFind"> </searchNav>
        <!--无数据提示-->
        <noData :noDataHint="noDataHint" v-if="isEmpty()"></noData>
        <list class="list" v-if="isNoEmpty()">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image class="gif" resize="cover"
                       src="file://resources/images/loading.gif"></image>
                <text class="indicator">{{refreshState}}</text>
            </refresh>
            <cell v-for="(friend,index) in sortList" >
                <!--姓氏首字母-->
                <div class="letterBox" v-if="isRepeat(index)">
                    <text class="nameLetter">{{friend.name | watchLetter}}</text>
                </div>
                <!--姓氏里每个人的名子-->
                <div class="addFriendsBorder">
                    <div class="friendsLine" @click="jump()">
                        <image :src="friend.logo | watchlogo" class="friendsImage"></image>
                        <div class="friendsName">
                            <text class="lineTitle lines-ellipsis">{{friend.name}}</text>
                            <text class="realName">魔篇:{{friend.nickName | watchNickNmae}}</text>
                        </div>
                    </div>
                    <div class="status_panel">
                        <text class="ask green"  v-if="isAsk(friend.status)" @click="adopt(friend.id)">添加</text>
                        <text class="adopt " v-if="isAdopt(friend.status)">已添加</text>
                        <text class="ask bkg-primary" v-if="isInvite(friend.status)" @click="invite(friend.number)">邀请</text>
                    </div>
                </div>
            </cell>
            <!--<cell v-for="(friend,index) in sortList" v-else>-->
                <!--<div v-if="findFriend()">-->
                    <!--&lt;!&ndash;姓氏首字母&ndash;&gt;-->
                    <!--<div class="letterBox" v-if="isRepeat(index)">-->
                        <!--<text class="nameLetter">{{friend.name | watchLetter}}</text>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;姓氏里每个人的名子&ndash;&gt;-->
                    <!--<div class="addFriendsBorder">-->
                        <!--<div class="friendsLine" @click="jump()">-->
                            <!--<image :src="friend.logo | watchlogo" class="friendsImage"></image>-->
                            <!--<div class="friendsName">-->
                                <!--<text class="lineTitle lines-ellipsis">{{friend.name}}</text>-->
                                <!--<text class="realName">魔篇:{{friend.number | watchNickNmae}}</text>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="status_panel">-->
                            <!--<text class="ask bkg-primary" v-if="isAsk(friend.status)"  @click="adopt(friend.id)">添加</text>-->
                            <!--<text class="adopt " v-if="isAdopt(friend.status)">已添加</text>-->
                            <!--<text class="ask bkg-primary" v-if="isInvite(friend.status)" @click="invite(friend.number)">邀请</text>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</cell>-->
            <!--<cell v-for="(friend,index) in friendsList" v-else>-->
            <!--<div v-if="findFriend(index)">-->
            <!--&lt;!&ndash;姓氏首字母&ndash;&gt;-->
            <!--<div class="letterBox" v-if="isRepeat(index)">-->
            <!--<text class="nameLetter">{{friend.name | watchLetter}}</text>-->
            <!--</div>-->
            <!--&lt;!&ndash;姓氏里每个人的名子&ndash;&gt;-->
            <!--<div class="addFriendsBorder">-->
            <!--<div class="friendsLine" @click="jump()">-->
            <!--<image :src="friend.logo" class="friendsImage"></image>-->
            <!--<div class="friendsName">-->
            <!--<text class="lineTitle lines-ellipsis">手机通讯录名字1 {{friend.name}}</text>-->
            <!--<text class="realName">魔篇:{{friend.nickName | watchNickNmae}}</text>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="status_panel">-->
            <!--<text class="ask bkg-primary" v-if="isAsk(friend.status)" @click="adopt(friend.id)">添加</text>-->
            <!--<text class="adopt " v-if="isAdopt(friend.status)">已添加</text>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</cell>-->
            <loading class="loading" @loading="onloading" :display="showLoading ? 'show' : 'hide'">
                <image class="gif" resize="cover"
                       src="file://resources/images/loading.gif"></image>
                <text class="indicator">{{loadingState}}</text>
            </loading>
        </list>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    .green{
        background-color: #19A317;
    }
    .list {
        background-color: white;
    }
    .addFriend {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 50px;
        padding-right: 30px;
        padding-top: 30px;
        padding-bottom: 30px;
        background-color: white;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #ccc;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #ccc;
    }
    .friendsName{
        height:90px;
        margin-top: 15px;
        justify-content: space-between;
    }
    .letterBox{
        width:750px;
        padding-left: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: #e8e8e8;
    }
    .nameLetter{
        color: #888;
        font-size: 24px;
    }
    .realName{
        color: #888;
        font-size: 30px;
        margin-left: 20px;
    }
    .friendsImage{
        margin-top: 20px ;
        height: 80px;
        width:80px;
    }
    .addFriendsBorder{
        border-bottom-width: 1px;
        border-style: solid;
        border-color: rgba(153,153,153,0.2);
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
    }
    .friendsLine{
        padding-left: 30px;
        height:120px;
        background-color: #fff;
        flex-direction: row;
        flex:5;
    }
    .lineTitle{
        font-size: 34px;
        margin-left: 20px;
    }
    .status_panel {
        flex-direction: column;
        align-items: center;
        flex:1;
        padding-right: 20px;
    }
    .adopt {
        font-size: 27px;
        text-align: center;
        color:#ccc;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color:white;
        border-radius:6px;
    }

    .ask {
        font-size: 27px;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius:6px;
        width: 100px;
        color:white;
    }
</style>
<script>
    const event = weex.requireModule('event');
    import navbar from '../../include/navbar.vue';
    import { POST, GET } from '../../assets/fetch';
    import searchNav from '../../include/searchNav.vue';
    import noData from '../../include/noData.vue';
    import utils from '../../assets/utils';
    import {getLetter,dictFirstLetter} from '../../assets/letter';
    export default {
        components: {
            searchNav,noData,navbar
        },
        data() {
            return {
                refreshing:false,
                showLoading:false,
//                keyword:"",
//                startList:true,
                loadingState:'',
                showLoading:'hide',
                friendsList:[],
                initList:[],
                allLetter:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'],
                numberList:'',
                dataNum:0,
                currentNum:0,
                pageNum:20,
            }
        },
        props: {
            title: { default: "手机联系人"},
            noDataHint: { default: "无手机联系人" },
            showCancel:{default:false},
            ptNum:{default:0},
            hNum:{default:96}
        },
        computed:{
//            计算属性
            sortList:function() {
                return this.friendsList.sort(this.sortLetter);
            }
        },
        filters:{
//            获取名字首字母
            watchLetter:function (value) {
                return getLetter.getFirstLetter(value.substring(0,1));
            },
//            判断在软件上是否有头像
            watchlogo:function (value) {
                if(utils.isNull(value)){
                    return utils.locate('resources/images/background.jpg');
                }else{
                    return value;
                }
            },
//            过滤在用户在软件mp上的昵称
            watchNickNmae:function (value) {
                if(utils.isNull(value)){
                    return '暂无';
                }else{
                    return value;
                }
            }
        },
        created() {
            utils.initIconFont();
//            调用通讯录
            this.mailFriend();
        },
        methods:{
//             获取通讯录好友
            mailFriend(){
                var _this = this;
                _this.numberList='';
                _this.dataNum = 0;
//            this.onrefresh();
                let option = {
                    current:_this.currentNum,
                    pageSize:_this.pageNum
                }
                event.getContactList(option,function (data) {
//                    判断data.data有没有数据
                    if(utils.isNull(data.data)){
                        event.toast('没有更多联系人了!');
                    }
                    data.data.forEach(function (item,index) {
                        let option={
                            type:'friend',
                            key:item.numberMd5
                        };
//                    判断用户是否是好友
                        event.find(option,function (_weex) {
                            if(_weex.type == 'success' && _weex.data != ''){
                                item = _weex.data;
                                item.status = 'adopt';
                            }else{
                                _this.numberList = _this.numberList + item.number + ',';
                                item.status = 'unused';
                            }
//                            if(_weex.type == 'notfind' && _weex.content == '没有数据'){
//                                _this.numberList = _this.numberList + item.number + ',';
//                                item.status = 'unused';
//                            }else{
//                                event.toast(_weex);
//                                item = _weex.data;
//                                item.status = 'adopt';
//                            };
                            _this.dataNum ++;
                            if(_this.dataNum == data.data.length){

                                _this.useSoft(data);
                            }
                        });
                    });
                });
            },


//            判断是否用户有用软件
            useSoft(data){

                var _this = this;
                var timestamp = Math.round(new Date().getTime()/1000);
                GET('weex/member/friends/search.jhtml?keyword=' + _this.numberList,function (message) {
                        if(message.type == 'success' && message.data != ''){
                            _this.currentNum = _this.currentNum + _this.pageNum;
                            message.data.forEach(function (item) {
                                for(let i = 0;i<data.data.length - 1;i++){
                                    if(item.md5 == data.data[i].numberMd5){
                                        data.data[i].logo = item.logo;
                                        data.data[i].id = item.id;
                                        data.data[i].nickName = item.nickName;
                                        data.data[i].status = 'ask';
                                        continue;
                                    };
                                };
                            });
                            data.data.forEach(function (contactItem) {
                                let option = {
                                    type:'contact',
                                    key:contactItem.numberMd5,
                                    value:contactItem,
                                    keyword:','+ contactItem.name + ',' + contactItem.nickName + ',',
                                    sort:  getLetter.getFirstLetter(contactItem.name.substring(0,1)) + ',' + timestamp
                                }
//                                将数据缓存起来，用于搜索时的模糊查询
                                event.save(option,function (message) {})
                            })
                            data.data.forEach(function (mailPeople) {
                                _this.friendsList.push(mailPeople);
//                            把数据存起来
                                _this.initList.push(mailPeople);
                            })
                        }else if(message.type == 'success' && message.data == '' ){//如果通讯录里没有人使用该软件，则直接放入数组
                            _this.currentNum = _this.currentNum + _this.pageNum;
                            data.data.forEach(function (mailPeople) {
                                _this.friendsList.push(mailPeople);
//                            把数据存起来
                                _this.initList.push(mailPeople);
                            })
                        }
                        else{
                            event.toast(message.content);
                        }
                    },function (err) {
                        event.toast(err)
                    });
            },

//            根据字母排序
            sortLetter:function (a,b) {
                var _this = this;
//                分别获取昵称中的首字母
                a = getLetter.getFirstLetter(a.name.substring(0,1));
                b = getLetter.getFirstLetter(b.name.substring(0,1));
//                    遍历字母表获取下标进行比较大小。
                _this.allLetter.forEach(function (item,index) {
                    if(a == item){
                        a = index;
                    }
                    if(b == item){
                        b = index;
                    }
                })
//            返回排序结果
                return (a - b)
            },
            goback(){
                event.closeURL();
            },
            oninput:function (val) {
                var _this = this;
//                this.keyword = val;
                if(val.length == 0){
                    _this.friendsList = [];
                    _this.friendsList = _this.initList;
                }else{
                    let option = {
                        type:'contact',//类型
                        keyword:val,//关键址
                        orderBy:'desc',//"desc"降序 ,"asc"升序
                        current:0, //当前有几页
                        pageSize:_this.currentNum //一页显示几行
                    }
                    event.findList(option,function (message) {
                        if(message.type == 'success' && message.data != ''){
                            _this.friendsList = [];
                            message.data.forEach(function (item) {
                                 item.value = JSON.parse(item.value);
                                _this.friendsList.push(item.value);
                            })
                        }else{
                            _this.friendsList = [];
                        }
                    })
                }
            },
            search:function () {

            },
            isEmpty:function () {
                return this.friendsList.length==0;
            },
            isNoEmpty:function () {
                return this.friendsList.length!=0;
            },
            isAsk:function (value) {
                if (value=="ask") {
                    return true;
                } else {
                    return false;
                }
            },
            isAdopt:function (value) {
                if (value=="adopt") {
                    return true;
                } else {
                    return false;
                }
            },
            isInvite:function (value) {
                if(value == "unused"){
                    return true;
                }else {
                    return false;
                }
            },
            onrefresh:function () {
                var _this = this;
                this.refreshing = true
                setTimeout(() => {
                    this.refreshing = false
                }, 50)

//                GET('weex/member/friends/list.jhtml?pageSize=20&pageStart=0', function(data) {
//                        if (data.type == "success") {
//                            let page = data.data;
//                            _this.friendsList = page.data;
//                            _this.start = page.start+page.data.length;
//                            _this.refreshState = "数据刷新完成";
//                            setTimeout(() => {
//                                _this.refreshing = false;
//                                _this.refreshState = "松开刷新数据";
//                            }, 500);
//                        } else {
//                            _this.refreshing = false;
//                            _this.refreshState = "松开刷新数据";
//                            event.toast(data.content);
//                        }
//                    },function (err) {
//                        _this.refreshing = false;
//                        _this.refreshState = "松开刷新数据";
//                        event.toast("网络不稳定");
//                    }
//                )
            },
            onloading:function () {
                var _this = this;
                _this.showLoading = true;
                _this.loadingState = "正在加载数据";
                setTimeout(() => {
                    _this.mailFriend();
                    _this.showLoading = false;
                }, 1500)

//                GET('weex/member/friends/list.jhtml?pageSize=20&pageStart='+_this.start,
//                    function (data) {
//                        if (data.type == "success") {
//                            let page = data.data;
//                            if (page.data.length>0) {
//                                _this.friendsList.push(page.data);
//                                _this.start = page.start+page.data.length;
//                                _this.loadingState = "加载"+page.data.length+"条数据";
//                            } else {
//                                _this.loadingState = "亲，没有数据了";
//                            }
//                            setTimeout(() => {
//                                _this.showLoading = false;
//                                _this.loadingState = "松开加载更多";
//                            }, 500);
//                        } else {
//                            _this.showLoading = false;
//                            _this.loadingState = "松开加载更多";
//                            event.toast(weex.data.content);
//                        }
//                    },function (err) {
//                        _this.showLoading = false;
//                        _this.loadingState = "松开加载更多";
//                        event.toast("网络不稳定");
//                    }
//                )
            },
            //同意添加好友
            adopt:function (id) {
                POST('weex/member/friends/adopt.jhtml?friendId='+id).then(
                    function (data) {
                        if (data.type == "success") {
                            event.toast(data.content);
                            _this.onrefresh();
                        } else {
                            event.toast(data.content);
                        }
                    },function(err) {
                        event.showToast("网络不稳定");
                    }
                )
            },
            //判断名字是否重复
            isRepeat:function(index){
                var _this = this;
                if(index != 0){
                    if (getLetter.getFirstLetter(_this.friendsList[index].name.substring(0,1)) == getLetter.getFirstLetter(_this.friendsList[index - 1].name.substring(0,1))) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            },
            jump(){

            },
            invite(number){
                event.toast('已向该联系人发送邀请短信' + number);
            }
        }
    }
</script>