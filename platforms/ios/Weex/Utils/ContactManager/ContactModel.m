//
//  ContactModel.m
//  Weex
//
//  Created by macOS on 2017/10/28.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "ContactModel.h"

@implementation ContactModel

- (void)setNumber:(NSString *)number{
    _number = number;
    _numberMd5 = [MD5_Util md5:number];
}

@end
