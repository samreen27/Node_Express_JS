const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/auth')
const auth = require('../middleware/authentication')

console.log('authrouter')
router.route('/register').post(register)
router.post('/login', login)

module.exports = router