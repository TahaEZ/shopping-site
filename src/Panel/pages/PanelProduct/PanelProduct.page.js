import { Button } from '../../../components'
import {
	Container,
	PaginationLink,
	Pagination,
	PaginationItem,
	Table,
	ModalBody,
	Modal,
	ModalFooter,
	ModalHeader,
	Form,
	Input,
	FormGroup,
	Label,
} from 'reactstrap'
import { fetchProducts } from '../../../api/products.api.get'
import { useState, useEffect } from 'react'
import { LinkLikeButton } from '../../../components/LinklikeButton.component'
import { Link } from 'react-router-dom'
import { postProduct } from '../../../api/product.api.post'
const PanelProduct = (props) => {
	const limit = 5
	const [productList, setProductList] = useState([])
	const [page, setPage] = useState(props.match ? +props.match.params.page : 1)
	const [lastPage, setLastPage] = useState(
		props.match ? +props.match.params.page : 1
	)
	const [modal, setModal] = useState(false)
	const [pages, setPages] = useState([])
	const [fields, setFields] = useState([])
	const [subfields, setSubfields] = useState([])
	useEffect(() => {
		const tempPages = []
		for (let i = 1; i <= lastPage; i++) {
			tempPages.push(i)
		}
		setPages(tempPages)
	}, [lastPage])

	useEffect(() => {
		function reject(err) {
			console.log(err)
		}
		async function resolve(res) {
			if (res.headers.link) {
				const headerLinks = parseLinkHeader(res.headers.link)
				let index = headerLinks.last.indexOf('_page=')
				index += 6
				const tempLastPage = headerLinks.last[index]
				setLastPage(tempLastPage)
			} else {
				setLastPage(1)
			}
			setProductList(res.data)
		}
		async function didGetProducts(response) {
			let data = response.data
			let fieldsList = []
			let subfieldsList = []
			while (data.length) {
				fieldsList.push(data[0].field)
				data = data.filter((item) => item.field != data[0].field)
			}
			data = response.data
			while (data.length) {
				subfieldsList.push(data[0].subfield)
				data = data.filter((item) => item.subfield != data[0].subfield)
			}
			setFields(fieldsList)
			setSubfields(subfieldsList)
		}
		async function fetchData(page, limit) {
			await fetchProducts(resolve, reject, page, limit)
		}
		fetchData(page, limit)
		fetchProducts(didGetProducts, console.log)
	}, [page])
	const toggle = () => setModal(!modal)

	const addProduct = () => {
		let bodyFormData = new FormData()
		const image = document.querySelector('#file-input').files[0]
		const name = document.querySelector('#product-name').value
		const field = document.querySelector('#field-select').value
		const subfield = document.querySelector('#subfield-select').value
		const price = document.querySelector('#product-price').value
		const quantity = document.querySelector('#product-quantity').value
		const description = document.querySelector('#product-description').value
		if (name) {
			bodyFormData.append('image', image)
			bodyFormData.append('name', name)
			bodyFormData.append('field', field)
			bodyFormData.append('subfield', subfield)
			bodyFormData.append('price', price)
			bodyFormData.append('quantity', quantity)
			bodyFormData.append('description', description)
			postProduct(console.log, console.log, bodyFormData)
		}
		toggle()
	}

	const linkClickHandler = (e) => {
		let linkParent = e.target.parentNode
		let isActive
		const isDisabled =
			linkParent.getAttribute('class') &&
			linkParent.getAttribute('class').includes('disabled')
		if (isDisabled) e.preventDefault()
		else {
			linkParent = linkParent.parentNode
			isActive = linkParent.getAttribute('class').includes('active')
			if (isActive) e.preventDefault()
		}
		if (!isActive && !isDisabled) {
			linkParent = e.target.parentNode
			console.log(linkParent)
			const linkHref = linkParent.getAttribute('href')
			setPage(+linkHref[linkHref.indexOf('product/') + 'product/'.length])
		}
	}
	function parseLinkHeader(linkHeader) {
		const linkHeadersArray = linkHeader
			.split(', ')
			.map((header) => header.split('; '))
		const linkHeadersMap = linkHeadersArray.map((header) => {
			const thisHeaderRel = header[1].replace(/"/g, '').replace('rel=', '')
			const thisHeaderUrl = header[0].slice(1, -1)
			return [thisHeaderRel, thisHeaderUrl]
		})
		return Object.fromEntries(linkHeadersMap)
	}
	const linkStyle = { textDecoration: 'none', color: 'inherit' }
	return (
		<Container>
			<div className='d-flex flex-row justify-content-between align-items-center'>
				<h2>مدیریت کالاها</h2>
				<Button onClick={toggle} color='success'>
					افزودن کالا
				</Button>
				<Modal isOpen={modal} toggle={toggle}>
					<ModalHeader toggle={toggle}>افزودن/ ویرایش کالا</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<Label for='file-input' className='mb-2'>
									تصویر کالا:
								</Label>
								<Input
									dir='ltr'
									type='file'
									id='file-input'
									className='form-control'
								/>
							</FormGroup>
							<FormGroup>
								<Label for='product-name' className='mb-2'>
									نام کالا:
								</Label>
								<Input type='input' id='product-name' />
							</FormGroup>
							<FormGroup>
								<Label for='field-select' className='mb-2'>
									دسته بندی:
								</Label>
								<Input type='select' name='select' id='field-select'>
									{fields.map((item) => (
										<option>{item}</option>
									))}
								</Input>
							</FormGroup>
							<FormGroup>
								<Label for='subfield-select' className='mb-2'>
									زیرگروه:
								</Label>
								<Input type='select' name='select' id='subfield-select'>
									{subfields.map((item) => (
										<option>{item}</option>
									))}
								</Input>
							</FormGroup>
							<FormGroup>
								<Label for='product-price' className='mb-2'>
									قیمت:
								</Label>
								<Input type='input' id='product-price' />
							</FormGroup>
							<FormGroup>
								<Label for='product-quantity' className='mb-2'>
									تعداد:
								</Label>
								<Input type='input' id='product-quantity' />
							</FormGroup>
							<FormGroup>
								<Label for='product-description' className='mb-2'>
									توضیحات:
								</Label>
								<Input
									type='textarea'
									id='product-description'
									style={{ resize: 'none' }}
								/>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button color='danger' onClick={toggle}>
							لغو
						</Button>
						<Button color='success' onClick={addProduct}>
							ثبت
						</Button>
					</ModalFooter>
				</Modal>
			</div>
			<Table className='text-center'>
				<thead>
					<tr>
						<th>تصویر</th>
						<th>نام کالا</th>
						<th>دسته بندی</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{productList.map((item) => (
						<tr id={item.id}>
							<td>
								<img
									src={process.env.PUBLIC_URL + `/images/${item.image}`}
									style={{ width: '50px', height: '50px' }}
									alt='product-pic'
								/>
							</td>
							<td>{item.name}</td>
							<td>{item.field}</td>
							<td>
								<LinkLikeButton value='ویرایش' callBack={() => {}} />
								<LinkLikeButton value='حذف' callBack={() => {}} />
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Pagination className='d-flex flex-row justify-content-center'>
				<PaginationItem disabled={page == 1}>
					<Link to={`/panel/quantity/${page - 1}`} style={linkStyle}>
						<PaginationLink>قبلی</PaginationLink>
					</Link>
				</PaginationItem>
				{pages.map((item) => (
					<PaginationItem active={page == item}>
						<Link to={`/panel/quantity/${item}`} style={linkStyle}>
							<PaginationLink>{item}</PaginationLink>
						</Link>
					</PaginationItem>
				))}
				<PaginationItem disabled={page == lastPage}>
					<Link to={`/panel/quantity/${page + 1}`} style={linkStyle}>
						<PaginationLink>بعدی</PaginationLink>
					</Link>
				</PaginationItem>
			</Pagination>
		</Container>
	)
}

export { PanelProduct }
