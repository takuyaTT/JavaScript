/* 
 JavaScript 関数まとめ(JavaScript Primer)
 ----------------------------
 arg2を指定しない場合はundefined
 ---------------------------- */
function func1(arg1,arg2){
    console.log(arg1 + arg2);
}
function doubleNum(num){
    return num * 2;
}
func1("sample","function"); // -> samplefunction
func1(1,1); // -> 2
console.log(doubleNum(10)); // -> 100

/* ----------------------------
    default引数
---------------------------- */
function func2(name = "デフォルト"){
    console.log("私の名前は" + name + "です。");
}
func2(); // -> 私の名前はデフォルトです。

/* ----------------------------
    Nullish coalescing演算子
---------------------------- */
function func3(age,name){
    const userName = name ?? "Takuya";
    const userAge = age ?? 30;
    return userName + userAge;
}
console.log(func3()); // -> Takuya30

/* ---------------------------- 
   可変長引数(Rest Parameters)
   ---------------------------- */
function func4(...args){
    console.log(args);
}
func4("1","Apple","100",); // -> [1,Apple,100]
function func5(arg1, ...args){
    console.log(arg1);
    console.log(args[1]);
}
func5("Apple","Gozila","Kingkong","Gamera"); // -> Apple Kingkong

/* ---------------------------- 
    配列→可変長引数(spread構文)
   ---------------------------- */
const arrayNum = [1,2,3];
function func6(fuu,baa,hoge){
    console.log(fuu);
    console.log(hoge);
}
func6(...arrayNum); // 1 3

/* ----------------------------
     arguments
    ぱっと見だと混乱を招く可能性があるため使用を避ける
   ---------------------------- */
function func7(){
    console.log(arguments[0]);
    console.log(arguments[1]);
}
func7("Google","Apple"); // -> Google Apple

/* ----------------------------
    分割代入
   ---------------------------- */
// オブジェクト
const obj = {
    company:"Amazon"
};
function func8({company}){
    console.log(company);
}
func8(obj); // -> Amazon
const {company} = obj;
console.log(company); // -> Amazon

// 配列
function arrayPrint([first,second,third]){
    console.log(first);
    console.log(second);
    console.log(third);
}
let arrayList = ["Macbook","Surface","Chromebook"];
arrayPrint(arrayList); // -> Macbook Surface Chromebook

/* ----------------------------
     関数代入
   ---------------------------- */
let myFunc = func1;
myFunc(1,1); // -> 2

/* ----------------------------
     関数式
   ---------------------------- */
const funcName = function(){
    console.log("Hello! My name is Takuya");
    return "Nice to meet you!";
};
console.log(funcName() + "everyone!"); // -> Hello! My name is Takuya Nice to meet you! everyone!

// 再帰的に関数を呼ぶ
const factorial = function innerFunc(n){
    if(n === 0){
      return 1;
    }
    return n * innerFunc(n-1);
  };
  console.log(factorial(3)); // -> 6

/* ----------------------------
     Arrow関数
    
     ●関数式
     変数名 = function (引数){ };
     ↓
     ●Arrow関数
     変数名 = (引数) -> { };
    
    ・名前をつけることができない（常に匿名関数）
    ・thisが静的に決定可能
    ・functionキーワードに比べて短く書ける
    ・newできない（コンストラクタ関数ではない）
    ・arguments変数は参照不可

    基本的にはArrow関数で問題ない場合はこちらで、状況によってfunction関数で使い分ける
   ---------------------------- */
// 仮引数の数と定義
const fnA = () => { /* 仮引数がないとき */ };
// const fnB = (x) => { /* 仮引数が1つのみのとき */ };
const fnC = x => { /* 仮引数が1つのみのときは()を省略可能 */ };
const fnD = (x, y) => { /* 仮引数が複数のとき */ };

// 値の返し方
// 次の２つの定義は同じ意味となる
const mulA = x => { return x * x; }; // ブロックの中でreturn
const mulB = x => x * x;            // 1行のみの場合はreturnとブロックを省略できる

const samplefn = (x = "Takuya") => {
    console.log("Myname is " + x);
};
samplefn("Sato");

const numbers = [1, 5, 10, 15, 20];
console.log(numbers.some(num =>{
  return num % 2 === 0;
}));

/* ----------------------------
     コールバック関数
     (引数として渡される関数)
   ---------------------------- */
arrayList.forEach((lists) => {
    console.log(lists); // Macbook Surface chromebook
});

/* ----------------------------
     メソッド追加
   ---------------------------- */
obj.hello = (name = "Everyone") => {
    console.log("Hello, " + name + ": We are " + obj.company);
};
obj.hello(); // -> Hello, Everyone: We are Amazon
