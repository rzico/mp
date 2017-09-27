//
//  NetManager.m
//  Weex
//
//  Created by 郭书智 on 2017/9/26.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "NetManager.h"
#import "AppDelegate.h"
#import "TXUtilsString.h"

static Reachability * localWiFiReach = nil;
static Reachability * internetConnectionReach = nil;
static AFHTTPSessionManager *afManager;

@interface NetManager ()
-(void)reachabilityChanged:(NSNotification*)note;
@end

@implementation NetManager

+ (NetManager *) getManager{
    static NetManager *netmanager = nil;
    if (!netmanager){
        AppDelegate *appdelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
        NSDictionary *headDic = appdelegate.appKeyChainDic;
        NSAssert(headDic.count, @"数据请求头为空，请检查！");
        static dispatch_once_t onceToken;
        dispatch_once(&onceToken, ^{
            netmanager = [NetManager new];
            afManager = [AFHTTPSessionManager manager];
            afManager.requestSerializer.cachePolicy = NSURLRequestReloadIgnoringLocalCacheData;
            [afManager.requestSerializer setValue:@"application/json" forHTTPHeaderField:@"Accept"];
            afManager.responseSerializer.acceptableContentTypes = [NSSet setWithObjects:@"application/json",@"text/json",@"text/javascript",@"text/html",@"text/plain", nil];
            afManager.requestSerializer.timeoutInterval = 45.0f;
            for (NSString *key in headDic.allKeys){
                NSString *value = headDic[key];
                [afManager.requestSerializer setValue:value forHTTPHeaderField:key];
            }
        });
    }
    return netmanager;
}

+ (AFHTTPSessionManager *)getSessionManager{
    [NetManager getManager];
    return afManager;
}


/**
 AFPost
 */
+ (void)PostHttp:(NSString *)url  Parameters:(NSDictionary *)parameters Success:(void(^)(id responseObject))SuccessBlock  andFalse:(void(^)( NSError *error))FalseBlock{
    [afManager POST:url parameters:parameters progress:^(NSProgress * _Nonnull uploadProgress) {
        
    } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        if ([NetManager getManager].netDelegate && [[NetManager getManager].netDelegate respondsToSelector:@selector(getSession:)]){
            [[[NetManager getManager] netDelegate] getSession:responseObject];
        }
        
        SuccessBlock(responseObject);
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        FalseBlock(error);
        ALERT(@"获取数据失败，请检查网络是否连接");
    }];
}

+ (AFHTTPSessionManager *) jsonManager{
    static AFHTTPSessionManager *manager = nil;
    if (!manager){
        AppDelegate *appdelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
        NSDictionary *headDic = appdelegate.appKeyChainDic;
        static dispatch_once_t onceToken;
        dispatch_once(&onceToken, ^{
            manager = [AFHTTPSessionManager manager];
            manager.responseSerializer = [AFJSONResponseSerializer serializerWithReadingOptions:NSJSONReadingAllowFragments];
            manager.responseSerializer.acceptableContentTypes = [NSSet setWithObjects:@"application/json", @"text/json", @"text/javascript",@"text/html",@"text/plain", nil];
            manager.requestSerializer.timeoutInterval = 30.f;
            for (NSString *key in headDic.allKeys) {
                NSString *value = headDic[key];
                [manager.requestSerializer setValue:value forHTTPHeaderField:key];
            }
        });
    }
    return manager;
}


/**
 AFGet
 */
+ (void)GetJSONHttp:(NSString *)url Parameters:(NSDictionary *)parameters  Success:(void(^)(id responseObject))SuccessBlock  andFalse:(void(^)( NSError *error))FalseBlock{
    [NetManager jsonManager];
    [afManager GET:url parameters:parameters progress:^(NSProgress * _Nonnull downloadProgress) {
        
    } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        SuccessBlock(responseObject);
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        FalseBlock(error);
        ALERT(@"获取数据失败，请检查网络是否连接！");
    }];
}


/**
 AFGet
 */
+ (void)GetHttp:(NSString *)url Parameters:(nullable NSDictionary *)parameters  Success:(void(^)(id responseObject))SuccessBlock  andFalse:(void(^)( NSError *error))FalseBlock{
    [NetManager getManager];
    [afManager GET:url parameters:parameters progress:^(NSProgress * _Nonnull downloadProgress) {
        
    } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        if([NetManager getManager].netDelegate && [[NetManager getManager].netDelegate respondsToSelector:@selector(getSession:)])
        {
            [[[NetManager getManager] netDelegate] getSession:responseObject];
        }
        SuccessBlock(responseObject);
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        FalseBlock(error);
        ALERT(@"获取数据失败，请检查网络是否连接！");
    }];
}

+ (void) DownLoad:(NSString *)url{
    [NetManager getManager];
    NSURL *URL = [NSURL URLWithString:url];
    NSURLRequest *request = [NSURLRequest requestWithURL:URL];
    NSURLSessionDownloadTask *downloadTask = [afManager downloadTaskWithRequest:request progress:nil destination:^NSURL * _Nonnull(NSURL * _Nonnull targetPath, NSURLResponse * _Nonnull response) {
        NSURL *documentDirectoryURL = [[NSFileManager defaultManager] URLForDirectory:NSDocumentDirectory inDomain:NSUserDomainMask appropriateForURL:nil create:NO error:nil];
        return [documentDirectoryURL URLByAppendingPathComponent:[response suggestedFilename]];
    } completionHandler:^(NSURLResponse * _Nonnull response, NSURL * _Nullable filePath, NSError * _Nullable error) {
        
    }];
    
    [downloadTask resume];
}


/**
 带有多参数的系统post
 */
+ (void)PostNativeMain:(NSString *)url Body:(NSString *)string  andBlobk:(void(^)(NSDictionary *resDic))block{
    NSData *postData = [string dataUsingEncoding:NSUTF8StringEncoding allowLossyConversion:YES];
    NSString *postLength = [NSString stringWithFormat:@"%luzd",(unsigned long)[string length]];
    NSMutableURLRequest *request = [NSMutableURLRequest new];
    [request setURL:[NSURL URLWithString:url]];
    [request setHTTPMethod:@"POST"];
    [request setValue:postLength forHTTPHeaderField:@"Content-Length"];
    [request setValue:@"application/x-www-form-urlencoded" forHTTPHeaderField:@"Content-Type"];
    [request setHTTPBody:postData];
    NSData *returnData = [NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
    if (returnData){
        NSMutableDictionary *resDict = [NSJSONSerialization JSONObjectWithData:returnData options:NSJSONReadingAllowFragments error:nil];
        block(resDict);
    }else{
        
    }
}

+(void) PostImageWithData:(NSString *)url imageData:(NSData *)imageData  otherParamters:(NSDictionary *)paramters success:(void (^)(NSURLSessionDataTask *task, id responseObject))success failure:(void (^)(NSURLSessionDataTask *task, NSError *error))failure{
    [afManager POST:url parameters:paramters constructingBodyWithBlock:^(id<AFMultipartFormData>  _Nonnull formData) {
        NSDateFormatter *formatter = [NSDateFormatter new];
        formatter.dateFormat = @"yyyyMMddHHmmss";
        NSString *str = [formatter stringFromDate:[NSDate date]];
        NSString *fileName = [NSString stringWithFormat:@"%@.png",str];
        [formData appendPartWithFileData:imageData name:@"file" fileName:fileName mimeType:@"image/png"];
        
    } progress:^(NSProgress * _Nonnull uploadProgress) {
        
    } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        success(task, responseObject);
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        failure(task,error);
    }];
}

+(void) PostVoiceWithData:(NSString *)url voiceData:(NSData *)voiceData  otherParamters:(NSDictionary *)paramters success:(void (^)(NSURLSessionDataTask *task, id responseObject))success failure:(void (^)(NSURLSessionDataTask *task, NSError *error))failure{
    [afManager POST:url parameters:paramters constructingBodyWithBlock:^(id<AFMultipartFormData>  _Nonnull formData) {
        NSDateFormatter *formatter = [NSDateFormatter new];
        formatter.dateFormat = @"yyyyMMddHHmmss";
        NSString *str = [formatter stringFromDate:[NSDate date]];
        NSString *fileName = [NSString stringWithFormat:@"%@.amr",str];
        [formData appendPartWithFileData:voiceData name:@"file" fileName:fileName mimeType:@":audio/amr"];
    } progress:^(NSProgress * _Nonnull uploadProgress) {
        
    } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        success(task, responseObject);
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        failure(task, error);
    }];
}

/*
 *上传图片带参数的post
 */
+ (void)PostimageNewUpload:(NSData *)imageWithData withUrl:(NSString *)urlString  andBlock:(void(^)(NSDictionary *ReturnDic))block{
    NSString *TWITTERFON_FORM_BOUNDARY = @"AaB03x";
    //根据url初始化request
    NSMutableURLRequest * request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:urlString]
                                                            cachePolicy:NSURLRequestReloadIgnoringLocalCacheData
                                                        timeoutInterval:30];
    //分界线 --AaB03x
    NSString *MPboundary=[[NSString alloc]initWithFormat:@"--%@",TWITTERFON_FORM_BOUNDARY];
    //结束符 AaB03x--
    NSString *endMPboundary=[[NSString alloc]initWithFormat:@"%@--",MPboundary];
    //    //要上传的图片
    //    UIImage *image=[params objectForKey:@"pic"];
    //得到图片的data
    //    NSData *data = UIImagePNGRepresentation(image);
    //http body的字符串
    NSMutableString *body=[[NSMutableString alloc]init];
    ////添加分界线，换行
    [body appendFormat:@"%@\r\n",MPboundary];
    //声明pic字段，文件名为boris.png
    [body appendFormat:@"Content-Disposition: form-data; name=\"file\"; filename=\"boris.png\"\r\n"];
    //声明上传文件的格式
    [body appendFormat:@"Content-Type: image/jpg\r\n\r\n"];
    //声明结束符：--AaB03x--
    NSString *end=[[NSString alloc]initWithFormat:@"\r\n%@",endMPboundary];
    //声明myRequestData，用来放入http body
    NSMutableData *myRequestData=[NSMutableData data];
    //将body字符串转化为UTF8格式的二进制
    [myRequestData appendData:[body dataUsingEncoding:NSUTF8StringEncoding]];
    //将image的data加入
    [myRequestData appendData:imageWithData];
    //加入结束符--AaB03x--
    [myRequestData appendData:[end dataUsingEncoding:NSUTF8StringEncoding]];
    //设置HTTPHeader中Content-Type的值
    NSString *content=[[NSString alloc]initWithFormat:@"multipart/form-data; boundary=%@",TWITTERFON_FORM_BOUNDARY];
    //设置HTTPHeader
    [request setValue:content forHTTPHeaderField:@"Content-Type"];
    //设置Content-Length
    [request setValue:[NSString stringWithFormat:@"%d", (int)[myRequestData length]] forHTTPHeaderField:@"Content-Length"];
    //设置http body
    [request setHTTPBody:myRequestData];
    //http method
    [request setHTTPMethod:@"POST"];
    NSData *returnData = [NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
    if ([TXUtilsString IsNull:returnData]) {
        //NSLog(@"网络错误");
    }else{
        //        NSMutableDictionary *resDict = [NSJSONSerialization JSONObjectWithData:returnData options:NSJSONReadingAllowFragments error:nil];
        //        NSString *str = [[NSString alloc]initWithData:returnData encoding:NSUTF8StringEncoding];
        if (returnData) {
            NSMutableDictionary *resDict = [NSJSONSerialization JSONObjectWithData:returnData options:NSJSONReadingAllowFragments error:nil];
            block(resDict);
        }else{
            ALERT(@"获取数据失败，请检查网络是否连接");
        }
    }
}


/**
 开启网络监控
 */
+(void) startNetworkMonitoring:(id) target{
    [[NSNotificationCenter defaultCenter] addObserver:target selector:@selector(reachabilityChanged:) name:kReachabilityChangedNotification object:nil];
    localWiFiReach = [Reachability reachabilityForLocalWiFi];
    
    localWiFiReach.reachableOnWWAN = NO;
    
    localWiFiReach.reachableBlock = ^(Reachability *reachability) {
        [NSString stringWithFormat:@"LocalWIFI Block Says Reachable(%@)", reachability.currentReachabilityString];
    };
    
    localWiFiReach.unreachableBlock = ^(Reachability *reachability) {
        [NSString stringWithFormat:@"LocalWIFI Block Says Unreachable(%@)", reachability.currentReachabilityString];
    };
    
    [localWiFiReach startNotifier];
    
    internetConnectionReach = [Reachability reachabilityForInternetConnection];
    
    internetConnectionReach.reachableBlock = ^(Reachability * reachability)
    {
        [NSString stringWithFormat:@" InternetConnection Says Reachable(%@)", reachability.currentReachabilityString];
        
        
    };
    
    internetConnectionReach.unreachableBlock = ^(Reachability * reachability)
    {
        [NSString stringWithFormat:@"InternetConnection Block Says Unreachable(%@)", reachability.currentReachabilityString];
        
    };
    
    [internetConnectionReach startNotifier];
}
@end

