//
//  RSAModel.h
//  Weex
//
//  Created by 郭书智 on 2017/10/9.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JSONModel.h>

@interface PublicKeyModel : JSONModel

@property (nonatomic, copy) NSString *modulus;
@property (nonatomic, copy) NSString *exponent;
@property (nonatomic, copy) NSString *BASE64;

@end
