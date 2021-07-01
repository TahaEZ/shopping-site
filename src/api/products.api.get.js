import { instance } from '../http'

export function fetchProducts(resolve, reject, page, limit, field) {
	let url = '/store-products'
	if (page && limit && !field) url += `?_page=${page}&_limit=${limit}`
	else if (field) url += `?field=${field}`
	else if (page && limit && field)
		url += `?field=${field}&_page=${page}&_limit=${limit}`
	console.log(instance)
	return instance
		.get(url)
		.then((respones) => resolve(respones))
		.catch((error) => reject(error))
}
