import TodoRedux from "./TodoRedux";
import { Provider } from 'react-redux';
import todoStore from "./todoStore";


const TodoReduxService = () => {
  return (
    <Provider store={todoStore}>
      <TodoRedux />
    </Provider>
  )
}

export default TodoReduxService;