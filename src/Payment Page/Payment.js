import img from './followersell3.jpg'
const Payment = () => {
	return (
		<div className='d-flex flex-column justify-content-center align-items-center'>
			<img src={img} />
			<div class='mt-5'>
				<a
					class='btn btn-success pay'
					href='http://localhost:3000/payment-result/success'
					style={{ width: '300px' }}
				>
					پرداخت
				</a>
				<a
					class='btn btn-danger cancel'
					href='http://localhost:3000/payment-result/fail'
				>
					انصراف
				</a>
			</div>
		</div>
	)
}
export { Payment }
