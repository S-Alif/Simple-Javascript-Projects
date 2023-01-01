const http = require('http');
const port = 3000;

const server = http.createServer(function(req, res){
    res.write('hello world');
    res.end();
})

server.listen(port, function(err){
    if(err){
        console.log("problem : ", err);
    }else{
        console.log("port : ", port);
    }
})