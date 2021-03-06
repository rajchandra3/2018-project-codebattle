const Task = require('../models/task');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/codebattle', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;


var newTask = new Task({
    title: "Find the n:th number in the Fibonacci sequence",
    description: "Make a function that returns the n:th number in the fibonacci sequence.",
    difficulty: "easy",
    input: ["8","21","54"],
    output: ["21","10946","86267571272"]
});

newTask.save(function(err){
    if(err){
        console.log("Couldn't store the fibonacci task")
    }
    else{
        console.log("Fibonacci task added")
    }
    });


var newTask = new Task({
    title: "Password validator",
    description: "Make a function that returns true if a password is okey and false if the password is not okey. A password is okey iff: it has more than 8 char, at least one numeric digit, at least one alphabetic, doesn't contain any special characters, it has at least one Capital letter. ",
    difficulty: "easy",
    input: ["'acde'","'D12efas2vc'","'dasdfas2dasasd'", "'DSlksd32asdöl'"],
    output: [false,true,false,true]
});

newTask.save(function(err){
    if(err){
        console.log("Couldn't store the password validator task")
    }
    else{
        console.log("Password validator task added")
    }
    mongoose.disconnect();
    });

