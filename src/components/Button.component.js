import { Button } from 'reactstrap'

const MyButton = (props) => {
	const handleClick = () => {
		const { onClick } = props
		onClick()
	}
	return (
		<Button
			onClick={handleClick}
			color='primary'
			style={props.style}
			className={props.className}
		>
			{props.children}{' '}
		</Button>
	)
}

export { MyButton as Button }
