"use strict";

module.exports = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) { // A
        let err = new Error("Authentication failed");
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        next(err);
    }

    let auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    let user = auth[0];
    let pass = auth[1];
    if (user === 'admin' && pass === 'password') {
        next();
    } else {
        let err = new Error('Authentication failed');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        next(err);
    }
};
