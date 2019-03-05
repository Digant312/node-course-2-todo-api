const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token, 'cuafd2324@#$^*');
        // console.log(decoded)
        // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        // const user = await User.findById('5c7ec784df34761485a47e19');
        // if(!user){
        //     throw new Error();
        // }

        // req.user = user;
        next();
    } catch(e) {
        res.status(401).send({ error: 'Please authenticate.'});
    }
}

module.exports = auth;