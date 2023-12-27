//1
const LogBuilder = require("@zohocrm/nodejs-sdk-2.0/routes/logger/log_builder").LogBuilder;
const Levels = require("@zohocrm/nodejs-sdk-2.0/routes/logger/logger").Levels;

/*
* Create an instance of Logger Class that takes two parameters
* level -> Level of the log messages to be logged. Can be configured by typing Levels "." and choose any level from the list displayed.
* filePath -> Absolute file path, where messages need to be logged.
*/
let logger = new LogBuilder()
.level(Levels.INFO)
.filePath("/Users/user_name/Documents/node_sdk_logs.log")
.build();

//2
const UserSignature = require( "@zohocrm/nodejs-sdk-2.0/routes/user_signature").UserSignature;
//Create an UserSignature instance that takes user Email as parameter
let user = new UserSignature("abc@zoho.com");

//3
const USDataCenter = require( "@zohocrm/nodejs-sdk-2.0/routes/dc/us_data_center").USDataCenter;
/*
 * Configure the environment
 * which is of the pattern Domain.Environment
 * Available Domains: USDataCenter, EUDataCenter, INDataCenter, CNDataCenter, AUDataCenter
 * Available Environments: PRODUCTION(), DEVELOPER(), SANDBOX()
*/
let environment = USDataCenter.PRODUCTION();

//4
const OAuthBuilder = require("@zohocrm/nodejs-sdk-2.0/models/authenticator/oauth_builder").OAuthBuilder;
/*
* Create a Token instance that requires the following
* clientId -> OAuth client id.
* clientSecret -> OAuth client secret.
* refreshToken -> REFRESH token.
* accessToken -> Access token.
* grantToken -> GRANT token.
* id -> User unique id.
* redirectURL -> OAuth redirect URL.
*/
//Create a Token instance
// if refresh token is available
// The SDK throws an exception, if the given id is invalid.
let token = new OAuthBuilder()
.id("id")
.build();

// if grant token is available
/* let token = new OAuthBuilder()
.clientId("clientId")
.clientSecret("clientSecret")
.grantToken("grantToken")
.redirectURL("redirectURL")
.build(); */

// if ID (obtained from persistence) is available
/* let token = new OAuthBuilder()
.clientId("clientId")
.clientSecret("clientSecret")
.refreshToken("refreshToken")
.redirectURL("redirectURL")
.build(); */

// if access token is available
/* let token = new OAuthBuilder()
.accessToken("accessToken")
.build(); */

//5

const DBBuilder = require("@zohocrm/nodejs-sdk-2.0/models/authenticator/store/db_builder").DBBuilder;
const FileStore = require("@zohocrm/nodejs-sdk-2.0/models/authenticator/store/file_store").FileStore;
/*
* hostName -> DataBase host name. Default value "localhost"
* databaseName -> DataBase name. Default  value "zohooauth"
* userName -> DataBase user name. Default value "root"
* password -> DataBase password. Default value ""
* portNumber -> DataBase port number. Default value "3306"
* tableName -> Table Name. Default value "oauthtoken"
*/
let tokenstore = new DBBuilder()
.host("hostName")
.databaseName("databaseName")
.userName("userName")
.portNumber("portNumber")
.tableName("tableName")
.password("password")
.build();

//let tokenstore = new FileStore("absolute_file_path");

//6


const SDKConfigBuilder = require("@zohocrm/nodejs-sdk-2.0/routes/sdk_config_builder").MasterModel;

/* By default, the SDK creates the SDKConfig instance
 * autoRefreshFields (default - false)
 * if true - all the modules' fields will be auto-refreshed in the background, every hour.
 * if false - the fields will not be auto-refreshed in the background. The user can manually delete the file(s) or refresh the fields using methods from ModuleFieldsHandler(utils/util/module_fields_handler.js)
 * 
 * pickListValidation (default - true)
 * A boolean field that validates user input for a pick list field and allows or disallows the addition of a new value to the list.
 * if true - the SDK validates the input. If the value does not exist in the pick list, the SDK throws an error.
 * if false - the SDK does not validate the input and makes the API request with the user’s input to the pick list
 */
let sdkConfig = new SDKConfigBuilder().pickListValidation(false).autoRefreshFields(true).build();

//7


let resourcePath = "/Users/user_name/Documents/nodejs-app";


//8


const ProxyBuilder = require("@zohocrm/nodejs-sdk-2.0/routes/proxy_builder").ProxyBuilder;

/*
 * RequestProxy class takes the following parameters
 * host -> Host
 * port -> Port Number
 * user -> User Name. Default null.
 * password -> Password. Default null
 */
let requestProxy = new ProxyBuilder()
.host("proxyHost")
.port("proxyPort")
.user("proxyUser")
.password("password")
.build();

