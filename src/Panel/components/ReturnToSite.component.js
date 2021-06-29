import { Component } from 'react'
import { Link } from 'react-router-dom'
class ReturnToSite extends Component {
	render() {
		return (
			<Link
				to='/'
				style={{ textDecoration: 'none', color: 'blue' }}
				className={this.props.className}
			>
				بازگشت به سایت
			</Link>
		)
	}
}
export { ReturnToSite }
