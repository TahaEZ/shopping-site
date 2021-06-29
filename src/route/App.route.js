import { Component } from 'react'
import { Main, Panel } from '../layout'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {
	PanelLogin,
	PanelProduct,
	PanelQuantity,
	PanelOrders,
} from '../Panel/pages'
import {
	Basket,
	Checkout,
	Home,
	PaymentResult,
	Product,
	Products,
} from '../Shopping/pages'
import { fetchProducts } from '../api/products.api.get'
fetchProducts(console.log, console.log)
class AppRoute extends Component {
	state = {
		basketList: [],
	}
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path='/' exact>
						<Main>
							<Home />
							222
						</Main>
					</Route>
					<Route
						path='/products/:category'
						exact
						render={(props) => {
							return (
								<Main>
									<Products {...props} />
								</Main>
							)
						}}
					/>
					<Route
						path='/product/:id'
						exact
						render={(props) => {
							return (
								<Main>
									<Product {...props} />
								</Main>
							)
						}}
					/>
					<Route path='/basket' exact>
						<Main>
							<Basket basket-list={this.state.basketList} />
						</Main>
					</Route>
					<Route path='/checkout' exact>
						<Main>
							<Checkout />
						</Main>
					</Route>
					<Route path='/payment-result/success' exact>
						<Main>
							<PaymentResult status='success' />
						</Main>
					</Route>
					<Route path='/payment-result/fail' exact>
						<Main>
							<PaymentResult status='fail' />
						</Main>
					</Route>
					<Route path='/panel/login' exact>
						<PanelLogin />
					</Route>
					<Route path='/panel/product' exact>
						<Panel>
							<PanelProduct />
						</Panel>
					</Route>
					<Route path='/panel/quantity' exact>
						<Panel>
							<PanelQuantity />
						</Panel>
					</Route>
					<Route path='/panel/orders' exact>
						<Panel>
							<PanelOrders />
						</Panel>
					</Route>
					<Route path='/not-found' exact>
						<h1>Page Not Found!</h1>
					</Route>
					<Redirect to='/not-found' />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default AppRoute
