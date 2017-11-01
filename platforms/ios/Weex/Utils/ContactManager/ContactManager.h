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
- (void)getContactList:(NSDictionary *)option AndBlock:(void (^)(BOOL succeed, NSArray<ContactModel *> *contactList))callback;
@end
