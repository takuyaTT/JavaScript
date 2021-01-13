const http = require('http');
const fs = require('fs');
// URL解析用
const url = require('url');
// クエリ文字列解析用
const qs = require('querystring');

const indexPage = fs.readFileSync('./index.html','utf-8');

const server = http.createServer((req,res)=>{
    // メソッドの種類はreq.method()で判別可能
    if(req.method === "GET"){
        /* 
            url.parse()
            
        */
        let urlParts = url.parse(req.url,true);
        console.log("----" + req.method + "----");
        console.log("name : " + urlParts.query.name);
        console.log("age : " + urlParts.query.age);
    }else if(req.method === "POST"){
        let body = "";
        req.on('data',(data)=>{
            body += data;
        });

        req.on('end',()=>{
            let params = qs.parse(body);
            console.log("----" + req.method + "----");
            console.log("name : " + params.name);
            console.log("age : " + params.age);
        });
    }else{
        console.log(req.method);
    }

    res.writeHead(200,{'Content-Type': 'text/html'});
    res.write(indexPage);
    res.end();
});

server.listen(1230);
console.log("サーバ起動")