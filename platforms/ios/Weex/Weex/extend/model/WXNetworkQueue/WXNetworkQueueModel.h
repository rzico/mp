//
//  WXNetworkQueueModel.h
//  Weex
//
//  Created by 郭书智 on 2017/10/8.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <weexsdk/WXResourceRequestHandler.h>

@interface WXNetworkQueueModel : NSObject

@property (nonatomic, strong) WXResourceRequest *request;
@property (nonatomic, strong) id<WXResourceRequestDelegate> delegate;

@end
