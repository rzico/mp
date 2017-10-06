//
//  APPKEY.h
//  Weex
//
//  Created by 郭书智 on 2017/9/26.
//  Copyright © 2017年 rsico. All rights reserved.
//

#ifndef APPKEY_h
#define APPKEY_h

#define ApplicationID @"com.rzico.weex"
#define PRIVATEKEY @"myjsy2014$$"
#define APPIdentify @"vst@2014-2020$$"

#define SERVICE @"com.rsico.mopian"
#define ACCOUNT @"accountUDID"
#define ACCOUNTMD5 @"ACCOUNTMD5"

#define HOST @"weex.rzico.com/weex/"

#define HTTPAPI(url) [NSString stringWithFormat:@"http://%@%@.jhtml",HOST,url]
#define HTTPSAPI(url) [NSString stringWithFormat:@"https://%@%@.jhtml",HOST,url]

#endif /* APPKEY_h */
