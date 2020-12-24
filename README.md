# JavaScript Primerまとめ
## ●閏年判定(uruu.js)
if文のサンプルプログラム

## ●繰り返し処理(for.js)
### 通常
for文の基本
### forEach(配列)
配列での繰り返し処理
### for~in
オブジェクトのプロパティに対しての反復処理  
* 親オブジェクトまで探索する
* 配列の場合、インデックス番号が列挙
### Object.keys() + forEach()
for~inの代替策
### filter
配列から特定の条件下の値を集めた配列を生成する方法
### for~of
iterableオブジェクトの反復処理
### reduce()
変数宣言なしの反復処理

## 条件分岐(Conditional.js)
### ●if文 + switch文
### ●switch文のみの関数

## 関数(FunctionSample.js)
### ●default引数
引数がない場合、あらかじめ設定しておいた値を格納
### ●Nullish coalescing演算子(**??**)
null または undefind の場合、指定した値を返す
### ●可変長引数(**...args**)
### ●spread構文
### ●arguments
### ●分割代入
### ●関数代入
### ●Arrow関数(**()=>**)
### ●コールバック関数
### ●メソッド追加

## オブジェクト(ObjectSample.js)
### ●オブジェクトについて
### ●ブラケット記法(**オブジェクト名[]**)
### ●分割代入
### ●プロパティ追加
### ●プロパティ削除
### ●プロパティ凍結
以降はプロパティの変更を受け付けない  
**use strict**と組み合わせるとエラーが出てくれる
### ●Optional chaining演算子(**?.**)
### ●プロパティの存在確認(**in**)
### ●プロパティの存在確認(**hasOwnProperty)
### ●オブジェクト→配列取得
* Object.keys()メソッド
* Object.values()メソッド
* Object.entries()メソッド
### ●複製およびマージ
* Object.assign()メソッド
* spread構文でのマージ
* オブジェクトのプロパティがオブジェクトの場合の複製方法

## 配列(ArraySample.js)
### ●指定した値のインデックス番号を取得
### ●異なるオブジェクトから値が同じものを見つける
* findIndex()メソッド
* find()メソッド
### ●配列の分割代入
### ●配列かオブジェクトかの確認
Array.isArray()メソッド
### 指定したインデックスに要素があるか確認
* hasOwnProperty()メソッド
### ●配列に指定した値があるか(true/false)
* includes()メソッド
* some()メソッド