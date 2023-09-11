const shopSchema = require("../models/shop.model")
const bcrypt = require('bcrypt');

class ShopServices {
    static signUp = async ({ name, email, password }) => {
        // step 1: check email đã tồn tại hãy chưa
        const hodelEmail = await shopSchema.findOne({email})
        if (hodelEmail) throw new BadRequestError('Email đã tồn tại!', StatusCode.FORBIDDEN, 'INVALID_EMAIL')
        console.log(hodelEmail);
        const passwordHash = await bcrypt.hash(password, 10)
        const newShop = await shopSchema.create({
            name,
            email,
            password: passwordHash,
        })
        if (newShop) return {
            message: 'Đăng ký tài khoản thành công !!!',
            status: 200,
            newShop
        }
    }
    
}
module.exports = ShopServices