/*
 * @Descripttion: mongodb数据库配置
 * @version: v1.0.0
 * @Author: zhaoshidong
 * @Date: 2021-02-19 16:07:33
 * @LastEditTime: 2021-02-20 13:31:14
 */

import mongoose from 'mongoose';
import config from 'config';

const dbName:string = config.get('mongodb.database');
const user:string = config.get('mongodb.username');
const pass:string = config.get('mongodb.pass');
const ip:string = config.get('mongodb.ip');

export const mongodb = mongoose.createConnection(ip,{
    dbName:dbName,
    user:user,
    pass:pass
});