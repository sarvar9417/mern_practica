const {Router} = require('express')
const router = Router()
const Link = require('../models/Link')

router.get('/:code', async (req, res)=>{
    try {
        const link = await Link.findOne({code: req.params.code})
        if (link){
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }
        res.status(404).json({message: 'Ma\'lumot topilmadi'})
    }catch (e) {
        res.status(500).json({message:'Serverda xatolik yuz berdi'})
    }
})

module.exports = router