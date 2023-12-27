
const _ = require('lodash')
let authHeader = require('./auth-header').authHeader
var axios = require('axios')
const { writeFile } = require( 'fs/promises')
let generateGrantToken = require('../../helpers/zohohelpers/zohotokens').generateGrantToken

var getZoho = async (module, data, requestType, method, page, per_page, applied_filter) => {
    console.log('getZoho called')
    //console.log(await authHeader())
    let authheder = await authHeader()
    let currentUrl = `https://books.zoho.com/api/v3/${module}?organization_id=${process.env.ZOHO_SELF_CLIENT_ORGANIZATION_ID}&page=${page}&per_page=${per_page}&status=${applied_filter}`


    var config = {
        method: method,
        url: currentUrl,
        headers: { ...authheder }
    };

    if (requestType == "create") {
        config=   _.extend(config, {
            data: data,
            headers: {...authheder, "Content-Type" : "application/json", "charset": "UTF-8"}
        })

    
    }
    console.log(config)

    let result = axios(config)
        .then(function (response) {
            console.log('getZoho success')
            console.log(response.data)

            return response.data

        })
        .catch(async function (error) {
            console.log('getZoho failure')
            //console.log(error)
            console.log(error.response)
            /* if (error.response.status == 400 || error.response.status == 401) {
                console.log('get new token')

                let newToken = await generateGrantToken()
                console.log('after generate token' + newToken.access_token)
                let file = '../Coming-soon-backend/src/config/zohoconfigs/accesstoken.txt'

                let newre = await writeFile(file, newToken.access_token, 'utf8', page, per_page, applied_filter)
                console.log('after write file')
                return await getZoho(module, data, requestType, method)
                console.log('after again zoho get')
            } */
            // return JSON.stringify(error)

        })
    return result



} //end function




module.exports = {
    getZoho
};
