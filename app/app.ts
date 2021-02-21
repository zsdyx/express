/*
 * @Descripttion: 程序入口
 * @version: v1.0.0
 * @Author: zhaoshidong
 * @Date: 2021-02-19 13:38:36
 * @LastEditTime: 2021-02-21 13:31:06
 */
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from "body-parser";
import {join} from "path"
 
const userRouter = require("./routers/userRouter");

const app:Application = express();

/**
 *  urlencoded 处理表单提交的请求体参数
 *  json json格式的请求体参数
 *  改变其请求体的大小（默认大小1mb）
 **/
app.use(bodyParser.urlencoded({
    extended: false,
    limit:'10mb'
}));
app.use(bodyParser.json({
    limit:'10mb'
}))

app.use(express.static(join(__dirname, 'public')));

console.log(join(__dirname, 'public'))

app.use(userRouter)

app.listen(8080, function(){
    console.log('Example app listening on port 8080!');
})