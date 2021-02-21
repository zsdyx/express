/*
 * @Descripttion: 用户路由管理器
 * @version: v1.0.0
 * @Author: zhaoshidong
 * @Date: 2021-02-20 14:39:50
 * @LastEditTime: 2021-02-21 13:38:12
 */

import { body, validationResult,query,check } from 'express-validator';
import {userService} from "../service/userService";
const service = new userService();
import express from 'express';
const userRouter = express.Router();

 /**
  * @api {post} /user
  * @apiDescription 用户登录
  * @apiName 添加用户信息
  * @apiGroup User
  * @apiParam {string} username 用户名
  * @apiParam {string} pwd 密码
  * @apiParam {string} sex 性别
  * @apiSuccessExample json Success-Response:
  *  {
  *      "success" : "true"
  *  }
  * @apiSampleRequest http://localhost:8080/user
  * @apiVersion 0.0.1
  */
userRouter.post("/user",body("username").isEmail(),body('pwd').isLength({ min: 5 }), async (req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    const data = await service.insert(req.body.username,req.body.pwd,req.body.sex);
    res.json(data)
});

// userRouter.get("/user/:id",async (req,res) => {
//     const userId:any = req.params.id
//     const data = await service.findById(userId);
//     res.json(data)
// })

// userRouter.get("/user",async (req,res) =>{
//     const page:any = req.query.page;
//     const size:any = req.query.size;
//     const data = await service.findAndCountAll(page,size);
//     res.json(data)
// })

// userRouter.put("/user",async(req,res) =>{
//     const data = await service.updateById(req.body.userId,req.body.username,req.body.pwd,req.body.sex);
//     res.json(data);
// })

// userRouter.delete("/user",async(req,res) =>{
//     const data = await service.deleteById(req.body.userId);
//     res.json(data);
// })

// userRouter.post("/userlog",async(req,res) =>{
//     const data = await service.addUserLog(req.body.userId,req.body.operation);
//     res.json(data)
// })

// userRouter.get("/findByIdUserLog",async(req,res) =>{
//     const data = await service.findByIdUserLog();
//     res.json(data)
// })

// userRouter.get("/findOneToOne",async (req,res) => {
//     const data = await service.findOneToOne();
//     res.json(data)
// })

module.exports = userRouter