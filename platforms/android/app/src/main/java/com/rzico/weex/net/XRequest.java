package com.rzico.weex.net;


import android.content.Context;
import android.support.v7.app.AppCompatActivity;

import com.rzico.weex.Constant;
import com.rzico.weex.activity.BaseActivity;
import com.rzico.weex.model.RequestBean;
import com.rzico.weex.net.HttpRequest;

import java.util.List;
import java.util.Map;

/**
 * Created by GuanYuCai on 16/3/9.
 */
public class XRequest {

    public static final String POST = "POST";
    public static final String GET = "GET";
    public static final String FILE = "FILE";
    Context c;
    BaseActivity activity;
    AppCompatActivity compatActivity;
    String url;
    Map<String, Object> params;
    List<RequestBean> requestBean;
    HttpRequest.OnRequestListener requestListener;
    String method;
    String a,b,cc,d,m;
    boolean backend = false;
    public XRequest(BaseActivity activity, String url) {
        this.activity = activity;
        this.url = Constant.helperUrl + url;
        this.method = GET;
        this.params = null;
    }
    public XRequest(Context c, String url) {
        this.c = c;
        this.url = Constant.helperUrl + url;
        this.method = GET;
        this.params = null;
    }

    public XRequest(BaseActivity activity, String url, String method, List<RequestBean> requestBean) {
        this.activity = activity;
        this.url = Constant.helperUrl + url;
        this.method = method;
        this.requestBean = requestBean;
    }


    public XRequest(BaseActivity activity, String url, String method, Map<String, Object> params) {
        this.activity = activity;
        this.url = Constant.helperUrl + url;
        this.method = method;
        this.params = params;
    }
    public XRequest(Context c, String url, String method, Map<String, Object> params) {
        this.c = c;
        this.url = Constant.helperUrl + url;
        this.method = method;
        this.params = params;
    }
    public XRequest(AppCompatActivity activity, String url) {
        this.compatActivity = activity;
        this.url = Constant.helperUrl + url;
        this.method = GET;
        this.params = null;
    }
    public XRequest(AppCompatActivity activity, String url, String method, List<RequestBean> requestBean) {
        this.compatActivity = activity;
        this.url = Constant.helperUrl + url;
        this.method = method;
        this.requestBean = requestBean;
    }


    public XRequest(AppCompatActivity activity, String url, String method, Map<String, Object> params) {
        this.compatActivity = activity;
        this.url = Constant.helperUrl + url;
        this.method = method;
        this.params = params;
    }

    public void execute() {
        HttpRequest.getInstance().execute(this);
    }

    public XRequest setOnRequestListener(HttpRequest.OnRequestListener l) {
        this.requestListener = l;
        return this;
    }

    public XRequest setBackstage(boolean backend) {
        this.backend = backend;
        return this;
    }
}
