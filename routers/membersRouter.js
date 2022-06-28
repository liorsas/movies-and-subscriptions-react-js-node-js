const express = require('express')

const membersBL = require('../models/membersModelBL')
const{ validateToken} = require('../middlewares/AuthMiddleWare')

const router = express.Router();

 router.route('/').
 get( async function(req,resp){

 let members = await membersBL.getMembers();
  return resp.json(members)


 })


 router.route('/:id').
 get(async function(req,resp){

 let idval = req.params.id   

let member = await membersBL.getMember(idval)
return resp.json(member)

 })

 router.post('/',validateToken,async function(req,resp){

let data = req.body; 


let status = await membersBL.addMember(data)
return resp.json(status)

 })

router.put("/:id",validateToken,async function(req,resp){

let id = req.params.id;
let obj = req.body

let status = await membersBL.updateMember(id,obj)
return resp.json(status)


})

router.route("/:id").
delete(async function(req,resp){

 let id = req.params.id;
 let status = await membersBL.deleteMember(id)

 return resp.json(status)



})



module.exports = router;