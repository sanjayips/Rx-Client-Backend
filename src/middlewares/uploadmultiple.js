const util = require("util")
const Multer = require("multer")

let processMultipleFiles = Multer({
  storage: Multer.memoryStorage()
}).array("file", 2)

let processFileMiddleware = util.promisify(processMultipleFiles)
module.exports = processFileMiddleware