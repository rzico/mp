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
@property (nonatomic, assign) NSUInteger userId;
@property (nonatomic, assign) NSUInteger type;
@property (nonatomic, copy) NSString *key;
@property (nonatomic, copy) NSString *value;
@property (nonatomic, assign) NSUInteger sort;
@property (nonatomic, copy) NSString *keyword;

@end
