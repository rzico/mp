//
//  SqlLiteModel.h
//  Weex
//
//  Created by 郭书智 on 2017/10/11.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JSONModel.h>

@interface SqlLiteModel : JSONModel

@property (nonatomic, assign) NSUInteger Id;
@property (nonatomic, copy, setter=setUserId:) NSString *userId;
@property (nonatomic, copy) NSString *type;
@property (nonatomic, copy) NSString *key;
@property (nonatomic, copy) NSString *value;
@property (nonatomic, copy, setter=setSort:) NSString *sort;
@property (nonatomic, copy) NSString *keyword;
@end
