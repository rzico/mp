package com.rzico.weex.net;

import android.content.Intent;


import com.google.gson.Gson;
import com.rzico.weex.Constant;
import com.rzico.weex.activity.BaseActivity;
import com.rzico.weex.model.RequestBean;
import com.rzico.weex.model.info.BaseEntity;
import com.rzico.weex.utils.PhoneUtil;
import com.rzico.weex.utils.Utils;

import org.xutils.common.Callback;
import org.xutils.ex.HttpException;
import org.xutils.http.RequestParams;
import org.xutils.x;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by GuanYuCai on 16/3/9.
 */
public class HttpRequest {
    private HttpRequest() {

        tasks = new ArrayList<>();
    }

    public static interface OnRequestListener {
        public static int ERR_NO_NETWORK = 0;

        public void onSuccess(BaseActivity activity, String result);

        public void onFail(BaseActivity activity, int code);
    }

    private static class HttpFetcherFactory {
        private static HttpRequest instance = instance();
    }

    private static HttpRequest instance() {
        return new HttpRequest();
    }

    public static HttpRequest getInstance() {
        return HttpFetcherFactory.instance;
    }

    private List<XRequest> tasks;
    public void unRegisterTasks(BaseActivity activity) {

        Iterator<XRequest> it = tasks.iterator();
        while (it.hasNext()) {
            XRequest req = it.next();
            if (req.activity == activity) {
                req.requestListener = null;
                req.activity = null;
            }
        }
    }
    public void execute(XRequest task) {

        if (!Utils.checkConnection(task.activity)) {
            if (task.requestListener != null) {
                task.requestListener.onFail(task.activity, OnRequestListener.ERR_NO_NETWORK);
            }
            return;
        }

        Callback.CommonCallback<String> callback = getCallback(task);

        RequestParams params = new RequestParams(task.url);
        if (task.params != null && !task.params.isEmpty()) {
            if (XRequest.FILE.equals(task.method)) {
                for (String key : task.params.keySet()) {
                    Object value = task.params.get(key);
                    if (value == null) {
                        continue;
                    }
                    params.addBodyParameter(key, value, "");
                }

                x.http().post(params, callback);

                tasks.add(task);
                return;
            }

            for (String key : task.params.keySet()) {
                Object value = task.params.get(key);
                if (value == null) {
                    continue;
                }

                // GET
                if (XRequest.GET.equals(task.method)) {
                    if (value instanceof String) {
                        params.addBodyParameter(key, (String) value);
                    } else if (value instanceof Integer || value instanceof Long
                            || value instanceof Float || value instanceof Double) {
                        params.addBodyParameter(key, value + "");
                    }

                    continue;
                }

                // POST
                if (value instanceof List) {
                    List<Object> list = (List<Object>) value;
                    for (Object v : list) {
                        if (v instanceof String) {
                            params.addListParameter(key, (String) v);
                        } else if (v instanceof Integer || v instanceof Long
                                || v instanceof Float || v instanceof Double) {
                            params.addListParameter(key, v + "");
                        }
                    }
                } else if (value instanceof String) {
                    params.addListParameter(key, (String) value);
                } else if (value instanceof Integer || value instanceof Long
                        || value instanceof Float || value instanceof Double) {
                    params.addListParameter(key, value + "");
                }
            }
        } else if (task.requestBean != null && !task.requestBean.isEmpty()) {
            for (RequestBean bean : task.requestBean) {
                params.addListParameter(bean.key, bean.value + "");
            }
        }
       String uid= PhoneUtil.getDeviceId(task.activity);
       String app= Constant.app;
       String key= PhoneUtil.getxkey(task.activity);
        params.addHeader("x-uid", PhoneUtil.getDeviceId(task.activity));//设备号
        params.addHeader("x-app", Constant.app);//包名
        params.addHeader("x-key",PhoneUtil.getxkey(task.activity));

        if (XRequest.GET.equals(task.method)) {
            x.http().get(params, callback);
        } else if (XRequest.POST.equals(task.method)) {
            x.http().post(params, callback);
        }

        tasks.add(task);
    }

    private Callback.CommonCallback<String> getCallback(final XRequest task) {
        Callback.CommonCallback<String> callback = new Callback.CommonCallback<String>() {
            @Override
            public void onSuccess(String result) {
                try {
                    BaseEntity entity= new Gson().fromJson(result, BaseEntity.class);
                    String type= entity.getMessage().getType();
                    String content=entity.getMessage().getContent();
                    if ("error".equals(type) && "session.invaild".equals(content)) {
                        if (task.activity != null) {
                            //跳转至登录页面
//                            Intent intent = new Intent(task.activity, VerifyCodeLoginActivity
//                                    .class);
//                            task.activity.startActivity(intent);
                        }
                    } else if ("error".equals(type) && !"session.invaild".equals(content)){
                        task.requestListener.onFail(task.activity,2);
                    }else {
                        if (task.requestListener != null) {
                            task.requestListener.onSuccess(task.activity, result);
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    if (task.requestListener != null) {
                        task.requestListener.onFail(task.activity, 3);
                    }
//                    LogUtil.d(e.getMessage());
//                    //yinping后期添加的，如有不妥删除
//                    TiaohuoApplication.exit();
                }
                tasks.remove(task);

            }

            @Override
            public void onError(Throwable ex, boolean isOnCallback) {
                if (ex instanceof HttpException) { // 网络错误
                    if (task.requestListener != null) {
                        task.requestListener.onFail(task.activity, 1);
                        //task.activity.showToast("网络错误");
                    }
                } else { // 其他错误
                    if (task.requestListener != null) {
                        task.requestListener.onFail(task.activity, 2);
//                    task.activity.showToast("其他错误");
                    }
                }
                tasks.remove(task);
            }

            @Override
            public void onCancelled(CancelledException cex) {
                tasks.remove(task);
            }

            @Override
            public void onFinished() {
                tasks.remove(task);
            }
        };

        return callback;
    }
}
