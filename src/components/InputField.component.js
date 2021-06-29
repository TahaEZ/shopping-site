import { FormGroup, Label, Input } from 'reactstrap'

const InputField = (props) => {
	return (
		<FormGroup className={props.className}>
			<Label for={props.id} className='mb-2'>
				{props.label}{' '}
			</Label>
			<Input placeholder={props.placeholder} type={props.type} id={props.id} />
		</FormGroup>
	)
}

export { InputField }
