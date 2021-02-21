/*
 * @Descripttion: 用户操作user_logSchema
 * @version: v1.0.0
 * @Author: zhaoshidong
 * @Date: 2021-02-20 13:56:02
 * @LastEditTime: 2021-02-20 13:59:51
 */

import {INTEGER,STRING,DATE,CHAR,NOW} from "sequelize";
import {mysql} from "../dbConfig/mysql";

export const user_log = mysql.define('user_log',{
    id:{
        type:INTEGER,           //字段类型
        autoIncrement:true,     //自增
        allowNull: false,       //不为空
        primaryKey: true,       //主键
        comment:"主键"          //说明
    },
    userId:{
        type:INTEGER,        
        comment:"用户操作Id"
    },
    operation:{
        type:STRING(20),
        allowNull: false,       //不为空
        comment:"什么操作"
    },
    operationTime:{
        type:DATE,
        defaultValue: NOW,
        comment:"操作时间"
    }
 })

 user_log.sync() //如果表不存在,则创建该表(如果已经存在,则不执行任何操作)