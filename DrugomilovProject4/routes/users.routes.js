const {Router}=require('express')
const {User}=require ('../models/User')

const router=Router()

router.get('/',async (req,res)=>{
try {
    const user =await User.findAll();
    res.json(user);
} catch (e){
    res.status(500).json({message:'Что-то пошло не так'})
}
})
module.exports=router