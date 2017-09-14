package com.rzico.weex.adapter;

import android.support.v4.view.PagerAdapter;
import android.view.View;
import android.view.ViewGroup;

import com.rzico.weex.WXApplication;
import com.rzico.weex.activity.BaseActivity;
import com.rzico.weex.net.HttpRequest;
import com.rzico.weex.net.XRequest;
import com.taobao.weex.adapter.DefaultWXHttpAdapter;
import com.taobao.weex.adapter.IWXHttpAdapter;
import com.taobao.weex.common.WXRequest;
import com.taobao.weex.common.WXResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Jinlesoft on 2017/9/8.
 */

public class WeexHttpAdapter implements IWXHttpAdapter {

    @Override
    public void sendRequest(WXRequest request, final OnHttpListener listener) {
        String method = "";
        if(request.method == null || request.method.equals("")){
            method = "GET";
        }else{
            method = request.method;
        }
        if(request.url.contains("http")){
            DefaultWXHttpAdapter defaultWXHttpAdapter = new DefaultWXHttpAdapter();
            defaultWXHttpAdapter.sendRequest(request, listener);
        }else{
            new XRequest(WXApplication.getActivity(), request.url, method.toUpperCase(),bindMap(request.paramMap))
                    .setOnRequestListener(new HttpRequest.OnRequestListener() {
                        @Override
                        public void onSuccess(BaseActivity activity, String result) {
                            WXResponse wxResponse = new WXResponse();
                            wxResponse.statusCode = "200";
                            wxResponse.originalData = result.getBytes();
                            listener.onHttpFinish(wxResponse);
                        }

                        @Override
                        public void onFail(BaseActivity activity, int code) {

                        }
                    }).execute();
        }
    }

    public Map<String , Object> bindMap(Map<String , String> map){
        Map<String , Object> data = new HashMap<>();
        if(map != null){
            data.putAll(map);
        }
        return data;
    }
}
