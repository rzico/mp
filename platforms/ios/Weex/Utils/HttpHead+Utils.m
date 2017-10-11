//
//  HttpHead+Utils.m
//  Weex
//
//  Created by 郭书智 on 2017/9/26.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "HttpHead+Utils.h"
#import <SAMKeychain.h>
#import <SAMKeychainQuery.h>
#import "MD5+Util.h"
#import "ResourceManager.h"
#import "DictionaryUtil.h"

@implementation HttpHead_Utils

+ (NSDictionary*) getHttpHead
{
    static NSString *uid;
    NSString *Md5key;
    static NSString *appKey = nil;
    if (!uid){
        NSError *error=nil;
        uid = [[SAMKeychain passwordForService:SERVICE account:ACCOUNT error:&error] stringByReplacingOccurrencesOfString:@"-" withString:@ ""];
        if(!uid)
        {
            CFUUIDRef uuid = CFUUIDCreate(NULL);
            if(uuid!=NULL)
            {
                CFStringRef uuidStr = CFUUIDCreateString(NULL, uuid);
                uid = [[[NSString stringWithFormat:@"%@",uuidStr] stringByReplacingOccurrencesOfString:@"-" withString:@""] lowercaseString];
                //存储UID
                [SAMKeychain setPassword:[NSString stringWithFormat:@"%@", uid] forService:SERVICE account:ACCOUNT];
            }
        }
    }
    if (!appKey){
        ResourceManager *manager = [ResourceManager defaultManager];
        if(manager.resource.key.length > 0){
            appKey = manager.resource.key;
        }else{
            return nil;
        }
    }
    unsigned long timeInterval = [[NSDate date] timeIntervalSince1970];
    Md5key = [MD5_Util md5:[NSString stringWithFormat:@"%@%@%lu%@",uid,ApplicationID,timeInterval,appKey]];
    return   @{@"x-uid":uid,@"x-app":ApplicationID,@"x-tsp":[NSString stringWithFormat:@"%lu",timeInterval],@"x-tkn":Md5key};
}

@end
