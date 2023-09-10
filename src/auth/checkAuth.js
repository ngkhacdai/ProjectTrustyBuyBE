
// const {findById} = require('../services/apiKey.service');

const HEADER ={
    API_KEY : 'x-api-key',
    AUTHORIZATION:'ahthorization'
}
const  apikey = async (req,res,next) =>{
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        console.log(key);
        if (!key) {
            return res.status(403).json({
                message:'Forbidden Error'
            })
        }

        const objKey = await findById(key);
        if (!objKey) {
            return res.status(403).json({
                message:'Forbidden Error'
            })
        }
        req.objKey = objKey
        return next()

    } catch (error) {
    }
}

const permission = (permission) =>{ 
    return(req,res,next) =>{
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: 'permission denied'
            })
        }
        console.log('permissions::'+req.objKey.permissions);
        const validPermission = req.objKey.permissions.includes(permission)
        if (!validPermission) {
            return res.status(403).json({
                message: 'permission denied'
            })
        }
        return next();
    }
}
const asyneHandler = fn =>{
    return(req,res,next) =>{
        fn(req,res,next).catch(next)
    }
}
module.exports ={
    apikey,
    permission,
    asyneHandler
}