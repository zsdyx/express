/*
 * @Descripttion: mysql数据库配置  
 * @version: v1.0.0
 * @Author: zhaoshidong
 * @Date: 2021-02-19 14:54:57
 * @LastEditTime: 2021-02-21 12:03:07
 */
import {Sequelize} from 'sequelize';  
import {get} from 'config';

const database:string = get('mysql.database');
const username:string = get('mysql.username');
const password:string = get('mysql.password');
const host:string = get('mysql.host');
const port:number = get('mysql.port');

/**
 * mysql ORM框架
 * */

export const mysql = new Sequelize({
    dialect:"mysql",
    database:database,
    username:username,
    password:password,
    host:host,
    port:port,
    define:{
        timestamps:false,
        freezeTableName:false
    },
    timezone: "+08:00"
})