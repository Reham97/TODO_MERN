var mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const TodoTasksSchema = new Schema({
    title: String,
    body: String,
    startDate: Date,
    endDate: Date,
    status: String,
    priority: Number,
});

//Model
const TodoTasks = mongoose.model('TodoTasks',TodoTasksSchema);

module.exports = TodoTasks;