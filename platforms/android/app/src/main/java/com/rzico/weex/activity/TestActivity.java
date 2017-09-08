package com.rzico.weex.activity;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.FrameLayout;

import com.rzico.weex.R;
import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXRenderStrategy;
import com.taobao.weex.utils.WXFileUtils;

public class TestActivity extends AppCompatActivity {
    private FrameLayout mContainer;
    protected WXSDKInstance mWeexInstance;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);
        mContainer = (FrameLayout)findViewById(R.id.container);
        mWeexInstance = new WXSDKInstance(this);
        mWeexInstance.registerRenderListener(new IWXRenderListener() {
            @Override
            public void onViewCreated(WXSDKInstance wxsdkInstance, View view) {
                if (mContainer != null){
                    mContainer.addView(view);
                }
            }

            @Override
            public void onRenderSuccess(WXSDKInstance wxsdkInstance, int i, int i1) {

            }

            @Override
            public void onRefreshSuccess(WXSDKInstance wxsdkInstance, int i, int i1) {

            }

            @Override
            public void onException(WXSDKInstance wxsdkInstance, String s, String s1) {

            }
        });
        mWeexInstance.render("qijianWeex", WXFileUtils.loadAsset("home.js", this), null, null, -1, -1, WXRenderStrategy.APPEND_ASYNC);
    }
}
