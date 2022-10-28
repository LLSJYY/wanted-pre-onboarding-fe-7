import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoReduxReducer'

export default configureStore({
  reducer: {
    todo: todoReducer,
  }
})
