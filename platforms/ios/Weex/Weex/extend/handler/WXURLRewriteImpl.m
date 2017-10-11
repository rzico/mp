//
//  WXURLRewriteImpl.m
//  Weex
//
//  Created by 郭书智 on 2017/10/8.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "WXURLRewriteImpl.h"
#import "WXLog.h"
#import "WXSDKInstance.h"
#import "NSURL+Util.h"
#import "NSString+Util.h"

@implementation WXURLRewriteImpl

- (NSURL *)rewriteURL:(NSString *)url
     withResourceType:(WXResourceType)resourceType
         withInstance:(WXSDKInstance *)instance
{
    NSURL *completeURL = [NSURL URLWithString:url];
    if ([completeURL isFileURL]) {
        completeURL = [self urlRewrite:completeURL];
        return completeURL;
    } else if ([self isLocalURL:completeURL]) {
        NSString *resourceName = [[completeURL host]?:@"" stringByAppendingString:[completeURL path]];
        NSURL *resourceURL = [[NSBundle mainBundle] URLForResource:resourceName withExtension:@""];
        if (!resourceURL) {
            WXLogError(@"Invalid local resource URL:%@, no resouce found.", url);
        }
        resourceURL = [self urlRewrite:resourceURL];
        return resourceURL;
    } else {
        if (![completeURL scheme]){
            if ([completeURL isContains:@".ttf"] || [completeURL isContains:@".js"]){
                if ([url hasPrefix:@"/"]){
                    url = [NSString stringWithFormat:@"file://%@/resource%@",DOCUMENT_PATH,url];
                }else{
                    url = [NSString stringWithFormat:@"file://%@/resource/%@",DOCUMENT_PATH,url];
                }
            }else{
                url = [WXCONFIG_INTERFACE_PATH stringByAppendingString:url];
            }
        }
        url = [self strRewrite:url];
        return [instance completeURL:url];
    }
}

- (BOOL)isLocalURL:(NSURL *)url
{
    return ([[[url scheme] lowercaseString] isEqualToString:@"local"] || [url isContains:@"file:/"]);
}

- (NSString *)strRewrite:(NSString *)source{
    NSString *result = source;
    result = [result stringByReplacingOccurrencesOfString:@"undefined" withString:@""];
    if ([result hasPrefix:@"file:///"]){
        return result;
    }
    result = [result stringByReplacingOccurrencesOfString:@"http://192.168.1.106:8081/" withString:WXCONFIG_INTERFACE_PATH];
    result = [result stringByReplacingOccurrencesOfString:@"//" withString:@"/"];
    result = [result stringByReplacingOccurrencesOfString:@"file:/" withString:@"file:///"];
    result = [result stringByReplacingOccurrencesOfString:@"http:/" withString:@"http://"];
    result = [result stringByReplacingOccurrencesOfString:@"https:/" withString:@"https://"];
    if ([result isContains:@"file:///"] && ![result isContains:@"Documents"]){
        result = [result stringByReplacingOccurrencesOfString:@"file:///" withString:[NSString stringWithFormat:@"file://%@/resource/",DOCUMENT_PATH]];
    }
    return result;
}

- (NSURL *)urlRewrite:(NSURL *)source{
    NSString *result = [source absoluteString];
    result = [self strRewrite:result];
    return [NSURL URLWithString:result];
}
@end
