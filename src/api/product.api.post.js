import { instance } from '../http'

export function postProduct(resolve, reject, data) {
	return instance
		.post('/store-products', data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
		.then((respones) => resolve(respones))
		.catch((error) => reject(error))
}
