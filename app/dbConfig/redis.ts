/*
 * @Descripttion: redis数据库配置
 * @version: v1.0.0
 * @Author: zhaoshidong
 * @Date: 2021-02-19 15:42:35
 * @LastEditTime: 2021-02-20 13:31:27
 */

import Redis from "ioredis";
import config from 'config';

const port:number = config.get('redis.port');
const host:string = config.get('redis.host');
const password:string = config.get('redis.password');
const db:number = config.get('redis.db');

export const redis =  new Redis({
  port: port, 
  host: host, 
  family: 4,
  password: password,
  db: db,
});
