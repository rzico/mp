//
//  PublicKeyManager.h
//  Weex
//
//  Created by 郭书智 on 2017/10/9.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DDRSAWrapper.h"

typedef void(^encryptCallBack)(NSString *result);

@interface PublicKeyManager : NSObject

+ (void)encrypt:(NSString *)data withCallBack:(encryptCallBack)callBack;

@end
