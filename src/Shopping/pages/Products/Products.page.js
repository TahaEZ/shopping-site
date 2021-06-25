import { Component } from 'react'

class Products extends Component {
	render() {
		const { category } = this.props.match.params
		return <h1>{category} Products</h1>
	}
}
export { Products }
