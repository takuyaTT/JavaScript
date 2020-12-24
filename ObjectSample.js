/* ----------------------
オブジェクト
プロパティの集合体
keyとvalueの対

{} -> オブジェクトリテラルと呼ぶ 
---------------------- */

const name = "takuya";
const obj = {
    key : "value",
    // 識別子の命名規則に引っかかる場合はダブルかシングルで囲む
    "key-value" : "key-value",
    objName : name,
};
console.log(obj.objName); // -> takuya

// 変数名が同じ場合は省略可能
const userName = {
    name
};
console.log(userName.name); // -> takuya

/* ----------------------
JavaとJavaScriptのインスタンス生成について
-------------------------
●Java
Object sample = new Object();
●JavaScript
const sample = new Object();
or
const sample = {};
********************************************
# オブジェクトリテラル（{}）は、
# このビルトインオブジェクトであるObjectを元にして
# 新しいオブジェクトを作成するための構文
********************************************

-------------------------
ブラケット記法
①任意の式も記述可能。つまり、識別子の命名規則とは関係なく、
任意の文字列(""か''を忘れず指定)をプロパティ名として指定できる
②プロパティ名に変数を利用できる。
------------------------- */
const sample = {
    key : "value",
    123 : 456,
    "sample-key" : "sample-key"
};
// console.log(sample.123); -> NG
console.log(sample[123]); // -> 456
console.log(sample["key"]); // -> value

// ②
const lang = {
    ja : "Japanese",
    en : "English"
};
// myLangにlangのプロパティ名を格納
const myLang = "ja";
console.log(lang[myLang]); // -> Japanese

/*-------------------------
 分割代入
 ------------------------- */
const japanese = lang.ja;
const english = lang.en;
console.log(japanese); // -> Japanese

// {プロパティ名1,プロパティ名2} = オブジェクト;
const {ja,en} = lang;
console.log(en); // -> English

/* -------------------------
プロパティ追加
下記の場合はプロパティ名が「takuya」値が「user」となる
------------------------- */
console.log(sample);
sample[name] = "user";
console.log(sample[name]); // -> user

/*-------------------------
 プロパティ削除
-------------------------*/
delete sample[name];
console.log(sample); 
// -> 123: 456 key: "value" sample-key: "sample-key"

/*-------------------------
プロパティ凍結
-------------------------*/
Object.freeze(sample);
sample[123] = "takuya";
console.log(sample[123]); // -> 456
/* 
**********************************************************
strictモードだとエラー表示が出てくれるので、組み合わせて使う必要あり
"use strict";
const sampleObj = Object.freeze({
    objName : "samp",
    objValue : 100
});
sampleObj["objName"] = "takuya";
console.log(sampleObj["objName"]);
-> Uncaught TypeError: Cannot assign to read only property 'objName' of object '#<Object>'
**********************************************************
*/

/*-------------------------
 Optional chaining演算子（?.）
------------------------- */
const optionalObj = {
    innerObj : {
        name : "foo"
    }
};
console.log(optionalObj.innerObj.title); // -> undefined
console.log(optionalObj.sample); // -> undefined
// 未定義から未定義でエラーになる
// console.log(optionalObj.sample.title); // -> Uncaught TypeError: Cannot read property 'title' of undefined

console.log(optionalObj?.innerObj?.name); // -> foo
// エラーにならない
console.log(optionalObj?.sample?.title); // -> undefined

/*-------------------------
プロパティの存在確認(in)
------------------------- */
console.log("innerObj" in optionalObj); // -> true
if("name" in optionalObj.innerObj ){
    console.log(`${optionalObj.innerObj.name}`); // -> foo
}else{
    console.log("未定義");
}
/*-------------------------
プロパティの存在確認(hasOwnProperty)
------------------------- */
console.log(optionalObj.hasOwnProperty("innerObj")); // -> true
console.log(optionalObj.innerObj.hasOwnProperty("name")); // -> true
if(optionalObj.innerObj.hasOwnProperty("name")){
    console.log(`${optionalObj.innerObj.name}`); // -> foo
}else{
    console.log("未定義");
}

/* -------------------------
オブジェクトのプロパティ名、値、プロパティ名と値を配列で取得
------------------------- */
const fooObj = {
    first : 1,
    seconde : 2,
    third : 3
};
// プロパティ名を配列取得
console.log(Object.keys(fooObj)); // -> ["first", "seconde", "third"]
// 値を配列取得
console.log(Object.values(fooObj)); // -> [1, 2, 3]
// キーと値の組み合わせを配列で取得
console.log(Object.entries(fooObj)); // -> [["first", 1]["seconde", 2]["third", 3]]

// 反復処理との組み合わせ
const keys = Object.keys(fooObj);
keys.forEach(key =>{
    console.log(key); // -> first seconde third
});

/* -------------------------
オブジェクトの複製およびマージ
------------------------- */
const baaObj = {
    key : "OK", // 引数の順番によってobjのkeyの値に書き換えられる(OK -> value)
    pass : "OK"
};
const newObj = Object.assign({},baaObj,obj);
console.log(newObj); // -> {key: "value", pass: "OK", key-value: "key-value", objName: "takuya"}

// spread構文でのマージ
const objectA = { a: "a" };
const objectB = { b: "b" };
const merged = { 
    ...objectA,
    ...objectB
};
console.log(merged); // -> { a: "a", b: "b" }
// assign()と同じく、上から下へ複製するため、同じキー名があった場合は、順番によって値が上書きされる
// JavaScriptのビルトインメソッドは浅い（shallow）実装のみを提供し、深い（deep）実装は提供していない
// 引数の`obj`を浅く複製したオブジェクトを返す
const shallowClone = (obj) => {
    return Object.assign({}, obj);
};
// 引数の`obj`を深く複製したオブジェクトを返す
function deepClone(obj) {
    const newObj = shallowClone(obj);
    // プロパティがオブジェクト型であるなら、再帰的に複製する
    Object.keys(newObj)
        .filter(k => typeof newObj[k] === "object") 
        .forEach(k => newObj[k] = deepClone(newObj[k]));
        // filterメソッドでobject型に合致したものをk(配列)に格納し、forEachメソッドで格納した分だけdeepCloneする
    return newObj;
}
const objX = { 
    level: 1,
    nest: {
        level: 2
    }
};
const cloneObj = deepClone(objX);
// `nest`オブジェクトも再帰的に複製されている
console.log(cloneObj.nest === obj.nest); // => false
console.log(cloneObj); // -> level: 1 nest: {level: 2}