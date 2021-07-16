import { useEffect } from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import { clearBasket } from '../../../redux/basket/basketActions'
import { postOrder } from '../../../api/order.api.post'
const PaymentResult = (props) => {
	let imgUrl
	let text
	if (props.status == 'fail') {
		imgUrl = process.env.PUBLIC_URL + '/images/cross.png'
		text = 'پرداخت موفقیت آمیز نبود، سفارش شما در انتظار پرداخت است!'
	} else if (props.status == 'success') {
		imgUrl = process.env.PUBLIC_URL + '/images/check.png'
		text =
			'با تشکر از پرداخت شما، سفارش شما ثبت شده و جهت هماهنگی ارسال با شما تماس گرفته خواهد شد!'
	}

	useEffect(() => {
		if (props.status == 'success') {
			const order = JSON.parse(localStorage.getItem('order'))
			console.log('order', order)
			postOrder(order)
			localStorage.clear()
			props.clearBasket()
		} else {
			localStorage.removeItem('order')
		}
	}, [])

	return (
		<Container>
			<h2>نتیجه پرداخت</h2>
			<section className='result d-flex justify-content-center align-items-center p-5'>
				<img src={imgUrl} className='result-icon m-3' width='100px'></img>
				<p
					className='message m-3'
					style={{ width: '30vw', fontSize: '1.2rem' }}
				>
					{text}
				</p>
			</section>
		</Container>
	)
}
const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		clearBasket: () => dispatch(clearBasket()),
	}
}
const reduxPaymentResult = connect(
	mapStateToProps,
	mapDispatchToProps
)(PaymentResult)
export { reduxPaymentResult as PaymentResult }
