import { ADD_TO_BASKET } from './basketTypes'
import { REMOVE_FROM_BASKET } from './basketTypes'
export const addToBasket = (product) => {
	console.log(product)
	return {
		type: ADD_TO_BASKET,
		payload: {
			product,
		},
	}
}

export const removeFromBasket = (index) => {
	return {
		type: REMOVE_FROM_BASKET,
		payload: {
			index,
		},
	}
}
