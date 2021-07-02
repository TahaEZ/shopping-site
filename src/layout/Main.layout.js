import { Container, Navbar, NavbarBrand, NavItem, Nav } from 'reactstrap'
import { Link } from 'react-router-dom'
const Main = (props) => {
	const linkStyle = {
		textDecoration: 'none',
		fontWeight: 600,
	}
	return (
		<Container fluid className='m-0 p-0'>
			<Navbar
				color='light'
				style={{ boxShadow: '5px 5px 10px rgb(200, 200, 200)' }}
				light
				className='mb-3'
			>
				<Nav
					navbar='true'
					className='d-flex flex-row justify-content-between align-items-center'
					style={{ width: '100%' }}
				>
					<NavItem
						className='d-flex flex-row justify-content-between'
						style={{ width: '30%' }}
					>
						<Link to='/'>
							<img
								src={process.env.PUBLIC_URL + '/images/sitePic.jpg'}
								style={{ height: '90px' }}
								alt='logo'
							/>
						</Link>
						<Link to='/' style={{ textDecoration: 'none' }}>
							<NavbarBrand style={{ fontSize: '3rem' }} className='mr-3'>
								فروشگاه فلان
							</NavbarBrand>
						</Link>
					</NavItem>
					<NavItem
						style={{ width: '25%' }}
						className='d-flex flex-row justify-content-around'
					>
						<Link to='/panel/login' style={linkStyle}>
							مدیریت
						</Link>
						<Link to='/basket' style={linkStyle}>
							سبد خرید
							{!!props.basketList.length && (
								<div
									style={{
										width: '20px',
										height: '20px',
										backgroundColor: 'red',
										color: 'white',
										display: 'inline-block',
										textAlign: 'center',
										lineHeight: '20px',
										position: 'relative',
										top: '-10px',
										borderRadius: '50%',
									}}
								>
									{props.basketList.length}
								</div>
							)}
						</Link>
					</NavItem>
				</Nav>
			</Navbar>

			{props.children}
		</Container>
	)
}

export { Main }
