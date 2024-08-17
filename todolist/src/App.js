import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import Alert from "./Alert";
import { useRef } from "react";

const getlocalStorage = () => {
  let todoItem = localStorage.getItem("todoItem");
  if (todoItem) {
    return (todoItem = JSON.parse(localStorage.getItem("todoItem")));
  } else {
    return [];
  }
};
function App() {
  const [items, setItems] = useState("");
  const [list, setList] = useState(getlocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const editRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!items) {
      showAlert(true, "danger", "항목을 입력하세요");
    } else if (items && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: items };
          }
          return item;
        })
      );
      setItems("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "항목이 변경되었습니다.");
    } else {
      showAlert(true, "success", "목록에 항목이 추가되었습니다.");
      const newItem = { id: Date.now(), title: items };
      setList([...list, newItem]);
      setItems("");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "항목이 삭제되었습니다.");
    const filterItem = list.filter((item) => item.id !== id);
    setList(filterItem);
  };
  const editItem = (id) => {
    const findItem = list.find((item) => item.id === id);
    setItems(findItem.title);
    setIsEditing(true);
    setEditId(id);
    editRef.current.focus();
  };
  const clearItem = () => {
    showAlert(true, "danger", "목록이 비어있습니다.");
    setList([]);
  };
  useEffect(() => {
    localStorage.setItem("todoItem", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form action="" className="form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>할 일 목록</h3>
        <div className="form-control">
          <input
            type="text"
            name="items"
            id="items"
            className="input-list"
            value={items}
            placeholder="할 일 입력하세요"
            onChange={(e) => setItems(e.target.value)}
            ref={editRef}
          />
          <button className="submit-btn">{isEditing ? "수정" : "추가"}</button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="list-container">
          <TodoItem list={list} removeItem={removeItem} editItem={editItem} />
          <button onClick={clearItem} className="clear-btn">
            전체 삭제
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
