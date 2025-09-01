import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const allowedFiles = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
  if (!allowedFiles.includes(file.mimetype)) {
    // To reject this file pass `false`, like so:
    cb(new Error("Only images are allowed"), false);
  } else {
    // To accept the file pass `true`, like so:
    cb(null, true);
  }
}

export const upload = multer({ storage: storage, fileFilter: fileFilter });
