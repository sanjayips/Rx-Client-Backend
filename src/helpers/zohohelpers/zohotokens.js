var axios = require('axios')
let generateGrantToken = async () => {
    console.log('generateGrantToken called')

    //let currentUrl = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoBooks.fullaccess.all&client_id=${process.env.ZOHO_SELF_CLIENT_ID}&state=testing&response_type=code&access_type=offline`

    let currentUrl = `https://accounts.zoho.com/oauth/v2/token?refresh_token=${process.env.ZOHO_SELF_CLIENT_REFRESH_TOKEN}&client_id=${process.env.ZOHO_SELF_CLIENT_ID}&client_secret=${process.env.ZOHO_SELF_CLIENT_SECRET}&grant_type=refresh_token`
   
    var config = {
        method: 'post',
       
       url: currentUrl,
        headers: {}
    };

    console.log(config.url)

    let result = axios(config)
        .then(function (response) {
            console.log('success from get token')
            console.log(response.data) 
           
            return response.data
            
        })
        .catch(function (error) {
            console.log(error);
            return error
        })

        return result
}

module.exports = {
    generateGrantToken
}