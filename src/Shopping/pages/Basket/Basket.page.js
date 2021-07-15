import { useState, useEffect } from 'react'
import { Container, Table } from 'reactstrap'
import { connect } from 'react-redux'
import { removeFromBasket } from '../../../redux/basket/basketActions'
import { LinkLikeButton } from '../../../components'
import { Button } from '../../../components'
import { Link } from 'react-router-dom'
const Basket = (props) => {
	const [sum, setSum] = useState()
	const calcSum = (basket) => {
		let tempSum = 0
		for (let i = 0; i < basket.length; i++) {
			tempSum += basket[i].price * basket[i].quantity
		}
		setSum(tempSum)
	}

	useEffect(() => {
		calcSum(props.basket)
	}, [props.basket])
	return (
		<Container>
			<h2>سبد خرید</h2>
			<Table className='text-center m-auto mb-5'>
				<thead>
					<tr>
						<th>کالا</th>
						<th>قیمت</th>
						<th>تعداد</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{props.basket.map((item) => (
						<tr row-index={props.basket.indexOf(item)}>
							<td>{item.name}</td>
							<td>{item.price}</td>
							<td>{item.quantity}</td>
							<td>
								<LinkLikeButton
									value='حذف'
									callBack={(e) =>
										props.removeFromBasket(
											e.target.parentNode.parentNode.getAttribute('row-index')
										)
									}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<div className='footer d-flex justify-content-between align-items-center'>
				<h3 style={{ fontSize: '1.3rem' }}>
					جمع: <span style={{ marginRight: '50px' }}>{sum}</span> تومان
				</h3>
				<Link to='/checkout'>
					<Button onClick={() => {}} color='success' className='p-2'>
						نهایی کردن سبد خرید
					</Button>
				</Link>
			</div>
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		basket: state.basket,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		removeFromBasket: (index) => dispatch(removeFromBasket(index)),
	}
}
const reduxBasket = connect(mapStateToProps, mapDispatchToProps)(Basket)
export { reduxBasket as Basket }
