/* ---------------------------------------
指定した値のインデックス番号を取得 
--------------------------------------- */
let array = ["Java","JavaScript","PHP","Ruby","GO"];
let indexOfJavaScript = array.indexOf("JavaScript"); // -> 1
console.log(array[indexOfJavaScript]); // -> JavaScript

/* ---------------------------------------
異なるオブジェクトから値が同じものを見つける 
--------------------------------------- */
let monsters = [
    {monster: "Godzila"},
    {monster: "Gamera"},
    {monster: "Kingkong"}
];

// findIndex()メソッド
// 戻り値はインデックス番号
let indexOfGodzila = monsters.findIndex((monsters) =>{
    return monsters.monster === "Godzila";
});
console.log(monsters[indexOfGodzila]); // -> {monster: Godzila}

// find()メソッド
// 戻り値は要素
let godzila = monsters.find((monsters)=>{
    return monsters.monster === "Godzila";
});
console.log(godzila); // -> {monster: "Godzila"}

/* ---------------------------------------
配列の分割代入 
--------------------------------------- */
let [oracle,Mozila,php,ruby,google] = array;
console.log(Mozila); // -> JavaScript

/* ---------------------------------------
配列かオブジェクトかの確認 
--------------------------------------- */
let obj = {};
console.log(Array.isArray(array)); // -> true
console.log(Array.isArray(obj)); // -> false

/* ---------------------------------------
指定したインデックスに要素があるかの確認 
--------------------------------------- */
console.log(array.hasOwnProperty(10)); // -> false

/* ---------------------------------------
配列に指定した値があるか(true/false)
--------------------------------------- */
// includes()メソッド
// 同一オブジェクトのみ
if(array.includes("JavaScript")){
    console.log("JavaScriptあり");
}

// some()メソッド
// 異なるオブジェクトだが同じ値があるか
if(monsters.some((monsters)=>{return monsters.monster === "Godzila"})){
    console.log("Godzila出現"); // -> Godzila出現
}

/* ---------------------------------------
指定した範囲の要素を取得
--------------------------------------- */
console.log(array.slice(1,5)); // -> ["JavaScript", "PHP", "Ruby", "GO"]

/* ---------------------------------------
要素の追加と削除(1)
--------------------------------------- */
let lang = ["Japanese","English"];

// 末尾へ追加(pushメソッド)
lang.push("Chinese");
console.log(lang); // -> ["Japanese", "English", "Chinese"]
// 先頭へ追加(unshiftメソッド)
lang.unshift("Chinese");
console.log(lang); // -> ["Chinese", "Japanese", "English"]

// 末尾を削除(popメソッド)
console.log(lang.pop()); // ->Chinese(末尾削除＋削除した要素を値で返す)
console.log(lang); // ->["Japanese", "English"]
// 先頭を削除(shiftメソッド)
console.log(lang.shift()); // -> Chinese(先頭削除＋削除した要素を値で返す)
console.log(lang); // ->["Japanese", "English"]

/* ---------------------------------------
配列同士の結合
--------------------------------------- */
console.log(array.concat(lang)); // -> ["Java", "JavaScript", "PHP", "Ruby", "GO", "Japanese", "English"]
// 追加も可能
console.log(array.concat("Python")); // -> ["Java", "JavaScript", "PHP", "Ruby", "GO", "Python"]

// spread構文での結合(任意の位置に要素を追加できる)
let countryAndLang = ["Japan","USA", ...lang];
console.log(countryAndLang); // -> ["Japan", "USA", "Japanese", "English"]

/* ---------------------------------------
配列のフラット化
--------------------------------------- */
let prograimingPlusLang = [array, ...lang];
console.log(prograimingPlusLang); // -> [Array(5), "Japanese", "English"]
// flat()メソッド
// 引数にどれくらいフラットにするかを指定して、新しい配列を作成する
prograimingPlusLang = prograimingPlusLang.flat(1);
console.log(prograimingPlusLang); // -> ["Java", "JavaScript", "PHP", "Ruby", "GO", "Japanese", "English"]
// (Infinity)は全てフラット
let infinityArray = [0,[1,2],[["a","b","c"],[3,4],5],"d","e"];
console.log(infinityArray); // -> [0, Array(2), Array(3), "d", "e"]
infinityArray = infinityArray.flat(Infinity);
console.log(infinityArray); // -> [0, 1, 2, "a", "b", "c", 3, 4, 5, "d", "e"]

/* ---------------------------------------
要素の追加と削除(2)
--------------------------------------- */
// インデックスが0、そこから3つの要素を削除して要素を詰める
infinityArray.splice(0,3); 
console.log(infinityArray); // -> ["a", "b", "c", 3, 4, 5, "d", "e"]
console.log(infinityArray[0]); // -> a

// 削除した後に追加する
infinityArray.splice(0,3,1,2); // "a","b","c" が削除され、1と2が追加される
console.log(infinityArray); // -> [1, 2, 3, 4, 5, "d", "e"]

/* ---------------------------------------
配列の反復処理
--------------------------------------- */
// forEach()メソッド(繰り返し処理)
infinityArray.forEach((value,index,infinityArray) =>{
    console.log(value,index,infinityArray);
});
/*
1 0 (7) [1, 2, 3, 4, 5, "d", "e"]
2 1 (7) [1, 2, 3, 4, 5, "d", "e"]
3 2 (7) [1, 2, 3, 4, 5, "d", "e"]
4 3 (7) [1, 2, 3, 4, 5, "d", "e"]
5 4 (7) [1, 2, 3, 4, 5, "d", "e"]
d 5 (7) [1, 2, 3, 4, 5, "d", "e"]
e 6 (7) [1, 2, 3, 4, 5, "d", "e"]
*/

// map()メソッド(非破壊＋戻り値が配列)
//それぞれのコールバック関数が返した値を集めた新しい配列が返り値
let newArray = infinityArray.map((currentValue,index,infinityArray) =>{
    return currentValue + 10;
});
console.log(newArray); // ->[11, 12, 13, 14, 15, "d10", "e10"]

// filter()メソッド
// 配列の要素を順番にコールバック関数へ渡し、コールバック関数がtrueを返した要素だけを集めた
// 新しい配列を返す非破壊的なメソッド
let numbers = [1,2,3,4,5];
let newNumbers = numbers.filter((value,index,numbers) => {
    return value % 2 === 0;
});
console.log(newNumbers); // -> [2, 4]

// reduce()メソッド
// 配列から配列以外を含む任意の値を作成したい場合に利用
const array = [1, 2, 3];
// すべての要素を加算した値を返す
// accumulator(累積値)の初期値は5
const totalValue = array.reduce((accumulator, currentValue, index, array) => {
    return accumulator + currentValue;
}, 5);
// 5 + 1 + 2 + 3という式の結果が返り値になる
console.log(totalValue); // => 11

/* ---------------------------------------
メソッドチェーン
--------------------------------------- */
let attendees = [
    {'name' : "Takuya",'gender' : "men"},
    {'name' : "Sato",'gender' : "women"},
    {'name' : "Suzuki", 'gender' : "men"}
];
let menAttendees = attendees
// filterメソッドでmenを絞り込み(おさらい参照)
.filter(attendees => attendees.gender === "men")
// 絞り込んだ結果から名前の配列を生成(おさらい参照)
.map(attendees => attendees.name);
console.log(menAttendees); // ->  ["Takuya", "Suzuki"]

/* 
■Arrow関数おさらい
const mulB = x => x * x;
1行のみの場合はreturnとブロックを省略できる

■filterメソッドとmapメソッドおさらい
<filter()メソッド>
let newArray = arr.filter(callback(element[, index, [array]])[, thisArg])
●element
配列内で処理中の現在の要素です。
●index ※Optional
配列内で処理中の現在の要素の位置です。
●array ※Optional
filter メソッドが実行されている配列です。
●thisArg ※Optional
callback を実行するときに this として使用する値です。

<map()メソッド>
let new_array = arr.map(function callback( currentValue[, index[, array]]) {
    // 新しい配列の要素を返す
}[, thisArg])
●callback
arr の要素ごとに呼び出される関数です。 callback が実行されるたびに、
返された値が new_array に追加されます。
callback 関数は以下の引数を受け付けます。
●currentValue
現在処理中の要素の値です。
●index ※Optional
現在処理中の要素の配列内における添字です。
●array ※Optional
map が実行されている配列です。
●thisArg ※Optional
callback を実行するときに this として使う値です。
*/