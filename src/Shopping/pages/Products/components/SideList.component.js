import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../../../../api/products.api.get'
const SideList = (props) => {
	const [list, setList] = useState([])
	const resolve = (res) => {
		let data = res.data
		let tempList = []
		while (data.length) {
			tempList.push(data.filter((item) => item.field == data[0].field))
			data = data.filter((item) => item.field != data[0].field)
		}
		let filteredData = []
		for (let i = 0; i < tempList.length; i++) {
			filteredData.push([])
		}
		console.log('tempList: ', tempList, 'filteredData: ', filteredData)
		for (let i = 0; i < tempList.length; i++) {
			while (tempList[i].length) {
				filteredData[i].push(
					tempList[i].filter((item) => item.subfield == tempList[i][0].subfield)
				)

				tempList[i] = tempList[i].filter(
					(item) => item.subfield != tempList[i][0].subfield
				)
			}
		}
		console.log(filteredData)
		setList(filteredData)
	}

	useEffect(() => {
		fetchProducts(resolve, console.log)
	}, [])
	return (
		<aside
			style={{
				width: '25%',
				borderLeft: 'solid black 2px',
				marginTop: '-10px',
			}}
		>
			{list.map((item) => (
				<>
					<h3 style={{ fontSize: '1.2rem' }}>{item[0][0].field}</h3>
					<ul style={{ listStyleType: 'none', paddingRight: '15px' }}>
						{item.map((element) => (
							<li>
								<Link
									to={`/products/${element[0].subfield}`}
									style={{ textDecoration: 'none' }}
								>
									{element[0].subfield}
								</Link>
							</li>
						))}
					</ul>
				</>
			))}
		</aside>
	)
}
export { SideList }
