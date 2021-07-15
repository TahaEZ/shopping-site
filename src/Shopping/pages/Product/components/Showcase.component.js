import { Link } from 'react-router-dom'
import { Input } from 'reactstrap'
import { Button } from '../../../../components/Button.component'
import { addToBasket } from '../../../../redux/basket/basketActions'
import { connect } from 'react-redux'
const Showcase = (props) => {
	const { image, name, field, subfield, price, quantity } = props.product
	console.log(props.product)
	const addProductToBasket = () => {
		const basketQuantity = +document.querySelector('input').value
		props.addToBasket({
			id: props.product.id,
			name: props.product.name,
			quantity: basketQuantity ? basketQuantity : 1,
			price: props.product.price,
		})
	}
	return (
		<figure style={{ height: '40vh' }} className='d-flex justify-content-start'>
			<img
				className='mx-5'
				src={process.env.PUBLIC_URL + `/images/${image}`}
				style={{ width: '25%', height: '100%' }}
			/>
			<figcaption className='d-flex flex-column justify-content-between'>
				<div>
					<h2>{name}</h2>
					<h4 style={{ display: 'inline-block' }}>
						{field}
						<div
							style={{
								borderTop: '8px solid transparent',
								borderBottom: '8px solid transparent',
								borderRight: '8px solid black',
								display: 'inline-block',
								marginRight: '5px',
							}}
						></div>
					</h4>
					<Link
						to={`/products/${subfield}`}
						style={{
							textDecoration: 'none',
							color: 'blue',
							fontSize: '1.5rem',
							marginRight: '10px',
						}}
					>
						{subfield}
					</Link>
				</div>
				<div>
					<h3 className='mb-4'>{price} تومان</h3>
					<Input
						placeholder={1}
						min={1}
						max={quantity}
						type='number'
						step='1'
						style={{
							width: '70px',
							display: 'inline-block',
							marginLeft: '20px',
						}}
					/>
					<Button color='success' onClick={addProductToBasket}>
						اضافه به سبد خرید
					</Button>
				</div>
			</figcaption>
		</figure>
	)
}

const mapStateToProps = (state) => {
	return {}
}
console.log(document.querySelector('h2'))
const mapDispatchToProps = (dispatch) => {
	return {
		addToBasket: (product) => dispatch(addToBasket(product)),
	}
}
const reduxShowcase = connect(mapStateToProps, mapDispatchToProps)(Showcase)
export { reduxShowcase as Showcase }
