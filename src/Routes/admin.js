const bcrypt = require('bcryptjs')
const {Admin, enumRole} = require('../Models/adminSchema') 
const {verifyTokenForUserAndAdmin, 
    verifyTokenForAdmin} = require('../controllers/auth/Authorization')
const router = require('express').Router()

router.get('/find/:id',verifyTokenForUserAndAdmin, async(req,res) => { 
    try {
        const admin = await Admin.findById(req.params.id)
    if(admin){
       return res.status(200).json(admin)
    }else{
        return res.status(400).json('admin not found')
    }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(err.message)
    }
})

router.get('/all',verifyTokenForAdmin, async(req,res) => { 
    try {
        const admin = await Admin.find()
        if(admin){
            return res.status(200).json(admin)
    }else{
        return res.status(400).json('admin not found')
    }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error.message)
    }
})

router.put('/:id',verifyTokenForUserAndAdmin, async(req,res) => { 
    try {

        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password,salt) 

            const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                },
                { new:true})
        
                return res.status(200).json(updatedAdmin)
        }
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error.message)
    }
})

router.delete('/:id',verifyTokenForUserAndAdmin, async(req,res) => { 
    try {
            const adminFound = await Admin.findById(req.params.id)
             if(adminFound){
             await Admin.findByIdAndDelete(req.params.id)
             return res.status(200).json('admin deleted')
      }else{
        res.status(401).json('admin not found')
     }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error.message)
    }
})

module.exports = router