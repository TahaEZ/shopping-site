import { instance } from '../http'

export function deleteProduct(resolve, reject, id) {
	return instance
		.delete(`/store-products/${id}`)
		.then((respones) => resolve(respones))
		.catch((error) => reject(error))
}
