//
//  ContactModel.h
//  Weex
//
//  Created by macOS on 2017/10/28.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MD5+Util.h"
#import "ContactModel.h"

@interface ContactModel : NSObject

@property (nonatomic, copy) NSString *number;
@property (nonatomic, copy) NSString *name;
@property (nonatomic, copy) NSString *numberMd5;

@end
