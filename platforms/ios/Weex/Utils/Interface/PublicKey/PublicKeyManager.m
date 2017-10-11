//
//  PublicKeyManager.m
//  Weex
//
//  Created by 郭书智 on 2017/10/9.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "PublicKeyManager.h"
#import "NetManager.h"
#import "PublicKeyModel.h"


@implementation PublicKeyManager

+ (void)encrypt:(NSString *)data withCallBack:(encryptCallBack)callBack{
    NSString *url = HTTPAPI(@"common/public_key");
    [NetManager GetHttp:url Parameters:nil Success:^(id  _Nonnull responseObject) {
        NSString *cipherString = nil;
        if (responseObject && [responseObject isKindOfClass:[NSDictionary class]]){
            if ([[responseObject objectForKey:@"type"] isEqualToString:@"success"]){
                NSError *error;
                PublicKeyModel *public = [[PublicKeyModel alloc] initWithDictionary:[responseObject objectForKey:@"data"] error:&error];
                if (!error){
                    public.modulus = [public.modulus stringByReplacingOccurrencesOfString:@"\r\n" withString:@""];
                    public.modulus = [public.modulus stringByReplacingOccurrencesOfString:@"-" withString:@"+"];
                    public.modulus = [public.modulus stringByReplacingOccurrencesOfString:@"_" withString:@"/"];
                    NSData *moduluData = [[NSData alloc] initWithBase64EncodedString:public.modulus options:0];
                    NSString *moduluString = [PublicKeyManager convertDataToHexStr:moduluData];
                    public.exponent = [public.exponent stringByReplacingOccurrencesOfString:@"\r\n" withString:@""];
                    NSData *expData = [[NSData alloc] initWithBase64EncodedString:public.exponent options:0];
                    NSString *expString = [PublicKeyManager convertDataToHexStr:expData];
                    RSA *publicKey = [DDRSAWrapper publicKeyFormMod:moduluString exp:expString];
                    if (publicKey){
                        NSData *plainData = [data dataUsingEncoding:NSUTF8StringEncoding];
                        NSData *cipherData = [DDRSAWrapper encryptWithPublicKey:publicKey plainData:plainData];
                        cipherString = [cipherData base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithLineFeed];
                        
                        cipherString = [cipherString stringByReplacingOccurrencesOfString:@"+" withString:@"-"];
                        cipherString = [cipherString stringByReplacingOccurrencesOfString:@"/" withString:@"_"];
                    }
                }
            }
        }
        if (callBack){
            callBack(cipherString);
        }
    } andFalse:^(NSError * _Nonnull error) {
        if (callBack){
            callBack(nil);
        }
    }];
}

+ (NSString *)convertDataToHexStr:(NSData *)data {
    if (!data || [data length] == 0) {
        return @"";
    }
    NSMutableString *string = [[NSMutableString alloc] initWithCapacity:[data length]];
    [data enumerateByteRangesUsingBlock:^(const void *bytes, NSRange byteRange, BOOL *stop) {
        unsigned char *dataBytes = (unsigned char*)bytes;
        for (NSInteger i = 0; i < byteRange.length; i++) {
            NSString *hexStr = [NSString stringWithFormat:@"%x", (dataBytes[i]) & 0xff];
            if ([hexStr length] == 2) {
                [string appendString:hexStr];
            } else {
                [string appendFormat:@"0%@", hexStr];
            }
        }
    }];
    return string;
}
@end
