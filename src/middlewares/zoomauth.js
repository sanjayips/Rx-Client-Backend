const zoomconfig = require('./zoomconfig')
const jwt = require('jsonwebtoken')

const payload = {
    iss: zoomconfig.development.APIKey,
    exp: ((new Date()).getTime() + 5000)
}

const zoomtoken = jwt.sign(payload, zoomconfig.development.APISecret)
const hostemail = "jamshaidsabir411980@gmail.com"

function addToken(req, res, next) {
    req.body["token"] = zoomtoken
    next();
}


module.exports = {zoomtoken, hostemail}