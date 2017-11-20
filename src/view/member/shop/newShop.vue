<template>
    <div style="background-color: #eeeeee">
        <div class="header">
            <navbar :title="title"  @goback="goback"  > </navbar>
        </div>
        <div class="head">
            <text class="one">① 新增  一</text>
            <text class="two">② 物料铺设  一</text>
            <text class="three">③ 激活  一</text>
            <text class="four">④ 交易测试</text>
        </div>
        <div class="appellation">
            <text class="vendorName">商家名称</text>
            <input type="text" placeholder="请输入商家名称" class="input" @change="" @input=""/>
        </div>
        <div class="industry">
            <div class="left">
            <text class="belongIndustry">所属行业</text>
            </div>
            <div class="right">
            <text class="industryName"> 1 </text>
                <text class="fontsIcon">&#xe630;</text>
            </div>
        </div>
        <div class="location">
            <div class="left">
            <text class="businessLocation">商家区位</text>
            </div>
            <div class="right">
                <text class="generalLocation"> 1 </text>
                <text class="fontsIcon">&#xe630;</text>
            </div>
        </div>
        <div class="address">
            <div class="left">
            <text class="detailedAddress">详细地址</text>
            </div>
            <div class="right">
                <text class="specificAddress"> 1 </text>
                <text class="fontsIcon">&#xe630;</text>
            </div>
        </div>
        <div class="name">
            <text class="contactName">联系姓名</text>
            <input type="text" placeholder="请输入联系姓名" class="input" @change="" @input=""/>
        </div>
        <div class="call">
            <text class="contactNumber">联系电话</text>
            <input type="number" placeholder="请输入联系电话" class="input" @change="" @input=""/>
        </div>
        <div class="button">
            <text class="buttonText">下一步</text>
        </div>
    </div>
</template>
<style>
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
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        padding-left: 20px;
        padding-right: 20px;
        height: 100px;
    }
    .vendorName{
        font-size: 32px;
    }
    .fontsIcon{
        font-size: 32px;
        color: #cccccc;
    }
    /*所属行业*/
    .industry{
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        border-bottom-color: #ccc;
        border-bottom-width: 1px;
        padding-left: 20px;
        padding-right: 20px;
        height: 100px;
    }
    .belongIndustry{
        font-size: 32px;
    }
    .industryName{
        font-size: 28px;
        color: #cccccc;
    }
    /*商家区位*/
    .location{
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        border-bottom-color: #ccc;
        border-bottom-width: 1px;
        padding-left: 20px;
        padding-right: 20px;
        height: 100px;
    }
    .businessLocation{
        font-size: 32px;
    }
    .generalLocation{
        font-size: 28px;
        color: #cccccc;
    }
    /*详细地址*/
    .address{
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        border-bottom-color: #ccc;
        border-bottom-width: 1px;
        padding-left: 20px;
        padding-right: 20px;
        height: 100px;
    }
    .detailedAddress{
        font-size: 32px;
    }
    .specificAddress{
        font-size: 28px;
        color: #cccccc;
    }
    /*联系姓名*/
    .name{
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: 50px;
        height: 100px;
    }
    .contactName{
        font-size: 32px;
    }
    .input{
        padding-left: 100px;
        font-size: 28px;
        height: 32px;
        width: 500px;
    }
    /*联系电话*/
    .call{
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
        background-color: white;
        padding-left: 20px;
        padding-right: 20px;
        height: 100px;
    }
    /*下一步*/
    .button{
        background-color:#D9141E;
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
    import navbar from '../../../include/navbar.vue';
    export default {
        components: {
            navbar
        },
        props: {
            title: {default: "第一步"},

        },
    }
</script>