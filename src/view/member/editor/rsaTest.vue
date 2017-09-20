<template>
    <div style="margin-left: 80px;margin-top: 80px">
        <text @click="getPublicKey()" style="margin-top: 40px;margin-left: 40px;">click Me</text>
        <text @click="getStorage()" style="margin-top: 140px;margin-left: 40px;">getStorage</text>
        <text @click="removeStorage()" style="margin-top: 140px;margin-left: 40px;">removeStorage</text>
    </div>
</template>

<style>

</style>

<script>

    const storage = weex.requireModule('storage')
    const modal = weex.requireModule('modal')
    const stream = weex.requireModule('stream')
//    import JsEncrypt from 'jsencrypt/bin/jsencrypt'
//    Vue.prototype.$jsEncrypt = JsEncrypt
    export default {
        data:function () {
            return{

            }
        },
        created(){
//            let jse = new this.$jsEncrypt.JSEncrypt();
//            设置公钥
//            jse.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8ygMKjJLSUpnfXqt8lRSAdDxAHWKi9GbTFkCbAjkRCR6VUakxxXLXHQUtPCizKcvNpuYqZ5bO8LEgpY7SL3JEdEI9OuMnZ6ToeHPfcHeS+EgN0oYmdQ49RB5wZkcBEFk80OBEAM6VhnE0IuHGkU5ko9oPHq3boEQ3Ej6r3T+UhQIDAQAB');
//            let encrypted = jse.encrypt('Hello, world');
//            console.log('===');
//            console.log(encrypted);
//            设置秘钥
//            jse.setPrivateKey('MIICXgIBAAKBgQC8ygMKjJLSUpnfXqt8lRSAdDxAHWKi9GbTFkCbAjkRCR6VUakxxXLXHQUtPCizKcvNpuYqZ5bO8LEgpY7SL3JEdEI9OuMnZ6ToeHPfcHeS+EgN0oYmdQ49RB5wZkcBEFk80OBEAM6VhnE0IuHGkU5ko9oPHq3boEQ3Ej6r3T+UhQIDAQABAoGBAIO8JwEedHlE4FBovBsT4Bl+gmhu2NxC1NlpBq3jkDSd+3RQZlLvp6IJgwo8l13lxWv8kVF3tVkzxTW1sQJjz0RYShH8vXLl94gf6mFkJbeOPP6uA0mGDG81yINwKUpE0RM6ZM9yKEeVdK3u67TkEBcC6Td5KBl8Yof3q7qxiOWhAkEA4BXEtpnfhgm37s1VjDxdIHTtWL1PihMT+SCOqp+Vv27ABVrxtDW/w2R3ZzR5ezROI2v1DVhj5wvsxPGXx6OpSQJBANetVvazS/5SQNvb+Cmjw9Rt5NilyxfX5IsSswaIojbwhZY2FVZyAlFH9K/YS2FYFyU7iIqN6IIkOxXpOcj/bV0CQQCRYM4MgWuotClmfkSgBJGOew144uj1dUch+2NTgtFOLvXZA5WICs7sXwOwKzUdH2QKSwHitJOr0+q6ItsLpDwxAkBXzvDK+/CCmIZjfMkqWsxN3nf/ZHCtQm5/2Jsem94/M+mPYHGLgltDMGKEfTEjbrPtqrFKh8ATzCBqKUwncybZAkEAmVNW1dftWWoriZZXXMvfFkTDgYvRmytoVEThhnd0J/AOhZiUAs9+kHfGKivlTE209AY6Bw8aRzuTCziSwQhhBQ== ')
//            let decrypted = jse.decrypt(encrypted)
//            console.log("解密");
//            console.log(decrypted);
        },
        methods:{
            streamTest(callback){
                    return stream.fetch({
                        method: 'GET',
                        type: 'json',
                        url: 'http://weex.rzico.com/weex/common/public_key.jhtml'
                    }, callback)

            },
            getPublicKey(){
                this.streamTest(res=>{
                    let jse = new this.$jsEncrypt.JSEncrypt();
                    jse.setPublicKey(res.data.key);
                    let encrypted = jse.encrypt('Hello, world');
                    console.log(encrypted);
                })
            },
            getStorage(){
                    storage.getItem('name',event=>{
                        let a = JSON.parse(event.data);
                        console.log(event);
                        console.log(a[0]);
                        if(event.result == 'success'){
                            modal.toast({message:a[0].paraImage,duration:1});
                        }else{
                            modal.toast({message:'失败',duration:1});
                        }

                    });
            },

            removeStorage () {
                storage.removeItem('name', event => {
                    modal.toast({message:'删除成功',duration:1});
                })
            },
            getAll () {
                storage.getAllKeys(event => {
                    // modal.toast({ message: event.result })
                    if (event.result === 'success') {
                        modal.toast({
                            message: 'props: ' + event.data.join(', ')
                        })
                    }
                })
            }
        }
    }
</script>