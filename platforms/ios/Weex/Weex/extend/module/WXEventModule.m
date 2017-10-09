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

#import "WXEventModule.h"
#import "WXViewController.h"
#import <WeexSDK/WXBaseViewController.h>
#import "WXViewController.h"
#import "WXConfigModel.h"
#import "DictionaryUtil.h"
#import "AppDelegate.h"
#import "IWXToast.h"

static WXModuleCallback back;

@implementation WXEventModule

@synthesize weexInstance;

static int WX_ERR_OK = 0;//用户同意
static int WX_ERR_AUTH_DENIED = -4;//用户拒绝授权
static int WX_ERR_USER_CANCEL = -2;//用户取消

WX_EXPORT_METHOD(@selector(openURL:))
WX_EXPORT_METHOD(@selector(openURL:callback:))
WX_EXPORT_METHOD(@selector(closeURL))
WX_EXPORT_METHOD(@selector(closeURL:))
WX_EXPORT_METHOD(@selector(fireNativeGlobalEvent:callback:))
WX_EXPORT_METHOD_SYNC(@selector(wxConfig))
WX_EXPORT_METHOD_SYNC(@selector(changeWindowsBar))
WX_EXPORT_METHOD(@selector(wxAuth:))
WX_EXPORT_METHOD(@selector(toast:))


- (void)openURL:(NSString *)url
{
    NSString *newURL = url;
    if ([url hasPrefix:@"//"]) {
        newURL = [NSString stringWithFormat:@"http:%@", url];
    } else if (![url hasPrefix:@"http"]) {
        // relative path
        newURL = [NSURL URLWithString:url relativeToURL:weexInstance.scriptURL].absoluteString;
    }
    
#ifdef DEBUG
    newURL = [newURL stringByReplacingOccurrencesOfString:@"http://var/examples/build/" withString:[NSString stringWithFormat:@"file://%@/bundlejs/",[NSBundle mainBundle].bundlePath]];
#endif
    
    NSLog(@"%@",newURL);
    
    WXViewController *controller = [WXViewController new];
    controller.url = [NSURL URLWithString:newURL];
    [controller render:^(BOOL finished){
        NSLog(@"render result = %d",finished);
        if (finished){
            controller.hidesBottomBarWhenPushed = YES;
            [[weexInstance.viewController navigationController] pushViewController:controller animated:YES];
        }
    }];
}

- (void)openURL:(NSString *)url callback:(WXModuleCallback)callback{
    back = callback;
    [self openURL:url];
}


- (void)closeURL{
    UINavigationController *nav = [weexInstance.viewController navigationController];
    if (nav.viewControllers.count > 1){
        [nav popViewControllerAnimated:YES];
    }else{
        [weexInstance.viewController dismissViewControllerAnimated:YES completion:nil];
    }
}

- (void)closeURL:(NSDictionary *)dic{
    [self closeURL];
    if (back){
        back(dic);
        back = nil;
    }
}
/**
 a test method for macaca case, you can fire globalEvent when download finish、device shaked and so on.
 @param event event name
 */
- (void)fireNativeGlobalEvent:(NSString *)event callback:(WXModuleCallback)callback
{
    [weexInstance fireGlobalEvent:event params:@{@"eventParam":@"eventValue"}];
    if (callback) {
        NSDictionary * result = @{@"ok": @true};
        callback(result);
    }
}


- (NSDictionary *)wxConfig{
    static WXConfigModel *config = nil;
    if (!config){
        config = [WXConfigModel new];
        config.color = WXCONFIG_COLOR;
        config.resourcePath = WXCONFIG_RESOURCE_PATH;
        config.interfacePath = WXCONFIG_INTERFACE_PATH;
    }
    return [DictionaryUtil objectToDictionary:config];
}

- (void)wxAuth:(WXModuleCallback)callback{
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    appDelegate.wxAuthComplete = ^(SendAuthResp *resp) {
        NSMutableDictionary *message = [NSMutableDictionary new];
        if (resp.errCode == WX_ERR_OK){
            [message setValue:@"success" forKey:@"type"];
            [message setValue:resp.code forKey:@"data"];
        }else{
            [message setValue:@"error" forKey:@"type"];
            [message setValue:[NSString stringWithFormat:@"%d",resp.errCode] forKey:@"data"];
        }
        if (callback){
            callback(message);
        }
    };

    SendAuthReq* req = [SendAuthReq new];
    req.scope = @"snsapi_userinfo" ;
    req.state = @"123" ;
    [WXApi sendReq:req];
}

- (void)changeWindowsBar{
    
}



- (void)toast:(NSString *)message{
    IWXToast *toast = [IWXToast new];
    [toast showToast:message withInstance:weexInstance];
}


@end

