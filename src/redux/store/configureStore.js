import {createStore, applyMiddleware} from 'redux'
import reducer from './../reducer'

const initalState = {
	menuName:'首页'
}

const configureStore = () => createStore(reducer, initalState);

export default configureStore