//
//  WXAlbumModule.m
//  Weex
//
//  Created by 郭书智 on 2017/9/20.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "WXAlbumModule.h"
#import "WXUtility.h"
#import "WXAlbumModel.h"
#import "DictionaryUtil.h"

#import <TZImagePickerController.h>
#import <TZImageManager.h>
#import <Photos/Photos.h>
#import <CLImageEditor.h>

@interface WXAlbumModule()<CLImageEditorDelegate>
@end

@implementation WXAlbumModule{
    WXModuleCallback back;
}

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(openAlbumMuti:))
WX_EXPORT_METHOD(@selector(openAlbumSingle:callback:))
WX_EXPORT_METHOD(@selector(openCrop:callback:))

- (void)openAlbumSingle:(BOOL)isCrop callback:(WXModuleCallback)callback{
    TZImagePickerController *imagePickerVc = [[TZImagePickerController alloc] initWithMaxImagesCount:1 delegate:nil];
    
    imagePickerVc.allowPickingImage = YES;
    imagePickerVc.allowCrop = NO;
    imagePickerVc.allowPickingVideo = NO;
    imagePickerVc.allowPickingMultipleVideo = NO;
    imagePickerVc.allowPickingGif = NO;
    //是否允许拍照
    imagePickerVc.allowTakePicture = YES;
    //照片排序
    imagePickerVc.sortAscendingByModificationDate = NO;
    
    imagePickerVc.isStatusBarDefault = YES;
    
    imagePickerVc.allowPickingOriginalPhoto = NO;
    
    imagePickerVc.isSelectOriginalPhoto = NO;
    
    back = callback;
    
    [imagePickerVc setDidFinishPickingPhotosHandle:^(NSArray<UIImage *> *photos, NSArray *assets, BOOL isSelectOriginalPhoto) {
        CLImageEditor *editor = [[CLImageEditor alloc] initWithImage:[photos firstObject]];
        editor.delegate = self;
        [weexInstance.viewController presentViewController:editor animated:YES completion:nil];
    }];
    [weexInstance.viewController presentViewController:imagePickerVc animated:YES completion:nil];
}

- (void)openCrop:(NSString *)imagePath callback:(WXModuleCallback)callback{
    back = callback;
    NSString *path = imagePath;
    NSArray *replace = [NSArray arrayWithObjects:@"file:///",@"file://",@"file:/", nil];
    for (NSString *str in replace){
        path = [path stringByReplacingOccurrencesOfString:str withString:@""];
    }
    CLImageEditor *editor = [[CLImageEditor alloc] initWithImage:[UIImage imageWithContentsOfFile:path]];
    editor.delegate = self;
    [weexInstance.viewController presentViewController:editor animated:YES completion:nil];
}

- (void)imageEditorDidCancel:(CLImageEditor *)editor{
    [editor dismissViewControllerAnimated:YES completion:nil];
}

- (void)imageEditor:(CLImageEditor *)editor didFinishEditingWithImage:(UIImage *)image{
    WXAlbumModel *album = [WXAlbumModel new];
    NSString *path = [self getImagePath:image uuid:[self getUuid]];
    album.originalPath = path;
    album.thumbnailSmallPath = path;
    WXCallBackMessage *message = [WXCallBackMessage new];
    message.type = YES;
    message.content = @"选择成功";
    message.data = album;
    [editor dismissViewControllerAnimated:YES completion:^{
        if (back){
            back(message.getMessage);
        }
    }];
}

- (void)openAlbumMuti:(WXModuleCallback)callback{
    TZImagePickerController *imagePickerVc = [[TZImagePickerController alloc] initWithMaxImagesCount:100 delegate:nil];
    
    //图片模式
    imagePickerVc.allowPickingImage = YES;
    imagePickerVc.allowPickingVideo = NO;
    imagePickerVc.allowPickingMultipleVideo = NO;
    imagePickerVc.allowPickingGif = YES;
    
    //是否允许拍照
    imagePickerVc.allowTakePicture = YES;

    //照片排序
    imagePickerVc.sortAscendingByModificationDate = NO;
    
    imagePickerVc.isStatusBarDefault = YES;
    
    imagePickerVc.allowPickingOriginalPhoto = YES;
    
    imagePickerVc.isSelectOriginalPhoto = YES;
    
    [imagePickerVc setDidFinishPickingPhotosWithInfosHandle:^(NSArray<UIImage *> *photos, NSArray *assets, BOOL isSelectOriginalPhoto, NSArray<NSDictionary *> *infos) {
        PHImageRequestOptions *options = [PHImageRequestOptions new];
        options.synchronous = YES;

        __block NSMutableArray *dataArray = [NSMutableArray new];
        __block int n = 0;
        for (int i=0; i<photos.count; i++){
            [dataArray addObject:[WXAlbumModel new]];
        }
        for (int i=0; i<photos.count; i++){
            dispatch_async(dispatch_get_global_queue(0, 0), ^{
                PHAsset *asset = [assets objectAtIndex:i];
                WXAlbumModel *album = [WXAlbumModel new];
                NSString *path = [self getImagePath:[photos objectAtIndex:i] uuid:[asset valueForKey:@"uuid"]];
                album.originalPath = path;
                album.thumbnailSmallPath = path;
                dispatch_async(dispatch_get_main_queue(), ^{
                    dataArray[i] = album;
                    n++;
                });
            });
        }
        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            while(n<photos.count){

            }
            if (callback){
                WXCallBackMessage *message = [WXCallBackMessage new];
                message.type = YES;
                message.content = @"选择成功";
                message.data = dataArray;
                callback(message.getMessage);
            }
        });
    }];
    [weexInstance.viewController presentViewController:imagePickerVc animated:YES completion:nil];
}



- (NSString *)getImagePath:(UIImage *)image uuid:(NSString *)uuid{
    static NSString *docDir;
    static NSString *basePath;
    if (!docDir){
        docDir = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
        basePath = [NSString stringWithFormat:@"%@/DCIM/100APPLE",docDir];
    }
    NSFileManager *fm = [NSFileManager defaultManager];
    if (![fm fileExistsAtPath:basePath]){
        [fm createDirectoryAtPath:basePath withIntermediateDirectories:YES attributes:nil error:nil];
    }
    NSString *path = [NSString stringWithFormat:@"%@/%@.png",basePath,uuid];
    BOOL success = [UIImagePNGRepresentation(image) writeToFile:path atomically:YES];
    if (success){
        return path;
    }else{
        return @"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3577784738,4111720376&fm=111&gp=0.jpg";
    }
}

- (NSString *)getUuid{
    CFUUIDRef uuid_ref = CFUUIDCreate(NULL);
    CFStringRef uuid_string_ref = CFUUIDCreateString(NULL, uuid_ref);
    NSString *uuid = [NSString stringWithString:(__bridge NSString *)uuid_string_ref];
    CFRelease(uuid_ref);
    CFRelease(uuid_string_ref);
    return [uuid lowercaseString];
}
@end
