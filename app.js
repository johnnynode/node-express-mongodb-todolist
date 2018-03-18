var express = require('express');
var todoCtrl = require('./controllers/todoController');

var app = express();

app.set('view engine', 'ejs'); // 模型引擎 设置

app.use(express.static('./public')); // 静态服务器
todoCtrl(app);

app.listen(3000, ()=> {
  console.log('server is on 3000');
});