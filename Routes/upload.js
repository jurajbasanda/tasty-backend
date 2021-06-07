import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()
//Set storage engine
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/')
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		)
	},
})
//Chceck if it is image jpg/jpeg/png
function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png/
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	const mimetype = filetypes.test(file.mimetype)

	if (extname && mimetype) {
		return cb(null, true)
	} else {
		cb('Images only!')
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb)
	},
}).single('image')

router.post(
	'/',
	(req, res) => {
		upload(req, res, (err) => {
			if (err) {
				console.log(err)
			} else {
				res.send(`/${req.file.path}`)
				console.log('File uploaded')
			}
		})
	}
)

export default router
