const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function hashString (str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
};

function tokenGenerator(payload){
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '30 days'
    });
    return token;
};

function tokenVerify(token){
    try {
        const result = jwt.verify(token, process.env.SECRET_KEY)
        if(!result?.username) {
            throw {
                status: 401,
                message: 'لطفا وارد حساب کاربری خود شوید',
            };
        };
        return result;
    } catch (error) {
        throw {
            status: 401,
            message: 'لطفا وارد حساب کاربری خود شوید',
        };
    }
};

module.exports = {
    hashString,
    tokenVerify,
    tokenGenerator,
};