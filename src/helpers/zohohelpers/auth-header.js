const { readFile } = require( 'fs/promises')

async function authHeader(data) {
    let token = await readFile('../Coming-soon-backend/src/config/zohoconfigs/accesstoken.txt', 'utf8')
    if (true) {
        return { 
            Authorization: `Zoho-oauthtoken ${token}`, 
           
         };
    } else {
        return {};
    }
}

module.exports = {
    authHeader
}