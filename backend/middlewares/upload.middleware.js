import multer from 'multer';
import path from 'path';

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File filter for Excel files only
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.xlsx' && ext !== '.xls') {
    return cb(new Error('Only Excel files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
