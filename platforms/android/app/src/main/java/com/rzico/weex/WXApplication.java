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
import com.rzico.weex.utils.listener.PicassoPauseOnScrollListener;
import com.rzico.weex.utils.loader.PicassoImageLoader;
import com.taobao.weex.InitConfig;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;

import org.xutils.x;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import cn.finalteam.galleryfinal.CoreConfig;
import cn.finalteam.galleryfinal.FunctionConfig;
import cn.finalteam.galleryfinal.GalleryFinal;
import cn.finalteam.galleryfinal.ThemeConfig;


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
      WXSDKEngine.registerModule("wxNativeModule", NativeModule.class);
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
/**
 setTitleBarTextColor//标题栏文本字体颜色
 setTitleBarBgColor//标题栏背景颜色
 setTitleBarIconColor//标题栏icon颜色，如果设置了标题栏icon，设置setTitleBarIconColor将无效
 setCheckNornalColor//选择框未选颜色
 setCheckSelectedColor//选择框选中颜色
 setCropControlColor//设置裁剪控制点和裁剪框颜色
 setFabNornalColor//设置Floating按钮Nornal状态颜色
 setFabPressedColor//设置Floating按钮Pressed状态颜色

 setIconBack//设置返回按钮icon
 setIconCamera//设置相机icon
 setIconCrop//设置裁剪icon
 setIconRotate//设置旋转icon
 setIconClear//设置清楚选择按钮icon（标题栏清除选择按钮）
 setIconFolderArrow//设置标题栏文件夹下拉arrow图标
 setIconDelete//设置多选编辑页删除按钮icon
 setIconCheck//设置checkbox和文件夹已选icon
 setIconFab//设置Floating按钮icon
 setEditPhotoBgTexture//设置图片编辑页面图片margin外背景
 setIconPreview设置预览按钮icon
 setPreviewBg设置预览页背景
 */
    ThemeConfig theme = new ThemeConfig.Builder()
            .setTitleBarBgColor(Color.rgb(0xF0, 0xAD, 0x3C))
            .setTitleBarTextColor(Color.BLACK)
            .setTitleBarIconColor(Color.BLACK)
            .build();
    //配置功能
    /**
     setMutiSelect(boolean)//配置是否多选
     setMutiSelectMaxSize(int maxSize)//配置多选数量
     setEnableEdit(boolean)//开启编辑功能
     setEnableCrop(boolean)//开启裁剪功能
     setEnableRotate(boolean)//开启旋转功能
     setEnableCamera(boolean)//开启相机功能
     setCropWidth(int width)//裁剪宽度
     setCropHeight(int height)//裁剪高度
     setCropSquare(boolean)//裁剪正方形
     setSelected(List)//添加已选列表,只是在列表中默认呗选中不会过滤图片
     setFilter(List list)//添加图片过滤，也就是不在GalleryFinal中显示
     takePhotoFolter(File file)//配置拍照保存目录，不做配置的话默认是/sdcard/DCIM/GalleryFinal/
     setRotateReplaceSource(boolean)//配置选择图片时是否替换原始图片，默认不替换
     setCropReplaceSource(boolean)//配置裁剪图片时是否替换原始图片，默认不替换
     setForceCrop(boolean)//启动强制裁剪功能,一进入编辑页面就开启图片裁剪，不需要用户手动点击裁剪，此功能只针对单选操作
     setForceCropEdit(boolean)//在开启强制裁剪功能时是否可以对图片进行编辑（也就是是否显示旋转图标和拍照图标）
     setEnablePreview(boolean)//是否开启预览功能
     */
    FunctionConfig functionConfig = new FunctionConfig.Builder()
//            .setEnableCamera(true)//开启相册功能
//            .setEnableEdit(true)//开启编辑功能
//            .setEnableCrop(true)//开启裁剪功能
//            .setEnableRotate(true)//开启旋转功能
//            .setCropSquare(true)//裁剪正方形
//            .setEnablePreview(true)//是否开启预览功能
//            .setMutiSelectMaxSize(100)
            .build();
    CoreConfig coreConfig = new CoreConfig.Builder(this, new PicassoImageLoader(), theme)
            .setFunctionConfig(functionConfig)
            .setPauseOnScrollListener(new PicassoPauseOnScrollListener(false, true))
            .build();
    GalleryFinal.init(coreConfig);
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
