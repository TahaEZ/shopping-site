import { Button } from 'reactstrap'

const MyButton = (props) => {
	const handleClick = () => {
		const { onClick } = props
		onClick()
	}
	return (
		<Button
			onClick={handleClick}
			style={props.style}
			className={props.className}
			color={props.color}
		>
			{props.children}{' '}
		</Button>
	)
}

export { MyButton as Button }
