// 閏年判別プログラム
// 西暦で示した年が4で割り切れる年はうるう年
// ただし、西暦で示した年が100で割り切れる年はうるう年ではない
// ただし、西暦で示した年が400で割り切れる年はうるう年


const year = new Date().getFullYear(); // 今年を取得
if (year % 400 === 0){
    console.log("閏年");
}else if(year % 100 !== 0){
    if(year % 4 === 0){
        console.log("閏年")
    }
}else{
    console.log("閏年ではない");
}