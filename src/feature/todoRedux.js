import { createSlice } from '@reduxjs/toolkit';
export const todoRedux = createSlice({
  name: 'todo',
  initialState: {
    previous: [],
    future : [],
    list: [],
  },
  reducers: {
    init: (state, action) => {  
      state.list = action.payload;
    },  
    addTodo : (state,action) => {
      const newState = state.list.map((el)=>({...el}));
      state.previous.push(newState);
      state.list.push(action.payload)
    },
    deleteTodo: (state, action) => {
      const newState = state.list.map((el)=>({...el}));
      state.previous.push(newState);
      state.list = state.list.filter((todoItem) => todoItem.id !== action.payload);
    },
    modifyTodo: (state,action) => {
      const newState = state.list.map((el)=>({...el}));

      state.list.forEach((todoItem) => {
        state.previous.push(newState);
        if (todoItem.id === action.payload.id) {
          todoItem.todo = action.payload.todo;
        }
      })
    },
    completedTodo: (state, action) => {
      const newState = state.list.map((el)=>({...el}));
      state.previous.push(newState);      
      state.list.forEach((todoItem) => {
        if (todoItem.id === action.payload.id) {
          todoItem.isCompleted = action.payload.isCompleted
        }
      })
      console.log(JSON.parse(JSON.stringify(state)));

    },
    undo: (state,aciton) => {
      const {previous,future,list} = state;
      const current = previous[previous.length-1];
      console.log(JSON.parse(JSON.stringify(state)));      
      state.previous = previous.splice(0,previous.length-1);
      state.list = current || list;
      state.future = current ? [list,...future] : future;
      console.log(JSON.parse(JSON.stringify(state)));
    
    },
    redo: (state,aciton) => {
      const {previous,future,list} = state;
      const current = future[future.length-1];
      console.log(JSON.parse(JSON.stringify(state)));

      state.previous = [list,...previous];
      state.list = current;
      state.future = future.splice(0,future.length-1);
      console.log(JSON.parse(JSON.stringify(state)));

    }
  }
})

export const { init,addTodo, deleteTodo, modifyTodo,completedTodo,undo,redo} = todoRedux.actions

export default todoRedux.reducer