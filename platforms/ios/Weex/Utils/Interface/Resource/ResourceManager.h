//
//  ResourceManager.h
//  Weex
//
//  Created by 郭书智 on 2017/10/8.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ResourcesModel.h"


typedef NS_ENUM(NSInteger, UpdateResult) {
    UpdateResultGetResERROR = 0,
    UpdateResultDownloadERROR,
    UpdateResultReleaseERROR,
    UpdateResultNoUpdate,
    UpdateResultSuccess
};

typedef void(^ResourceUpdateBlock)(UpdateResult result);

@interface ResourceManager : NSObject


@property (nonatomic, strong) ResourcesModel *resource;

+ (id)sharedInstance;
- (void)updateResource:(ResourceUpdateBlock)callback;
@end
