//
//  SqlLiteManager.m
//  Weex
//
//  Created by 郭书智 on 2017/10/11.
//  Copyright © 2017年 rsico. All rights reserved.
//

#import "SqlLiteManager.h"
#import <FMDB.h>
#import <sqlite3.h>


static FMDatabase *_db;

@implementation SqlLiteManager

+ (SqlLiteManager *)defaultManager{
    static SqlLiteManager *manager;
    if (!manager){
        manager = [SqlLiteManager new];
        if (![manager initializeDatabase]){
            manager = nil;
        }
    }
    return manager;
}

+ (NSString *)pathWithDatabase{
    return [DOCUMENT_PATH stringByAppendingPathComponent:@"data.db"];
}

- (void)createEditableDatabase{
    BOOL success;
    NSError *error;
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *writableDB = [SqlLiteManager pathWithDatabase];
    success = [fileManager fileExistsAtPath:writableDB];
    if (!success){
        NSString *defaultPath = [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:@"data.db"];
        success = [fileManager copyItemAtPath:defaultPath toPath:writableDB error:&error];
        
        if (!success){
            NSAssert1(0, @"Failed to create writable database file:'%@'.", [error localizedDescription]);
        }
    }
}

- (BOOL)initializeDatabase{
    // 确认可操作数据是否存在
    [self createEditableDatabase];
    // 数据库路径
    NSString *path = [SqlLiteManager pathWithDatabase];
    // 是否打开成功
    _db = [FMDatabase databaseWithPath:path];
    
    BOOL success = [_db open];
    [_db close];
    if (success){
        NSLog(@"Open database success");
        return YES;
    }else{
        NSAssert1(0, @"Failed to open database: '%@'.", [_db lastErrorMessage]);
        return NO;
    }
}

- (NSUInteger)save:(SqlLiteModel *)model{
    BOOL success = NO;
    NSUInteger Id = -1;
    [_db open];
    SqlLiteModel *data = [self findWithUserId:model.userId AndType:model.type AndKey:model.key AndNeedOpen:NO];
    if (data){
        success = [self updateWithId:data.Id AndModel:model];
        if (success){
            Id = data.Id;
        }
    }else{
        Id = [self add:model];
    }
    [_db close];
    return Id;
}

- (BOOL)updateWithId:(NSUInteger)Id AndModel:(SqlLiteModel *)model{
    BOOL success = [_db executeUpdate:@"UPDATE redis SET USERID=?,TYPE=?,KEY=?,VALUE=?,SORT=?,KEYWORD=? WHERE ID=?",model.userId,model.type,model.key,model.value,model.sort,model.keyword,[NSNumber numberWithUnsignedInteger:Id]];
    return success;
}

- (SqlLiteModel *)findWithUserId:(NSString *)userId AndType:(NSString *)type AndKey:(NSString *)key AndNeedOpen:(BOOL)needOpen{
    if (needOpen){
        [_db open];
    }
    FMResultSet *result = [_db executeQuery:@"SELECT * FROM redis WHERE(USERID=? AND TYPE=? AND KEY=?) LIMIT 1",userId,type,key];
    if ([result next]){
        SqlLiteModel *model = [SqlLiteModel new];
        model.Id = [[result stringForColumn:@"Id"] integerValue];
        model.userId = [result stringForColumn:@"userId"];
        model.type = [result stringForColumn:@"type"];
        model.key = [result stringForColumn:@"key"];
        model.value = [result stringForColumn:@"value"];
        model.sort = [result stringForColumn:@"sort"];
        model.keyword = [result stringForColumn:@"keyword"];
        if (needOpen){
            [_db close];
        }
        return model;
    }else{
        if (needOpen){
            [_db close];
        }
        return nil;
    }
}

- (NSArray *)findListWithUserId:(NSString *)userId AndOption:(OptionModel *)option {
    [_db open];
    
    option.orderBy = [[option.orderBy lowercaseString]  isEqual: @"asc"] ? @"ASC" : @"DESC";
    
    NSMutableArray<SqlLiteModel *> *dataArray = [NSMutableArray<SqlLiteModel *> new];
    
    FMResultSet *result = [_db executeQuery:@"SELECT * FROM redis WHERE(USERID=? AND TYPE=? AND KEYWORD=?) LIMIT ? OFFSET ?",option.userId,option.type,option.keyword,[NSNumber numberWithUnsignedInteger:option.current],[NSNumber numberWithUnsignedInteger:option.pageSize]];
    
    while ([result next]) {
        SqlLiteModel *model = [SqlLiteModel new];
        model.Id = [[result stringForColumn:@"Id"] integerValue];
        model.userId = [result stringForColumn:@"userId"];
        model.type = [result stringForColumn:@"type"];
        model.key = [result stringForColumn:@"key"];
        model.value = [result stringForColumn:@"value"];
        model.sort = [result stringForColumn:@"sort"];
        model.keyword = [result stringForColumn:@"keyword"];
        [dataArray addObject:model];
    }
    [_db close];
    return dataArray;
}

- (NSUInteger)add:(SqlLiteModel *)model{
    BOOL success = [_db executeUpdate:@"INSERT INTO redis(USERID,TYPE,KEY,VALUE,SORT,KEYWORD) VALUES(?,?,?,?,?,?)",model.userId,model.type,model.key,model.value,model.sort,model.keyword];
    
    
    NSUInteger Id = -1;
    if (success){
        Id = [_db lastInsertRowId];
    }
    return Id;
}

- (BOOL)deleteWithUserId:(NSString *)userId AndType:(NSString *)type AndKey:(NSString *)key{
    [_db open];
    BOOL success = [_db executeUpdate:@"DELETE FROM redis WHERE USERID=? AND TYPE=? AND KEY=?",userId,type,key];
    [_db close];
    return success;
}


@end
