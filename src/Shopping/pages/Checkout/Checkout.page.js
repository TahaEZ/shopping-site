import { Container } from 'reactstrap'
import { Button, InputField } from '../../../components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
const Checkout = (props) => {
	const pay = () => {
		let order = {}
		order.basketList = props.basket
		const name = document.querySelector('#name').value
		const lastName = document.querySelector('#last-name').value
		const phoneNumber = document.querySelector('#phone-number').value
		const address = document.querySelector('#address').value
		const deliveryTime = document.querySelector('#delivery-time').value
		order.name = name + ' ' + lastName
		order.phoneNumber = phoneNumber
		order.address = address
		order.delivered = false
		order.submitionTime = new Date()
		order.deliveryRequest = new Date(deliveryTime)
		localStorage.setItem('basket', JSON.stringify(props.basket))
		localStorage.setItem('order', JSON.stringify(order))
	}
	return (
		<Container>
			<h2>نهایی کردن خرید</h2>
			<form className='d-flex justify-content-between flex-wrap'>
				<InputField
					style={{ width: '45%', margin: '20px 0px' }}
					type='text'
					id='name'
					label='نام:'
				/>
				<InputField
					style={{ width: '45%', margin: '20px 0px' }}
					type='text'
					id='last-name'
					label='نام خانوادگی:'
				/>
				<InputField
					style={{ width: '45%', margin: '20px 0px' }}
					type='textarea'
					id='address'
					label='آدرس:'
				/>
				<InputField
					style={{ width: '45%', margin: '20px 0px' }}
					type='text'
					id='phone-number'
					label={
						<span>
							<span>تلفن همراه:</span>
							<span style={{ color: 'gray' }} className='mx-4'>
								جهت هماهنگی ارسال سفارش
							</span>
						</span>
					}
				/>
				<InputField
					style={{ width: '45%', margin: '20px 0px' }}
					type='text'
					id='delivery-time'
					label='تاریخ تحویل:'
				/>
			</form>
			<Link to='/payment'>
				<Button
					onClick={pay}
					color='success'
					className='py-2 text-center'
					style={{
						fontSize: '1.5rem',
						width: '30%',
						margin: '20px 35%',
					}}
				>
					پرداخت
				</Button>
			</Link>
		</Container>
	)
}
const mapStateToProps = (state) => {
	return {
		basket: state.basket,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {}
}

const reduxCheckout = connect(mapStateToProps, mapDispatchToProps)(Checkout)
export { reduxCheckout as Checkout }
