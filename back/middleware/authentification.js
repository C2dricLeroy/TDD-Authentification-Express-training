const secret = require('../config/secret.js');
const authentification = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic realm="mon site à moi", charset="UTF-8"');
        res.status(401).end();
    } else {
        const credentials  = new Buffer.from(authHeader.split(' ')[1],'base64').toString();
        const [user,password] = credentials.split(':');
        if (user === secret.user && password === secret.password) {
            next();
        } else {
            res.setHeader('WWW-Authenticate', 'Basic realm="mon site à moi", charset="UTF-8"');
            res.status(401).end();
        }
    }
}

module.exports = authentification;
