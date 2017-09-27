//
//  WXNetworkDefaultImpl.m
//  Weex
//
//  Created by 郭书智 on 2017/9/25.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "WXNetworkDefaultImpl.h"
#import <WeexSDK/WXResourceRequestHandler.h>

#import <WeexSDK/WXResourceLoader.h>
#import "NetManager.h"

@implementation WXNetworkDefaultImpl{
    WXResourceRequest *wxRequest;
    id<WXResourceRequestDelegate> wxDelegate;
}
    
- (void)sendRequest:(WXResourceRequest *)request withDelegate:(id<WXResourceRequestDelegate>)delegate{
    if ([request.HTTPMethod isEqualToString:@"POST"]){
        [NetManager PostHttp:[request.URL absoluteString] Parameters:[self dictionaryWithJsonData:request.HTTPBody] Success:^(id  _Nonnull responseObject) {
            [delegate request:request didReceiveData:[[self convertToJsonData:responseObject] dataUsingEncoding:NSUTF8StringEncoding]];
            [delegate requestDidFinishLoading:request];
        } andFalse:^(NSError * _Nonnull error) {
            [delegate request:request didFailWithError:error];
            [delegate requestDidFinishLoading:request];
        }];
        
        [super sendRequest:request withDelegate:delegate];
    }else{
        [NetManager GetHttp:[request.URL absoluteString] Parameters:nil Success:^(id  _Nonnull responseObject) {
            [delegate request:request didReceiveData:[[self convertToJsonData:responseObject] dataUsingEncoding:NSUTF8StringEncoding]];
            [delegate requestDidFinishLoading:request];
        } andFalse:^(NSError * _Nonnull error) {
            [delegate request:request didFailWithError:error];
            [delegate requestDidFinishLoading:request];
        }];
    }
}
    
- (NSString *)convertToJsonData:(NSDictionary *)dict{
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dict options:NSJSONWritingPrettyPrinted error:&error];
    NSString *jsonString;
    if (!jsonData) {
        NSLog(@"%@",error);
    }else{
        jsonString = [[NSString alloc]initWithData:jsonData encoding:NSUTF8StringEncoding];
    }
    NSMutableString *mutStr = [NSMutableString stringWithString:jsonString];
    NSRange range = {0,jsonString.length};
    //去掉字符串中的空格
    [mutStr replaceOccurrencesOfString:@" " withString:@"" options:NSLiteralSearch range:range];
    NSRange range2 = {0,mutStr.length};
    //去掉字符串中的换行符
    [mutStr replaceOccurrencesOfString:@"\n" withString:@"" options:NSLiteralSearch range:range2];
    return mutStr;
}
    
- (NSDictionary *)dictionaryWithJsonData:(NSData *)jsonData{
    if (jsonData == nil) {
        return nil;
    }
    NSError *err;
    NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData
                                                        options:NSJSONReadingMutableContainers
                                                          error:&err];
    if(err)
    {
        NSLog(@"json解析失败：%@",err);
        return nil;
    }
    return dic;
}
@end
