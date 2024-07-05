// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoAppContract {
  // タスク情報を格納する構造体
  struct Todo {
    string id;
    string content;
    string status; // 'running' or 'complete'
  }

  // タスクIDとタスク情報のマッピング
  mapping(string => Todo) public todos;

  // TodoのIDの配列
  string[] public todoIds;

  // Todo新規登録
  function createTodo(string memory _id, string memory _content, string memory _status) public {
    require(
      keccak256(abi.encodePacked(_status)) == keccak256(abi.encodePacked("running")),
      "Invalid status"
    );

    // _idをキーとしてTodo構造体をtodosに格納
    todos[_id] = Todo(_id, _content, _status);
    
    // TodoのIDを配列に追加
    todoIds.push(_id);
  }

  // 全てのTodo取得
  function selectAllTodos() public view returns (Todo[] memory) {
    //保存されているTodoの数を把握する
    uint256 totalTodos = todoIds.length;

    // 全てののTodoを格納する配列を適切なサイズで確保
    Todo[] memory allTodos = new Todo[](totalTodos);

    // 全てのTodoを確認し、全てのTodoをallTodosに格納
    for (uint256 i = 0; i < totalTodos; i++) {
      allTodos[i] = todos[todoIds[i]];
    }

    return allTodos;
  }

  // 進行中Todo取得
  function selectAllRunningTodos() public view returns (Todo[] memory) {
    //保存されているTodoの数を把握する
    uint256 totalTodos = todoIds.length;

    // 進行中のTodoを格納する配列を全てのTodo数で確保
    Todo[] memory runningTodos = new Todo[](totalTodos);
    uint256 count = 0;

    // 全てのTodoを確認し、進行中のTodoをrunningTodosに格納
    for (uint256 i = 0; i < totalTodos; i++) {
      if (keccak256(abi.encodePacked(todos[todoIds[i]].status)) == keccak256(abi.encodePacked("running"))) {
        runningTodos[count] = todos[todoIds[i]];
        count++;
      }
    }

    // 進行中のTodoだけを含める配列を確保
    Todo[] memory result = new Todo[](count);
    for (uint256 i = 0; i < count; i++) {
      result[i] = runningTodos[i];
    }
    return result;
  }

  // 完了済Todo取得
  function selectAllCompleteTodos() public view returns (Todo[] memory) {
    //保存されているTodoの数を把握する
    uint256 totalTodos = todoIds.length;

    // 完了済のTodoを格納する配列を全てのTodo数で確保
    Todo[] memory completeTodos = new Todo[](totalTodos);
    uint256 count = 0;

    // 全てのTodoを確認し、完了済のTodoをcompleteTodosに格納
    for (uint256 i = 0; i < totalTodos; i++) {
      if (keccak256(abi.encodePacked(todos[todoIds[i]].status)) == keccak256(abi.encodePacked("complete"))) {
        completeTodos[count] = todos[todoIds[i]];
        count++;
      }
    }

    // 完了済のTodoだけを含める配列を確保
    Todo[] memory result = new Todo[](count);
    for (uint256 i = 0; i < count; i++) {
      result[i] = completeTodos[i];
    }
    return result;
  }

  // Todo削除
  function deleteTodoById(string memory _id) public {
    // 指定されたIDを持つTodoが存在するか確認
    require(
      keccak256(abi.encodePacked(todos[_id].id)) != keccak256(abi.encodePacked("")),
      "Todo not found"
    );

    // Todoを削除
    delete todos[_id];

    // TodoIdsにあるIDを削除
    for (uint256 i = 0; i < todoIds.length; i++) {
      if (keccak256(abi.encodePacked(todoIds[i])) == keccak256(abi.encodePacked(_id))) {
        // Todoが見つかったら、その位置に最後の要素を代入し、最後の要素をpop
        todoIds[i] = todoIds[todoIds.length - 1];
        todoIds.pop();
        break;
      }
    }
  }

  //ステータス更新
  function changeTodoById(string memory _id) public {
    // 指定されたIDを持つTodoが存在するか確認
    require(
      keccak256(abi.encodePacked(todos[_id].id)) != keccak256(abi.encodePacked("")),
      "Todo not found"
    );
    todos[_id].status = "complete";
  }
}
