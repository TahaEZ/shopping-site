import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from 'reactstrap'
const LinkLikeButton = (props) => {
	const [inputValue, setInputValue] = useState('')
	const [editing, setEditing] = useState(false)
	const goToEditMode = () => {
		setEditing(true)
	}
	const handleKeyDown = (e) => {
		if (e.key === 'Escape') {
			const editedDataObject = {}
			editedDataObject.id = props.productId
			editedDataObject[props.type] = +inputValue
			props.exitEditMode(editedDataObject)

			setEditing(false)
		}
	}
	const edit = (e) => {
		const callBack = props.callBack
		const inputVal = e.target.value
		setInputValue(inputVal)
		const editedDataObject = {}
		editedDataObject.id = props.productId
		editedDataObject[props.type] = +inputVal
		console.log(editedDataObject)
		callBack(editedDataObject)
	}
	const clickHandler = props.editable ? goToEditMode : props.callBack
	return (
		<>
			{!editing && (
				<Link onClick={clickHandler} className='mx-2'>
					{props.value}
				</Link>
			)}
			{editing && (
				<Input
					onBlur={edit}
					style={{
						maxHeight: '26px',
						maxWidth: '100px',
						position: 'relative',
						left: '-50px',
						boxSizing: 'border-box',
					}}
					type='text'
					onKeyDown={handleKeyDown}
				/>
			)}
		</>
	)
}

export { LinkLikeButton }
