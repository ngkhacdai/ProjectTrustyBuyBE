
const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-xclient-id',//user id
    AUTHORIZATION: 'ahthorization', //access token
    REFEREHSTOKEN: 'x-actoken-id'
}

const { findByUserId } = require('../services/keyToken.service');


const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '10 days'
        });
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '30 days'
        });

        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error(`error verify::`, err);
            } else {
                console.log(`decode verify::`, decode);
            }
        })
        return { accessToken, refreshToken };
    } catch (error) {
        console.log('error::' + error);
    }
}


const authentication = async (req, res, next) => {
    /*
    1 - Check userId missing?
    2 - get accessToken
    3 - veriftToken
    4 - check user in bds?
    5 - check keyStore with userId?
    6 - Ok all 
    */

    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) {
        console.log('userID not' + userId);
    }
    const keyStore = await findByUserId(userId);
    if (!keyStore) {
        console.log('keyStore not ' + keyStore);
    }
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) {
        console.log('accessToken not ' + accessToken);
        return res.status(403).json({
            message: 'accessToken not'
        })
    }
    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
        console.log(decodeUser);
        if (userId !== decodeUser.userId) {
            next(createError(403, 'accessToken not'));
        }
        req.keyStore = keyStore;
        req.user = decodeUser;
        return next();
    } catch (error) {
        next(createError(403, 'Error: ' + error));
    }

}
module.exports = {
    createTokenPair,
    authentication
}
