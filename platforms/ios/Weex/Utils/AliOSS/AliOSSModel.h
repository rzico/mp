//
//  AliOSSModel.h
//  Weex
//
//  Created by iMac on 2017/10/17.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JSONModel.h>

@interface AliOSSModel : JSONModel

@property (nonatomic, copy) NSString *AccessKeyId;
@property (nonatomic, copy) NSString *AccessKeySecret;
@property (nonatomic, copy) NSString *Expiration;
@property (nonatomic, copy) NSString *SecurityToken;

@end
