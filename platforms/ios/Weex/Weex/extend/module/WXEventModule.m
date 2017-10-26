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
#import "PublicKeyManager.h"
#import "NSString+Util.h"
#import "SqlLiteManager.h"
#import "WXCallBackMessage.h"
#import "ZSSRichTextEditor.h"
#import "WXScannerVC.h"

static WXModuleCallback back;

@implementation WXEventModule

@synthesize weexInstance;

static const int WX_ERR_OK = 0;//用户同意
static const int WX_ERR_AUTH_DENIED = -4;//用户拒绝授权
static const int WX_ERR_USER_CANCEL = -2;//用户取消

WX_EXPORT_METHOD(@selector(openURL:))
WX_EXPORT_METHOD(@selector(openURL:callback:))
WX_EXPORT_METHOD(@selector(closeURL))
WX_EXPORT_METHOD(@selector(closeURL:))
WX_EXPORT_METHOD(@selector(fireNativeGlobalEvent:callback:))
WX_EXPORT_METHOD_SYNC(@selector(wxConfig))
WX_EXPORT_METHOD_SYNC(@selector(changeWindowsBar:))
WX_EXPORT_METHOD(@selector(wxAuth:))
WX_EXPORT_METHOD(@selector(toast:))
WX_EXPORT_METHOD(@selector(encrypt:callBack:))
WX_EXPORT_METHOD(@selector(save:))
WX_EXPORT_METHOD(@selector(find:withKey:andCallBack:))
WX_EXPORT_METHOD(@selector(findList:withCallBack:))
WX_EXPORT_METHOD(@selector(delete:))
WX_EXPORT_METHOD(@selector(openEditor:withCallBack:))
WX_EXPORT_METHOD(@selector(scan:))

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
    
    if ([newURL isContains:@"file://"] && ![newURL isContains:@"Documents"]){
        newURL = [newURL stringByReplacingOccurrencesOfString:@"file://" withString:[NSString stringWithFormat:@"file://%@/resource/",DOCUMENT_PATH]];
    }
    
    WXViewController *controller = [WXViewController new];
    controller.url = [NSURL URLWithString:newURL];
    [controller render:^(BOOL finished){
        NSLog(@"render result = %d",finished);
        if (finished){
            if (weexInstance.viewController.navigationController){
                controller.hidesBottomBarWhenPushed = YES;
                [[weexInstance.viewController navigationController] pushViewController:controller animated:YES];
            }else{
                [weexInstance.viewController presentViewController:controller animated:YES completion:nil];
            }
        }else{
            IWXToast *toast = [IWXToast new];
            [toast showToast:@"页面无法渲染" withInstance:nil];
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
    NSMutableDictionary *message = [NSMutableDictionary new];
    if ([WXApi isWXAppInstalled] && [WXApi isWXAppSupportApi]){
        AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
        appDelegate.wxAuthComplete = ^(SendAuthResp *resp) {
            switch (resp.errCode) {
                case WX_ERR_OK:
                    [message setValue:@"success" forKey:@"type"];
                    [message setValue:@"登录成功" forKey:@"content"];
                    [message setValue:resp.code forKey:@"data"];
                    break;
                case WX_ERR_AUTH_DENIED:
                    [message setValue:@"error" forKey:@"type"];
                    [message setValue:@"用户拒绝授权" forKey:@"content"];
                    [message setValue:@"-4" forKey:@"data"];
                    break;
                case WX_ERR_USER_CANCEL:
                    [message setValue:@"error" forKey:@"type"];
                    [message setValue:@"用户取消授权" forKey:@"content"];
                    [message setValue:@"-2" forKey:@"data"];
                    break;
                default:
                    [message setValue:@"error" forKey:@"type"];
                    [message setValue:@"未知错误" forKey:@"content"];
                    [message setValue:@"unknown" forKey:@"data"];
                    break;
            }
            if (callback){
                callback(message);
            }
        };
        SendAuthReq* req = [SendAuthReq new];
        req.scope = @"snsapi_userinfo" ;
        req.state = @"123" ;
        [WXApi sendReq:req];
    }else{
        [message setValue:@"error" forKey:@"type"];
        [message setValue:@"未安装微信或无法打开授权" forKey:@"content"];
        [message setValue:@"unknown" forKey:@"data"];
        if (callback){
            callback(message);
        }
    }
}

- (void)changeWindowsBar:(BOOL)isBlack{
    return;
}



- (void)toast:(id)message{
    NSLog(@"\nmessage=%@\n",message);
    IWXToast *toast = [IWXToast new];
    [toast showToast:message withInstance:weexInstance];
}

- (void)encrypt:(NSString *)data callBack:(WXModuleCallback)callBack{
    [PublicKeyManager encrypt:data withCallBack:^(NSString *result) {
        if (callBack){
            NSLog(@"encrypt=%@",result);
            NSMutableDictionary *message = [NSMutableDictionary new];
            if (result){
                [message setValue:@"success" forKey:@"type"];
                [message setValue:@"加密成功" forKey:@"content"];
                [message setValue:result forKey:@"data"];
            }else{
                [message setValue:@"error" forKey:@"type"];
                [message setValue:@"加密失败" forKey:@"content"];
                [message setValue:@"" forKey:@"data"];
            }
            callBack(message);
        }
    }];
}

- (void)save:(NSDictionary *)data callBack:(WXModuleCallback)callBack{
    SqlLiteManager *manager = [SqlLiteManager defaultManager];
    NSError *error;
    SqlLiteModel *model = [[SqlLiteModel alloc] initWithDictionary:data error:&error];
    NSMutableDictionary *message = [NSMutableDictionary new];
    if (!error){
        NSUInteger Id = [manager save:model];
        if (Id > 0){
            [message setValue:@"success" forKey:@"type"];
            [message setValue:@"保存成功" forKey:@"content"];
            [message setValue:[NSString stringWithFormat:@"%tu",Id] forKey:@"data"];
        }else{
            [message setValue:@"error" forKey:@"type"];
            [message setValue:@"保存失败" forKey:@"content"];
            [message setValue:@"-1" forKey:@"data"];
        }
    }else{
        [message setValue:@"error" forKey:@"type"];
        [message setValue:@"解析失败" forKey:@"content"];
        [message setValue:@"-1" forKey:@"data"];
    }
    if (callBack){
        callBack(message);
    }
}
- (void)find:(NSString *)type withKey:(NSString *)key andCallBack:(WXModuleCallback)callBack{
    SqlLiteManager *manager = [SqlLiteManager defaultManager];
    NSMutableDictionary *message = [NSMutableDictionary new];
    SqlLiteModel *model = [manager findWithUserId:@"1" AndType:type AndKey:key AndNeedOpen:YES];
    if (model){
        [message setValue:@"success" forKey:@"type"];
        [message setValue:@"查找成功" forKey:@"content"];
        [message setValue:[DictionaryUtil objectToDictionary:model] forKey:@"data"];
    }else{
        [message setValue:@"error" forKey:@"type"];
        [message setValue:@"未找到" forKey:@"content"];
        [message setValue:@"" forKey:@"data"];
    }
    if (callBack){
        callBack(message);
    }
}

- (void)findList:(NSDictionary *)dic withCallBack:(WXModuleCallback)callBack{
    SqlLiteManager *manager = [SqlLiteManager defaultManager];
    WXCallBackMessage *message = [WXCallBackMessage new];
    NSError *error;
    OptionModel *option = [[OptionModel alloc] initWithDictionary:dic error:&error];
    if (!error){
        NSArray *array = [manager findListWithUserId:@"1" AndOption:option];
        if (!array || array.count <= 0){
            message.type = NO;
            message.content = @"未找到";
            message.data = @"-1";
        }else{
            message.type = YES;
            message.content = @"查找成功";
            message.data = array;
        }
    }else{
        message.type = NO;
        message.content = @"解析失败";
        message.data = @"-1";
    }
    if (callBack){
        callBack(message.getMessage);
    }
}

- (void)delete:(NSString *)type andKey:(NSString *)key andCallback:(WXModuleCallback)callBack{
    SqlLiteManager *manager = [SqlLiteManager defaultManager];
    WXCallBackMessage *message = [WXCallBackMessage new];
    BOOL success = [manager deleteWithUserId:@"1" AndType:type AndKey:key];
    if (success){
        message.type = YES;
        message.content = @"删除成功";
        message.data = @"1";
    }else{
        message.type = NO;
        message.content = @"删除失败";
        message.data = @"-1";
    }
    if (callBack){
        callBack(message.getMessage);
    }
}

- (void)openEditor:(NSString *)content withCallBack:(WXModuleCallback)callback{
    NSString *html = @"";
    if (content && content.length > 0){
        html = content;
    }
    ZSSRichTextEditor *editor = [ZSSRichTextEditor new];
    editor.view.backgroundColor = [UIColor colorWithHex:0xDDDDDD];
    weexInstance.viewController.navigationController.navigationBar.barStyle = UIBarStyleBlack;
    editor.title = @"文本编辑";
    editor.alwaysShowToolbar = YES;
    [editor setHTML:html];
    editor.formatHTML = YES;
    editor.callBack = ^(NSString *content) {
        WXCallBackMessage *message = [WXCallBackMessage new];
        message.type = YES;
        message.content = @"编辑完成";
        message.data = (!content || content.length <= 0) ? @"" : content;
        if (callback){
            callback(message.getMessage);
        }
    };
    [[weexInstance.viewController navigationController] pushViewController:editor animated:YES];
}

- (void)scan:(WXModuleCallback)callback{
    WXScannerVC *scanner = [WXScannerVC new];
    scanner.callback = ^(NSString *result) {
        WXCallBackMessage *message = [WXCallBackMessage new];
            if (callback){
                if (result){
                    message.type = YES;
                    message.content = @"扫描成功";
                    message.data = result;
                }else{
                    message.type = NO;
                    message.content = @"扫描失败";
                    message.data = result;
                }
                callback(message.getMessage);
            }
    };
    scanner.hidesBottomBarWhenPushed = YES;
    [[weexInstance.viewController navigationController] pushViewController:scanner animated:YES];
}
@end

