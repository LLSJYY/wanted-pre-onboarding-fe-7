import {RecoilRoot} from 'recoil';
import TodoRecoil from './TodoRecoil';


const TodoRecoilService = () => {
  return (
    <RecoilRoot>
      <TodoRecoil/>
    </RecoilRoot>
  )
}

export default TodoRecoilService;