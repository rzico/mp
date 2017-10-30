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

+ (id)sharedInstance {
    static dispatch_once_t once;
    static id instance;
    dispatch_once(&once, ^{
        instance = [self new];
    });
    return instance;
}

- (void)updateResource:(ResourceUpdateBlock)callback{
    dispatch_async(dispatch_get_global_queue(0, 0), ^{
        NSData *data = [NSData dataWithContentsOfURL:[NSURL URLWithString:HTTPAPI(@"common/resources")]];
        NSDictionary *dic = [DictionaryUtil dictionaryWithJsonData:data];
        if (dic && [[dic objectForKey:@"type"] isEqualToString:@"success"]){
            ResourcesModel *resource = [[ResourcesModel alloc] initWithDictionary:[dic objectForKey:@"data"] error:nil];
            if (resource.resUrl.length > 0){
                BOOL isNeedUpdateResource = [self checkUpdate:resource.resVersion];
                if (isNeedUpdateResource){
                    [self downloadZipFiles:resource.resUrl withBlock:^(BOOL finish) {
                        if (finish){
                            BOOL releaseResult = [self releaseZipFiles];
                            if (releaseResult){
                                self.resource = resource;
                                config = [NSMutableDictionary new];
                                [config setObject:self.resource.appVersion forKey:@"appVersion"];
                                [config setObject:self.resource.resVersion forKey:@"resVersion"];
                                [config writeToFile:[DOCUMENT_PATH stringByAppendingString:@"/config.plist"] atomically:YES];
                                callback(UpdateResultSuccess);
                            }else{
                                callback(UpdateResultReleaseERROR);
                            }
                        }else{
                            callback(UpdateResultDownloadERROR);
                        }
                    }];
                }else{
                    callback(UpdateResultNoUpdate);
                }
            }else{
                callback(UpdateResultGetResERROR);
            }
        }else{
            callback(UpdateResultGetResERROR);
        }
    });
}

- (BOOL)checkUpdate:(NSString *)version{
    config = [[NSMutableDictionary alloc] initWithContentsOfFile: [DOCUMENT_PATH stringByAppendingString:@"/config.plist"]];
#if DEBUG
    return YES;
#else
    return (!config || ![[config objectForKey:@"resVersion"] isEqualToString:version]);
#endif
}

- (void)downloadZipFiles:(NSString *)resUrl withBlock:(void (^)(BOOL success))success{
    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
    dispatch_async(queue, ^{
        unsigned long timeInterval = [[NSDate date] timeIntervalSince1970];
        NSString *urlStr = [NSString stringWithFormat:@"%@?rand=%lu",resUrl,timeInterval];
        NSURL *url = [NSURL URLWithString:urlStr];
        NSError *error;
        NSData *data = [NSData dataWithContentsOfURL:url options:NSDataReadingUncached error:&error];
        if (error){
            success(NO);
        }
        NSString *cachePath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) firstObject];
        resourcePath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) firstObject];
        zipPath = [cachePath stringByAppendingString:@"/tempResource.zip"];
        [data writeToFile:zipPath options:NSDataWritingAtomic error:&error];
        success(!data ? NO : YES);
    });
}

- (BOOL)releaseZipFiles{
    zip = [ZipArchive new];
    if ([zip UnzipOpenFile:zipPath]){
        NSString *resourcePath = [DOCUMENT_PATH stringByAppendingString:@"/resource"];
        BOOL ret = [zip UnzipFileTo:resourcePath overWrite:YES];
        if (ret){
            return YES;
        }else{
            [zip UnzipCloseFile];
        }
    }
    return NO;
}

@end
