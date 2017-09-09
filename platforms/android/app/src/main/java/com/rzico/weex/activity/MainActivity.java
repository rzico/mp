package com.rzico.weex.activity;

import android.Manifest;
import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.PagerAdapter;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.karumi.dexter.Dexter;
import com.karumi.dexter.PermissionToken;
import com.karumi.dexter.listener.PermissionDeniedResponse;
import com.karumi.dexter.listener.PermissionGrantedResponse;
import com.karumi.dexter.listener.PermissionRequest;
import com.rzico.weex.R;
import com.rzico.weex.adapter.WeexPageAdapter;
import com.rzico.weex.pageview.NoScrollPageView;
import com.rzico.weex.utils.BarTextColorUtils;
import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXRenderStrategy;
import com.taobao.weex.utils.WXFileUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by Jinlesoft on 2017/9/2.
 */

public class MainActivity extends BaseActivity  implements View.OnClickListener, IWXRenderListener{

    private ImageView rgGroupHomeIm,rgGroupFriendIm,rgGroupMsgIm,rgGroupMyIm;
    private TextView rgGroupHomeTv,rgGroupFriendTv,rgGroupMsgTv,rgGroupMyTv;
    private LinearLayout rgGroupHome,rgGroupFriend,rgGroupMsg,rgGroupMy,rgGroupAdd;

    private PagerAdapter mWeexPageAdapter;

    private boolean isfirst = false;
    private boolean first = false;
    private int tab;

//    private FrameLayout mContainer;

    private NoScrollPageView mContainer;

    protected  Map<String, WXSDKInstance> wxsdkInstanceMap;
    protected List<View> viewLists;


    private FragmentTransaction ft;
    private FragmentManager fm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        StatusBarUtils.setWindowStatusBarColor(this, R.color.wxColor);
        //设置顶部透明 如果传入第二个参数的话就是设置顶部颜色
        BarTextColorUtils.StatusBarLightMode(MainActivity.this, 0);
        setContentView(R.layout.activity_main);

        //设置高亮标题
        initWeexView();
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

    /*初始化weexview*/
    private void initWeexView(){
        mContainer = (NoScrollPageView) findViewById(R.id.viewpager_content);
        wxsdkInstanceMap = new HashMap<>();
        viewLists = new ArrayList<>();
        WXSDKInstance mWeexInstanceHome = new WXSDKInstance(this);
        mWeexInstanceHome.registerRenderListener(this);
        WXSDKInstance mWeexInstanceFriend = new WXSDKInstance(this);
        mWeexInstanceFriend.registerRenderListener(this);
        WXSDKInstance mWeexInstanceMsg = new WXSDKInstance(this);
        mWeexInstanceMsg.registerRenderListener(this);
        WXSDKInstance mWeexInstanceMy = new WXSDKInstance(this);
        mWeexInstanceMy.registerRenderListener(this);

        wxsdkInstanceMap.put("home", mWeexInstanceHome);
        wxsdkInstanceMap.put("friends", mWeexInstanceFriend);
        wxsdkInstanceMap.put("msg", mWeexInstanceMsg);
        wxsdkInstanceMap.put("my", mWeexInstanceMy);

        wxsdkInstanceMap.get("home").render("home", WXFileUtils.loadAsset( "home" + ".js", this), null, null, WXRenderStrategy.APPEND_ONCE);
        wxsdkInstanceMap.get("friends").render("home", WXFileUtils.loadAsset( "friends" + ".js", this), null, null, WXRenderStrategy.APPEND_ONCE);
        wxsdkInstanceMap.get("msg").render("home", WXFileUtils.loadAsset( "msg" + ".js", this), null, null, WXRenderStrategy.APPEND_ONCE);
        wxsdkInstanceMap.get("my").render("home", WXFileUtils.loadAsset( "my" + ".js", this), null, null, WXRenderStrategy.APPEND_ONCE);

        mWeexPageAdapter = new WeexPageAdapter(viewLists);
        mContainer.setAdapter(mWeexPageAdapter);

    }
    public void initView(){

        rgGroupHomeIm = (ImageView) findViewById(R.id.rg_group_home_im);
        rgGroupFriendIm = (ImageView) findViewById(R.id.rg_group_vip_im);
        rgGroupMsgIm = (ImageView) findViewById(R.id.rg_group_huihua_im);
        rgGroupMyIm = (ImageView) findViewById(R.id.rg_group_me_im);

        rgGroupHomeTv = (TextView)findViewById(R.id.rg_group_home_tv);
        rgGroupFriendTv = (TextView)findViewById(R.id.rg_group_vip_tv);
        rgGroupMsgTv = (TextView)findViewById(R.id.rg_group_huihua_tv);
        rgGroupMyTv = (TextView)findViewById(R.id.rg_group_me_tv);

        rgGroupHome = (LinearLayout)findViewById(R.id.rg_group_home);
        rgGroupFriend = (LinearLayout)findViewById(R.id.rg_group_vip);
        rgGroupMsg = (LinearLayout)findViewById(R.id.rg_group_huihua);
        rgGroupMy = (LinearLayout)findViewById(R.id.rg_group_me);
        rgGroupAdd = (LinearLayout)findViewById(R.id.rg_group_yingxiao);



        rgGroupHomeIm.setImageResource(R.mipmap.ico_home);
        rgGroupFriendIm.setImageResource(R.mipmap.ico_friend);
        rgGroupMsgIm.setImageResource(R.mipmap.ico_msg);
        rgGroupMyIm.setImageResource(R.mipmap.ico_my);
        initEvent();
    }
    private void initEvent() {
        rgGroupHome.setOnClickListener(this);
        rgGroupFriend.setOnClickListener(this);
        rgGroupMsg.setOnClickListener(this);
        rgGroupAdd.setOnClickListener(this);
        rgGroupMy.setOnClickListener(this);
    }

    private void setBottonChange(int page){
        switch (page){
            case 0:
                rgGroupHomeIm.setImageResource(R.mipmap.ico_home_focus);
                rgGroupFriendIm.setImageResource(R.mipmap.ico_friend);
                rgGroupMsgIm.setImageResource(R.mipmap.ico_msg);
                rgGroupMyIm.setImageResource(R.mipmap.ico_my);

                rgGroupHomeTv.setTextColor(getResources().getColor(R.color.wxColor));
                rgGroupFriendTv.setTextColor(getResources().getColor(R.color.text_default));
                rgGroupMsgTv.setTextColor(getResources().getColor(R.color.text_default));
                rgGroupMyTv.setTextColor(getResources().getColor(R.color.text_default));
                break;
            case 1:
                rgGroupHomeIm.setImageResource(R.mipmap.ico_home);
                rgGroupFriendIm.setImageResource(R.mipmap.ico_friend_focus);
                rgGroupMsgIm.setImageResource(R.mipmap.ico_msg);
                rgGroupMyIm.setImageResource(R.mipmap.ico_my);

                rgGroupHomeTv.setTextColor(getResources().getColor(R.color.text_default));
                rgGroupFriendTv.setTextColor(getResources().getColor(R.color.wxColor));
                rgGroupMsgTv.setTextColor(getResources().getColor(R.color.text_default));
                rgGroupMyTv.setTextColor(getResources().getColor(R.color.text_default));
                break;
            case 2:
                rgGroupHomeIm.setImageResource(R.mipmap.ico_home);
                rgGroupFriendIm.setImageResource(R.mipmap.ico_friend);
                rgGroupMsgIm.setImageResource(R.mipmap.ico_msg_focus);
                rgGroupMyIm.setImageResource(R.mipmap.ico_my);

                rgGroupHomeTv.setTextColor(getResources().getColor(R.color.text_default));
                rgGroupFriendTv.setTextColor(getResources().getColor(R.color.text_default));
                rgGroupMsgTv.setTextColor(getResources().getColor(R.color.wxColor));
                rgGroupMyTv.setTextColor(getResources().getColor(R.color.text_default));
                break;
            case 3:
                rgGroupHomeIm.setImageResource(R.mipmap.ico_home);
                rgGroupFriendIm.setImageResource(R.mipmap.ico_friend);
                rgGroupMsgIm.setImageResource(R.mipmap.ico_msg);
                rgGroupMyIm.setImageResource(R.mipmap.ico_my_focus);

                rgGroupHomeTv.setTextColor(getResources().getColor(R.color.text_default));
                rgGroupFriendTv.setTextColor(getResources().getColor(R.color.text_default));
                rgGroupMsgTv.setTextColor(getResources().getColor(R.color.text_default));
                rgGroupMyTv.setTextColor(getResources().getColor(R.color.wxColor));
                break;
        }
    }

    @Override
    public void onClick(View view) {

        switch (view.getId()) {
            case R.id.rg_group_home:
                setSelectTab(0);
                break;
            case R.id.rg_group_vip:
                setSelectTab(1);
                break;
            case R.id.rg_group_huihua:
                setSelectTab(2);
                break;
            case R.id.rg_group_yingxiao:


                break;
            case R.id.rg_group_me:
                setSelectTab(3);
                break;
        }
    }
    public void setSelectTab(int page) {
        //设置底部图标
        setBottonChange(page);
        mContainer.setCurrentItem(page);

    }

    @Override
    public void onViewCreated(WXSDKInstance instance, View view) {
        viewLists.add(view);
        if(mWeexPageAdapter != null){
            mWeexPageAdapter.notifyDataSetChanged();
        }

    }

    @Override
    public void onRenderSuccess(WXSDKInstance instance, int width, int height) {

    }

    @Override
    public void onRefreshSuccess(WXSDKInstance instance, int width, int height) {

    }

    @Override
    public void onException(WXSDKInstance instance, String errCode, String msg) {

    }
}
