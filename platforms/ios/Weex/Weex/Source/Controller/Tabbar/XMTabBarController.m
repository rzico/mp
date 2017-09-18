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
#import <WeexSDK/WXRootViewController.h>

@interface XMTabBarController ()

@end

@implementation XMTabBarController

- (void) viewDidLoad{
    [super viewDidLoad];
    
    HomeViewController *vc0 = [HomeViewController new];
    vc0.url = [NSURL URLWithString:[NSString stringWithFormat:@"file://%@/bundlejs/index.js",[NSBundle mainBundle].bundlePath]];
    [vc0 render:nil];
    
    FriendsViewController *vc1 = [FriendsViewController new];
    vc1.url = [NSURL URLWithString:[NSString stringWithFormat:@"file://%@/friends.js",[NSBundle mainBundle].bundlePath]];
    [vc1 render:nil];
    
    HomeViewController *vc2 = [HomeViewController new];
    vc2.url = [NSURL URLWithString:[NSString stringWithFormat:@"file://%@/bundlejs/index.js",[NSBundle mainBundle].bundlePath]];
    [vc2 render:nil];
    
    MessageViewController *vc3 = [MessageViewController new];
    vc3.url = [NSURL URLWithString:[NSString stringWithFormat:@"file://%@/message.js",[NSBundle mainBundle].bundlePath]];
    [vc3 render:nil];
    
    MemberViewController *vc4 = [MemberViewController new];
    vc4.url = [NSURL URLWithString:[NSString stringWithFormat:@"file://%@/member.js",[NSBundle mainBundle].bundlePath]];
    [vc4 render:nil];
    
    self.viewControllers = @[[[WXRootViewController alloc] initWithRootViewController:vc0],
                             [[WXRootViewController alloc] initWithRootViewController:vc1],
                             [[WXRootViewController alloc] initWithRootViewController:vc2],
                             [[WXRootViewController alloc] initWithRootViewController:vc3],
                             [[WXRootViewController alloc] initWithRootViewController:vc4]
                             ];
    
    
    [self setupTabBar];
}

- (void)viewWillLayoutSubviews{
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
    
    [[UITabBar appearance] setBackgroundImage:[[UIImage alloc] init]];
    [[UITabBar appearance] setBackgroundColor:[UIColor whiteColor]];
    [[UITabBar appearance] setShadowImage:[UIImage imageNamed:@"tapbar_top_line"]];
    
    
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
    UIActionSheet *sheet = [[UIActionSheet alloc]initWithTitle:@"" delegate:nil cancelButtonTitle:@"取消" destructiveButtonTitle:nil otherButtonTitles:@"相机",@"相册", nil];
    [sheet showInView:self.view];
}

- (void)didReceiveMemoryWarning{
    
}

@end
