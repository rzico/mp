//
//  DictionaryUtil.h
//  Weex
//
//  Created by 郭书智 on 2017/9/20.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DictionaryUtil : NSObject

+ (NSDictionary *)objectToDictionary:(id)obj;
+ (NSString *)convertToJsonData:(NSDictionary *)dict;
+ (NSDictionary *)dictionaryWithJsonData:(NSData *)jsonData;
@end
