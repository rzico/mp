<template>
    <div class="noData" :style="{backgroundColor:ndBgColor,paddingBottom:pdNumber+'px'}">
                <text class="noData_ico" :style="{fontFamily:'iconfont'}">&#xe615;</text>
                <text class="noData_hint">{{noDataHint}}</text>
    </div>
 </template>
<style lang="less" src="../style/wx.less"/>

<style scoped>
    .noData {
        padding-top:250px;
        align-items: center;
    }
    .noData_ico {
        color:#ccc;
        font-size: 72px;
    }
    .noData_hint {
        color:#ccc;
        margin-top: 30px;
    }
</style>
<script>
    export default {
        props: {
            ndBgColor:{default:'#eee'},
            noDataHint:{default:'没有数据'},
            pdNumber:{default:200}
        }
    }
</script>