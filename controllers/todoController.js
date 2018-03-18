var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');
mongoose.connect('mongodb://joh:joh123456@ds117489.mlab.com:17489/todos');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
 item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var itemOne = Todo({item:"buy flowers"}).save((err)=>{
  if(err) throw err;
  console.log('item saved');
})

var data = [ {item: 'get milk'}, {item: "walk dog"}, {item: 'kick some coding ass'} ];

module.exports = function (app) {
  app.get('/todo', (req, res) => {
    res.render('todo', {todos:data});
  });

  app.post('/todo', urlencodedParser, (req, res)=> {
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo/:item', (req, res) => {
    data = data.filter(function(todo) {
      return todo.item.replace(/ /g, "-") !== req.params.item;
    });
    res.json(data);
  });
}