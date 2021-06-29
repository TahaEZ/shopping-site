import { Container } from 'reactstrap'
const Panel = (props) => {
	return (
		<Container fluid>
			<header></header>
			{props.children}
		</Container>
	)
}

export { Panel }
