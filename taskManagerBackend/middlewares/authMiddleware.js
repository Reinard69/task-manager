const jwt = require('jsonwebtoken')
const User = require('../models/User');

/**
 * This function retrieves a token from the authorization header of a request object.
 * @param req - The `req` parameter is an object that represents the HTTP request made by a client to a
 * server. It contains information about the request, such as the request method, headers, and body. In
 * this case, the `getToken` function is expecting the `req` parameter to be an HTTP request
 * @returns The function `getToken` takes in a `req` parameter and checks if the `authorization` header
 * exists in the request and if it starts with the string "Bearer". If it does, it returns the token
 * string that comes after the "Bearer" string. If it doesn't, it returns `null`.
 */
function getToken(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } 
    return null;
}

/**
 * This is a middleware function that checks if a user is authenticated by verifying their token using
 * a secret key.
 * @param req - req stands for request and it is an object that contains information about the incoming
 * HTTP request such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods like `send`, `json`, `status`, etc. that are used to send different
 * types of responses. In this code snippet, `res.send` and `res.json
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the chain. If there are no more middleware functions left in the chain, it passes control to the
 * route handler function.
 */
const requireAuth = (req, res, next) => {
    const token = getToken(req)

    if ( token ) {
        jwt.verify(token, 'task_manager_secret_@@_1245', (err, decodedToken) => {
            if (err) {
                res.send(401).json({
                    message: 'User not logged in'
                })
            }else {
                next()
            }
        })
    } else {
        res.send(401).json({
            message: 'User not logged in'
        })
    }
}

// get current user
const getUser = async ( req ) => {
    const token = getToken(req);

    var res = null;
    if ( token ) {
        res = await jwt.verify(token, 'task_manager_secret_@@_1245', async (err, decodedToken) => {
            if (err === null) {
                let user = await User.findById(decodedToken.id);
                return user
            }else {
                return null
            }
        })
    } 
    return res;
}

module.exports = { requireAuth, getUser };