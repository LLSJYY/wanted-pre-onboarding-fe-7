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
    modifyTodo: (state, action) => {
      state.list.forEach((todoItem) => {
        if (todoItem.id === action.payload.id) {
          todoItem.todo = action.payload.id
        }
      })
    },
    completedTodo: (state, action) => {
      console.Log(state,action.payload)
    },
  }
})

export const { init, deleteTodo, modifyTodo,completedTodo } = todoRedux.actions

export default todoRedux.reducer