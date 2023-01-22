var express = require('express');
var app = express();
const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);
const bodyParser  = require('body-parser');
const Emp = require('/Models/emp');

//Routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    res.send('Hello World!');
  });
app.post('/add', function(req,res) {
  const emp = new Emp({
    empName: req.body.empName,
    empEmail: req.body.empEmail,
  });
  emp.save().then(val => {
    res.json({ msg: "Employee Added Successfully", val: val })
  })
})

//Database
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.connection.once('open', function(){
    console.log('Database connected Successfully');
}).on('error',function(err){
    console.log('Error', err);
})

// port
app.listen(8000, function () {
  console.log('Listening to Port 8000');
});

