import { Container } from 'reactstrap'

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

export { PaymentResult }
