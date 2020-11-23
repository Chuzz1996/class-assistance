const express = require('express'),
    router = express.Router(),
    controller = require('./controller');

router.post("/",(req,res)=>{
    var mail = req.body.mail;
    controller.accessSpreadsheet(mail).then((result)=>{
      if(result){
        res.send({'success':true,'result':result})
      }
    }).catch((err)=>{
        res.send({'success':false,'result':err});
    })
  })

module.exports = router;