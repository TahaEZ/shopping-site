import {
	Table,
	Container,
	Input,
	Label,
	Pagination,
	PaginationItem,
	PaginationLink,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { LinkLikeButton } from '../../../components/LinklikeButton.component'
import { fetchOrders } from '../../../api/orders.api.get'
const PanelOrders = (props) => {
	const limit = 5
	let options = {
		second: 'numeric',
		minute: 'numeric',
		hour: 'numeric',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour12: false,
	}
	const [ordersFilter, setOrdersFilter] = useState(
		props.match ? props.match.params.ordersFilter : 'expected'
	)
	const [ordersList, setOrdersList] = useState([])
	const [page, setPage] = useState(props.match ? +props.match.params.page : 1)
	const [lastPage, setLastPage] = useState(
		props.match ? +props.match.params.page : 1
	)
	const [pages, setPages] = useState([])
	const onChangeValue = (e) => {
		setOrdersFilter(e.target.value)
	}

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
			console.log('res', res)
			console.log('last page', lastPage)
			if (res.headers.link) {
				const headerLinks = parseLinkHeader(res.headers.link)
				let index = headerLinks.last.indexOf('_page=')
				console.log('last page index', index + 6, headerLinks.last[index + 6])
				index += 6
				const tempLastPage = headerLinks.last[index]
				console.log(tempLastPage)
				setLastPage(tempLastPage)
				console.log('orders: ', res.data)
			} else {
				setLastPage(1)
			}
			setOrdersList(res.data)
		}

		console.log(pages)
		async function fetchData(ordersFilter, page, limit) {
			await fetchOrders(resolve, reject, ordersFilter, page, limit)
		}
		fetchData(ordersFilter, page, limit)
	}, [ordersFilter])
	const openModal = () => {}
	const clacSumOfBasketList = (basketList) => {
		let sum = 0
		for (let i = 0; i < basketList.length; i++) {
			sum += basketList[i].price
		}
		return sum
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
				<h2>مدیریت سفارش ها</h2>
				<div className='orders-radio-buttons'>
					<Label for='delivered' className='mx-3'>
						سفارش های تحویل شده
					</Label>
					<Input
						name='orders-filter'
						type='radio'
						value='delivered'
						id='delivered'
						checked={ordersFilter === 'delivered'}
						onChange={onChangeValue}
					></Input>
					<Label for='expected' className='mx-3'>
						سفارش های در انتظار ارسال
					</Label>
					<Input
						name='orders-filter'
						type='radio'
						value='expected'
						id='expected'
						checked={ordersFilter === 'expected'}
						onChange={onChangeValue}
					></Input>
				</div>
			</div>
			<Table className='text-center'>
				<thead>
					<tr>
						<th>نام کاربر</th>
						<th>مجموع مبلغ</th>
						<th>زمان ثبت سفارش</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{ordersList.map((item) => (
						<tr>
							<td>{item.name}</td>
							<td>{clacSumOfBasketList(item.basketList)}</td>
							<td>
								{new Date(item.submitionTime).toLocaleString('fa-IR', options)}
							</td>
							<td>
								<LinkLikeButton value='بررسی سفارش' callBack={openModal} />
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Pagination className='d-flex flex-row justify-content-center'>
				<PaginationItem disabled={page == 1}>
					<Link
						to={`/panel/orders/${ordersFilter}/${page - 1}`}
						style={linkStyle}
					>
						<PaginationLink
							href={
								page == 1
									? `/panel/orders/${ordersFilter}/1`
									: `/panel/orders/${ordersFilter}/${page - 1}`
							}
						>
							قبلی
						</PaginationLink>
					</Link>
				</PaginationItem>
				{pages.map((item) => (
					<PaginationItem active={page == item}>
						<Link
							to={`/panel/orders/${ordersFilter}/${item}`}
							style={linkStyle}
						>
							<PaginationLink href={`/panel/orders/${ordersFilter}/${item}`}>
								{item}
							</PaginationLink>
						</Link>
					</PaginationItem>
				))}
				<PaginationItem disabled={page == lastPage}>
					<Link
						to={`/panel/orders/${ordersFilter}/${page + 1}`}
						style={linkStyle}
					>
						<PaginationLink
							href={
								page == lastPage
									? `/panel/orders/${ordersFilter}/${page}`
									: `/panel/orders/${ordersFilter}/${page + 1}`
							}
						>
							بعدی
						</PaginationLink>
					</Link>
				</PaginationItem>
			</Pagination>
		</Container>
	)
}
export { PanelOrders }
