/**
 * Created by zwwill on 2017/8/27.
 */
const resLocateURL = 'file://';
const resRemoteURL = 'http://cdn.rzico.com/weex/';

let utilsFunc = {
    initIconFont () {
        let domModule = weex.requireModule('dom');
        domModule.addRule('fontFace', {
            'fontFamily': "iconfont",
            'src': "url('"+resLocateURL+"resources/fonts/iconfont.ttf')"
        });
    },
    //获取本地资源
    locate(url) {
        const newUrl = resLocateURL + url;
        return newUrl;
    },
    //获取远程资源
    remote(url) {
        const newUrl = resRemoteURL + url;
        return newUrl;
    },
    //获取URL参数
    getUrlParameter(name) {
        let url = weex.config.bundleUrl;
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = url.slice(url.indexOf('?')+1).match(reg);
        if (r != null) {
            try {
                return decodeURIComponent(r[2]);
            } catch (_e) {
                return null;
            }
        }
        return null;
    },
    dayfmt (value) {
        let date = new Date(value);
        let tody = new Date();
        let m = tody.getDay() - date.getDay();
        if (m<1) {
            return "今天"
        }
        if (m<3) {
            return "近三天"
        }
        if (m<7) {
            return "近七天"
        }
        return "七天前"
    },
    message (_type,_content,_data) {
        return {
            type:_type,
            content:_content,
            data:_data
        }
    }
};

export default utilsFunc;