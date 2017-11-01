//
//  ContactManager.m
//  Weex
//
//  Created by macOS on 2017/10/28.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "ContactManager.h"
#import <LJContactManager.h>
#import <LJPerson.h>


@interface ContactManager()<UIAlertViewDelegate>

@end

@implementation ContactManager

+ (id)sharedInstance {
    static dispatch_once_t once;
    static id instance;
    dispatch_once(&once, ^{
        instance = [self new];
    });
    return instance;
}

- (void)getContactList:(NSDictionary *)option AndBlock:(void (^)(BOOL succeed, NSArray<ContactModel *> *contactList))callback{
    [[LJContactManager sharedInstance] accessContactsComplection:^(BOOL succeed, NSArray<LJPerson *> *contacts) {
        if (succeed){
            NSMutableArray<ContactModel *> *contactListAll = [NSMutableArray new];
            for (long i = 0; i < contacts.count; i ++){
                for (LJPhone *phone in [contacts objectAtIndex:i].phones){
                    NSString *number = phone.phone;
                    number = [number stringByReplacingOccurrencesOfString:@"-" withString:@""];
                    number = [number stringByReplacingOccurrencesOfString:@"+86" withString:@""];
                    number = [number stringByReplacingOccurrencesOfString:@" " withString:@""];
                    if (number.length == 11){
                        ContactModel *contact = [ContactModel new];
                        contact.name = [contacts objectAtIndex:i].fullName;
                        contact.number = phone.phone;
                        [contactListAll addObject:contact];
                    }
                }
            }
            NSInteger current = [[option objectForKey:@"current"] integerValue];
            NSInteger pageSize = [[option objectForKey:@"pageSize"] integerValue];
            if (current == 0 && pageSize == 0){
                callback(YES, contactListAll);
            }else{
                NSMutableArray<ContactModel *> *contactList = [NSMutableArray new];
                NSInteger end = current + pageSize <= contactListAll.count ? current + pageSize : contactListAll.count;
                for (long i = current; i < end; i ++){
                    [contactList addObject:[contactListAll objectAtIndex:i]];
                }
                callback(YES, contactList);
            }
        }else{
            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"温馨提示" message:@"您的通讯录暂未允许访问，请去设置->隐私里面授权!" delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"确定", nil];
            [alert show];
            callback(NO, nil);
        }
    }];
}

- (void)alertView:(UIAlertView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex{
    if (buttonIndex == 1){
        if ([[[UIDevice currentDevice] systemVersion] floatValue] < 10.0){
            NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
            [[UIApplication sharedApplication] openURL:url];
        }else{
            NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
            [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:^(BOOL success) {
                NSLog(@"access=%d",success);
            }];
        }
    }
}

@end
