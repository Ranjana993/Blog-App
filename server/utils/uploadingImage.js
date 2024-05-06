const path = require("path");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, path.join(__dirname, "../public/images"))
    }
  },
  filename: (req, file, cb) => {
    const name = Date.now() + '_' + file.originalname
    cb(null, name)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true)
  }
  else {
    cb(new Error('File type not supported'), false)
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })
module.exports = upload




