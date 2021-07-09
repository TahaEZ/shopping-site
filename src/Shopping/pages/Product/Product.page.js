import { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { Info } from './components/Info.component'
import { Showcase } from './components/Showcase.component'
import { fetchProducts } from '../../../api/products.api.get'
const Product = (props) => {
	const [product, setProduct] = useState({})
	const { id } = props.match.params
	useEffect(() => {
		const resolve = (res) => {
			console.log('res', res.data)
			setProduct(res.data[0])
		}
		async function fetchProduct(id) {
			await fetchProducts(
				resolve,
				console.log,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				id
			)
		}
		fetchProduct(id)
	}, [])
	return (
		<Container>
			<h1>Product {id}</h1>
			<Showcase product={product}></Showcase>
			<Info description={product.description} />
		</Container>
	)
}
export { Product }
