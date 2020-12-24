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
let text = "text"; // Stringはオブジェクト
console.log(Array.isArray(array)); // -> true
console.log(Array.isArray(text)); // -> false

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