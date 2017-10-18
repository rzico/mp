//
//  AliOSSUtils.h
//  Weex
//
//  Created by 郭书智 on 2017/10/6.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AliOSSModel.h"

typedef void(^AliOSSUploadBlock)(BOOL success);

@interface AliOSSManager : NSObject

+ (AliOSSManager *)defautManager;
- (void)uploadObjectAsyncWithPath:(NSString *)path AndBlock:(AliOSSUploadBlock)block;
@end
