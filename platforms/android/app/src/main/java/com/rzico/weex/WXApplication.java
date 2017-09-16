package com.rzico.weex;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.Application;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;

import com.alibaba.weex.commons.adapter.ImageAdapter;
import com.alibaba.weex.commons.util.AppConfig;
import com.alibaba.weex.pluginmanager.PluginManager;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.rzico.weex.activity.BaseActivity;
import com.rzico.weex.adapter.WeexHttpAdapter;
import com.rzico.weex.module.AlbumModule;
import com.rzico.weex.module.NativeModule;
import com.taobao.weex.InitConfig;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;

import org.xutils.x;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;



public class WXApplication extends Application {

  private SharedPreferences SharedPre;

  private  static List<BaseActivity> activityList = new LinkedList<BaseActivity>();
  private static WXApplication instance;
  public static WXApplication getInstance() {
    return instance;
  }
  @Override
  public void onCreate() {
    super.onCreate();
//    initDebugEnvironment(true, false, "DEBUG_SERVER_HOST");
    instance = this;
    init();
    initAlbum();
    WXSDKEngine.addCustomOptions("appName", "魔篇");
    WXSDKEngine.addCustomOptions("appGroup", "WXApp");
    WXSDKEngine.initialize(this,
        new InitConfig.Builder()
            .setImgAdapter(new ImageAdapter())
            .setHttpAdapter(new WeexHttpAdapter())
            .build()
    );
    try {
      WXSDKEngine.registerModule("nativeModule", NativeModule.class);
      WXSDKEngine.registerModule("albumModule", AlbumModule.class);
    } catch (WXException e) {
      e.printStackTrace();
    }
    Fresco.initialize(this);
    AppConfig.init(this);
    PluginManager.init(this);
  }

  public void initAlbum(){
    //设置主题

  }
  /**
   * @param enable enable remote debugger. valid only if host not to be "DEBUG_SERVER_HOST".
   *               true, you can launch a remote debugger and inspector both.
   *               false, you can  just launch a inspector.
   * @param host   the debug server host, must not be "DEBUG_SERVER_HOST", a ip address or domain will be OK.
   *               for example "127.0.0.1".
   */
  private void initDebugEnvironment(boolean connectable,boolean enable, String host) {
    if (!"DEBUG_SERVER_HOST".equals(host)) {
      WXEnvironment.sDebugServerConnectable = connectable;
      WXEnvironment.sRemoteDebugMode = enable;
      WXEnvironment.sRemoteDebugProxyUrl = "ws://" + host + ":8088/debugProxy/native";
    }
  }

  /**
   * 初始化常用对象
   */
  private void init() {

    //xUtil
    x.Ext.init(this);
//        x.Ext.setDebug(false);
    x.Ext.setDebug(BuildConfig.DEBUG);

  }

  public static BaseActivity getActivity(){
    return activityList.get(activityList.size() - 1);
  }

  //添加Activity 到容器中
  public static void addActivity(BaseActivity activity) {
    activityList.add(activity);
  }

  //遍历所有Activity 并finish
  public static void exit() {
    try {
      for (Activity activity : activityList) {
        if (activity != null)
          activity.finish();
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      System.exit(0);
    }
  }

  public static void removeActivity() {
    try {
      for (Activity activity : activityList) {
        if (activity != null){
//          if (activity instanceof VerifyCodeLoginActivity){
//            activityList.remove(activity);
//          }
          activity.finish();
        }

      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  // 保存字符串
  public void save(String name, String content) {
    SharedPre.edit().putString(name, content).commit();
  }

  // 读取字符串
  public String get(String name, String defaultName) {
    return SharedPre.getString(name, defaultName);
  }

  private String getAppName(int pID) {
    String processName = null;
    ActivityManager am = (ActivityManager) this.getSystemService(ACTIVITY_SERVICE);
    List l = am.getRunningAppProcesses();
    Iterator i = l.iterator();
    PackageManager pm = this.getPackageManager();
    while (i.hasNext()) {
      ActivityManager.RunningAppProcessInfo info = (ActivityManager.RunningAppProcessInfo) (i.next());
      try {
        if (info.pid == pID) {
          processName = info.processName;
          return processName;
        }
      } catch (Exception e) {
      }
    }
    return processName;
  }
}
