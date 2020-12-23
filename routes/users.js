const router = require('express').Router();
let User = require('../models/user.model');

const getAllUsers = (req, res) => {
  User.find()
    .then(users => res.status(200).json({
      message: "Successful",
      data: users
    }
      ))
    .catch(err => res.status(400).json({
      message:"An error Occured",
      error:err
      
    }))
}




const createUser = (req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.status(201).json({
      message: "Successful",
    }
      ))
    .catch(err => res.status(400).json({
      message:"An error Occured",
      error:err
      
    }))
};

const updateUser = (req,res)=>{
  const {id} = req.params;
  const {newUsername} = req.body;
  User.update({_id:id},{username:newUsername}).then((user)=>{
    res.status(200).json({
      message: "Successful",
      data: user
    }
      )})
    .catch(err => res.status(400).json({
      message:"An error Occured",
      error:err
      
    }))
  
}

const getOneUser = (req,res)=>{
  const {id} = req.params;
  User.findById(id).then((user)=>{
    res.status(200).json({
      message: "Successful",
      data: user
    }
      )
  })

    .catch(err => res.status(400).json({
      message:"An error Occured",
      error:err
      
    }))
}

const deleteUser = (req,res)=>{
  const {id} = req.params;
  User.findByIdAndRemove(id).then(()=>{
    res.status(200).json({
      message: "Successful",
    }
      )
  })

    .catch(err => res.status(400).json({
      message:"An error Occured",
      error:err
      
    }))
}



router.route("/").post(createUser).get(getAllUsers)
router.route("/:id").put(updateUser).get(getOneUser).delete(deleteUser)
module.exports = router;