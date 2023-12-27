const util = require("util")
const Multer = require("multer")

let processVideoTutorialFiles = Multer({
  storage: Multer.memoryStorage(),
  limits: {fileSize: 1024 * 1024 * 35},
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "video/mp4") {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only MP4 format allowed!'))
    }
  }
}).single("vidTutorials")

let processVideoTutorialFileMiddleware = util.promisify(processVideoTutorialFiles)
module.exports = processVideoTutorialFileMiddleware