const cryto = require('crypto')

const key1 = cryto.randomBytes(32).toString('hex')
const key2 = cryto.randomBytes(32).toString('hex')

console.table(key1,key2);