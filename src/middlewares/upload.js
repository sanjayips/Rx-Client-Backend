const util = require("util")
const Multer = require("multer")

let processFile = Multer({
  storage: Multer.memoryStorage(),
  limits: {fileSize: 1024 * 1024 * 2},
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  }
}).single("file")

let processFileMiddleware = util.promisify(processFile)
module.exports = processFileMiddleware