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
const PanelProduct = (props) => {
	const limit = 5
	const [productList, setProductList] = useState([])
	const [page, setPage] = useState(props.match ? +props.match.params.page : 1)
	const [lastPage, setLastPage] = useState(
		props.match ? +props.match.params.page : 1
	)
	const [pages, setPages] = useState([])
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
				index += '_page='.length
				const tempLastPage = headerLinks.last[index]
				setLastPage(tempLastPage)
			} else {
				setLastPage(1)
			}
			setProductList(res.data)
		}

		async function fetchData(page, limit) {
			await fetchProducts(resolve, reject, page, limit)
		}
		fetchData(page, limit)
	}, [page])
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
				<Button onClick={() => {}}>افزودن کالا</Button>
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
						<tr>
							<td>
								<img
									src={item.pic}
									style={{ width: '20px', height: '20px' }}
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
					<Link
						to={`/panel/product/${page - 1}`}
						style={linkStyle}
						onClick={linkClickHandler}
					>
						<PaginationLink>قبلی</PaginationLink>
					</Link>
				</PaginationItem>
				{pages.map((item) => (
					<PaginationItem active={page == item}>
						<Link
							to={`/panel/product/${item}`}
							style={linkStyle}
							onClick={linkClickHandler}
						>
							<PaginationLink>{item}</PaginationLink>
						</Link>
					</PaginationItem>
				))}
				<PaginationItem disabled={page == lastPage}>
					<Link
						to={`/panel/product/${page + 1}`}
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

export { PanelProduct }
