/* 

前提として、thisは定義した時ではなく`呼び出された時`に何を参照するかが決まる

-------------------------------
実行コンテキストが"Script"
-------------------------------
グローバルオブジェクトを参照

//<script>
// 実行コンテキストは"Script"
//console.log(this); // => window
//</script>

-------------------------------
実行コンテキストが"module"
-------------------------------
 トップレベルのスコープに書かれたthisは常にundefined

<script type="module">
// 実行コンテキストは"Module"
console.log(this); // => undefined
</script>
***************************************************************
グローバルオブジェクトを参照したい場合は、thisではなく`globalThisを使う`
***************************************************************

<関数とメソッドの記述おさらい>

名前	             記述                           関数	  メソッド
関数宣言           function fn() {}                  ✔	       x
関数式             const fn = function(){};	         ✔ 	       ✔
Arrow Function    const fn = () => {}               ✔	      ✔
メソッドの短縮記法   const obj = { method(){} }	       x	     ✔

-------------------------------
疑似的な`this`の値の仕組み
-------------------------------
// 関数は引数として暗黙的に`this`の値を受け取るイメージ
function fn(暗黙的に渡されるthisの値, 仮引数) {
    console.log(this); // => 暗黙的に渡されるthisの値
}
// 暗黙的に`this`の値を引数として渡しているイメージ
fn(暗黙的に渡すthisの値, 引数);

関数におけるthisの基本的な参照先（暗黙的に関数に渡すthisの値）はベースオブジェクト(そのメソッドが宣言されているオブジェクト)
ベースオブジェクトがない場合のthisはundefined

-------------------------------
strictモード(厳格)ではない場合は、windowになる
-------------------------------
これはthisがundefindの場合、JavaScriptが自動的にグローバルオブジェクトを参照するため
function outer() {
    console.log(this); 
    function inner() {
        console.log(this); 
    }
    // `inner`関数呼び出しのベースオブジェクトはない　= windowを参照
    inner(); // -> window
}
 `outer`関数呼び出しのベースオブジェクトはない = windowを参照
outer(); // -> window
*/

// "use strict"
function outer() {
    console.log(this); // => undefined
    function inner() {
        console.log(this); // => undefined
    }
    // `inner`関数呼び出しのベースオブジェクトはない
    inner(); // -> undefind
}
// `outer`関数呼び出しのベースオブジェクトはない
outer(); // -> undefind

// strict modeのメソッド以外の関数におけるthisはundefinedとなるため、メソッド以外でthisを使う必要はない

/*
-------------------------------
メソッドの`this`
-------------------------------
*/
const obj = {
    // 関数式をプロパティの値にしたメソッド
    method1: function() {
        return this;
    },
    // 短縮記法で定義したメソッド
    method2() {
        return this;
    }
};
// メソッド呼び出しの場合、それぞれの`this`はベースオブジェクト(`obj`)を参照する
// メソッド呼び出しの`.`の左にあるオブジェクトがベースオブジェクト
console.log(obj.method1()); // => obj
console.log(obj.method2()); // => obj

const person = {
    fullName: "Brendan Eich",
    sayName: function() {
        // `person.fullName`と書いているのと同じ
        return this.fullName;
    }
};
// `person.fullName`を出力する
console.log(person.sayName()); // => "Brendan Eich"

/*
-------------------------------
thisの問題点1
メソッド　→　関数
-------------------------------
 `sayName`メソッドは`person`オブジェクトに所属する
 `this`は`person`オブジェクトとなる
console.log(person.sayName()); // => "Brendan Eich"

 `person.sayName`を`say`変数に代入する
const say = person.sayName;

 代入したメソッドを関数として呼ぶ
 この`say`関数はどのオブジェクトにも所属していない
 `this`はundefinedとなるため例外を投げる
say(); // -> TypeError: Cannot read property 'fullName' of undefined
*/

/*
●回避策●
<call()メソッド>
関数.call(thisの値, ...関数の引数);
※thisの値が不要の場合はnullを指定

<apply()メソッド>
関数.apply(thisの値, [関数の引数1, 関数の引数2]);
※thisの値が不要の場合はnullを指定

<bind()メソッド>
関数.bind(thisの値, ...関数の引数); // => thisや引数がbindされた関数
thisの値を束縛（bind）した新しい関数を作成
*/

function printWord(message){
    return message + this.name;
}
const human = {
    name : "Takuya"
};

// call
console.log(printWord.call(human,"My name is ")); // -> My name is Takuya
// apply
console.log(printWord.apply(human,["My name is "])); // -> My name is Takuya
// bind 
let messageAndName = printWord.bind(human,"My name is "); 
console.log(messageAndName()); // -> My name is Takuya

/*
-------------------------------
thisの問題点2
コールバック関数
-------------------------------
コールバック関数の場合は匿名関数を呼び出す
つまり、匿名関数にはベースオブジェクトが存在せず、undefineとなるため例外が出る

"use strict";
// strict modeを明示しているのは、thisがグローバルオブジェクトに暗黙的に変換されるのを防止するため
const Prefixer = {
    prefix: "pre",
     `strings`配列の各要素にprefixをつける
    prefixArray(strings) {
        return strings.map(function(str) {
            // コールバック関数における`this`は`undefined`となる(strict mode)
            // そのため`this.prefix`は`undefined.prefix`となり例外が発生する
            return this.prefix + "-" + str;
        });
    }
};
// `prefixArray`メソッドにおける`this`は`Prefixer`
Prefixer.prefixArray(["a", "b", "c"]); // => TypeError: Cannot read property 'prefix' of undefined

*/

// 対処法1 thisを一時変数へ代入
"use strict";
let Prefixer = {
    prefix: "pre",
    prefixArray(strings) {
        // `that`は`prefixArray`メソッド呼び出しにおける`this`となる
        // つまり`that`は`Prefixer`オブジェクトを参照する
        const that = this;
        return strings.map(function(str) {
            // `this`ではなく`that`を参照する
            return that.prefix + "-" + str;
        });
    }
};
// `prefixArray`メソッドにおける`this`は`Prefixer`
let prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]

// 対処法2 map()メソッドのthis指定
"use strict";
Prefixer = {
    prefix: "pre",
    prefixArray(strings) {
        // `Array#map`メソッドは第二引数に`this`となる値を渡せる
        return strings.map(function(str) {
            // `this`が第二引数の値と同じになる
            // つまり`prefixArray`メソッドと同じ`this`となる
            return this.prefix + "-" + str;
        }, this); // ここで指定
    }
};
// `prefixArray`メソッドにおける`this`は`Prefixer`
prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]

// 対処法3 Arrow関数を利用する
// 暗黙的なthisの値を受け取らない(スコープチェーンの仕組みと同様に外側の関数を探索)
// 呼び出し方には関係なく、常に外側の関数のthisをそのまま利用
// つまり、Arrow Function自身の外側のスコープに定義されたもっとも近い関数のthisの値となる

"use strict";
Prefixer = {
    prefix: "pre",
    prefixArray(strings) {
        return strings.map((str) => {
            // Arrow Function自体は`this`を持たない
            // `this`は外側の`prefixArray`関数が持つ`this`を参照する
            // そのため`this.prefix`は"pre"となる
            return this.prefix + "-" + str;
        });
    }
};
// このとき、`prefixArray`のベースオブジェクトは`Prefixer`となる
// つまり、`prefixArray`メソッド内の`this`は`Prefixer`を参照する
prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]

"use strict";
function outer() {
    // Arrow Functionで定義した関数を返す
    // const that = this; と同じ
    return () => {
        // この関数の外側には`outer`関数が存在する
        // `outer`関数に`this`を書いた場合と同じ
        // return that;と同じ
        return this;
    };
}
// `outer`関数の返り値はArrow Functionにて定義された関数
const innerArrowFunction = outer();
console.log(innerArrowFunction()); // => undefined(非strictの場合はWindow)

