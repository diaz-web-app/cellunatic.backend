import multer,{diskStorage,StorageEngine,DiskStorageOptions} from 'multer'

const storage:StorageEngine = diskStorage({
    destination: './public/uploads',
    filename: function (_, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  

const upload_cover = multer({ storage: storage })
export default upload_cover