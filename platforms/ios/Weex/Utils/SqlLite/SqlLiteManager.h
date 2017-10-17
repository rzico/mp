//
//  SqlLiteManager.h
//  Weex
//
//  Created by 郭书智 on 2017/10/11.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SqlLiteModel.h"
#import "OptionModel.h"

@interface SqlLiteManager : NSObject

+ (SqlLiteManager *)defaultManager;
- (NSUInteger)save:(SqlLiteModel *)model;
- (SqlLiteModel *)findWithUserId:(NSString *)userId AndType:(NSString *)type AndKey:(NSString *)key AndNeedOpen:(BOOL)needOpen;
- (NSArray *)findListWithUserId:(NSString *)userId AndOption:(OptionModel *)option;
- (BOOL)deleteWithUserId:(NSString *)userId AndType:(NSString *)type AndKey:(NSString *)key;
@end
