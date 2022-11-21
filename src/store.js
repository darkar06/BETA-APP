import thunk from "redux-thunk"
import { applyMiddleware, combineReducers, createStore } from "redux"
import { userReducer } from "./redux/userReducer"
import { tokenReducer } from "./redux/tokenReducer"
import { scoreReducer } from "./redux/scoreReducer"

const reducers = combineReducers({
  user: userReducer,
  token: tokenReducer,
  score: scoreReducer
})

export const store = createStore(
  reducers
)