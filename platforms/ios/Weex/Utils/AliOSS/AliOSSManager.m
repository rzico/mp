//
//  AliOSSUtils.m
//  Weex
//
//  Created by 郭书智 on 2017/10/6.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "AliOSSManager.h"
#import <AliyunOSSiOS/OSSService.h>
#import "NSString+Util.h"
#import "NSDate+Util.h"
#import "SqlLiteManager.h"
#import "NetManager.h"

NSString * const endPoint = @"http://oss-cn-shenzhen.aliyuncs.com";
OSSClient * client;

typedef void(^GetOSSDataBlock)(BOOL success);

@implementation AliOSSManager



+ (AliOSSManager *)defautManager{
    static AliOSSManager *manager;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [AliOSSManager new];
        [OSSLog disableLog];
    });
    return manager;
}

- (void)getOSSData:(GetOSSDataBlock)block{
    SqlLiteManager *manager = [SqlLiteManager defaultManager];
    SqlLiteModel *sqlData = [manager findWithUserId:@"1" AndType:@"DataCache" AndKey:@"STS" AndNeedOpen:YES];
    if (sqlData){
        AliOSSModel *ossData = [[AliOSSModel alloc] initWithString:sqlData.value error:nil];
        NSTimeInterval interval = [NSDate GetTimeIntervalFromUTCString:ossData.Expiration];
        NSLog(@"interval=%lf",3600 - interval);
        if (3600 - interval >= 2 * 60){
            NSLog(@"flushToken=YES");
            [self flushToken:block];
        }else{
            NSLog(@"flushToken=NO");
            [self initOSSClient:ossData];
            if (block){
                block(YES);
            }
        }
    }else{
        NSLog(@"firstTimeToGetToken");
        [self flushToken:block];
    }
}

- (void)flushToken:(GetOSSDataBlock)block{
    [NetManager GetHttp:HTTPAPI(@"member/oss/sts") Parameters:nil Success:^(NSURLSessionDataTask *task, id  _Nonnull responseObject) {
        if ([responseObject isKindOfClass:[NSDictionary class]]){
            if ([[responseObject objectForKey:@"type"] isEqualToString:@"success"]){
                AliOSSModel *data = [[AliOSSModel alloc] initWithDictionary:[responseObject objectForKey:@"data"] error:nil];
                SqlLiteManager *manager = [SqlLiteManager defaultManager];
                SqlLiteModel *model = [SqlLiteModel new];
                model.userId = @"1";
                model.type = @"DataCache";
                model.key = @"STS";
                model.value = [data toJSONString];
                model.sort = @"";
                NSUInteger saveId = [manager save:model];
                NSLog(@"saveId = %tu",saveId);
                [self initOSSClient:data];
                if (block){
                    block(YES);
                }

            }
        }
    } andFalse:^(NSURLSessionDataTask *task, NSError * _Nonnull error) {
        NSLog(@"error=%@",error);
        block(NO);
    }];
}

- (void)initOSSClient:(AliOSSModel *)data{
    id<OSSCredentialProvider> credential = [[OSSStsTokenCredentialProvider alloc] initWithAccessKeyId:data.AccessKeyId secretKeyId:data.AccessKeySecret securityToken:data.SecurityToken];
    
    OSSClientConfiguration *config = [OSSClientConfiguration new];
    config.maxRetryCount = 2;
    config.timeoutIntervalForRequest = 30;
    config.timeoutIntervalForResource = 24 * 60 * 60;
    
    client = [[OSSClient alloc] initWithEndpoint:endPoint credentialProvider:credential clientConfiguration:config];
}

- (void)uploadObjectAsyncWithPath:(NSString *)path AndBlock:(AliOSSUploadBlock)block{
    [self getOSSData:^(BOOL success) {
        if (success){
            OSSPutObjectRequest * put = [OSSPutObjectRequest new];
            
            // required fields
            
            NSString *date = [NSDate DateWithFormat:@"yyyy/MM/dd"];
            NSString *uuid = [NSString getUUID];
            
            
            NSURL *fileUrl = [NSURL URLWithString:path];
            put.bucketName = @"rzico";
            put.objectKey = [NSString stringWithFormat:@"upload/images/%@/%@.%@",date,uuid,[fileUrl pathExtension]];
            put.uploadingFileURL = [NSURL URLWithString:path];
            
            // optional fields
            put.uploadProgress = ^(int64_t bytesSent, int64_t totalByteSent, int64_t totalBytesExpectedToSend) {
//                NSLog(@"%lld, %lld, %lld", bytesSent, totalByteSent, totalBytesExpectedToSend);
            };
            put.contentType = @"";
            put.contentMd5 = @"";
            put.contentEncoding = @"";
            put.contentDisposition = @"";
            
            OSSTask * putTask = [client putObject:put];
            
            [putTask continueWithBlock:^id(OSSTask *task) {
                if (!task.error) {
                    NSLog(@"upload object success!");
                    if (block){
                        block([NSString stringWithFormat:@"http://cdn.rzico.com/%@",put.objectKey]);
                    }
                } else {
                    NSLog(@"upload object failed, error: %@" , task.error);
                    if (block){
                        block(nil);
                    }
                }
                return nil;
            }];
        }else{
            if (block){
                block(nil);
            }
        }
    }];
}


@end
