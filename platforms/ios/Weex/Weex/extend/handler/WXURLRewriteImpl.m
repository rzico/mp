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

@implementation WXURLRewriteImpl

- (NSURL *)rewriteURL:(NSString *)url
     withResourceType:(WXResourceType)resourceType
         withInstance:(WXSDKInstance *)instance
{
    url = [url stringByReplacingOccurrencesOfString:@"undefined" withString:@""];
    NSURL *completeURL = [NSURL URLWithString:url];
    if ([completeURL isFileURL]) {
        return completeURL;
    } else if ([self isLocalURL:completeURL]) {
        NSString *resourceName = [[completeURL host]?:@"" stringByAppendingString:[completeURL path]];
        NSURL *resourceURL = [[NSBundle mainBundle] URLForResource:resourceName withExtension:@""];
        if (!resourceURL) {
            WXLogError(@"Invalid local resource URL:%@, no resouce found.", url);
        }
        
        return resourceURL;
    } else {
        if (![completeURL scheme]){
            if ([completeURL isContains:@".ttf"] || [completeURL isContains:@".js"]){
                if ([url hasPrefix:@"/"]){
                    url = [NSString stringWithFormat:@"%@/resource%@",DOCUMENT_PATH,url];
                }else{
                    url = [NSString stringWithFormat:@"%@/resource/%@",DOCUMENT_PATH,url];
                }
            }else{
                url = [WXCONFIG_INTERFACE_PATH stringByAppendingString:url];
            }
        }
        return [instance completeURL:url];
    }
}

- (BOOL)isLocalURL:(NSURL *)url
{
    return ([[[url scheme] lowercaseString] isEqualToString:@"local"] || [url isContains:@"file:/"]);
}


@end
