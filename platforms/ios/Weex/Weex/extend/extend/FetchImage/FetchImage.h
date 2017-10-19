//
//  FetchImage.h
//  Weex
//
//  Created by iMac on 2017/10/19.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WXImgLoaderProtocol.h"

typedef void(^FetchImageBlock)(UIImage *image);

@interface FetchImage : NSObject <WXImageOperationProtocol>

+ (id)sharedInstance;
- (id<WXImageOperationProtocol>)fetchAssetWithSchemeUrl:(NSString *)url AndBlock:(FetchImageBlock)block;
@end
