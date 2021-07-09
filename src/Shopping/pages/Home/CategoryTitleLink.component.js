import { Link } from 'react-router-dom'

const CategoryTitleLink = (props) => {
	return (
		<Link
			to={props.to}
			style={{
				textDecoration: 'none',
				fontSize: '1.3rem',
			}}
		>
			<span>کالاهای گروه {props.field}</span>
			<div
				style={{
					borderTop: '8px solid transparent',
					borderBottom: '8px solid transparent',
					borderRight: '8px solid blue',
					display: 'inline-block',
					marginRight: '5px',
				}}
			></div>
		</Link>
	)
}

export { CategoryTitleLink }
