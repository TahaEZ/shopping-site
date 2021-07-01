import { instance } from '../http'

export function fetchOrders(
	resolve,
	reject,
	ordersFilter,
	page = 1,
	limit = 10
) {
	console.log(resolve, reject)
	const delivered = ordersFilter === 'delivered'
	console.log(instance)
	return instance
		.get(`/orderslist?delivered=${delivered}&_page=${page}&_limit=${limit}`)
		.then((respones) => resolve(respones))
		.catch((error) => reject(error))
}
