// require(); = 要求する
// Node.jsに同梱されているhttpモジュールへのアクセスが変数を通して可能になる
const http = require("http");
const url = require("url");

// サーバー起動を関数化
function serverStart(port,route,handle){
    http.createServer((req,res)=>{
        // URL取得してルーティングに渡す
        let pathName = req.url;
        route(pathName,handle);
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.write("Module Server has started.");
        res.end();
    }).listen(port);
}

// startというメソッド名でエクスポート
exports.start = serverStart;