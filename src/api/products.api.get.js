import { instance } from '../http'

export function fetchProducts(resolve, reject, field) {
	console.log(instance)
	return instance
		.get(`/store-products`)
		.then((respones) => resolve(respones))
		.catch((error) => reject(error))
}
