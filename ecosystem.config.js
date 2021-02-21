/*
 * @Descripttion: pm2启动文件的配置
 * @version: v1.0.0
 * @Author: zhaoshidong
 * @Date: 2021-02-21 20:14:10
 * @LastEditTime: 2021-02-21 20:39:20
 */
module.exports = {
  apps : [{
    name: "express",                    //项目名称
    script: "./bulid/app.js",                 //入口文件
    instances : 2,                      //利用CPU的个数
    exec_mode : "cluster",              //负载均衡
    error_file: 'express_err.log',      //错误日志
    out_file: 'express_out.log',        //指定输出日志
    log_file: 'express_combined.log',   //带有标准格式时间戳的前缀日志
    time: true,                         //带有标准格式时间戳的前缀日志
    restart_delay: 3000,                //固定重启策略
    max_memory_restart: '300M',         //最大内存限制
    
    env: {                    //环境变量
      PORT: 3000,
      NODE_ENV: "development",
    },
    env_production: {
      PORT: 80,
      NODE_ENV: "production",
    }
  }]
}
