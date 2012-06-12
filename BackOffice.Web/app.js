var application_root = __dirname, express = require("express"), path = require("path");

var app = express.createServer();

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, "")));
    app.use(express.errorHandler({
        dumpExceptions : true,
        showStack : true
    }));

});

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.get('/todo', function(req, res) {
    res.render('todo', {
        title : "MongoDB Backed TODO App"
    });
});

app.get('/profile', function(req, res) {
    console.log("Making new invoice");
res.send('{"Data":[{"Countries":[],"Currency":"USD","WebTimesheetProfileId":"c870875d-88a4-44c3-a0e3-6adfe939c4c9","WebTimesheetProfileName":"All others"},{"Countries":[{"CountryId":"0ae94767-a0a3-415e-bba7-ce18ac384de0","CountryName":"Singapore"}],"Currency":"USD","WebTimesheetProfileId":"9ca4c780-3efc-4125-9745-82ecf9abeaa1","WebTimesheetProfileName":"Asia"},{"Countries":[{"CountryId":"71a6ee1f-6d32-4def-99a1-9a2dd9739c0d","CountryName":"Finland"}],"Currency":"EUR","WebTimesheetProfileId":"3e3432e5-e741-4739-9c59-7337c4958d7f","WebTimesheetProfileName":"Finland"},{"Countries":[{"CountryId":"d31da4b1-82fa-4ef2-ba7e-21a2a4224e3d","CountryName":"Denmark"},{"CountryId":"fff94ac3-d643-43c6-b3d6-b7f4b16f6311","CountryName":"Norway"},{"CountryId":"398990fd-4323-4f52-b7d2-cda132bf48b9","CountryName":"Sweden"}],"Currency":"NOK","WebTimesheetProfileId":"c3bc639c-519f-47a4-8d40-6601ea29bf17","WebTimesheetProfileName":"Scandinavia"},{"Countries":[{"CountryId":"3addd53c-c400-4036-947e-12591b20d74c","CountryName":"United Kingdom"}],"Currency":"GBP","WebTimesheetProfileId":"26947773-23a6-43a5-83a0-8892d2276fa9","WebTimesheetProfileName":"UK"}],"ErrorMessage":"","IsSuccess":true}')
});

app.get('/api/todos/:id', function(req, res) {
    return Todo.findById(req.params.id, function(err, todo) {
        if(!err) {
            return res.send(todo);
        }
    });
});
/*
 app.put('/api/todos/:id', function(req, res) {
 return Todo.findById(req.params.id, function(err, todo) {
 todo.text = req.body.text;
 todo.thumb = req.body.thumb;
 todo.desc = req.body.desc;
 todo.author = req.body.author;
 todo.done = req.body.done;
 todo.order = req.body.order;
 return todo.save(function(err) {
 if(!err) {
 console.log("updated");
 }
 return res.send(todo);
 });
 });
 });

 app.post('/api/todos', function(req, res) {
 var todo;
 todo = new Todo({
 text : req.body.text,
 thumb : req.body.thumb,
 desc : req.body.desc,
 author : req.body.author,
 done : req.body.done,
 order : req.body.order
 });

 todo.save(function(err) {
 if(!err) {

 return console.log("created!");

 }
 });

 return res.send(todo);
 });

 app.
 delete ('/api/todos/:id',
 function(req, res) {
 return Todo.findById(req.params.id, function(err, todo) {
 return todo.remove(function(err) {
 if(!err) {
 console.log("removed");
 return res.send('')
 }
 });
 });
 }); */

app.listen(3000);
