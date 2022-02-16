import { Router } from 'express'
import paymentCtrl from '../controllers/paymentCtrl.js'
import auth from '../middleware/auth.js'
import authAdmin from '../middleware/authAdmin.js'

const router = Router()

router.route('/payment')
  .get(auth, authAdmin, paymentCtrl.getPayments)
  .post(auth, paymentCtrl.createPayment)

export default router
