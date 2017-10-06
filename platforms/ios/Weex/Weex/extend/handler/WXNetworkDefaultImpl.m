//
//  WXNetworkDefaultImpl.m
//  Weex
//
//  Created by 郭书智 on 2017/9/25.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "WXNetworkDefaultImpl.h"
#import <WeexSDK/WXResourceRequestHandler.h>
#import "NetManager.h"
#import "DictionaryUtil.h"



@implementation WXNetworkDefaultImpl

- (void)sendRequest:(WXResourceRequest *)request withDelegate:(id<WXResourceRequestDelegate>)delegate{
    if ([request.HTTPMethod isEqualToString:@"POST"]){
        [NetManager PostHttp:[request.URL absoluteString] Parameters:[DictionaryUtil dictionaryWithJsonData:request.HTTPBody] Success:^(id  _Nonnull responseObject) {
            if (responseObject && [responseObject isKindOfClass:[NSDictionary class]]){
                [delegate request:request didReceiveData:[[DictionaryUtil convertToJsonData:responseObject] dataUsingEncoding:NSUTF8StringEncoding]];
                [delegate requestDidFinishLoading:request];
            }else{
                [delegate request:request didReceiveData:responseObject];
                [delegate requestDidFinishLoading:request];
            }
        } andFalse:^(NSError * _Nonnull error) {
            NSLog(@"error=%@",error);
            [delegate request:request didFailWithError:error];
            [delegate requestDidFinishLoading:request];
            
        }];
    }else if([request.HTTPMethod isEqualToString:@"GET"]){
        NSRange range = [[request.URL absoluteString] rangeOfString:@".ttf"];
        NSRange range1 = [[request.URL absoluteString] rangeOfString:@".js"];
        if ((range.length == 0 && range.location > [request.URL absoluteString].length) && (range1.length == 0 && range1.location > [request.URL absoluteString].length)){
            [NetManager GetHttp:[request.URL absoluteString] Parameters:nil Success:^(id  _Nonnull responseObject) {
                if (responseObject && [responseObject isKindOfClass:[NSDictionary class]]){
                    [delegate request:request didReceiveData:[[DictionaryUtil convertToJsonData:responseObject] dataUsingEncoding:NSUTF8StringEncoding]];
                    [delegate requestDidFinishLoading:request];
                }else{
                    [delegate request:request didReceiveData:responseObject];
                    [delegate requestDidFinishLoading:request];
                }
            } andFalse:^(NSError * _Nonnull error) {
                [delegate request:request didFailWithError:error];
                [delegate requestDidFinishLoading:request];
            }];
        }else{
            [super sendRequest:request withDelegate:delegate];
        }
    }else{
        [super sendRequest:request withDelegate:delegate];
    }
}
    

@end
