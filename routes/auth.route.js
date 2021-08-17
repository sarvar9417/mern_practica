const {Router} = require('express')
const router = Router()
const {validateUser, User} = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const {error} = validateUser(req.body)
        if (error){
            return res.status(400).json({message: error})
        }
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({message: `Login yoki parol noto\'g\'ri`})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({message: `parol noto\'g\'ri`})
        }
        const token = jwt.sign(
            {userId: user._id},
            config.get('jwtSecret')
            //{expiresIn: '1h'}
        )
        res.send({token, userId: user._id})

    } catch (e) {
        res.status(500).json({message: "Serverga ma'lumot kelmadi"})
    }
})


// /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const {error} = validateUser(req.body)
        if (error){
            return res.status(400).json({
                error: error,
                message: error.message
            })
        }
        const {email, password} = req.body
        const candidate = await User.findOne({email})
        if (candidate){
            return res.status(400).json({message: `${email} nomli foydalanuvchi tizimda mavjud`})
        }
        const hash = await bcrypt.hash(password, 8)
        const newUser = new User({email: email, password: hash})
        await newUser.save()
        res.status(201).json({message: `${email} foydalanuvchi yaratildi`})

    } catch (e) {
        res.status(500).json({message: "Serverga ma'lumot kelmadi"})
    }
})
module.exports = router