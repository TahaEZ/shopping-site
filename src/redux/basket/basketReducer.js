import { ADD_TO_BASKET, REMOVE_FROM_BASKET, CLEAR_BASKET } from './basketTypes'
let initialState = {}
if (localStorage.getItem('basket')) {
	initialState.basket = JSON.parse(localStorage.getItem('basket'))
} else initialState.basket = []

const basketReducer = (state = initialState, action) => {
	console.log('prevState', state)
	switch (action.type) {
		case ADD_TO_BASKET:
			if (state.basket.some((item) => item.id == action.payload.product.id)) {
				let index
				for (let i = 0; i < state.basket.length; i++) {
					if (state.basket[i].id == action.payload.product.id) index = i
				}
				const newState = { ...state }
				newState.basket[index].quantity += action.payload.product.quantity
				console.log('newState', newState)
				return newState
			} else {
				console.log(action)
				return {
					...state,
					basket: [...state.basket, action.payload.product],
				}
			}
		case REMOVE_FROM_BASKET:
			let newBasket = [...state.basket]
			newBasket.splice(action.payload.index, 1)
			const newState = {
				...state,
				basket: newBasket,
			}
			console.log(newState)
			return newState
		case CLEAR_BASKET:
			return {
				...state,
				basket: [],
			}

		default:
			return state
	}
}

export default basketReducer
