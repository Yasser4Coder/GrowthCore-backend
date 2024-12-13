import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadCsvMiddleware = upload.single("csvFile");
