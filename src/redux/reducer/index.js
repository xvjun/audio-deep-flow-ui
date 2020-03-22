import { type } from './../action'
import {combineReducers} from 'redux'

// const initialState = {
// 	menuName: '首页'
// }

const ebikeData = (state, action) => {
	switch(action.type){
		case type.SWITCH_MENU:
			return {
				...state,
				menuName:action.menuName
			};
		case type.selectedKeys:
			return {
				...state,
				selectedKeys:action.selectedKeys
			};
		default:
			return {...state};
	}
}

export default ebikeData;