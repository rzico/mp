//
//  Settings.h
//  Weex
//
//  Created by 郭书智 on 2017/9/28.
//  Copyright © 2017年 rsico. All rights reserved.
//

#ifndef Settings_h
#define Settings_h

#define ApplicationID @"com.rzico.weex"
#define PRIVATEKEY @"myjsy2014$$"
#define APPIdentify @"vst@2014-2020$$"

#define SERVICE @"com.rsico.mopian"
#define ACCOUNT @"accountUDID"
#define ACCOUNTMD5 @"ACCOUNTMD5"

#define HOST @"weex.rzico.com/weex/"

#define HTTPAPI(url) [NSString stringWithFormat:@"%@weex/%@.jhtml",WXCONFIG_INTERFACE_PATH,url]
#define HTTPSAPI(url) [NSString stringWithFormat:@"https://%@%@.jhtml",HOST,url]

#define LOCAL_RESOURCE_PATH = [NSString stringWithFormat:@"%@/resource/",DOCUMENT_PATH]

static NSString *WXCONFIG_COLOR = @"#F0AD3C";
static NSString *WXCONFIG_RESOURCE_PATH = @"http://cdn.rzico.com/";
static NSString *WXCONFIG_INTERFACE_PATH = @"http://weex.rzico.com/";
//static NSString *WXCONFIG_INTERFACE_PATH = @"http://192.168.1.106:8088";
static NSString *WECHAT_APPID = @"wx90bb95d1d77f0cca";


static NSString *kAuthScope = @"snsapi_message,snsapi_userinfo,snsapi_friend,snsapi_contact";
static NSString *kAuthOpenID = @"0c806938e2413ce73eef92cc3";
static NSString *kAuthState = @"xxx";


static NSString *AliOSSConfig_Endpoint = @"http://cdn.rzico.com";

#endif /* Settings_h */
