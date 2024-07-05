// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorldContract {
  // メッセージを格納する変数
  string private message;

  // コントラクトがデプロイされたときに実行されるコンストラクタ
  constructor() {
    // 初期メッセージを設定
    message = "Hello Ethereum!";
  }

  // メッセージを取得する関数
  function getMessage() public view returns (string memory) {
    return message;
  }
}
