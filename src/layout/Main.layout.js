import { Component } from 'react'
class Main extends Component {
	render() {
		return (
			<>
				<header></header>
				{this.props.children}
			</>
		)
	}
}

export { Main }
