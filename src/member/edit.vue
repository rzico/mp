<template>
    <div>
        <image style="width: 560px;height: 560px;" :src="imageSrc"></image>
        <text>{{sss}}</text>
    </div>
</template>
<style scoped>

</style>

<script>
    const album = weex.requireModule('albumModule');
    const native = weex.requireModule('wxNativeModule');
    export default {
        data:function() {
            return{
                imageSrc:'https://www.baidu.com/img/bd_logo1.png',
                sss:'aaa'
            }
        },
        computed: {
        },
        created:function(){
            var _this = this;
            album.openAlbumMuti(function (data) {
                native.showToast(data[0].photoPath);
                _this.imageSrc = data[0].photoPath;
                _this.sss = data[0].photoPath;
            });
        },
        methods: {

        }
    }
</script>
