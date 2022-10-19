import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoRedux'

export default configureStore({
  reducer: {
    todo: todoReducer,
  }
})