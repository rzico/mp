//
//  WXCallBackMessage.h
//  Weex
//
//  Created by 郭书智 on 2017/9/30.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface WXCallBackMessage : NSObject

@property (nonatomic, assign) BOOL type;

@property (nonatomic, copy) NSString *content;

@property (nonatomic, strong) id data;

- (NSDictionary *)getMessage;
@end
