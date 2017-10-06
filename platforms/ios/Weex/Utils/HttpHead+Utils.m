//
//  HttpHead+Utils.m
//  Weex
//
//  Created by 郭书智 on 2017/9/26.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "HttpHead+Utils.h"
#import <SSKeychain.h>
#import <SSKeychainQuery.h>
#import "MD5+Util.h"
#import "ResourcesModel.h"
#import "DictionaryUtil.h"

@implementation HttpHead_Utils

+ (NSDictionary*) getHttpHead
{
    __block NSString *uid = [NSString string];
    __block NSString *Md5key = [NSString string];
    static NSString *appKey = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        NSError *error=nil;
        uid = [[SSKeychain passwordForService:SERVICE account:ACCOUNT error:&error] stringByReplacingOccurrencesOfString:@"-" withString:@ ""];
        if([error code] == SSKeychainErrorNotFound )
        {
            CFUUIDRef uuid = CFUUIDCreate(NULL);
            if(uuid!=NULL)
            {
                CFStringRef uuidStr = CFUUIDCreateString(NULL, uuid);
                uid = [[[NSString stringWithFormat:@"%@",uuidStr] stringByReplacingOccurrencesOfString:@"-" withString:@""] lowercaseString];
                //存储UID
                [SSKeychain setPassword:[NSString stringWithFormat:@"%@", uid] forService:SERVICE account:ACCOUNT];
            }
        }
    });
    if (!appKey){
        NSData *data = [NSData dataWithContentsOfURL:[NSURL URLWithString:HTTPAPI(@"common/resources")]];
        NSDictionary *dic = [DictionaryUtil dictionaryWithJsonData:data];
        if (dic && [[dic objectForKey:@"type"] isEqualToString:@"success"]){
            ResourcesModel *resource = [[ResourcesModel alloc] initWithDictionary:[dic objectForKey:@"data"] error:nil];
            appKey = resource.key;
        }else{
            return nil;
        }
    }
    unsigned long timeInterval = [[NSDate date] timeIntervalSince1970];
    Md5key = [MD5_Util md5:[NSString stringWithFormat:@"%@%@%lu%@",uid,ApplicationID,timeInterval,appKey]];
    return   @{@"x-uid":uid,@"x-app":ApplicationID,@"x-tsp":[NSString stringWithFormat:@"%lu",timeInterval],@"x-tkn":Md5key};
}

@end
