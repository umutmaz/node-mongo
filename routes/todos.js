const router = require('express').Router();
let Todo = require('../models/todo.model');

const getAllTodos = (req, res) => {
  Todo.find()
  .then(todos => res.status(200).json({
    message: "Successful",
    data: todos
  }
    ))
  .catch(err => res.status(400).json({
    message:"An error Occured",
    error:err
    
  }))
}


const createTodo = (req,res)=>{
  const {username, todoName, todoType} = req.body;
  const dueDate = Date.parse(req.body.dueDate);
  const newTodo = new Todo({
    username,
    todoName,
    todoType,
    dueDate,
  })
  newTodo.save().then(() => res.status(201).json({
    message: "Successful",
  }
    ))
  .catch(err => res.status(400).json({
    message:"An error Occured",
    error:err
    
  }))
}



const getOneTodo = (req, res) => {
  
  const {id} = req.params;
  Todo.findById(id).then((todo)=>{
    res.status(200).json({
      message: "Successful",
      data: todo
    }
      )})
    .catch(err => res.status(400).json({
      message:"An error Occured",
      error:err
      
    }))
  
};

const deleteTodo = (req, res) => {
  const {id} = req.params;
  Todo.findByIdAndRemove(id).then(()=>{
    res.status(200).json({
      message: "Successful",
    }
      )})
    .catch(err => res.status(400).json({
      message:"An error Occured",
      error:err
      
    }))
 
};

const updateTodo = (req,res)=>{
  const {id} = req.params;
  const {isDone} = req.body
  Todo.update({_id:id},{isDone}).then((todo)=>{
    res.status(200).json({
      message: "Successful",
      data: todo
    })})
    .catch(err => res.status(400).json({
      message:"An error Occured",
      error:err
      
    }))
}


router.route("/").post(createTodo).get(getAllTodos)
router.route("/:id").get(getOneTodo).put(updateTodo).delete(deleteTodo)
module.exports = router;