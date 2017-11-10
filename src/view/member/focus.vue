<template>
    <scroller style="background-color: #fff">
        <navbar :title="title" @goback="goback" > </navbar>
        <div class="addFriendsBorder" v-for="item in userList" @click="goAuthor()">
            <div class="friendsLine" >
                <image :src="item.logo" class="friendsImage"></image>
                <div class="friendsName">
                    <text class="lineTitle ">{{item.nickName}}</text>
                    <text class="realName">{{item.sign}}</text>
                </div>
            </div>
            <div class="status_panel" @click="doCancel()">
                <text class="ask " v-if="item.status == 'adopt'" >已关注</text>
                <text class="ask  "v-else>互相关注</text>
            </div>
        </div>
    </scroller>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .friendsImage{
        margin-top: 20px ;
        height: 100px;
        width:100px;
        border-radius: 50px;
    }
    .realName{
        color: #888;
        font-size: 26px;
        margin-left: 20px;
        lines:1;
        text-overflow: ellipsis;
        max-width: 400px;
    }
    .friendsName{
        height:110px;
        margin-top: 15px;
        justify-content: space-around;
    }
    .addFriendsBorder{
        border-bottom-width: 1px;
        border-style: solid;
        border-color: rgba(153,153,153,0.2);
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        margin-left: 30px;
    }
    .friendsLine{
        height:140px;
        background-color: #fff;
        flex-direction: row;
        flex:5;
    }
    .lineTitle{
        font-size: 34px;
        margin-left: 20px;
        lines:1;
        text-overflow: ellipsis;
        max-width: 400px;
    }
    .status_panel {
        flex-direction: column;
        align-items: center;
        flex:1.5;
        padding-right: 20px;
    }

    .ask {
        font-size: 26px;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius:10px;
        width: 125px;
        color:#ccc;
        border-color: #ccc;
        border-style: solid;
        border-width: 1px;
    }
</style>
<script>
    import navbar from '../../include/navbar.vue';
    const event = weex.requireModule('event');
    const modal = weex.requireModule('modal');
    export default {
        components: {
            navbar
        },
        props:{
            title:{default:'我的关注'}
        },
        data(){
            return{
                userList:[{
                    logo:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510323330650&di=fccf178eef10385316c8ab3602f76520&imgtype=0&src=http%3A%2F%2Fpic66.nipic.com%2Ffile%2F20150504%2F5624330_144129291000_2.jpg',
                    nickName:'独自听风',
                    sign:'春夏秋冬，读书喝茶，只闻花香，羡慕煞人',
                    id:3,
                    status:'adopt'
                },{
                    logo:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510323202682&di=b6fdee68edcf56c0aaab3cba73e441dc&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F3801213fb80e7beca9004ec5252eb9389b506b38.jpg',
                    nickName:'素心',
                    sign:'"一花一世纪，遗影一乾坤"',
                    id:3,
                    status:'adoptt'
                }]
            }
        },
        methods:{
            goback(){
                event.closeURL();
            },
//            前往作者主页
            goAuthor(){
                event.toast('作者主页');
            },
//            取消关注
            doCancel(){
                modal.confirm({
                    message: '确定要取消关注?',
                    okTitle:'确定',
                    cancelTitle:'取消',
                    duration: 0.3
                }, function (value) {
                    if(value == '确定'){
                        //    将内容删掉
                        event.toast('取消成功');
                    }
                })
            }

        }
    }
</script>