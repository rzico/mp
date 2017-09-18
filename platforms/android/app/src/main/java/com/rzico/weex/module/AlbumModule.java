package com.rzico.weex.module;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.widget.Toast;

import com.rzico.weex.WXApplication;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;
import com.yalantis.ucrop.UCrop;
import com.yalantis.ucrop.model.AspectRatio;

import java.io.File;
import java.util.List;

import cn.finalteam.rxgalleryfinal.RxGalleryFinal;
import cn.finalteam.rxgalleryfinal.bean.MediaBean;
import cn.finalteam.rxgalleryfinal.imageloader.ImageLoaderType;
import cn.finalteam.rxgalleryfinal.rxbus.RxBusResultDisposable;
import cn.finalteam.rxgalleryfinal.rxbus.event.ImageMultipleResultEvent;
import cn.finalteam.rxgalleryfinal.rxbus.event.ImageRadioResultEvent;

/**
 * Created by Jinlesoft on 2017/9/14.
 */

public class AlbumModule extends WXModule {

    private List<MediaBean> list = null;
    private RxGalleryFinalCropListener listener = null;


    private static final class SimpleRxGalleryFinalHolder {
        private static final AlbumModule SIMPLE_RX_GALLERY_FINAL = new AlbumModule();
    }

    public static AlbumModule get() {
        return SimpleRxGalleryFinalHolder.SIMPLE_RX_GALLERY_FINAL;
    }


    public AlbumModule init(RxGalleryFinalCropListener listener) {
        this.listener = listener;
        return this;
    }

    public Context getContext(){
        return mWXSDKInstance.getContext();
    }
    @JSMethod
    public void openAlbumSingle(final JSCallback callback){
        RxGalleryFinal
                .with(WXApplication.getActivity())
                .image()
                .radio()
                .cropAspectRatioOptions(0, new AspectRatio("3:3", 30, 10))
                .crop()
                .imageLoader(ImageLoaderType.PICASSO)
                .subscribe(new RxBusResultDisposable<ImageRadioResultEvent>() {
                    @Override
                    protected void onEvent(ImageRadioResultEvent imageRadioResultEvent) throws Exception {
                        callback.invoke(imageRadioResultEvent.getResult().getCropPath());
//                        Toast.makeText(getContext(), "选中了图片路径：" + imageRadioResultEvent.getResult().getOriginalPath(), Toast.LENGTH_SHORT).show();
                    }
                })
                .openGallery();
    }
    @JSMethod
    public void openAlbumMuti(final JSCallback callback){
        RxGalleryFinal rxGalleryFinal = RxGalleryFinal
                .with(WXApplication.getActivity())
                .image()
                .multiple();
        if (list != null && !list.isEmpty()) {
            rxGalleryFinal
                    .selected(list);
        }
        rxGalleryFinal.maxSize(100)
                .imageLoader(ImageLoaderType.PICASSO)
                .subscribe(new RxBusResultDisposable<ImageMultipleResultEvent>() {

                    @Override
                    protected void onEvent(ImageMultipleResultEvent imageMultipleResultEvent) throws Exception {
                        list = imageMultipleResultEvent.getResult();
                        callback.invoke(list);
//                        Toast.makeText(getContext(), "已选择" + imageMultipleResultEvent.getResult().size() + "张图片", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onComplete() {
                        super.onComplete();
//                        Toast.makeText(getContext(), "OVER", Toast.LENGTH_SHORT).show();
                    }
                })
                .openGallery();
    }


    @JSMethod
    public void openCrop(String imagePath, final JSCallback callback){
        //调用当前文件下的接口 并且实现它回调给 callback
        AlbumModule.get().init(new RxGalleryFinalCropListener() {
            @NonNull
            @Override
            public Activity getSimpleActivity() {
                return WXApplication.getActivity();
            }

            @Override
            public void onCropCancel() {

            }

            @Override
            public void onCropSuccess(@Nullable Uri uri) {
                callback.invoke(uri.getPath());
            }

            @Override
            public void onCropError(@NonNull String errorMessage) {
                callback.invoke(errorMessage);
            }
        }).openCrapActivity(imagePath);
    }

    public void openCrapActivity(final String imagePath){
//        listener.getSimpleActivity().runOnUiThread(new Runnable() {
//            @Override
//            public void run() {
//            }
//        });

        //这里要处理传入的path 因为weex前端没有传入 file：／／

        Uri uri = Uri.parse("file://" + imagePath);
        UCrop of = UCrop.of(uri, Uri.fromFile(getDiskCacheDir()));
        of.start(listener.getSimpleActivity());
    }
   /*
     获取缓存路径
    */
    private File getDiskCacheDir() {
        String cachePath;
        if (Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState()) || !Environment.isExternalStorageRemovable()) {
            File externalCacheDir = listener.getSimpleActivity().getExternalCacheDir();
            if (externalCacheDir != null) {
                cachePath = externalCacheDir.getPath();
            } else {
                cachePath = listener.getSimpleActivity().getCacheDir().getPath();
            }
        } else {
            cachePath = listener.getSimpleActivity().getCacheDir().getPath();
        }
        return new File(cachePath, imageName());
    }
    private String imageName() {
        return System.currentTimeMillis() + ".jpg";
    }

    /**
     * 裁剪完成回调
     * @param requestCode
     * @param resultCode
     * @param data
     */
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch (resultCode) {
            case Activity.RESULT_CANCELED:
                listener.onCropCancel();
                break;
            case UCrop.RESULT_ERROR:
                if (data != null) {
                    Throwable cropError = UCrop.getError(data);
                    if (cropError != null) {
                        listener.onCropError(cropError.getMessage());
                    } else {
                        listener.onCropError("裁剪出现未知错误");
                    }
                } else {
                    listener.onCropError("获取相册图片出现错误");
                }
                break;

            case Activity.RESULT_OK:
                switch (requestCode) {
                    case UCrop.REQUEST_CROP:
                        listener.onCropSuccess(UCrop.getOutput(data));
                        break;
                }
                break;
        }
    }
    public interface RxGalleryFinalCropListener {

        @NonNull
        Activity getSimpleActivity();


        /**
         * 裁剪被取消
         */
        void onCropCancel();

        /**
         * 裁剪成功
         *
         * @param uri 裁剪的 Uri , 有可能会为Null
         */
        void onCropSuccess(@Nullable Uri uri);


        /**
         * 裁剪失败
         *
         * @param errorMessage 错误信息
         */
        void onCropError(@NonNull String errorMessage);

    }


}
