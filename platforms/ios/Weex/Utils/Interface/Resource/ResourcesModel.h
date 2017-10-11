//
//  ResourcesModel.h
//  Weex
//
//  Created by 郭书智 on 2017/9/27.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JSONModel.h>

@interface ResourcesModel : JSONModel

@property (nonatomic, copy) NSString *resVersion;
@property (nonatomic, copy) NSString *resUrl;
@property (nonatomic, copy) NSString *key;
@property (nonatomic, copy) NSString *appUrl;
@property (nonatomic, copy) NSString *appVersion;

@end
