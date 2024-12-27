const express = require("express")
const router = express.Router()
const Subscriber = require('../models/subscriber')
const subscriber = require("../models/subscriber")

//RESTFUL API DESIGN TO HANDLES CRUD OPERATIONS

//Getting all subscribers
router.get('/',async(req,res)=>{
    try{
        const subscribers = await Subscriber.find()
        res.send(subscribers)
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
})


//Getting one subscriber
router.get('/:id', async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Subscriber not found' })
        }
        res.json(subscriber)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


//creating one subscriber
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel,
    });

    try {
        const newSub = await subscriber.save();
        res.status(201).json(newSub);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


//updating one subscriber
router.patch('/:id',async(req,res)=>{
    try{
        const user = await subscriber.findById(req.params.id)
        if(user == null){
           return res.status(404).send("User not found")
        }
        if(req.body.name != null){
            user.name=req.body.name
        }
        if(req.body.subscribedToChannel != null){
            user.subscribedToChannel=req.body.subscribedToChannel
        }
        const updatesub=await user.save() 
        res.status(201).json(updatesub)
    }
    catch(err){
        res.status(400).json({message:message.err})
    }
})

//deleting one subscriber
router.delete('/:id',async(req,res)=>{
    try{
        const deleteUser = await subscriber.findById(req.params.id)
        if(deleteUser == null){
            res.status(404).json({message:"Subscriber Not Found"})
        }
          await deleteUser.deleteOne()
        res.json({message:"User deleted successfully"})
    }
    catch(err){
        res.status(500).json({message:message.err})
    }
})

module.exports = router
