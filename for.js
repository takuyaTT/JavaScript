// 通常
let num = 5;
for(let i = 0; i<num;i++){
    console.log(i);
}

// 配列
let array = ["a","b","c"];
array.forEach(text =>{
    console.log(text); // -> a b c
});

// オブジェクト生成
const obj = {
    Apple : "Macbook",
    Amazon : "Kindle",
    Google : "Chromebook",
    MicroSoft : "Surface"
};

/* for~in(使用を避けるべき)
    オブジェクトのプロパティに対して、反復処理
    親オブジェクトまで列挙可能なものがあるかを探索して列挙してしまう
    配列の場合は、要素のプロパティ名(インデックス値)が列挙される

for(const company in obj){
    const product = obj[company];
    console.log(`Company : ${company} , Product : ${product}`);
    // -> Apple : Macbook Amazon : Kindle Google : chromebook Microsoft : Surface
}

array = [1,2,3];
let total = 0;
for(let num in array){
    total += num;
}
console.log(total); -> "0012"
*/

// 代わりにObject.keysメソッドを利用する
Object.keys(obj).forEach(company =>{
    const product = obj[company];
    console.log(`Company : ${company} , Product : ${product}`);
    // -> Apple : Macbook Amazon : Kindle Google : chromebook Microsoft : Surface
});

// 配列から特定の値だけを集めた新しい配列を作る
function isEven(num) {
    return num % 2 === 0;
}

let arrayNumbers = [1, 5, 10, 15, 20];
console.log(arrayNumbers.filter(isEven)); // => [10, 20]

/*
もしくは下の書き方でももちろんOK(isEven文が不要になる)
console.log(arrayNumbers.filter(num => {
    return num % 2 === 0;
}));
*/

/* for of
Symbol.iteratorという特別な名前のメソッドを実装したオブジェクトをiterableと呼び、
iterableオブジェクトは、for...of文で反復処理が可能
String型ももちろん使える
*/
for(const value of array){
    console.log(value); // -> a b c
}

const str = "Amazon";
for(const value of str){
    console.log(value); // -> A m a z o n
}

/*
javaの場合
String[] array = {"a","b","c"};
for(String text : array){
    System.out.println(text);
}
*/

/* reduceメソッド
    変数宣言なしで反復処理ができる
    const result = array.reduce((前回の値, 現在の値) => {
        return 次の値;
    },初期値);
*/
function printName(array){
    return array.reduce((user,word)=>{
        return user + word;
    },"T");
}
printName(["T","A","K","U","Y","A"]); // -> TTAKUYA
