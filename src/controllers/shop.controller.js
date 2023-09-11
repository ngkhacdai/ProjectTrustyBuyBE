const { validate } = require('../helpers/validation');
const { shopValidate } = require('../helpers/validation');
const ShopServices = require('../services/shop.services');

class shopController {
    register = async (req, res, next) => { 
        const { error } = shopValidate({
            email: req.body.email,
            password: req.body.password
        })
        if (error) return res.send({ error: error.details[0].message, status: 404 })
        res.send(await ShopServices.signUp(req.body))
    }
}

module.exports = new shopController;