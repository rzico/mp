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
#import "NSURL+Util.h"
#import "WXNetworkQueueModel.h"
#import "AppDelegate.h"
#import "UIViewController+Util.h"
#import "SqlLiteManager.h"

static NSMutableArray<WXNetworkQueueModel *> *queueList;

@implementation WXNetworkDefaultImpl

- (void)sendRequest:(WXResourceRequest *)request withDelegate:(id<WXResourceRequestDelegate>)delegate{
    if ([request.HTTPMethod isEqualToString:@"POST"]){
        [NetManager PostHttp:[request.URL absoluteString] Parameters:[DictionaryUtil dictionaryWithJsonData:request.HTTPBody] Success:^(id  _Nonnull responseObject) {
            if (responseObject && [responseObject isKindOfClass:[NSDictionary class]]){
                if ([self checkLoginSession:responseObject withRequest:request andDelegate:delegate]){
                    
                    [delegate request:request didReceiveData:[[DictionaryUtil convertToJsonData:responseObject] dataUsingEncoding:NSUTF8StringEncoding]];
                    [delegate requestDidFinishLoading:request];
                }
            }else{
                [delegate request:request didReceiveData:responseObject];
                [delegate requestDidFinishLoading:request];
            }
        } andFalse:^(NSError * _Nonnull error) {
            [delegate request:request didFailWithError:error];
            [delegate requestDidFinishLoading:request];
        }];
    }else if([request.HTTPMethod isEqualToString:@"GET"]){
        if (!([request.URL isContains:@".ttf"] || [request.URL isContains:@".js"] || [request.URL isContains:@".wx"])){
            SqlLiteManager *manager = [SqlLiteManager defaultManager];
            SqlLiteModel *data = [manager findWithUserId:@"1" AndType:@"DataCache" AndKey:[request.URL absoluteString] AndNeedOpen:YES];
            NSMutableDictionary *parameters = nil;
            if (data){
                [delegate request:request didReceiveData:[data.value dataUsingEncoding:NSUTF8StringEncoding]];
                [delegate requestDidFinishLoading:request isKeepAlive:YES];
                parameters = [NSMutableDictionary new];
                [parameters setObject:data.keyword forKey:@"md5"];
            }
            [NetManager GetHttp:[request.URL absoluteString] Parameters:parameters Success:^(id  _Nonnull responseObject) {
                if (responseObject && [responseObject isKindOfClass:[NSDictionary class]]){
                    if ([self checkLoginSession:responseObject withRequest:request andDelegate:delegate]){
                        NSString *receiveData = [DictionaryUtil convertToJsonData:responseObject];
                        if ([[responseObject objectForKey:@"type"] isEqualToString:@"success"]){
                            SqlLiteModel *newData = [SqlLiteModel new];
                            newData.userId = @"1";
                            newData.type = @"DataCache";
                            newData.key = [request.URL absoluteString];
                            newData.value = receiveData;
                            newData.keyword = [responseObject objectForKey:@"md5"];
                            newData.sort = @"";
                            [manager save:newData];
                        }
                        [delegate request:request didReceiveData:[receiveData dataUsingEncoding:NSUTF8StringEncoding]];
                        [delegate requestDidFinishLoading:request isKeepAlive:NO];
                    }
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

- (BOOL)checkLoginSession:(NSDictionary *)data withRequest:(WXResourceRequest *)request andDelegate:(id<WXResourceRequestDelegate>)delegate{
    if ([[data objectForKey:@"type"] isEqualToString:@"error"] && [[data objectForKey:@"content"] isEqualToString:@"session.invaild"]){
        WXNetworkQueueModel *model = [WXNetworkQueueModel new];
        model.request = request;
        model.delegate = delegate;
        if (!queueList){
            queueList = [NSMutableArray<WXNetworkQueueModel *> new];
        }
        [queueList addObject:model];
        if (![[UIViewController topViewController] isKindOfClass:NSClassFromString(@"LoginViewController")]){
            AppDelegate *appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
            [appDelegate presentLoginViewController];
        }
        return NO;
    }else if ([[data objectForKey:@"type"] isEqualToString:@"success"] && [[data objectForKey:@"content"] isEqualToString:@"login.success"]){
        for (WXNetworkQueueModel *queue in queueList){
            dispatch_async(dispatch_get_main_queue(), ^{
                WXNetworkDefaultImpl *network = [WXNetworkDefaultImpl new];
                [network sendRequest:queue.request withDelegate:queue.delegate];
                [queueList removeObject:queue];
            });
        }
        return YES;
    }else{
        return YES;
    }
}
@end
