import { instance } from '../http'

export function patchOrder(data, id) {
	return instance
		.patch(`/orderslist/${id}`, data)
		.then((res) => console.log(res))
		.catch((err) => console.log(err))
}
