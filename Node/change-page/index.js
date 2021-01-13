const http = require('http');
const fs = require('fs');

/*
    fs.readFile(path[, options], callback)
    ファイルの内容全体を非同期的に読み取る。
    callbackにはerrとdataの2つの引数を渡す。dataにコンテンツのファイルが入る。
    例）
    fs.readFile('/etc/passwd', 'utf8', (err,data)=>{});

    fs.readFileSync(path[, options])
    コンテンツのパスを返す。
    エンコーディングオプションが指定されている場合、この関数は文字列を返す。それ以外の場合は、バッファを返す。
*/
let indexPage = fs.readFileSync('./index.html','utf-8');
let nextPage = fs.readFileSync('./next.html','utf-8');

const server = http.createServer((req,res)=>{
    let target = "";
    // req.urlでリクエストのurl(この場合、localhost:1230の後のパス)を取得する
    switch(req.url){
        case "/":
        case "/index" :
            target = indexPage;
            break;
        case "/next":
            target = nextPage;
            break;
        default:
            res.writeHead(404,{'Content-Type':'text/plain'});
            res.write('ページが見つかりません');
            res.end();
            return;
    }
    
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(target);
    res.end();
});

server.listen(1230);
console.log("サーバー起動");