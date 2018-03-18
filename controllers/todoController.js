var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');
mongoose.connect('mongodb://joh:joh123456@ds117489.mlab.com:17489/todos');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
 item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function (app) {
  app.get('/todo', (req, res) => {
    Todo.find({}, (err, data)=>{
      if(err) throw err;
      res.render('todo', {todos:data});
    });
  });

  app.post('/todo', urlencodedParser, (req, res)=> {
    Todo(req.body).save((err, data)=> {
      if(err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', (req, res) => {
    Todo.find({item: req.params.item.replace(/-/g, " ")}).remove((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });
}