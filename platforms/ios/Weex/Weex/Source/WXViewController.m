/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

#import "WXViewController.h"
#import <WeexSDK/WXSDKInstance.h>
#import <WeexSDK/WXSDKEngine.h>
#import <WeexSDK/WXUtility.h>
#import <WeexSDK/WXDebugTool.h>
#import <WeexSDK/WXSDKManager.h>
#import "Define.h"
#import "WXPrerenderManager.h"
#import "WXMonitor.h"
#import "WXTracingManager.h"

@interface WXViewController () <UIScrollViewDelegate, UIWebViewDelegate>
@property (nonatomic, strong) WXSDKInstance *instance;
@property (nonatomic, strong) UIView *weexView;

@property (nonatomic, strong) UIView *backView;

@property (nonatomic, strong) NSArray *refreshList;
@property (nonatomic, strong) NSArray *refreshList1;
@property (nonatomic, strong) NSArray *refresh;
@property (nonatomic) NSInteger count;


@property (nonatomic, weak) id<UIScrollViewDelegate> originalDelegate;

@end

@implementation WXViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    self.automaticallyAdjustsScrollViewInsets = NO;
    [self configureClearNavBar];
    self.view.backgroundColor = [UIColor whiteColor];
    [self.view setClipsToBounds:YES];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(notificationRefreshInstance:) name:@"RefreshInstance" object:nil];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:YES];
    [self updateInstanceState:WeexInstanceAppear];
}

- (void)viewDidDisappear:(BOOL)animated
{
    [super viewDidDisappear:animated];
    [self updateInstanceState:WeexInstanceDisappear];
}

- (void)viewWillDisappear:(BOOL)animated{
    if (@available(iOS 11.0, *)) {
        // 设置允许摇一摇功能
        [UIApplication sharedApplication].applicationSupportsShakeToEdit = NO;
    }
    [super viewWillDisappear:animated];
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.navigationController.navigationBarHidden = YES;
    if (@available(iOS 11.0, *)) {
        // 设置允许摇一摇功能
        [UIApplication sharedApplication].applicationSupportsShakeToEdit = YES;
        [self becomeFirstResponder];
    }
}

- (void)motionEnded:(UIEventSubtype)motion withEvent:(UIEvent *)event {
    if (event.subtype == UIEventSubtypeMotionShake) { // 判断是否是摇动结束
        if (@available(iOS 11.0, *)) {
            [self render:nil];
        }
    }
    return;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)dealloc
{
    
    [_instance destroyInstance];
#ifdef DEBUG
    [_instance forceGarbageCollection];
#endif
    
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)render:(completion)complete
{
    [_instance destroyInstance];
    _instance = [[WXSDKInstance alloc] init];
    if([WXPrerenderManager isTaskExist:[self.url absoluteString]]){
        _instance = [WXPrerenderManager instanceFromUrl:self.url.absoluteString];
    }
    
    _instance.viewController = self;
    
    if (self.frame.size.height > 0){
        _instance.frame = self.frame;
    }else{
        _instance.frame = self.view.bounds;
    }
//    _instance.frame = self.view.bounds;
    
    
    __weak typeof(self) weakSelf = self;
    _instance.onCreate = ^(UIView *view) {
        [weakSelf.weexView removeFromSuperview];
        weakSelf.weexView = view;
        [weakSelf.view addSubview:weakSelf.weexView];
        UIAccessibilityPostNotification(UIAccessibilityScreenChangedNotification, weakSelf.weexView);
    };
    _instance.onFailed = ^(NSError *error) {
#ifdef UITEST
        if ([[error domain] isEqualToString:@"1"]) {
            dispatch_async(dispatch_get_main_queue(), ^{
                NSMutableString *errMsg=[NSMutableString new];
                [errMsg appendFormat:@"ErrorType:%@\n",[error domain]];
                [errMsg appendFormat:@"ErrorCode:%ld\n",(long)[error code]];
                [errMsg appendFormat:@"ErrorInfo:%@\n", [error userInfo]];
                
                UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"render failed" message:errMsg delegate:weakSelf cancelButtonTitle:nil otherButtonTitles:@"ok", nil];
                [alertView show];
            });
        }
#endif
        if (complete!=nil){
            complete(false);
        }
    };
    
    _instance.renderFinish = ^(UIView *view) {
        WXLogDebug(@"%@", @"Render Finish...");
        [weakSelf updateInstanceState:WeexInstanceAppear];
        if (complete!=nil){
            if (view){
                complete(true);
            }else{
                complete(false);
            }
        }
    };
    
    _instance.updateFinish = ^(UIView *view) {
        WXLogDebug(@"%@", @"Update Finish...");
        if (complete){
            if (!view){
                complete(false);
            }
        }
    };
    if (!self.url) {
        WXLogError(@"error: render url is nil");
        if (complete!=nil){
            complete(false);
        }
        return;
    }
    if([WXPrerenderManager isTaskExist:[self.url absoluteString]]){
        WX_MONITOR_INSTANCE_PERF_START(WXPTJSDownload, _instance);
        WX_MONITOR_INSTANCE_PERF_END(WXPTJSDownload, _instance);
        WX_MONITOR_INSTANCE_PERF_START(WXPTFirstScreenRender, _instance);
        WX_MONITOR_INSTANCE_PERF_START(WXPTAllRender, _instance);
        [WXPrerenderManager renderFromCache:[self.url absoluteString]];
        return;
    }
    NSURL *URL = [self testURL: [self.url absoluteString]];
    NSString *randomURL = [NSString stringWithFormat:@"%@%@random=%d",URL.absoluteString,URL.query?@"&":@"?",arc4random()];
    [_instance renderWithURL:[NSURL URLWithString:randomURL] options:@{@"bundleUrl":URL.absoluteString} data:nil];
}

- (void)updateInstanceState:(WXState)state
{
    if (_instance && _instance.state != state) {
        _instance.state = state;
        
        if (state == WeexInstanceAppear) {
            [[WXSDKManager bridgeMgr] fireEvent:_instance.instanceId ref:WX_SDK_ROOT_REF type:@"viewappear" params:nil domChanges:nil];
        }
        else if (state == WeexInstanceDisappear) {
            [[WXSDKManager bridgeMgr] fireEvent:_instance.instanceId ref:WX_SDK_ROOT_REF type:@"viewdisappear" params:nil domChanges:nil];
        }
    }
}

#pragma mark - refresh
- (void)refreshWeex
{
    [self render:nil];
}

#pragma mark - UIBarButtonItems

- (void)setupRightBarItem
{
    if ([self.url.scheme hasPrefix:@"http"]) {
        [self loadRefreshCtl];
    }
}

- (void)loadRefreshCtl {
    UIBarButtonItem *refreshButtonItem = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"reload"] style:UIBarButtonItemStylePlain target:self action:@selector(refreshWeex)];
    refreshButtonItem.accessibilityHint = @"click to reload curent page";
    self.navigationItem.rightBarButtonItem = refreshButtonItem;
}

#pragma mark - websocket
- (void)webSocketDidOpen:(SRWebSocket *)webSocket
{
    
}

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message
{
    if ([@"refresh" isEqualToString:message]) {
        [self render:nil];
    }
}

- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error
{
    
}

#pragma mark - localBundle
/*- (void)loadLocalBundle:(NSURL *)url
{
    NSURL * localPath = nil;
    NSMutableArray * pathComponents = nil;
    if (self.url) {
        pathComponents =[NSMutableArray arrayWithArray:[url.absoluteString pathComponents]];
        [pathComponents removeObjectsInRange:NSRangeFromString(@"0 3")];
        [pathComponents replaceObjectAtIndex:0 withObject:@"bundlejs"];
        
        NSString *filePath = [NSString stringWithFormat:@"%@/%@",[NSBundle mainBundle].bundlePath,[pathComponents componentsJoinedByString:@"/"]];
        localPath = [NSURL fileURLWithPath:filePath];
    }else {
        NSString *filePath = [NSString stringWithFormat:@"%@/bundlejs/index.js",[NSBundle mainBundle].bundlePath];
        localPath = [NSURL fileURLWithPath:filePath];
    }
    
    NSString *bundleUrl = [NSURL fileURLWithPath:[NSString stringWithFormat:@"%@/bundlejs/",[NSBundle mainBundle].bundlePath]].absoluteString;
     [_instance renderWithURL:localPath options:@{@"bundleUrl":bundleUrl} data:nil];
}*/

#pragma mark - load local device bundle
- (NSURL*)testURL:(NSString*)url
{
    NSRange range = [url rangeOfString:@"_wx_tpl"];
    if (range.location != NSNotFound) {
        NSString *tmp = [url substringFromIndex:range.location];
        NSUInteger start = [tmp rangeOfString:@"="].location;
        NSUInteger end = [tmp rangeOfString:@"&"].location;
        ++start;
        if (end == NSNotFound) {
            end = [tmp length] - start;
        }
        else {
            end = end - start;
        }
        NSRange subRange;
        subRange.location = start;
        subRange.length = end;
        url = [tmp substringWithRange:subRange];
    }
    return [NSURL URLWithString:url];
}

#pragma mark - notification
- (void)notificationRefreshInstance:(NSNotification *)notification {
    [self refreshWeex];
}

- (void)configureClearNavBar{
    NSArray *ver = [[UIDevice currentDevice].systemVersion componentsSeparatedByString:@"."];
    if ([[ver objectAtIndex:0] intValue] >= 7) {
        self.automaticallyAdjustsScrollViewInsets = NO;
        // 透明状态栏的延伸
        // self.edgesForExtendedLayout = UIRectEdgeNone;
        self.navigationController.navigationBar.shadowImage = [[UIImage alloc] init];
        [self.navigationController.navigationBar setBackgroundImage:[[UIImage alloc] init] forBarPosition:UIBarPositionAny barMetrics:UIBarMetricsDefault];
    }else{
        [self.navigationController.navigationBar setBackgroundImage:[[UIImage alloc] init] forBarMetrics:UIBarMetricsDefault];
    }
    self.navigationController.navigationBar.shadowImage = [[UIImage alloc] init];
}

@end
