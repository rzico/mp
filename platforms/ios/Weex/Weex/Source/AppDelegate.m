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

#import "AppDelegate.h"
#import "WXViewController.h"
#import "WXStreamModule.h"
#import "WXEventModule.h"
#import "WXNavigationDefaultImpl.h"
#import "WXImgLoaderDefaultImpl.h"
#import "Define.h"
#import "UIView+UIThreadCheck.h"
#import <WeexSDK/WeexSDK.h>
#import <AVFoundation/AVFoundation.h>
#import <ATSDK/ATManager.h>
#import "WXConfigCenterProtocol.h"
#import "WXConfigCenterDefaultImpl.h"
#import "WXURLRewriteImpl.h"

#import "WXAlbumModule.h"

#import "XMTabBarController.h"

#import "ResourceManager.h"

#import "LoginViewController.h"

#import "UIViewController+Util.h"

#import "PublicKeyManager.h"

#import "SqlLiteManager.h"

#import "NetManager.h"

#import "AliOSSManager.h"

#import "NSDate+Util.h"

#import "WXScanQRModule.h"

#import "UserManager.h"

#import "ContactManager.h"

static AFNetworkReachabilityStatus networkStatus;


@interface AppDelegate ()<UIAlertViewDelegate>
@end

@implementation AppDelegate

#pragma mark
#pragma mark application


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    NSLog(@"documentpaht=%@",DOCUMENT_PATH);
    
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.rootViewController = [UIViewController new];
    UIImageView *background = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"LaunchImage"]];
    background.frame = [UIScreen mainScreen].bounds;
    [self.window.rootViewController.view addSubview:background];
    [self.window makeKeyAndVisible];
    
    networkStatus = AFNetworkReachabilityStatusNotReachable;
    [self checkNetwork];
    
    [NSThread sleepForTimeInterval:3];
    
    [WXApi registerApp:WECHAT_APPID enableMTA:YES];
    [self initWeexSDK];
    
    
    
    
    [self startSplashScreen:^(bool finish) {
        if ([UserManager getUserId] > 0 || networkStatus == AFNetworkReachabilityStatusReachableViaWiFi || networkStatus == AFNetworkReachabilityStatusReachableViaWWAN){

//            for (UIWindow *window in [UIApplication sharedApplication].windows){
//                for (UIView *view in window.subviews){
//                    if (view.tag == 1001){
//                        [view removeFromSuperview];
//                        window.hidden = YES;
//                        NSLog(@"%d",[window isKindOfClass:NSClassFromString(@"WXWindow")]);
//                    }
//                }
//            }
            [self didLoginOrNetworkReached];
        }else{
            ALERT(@"网络不可达, 请检查网络状态");
            dispatch_async(dispatch_get_global_queue(0, 0), ^{
                while (!(networkStatus == AFNetworkReachabilityStatusReachableViaWiFi || networkStatus == AFNetworkReachabilityStatusReachableViaWWAN)) {
                    
                }
                [self didLoginOrNetworkReached];
            });
        }
    }];
//    [[AliOSSManager defautManager] uploadObjectAsyncWithPath:[[NSBundle mainBundle].bundlePath stringByAppendingPathComponent:@"photo.jpg"] AndBlock:^(NSString *url) {
//        NSLog(@"upload=%@",url);
//    }];
    
    
    
#if DEBUG
    // check if there are any UI changes on main thread.
    [UIView wx_checkUIThread];
#endif
    return YES;
}

- (void)didLoginOrNetworkReached{
    ResourceManager *manager = [ResourceManager sharedInstance];
    [manager updateResource:^(UpdateResult result) {
        if (result == UpdateResultSuccess || result == UpdateResultNoUpdate){
            [NetManager GetHttp:HTTPAPI(@"login/isAuthenticated") Parameters:nil Success:^(NSURLSessionDataTask * _Nonnull task, id  _Nonnull responseObject) {
                if (responseObject && [responseObject isKindOfClass:[NSDictionary class]]){
                    if ([[responseObject objectForKey:@"type"] isEqualToString:@"success"]){
                        [UserManager setUser:[responseObject objectForKey:@"data"]];
                    }
                }
            } andFalse:^(NSURLSessionDataTask * _Nonnull task, NSError * _Nonnull error) {
                
            }];
            //通知主线程刷新
            dispatch_async(dispatch_get_main_queue(), ^{
                //回调或者说是通知主线程刷新，
                XMTabBarController *tabbar = [XMTabBarController new];
                tabbar.tabBarHeight = 49;
                
                self.window.rootViewController = tabbar;
                [self.window makeKeyAndVisible];
            });
        }else{
            switch (result) {
                case UpdateResultGetResERROR:
                    NSLog(@"获取资源信息失败");
                    break;
                case UpdateResultDownloadERROR:
                    NSLog(@"下载资源数据失败");
                    break;
                case UpdateResultReleaseERROR:
                    NSLog(@"解压资源失败");
                    break;
                default:
                    break;
            }
        }
    }];
}


- (void)presentLoginViewController{
    LoginViewController *loginViewController = [LoginViewController initWithUrl:[NSString stringWithFormat:@"file://%@/resource/view/index.js",DOCUMENT_PATH]];
    UINavigationController *loginNav = [[UINavigationController alloc] initWithRootViewController:loginViewController];
    [self.window.rootViewController presentViewController:loginNav animated:YES completion:nil];
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    
#ifdef UITEST
#if !TARGET_IPHONE_SIMULATOR
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    setenv("GCOV_PREFIX", [documentsDirectory cStringUsingEncoding:NSUTF8StringEncoding], 1);
    setenv("GCOV_PREFIX_STRIP", "6", 1);
#endif
    extern void __gcov_flush(void);
    __gcov_flush();
#endif
}

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
//    NSString *newUrlStr = url.absoluteString;
//    if([url.scheme isEqualToString:@"wxpage"]) {
//        newUrlStr = [newUrlStr stringByReplacingOccurrencesOfString:@"wxpage://" withString:@"http://"];
//    }
//    UIViewController * viewController = [self demoController];
//    ((WXViewController*)viewController).url = [NSURL URLWithString:newUrlStr];
//    [(WXRootViewController*)self.window.rootViewController pushViewController:viewController animated:YES];
//    return YES;
    return [WXApi handleOpenURL:url delegate:self];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation{
    return [WXApi handleOpenURL:url delegate:self];
}

- (void) onReq:(BaseReq *)req{
    [WXApi sendReq:req];
}

- (void) onResp:(BaseResp *)resp{
    if ([resp isKindOfClass:[SendAuthResp class]]){
        SendAuthResp *aresp = (SendAuthResp *)resp;
        if (self.wxAuthComplete){
            self.wxAuthComplete(aresp);
        }
    }
//    [WXApi sendResp:resp];
}

#pragma mark weex
- (void)initWeexSDK
{
    [WXAppConfiguration setAppGroup:@"AliApp"];
    [WXAppConfiguration setAppName:@"WeexDemo"];
    [WXAppConfiguration setExternalUserAgent:@"ExternalUA"];
    
    [WXSDKEngine initSDKEnvironment];
    
    [WXSDKEngine registerHandler:[WXImgLoaderDefaultImpl new] withProtocol:@protocol(WXImgLoaderProtocol)];
    [WXSDKEngine registerHandler:[WXEventModule new] withProtocol:@protocol(WXEventModuleProtocol)];
    [WXSDKEngine registerHandler:[WXConfigCenterDefaultImpl new] withProtocol:@protocol(WXConfigCenterProtocol)];
    [WXSDKEngine registerHandler:[[NSClassFromString(@"WXNetworkDefaultImpl") class] new] withProtocol:@protocol(WXResourceRequestHandler)];
    [WXSDKEngine registerHandler:[WXURLRewriteImpl new] withProtocol:@protocol(WXURLRewriteProtocol)];
    
    [WXSDKEngine registerComponent:@"select" withClass:NSClassFromString(@"WXSelectComponent")];
    [WXSDKEngine registerModule:@"event" withClass:[WXEventModule class]];
    [WXSDKEngine registerModule:@"album" withClass:[WXAlbumModule class]];
    [WXSDKEngine registerModule:@"modal" withClass:NSClassFromString(@"WXModalModule")];
    [WXSDKEngine registerModule:@"weexScanQR" withClass:[WXScanQRModule class]];
    
#ifdef DEBUG
    [WXDebugTool setDebug:YES];
    [WXLog setLogLevel:WXLogLevelError];
#else
    [WXDebugTool setDebug:NO];
    [WXLog setLogLevel:WXLogLevelOff];
#endif
    
}

#pragma mark 
#pragma mark animation when startup

//failure:(void (^)(NSURLSessionDataTask *task, NSError *error))failure
- (void)startSplashScreen:(void (^)(bool finish))finish
{
    UIView* splashView = [[UIView alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    splashView.backgroundColor = WEEX_COLOR;
    
    UIImageView *iconImageView = [UIImageView new];
    UIImage *icon = [UIImage imageWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"weex-icon" ofType:@"png"]];
    if ([icon respondsToSelector:@selector(imageWithRenderingMode:)]) {
        iconImageView.image = [icon imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate];
        iconImageView.tintColor = [UIColor whiteColor];
    } else {
        iconImageView.image = icon;
    }
    iconImageView.frame = CGRectMake(0, 0, 320, 320);
    iconImageView.contentMode = UIViewContentModeScaleAspectFit;
    iconImageView.center = splashView.center;
    [splashView addSubview:iconImageView];
    
    [self.window addSubview:splashView];
    
    float animationDuration = 1.4;
    CGFloat shrinkDuration = animationDuration * 0.3;
    CGFloat growDuration = animationDuration * 0.7;
    
    if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0) {
        [UIView animateWithDuration:shrinkDuration delay:1.0 usingSpringWithDamping:0.7f initialSpringVelocity:10 options:UIViewAnimationOptionCurveEaseInOut animations:^{
            CGAffineTransform scaleTransform = CGAffineTransformMakeScale(0.75, 0.75);
            iconImageView.transform = scaleTransform;
        } completion:^(BOOL finished) {
            [UIView animateWithDuration:growDuration animations:^{
                CGAffineTransform scaleTransform = CGAffineTransformMakeScale(20, 20);
                iconImageView.transform = scaleTransform;
                splashView.alpha = 0;
            } completion:^(BOOL finished) {
                [splashView removeFromSuperview];
                if (finish){
                    finish(YES);
                }
            }];
        }];
    } else {
        [UIView animateWithDuration:shrinkDuration delay:1.0 options:0 animations:^{
            CGAffineTransform scaleTransform = CGAffineTransformMakeScale(0.75, 0.75);
            iconImageView.transform = scaleTransform;
        } completion:^(BOOL finished) {
            [UIView animateWithDuration:growDuration animations:^{
                CGAffineTransform scaleTransform = CGAffineTransformMakeScale(20, 20);
                iconImageView.transform = scaleTransform;
                splashView.alpha = 0;
            } completion:^(BOOL finished) {
                [splashView removeFromSuperview];
            }];
        }];
    }
}

#pragma mark

- (void)checkUpdate {
    __weak typeof(self) weakSelf = self;
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        NSDictionary *infoDic = [[NSBundle mainBundle] infoDictionary];
        NSString *currentVersion = [infoDic objectForKey:@"CFBundleShortVersionString"];
        NSString *URL = @"http://itunes.apple.com/lookup?id=1130862662";
        NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
        [request setURL:[NSURL URLWithString:URL]];
        [request setHTTPMethod:@"POST"];
        
        NSHTTPURLResponse *urlResponse = nil;
        NSError *error = nil;
        NSData *recervedData = [NSURLConnection sendSynchronousRequest:request returningResponse:&urlResponse error:&error];
        NSString *results = [[NSString alloc] initWithBytes:[recervedData bytes] length:[recervedData length] encoding:NSUTF8StringEncoding];
        
        NSDictionary *dic = [WXUtility objectFromJSON:results];
        NSArray *infoArray = [dic objectForKey:@"results"];
        
        if ([infoArray count]) {
            NSDictionary *releaseInfo = [infoArray objectAtIndex:0];
            weakSelf.latestVer = [releaseInfo objectForKey:@"version"];
            if ([weakSelf.latestVer floatValue] > [currentVersion floatValue]) {
                if (![[NSUserDefaults standardUserDefaults] boolForKey: weakSelf.latestVer]) {
                    [[NSUserDefaults standardUserDefaults] setBool:FALSE forKey:weakSelf.latestVer];
                    dispatch_async(dispatch_get_main_queue(), ^{
                        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"New Version" message:@"Will update to a new version" delegate:self cancelButtonTitle:@"cancel" otherButtonTitles:@"update", nil];
                        [alert show];
                    });
                }
            }
        }
    });
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
    switch (buttonIndex) {
        case 0:
            [[NSUserDefaults standardUserDefaults] setBool:TRUE forKey:self.latestVer];
            break;
        case 1:
            [[UIApplication sharedApplication]openURL:[NSURL URLWithString:@"itms-apps://itunes.apple.com/cn/app/weex-playground/id1130862662?mt=8"]];
        default:
            break;
    }
    [alertView dismissWithClickedButtonIndex:buttonIndex animated:YES];
}


- (void)checkNetwork{
    AFNetworkReachabilityManager *manager = [AFNetworkReachabilityManager sharedManager];
    [manager startMonitoring];
    [manager setReachabilityStatusChangeBlock:^(AFNetworkReachabilityStatus status) {
        networkStatus = status;
        switch (status) {
            case AFNetworkReachabilityStatusUnknown:
                NSLog(@"网络状态未知");
                break;
            case AFNetworkReachabilityStatusNotReachable:
                NSLog(@"网络不可达");
                break;
            case AFNetworkReachabilityStatusReachableViaWiFi:
                NSLog(@"WiFi网络");
                break;
            case AFNetworkReachabilityStatusReachableViaWWAN:
                NSLog(@"移动网络");
                break;
            default:
                break;
        }
    }];
}
@end
