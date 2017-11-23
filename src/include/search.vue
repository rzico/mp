<template>
    <div class="search">
        <div class="search_box" @click="gosearch()">
            <!--使搜索的字眼可以居中-->
            <div class="scan flex-end flex1" ></div>
            <div class="flex-center flex5">
                <text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe611;</text>
                <text class="sub_title">{{keyword}}</text>
            </div>
            <div class="scan flex-end flex1" @click="scan">
                <text class="ico_small gray" :style="{fontFamily:'iconfont'}" >&#xe607;</text>
            </div>
         </div>
    </div>
 </template>
<style lang="less" src="../style/wx.less"/>

<style scoped>
    .search {
        background-color:#eee;
        height:100px;
    }
    .search_box {
        margin-top:20px;
        margin-left:20px;
        margin-right:20px;
        margin-bottom:20px;
        height: 60px;
        border-width: 1px;
        border-color: #ccc;
        border-style: solid;
        border-radius:8px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: white;
    }
    .scan {
        padding-right: 20px;
        height: 60px;
        align-items: center;
    }

</style>
<script>
    export default {
        props: {
            keyword:{default:'搜索'}
        },
        methods: {
           gosearch:function (e) {
                this.$emit('gosearch');
            },
            scan:function () {
                this.$emit('scan');
            }
        }
    }
</script>