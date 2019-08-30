<template>
    <div class="noData" :style="{paddingBottom:pdNumber+'px',paddingTop:ptNumber+'px'}">
                <text class="noData_ico" :style="{fontFamily:'iconfont'}">&#xe615;</text>
                <text class="noData_hint">{{noDataHint}}</text>
    </div>
 </template>
<style lang="less" src="../style/wx.less"/>

<style scoped>
    .noData {
        align-items: center;
    }
    .noData_ico {
        color:#ccc;
        font-size: 72px;
    }
    .noData_hint {
        font-size: 32px;
        color:#ccc;
        margin-top: 30px;
    }
</style>
<script>
    export default {
        props: {
            noDataHint:{default:'没有数据'},
            pdNumber:{default:200},
            ptNumber:{default:250}
        }
    }
</script>