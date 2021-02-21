/*
 * @Descripttion: 用户业务逻辑层
 * @version: v1.0.0
 * @Author: zhaoshidong
 * @Date: 2021-02-20 14:16:55
 * @LastEditTime: 2021-02-21 12:56:59
 */

 import {user} from "../schema/user";
 import {user_log} from "../schema/userlog";
 import {Op,col,Sequelize} from "sequelize";

export class userService {
    
    /**
     * 新增用户
     * @param username 
     * @param pwd 
     * @param sex 
     */
    async insert(username:string,pwd:string,sex:string){
        await user.create({
            username:username,
            pwd:pwd,
            sex:sex
        })

        return {
            "success" : "true"
        }
    }
    
    /**
     * 查询用户个人信息
     * @param userId 
     */
    async findById(userId:number){
        return await user.findByPk(userId)
    }

    /**
     * 查询所有用户
     * @param page
     * @param size 
     */
    async findAndCountAll(page:number,size:number){
        page = Number(page);
        size = Number(size);
        return await user.findAndCountAll({
            offset:(page - 1) * size,
            limit:size
        })
    }

    /**
     * 删除用户
     * @param userId 
     */
    async deleteById(userId:number){
        return await user.destroy({
            where:{
                id:userId
            }
        })
    }

    /**
     * 修改用户信息
     * @param userId 
     * @param username 
     * @param pwd 
     * @param sex 
     */
    async updateById(userId:number,username:string,pwd:string,sex:string){
        return await user.update({username:username,
            pwd:pwd,
            sex:sex
        },{
            where:{
                id:userId
            }
        })
    }

    /**
     * 用户操作日志
     * @param userId 
     * @param operation 
     */
    async addUserLog(userId:number,operation:string){
        return await user_log.create({
            userId:userId,
            operation:operation
        })
    }

    /**
     * 查询用户信息加用户操作日志  关联查询一对多
     */
    async findByIdUserLog(){
        user.hasMany(user_log,{foreignKey:"userId",as:"u"});
        return await user.findAll({
            attributes: ["u.operation",'id', 'username',"pwd"],
            include: [{
                model: user_log,
                as:"u",
                attributes:[]
            }],
            raw:true
        })
    }

    /**
     * 查询用户信息加用户操作日志  关联查询一对一
     */
    async findOneToOne(){
        user.hasOne(user_log,{foreignKey:"userId",as:"u"});
        return await user.findAll({
            attributes: ['u.operation','username',"pwd"],
            include: [{
                model: user_log,
                as:"u",
                attributes:[]
            }],
            raw:true   //一对一查询 不会嵌套对象
        })
    }
}