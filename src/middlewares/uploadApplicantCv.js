const util = require("util")
const Multer = require("multer")

let processCvFile = Multer({
  storage: Multer.memoryStorage(),
  limits: {fileSize: 1024 * 1024 * 10},
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg, .jpeg, pdf and docx format allowed!'))
    }
  }
}).single("file")

let processFileMiddleware = util.promisify(processCvFile)
module.exports = processFileMiddleware