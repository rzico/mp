//
//  HomeViewController.m
//  Weex
//
//  Created by 郭书智 on 2017/9/13.
//  Copyright © 2017年 rzico. All rights reserved.
//

#import "HomeViewController.h"


@interface HomeViewController ()

@end

@implementation HomeViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.weexHeight = self.view.frame.size.height - 49;
    
    if (@available(iOS 11.0, *)) {
        self.additionalSafeAreaInsets = UIEdgeInsetsZero;
        self.frame = CGRectMake(0, -20, self.view.frame.size.width, self.weexHeight + 20);
    } else {
        // Fallback on earlier versions
        self.frame = CGRectMake(0, 0, self.view.frame.size.width, self.weexHeight);
    }
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
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
