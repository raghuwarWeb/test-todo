import React from 'react'
import { useSelector } from 'react-redux'
import { completeAll, clearCompleted } from '../features/Todos/todosSlice';
import { useDispatch } from 'react-redux';

function ActionButtons() {
  const todos = useSelector(state => state.todos.allTodos);
  const completed_todo_no = todos.filter(item => item.completed).length
  const dispatch = useDispatch();
  const allComplete = () => {
    dispatch(completeAll());
  }

  const clear = () => {
    dispatch(clearCompleted());
  }

  return (
    <div className="todo-actions">
      <button className='action-complete' onClick={() => allComplete()}>Complete All ({todos.length})</button>
      <button className='action-clear' onClick={() => clear()}>
        Clear Completed ({completed_todo_no})
      </button>
    </div>
  )
}

export default ActionButtons