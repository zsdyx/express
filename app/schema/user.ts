/*
 * @Descripttion: 定义userSchema
 * @version: v1.0.0
 * @Author: zhaoshidong
 * @Date: 2021-02-20 13:27:34
 * @LastEditTime: 2021-02-20 15:19:55
 */

 import {INTEGER,STRING,DATE,CHAR,NOW} from "sequelize";
 import {mysql} from "../dbConfig/mysql";

 export const user = mysql.define('user',{
    id:{
        type:INTEGER,           //字段类型
        autoIncrement:true,     //自增
        allowNull: false,       //不为空
        primaryKey: true,       //主键
        comment:"主键"          //说明
    },
    username:{
        type:STRING(40),        //字段长度
        unique:true,            //唯一
        comment:"用户名"
    },
    pwd:{
        type:STRING(40),
        comment:"密码"    
    },
    sex:{
        type:CHAR(1),
        comment:"M表示男性 F表示女性"
    },
    regdate:{
        type:DATE,
        comment:"注册时间",
        defaultValue: NOW
    }
 })

 user.sync() //如果表不存在,则创建该表(如果已经存在,则不执行任何操作)