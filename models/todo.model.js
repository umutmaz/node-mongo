const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  username: { type: String, required: true },
  todoName: { type: String, required: true },
  todoType: { type: String, required: true },
  dueDate: { type: Date, required: true },
  isDone:{type:Boolean, default:false}
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;