const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.clearCookie('uid');
    res.redirect('/')
})

module.exports = router