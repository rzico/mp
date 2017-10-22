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
            controller.hidesBottomBarWhenPushed = YES;
            [[weexInstance.viewController navigationController] pushViewController:controller animated:YES];
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
    NSString *html = @"<h1>Large Editor</h1>"
    "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at enim at nibh pulvinar sagittis eu non lacus. Quisque suscipit tempor urna vel pretium. Curabitur id enim auctor, cursus elit ac, porttitor sem. Ut suscipit purus odio, vitae sollicitudin sapien placerat in. Duis adipiscing urna id viverra tincidunt. Duis sit amet adipiscing justo, vitae facilisis ipsum. Vivamus scelerisque justo ut libero dictum, id tempor ipsum tempus. Nam nec dui dapibus, tristique dolor et, sollicitudin enim. Nullam sagittis arcu tortor, mollis porta mi laoreet ac. Proin lobortis bibendum urna, in ultrices dolor hendrerit quis. Morbi felis quam, luctus nec suscipit porttitor, lacinia vitae velit. Nulla ultricies pellentesque porta. <strong>Suspendisse suscipit sagittis metus non rhoncus</strong>.</p>"
    "<p>Phasellus adipiscing justo ipsum, eget feugiat dui elementum id. Pellentesque eu dolor eu arcu bibendum sollicitudin. <em>Aenean ac dolor non lectus laoreet semper at vel est</em>. Curabitur sit amet odio laoreet turpis mattis suscipit at sed lacus. Nunc tincidunt ipsum nulla, ac blandit leo lobortis eu. Curabitur mauris mauris, vestibulum at urna sit amet, condimentum venenatis ante. Nullam a risus nisi. Donec sit amet imperdiet mi.</p>"
    "<p>Sed in lorem luctus lorem feugiat viverra facilisis ut velit. Maecenas convallis leo purus. <strong><em>Integer vestibulum mi eget quam auctor vehicula</em></strong>. Phasellus id eleifend nunc. Mauris pretium blandit orci a accumsan. Aliquam hendrerit sit amet ligula et dignissim. Pellentesque feugiat scelerisque sapien nec scelerisque. Nunc ac placerat lectus. Proin sed dolor in leo congue facilisis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque arcu velit, tempus sit amet elit at, aliquet iaculis dolor. Nam eget sollicitudin libero. Mauris dignissim, risus sit amet tempor tempus, risus mauris faucibus massa, sed elementum mauris turpis et arcu.</p>"
    "<p>Aliquam mattis libero arcu, <strong>a ultrices risus mattis sed</strong>. Vivamus facilisis consectetur ipsum at volutpat. Duis eget lorem sodales, congue libero dapibus, dignissim odio. Vivamus hendrerit ante at metus feugiat fringilla. Quisque imperdiet magna in tristique sagittis. Nulla neque turpis, tempus a leo eget, auctor interdum dui. In porta mi non libero lacinia pulvinar. Nunc a augue eget est malesuada eleifend a et orci. Aenean in tempus purus. Curabitur auctor viverra massa. Proin in justo pretium lacus pretium ullamcorper. Morbi elementum leo nibh, quis sodales nibh scelerisque ut.</p>"
    "<p>Mauris sed consequat augue. <strong>Aliquam accumsan erat lacus</strong>, consequat volutpat augue imperdiet vitae. Sed tempus dui quis faucibus tempor. Aliquam ultricies in turpis et vehicula. Suspendisse potenti. Duis iaculis rhoncus enim sed tempus. Cras non metus sed erat accumsan gravida vitae in lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer vel cursus ligula, a auctor lacus. In rhoncus massa <em>varius sagittis ultrices</em>. Donec aliquam, nisl sit amet hendrerit pretium, lorem quam mollis purus, ac interdum elit mi et neque. Etiam porta rutrum lacinia. Nullam nec vestibulum ligula. Nam nec ipsum odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>";
    if (content && content.length > 0){
        html = content;
    }
    ZSSRichTextEditor *editor = [ZSSRichTextEditor new];
    editor.view.backgroundColor = [UIColor whiteColor];
    editor.title = @"文本编辑";
    editor.alwaysShowToolbar = YES;
    [editor setHTML:html];
    [[weexInstance.viewController navigationController] pushViewController:editor animated:YES];
}
@end

