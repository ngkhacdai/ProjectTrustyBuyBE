const keyTokenModel = require('../models/keytoken.model');
const {Types} = require('mongoose')

class KeyTokenService{
    static createKeyToken = async({userId,publicKey,privateKey,refreshToken})=>{
        try {
            const filter = {user:userId}, update ={
                publicKey,privateKey,refreshTokensUsed:[],refreshToken
            },options={upsert:true,new:true}
            const tokens = await keyTokenModel.findOneAndUpdate(filter,update,options)
            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error
        }
    }

    static findByUserId = async (userId) =>{
        return await keyTokenModel.findOne({user:new Types.ObjectId(userId)})
    }
    static removeKeyById = async (id) =>{
        return await  keyTokenModel.deleteOne({ _id: id });
    }
    static findByRefershTokenUsed = async (refreshToken) =>{
        return await keyTokenModel.findOne({refreshTokensUsed:refreshToken}).lean()
    }
    static findByRefershToken = async (refreshToken) =>{
        return await keyTokenModel.findOne({refreshToken:refreshToken})
    }
    static deleteKeyById = async (userId) =>{
        return await  keyTokenModel.deleteOne({user:userId });
    }
}

module.exports = KeyTokenService