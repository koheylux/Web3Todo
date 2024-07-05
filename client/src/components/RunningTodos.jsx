import React from 'react';

export const RunningTodos = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;
  return (
    <div className='running_area'>
      <p className='title'>進行中のTODO</p>
      <ul>
        {todos.map((todo) => {
          return(
            <li key={todo.id}>
              <div className='list_row'>
                <p>{todo.content}</p>
                <button className='cmp_button' onClick={() => onClickComplete(todo.id)}>完了</button>
                <button className='del_button' onClick={() => onClickDelete(todo.id)}>削除</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
};