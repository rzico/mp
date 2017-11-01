//
//  UserManager.m
//  Weex
//
//  Created by macOS on 2017/10/27.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "UserManager.h"

@implementation UserManager

+ (NSString *)getUserId{
    NSString *userId;
    NSDictionary *userInfo = [[NSDictionary alloc] initWithContentsOfFile:[DOCUMENT_PATH stringByAppendingPathComponent:@"user.plist"]];
    if (userInfo){
        userId = [userInfo objectForKey:@"userId"];
    }
    return userId;
}

+ (NSUInteger)getUid{
    NSNumber *uid;
    NSDictionary *userInfo = [[NSDictionary alloc] initWithContentsOfFile:[DOCUMENT_PATH stringByAppendingPathComponent:@"user.plist"]];
    if (userInfo){
        uid = [userInfo objectForKey:@"uid"];
    }
    if (uid){
        return [uid unsignedIntegerValue];
    }
    return 0;
}

+ (void)setUser:(NSDictionary *)user{
    [user writeToFile:[DOCUMENT_PATH stringByAppendingPathComponent:@"user.plist"] atomically:YES];
}

+ (void)removeUser{
    NSFileManager *manager = [NSFileManager defaultManager];
    [manager removeItemAtPath:[DOCUMENT_PATH stringByAppendingPathComponent:@"user.plist"] error:nil];
}
@end
