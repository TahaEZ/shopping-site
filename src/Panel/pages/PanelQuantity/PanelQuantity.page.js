import { Button } from '../../../components'
import {
	Container,
	PaginationLink,
	Pagination,
	PaginationItem,
	Table,
} from 'reactstrap'
import { fetchProducts } from '../../../api/products.api.get'
import { useState, useEffect } from 'react'
import { LinkLikeButton } from '../../../components/LinklikeButton.component'
import { Link } from 'react-router-dom'
import { patchProduct } from '../../../api/products.api.patch'
const PanelQuantity = (props) => {
	const limit = 5
	const [quantityList, setQuantityList] = useState([])
	const [page, setPage] = useState(props.match ? +props.match.params.page : 1)
	const [lastPage, setLastPage] = useState(
		props.match ? +props.match.params.page : 1
	)
	const [editedList, setEditedList] = useState([])
	const [pages, setPages] = useState([])
	useEffect(() => {
		const tempPages = []
		for (let i = 1; i <= lastPage; i++) {
			tempPages.push(i)
		}
		setPages(tempPages)
	}, [lastPage])
	useEffect(() => {
		console.log(editedList)
	}, [editedList])
	useEffect(() => {
		function reject(err) {
			console.log(err)
		}
		async function resolve(res) {
			if (res.headers.link) {
				const headerLinks = parseLinkHeader(res.headers.link)
				let index = headerLinks.last.indexOf('_page=')
				index += '_page='.length
				const tempLastPage = headerLinks.last[index]
				setLastPage(tempLastPage)
			} else {
				setLastPage(1)
			}
			setQuantityList(res.data)
		}

		console.log(pages)
		async function fetchData(page, limit) {
			await fetchProducts(resolve, reject, page, limit)
		}
		fetchData(page, limit)
	}, [page])
	const submit = () => {
		for (let i = 0; i < quantityList.length; i++) {
			for (let j = 0; j < editedList.length; j++) {
				if (quantityList[i].id == editedList[j].id) {
					quantityList[i][Object.keys(editedList[j])[1]] = Object.values(
						editedList[j]
					)[1]
				}
			}
		}
		for (let item of editedList) patchProduct(item, item.id)
		setEditedList([])
	}
	const edit = (object) => {
		if (
			!editedList.some(
				(element) =>
					element.id === object.id &&
					Object.keys(element)[1] === Object.keys(object)[1]
			)
		)
			setEditedList((prev) => [...prev, object])
		else {
			for (let i = 0; i < editedList.length; i++) {
				if (editedList[i].id === object.id) {
					editedList[i][Object.keys(object)[1]] = Object.values(object)[1]
				}
			}
		}
	}
	const exitEditMode = (object) => {
		const tempList = editedList.filter(
			(item) => JSON.stringify(item) !== JSON.stringify(object)
		)
		setEditedList(tempList)
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
			setPage(+linkHref[linkHref.indexOf('quantity/') + 'quantity/'.length])
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
				<h2>مدیریت موجودی و قیمت‌ها</h2>
				<Button onClick={submit}>ذخیره</Button>
			</div>
			<Table className='text-center'>
				<thead>
					<tr>
						<th>کالا</th>
						<th>قیمت</th>
						<th>موجودی</th>
					</tr>
				</thead>
				<tbody>
					{quantityList.map((item) => (
						<tr productid={item.id}>
							<td>{item.name}</td>
							<td productid={item.id}>
								<LinkLikeButton
									editable='true'
									exitEditMode={exitEditMode}
									value={item.price}
									type='price'
									productId={item.id}
									callBack={edit}
								/>
							</td>
							<td productid={item.id}>
								<LinkLikeButton
									editable='true'
									exitEditMode={exitEditMode}
									value={item.quantity}
									type='quantity'
									productId={item.id}
									callBack={edit}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Pagination className='d-flex flex-row justify-content-center'>
				<PaginationItem disabled={page == 1}>
					<Link
						to={`/panel/quantity/${page - 1}`}
						style={linkStyle}
						onClick={linkClickHandler}
					>
						<PaginationLink>قبلی</PaginationLink>
					</Link>
				</PaginationItem>
				{pages.map((item) => (
					<PaginationItem active={page == item}>
						<Link
							to={`/panel/quantity/${item}`}
							style={linkStyle}
							onClick={linkClickHandler}
						>
							<PaginationLink>{item}</PaginationLink>
						</Link>
					</PaginationItem>
				))}
				<PaginationItem disabled={page == lastPage}>
					<Link
						to={`/panel/quantity/${page + 1}`}
						style={linkStyle}
						onClick={linkClickHandler}
					>
						<PaginationLink>بعدی</PaginationLink>
					</Link>
				</PaginationItem>
			</Pagination>
		</Container>
	)
}
export { PanelQuantity }
