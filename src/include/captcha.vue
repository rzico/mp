

<template>
    <div class="captcha">
        <div class="mobile-header">
            <text class="mobile-title">{{title}}</text>
        </div>

        <div class="content">
            <text class="title">我们已向</text><text  class="number">13860431130</text><text class="title">发送验证码短信，请查看短信并输入验证码</text>
        </div>

        <!--<div class="input-panel">-->
            <!--:autofocus="isAuTo(index)"-->
            <!--<input v-for="(item,index) in inputList" class="input" type="tel"  placeholder="" @return = "onreturn" maxlength="1"  ref="numInput" @input="oninput" @focus="onfocus(index)" />-->
            <!--<input class="input" type="text" placeholder="" @input="oninput" ref="numInput2" @focus="onfocus(1)"/>-->
            <!--<input class="input" type="text" placeholder="" @input="oninput" ref="numInput" @focus="onfocus(2)"/>-->
            <!--<input class="input" type="text" placeholder="" @input="oninput" ref="numInput" @focus="onfocus(3)"/>-->
            <!--<input class="input" type="text" placeholder="" @input="oninput" ref="numInput" @focus="onfocus(4)"/>-->
            <!--<input class="input" type="text" placeholder="" @input="oninput" ref="numInput" @focus="onfocus(5)"/>-->
        <!--</div>-->

        <!--6个验证码框-->
        <div class="flex-row inputTextBox mtb50" @click="getFocus()">
            <div  v-for="item in textList" class="inputDiv" >
                <text class="inputText">{{item}}</text>
            </div>
        </div>
        <div class="flex-center">
            <text class="status primary">点击重新发送</text>
        </div>
        <!--隐藏的输入框-->
        <div>
            <input type="tel" ref="captchRef" v-model="captchaValue" maxlength="6" @input="captchaInput" autofocus="true" class="testInput" />
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>
    .mtb50{
        margin-top: 50px;
        margin-bottom: 60px;
    }
    .inputTextBox{
        width:630px;
    }
    .inputText{
        border-width: 1px;
        border-style: solid;
        border-color: #999;
        width: 80px;
        height:80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
    }
    .inputDiv{
        flex:1;
        align-items: center;
    }
    .testInput{
        opacity: 0;
        margin-top: 20px;
        background-color: red;
        height: 80px;
        width: 300px;
    }

    .captcha {
        padding-left: 40px;
        padding-right: 40px;
        flex-direction: column;
        align-items: center;
    }

    .number {
        font-size: 48px;
        color: #000;
        font-weight: 600;
    }
    .content {
        flex-wrap: wrap;
    }

    .mobile-title {
        font-size: 48px;
        color: #000;
        flex-wrap: wrap;
    }
    .mobile-header {
        margin-top: 150px;
        height:100px;
        background-color: #fff;
        flex-direction: column;
        align-items: center;
    }

    .input {
        height:80px;
        width:80px;
        font-size: 48px;
        color: #000;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
        border-bottom-style: solid;
        border-top-width: 1px;
        border-top-color: #ccc;
        border-top-style: solid;
        border-left-width: 1px;
        border-left-color: #ccc;
        border-left-style: solid;
        border-right-width: 1px;
        border-right-color: #ccc;
        border-right-style: solid;
    }
    .input-panel {
        width:600px;
        margin-left: 40px;
        margin-right: 40px;
        margin-top: 60px;
        height: 200px;
        flex-direction: row;
        background-color: #ffffff;
        justify-content:space-around;
    }

    .status {
        border-bottom-width:0px;
    }

</style>
<script>
    const modal = weex.requireModule('modal');
    var optionIndex = 0;
    var lastCaptchaLength = 0;
    export default {
        data:function(){
            return{
                captchaValue:'',
                textList:['','','','','',''],
                inputList:['','','','','','']
            }
        },
        props: {
            title: { default: "验证码" }
        },
        methods:{
//            当用户输入数字时触发
            captchaInput:function (event) {
//                判断删除还是输入  '大于' --> 删除
                if(lastCaptchaLength > event.value.length){
                    optionIndex --;
                    this.textList[optionIndex] = '';
                }else{
                    let a = event.value;
                    let b = a.substr(a.length-1,1)
                    console.log(event);
                    this.textList[optionIndex] = b;
                    optionIndex ++;
                }
                lastCaptchaLength = event.value.length;
//                当用户输完验证码后进行系统验证
                if(lastCaptchaLength == 6){
                    modal.toast({message:'开始验证',duration:0.5})
                }
            },
//            点击验证框时使隐藏的input获取焦点；
            getFocus:function () {
                this.$refs["captchRef"].focus();
            },


////            当input内容更改时触发。
//            oninput:function (event) {
//                console.log(event);
////                判断是否最后一个input
//                if(optionIndex != this.inputList.length - 1){
//                    if(event.value != ''){
////                     使焦点自动跳到下一个input
//                        this.$refs.numInput[optionIndex + 1] .focus();
//                    }
//                }
//            },
////            当元素获取焦点时，将当前元素的下标赋值给变量。方便oninput操作input
//            onfocus:function (index) {
//                optionIndex = index;
//            },
////            是否自动获取焦点。只有第一个input才设置自动获取
//            isAuTo:function(index){
//                if(index == 0){
//                    return true;
//                }else{
//                    return false;
//                }
//            },

        }
    }
</script>
