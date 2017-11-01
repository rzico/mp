//
//  UserManager.h
//  Weex
//
//  Created by macOS on 2017/10/27.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface UserManager : NSObject

+ (NSString *)getUserId;
+ (NSUInteger)getUid;
+ (void)setUser:(NSDictionary *)user;
+ (void)removeUser;

@end
