import { createSlice } from '@reduxjs/toolkit'

export const todoRedux = createSlice({
  name: 'todo',
  initialState: {
    list: []
  },
  reducers: {
    init: (state, action) => {
      state.list = action.payload;
    },
    deleteTodo: (state, action) => {
      state.list.filter((todoItem) => todoItem.id === action.payload);
    },
    
    completedTodo: (state, action) => {
      state.list.forEach((todoItem) => {
        if (todoItem.id === action.payload.id) {
          todoItem.isCompleted = action.payload.isCompleted
        }
      })
    },
  }
})

export const { init, deleteTodo, modifyTodo,completedTodo } = todoRedux.actions

export default todoRedux.reducer