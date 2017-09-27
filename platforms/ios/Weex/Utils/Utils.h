//
//  Utils.h
//  Weex
//
//  Created by 郭书智 on 2017/9/26.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#ifndef Utils_h
#define Utils_h

//宏定义简单的ALERT用法
#define ALERT(msg)    if (![[UIApplication sharedApplication].delegate window].rootViewController.presentedViewController) {UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"" message:msg preferredStyle:UIAlertControllerStyleAlert];UIAlertAction * Sure = [UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {}];[alert addAction:Sure];[[[UIApplication sharedApplication].delegate window].rootViewController presentViewController:alert animated:YES completion:nil];}


#endif /* Utils_h */

@interface Utils : NSObject

@end
