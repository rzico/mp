//
//  NSString+Util.m
//  Weex
//
//  Created by 郭书智 on 2017/10/10.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "NSString+Util.h"

@implementation NSString (Util)

- (BOOL)isContains:(NSString *)str{
    NSRange range = [self rangeOfString:str];
    return !(range.length == 0 && range.location > self.length);
}

- (BOOL)isContains:(NSString *)str1 and:(NSString *)str2{
    NSRange range1 = [self rangeOfString:str1];
    NSRange range2 = [self rangeOfString:str2];
    return (!(range1.length == 0 && range1.location > self.length) && !(range2.length == 0 && range2.location > self.length));
}

@end