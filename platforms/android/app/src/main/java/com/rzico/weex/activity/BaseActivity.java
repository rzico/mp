package com.rzico.weex.activity;

import android.app.ActivityManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.rzico.weex.WXApplication;
import com.rzico.weex.net.HttpRequest;


import java.lang.reflect.Field;
import java.util.List;

import static com.rzico.weex.WXApplication.removeActivity;


public class BaseActivity extends AppCompatActivity {
    public static final int REQUEST_CODE_LOGIN = 0xFFFF;


    public Context mContext;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mContext = BaseActivity.this;
        initView();
    }

    private void initView() {
        WXApplication.getInstance().addActivity(this);

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        HttpRequest.getInstance().unRegisterTasks(this);
    }


    /**
     * 判断是否拥有权限
     *
     * @param permission
     * @return
     */
    protected boolean hasAccessed(String permission) {
        boolean hasAccessed = ContextCompat.checkSelfPermission(this,
                permission)
                != PackageManager.PERMISSION_GRANTED;

        return hasAccessed;
    }




    public void showToast() {
        showToast("", false);
    }


    public void showToast(String message) {
        showToast(message, false);
    }

    public void showToast(String message, boolean success) {
//        LayoutInflater inflater = getLayoutInflater();
//        View layout = inflater.inflate(R.layout.layout_toast, (LinearLayout) findViewById(R.id.linear_toast));
//        ImageView imgToast = (ImageView) layout.findViewById(R.id.img_toast);
//        TextView txvToast = (TextView) layout.findViewById(R.id.txv_toast);
//
//        String msg = "";
//        if (success) {
//            imgToast.setImageResource(R.mipmap.toast_success);
//            msg = getResources().getString(R.string.toast_success);
//        } else {
//            imgToast.setImageResource(R.mipmap.toast_fail);
//            msg = getResources().getString(R.string.toast_fail);
//        }
//        if (!TextUtils.isEmpty(message)) {
//            msg = message;
//        }
//        txvToast.setText(msg);
//        toast = new Toast(getApplicationContext());
//        toast.setGravity(Gravity.CENTER, 0, 0);
//        toast.setDuration(Toast.LENGTH_SHORT);
//        toast.setView(layout);
//        toast.show();
    }


    /**
     * 跳转界面
     *
     * @param cls
     */
    protected void ChangeActivity(Class<?> cls) {
        Intent intent = new Intent(this, cls);
        startActivity(intent);
    }



    public void bindOnClick(View view, int[] ids, View.OnClickListener listener) {
        for (int id : ids) {
            View v = view == null ? findViewById(id) : view.findViewById(id);
            v.setOnClickListener(listener);
        }
    }


    /**
     * 屏蔽系统字体大小设置
     *
     * @return
     */
    @Override
    public Resources getResources() {
        Resources res = super.getResources();
        Configuration config = new Configuration();
        config.setToDefaults();
        res.updateConfiguration(config, res.getDisplayMetrics());
        return res;
    }


    public <T> T findViewHolder(View view, Class<T> c) {
        try {
            String p = getPackageName();
            T obj = c.newInstance();
            Field[] fields = c.getDeclaredFields();
            for (Field f : fields) {
                if (View.class.isAssignableFrom(f.getType())) {
                    int id = getResources().getIdentifier(f.getName(), "id", p);
                    f.setAccessible(true);
                    f.set(obj, view == null ? findViewById(id) : view.findViewById(id));
                }
            }

            return obj;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 用户不允许权限，向用户说明权限的重要性，并支持用户去设置中开启权限
     */
    public void showDeniedDialog(String title) {
        new android.app.AlertDialog.Builder(BaseActivity.this).setTitle(title)
                .setMessage("请允许使用该权限,拒绝将无法使用此功能")
                .setNegativeButton("拒绝", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                        //TiaohuoApplication.exit();
                    }
                })
                .setPositiveButton("去设置", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Intent intent = new Intent();
                        intent.setAction("android.settings.APPLICATION_DETAILS_SETTINGS");
                        intent.setData(Uri.parse("package:" + BaseActivity.this.getPackageName()));
                        intent.putExtra("cmp", "com.android.settings/.applications.InstalledAppDetails");
                        intent.addCategory("android.intent.category.DEFAULT");
                        startActivity(intent);
                        dialog.dismiss();
                    }
                })
                .show();
    }


    //需要申请GETTask权限
    private boolean isApplicationBroughtToBackground() {
        ActivityManager am = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningTaskInfo> tasks = am.getRunningTasks(1);
        if (!tasks.isEmpty()) {
            ComponentName topActivity = tasks.get(0).topActivity;
            if (!topActivity.getPackageName().equals(getPackageName())) {
                return true;
            }
        }
        return false;
    }

    public boolean wasBackground = false;    //声明一个布尔变量,记录当前的活动背景

    @Override
    public void onPause() {
        super.onPause();
        if (isApplicationBroughtToBackground())
            wasBackground = true;
    }

    public void onResume() {
        super.onResume();
        if (wasBackground) {//
            Log.e("aa", "从后台回到前台");
            wasBackground = false;
        }
    }
}
