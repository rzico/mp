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
    imagePickerVc.isSelectOriginalPhoto = YES;
    
    //是否允许拍照
    imagePickerVc.allowTakePicture = YES;

    //照片排序
    imagePickerVc.sortAscendingByModificationDate = NO;
    
    imagePickerVc.isStatusBarDefault = YES;
    
    [imagePickerVc setDidFinishPickingPhotosHandle:^(NSArray<UIImage *> *photos, NSArray *assets, BOOL isSelectOriginalPhoto) {
        for (int i=0; i<photos.count; i++){
            WXAlbumModel *album = [WXAlbumModel new];
            album.thumbnailSmallPath = [self getImagePath:[photos objectAtIndex:i]];
            [dataArray addObject:[DictionaryUtil objectToDictionary:album]];
        }
        
        if (callback){
            NSMutableDictionary *data = [NSMutableDictionary new];
            
            [data setValue:dataArray forKey:@"data"];
            [data setValue:@"success" forKey:@"type"];
            
            
            callback([data mutableCopy]);
        }
    }];
    
    [weexInstance.viewController presentViewController:imagePickerVc animated:YES completion:nil];

    //    pickerVc.delegate = self;
//    [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:pickerVc animated:YES completion:nil];
    
    
    
    
//    if (callback){
//        
//        NSMutableArray *dataArray = [NSMutableArray new];
//        
//        for (int i = 0 ; i < 10 ; i++){
//            WXAlbumModel *album = [WXAlbumModel new];
//            
//            NSString *url;
//            
//            NSString *imagePath = [[NSBundle mainBundle] pathForResource:@"weex" ofType:@"png"];
//            
//            NSLog(@"imagePath = %@", imagePath);
//            
//            
//            url = @"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3577784738,4111720376&fm=111&gp=0.jpg";
//            
//            album.thumbnailSmallPath = [NSString stringWithFormat:@"file://%@",imagePath];
//            
//            NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
//            NSString *docDir = [paths objectAtIndex:0];
//            
//            
//            
//            
//            NSData *data = [NSData dataWithContentsOfURL:[NSURL URLWithString:url]];
//            UIImage *image = [UIImage imageWithData:data];
//            
//            NSString *path = [docDir stringByAppendingPathComponent:@"image.jpg"];
//            BOOL success = [UIImageJPEGRepresentation(image, 0.5) writeToFile:path  atomically:YES];
//            if (success){
//                album.thumbnailSmallPath = [NSString stringWithFormat:@"file://%@",path];
//                
//                
//            }
//            
//            NSLog(@"imagePath = %@", album.thumbnailSmallPath);
//            
//            [dataArray addObject:[DictionaryUtil objectToDictionary:album]];
//            album = nil;
//        }
//
//        NSMutableDictionary *data = [NSMutableDictionary new];
//        
//        [data setValue:dataArray forKey:@"data"];
//        [data setValue:@"success" forKey:@"type"];
//        
//        
//        callback([data mutableCopy]);
    
//    }
}

- (NSString *)getImagePath:(UIImage *)image{
    NSString *docDir = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
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
