//
//  MemberViewController.m
//  Weex
//
//  Created by 郭书智 on 2017/9/13.
//  Copyright © 2017年 rzico. All rights reserved.
//

#import "MemberViewController.h"

@interface MemberViewController ()

@end

@implementation MemberViewController

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

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
