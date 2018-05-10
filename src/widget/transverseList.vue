<template>
    <div class="aboutUserBox bt10"  >
        <div class="ml20">
            <text class="title fz32">{{showTitle}}</text>
        </div>
        <scroller scroll-direction="horizontal" class="corpusScroll" show-scrollbar="false">
            <div  v-for="user in arrayList">
                <div class="aboutImgName" @click="goAuthor(user.id)">
                    <div  v-if="!user.loading"  class="aboutUserImg coverAbsoTop "></div>
                    <image class="aboutUserImg"  @load="onImageLoad(user)"  :src="user.logo"></image>
                    <text class="userName"  >{{user.nickName}}</text>
                </div>
            </div>
        </scroller>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style>
    /*<!--相关用户-->*/
    .aboutUserBox{
        /*width:750px;*/
        width:730px;
        padding-top: 30px;
        padding-bottom: 30px;
        background-color: #fff;
    }
    .aboutUserImg{
        width: 100px;height: 100px;border-radius: 50px;margin-top: 30px;margin-bottom: 20px;
    }
    .aboutImgName{
        width:130px;
        align-items: center;
        margin-left: 18px;
        margin-right: 18px;
    }
    .userName{
        lines:1;
        width:130px;
        text-align: center;
        text-overflow: ellipsis;
        font-size: 26px;
        line-height: 26px;
    }
    .corpusScroll{
        flex-direction: row;
        /*width: 730px;*/
        margin-left:20px;
        background-color: #fff;
        height:180px;
    }
    /*相关用户*/
</style>
<script>
    export default {
        data:function () {
            return{
                arrayList:this.userList,
                showTitle:this.title
            }
        },
        props:{
            userList:{default:[]},
            title:{default:''},
        },
        methods:{
            goAuthor(id){
                this.$emit('goAuthor',id);
            },
            //            封面加载出来
            onImageLoad(item){
                item.loading = true;
            },
        }

    }
</script>