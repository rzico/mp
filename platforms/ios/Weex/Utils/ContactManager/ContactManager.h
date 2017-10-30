//
//  ContactManager.h
//  Weex
//
//  Created by macOS on 2017/10/28.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ContactModel.h"

@interface ContactManager : NSObject

+ (id)sharedInstance;
- (void)getContactsList:(NSDictionary *)option AndBlock:(void (^)(NSArray<ContactModel *> *contactList))callback;
@end
