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
#import "NSString+Util.h"
#import "FetchImage.h"
#import "IWXToast.h"

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
    
    imagePickerVc.photoWidth = 155;
    
    
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
    
    if ([path isContains:@"thumb"] || [path isContains:@"original"]){
        path = [path stringByReplacingOccurrencesOfString:@"thumb" withString:@"original"];
        [[FetchImage sharedInstance] fetchAssetWithSchemeUrl:path AndBlock:^(UIImage *image) {
            if (image){
                CLImageEditor *editor = [[CLImageEditor alloc] initWithImage:image];
                editor.delegate = self;
                [weexInstance.viewController presentViewController:editor animated:YES completion:nil];
            }else{
                IWXToast *toast = [IWXToast new];
                [toast showToast:@"无法打开图片" withInstance:nil];
            }
        }];
    }else{
        CLImageEditor *editor = [[CLImageEditor alloc] initWithImage:[UIImage imageWithContentsOfFile:path]];
        editor.delegate = self;
        [weexInstance.viewController presentViewController:editor animated:YES completion:nil];
    }
}

- (void)imageEditorDidCancel:(CLImageEditor *)editor{
    [editor dismissViewControllerAnimated:YES completion:nil];
}

- (void)imageEditor:(CLImageEditor *)editor didFinishEditingWithImage:(UIImage *)image{
    WXAlbumModel *album = [WXAlbumModel new];
    NSString *uuid = [NSString getUUID];
    NSString *path = [self getImagePath:image uuid:uuid];
    album.originalPath = path;
    album.thumbnailSmallPath = path;
    WXCallBackMessage *message = [WXCallBackMessage new];
    message.type = YES;
    message.content = @"选择成功";
    message.data = album;
    if (back){
        back(message.getMessage);
    }
    [editor dismissViewControllerAnimated:YES completion:nil];
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
        NSMutableArray *dataArray = [NSMutableArray new];
        for (int i = 0; i < photos.count; i++){
            NSString *localIdentifier = [[assets objectAtIndex:i] valueForKey:@"localIdentifier"];
            NSString *thumbnailSmallPath = [NSString stringWithFormat:@"thumb://%@",localIdentifier];
            NSString *originalPath = [NSString stringWithFormat:@"original://%@",localIdentifier];
            WXAlbumModel *album = [WXAlbumModel new];
            album.originalPath = originalPath;
            album.thumbnailSmallPath = thumbnailSmallPath;
            [dataArray addObject:album];
        }
        if (callback){
            WXCallBackMessage *message = [WXCallBackMessage new];
            message.type = YES;
            message.content = @"选择成功";
            message.data = dataArray;
            callback(message.getMessage);
        }
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
    BOOL success = [UIImageJPEGRepresentation(image, 1) writeToFile:path atomically:YES];
    if (success){
        return path;
    }else{
        return @"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3577784738,4111720376&fm=111&gp=0.jpg";
    }
}
@end
