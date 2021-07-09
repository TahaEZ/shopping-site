import { instance } from '../http'

export function fetchProducts(
	resolve,
	reject,
	page,
	limit,
	field,
	sortBy,
	order,
	subfield,
	id
) {
	let url = '/store-products'
	if (page && limit && !field) url += `?_page=${page}&_limit=${limit}`
	else if (field) url += `?field=${field}`
	else if (page && limit && field)
		url += `?field=${field}&_page=${page}&_limit=${limit}`
	if (sortBy)
		url +=
			url == '/store-products'
				? `?_sort=${sortBy}&_order=${order}`
				: `&_sort=${sortBy}&_order=${order}`
	if (subfield)
		url +=
			url == '/store-products'
				? `?subfield=${subfield}`
				: `&subfield=${subfield}`
	if (id) url += url == '/store-products' ? `?id=${id}` : `&id=${id}`
	console.log(instance)
	return instance
		.get(url)
		.then((respones) => resolve(respones))
		.catch((error) => reject(error))
}
