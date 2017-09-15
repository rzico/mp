package com.rzico.weex.module;

import android.content.Context;
import android.widget.Toast;

import com.rzico.weex.R;
import com.rzico.weex.model.info.WxConfig;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;

/**
 * Created by Jinlesoft on 2017/9/14.
 */

public class NativeModule extends WXModule {

    public Context getContext(){
        return mWXSDKInstance.getContext();
    }

    @JSMethod
    public void showToast(String data){
        Toast.makeText(getContext(), data, Toast.LENGTH_SHORT).show();

    }

    @JSMethod
    public void wxConfig(JSCallback callback){
        WxConfig wxConfig = new WxConfig();
        String color = Integer.toHexString(getContext().getResources().getColor(R.color.wxColor));
        if(color.length() > 6){
            color = color.substring(color.length() - 6);
        }
        wxConfig.setColor("#" + color);
        callback.invoke(wxConfig);
    }


}
