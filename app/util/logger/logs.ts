/*
 * @Descripttion: 系统日志
 * @version: v1.0.0
 * @Author: zhaoshidong
 * @Date: 2021-02-19 16:58:51
 * @LastEditTime: 2021-02-19 17:09:14
 */

import config from 'config';
import winston from 'winston';
import path from 'path';
import dailyRoateFile from 'winston-daily-rotate-file';


//日志目录
let defaultLogDir = 'logs';
if (config.has('logger.path')) {
  defaultLogDir = config.get('logger.path');
}
//日志存储目录
const logDir = path.join(path.dirname(__dirname), defaultLogDir);
//异常被抛出
const exceptionFile = path.join(logDir, 'exceptions.log');
//错误日志
const errorFile = path.join(logDir, 'error.log');
//高于设定等级的日志都打印
const logFile = path.join(logDir, 'app-%DATE%.log');
//日志等级
let defaultLogLevel = 'debug';
if (config.has('logger.level')) {
  defaultLogLevel = config.get('logger.level');
}

//日志文件大小
let defaultMaxSize = '50m';
if (config.has('logger.maxSize')) {
  defaultMaxSize = config.get('logger.maxSize');
}

//日志文件存储天数
let defaultMaxFiles = '14d';
if (config.has('logger.maxFiles')) {
  defaultMaxFiles = config.get('logger.maxFiles');
}

//创建日志格式
const formatter = winston.format.combine(
  winston.format.splat(),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.printf(info => {
    return `${info.timestamp} ${info.level}:${info.message}`;
  })
);

//日志输出位置
const logTransports = [
  new winston.transports.File({
    level: 'error',
    filename: errorFile
  }),
  //按日期输出
  new dailyRoateFile({
    filename: logFile,
    datePattern: 'YYYY-MM-DD',
    maxFiles: defaultMaxFiles,
    maxSize: defaultMaxSize
  })
];
//配置日志系统
const logger = winston.createLogger({
  level: defaultLogLevel,
  format: formatter,
  transports: logTransports,
  exceptionHandlers: [
    new winston.transports.File({
      filename: exceptionFile
    })
  ],
  //exceptions 是否会出现导致process.exit，设为false不会
  exitOnError: false
});


//判断是否是生产环境
if (process.env['NODE_ENV'] !== 'production') {
  logger.add(new winston.transports.Console({
    format: formatter
  }));
}
module.exports = logger;
