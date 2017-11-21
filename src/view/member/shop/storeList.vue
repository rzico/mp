<template>
    <div style="background-color: #eeeeee">
        <div class="head">
            <text class="clickAdd">+点击添加商铺</text>
        </div>
        <div class="shops">
            <div class="shopLogo" >
                <image style="width: 250px;height: 200px;"  class="img" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>
            </div>
            <div class="shopInformation">
                <div class="shopNameDiv">
                <text class="shopName">店铺名：</text>
                <text class="fullName">111</text>
                </div>
                <div class="shopAddressDiv">
                <text class="shopAddress">地址：</text>
                <text class="concretely">11111111111111111111111111</text>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .head {
        background-color: white;
        border-width: 0px;
        margin-bottom: 20px;
        height: 80px;
        align-items: center;
        justify-content: center;

    }
    .clickAdd{
        font-size: 40px;
    }
    .shops{
        background-color: white;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        height: 230px;
        background-color: white;
    }
    .shopLogo{
        margin-left: 20px;
    }
    .shopInformation{
        /*justify-content: space-between;*/
        height: 230px;
        margin-left: 20px;
    }
    .shopName{
        font-weight: bold;
        font-size: 28px;
    }
    .shopAddress{
        font-weight: bold;
        font-size: 28px;
    }
    .shopNameDiv{
        flex-direction: row;
        margin-top: 20px;
    }
    .shopAddressDiv{
        flex-direction: row;
        margin-top: 30px;
    }
    .concretely{
        width: 350px;
    }
</style>