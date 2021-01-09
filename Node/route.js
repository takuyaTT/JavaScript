const requesthandle = require("./requestHandlers");

let handle = {};
handle["/index"] = requesthandle.startcall;
handle["/end"] = requesthandle.endcall;

function route(pathName,handle){
    switch(pathName){
        case '/index':
            console.log("indexが指定された");
            if(typeof handle[pathName] === 'function'){
                handle[pathName]();
            }   
            break;
        case '/favicon.ico':
            break;
        default:
            console.log("???")
    }
}

exports.routing = route;
exports.handle = handle;