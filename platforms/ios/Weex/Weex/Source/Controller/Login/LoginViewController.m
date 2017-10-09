//
//  LoginViewController.m
//  Weex
//
//  Created by 郭书智 on 2017/10/7.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "LoginViewController.h"

@interface LoginViewController ()

@end

@implementation LoginViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

+ (LoginViewController *)initWithUrl:(NSString *)url{
    static LoginViewController *loginViewController;
    if (!loginViewController){
        loginViewController = [[LoginViewController alloc] init];
        loginViewController.url = [NSURL URLWithString:url];
        [loginViewController render:nil];
    }
    return loginViewController;
}

@end
