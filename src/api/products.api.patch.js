import { instance } from '../http'

export function patchProduct(data, id, config) {
	return instance
		.patch(`/store-products/${id}`, data, config)
		.then((respones) => console.log(respones))
		.catch((error) => console.log(error))
}
