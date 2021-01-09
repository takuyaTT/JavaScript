/*
-----------------------------
基本的なクラス宣言
-----------------------------
*/
class MyClassA {
    constructor() {
        // コンストラクタの処理が必要なら書く
    }
}
// コンストラクタの処理が不要な場合は省略できる
class MyClassB {}

/*
-----------------------------
コンストラクタを利用したクラス例
-----------------------------
*/
class Point {
    // 2. コンストラクタ関数の仮引数として`x`には`3`、`y`には`4`が渡る
    constructor(x, y) {
        // 3. インスタンス(`this`)の`x`と`y`プロパティにそれぞれ値を設定する
        this.x = x;
        this.y = y;
        // コンストラクタではreturn文は書かない
    }
}

// 1. コンストラクタを`new`演算子で引数とともに呼び出す
const point = new Point(3, 4);
// 4. `Point`のインスタンスである`point`の`x`と`y`プロパティには初期化された値が入る
console.log(point.x); // => 3
console.log(point.y); // => 4

/*
-----------------------------
クラス構文と関数の違い
-----------------------------
*/
// 関数でのクラス表現
function MyClassLike() {
}
// 関数なので関数として呼び出せる
MyClassLike(); 

// `class`構文でのクラス
class MyClass {
}
// クラスは関数として呼び出すと例外が発生する
// MyClass(); // => TypeError: class constructors must be invoked with |new|

// コンストラクタ関数
const classLikePoint = function PointConstructor(x, y) {
    // インスタンスの初期化処理
    this.x = x;
    this.y = y;
};

// `new`演算子でコンストラクタ関数から新しいインスタンスを作成
const classlikepoint = new classLikePoint(3, 4);

/*
-----------------------------
クラスメソッド宣言
-----------------------------
クラスに対して定義したメソッドは、`クラスの各インスタンスから共有されるメソッド`となる。
このインスタンス間で共有されるメソッドのことを`プロトタイプメソッド(インスタンスメソッド)`と呼ぶ
*/
class Counter {
    constructor() {
        this.count = 0;
    }
    // `increment`メソッドをクラスに定義
    increment() {
        // `this`は`Counter`のインスタンスを参照
        this.count++;
    }
}
const counterA = new Counter();
const counterB = new Counter();
// `counterA.increment()`のベースオブジェクトは`counterA`インスタンス
counterA.increment();
// 各インスタンスの持つプロパティ(状態)は異なる
console.log(counterA.count); // => 1
console.log(counterB.count); // => 0
console.log(counterA.increment === counterB.increment); // => true

//インスタンスに対してのメソッド宣言
class CounterIns {
    constructor() {
        this.count = 0;
        // インスタンスオブジェクトであるthisに対してメソッドを定義する
        this.increment = () => {
            this.count++;
        };
    }
}
const counterAA = new CounterIns();
const counterBB = new CounterIns();
// 各インスタンスオブジェクトのメソッドの参照先は異なる
console.log(counterAA.increment === counterBB.increment); // => false

/*
-----------------------------
クラスでのthisについて
-----------------------------
*/
"use strict";
class ArrowClass {
    constructor() {
        // コンストラクタでの`this`は常にインスタンス
        this.method = () => {
            // Arrow Functionにおける`this`は静的に決まる
            // そのため`this`は常にインスタンスを参照する
            return this;
        };
    }
}
const instance = new ArrowClass();
const method = instance.method;
// 呼び出し方法（ベースオブジェクト）に依存しないため、`this`がインスタンスを参照する
console.log(method()); // => instance


// プロトタイプメソッドの場合
"use strict";
class PrototypeClass {
    method() {
        // `this`はベースオブジェクトを参照する
        return this;
    };
}
const instance = new PrototypeClass();
const method = instance.method;
// ベースオブジェクトはundefined
console.log(method()); // => undefined

/*
-----------------------------
getter/setter
-----------------------------
*/
// 外から直接読み書きしてほしくないプロパティを_（アンダーバー）で開始する(ただの習慣)
class NumberWrapper {
    constructor(value) {
        this._value = value;
    }
    // `_value`プロパティの値を返すgetter
    get value() {
        console.log("getter");
        return this._value;
    }
    // `_value`プロパティに値を代入するsetter
    set value(newValue) {
        console.log("setter");
        this._value = newValue;
    }
}

const numberWrapper = new NumberWrapper(1);
// "getter"とコンソールに表示される
console.log(numberWrapper.value); // => 1
// "setter"とコンソールに表示される
numberWrapper.value = 42;
// "getter"とコンソールに表示される
console.log(numberWrapper.value); // => 42

/*
-----------------------------
静的メソッド(static)
-----------------------------
インスタンス化せずに利用できる静的メソッド
*/

class ArrayWrapper {
    constructor(array = []) {
        this.array = array;
    }

    // rest parametersとして要素を受けつける
    static of(...items) {
        // クラスの静的メソッドにおけるthisは、そのクラス自身を参照
        // よって、return new this(items); でもOK
        return new ArrayWrapper(items);
    }

    get length() {
        return this.array.length;
    }
}

// 配列を引数として渡している
const arrayWrapperA = new ArrayWrapper([1, 2, 3]);
// 要素を引数として渡している
const arrayWrapperB = ArrayWrapper.of(1, 2, 3);
console.log(arrayWrapperA.length); // => 3
console.log(arrayWrapperB.length); // => 3

/*
-----------------------------
インスタンスメソッドとプロトタイプメソッドの違い
-----------------------------
プロトタイプメソッドとインスタンスオブジェクトのメソッドは上書きされずにどちらも定義
インスタンスオブジェクトのメソッドがプロトタイプオブジェクトのメソッドよりも優先される
*/
class ConflictClass {
    constructor() {
        this.method = () => {
            console.log("インスタンスオブジェクトのメソッド");
        };
    }

    method() {
        console.log("プロトタイプメソッド");
    }
}

const conflict = new ConflictClass();
conflict.method(); // "インスタンスオブジェクトのメソッド"
// インスタンスの`method`プロパティを削除
delete conflict.method;
conflict.method(); // "プロトタイプメソッド"

/*
-----------------------------
プロトタイプメソッドの裏側
-----------------------------
クラスからnew演算子によってインスタンスを作成する際に、インスタンスにはクラスのプロトタイプオブジェクトへの参照が保存される
インスタンスからクラスのプロトタイプオブジェクトへの参照は、インスタンスオブジェクトの[[Prototype]]という内部プロパティに保存される
オブジェクトのプロパティを参照するときに、オブジェクト自身がプロパティを持っていない場合でも、そこで探索が終わるわけではく、
オブジェクトの[[Prototype]]内部プロパティ（仕様上の内部的なプロパティ）の参照先であるプロトタイプオブジェクトに対しても探索を続ける
このプロパティを参照する際に、オブジェクト自身から[[Prototype]]内部プロパティへと順番に探す仕組みのことをプロトタイプチェーンと呼ぶ
*/

// プロトタイプチェーンの動作の疑似的なコード
class MyClass {
    method() {
        console.log("プロトタイプのメソッド");
    }
}
const instance = new MyClass();
// `instance.method()`を実行する場合
// 次のような呼び出し処理が行われている
// インスタンス自身が`method`プロパティを持っている場合
if (instance.hasOwnProperty("method")) {
    instance.method();
} else {
    // インスタンスの`[[Prototype]]`の参照先（`MyClass`のプロトタイプオブジェクト）を取り出す
    const prototypeObject = Object.getPrototypeOf(instance);
    // プロトタイプオブジェクトが`method`プロパティを持っている場合
    if (prototypeObject.hasOwnProperty("method")) {
        // `this`はインスタンス自身を指定して呼び出す
        prototypeObject.method.call(instance);
    }
}

/*
-----------------------------
クラス継承
-----------------------------
コンストラクタの処理順は、親クラスから子クラスへと順番が決まっている
class構文では必ず親クラスのコンストラクタ処理（super()の呼び出し）を先に行い、その次に子クラスのコンストラクタ処理を行う。
子クラスのコンストラクタでは、thisを触る前にsuper()で親クラスのコンストラクタ処理を呼び出さないとReferenceErrorとなる
*/
class Parent {
    constructor() {
        this.name = "takuya";
    }
    method(){
        console.log("Parentメソッド");
    }
}
class Child extends Parent {
    constructor() {
        // 子クラスでは`super()`を`this`に触る前に呼び出さなければならない
        super();
        // 子クラスのコンストラクタ処理
        // 親クラスで書き込まれた`name`は上書きされる
        this.name = "yakuta";
    }
}
const parent = new Parent();
console.log(parent.name); // => "takuya"
const child = new Child();
console.log(child.name); // => "yakuta"
child.method(); // -> Parentメソッド
// Child.prototypeオブジェクトの[[Prototype]]内部プロパティにはParent.prototypeが設定される

