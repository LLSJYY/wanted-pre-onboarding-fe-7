import { useRecoilState } from "recoil";
import Todo from "./Todo";
import { todoAtom } from "./todoAtom";

const deepCopy = (arr) => arr.map((el) => ({ ...el }));

const TodoRecoil = () => {
  const [todoStore, setTodoStore] = useRecoilState(todoAtom);

  const initTodo = (data) => {
    setTodoStore(data);
  }
  const onAddTodo = (data) => {
    const prevData = deepCopy(todoStore);
    setTodoStore([...prevData, data]);
  }
  const onDeleteTodo = (id) => {
    setTodoStore(deepCopy(todoStore).filter((el) => el.id !== id))
  }
  const onModifyTodo = (data) => {
    const prevData = deepCopy(todoStore);
    setTodoStore(() => {
      prevData.forEach((el) => {
        if (el.id === data.id) {
          el.todo = data.todo;
        }
      })
      return prevData;
    }
    );
  }
  const onCompletedTodo = (data) => {
    const prevData = deepCopy(todoStore);
    setTodoStore(() => {
      prevData.forEach((el) => {
        if (el.id === data.id) {
          el.isCompleted = data.isCompleted
        }
      })
      return prevData;
    }
    )
  }
  return (
    <Todo
      todoStore={todoStore}
      initTodo={initTodo}
      onAddTodo={onAddTodo}
      onDeleteTodo={onDeleteTodo}
      onModifyTodo={onModifyTodo}
      onCompletedTodo={onCompletedTodo}
    ></Todo>
  )
}

export default TodoRecoil;