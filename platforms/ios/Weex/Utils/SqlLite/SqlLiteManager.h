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
- (BOOL)save:(SqlLiteModel *)model;
- (SqlLiteModel *)findWithUserId:(NSUInteger)userId AndType:(NSUInteger)type AndKey:(NSString *)key AndNeedOpen:(BOOL)needOpen;
- (NSArray *)findListWithUserId:(NSUInteger)userId AndOption:(OptionModel *)option;
- (BOOL)deleteWithUserId:(NSUInteger)userId AndType:(NSUInteger)type AndKey:(NSString *)key;
@end
