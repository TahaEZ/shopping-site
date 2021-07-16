import { Container } from 'reactstrap'
import { Button, InputField } from '../../../components'

const Checkout = (props) => {
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
			<Button
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
		</Container>
	)
}

export { Checkout }
