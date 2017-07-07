var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var query = require('querystring');
var bodyParser = require('body-parser');
var app = express()


var url = 'mongodb://127.0.0.1:27017/stu';
var router = express.Router();

/* GET home page. */
//登录
router.get('/', function(req, res, next) {
  res.render('dr',{err:''});
});

//注册
router.get('/zhuce', function(req, res, next) {
  res.render('zhuce');
});

app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
extended: true
}));
//注册post
router.post('/zhuce_yes', function(req, res, next) {
  var data = req.body;
  // gie传输用req.query获得
  // post传输用req.body获得,post只有在传输后获得,无法直接加载
  //必须在路由前加上
  // app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
  // app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  // extended: true
  // }));
  var mydbInit = function(db, callback) {

     db.collection('wei').insertOne(data, function(err, result) {
      assert.equal(err, null);
      console.log("Inserted a document into the restaurants collection.");
      callback();
    });
  };
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Connected correctly to server.');

    mydbInit(db, function(){
        console.log("init OK.");
        db.close();
    });
  });
  res.render('zhuce_yes');
});

//登录post
router.post('/ok', function(req, res, next) {

  var data = req.body;
  console.log('name'+data.name,'paw'+data.paw);
  var findDB = function(db, callback){
    var cursor = db.collection('wei').find({'name':data.name,'paw':data.paw});
    cursor.each(function(err, doc){
        assert.equal(err, null);
        if(doc !== null){
            console.dir(doc);
            res.render('zhuce_yes',{name:data.name,paw:data.paw});
        } else {
            callback();
            res.render('dr',{err:'帐号或密码错误'});
        }
    });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected correctly to server.');

  findDB(db, function(){
      db.close();
  });
});



});
//用户在线列表
router.get('/biao', function(req, res, next) {
  res.render('biao');
});
//忘记密码
router.get('/mima', function(req, res, next) {
  res.render('mima');
});
//聊天室
router.get('/io', function(req, res, next) {
  res.render('io');
});
module.exports = router;
