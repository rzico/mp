//
//  ResourceManager.h
//  Weex
//
//  Created by 郭书智 on 2017/10/8.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ResourcesModel.h"

@interface ResourceManager : NSObject

@property (nonatomic, strong) ResourcesModel *resource;

+ (ResourceManager *)defaultManager;
@end
