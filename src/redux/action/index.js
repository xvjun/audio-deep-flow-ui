export const type = {
	SWITCH_MENU:'SWITCH_MENU',
	selectedKeys:'selectedKeys',
}

export function switchMenu(menuName){
	return {
		type:type.SWITCH_MENU,
		menuName
	}
}

export function selectedKeys(selectedKeys){
	return {
		type:type.selectedKeys,
		selectedKeys
	}
}