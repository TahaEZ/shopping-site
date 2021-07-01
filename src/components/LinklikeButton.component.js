import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from 'reactstrap'
const LinkLikeButton = (props) => {
	const [editing, setEditing] = useState(false)
	const goToEditMode = () => {
		setEditing(true)
	}
	const handleKeyDown = (e) => {
		if (e.key === 'Escape') {
			const { exitEditMode } = props
			exitEditMode(props.productId)
			setEditing(false)
		}
	}
	const clickHandler = props.editable ? goToEditMode : props.callBack
	return (
		<>
			{!editing && <Link onClick={clickHandler}>{props.value}</Link>}
			{editing && <Input type='text' onKeyDown={handleKeyDown} />}
		</>
	)
}

export { LinkLikeButton }
