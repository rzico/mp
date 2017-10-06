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

@implementation WXAlbumModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(openAlbumMuti:))

- (void)openAlbumMuti:(WXModuleCallback)callback{
    NSMutableArray *dataArray = [NSMutableArray new];
    TZImagePickerController *imagePickerVc = [[TZImagePickerController alloc] initWithMaxImagesCount:100 delegate:nil];
    
    //图片模式
    imagePickerVc.allowPickingImage = YES;
    imagePickerVc.allowPickingVideo = NO;
    imagePickerVc.allowPickingMultipleVideo = NO;
    imagePickerVc.allowPickingGif = YES;
    //是否允许选择原图
    imagePickerVc.isSelectOriginalPhoto = NO;
    
    //是否允许拍照
    imagePickerVc.allowTakePicture = YES;

    //照片排序
    imagePickerVc.sortAscendingByModificationDate = NO;
    
    imagePickerVc.isStatusBarDefault = YES;
    
    [imagePickerVc setDidFinishPickingPhotosHandle:^(NSArray<UIImage *> *photos, NSArray *assets, BOOL isSelectOriginalPhoto) {
        for (int i=0; i<photos.count; i++){
            WXAlbumModel *album = [WXAlbumModel new];
            album.thumbnailSmallPath = [self getImagePath:[photos objectAtIndex:i]];
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

- (NSString *)getImagePath:(UIImage *)image{
    static NSString *docDir;
    if (!docDir){
        docDir = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
    }
    NSString *path = [docDir stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.jpg",[self getUuid]]];
    BOOL success = [UIImageJPEGRepresentation(image, 0.5) writeToFile:path  atomically:YES];
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
