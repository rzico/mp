//
//  HomeViewController.m
//  Weex
//
//  Created by 郭书智 on 2017/9/13.
//  Copyright © 2017年 rzico. All rights reserved.
//

#import "HomeViewController.h"
#import "UIViewController+WXDemoNaviBar.h"

@interface HomeViewController ()

@end

@implementation HomeViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self setupNaviBar];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    self.navigationController.navigationBarHidden = NO;
//    if (self.view.frame.origin.y == 44){
//        CGRect frame = self.view.frame;
//        frame.origin.y = 64;
//        self.view.frame = frame;
//    }
}



//- (void) viewWillAppear:(BOOL)animated{
//    NSLog(@"appear");
//    if (a == 0){
//        self.url = [NSString stringWithFormat:@"file://%@/hello.js",[NSBundle mainBundle].bundlePath];
//        a = 1;
//        [self render];
//    }else{
//        self.url = @"http://cdn.rzico.com/weex/app/member/setup.js";
//        a = 0;
//        [self render];
//    }
//    [super viewWillAppear:animated];
    //self.url = [NSString stringWithFormat:@"file://%@/bundlejs/index.js",[NSBundle mainBundle].bundlePath];
    
    //    NSString *url = @"http://cdn.rzico.com/weex/app/member/setup.js";
//}
@end
