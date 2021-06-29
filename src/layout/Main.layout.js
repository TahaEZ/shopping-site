import { Container } from 'reactstrap'
const Main = (props) => {
	return (
		<Container fluid>
			<header></header>
			{props.children}
		</Container>
	)
}

export { Main }
