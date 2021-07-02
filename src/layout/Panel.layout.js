import { Container, Navbar, NavbarBrand, NavItem, Nav } from 'reactstrap'
import { Button } from '../components'
import { Link } from 'react-router-dom'
import { ReturnToSite } from '../Panel/components/ReturnToSite.component'
const Panel = (props) => {
	const defaultStyle = {
		textAlign: 'center',
		backgroundColor: 'white',
		color: 'black',
	}
	const activeStyle = { ...defaultStyle, backgroundColor: 'lightblue' }
	let productBtn = props.active === 'product' ? activeStyle : defaultStyle
	let quantityBtn = props.active === 'quantity' ? activeStyle : defaultStyle
	let ordersBtn = props.active === 'orders' ? activeStyle : defaultStyle
	return (
		<Container fluid className='p-0 m-0'>
			<Navbar
				color='light'
				light
				style={{ boxShadow: '5px 5px 10px rgb(200, 200, 200)' }}
				className='mb-3'
			>
				<Nav
					navbar='true'
					className='d-flex flex-row justify-content-around align-items-center'
					style={{ width: '100%' }}
				>
					<NavItem style={{ width: '30%' }}>
						<NavbarBrand style={{ fontSize: '2rem' }} className='mr-3'>
							پنل مدیریت فروشگاه
						</NavbarBrand>
					</NavItem>
					<NavItem
						style={{ width: '40%' }}
						className='d-flex flex-row justify-content-center'
					>
						<Link to='/panel/product'>
							<Button onClick={() => {}} style={productBtn}>
								کالاها
							</Button>
						</Link>
						<Link to='/panel/quantity'>
							<Button onClick={() => {}} style={quantityBtn}>
								موجودی و قیمت
							</Button>
						</Link>
						<Link to='/panel/orders'>
							<Button onClick={() => {}} style={ordersBtn}>
								سفارش ها
							</Button>
						</Link>
					</NavItem>
					<NavItem>
						<ReturnToSite />
					</NavItem>
				</Nav>
			</Navbar>
			{props.children}
		</Container>
	)
}

export { Panel }
