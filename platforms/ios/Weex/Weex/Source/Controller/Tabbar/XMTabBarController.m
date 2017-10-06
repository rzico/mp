//
//  XMTabBarController.m
//  Weex
//
//  Created by 郭书智 on 2017/9/12.
//  Copyright © 2017年 rzico. All rights reserved.
//

#import "XMTabBarController.h"
#import "HomeViewController.h"
#import "FriendsViewController.h"
#import "MessageViewController.h"
#import "MemberViewController.h"
#import "EditorViewController.h"
#import <WeexSDK/WXRootViewController.h>


@interface XMTabBarController ()

@end

@implementation XMTabBarController

- (void) viewDidLoad{
    [super viewDidLoad];
    CGRect frame;
    CGFloat width = self.view.frame.size.width;
    CGFloat weexHeight = self.view.frame.size.height - 49;
    if (@available(iOS 11.0, *)) {
        frame = CGRectMake(0, -20, width, weexHeight + 20);
    } else {
        // Fallback on earlier versions
        frame = CGRectMake(0, 0, width, weexHeight);
    }
    self.automaticallyAdjustsScrollViewInsets = NO;
    HomeViewController *homeVc = [HomeViewController new];
    homeVc.url = [NSURL URLWithString:[NSString stringWithFormat:@"file://%@/index.js",[NSBundle mainBundle].bundlePath]];
    homeVc.frame = frame;
    homeVc.weexHeight = weexHeight;
    [homeVc render:nil];
    
    FriendsViewController *friendsVc = [FriendsViewController new];
    friendsVc.url = [NSURL URLWithString:[NSString stringWithFormat:@"file://%@/deposit.js",[NSBundle mainBundle].bundlePath]];
//    friendsVc.frame = frame;
    friendsVc.weexHeight = weexHeight;
    [friendsVc render:nil];
    
    MessageViewController *messageVc = [MessageViewController new];
    messageVc.url = [NSURL URLWithString:[NSString stringWithFormat:@"file://%@/message.js",[NSBundle mainBundle].bundlePath]];
//    messageVc.frame = frame;
    messageVc.weexHeight = weexHeight;
    [messageVc render:nil];
    
    MemberViewController *memberVc = [MemberViewController new];
    memberVc.url = [NSURL URLWithString:[NSString stringWithFormat:@"file://%@/member.js",[NSBundle mainBundle].bundlePath]];
//    memberVc.frame = frame;
    memberVc.weexHeight = weexHeight;
    [memberVc render:nil];
    
    self.viewControllers = @[[[WXRootViewController alloc] initWithRootViewController:homeVc],
                             [[WXRootViewController alloc] initWithRootViewController:friendsVc],
                             [[WXRootViewController alloc] initWithRootViewController:[UIViewController new]],
                             [[WXRootViewController alloc] initWithRootViewController:messageVc],
                             [[WXRootViewController alloc] initWithRootViewController:memberVc]
                             ];
    [self setupTabBar];
}

- (void)viewWillLayoutSubviews{
    self.navigationController.navigationBarHidden = YES;
    self.edgesForExtendedLayout=UIRectEdgeNone;
    [super viewWillLayoutSubviews];
    if (!self.tabBarHeight){
        return;
    }
    
    
    self.tabBar.frame = ({
        CGRect frame = self.tabBar.frame;
        CGFloat tabBarHeight = self.tabBarHeight;
        frame.size.height = tabBarHeight;
        frame.origin.y = self.view.frame.size.height - tabBarHeight;
        frame;
    });
    
    
}

- (void)setupTabBar{
    NSArray *titleArray = [[NSArray alloc] initWithObjects:@"首页",@"好友",@"",@"消息",@"我的", nil];
    NSArray *imageArray = [[NSArray alloc] initWithObjects:@"ico_home",@"ico_friend",@"",@"ico_msg",@"ico_my", nil];
    
    [UITabBar appearance].translucent = NO;
    
    
    [self.viewControllers enumerateObjectsUsingBlock:^(UIViewController *obj, NSUInteger idx, BOOL *stop){
        [self setTabBarItem:obj Title:[titleArray objectAtIndex:idx] TitleSize:11 FontName:@"Arial" NormalImage:[imageArray objectAtIndex:idx] NormalColor:[UIColor colorWithHex:0x444444] SelectedImage:[NSString stringWithFormat:@"%@%@",[imageArray objectAtIndex:idx],@"_focus"] SelectedColor:[UIColor colorWithHex:0xffd703]];
        obj.tabBarItem.titlePositionAdjustment = UIOffsetMake(0, -4);
        
        if (self.viewControllers.count % 2 == 1){
            if (idx == self.viewControllers.count / 2){
                obj.tabBarItem.enabled = NO;
            }
        }
    }];
    
    if (self.viewControllers.count % 2 == 1){
        UIButton *button = [[UIButton alloc]initWithFrame:CGRectMake([UIScreen mainScreen].bounds.size.width/2-30 , -12, 60, 60)];
        
        button.layer.cornerRadius = 30;
        button.layer.masksToBounds = YES;
        
        [button setBackgroundColor:[UIColor whiteColor]];
        button.imageView.contentMode = UIViewContentModeScaleAspectFit;
        [button setImage:[UIImage imageNamed:@"ico_add"] forState:UIControlStateNormal];
        [self.tabBar addSubview:button];
        [self.tabBar bringSubviewToFront:button];
        [button addTarget:self action:@selector(selectImagePicker) forControlEvents:UIControlEventTouchUpInside];
    }
    
    
    NSMutableDictionary *normalAttrs = [NSMutableDictionary dictionary];
    NSMutableDictionary *selectedAttrs = [NSMutableDictionary dictionary];
        normalAttrs[NSForegroundColorAttributeName] = (self.normalColor == NULL ? [UIColor grayColor] : self.normalColor);
        selectedAttrs[NSForegroundColorAttributeName] = (self.selectedColor == NULL ? [UIColor blueColor] : self.selectedColor);
    UITabBarItem *tabBar = [UITabBarItem appearance];
    [tabBar setTitleTextAttributes:normalAttrs forState:UIControlStateNormal];
    [tabBar setTitleTextAttributes:selectedAttrs forState:UIControlStateSelected];
    
    
    [self.tabBar setBackgroundImage:[UIImage new]];
    [self.tabBar setBackgroundColor:[UIColor whiteColor]];
    [self.tabBar setShadowImage:[UIImage imageNamed:@"tapbar_top_line"]];
}

- (void)setTabBarItem:(UIViewController *)tabBarViewController
                Title:(NSString *)title
            TitleSize:(CGFloat)size
             FontName:(NSString *)fontName
          NormalImage:(NSString *)normalImage
          NormalColor:(UIColor *)normalColor
        SelectedImage:(NSString *)selectedImage
        SelectedColor:(UIColor *)selectedColor{
    
    UITabBarItem *tabBarItem = tabBarViewController.tabBarItem;
    
    [tabBarItem setTitle:title];
    
    tabBarItem = [tabBarItem initWithTitle:title
                                     image:[[UIImage imageNamed:normalImage] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal]
                             selectedImage:[[UIImage imageNamed:selectedImage] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal]];
    
    [tabBarItem setTitleTextAttributes:@{NSForegroundColorAttributeName:normalColor,NSFontAttributeName:[UIFont fontWithName:fontName size:size]} forState:UIControlStateNormal];
    [tabBarItem setTitleTextAttributes:@{NSForegroundColorAttributeName:selectedColor,NSFontAttributeName:[UIFont fontWithName:fontName size:size]} forState:UIControlStateSelected];
    
}


- (void)selectImagePicker {
    EditorViewController *editorVc = [EditorViewController new];
    editorVc.url = [NSURL URLWithString:[NSString stringWithFormat:@"file://%@/editor.js",[NSBundle mainBundle].bundlePath]];
    [editorVc render:nil];
    [[self navigationController] pushViewController:editorVc animated:YES];
}

- (void)didReceiveMemoryWarning{
    
}

- (void)presentScanVC{
    
}
@end
