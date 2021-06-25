import { Component } from 'react'
class Panel extends Component {
	render() {
		return (
			<>
				<header></header>
				{this.props.children}
			</>
		)
	}
}

export { Panel }
