import { Container } from 'reactstrap'
import { CategoryTitleLink } from './CategoryTitleLink.component'
import { fetchProducts } from '../../../api/products.api.get'
import { useEffect, useState } from 'react'
import { ProductCard } from '../../components/ProductCard.component'
const Home = (props) => {
	const [productList, setProductList] = useState([])
	const resolve = (res) => {
		console.log(res.data)
		let data = res.data
		let list = []
		while (data.length) {
			list.push(data.filter((item) => item.field == data[0].field))
			data = data.filter((item) => item.field != data[0].field)
		}
		for (let i = 0; i < list.length; i++) {
			if (list[i].length > 6) {
				list[i] = list[i].slice(0, 6)
			}
			console.log('list[i]', list[i])
		}
		console.log(list)
		setProductList(list)
	}
	useEffect(() => {
		fetchProducts(
			resolve,
			console.log,
			undefined,
			undefined,
			undefined,
			'field,id',
			'asc,desc'
		)
	}, [])

	return (
		<Container>
			{productList.map((item) => (
				<div>
					<CategoryTitleLink
						field={item[0].field}
						to={`products/${item[0].subfield}`}
					/>
					<section className='d-flex justify-content-start flex-wrap my-4'>
						{item.map((element) => (
							<ProductCard product={element} />
						))}
					</section>
				</div>
			))}
		</Container>
	)
}
export { Home }
