import {
	Container,
	Pagination,
	PaginationItem,
	PaginationLink,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { SideList } from './components/SideList.component'
import { useState, useEffect } from 'react'
import { fetchProducts } from '../../../api/products.api.get'
import { ProductCard } from '../../components/ProductCard.component'
const Products = (props) => {
	const limit = 6
	const [page, setPage] = useState(props.match ? +props.match.params.page : 1)
	const [lastPage, setLastPage] = useState(
		props.match ? +props.match.params.page : 1
	)
	const [list, setList] = useState([])
	const [pages, setPages] = useState([])
	const linkStyle = { textDecoration: 'none', color: 'inherit' }
	const { category } = props.match.params
	useEffect(() => {
		console.log('lastpage', lastPage)
		const tempPages = []
		for (let i = 1; i <= lastPage; i++) {
			tempPages.push(i)
		}
		setPages(tempPages)
	}, [lastPage])
	useEffect(() => {
		console.log('page', page)
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
			setList(res.data)
		}

		console.log(pages)
		console.log(page)
		async function fetchData(page, limit, category) {
			await fetchProducts(
				resolve,
				reject,
				page,
				limit,
				undefined,
				undefined,
				undefined,
				category
			)
		}
		fetchData(page, limit, category)
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
			console.log(
				'clicked Link',
				linkHref[linkHref.indexOf(`${category}`) + category.length + 1]
			)
			setPage(+linkHref[linkHref.indexOf(`${category}`) + category.length + 1])
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
	return (
		<Container
			fluid
			className='d-flex justify-content-start flex-wrap align-items-stretch'
		>
			<SideList></SideList>
			<Container style={{ width: '70%' }}>
				<h2>کالاهای گروه {category}</h2>
				<section className='d-flex justify-content-between flex-wrap'>
					{list.map((item) => (
						<ProductCard product={item} />
					))}
				</section>
				<Pagination className='d-flex flex-row justify-content-center mt-5'>
					<PaginationItem disabled={page == 1}>
						<Link
							to={`/products/${category}/${page - 1}`}
							style={linkStyle}
							onClick={linkClickHandler}
						>
							<PaginationLink>قبلی</PaginationLink>
						</Link>
					</PaginationItem>
					{pages.map((item) => (
						<PaginationItem active={page == item}>
							<Link
								to={`/products/${category}/${item}`}
								style={linkStyle}
								onClick={linkClickHandler}
							>
								<PaginationLink>{item}</PaginationLink>
							</Link>
						</PaginationItem>
					))}
					<PaginationItem disabled={page == lastPage}>
						<Link
							to={`/products/${category}/${page + 1}`}
							style={linkStyle}
							onClick={linkClickHandler}
						>
							<PaginationLink>بعدی</PaginationLink>
						</Link>
					</PaginationItem>
				</Pagination>
			</Container>
		</Container>
	)
}
export { Products }
