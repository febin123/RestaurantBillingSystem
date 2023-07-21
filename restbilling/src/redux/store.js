import {combineReducers,applyMiddleware} from 'redux'
import {legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'

import {composeWithDevTools}from '@redux-devtools/extension'
import {rootReducer}from './rootReducer'

const finalReducer=combineReducers({
    rootReducer
})
const initalState={
    rootReducer:{
        cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[]
    }
}
const middleware=[thunk]
// eslint-disable-next-line no-undef
const store=createStore(finalReducer,initalState,composeWithDevTools(applyMiddleware(...middleware)))

export default store