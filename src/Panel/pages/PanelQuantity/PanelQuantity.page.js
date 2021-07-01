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
const PanelQuantity = (props) => {
	const limit = 5
	const [quantityList, setQuantityList] = useState([])
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
				index += 6
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
	}, [])

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
				<Button onClick={() => {}}>ذخیره</Button>
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
						<tr>
							<td>{item.name}</td>
							<td>
								<LinkLikeButton
									editable='true'
									exitEditMode={() => {}}
									value={item.price}
									productId={item.id}
								/>
							</td>
							<td>
								<LinkLikeButton
									editable='true'
									exitEditMode={() => {}}
									value={item.quantity}
									productId={item.id}
								/>
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
export { PanelQuantity }
