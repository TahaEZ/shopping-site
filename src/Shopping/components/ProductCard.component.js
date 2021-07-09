import { Link } from 'react-router-dom'
const ProductCard = (props) => {
	const { image, price, name, id } = props.product
	return (
		<Link
			to={`/product/${id}`}
			style={{
				display: 'block',
				border: 'solid black 1px',
				width: '25vw',
				height: '25vh',
				textAlign: 'center',
				margin: '1%',
				boxSizing: 'border-box',
				color: 'black',
				textDecoration: 'none',
			}}
		>
			<figure
				className='d-flex justify-content-around align-items-center py-1 px-2'
				id={id}
				style={{ width: '100%', height: '100%' }}
			>
				<img
					src={process.env.PUBLIC_URL + `/images/${image}`}
					style={{ width: '30%', height: '70%' }}
				></img>
				<figcaption
					className='d-flex flex-column justify-content-center align-items-center'
					style={{ width: '60%' }}
				>
					<h3 style={{ fontSize: '1.1rem' }}>{name}</h3>
					<h4 style={{ fontSize: '.9rem' }}>{price} تومان</h4>
				</figcaption>
			</figure>
		</Link>
	)
}
export { ProductCard }
