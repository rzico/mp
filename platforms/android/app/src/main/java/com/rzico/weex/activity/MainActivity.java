package com.rzico.weex.activity;

import android.Manifest;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.google.gson.Gson;
import com.karumi.dexter.Dexter;
import com.karumi.dexter.PermissionToken;
import com.karumi.dexter.listener.PermissionDeniedResponse;
import com.karumi.dexter.listener.PermissionGrantedResponse;
import com.karumi.dexter.listener.PermissionRequest;
import com.rzico.weex.R;
import com.rzico.weex.model.VersionEntity;
import com.rzico.weex.net.HttpRequest;
import com.rzico.weex.net.XRequest;
import com.rzico.weex.utils.Utils;
import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXRenderStrategy;
import com.taobao.weex.utils.WXFileUtils;

import java.util.HashMap;
import java.util.Map;


/**
 * Created by Jinlesoft on 2017/9/2.
 */

public class MainActivity extends BaseActivity  implements View.OnClickListener{

    private ImageView rgGroupHomeIm,rgGroupVipIm,rgGroupHuihuaIm,rgGroupMeIm;
    private TextView rgGroupHomeTv,rgGroupVipTv,rgGroupHuihuaTv,rgGroupMeTv;
    private LinearLayout rgGroupHome,rgGroupVip,rgGroupHuihua,rgGroupMe,rgGroupYingxiao;

    private boolean isfirst = false;
    private boolean first = false;
    private int tab;

    private FrameLayout mContainer;
    protected WXSDKInstance mWeexInstance;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mContainer = (FrameLayout)findViewById(R.id.fragment_content);

        mWeexInstance = new WXSDKInstance(this);
        mWeexInstance.registerRenderListener(new IWXRenderListener() {
            @Override
            public void onViewCreated(WXSDKInstance wxsdkInstance, View view) {
                if (mContainer != null){
                    mContainer.removeAllViews();
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
        setSelectTab(0);
        setSelectTab(1);
        setSelectTab(2);
        CheckPermissions();
        initView();
    }
    private void CheckPermissions() {
        Dexter.withActivity(this).withPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE)
                .withListener(new com.karumi.dexter.listener.single.PermissionListener() {
                    @Override
                    public void onPermissionGranted(PermissionGrantedResponse response) {
                        checkVision();
                    }

                    @Override
                    public void onPermissionDenied(PermissionDeniedResponse response) {
                        showDeniedDialog("需要存储权限");
                    }

                    @Override
                    public void onPermissionRationaleShouldBeShown(PermissionRequest permission,
                                                                   PermissionToken token) {
                        //用户不允许权限，向用户解释权限左右
                        token.continuePermissionRequest();
                    }
                }).check();
    }
    private void checkVision() {
//        Map<String, Object> params = new HashMap<>();
//        params.put("appname", "com.rzico.assistant.android");
//        params.put("version", Utils.getVersionName(this));
//        new XRequest(this, "common/version.jhtml", XRequest.GET, params).setOnRequestListener(new HttpRequest.OnRequestListener() {
//            @Override
//            public void onSuccess(BaseActivity activity, String result) {
//                VersionEntity versioninfo = new Gson().fromJson(result, VersionEntity.class);
//                if (versioninfo.getMessage().getType().equals("success")) {
//                    VersionEntity.Data info = versioninfo.getData();
//                    if (info.getType().equals("wake")) {
//                        showUplodeDialog(info);
//                    } else if (info.getType().equals("force")) {
//                        showUplodeDialog(info);
//                    }
//                }
//            }
//
//            @Override
//            public void onFail(BaseActivity activity, int code) {
//
//            }
//        }).execute();
    }
    public void initView(){
        rgGroupHomeIm = (ImageView) findViewById(R.id.rg_group_home_im);
        rgGroupVipIm = (ImageView) findViewById(R.id.rg_group_vip_im);
        rgGroupHuihuaIm = (ImageView) findViewById(R.id.rg_group_huihua_im);
        rgGroupMeIm = (ImageView) findViewById(R.id.rg_group_me_im);

        rgGroupHomeTv = (TextView)findViewById(R.id.rg_group_home_tv);
        rgGroupVipTv = (TextView)findViewById(R.id.rg_group_vip_tv);
        rgGroupHuihuaTv = (TextView)findViewById(R.id.rg_group_huihua_tv);
        rgGroupMeTv = (TextView)findViewById(R.id.rg_group_me_tv);

        rgGroupHome = (LinearLayout)findViewById(R.id.rg_group_home);
        rgGroupVip = (LinearLayout)findViewById(R.id.rg_group_vip);
        rgGroupHuihua = (LinearLayout)findViewById(R.id.rg_group_huihua);
        rgGroupMe = (LinearLayout)findViewById(R.id.rg_group_me);
        rgGroupYingxiao = (LinearLayout)findViewById(R.id.rg_group_yingxiao);



        rgGroupHomeIm.setImageResource(R.mipmap.shouye_2);
        rgGroupVipIm.setImageResource(R.mipmap.huiyuan3);
        rgGroupHuihuaIm.setImageResource(R.mipmap.message);
        rgGroupMeIm.setImageResource(R.mipmap.wode2);
        initEvent();
    }
    private void initEvent() {
        rgGroupHome.setOnClickListener(this);
        rgGroupVip.setOnClickListener(this);
        rgGroupHuihua.setOnClickListener(this);
        rgGroupYingxiao.setOnClickListener(this);
        rgGroupMe.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {

        switch (view.getId()) {
            case R.id.rg_group_home:
                isfirst = false;
                setSelectTab(0);
                break;
            case R.id.rg_group_vip:
                isfirst = false;
                setSelectTab(1);
                break;
            case R.id.rg_group_huihua:
                isfirst = false;
                setSelectTab(2);
                break;
            case R.id.rg_group_yingxiao:
                if (isfirst) {
//                    Intent intent = new Intent(this, ShareWebActivity.class);
//                    startActivity(intent);
                } else {
//                    setSelectTab(3);
                }

                break;
            case R.id.rg_group_me:
                isfirst = false;
                setSelectTab(4);
                break;
        }
    }
    public void setSelectTab(int i) {
        mWeexInstance.re
        mWeexInstance.render("wx" + i, WXFileUtils.loadAsset("index"+i+".js", this), null, null, -1, -1, WXRenderStrategy.APPEND_ASYNC);
    }

}
