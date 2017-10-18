//
//  SqlLiteModel.m
//  Weex
//
//  Created by 郭书智 on 2017/10/11.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "SqlLiteModel.h"
#import "NSString+Util.h"

@implementation SqlLiteModel

- (void)setUserId:(NSString *)userId{
    _userId = !userId ? @"1" : userId;
}

- (void)setSort:(NSString *)sort{
    _sort = !sort ? @"" : sort;
}
@end
