import { instance } from '../http'

export function postOrder(data) {
	return instance
		.post(`/orderslist`, data)
		.then((res) => console.log(res))
		.catch((err) => console.log(err))
}
