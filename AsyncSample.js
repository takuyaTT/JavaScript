/*
--------------------------------
同期処理
--------------------------------
コードを順番に処理していき、ひとつの処理が終わるまで次の処理は行わない
JavaScriptは基本的にブラウザのメインスレッド（UIスレッドとも呼ばれる）で実行される
メインスレッドは表示の更新といったUIに関する処理も行っているため
メインスレッドが他の処理で専有されると、表示が更新されなくなりフリーズしたようになるため問題がある
*/

// ==============================================================
// 指定した`timeout`ミリ秒経過するまで同期的にブロックする関数
function blockTime(timeout) { 
    const startTime = Date.now();
    // `timeout`ミリ秒経過するまで無限ループをする
    while (true) {
        const diffTime = Date.now() - startTime;
        if (diffTime >= timeout) {
            return; // 指定時間経過したら関数の実行を終了
        }
    }
}
console.log("処理を開始");
blockTime(2000); // 他の処理を1000ミリ秒（1秒間）ブロックする
console.log("この行が呼ばれるまで処理が2秒間ブロックされる");
// ==============================================================

/*
--------------------------------
非同期処理
--------------------------------
ひとつの非同期処理が終わるのを待たずに次の処理を評価
●setTimeout()メソッド
delayミリ秒後に、コールバック関数を呼び出すようにタイマーへ登録する非同期処理
setTimeout(コールバック関数, delay);
*/

// ==============================================================
// 指定した`timeout`ミリ秒経過するまで同期的にブロックする関数
function blockTime(timeout) { 
    const startTime = Date.now();
    while (true) {
        const diffTime = Date.now() - startTime;
        if (diffTime >= timeout) {
            return; // 指定時間経過したら関数の実行を終了
        }
    }
}

console.log("1. setTimeoutのコールバック関数を10ミリ秒後に実行します");
setTimeout(() => {
    console.log("3. ブロックする処理を開始します");
    blockTime(2000); // 他の処理を2秒間ブロックする
    console.log("4. ブロックする処理が完了しました");
}, 10);
// ブロックする処理は非同期なタイミングで呼び出されるので、次の行が先に実行される
console.log("2. 同期的な処理を実行します");
// ==============================================================

/*
--------------------------------
並行処理と並列処理
--------------------------------
JavaScriptにおいて多くの非同期処理はメインスレッドで実行される
JavaScriptでは一部の例外を除き非同期処理が並行処理（concurrent）として扱われる
※並行処理 => 処理を一定の単位ごとに分けて処理を切り替えながら実行すること
非同期処理の実行中にとても重たい処理があると、非同期処理の切り替えが遅れる

非同期処理の中にもメインスレッドとは別のスレッドで実行できるAPIが実行環境によっては存在する
メインスレッド以外における非同期処理が並列処理（Parallel）
※排他的に複数の処理を同時に実行すること

JavaScriptの大部分の非同期処理は非同期的なタイミングで実行される処理である
*/

/*
--------------------------------
非同期での例外処理
--------------------------------
setTimeout関数で登録されたコールバック関数が実際に実行されて例外を投げるのは、すべての同期処理が終わった後となり、
tryブロックで例外が発生しうるとマークした範囲外で例外が発生
*/

// ==============================================================
try {
    setTimeout(() => {
        throw new Error("非同期的なエラー");
    }, 10);
} catch (error) {
    // 非同期エラーはキャッチできないため、この行は実行されない
}
console.log("この行は実行されます");
// ==============================================================

// <非同期処理のでの例外は非同期処理の中に記述する>
// ただし、非同期処理の外からは非同期処理の中で例外が発生したかは不明
// ↓のコードを参照

// ==============================================================
// 非同期処理の外
setTimeout(() => {
    // 非同期処理の中
    try {
        throw new Error("エラー");
    } catch (error) {
        console.log("エラーをキャッチできる");
    }
}, 10);
console.log("この行は実行されます");
// ==============================================================

// よって下記のパターンで例外処理例外を外の処理へ伝達する必要がある
/*
--------------------------------
エラーファーストコールバック
--------------------------------
処理が失敗した場合は、コールバック関数の1番目の引数にエラーオブジェクトを渡して呼び出す
処理が成功した場合は、コールバック関数の1番目の引数にはnullを渡し、2番目以降の引数に成功時の結果を渡して呼び出す

●Node.jsの場合
fs.readFile()メソッドで、第二引数にエラーファーストコールバックを利用
第一引数にエラーオブジェクト　→　失敗時：errorオブジェクトを返す　成功時：nullを返す
第二引数にデータオブジェクト　→　失敗時：渡さない　成功時：読み込んだデータを返す
fs.readFile("./example.txt", (error, data) => {
    if (error) {
        // 読み込み中にエラーが発生しました
    } else {
        // データを読み込むことができました
    }
});

コールバック関数の1番目の引数にはエラーオブジェクトまたはnullを入れ、それ以降の引数にデータを渡すというルールをエラーファーストコールバックと呼ぶ
*/

/*
--------------------------------
Promise
--------------------------------
非同期処理の結果を表現するビルトインオブジェクト
Promiseでは、非同期処理に成功したときの処理をコールバック関数としてthenメソッドへ渡し、 
失敗したときの処理を同じくコールバック関数としてcatchメソッドへ渡す
エラーファーストコールバックとは異なり、非同期処理（asyncPromiseTask関数）はPromiseインスタンスを返し、
その返されたPromiseインスタンスに対して、成功と失敗時の処理をそれぞれコールバック関数として渡す

Promiseインスタンスには、内部的に次の3つの状態が存在する。
●Fulfilled
resolve（成功）したときの状態。このときonFulfilledが呼ばれる
●Rejected
reject（失敗）または例外が発生したときの状態。このときonRejectedが呼ばれる
●Pending
FulfilledまたはRejectedではない状態
new Promiseでインスタンスを作成したときの初期状態

なお、一度状態が変化したらそれ以降は変化しない不変(Settled)となる
また、同一のpromiseインスタンスで一度呼び出したthenは再度呼ばれない
*/

// Promiseはnew演算子でPromiseのインスタンスを作成して利用
// このときのコンストラクタにはresolveとrejectの2つの引数を取るexecutorと呼ばれる関数を渡す
// この関数の中で非同期処理を行い、成功の場合はresolve、失敗時はrejectを渡す

// ==============================================================
const executor = (resolve, reject) => {
    // 非同期の処理が成功したときはresolveを呼ぶ
    // 非同期の処理が失敗したときはrejectを呼ぶ
};
const promise = new Promise(executor);
// ==============================================================

// `Promise`インスタンスを作成(下のような書き方でもOK)

// ==============================================================
const promise = new Promise((resolve, reject) => {
    // 非同期の処理が成功したときはresolve()を呼ぶ
    // 非同期の処理が失敗したときにはreject()を呼ぶ
});
const onFulfilled = () => {
    console.log("resolveされたときに呼ばれる");
};
const onRejected = () => {
    console.log("rejectされたときに呼ばれる");
};
// `then`メソッドで成功時と失敗時に呼ばれるコールバック関数を登録
promise.then(onFulfilled, onRejected);
// ==============================================================

/**
 * 1000ミリ秒未満のランダムなタイミングでレスポンスを疑似的にデータ取得する関数
 * 指定した`path`にデータがある場合、成功として**Resolved**状態のPromiseオブジェクトを返す
 * 指定した`path`にデータがない場合、失敗として**Rejected**状態のPromiseオブジェクトを返す
 */

 // ==============================================================
function dummyFetch(path) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (path.startsWith("/success")) {
                resolve({ body: `Response body of ${path}` });
            } else {
                reject(new Error("NOT FOUND"));
            }
        }, 1000 * Math.random());
    });
}
// `then`メソッドで成功時と失敗時に呼ばれるコールバック関数を登録
// /success/data のリソースは存在するので成功しonFulfilledが呼ばれる
dummyFetch("/success/data").then(function onFulfilled(response) {
    console.log(response); // => { body: "Response body of /success/data" }
}, function onRejected(error) {
    // この行は実行されない
});
// /failure/data のリソースは存在しないのでonRejectedが呼ばれる
dummyFetch("/failure/data").then(function onFulfilled(response) {
    // この行は実行されない
}, function onRejected(error) {
    console.log(error); // Error: "NOT FOUND"
});
// ==============================================================

// Promise#thenメソッドは成功（onFulfilled）と失敗（onRejected）のコールバック関数の2つを受け取るが、どちらの引数も省略可能
// 失敗時の処理だけを登録する場合はcatchメソッドの利用を推奨

// ==============================================================
function errorPromise(message) {
    return new Promise((resolve, reject) => {
        reject(new Error(message));
    });
}
// 非推奨: `then`メソッドで失敗時のコールバック関数だけを登録
errorPromise("thenでエラーハンドリング").then(undefined, (error) => {
    console.log(error.message); // => "thenでエラーハンドリング"
});
// 推奨: `catch`メソッドで失敗時のコールバック関数を登録
errorPromise("catchでエラーハンドリング").catch(error => {
    console.log(error.message); // => "catchでエラーハンドリング"
});
// ==============================================================

/*
--------------------------------
Promiseと例外
--------------------------------
Promiseではコンストラクタの処理で例外が発生した場合に自動的に例外がキャッチされる
reject関数を呼び出したのと同じように失敗したものとして扱われ、
thenメソッドの第二引数やcatchメソッドで登録したエラー時のコールバック関数が呼び出される

つまり、Promiseにおける処理ではtry...catch構文を使わなくても、自動的に例外がキャッチされる
*/

// ==============================================================
function throwPromise() {
    return new Promise((resolve, reject) => {
        // Promiseコンストラクタの中で例外は自動的にキャッチされrejectを呼ぶ
        throw new Error("例外が発生");
        // 例外が発生すると、これ以降のコンストラクタの処理は実行されません
    });
}

throwPromise().catch(error => {
    console.log(error.message); // => "例外が発生"
});
// ==============================================================

// 状態変化は一度だけ

// ==============================================================
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
        resolve(); // 二度目以降のresolveやrejectは無視される
    }, 16);
});
promise.then(() => {
    console.log("最初のresolve時に一度だけ呼ばれる");
}, (error) => {
    // この行は呼び出されない
});
// ==============================================================

// <resolveとrejectのシンタックスシュガー>
// Promise.resolve
// `resolve(42)`された`Promise`インスタンスを作成する

// ==============================================================
const fulFilledPromise = Promise.resolve(42);
fulFilledPromise.then(value => {
    console.log(value); // => 42
});
// ==============================================================

// 下記の書き方(Promiseコンストラクタでの生成)と同じ意味となる
// const promise = new Promise((resolve) => {
    // resolve();
//});

// Promiseのコンストラクタ関数が実行され、続いて同期的な処理が実行される。
// 最後にthenメソッドで登録していたコールバック関数が非同期的に呼ばれる

// ==============================================================
const promise = Promise.resolve();
promise.then(() => {
    console.log("3. コールバック関数が実行されました");
});
console.log("1. 同期的な処理が実行されました");
promise.then(() => {
  console.log("4. コールバック関数が実行されました");
});
console.log("2. 同期的な処理が実行されました");
// ==============================================================

// Promise.reject();
// 同上

// ==============================================================
Promise.reject(new Error("エラー")).catch(() => {
    console.log("2. コールバック関数が実行されました");
});
console.log("1. 同期的な処理が実行されました");
// ==============================================================

// 上記2つはテストコードなどで利用されるか、Promiseチェーンで利用される

/*
--------------------------------
Promiseのメソッドチェーン
--------------------------------
thenやcatchメソッドは常に新しいPromiseインスタンスを作成して返すという仕様を用いて、
メソッドチェーンを行う
*/

// ==============================================================
// Promiseインスタンスでメソッドチェーン
Promise.resolve()
    // thenメソッドは新しい`Promise`インスタンスを返す
    .then(() => {
        console.log(1); // -> 1
    })
    .then(() => {
        console.log(2); // -> 2
    });
// ==============================================================

/*
例外が発生したとき、thenやcatchメソッドはRejectedなPromiseインスタンスを返す。
そのため、例外が発生するともっとも近くの失敗時の処理（catchまたはthenの第二引数）が呼び出される
*/

// ==============================================================
Promise.resolve().then(() => { 
    // 例外が発生すると、thenメソッドはRejectedなPromiseを返す
    throw new Error("例外");
}).then(() => {
    // このthenのコールバック関数は呼び出されません
}).catch(error => {
    console.log(error.message); // => "例外"
});
// ==============================================================

/*
thenやcatchメソッドはFulfilled状態のPromiseインスタンスを作成して返すため
catchメソッドなどで一度キャッチすると、次に呼ばれるのは成功時の処理
*/

// ==============================================================
Promise.reject(new Error("エラー")).catch(error => {
    console.log(error); // Error: エラー
}).then(() => {
    console.log("thenのコールバック関数が呼び出される");
});
// ==============================================================

/*
コールバックで返した値を次のコールバックへ引数として渡せる
なお、.catchも.thenと同じシンタックスシュガーなので同じ動作となる
*/

// ==============================================================
Promise.reject(new Error("失敗")).catch(error => { 
    // 一度catchすれば、次に呼ばれるのは成功時のコールバック
    return 1;
}).then(value => {
    console.log(value); // => 1
    return value * 2;
}).then(value => {
    console.log(value); // => 2
});
// ==============================================================

/*
コールバック関数でPromiseインスタンスを返した場合は例外的に異なり
同じ状態を持つPromiseインスタンスがthenやcatchメソッドの返り値となる
thenメソッドでRejected状態のPromiseインスタンスを返した場合は、次に呼ばれるのは失敗時の処理である
*/

// ==============================================================
function main() {
    return Promise.reject(new Error("エラー"));
}
// mainはRejectedなPromiseを返す
main().catch(error => {
    // asyncFunctionで発生したエラーのログを出力する
    console.log(error);
    // Promiseチェーンはそのままエラーを継続させる
    return Promise.reject(error);
}).then(() => {
    // 前のcatchでRejectedなPromiseが返されたため、この行は実行されません
}).catch(error => {
    console.log("メインの処理が失敗した");
});
// ==============================================================

// <.finally()メソッド> 
// 成功時、失敗時どちらの場合でも呼び出されるコールバック関数を登録

// ==============================================================
function dummyFetch(path) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (path.startsWith("/resource")) {
                resolve({ body: `Response body of ${path}` });
            } else {
                reject(new Error("NOT FOUND"));
            }
        }, 1000 * Math.random());
    });
}
// リソースを取得中かどうかのフラグ
let isLoading = true;
function isLoadingPrint(){
    console.log("Loading : " + isLoading);
}

dummyFetch("/resource/A").then(response => {
    isLoadingPrint();
    console.log(response);
}).catch(error => {
    isLoadingPrint();
    console.error(error);
}).finally(() => {
    isLoading = false;
    isLoadingPrint();
});
// ==============================================================

/*
--------------------------------
逐次処理とまとめて処理
--------------------------------
逐次処理を行う際は一つ目の非同期処理をthenなどで受け取り、returnで第二の非同期処理を渡す
*/

// ==============================================================
function dummyFetch(path) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (path.startsWith("/resource")) {
                resolve({ body: `Response body of ${path}` });
            } else {
                reject(new Error("NOT FOUND"));
            }
        }, 1000 * Math.random());
    });
}

const results = [];
// Resource Aを取得する
dummyFetch("/resource/A").then(response => {
    results.push(response.body);
    // Resource Bを取得する
    return dummyFetch("/resource/B");
}).then(response => {
    results.push(response.body);
}).then(() => {
    console.log(results); // => ["Response body of /resource/A", "Response body of /resource/B"]
});
// ==============================================================

// まとめて処理を行う際は、Promise.all()メソッドを利用する

// ==============================================================
function dummyFetch(path) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (path.startsWith("/resource")) {
                resolve({ body: `Response body of ${path}` });
            } else {
                reject(new Error("NOT FOUND"));
            }
        }, 1000 * Math.random());
    });
}

const fetchedPromise = Promise.all([
    dummyFetch("/resource/A"),
    dummyFetch("/resource/B")
]);
// fetchedPromiseの結果をDestructuringでresponseA, responseBに代入している
fetchedPromise.then(([responseA, responseB]) => {
    console.log(responseA.body); // => "Response body of /resource/A"
    console.log(responseB.body); // => "Response body of /resource/B"
});
// ==============================================================

// ひとつでも処理が失敗(reject)となった場合、すべての結果がrejectとなる

// ==============================================================
function dummyFetch(path) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (path.startsWith("/resource")) {
                resolve({ body: `Response body of ${path}` });
            } else {
                reject(new Error("NOT FOUND"));
            }
        }, 1000 * Math.random());
    });
}

const fetchedPromise = Promise.all([
    dummyFetch("/resource/A"),
    dummyFetch("/not_found/B") // Bは存在しないため失敗する
]);
fetchedPromise.then(([responseA, responseB]) => {
    // 以下の処理は実行されない
    console.log(responseA.body);
    console.log(responseB.body);
}).catch(error => {
    console.error(error); // Error: NOT FOUND
}).finally(()=>{
	console.log("完了");
});
// ==============================================================

/*
<Promise.race()メソッド>
Promise.raceメソッドでは複数のPromiseを受け取るが、
Promiseが1つでも完了した（Settle状態となった）時点で次の処理を実行
Promiseインスタンスの配列を受け取り、新しいPromiseインスタンスを返す
この新しいPromiseインスタンスは、配列の中で一番最初にSettle状態となったPromiseインスタンスと同じ状態になる

配列の中で一番最初にSettleとなったPromiseがFulfilledの場合は、新しいPromiseインスタンスもFulfilledになる
配列の中で一番最初にSettleとなったPromiseがRejectedの場合は、新しいPromiseインスタンスも Rejectedになる
*/ 

// ==============================================================
// タイムアウトプログラム
// `timeoutMs`ミリ秒後にrejectする
function timeout(timeoutMs) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error(`Timeout: ${timeoutMs}ミリ秒経過`));
        }, timeoutMs);
    });
}
function dummyFetch(path) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (path.startsWith("/resource")) {
                resolve({ body: `Response body of ${path}` });
            } else {
                reject(new Error("NOT FOUND"));
            }
        }, 1000 * Math.random());
    });
}
// 500ミリ秒以内に取得できなければ失敗時の処理が呼ばれる
Promise.race([
    dummyFetch("/resource/data"),
    timeout(500),
]).then(response => {
    console.log(response.body); // => "Response body of /resource/data"
}).catch(error => {
    console.log(error.message); // => "Timeout: 500ミリ秒経過"
});
// ==============================================================

/*
--------------------------------
Async Function
--------------------------------
上記のようなPromiseチェーンの不格好な見た目を解決するためにAsync Functionと呼ばれる構文が導入
必ずPromiseインスタンスを返す

Async Functionは次のように関数の前にasyncをつけることで定義
*/

// ==============================================================
async function doAsync() {
    return "値";
}
// doAsync関数はPromiseを返す
doAsync().then(value => {
    console.log(value); // => "値"
});
// ==============================================================

// どの関数定義方法(Arrowや関数宣言など)でもasyncキーワードを前につけるだけでAsync Functionとして定義できる

// ==============================================================
// 関数宣言のAsync Function版
async function fn1() {}
// 関数式のAsync Function版
const fn2 = async function() {};
// Arrow FunctionのAsync Function版
const fn3 = async() => {};
// メソッドの短縮記法のAsync Function版
const obj = { async method() {} };
// ==============================================================

// ==============================================================
// 1. resolveFnは値を返している
// 何もreturnしていない場合はundefinedを返したのと同じ扱いとなる
async function resolveFn() {
    return "返り値";
}
resolveFn().then(value => {
    console.log(value); // => "返り値"
});

// 2. rejectFnはPromiseインスタンスを返している
async function rejectFn() {
    return Promise.reject(new Error("エラーメッセージ"));
}
// rejectFnはRejectedなPromiseを返すのでcatchできる
rejectFn().catch(error => {
    console.log(error.message); // => "エラーメッセージ"
});

// 3. exceptionFnは例外を投げている
async function exceptionFn() {
    throw new Error("例外が発生しました");
    // 例外が発生したため、この行は実行されません
}
// Async Functionで例外が発生するとRejectedなPromiseが返される
exceptionFn().catch(error => {
    console.log(error.message); // => "例外が発生しました"
});
// ==============================================================

/*
--------------------------------
await式
--------------------------------
await式は右辺のPromiseインスタンスがFulfilledまたはRejectedになるまでその場で非同期処理の完了を待つ
Promiseインスタンスの状態が変わると、次の行の処理を再開

awaitの右辺（Promiseインスタンス）の評価結果を値として返す
・awaitの右辺のPromiseがFulfilledとなった場合は、resolveされた値がawait式の返り値
・右辺のPromiseがRejectedとなった場合は、その場でエラーをthrowする
よって、await式を使うことで、try...catch構文のように非同期処理を同期処理と同じ構文を使って扱える

await式はAsync Functionの中でのみ利用可能である点に注意する
*/

// ==============================================================
async function asyncMain() {
    // await式のエラーはtry...catchできる
    try {
        // `await`式で評価した右辺のPromiseがRejectedとなったため、例外がthrowされる
        const value = await Promise.reject(new Error("エラーメッセージ"));
        // await式で例外が発生したため、この行は実行されません
    } catch (error) {
        console.log(error.message); // => "エラーメッセージ"
    }
}
// asyncMainはResolvedなPromiseを返す
asyncMain().catch(error => {
    // すでにtry...catchされているため、この行は実行されません
});
// ==============================================================

// 逐次的に行うケースの場合、下記のように記述できる

// ==============================================================
function dummyFetch(path) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (path.startsWith("/resource")) {
                resolve({ body: `Response body of ${path}` });
            } else {
                reject(new Error("NOT FOUND"));
            }
        }, 1000 * Math.random());
    });
}
// リソースAとリソースBを順番に取得する
async function fetchAB() {
    const results = [];
    const responseA = await dummyFetch("/resource/A");
    results.push(responseA.body);
    // awaitを使わない場合はここでメソッドチェーンを行っていた
    // return dummyFetch("/resource/B");})
    //.then(response =>{
        // results.push(response.body);
        // return results;
    //}))
    const responseB = await dummyFetch("/resource/B");
    results.push(responseB.body);
    return results;
}
// リソースを取得して出力する
fetchAB().then((results) => {
    console.log(results); // => ["Response body of /resource/A", "Response body of /resource/B"]
});
// ==============================================================

// for文との組み合わせも可能

// ==============================================================
function dummyFetch(path) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (path.startsWith("/resource")) {
                resolve({ body: `Response body of ${path}` });
            } else {
                reject(new Error("NOT FOUND"));
            }
        }, 1000 * Math.random());
    });
}
// 複数のリソースを順番に取得する
async function fetchResources(resources) {
    const results = [];
    for (let i = 0; i < resources.length; i++) {
        const resource = resources[i];
        // ループ内で非同期処理の完了を待っている
        const response = await dummyFetch(resource);
        results.push(response.body);
    }
    // 反復処理がすべて終わったら結果を返す(返り値となるPromiseを`results`でresolveする)
    return results;
}
// 取得したいリソースのパス配列
const resources = [
    "/resource/A",
    "/resource/B"
];
// リソースを取得して出力する
fetchResources(resources).then((results) => {
    console.log(results); // => ["Response body of /resource/A", "Response body of /resource/B"]
});
// ==============================================================

// Promise.all()メソッドを利用して一度に処理を行うことも可能
// 配列の繰り返し処理でmap()メソッドを利用

// ==============================================================
function dummyFetch(path) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (path.startsWith("/resource")) {
                resolve({ body: `Response body of ${path}` });
            } else {
                reject(new Error("NOT FOUND"));
            }
        }, 1000 * Math.random());
    });
}
// 複数のリソースをまとめて取得する
async function fetchAllResources(resources) {
    // リソースを同時に取得する
    const promises = resources.map((resource)=>{
        return dummyFetch(resource);
    });
    // すべてのリソースが取得できるまで待つ
    // Promise.allは [ResponseA, ResponseB] のように結果が配列となる
    const responses = await Promise.all(promises);
    // 取得した結果からレスポンスのボディだけを取り出す
    return responses.map((response) => {
        return response.body;
    });
}
const resources = [
    "/resource/A",
    "/resource/B"
];
// リソースを取得して出力する
fetchAllResources(resources).then((results) => {
    console.log(results); // => ["Response body of /resource/A", "Response body of /resource/B"]
});
// ==============================================================

// async関数の中でawaitを利用して待機させても、関数外の処理は実行される

// ==============================================================
async function asyncMain() {
    // 中でawaitしても、Async Functionの外側の処理まで止まるわけではない
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
}
console.log("1. asyncMain関数を呼び出します");
// Async Functionは外から見れば単なるPromiseを返す関数
asyncMain().then(() => {
    console.log("3. asyncMain関数が完了しました");
});
// Async Functionの外側の処理はそのまま進む
console.log("2. asyncMain関数外では、次の行が同期的に呼び出される");
// ==============================================================

/*
forEach()メソッドの場合は、コールバック関数にasyncとしても、
コールバック関数だけawaitされるため、元の関数は処理が進むので予期せぬ結果となる

上記のサンプルコードで作成した
・fetchResources関数（コールバック関数を使わずにすむforループとawait式を組み合わせる方法）
・fetchAllResources関数（複数の非同期処理を1つのPromiseにまとめることでループ中にawait式を使わないようにする方法）
このような形でコールバック関数を使う際は気をつける
*/

// 下記はforEach()で繰り返し処理を行うが、fetchResources関数の処理がawaitされず進むため空の配列が渡される

// ==============================================================
function dummyFetch(path) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (path.startsWith("/resource")) {
                resolve({ body: `Response body of ${path}` });
            } else {
                reject(new Error("NOT FOUND"));
            }
        }, 1000 * Math.random());
    });
}
// リソースを順番に取得する
async function fetchResources(resources) {
    const results = [];
    console.log("1. fetchResourcesを開始");
    resources.forEach(async function(resource) {
        console.log(`2. ${resource}の取得開始`);
        const response = await dummyFetch(resource);
        // `dummyFetch`が完了するのは、`fetchResources`関数が返したPromiseが解決された後
        console.log(`5. ${resource}の取得完了`);
        results.push(response.body);
    });
    console.log("3. fetchResourcesを終了");
    return results;
}
const resources = ["/resource/A", "/resource/B"];
// リソースを取得して出力する
fetchResources(resources).then((results) => {
    console.log("4. fetchResourcesの結果を取得");
    console.log(results); // => []
});
// ==============================================================
