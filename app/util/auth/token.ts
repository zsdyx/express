/*
 * @Descripttion: 鉴权
 * @version: v1.0.0
 * @Author: zhaoshidong
 * @Date: 2021-02-20 13:14:43
 * @LastEditTime: 2021-02-20 13:21:14
 */


import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from "path";

// 创建 token 类
class Token {

    data: string

    constructor(data:string) {  
        this.data = data;
    }

    //生成token
    generateToken() {
        var data = this.data;
        var cert = fs.readFileSync(path.resolve(__dirname, '../../public/rsa_private_key.pem'));//私钥 可以自己生成
        var token = jwt.sign({
            data,    
            exp: Math.floor(Date.now() / 1000) + (1 * 60000000),     //expr 过期时间
        }, cert, { algorithm: 'RS256' });
        return token;
    }

    // 校验token
    verifyToken() {
        let token = this.data;
        let cert = fs.readFileSync(path.resolve(__dirname,'../../public/rsa_public_key.pem'));//公钥 可以自己生成
        let res;
        jwt.verify(token, cert, { algorithms: ['RS256'] }, (err, decoded) => {
            if (err) {
                switch (err.name) {
                    case 'JsonWebTokenError':
                        res = {
                            code: -1,
                            msg: "token无效"
                        }
                        break;
                    case 'TokenExpiredError':
                        res = {
                            code: -1,
                            msg: "token过期"
                        }
                        break;
                }
            } else {
                res = {
                    code: 1,
                    msg: "token有效"
                }
            }
        })
        return res
    }
}
module.exports = Token;