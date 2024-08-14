import React from "react";

const TodoItem = ({ list, removeItem, editItem }) => {
  return (
    <div className="todo-list">
      {list.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="todo-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button className="edit-btn" onClick={() => editItem(id)}>
                수정
              </button>
              <button className="remove-btn" onClick={() => removeItem(id)}>
                삭제
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default TodoItem;
