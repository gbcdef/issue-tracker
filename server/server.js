var log = console.log.bind()

var path = require('path')
var mysql = require('mysql')
var connection = mysql.createConnection({
        host:'192.168.2.2',
        user:'issue_tracker',
        password:'issue_tracker123',
        database:'issue_tracker',
})

var query = {
    selectAll: 'SELECT * FROM bugs;',
    push: 'INSERT INTO bugs (reporter, description) VALUES (?)',
    delete: '',
    update: '',
}

connection.connect()

var express =require('express')
var bodyParser=require('body-parser')

var app = express()

// 接受form请求
// app.use(bodyParser.urlencoded({
//     extended: false,
// }))

// 接受json请求
app.use(bodyParser.json())

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
    
})

app.post('/api/new', function(req, res){
    if ('reporter' in req.body && 'desc' in req.body) {
        var data = [req.body.reporter, req.body.desc]
        connection.query(query.push, [data], function(err, rows, fileds){
            if(err){
                res.send(err)
            } else {
                res.json({
                    result: 'succeed',
                })
            }
        })
    } else {
       res.json({
           result: 'failed',
       })
    }

})

app.get('/api/new', function(req, res){
    res.send('hello')
})

app.get('/api/all', function(req, res){
    connection.query(query.selectAll, function(err, rows, fields){
        res.json(rows)
    })
})

app.listen(8023)
