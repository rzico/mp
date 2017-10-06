//
//  WXNativeModule.m
//  Weex
//
//  Created by 郭书智 on 2017/9/28.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "WXNativeModule.h"
#import "WXConfigModel.h"
#import "DictionaryUtil.h"
#import "AppDelegate.h"


static int WX_ERR_OK = 0;//用户同意
static int WX_ERR_AUTH_DENIED = -4;//用户拒绝授权
static int WX_ERR_USER_CANCEL = -2;//用户取消

@implementation WXNativeModule

@synthesize weexInstance;

WX_EXPORT_METHOD_SYNC(@selector(wxConfig))
WX_EXPORT_METHOD_SYNC(@selector(changeWindowsBar))
WX_EXPORT_METHOD(@selector(wxAuth:))
WX_EXPORT_METHOD(@selector(showToast:))

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
//    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
//    appDelegate.wxAuthComplete = ^(SendAuthResp *resp) {
//        NSMutableDictionary *message = [NSMutableDictionary new];
//        if (resp.errCode == WX_ERR_OK){
//            [message setValue:@"success" forKey:@"type"];
//            [message setValue:resp.code forKey:@"data"];
//        }else{
//            [message setValue:@"error" forKey:@"type"];
//            [message setValue:[NSString stringWithFormat:@"%d",resp.errCode] forKey:@"data"];
//        }
//        if (callback){
//            callback(message);
//        }
//    };
//
//    SendAuthReq* req = [SendAuthReq new];
//    req.scope = @"snsapi_userinfo" ;
//    req.state = @"123" ;
//    [WXApi sendReq:req];
    [self showToast:@"success"];
}

- (void)changeWindowsBar{
    
}



- (void)showToast:(NSString *)message{
    IWXToast *toast = [IWXToast new];
    [toast showToast:message withInstance:weexInstance];
}

@end
