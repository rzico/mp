<template>
    <div style="background-color: white">
        <!--<div class="header">-->
        <!--<navbar :title="title"  @goback="goback"  > </navbar>-->
        <!--</div>-->
        <div class="head">
            <text class="one">① 新增  一</text>
            <text class="two">② 物料铺设  一</text>
            <text class="three">③ 激活  一</text>
            <text class="four">④ 交易测试</text>
        </div>
        <scroller class="scroller">
        <div class="material">
            <text class="materialText">铺设基础物料</text>
        </div>
        <div class="facade">
            <text class="number">①</text>
            <text class="facadeText">拍摄门头照</text>
        </div>
        <div class="iconfontOne">
            <div class="image">
                <image style="width: 200px;height: 200px;"  class="img" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>
            </div>
            <div class="iconfont">
                <text class="plusSign">&#xe618;</text>
            </div>
        </div>
        <div class="place">
            <text class="number">②</text>
            <text class="placeText">拍摄经营场所照</text>
        </div>
        <div class="iconfontTwo">
            <div class="image">
                <image style="width: 200px;height: 200px;"  class="img" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>
            </div>
            <div class="iconfont">
                <text class="plusSign">&#xe618;</text>
            </div>
        </div>
        <div class="license">
            <text class="number">③</text>
            <text class="licenseText">拍摄营业执照</text>
        </div>
        <div class="iconfontThree">
            <div class="image">
                <image style="width: 200px;height: 200px;"  class="img" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>
            </div>
            <div class="iconfont">
                <text class="plusSign">&#xe618;</text>
            </div>
        </div>
        <div class="button">
            <text class="buttonText">下一步</text>
        </div>
        </scroller>
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
        color: deepskyblue;
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
    /*铺设基础物料*/
    .material{
        border-width:0px;
        padding-top: 40px;
        padding-bottom: 40px;
        padding-left: 30px;
    }
    .materialText{
        font-size: 32px;
        font-weight: bold;
    }
    /*门头照*/
    .facade{
        flex-direction: row;
        align-items: center;
        border-width: 0px;
        padding-left: 30px;
        margin-bottom: 10px;
    }
    .number{
        font-size: 40px;
        color: #cccccc;
    }
    .facadeText{
        font-size: 28px;
        padding-left: 20px;
    }
    .iconfontOne{
        flex-direction: row;
        align-items: center;
        border-left-width: 2px;
        border-left-color: #cccccc;
        margin-left: 50px;
        margin-bottom: 20px;
        height: 250px;
    }
    .image{
        border-radius:150px;
        margin-left: 40px;
    }
    .img{
        border-radius:150px;
    }
    .iconfont{
        width: 200px;
        height: 200px;
        border-width: 5px;
        border-radius:10px;
        margin-left: 30px;
        align-items: center;
        justify-content: center;
    }
    .plusSign{
        font-size: 200px;
    }
    /*经营场所*/
    .place{
        flex-direction: row;
        align-items: center;
        border-width: 0px;
        padding-left: 30px;
        margin-bottom: 10px;
    }
    .placeText{
        font-size: 28px;
        padding-left: 20px;
    }
    .iconfontTwo{
        flex-direction: row;
        align-items: center;
        border-left-width: 2px;
        border-left-color: #cccccc;
        margin-left: 50px;
        margin-bottom: 20px;
        height: 250px;
    }
    /*营业执照*/
    .license{
        flex-direction: row;
        align-items: center;
        border-width: 0px;
        padding-left: 30px;
        margin-bottom: 10px;
    }
    .licenseText{
        font-size: 28px;
        padding-left: 20px;
    }
    .iconfontThree{
        flex-direction: row;
        align-items: center;
        margin-left: 50px;
        height: 250px;
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
        margin-top: 30px;
        bottom:30px;
    }
    .buttonText{
        font-size: 40px;
        color: white;
    }
</style>