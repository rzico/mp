//
//  OptionModel.h
//  Weex
//
//  Created by 郭书智 on 2017/10/12.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JSONAPI.h>

@interface OptionModel : JSONModel

@property (nonatomic, copy) NSString *type;
@property (nonatomic, copy) NSString *keyword;
@property (nonatomic, copy) NSString *orderBy;
@property (nonatomic, assign) NSUInteger current;
@property (nonatomic, assign) NSUInteger pageSize;

@end
