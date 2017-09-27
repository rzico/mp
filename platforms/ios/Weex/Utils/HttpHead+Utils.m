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

@implementation HttpHead_Utils

+ (NSDictionary*) getHttpHead
{
    __block NSString *uid = [NSString string];
    __block NSString *Md5key = [NSString string];
    
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
    
    Md5key = [MD5_Util md5:[NSString stringWithFormat:@"%@%@%@",uid,ApplicationID,PRIVATEKEY]];
    return   @{@"x-uid":uid,@"x-app":ApplicationID,@"x-key":Md5key};
}

@end
