1.socket.io服务器要写在/bin/www中
2.gie传输用req.query获得
post传输用req.body获得,post只有在传输后获得,无法直接加载。
使用post必须在路由前加上
 app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
extended: true
}));

3.socket.io

io.emit()向所有发送
socket.emit()只向请求页发送

io.emit()，socket.emit()可使用setInterval持续发送（向跳转页面发送）
4.用户在线列表不稳定，定时器会因系统延迟发出令浏览器接受到不正确信息
