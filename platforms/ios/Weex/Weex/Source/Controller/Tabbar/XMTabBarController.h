//
//  XMTabBarController.h
//  Weex
//
//  Created by 郭书智 on 2017/9/12.
//  Copyright © 2017年 rzico. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface XMTabBarController : UITabBarController

@property (nonatomic, readwrite) CGFloat tabBarHeight;
@property (nonatomic, readwrite, copy) UIColor *normalColor;
@property (nonatomic, readwrite, copy) UIColor *selectedColor;

@end
