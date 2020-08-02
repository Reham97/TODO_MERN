var express = require('express');
const router = express.Router();
const TodoTasks = require('../models/TodoTasks.js');

router.get('',(req,res)=>{
    // const data ={
    //     title: "task1",
    //     body: "task1 for Uduria company",
    //     startDate: Date.now(),
    //     endDate: Date.now(),
    //     status: "Done",
    //     priority: 1,
    // };
    // const newTodoData = new TodoTasks(data);

    // newTodoData.save((error)=>{
    //     if(error)
    //     {
    //         res.send(error);
    //     }
    //     else{
    //         res.send("done");

    //     }
    // });

    TodoTasks.find({}).then((data)=>{
        console.log("Data: ",data);
        res.json(data);
    }).catch((error)=>{
        console.log("Error: ",error);

    })
});

router.get('/getAllData',(req,res)=>{
    TodoTasks.find({  })
    .then((data) => {
        // console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', daerrorta);
        res.status(500).json({message:'Sorry, internal server error'});
    });
});

router.delete('/deleteTodo',(req,res)=>{
   
    TodoTasks.deleteOne({ id: req.body.id }, function (err) {
        if(err) res.status(500).json({message:'Sorry, internal server error'});
        res.json("DEleted");
      });
});


router.post('/newTodo',(req,res)=>{
    const data =  req.body;
    const newTodo = new TodoTasks(data);
    newTodo.save((error)=>{

        if(error)
        {
            res.status(500).json({message:'Sorry, internal server error'});

        }
        else
        {
            console.log(req.body);
            res.json('get Data');
        }
    });

});


module.exports = router;