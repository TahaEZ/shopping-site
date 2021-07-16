import {
	Table,
	Container,
	Input,
	Label,
	Pagination,
	PaginationItem,
	PaginationLink,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { LinkLikeButton } from '../../../components/LinklikeButton.component'
import { fetchOrders } from '../../../api/orders.api.get'
import { Button } from '../../../components'
import { patchOrder } from '../../../api/order.api.patch'
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
	const [order, setOrder] = useState({ basketList: [] })
	const [modal, setModal] = useState(false)
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
		console.log('radio', e.target.value)
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
				index += '_page='.length
				const tempLastPage = headerLinks.last[index]
				console.log('lastPage updated:', tempLastPage, headerLinks.last, index)
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
	}, [ordersFilter, page])
	const openModal = (e) => {
		const index = +e.target.parentNode.parentNode.getAttribute('index')
		console.log(ordersList[index])
		setOrder(ordersList[index])
		setModal(true)
	}

	const deliver = () => {
		const deliveryTime = new Date()
		const deliveredOrder = {
			deliveryTime,
			delivered: true,
		}
		let tempOrdersList = ordersList.filter((item) => item.id !== order.id)
		setOrdersList(tempOrdersList)
		console.log('new Orders List', tempOrdersList)
		patchOrder(deliveredOrder, order.id)
		toggle()
	}

	const toggle = () => {
		setModal((prev) => !prev)
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
			console.log(
				'clicked Link',
				linkHref[linkHref.indexOf(`${ordersFilter}`) + ordersFilter.length + 1]
			)
			setPage(
				+linkHref[linkHref.indexOf(`${ordersFilter}`) + ordersFilter.length + 1]
			)
		}
	}
	const clacSumOfBasketList = (basketList) => {
		let sum = 0
		for (let i = 0; i < basketList.length; i++) {
			sum += basketList[i].price * basketList[i].quantity
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
					<Link to='/panel/orders/delivered/1'>
						<Input
							name='orders-filter'
							type='radio'
							value='delivered'
							id='delivered'
							checked={ordersFilter === 'delivered'}
							onChange={onChangeValue}
						/>
					</Link>
					<Label for='expected' className='mx-3'>
						سفارش های در انتظار ارسال
					</Label>
					<Link to='/panel/orders/expected/1'>
						<Input
							name='orders-filter'
							type='radio'
							value='expected'
							id='expected'
							checked={ordersFilter === 'expected'}
							onChange={onChangeValue}
						/>
					</Link>
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
						<tr index={ordersList.indexOf(item)}>
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
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>نمایش سفارش</ModalHeader>
				<ModalBody className='d-flex flex-column align-items-center'>
					<h3>
						<span>نام مشتری: </span> <span>{order.name}</span>
					</h3>
					<h3>
						<span>آدرس: </span> <span>{order.address}</span>
					</h3>
					<h3>
						<span>تلفن: </span> <span>{order.phoneNumber}</span>
					</h3>
					<h3>
						<span>زمان تحویل: </span>
						<span>
							{new Date(order.deliveryRequest).toLocaleString('fa-IR', options)}
						</span>
					</h3>
					<h3>
						<span>زمان سفارش: </span>
						<span>
							{new Date(order.submitionTime).toLocaleString('fa-IR', options)}
						</span>
					</h3>

					<Table className='text-center'>
						<thead>
							<tr>
								<th>کالا</th>
								<th>قیمت</th>
								<th>تعداد</th>
							</tr>
						</thead>
						<tbody>
							{order.basketList.map((item) => (
								<tr key={item.id}>
									<td>
										<Link to={`/product/${item.id}`}>{item.productName}</Link>
									</td>
									<td>{item.price}</td>
									<td>{item.quantity}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</ModalBody>
				<ModalFooter>
					{ordersFilter == 'expected' && (
						<Button color='success' onClick={deliver}>
							تحویل شد
						</Button>
					)}
					{ordersFilter == 'delivered' && (
						<span>
							<span>زمان تحویل: </span>
							<span>
								{new Date(order.deliveryTime).toLocaleString('fa-IR', options)}
							</span>
						</span>
					)}
				</ModalFooter>
			</Modal>
			<Pagination className='d-flex flex-row justify-content-center'>
				<PaginationItem disabled={page == 1}>
					<Link
						to={`/panel/orders/${ordersFilter}/${page - 1}`}
						style={linkStyle}
						onClick={linkClickHandler}
					>
						<PaginationLink>قبلی</PaginationLink>
					</Link>
				</PaginationItem>
				{pages.map((item) => (
					<PaginationItem active={page == item}>
						<Link
							to={`/panel/orders/${ordersFilter}/${item}`}
							style={linkStyle}
							onClick={linkClickHandler}
						>
							<PaginationLink>{item}</PaginationLink>
						</Link>
					</PaginationItem>
				))}
				<PaginationItem disabled={page == lastPage}>
					<Link
						to={`/panel/orders/${ordersFilter}/${page + 1}`}
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
export { PanelOrders }
