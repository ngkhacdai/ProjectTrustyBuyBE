
const AccessService = require('../services/access.services');
const { userValidate } = require('../helpers/validation');
const { SuccessResponse } = require('../core/success.response');

class AccessController {
    get = async (req, res, next) => {
        res.send(await AccessService.get())

    }

    signUp = async (req, res, next) => {
        const { error } = userValidate({
            user_email: req.body.user_email,
            user_password: req.body.user_password,
        })
        if (error) return res.send({ error: error.details[0].message, status: 404 })
        res.send(await AccessService.signUp(req.body))
    }

    logIn = async (req, res, next) => {
        const { error } = userValidate({
            user_email: req.body.user_email,
            user_password: req.body.user_password
        })
        if (error) return res.send({ error: error.details[0].message, status: 404 })
        new SuccessResponse({
            metadata: await AccessService.logIn(req.body)
        }).send(res)
    }
    updateAccount = async (req, res, next) => {
        const { error } = userValidate({
            user_email: req.body.user_email,
            user_password: req.user.user_password
        })
        if (error) return res.send({ error: error.details[0].message, status: 404 })
        new SuccessResponse({
            metadata: await AccessService.updateAccount(req)
        }).send(res)

    }
    updateAddress = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.updateAddress(req)
        }).send(res)

    }

}
module.exports = new AccessController;