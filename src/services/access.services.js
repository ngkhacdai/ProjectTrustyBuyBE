const userSchema = require('../models/user.model')
const addressSchema = require('../models/address.model')
const photoSchema = require('../models/photo.model')
const bcrypt = require('bcrypt');
const { findByEmail, findById, changePassword, settingProfile, searching } = require('../services/user.services')
const { signAccessToken, signRefeshToken } = require('../auth/authUtils')
const cryto = require('crypto')
const KeyTokenService = require('./keyToken.service');
const { createTokenPair, verifyJWT } = require('../auth/authUtils');
const { BadRequestError, StatusCode } = require('../core/error.response');
const createError = require('http-errors');
const fs = require('fs')

class AccessService {
    static get = async () => {
        return userSchema.find({}).populate('user_address');

    }
    static signUp = async ({ user_name, user_email, user_password, phone_number }) => {
        // step 1: check email đã tồn tại hãy chưa
        const hodelEmail = await findByEmail(user_email)
        if (hodelEmail) throw new BadRequestError('Email đã tồn tại!', StatusCode.FORBIDDEN, 'INVALID_EMAIL')
        console.log(hodelEmail);
        const passwordHash = await bcrypt.hash(user_password, 10)
        const newUser = await userSchema.create({
            user_name,
            user_email,
            user_password: passwordHash,
            phone_number,

        })
        if (newUser) return {
            message: 'Đăng ký tài khoản thành công !!!',
            status: 200,
            newUser
        }

    }

    static logIn = async ({ user_email, user_password }) => {
        const hodelUser = await findByEmail(user_email)
        if (!hodelUser) {
            throw new BadRequestError('Email chưa tồn tại!', StatusCode.FORBIDDEN, 'INVALID_EMAIL')
        }
        const match = await bcrypt.compare(user_password, hodelUser.user_password)
        if (!match) throw new BadRequestError('Mật khẩu chưa chính xác!', StatusCode.FORBIDDEN, 'INVALID_PASSWORD')

        // socket.emit('userlogin',({username:hodelUser.name,userid:hodelUser._id}));
        // const accessToken = await signAccessToken(hodelUser._id)
        // const refreshToken = await signRefeshToken(hodelUser._id)
        const publicKey = cryto.randomBytes(32).toString('hex')
        const privateKey = cryto.randomBytes(32).toString('hex')
        const tokens = await createTokenPair({ userId: hodelUser._id, user_email, user_password: hodelUser.user_password }, publicKey, privateKey)
        await KeyTokenService.createKeyToken({
            userId: hodelUser._id,
            refreshToken: tokens.refreshToken,
            publicKey,
            privateKey,
        })

        return {
            message: 'Đăng nhập thành công',
            userId: hodelUser._id,
            accessToken: tokens.accessToken
        }
    }
    static updateAccount = async (req) => {
        const { user_name, user_email, phone_number, user_gender } = req.body;
        const { userId } = req.user;
        const hodelEmail = await findByEmail(user_email)
        if (hodelEmail) throw new BadRequestError('Email đã tồn tại!', StatusCode.FORBIDDEN, 'INVALID_EMAIL')
        console.log(req.user);
        if (req.file) {
            fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
                console.log(err);
            });
            var user_avatar = req.file.originalname
        }
        const updateUser = await userSchema.findByIdAndUpdate(userId, {
            user_name,
            user_email,
            phone_number,
            // user_address,
            user_gender,
            user_avatar,
        }, { new: true });

        if (updateUser) {
            return {
                message: 'Cập nhật tài khoản thành công!',
                status: 200,
                updateUser,
            };
        } else {
            throw new Error('Không thể cập nhật tài khoản');
        }
    }
    static updateAddress = async (req) => {
        const { userId } = req.user;
        const { city, coutry, street } = req.body;
        const user = await userSchema.findById(userId);
        const updateAddress = await addressSchema.findByIdAndUpdate(user.user_address._id, { city, coutry, street });
        if (updateAddress) {
            return {
                message: 'Cập nhật địa chỉ thành công!',
                status: 200,
                updateAddress,
            };
        } else {
            throw new Error('Không thể cập nhật địa chỉ');
        }
    }
}

module.exports = AccessService