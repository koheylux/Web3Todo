import React from 'react';

export const CompletedTodos = (props) => {
  const { todos, onClickDelete } = props;
  return (
    <div className='complete_area'>
      <p className='title'>完了したTODO</p>
      <ul>
        {todos.map((todo) => {
          return(
            <li key={todo.id}>
              <div className='list_row'>
                <p>{todo.content}</p>
                <button className='del_button' onClick={() => onClickDelete(todo.id)}>削除</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}