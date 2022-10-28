import TodoRedux from "./TodoRedux";
import { Provider } from 'react-redux';
import todoStore from "../../feature/todoStore";


const TodoReduxService = () => {
  return (
    <Provider store={todoStore}>
      <TodoRedux />
    </Provider>
  )
}

export default TodoReduxService;