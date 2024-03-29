import { Router } from 'express'
import cloudinary from 'cloudinary'
import auth from '../middleware/auth.js'
import authAdmin from '../middleware/authAdmin.js'
import fs from 'fs'

const router = Router()

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// })
//================
cloudinary.config({
  cloud_name: 'madd39',
  api_key: '758518379691385',
  api_secret: 'FxpC7poQ13htoLJ6P6ueTTrYabE',
})
//Upload image (only admin in future)
router.post('/upload', (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: 'No files were updated.' })

    const file = req.files.file
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath)
      return res.status(400).json({ msg: 'Size too large.' })
    }
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath)
      return res.status(400).json({ msg: 'File format is incorrect.' })
    }
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: 'test' },
      async (err, result) => {
        if (err) throw err
        removeTmp(file.tempFilePath)
        res.json({ public_id: result.public_id, url: result.url })
      }
      //public_id : result.public_id, url: result.secure_url
    )
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
})
//Delete image (only admin in future)
router.post('/destroy', (req, res) => {
  try {
    const { public_id } = req.body
    if (!public_id) return res.status(400).json({ msg: 'No images Selected' })
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err

      res.json({ msg: 'Deleted Image' })
    })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
})
const removeTmp = path => {
  fs.unlink(path, err => {
    if (err) throw err
  })
}
export default router
