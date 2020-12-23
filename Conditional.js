// オブジェクト生成
const obj = {
    name : "Apple",
    product : "MacBook Air",
};

// 条件分岐
if(obj.name === "Apple"){
    switch(obj.product){
        case "MacBook Pro":
            console.log("Pro Model");
            break;
        case "MacBook Air":
            console.log("Middle Model"); // -> Middle Model
            break;
        default:
            console.log("Another Product");
    }
}else if(obj.name === "Google"){
    console.log("Google Product");
}else {
    console.log("Another Company");
}

// 関数(swtichのみ)
function getCompanyProduct({product}){
    switch(product){
        case "MacBook Pro":
            console.log("Pro Model");
            break;
        case "MacBook Air":
            console.log("Middle Model");
            break;
        default:
            console.log("Another Product");
    }
}
getCompanyProduct(obj); // -> Middle Model