//
//  ContactManager.m
//  Weex
//
//  Created by macOS on 2017/10/28.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "ContactManager.h"
#import <LJContactManager.h>

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

- (void)getContactsList:(NSDictionary *)option AndBlock:(void (^)(NSArray<ContactModel *> *contactList))callback{
    NSMutableArray<ContactModel *> *dataArray = [NSMutableArray<ContactModel *> new];
    [[LJContactManager sharedInstance] accessContactsComplection:^(BOOL succeed, NSArray<LJPerson *> *contacts) {
        if (succeed){
            
        }else{
            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"温馨提示" message:@"您的通讯录暂未允许访问，请去设置->隐私里面授权!" delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"确定", nil];
            [alert show];
            callback(nil);
        }
    }];
}

- (void)alertView:(UIAlertView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex{
    if (buttonIndex == 1){
        NSLog(@"%zd",buttonIndex);
        if ([[[UIDevice currentDevice] systemVersion] floatValue] < 10.0){
            NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
            [[UIApplication sharedApplication] openURL:url];
        }else{
            NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
            [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString] options:@{} completionHandler:^(BOOL success) {
                NSLog(@"success");
            }];
        }
    }
}

@end
