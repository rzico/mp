//
//  FetchImage.m
//  Weex
//
//  Created by iMac on 2017/10/19.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "FetchImage.h"
#import <Photos/Photos.h>
#import <TZImageManager.h>

@implementation FetchImage

+ (id)sharedInstance {
    static dispatch_once_t once;
    static id instance;
    dispatch_once(&once, ^{
        instance = [self new];
    });
    return instance;
}

- (id<WXImageOperationProtocol>)fetchAssetWithSchemeUrl:(NSString *)url AndBlock:(FetchImageBlock)block{
    NSString *localIdentifier;
    if ([url hasPrefix:@"original://"]){
        localIdentifier = [url stringByReplacingOccurrencesOfString:@"original://" withString:@""];
        id ph = [PHAsset fetchAssetsWithLocalIdentifiers:[NSArray arrayWithObject:localIdentifier] options:nil];
        if (ph){
            [[TZImageManager manager] getOriginalPhotoWithAsset:[ph firstObject] completion:^(UIImage *photo, NSDictionary *info) {
                block(photo);
            }];
        }else{
            block(nil);
        }
    }else if ([url hasPrefix:@"thumb://"]){
        NSLog(@"thumb");
        localIdentifier = [url stringByReplacingOccurrencesOfString:@"thumb://" withString:@""];
        id ph = [PHAsset fetchAssetsWithLocalIdentifiers:[NSArray arrayWithObject:localIdentifier] options:nil];
        if (ph){
            [[TZImageManager manager] getPhotoWithAsset:[ph firstObject] photoWidth:80.0 completion:^(UIImage *photo, NSDictionary *info, BOOL isDegraded) {
                
                static int xxx = 0;
                NSLog(@"photo=%@,%d,%@,width=%f,height=%f",photo,xxx++,info,photo.size.width,photo.size.height);
                block(photo);
            } progressHandler:^(double progress, NSError *error, BOOL *stop, NSDictionary *info) {
                
            } networkAccessAllowed:YES];
        }else{
            block(nil);
        }
    }
    return self;
}

- (void)cancel{
    
}
@end
