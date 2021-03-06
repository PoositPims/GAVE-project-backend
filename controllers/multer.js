const multer = require("multer");

exports.upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // console.log(file);
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}.${file.mimetype.split("/")[1]}`);
    },
  }),
});
