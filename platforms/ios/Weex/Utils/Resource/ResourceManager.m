//
//  ResourceManager.m
//  Weex
//
//  Created by 郭书智 on 2017/10/8.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "ResourceManager.h"
#import "DictionaryUtil.h"
#import <ZipArchive.h>

@implementation ResourceManager{
    NSString *resourcePath;
    NSString *zipPath;
    ZipArchive *zip;
    
    NSMutableDictionary *config;
}

+ (ResourceManager *)defaultManager{
    static ResourceManager *manager;
    static BOOL isLocalReleased = NO;
    if (!manager){
        manager = [ResourceManager new];
    }
    if (!manager.resource || manager.resource.resUrl.length <= 0){
        NSData *data = [NSData dataWithContentsOfURL:[NSURL URLWithString:HTTPAPI(@"common/resources")]];
        NSDictionary *dic = [DictionaryUtil dictionaryWithJsonData:data];
        if (dic && [[dic objectForKey:@"type"] isEqualToString:@"success"]){
            ResourcesModel *resource = [[ResourcesModel alloc] initWithDictionary:[dic objectForKey:@"data"] error:nil];
            if (resource.resUrl.length > 0){
                if ([manager checkUpdate:resource.resVersion]){
                    [manager updateResource];
                }
                manager.resource = resource;
            }
        }else{
            if (!isLocalReleased){
                if ([manager checkUpdate:nil]){
                    isLocalReleased = [manager releaseLocalZip];
                }
            }
        }
    }else{
        //处理下载失败或者解压失败
        if ([manager checkUpdate:manager.resource.resVersion]){
            [manager updateResource];
        }
    }
    return manager;
}

- (BOOL)releaseLocalZip{
    ZipArchive *zip = [ZipArchive new];
    NSString *localZipPath = [[NSBundle mainBundle].bundlePath stringByAppendingString:@"/res-0.0.1.zip"];
    if ([zip UnzipOpenFile:localZipPath]){
        NSString *resourcePath = [DOCUMENT_PATH stringByAppendingString:@"/resource"];
        NSLog(@"resource=%@",resourcePath);
        BOOL ret = [zip UnzipFileTo:resourcePath overWrite:YES];
        if (!ret){
            [zip UnzipCloseFile];
        }
        return ret;
    }
    return NO;
}

- (BOOL)checkUpdate:(nullable NSString *)version{
    config = [[NSMutableDictionary alloc] initWithContentsOfFile: [DOCUMENT_PATH stringByAppendingString:@"/config.plist"]];
    if (!version){
        return (!config || ![[config objectForKey:@"resVersion"] isEqualToString:version]);
    }else{
        return (!config || ![config objectForKey:@"resVersion"]);
    }
}

- (void)updateResource{
    [self downloadZipFiles];
}

- (void)downloadZipFiles{
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_async(queue, ^{
        NSURL *url = [NSURL URLWithString:self.resource.resUrl];
        NSData *data = [NSData dataWithContentsOfURL:url options:0 error:nil];
        NSString *cachePath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) firstObject];
        resourcePath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) firstObject];
        zipPath = [cachePath stringByAppendingString:@"/tempResource.zip"];
        [data writeToFile:zipPath options:0 error:nil];
        [self releaseZipFiles];
    });
}

- (void)releaseZipFiles{
    zip = [ZipArchive new];
    if ([zip UnzipOpenFile:zipPath]){
        NSString *resourcePath = [DOCUMENT_PATH stringByAppendingString:@"/resource"];
        NSLog(@"resource=%@",resourcePath);
        BOOL ret = [zip UnzipFileTo:resourcePath overWrite:YES];
        if (ret){
            config = [NSMutableDictionary new];
            [config setObject:self.resource.appVersion forKey:@"appVersion"];
            [config setObject:self.resource.resVersion forKey:@"resVersion"];
            [config writeToFile:[DOCUMENT_PATH stringByAppendingString:@"/config.plist"] atomically:YES];
        }else{
            [zip UnzipCloseFile];
        }
    }
}

@end
