import { Component } from 'react'

class Product extends Component {
	render() {
		const { id } = this.props.match.params
		return <h1>Product {id}</h1>
	}
}
export { Product }
