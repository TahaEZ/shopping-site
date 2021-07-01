import { Form } from 'reactstrap'
import { InputField, Button } from '../../../components'
import { ReturnToSite } from '../../components/ReturnToSite.component'
import { useHistory } from 'react-router-dom'
const PanelLogin = () => {
	let history = useHistory()
	const clickHandler = () => {
		history.push('/panel/orders')
		return false
	}
	return (
		<Form
			className='mt-5 px-1 py-5 mx-auto d-flex flex-column align-items-center'
			style={{
				width: '80%',
				border: 'solid 1px black',
				maxWidth: '400px',
				minWidth: '200px',
			}}
		>
			<h1 style={{ fontSize: '1.5rem' }}>ورود به پنل مدیریت فروشگاه فلان</h1>
			<InputField label='نام کاربری' className='my-2' type='text' />
			<InputField label='رمز عبور' className='my-2' type='password' />
			<Button
				onClick={clickHandler}
				style={{ width: '60px', backgroundColor: 'white', color: 'black' }}
				className='mt-3'
			>
				ورود
			</Button>
			<ReturnToSite className='mt-3' />
		</Form>
	)
}
export { PanelLogin }
